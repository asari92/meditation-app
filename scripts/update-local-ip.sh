#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)

if [ -f "$SCRIPT_DIR/../.env.example" ]; then
  ROOT_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
elif [ -f "$SCRIPT_DIR/.env.example" ]; then
  ROOT_DIR="$SCRIPT_DIR"
else
  echo "Could not find .env.example next to the script or in its parent directory."
  echo "Run this script from the project repo, or place .env.example рядом со скриптом."
  exit 1
fi

ENV_FILE="$ROOT_DIR/.env"
ENV_EXAMPLE="$ROOT_DIR/.env.example"

detect_windows_ip_from_powershell() {
  if command -v powershell.exe >/dev/null 2>&1; then
    POWERSHELL_CMD='powershell.exe'
  elif command -v powershell >/dev/null 2>&1; then
    POWERSHELL_CMD='powershell'
  else
    return 1
  fi

  "$POWERSHELL_CMD" -NoProfile -Command "
    \$cfg = Get-NetIPConfiguration |
      Where-Object {
        \$_.IPv4Address -ne \$null -and
        \$_.NetAdapter.Status -eq 'Up' -and
        \$_.InterfaceAlias -notmatch 'vEthernet|Hyper-V|VirtualBox|WSL|Loopback|Default Switch|Bluetooth|VMware' -and
        \$_.IPv4Address.IPAddress -notlike '169.254.*'
      } |
      ForEach-Object {
        \$score = 0

        if (\$_.IPv4DefaultGateway -and \$_.IPv4DefaultGateway.NextHop -match '^\d+\.\d+\.\d+\.\d+$') {
          \$score += 100
        }

        if (\$_.NetAdapter.HardwareInterface) {
          \$score += 10
        }

        if (\$_.InterfaceAlias -match 'Wi-?Fi|Wireless|WLAN|Беспровод') {
          \$score += 50
        }

        if (\$_.NetAdapter.InterfaceDescription -match 'Wireless|Wi-Fi|802\.11') {
          \$score += 50
        }

        [PSCustomObject]@{
          IP = \$_.IPv4Address.IPAddress
          Score = \$score
        }
      } |
      Sort-Object Score -Descending |
      Select-Object -First 1

    if (\$cfg) { \$cfg.IP }
  " 2>/dev/null | tr -d '\r' | awk 'NF { print; exit }'
}

detect_linux_ip() {
  ip route get 1.1.1.1 2>/dev/null | awk '{for (i = 1; i <= NF; i++) if ($i == "src") { print $(i + 1); exit }}'
}

detect_macos_ip() {
  for iface in en0 en1; do
    if command -v ipconfig >/dev/null 2>&1; then
      ipconfig getifaddr "$iface" 2>/dev/null && return 0
    fi
  done
  return 1
}

detect_generic_uname() {
  uname -s 2>/dev/null || echo unknown
}

HOST_IP=''
UNAME_VALUE=$(detect_generic_uname)

case "$UNAME_VALUE" in
  Linux)
    if grep -qi microsoft /proc/version 2>/dev/null; then
      HOST_IP=$(detect_windows_ip_from_powershell || true)
    fi

    if [ -z "${HOST_IP}" ]; then
      HOST_IP=$(detect_linux_ip || true)
    fi
    ;;
  Darwin)
    HOST_IP=$(detect_macos_ip || true)
    ;;
  MINGW*|MSYS*|CYGWIN*|Windows_NT)
    HOST_IP=$(detect_windows_ip_from_powershell || true)
    ;;
esac

if [ -z "${HOST_IP}" ]; then
  HOST_IP=$(detect_windows_ip_from_powershell || true)
fi

if [ -z "${HOST_IP}" ]; then
  HOST_IP=$(detect_macos_ip || true)
fi

if [ -z "${HOST_IP}" ]; then
  HOST_IP=$(detect_linux_ip || true)
fi

if [ -z "${HOST_IP}" ]; then
  echo "Could not detect a local IPv4 address automatically."
  echo "Create $ENV_FILE manually and set REACT_NATIVE_PACKAGER_HOSTNAME."
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  cp "$ENV_EXAMPLE" "$ENV_FILE"
fi

if grep -q '^REACT_NATIVE_PACKAGER_HOSTNAME=' "$ENV_FILE"; then
  sed -i "s/^REACT_NATIVE_PACKAGER_HOSTNAME=.*/REACT_NATIVE_PACKAGER_HOSTNAME=$HOST_IP/" "$ENV_FILE"
else
  printf '\nREACT_NATIVE_PACKAGER_HOSTNAME=%s\n' "$HOST_IP" >> "$ENV_FILE"
fi

echo "Updated $ENV_FILE"
echo "REACT_NATIVE_PACKAGER_HOSTNAME=$HOST_IP"

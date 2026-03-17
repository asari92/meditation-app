setup-env:
	sh ./scripts/update-local-ip.sh

build: setup-env
	docker compose build

start: setup-env
	docker compose up --build

rebuild: setup-env
	docker compose down
	docker compose build --no-cache
	docker compose up

down:
	docker compose down

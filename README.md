# ZenPulse: AI Meditation App

[Русская версия](./README.ru.md)

React Native + Expo test assignment for a mobile meditation prototype with subscription gating, meditation cards, and AI-generated mood affirmations.

## Overview

The app includes 3 screens:

- `Paywall`: access selection with `Free`, `Monthly`, and `Yearly` options
- `Meditations`: session list with images, duration, and locked premium content
- `AI Mood`: mood picker with affirmation generation

## Implemented Features

- Meditation-style premium paywall with a highlighted yearly offer
- Free access mode with limited meditations
- Premium access mode that unlocks all meditation cards
- 6 meditation cards with images and session duration
- Locked-state logic that sends non-subscribed users back to the paywall
- AI mood flow with 3 mood choices and generated affirmation text
- Backend request for affirmation generation with safe fallback responses
- SafeArea support for all main screens

## Tech Stack

- React Native `0.81.5`
- Expo SDK `54`
- TypeScript `5.3`
- `react-native-safe-area-context`
- Docker + Docker Compose
- Expo Go for device testing

## Run with Docker

### Prerequisites

- Docker
- Docker Compose

### Commands

Create a local environment file first:

```bash
npm run setup:env
```

This script creates `.env` if needed and tries to detect the local IPv4 address of the host machine automatically.

Supported cases:

- WSL: prefers the Windows host Wi-Fi IP via PowerShell
- Windows: uses PowerShell network configuration
- macOS: checks common Wi-Fi interfaces
- Linux: detects the local source IP from the routing table

If auto-detection is wrong, update `.env` manually and set `REACT_NATIVE_PACKAGER_HOSTNAME` to the host machine Wi-Fi IP.

Example:

```env
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.10.38
```

After that:

```bash
docker compose build
docker compose up
```

Convenience commands:

```bash
make start
```

or

```bash
npm run docker:start
```

Optional rebuild:

```bash
docker compose down
docker compose build --no-cache
docker compose up
```

Also available:

```bash
make rebuild
make down
```

Then open the project in Expo Go by scanning the QR code from the Expo terminal output.

## App Flow

1. The app starts on the `Paywall` screen.
2. The user selects one of three access options:
   - `Free` → limited access
   - `Monthly` → full access
   - `Yearly` → full access, visually highlighted as best value
3. The bottom CTA confirms the selected option and opens the meditation content.
4. On the `Meditations` screen:
   - all users see the full list of sessions
   - free users see premium sessions as locked
   - premium users can access every session
5. Tapping a locked meditation while not subscribed returns the user to the `Paywall`.
6. The `Go to AI Mood` button opens the mood screen.
7. The user selects one of 3 moods and generates an affirmation.
8. If the backend is unavailable, the app returns a realistic fallback affirmation.

## AI Integration

Affirmations are requested from the backend endpoint:

- `POST /api/affirmation`

The app sends the selected mood and expects a text response. If the request fails or returns invalid data, a local fallback affirmation is used instead.

Relevant file:

- [src/utils/mockLLM.ts](/home/asari/windsurf_projects/meditation-app/src/utils/mockLLM.ts)

## Mobile UX Notes

- `SafeAreaProvider` and `SafeAreaView` are used so headers and content do not overlap with device notches or system UI.
- Main actions remain large and tappable across screens.
- Meditation cards keep consistent spacing, image sizing, and locked-state styling.
- The layout was reviewed in web, phone-sized views, and Expo Go on a real device to avoid collapsed spacing and clipped content.

## How AI Helped During Development

- Generated the initial project structure and component breakdown
- Helped iterate on paywall layout and visual hierarchy
- Assisted with locked-content logic and interaction fixes
- Helped refine mobile spacing, SafeArea handling, and web warnings
- Assisted with fallback behavior for affirmation generation

## Where AI Needed Extra Human Review

- Paywall interpretation: the final version uses a `Free` access card plus two premium plans, which was explicitly confirmed as acceptable after clarification
- Mobile layout details: spacing, card hierarchy, and CTA emphasis needed manual review
- Web-specific warnings: deprecated shadow styles, interaction warnings, and SafeArea deprecations required targeted cleanup
- Content access logic: premium visual state and click behavior needed manual verification

## Answer to the Required README Question

The hardest mobile layout problems for AI were screen-size-sensitive spacing, hierarchy, and tap-target consistency. AI can generate a visually good first pass, but it often underestimates how quickly layouts break on smaller screens such as iPhone SE: text wraps earlier, buttons feel cramped, cards become too dense, and vertical spacing that looks fine on large screens can feel crowded.

To control this, I reviewed the app screen by screen and adjusted:

- SafeArea handling so content stayed clear of top and bottom system areas
- card spacing and list rhythm so screens stayed readable
- button sizing and interaction flow so primary actions stayed obvious
- locked vs unlocked meditation behavior so the UI matched the business logic
- visual hierarchy on the paywall so the yearly plan remained the most prominent option

In practice, AI was most useful for speed and iteration, but the final mobile quality depended on manually checking the layout and interaction flow on smaller and larger screen sizes.

## Testing Notes

- Web run worked through Docker + Expo
- Expo Go worked on a real phone after setting the host machine Wi-Fi IP in `.env`
- Locked vs unlocked meditation behavior was manually verified for free and premium access flows
- AI Mood generation was verified both for normal responses and fallback-safe behavior

## Project Structure

```text
meditation-app/
├── App.tsx
├── .env.example
├── assets/
│   └── meditations/
├── src/
│   ├── components/
│   │   ├── MeditationCard.tsx
│   │   ├── MoodOption.tsx
│   │   └── PlanCard.tsx
│   ├── data/
│   │   ├── affirmations.ts
│   │   └── meditations.ts
│   ├── types/
│   │   └── global.d.ts
│   └── utils/
│       └── mockLLM.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

## Final Checklist

- [x] 3 screens implemented
- [x] SafeArea support added
- [x] Subscription gating implemented
- [x] Meditation cards include images and duration
- [x] Locked content redirects to paywall for non-premium access
- [x] AI mood flow implemented
- [x] Backend request with fallback implemented
- [x] Docker-based local run setup included

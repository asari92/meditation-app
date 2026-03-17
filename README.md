# Meditation App

A minimal mobile meditation app built with React Native + Expo + TypeScript, containerized for Docker development.

## Project Overview

This is a test assignment implementation featuring a premium subscription wellness app with 3 screens, subscription logic, locked content, and AI-powered mood feature.

## Features

- **Paywall Screen**: Subscription plans (Monthly/Yearly) with trial activation
- **Meditations Screen**: List of 6 meditations (3 free, 3 locked behind subscription)
- **AI Mood Screen**: Mood selection with mock LLM-generated affirmations
- **Safe Area Support**: Proper handling of notches and screen edges
- **Mobile-First Design**: Optimized for small and large screens

## Tech Stack

- React Native 0.73.0
- Expo SDK 50
- TypeScript 5.3
- react-native-safe-area-context (SafeArea)
- Docker + Docker Compose (development environment)

## Run Locally with Docker

### Prerequisites

- Docker and Docker Compose installed

### Commands

```bash
# Build the container
docker compose build

# Start the app
docker compose up

# Stop the container
docker compose down

# Rebuild dependencies (if needed)
docker compose down
docker compose build --no-cache
docker compose up
```

After starting, the Expo dev server will be available at:
- Metro bundler: http://localhost:19001
- Expo web: http://localhost:19002

## App Flow

1. **App starts at Paywall screen**
2. **User selects a plan** (Monthly or Yearly with "BEST VALUE" badge)
3. **Start Free Trial** → sets subscription = true, navigates to Meditations
4. **Meditations screen** shows 6 cards:
   - 3 unlocked (Morning Clarity, Deep Relaxation, Breath Awareness)
   - 3 locked (Sleep Meditation, Stress Relief, Advanced Focus)
5. **Locked card without subscription** → returns to Paywall
6. **Go to AI Mood button** → navigates to AI Mood screen
7. **AI Mood screen**: Select mood (Calm/Tired/Energy) → Generate affirmation
8. **Back to Meditations** → returns to list

## AI Usage in Development

- Code structure and component architecture
- Mock LLM implementation for mood-based affirmations
- TypeScript interfaces and type definitions
- Docker setup configuration
- README documentation

## What AI Struggled With and How It Was Fixed

| Issue | Solution |
|-------|----------|
| Expo + Docker networking | Used `EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0` and `REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0` |
| Hot reload in container | Volume mount with `node_modules` isolation |
| SafeArea without navigation | Used `react-native-safe-area-context` directly in App.tsx |

## Project Structure

```
meditation-app/
├── App.tsx                     # Main app with 3 screens
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── app.json                    # Expo configuration
├── babel.config.js             # Babel preset
├── Dockerfile                  # Dev container
├── docker-compose.yml          # Container orchestration
├── README.md                   # This file
└── src/
    ├── data/
    │   └── meditations.ts      # 6 meditation items
    ├── utils/
    │   └── mockLLM.ts          # Mock LLM for affirmations
    └── components/
        ├── PlanCard.tsx        # Subscription plan card
        ├── MeditationCard.tsx  # Meditation item card
        └── MoodOption.tsx      # Mood selection button
```

## Testing Checklist (Before Screencast)

- [ ] Run `docker compose build && docker compose up`
- [ ] Verify Expo starts without errors
- [ ] Test paywall → trial → meditations flow
- [ ] Test locked content blocking without subscription
- [ ] Test AI mood → affirmation generation
- [ ] Check SafeArea on different screen sizes
- [ ] Verify all buttons are tappable

## Notes

- **No real payment**: Trial activation is instant via state change
- **No real LLM**: AI mood uses pre-written affirmations selected by mood
- **No backend**: All data is local
- **No complex navigation**: Simple useState screen switching

## License

Test assignment project.

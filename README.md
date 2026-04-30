# Sugar Quit

AI-powered sugar addiction coach. "Reframe for sugar." SOS button for craving moments → AI conversation. Predicts YOUR triggers (time, stress, location). Daily check-ins, streaks, "eat this instead" alternatives, 90-day curriculum.

## Stack

- Expo SDK 54, React Native 0.81, TypeScript (strict)
- expo-router 6 (file-based routing)
- Supabase (auth, database, storage)
- Adapty (subscriptions)
- Claude API / OpenAI API (SOS craving conversations, trigger prediction)
- Zustand (state management)

## Screens

| Screen | Route | Status |
|--------|-------|--------|
| Dashboard (Home) | `app/(tabs)/home.tsx` | ✅ Design complete |
| Missions (Curriculum) | `app/(tabs)/curriculum/` | ✅ Design complete |
| Intel (Progress) | `app/(tabs)/progress/` | ✅ Design complete |
| Command (Profile) | `app/(tabs)/profile/` | ✅ Design complete |
| SOS Transmission | `app/(modals)/sos-transmission.tsx` | ✅ Design complete |
| Daily Check-in | `app/(modals)/checkin.tsx` | ✅ Design complete |
| Milestone | `app/(modals)/milestone.tsx` | ✅ Design complete |
| Streak Freeze | `app/(modals)/streak-freeze.tsx` | ✅ Design complete |
| Paywall | `app/(modals)/paywall-contextual.tsx` | ✅ Design complete |
| Onboarding | `app/(onboarding)/` | ✅ Design complete |

## Design System

Design tokens extracted from Stitch (`docs/06-design/stitch-raw/design-theme.json`):

- **Primary**: `#b50058` (magenta pink)
- **Surface**: `#f1f7fa` (light blue-gray)
- **Gradient**: `#b50058 → #ff709e`
- **Fonts**: Plus Jakarta Sans (headlines) + Manrope (labels/body)

See `constants/tokens.ts` for the full token set.

## Development

→ [How to run locally](docs/07-development/RUN-LOCAL.md)

```bash
npm install
npx expo start --clear
```

Scan the QR code with **Expo Go** on your phone (iOS Camera or Android Expo Go app).

## Project structure

```
app/            — Screens (expo-router file-based)
components/ui/  — Shared design primitives
constants/      — Design tokens
stores/         — Zustand state
mock/           — Mock data (no real API until Stage 6)
docs/           — All project documentation
```

See `CLAUDE.md` for full architectural rules and the 3-layer layout system.

# Running Sugar Quit Locally

## Prerequisites

- Node.js 18+
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Phone and computer on the **same Wi-Fi network**

## Setup

```bash
# 1. Clone and enter the project
git clone https://github.com/oqapps-lab/sugar-quit.git
cd sugar-quit

# 2. Install dependencies
npm install

# 3. Start the dev server (clears Metro cache)
npx expo start --clear
```

## Scanning the QR Code

- **iOS**: Open the Camera app → scan QR → tap the Expo Go banner
- **Android**: Open Expo Go → tap "Scan QR code" → scan

The app loads in ~10–20 seconds on first run.

## Key Commands

| Command | Description |
|---------|-------------|
| `npx expo start --clear` | Start with cleared cache (recommended after changes) |
| `npx tsc --noEmit` | TypeScript check (0 errors expected) |
| `r` in terminal | Reload the app |
| `j` in terminal | Open React Native debugger |

## Project Structure

```
app/
  (tabs)/         — Main tab screens (home, progress, curriculum, profile)
  (modals)/       — Modal screens (SOS, check-in, milestone, paywall…)
  (onboarding)/   — Onboarding flow
components/ui/    — Shared design primitives (AtmosphericGradient, GlassCard, AuraBlob…)
constants/        — Design tokens (colors, fonts, spacing, gradients)
stores/           — Zustand state (useUserStore)
mock/             — Mock data (no real API until Stage 6)
docs/             — All project documentation
```

## Notes

- This is a **design prototype** — most buttons show UI only, logic comes in later stages
- Uses **Expo Go** (SDK 54) — do not upgrade `expo` in package.json without checking bundledNativeModules
- `react-native-reanimated ~4.1.1` + `react-native-worklets 0.5.1` — exact versions required
- babel.config.js uses `react-native-worklets/plugin` (NOT `react-native-reanimated/plugin`)

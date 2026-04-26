# Running Sugar Quit locally

## Prerequisites

- Node.js 18+
- [Expo Go](https://expo.dev/go) on your phone **or** a physical Android/iOS device with the Expo Dev Client installed
- Git

## Setup

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Copy environment file (leave placeholders — app runs in demo mode without real keys)
cp .env.example .env
```

> **Note:** The `--legacy-peer-deps` flag is required because `react-native-reanimated` has a peer conflict with the current Expo SDK.

## Start the dev server

```bash
npx expo start
```

Metro Bundler will print a **QR code** in the terminal.

- **Android** — open the Expo Go app → scan QR
- **iOS** — open Camera app → scan QR → tap the banner

## Using Expo Dev Client (recommended)

If Expo Go doesn't connect or you need custom native modules:

```bash
npx expo start --dev-client
```

Scan the QR with the Expo Dev Client app (not Expo Go).

## Common issues

| Problem | Fix |
|---|---|
| Port 8081 in use | `npx expo start --port 8082` |
| TurboModule / PlatformConstants error | `npx expo install --fix` |
| iOS hardware keyboard blocks soft keyboard | Simulator → I/O → Keyboard → disable "Connect Hardware Keyboard" |
| Blank screen after hot reload | Shake device → Reload |

## Dev shortcuts

The Welcome screen has a **`[dev] → Home`** button that skips onboarding and jumps straight to the main app.

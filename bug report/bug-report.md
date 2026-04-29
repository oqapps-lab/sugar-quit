# Sugar Quit Bug Report

Date: 2026-04-27
Source branch: main

## Entries

Use this file to capture issues found during emulator testing.

### 2026-04-27 - Expo Go cannot run current build

- Environment: Android emulator, `main`, Expo Go.
- Symptom: Expo Go opens `Something went wrong` / `Failed to download remote update` and does not load the app reliably.
- Context: `app.json` has `"newArchEnabled": true`; this project should be tested through a custom Expo Dev Client build rather than Expo Go.
- Action: Added Dev Client dependency and EAS development APK profile.

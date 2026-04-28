# Sugar Quit — Ship Checklist (TestFlight → App Store)

This is a hand-off doc. The actual `eas` commands have to run **in your terminal** (interactive auth opens a browser). Claude Code can prep the files, but you have to run the build/submit commands yourself.

---

## Pre-flight (one-time setup)

### 1. Apple Developer Program

- [ ] Active **Apple Developer Program membership** ($99/yr) at https://developer.apple.com — required to publish to App Store.
- [ ] Bundle ID `com.gazetastreet.sugarquit` registered (Apple Developer → Certificates, IDs & Profiles → Identifiers → "+" → App ID → Bundle ID = `com.gazetastreet.sugarquit`). Or let EAS auto-create it on first build.
- [ ] App Store Connect record created at https://appstoreconnect.apple.com:
  - Name: **Sugar Quit**
  - Primary Language: English (U.S.)
  - Bundle ID: pick `com.gazetastreet.sugarquit`
  - SKU: `sugarquit-ios-001` (any unique string)

### 2. EAS account

- [ ] Run once in your terminal:
  ```
  npx eas-cli login
  ```
  Sign in with Expo account (free). If you don't have one, create at https://expo.dev/signup.
- [ ] In project root run:
  ```
  cd /Users/evgenij/Desktop/work/APP_DEVELOPMENT/sugar-quit
  npx eas-cli init --id <EAS_PROJECT_ID>
  ```
  Or just `npx eas-cli build:configure` to let it create the project on Expo dashboard.

### 3. Edit `eas.json`

Open `eas.json` (already created). In the `submit.production.ios` block, replace:
- `appleId` — your Apple ID email
- `appleTeamId` — 10-character team ID from https://developer.apple.com/account → Membership Details
- `ascAppId` — Apple ID of the App Store Connect record (numeric, found at https://appstoreconnect.apple.com/apps/<ASC_APP_ID>/...)

---

## Build TestFlight (sandbox, internal testers)

### 4. Bump version

In `app.json` change `version` from `0.1.0` to `1.0.0` (or whatever you want). EAS will auto-increment `buildNumber` per the `autoIncrement: true` flag in production profile.

### 5. Run the production iOS build

```
cd /Users/evgenij/Desktop/work/APP_DEVELOPMENT/sugar-quit
npx eas-cli build --platform ios --profile production
```

What this does:
- Bundles your JS + assets, ships them to EAS cloud
- EAS generates an iOS provisioning profile + signing cert (or asks for yours)
- Builds an `.ipa` (~10-25 min cloud build time)
- Returns a download URL when done

You'll be asked the first time:
- "Generate a new Apple Distribution Certificate?" → **Yes**
- "Generate a new Apple Provisioning Profile?" → **Yes**
- Apple ID password / 2FA prompt — supply it

### 6. Submit to TestFlight

```
npx eas-cli submit --platform ios --profile production --latest
```

This sends the latest build to App Store Connect → automatically routes to TestFlight processing. Takes 5-15 min for Apple to process.

### 7. Add internal testers

In App Store Connect → TestFlight → Internal Testing → Add testers:
- Add yourself + anyone you want for QA
- They'll get a TestFlight invite email
- App appears in TestFlight app on their phone

---

## Submit to App Store (public)

After internal QA on TestFlight:

### 8. Fill App Store metadata

In App Store Connect → App Store tab:
- [ ] App icon (1024x1024 — `assets/images/icon.png` if at correct size)
- [ ] 6.7" + 6.1" screenshots (required, 3-10 each)
- [ ] App name + subtitle
- [ ] Keywords
- [ ] Description
- [ ] Privacy Policy URL: https://sugarquit.app/privacy (already linked from Profile)
- [ ] Support URL
- [ ] Pricing: Free with IAP (Premium subscription)
- [ ] In-App Purchases: configure `sugarquit.premium.monthly`, `sugarquit.premium.annual` with the prices you set in app ($9.99 / $79.99)
- [ ] Age rating questionnaire
- [ ] Privacy nutrition labels (data collected: Identifiers, Usage Data, Health & Fitness)
- [ ] App Review Information (login credentials for review team — Maya's account works)

### 9. Submit for review

- [ ] In App Store Connect → Version → "Submit for Review"
- [ ] Apple review takes 24-72 hours typically
- [ ] First-time apps sometimes get rejected for: missing privacy policy, undocumented IAPs, missing demo account info

### 10. Release

After approval:
- Choose "Manual Release" → app live when you click release button
- Or "Automatic Release" → live as soon as approved

---

## Pre-submit safety checklist

Before tapping submit:

- [ ] **Rotate the OpenAI key** at https://platform.openai.com/api-keys. The original key in chat history is still active — revoke it, generate a new one, update Supabase Edge Function secret. Apple reviewers will exercise SOS chat; the key WILL be hit.
- [ ] **Test SOS chat on the production build** (TestFlight, not Expo Go) — confirm the JWT-protected edge function works with a real signed-in user.
- [ ] **Test sign-up + sign-in** on TestFlight build — Supabase auth is the gate; if RLS is broken in prod, app is dead.
- [ ] **Adapty paywall** — Apple reviewers will tap "Try 7 days free" → make sure the StoreKit sandbox flow works and the app does NOT crash on cancellation.
- [ ] **Push notifications** — if listed in `Info.plist`, you need APNs key uploaded to Apple Developer + Adapty/EAS. Currently the app declares push but Expo Go can't deliver them; this only matters for production build.
- [ ] **Disclaimer modal** — first-time SOS users see the medical-disclaimer modal. Apple reviewers will see this. Ensure it's accurate (the SOS AI is a "companion, not medical advisor").

---

## Open bugs (non-blocking, can ship)

Per QA-13/14/15/16 cumulative report:

- BUG-35: Premium SOS card shows "9 of 9999 sessions" — cosmetic
- BUG-37: Back-nav from Progress sub-pages lands on Home tab
- BUG-38: Edit profile shows 1 trigger, Profile main shows up to 2
- BUG-40: Quiz Step 6 (Peak Window) chips not in a11y tree
- BUG-41: Onboarding result page uses narrative phase labels (likely intentional)
- BUG-43: SOS FAB visual overlap with right-edge card content on narrow widths (inherent FAB pattern)

None of these are user-blocking. Address in a follow-up sprint.

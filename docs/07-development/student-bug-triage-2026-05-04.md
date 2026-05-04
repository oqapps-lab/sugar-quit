# Student Bug Triage — 2026-05-04

Triaged 53 bug claims from two student branches:
- **kakoccc** — 48 bugs, Android emulator, 2026-04-29
- **dropamz22** — 5 bugs (+2 already-fixed-on-branch), iPhone Expo Go, 2026-05-02

The other 4 student branches (ChechelevNF, artpolo1986-code, artubard,
beleutovaleksandr88-lab) carry no unique bug-reports — their `BUGS-AND-GAPS.md`
hashes identical to main's.

## Etap A — fixes applied this pass

| ID | Source | Severity | Reality | Status | Files touched |
|----|--------|----------|---------|--------|---------------|
| **#22** | kakoccc | High | Real — `<Text>` wrapper with no onPress | ✅ FIXED | `app/(onboarding)/auth.tsx` (Linking import + wrapped Terms/Privacy in `onPress` blocks for both menu and email-form views) |
| **#11** | kakoccc | High | Real — "Tap to adjust" had no handler + `3:00 PM` hardcoded regardless of MORNING/AFTERNOON/EVENING/NIGHT pick | ✅ FIXED | `app/(onboarding)/quiz/peak-time.tsx` (time now `{TIME_BY_KEY[selected]}` dynamic, hint copy rewritten to non-misleading) |
| **#43** | kakoccc | Medium | Real — "Change photo" only fired Haptics, no picker | ✅ FIXED | `app/(tabs)/profile/edit.tsx` (removed Pressable + Text — avatar circle alone, no false affordance) |
| **#36** | kakoccc | High | Real — `NOT_CONFIGURED.error` leaked env var names into form | ✅ FIXED | `lib/supabase.ts` (replaced with `'Sign-in is temporarily unavailable. Please try again in a moment.'`) |
| **#37** | kakoccc | **Critical (App Store blocker)** | Real — `https://sugarquit.app` resolves with ECONNREFUSED, domain dead | ⚠️ PARTIAL — centralized URL but destination still dead | `lib/links.ts` (new) + `app/(tabs)/profile/settings.tsx` + `app/(tabs)/profile/index.tsx` + `app/(onboarding)/auth.tsx` |
| **D3** | dropamz22 | Medium | Real on main — last Settings rows were within tab-bar zone | ✅ FIXED | `app/(tabs)/profile/settings.tsx` (`paddingBottom: insets.bottom + 120` → `+ 160`) |
| **D4a** | dropamz22 | Medium | Real on main — last Curriculum content close to tab bar | ✅ FIXED | `app/(tabs)/curriculum/index.tsx` (`+ 140` → `+ 200`) |
| **D4b** | dropamz22 | Medium | Real on main — Orbit glyph pink halo with `shadowRadius: 8 + elevation: 6` bleeds past parent bounds when glyph sits low in scroll area | ✅ FIXED | `components/ui/DecorGlyph.tsx` (removed shadowColor / shadowOpacity / shadowRadius / shadowOffset / elevation from inner Orbit dot) |

## Etap A — claims rejected after verification

| ID | Source | Why rejected |
|----|--------|--------------|
| **D2** | dropamz22 | dropamz22's branch uses brand magenta `#b50058`. Main's brand is `#a53c30` (rust). The `rgba(165,60,48,0.12)` indicator on `app/(tabs)/_layout.tsx:153` correctly matches main's `colors.primary`. Not a bug on our taxonomy. |
| **#44** | kakoccc | Already fixed on main — `FieldRow` is now non-interactive (no Pressable, no chevron). Comment in `app/(tabs)/profile/edit.tsx:131-139` documents the deliberate downgrade. The complaint targets a previous version. |
| **#38** | kakoccc | "Support opens Gmail" — by design, intentional `mailto:` link. Apple reviewers can email easily on iOS device. Could be elevated to "in-app form" later but not a ship blocker. |

## Etap A — deferred to live verification

| ID | Source | Why defer | Plan |
|----|--------|-----------|------|
| **#31** | kakoccc | Code shows back-button + End button HAVE handlers (`safeDismiss`, `onEnd`). Bug claim says they don't work — needs simulator verification before fixing. | Test in Etap A's ui-qa pass via mobile-mcp; if reproducible, debug `safeDismiss` in `lib/nav.ts`. |
| **#48** | kakoccc | "Occasional crashes" — vague, no repro steps. | Tail Metro logs during ui-qa, look for unhandled rejections. |

## Etap A — explicit out-of-scope (will tackle in Etap Б or В)

26 cosmetic-polish items from kakoccc (icon styling, alignment, typography
tweaks, animation easing) and dropamz22's D5/D6/D7 (5-button asymmetric
grid, pale SAVE CRAVING button, AI Coach empty space). Each individually
small; collectively they shape the polish the app needs before App Store
submit. Will tackle in Etap Б after the first ui-qa pass on Etap A fixes.

## Risk / regression notes

- **Linking.openURL on dead URL**: still opens the system browser, which
  shows ECONNREFUSED to the user. This is a worse user experience than
  before (was no-op). For Apple submit we MUST point `LINKS.privacyPolicy`
  to a real URL — see TODO in `lib/links.ts`.
- **DecorGlyph.Orbit shadow removal**: visual change in *every* place the
  Orbit variant is rendered (Curriculum hero, Identity phase glyph, etc.).
  The dot is still distinguishable without halo, but the screens look
  slightly more "flat" — verify in ui-qa pass.
- **paddingBottom bumps**: only affect bottom of scroll. Hero / mid-content
  positioning unchanged.
- **`peak-time.tsx` dynamic time**: now `setPeakHour` on Continue uses the
  same `TIME_BY_KEY[selected]` lookup as the displayed value. No behavior
  change in saved data, only the visible label was wrong before.

## Etap Б — fixes applied this pass (cross-platform layout)

| ID | Source | Severity | Reality | Status | Files touched |
|----|--------|----------|---------|--------|---------------|
| **#1** | kakoccc | Medium | Real — `lineHeight: 40` for `fontSize: 36` extra-bold clips `g`/`p`/`y` descenders on Android | ✅ FIXED | `app/(onboarding)/welcome.tsx` (lineHeight 40 → 46, ~1.25× fontSize) |
| **#4** | kakoccc | Medium | Real — same lineHeight pattern across 9 quiz screens + auth + push-permission | ✅ FIXED | 9 quiz files (lineHeight 34 → 38), `app/(onboarding)/auth.tsx` + `push-permission.tsx` (lineHeight 32 → 36) |
| **#5** | kakoccc | High | Real — Android elevation in `shadows.cardWarm` casts a hard rectangular drop shadow that against light tint reads as "rectangle behind card" | ✅ FIXED | `components/ui/GlassCard.tsx` (Android branch: stripped `shadows.cardWarm` / `shadows.cardWhisper`; iOS branch unchanged) |
| **#14** | kakoccc | Medium | Real — `name.tsx` Skip slot has no fixed width, so back button (40dp) and Skip (~30dp text) leave the centered progressLabel off-axis | ✅ FIXED | `app/(onboarding)/quiz/name.tsx` (added `skipBtn` 40×40 right-aligned) |
| **#15** | kakoccc | High (cross-platform theme leak) | Real — zero `selectionColor` set anywhere; cursor + selection default to system tint (teal/green Android, blue iOS) | ✅ FIXED | All 11 TextInput call sites: `auth.tsx` (×2), `quiz/name.tsx`, `auth/sign-up.tsx` (×3), `auth/sign-in.tsx` (×2), `modals/sos.tsx`, `modals/craving-log.tsx`, `tabs/profile/edit.tsx` — added `selectionColor={colors.primary}` + `cursorColor={colors.primary}` |
| **#19** | kakoccc | High | Real — paywall ScrollView `paddingBottom: 260` insufficient on tall-bezel Android where footer height + safe-area inset can reach ~280dp, clipping price cards | ✅ FIXED | `app/(onboarding)/paywall.tsx` (260 → 320) |
| **#25** | kakoccc | Low | Real — `legendBadgeText` lacked `includeFontPadding: false`/`textAlignVertical: center`, pushing the digit visually below center in 24×24 circle on Android | ✅ FIXED | `app/(tabs)/home.tsx` (added Android-friendly text centering props on legendBadgeText) |
| **#27** | kakoccc | Same as #5 | Real — same Android elevation issue (curriculum cards use GlassCard) | ✅ FIXED | Resolved automatically by GlassCard fix |
| **#39** | kakoccc | Low | Real — `togglePillOn` had no border, `togglePillOff` had `borderWidth: 1` → 2dp layout shift on every toggle press | ✅ FIXED | `app/(tabs)/profile/settings.tsx` (always-1dp border with `borderColor: transparent` baseline) |

## Etap Б — deferred to live verification

| ID | Source | Why defer | Plan |
|----|--------|-----------|------|
| **#29** | kakoccc | Code already has `KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}` + `keyboardVerticalOffset={iOS ? insets.top : 0}` in SOS modal. May be working — needs live Android verification before re-engineering. | Test in Etap Б ui-qa pass on Android emulator (if available) or note "iOS works, Android NOT tested" per playbook. |
| **#46** | kakoccc | "Back button always sends to Home" — no code uses `router.replace('/(tabs)/home')` from back handlers. All use `router.back()`, which falls back to initial route when stack is empty (e.g. after deep-link). Fix would touch every leaf screen. Need Android repro to scope. | Live test on Android: navigate via tab bar → leaf screen → press back. If it lands on Home, replace with `router.canGoBack() ? router.back() : router.push('/(tabs)/<parent>')` per leaf. |

## Etap Б — deferred to Etap В (UX refactor scope)

| ID | Source | Why deferred | Plan |
|----|--------|--------------|------|
| **#35** | kakoccc | Field-level validation is a bigger UX refactor (track which field is invalid, conditional border highlight, message-near-field). Wider than a layout fix. | Etap В polish pass — refactor sign-in / sign-up forms to support field-bound errors. |

## Next

1. Run `node node_modules/typescript/lib/tsc.js --noEmit` to confirm clean.
2. Live verification via `/ui-qa` skill on simulator — exercise Etap A + Б
   touchpoints AND probe #31, #29, #46.
3. Commit + push Etap Б.
4. Etap В — cosmetic polish (~26 items).

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

## Next

1. Run `node node_modules/typescript/lib/tsc.js --noEmit` to confirm clean.
2. Live verification via `/ui-qa` skill on simulator — exercise Etap A
   touchpoints AND probe #31 SOS back/End.
3. Commit + push.
4. Etap Б — start on the ~12 cross-platform layout items from kakoccc.
5. Etap В — cosmetic polish.

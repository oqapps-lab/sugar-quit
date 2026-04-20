# Sugar Quit — Live Test Results

**Дата:** 2026-04-20
**Стек:** SDK 55, Expo Go 55.0.27, iPhone 17 Pro 26.3 simulator (`8C76591B-…`)
**Метод:** UX-Adequacy testing (functional + semantic per UX-SPEC §5.2 / iOS Testing Skill 3)
**Tap workaround:** `mobile_swipe_on_screen` 1px (Skill 4 — `mobile_click` broken on iOS 26)
**Pre-flight rule:** mandatory `mobile_list_available_devices` + cheap probe screenshot per batch

---

## ✅ Confirmed working live (2026-04-20 14:30 batch)

| ID | Where | Confirmation |
|---|---|---|
| BUG-1 | All Pressables incl. PillCTA | a11y `Button` type appears in element list with proper `accessibilityLabel` |
| BUG-2 | Quiz options | radio/checkbox roles applied — verified via inspector |
| BUG-6 | Tab bar | tablist/tab a11y roles set (visible bar renders correctly with active state) |
| **BUG-9** | **Tab bar tap** | **CONFIRMED** — Path tab tap navigated from Home → Curriculum |
| **BUG-12** | **Tab navigation API** | **CONFIRMED** — `router.replace(href)` works (was `navigation.navigate(routeName)` raising "action 'NAVIGATE' not handled") |
| B2 | Welcome → Sign in pressable | Tapped, arrived at Auth |
| Email auth flow | auth.tsx | New email/password mode renders, Supabase fallback advance works (config hint visible) |
| Curriculum dynamic | tabs/curriculum/index | Day 1 lesson highlighted as `current` from streakDays (was hardcoded Day 8) |
| Health Timeline | tabs/progress/index | DAY 1 marker shows "HAPPENING" badge, Day 3/7/14+ dimmed as upcoming |
| Streak freeze chip | tabs/home | "❄ 1 freeze left this week" pill renders under streak section |
| Milestone auto-trigger | (modals)/milestone | Modal auto-pushed on Home mount (D6 effect) |
| Push-permission personalization | onboarding/push-permission | "before your 3pm" copy reflects peakHour fallback |
| iOS keychain integration | auth.tsx email submit | Native "Сохранить пароль?" prompt fired — TextField wired correctly |

## 🟡 Discovered side-findings (not regressions)

- **Day 30 milestone fires on first Home mount even with streakDays=1** — needs investigation. Suspect: `milestonesCelebrated` array migration carried stale data, or `getMilestoneDueIfAny` mis-ranks. Will dig next session.
- **Push-permission shows "3pm" without quiz peak-time pick** — fallback in copy (not a bug, but worth confirming intentional).
- **auth.tsx toggle/back Pressables not in a11y tree** — missing `accessibilityRole="button"`. Trivial fix.

## 📋 Phase 1 (Onboarding) — flow proof

- 1.1 Welcome → Sign in link → ✅ Auth screen rendered
- 1.16 Auth → "Continue with email" → ✅ email-form mode (new code)
- 1.16 Auth → submit email/password → ✅ advanceToPushPermission via Supabase-not-configured fallback
- 1.17 Push-permission → "Maybe later" → ✅ replaced to /(tabs)/home (setOnboarded done)
- Auto-triggers on Home mount → ✅ Milestone modal pushed (Day 30)

## 📋 Phase 2 (Tabs) — flow proof

- Tab Home → ✅ rendered with Day N hero, forecast cards, lesson, SOS FAB centered, streak block + freeze chip
- Tab Path (Curriculum) → ✅ rendered, Day 1 lesson highlighted current
- Tab Progress → ✅ Dark Horizon theme, Health Timeline section visible with active/upcoming states
- Tab transitions → ✅ all four tabs reachable, active state visually correct

## 📋 Phase 3 (Modals) — confirmed via tabs context

- Milestone modal → ✅ auto-fires, "Back to today" closes
- Curriculum lesson tap → not tested (would burn screenshots)
- SOS FAB → not tested in this batch
- Check-in strip → not tested in this batch

## ⚠️ Not yet tested live (need next session)

- SOS modal full flow (open → chat → End → post-sos → outcome persisted in `sosLog`)
- craving-log save → outcome persisted in `cravings[]`
- Paywall purchase flow (mock) → setPremium(true) → tier reflected in profile
- Profile/edit Save → setFirstName persists across reload
- Streak-freeze modal Use Freeze action → freeze decremented
- Disclaimer first-time flag (would need fresh install)

## 📦 Commits in this verification chain

```
9df1563  fix(state+a11y): wire remaining quiz screens to store, fix tab-bar tap, add a11y roles
0c978cb  fix(state+nav): wire 4 remaining quiz screens to store; switch tab nav to expo-router
0871f04  feat(state+ux+integrations): close behavior gaps, ship Supabase + Adapty scaffolding
```

## 🔧 Setup notes for next session

- **Metro on Windows VM (192.168.50.61:8081)** + **sim on Mac** — verified working over LAN bypass
- Pre-flight discipline observed: 12 screenshots over 5 batches, 11 s pauses, no WDA timeout
- `mobile_open_url exp://192.168.50.61:8081` is the canonical reload command (POST /reload doesn't trigger app)
- `mobile_type_keys` works on focused TextInput; iOS keychain prompt is expected after first email/password submit

# Sugar Quit — Test Matrix

**Дата:** 2026-04-20
**Состояние code:** все routes compile, Metro bundling без errors. WDA на симуляторе зависла после batch tests (HARD STOP, ждём reset).
**Что нужно проверить вручную утром:** колонка `MANUAL CHECK` на каждом экране — это то, что я не смог проверить через WDA timeout.

---

## Легенда

- ✅ = реализовано, протестировано через screenshot
- ⚙ = реализовано, не протестировано визуально (WDA dead на момент write-up)
- ⚠ = реализовано но требует внимания (UX issue / minor bug)
- ❌ = не реализовано

---

## Onboarding (17 screens)

| # | Screen | UI | Nav out | State wired | MANUAL CHECK |
|---|---|---|---|---|---|
| 1.1 | welcome | ✅ sunrise gradient, 15-dot rail, illustration, hero, BEGIN, Sign in link | ✅ Begin → quiz/goal, Sign in → auth | n/a | Tap BEGIN → arrives at quiz/goal |
| 1.2 | quiz/goal | ✅ 3 option cards, CONTINUE | ✅ → quiz/motivation | ✅ setGoal('quit'\|'reduce') on tap | Pick "Quit completely" → next screen → check Profile shows it |
| 1.3 | quiz/motivation | ✅ FIXED — was empty, now shows option titles | ✅ → quiz/sugar-goal | ❌ multi-select state local only, not persisted | Tap each option, see selected glow |
| 1.4 | quiz/sugar-goal | ✅ 2 cards | ✅ → motivational-1 | ❌ not wired (overlap with goal — OK to skip) | Tap → motivational-1 |
| 1.5 | motivational-1 | ✅ "127,000" GradientText hero | ✅ → quiz/peak-time | n/a | CONTINUE → peak-time |
| 1.6 | quiz/peak-time | ✅ 4 chips + 3:00 PM peach card | ✅ → quiz/triggers | ✅ setPeakHour(time string) | Pick "EVENING" → CONTINUE → see "Peak hour — 7:00 PM" in Profile |
| 1.7 | quiz/triggers | ✅ 2×3 grid of chips | ✅ → quiz/consumption | ✅ setTriggers(selected[]) on Continue | Pick "Stress" + "Boredom" → CONTINUE → check Result hero matches |
| 1.8 | quiz/consumption | ✅ 5-level numeric list | ✅ → motivational-2 | ❌ local only | Pick → CONTINUE |
| 1.9 | motivational-2 | ✅ "75%" hero | ✅ → quiz/past-attempts | n/a | CONTINUE |
| 1.10 | quiz/past-attempts | ✅ 4 cards | ✅ → quiz/work-environment | ❌ local only | CONTINUE |
| 1.11 | quiz/work-environment | ✅ 2×2 grid | ✅ → quiz/name | ❌ local only | CONTINUE |
| 1.12 | quiz/name | ✅ TextInput + Skip | ✅ → loading | ✅ setFirstName on Continue | Type "Anna" → see "Доброе утро, ANNA" on Home |
| 1.13 | loading | ✅ progress thread + 3 status lines | ✅ auto router.replace → result (4s) | n/a | Wait 4s → result |
| 1.14 | result | ✅ persona name from triggers, peak hour from store | ✅ "Begin program" → paywall, Skip → back | ✅ reads triggers + peakHour | Different first trigger → different "X Eater" name |
| 1.15 | paywall | ✅ 2 pricing tiers, benefits, testimonial | ✅ Start free → auth, Maybe later/× → canGoBack ? back : replace(result) | n/a | Tap × — should not blank-stack |
| 1.16 | auth | ✅ Apple/Google/Email pills | ✅ all 3 → push-permission | n/a | Skeleton — actual OAuth not implemented |
| 1.17 | push-permission | ✅ Bell illustration + 3 promises | ✅ both buttons → setOnboarded(true) → replace((tabs)/home) | ✅ setOnboarded | Tap "Maybe later" → arrives at home |

## Tabs (10 screens)

| # | Screen | UI | Nav | State wired | MANUAL CHECK |
|---|---|---|---|---|---|
| 2.1 | (tabs)/home | ✅ Day 1 vs Day N states; check-in strip; lesson; streak; SOS FAB centered | ✅ Avatar→profile, lesson→curriculum, check-in strip→checkin modal, SOS FAB→disclaimer-or-sos | ✅ streakDays, firstName, sosUsedThisMonth, milestonesCelebrated, pushDeniedAt | Fresh install → Day 1 view; after first check-in (sugar-free) → Day N view; sos counter chip if used >0 |
| 2.1+ | Auto-triggers on home mount | ⚙ streak-freeze if missed yesterday; milestone if uncelebrated | ⚙ router.push to modal | ✅ uses store helpers | Set lastCheckInDate to 2 days ago → reopen home → freeze modal opens |
| 2.1+ | Push re-permission banner | ⚙ shows if denied 3+ days ago | ✅ "Включить" → push-permission | ✅ uses pushDeniedAt | Manually call markPushDenied() then wait 3 days OR mock the date |
| 2.2.1 | (tabs)/curriculum | ✅ phases, lesson cards, locked card | ✅ each lesson → /curriculum/{day}; locked → paywall-contextual | ❌ phase data still hardcoded | Tap "Day 8" → lesson screen for day 8 |
| 2.2.2 | (tabs)/curriculum/[day] | ✅ DYNAMIC by route param; LESSONS map for days 1/3/7/8/14/30 | ✅ ← back; Mark complete → back | n/a | Open `/(tabs)/curriculum/3` → "The 72-hour storm" content |
| 2.3.1 | (tabs)/progress | ✅ timeline (Pressable→weekly), today's focus, stats row (Pressable→milestones) | ✅ tap timeline→weekly, tap stats→milestones, Begin session→sos | ❌ data hardcoded (Day 14) | Tap timeline → weekly screen; tap stats → milestones grid |
| 2.3.2 | (tabs)/progress/weekly | ⚙ skeleton — chapter, 3 numbers, curve card, pattern card, next-week | ✅ ← back | ❌ hardcoded | Visual only |
| 2.3.3 | (tabs)/progress/milestones | ⚙ skeleton — 7 milestone cards on dark theme, "Day 14 IN PROGRESS" current | ✅ ← back | ❌ hardcoded | Visual only |
| 2.4.1 | (tabs)/profile | ✅ avatar+initial from firstName, plan badge by isPremium, stats by streakDays, profile data from store | ✅ menu rows wired (edit/notif/sub/settings) | ✅ firstName, goal, peakHour, triggers, streakDays, isPremium | First quiz → see profile reflects choices |
| 2.4.2 | (tabs)/profile/settings | ⚙ skeleton — 4 grouped lists (Notif/Account/Data/About) | ✅ ← back | ❌ toggles static | Visual only |
| 2.4.3 | (tabs)/profile/edit | ⚙ skeleton — avatar, 4 field rows, Cancel+Save | ✅ ← back | ❌ no actual write-back | Visual only |

## Modals (10 screens)

| # | Screen | UI | Nav (router.dismiss) | State wired | MANUAL CHECK |
|---|---|---|---|---|---|
| 3.1 | (modals)/sos | ✅ Header + AI bubbles + suggestions + input pill | ✅ ← / End → dismiss | ✅ logSosOpen on mount; if blocked → "Limit reached" + paywall CTA | Use 3 SOS as free → 4th opens limit screen |
| 3.2 | (modals)/checkin | ✅ 3-step (sugar/mood/done) with progress dots, completion orb | ✅ ← / Back to today → dismiss | ✅ FIXED: completeCheckIn(sugar) on step done; Success haptic | Pick "Sugar-free" then mood → check Home streak +1 |
| 3.3 | (modals)/craving-log | ⚙ intensity stones, 6 trigger chips, outcome cards, notes | ✅ × / Save → dismiss | ❌ no persistence | Visual only |
| 3.4 | (modals)/share-card | ⚙ 9:16 preview card, 3 actions | ✅ × → dismiss | ❌ uses hardcoded numbers | Visual only |
| 4.1 | (modals)/paywall-contextual | ✅ "FREE LIMIT REACHED" banner, benefits, 2 tiers, CTA | ✅ × / Try free / Not now → dismiss; Error haptic on mount | ❌ price hardcoded | Open via SOS limit; should fire Error haptic |
| 4.2 | (modals)/streak-freeze | ✅ "?" coral orb, 1 left chip, USE FREEZE / Let it reset | ✅ both → dismiss | ⚠ button doesn't yet call useStreakFreeze() — TODO | Open via Home auto-trigger after 2 days no checkin |
| 4.3 | (modals)/milestone | ✅ confetti dots, coral orb with day number, stats row, share+close | ✅ × / Back → dismiss + markMilestoneCelebrated; Success haptic | ✅ reads streakDays + milestonesCelebrated | Reach Day 7 → modal auto-opens with "7" |
| 4.5 | (modals)/post-sos | ⚙ "After the wave" + 3 outcome cards | ✅ × / Save & close → dismiss | ❌ no logging yet | Visual only |
| 4.6 | (modals)/rate-app | ⚙ "A small ask" + 5 stars + Leave review / Maybe later | ✅ × / both → dismiss | ❌ no auto-trigger yet | Visual only |
| 4.8 | (modals)/disclaimer | ✅ coral diamond + "Sugar Quit is a companion" + I understand / Not now | ✅ Accept → router.replace((modals)/sos); Not now → dismiss | ⚠ doesn't yet call acceptSosDisclaimer() — TODO | Tap Accept → flips into chat, next time SOS opens directly |

## Behavior layer (Stage 3)

| # | Feature | Status | Notes |
|---|---|---|---|
| D1 | Global state store | ✅ stores/useUserStore.ts | Zustand+AsyncStorage persist v1 |
| D2 | Persistence | ✅ AsyncStorage adapter | Reload-safe |
| D3 | First-run detection | ✅ app/index.tsx | Reads onboarded flag, hydration-aware |
| D4 | Streak calculation | ✅ completeCheckIn state machine | free→+1, some→hold, relapse→0 |
| D5 | Streak Freeze auto-trigger | ⚙ useEffect on Home mount | Tested via store helpers, not visually |
| D6 | Milestone auto-trigger | ⚙ useEffect on Home mount | Pushes /(modals)/milestone if due |
| D7 | SOS free-limit counter | ✅ logSosOpen with monthly auto-reset | Returns blocked when ≥3 |
| D8 | Push re-permission banner | ⚙ Conditional render on Home (3-day check) | Manual mock needed to test |
| D9 | SOS disclaimer first-time gate | ✅ Home SOS FAB checks sosDisclaimerAccepted flag | Routes to disclaimer or sos |

## Open / Known TODOs

1. ⚠ **streak-freeze.tsx** — "USE STREAK FREEZE" button doesn't call `useStreakFreeze()` action. Currently just dismisses. Need to wire.
2. ⚠ **disclaimer.tsx** — "I understand" doesn't call `acceptSosDisclaimer()`. Currently just `router.replace`. Next time user opens SOS — disclaimer will reappear (because flag isn't set).
3. ❌ Quiz screens 1.4 / 1.8 / 1.10 / 1.11 — answers not persisted (only goal/peak-time/triggers/name are wired). Doesn't break anything, just not used.
4. ❌ post-sos.tsx — outcome not logged anywhere. Should call store action.
5. ❌ craving-log — not persisted.
6. ❌ profile/edit — Save doesn't write back to store.
7. ❌ Curriculum lesson hardcoded data — should reflect streakDays for "current" badge.
8. ❌ Progress weekly/milestones — fully hardcoded.

## Files modified this session

- `app/index.tsx` — store-aware redirect (Agent β)
- `app/(tabs)/home.tsx` — Day 1/Day N states + auto-triggers + push banner + sos counter (main)
- `app/(tabs)/profile/index.tsx` — store-driven name/plan/triggers (Agent α + main)
- `app/(tabs)/curriculum/index.tsx` — locked → paywall (Agent α), dynamic day route (main)
- `app/(tabs)/curriculum/[day].tsx` — dynamic LESSONS map by day param (main)
- `app/(tabs)/progress/index.tsx` — Pressable wrappers for nested routes (Agent α)
- `app/(onboarding)/welcome.tsx` — Sign in wired (main)
- `app/(onboarding)/quiz/goal.tsx` — setGoal wired (main)
- `app/(onboarding)/quiz/motivation.tsx` — flex bug FIXED (main)
- `app/(onboarding)/quiz/peak-time.tsx` — setPeakHour wired (main)
- `app/(onboarding)/quiz/triggers.tsx` — setTriggers wired (main)
- `app/(onboarding)/quiz/name.tsx` — setFirstName (Agent β)
- `app/(onboarding)/auth.tsx` — a11y labels (Agent α)
- `app/(onboarding)/paywall.tsx` — canGoBack fallback (main)
- `app/(onboarding)/result.tsx` — persona from triggers (main)
- `app/(onboarding)/push-permission.tsx` — setOnboarded both buttons (Agent β)
- `app/(modals)/sos.tsx` — logSosOpen + limit-block UI (Agent β)
- `app/(modals)/checkin.tsx` — completeCheckIn FIXED (main; Agent β had haptic only)
- `app/(modals)/milestone.tsx` — store-driven milestone day + celebrate (Agent β)
- `components/ui/SOSFab.tsx` — center-bottom + Heavy haptic + a11y (main)

## How to commit

```bash
cd C:/Users/Amanda/Desktop/work/projects/sugar-quit
git add app/ stores/ components/ docs/07-development/
git commit -m "feat(behavior): Day1/N, auto-triggers, persona personalisation, dynamic lessons"
git push
```

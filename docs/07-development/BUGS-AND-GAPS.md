# Sugar Quit — Bugs & Gaps Log

**Дата аудита:** 2026-04-20
**Источники проверки:** USER-FLOWS.md, SCREEN-MAP.md, WIREFRAMES.md, FEATURES.md, UX-SPEC.md
**Покрыто:** все 38 экранов + navigation + behavior

Классификация:
- **P0** — блокер запуска (broken UI / broken nav / missing P0 feature)
- **P1** — заметно ломает UX, нужно перед релизом
- **P2** — polish / nice-to-have

---

## A. Visual bugs (найдены в screenshots v7/v8/v10)

| # | Screen | Severity | Bug | Root cause | Fix |
|---|---|---|---|---|---|
| A1 | `(onboarding)/quiz/motivation` | P0 | Cards empty — текст options не рендерится, только radio circles справа | `flexDirection: 'row'` в `style` GlassCard ломает BlurView internal layout | Row flex inside children, не в card props — **✅ FIXED** this session |
| A2 | `(tabs)/progress` (dark theme) | P1 | Custom tab bar светлый даже в dark theme → бросается как inconsistency | `(tabs)/_layout.tsx` hardcoded light blur tint | Detect current route → dark tint when on progress |
| A3 | All tab screens | P1 | SOS FAB **right-bottom**, но по UX-SPEC.md §2.4 должен быть **center-bottom** | Мой default position in SOSFab | Fix default props to center, update layout math |
| A4 | Home | P2 | Ghost number "3:12" в peak card слишком ярко перекрывает body text | opacity 0.35 for primaryContainer too strong | Reduce to opacity 0.2 |
| A5 | Milestones (progress/milestones) | P2 | Custom tab bar показывается поверх нижнего ряда карточек, перекрывает "Day 60 / Day 90" | Scroll padding-bottom 120 insufficient for content width | Bump to 160 |

## B. Navigation bugs

| # | Screen | Severity | Bug | Fix |
|---|---|---|---|---|
| B1 | `(onboarding)/paywall` | P1 | Использует `router.back()` — если открыт через deep-link, back нет target | Use `router.canGoBack() ? router.back() : router.replace('/(onboarding)/result')` |
| B2 | `(onboarding)/welcome` "Sign in" link | P1 | `onPress={() => {}}` — ничего не делает | Route to `/(onboarding)/auth` (existing user skip-quiz path) |
| B3 | `(onboarding)/auth` "Continue with email" | P1 | `onPress={next}` — сразу идёт в push-permission, не просит email+password | Either show email form modal OR mark as "not implemented in skeleton" |
| B4 | `(tabs)/home` → SOS FAB → opens `/(modals)/sos` directly | P1 | Per USER-FLOWS Flow 2: **first-time SOS должен открывать disclaimer сначала** | Add first-time detection in state; if no `sos_disclaimer_accepted` flag → replace route to `/(modals)/disclaimer` |
| B5 | `(tabs)/home` check-in strip → `/(modals)/checkin` | OK if exists | Check wired correctly | Verify — strip onClick должен push checkin |
| B6 | `(tabs)/progress/index` tap на graph / milestones sections | P1 | Нет tap handlers — нельзя перейти на `/weekly` или `/milestones` | Wrap sections in Pressable → router.push to nested routes |
| B7 | `(tabs)/curriculum/index` locked phase card | P1 | Tap не ведёт на paywall — просто тусклая card | On Pressable of locked → `router.push('/(modals)/paywall-contextual')` |
| B8 | `(tabs)/profile/index` menu rows | P1 | Ни одна не wired (Edit profile, Notifications, Subscription, Settings, etc.) | Each `Pressable` → соответствующий route |

## C. Haptic feedback bugs (per UX-SPEC §4.2)

| # | Place | Current | Required | Notes |
|---|---|---|---|---|
| C1 | SOS FAB tap | Medium (`SOSFab.tsx`) | **Heavy** | Per spec §4.2 |
| C2 | Check-in submit | Light | **Medium** | |
| C3 | Streak increment animation | none | **Success notification** | In checkin step 3 |
| C4 | Milestone celebration | none | **Success notification** | In milestone modal on mount |
| C5 | Error / limit reached | none | **Error notification** | In paywall-contextual on open after limit hit |
| C6 | Tab switch | Selection (in custom tab bar) | **Selection** ✅ | OK |
| C7 | Quiz answer select | Light ✅ | Light | OK |
| C8 | Paywall tier select | Light ✅ | Light | OK |

## D. Missing behavior layer (Stage 3)

| # | Feature | Severity | Description | Files affected |
|---|---|---|---|---|
| D1 | Global state store | P0 | No source of truth for streak, days clean, sos counter, plan | New `stores/useUserStore.ts` |
| D2 | Persistence | P0 | Nothing saved — every reload loses state | AsyncStorage adapter in store |
| D3 | First-run detection | P1 | `app/index.tsx` always redirects to welcome. Returning users should go to home | Check AsyncStorage `onboarded` flag |
| D4 | Streak calculation | P0 | Hard-coded "8" in Home. No increment on check-in. | Store action `completeCheckIn()` increments streak or resets |
| D5 | Streak Freeze auto-trigger | P1 | When app opens after missed check-in → modal should auto-show | Effect in `(tabs)/_layout.tsx` on mount |
| D6 | Milestone auto-trigger | P1 | Day 1/3/7/14/30/60/90 should present milestone modal automatically | Effect in `(tabs)/home.tsx` or global watcher |
| D7 | SOS free-limit counter | P0 | "3 of 3 SOS" hardcoded in paywall-contextual. Should count actual SOS opens. | Store `sosUsedThisMonth` + monthly reset |
| D8 | Push re-permission banner | P1 | After 3 days of denied push → show top banner on home | Store `pushDeniedAt` + 3-day check |
| D9 | SOS disclaimer first-time gate | P0 | Already modal exists; need flag + redirect | Store `sosDisclaimerAccepted` flag |

## E. Accessibility gaps (per UX-SPEC §5)

| # | Element | Missing | Fix |
|---|---|---|---|
| E1 | SOS FAB | accessibilityLabel + hint | Add `accessibilityLabel="SOS — получить помощь с тягой к сахару"` |
| E2 | Streak counter | accessibilityLabel | `"Streak: 8 дней без сахара"` |
| E3 | Check-in 3 options | accessibilityLabel + role="radio" | Each option |
| E4 | Mood emoji picker | accessibilityLabel | Each emoji |
| E5 | Quiz cards | role="radio" / "checkbox" depending on type | |
| E6 | Paywall tiers | accessibilityLabel with price | |
| E7 | All interactive elements | минимум touch target 44×44 | Audit all Pressables |

## F. Reduce Motion / Accessibility

| # | Element | Issue | Fix |
|---|---|---|---|
| F1 | SOS Breathing circle (`(modals)/sos.tsx`) | Reanimated always loops, не смотрит на `AccessibilityInfo.prefersReducedMotion` | Use `useReducedMotion()` hook (reanimated has it) |
| F2 | Milestone confetti | Same — always animates | Skip confetti if reduced motion |
| F3 | Welcome illustration | Static OK ✅ | — |

## G. Content gaps (WIREFRAMES.md compliance)

| # | Screen | Missing element from wireframe |
|---|---|---|
| G1 | Home empty state (Day 1) | Not implemented — currently Home always shows Day 8 state |
| G2 | SOS chat offline fallback (`No internet` tips) | Not handled — chat assumes always online |
| G3 | Lesson "Mini-task" rating slider | Present (5 stones) — but no state persistence |
| G4 | Progress "Health Timeline" section | Missing from progress/index |
| G5 | Streak freeze count indicator on Home | Not shown (streak card just says "8 days clean") |
| G6 | Push re-permission banner | Not present on Home |

## H. Typography/spacing issues

| # | Issue | Location | Fix |
|---|---|---|---|
| H1 | Hero title slightly clipped on small screens | welcome.tsx, auth.tsx | Add `numberOfLines={3}` or smaller font on narrow width |
| H2 | SOS chat — on very long AI message, bubble exceeds screen width | (modals)/sos.tsx | `maxWidth: '85%'` on bubbles |
| H3 | Paywall pricing cards — Annual tier `$79.99` could wrap on smaller devices | paywall.tsx | `numberOfLines={1}` |

---

## Remediation plan (ordered, 8-hour window)

### Phase 1: Manual fixes (me, 30 min)
- [x] A1 motivation cards — FIXED
- [ ] A3 SOS FAB center-bottom position
- [ ] A4 Ghost number opacity
- [ ] A5 Milestones bottom padding
- [ ] B1 Paywall back → canGoBack fallback
- [ ] B2 Welcome "Sign in" route
- [ ] B4 SOS first-time disclaimer gate (basic flag via AsyncStorage)
- [ ] B6–B8 Wire missing tap handlers
- [ ] C1–C5 Haptic type fixes

### Phase 2: Parallel agents (45–60 min wait)

**Agent α — UI polish (read-write on files below, no overlap):**
- `components/ui/SOSFab.tsx` (center position default, Heavy haptic)
- `components/ui/GlassCard.tsx` (re-verify flex safe)
- All `.tsx` screens — add `accessibilityLabel` to interactive elements (E1–E7)
- `(tabs)/_layout.tsx` — dark tab bar variant based on route
- Reduce Motion support in `(modals)/sos.tsx` and `(modals)/milestone.tsx` (F1, F2)

**Agent β — Behavior layer (new files):**
- `stores/useUserStore.ts` — Zustand store with: days, streak, sosUsedThisMonth, onboarded, sosDisclaimerAccepted, lastCheckInDate, push state
- `stores/persist.ts` — AsyncStorage adapter (with `@react-native-async-storage/async-storage`)
- Wire store into: `app/index.tsx` (redirect logic), `(tabs)/home.tsx` (read streak), `(modals)/checkin.tsx` (action completeCheckIn), `(modals)/sos.tsx` (action logSosOpen), `(modals)/milestone.tsx` (auto-close after ack)
- Effect hooks: milestone auto-trigger, streak-freeze auto-trigger, push re-permission banner

### Phase 3: Visual regression (me, rate-limited batches)
- Re-screenshot all impacted screens, 5/batch with 10 s pauses
- Sanity check: все fixes применились, ничего не сломалось

### Phase 4: Final commit + audit doc
- Single commit per phase
- Update this BUGS-AND-GAPS.md with [x] / [ ] completion status
- Final summary for user wake-up

---

*Обновляется по ходу работы.*

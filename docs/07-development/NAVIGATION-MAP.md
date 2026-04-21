# Sugar Quit — Navigation Map

**Статус:** source of truth for all routes and transitions
**Источники:** USER-FLOWS.md + SCREEN-MAP.md + FEATURES.md
**Последнее обновление:** 2026-04-19

---

## Route Tree (Expo Router file layout)

```
app/
  _layout.tsx                       # Root Stack
  index.tsx                         # Entry redirect (→ (onboarding)/welcome for new user, → (tabs)/home for returning)
  (onboarding)/
    _layout.tsx                     # Nested Stack, headerShown: false
    welcome.tsx                     # 1.1
    quiz/
      _layout.tsx                   # Nested Stack with progress header
      goal.tsx                      # 1.2 Goal (quit / reduce)
      motivation.tsx                # 1.3 Motivation (health / energy / weight / challenge)
      sugar-goal.tsx                # 1.4 Sugar goal detail
    motivational-1.tsx              # 1.5 "127,000+ people"
    quiz/
      peak-time.tsx                 # 1.6 Peak craving time
      triggers.tsx                  # 1.7 Triggers (multi-select)
      consumption.tsx               # 1.8 Consumption level
    motivational-2.tsx              # 1.9 "75% not alone"
    quiz/
      past-attempts.tsx             # 1.10
      work-environment.tsx          # 1.11
      name.tsx                      # 1.12 (optional)
    loading.tsx                     # 1.13 Plan generation
    result.tsx                      # 1.14 "Your profile: Stress Eater"
    paywall.tsx                     # 1.15 (first paywall, post-result)
    auth.tsx                        # 1.16 Sign in with Apple/Google
    push-permission.tsx             # 1.17
  (tabs)/
    _layout.tsx                     # BottomTabs: home / curriculum / progress / profile
    home.tsx                        # 2.1 Daily dashboard
    curriculum/
      _layout.tsx
      index.tsx                     # 2.2.1 Overview (90-day path)
      [day].tsx                     # 2.2.2 Lesson (dynamic by day)
    progress/
      _layout.tsx
      index.tsx                     # 2.3.1 Progress overview
      weekly.tsx                    # 2.3.2 Weekly summary
      milestones.tsx                # 2.3.3 Milestones grid
    profile/
      _layout.tsx
      index.tsx                     # 2.4.1 Profile overview
      edit.tsx                      # 2.4.3 Edit profile
      settings.tsx                  # 2.4.2 Settings
      subscription.tsx              # part of 2.4.2
  (modals)/
    _layout.tsx                     # Stack with presentation: 'modal'
    sos.tsx                         # 3.1 SOS AI Chat (THIS IS THE ONE, not breathe)
    post-sos.tsx                    # 4.5 "Craving defeated?"
    checkin.tsx                     # 3.2 (3 steps: sugar / mood / complete)
    craving-log.tsx                 # 3.3 Quick log
    paywall-contextual.tsx          # 4.1 Contextual paywall (SOS limit, locked lesson)
    streak-freeze.tsx               # 4.2
    milestone.tsx                   # 4.3
    rate-app.tsx                    # 4.6
    disclaimer.tsx                  # 4.8 First-time SOS disclaimer
    share-card.tsx                  # 3.4
```

**Note**: `(modals)` group has `presentation: 'modal'` so all its screens appear as bottom sheets / full-screen modals with automatic dismiss behavior. `(onboarding)` and `(tabs)` are standard Stack / Tabs.

---

## Nodes Classified by Presentation

### Onboarding Stack (linear, 17 screens)
welcome → quiz/goal → quiz/motivation → quiz/sugar-goal → motivational-1 → quiz/peak-time → quiz/triggers → quiz/consumption → motivational-2 → quiz/past-attempts → quiz/work-environment → quiz/name → loading → result → paywall → auth → push-permission → (redirect to tabs/home)

### Tab group (parallel, 4 main + 6 nested)
- **home** (landing tab)
- **curriculum** (with nested /curriculum/[day])
- **progress** (with nested /weekly, /milestones)
- **profile** (with nested /edit, /settings, /subscription)

### Modal group (contextual overlays, 10 screens)
- **sos** (the SOS AI Chat — core feature, opened from FAB)
- **post-sos** (after sos → "defeated?")
- **checkin** (3-step flow in single file or separate: sugar / mood / complete)
- **craving-log** (quick log from Home quick action)
- **paywall-contextual** (repeat paywall, different from onboarding one)
- **streak-freeze** (offered when check-in missed)
- **milestone** (Day 1/3/7/14/30/60/90 auto-trigger)
- **rate-app** (after Day 7 milestone)
- **disclaimer** (first time opening SOS)
- **share-card** (preview + native share)

---

## Edges (Transitions)

### Flow 1 — First Launch

| From | Trigger | To |
|---|---|---|
| (system: app install) | launch | `(onboarding)/welcome` |
| `welcome` | tap "Begin" | `quiz/goal` |
| `welcome` | tap "Sign in" | `auth` (existing user path, skip quiz) |
| `quiz/goal` | tap "Continue" | `quiz/motivation` |
| `quiz/motivation` | tap "Continue" | `quiz/sugar-goal` |
| `quiz/sugar-goal` | tap "Continue" | `motivational-1` |
| `motivational-1` | tap "Continue" | `quiz/peak-time` |
| `quiz/peak-time` | tap "Continue" | `quiz/triggers` |
| `quiz/triggers` | tap "Continue" | `quiz/consumption` |
| `quiz/consumption` | tap "Continue" | `motivational-2` |
| `motivational-2` | tap "Continue" | `quiz/past-attempts` |
| `quiz/past-attempts` | tap "Continue" | `quiz/work-environment` |
| `quiz/work-environment` | tap "Continue" | `quiz/name` |
| `quiz/name` | tap "Continue" or "Skip" | `loading` |
| `loading` | auto after 5-8s | `result` |
| `result` | tap "Begin program" | `paywall` |
| `paywall` | tap "Start 7 days free" | Apple/Google pay → `auth` |
| `paywall` | tap "Maybe later" | `auth` (continues to free tier) |
| `paywall` | tap "×" | `router.dismiss()` → back to `result` |
| `auth` | Apple/Google success | `push-permission` |
| `push-permission` | tap "Turn on" or "Later" | `replace((tabs)/home)` |

### Flow 2 — SOS Craving Conversation

| From | Trigger | To |
|---|---|---|
| `(tabs)/home` | tap floating SOS | `(modals)/sos` — **first time**: `disclaimer` → `sos` |
| any `(tabs)/*` | tap floating SOS | `(modals)/sos` |
| `sos` | tap "End" or back | `post-sos` |
| `sos` | tap "×" (abandon) | confirmation → `router.dismiss()` |
| `post-sos` | tap "Defeated" / "Softer" / "Gave in" | `milestone` (if defeated + streak milestone) or `router.dismiss()` → home |
| `sos` (free limit reached) | AI receives message | `paywall-contextual` |

### Flow 3 — Daily Check-in

| From | Trigger | To |
|---|---|---|
| `(tabs)/home` | tap "Mark now →" check-in strip | `(modals)/checkin` |
| (system: push) | tap push | `(tabs)/home` + auto-open `(modals)/checkin` |
| `checkin` step 1 | tap sugar card | advance to step 2 (in-screen state) |
| `checkin` step 2 | tap mood | advance to step 3 |
| `checkin` step 3 | tap "Back to today" | `router.dismiss()` → home (updated streak) |
| missed yesterday | app open | `streak-freeze` modal before home |
| `streak-freeze` | tap "Use freeze" | `router.dismiss()` |
| `streak-freeze` | tap "Let it reset" | `router.dismiss()` (streak=0) |

### Flow 4 — Upgrade (contextual paywall)

| From | Trigger | To |
|---|---|---|
| `sos` | 4th SOS in month | `paywall-contextual` (soft) |
| `curriculum/[day]` | day > 3 and not premium | `paywall-contextual` |
| `profile/subscription` | tap "Upgrade" | `paywall-contextual` |
| `post-sos` | after 3rd defeated + not premium | `paywall-contextual` (soft upsell) |
| `paywall-contextual` | tap "Start trial" | Apple/Google pay → `router.dismiss()` |
| `paywall-contextual` | tap "Not now" / "×" | `router.dismiss()` |

### Flow 5 — Share Progress

| From | Trigger | To |
|---|---|---|
| `(tabs)/home` | auto at milestone (Day 1/3/7/14/30/60/90) | `milestone` |
| `milestone` | tap "Share this chapter" | `share-card` |
| `milestone` | tap "Back to today" | `router.dismiss()` |
| `share-card` | tap "Share" | native share sheet → `router.dismiss()` |

### Main navigation (bottom tabs)

| From | Trigger | To |
|---|---|---|
| any tab | tap Home tab icon | `(tabs)/home` |
| any tab | tap Curriculum tab icon | `(tabs)/curriculum` |
| any tab | tap Progress tab icon | `(tabs)/progress` |
| any tab | tap Profile tab icon | `(tabs)/profile` |
| any tab | tap floating SOS FAB | `(modals)/sos` |

### Curriculum internal

| From | Trigger | To |
|---|---|---|
| `curriculum` | tap current day card | `curriculum/[day]` |
| `curriculum` | tap locked day | `paywall-contextual` (if free + day > 3) |
| `curriculum/[day]` | tap "Mark complete" | back to `curriculum` with state update |
| `curriculum/[day]` | tap ← | back to `curriculum` |

### Progress internal

| From | Trigger | To |
|---|---|---|
| `progress` | tap graph | `progress/weekly` |
| `progress` | tap milestones section | `progress/milestones` |
| `progress` | tap "Share" | `share-card` modal |
| `progress/weekly` | tap ← | back |

---

## Current State (2026-04-19) vs This Map

### Exists in code (11 screens)
| Current route | Target route in map | Action |
|---|---|---|
| `/index.tsx` (Home) | `(tabs)/home` | **Move to (tabs)/home** |
| `/welcome.tsx` | `(onboarding)/welcome` | Move |
| `/progress.tsx` | `(tabs)/progress/index` | Move |
| `/profile.tsx` | **Ambiguous** — code shows Result screen ("Stress Eater") | **Move to (onboarding)/result**, create separate `(tabs)/profile/index` |
| `/sos.tsx` (Breathe) | — | **DELETE** — not in docs; breathing is a technique inside SOS chat, not a screen |
| `/chat.tsx` (AI chat) | `(modals)/sos` | **Rename to sos.tsx in modals group** |
| `/checkin.tsx` | `(modals)/checkin` | Move |
| `/curriculum.tsx` | `(tabs)/curriculum/index` | Move |
| `/lesson.tsx` | `(tabs)/curriculum/[day]` | Move + convert to dynamic route |
| `/paywall.tsx` | `(onboarding)/paywall` + `(modals)/paywall-contextual` | Current version fits onboarding paywall; also create smaller contextual variant |
| `/milestone.tsx` | `(modals)/milestone` | Move |

### Missing screens (to create)

**Onboarding (13 missing):**
- 9 quiz screens (goal / motivation / sugar-goal / peak-time / triggers / consumption / past-attempts / work-environment / name)
- 2 motivational (1 and 2)
- 1 loading
- 1 auth
- 1 push-permission

**Tabs (5 missing):**
- progress/weekly
- progress/milestones
- profile/index (the real profile, not result screen)
- profile/edit
- profile/settings (+ subscription sub-route)

**Modals (4 missing):**
- post-sos ("Defeated? Softer? Gave in?")
- craving-log (quick log, 3 fields)
- paywall-contextual (smaller, repeat-trigger paywall)
- streak-freeze
- rate-app
- disclaimer
- share-card

**Total to add:** ~22 new screens. **Total to re-home:** 11. **Total to delete:** 1.

---

## Broken transitions (current)

| Current | Problem | Fix |
|---|---|---|
| Paywall `×` → `router.back()` | no target when opened via deep link | use `router.dismiss()` |
| Paywall "Start 7 days free" → `router.push('/')` | should route through Auth → Push → Home | see Flow 1 final chain |
| Welcome "Begin" → `router.push('/')` | should go to quiz/goal | once quiz exists — redirect there |
| Home SOS FAB → `router.push('/sos')` → Breathe screen | should open AI Chat (current chat.tsx) | fix after rename |
| BottomNav "SOS" tab icon | ambiguous — is it chat? breathing? | remove from BottomNav; SOS is FAB only, not a tab |
| All `router.push(...)` between tabs | causes stack buildup | use `router.replace(...)` or native tab switch |

---

## Multi-agent split plan (for this project, now)

| Agent | Scope | Files owned |
|---|---|---|
| **A — Topology** | Navigation structure + layouts + shared constants | `app/_layout.tsx`, `app/index.tsx`, `app/(onboarding)/_layout.tsx`, `app/(tabs)/_layout.tsx`, `app/(modals)/_layout.tsx`, `constants/tokens.ts` |
| **B — Onboarding** | All onboarding screens EXCEPT layout | `app/(onboarding)/welcome.tsx`, `app/(onboarding)/quiz/*.tsx`, `app/(onboarding)/motivational-*.tsx`, `app/(onboarding)/loading.tsx`, `app/(onboarding)/result.tsx`, `app/(onboarding)/paywall.tsx`, `app/(onboarding)/auth.tsx`, `app/(onboarding)/push-permission.tsx` |
| **C — Tabs** | Main tab screens EXCEPT layouts | `app/(tabs)/home.tsx`, `app/(tabs)/curriculum/*.tsx`, `app/(tabs)/progress/*.tsx`, `app/(tabs)/profile/*.tsx` |
| **D — Modals** | All modal overlays EXCEPT layout | `app/(modals)/sos.tsx`, `app/(modals)/post-sos.tsx`, `app/(modals)/checkin.tsx`, `app/(modals)/craving-log.tsx`, `app/(modals)/paywall-contextual.tsx`, `app/(modals)/streak-freeze.tsx`, `app/(modals)/milestone.tsx`, `app/(modals)/rate-app.tsx`, `app/(modals)/disclaimer.tsx`, `app/(modals)/share-card.tsx` |
| **E — UI primitives** | Shared components | `components/ui/*.tsx` |

Agents B/C/D run in parallel. Agent A runs first (establishes layout), then B/C/D in parallel, then E in parallel with B/C/D.

---

*Single source of truth. Any code change touching navigation must update this file first.*

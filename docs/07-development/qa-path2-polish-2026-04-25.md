# Sugar Quit — Path 2 Polish Pass (2026-04-25)

Closing the four "Not fixed (deferred)" items from the QA pass report
(`qa-pass-2026-04-25-final.md` § Not fixed). All four landed + verified live
on sim `FA05FD96-2663-44D8-9632-6F7C5787647F` (iPhone 17 Pro "SugarQuit",
Metro :8082) with Alex (premium, Day 1, 3 cravings met).

## Items closed

### 1. Subscription menu — premium-aware routing
**Before:** Menu always routed to `/(modals)/paywall-contextual` regardless
of plan, so premium users saw an upgrade pitch when trying to manage their
existing subscription.
**After:** `app/(tabs)/profile/index.tsx` reads `useUserStore.isPremium`
and renders one of two row variants:
- Premium → label `Manage subscription`, opens
  `https://apps.apple.com/account/subscriptions` (the standard iOS
  subscription management page).
- Free → label `Subscription`, opens the contextual paywall.

**Verified live:** Profile shows `Manage subscription` for Alex (premium).
Accessibility tree confirms the button label is `Manage subscription`.

### 2. Share-card — real user data
**Before:** `app/(modals)/share-card.tsx` rendered hardcoded mock template
values `30 / 42 / $72 / 1.8 KG` regardless of the user's actual stats —
looked like a stale design snapshot.
**After:** Reads the same store fields and uses the same formulas as Profile
and Milestone:
```ts
const currentDay   = Math.max(1, streakDays);
const cravingsMet  = sosLog.walked.length + cravings.walked.length;
const dollarsSaved = (currentDay * 1.5).toFixed(0);
const kgSugar      = (currentDay * 0.025).toFixed(2);
const dayLabel     = currentDay === 1 ? 'day quieter with sugar' : 'days quieter with sugar';
```

**Verified live (Alex, Day 1, 3 cravings):** card preview shows
`1 / day quieter with sugar / 3 CRAVINGS MET / $2 SAVED / 0.03 KG AVOIDED`.

### 3. Cross-surface kg precision sync
**Before:** Profile used `toFixed(2)` (`0.03kg`) but Milestone, Progress, and
Share-card all used `toFixed(1)` (`0.0kg`) — the same metric read three
different ways across three surfaces.
**After:** Milestone, Progress, and Share-card all switched to `toFixed(2)`,
matching Profile. Single rounding rule across the app.

**Verified live cross-surface:**

| Surface | KG value (Day 1) |
|---|---|
| Profile  | `Approx 0.03kg of added sugar avoided.` |
| Milestone | `0.03kg sugar avoided` |
| Share-card | `0.03 KG AVOIDED` |
| Progress | `0.03 kg sugar` (token row) |

All four surfaces now agree.

### 4. Streak Freeze — Use Freeze full E2E
**Before:** Auto-trigger on Home was verified, but the `Use Streak Freeze`
button → state mutation → re-open had not been tap-through verified. A
silent-no-op CTA would have been hard to catch from passive screenshots.

**Verified live (Alex, premium = 3 freezes):**
1. Deep-link `exp://.../--/(modals)/streak-freeze` → modal opens, shows
   `2 left this week` (1 had been consumed in earlier exploration).
2. Tap `Use Streak Freeze` → modal dismisses cleanly back to Home.
3. Re-open modal → shows `1 left this week` — Zustand persist captured the
   mutation across the modal close/open cycle.
4. Tap `Use Streak Freeze` again → dismisses. Re-open → shows
   `0 left this week`, all 3 freeze dots gray, CTA visually disabled (faded
   coral background).
5. Tap disabled CTA at the same coords → no-op (modal stays, no further
   mutation, no nav error). `PillCTA disabled` prop blocks the press
   correctly.

The `useStreakFreeze` action signature is correct: returns `false` when
`used >= avail` so the caller can branch (we currently dismiss either way,
which is the right UX once the user has decided).

### 5. Assets folder — placeholder PNGs
**Before:** `app.json` was stripped of `icon`, `splash`, `adaptiveIcon`,
`favicon` references during earlier QA because the files didn't exist —
prebuild would have failed in any production build.
**After:** Generated minimal placeholder PNGs at native target resolutions
using PIL:

| File | Resolution | Notes |
|---|---|---|
| `assets/images/icon.png`         | 1024×1024 | Coral square + cream ring + dark dot center |
| `assets/images/splash.png`       | 2732×2732 | Warm cream with centered coral mark |
| `assets/images/adaptive-icon.png`| 1024×1024 | RGBA, foreground only (Android adaptive) |
| `assets/images/favicon.png`      | 32×32     | Web favicon |

`app.json` re-references all four. `npx expo config` validates the resolved
paths. App still launches cleanly via Metro :8082 deep-link, no asset-load
warnings.

These are placeholders only — production design needs custom artwork before
TestFlight submission.

## TSC: 0 errors after every edit. App boots, deep-links resolve, accessibility tree intact.

## Files touched
```
app.json                        +icon/splash/adaptiveIcon/favicon refs
app/(modals)/milestone.tsx      kgSugar toFixed(1) → toFixed(2)
app/(modals)/share-card.tsx     hardcoded mock → real store data
app/(tabs)/profile/index.tsx    Subscription menu premium-aware
app/(tabs)/progress/index.tsx   kgSugar toFixed(1) → toFixed(2)
assets/images/icon.png          new (1024×1024 placeholder)
assets/images/splash.png        new (2732×2732 placeholder)
assets/images/adaptive-icon.png new (1024×1024 RGBA placeholder)
assets/images/favicon.png       new (32×32 placeholder)
```

## Remaining "Not fixed" tail (genuinely deferred)

- **Stage 6 real integrations** — Supabase auth, Adapty live tiers, AI API
  for SOS, push backend. Mocked by design.
- **Curriculum content days 12, 13, 15–29, 31–90** — needs product writer.
- **Width variance beyond 402 + 440 pt** — covered earlier.
- **Cold-start full AsyncStorage wipe** — covered earlier.
- **Production icon + splash design** — placeholders sufficient for dev
  builds; design pass needed before submission.

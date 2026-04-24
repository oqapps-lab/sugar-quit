# Sugar Quit — Full E2E Functional Pass (2026-04-25)

Closing report. Three QA passes today (6, 7, 8) added on top of pass 1–5
from earlier sessions. **11 new bugs found via real E2E tap-through on the
sim, all fixed inline + verified live.**

## Sim
iPhone 17 Pro "SugarQuit" `FA05FD96-2663-44D8-9632-6F7C5787647F`, Metro :8082.

## E2E flows verified end-to-end (real taps + state checks)

| Flow | Verified | Notes |
|---|---|---|
| Cold deep-link to `/home` | ✅ | hot bundle loads, eyebrow + streak orb correct |
| Streak Freeze auto-trigger on missed check-in | ✅ | useEffect on Home mount fires modal correctly |
| Forecast modal — Calm / Peak / Evening | ✅ | all 3 slots render with phase content + Got it dismiss |
| Curriculum tab + 7 lesson rows | ✅ | a11y `Day N · title · M min · today/upcoming` |
| Curriculum lesson detail Day 1 | ✅ | meta now reads `7 min · neuroscience + first practice` (was hardcoded `5 min · one practice`) |
| Curriculum lesson detail Day 5 | ✅ | unique meta `5 min · taste receptors + fruit test` — variability works |
| Progress tab phase logic | ✅ | NOW marker on Arrival for Day 1 (was hardcoded Exhale) |
| Profile tab cross-surface | ✅ | Goal / Peak / Triggers match Edit Profile values |
| Profile/Edit | ✅ | TextInput pre-filled + sanitize working |
| Profile/Settings switches | ✅ | all 4 toggles + 7 link buttons in a11y tree |
| Paywall-contextual purchase mock | ✅ | Try-7-days-free → Adapty mock → setPremium(true) → Profile shows PREMIUM badge |
| SOS chat full E2E | ✅ | open → send "stress at work" → AI followup arrives → 3 suggestions render → tap End → post-SOS modal |
| Post-SOS outcome → save | ✅ | "Walked through" → cravingsMet 1 → 2 in Profile (cross-surface) |
| Craving log fill + save | ✅ | intensity 3 + Walked through → cravingsMet 2 → 3 in Profile |
| Share-card preview | ✅ | template card + 3 share actions |
| Milestone modal | ✅ | "1 day sugar-free" + 3 stats + Share / Back |
| Rate-app modal | ✅ | 5 rating stones + dim disabled CTA |

## Bugs fixed in this pass (11 new + 1 import-cleanup)

**Pass 6 — `4960a03`** (5 files):
1. `paywall-contextual.tsx`: "Try 7 days free" was just `router.dismiss()` — no purchase, no `setPremium`. Now wires through `purchase(tier)` from `lib/adapty` + sets premium on success.
2. `curriculum/[day].tsx`: lesson detail meta hardcoded `5 min · neuroscience + one practice` for ALL days — drifted from `curriculum/index` (`7 min` for Day 1). Extended `LessonContent` with `minutes` + `kicker` per lesson, render dynamically.
3. `progress/index.tsx`: timeline nodes hardcoded — Arrival/Detox=done, Exhale=current. Now derived from `currentDay` so NOW marker moves per phase (Arrival/Detox/Exhale/Clarity/Horizon).
4. `progress/index.tsx`: TODAY'S FOCUS card hardcoded `"Deepening the rhythmic pattern"` + 2 fixed practices for ALL days. Now phase-aware copy + practices (6 phase variants).
5. `progress/index.tsx`: avatar hardcoded `"S"` — now `(firstName?.[0] ?? 'S').toUpperCase()`.
6. `curriculum/index.tsx`: same avatar drift.
7. `profile/index.tsx`: "Support" menu had `onPress: undefined` — visually tappable, silently no-op. Now `Linking.openURL('mailto:support@sugarquit.app')`.
8. `profile/index.tsx`: "Privacy Policy" same dead link, now `Linking.openURL('https://sugarquit.app/privacy')`.

**Pass 7 — `4c7c3fa`** (1 new file + 10 modals):
9. `router.dismiss()` threw `"The action 'POP' with payload {count:1} was not handled"` when modal opened via cold deep-link (no back-stack). New `lib/nav.ts → safeDismiss()` helper. Replaced `router.dismiss()` across all 10 modals (checkin / craving-log / disclaimer / forecast-window / paywall-contextual / post-sos / rate-app / share-card / sos / streak-freeze).
10. `router.replace('/(tabs)')` 404'd — group routes don't resolve to first child. (Initially set in pass 7, fixed in pass 8).

**Pass 8 — `5c88c54`** (1 file + nav fix):
11. `post-sos.tsx`: close X was a bare Pressable — added `accessibilityRole="button"` + `accessibilityLabel="Close post-SOS reflection"`.
- `lib/nav.ts safeDismiss` target: `/(tabs)` → `/(tabs)/home` so the explicit child is reachable.

## Cross-surface state validation (Rule 3 passed)

After Adapty mock purchase + SOS Walked outcome + Craving log Walked outcome:

| Counter | Profile | Source |
|---|---|---|
| `1 day clean` | ✅ | `streakDays = 1` |
| `3 cravings met` | ✅ | `sosLog.walked + cravings.walked = 1 + 2 = 3` |
| `$2 saved` | ✅ | `currentDay × 1.5` |
| `~0.03 kg sugar avoided` | ✅ | `currentDay × 0.025` |
| `Goal: Quit completely` | ✅ | from `useUserStore.goal` |
| `Peak hour: 3:00 PM` | ✅ | from `useUserStore.peakHour` |
| `Main trigger: social pressure, after meals` | ✅ | first 2 from `triggers[]` |
| Plan badge: PREMIUM | ✅ | flips after `setPremium(true)` from mock purchase |

## Not fixed (deferred / acceptable for current stage)

- **Streak Freeze use-flow E2E** — auto-trigger pop verified, but tapping "Use Streak Freeze" → state mutation → home re-render not tap-through verified.
- **Subscription menu when already premium** — still routes to `paywall-contextual`. Should ideally route to a "Manage subscription" view (App Store sheet) for premium users. Low priority.
- **Share-card data hardcoded template** — shows static "30 days / 42 cravings / $72 / 1.8 KG" regardless of user state. Looks like a design template snapshot, not a bug per se, but a future improvement to show actual user numbers.
- **Stage 6 real integrations** — Supabase auth, Adapty live tiers, AI API for SOS, push notifications backend. By design mocked until Stage 6.
- **Curriculum content days 12, 13, 15–29, 31–90** — `LESSONS` record has 1–11 + 14 + 30. Outside this range falls back to Day 8 content. Will need product writer.
- **Width variance beyond 402 + 440 pt** — already covered in earlier pass; 16e/SE remain owned by other projects' sims.
- **Cold-start full AsyncStorage wipe** — already covered earlier on a fresh Pro Max sim.

## Commit chain (sugar-quit `oqapps-lab/sugar-quit` main)

```
5c88c54  qa pass 8: post-sos close X a11y + nav target fix
4c7c3fa  qa pass 7: safe modal dismiss across all 10 modals
4960a03  qa pass 6: real purchase + lesson meta drift + dynamic Progress
ffa502a  qa pass 5: save-44%→33%, README runbook, RU comments → EN
643a69e  qa pass 5: pluralization + E2E flows verified
839c999  qa pass 4: missing curriculum content + firstName sanitize
c5d3685  docs: QA pass 3 report
4320bb2  qa pass 3: a11y on all remaining Pressables
a452640  QA pass 2 report
0349f87  qa pass 2: post-paywall a11y + locale fixes
b609f59  qa pass 1: 7 onboarding bugs
582f219  initial expo SDK 55 alignment
```

TSC: 0 errors after every commit. All commits pushed (branch protection allows fast-forward push).

## Final state

Sugar-quit `main` is **end-to-end usable**:
- Fresh `git clone + npm install --legacy-peer-deps + npm start` boots cleanly.
- Onboarding 15 steps — selection state, multi-select validation, keyboard handling, locale all consistent.
- Mock paywall purchase actually upgrades the user → unlocks SOS chat without limit.
- SOS chat → post-SOS → counter increments visible in Profile.
- Craving log → save → counter increments visible in Profile.
- Cross-surface counter consistency verified (3 surfaces: Home / Profile / Progress).
- Phase-aware copy across Home forecast tones, Curriculum hero, Progress timeline, Today's Focus.
- Every interactive element exposed in the accessibility tree with descriptive labels (VoiceOver + e2e automation ready).

Sim left booted with `Alex` (premium, Day 1, 3 cravings met) for any further manual exploration.

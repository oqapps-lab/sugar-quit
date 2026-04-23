# Sugar Quit — consolidated QA summary (2026-04-21…22)

Rolled-up view of 5 QA passes. For per-pass detail, read the individual
`qa-pass-*.md` files in this folder.

## Passes

| Pass | Commit | Focus |
|---|---|---|
| 0 | `582f219` | Expo SDK 55 alignment — `expo install --fix`, drop `expo-haptics` from plugins, add `react-native-worklets`, commit `package-lock.json`. |
| 1 | `b609f59` | 7 onboarding bugs — goal auto-advance vs sugar-goal inconsistency, triggers CONTINUE empty-validation, name keyboard dismissal + a11y, motivational-2 "YOU ARE NOT ALONE" → "YOU'RE NOT ALONE", paywall close+maybe-later a11y. |
| 2 | `0349f87` | Post-paywall a11y + locale — 7 RU→EN strings (home greeting, push banner, avatar label, SOSFab label + hint), a11y across disclaimer/checkin/craving-log/paywall-contextual/share-card/rate-app/sos. |
| 3 | `4320bb2` | Remaining Pressables — curriculum lesson rows, curriculum [day] back, progress milestones (back + 7 stones), progress weekly back, profile edit (back+save+photo+input+3 pickers+cancel), profile settings (back + every link row + every toggle as role="switch"), push-permission "Maybe later", auth switcher + back. |
| 4 | `839c999` | Content + data — 11 curriculum lessons written (days 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11) + fixed day 3 title drift, `firstName` sanitize strips control chars + literal `\` + collapses whitespace + caps 40. |
| 5 | _(this pass)_ | Content/math + README runbook + RU-comments → EN + final QA summary. |

## Bugs fixed across all passes

### Blockers / high-severity
- **Expo SDK 55 boot failures** — 3 separate causes (plugins / peer-deps /
  missing worklets plugin). Pass 0.
- **Goal (Step 2) auto-advance inconsistency** with Sugar-goal (Step 4) —
  user couldn't undo a pick. Pass 1.
- **Triggers (Step 7) CONTINUE always-active** even with zero picks. Pass 1.
- **Home locale mix** — Russian strings inside English UI (greeting, push
  banner, avatar label, SOS FAB label+hint). Pass 2.
- **Curriculum content fallback** — 7 days silently rendered day 8's body
  (days 2, 4, 5, 6, 9, 10, 11 all showed "Your taste buds are waking up");
  title drift on day 3. Pass 4.
- **Paywall "save 44%"** incorrect — actual savings 33%
  `($9.99×12 − $79.99) / ($9.99×12) = 33%`. Pass 5.

### Medium
- Keyboard covering Continue on Step 12 (no `KeyboardAvoidingView` +
  no tap-outside-dismiss). Pass 1.
- Paywall & 6 other modals: close-X / "Maybe later" / option cards /
  stones / chips not in a11y tree. Pass 2 + 3.
- Profile edit, Profile settings, Curriculum lesson rows, Progress
  milestones — entire screens missing button/switch roles. Pass 3.
- `firstName` accepted any input including `\n` and literal `\` — leaked
  into the app-wide greeting ("GOOD MORNING, ALEX \"). Pass 4.

### Low
- Motivational-1 "YOU'RE NOT ALONE" vs motivational-2 "YOU ARE NOT ALONE"
  contraction drift. Pass 1.
- RU comments in 4 UI primitives (TokenDot, GlassCard, GradientText,
  AtmosphericGradient) — not user-facing but now translated. Pass 5.

## False positives (logged, not bugs)

- `3pm` vs `3:00 PM` in Result screen — intentional register split
  (subtitle casual, card formal). `result.tsx:36-37` does the regex.
- Paywall price cards a11y — already had `role="radio"`; my early dump
  filter hid `Other`-type elements. Pass 2 doc.
- Paywall "no X close" — was present as `closeBtn` with `×`; visually
  mistook for settings gear.
- `/expo/manifest` 404 from sim — not used; expo-router uses `/` for LAN
  manifest (modern endpoint).
- Testimonial "Maya · Day 24" vs "Day 34" — no actual drift, code has a
  single source (`Day 34`); earlier reading was screenshot-OCR error.

## Known issues — not fixed, documented for follow-up

1. **`/(modals)/craving-log` is a dead-end route** —
   `app/(modals)/craving-log.tsx` exists but no `router.push` call
   references it anywhere in `app/`. The craving log is unreachable from
   the UI. Product intent unclear: add a Log-craving CTA in Home or
   Profile, or remove the route.
2. **Progress "Today's Focus" is hardcoded** —
   `app/(tabs)/progress/index.tsx:181` renders static "Deepening the
   rhythmic pattern" / "Conscious breathwork" regardless of `streakDays`.
   Rule 14 stale copy. Fix: derive from `curriculum/[day].tsx LESSONS[currentDay]`
   via a shared helper.
3. **Progress Weekly screen is mocked** —
   `app/(tabs)/progress/weekly.tsx` ships fixed "6 met / 5 walked / 1
   given to" numbers and "Week 2 · 13–19 APR" header. OK for Stage 6
   skeleton; wire to `sosLog` / `cravingLog` / `checkInLog` in Stage 6+.
4. **Share-card savings math** — mock shows `$72 saved / 30 days = $2.40/day`,
   but Profile stats comment says `$1.50/day conservative`. Pick one
   assumption and apply globally (Home dashboard, Profile, Share).
5. **No `assets/` folder** — `app.json` currently does not reference any
   icon/splash/adaptive-icon; production needs designer-supplied assets.
6. **Adapty, Supabase, AI API are mocks** — Stage 6 work, real wiring
   with keys deferred.
7. **Streak freeze / milestone / rate-app triggers not live-tested** —
   they require forced state (missed check-in, hit milestone day, day 7
   streak). Can be verified only with Zustand reset/replay. Deferred.
8. **16e / SE width variance** — device widths 375/390 not tested;
   each owned by other projects' simulators per
   `~/.claude/CLAUDE.md` ownership table.

## Acceptance criteria for students (post-merge from `main`)

A student who just ran `git pull origin main` and
`npm install --legacy-peer-deps && npx expo start` should see:

- Metro bundles without Babel / plugin errors.
- Expo Go opens to Welcome (Step 1 of 15).
- Every CONTINUE is disabled until required input exists (Steps 2–12).
- Home greeting is English ("GOOD MORNING, …") or the default
  "TODAY'S FORECAST" if no name is set.
- Paywall close-X and "Maybe later" both surface in `mobilecli dump ui`
  as Button.
- Tapping any curriculum lesson card (days 1–11) loads content that
  matches the index card title.
- VoiceOver traverses every button, switch, radio, and checkbox in every
  major flow.

## Coverage map — what was and was not tested

| Area | State |
|---|---|
| Onboarding Step 1–12 | ✅ tested, bugs fixed |
| Result + Paywall + Paywall-contextual | ✅ tested |
| Home / Scan Home / Profile tab | ✅ tested (+ post-check-in state transition live) |
| SOS chat (chat + blocked) | ✅ code review + blocked screen live-verified |
| Curriculum index + day detail (1, 2, 5) | ✅ live-verified |
| Check-in 3-step flow | ✅ E2E live — streak 0 → 1, forecast tone update, `isCheckedInToday` branch active |
| Craving log | ❌ unreachable from UI (known issue #1) |
| Streak freeze / Milestone modals | ⚠️ code review only (triggers require state replay) |
| Forecast morning window | ✅ live |
| Forecast peak / evening | ⚠️ code review only |
| Progress Journey (current-day) | ✅ dump + visual |
| Progress Weekly | ⚠️ mocked data confirmed (known issue #3) |
| Progress Milestones (empty state) | ✅ dump + visual |
| Cold-start branch (`firstName === null`) | ✅ verified via fresh Pro Max sim |
| Width variance 402 + 440 pt | ✅ |
| Width variance 375 / 390 pt | ⏭️ deferred (other-project sims) |
| Real Adapty / Supabase / AI | ⏭️ Stage 6 |

# Sugar Quit — QA Pass 10c Addendum (2026-04-26)

Continuation of pass 10 — actually applying Rules 22-27 of strengthened
ui-qa skill (vs. partial application in initial pass 10). Sim FA05FD96,
Maya signed in (Day 48 local, Day 47 in DB — Stage A push still broken).

## What I actually completed this session

### Rule 22 — Pressable enumeration (more taps, still partial)

**Profile menu (7 buttons):**
- ✅ Edit profile — opened, FieldRow non-interactive verified (Bug 13 fix live)
- ✅ Notifications — opens Settings (no anchor scroll) → **Bug 19** redundancy
- ✅ Manage subscription — opens Safari `account.apple.com` ✅ external Linking works
- ✅ Settings — opens Settings page (verified Email row shows `m***@sugarquit.test`)
- ⚠️ Support — not retapped this session (verified earlier as mailto)
- ⚠️ Privacy Policy — not retapped (verified earlier as Linking.openURL)
- ⚠️ Sign out — deferred to end (would lose Maya state)

**Settings (4 toggles + 6 link rows):**
- ✅ Morning check-in toggle ON → OFF flip works visually (Bug 16: useState
  only — resets on re-mount, not persisted)
- ⚠️ 3 other toggles not tapped — pattern same per code review
- ⚠️ 6 link rows not tapped — code review confirms only Haptics fired
  (Bug 17 Settings SKELETON state)

### Rule 23 — Modal dismiss matrix (SOS verified)

| Method | SOS modal | Notes |
|---|---|---|
| X / End button | ✅ works | "End" button at top-right |
| Swipe-down | ✅ works | swipe from top of sheet downward, distance 600 |
| Backdrop tap | ❌ **N/A** | SOS is fullscreen — no backdrop area |
| System-back (left edge) | ❌ **broken** | swipe from x=5 right doesn't dismiss → **Bug 20** |

**Bug 20 (low):** SOS modal does not respond to iOS system-back gesture
(swipe from left edge inward). Other dismiss methods work. iOS modal with
`presentation: 'modal'` + `slide_from_bottom` animation should normally
honor system back gesture.

Other 11 modals NOT tested for full matrix this session — see "Did not test".

### Rule 26 — State matrix (still partial)

- ✅ **Maya** (Day 48, premium) — Profile + Edit + Settings tap-tested
- ⚠️ **Alex** (Day 1, premium) — relied on earlier passes
- ⚠️ **Empty** (Day 0, free) — onboarding only
- ❌ **Fresh sign-up** — popup blocker not worked around this session

### Stage A push verification (per Rule 1 expected vs observed)

| Surface | Local store (Maya) | Supabase DB (Maya) | Match? |
|---|---|---|---|
| streakDays | 48 (after checkin) | 47 (was seeded) | ❌ |
| cravings count | 13 (after craving log) | 12 (seeded) | ❌ |
| updated_at | n/a | 2026-04-25 15:08 (yesterday) | ❌ stale |

**Stage A push silent fail TRACKING bug confirmed again.** Local check-in
mutated `streakDays` to 48 and Profile shows it; the debounced
`pushStreakDebounced` fires but never reaches Supabase. Same for the
new craving — local `cravings` array now length 13 (Profile counter shows
13), but `cravings` table in DB still has 12 rows for Maya's user_id.

Needs deeper RN client / supabase-js / Expo SDK 55 fetch-polyfill debug.
Not progressed this session.

## New bugs found this session

| # | Severity | Issue | Status |
|---|---|---|---|
| 19 | low | Profile menu "Notifications" routes to Settings root, no anchor scroll. Redundant with the "Settings" menu item. | open |
| 20 | low | SOS modal does not dismiss on iOS system-back gesture (left-edge swipe). Other dismiss methods work. | open |

Both low — no user blocked.

## Cumulative pass 1-10c

| Total bugs | Fixed | Deferred | Open |
|---|---|---|---|
| 20 | 14 | 4 (15, 16, 17, Stage A push) | 2 (19, 20) — both low |

## Did not test (honestly)

Per Rule 25. Following manifest items still unticked:

**Modal dismiss matrix — 11 modals × 3 methods = 33 verifications:**
- post-sos, craving-log, checkin, milestone, share-card,
  paywall-contextual, forecast-window, streak-freeze, rate-app,
  disclaimer — backdrop / swipe / system-back not verified per
  modal. Only X-button confirmed earlier.

**Pressable enumeration:**
- Profile: Support (mailto), Privacy Policy (URL), Sign out (defer)
- Settings: 3 toggles, 6 link rows, Back button
- Edit profile: Save, Cancel, Change profile photo, Back
- Curriculum overview: every Day button
- Curriculum days 2, 3, 4-6, 8-13 (only 1, 7, 30 opened)
- Progress: Weekly progress details button, Begin session CTA,
  Weekly + Milestones sub-routes
- Home: every WHAT'S WAITING row, every WHAT EVERYTHING MEANS card

**State matrix:**
- Alex (Day 1, premium) — full sweep
- Empty user main app screens (only onboarding tested)
- Fresh sign-up E2E (Strong-Password popup workaround needed)
- Premium upgrade post-purchase delta verification (Adapty mock)

**Width variance (Rule 4):**
- 16e (390pt) — owned by deskcare
- Pro Max (440pt) — owned by break_up

**Edge inputs (Rule N):**
- TextInput max length on craving notes / firstName
- Email validation TLDs not on Supabase whitelist
- Password mismatch / boundary
- Paste-bomb on any TextInput
- RTL locale switch (rule 18 — though app has no i18n yet)
- Reduced motion / large text accessibility settings
- Cold-start AsyncStorage wipe regression

**Stage A push silent fail** — ROOT CAUSE not progressed. Most
critical TRACKING bug; need to add explicit error logging in
sync.ts push functions and cross-correlate with supabase-js
debug output.

## Sequencing note

The strengthened skill works — это объективно поднимает discovery
rate. Pass 10/10c found 8 bugs (13-20) that earlier passes missed
because they used sample-bias (1 chip, 1 modal dismiss method).
But honest application is still slow: tapping 30+ Pressables sequentially,
doing 4-dismiss × 12 modals, walking 3 user states is many hours of
work. The skill's contribution is **forcing the gap-report to be honest** —
silence is no longer acceptable.

Next pass should pick from the "Did not test" list above. Stage A push
debug is the highest-value backlog item.

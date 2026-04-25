# Sugar Quit — Stage A Supabase Backbone (2026-04-25)

End of mock-only state. Auth + database + sync layer + cross-account isolation
all live on `oqapps-lab/sugar-quit` main and verified against the user's own
Supabase project (`mzgierbwqegichdznsub`, eu-west-1, Postgres 17).

## What landed

### 1. Database schema (`supabase/migrations/0001_init.sql`)

Four tables, all with owner-only RLS (`auth.uid() = user_id`):

| Table       | Cardinality            | Purpose |
|-------------|------------------------|---------|
| `profiles`  | 1 row per user (PK = `user_id`) | identity, quiz answers, premium flag, push state |
| `streaks`   | 1 row per user (PK = `user_id`) | running counters: streak/best/check-in/freezes/sos limits/milestones |
| `cravings`  | many per user           | craving log: ts, intensity 1-5, triggers, outcome (walked/gave), notes |
| `sos_log`   | many per user           | SOS sessions: started_at, outcome (walked/softer/gave) |

Two utility triggers:
- `set_updated_at` on profiles + streaks — auto-stamps `updated_at` on UPDATE.
- `on_auth_user_created` on `auth.users` — auto-inserts an empty profiles +
  streaks row whenever Supabase creates an auth user. Means sign-up never
  has to chain explicit "create profile" calls; the row is there before the
  first push.

Indexes: `(user_id, ts desc)` on cravings, `(user_id, started_at desc)` on
sos_log — keeps the per-user timeline scans cheap.

`sos_free_limit` stores `9999` as the proxy for `Infinity` (premium tier);
the sync layer translates back at pull time.

### 2. Sync layer (`lib/sync.ts`)

Local Zustand store remains the single source of truth for UI reads. Each
mutation writes through to Supabase fire-and-forget (offline = silent skip;
the next session pull reconciles).

- `pullUserData(userId)` — `Promise.all` of profile + streaks + cravings +
  sos_log; returns a partial UserState the store can merge in one `setState`.
- `pushProfileDebounced` / `pushStreakDebounced` — 250 ms debounce; coalesces
  rapid bursts (typing in onboarding text inputs, tapping multiple checkboxes).
- `pushCraving` / `pushSosOpen` / `pushSosOutcome` — immediate inserts/updates;
  these are user-visible mutations that should hit cloud right away.

Push errors log to `console.warn` and otherwise stay silent — by design, so
flaky network never blocks the UI thread.

### 3. Store extension (`stores/useUserStore.ts`)

New state: `userId`, `email`, plus three new actions:
- `setSession({ userId, email })` — set identity (called by auth bootstrap and
  sign-in screen).
- `clearSession()` — full reset to `initialState`.
- `hydrateFromCloud()` — async: pulls Supabase data and merges via `set`.

Every existing mutating action (`setFirstName`, `setGoal`, …, `logCraving`,
`completeCheckIn`, `useStreakFreeze`, `markMilestoneCelebrated`, `setPremium`,
`logSosOpen`, `logSosOutcome`, `markPushDenied`, `acceptSosDisclaimer`)
now calls the matching push helper if `userId` is set. Local-only behaviour
when offline / unauthenticated is preserved.

`partialize` extended to persist `userId` + `email` so cold starts avoid an
auth round-trip before paint.

### 4. Auth screens (`app/(auth)/`)

Three new files, no edits to existing screens:
- `sign-in.tsx` — "Welcome back." Email + password, ≥6 char validation, inline
  error text, `KeyboardAvoidingView` + `ScrollView`. On success: mirrors
  session into the store, awaits `hydrateFromCloud`, then routes
  `onboarded ? '/(tabs)/home' : '/(onboarding)/welcome'`. The eager pull is
  the difference between landing on the right screen and racing past the
  `_layout` listener.
- `sign-up.tsx` — "Begin your chapter." Adds confirm-password field, mirrors
  session into the store, then routes to onboarding (new accounts are by
  definition not onboarded — the auto-trigger handled the empty profile).
- `_layout.tsx` — `<Stack>` with two screens, fade animation, cream backdrop.

Visual language matches existing modals (atmospheric gradient, aura blobs,
PillCTA, soft glassmorphism on inputs).

### 5. Router gate (`app/index.tsx` + `app/_layout.tsx`)

Three-way gate at root:
1. Persisted store hydrating → cream canvas (no flicker).
2. Supabase configured + no `userId` → `/(auth)/sign-in`.
3. Signed in → `onboarded ? /(tabs)/home : /(onboarding)/welcome`.

`_layout.tsx` mounts an `onAuthStateChange` listener that mirrors the session
into the store. On `SIGNED_IN` (or `INITIAL_SESSION` for a different user)
it triggers `hydrateFromCloud`, so cold starts under a previously-signed-in
user land on Home with cloud-canonical data instead of stale local cache.

### 6. Sign-out (`app/(tabs)/profile/index.tsx`)

New "Sign out" menu row at the bottom of the Profile menu — calls
`signOut` + `clearSession` + `router.replace('/(auth)/sign-in')`. Email
is now displayed as a small label under the plan badge.

## Test data seeded

Three accounts via `/auth/v1/admin/users` (all password `SugarQuit2026!`):

| Email                  | UUID prefix | First name | Premium | Streak | Cravings | SOS | Milestones |
|------------------------|-------------|------------|---------|--------|----------|-----|------------|
| empty@sugarquit.test   | ae999b38…  | (null)     | no      | 0      | 0        | 0   | (none)     |
| alex@sugarquit.test    | 2d43f774…  | Alex       | yes     | 1      | 3        | 1   | {1}        |
| maya@sugarquit.test    | 1293f597…  | Maya       | yes     | 47     | 12       | 4   | {1,3,7,14,30} |

`supabase/seed.sql` is idempotent — re-running it re-seeds the same shapes
on top of any local edits, so QA loops are reproducible.

## E2E QA — what was actually tap-verified on sim FA05FD96

| Flow                                                  | Result | Evidence |
|-------------------------------------------------------|--------|----------|
| Cold start, no session                                | ✅     | landed on `/(auth)/sign-in` with "Welcome back." headline |
| Sign in (alex) → home                                 | ✅     | Home shows "GOOD MORNING, ALEX" + Day 1 streak orb |
| Profile after sign-in (alex)                          | ✅     | "Alex" / PREMIUM / `alex@sugarquit.test` / 1 day / 3 cravings / $2 / 0.03kg / Goal Quit / Peak 15:00 / Trigger social pressure, after meals — every value matches Supabase row |
| Sign out                                              | ✅     | back to `/(auth)/sign-in`, no autofill, no stale state |
| Sign in (maya) → home                                 | ✅     | "GOOD MORNING, MAYA" + Day 47, "Two weeks in. Your body and brain have found their rhythm." phase copy |
| Profile after sign-in (maya)                          | ✅     | "Maya" / PREMIUM / `maya@sugarquit.test` / 47 days / 12 cravings / $71 / 1.18kg / Goal Reduce gradually / Peak 21:00 / Trigger stress, boredom — disjoint from alex |
| Cold restart with maya session                        | ✅     | Expo Go terminate → reopen → directly into Home as Maya, no sign-in detour (`persistSession=true` works) |
| Sign in (empty) — onboarded:false routing             | ✅     | landed on `/(onboarding)/welcome` "Meet the quiet coach for your cravings" |
| Empty profile (FREE plan)                             | ✅     | "Subscription" label (not "Manage subscription") — premium-aware menu still correct |
| RLS smoke (REST API, signed in as Maya)               | ✅     | Maya can SELECT her own cravings; explicit `eq.user_id=alex_uuid` returns `[]`; PATCH on Alex's profile returns `[]` (0 rows); psql confirms `first_name='Alex'` not 'HACKED' |

## Known issues / left for next pass

- **Sign-up screen state stale on re-mount**: opening sign-up via deep-link a
  second time keeps the previous email value in React state — typing appends
  rather than replaces. Triggered specifically when iOS Strong Password popup
  was previously dismissed. Workaround: clear field manually. Fix: reset
  local state in `useFocusEffect` when the route gains focus.
- **`example.com` and `.test` TLDs**: Supabase Auth on this project rejects
  both as "invalid". Use `gmail.com` or a real domain for sign-up tests.
  (admin API ignores this rule, which is why seed accounts on `.test` work.)
- **Transient "TypeError: Network request failed"** banner: surfaces when a
  debounced push fires moments after sign-out, with the JWT already cleared.
  Push helpers should bail when `getSession()` returns null. Fix: add a
  session-check guard to `pushProfileNow` / `pushStreakNow` before the
  REST call.
- **Onboarding-complete push**: each onboarding step's setter pushes profile
  on its own (already wired), but the `setOnboarded(true)` call at the end
  of the quiz hasn't been tap-through verified through the full 15-step
  flow. Single-action plumbing is verified via Profile/Edit; full quiz
  E2E remains for when we revisit onboarding copy.
- **Avatar initial fallback** on Home for empty user: shows "S" instead of
  expected "Y". Pre-existing; unrelated to this Stage A work; logged for the
  next UI sweep.

## Connection details (for future maintainers)

```
Project ref:  mzgierbwqegichdznsub
Project URL:  https://mzgierbwqegichdznsub.supabase.co
Region:       eu-west-1
Engine:       Postgres 17.6
Pooler URL:   postgresql://postgres.mzgierbwqegichdznsub@aws-0-eu-west-1.pooler.supabase.com:5432/postgres
              (session mode = port 5432 — required for DDL; transaction mode = 6543)
```

Direct DB hostname `db.<ref>.supabase.co` is **not** publicly resolvable on
this project (Free tier behaviour). Migrations and admin queries go through
the session pooler. The `EXPO_PUBLIC_SUPABASE_URL` for the RN client is the
plain `https://<ref>.supabase.co`, which routes through PostgREST/Auth/etc.

`.env` is gitignored. `.env.example` documents the slot names but ships
empty.

## TSC + connectivity status

- `npx tsc --noEmit` → 0 errors after every commit.
- Supabase auth health → 200 (`GoTrue v2.188.1`).
- 4 tables + 4 RLS policies + 1 auto-trigger present and verified via
  `pg_policies` + `\dt`.
- 3 seed accounts present and queryable.

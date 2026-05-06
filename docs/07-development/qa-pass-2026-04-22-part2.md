# Sugar Quit — QA Pass 3: a11y on remaining Pressables (2026-04-22)

Closes the items explicitly deferred in
[qa-pass-2026-04-22.md](./qa-pass-2026-04-22.md) plus the gaps surfaced by a
comprehensive deep-link audit of every tab screen, onboarding tail screen,
lesson detail, and remaining modals.

## Scope

Dumps of 13 previously-un-visited routes via deep-link. Inventory of
`<Pressable>` + `<TextInput>` missing `accessibilityRole` / `accessibilityLabel`,
fixed inline, TSC verified, live-dump verified.

## Fixes — 8 files

| File | Fix |
|---|---|
| `app/(tabs)/curriculum/index.tsx` | 7 lesson row `Pressable`s now have `role="button"` + label `Day N · title · M min · completed/today/upcoming` |
| `app/(tabs)/curriculum/[day].tsx` | back button |
| `app/(tabs)/progress/milestones.tsx` | back + 7 milestone stones |
| `app/(tabs)/progress/weekly.tsx` | back |
| `app/(tabs)/profile/edit.tsx` | back + header Save + Change photo + TextInput label/textContentType + 3 field-row pickers + footer Cancel |
| `app/(tabs)/profile/settings.tsx` | back + every link row (Delete account gets `"Destructive action"` hint) + every toggle becomes `role="switch"` with `state.checked` and label that includes the time (e.g. `"Morning check-in, 08:00"`) |
| `app/(onboarding)/push-permission.tsx` | "Maybe later" link |
| `app/(onboarding)/auth.tsx` | sign-up/sign-in switcher + "Back to other options" |

## Live-verify evidence (Settings)

Before: 0 Button/Switch elements in `mobilecli dump ui` (only `StaticText`).
After (on sim `FA05FD96`):

```
Button     "Back to profile"
Switch     "Morning check-in, 08:00"
Switch     "Daily lesson, 09:30"
Switch     "Motivation of the day"
Switch     "Streak at risk, 21:00"
Button     "Email: s***@gmail.com"
Button     "Change password"
Button     "Restore purchases"
Button     "Export my data"
Button     "Delete account"
Button     "Privacy Policy"
Button     "Terms of Service"
```

## Commits this session

```
582f219  initial expo SDK 55 alignment (worklets, plugins, deps, lockfile)
b609f59  QA pass 1 — 7 onboarding bugs (goal auto-advance, triggers CONTINUE, motivational copy, name input keyboard)
0349f87  QA pass 2 — post-paywall a11y + locale RU→EN (home, SOSFab, 7 modals)
a452640  QA pass 2 report
4320bb2  QA pass 3 — a11y on all remaining Pressables (this doc)
```

## Coverage

Every user-interactive `Pressable` across the app now surfaces to the
accessibility tree with a descriptive role + label. Every `<TextInput>` has
`accessibilityLabel`. Toggles use `role="switch"` + `state.checked`.
Selection groups use `role="radio"` + `state.selected`. Multi-select chips
use `role="checkbox"` + `state.checked`. Destructive rows (Delete account)
carry `accessibilityHint="Destructive action"`.

## Not done

- No new Pressables were required outside what the app already defines
  (e.g. chat bubble tap, swipe to dismiss — these are not wired in product).
- 16e / SE width variance — cannot create sugar-quit sims at those widths
  without reusing slots that belong to other projects.
- Cold-start of primary sim — covered by fresh Pro Max sim in QA pass 2.

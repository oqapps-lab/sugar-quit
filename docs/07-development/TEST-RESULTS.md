# Sugar Quit — Live Test Results

**Дата:** 2026-04-20 (после xray bypass + async-storage downgrade)
**Тестируется:** SDK 55, Expo Go 55.0.27, iPhone 17 Pro 26.3 simulator (`8C76591B-…`)
**Method:** UX-Adequacy testing (functional + semantic per UX-SPEC §5.2 / iOS Testing Skill 3)
**Tap workaround:** `mobile_swipe_on_screen` 1px (Skill 4 — `mobile_click` broken on iOS 26)

---

## Bug log (live, обновляется по ходу)

| # | Severity | Where | Bug | Fix |
|---|---|---|---|---|
| BUG-1 | P2 | Welcome.tsx | PillCTA "Begin" не в accessibility tree (нет accessibilityRole). Same for "Sign in" link. | Add `accessibilityRole="button"` to PillCTA component + `accessibilityLabel` |

---

## Phase 1 — Onboarding Flow (Flow 1 from USER-FLOWS.md)

### 1.1 Welcome → Begin
- [x] Visual: hero "Meet the quiet coach for your cravings", BEGIN pill, Sign in link, 15-dot rail, illustration
- [ ] Begin tap → quiz/goal (testing now)
- [ ] Sign in tap → auth (later)


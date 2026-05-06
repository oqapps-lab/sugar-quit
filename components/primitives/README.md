# Primitives

Generic, token-based building blocks. No hardcoded colours, sizes, or fonts — everything comes from `constants/tokens.ts`.

Import via barrel:
```ts
import { Screen, Card, Txt, PillCTA } from '@/components/primitives';
```

---

## Components

### Screen
3-layer screen wrapper matching the project's layout system.
- `background` prop → absolute Layer 1 (gradients, images)
- `children` → flex Layer 2 (scrollable content)
- `floating` prop → absolute Layer 3 (TopBar, SOSFab, BottomNav)
- Applies `useSafeAreaInsets().top` as `paddingTop` on the content layer.

### Card
White surface card (`colors.surface`) with `shadows.cardWhisper` and `radius.sm`.
- `bordered` → adds 1px `colors.outline` border
- `noPadding` → removes default 16px padding

### Txt
Variant-based text component covering the full type scale.
Variants: `hero` · `displayLg` · `displayMd` · `displaySm` · `titleLg` · `titleMd` · `titleSm` · `bodyLg` · `bodyMd` · `bodySm` · `label` · `labelSm` · `eyebrow`
- `color` → overrides token colour
- `italic` → italic style (for quotes and affirmations)
- `center` → centers text

### PillCTA
Primary action button with coral gradient and `shadows.buttonMd`.
- `primary` (default) — coral gradient, white text
- `ghost` — transparent with coral border
- `success` — teal gradient (check-in done state)
- `fullWidth` (default `true`) — stretches to parent width

### GhostButton
Text-only secondary action. Used for "Maybe later", "Skip", "Dismiss".
- `small` → compact size with uppercase label

### IconButton
Circular icon button (≥ 44pt touch target).
- `primary` — coral fill (send, confirm)
- `ghost` — outlined
- `default` — white surface

### HeroNumber
Large 72pt number with optional uppercase label below.
Used for streak count, cravings avoided, money saved.

### Eyebrow
Small uppercase label above titles.
Examples: "DAY 8 · LESSON", "YOUR STREAK", "SAVED THIS MONTH"

### Stat
Compact stat chip: icon + large value + small uppercase label.
Use in a `flexDirection: 'row'` with `flex: 1` children (equal columns).

### Divider
1px hairline separator.
- `inset` → adds 16px horizontal margin (for use inside cards)

### TopBar
Screen header with left icon and optional right action.
- `transparent` → no background, floats over content (Layer 3)
- Applies `useSafeAreaInsets().top` automatically

### BottomNav
Floating pill tab bar: **Home / Curriculum / Progress / Profile**.
- SOS FAB is rendered separately — NOT part of BottomNav
- Renders `BlurView` on iOS, semi-transparent white on Android
- Uses `Haptics.selectionAsync()` on tab press

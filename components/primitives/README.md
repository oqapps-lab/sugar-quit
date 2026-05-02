# components/primitives

Low-level atoms. Every screen is built from these + `components/ui/`.

Import from the barrel: `import { Screen, ThemedText, Card } from '@/components/primitives'`

---

## Components

| Component | Description | Key props |
|---|---|---|
| `Screen` | Full-screen layout wrapper. AtmosphericGradient + ScrollView/View with safe-area padding | `theme`, `scrollable`, `topOffset`, `bottomOffset` |
| `ThemedText` | Typography system. 11 variants from `heroNumber` (72px) to `labelSmall` (10px) | `variant`, `color`, `caps` |
| `Eyebrow` | Pre-composed `ThemedText variant="label"` with bottom margin | `color` |
| `HeroNumeral` | Large gradient number — streak / day / milestone | `value`, `sublabel`, `gradient` |
| `Card` | `GlassCard` with preset padding and radius | `tint`, `padded` |
| `StatCell` | Label + value pair for dashboard grids | `label`, `value`, `unit` |
| `Divider` | Horizontal hairline separator | `inset` |
| `TopBar` | Modal / fullscreen navigation header with left+right slots | `title`, `left`, `right`, `onClose` |
| `GhostButton` | Outline or text-only secondary button | `label`, `variant` (`outline`\|`text`) |
| `IconButton` | Circular pressable wrapping any icon node (44×44 min) | `icon`, `size`, `bg`, `accessibilityLabel` |
| `ProgressBar` | Thin horizontal progress indicator | `progress` (0–1), `height`, `gradient` |
| `Badge` | Status pill: LIVE / ACTIVE / PREMIUM / INFO | `label`, `variant` |

---

## Do not duplicate

`components/ui/` already contains richer, standalone components. Use those directly:

- `AtmosphericGradient` — screen background canvas
- `AuraBlob` — floating gradient orb
- `GlassCard` — frosted glass (use `Card` for the preset or `GlassCard` for custom radius)
- `PillCTA` — gradient CTA button
- `BottomNav` — floating pill tab bar
- `SOSFab` — SOS floating button
- `StreakOrb` — ceremonial streak display
- `GradientText` — text with gradient fill
- `TokenDot` — small round filled/empty indicator
- `DecorGlyph` — decorative illustrations

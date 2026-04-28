# Figma Layout Spec — Unsweet App Store Screenshots

Master canvas + 7-frame layout with text overlays and screenshot mockups.

---

## Файлы которые тебе понадобятся (всё в `store-assets/`)

```
store-assets/
├── screenshots/raw/                    # 7 native screenshots 1320×2868
│   ├── frame01_hook_ai_chat.png         (HOOK — лучший кадр)
│   ├── frame02_home_day48.png           (PROOF — Day 48 streak)
│   ├── frame03_sos_greeting.png         (ENTRY — SOS modal)
│   ├── frame04_curriculum_path.png      (PATH — 90-day plan)
│   ├── frame05_progress_identity.png   (OUTCOME — Identity)
│   ├── frame06_profile_premium.png      (TRUST — stats trio)
│   └── frame07_forecast_peak.png        (PERSONAL — peak hour)
├── screenshots/captions/captions.md    # тексты hero + sub для каждого фрейма
└── backgrounds/
    ├── unsweet-bg-master.svg            # 9240×2868 — мастер-холст
    ├── unsweet-bg-master.png            # PNG превью
    ├── unsweet-bg-single-frame.svg      # 1320×2868 — на один кадр
    └── unsweet-bg-single-frame.png      # PNG превью
```

---

## Master canvas (рекомендую)

**Размер**: `9240 × 2868 px` (7 frames × 1320 wide)

**Layers сверху вниз**:
1. **Background master** (`unsweet-bg-master.svg`) — fill canvas
2. **Frame mockups** (7 шт) — каждый со screenshot inside
3. **Text overlays** — hero + sub над каждым frame
4. **Brand watermark** (опционально) — Unsweet logo bottom-right corner

---

## Per-frame slot dimensions

Каждый screenshot frame: `1320 × 2868` (native iPhone 17 Pro Max)
Position: starts at `x = (slot - 1) × 1320, y = 0`

| Slot | x | y | Width | Height | File |
|------|---|---|-------|--------|------|
| 1 | 0 | 0 | 1320 | 2868 | frame01_hook_ai_chat.png |
| 2 | 1320 | 0 | 1320 | 2868 | frame02_home_day48.png |
| 3 | 2640 | 0 | 1320 | 2868 | frame05_progress_identity.png |
| 4 | 3960 | 0 | 1320 | 2868 | frame04_curriculum_path.png |
| 5 | 5280 | 0 | 1320 | 2868 | frame07_forecast_peak.png |
| 6 | 6600 | 0 | 1320 | 2868 | frame06_profile_premium.png |
| 7 | 7920 | 0 | 1320 | 2868 | frame03_sos_greeting.png |

**Note**: order ≠ filename order — оптимизирован по conversion impact.

---

## Screenshot mockup styling

Каждый screenshot:
- **Inset from frame edge**: 80px (top/bottom/sides) — чтобы был breathing room
- **Border radius**: 60px (matches iPhone corner radius при render'е)
- **Shadow**:
  - `offset: 0px 24px`
  - `blur: 60px`
  - `color: rgba(15, 25, 45, 0.4)` (deep indigo для cool palette)
- **Effective screenshot size inside frame**: 1160 × 2520 (after 80px inset)
- **Position within slot**: centered horizontally, top at y=240 (leaves ~240px for hero text above)

---

## Text overlay typography

### Hero caption (≤30 chars, OCR-indexed)

- **Font**: Inter (or SF Pro Display) — sans-serif clean
- **Weight**: 700 (Bold)
- **Size**: 100pt
- **Line-height**: 110pt (1.1)
- **Color**: `#FFFFFF` (white) on dark bg, OR `#0F1929` (deep navy) on light bg
- **Letter-spacing**: -1pt (slightly tight)
- **Position**: x = 80 (from slot left), y = 180 (from slot top)
- **Max width**: 1160px (fits 30-char string at 100pt with margin)
- **Alignment**: left
- **Wrap**: 1-2 lines max

### Supporting sub (≤60 chars, conversion-supportive)

- **Font**: Inter (same family)
- **Weight**: 400 (Regular)
- **Size**: 44pt
- **Line-height**: 56pt (1.27)
- **Color**: `rgba(255, 255, 255, 0.85)` on dark bg (slight transparency для hierarchy)
- **Position**: x = 80, y = 360 (below hero with 60px gap)
- **Max width**: 1160px
- **Alignment**: left
- **Wrap**: 1-2 lines

### Optional accent dot

- 12px circle, color `#7DD3C0` (mint accent), positioned `(80, 168)` — visual anchor before hero text. Skip if too busy.

---

## Per-frame text content (from captions.md)

| Slot | Hero | Sub |
|------|------|-----|
| 1 | AI Coach the moment you crave | Real conversation, not a checklist. 60 seconds and gone. |
| 2 | Day 48. Identity, not effort. | Cravings stop costing willpower. They cost nothing now. |
| 3 | The path: 90 days, 6 phases. | Arrival → Detox → Clarity → Integration → Identity → Free. |
| 4 | Backed by neuroscience. | Avena, Lally, Wise. Real research, not wellness fluff. |
| 5 | Tuned to your 9pm crave. | We learn your peak hour. Nudge arrives 30 min before, not after. |
| 6 | 15 cravings met. $72 saved. | 1.20 kg of added sugar avoided. Real numbers, your story. |
| 7 | Tap SOS the moment it hits. | Coach is here. No shame, no checklist. Just 60 seconds. |

---

## Figma — пошаговая сборка (10-15 минут)

### Шаг 1. Создай master frame
- File → New Design File
- Frame tool (F) → Custom: 9240 × 2868
- Background: Image fill → load `unsweet-bg-master.png`
- OR: Import the .svg file, scale to 9240×2868

### Шаг 2. Добавь 7 sub-frames (для structure)
- Inside master, create 7 frames each `1320 × 2868`, positioned at x = 0, 1320, 2640... 7920
- Name them: "Slot 1 HOOK", "Slot 2 PROOF", etc.

### Шаг 3. Place screenshots
- Drag each PNG (frame01..07) into corresponding slot
- Resize to 1160 × 2520 (inset)
- Position centered horizontally, top at y = 240
- Apply Effects → Drop Shadow (settings above)
- Border radius 60

### Шаг 4. Add text overlays
- Inside each slot, add 2 text layers (hero + sub)
- Use typography settings above
- Hero text appears ABOVE screenshot (y = 180)
- Sub text BETWEEN hero and screenshot (y = 360)

### Шаг 5. Export individual frames
- Select each slot → Export → 1× PNG (1320×2868)
- File names: `slot1_hook.png` through `slot7_entry.png`
- These are upload-ready to App Store Connect

### Шаг 6. (Optional) A/B variants
- Duplicate master canvas → "Variant B"
- Change text overlay color, position, or hero copy
- Export 7 frames per variant

---

## A/B/N variant ideas

Per visual playbook §10 — Apple PPO supports 3 treatments × 90 days. Recommend testing:

### Variant A (control) — текущий план
- Cool indigo gradient background
- White hero text on dark bg
- Hero leads with "AI Coach"

### Variant B — warmer human angle
- Same screenshots
- Background swap: cream/peach soft gradient (still no red — soft warm)
- Black hero text on light bg
- Hero leads with personal story: "On Day 48 I stopped reaching."

### Variant C — minimalist tech
- Same screenshots
- Solid #0F1929 navy background, no gradient
- Mint accent (`#7DD3C0`) for headers
- Hero with shorter copy + numbers: "91 traffic AI coach. Real."

### Variant D (skip — too risky)
- Don't use red/orange (per playbook §12 sugar-quit specific). Skip.

---

## Quality checklist before upload

- [ ] All 7 frames are 1290×2796 minimum (Apple requires 6.7" — we have 1320×2868 native iPhone 17 Pro Max which qualifies)
- [ ] No text smaller than 36pt (readable at thumbnail)
- [ ] First 3 frames carry full narrative arc (hook + proof + outcome) — Apple shows first 3 above fold
- [ ] No misleading screenshots (Guideline 2.3 — must show actual app)
- [ ] No "#1 / Best / Award-winning" claims (Guideline 2.3.1)
- [ ] No competitor brand names visible
- [ ] Status bar shows generic time (12:00) and full battery — clean look
- [ ] All screenshots from same device (iPhone 17 Pro Max) — consistent ratio
- [ ] At least 1 frame shows a face/person (visual playbook §4: +5-10% lift)

**⚠️ Гэп**: ни один из текущих 7 кадров не показывает лицо. Можно добавить optional 8-й frame с testimonial card "Maya, age 34: 'I'm finally free'" — но это требует фотографии. На усмотрение.

---

## Localization roadmap

1. **EN-US** (this set) — primary, ship now
2. **ES-MX** — same screenshots, translate captions only (cascade-free traffic via US storefront)
3. **JA, DE-DE** — same screenshots, full caption localization (high ARPU markets per playbook §7)
4. **RU, KZ** — same screenshots, full caption localization

For each locale: same Figma file → swap text overlay component → re-export 7 frames.

---

## After Apple PPO test results

Per visual playbook §10:
- Wait minimum 14 days before reading PPO results
- Need 500+ daily organic installs for significance in 2 weeks
- Below 500 DAU → use third-party (Storemaven / SplitMetrics) with paid traffic
- Look at: impression-to-install conversion rate (CVR), tap-through rate (CTR)
- After winner determined → make winner the default, archive variants

# Sugar Quit — v9 Force Richness

**Дата:** 15 апреля 2026
**Изменение:** Explicit aesthetic enforcement ("no flat blocks", "every card has gradient or glass"), per-image reference mapping, dribbble-quality directive.

---

## Диагноз v8

v8 дал хороший layout (виджеты правильно расставлены) но НЕ перенёс rich aesthetic с референсов:
- Референсы: градиенты, стекло, цветные orbs, glow
- Результат: чистые плоские белые блоки

Причина: Stitch по умолчанию bias к "safe clean SaaS dashboard". Референсы дают ему хватать layout/iconography, но он игнорит gradient/glass если явно не попросишь.

---

## Промпт v9

```
Sugar Quit — AI craving coach. Real-time conversations during cravings, trigger prediction based on time/stress/location, food alternatives, 90-day program, savings tracking, community support. For people who need support in the exact moment they reach for sugar.

Mood: the slow exhale after resisting a craving — quiet pride, relief, calm.

This is a presentation-quality mockup for Dribbble, not a wireframe. Every surface has depth, gradient, and warmth. The reference images are your visual law.

Pull specifically:
— From the psychology app reference (Dr. Anna G / Janani): the multi-hue gradient orb motif (coral / lavender / sage blended together), the warm cream background, the rounded frosted cards
— From the amber fitness reference (Marina / 13,143 steps): the massive warm-gradient hero background filling the top, with a huge bold number on it
— From the notes reference (Ron Design / Your notes): the frosted-glass cards with visible colored gradient backdrops glowing through them, the soft multi-hue pastel palette
— From the yellow fitness reference (Monica / 256 kcal): the confident big-number typography
— From the vital finance reference (Vital): the frosted-glass primary card floating on a soft pastel backdrop, big hero number inside glass, pill tabs

STRICT aesthetic rules (follow exactly):
— NO flat white blocks anywhere. Every card is EITHER a frosted-glass surface (with visible backdrop blur and a hint of gradient color showing through) OR a gradient-filled container (warm amber, peach-to-coral, cream-to-lavender, sage-to-cream).
— The screen background is a living warm gradient: cream at the top dissolving into pale peach in the middle and soft amber at the bottom. Not a solid color.
— Behind the glass cards, 3-4 colored gradient orbs drift at different depths: a peach orb top-right, a lavender orb mid-left, a coral orb mid-right, a sage orb bottom. Soft-blurred radial gradients. They glow through the frosted surfaces as soft color patches.
— The hero number sits on a warm amber-to-coral gradient panel, not a white one.
— Every data viz element (bars, meters, dots) has a gradient fill with soft outer glow. No solid flat colors on data.
— The SOS button is a fully saturated glossy coral pill — the only element with saturation this bold, with a warm glow halo and highlight streak on top like polished glass.

One screen. Home.

[top bar] Small greeting "Hello, Sarah" with "Today's rhythm" beneath in lighter text, a small avatar top-right, a pill showing "47d · 780pts" and a small bell icon with a dot.

[hero] A large warm amber-to-coral gradient panel filling the upper third of the screen. "47 DAYS CLEAN" as a massive bold white number on it — the single heaviest element. Soft subtitle beneath ("your longest streak yet") in cream. A small multi-hue gradient orb (coral / lavender / sage radial gradient) floating to the right of the number like the psychology reference card.

[row] Horizontal strip of three small frosted-glass mini-cards with visible gradient backdrops showing through the blur: THIS WEEK / 12 held (peach backdrop glowing through) — SAVINGS / $94 (sage backdrop) — MOOD / tender ☁ (lavender backdrop). Each card has a subtle inner gradient top-to-bottom.

[tabs] Pill tab row — Patterns / Triggers / Community — "Patterns" active in a warm amber-gradient-filled pill with soft glow, others in light frosted glass with thin border.

[two frosted-glass cards side by side, each with a small gradient orb in one corner]
— Left: "Craving forecast" with "3:12 pm next window" and a horizontal risk meter where the gradient warms from cream to saturated amber as risk rises along the bar. A dot marked "now" sits in the cooler cream zone. Small peach orb glows through the top-right of this card.
— Right: "This week" with "12 of 14 resisted" and a tiny seven-dot strip — each dot is a gradient orb of varying intensity, today in saturated coral with a soft glow halo. Small lavender orb glows through the top-left of this card.

[wide frosted-glass card with a multi-hue gradient orb (coral / lavender / sage blended) on the right side] "Today's practice / sitting with the discomfort" with a dark rounded pill button "Start today's session →" on the left. The glass clearly shows the orb glowing through its frosted surface.

[wide gradient-filled card — cream-to-pale-peach gradient fill] "Your recovery year" with a small gently-rising trend curve rendered as a warm coral gradient line with glow, and "Day 47 of 365 · 87% cleaner than month 1" in soft dark text. Forward arrow in coral.

[colorful bar chart] "Why you crave" — horizontal layered bars, each a saturated gradient: STRESS 42% (deep coral gradient with outer glow), MEETINGS 21% (amber gradient), SOCIAL 18% (peach gradient), TIRED 12% (blush gradient), BOREDOM 7% (cream). Thin rounded bars, glossy surface, UPPERCASE mini-labels in soft dark.

[avatar row] "Others walking with you" — three small circular avatars with their streak numbers beneath (42d / 89d / 15d), each avatar's circular frame a different warm gradient ring (coral / amber / sage), "+more" indicator at the end in a tiny frosted-glass pill.

[SOS] Above the bottom tab bar: a glossy saturated coral-to-pink gradient wide pill button with a small flame glyph and "I am here — reach." Highlight streak on top edge like polished glass. Warm shadow halo beneath. The only fully-saturated element on the screen.

[tab bar] Bottom: frosted-glass bar (clearly translucent, you can see the gradient background through it). Four rounded icons — Home (active, filled with warm amber gradient) / Patterns / Coach / Profile — whisper labels beneath.

Typography: follow the references — big bold hero numbers, small muted labels, clean modern sans-serif, UPPERCASE only for tiny section labels.

Primary Design Surface: App.
```

---

## Что отличается от v8

| v8 | v9 |
|---|---|
| "Use the aesthetic of attached" | **"Pull specifically: from image 1 / 2 / 3 / 4 / 5"** — per-image mapping |
| Нет aesthetic rules | **"STRICT aesthetic rules"** — NO flat blocks, gradient OR glass everywhere |
| Нет directive о качестве | **"Presentation-quality mockup for Dribbble, not wireframe"** |
| Виджеты описаны нейтрально | Виджеты с gradient/orb/glass-callouts ("peach orb glows through top-right", "gradient warms from cream to amber") |
| Bars неявно | Bars с gradient fills и glow |
| Orbs мельком | Orbs в каждом крупном card + behind glass как decorative layer |

---

## Если v9 всё равно flat

Значит Stitch просто не тянет rich aesthetic при генерации — плоскость зашита в его base model. План D:

1. Бери любой из полу-рабочих результатов v8/v9 как starting point
2. Дорисовываем руками в Figma — добавляем gradients, glass effects, orbs
3. Stitch используем дальше только для идей layout/widget-types, не для финального визуала

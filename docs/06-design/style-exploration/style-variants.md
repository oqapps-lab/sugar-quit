# Sugar Quit — Style Exploration (Этап A, v6)

**Дата:** 15 апреля 2026 (v6 update)
**Метод:** **Glass morphism** + **decorative gradient orbs** + **micro-illustrations** + **saturated contrast** + **flowing data viz**
**Режим Stitch:** Pro (Gemini 2.5), без reference
**Квота:** осталось ~40 после v3/v4/v5.

---

## Почему v6

v5 прогнала F/G/I с varied forms + gradients + shadows + multi-hue. Результат: **всё равно boring**. Никаких красивых форм, градиентов, иллюстраций. Однотипные цвета. Как старые 2010s minimalist wellness дизайны. Чуть-чуть что-то было в зелёном (G), но тоже с натяжкой.

**Диагнозы:**
1. Мои промпты описывали **minimalism** (whispering pastel, soft-edge, muted) — а нужен **modern rich aesthetic**
2. Нет **glass morphism** — frosted glass containers с backdrop blur (современный iOS паттерн)
3. Нет **decorative gradient orbs** — ethereal цветные сферы в background layer за виджетами
4. Нет **micro-illustrations** — только шейпы и иконки, без иллюстрированных элементов
5. **Saturated contrast** отсутствует — всё "whispering" и "muted", нет bold pop колоров
6. Data viz **boring** — все виджеты plain bars/circles, нет flowing curves / glow halos / gradient tori

**Ориентиры v6:** Apple Fitness rings, Oura Ring app, Calm gradient orbs, Headspace illustrations, Finch rich pastel, iOS 17 glass morphism. НЕ early-2010s minimalist wellness.

**Изменения v6:**
- **Glass morphism containers**: frosted glass panes, 40px backdrop blur, 85% translucent overlay, 1px translucent border
- **Decorative orb layer**: 3-4 large gradient orbs floating at different depths BEHIND the widgets (radial gradient spheres with dissolving edges)
- **Saturated contrast palette**: full saturation, not muted pastel
- **Glossy accent elements**: SOS и CTA — glossy (highlight streak, deep gradient, warm shadow), не matte
- **Flowing data viz**: curved wave charts, gradient tori с glow halos, chunky donuts with gradient segments
- **Micro-illustrations**: flat-illustrated scenes (рука с камешком, лотос, капли) внутри виджетов, не только иконки
- **Gradient text fills** на hero-числах

---

## 3 glass-morphism атмосферы + 1 Component Sheet

| # | Атмосфера | Палитра orbs |
|---|---|---|
| α | **Glass Garden Dream** | lavender + peach + coral + sage на lavender→peach→coral gradient |
| β | **Glass Amber Sanctuary** | amber + coral + peach + blush на coral→peach→amber gradient (all warm) |
| γ | **Glass Mint Pop** | mint + lavender + pink + cream на mint→lavender→cream (cool с pink pop) |
| E | **Glass Component Sheet v6** | rich multi-hue на frosted glass |

---

## 🅰 Atmosphere α: Glass Garden Dream

**Emotional register:** A garden seen through frosted glass at dawn — saturated lavender, peach, coral, sage glowing behind blurred panes.
**Ориентир:** Oura Ring app + Apple Fitness rings + Calm orbs.

**Stitch prompt:**

> Sugar Quit — AI craving coach. Real-time conversations during cravings, trigger prediction based on time/stress/location, food alternatives, 90-day program. For people who need support in the exact moment they reach for sugar.
>
> Mood & visual identity: imagine a garden seen through frosted glass at dawn — saturated colors of lavender, peach, coral, and sage glow softly behind blurred panes. The app feels like iOS 17 glass morphism meets a warm wellness illustration book. Background is a rich saturated vertical gradient — deep lavender at top bleeding into warm peach mid-screen, fading to saturated coral at the bottom. This is not a muted pastel — the colors are fully saturated, deliberately contrasting with the frosted glass layer on top.
>
> **Decorative background layer**: behind the glass widgets, 4 large gradient orbs float at different depths, soft-blurred (radial gradient, edges dissolve like distant planets). A big peach orb top-right, a smaller lavender orb mid-left, a saturated coral orb mid-right, a sage orb bottom-center. They show through the frosted glass as blurred color patches, giving each widget its own ambient tint.
>
> **Architecture — GLASS MORPHISM**: every widget container is a frosted glass pane — backdrop blur of 40px, subtle transparency (85% white overlay), a 1px white-translucent border, a soft drop shadow (16px blur, 8px offset, warm-tinted, 12% opacity). Through each pane you see softened hints of the gradient orbs behind. Each widget has a distinct form — no two widgets share the same shape.
>
> The SOS button is a solid **GLOSSY** coral-to-pink gradient orb floating above the bottom tab bar — fully saturated, with a highlight streak on top like polished glass, and a warm shadow. The only non-frosted element on the screen. "Reach for me."
>
> Typography: humanist sans-serif (Söhne). Numbers are the heroes rendered with **gradient text fills** (coral-to-lavender). Bold hero numbers, whisper-light UPPERCASE TRACKED labels with extra letterspacing. Saturated gradient numbers pop against the frosted glass.
>
> Bottom tab bar: frosted glass bar at the base with 4 icon+label pairs (HOME, PATTERNS, COACH, PROFILE), active tab icon + label glowing coral. SOS glossy orb floats above-right with its own warm shadow.
>
> 3 screens.
>
> Home — widget grid of frosted-glass containers floating on the saturated lavender-peach-coral gradient with orbs behind:
> (1) **Streak Hero** — no glass container, pure typography: gigantic "47" with a coral-to-lavender gradient text fill, a soft radial glow halo behind the digits. Beside the number, a small **flat-illustrated lotus flower** blooming in blush petals with sage centre. "DAYS CLEAN" UPPERCASE TRACKED coral whisper-label.
> (2) **Craving Forecast — gradient torus ring** inside a frosted glass pane: 24-hour circular ring rendered as a thick gradient torus, higher-risk hours in saturated amber-to-coral gradient with a glowing outer halo, calm hours in pale peach gradient. A pulsing coral dot marks current time. Center: "3:12 PM" in amber medium, "NEXT CRAVING WINDOW" UPPERCASE TRACKED amber label. A tiny **flat-illustrated sun glyph** in one corner of the pane.
> (3) **This Week — curved flowing chart** in frosted glass pane: 7 data points connected by a smooth flowing cardiogram-like curve in coral, area under filled with coral-to-cream gradient fade, each point a small gradient dot, today's point a larger gradient orb with a soft glow halo. "THIS WEEK · 12 RESISTED" UPPERCASE TRACKED blush label. A tiny **flat-illustrated garden-fence line** along the bottom edge.
> (4) **Today's Lesson — illustrated glass card**: a tasteful **flat-illustrated scene on the left** — a hand holding a smooth pebble, rendered in blush and sage flat colors — and "sitting with the discomfort" in medium serif italic on the right, "TODAY'S PRACTICE" UPPERCASE TRACKED sage label above. Glass pane with subtle sage tint from the orb behind.
> (5) **Trigger Breakdown — illustrated chunky donut** in frosted glass pane: thick donut with saturated gradient segments — stress in deep-coral gradient, meetings in amber gradient, social in peach gradient, tired in blush gradient. Each segment has its own gradient fill and a thin soft glow rim. Center: "12 of 14" with a coral-to-amber gradient text fill, "RESISTED" UPPERCASE label. Tiny **flat-illustrated water-drop glyphs** scattered at the corners.
>
> Bottom: frosted glass tab bar. SOS glossy coral-to-pink orb floats above with a highlight streak.
>
> SOS Chat — full-screen on the deep saturated lavender-peach-coral gradient with orbs visible behind:
> Top: small pulsing coral ember + "COACH IS HERE" UPPERCASE TRACKED coral label.
> AI messages: frosted glass bubbles on the left with backdrop blur, showing the orbs behind as soft color patches. Warm shadows.
> User messages: saturated coral-to-pink gradient bubbles on the right, glossy highlight streak on top edge.
> Input: frosted glass pill at the bottom with coral placeholder "tell me what you're feeling…", send as glossy coral-to-pink gradient orb with highlight.
>
> Paywall on the saturated gradient background with orbs:
> (1) Streak Hero typography at top: coral-to-lavender gradient "47", "DAYS CLEAN · KEEP GOING" UPPERCASE TRACKED coral label, small **flat-illustrated laurel wreath** in sage around it.
> (2) Two glass pricing cards side by side — "MONTHLY / $9.99" in plain frosted glass, "YEARLY / $59.99 · BEST VALUE" in frosted glass with a **glowing coral-to-amber gradient border halo** (selected, slightly larger, stronger shadow, check-glyph in corner).
> (3) Feature row: 3 tiny **flat illustrations** (not icons — actual tiny scenes: a speech-bubble with a heart, an hourglass with sand, a calendar sprout with a tiny flower) with UPPERCASE TRACKED labels — AI COACH coral, TRIGGER PREDICTION amber, 90-DAY PROGRAM sage.
> (4) CTA: large glossy coral-to-pink gradient "FREE 7 DAYS" pill with shiny highlight streak on top and warm shadow.
> (5) Tiny legal micro-text.
>
> Primary Design Surface: App.

---

## 🅱 Atmosphere β: Glass Amber Sanctuary

**Emotional register:** A warm-toned wellness studio at golden hour — saturated amber, peach, coral light through frosted glass partitions.
**Ориентир:** Calm app warmth + iOS 17 glass + Finch warm palette.

**Stitch prompt:**

> Sugar Quit — AI craving coach. Real-time conversations during cravings, trigger prediction based on time/stress/location, food alternatives, 90-day program. For people who need support in the exact moment they reach for sugar.
>
> Mood & visual identity: imagine a warm-toned wellness studio at golden hour — saturated amber, peach, and coral light filtering through frosted glass partitions. Rich warm modern design — iOS 17 glass morphism with Calm-app warmth. Background is a saturated warm vertical gradient: deep coral at the top bleeding into rich peach mid-screen, fading to soft amber at the bottom. Fully saturated, not muted.
>
> **Decorative background layer**: behind the glass, 4 large gradient orbs float — a big amber orb top-left, a saturated coral orb top-right, a peach orb mid-center, a blush orb bottom-right. Soft-blurred radial gradients, edges dissolve. They show through the frosted glass giving each widget a warm ambient tint.
>
> **Architecture — GLASS MORPHISM**: every widget container is a frosted glass pane — 40px backdrop blur, 85% cream-white overlay, 1px cream-translucent border, soft warm-tinted shadow (16px blur, 8px offset, 12% opacity). Through each pane the warm orbs glow through. Each widget has a distinct form — no two share shapes.
>
> The SOS button is a solid **GLOSSY** deep-coral-to-amber gradient orb above the bottom tab bar — fully saturated, with a highlight streak on top, warm shadow. Only non-frosted element. "I'm here when you reach for sugar."
>
> Typography: humanist sans-serif (Söhne). Numbers are heroes with **amber-to-coral gradient text fills**. Bold hero numbers, UPPERCASE TRACKED whisper-light labels with extra letterspacing.
>
> Bottom tab bar: frosted cream-glass bar at base, 4 icon+label pairs — HOME, PATTERNS, COACH, PROFILE — active tab glowing coral. SOS glossy orb above-right.
>
> 3 screens.
>
> Home — warm glass widget grid on saturated coral-peach-amber gradient with warm orbs behind:
> (1) **Streak Hero — pure typography, no container**: gigantic "47" with amber-to-coral gradient text fill, soft warm radial glow behind. A tiny **flat-illustrated sun-rays fan** beside in peach and amber. "DAYS CLEAN" UPPERCASE TRACKED coral whisper-label.
> (2) **Craving Forecast — thick gradient torus ring** in frosted cream-glass pane: 24-hour torus, higher-risk hours in deep-coral-to-amber gradient with glowing outer halo, calm in pale peach. Pulsing coral dot marks current time. Center: "3:12 PM" amber medium, "NEXT CRAVING WINDOW" UPPERCASE. **Flat-illustrated flame glyph** in a corner.
> (3) **This Week — flowing wave chart** in frosted glass: 7 data points connected by a smooth amber-flowing curve, area under in coral-to-peach gradient fade, today's point a larger gradient orb with glow. "THIS WEEK · 12 RESISTED" UPPERCASE TRACKED blush label. **Flat-illustrated horizon line** along bottom.
> (4) **Today's Lesson — illustrated glass card**: **flat-illustrated scene** on the left — a hand cupping a warm cup of tea, rendered in blush and peach colors, tiny steam wisps — and "sitting with the discomfort" in medium serif italic on the right, "TODAY'S PRACTICE" UPPERCASE TRACKED amber label.
> (5) **Trigger Breakdown — illustrated chunky donut** in frosted pane: thick donut with gradient segments — stress deep coral, meetings amber, social peach, tired blush — each with its gradient fill and soft glow rim. Center: "12 of 14" amber-to-coral gradient text, "RESISTED" UPPERCASE label. Tiny **flat-illustrated ember-spark glyphs** at corners.
>
> Bottom: frosted cream-glass tab bar. SOS glossy coral-to-amber orb above with highlight streak.
>
> SOS Chat — full-screen on warm saturated gradient with orbs visible behind:
> Top: pulsing coral ember + "COACH IS HERE" UPPERCASE TRACKED amber label.
> AI messages: frosted cream-glass bubbles on left, showing orbs behind.
> User messages: saturated coral-to-amber gradient bubbles on right with glossy highlight streak.
> Input: frosted glass pill, coral placeholder, glossy amber-to-coral send orb.
>
> Paywall on warm gradient:
> (1) Streak Hero at top: amber-to-coral gradient "47", "DAYS CLEAN · KEEP GOING" coral label. Tiny **flat-illustrated sun-rays** beside.
> (2) Two glass pricing cards — "MONTHLY / $9.99" frosted, "YEARLY / $59.99 · BEST VALUE" frosted with **glowing amber-to-coral gradient border halo** (selected).
> (3) Feature row: 3 tiny **flat illustrations** — AI COACH a warm speech bubble with heart, TRIGGER PREDICTION a small compass with warm needle, 90-DAY PROGRAM a sprout with a tiny flower — UPPERCASE labels in coral, amber, peach.
> (4) CTA: glossy deep-coral-to-amber gradient "FREE 7 DAYS" pill with shiny highlight.
> (5) Tiny legal micro-text.
>
> Primary Design Surface: App.

---

## 🅲 Atmosphere γ: Glass Mint Pop

**Emotional register:** A modern jewelry-store garden in spring — fresh mint and pale lavender behind frosted glass, with saturated pink pops like peonies in bloom.
**Ориентир:** Modern fresh wellness + Finch spring palette + Apple Fitness with pop accent.

**Stitch prompt:**

> Sugar Quit — AI craving coach. Real-time conversations during cravings, trigger prediction based on time/stress/location, food alternatives, 90-day program. For people who need support in the exact moment they reach for sugar.
>
> Mood & visual identity: imagine a modern jewelry-store garden in spring — fresh mint and pale lavender glow softly behind frosted glass, with occasional pops of saturated pink like peonies in bloom. iOS 17 glass morphism meets a bright modern wellness illustration. Background is a saturated cool gradient: soft mint at the top bleeding into pale lavender mid-screen, fading to warm cream at the bottom. Saturated, not muted.
>
> **Decorative background layer**: behind the glass, 4 large gradient orbs float at different depths — a saturated mint orb top-right, a lavender orb top-left, a **vivid pink orb** mid-center (the pop), a cream orb bottom-right. Soft-blurred radial gradients with dissolving edges. They glow through frosted glass as color patches.
>
> **Architecture — GLASS MORPHISM**: frosted glass panes for every widget container — 40px backdrop blur, 85% white overlay, 1px white-translucent border, soft cool-tinted shadow (16px blur, 8px offset, 12% opacity). Each widget a distinct form.
>
> The SOS button is a solid **GLOSSY** saturated pink-to-coral gradient orb (the pop color) above the tab bar — saturated, with a highlight streak on top, cool-warm shadow. The only vivid pink element. "I'm here when you need me."
>
> Typography: humanist sans-serif (Söhne). Numbers are heroes with **pink-to-lavender gradient text fills**. Bold hero numbers, UPPERCASE TRACKED whisper-light labels with extra letterspacing.
>
> Bottom tab bar: frosted glass bar at base, 4 icon+label pairs, active tab glowing pink. SOS glossy pink orb above-right.
>
> 3 screens.
>
> Home — cool glass grid on mint-lavender-cream gradient with orbs behind:
> (1) **Streak Hero — pure typography, no container**: gigantic "47" with pink-to-lavender gradient text fill, soft radial glow behind. Beside: tiny **flat-illustrated peony** in pink petals with mint leaves. "DAYS CLEAN" UPPERCASE TRACKED pink whisper-label.
> (2) **Craving Forecast — gradient torus ring** in frosted glass pane: 24-hour torus, higher-risk hours in pink-to-coral gradient with glowing halo, calm in pale mint gradient. Pulsing pink dot marks current time. Center: "3:12 PM" pink medium, "NEXT CRAVING WINDOW" UPPERCASE. **Flat-illustrated crescent-moon glyph** in a corner.
> (3) **This Week — curved flowing chart** in frosted glass: 7 data points connected by smooth mint-to-pink flowing curve, area under in pale-mint-to-pink gradient fade, today's point a larger gradient orb with glow. "THIS WEEK · 12 RESISTED" UPPERCASE TRACKED lavender label. **Flat-illustrated petal-strewn line** along bottom.
> (4) **Today's Lesson — illustrated glass card**: **flat-illustrated scene** on left — a hand releasing a seed into the wind, rendered in mint and lavender — "sitting with the discomfort" medium serif italic on right, "TODAY'S PRACTICE" UPPERCASE TRACKED mint label.
> (5) **Trigger Breakdown — illustrated chunky donut** in frosted pane: thick donut with gradient segments — stress deep pink, meetings lavender, social mint, tired cream — each with gradient fill and soft glow rim. Center: "12 of 14" pink-to-lavender gradient text, "RESISTED" UPPERCASE label. Tiny **flat-illustrated leaf glyphs** at corners.
>
> Bottom: frosted glass tab bar. SOS glossy pink-to-coral orb above with highlight streak.
>
> SOS Chat — full-screen on cool gradient with orbs:
> Top: pulsing pink ember + "COACH IS HERE" UPPERCASE TRACKED pink label.
> AI messages: frosted glass bubbles on left, showing orbs behind as soft color patches.
> User messages: saturated pink-to-lavender gradient bubbles on right with glossy highlight.
> Input: frosted pill, pink placeholder, glossy pink-to-coral send orb.
>
> Paywall on cool gradient:
> (1) Streak Hero at top: pink-to-lavender gradient "47", "DAYS CLEAN · KEEP GOING" pink label. Tiny **flat-illustrated petal scatter** beside.
> (2) Two glass pricing cards — "MONTHLY / $9.99" frosted, "YEARLY / $59.99 · BEST VALUE" frosted with **glowing pink-to-lavender gradient border halo** (selected).
> (3) Feature row: 3 tiny **flat illustrations** — AI COACH a speech bubble with a leaf, TRIGGER PREDICTION a wavy compass, 90-DAY PROGRAM a blooming flower — UPPERCASE labels in pink, lavender, mint.
> (4) CTA: glossy pink-to-coral gradient "FREE 7 DAYS" pill with shiny highlight.
> (5) Tiny legal micro-text.
>
> Primary Design Surface: App.

---

## 🅔 Glass Component Sheet v6

**Назначение:** Изолированный тест rich widget-языка с glass morphism + gradient orbs + micro-illustrations + flowing data viz.

**Stitch prompt:**

> A component sheet for Sugar Quit — an AI craving coach that tracks cravings, predicts triggers, visualizes recovery patterns.
>
> Generate 6 UI components floating on an artboard with a saturated vertical gradient background (soft peach at top, pale lavender at bottom). Behind the components, 3 large soft-blurred gradient orbs (peach top-right, lavender mid-left, coral bottom-center) float as decorative radial gradient spheres with dissolving edges.
>
> **Every component container is a frosted glass pane** — 40px backdrop blur, 85% white overlay, 1px white-translucent border, soft drop shadow (14px blur, 6px offset, warm-tinted, 12% opacity). Through each pane the orbs behind show as soft blurred color patches.
>
> **Each component has a distinct form — no two share the same shape.** Multi-hue palette spread across components: **coral** (hero), **amber** (forecast), **peach** (history), **sage** (lesson), **blush** (breakdown), **lavender** (details). Light humanist sans-serif typography (Söhne), numbers as heroes with gradient text fills.
>
> The 6 components:
>
> 1. **Streak Hero — typographic, no container**: gigantic "47" in bold humanist sans with a **coral-to-lavender gradient text fill**, a soft radial glow halo behind. Beside the number, a small **flat-illustrated lotus flower** in blush petals with sage centre. "DAYS CLEAN" UPPERCASE TRACKED coral whisper-label beneath. Below the number: a thin row of 30 small gradient dots (coral-to-peach fade), filled for clean days, gaps for slipped days.
>
> 2. **Craving Forecast — gradient torus ring** inside frosted glass pane: 24-hour thick circular torus, higher-risk hours (3pm, 9pm) rendered as saturated amber-to-coral gradient with a glowing outer halo, calm hours in pale peach gradient. A pulsing coral dot marks current time. Center: "3:12 PM" in amber medium serif, "NEXT CRAVING WINDOW" UPPERCASE TRACKED amber label above. A tiny **flat-illustrated sun glyph** in one corner of the pane.
>
> 3. **30-Day Heatmap — illustrated calendar grid** in frosted glass pane: 6×5 grid of small circles, each with a subtle gradient fill — no-craving days nearly invisible cream, light days faint peach gradient, heavy days saturated peach-to-coral gradient. Resisted days have a tiny saturated coral fill dot; gave-in days a hollow ring. Above: "OCTOBER" UPPERCASE TRACKED peach label. Below: "30 DAYS · 47 CRAVINGS · 42 RESISTED" UPPERCASE TRACKED whisper-light. **Flat-illustrated tiny weather cloud glyph** in a corner.
>
> 4. **Trigger Breakdown — curved flowing chart** in frosted glass pane: instead of horizontal bars, 4 data points shown as a smooth flowing curve from left to right, each point a gradient orb with glow (stress largest in deep coral, then meetings in amber, social in peach, tired in blush). Area under the curve in coral-to-cream gradient fade. Labels below each point: "STRESS 42%" · "MEETINGS 21%" · "SOCIAL 18%" · "TIRED 12%" in UPPERCASE TRACKED whisper-light. **Flat-illustrated tiny sediment-line glyph** along the bottom.
>
> 5. **Resistance Donut — illustrated chunky donut** in frosted glass pane: thick donut split into two gradient segments — resisted (saturated coral-to-amber gradient, 85%, with soft outer glow) and gave-in (muted cream gradient, 15%). Center: "12 of 14" as a large serif number with a coral-to-amber gradient text fill, "RESISTED THIS WEEK" UPPERCASE TRACKED coral label beneath. Tiny **flat-illustrated water-drop glyphs** at the 4 corners of the pane.
>
> 6. **Today's Lesson — illustrated glass card**: **flat-illustrated scene** on the left — a hand holding a smooth pebble, rendered in blush and sage flat colors, tiny lines suggesting texture — "sitting with the discomfort" in medium serif italic on the right, "TODAY'S PRACTICE" UPPERCASE TRACKED sage label above. Pane with subtle sage tint from an orb behind.
>
> Primary Design Surface: App.

---

## Как тестить

1. **Pro (Gemini 2.5 Experimental)**. 4 промпта.
2. Копируй от первого слова до `Primary Design Surface: App.`
3. Без reference-картинок.
4. **3 screens на промпт** — быстро.
5. Смотри результат:
   - "Виджеты как frosted glass с backdrop blur (прозрачность, видно orbs сквозь них)?"
   - "Есть decorative gradient orbs за виджетами?"
   - "Есть micro-illustrations внутри виджетов (рука с камешком, лотос, капли)?"
   - "Saturated contrast или muted pastel?"
   - "Curved flowing data viz или boring bars?"
   - "SOS / CTA — glossy (с highlight streak) или matte?"
   - "Hero numbers с gradient text fill?"
6. Какие 1-2 попали → Этап B.

**Если v6 опять flat и boring** — значит Stitch просто не тянет glass morphism / illustrations; тогда план C: реально давать Stitch reference-изображения (скриншоты Oura / Apple Fitness / Calm) вместо чистого текста.

---

## Archive

- **v3** (A-E literary landscape): landing pages. Git history.
- **v4** (F/G/H widget-grid single-accent): monotone boring, H dark trashy. Git history.
- **v5** (F/G/I multi-hue varied forms): всё равно flat и boring, "старый скучный wellness". Git history.
- **v6** (α/β/γ glass morphism + orbs + illustrations): this file.

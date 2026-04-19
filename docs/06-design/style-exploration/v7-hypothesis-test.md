# Sugar Quit — v7 Hypothesis Test (revised)

**Дата:** 15 апреля 2026
**Цель:** Проверить гипотезу: Stitch работает на **поэтическом языке** + **виджеты-как-объекты** + **много разных типов виджетов на одном экране**.

---

## Гипотезы

Твои 2 "хороших" промпта имели общее:

1. **Язык — короткое стихотворение**, не design brief. Никаких pixel specs, font names, процентов, "backdrop blur", "tab bar", "widget container"
2. **Каждый виджет — метафора-объект из природы** (камень, sundial, sea glass, tree rings, mountain peak), а не chart type (ring chart, horizontal bars, donut)
3. **Одна атмосфера** всю дорогу, без смешивания
4. **Много виджетов разной природы** — Breathing Component Sheet имел 6 виджетов, каждый СВОЕГО класса объектов (stone, lines, glass shapes, spiral, breathing circle, enso circle)

Мои v4-v6 провалились: технический бриф + виджеты как chart types + смешанные атмосферы + только 3-5 виджетов одного класса (blobs).

---

## Тест-промпт: 1 экран, 11 виджетов, все разной природы

Drop чата и paywall — они скучные, стиль по ним плохо читается.
Оставляем только Home — но **плотный, с 11 диверс-виджетами**, где можно оценить язык дизайна.

```
Sugar Quit — AI craving coach. Real-time conversations during cravings, predictive trigger detection, food alternatives, 90-day program, savings tracking, community support. For people who need support in the exact moment they reach for sugar.

Mood & visual identity: the moment you push back your chair from the kitchen, close your eyes, and simply don't reach for it — that quiet small triumph, multiplied across weeks. This app lives in that triumph. The palette is dawn — warm cream lifting into soft apricot at the top, dissolving into pale sage at the edges, with a faint coral ember in the lower distance. The colors don't break into zones — they breathe into each other like weather. No cards, no containers, no boxes. Elements float at different depths in the dawn, crisp when they matter, dissolving when they don't.

Every element on this screen is its own natural object with its own form — no two elements share a visual type. Some are stones, some are rings, some are scattered shapes, some are layered bands, some are flowing spirals, some are gently pulsing circles, some are tiny weather glyphs, some are rising sprouts, some are drifting leaves, some are distant constellations. Diversity of form is the point — the eye moves from object to object, each one different, each one speaking its own small piece of your recovery.

Your streak is a stone you've been carrying — a smooth asymmetric river stone in warm coral, large and clear in the upper half of the screen, with "47" engraved in thin numerals at its center and "days clean" beneath in whisper text. No two stones are identical, no two streaks are identical.

The craving forecast is a sundial of vulnerability — a thin ring floating to the right of the stone, its arc warming toward amber where today's risk hours sit (3pm, 9pm), cooling toward cream where the calm hours rest. A small filled dot marks this very moment on the arc. In its center, the next risk window time in thin serif: "3:12 pm."

Your week is sea glass — seven small organic shapes scattered along a gentle horizon line in the middle of the screen, each shape's size showing how many cravings came that day; the filled ones are the days you held, the outlined ones the days that took you. Today's piece catches the light.

Your breath is an ember — a gently pulsing circle at the center-right, warm coral at its heart softening outward into the dawn, slowly expanding and contracting like a rhythm you can match. Below it in whisper text: "breathe with me." A tool for when the craving comes.

Your triggers are sediment — four thin layered bands in the lower-left of the screen, each a different warm tone: stress the deepest coral, meetings amber, social peach, tired blush. Their widths proportional to how often each calls you. Like the strata of your week, quietly readable.

Your year is a spiral — a small flowing spiral of 365 tiny dots drifting from center outward in the mid-right, each dot's opacity showing that day's craving count. Today marks the outer edge of the spiral in coral. Like tree rings made of days.

Today's mood is a weather glyph — a tiny gentle weather condition in the upper-right corner, today rendered as soft partial sun with one drifting cloud. Below it: a single word for today — "tender."

Your money saved is a sprout — thin green lines rising from the bottom-left edge, one for each week you've saved the cost of your sugar habit; beside them in thin numerals: "$94 saved." Each sprout a little taller than the last, like a small garden of weeks.

Today's practice is a leaf — a single blush petal resting at mid-left, with one gentle italic line above it: "sitting with the discomfort." Nothing more.

Others walking beside you are a constellation — twenty small distant lights scattered in the pale upper edges of the dawn, each a fellow traveler's streak; yours is the brightest at the center near the stone. The others whisper around you. "You are not alone."

The SOS is fire — a solid saturated circle of warm coral with a faint glow around it, settled in the bottom-right above the navigation — the only element with a definite edge and a full saturation. "I am here. Reach."

The navigation at the base is four quiet labels — Home, Patterns, Coach, Profile — barely there, never the focus, fading into the dawn.

Typography is whisper-thin sans-serif throughout. Numbers are the heroes — your streak, your resisted, your dollars, your days. Large, at the surface of the dawn, clear and proud. Labels are the softest possible tracked uppercase, barely-there.

1 screen. The whole app is this dawn landscape of small natural objects arranged across depths — the streak stone near the top, the sundial ring beside it, the mood weather glyph in the upper corner, the community constellation in the upper distance, the breathing ember at the center-right, the sea glass along the horizon, the year spiral on the mid-right, the today's practice leaf mid-left, the trigger sediment in the lower-left, the savings sprout rising from the bottom-left, the SOS fire in the bottom-right, the quiet navigation at the base.

Primary Design Surface: App.
```

---

## Что проверяем в результате

| Критерий | Что смотреть |
|---|---|
| **Плотность** | 11+ различимых объектов на экране, не 3 |
| **Разнообразие форм** | Stone ≠ ring ≠ bands ≠ spiral ≠ pulse ≠ glyph ≠ sprout ≠ leaf ≠ constellation ≠ fire |
| **Атмосфера** | Реальный dawn gradient (не flat), объекты "floating at depths" |
| **Stone** | Настоящий smooth river stone с engraved числом, а не circle |
| **Sundial** | Arc warming amber at risk hours, а не uniform ring |
| **Sea glass** | Organic shapes разных размеров, а не identical circles |
| **Ember pulse** | Концентрические круги расходятся, как рипплы на воде |
| **Sediment** | Layered warm bands, strata of week |
| **Spiral** | 365 dots в spiral, а не grid |
| **Weather** | Tiny sun/cloud/rain glyph, а не generic icon |
| **Sprout** | Thin green rising lines, а не progress bar |
| **Leaf** | Blush petal с single italic line |
| **Constellation** | Scattered small lights, а не row of dots |
| **Fire SOS** | Saturated + glow halo, "only element with definite edge" |

---

## Если работает

Формула: **поэма + метафоры-объекты + одна атмосфера + 10+ диверс-виджетов**.

Тогда v8 = 3 атмосферы в этом же режиме:
- **Dawn** (эта — warm-cool triumph)
- **Evening Garden** (вечерняя рефлексия — зелёно-лавандовая)
- **Golden Afternoon** (уверенность середины пути — золотисто-тёплая)

Каждая со своим набором метафор-объектов (evening: моли и светлячки, afternoon: bee и honey etc.) но одинаковой плотностью.

---

## Если НЕ работает

Значит Stitch по тексту в принципе не тянет эту глубину. План C: **reference images**. Даём скриншоты Oura / Apple Fitness / Calm / Finch как эталон и "build the Sugar Quit equivalent in this aesthetic".

---

## Что ТОЧНО не делать (список ошибок v4-v6)

- ❌ Технические specs: "40px backdrop blur", "Söhne font", "12px shadow"
- ❌ UI-жаргон: "widget container", "tab bar", "glass morphism", "soft-edge blob"
- ❌ Chart types: "ring chart", "horizontal bar chart", "donut chart"
- ❌ Смешанные атмосферы: "glass + orbs + illustrations + iOS + Apple Fitness"
- ❌ Однотипные виджеты: 5 кругов или 5 soft-edge blobs подряд
- ❌ Прописанная сетка: "vertical stack of 5 containers"
- ❌ Meta-commentary: "NO prose on screens", "each widget distinct form"
- ❌ Скучные screens (chat, paywall) — стиль по ним плохо читается

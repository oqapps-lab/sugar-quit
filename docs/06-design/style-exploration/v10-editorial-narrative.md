# Sugar Quit — v10 Editorial Narrative

**Дата:** 15 апреля 2026
**Инсайт:** The Exhale и Zen Editorial — вот ГОЛД СТАНДАРТ. Editorial narrative, не dashboard grid. 4-5 rich story sections вместо 11 cramped widgets. Screen-wide vertical gradient как narrative arc дня. Color = function.

---

## Что изменилось в мышлении

**Не dashboard, а wellness weather report.** The Exhale — это прогноз тяги на день, читается как editorial magazine page. 3 time-zone cards (morning / peak / evening) каждая со своим mood и gradient fill. Streak footer. Nav. Всё.

**Color as function.** Warm coral = high risk. Peach = calm morning. Mint = evening exhale. Gradient НЕ decoration — он narrative device.

**Economy > density.** 5 rich elements > 11 cramped widgets. Каждой секции дать воздух и character.

**Editorial typography.** "Today is **Light**" как magazine headline с sans+italic-serif mix. UPPERCASE TRACKED только для section labels, не для всего подряд.

---

## v10 промпт (без reference images нужен)

```
Sugar Quit — AI craving coach. Daily forecast of your craving risk based on time-of-day, stress, and context patterns. Real-time SOS conversations during cravings, food alternatives, 90-day neuroscience program, community. For people who need support in the exact moment they reach for sugar.

Mood & visual identity: imagine a thoughtful wellness weather report for your cravings — each day forecast in warmth, cooling, and peaks. The slow exhale after you successfully resist a craving — that wave of pride and calm washing over you. This app lives in that exhale.

The palette breathes — large, slow, atmospheric gradients that shift like sky colors through the day. The entire screen is ONE long vertical gradient that narrates the day: cream at the top for dawn calm, warming through peach and coral in the middle for afternoon peak risk, cooling into pale lavender and soft mint at the bottom for evening exhale. The gradient is not a background — it IS the interface, creating zones and hierarchy through color temperature. Warmer color means higher craving risk. Cooler color means calm.

Cards float on this gradient as frosted-glass surfaces that pick up the color of the gradient beneath them — the morning card glows peach, the afternoon card glows saturated coral-amber, the evening card glows mint-lavender. Editorial typography throughout — large hero serif for forecast headlines, clean sans for body, tiny UPPERCASE TRACKED labels for sections, massive sans-serif numbers where the streak appears.

One screen. Home is today's craving forecast, read like a wellness weather report crossed with a thoughtful magazine page.

[top header] A small exhale/leaf glyph logo beside the app name "Sugar Quit" in small clean sans on the left, a small circular user avatar on the right.

[section label] A tiny UPPERCASE TRACKED label in muted warm tone beneath the header: "CRAVING FORECAST"

[hero] Large editorial hero typography — "Today is" in large sans on one line, then "Light" in massive italic serif on the next line (Light is the hero word — the forecast of the day, the largest element on the screen). Below the hero in soft body text: "The atmospheric pressure of temptation is low. A cool lavender evening awaits your focus."

[morning card — frosted glass with peach gradient backdrop glowing through] Top-left corner: "08:00 — 12:00" in tiny UPPERCASE TRACKED. Middle: "Calm" as a large serif headline. Right side: a small peach water-drop icon. Below the headline: "Low risk zone. Perfect for deep work." in soft body text. No action button — morning is safe.

[afternoon card — frosted glass with saturated coral-to-amber gradient backdrop warming through, noticeably more vibrant than the morning card] Top-left: "15:00 — 18:00" in tiny UPPERCASE TRACKED. Middle: "High Surge" as a larger serif headline — a warning. Below: "Expect a spike in cortisol. Prepare your breathing anchors early." in soft body. A saturated coral pill button beneath the body: "SOS PLAN" in small clean sans. Behind all of this text, ghosted into the card background, a massive translucent sans-serif "17:45" — the peak hour rendered as semi-transparent hero typography filling the card's negative space.

[evening card — frosted glass with mint-to-lavender gradient backdrop cooling through] Left: a small soft silhouette of a breathing glyph (a bird, a leaf, or a gentle wave). Right: "The Exhale" as a serif headline. Below: "Ambers shift to cool mint. Risk levels drop to zero as the day concludes." in soft body text.

[streak footer] A thin horizontal row near the bottom: a tiny wave-trend icon on the left, a small soft lavender-pink pill labeled "Weekly Trend" on the right. Below that row: a massive bold "14" as a number (the single heaviest numeric element on the screen), with "Successive Days" in tiny UPPERCASE TRACKED beneath in whisper tone.

[nav] At the very bottom edge: a minimal pill-shaped navigation bar with four small rounded icons (home, forecast, insights, settings). Whisper-thin, never the focus.

Primary Design Surface: App.
```

---

## Почему этот промпт должен сработать

| Элемент | Как v10 | Как v8/v9 делали неправильно |
|---|---|---|
| **Композиция** | 5 story-sections c воздухом | 11 cramped виджетов |
| **Gradient** | Screen-wide vertical narrative (dawn→peak→evening) | Orbs behind glass (decorative) |
| **Cards** | Frosted glass picking up color from gradient beneath | Frosted glass с flat white |
| **Цвет** | Function (warmer = risk) | Decoration (multi-hue distributed) |
| **Typography** | Editorial serif hero + tiny UPPERCASE labels | UPPERCASE TRACKED во всех виджетах |
| **Content** | Weather report story с personalities ("Calm", "High Surge", "The Exhale") | Generic labels ("THIS WEEK / 12 RESISTED") |
| **Data viz** | Ghosted background numbers ("17:45"), massive hero ("14") | Chart types (rings, bars, donuts) |
| **Action** | Одна "SOS PLAN" pill в peak card | Отдельный SOS fire pill-button |

---

## Если v10 получится как The Exhale

v11 = 2-3 вариации same editorial narrative для разных screens:
- **Today's Forecast** (эта — Home, daily craving forecast)
- **Your Recovery Progress** (90-day journey, milestones as editorial chapters)
- **Your Breathing Anchor** (grounding screen like Zen Editorial — one hero breath orb + technique list + mood check)

Всё в одном языке, narrative style, не dashboard.

---

## Что НЕ делать в v10

- ❌ Не добавлять "NO flat blocks" rules — они ломают atmospheric mode
- ❌ Не прописывать "11 виджетов, каждый своей формы"
- ❌ Не смешивать Oura / Apple Fitness / Calm референсы — это один editorial style
- ❌ Не требовать "SOS pill above tab bar" — The Exhale этого не делает
- ❌ Не добавлять "widget grid + bottom tab bar" mechanical instructions
- ❌ Не описывать chart types — все секции story-sections с personality

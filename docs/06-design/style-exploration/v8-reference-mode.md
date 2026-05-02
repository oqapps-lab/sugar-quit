# Sugar Quit — v8 Reference Mode

**Дата:** 15 апреля 2026
**План:** Stitch с reference images (до 3 штук) + короткий промпт. Картинки делают aesthetic, промпт делает content.

---

## Почему reference mode

v4-v7 провал: Stitch по чистому тексту не рендерит organic shapes, глубину, glass morphism, красивые palettes. Всё сжимается в primitive geometrics и flat fills. Только картинки передают вкус.

---

## Инструкция

1. **Зарегистрируйся на [mobbin.com](https://mobbin.com)** (бесплатно)
2. Найди 2-3 home screens от apps:
   - **Oura** (лучший — soft gradient rings, warm palette, dense widgets)
   - **Calm** (atmospheric gradients, meditation feel)
   - **Finch** (soft wellness illustrations, warm pastels)
   - **Fabulous** (gradient hero screens)
3. Скачай скриншоты (PNG)
4. В Stitch Pro: **"Add reference"** → загрузи 2-3 PNG
5. Вставь промпт ниже → Generate

---

## Промпт (короткий, под reference mode)

```
Sugar Quit — AI craving coach for people quitting sugar. Track days clean, predict craving windows, log resisted cravings, see patterns, save money, grow with community.

Use the exact aesthetic of the attached reference image(s) — same color palette, gradient style, typography, spacing, shadow/depth system, widget visual language, rounded corners. Build Sugar Quit's home screen in this aesthetic — same level of polish, same density of widgets, same visual hierarchy.

Home screen widgets (in order of importance):
- Days clean (big hero number, "47 DAYS CLEAN")
- Today's craving forecast (next risk window with time)
- This week at a glance (7 days, cravings held vs slipped)
- Breathing tool (tap-to-start grounding moment)
- Trigger breakdown (stress / meetings / social / tired with percentages)
- Year pattern (365 days visualization)
- Today's mood (glyph + word)
- Money saved (dollar amount)
- Today's practice (single-line lesson text)
- Community (other users' streaks visible)
- SOS button (warm coral, always reachable, floats above tab bar)
- Bottom tab bar (Home / Patterns / Coach / Profile)

Match the references. If they show gradient rings — use gradient rings. If they show glass cards — use glass cards. If they use 3-column grid — use 3-column grid. If they have illustrated elements — include illustrated elements.

1 screen. Home. Primary Design Surface: App.
```

---

## Варианты референс-пакетов

**Вариант A — Soft Gradient Wellness (рекомендую первый):**
- Oura home screen
- Calm home screen
- Fabulous home screen

Ожидаемый результат: тёплые gradient rings, soft palette, dense data viz, atmospheric depth.

**Вариант B — Illustrated Warm:**
- Finch home screen
- Headspace home screen
- Calm home screen

Ожидаемый результат: cute illustrated wellness, pastel, с элементами характера.

**Вариант C — Premium Modern:**
- Oura home
- Apple Fitness home
- Superhuman (if available)

Ожидаемый результат: glossy, bold gradients, glass, premium feel.

---

## Если reference mode тоже не тянет

Последний fallback: генерируем **руками в Figma** по моим 6-слотным widget specs, без Stitch вообще. Stitch окажется не тем инструментом для этого продукта.

---

## Как оценивать результат v8

- [ ] Layout чистый (не scattered 2-column-broken)
- [ ] Shapes organic или хотя бы rounded-rect (не pentagons/hexagons)
- [ ] Есть depth — shadows, gradients в containers
- [ ] Palette без clash (coral + sage пары работают если спокойные, рядом ярких коралла и зелени не даём)
- [ ] Виджеты разнообразны по типу (rings + bars + number + cards + chart)
- [ ] Density ощущается — 8+ виджетов читаются
- [ ] SOS анкер виден
- [ ] Tab bar есть и не доминирует

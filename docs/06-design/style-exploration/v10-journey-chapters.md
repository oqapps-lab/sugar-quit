# Sugar Quit — Journey (90-day Chapters) screen

**Экран:** прогресс 90-дневной программы.
**Фикс v10-journey-path:** убрал illustrated path-scene (Stitch её рендерит как кашу), вернул стандартный mobile стек карточек. Атмосфера идёт через **gradient temperature по временной оси** (past=warm, current=saturated, future=cool) + **editorial typography** + **chapter-pages метафорика**. Структура — простая, renderable. Атмосфера декорирует, не заменяет.

---

## Промпт

```
Sugar Quit — AI craving coach. A 90-day neuroscience-backed program that guides you from first decision through mastery. Daily practices, trigger prediction, community support. For people who have decided to change and want to see the shape of the journey they're walking.

Mood & visual identity: imagine a diary laid open on a warm afternoon, pages turning under soft light — the early pages glow with honey warmth from the window, the current page is open before you, the pages ahead wait in soft shadow. This app lives in that moment of turning pages. The palette is late-afternoon diary light — warm honey and soft amber on the lived pages, current-day coral on the open page, pale plum and cool grey on the pages still to come. Color temperature tells you where you are on the journey — completed chapters glow warm, the current chapter saturates, upcoming chapters rest in cool shadow.

Cards on this screen are chapter pages — frosted-glass rectangles that pick up the warmth or coolness of their position in the journey. Completed chapter cards are warm honey-gradient frosted glass with soft gold type. The current chapter card is a larger saturated coral-to-amber gradient anchor. Upcoming chapter cards are pale plum frosted glass with outlined unfilled markers.

The current chapter IS the anchor — the only fully-saturated surface on the screen, its coral-to-amber gradient visibly warmer than the past-cards and cooler future-cards around it. "You are here. Week 7 is open."

Typography is editorial — large italic serif for chapter titles, clean thin sans for day counts, whisper-weight for dates and descriptions. Numbers are the heroes — Day 47, Week 7, 42 days walked, 43 days ahead. Large, at rest.

One screen. The journal of your 90 days.

At the top, a small soft exhale-glyph beside "Sugar Quit" in clean sans on the left, a small profile avatar on the right.

Below the header, a tiny UPPERCASE TRACKED warm honey label: "YOUR 90-DAY PATH."

Hero: editorial — "Day 47" in massive thin serif on one line, "Week 7 · Meeting Your Triggers" in italic serif beneath, then a soft subtitle in whisper sans: "You have walked further than most ever begin. Today's chapter is about learning to sit with what used to send you running."

The current chapter card — a large saturated coral-to-amber gradient frosted-glass card, slightly wider than any other card on the screen, with a warm soft shadow beneath. Inside the card: "THIS WEEK" in tiny UPPERCASE TRACKED coral, then "Meeting Your Triggers" in large italic serif, then a short bullet-list of three practices in thin sans:
— "Notice without responding"
— "Name the feeling out loud"
— "Breathe through the first thirty seconds"
A small warm coral pill button at the bottom-right of the card: "Today's practice →."

Below the current chapter card, a thin section label in tiny UPPERCASE TRACKED warm honey tone: "BEHIND YOU."

A vertical stack of three completed-chapter cards, each a warm honey-gradient frosted-glass rectangle, smaller and softer than the current card, with a small filled gold dot on its left edge:
— "Week 5 · Mapping Your Triggers" in italic serif, "Completed Mar 27" in whisper.
— "Week 3 · Identity Shift" in italic serif, "Completed Mar 13" in whisper.
— "Week 1 · First Decision" in italic serif, "Completed Feb 27" in whisper.

Below these, a thin section label in tiny UPPERCASE TRACKED muted plum tone: "AHEAD OF YOU."

A vertical stack of two upcoming-chapter cards, each a pale plum-gradient frosted-glass rectangle with a small hollow outlined marker on its left edge — cooler, quieter:
— "Week 9 · Social Landscapes" in italic serif, "coming" in whisper.
— "Week 11 · The Long View" in italic serif, "coming" in whisper.

A final destination card at the very bottom of the chapter list, slightly larger than the upcoming cards but still pale and outlined: "Day 90 · The Threshold" in larger italic serif, "your destination" in whisper.

Just above the bottom nav, a thin stats strip in warm honey tone: "47 CRAVINGS MET · $94 SAVED · 12 BREATHING SESSIONS" — tiny UPPERCASE TRACKED labels with thin-sans numbers.

At the very bottom, a minimal pill-shaped navigation bar with four whisper icons — home / path (active, filled warm honey) / coach / profile.

Primary Design Surface: App.
```

---

## Что изменилось vs v10-journey-path (которая стала кашей)

| Сломанная версия (winding path) | Исправленная (stacked chapters) |
|---|---|
| Illustrated scene — curved brass thread через весь экран | Стандартный mobile стек вертикальных card'ов |
| Stones / plants / wooden posts раскиданы вдоль линии | Chapter-cards один над другим, clear hierarchy |
| Floating frosted aside в стороне | Всё в основном потоке |
| Current-you как marker на линии | Current chapter card как larger saturated anchor |
| Stitch тянет UI, не scene → rendered as mess | Stitch тянет стандартный UI stack → renders clean |

Структура теперь renderable. Метафорика (diary chapters, warm past / saturated present / cool future) — свежая, не из твоих промптов. Атмосфера идёт через gradient temperature на оси времени + editorial typography, а не через illustrated scene.

---

## Формула соблюдена + добавлено правило

**Новое 14-е правило формулы:**
> Атмосферный язык декорирует СТАНДАРТНУЮ mobile UI структуру (card stack, list, row, grid), а не ЗАМЕНЯЕТ её illustrated scene'ом. Stitch рендерит UI, не картинки.

Обновлю FORMULA.md после этого теста, если v10-journey-chapters нормально отработает.

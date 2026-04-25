# Google Stitch — Research

**Дата:** 14 апреля 2026
**Назначение:** Понять, как лучше всего формулировать промпты для Stitch на проекте Sugar Quit.
**Источники:** Google Labs, Codecademy tutorial, MindStudio blog, UX Planet, Google AI Developers Forum.

---

## 1. Что такое Stitch

Stitch — AI-инструмент от Google Labs, анонсирован на Google I/O 2025. Превращает текстовый промпт или референс-картинку в готовый UI мобильного/веб-экрана + front-end код. Выход можно скопировать в Figma или экспортировать HTML/CSS.

**Вывод:** Нам Stitch нужен именно как генератор визуальных мокапов, которые мы потом вручную переносим в React Native. Код из Stitch напрямую не используем (он под web), берём только дизайн.

---

## 2. Два режима

| Режим | Модель | Лимит | Когда использовать |
|---|---|---|---|
| **Standard** | Gemini 2.5 Flash | 350/мес | Этап A (поиск стиля) — быстрые итерации, много попыток |
| **Experimental** | Gemini 2.5 Pro | 50/мес | Этап C (финальные экраны) — максимальное качество |

**Стратегия:** Phase A и B — Flash. Phase C — Pro для ключевых экранов (Home, SOS, Paywall, Onboarding 1-3), Flash для остальных.

---

## 3. Что Stitch хорошо понимает в промпте

По документации и Prompt Guide в Google AI Developers Forum, Stitch лучше всего считывает:

### Обязательные блоки промпта

1. **Тип экрана + назначение** — "Home dashboard for a sugar addiction coaching app"
2. **Target audience** — "for a stressed office worker, woman 28-35, tech-savvy"
3. **Стиль / настроение** — adjectives ("warm, empathetic, minimal, premium")
4. **Цветовая палитра** — либо HEX, либо mood ("soft coral and cream with mint accents")
5. **Типографика** — "rounded sans-serif" / "editorial serif" / "mono tech"
6. **Радиусы и форма** — "fully rounded corners" / "sharp edges" / "pill-shaped buttons"
7. **Конкретные элементы экрана** — что должно быть видно (hero, cards, buttons)
8. **Конкретный контент** — реальные тексты, числа, не lorem ipsum

### Что Stitch игнорирует или путает

- Сложная иерархия ("первое, потом второе, но внутри первого...") — лучше разбивать на экраны
- Слишком много элементов в одном экране — стоит ограничивать 5-7 главных блоков
- Противоречивые инструкции ("minimal and maximalist") — выбирать одно направление

---

## 4. Лучшие практики промптов

### Структура, которая работает

```
[Screen type] for [app name], a [app description] for [target persona].
Style: [adjectives — 3-5 words].
Palette: [colors — exact HEX or mood].
Typography: [font family + weight].
Shapes: [border-radius + icon style].
Mood: [one sentence of feeling].

Screen contents:
- [Element 1 with content]
- [Element 2 with content]
- [Element 3 with content]

Target persona: [1 sentence].
```

### Итеративное уточнение

По гайду Stitch, лучше всего работает пошаговое уточнение:

1. Сначала — layout и структура (расположение блоков)
2. Потом — цвета и типографика
3. В конце — отступы, тени, детали

Мы делаем это через Phase A → B → C.

### Примеры рефайнов после первой генерации

- "Place the streak counter in the center, not left-aligned"
- "Make SOS button larger and more prominent, bottom-right floating"
- "Change card backgrounds to soft coral gradient instead of flat white"
- "Use a circular ring chart for sugar intake, not a bar"

---

## 5. design.md (как закрепить стиль)

Внутри проекта Stitch можно создать файл `design.md` — markdown со спецификацией бренда:
- Цветовая палитра (primary, secondary, accent, background, text) с HEX
- Типографика (family, sizes, weights, line-heights)
- Spacing / grid
- Component styles (buttons, cards, inputs)

Stitch читает этот файл перед каждой генерацией — не надо повторять стиль в каждом промпте.

**Для нас:** после Phase B сохраним DESIGN-DIRECTION.md, он станет основой design.md в Stitch.

---

## 6. Что Stitch извлекает из URL/картинок

Если дать Stitch референс (URL или загруженную картинку), он вытаскивает:
- Палитру (primary, secondary, accent, background, text)
- Типографику (family, sizes, weights, line-heights for headings и body)
- Spacing и layout structure
- Component style (buttons, cards)

**Применение:** На Phase A можно давать референсы-скриншоты (Flo, Finch, Calm, Headspace) чтобы быстрее поймать стиль. Но осторожно — получится копия, а не оригинальный дизайн.

---

## 7. Ограничения

- Stitch лучше в мобильных экранах, чем в web (наш случай — mobile, хорошо).
- Иконки генерирует, но не всегда в одном стиле — лучше потом менять на Lucide/SF Symbols вручную.
- Не умеет в сложную анимацию — только статика. Motion-дизайн делаем отдельно (Rive/Lottie).
- Иногда генерирует "AI slop" — generic wellness-картинки. Защита — очень конкретные промпты + реальный контент.

---

## 8. Выводы для Sugar Quit

### Ключевой экран для Phase A

Выбираем **Home Screen (2.1)**. Причины:
- Максимум визуальных элементов (streak hero, SOS button, 2 cards, stats row) — хорошая поверхность для оценки стиля.
- Пользователь возвращается сюда каждый день — именно здесь формируется ощущение бренда.
- SOS Chat (3.1) — это просто сообщения, стиль сложно оценить.
- Result Screen (1.14) — хороший, но слишком событийный (одноразовый aha-moment, не повторяющийся опыт).

### Primary persona для подбора стиля

**Stress Sarah** — 28-35, женщина, офисный работник в tech-среде, Instagram/TikTok-native, платит за Headspace, хочет empathic-не-judgmental тон.

### Что это значит для направлений стилей

- Warm, empathetic, soft — НЕ жёсткий brutalism
- Instagram-friendly — shareable, "красиво"
- Не слишком клинический / медицинский — это не диабет-трекер
- Не слишком детский — Sarah не подросток, это wellness для взрослой женщины
- Modern, но не холодно-tech — эмпатия важнее скорости

### Диапазон экспериментов

Мы намеренно тестируем в Phase A крайности (brutalism, anime-pastel, editorial serif), чтобы поймать границы — даже "неподходящие" варианты дают референс, от которого мы отталкиваемся.

---

## 9. Практический пайплайн

```
1. Phase A — 12 стилевых вариантов Home screen. Flash-режим.
   → Amanda выбирает 1 победителя (или гибрид 2х).

2. Phase B — 3-5 уточнений победителя (палитра, плотность, акцент).
   → Amanda утверждает финальную палитру и типографику.
   → Фиксируем в DESIGN-DIRECTION.md.

3. Phase C — генерируем все ~30 экранов в утверждённом стиле.
   Pro-режим на ключевых 5-7 экранах, Flash на остальных.

4. Экспорт в Figma → ручная сборка React Native на Expo SDK 55.
```

---

## 10. Sources

- [Stitch - Design with AI - Google](https://stitch.withgoogle.com/)
- [Google Stitch Tutorial | Codecademy](https://www.codecademy.com/article/google-stitch-tutorial-ai-powered-ui-design-tool)
- [Stitch Prompt Guide | Google AI Developers Forum](https://discuss.ai.google.dev/t/stitch-prompt-guide/83844)
- [What Is Google Stitch's Design.md File | MindStudio](https://www.mindstudio.ai/blog/what-is-google-stitch-design-md-file)
- [Google Stitch Complete Guide 2026 | NxCode](https://www.nxcode.io/resources/news/google-stitch-complete-guide-vibe-design-2026)
- [From idea to app: Introducing Stitch | Google Developers Blog](https://developers.googleblog.com/stitch-a-new-way-to-design-uis/)

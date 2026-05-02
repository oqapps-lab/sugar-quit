# Формула твоих работающих Stitch-промптов

**Источник:** diff твоих двух успешных промптов (Sugar Quit Breathing Gradient + Zen Breathing Component Sheet) + результатов (The Exhale + Zen Editorial).
**Цель:** абстрактный структурный шаблон, не копия. Заполняешь слоты — получаешь промпт под любой экран/продукт.

---

## Два жанра

### Жанр A: App-Level (один экран или несколько)

```
[ПРОДУКТ] — [короткий жанровый дескриптор]. [2-3 конкретных фичи через запятую]. For [момент нужды, не persona].

Mood & visual identity: imagine [конкретный телесно-эмоциональный момент]. This app lives in [суть этого момента одной фразой]. The palette [breathes/flows/settles/glows] — [природная метафора: large, slow, atmospheric X] that [verb] like [конкретное природное явление]. [Цвет A] [verb перехода] into [цвет B]. [Цвет C] [dissolving/fading/cooling] into [цвет D]. [ФИЛОСОФИЯ X-instead-of-Y: эстетический элемент как функция, напр. "gradients ARE the interface, creating zones through color temperature instead of borders"].

[АРХИТЕКТУРА ПРОСТРАНСТВА: как элементы относятся друг к другу через landscape-метафору, а не через grid/stack]. [ФУНКЦИОНАЛЬНАЯ ЭСТЕТИКА: один визуальный элемент делает data-работу, напр. "warmer tones mean higher risk, cooler tones mean calm day"].

[ЯКОРЬ: ОДИН элемент выбивается из паттерна — crisp edge / full saturation / definite shape. Прямая речь элемента ("I am HERE, tap me" / "Reach for me" / "Here when you need me"). Его роль в композиции ("grounded and real in a dreamy landscape")].

Typography is [прилагательное] [стиль] — [weight A] [verb поведения], [weight B] [verb поведения]. Numbers are the heroes — [перечень конкретных чисел: streak, дни, сэкономлено]. They [описание как они существуют на экране: "large, bold, sit at the surface of the gradient, casting no shadow — just existing, clear and proud"].

[ОПЦИОНАЛЬНО: feature-specific interface описан в той же атмосферной лексике. Напр. "chat is the gradient becoming interactive — messages float in soft bubbles that match the current gradient zone"].

[N screens.] Home screen: [SCENE-МЕТАФОРА — элементы названы как natural-world объекты в landscape: mountain peak / horizon line / soft shapes at edges / part of the same sky].

Primary Design Surface: App.
```

### Жанр B: Component Sheet

```
A component sheet for [ПРОДУКТ] — [тема/фокус одной фразой: "quiet achievements and premium features"].

Generate [N] UI components on [clean backdrop: "near-white artboard"]. [3-4 ГЛОБАЛЬНЫХ ПРАВИЛА короткими фразами: "Floating, no frames. Ultra-minimal. Circles and pills. One accent. Whisper typography"]. [ЭМОЦИОНАЛЬНАЯ ДИРЕКТИВА: "should feel earned and meaningful, not gamified"].

[Для каждого из N компонентов — один параграф по формуле 5-слотов:]
[ИМЯ] — [ФОРМА-КАК-ОБЪЕКТ: "a smooth rounded shape — like an actual river stone or pebble"]. [МЕХАНИКА: как форма меняется с данными: "engraved with milestone in thin text"]. [СОСТОЯНИЯ: "each milestone slightly different organic shape — no two stones identical"]. [КОНКРЕТНЫЙ ТЕКСТ: реальный label + реальный content: "100 sessions, the date achieved in whisper text"]. Like [ЗАКРЫВАЮЩАЯ МЕТАФОРА: "finding a meaningful stone on a path and keeping it"].

Primary Design Surface: App.
```

---

## 13 правил, извлечённых из твоих двух промптов

| № | Правило | Пример из твоих промптов |
|---|---|---|
| 1 | **Identity + moment**, не категория | "For people who need support in the exact moment they reach for sugar" — не "for stressed office workers" |
| 2 | **Mood через телесный момент**, не abstract adjective | "the slow exhale after you successfully resist" — не "calm and relaxing" |
| 3 | **Palette через природную метафору** | "sky colors during golden hour" — не "HEX #FFE4C4" |
| 4 | **X-instead-of-Y философия** | "color temperature instead of borders"; "gradients ARE the interface" |
| 5 | **Функциональная эстетика** — один элемент делает data-работу | "warmer tones mean higher risk" |
| 6 | **Якорь с прямой речью** | "SOS... 'I am HERE, tap me'" |
| 7 | **Typography по ролям**, не specs | "thin weights float, bold weights anchor" — не "Söhne 14px" |
| 8 | **Numbers are heroes** | "streak, days sugar-free, cravings beaten" перечисление конкретных |
| 9 | **Каждый элемент — метафора-объект**, не chart type | "mountain peak", "horizon line", "river stone", "sea glass", "tree rings" — не "ring chart", "bar chart" |
| 10 | **Элементы с мини-механикой** | "size shows minutes practiced", "filled = completed, outlined = future" |
| 11 | **Scene/landscape композиция**, не grid | "emerging from the color like a mountain peak... soft shapes at the edges... part of the same sky" — не "vertical stack" |
| 12 | **Sparse global rules**, 3-4 коротких | "Circles and pills. One accent. Whisper typography." — не 20-point checklist |
| 13 | **Closer**: `Primary Design Surface: App.` |  |

---

## Что НЕ в формуле (мои ошибочные добавки v4-v9)

- ❌ Pixel specs (40px backdrop blur, 12px radius)
- ❌ Font names (Söhne, Aktiv Grotesk)
- ❌ UI-жаргон (widget container, tab bar, glass morphism)
- ❌ Chart types (ring chart, horizontal bar chart, donut chart)
- ❌ Multi-hue palette distributions
- ❌ Decorative orbs behind glass
- ❌ STRICT aesthetic rules ("NO flat blocks anywhere")
- ❌ Per-image reference mappings
- ❌ Presentation-quality Dribbble directives
- ❌ Widget grid с bottom tab bar
- ❌ UPPERCASE TRACKED labels для всего

Эти добавки сломали формулу — переключали Stitch из generative-creative mode в retrieve-generic-template mode.

---

## Как пользоваться формулой

1. Выбираешь жанр: App-level или Component Sheet
2. Выбираешь экран/концепт (SOS Chat / Breathing Anchor / Progress / Insights / Paywall)
3. Заполняешь слоты КОНКРЕТНЫМ контентом этого экрана — но в ЯЗЫКЕ формулы
4. Копируешь в Stitch Pro, без картинок, без add-ons

**Ключ:** слоты заполняешь **атмосферной лексикой + метафорами-объектами**, не техническими specs и не chart types.

---

## Проверочный тест: "Прошла бы эта фраза в твоём хорошем промпте?"

Перед финализацией любого промпта — прочти каждое предложение и спроси:
- Это звучит как **короткое стихотворение** или как **technical spec**?
- Элемент назван как **объект из мира** или как **UI-жаргон**?
- Метафора **природная** или **tech/product-referential**?
- Palette описана через **natural phenomena** или через **HEX/technical color names**?
- Typography описана через **роль** или через **font-family + size**?

Если хоть одно "technical" — перепиши в поэтическую форму, иначе Stitch уйдёт в generic SaaS template.

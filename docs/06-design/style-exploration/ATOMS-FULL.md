# Полный атомный разбор идеального Breathing-промпта

**Каждое слово, каждая фраза — в атом.** Ничего не пропускаем.

---

# БЛОК 1: OPENING

## Предложение 1.1
> "A component sheet for a minimalist breathing and mindfulness app."

| Фраза | Атом | Функция / Что делает |
|---|---|---|
| "A component sheet" | GENRE-DECL | Указывает тип артефакта (не app screen, не landing) |
| "for a" | STRUCTURAL-CONNECTOR | Грамматическая связка |
| "minimalist" | STYLE-ADJECTIVE | Один эстетический хинт (не palette/typography-specific) |
| "breathing and mindfulness" | PRODUCT-DOMAIN | Предметная область (2 слова) |
| "app" | PRODUCT-CATEGORY | Тип продукта (не website, не SaaS) |

## Предложение 1.2
> "The app guides users through breathing exercises, tracks their practice, and helps them find calm."

| Фраза | Атом | Функция |
|---|---|---|
| "The app" | SUBJECT-REFERENCE | Возврат к продукту |
| "guides users through breathing exercises" | FUNCTION-VERB-1 | Фича 1 (активный глагол "guides") |
| "tracks their practice" | FUNCTION-VERB-2 | Фича 2 (глагол "tracks") |
| "helps them find calm" | FUNCTION-VERB-3 | Фича 3 (глагол "helps" + эмоциональная цель "find calm") |

**Паттерн:** 3 фичи через 3 активных глагола. Последний — эмоциональная, не функциональная.

## Предложение 1.3
> "Think Calm meets a Japanese zen garden — nothing unnecessary exists."

| Фраза | Атом | Функция |
|---|---|---|
| "Think" | DIRECTIVE-IMPERATIVE | Приглашение к ассоциации (не "like", не "similar to") |
| "Calm" | REFERENCE-A | Культурный референт #1 (конкретный app) |
| "meets" | COMPOSITION-OPERATOR | Оператор смешивания (не "and", не "plus") |
| "a Japanese zen garden" | REFERENCE-B | Культурный референт #2 (не-app, эстетический) |
| "—" | THOUGHT-SEPARATOR | Пунктуационный переход к принципу |
| "nothing unnecessary exists" | PHILOSOPHICAL-PRINCIPLE | Управляющий закон, не описание |

**Паттерн:** `Think [A] meets [B] — [философия]` — тройной якорь за одно предложение.

---

# БЛОК 2: SETUP

## Предложение 2.1
> "Generate 6 UI components on a clean white artboard with a barely-there warm tint — like the inside of a seashell."

| Фраза | Атом | Функция |
|---|---|---|
| "Generate" | TASK-IMPERATIVE | Команда к Stitch |
| "6" | COUNT | Точное число компонентов |
| "UI components" | OUTPUT-TYPE | Что именно создавать |
| "on a clean white artboard" | ARTBOARD-SUBSTRATE | Базовое описание подложки |
| "with a barely-there warm tint" | ARTBOARD-NUANCE | Тонкая коррекция ("barely-there" = минимизирующий адвербиал) |
| "— like the inside of a seashell" | ARTBOARD-METAPHOR | Природная метафора подложки |

**Паттерн:** базовое описание → тонкая коррекция → метафора. Три слоя.

## Предложение 2.2
> "Components float freely — NO card borders, NO frames, NO boxes."

| Фраза | Атом | Функция |
|---|---|---|
| "Components" | SUBJECT | Обращение к созданным элементам |
| "float freely" | SPATIAL-BEHAVIOR | Как ведут себя в пространстве (глагол "float") |
| "— NO" | ANTI-MARKER | Отрицание в капсе для веса |
| "card borders" | FORBIDDEN-A | Запрет 1 |
| ", NO frames" | FORBIDDEN-B | Запрет 2 (повторение NO усиливает) |
| ", NO boxes" | FORBIDDEN-C | Запрет 3 (тройное повторение = закон) |

**Паттерн:** `NO X, NO Y, NO Z` — тройная эмфаза через капс + повторение.

## Предложение 2.3
> "Everything breathes on open space."

| Фраза | Атом | Функция |
|---|---|---|
| "Everything" | SUBJECT-TOTAL | Полное покрытие (не "most", не "many") |
| "breathes" | POSITIVE-METAPHOR-VERB | Что компоненты делают ВМЕСТО наличия границ |
| "on open space" | ENVIRONMENT | В чём находятся |

**Паттерн:** после `NO X` сразу **позитивная замена** через природный глагол ("breathes").

## Предложение 2.4
> "Grouping through proximity only."

| Фраза | Атом | Функция |
|---|---|---|
| "Grouping" | MECHANISM | Механика связи элементов |
| "through proximity" | IMPLEMENTATION | Как именно |
| "only" | EXCLUSIVITY-MARKER | Единственно допустимый способ |

**Паттерн:** отвечает на вопрос "если нет границ — как я пойму что элементы связаны?"

---

# БЛОК 3: CRITICAL RULES

**Заголовок:** `CRITICAL RULES:` — явный секционный маркер (в капсе + двоеточие).

## Rule 3.1
> "Ultra-minimal — if an element can be removed without losing meaning, remove it"

| Фраза | Атом | Функция |
|---|---|---|
| "Ultra-minimal" | DECLARATION | Эстетическое заявление |
| "— if an element can be removed" | CONDITIONAL-START | Условие теста |
| "without losing meaning" | TEST-CRITERION | Чёткий критерий "удалять или нет" |
| ", remove it" | IMPERATIVE-ACTION | Действие при прохождении теста |

**Паттерн:** `Declaration — specific test with verifiable criterion`. Не "be minimal" а "вот тест".

## Rule 3.2
> "All shapes are circles, pills, and organic rounded forms — nothing angular"

| Фраза | Атом | Функция |
|---|---|---|
| "All shapes" | SCOPE-UNIVERSAL | Охват (всё без исключений) |
| "are" | DEFINING-COPULA | Не "should be" — жёстко "есть" |
| "circles" | SHAPE-ALLOWED-1 | Разрешение 1 |
| ", pills" | SHAPE-ALLOWED-2 | Разрешение 2 |
| ", and organic rounded forms" | SHAPE-ALLOWED-3 | Разрешение 3 (расширение) |
| "— nothing angular" | SHAPE-FORBIDDEN | Анти-форма (контраст) |

**Паттерн:** `[3 allowed] — nothing [antithesis]`. Whitelist + blacklist одновременно.

## Rule 3.3
> "One single accent color used like a heartbeat — it pulses through the app in breathing circles, active states, and timers. Everything else is grayscale — near-white backgrounds, soft grays, charcoal text"

| Фраза | Атом | Функция |
|---|---|---|
| "One" | COUNT | Точное количество (не "a few") |
| "single" | EMPHASIS-COUNT | Усиление количества |
| "accent color" | COLOR-ROLE | Роль, не имя цвета |
| "used like a heartbeat" | COLOR-METAPHOR | Ритмическая метафора |
| "— it pulses through the app" | COLOR-BEHAVIOR | Глагол "pulses" → распространение |
| "in breathing circles" | USAGE-SPOT-1 | Место accent'а 1 |
| ", active states" | USAGE-SPOT-2 | Место accent'а 2 |
| ", and timers" | USAGE-SPOT-3 | Место accent'а 3 |
| ". Everything else" | CONTRAST-SUBJECT | Всё остальное |
| "is grayscale" | DEFAULT-PALETTE | Default (не "mostly", не "largely") |
| "— near-white backgrounds" | GRAYSCALE-TONE-1 | Конкретизация 1 |
| ", soft grays" | GRAYSCALE-TONE-2 | Конкретизация 2 |
| ", charcoal text" | GRAYSCALE-TONE-3 | Конкретизация 3 |

**Паттерн:** `[1 accent] + [metaphor] + [3 usage spots]` + `[all else] + [default] + [3 concrete tones]`. Симметричное удвоение.

## Rule 3.4
> "Typography: extremely light weight for most text, bold only for key numbers. Generous letter-spacing. Text feels like it whispers, not shouts"

| Фраза | Атом | Функция |
|---|---|---|
| "Typography:" | SUBSECTION-MARKER | Мини-заголовок |
| "extremely light weight" | WEIGHT-A | Весовая группа 1 (усиленная "extremely") |
| "for most text" | SCOPE-A | Область применения группы 1 |
| ", bold only for key numbers" | WEIGHT-B + SCOPE-B | Весовая группа 2 + ограничение "only" |
| ". Generous letter-spacing" | SPACING-DIRECTIVE | Отдельный атом трекинга |
| ". Text feels like" | FEEL-INTRODUCER | Переход к метафоре |
| "it whispers" | FEEL-POSITIVE | Эмоциональная цель |
| ", not shouts" | FEEL-NEGATIVE | Анти-цель через антитезу |

**Паттерн:** `[weight rules] + [spacing] + [positive-feel], not [negative-feel]`.

## Rule 3.5
> "The overall feeling is slow — every component should feel like it's breathing, not rushing"

| Фраза | Атом | Функция |
|---|---|---|
| "The overall feeling" | SCOPE-GLOBAL | Охват всей работы |
| "is slow" | MOOD-CORE | Базовое ощущение |
| "— every component" | TEST-SCOPE | Применимость теста к каждой части |
| "should feel like" | TEST-INTRODUCER | Проверочная фраза |
| "it's breathing" | TEST-POSITIVE | Что должно ощущаться |
| ", not rushing" | TEST-NEGATIVE | Анти-ощущение |

**Паттерн:** `[global mood] — every [part] should feel like [positive], not [negative]`.

---

# БЛОК 4: COMPONENTS

## Компонент 1: Breathing Circle

### 1a. Name + Role
> "Breathing Circle — the hero element of the entire app."

| Фраза | Атом |
|---|---|
| "Breathing Circle" | COMPONENT-NAME (2 слова, noun-noun) |
| "— the hero element" | COMPONENT-ROLE (статус) |
| "of the entire app" | ROLE-SCOPE (размер влияния) |

### 1b. Form + Spatial
> "A large circle floating in empty space."

| Фраза | Атом |
|---|---|
| "A large" | FORM-SIZE |
| "circle" | FORM-PRIMARY |
| "floating" | SPATIAL-BEHAVIOR-VERB |
| "in empty space" | ENVIRONMENT |

### 1c. Form-Quality via Anti+Metaphor
> "The circle has a soft gradient edge — not a hard border, more like a glow that fades into the background, like breath becoming visible in cold air."

| Фраза | Атом |
|---|---|
| "The circle has" | ATTRIBUTE-INTRODUCER |
| "a soft gradient edge" | FORM-EDGE-QUALITY-POSITIVE |
| "— not a hard border" | FORM-EDGE-ANTI (отрицание ошибочной интерпретации) |
| ", more like a glow" | REFINEMENT-VIA-METAPHOR-1 |
| "that fades into the background" | BEHAVIOR-OF-METAPHOR |
| ", like breath becoming visible in cold air" | NATURE-METAPHOR-CLOSER |

**Мини-паттерн:** `positive quality — not wrong interpretation, more like refined metaphor, like nature phenomenon`. Тройная коррекция.

### 1d. Inner content
> "Inside the circle: a simple instruction word — 'Inhale' or 'Exhale' — in light thin text."

| Фраза | Атом |
|---|---|
| "Inside the circle:" | POSITION-MARKER (внутри) |
| "a simple instruction word" | CONTENT-TYPE |
| "— 'Inhale' or 'Exhale' —" | CONTENT-LITERAL (буквальный текст в кавычках!) |
| "in light thin text" | TYPOGRAPHY-WEIGHT-LOCAL |

### 1e. Hierarchical content
> "Below the word: a duration '4s' in slightly bolder text."

| Фраза | Атом |
|---|---|
| "Below the word:" | POSITION-MARKER (относительно другого) |
| "a duration" | CONTENT-TYPE |
| "'4s'" | CONTENT-LITERAL (с кавычками) |
| "in slightly bolder text" | TYPOGRAPHY-WEIGHT-RELATIVE (не absolute — "slightly bolder" чем предыдущее) |

**Ключ:** typography описана **относительно** соседнего элемента, не абсолютно.

### 1f. Associated sub-element
> "Below the circle: the current phase indicator — four tiny dots in a row, one highlighted, showing where you are in the cycle (inhale, hold, exhale, hold)."

| Фраза | Атом |
|---|---|
| "Below the circle:" | POSITION-MARKER |
| "the current phase indicator" | SUB-ELEMENT-LABEL |
| "— four" | COUNT |
| "tiny" | SIZE-ADJECTIVE |
| "dots" | SHAPE |
| "in a row" | ARRANGEMENT |
| ", one highlighted" | STATE-INDICATION (минимум) |
| ", showing where you are in the cycle" | FUNCTIONAL-MEANING |
| "(inhale, hold, exhale, hold)" | CYCLE-ENUMERATION (4 состояния раскрыты) |

### 1g. Motion directive
> "The circle should feel alive — in the real app it expands and contracts. Here it should feel like it WANTS to move."

| Фраза | Атом |
|---|---|
| "The circle should feel alive" | DIRECTIVE-AESTHETIC |
| "— in the real app" | CONTEXT-SHIFT (реальное vs статичное) |
| "it expands and contracts" | REAL-MOTION-DESCRIPTION |
| ". Here" | CONTEXT-BACK (в этой генерации) |
| "it should feel like" | FEELING-TEST |
| "it WANTS to move" | DESIRE-STATE (капс на WANTS) |

**Ключ:** статичная картинка через упоминание реального поведения → должна намекать на motion.

### 1h. Negative space
> "Around it: nothing. Just space."

| Фраза | Атом |
|---|---|
| "Around it:" | POSITION-ENVIRONMENT |
| "nothing" | EMPTINESS |
| ". Just space." | EMPHASIS-REDUCTION (двойное усиление) |

**Паттерн:** два коротких предложения подряд, второе — усиление первого.

### 1i. Closing metaphor
Включён в 1c ("like breath becoming visible in cold air"). Для этого компонента closing-metaphor интегрирован в form-quality.

---

## Компонент 2: Session Timer

### 2a. Name + Composition Type
> "Session Timer — a floating minimal composition."

| Фраза | Атом |
|---|---|
| "Session Timer" | COMPONENT-NAME |
| "— a floating" | SPATIAL-BEHAVIOR |
| "minimal composition" | COMPOSITION-TYPE |

### 2b. Primary form
> "A large number in thin light typography showing elapsed time — '4:32' — centered and dominant."

| Фраза | Атом |
|---|---|
| "A large number" | FORM-SIZE + FORM-TYPE |
| "in thin light typography" | TYPOGRAPHY-WEIGHT |
| "showing elapsed time" | FUNCTION |
| "— '4:32' —" | CONTENT-LITERAL |
| "centered and" | ALIGNMENT |
| "dominant" | HIERARCHY-MARKER (самый важный элемент внутри) |

### 2c. Progress line (associated)
> "Below: a very thin horizontal line showing session progress — filled portion in the accent, remaining in near-invisible gray."

| Фраза | Атом |
|---|---|
| "Below:" | POSITION-MARKER |
| "a very thin" | FORM-QUALITY (минимизирующее "very thin") |
| "horizontal line" | FORM-SHAPE |
| "showing session progress" | FUNCTIONAL-MEANING |
| "— filled portion" | STATE-A |
| "in the accent" | COLOR-A |
| ", remaining" | STATE-B |
| "in near-invisible gray" | COLOR-B (минимизирующее "near-invisible") |

### 2d. Labels
> "Below the line: two small muted labels at the edges — elapsed and remaining."

| Фраза | Атом |
|---|---|
| "Below the line:" | POSITION-MARKER |
| "two" | COUNT |
| "small muted" | SIZE + TONE |
| "labels" | CONTENT-TYPE |
| "at the edges" | ARRANGEMENT |
| "— elapsed and remaining" | CONTENT-LITERAL (2 слова) |

### 2e. Above-timer label
> "Above the timer: a tiny muted label 'Box Breathing' showing the technique name."

| Фраза | Атом |
|---|---|
| "Above the timer:" | POSITION-MARKER (выше главного элемента) |
| "a tiny" | SIZE |
| "muted" | TONE |
| "label" | CONTENT-TYPE |
| "'Box Breathing'" | CONTENT-LITERAL |
| "showing the technique name" | FUNCTIONAL-MEANING |

### 2f. Reductive summary
> "The whole thing is just a number, a line, and air."

| Фраза | Атом |
|---|---|
| "The whole thing is" | SUMMARY-INTRODUCER |
| "just" | REDUCTION-MARKER |
| "a number, a line, and air" | TRIPLE-REDUCTIVE-LIST (последний элемент — negative space как contribut) |

**Паттерн:** итог через reductive list из 3 элементов, где один = воздух.

### 2g. Closing metaphor
> "Should feel like watching time slow down."

| Фраза | Атом |
|---|---|
| "Should feel like" | FEELING-TEST |
| "watching time slow down" | NATURE-METAPHOR (время как процесс) |

---

## Компонент 3: Breathing Pattern Selector

### 3a. Name + Form layout
> "Breathing Pattern Selector — a vertical stack of three technique options floating on the background."

| Фраза | Атом |
|---|---|
| "Breathing Pattern Selector" | COMPONENT-NAME |
| "— a vertical stack" | LAYOUT-GEOMETRY |
| "of three" | COUNT |
| "technique options" | ITEM-TYPE |
| "floating on the background" | SPATIAL-BEHAVIOR |

### 3b. Row structure
> "Each option is a horizontal row: a small visual diagram on the left showing the breathing rhythm as a simple waveform shape — different shapes for different patterns (smooth wave for relaxing, sharp peaks for energizing, flat plateau for box breathing)."

| Фраза | Атом |
|---|---|
| "Each option is" | ITERATION-INTRODUCER |
| "a horizontal row" | ITEM-LAYOUT |
| ": a small visual diagram" | SUB-ELEMENT-TYPE |
| "on the left" | SUB-POSITION |
| "showing the breathing rhythm" | FUNCTIONAL-MEANING |
| "as a simple waveform shape" | VISUAL-ENCODING |
| "— different shapes for different patterns" | VARIATION-PRINCIPLE |
| "(smooth wave for relaxing" | MAPPING-1 |
| ", sharp peaks for energizing" | MAPPING-2 |
| ", flat plateau for box breathing)" | MAPPING-3 |

**Паттерн:** `visual encoding → 3 concrete mappings в скобках`.

### 3c. Label for each row
> "Next to the diagram: technique name in medium weight and a short description in muted text — what it helps with."

| Фраза | Атом |
|---|---|
| "Next to the diagram:" | POSITION-MARKER (side-by-side) |
| "technique name" | CONTENT-TYPE-A |
| "in medium weight" | TYPOGRAPHY-WEIGHT-A |
| "and a short description" | CONTENT-TYPE-B |
| "in muted text" | TONE-B |
| "— what it helps with" | FUNCTIONAL-MEANING |

### 3d. State
> "The selected technique has the accent color on its waveform."

| Фраза | Атом |
|---|---|
| "The selected technique" | STATE-NAME |
| "has the accent color" | STATE-VISUAL |
| "on its waveform" | STATE-LOCATION |

### 3e. Separation rule
> "Rows are separated by generous space, not lines."

| Фраза | Атом |
|---|---|
| "Rows are separated" | STRUCTURAL-CONCERN |
| "by generous space" | POSITIVE-METHOD |
| ", not lines" | ANTI-METHOD |

**Паттерн:** `X by [positive], not [anti]`.

### 3f. Closing metaphor
> "Like choosing a frequency to tune into."

---

## Компонент 4: Intensity Selector

### 4a. Name + Layout
> "Intensity Selector — a horizontal row of three circles floating on the background."

| Атом |
|---|
| COMPONENT-NAME, LAYOUT-GEOMETRY ("horizontal row"), COUNT (three), SHAPE (circles), SPATIAL-BEHAVIOR |

### 4b. Size-encodes-meaning rule
> "Each circle represents a session intensity: gentle (small circle), balanced (medium circle), deep (larger circle)."

| Фраза | Атом |
|---|---|
| "Each circle represents" | ITEM-SEMANTIC-ROLE |
| "a session intensity:" | SEMANTIC-CATEGORY |
| "gentle (small circle)" | MAPPING-1 (label + size) |
| ", balanced (medium circle)" | MAPPING-2 |
| ", deep (larger circle)" | MAPPING-3 |

### 4c. Functional aesthetic (explicit)
> "The circles literally increase in size left to right — the visual IS the meaning."

| Фраза | Атом |
|---|---|
| "The circles literally increase" | MECHANIC-EXPLICIT |
| "in size left to right" | DIRECTION |
| "— the visual IS the meaning" | PHILOSOPHY-DECLARATION (капс на IS) |

**Ключ:** явное заявление `visual = meaning` с капсом на связке.

### 4d. State
> "Selected circle fills with the accent color."

| Атом |
|---|
| STATE-INDICATION |

### 4e. Labels
> "Below each: a tiny label and duration."

| Атом |
|---|
| POSITION-MARKER, CONTENT-TYPE, SIZE |

### 4f. Negative space + closing metaphor
> "No borders, no cards — just three circles growing in size, like ripples from a stone dropped in water."

| Фраза | Атом |
|---|---|
| "No borders, no cards" | ANTI-CONVENTION (double) |
| "— just three circles growing in size" | REDUCTIVE-DESCRIPTION |
| ", like ripples from a stone dropped in water" | NATURE-METAPHOR-CLOSER |

---

## Компонент 5: Sound Selector

### 5a. Name + Layout
> "Sound Selector — a horizontal scrollable row of ambient sound options."

| Атом |
|---|
| COMPONENT-NAME, LAYOUT-GEOMETRY, INTERACTION ("scrollable"), ITEM-TYPE |

### 5b. Item structure
> "Each option is a small circle with a simple icon inside representing the soundscape — rain, ocean, wind, forest, silence, singing bowl."

| Фраза | Атом |
|---|---|
| "Each option is" | ITERATION |
| "a small circle" | SIZE + SHAPE |
| "with a simple icon inside" | NESTED-CONTENT |
| "representing the soundscape" | FUNCTIONAL-MEANING |
| "— rain, ocean, wind, forest, silence, singing bowl" | ENUMERATION (6 концептов) |

### 5c. Label
> "Below each circle: a tiny label."

### 5d. State
> "Selected sound has the accent ring."

| Фраза | Атом |
|---|---|
| "Selected sound" | STATE-NAME |
| "has the accent ring" | STATE-VISUAL (не fill, а ring — отличается от 4d!) |

### 5e. Special case
> "The 'silence' option is just an empty circle — nothing inside."

| Фраза | Атом |
|---|---|
| "The 'silence' option" | SPECIAL-CASE-SUBJECT |
| "is just an empty circle" | FORM |
| "— nothing inside" | REDUCTION-EMPHASIS |

**Паттерн:** особый случай обыгран эмпти-состоянием ("silence" = пустой круг).

### 5f. Closing metaphor + anti-rule
> "Should feel like choosing which frequency of nature to tune into. Minimal, each icon is barely more than a line drawing."

| Фраза | Атом |
|---|---|
| "Should feel like" | FEELING-TEST |
| "choosing which frequency of nature" | NATURE-METAPHOR |
| "to tune into" | ACTION-VERB |
| ". Minimal, each icon" | STYLE-RULE |
| "is barely more than a line drawing" | MINIMIZATION ("barely more than") |

---

## Компонент 6: Post-Session Summary

### 6a. Name + Context
> "Post-Session Summary — a floating centered composition appearing after completing a session."

| Фраза | Атом |
|---|---|
| "Post-Session Summary" | COMPONENT-NAME |
| "— a floating centered composition" | SPATIAL-BEHAVIOR + ALIGNMENT |
| "appearing after completing a session" | TEMPORAL-CONTEXT (когда появляется) |

### 6b. Top — hero number
> "Top: a large number showing total minutes practiced today — bold but light weight, the accent color."

| Фраза | Атом |
|---|---|
| "Top:" | POSITION-MARKER |
| "a large number" | SIZE + TYPE |
| "showing total minutes practiced today" | FUNCTIONAL-MEANING |
| "— bold but light weight" | TYPOGRAPHY-NUANCE (противоречие — bold + light) |
| ", the accent color" | COLOR |

**Ключ:** "bold but light weight" — тонкая оппозиция, не просто "bold".

### 6c. Breath rhythm line
> "Below: a thin horizontal breath-rhythm line showing the pattern you just completed — a decorative waveform like an EKG of your breathing."

| Фраза | Атом |
|---|---|
| "Below:" | POSITION-MARKER |
| "a thin horizontal" | SIZE + ORIENTATION |
| "breath-rhythm line" | CONCEPT-NAME (compound noun) |
| "showing the pattern you just completed" | FUNCTIONAL-MEANING (temporal — completed) |
| "— a decorative waveform" | FORM-QUALITY |
| "like an EKG of your breathing" | NATURE-METAPHOR (медицинское) |

### 6d. Stat pairs
> "Below: two small stat pairs in muted text — breaths taken and average pace."

| Фраза | Атом |
|---|---|
| "Below:" | POSITION-MARKER |
| "two small stat pairs" | COUNT + TYPE |
| "in muted text" | TONE |
| "— breaths taken and average pace" | LITERAL-ENUMERATION |

### 6e. Mood check prompt
> "Below: a gentle prompt 'How do you feel?' with three simple face expressions as soft circles — calm, neutral, energized."

| Фраза | Атом |
|---|---|
| "Below:" | POSITION-MARKER |
| "a gentle prompt" | CONTENT-TYPE + TONE ("gentle") |
| "'How do you feel?'" | CONTENT-LITERAL |
| "with three" | COUNT |
| "simple face expressions" | SUB-ELEMENT-TYPE |
| "as soft circles" | FORM-SHAPE (circles again — consistency) |
| "— calm, neutral, energized" | ENUMERATION (3 состояния) |

### 6f. Anti + Closing metaphor
> "No congratulations, no fireworks — just a quiet acknowledgment, like placing a stone on a cairn."

| Фраза | Атом |
|---|---|
| "No congratulations" | ANTI-CONVENTION-1 |
| ", no fireworks" | ANTI-CONVENTION-2 |
| "— just a quiet acknowledgment" | POSITIVE-REPLACEMENT |
| ", like placing a stone on a cairn" | NATURE-METAPHOR-CLOSER |

---

# БЛОК 5: CLOSER

> "Primary Design Surface: App."

| Атом |
|---|
| CANONICAL-CLOSER (всегда эта фраза, заглавные буквы, точка) |

---

# ЛЕКСИЧЕСКИЕ ПАТТЕРНЫ (recurring word-level moves)

## Паттерн A: Minimizing adverbs
- "barely-there warm tint"
- "very thin horizontal line"
- "near-invisible gray"
- "tiny muted label"
- "extremely light weight"
- "a bit/barely more than a line drawing"

→ Минимизирующие адвербиалы — главный стилистический сигнал.

## Паттерн B: "not X, more like Y" refinement
- "not a hard border, more like a glow"
- "feels like it whispers, not shouts"
- "breathing, not rushing"
- "generous space, not lines"
- "no borders, no cards — just three circles"
- "no congratulations, no fireworks — just a quiet acknowledgment"

→ Коррекция ошибочной интерпретации через антитезу. Очень частый паттерн.

## Паттерн C: "like X" metaphor closer
- "like the inside of a seashell"
- "like a heartbeat"
- "like breath becoming visible in cold air"
- "like watching time slow down"
- "like choosing a frequency to tune into"
- "like ripples from a stone dropped in water"
- "like choosing which frequency of nature to tune into"
- "like an EKG of your breathing"
- "like placing a stone on a cairn"

→ **9 метафор в одном промпте.** Это не украшение — это основной рабочий механизм.

## Паттерн D: ALL-CAPS for emphasis
- "NO card borders, NO frames, NO boxes"
- "CRITICAL RULES:"
- "WANTS to move"
- "the visual IS the meaning"

→ Капс используется для семантических якорей, не для пунктуации.

## Паттерн E: Position markers colon-pattern
- "Inside the circle:"
- "Below the word:"
- "Below the circle:"
- "Above the timer:"
- "Next to the diagram:"
- "Below each:"
- "Top:"
- "Below:"

→ Каждая позиция = `[Position]:` + content. Стабильно, предсказуемо для Stitch.

## Паттерн F: Literal content в кавычках
- "'Inhale' or 'Exhale'"
- "'4s'"
- "'4:32'"
- "'Box Breathing'"
- "'How do you feel?'"

→ Реальный финальный текст берётся в кавычки. Это сигнал Stitch: "это ровно такой текст нужно отрендерить".

## Паттерн G: Triple enumeration
- "NO borders, NO frames, NO boxes"
- "circles, pills, and organic rounded forms"
- "near-white backgrounds, soft grays, charcoal text"
- "in breathing circles, active states, and timers"
- "smooth wave for relaxing, sharp peaks for energizing, flat plateau for box breathing"
- "gentle (small), balanced (medium), deep (larger)"
- "rain, ocean, wind, forest, silence, singing bowl" (x6)
- "calm, neutral, energized"

→ Перечисления из 3 (или 6 = 2×3). Очень ритмично.

## Паттерн H: Verbs of quietness
- breathes, floats, whispers, pulses, fades, dissolves, melts, drifts, settles, resting

→ Глаголы движения все медленные/мягкие. Ни одного "jumps", "hits", "pops".

---

# ЧАСТОТНАЯ КАРТА АТОМОВ (сколько раз в промпте)

| Атом | Сколько раз |
|---|---|
| POSITION-MARKER (Below:, Above:, Inside:, Top:, Next to:) | 11 |
| NATURE-METAPHOR | 9 |
| COUNT (3, 4, 6, two, three, four) | 8 |
| CONTENT-LITERAL (в кавычках) | 5 |
| STATE-INDICATION (Selected has accent) | 5 |
| ANTI-CONVENTION (NO X) | 6 (3 в setup + 2 в intensity + 2 в summary) |
| "like X" closer | 9 |
| FUNCTIONAL-MEANING ("showing Y") | 8 |
| SIZE-ADJECTIVE (small, tiny, large, barely-there) | 12+ |
| TYPOGRAPHY-WEIGHT ref | 7 |
| COLOR "accent" reference | 6 |

---

# ЗАЧЕМ ЭТА КАРТА

Теперь можно:
1. **Писать Sugar Quit промпт** — проходить по каждому атому и спрашивать "заполнил?"
2. **Проверять готовый промпт** — сверяться со списком, искать пустоты
3. **Отличать декор от работающих атомов** — 90% лексических паттернов (minimizing adverbs, "not X more like Y", like-closer, position:colon) это не стилизация а рабочие сигналы Stitch
4. **Не копировать, а заполнять слоты** — слоты теперь атомные, не блочные

# Атомный разбор идеального Breathing-промпта

**Источник:** промпт который дал perfect result.
**Цель:** вскрыть ВСЕ работающие паттерны до атомов, не пропустить ни одного (как было в предыдущих формулах).

---

## СТРУКТУРА — 5 БЛОКОВ

```
1. OPENING       — что это и о чём (3 предложения)
2. SETUP         — как будет свёрстано (артборд + spatial behavior + anti-convention)
3. CRITICAL RULES — 5 жёстких правил отдельным блоком с явным заголовком
4. COMPONENTS    — 6 компонентов по внутреннему шаблону
5. CLOSER        — Primary Design Surface: App.
```

---

## БЛОК 1: OPENING

Три предложения, каждое делает свою работу:

| # | Атом | Пример | Функция |
|---|---|---|---|
| 1.1 | **GENRE-DECLARATION** | "A component sheet for a minimalist breathing and mindfulness app." | Говорит Stitch ЧТО рендерить (component sheet vs app screen vs landing) + категория продукта одной фразой |
| 1.2 | **PRODUCT-FUNCTION** | "guides users through breathing exercises, tracks their practice, helps them find calm" | 3 конкретные фичи глаголами |
| 1.3 | **REFERENCE-ANALOGY + PRINCIPLE** | "Think Calm meets a Japanese zen garden — nothing unnecessary exists" | Двойной якорь: культурная референция ("X meets Y") + управляющий принцип |

---

## БЛОК 2: SETUP

Разметка пространства и отрицание конвенций:

| # | Атом | Пример | Функция |
|---|---|---|---|
| 2.1 | **TASK + COUNT** | "Generate 6 UI components" | Сколько элементов |
| 2.2 | **ARTBOARD-VIA-METAPHOR** | "clean white artboard with a barely-there warm tint — like the inside of a seashell" | Подложка описана через природную метафору, не HEX |
| 2.3 | **SPATIAL-BEHAVIOR** | "Components float freely" | Как компоненты ведут себя в пространстве |
| 2.4 | **ANTI-CONVENTION** (3 штуки подряд) | "NO card borders, NO frames, NO boxes" | Чётко что НЕ делать (в капсе для веса) |
| 2.5 | **POSITIVE-REPLACEMENT** | "Everything breathes on open space" | Что ЕСТЬ вместо того что "нет" |
| 2.6 | **GROUPING-PRINCIPLE** | "Grouping through proximity only" | Как связывать элементы без границ |

---

## БЛОК 3: CRITICAL RULES (5 rules, каждое — свой тип атома)

Это **отдельный названный блок** с заголовком "CRITICAL RULES:". Это важно — Stitch читает как явную инструкцию.

| # | Атом-тип | Пример | Зачем именно так |
|---|---|---|---|
| 3.1 | **INCLUSION-TEST** | "Ultra-minimal — if an element can be removed without losing meaning, remove it" | Не просто "keep it minimal", а конкретный ТЕСТ |
| 3.2 | **SHAPE-VOCABULARY + ANTI-SHAPE** | "All shapes are circles, pills, and organic rounded forms — nothing angular" | Разрешено + запрещено в одной фразе |
| 3.3 | **COLOR-RULE + USAGE-SPEC + DEFAULT** | "One single accent color used like a heartbeat — it pulses through the app in breathing circles, active states, and timers. Everything else is grayscale — near-white, soft grays, charcoal text" | (a) сколько accent'ов (b) ГДЕ accent появляется (c) что по умолчанию |
| 3.4 | **TYPOGRAPHY-BY-ROLE + SPACING + METAPHOR** | "extremely light weight for most text, bold only for key numbers. Generous letter-spacing. Text feels like it whispers, not shouts" | Вес + spacing + эмоциональная характеристика |
| 3.5 | **MOOD-TEST** | "The overall feeling is slow — every component should feel like it's breathing, not rushing" | Проверочный эмоциональный тест для каждого компонента |

---

## БЛОК 4: COMPONENTS

Все 6 компонентов идут по **одному внутреннему шаблону** из 9 атомов. Ни один компонент не пропускает ни один атом.

### Внутренний шаблон компонента

| # | Атом | Пример (из Breathing Circle) |
|---|---|---|
| 4.1 | **NAME + ROLE** | "Breathing Circle — the hero element of the entire app" |
| 4.2 | **FORM + SPATIAL** | "A large circle floating in empty space" |
| 4.3 | **FORM-QUALITY + NATURE-METAPHOR** | "soft gradient edge — not a hard border, more like a glow that fades into the background, like breath becoming visible in cold air" |
| 4.4 | **INNER-CONTENT + TYPOGRAPHY** | "Inside the circle: a simple instruction word — 'Inhale' or 'Exhale' — in light thin text" |
| 4.5 | **HIERARCHICAL-CONTENT** | "Below the word: a duration '4s' in slightly bolder text" |
| 4.6 | **ASSOCIATED-ELEMENT + STATE + MEANING** | "Below the circle: four tiny dots in a row, one highlighted, showing where you are in the cycle" |
| 4.7 | **MOTION-DIRECTIVE** (критично) | "The circle should feel alive... Here it should feel like it WANTS to move" |
| 4.8 | **NEGATIVE-SPACE-RULE** | "Around it: nothing. Just space." |
| 4.9 | **CLOSING-METAPHOR** | (для других компонентов: "like placing a stone on a cairn", "like choosing which frequency to tune into", "like ripples from a stone dropped in water") |

### Проверка: все 6 компонентов соблюдают шаблон

| # | Component | Form-qty + metaphor | Motion-directive | Negative-space | Closing metaphor |
|---|---|---|---|---|---|
| 1 | Breathing Circle | soft gradient edge / breath in cold air | "WANTS to move" | "around it: nothing" | "like breath becoming visible" |
| 2 | Session Timer | (implicit — thin line) | "time slow down" | "just a number, a line, and air" | "like watching time slow down" |
| 3 | Pattern Selector | waveform shapes | (implicit — choose rhythm) | "separated by space, not lines" | "like choosing a frequency to tune into" |
| 4 | Intensity Selector | circles growing | (implicit in ripples) | "no borders, no cards" | "like ripples from a stone dropped in water" |
| 5 | Sound Selector | small circles, line-drawing icons | (static, but tuning metaphor) | (implicit minimalism) | "like choosing which frequency of nature to tune into" |
| 6 | Post-Session Summary | EKG waveform line | (implicit — stone placed) | (no congratulations, no fireworks) | "like placing a stone on a cairn" |

Видно: **каждый компонент закрывается метафорой "like X"**. Это обязательный атом, не опциональный.

---

## БЛОК 5: CLOSER

```
Primary Design Surface: App.
```

Одна строка. Всегда.

---

## ЧТО Я ПРОПУСТИЛ В ПРЕДЫДУЩИХ FORMULA.md

Сравниваю свои 13 правил с атомным разбором — **вот 7 атомов что я упустил**:

| # | Пропущенный атом | Почему важен |
|---|---|---|
| A | **REFERENCE-ANALOGY "X meets Y"** | Не было. Использовал "для persona" или "for moment" — но "Think Calm meets zen garden" намного сильнее |
| B | **CRITICAL RULES как отдельный именованный блок** | Я размазывал правила по абзацам. Нужен явный заголовок "CRITICAL RULES:" — это семантический маркер для Stitch |
| C | **INCLUSION-TEST ("if can be removed, remove")** | Конкретный тест, а не декларация "minimal" |
| D | **SHAPE-VOCABULARY + ANTI-SHAPE** | "circles and pills, nothing angular" — явный список допустимых форм |
| E | **ACCENT-USAGE-SPEC (ГДЕ accent появляется)** | Не просто "one accent", а "pulses through breathing circles, active states, timers" — с конкретным списком мест |
| F | **MOTION-DIRECTIVE ("WANTS to move")** | Статическое изображение должно намекать на движение. У меня этого не было. |
| G | **CLOSING-METAPHOR per component обязательно** | Я ставил метафоры выборочно. У идеального промпта — у КАЖДОГО компонента метафора "like X" |

---

## ОБНОВЛЁННЫЙ ШАБЛОН (атомный)

```
[GENRE-DECLARATION для product category]. [PRODUCT-FUNCTION: 3 concrete verbs]. Think [REFERENCE A] meets [REFERENCE B] — [PHILOSOPHICAL-PRINCIPLE].

Generate [N] UI components on [ARTBOARD-METAPHOR]. Components [SPATIAL-BEHAVIOR] — NO [ANTI-CONVENTION A], NO [ANTI-CONVENTION B], NO [ANTI-CONVENTION C]. [POSITIVE-REPLACEMENT]. [GROUPING-PRINCIPLE].

CRITICAL RULES:

1. [INCLUSION-TEST: a specific test, not a declaration]
2. [SHAPE-VOCABULARY — forms allowed + forms forbidden]
3. [COLOR-RULE: count + USAGE-SPEC + DEFAULT-PALETTE]
4. [TYPOGRAPHY-BY-ROLE + SPACING + METAPHOR]
5. [MOOD-TEST: functional feel check]

The [N] components:

1. [NAME] — [ROLE]. [FORM + SPATIAL]. [FORM-QUALITY via "not X, more like Y"] — [NATURE-METAPHOR]. Inside: [INNER-CONTENT] in [TYPOGRAPHY]. Below: [HIERARCHICAL-CONTENT] in [TYPOGRAPHY-DIFFERENTIATION]. [ASSOCIATED-ELEMENT with STATE and MEANING]. [MOTION-DIRECTIVE: what it feels like it WANTS to do]. [NEGATIVE-SPACE-RULE: around it: nothing]. Like [CLOSING-METAPHOR].

[... повторить 6 раз, каждый раз все 9 атомов, каждая метафора уникальная для компонента ...]

Primary Design Surface: App.
```

---

## ПЕРЕПРОВЕРКА — почему именно это работает

Stitch — LLM. Он отвечает на **сигналы языка**, не на спецификации:

- **ANTI-CONVENTIONS в капсе** (NO, NO, NO) = семантический вес, он обращает внимание
- **CRITICAL RULES с заголовком** = явный блок инструкций, не растворён в потоке
- **MOTION-DIRECTIVE** = показывает Stitch что дизайн должен быть "живой", даже статический → он генерит градиентные edges, soft glow, etc.
- **NATURE-METAPHOR per component** = активирует creative-generation режим LLM (вместо retrieve-template режима)
- **CLOSING-METAPHOR "like X"** = тег завершения мысли, каждый компонент становится самостоятельной единицей

Атомы работают не поодиночке, а **комплексом**. Пропустишь 2-3 — Stitch сваливается в generic template.

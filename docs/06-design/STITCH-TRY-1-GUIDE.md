# Sugar Quit — Stitch Try-1 Design Guide

**Источник:** `docs/06-design/style-exploration/stitch-try-1/` (3 скриншота, 9 экранов)  
**Правило:** docs/04-ux/ — источник истины для функциональности. Stitch — визуальный референс.

---

## Обзор: три стилевых направления

В папке `stitch-try-1` три скриншота, каждый показывает отдельное визуальное направление:

| Скриншот | Стиль | Экраны |
|----------|-------|--------|
| `Screenshot.png` | **Soft Botanical / Nova** — тёплый, органичный, мягкий | Home, AI Coach, Progress |
| `Screenshot (1).png` | **Tactical / Military** — текущая реализация | AI Transmission, Home Mission, Progress Liftoff |
| `Screenshot (2).png` | **Celestial / Purple** — духовный, фиолетовый | Home, AI Coach, Progress Evolution |

**Реализуем: Tactical / Military** (`Screenshot (1).png`). Остальные два — референс для отдельных элементов.

---

## Направление A — Soft Botanical (`Screenshot.png`)

### Описание
Тёплая кремовая атмосфера, поэтичный тон, AI-персонаж "Nova", метафора роста ("Your Garden").

### Цвета
| Роль | Визуал | Аналог в tokens |
|------|--------|----------------|
| Фон | Тёплый крем + персиковые орбы | `colors.surface #fbf9f5` |
| Primary | Мягкий розово-коралловый | `colors.primary #a53c30` |
| Текст | Тёплый near-black | `colors.onSurface #31332f` |
| Акцент | Приглушённый терракот | `colors.primaryContainer #ffaca0` |

### Типографика
- Hero numeral: крупный serif ("02") — у нас соответствует `fonts.headlineExtraBold` 72px
- Заголовки: мягкий geometric sans
- Копирайт: поэтичный, строчные буквы — "Beautiful days. 89 to discover."

### Компоненты
- Rounded pill CTA — "My daily" (primary gradient)
- Dark secondary кнопка — "BREATHE"
- AI чат — пузырь с тенью, персонаж "Nova"
- Stats chip — "~184" (каллории / граммы сахара)
- Progress карточки — Day 01 / Day 02 dot grid

### Что берём в проект
- Поэтичный тон в motivational copy ("Beautiful days. 89 to discover.")
- Мягкие орбы на фоне — уже реализовано через AuraBlob
- Dot grid прогресса — уже реализовано на Home и Progress

### Что НЕ берём
- Имя "Nova" для AI — у нас "AGENT-07" в tactical-стиле
- Метафору "Garden" — у нас космическая ("Liftoff", "Orbit")
- Serif numeral — наш шрифт Plus Jakarta Sans, не serif

---

## Направление B — Tactical / Military (`Screenshot (1).png`) ✅ ТЕКУЩАЯ РЕАЛИЗАЦИЯ

### Описание
Терминальная эстетика, военный брифинг, мотивационная интенсивность. Реализовано в коде.

### Экраны

#### AI Coach: Transmission Open
- Фон: кремовый с тёмными акцентами
- Headline: **"Hold. This wave dies in 4 minutes."** — большой, жирный
- Telemetry rows с `>` prefix:
  - `CRAVING DETECTED: HIGH` (красный)
  - `YOU'VE CRUSHED 1 BEFORE THIS`
  - `YOU WILL CRUSH THIS ONE` (primary)
- Breathing pacer: gradient линия + анимированная точка
- Command list: Breathing combat protocol / Emergency substitute / Talk to AI now

#### Home: Mission Day 02
- Eyebrow: `SUGAR FREE` (ALL CAPS, label font, primary)
- Hero numeral: `02` с gradient fill, огромный
- Sub-label: `DAYS · 88 TO LAUNCH`
- Dot grid: filled (пройденные) + empty (оставшиеся)
- Tactical card: "This craving is **dying**. Not you."
- Action row: ⚡ STRIKE (primary gradient) | 💨 BREATHE (dark) | ▶ LOG (dark)

#### Progress: Liftoff Confirmed
- Label: `TRAJECTORY` + `ACTIVE` badge
- Title: "Day **02**. Liftoff confirmed."
- Sub: `MISSION PROGRESS · 2% · 88 DAYS TO ORBIT`
- Stat grid: `DAYS CLEAN 01` | `DAYS CLEAN 02`
- Summary: "You're 02 days into a new life."

### Палитра (совпадает с tokens.ts)
| Роль | HEX |
|------|-----|
| Primary | `#a53c30` |
| Surface | `#fbf9f5` |
| Inverse Surface | `#0e0e0d` |
| On Surface Variant | `#5e605b` |

### Типографика
- Hero: Plus Jakarta Sans ExtraBold, 72px+ для numerals
- ALL CAPS labels: Manrope Medium, letterSpacing wide
- Tactical body: Plus Jakarta Sans Bold, 22–28px

---

## Направление C — Celestial / Purple (`Screenshot (2).png`)

### Описание
Глубокий фиолетовый градиент, духовно-велнес атмосфера, метафора роста и выравнивания ("Alignment", "Radiant Growth").

### Цвета
| Роль | Визуал | Примечание |
|------|--------|------------|
| Фон | Глубокий purple-to-dark | Не в нашей палитре |
| Primary | Светлый лавандовый | Близко к `colors.secondary #6a577f` |
| Текст на тёмном | Белый / очень светлый | `colors.onPrimary #fff7f6` |
| Акцент stat | Тёплый белый | — |

### Компоненты
- Home list: Morning Clarity / Hydration Check / Evening Reflection — checkbox items
- CTA: "Log a Victory" (outline), "Record Strength" (filled)
- AI экран: минималистичный центрированный текст "You're in control. Keep going." + центральный breathing dot
- Stats: большой "42 days", "18" cravings, "Vitality Flow" bar
- "Upcoming Alignment" — секция предстоящих событий

### Что берём в проект
- **Breathing dot по центру** — более минималистичная альтернатива pacer-линии для спокойных моментов
- **Daily items с чекбоксами** — хороший паттерн для Daily Check-in экрана (3.2)
- **"Upcoming" секция** — идея для forecast / prediction в будущих версиях

### Что НЕ берём
- Фиолетовый фон — конфликтует с нашей кремовой палитрой
- Брендинг "Celestial" — у нас Sugar Quit
- Духовный тон ("Alignment", "Vitality Flow") — у нас tactical / scientific

---

## Сводная таблица: что откуда берём

| Элемент | Источник | Статус |
|---------|----------|--------|
| Hero numeral (большое число) | Все 3 стиля | ✅ Реализовано |
| AuraBlob орбы на фоне | Soft Botanical | ✅ Реализовано |
| Tactical copy ("dying", "Liftoff") | Tactical | ✅ Реализовано |
| Dot grid прогресса | Soft Botanical + Tactical | ✅ Реализовано |
| Breathing pacer (линия + точка) | Tactical | ✅ Реализовано |
| Telemetry rows с `>` | Tactical | ✅ Реализовано |
| Поэтичный motivational copy | Soft Botanical | ⬜ TODO: Home summary |
| Breathing dot по центру | Celestial | ⬜ TODO: sos.tsx (спокойный режим) |
| Daily checklist items | Celestial | ⬜ TODO: Check-in экран (3.2) |
| AI Chat пузыри | Soft Botanical (Nova) | ⬜ TODO: SOS AI Chat (3.1) |

---

## Цвета по всем трём направлениям

Наша canonical палитра из `constants/tokens.ts` покрывает все три стиля:

| Роль в дизайне | Stitch Try-1 | Token |
|----------------|-------------|-------|
| Тёплый primary | Терракот / коралл | `colors.primary #a53c30` |
| Мягкий secondary | Лаванда / пурпур | `colors.secondary #6a577f` |
| Нейтральный фон | Крем | `colors.surface #fbf9f5` |
| Тёмный текст / кнопки | Near-black | `colors.inverseSurface #0e0e0d` |
| Орбы | Персик + лаванда + мята | primaryContainer / secondaryContainer / tertiaryContainer |

---

## Типографика по всем трём направлениям

| Применение | Soft Botanical | Tactical | Celestial | Наш выбор |
|-----------|---------------|---------|-----------|-----------|
| Hero numeral | Serif, огромный | Sans-serif bold | Sans-serif bold | Plus Jakarta Sans ExtraBold |
| Заголовки | Geometric sans | Geometric sans | Geometric sans | Plus Jakarta Sans Bold |
| Labels / мета | Mono / sans | Mono caps | Sans caps | Manrope Medium |
| Мотив. копирайт | Поэтичный строчн. | ALL CAPS tactical | Mixed | Оба стиля по контексту |

---

## Screen Recipes из stitch-try-1

### Home — три варианта структуры

**Soft Botanical:**
```
Eyebrow → Hero numeral → Motivational sub
Body copy card ("Your body is already thanking you")
CTA row (pill primary + dark secondary)
Bottom nav
```

**Tactical (реализовано):**
```
Eyebrow SUGAR FREE → Hero numeral → DAYS TO LAUNCH
Dot grid
Tactical card ("This craving is dying. Not you.")
Action row (STRIKE / BREATHE / LOG)
Quick nav (MISSIONS / INTEL / FORECAST)
SOSFab
```

**Celestial:**
```
Day counter → Daily items list (Morning Clarity, Hydration Check...)
CTA row (Log a Victory / Record Strength)
Bottom nav
```

### AI Coach — три варианта

**Soft Botanical (Nova):**
```
Персонаж "Nova" + имя
Чат-пузырь с ответом AI
Stats chip (~184)
Breathing tip
```

**Tactical (реализовано):**
```
Nav (SUGAR_QUIT + LIVE pill)
Status row (AI LIVE badge + AGENT-07 ENGAGED)
Strike card + telemetry
Breathing pacer (линия + dot)
Command list (3 действия)
```

**Celestial:**
```
Минималистичный фон
Центрированный текст ("You're in control. Keep going.")
Центральный breathing dot
Поле ввода (chat input)
```

### Progress — три варианта

**Soft Botanical:**
```
"Every day is a quiet win."
Day 01 / Day 02 dot grid
Summary ("Two days of choosing yourself...")
```

**Tactical (реализовано):**
```
TRAJECTORY + ACTIVE badge
"Day 02. Liftoff confirmed." hero
Orbital arc (9 dots + YOU marker)
Progress bar
Stats grid (CRAVINGS CRUSHED / DAYS CLEAN)
Summary + KEEP BURNING
```

**Celestial:**
```
"42 days" hero
Subtitle ("Radiant Growth. Mental Clarity expanding.")
Cravings count (18) + Vitality Flow bar
Upcoming Alignment section
```

---

## Pre-commit Checklist (stitch-try-1 специфично)

- [ ] Tactical копирайт соответствует tone of voice: военный, мотивационный, без мягкости
- [ ] Hero numeral: Plus Jakarta Sans ExtraBold, не serif (не как в Soft Botanical)
- [ ] Фон кремовый `#fbf9f5`, не фиолетовый (не как в Celestial)
- [ ] Брендинг: SUGAR_QUIT, не "Nova" и не "Celestial"
- [ ] Метафора: космическая (Liftoff / Orbit / Galaxy) — не ботаническая (Garden) и не духовная (Alignment)
- [ ] AuraBlob тонты: coral + lavender + mint — не монохромный purple

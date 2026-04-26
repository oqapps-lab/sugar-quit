# Sugar Quit — Design Guide

**Дата:** 24 апреля 2026
**Стадия:** UX Design (Stage 3)
**Источники:** Stitch screens (stitch-raw/screenshots/), docs/04-ux/, docs/02-product/, docs/03-practices/
**Правило приоритетов:** Функциональность и структура → docs/04-ux/. Визуальный стиль → Stitch. При конфликте побеждает UX-документация.

---

## 1. TL;DR

**Что берём из Stitch:**
- Тёплый кремовый canvas (#FEF9F0) + белые карточки — без тёмных или серых фонов
- Коралловый (#FF6B6B) как единственный акцент — SOS, streak-кольцо, CTA, send-кнопка
- Мятный (#2EC4A0) строго для состояний "успех" и "AI coach" — не для декора
- Округлые кнопки-пилюли, карточки с тонкой границей (без тяжёлых теней)
- Отдельный фон для SOS-чата (#EEF5F2) — визуально выключает из основного потока

**Что выбрасываем:**
- Тёмная лесная тема (stitch-export 01–12) — устаревшая серия, не используем
- Терракота (#a53c30) и лаванда (#6a577f) из старых tokens.ts — заменены
- Замок на уроках Curriculum Day 1–14: по UX-спецификации первые 14 дней бесплатны

**Что апгрейдим (Stitch расходится с UX-доками):**
- **Табы:** Stitch показывает Home/Chat/Log/Stats → заменяем на Home/Curriculum/Progress/Profile (UX-SPEC раздел 2.3, F3 = P0)
- **SOS-кнопка:** всегда круглая, по центру над табом, не сбоку и не в форме другого элемента (UX-SPEC 2.4)
- **Curriculum-таб обязателен в MVP** — в Stitch он скрыт, но это P0-фича (FEATURES.md F3)

---

## 2. Цвета

Все значения хранятся в `constants/tokens.ts`.

| Роль | Токен | HEX | Где используется |
|------|-------|-----|-----------------|
| **canvas** | `colors.canvas` | `#FEF9F0` | Фон всех экранов кроме SOS-чата |
| **surface** | `colors.surface` | `#FFFFFF` | Фон карточек, модалок, инпутов |
| **primary** | `colors.primary` | `#FF6B6B` | SOS-кнопка, streak-кольцо, CTA, send, акценты |
| **success** | `colors.success` | `#2EC4A0` | Чекмарк Sugar-free, dot коуча, "Done" кнопка |
| **warning** | `colors.warning` | `#FFAA33` | "Had a little" статус, amber-предупреждения |
| **text** | `colors.textPrimary` | `#2D2D2D` | Все заголовки и основной текст |
| **text-secondary** | `colors.textSecondary` | `#8A8580` | Подписи, подсказки, timestamps, disclaimer |
| **chat bg** | `colors.chatBackground` | `#EEF5F2` | Фон SOS AI Chat (только этот экран) |

**Правила работы с цветом:**
- Один primary-элемент на экране. Если всё коралловое — ничто не выделяется.
- Красный (error `#FF6B6B`) и primary визуально одинаковы — error-состояния отличать иконкой и текстом, не только цветом.
- Никаких новых цветов без внесения в `tokens.ts`.

---

## 3. Типографика

Шрифты: **Plus Jakarta Sans** (заголовки, числа, CTA) + **Manrope** (тело, метки).
Все токены в `constants/fonts` и `constants/typeScale`.

| Стиль | Шрифт | Размер | Вес | Где |
|-------|-------|--------|-----|-----|
| **Hero number** | PlusJakartaSans | 72 | Bold | Streak-счётчик, большие цифры |
| **Display large** | PlusJakartaSans | 36 | SemiBold | "8 DAYS SUGAR-FREE" |
| **Display medium** | PlusJakartaSans | 28 | SemiBold | Заголовки экранов |
| **Title large** | PlusJakartaSans | 20 | SemiBold | Заголовки карточек |
| **Body large** | Manrope | 16 | Regular | Основной текст, сообщения чата |
| **Body medium** | Manrope | 14 | Regular | Вторичный текст, описания |
| **Label** | Manrope | 12 | Medium | Таб-лейблы, капшны, метки |

**Правила:**
- Минимальный размер текста: 12pt (label). Мельче — только если не несёт смысла.
- Italic — только для цитат и вдохновляющих фраз ("You've survived 100%...").
- Letter-spacing: `tracking.tight` (-0.3) для Hero чисел, `tracking.normal` для body.

---

## 4. Поверхности

### Фоны
| Поверхность | Цвет | Когда |
|-------------|------|-------|
| Основной фон | `canvas` #FEF9F0 | Все экраны приложения |
| SOS-чат | `chatBackground` #EEF5F2 | Только экран 3.1 SOS AI Chat |
| Модалки | `surface` #FFFFFF + backdrop 40% black | Поверх основного контента |

### Карточки
- Фон: `surface` #FFFFFF
- Граница: 1px `colors.outline` #C5C0B8 (или без границы при shadow)
- Скругление: `radius.sm` (16px) — стандарт, `radius.md` (32px) — hero-карточки
- Тень: `shadows.cardWhisper` (opacity 0.02, radius 40) — еле заметная, не тяжёлая

### Тени
Теней минимум. Карточки отделяются границей или лёгкой тенью, но не обеими сразу.

| Токен | Где |
|-------|-----|
| `shadows.cardWhisper` | Обычные карточки |
| `shadows.buttonMd` | SOS-кнопка, primary CTA |
| `shadows.glowToken` | Streak ring, токен-акцент |

---

## 5. Примитивы

Список компонентов в `components/ui/`. Основан на реальных нуждах экранов из SCREEN-MAP.md.

| # | Компонент | Файл | Роль |
|---|-----------|------|------|
| 1 | **SOSFab** | `SOSFab.tsx` | Плавающая круглая SOS-кнопка, primary цвет, пульс-анимация при первом показе, haptic Heavy |
| 2 | **PillCTA** | `PillCTA.tsx` | Основная кнопка-пилюля (Done, Начать, Отправить). Полная ширина или компактная |
| 3 | **GlassCard** | `GlassCard.tsx` | Базовая белая карточка с тенью и скруглением. Обёртка для любого контента |
| 4 | **StreakOrb** | `StreakOrb.tsx` | Hero-элемент с кольцом прогресса и числом дней. Главный визуальный элемент Home |
| 5 | **CheckInCard** | *(создать)* | Карточка выбора статуса: Sugar-free / Had a little / Full relapse. Цветная левая граница |
| 6 | **LessonCard** | *(создать)* | Превью урока дня: иконка, день, заголовок, время чтения, "Read Lesson →" |
| 7 | **StatChip** | *(создать)* | Маленькая статистическая пилюля: иконка + число + лейбл (15 cravings, $24 saved) |
| 8 | **ChatBubble** | *(создать)* | Пузырь сообщения. Два варианта: user (primary coral, right) / coach (white card, left) |
| 9 | **QuizOptionCard** | *(создать)* | Карточка-выбор в онбординге. Single или multi-select, эмодзи + текст, haptic при выборе |
| 10 | **ProgressBar** | *(создать)* | Тонкая горизонтальная полоса прогресса. Используется в онбординге и Curriculum |
| 11 | **MoodPicker** | *(создать)* | Ряд из 5 эмодзи для выбора настроения в Check-in |
| 12 | **PaywallTierCard** | *(создать)* | Карточка тарифа (месячный / годовой). Выделенное состояние — primary border |
| 13 | **BottomNav** | `BottomNav.tsx` | Tab bar: Home / Curriculum / Progress / Profile. SOS-кнопка не в tabbar, отдельно |
| 14 | **TokenDot** | `TokenDot.tsx` | Цветная точка-индикатор (зелёная = online coach, янтарная = warning, красная = error) |

---

## 6. Layout

### Структура экрана (3-Layer System)
Каждый экран строится из трёх слоёв:

```
┌─────────────────────────┐
│ Layer 3: Floating UI    │  ← абсолютное позиционирование: SOSFab, хедер, top-баннер
├─────────────────────────┤
│ Layer 2: Content        │  ← ScrollView или flex, карточки, текст
├─────────────────────────┤
│ Layer 1: Background     │  ← абсолютный фон, градиент (НЕ внутри ScrollView)
└─────────────────────────┘
```

### Отступы

| Токен | Значение | Где |
|-------|---------|-----|
| `spacing.md` | 16px | Горизонтальный padding экрана, padding карточки |
| `spacing.lg` | 24px | Расстояние между секциями |
| `spacing.sm` | 8px | Расстояние между элементами внутри карточки |
| `spacing.xs` | 4px | Внутри компактных элементов (StatChip) |

### Ширина и зоны
- Горизонтальный padding экрана: **16px** с обеих сторон
- Карточки: полная ширина минус 32px (16+16)
- StatChip-ряды: flex-row, gap 12px, равные flex: 1
- Минимальный touch target: **44×44pt** (Apple HIG)
- Нижняя безопасная зона: `useSafeAreaInsets().bottom` — всегда учитывать под tab bar и SOS

### Адаптивность
- Всегда `useWindowDimensions()` для ширины/высоты — никаких захардкоженных значений экрана
- `useSafeAreaInsets()` для отступов от notch и home indicator
- Изображения: `aspectRatio` вместо фиксированной высоты

---

## 7. Screen Recipes

### Recipe 1: Home Dashboard (экран 2.1)

```
[Layer 1] Background: canvas #FEF9F0, без градиента
[Layer 2] ScrollView с padding 16px:
  - Greeting text: "Welcome back, Sarah" (Display medium, textPrimary)
  - Subtext: "The sanctuary is ready for you today." (Body medium, textSecondary)
  - StreakOrb: Hero-кольцо с числом дней, цвет primary
  - StatChip row: [15 CRAVINGS] [$ 24 SAVED]
  - CheckInCard: "How did yesterday go?" (если check-in не выполнен)
  - LessonCard: "Day 8 · Your taste buds are changing"
  - Motivational quote (italic, textSecondary, centered)
[Layer 3] SOSFab: center-bottom, над tab bar
           BottomNav: Home / Curriculum / Progress / Profile
```

**Источник структуры:** WIREFRAMES.md WF-4, SCREEN-MAP.md 2.1
**Визуальный референс:** stitch-raw/screenshots/01-home-dashboard-sos.png

---

### Recipe 2: SOS AI Chat (экран 3.1)

```
[Layer 1] Background: chatBackground #EEF5F2 (отличается от canvas!)
[Layer 2] Полноэкранный чат:
  - Хедер: "← SOS Coach" + "Done" (primary text, right)
  - Баннер: "Not medical advice" (caption, textSecondary, center)
  - FlatList сообщений:
    → Coach: ChatBubble (surface white, left, TokenDot green + "COACH")
    → User: ChatBubble (primary coral, right)
    → Suggestion chips: мини-карточки на surface с иконкой и текстом
  - Inspirational quote (italic, textSecondary, centered, над инпутом)
[Layer 3] Sticky bottom:
  - Input: surface white, placeholder "Write a message...", emoji кнопка
  - Send кнопка: круглая, primary coral, стрелка
```

**Источник структуры:** WIREFRAMES.md WF-6, SCREEN-MAP.md 3.1
**Визуальный референс:** stitch-raw/screenshots/03-sos-ai-coach.png

---

### Recipe 3: Daily Check-in (экран 3.2)

```
[Layer 1] Background: canvas #FEF9F0
[Layer 2] Centered content (не ScrollView — 3 карточки всегда влезают):
  - Заголовок: "How did yesterday go?" (Display medium)
  - Subtext: "Be honest — all answers help you learn" (body, textSecondary)
  - 3 × CheckInCard:
      Green border + ✓: "Sugar-free! / I didn't have added sugar"
      Amber border + 🍪: "Had a little / Some sugar, but I'm aware of it"
      Coral border + 🔄: "Full relapse / It's data, not failure"
  - Caption: "Every check-in makes your plan smarter" (italic, textSecondary)
[Layer 3] BottomNav (Log-таб подсвечен)
```

Шаг 2 (Mood): те же слои, вместо карточек — MoodPicker (5 эмодзи в ряд).
Шаг 3 (Done): полноэкранный celebration с PillCTA "Done ✓".

**Источник структуры:** WIREFRAMES.md WF-12, SCREEN-MAP.md 3.2
**Визуальный референс:** stitch-raw/screenshots/02-daily-checkin.png

---

### Recipe 4: Paywall (экран 1.15)

```
[Layer 1] Background: canvas с лёгким gradient sunriseGreens снизу
[Layer 2] ScrollView:
  - Персонализация: "Sarah, your Sugar Reset plan is ready!"
  - Тип тяги: "Stress Eater (3pm crash)" (GlassCard)
  - Benefits list: 4 × строка с ✓ и primary-точкой
  - Social proof: ★★★★★ + цитата пользователя
  - 2 × PaywallTierCard: [Годовой — BEST] [Месячный]
  - Value anchor: "$0.22/день — дешевле одной конфеты"
  - PillCTA primary: "Начать 7 дней бесплатно →"
  - Honest timeline: "Day 1 доступ → Day 5 напоминание → Day 7 оплата"
  - Текст-ссылка: "Может быть, позже" (caption, textSecondary)
```

**Источник структуры:** WIREFRAMES.md WF-3, PRACTICES-BRIEF.md, SCREEN-MAP.md 1.15
**Визуал:** анимированный paywall (2.9x конверсия по данным Adapty)

---

## 8. Motion & Haptics

**Принцип:** анимации помогают понять, что произошло — не украшение.

| Событие | Анимация | Длительность | Haptic |
|---------|----------|-------------|--------|
| Tap SOS | Scale 0.9 → spring back | 200ms | Heavy |
| Check-in submit | Slide up + fade | 300ms | Medium |
| Streak increment | Counter roll-up | 600ms | Success notification |
| Milestone | Confetti particles + badge reveal | 2000ms | Success notification |
| Quiz answer select | Scale 1.05 + border highlight | 150ms | Light |
| Modal open | Slide from bottom + backdrop | 300ms | — |
| Tab switch | Cross-fade (без slide) | 200ms | Selection |
| Chat message | Fade in + slide up (user) / typing dots → reveal (AI) | 200ms | — |
| Paywall tier select | Border highlight + checkmark | 150ms | Light |

**Важно:** всегда проверять `AccessibilityInfo.isReduceMotionEnabled()` — отключать confetti и pulse-анимации, сохранять функциональные переходы.

---

## 9. Антипаттерны

1. **Не добавлять новые цвета без токена.** Inline hex-коды в компонентах = хаос при рефакторинге.

2. **Не использовать тёмную тему** (stitch-export 01–12). Та серия устарела. Все экраны — на светлом canvas.

3. **Не ставить SOS-кнопку не по центру.** По UX-спецификации она всегда в center-bottom над табом. Смещение вправо или другую форму — не использовать.

4. **Не прятать Curriculum за paywall в Day 1–14.** Первые 14 уроков бесплатны (FEATURES.md F3). Показывать замок на бесплатном контенте — триггер удаления.

5. **Не писать осуждающий копирайт.** Никогда: "Вы снова сорвались", "Плохой день". Всегда: "It's data, not failure", "Every check-in makes your plan smarter".

6. **Не перегружать экран цветом.** Если три элемента коралловые — ни один не выделяется. Один primary-акцент на экране.

7. **Не использовать тяжёлые тени.** Максимум `cardWhisper` (opacity 0.02). Карточки отделяются границей или пространством, не тенью.

8. **Не запрашивать push-разрешение на первом экране.** Только после контекстного объяснения ценности — в экране 1.17 после auth (PRACTICES-BRIEF.md).

---

## 10. Pre-commit Checklist

Перед мёржем любых UI-изменений проверить:

- [ ] **Цветовой контраст** ≥ 4.5:1 для текста, ≥ 3:1 для UI-элементов (WCAG 2.1 AA)
- [ ] **Touch target** ≥ 44×44pt на всех интерактивных элементах (кнопки, карточки, табы)
- [ ] **Haptic** добавлен на каждый tap-элемент согласно таблице в разделе 8
- [ ] **Safe area** учтена через `useSafeAreaInsets()` — ничего не уходит под notch или home indicator
- [ ] **useWindowDimensions()** используется для всех size-зависимых значений — нет хардкода 390, 844 и т.д.
- [ ] **accessibilityLabel** выставлен на SOSFab, StreakOrb, CheckInCard, MoodPicker, PaywallTierCard
- [ ] **Reduce Motion** проверен — confetti и pulse отключаются, функциональные анимации остаются
- [ ] **Все цвета из tokens.ts** — нет inline hex в StyleSheet

---

*Источники: [SCREEN-MAP.md](../04-ux/SCREEN-MAP.md) · [WIREFRAMES.md](../04-ux/WIREFRAMES.md) · [UX-SPEC.md](../04-ux/UX-SPEC.md) · [FEATURES.md](../02-product/FEATURES.md) · [TARGET-AUDIENCE.md](../02-product/TARGET-AUDIENCE.md) · [PRACTICES-BRIEF.md](../03-practices/PRACTICES-BRIEF.md) · [stitch-raw/screenshots/](./stitch-raw/screenshots/)*

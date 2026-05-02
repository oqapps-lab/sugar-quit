# Sugar Quit — Design Guide

**Версия:** 2.0 (апрель 2026)
**Источники истины:**
- Функциональность + навигация: `docs/04-ux/` (SCREEN-MAP, UX-SPEC, WIREFRAMES, USER-FLOWS)
- Продукт + аудитория: `docs/02-product/` + `docs/01-research/`
- Практики: `docs/03-practices/` (onboarding, paywall, retention)
- Визуальный стиль: `docs/06-design/stitch-raw/` (3 экрана)
- Канонические токены: `constants/tokens.ts`

**Правило конфликта:** UX-доки побеждают Stitch по функциональности и навигации. Stitch задаёт атмосферу и композицию, не цвета и шрифты — они живут в `constants/tokens.ts`.

---

## 1. TL;DR — что берём, что выбрасываем, что апгрейдим

**Берём из Stitch (stitch-raw):**
- Атмосфера «миссии»: cream-фон + три светящихся орба + ощущение космического штаба
- Glassmorphism-карточки: полупрозрачность, тонкая рамка, мягкая тень
- Большой hero-номер как главный элемент streak / дней (занимает 40–50% экрана)
- Terminal/mono-эстетика для системных лейблов и caps-подписей (мотивирует без агрессии)
- Orbital arc SVG на Progress-экране — визуальный прогресс от Day 1 до Day 90
- Breathing pacer в SOS: анимированная точка скользит по gradient-линии
- Три action-кнопки на Home: primary (gradient), secondary (тёмная), tertiary (тёмная)

**Выбрасываем из Stitch:**
- Цвета `#b50058` (hot pink), `#006666` (teal), `#811cd9` (purple) — наша палитра в `tokens.ts`, primary `#a53c30`
- Шрифты Space Grotesk, JetBrains Mono, Fraunces — наши: Plus Jakarta Sans + Manrope
- Навигацию DASHBOARD / MISSIONS / INTEL / COMMAND — правильно: **Home / Curriculum / Progress / Profile** (SCREEN-MAP.md)
- SOS как список выборов «01 Breathing / 02 Emergency / 03 Talk to AI» — SOS = сразу полноэкранный AI-чат (UX-SPEC F1, Flow 2)
- SOS FAB в правом нижнем углу — правильно: **по центру над tab bar** (UX-SPEC 2.4)
- Stitch-метафору «AGENT-07 ENGAGED» и military-tone — наш тон: поддерживающая подруга, не военный штаб (UX-SPEC Принцип 2)

**Апгрейдим (есть в UX-доках, нет в Stitch):**
- Home: добавить check-in card поверх streak, если check-in не выполнен (WIREFRAME WF-4)
- Home: today's lesson card + quick stats (cravings defeated + $saved)
- Progress: health timeline «After 7 days — glucose stabilizes» + cravings chart по дням
- SOS: реальный streaming AI-чат с ChatBubble + TypingIndicator (WIREFRAME WF-6)
- SOS Post-session: 3 варианта («Тяга побеждена / Стало легче / Сорвалась») без осуждения (WIREFRAME WF-7)
- Paywall: honest timeline (Day 1→5→7), персонализация с именем, benefit CTA (PAYWALL-RESEARCH)

---

## 2. Цвета

Все значения из `constants/tokens.ts`. Hex-литералы в StyleSheet запрещены — только `colors.X`.

### Основная палитра

| Роль | Token | HEX | Применение |
|------|-------|-----|------------|
| **Primary** | `colors.primary` | `#a53c30` | CTA-кнопки, streak-числа, иконка активного таба, SOS FAB glow |
| **Primary Container** | `colors.primaryContainer` | `#ffaca0` | Dot-fill, бейджи, лёгкие подложки |
| **Secondary** | `colors.secondary` | `#6a577f` | Breathing pacer, insight-карточки, орб №2 (lavender) |
| **Tertiary** | `colors.tertiary` | `#526262` | Orbital arc, secondary info, орб №3 (mint) |
| **Error** | `colors.error` | `#ac3434` | SOS FAB, «CRAVING DETECTED», деструктивные действия |
| **Surface** | `colors.surface` | `#fbf9f5` | Фон всех экранов (тёплый cream) |
| **Surface Container Low** | `colors.surfaceContainerLow` | `#f5f3ef` | Карточки, quick-nav ячейки |
| **Inverse Surface** | `colors.inverseSurface` | `#0e0e0d` | Тёмные кнопки (BREATHE, LOG), тёмный текст hero |
| **On Surface** | `colors.onSurface` | `#31332f` | Основной текст |
| **On Surface Variant** | `colors.onSurfaceVariant` | `#5e605b` | Вторичный текст, caps-лейблы, мета |

### Атмосферные орбы (AuraBlob tint)

| Позиция | Цвет | Opacity |
|---------|------|---------|
| Top-left | `primaryContainer` `#ffaca0` | 0.35 |
| Mid | `secondaryContainer` `#efdbff` | 0.25 |
| Bottom-right | `tertiaryContainer` `#cfe0df` | 0.25 |

### Glassmorphism

| Поверхность | Значение |
|-------------|---------|
| Cream card | `rgba(251, 249, 245, 0.72)` |
| White card | `rgba(255, 255, 255, 0.55)` |
| Nav bar | `rgba(251, 249, 245, 0.80)` |

---

## 3. Типографика

**Два шрифта, без исключений:**
- **Plus Jakarta Sans** (`fonts.headline*`) — заголовки, hero-числа, кнопки. Confident, geometric.
- **Manrope** (`fonts.body*`, `fonts.label`) — body-тексты, caps-лейблы. Humanist, readable.

### Type Scale

| Стиль | Font token | Размер | Tracking | Применение |
|-------|-----------|--------|----------|------------|
| Hero Number | `headlineExtraBold` | 72 | `tight` | Streak-число, big milestone |
| Display Large | `headlineExtraBold` | 36 | `tight` | Hero-заголовок Home («Day 02») |
| Display Medium | `headlineExtraBold` | 28 | `tight` | SOS card («Hold. 4 minutes.») |
| Display Small | `headlineBold` | 22 | `tight` | Progress section title |
| Title Large | `headlineBold` | 20 | `normal` | Card headings |
| Title Medium | `headlineSemibold` | 17 | `normal` | Lesson title, paywall tier label |
| Body Large | `headlineExtraBold` | 16 | `wide` | Кнопки (STRIKE, BREATHE, LOG) |
| Body Medium | `label` | 14 | `wide` | Telemetry строки, chat body |
| Label | `label` | 12 | `labelWide` | ALL CAPS подписи (TRAJECTORY, AI · LIVE) |
| Label Small | `label` | 10 | `labelWide` | Мета под датами, orbital sub-info |

**Правила:**
- ALL CAPS — только с `fonts.label` (Manrope) + `letterSpacing: tracking.labelWide`
- Italic допустим только для акцентного слова в tacticalTitle («*dying*», «*4 minutes*»), шрифт `headlineExtraBold` со skew-transform
- Hero numeral 72px всегда `lineHeight = fontSize` (иначе обрезка)
- Никаких декоративных serif-шрифтов — Fraunces из Stitch не используем

---

## 4. Поверхности

### Layer 1 — Фон (absoluteFill, pointerEvents="none")

```
AtmosphericGradient theme="dawn"   ← cream #fbf9f5, тёплый нейтральный
AuraBlob coral    top-left         ← primaryContainer, opacity 0.35, blur 100px
AuraBlob lavender mid              ← secondaryContainer, opacity 0.25, blur 120px
AuraBlob mint     bottom-right     ← tertiaryContainer, opacity 0.25, blur 110px
```

Фон одинаковый на всех Main Tab экранах. Modal-экраны (SOS, Check-in) наследуют тот же стек.

### Layer 2 — Карточки

| Тип | Tint | radius | padding | shadow |
|-----|------|--------|---------|--------|
| `GlassCard tint="cream"` | `rgba(251,249,245,0.72)` | `radius.sm` (16) | `spacing.lg` (24) | `shadows.cardWarm` |
| `GlassCard tint="white"` | `rgba(255,255,255,0.55)` | `radius.sm` (16) | `spacing.lg` (24) | `shadows.cardWhisper` |
| Accent stat (DAYS CLEAN) | `colors.surfaceContainerLowest` | `radius.sm` (16) | `spacing.lg` (24) | `borderLeftWidth: 2, borderColor: colors.primary` |

**Рамка карточки:** `borderWidth: 1, borderColor: rgba(colors.outlineVariant, 0.15)` — чуть заметная, не жирная.

### Layer 3 — Floating UI (absolute)

| Элемент | Стиль |
|---------|-------|
| Tab bar | `bg rgba(fbf9f5, 0.80)` + `backdropBlur: blur.md` + `borderTop: primary 8%` + `shadows.navTop` |
| SOS FAB | `gradients.fab` + `radius.full` + `shadows.pillLg` + **позиция: CENTER-BOTTOM над tab bar** |
| Top nav (modal) | `bg rgba(fbf9f5, 0.80)` + `backdropBlur: blur.md` + `borderBottom: outlineVariant 15%` |

---

## 5. Примитивы

14 компонентов под экраны из `docs/04-ux/SCREEN-MAP.md`. Каждый компонент работает на любом экране без дополнительной настройки.

| # | Компонент | Путь | Роль |
|---|-----------|------|------|
| 1 | `AtmosphericGradient` | `components/ui/AtmosphericGradient` | Фон экрана, 3 темы (dawn / sunriseGreens / darkHorizon) |
| 2 | `AuraBlob` | `components/ui/AuraBlob` | Светящийся орб, slow drift-анимация |
| 3 | `GlassCard` | `components/ui/GlassCard` | Полупрозрачная карточка, prop `tint="cream|white"` |
| 4 | `SOSFab` | `components/ui/SOSFab` | FAB по центру, gradient `gradients.fab`, glow, haptic Heavy |
| 5 | `HeroNumeral` | `components/ui/HeroNumeral` | Streak-число 72px с gradient-fill `gradients.heroVertical` |
| 6 | `DotGrid` | `components/ui/DotGrid` | Сетка прогресс-точек (filled = primary, empty = surfaceVariant) |
| 7 | `ProgressBar` | `components/ui/ProgressBar` | Тонкая полоса 4px с gradient-fill, onboarding + curriculum |
| 8 | `PillButton` | `components/ui/PillButton` | CTA (variant: `primary` / `dark` / `ghost`), haptic Medium |
| 9 | `StatCard` | `components/ui/StatCard` | Ячейка статистики: caps-label + big number |
| 10 | `CheckInCard` | `components/home/CheckInCard` | Daily check-in карточка (видна, если `!isCheckedIn`) |
| 11 | `LessonCard` | `components/curriculum/LessonCard` | Today's lesson: заголовок + время + CTA; locked state с 🔒 |
| 12 | `ChatBubble` | `components/sos/ChatBubble` | Сообщение в SOS Chat (variant: `user` / `ai` / `typing`) |
| 13 | `BreathingPacer` | `components/sos/BreathingPacer` | Точка по gradient-линии, `withRepeat` 8000ms |
| 14 | `QuizOptionCard` | `components/onboarding/QuizOptionCard` | Карточка выбора в quiz, toggle select, haptic Light |

---

## 6. Layout

### Отступы (из `spacing`)

```
xs  =  4  — gap между иконкой и текстом, dot-gap в DotGrid
sm  =  8  — gap между action-кнопками, badge padding
md  = 16  — padding кнопок, grid gap между stat-ячейками
lg  = 24  — card padding, gap между секциями внутри ScrollView
xl  = 32  — hero gap (между StreakCard и следующей секцией)
xxl = 48  — большие разрывы между блоками (Home hero → cards)
```

### Ширина и сетка

- ScrollView: `paddingHorizontal: spacing.lg` (24) с обеих сторон
- Карточки: `width: '100%'` внутри ScrollView
- 2-колоночный grid (stat-ячейки): `flexDirection: 'row', gap: spacing.md`
- 3-кнопочный row (Home actions: STRIKE / BREATHE / LOG): `flexDirection: 'row', gap: spacing.sm`
- Максимальная ширина контента на планшете: 480px (`maxWidth: 480, alignSelf: 'center'`)

### Safe Areas (обязательно на каждом экране)

```ts
const insets = useSafeAreaInsets();

// ScrollView контент:
paddingTop: insets.top + spacing.xl
paddingBottom: insets.bottom + 120   // tab bar + SOS FAB зазор

// Modal с nav bar:
paddingTop: insets.top + NAV_HEIGHT + spacing.lg

// SOS FAB:
bottom: insets.bottom + 80          // строго по центру, center-bottom
left: '50%'
transform: [{ translateX: -28 }]    // FAB 56px wide → -28

// Tab bar:
paddingBottom: insets.bottom
```

---

## 7. Screen Recipes

Структура берётся из `docs/04-ux/WIREFRAMES.md`, визуал — из Stitch.

### Recipe A — Main Tab (Home, Progress, Curriculum)

```
Layer 1 (absoluteFill, pointerEvents="none"):
  AtmosphericGradient theme="dawn"
  AuraBlob coral   top={-80} left={-60} size={280}
  AuraBlob lavender top={'35%'} right={-80} size={320}
  AuraBlob mint    bottom={-60} left={-40} size={260}

Layer 2 (ScrollView, bounces, showsVerticalScrollIndicator=false):
  paddingTop: insets.top + spacing.xl
  paddingBottom: insets.bottom + 120
  paddingHorizontal: spacing.lg
  gap: spacing.xl

  ── Hero Section (FadeInUp 500ms) ──
  Eyebrow label — ALL CAPS, onSurfaceVariant, label font
  HeroNumeral или displayLarge headline
  Sub-label — onSurfaceVariant, ALL CAPS, label font

  ── Tactical Card (FadeInDown delay=160ms) ──
  GlassCard tint="cream"
  Основной контент экрана

  ── Stats Grid 2-col (FadeInDown delay=240ms) ──
  StatCard × 2  (или 3 в ряд для Progress)

  ── Action Row (FadeInDown delay=320ms) ──
  3 PillButton: primary gradient + dark + dark

Layer 3 (absolute):
  SOSFab center-bottom, bottom={insets.bottom + 80}
  Tab bar bottom=0
```

**Home добавляет:**
- `CheckInCard` над hero section, если `!isCheckedIn` — должна бросаться в глаза
- `LessonCard` под stats — today's curriculum урок
- Motivational quote в конце (bodyMedium, onSurfaceVariant, italic)

**Progress добавляет:**
- Orbital arc SVG (упрощённая версия из Stitch) под hero
- Cravings chart (по дням недели)
- Health Timeline list (Day 7 / Day 14 / Day 30 milestones)
- Achievements grid (DotGrid 3×2)

### Recipe B — Modal Full-Screen (SOS Chat, Check-in, Craving Logger)

```
Layer 1: AtmosphericGradient + AuraBlob × 2 (без нижнего)

Layer 3 (absolute top, zIndex=50):
  Top Nav Bar:
    height: NAV_HEIGHT (56) + insets.top
    paddingTop: insets.top
    bg rgba(fbf9f5, 0.80) + backdropBlur
    borderBottom: outlineVariant 15%
    ← back/dismiss button   |   Brand label   |   Live pill

Layer 2 (KeyboardAvoidingView → ScrollView или FlatList):
  paddingTop: insets.top + NAV_HEIGHT + spacing.lg
  paddingBottom: insets.bottom + 100

  ── Status Row ──
  "AI · LIVE" pill (dark inverse bg) + "AGENT · ENGAGED" caps label (right)

  ── Main Card ──
  GlassCard tint="cream"
  displayMedium headline (tactical message)

  ── Telemetry Rows (только в SOS) ──
  3 строки JB-mono стиля: "› CRAVING DETECTED: HIGH", etc.
  левая вертикальная полоска primary цвета

  ── Breathing Pacer (только в SOS-брифинге) ──
  BreathingPacer — gradient-линия + анимированная точка

  ── Command List (только в SOS-меню) ──
  НЕ используется вместо AI-чата. Если нужен выбор —
  только как ввод ВНУТРИ чата, не как замена.
```

### Recipe C — SOS AI Chat (экран 3.1, core feature)

Важно: SOS = СРАЗУ AI-чат, не список выборов. (UX-SPEC F1, Flow 2)

```
Layer 1: AtmosphericGradient theme="dawn"

Layer 3 (top): Top Nav Bar с dismiss "Done" + "AGENT-07 ENGAGED"
Layer 3 (bottom): TextInput + Send — выше клавиатуры (KeyboardAvoidingView)

Disclaimer banner (onSurfaceVariant, caption size):
  "Не является медицинским советом"

Layer 2 (FlatList, inverted=true):
  ChatBubble variant="ai"   — left align, GlassCard tint="white"
  ChatBubble variant="user" — right align, bg primaryContainer
  ChatBubble variant="typing" — 3 анимированных dot (primary)

AI начинает ПЕРВЫМ за <3 сек. Пользователь не ждёт.
История сохраняется при закрытии. При возврате: "Хочешь продолжить?"
```

### Recipe D — Onboarding Quiz

```
Layer 1: AtmosphericGradient theme="sunriseGreens"
         (только для Welcome и первых quiz-экранов)
         Далее: theme="dawn" для стабильности

Layer 2 (View, не ScrollView — один вопрос на экране):
  paddingTop: insets.top + spacing.xl
  paddingHorizontal: spacing.lg

  ── Top ──
  ProgressBar (step N из 15) + время прохождения («~3 мин»)

  ── Question ──
  displayMedium headline (жирный, tight tracking)
  body sub-label при необходимости

  ── Options ──
  Одиночный выбор: QuizOptionCard в list (каждый на полную ширину)
  Множественный: QuizOptionCard в grid 2×N
  Emoji + текст в каждой карточке — НЕ только текст

Layer 3 (bottom, absolute):
  PillButton primary («Продолжить →»)
  bottom: insets.bottom + spacing.lg
  Неактивна, пока не выбрано минимум 1 вариант
```

---

## 8. Motion & Haptics

### Входные анимации (react-native-reanimated)

| Элемент | Анимация | Duration | Delay |
|---------|----------|----------|-------|
| Hero / eyebrow | `FadeInUp` translateY 16→0 | 500ms | 0 |
| Первая карточка | `FadeInDown` | 400ms | 160ms |
| Каждая следующая | `FadeInDown` | 400ms | +80ms на блок |
| Action buttons row | `FadeInUp` | 300ms | 320ms |

Всегда проверять `useReducedMotion()` — при `true` не запускать loops и убрать drift.

### Циклические анимации

| Компонент | Параметры |
|-----------|-----------|
| `BreathingPacer` | `withRepeat(withTiming(lineWidth-16, 8000, Easing.inOut(sin)), -1, true)` |
| `AuraBlob` drift | translateX/Y ±14–22px, opacity 0.15→0.25, period 14–22s |
| Live pill dot | opacity `withRepeat(withTiming(0.2, 900), -1, true)` |
| SOS FAB pulse | scale 1.0→1.06, period 1800ms — только при первом появлении |

### Haptics (Haptics.impactAsync / notificationAsync)

| Действие | Тип |
|----------|-----|
| SOS FAB tap | `Heavy` |
| Primary CTA (STRIKE, Начать) | `Medium` |
| Secondary action (BREATHE, LOG) | `Medium` |
| Quiz option select | `Light` |
| Tab switch | `Selection` |
| Milestone celebration | `Success` notification |
| Check-in complete | `Success` notification |
| Error / лимит исчерпан | `Error` notification |
| Streak Freeze использован | `Medium` → пауза 300ms → `Light` |

---

## 9. Антипаттерны

1. **Не брать навигацию из Stitch.** DASHBOARD/MISSIONS/INTEL/COMMAND — неверно. Правильно: **Home / Curriculum / Progress / Profile** (SCREEN-MAP.md). Иконки: grid_view / book / analytics / person (Material Icons).

2. **Не ставить SOS FAB справа.** Stitch ставит его в bottom-right. UX-SPEC 2.4 явно указывает: **center-bottom над tab bar**. Только там.

3. **Не заменять SOS Chat списком действий.** «01 Breathing / 02 Emergency / 03 Talk to AI» — это Stitch-интерпретация, не наша. SOS = сразу AI-чат. Любые подсказки — внутри переписки, не вместо неё.

4. **Не писать inline-стили в JSX.** Только `StyleSheet.create`. Исключение — только динамические значения (`{ width: dynamicValue }`). Из CLAUDE.md.

5. **Не использовать hex-литералы в StyleSheet.** Только `colors.X` из tokens. Никаких `'#a53c30'` напрямую.

6. **Не рендерить 90 dots одним массивом.** 90 `<View>` на экране — лаги. Home: максимум 12 точек, Progress: 9. Остальные имитировать через `width: N%, bg: gradient`.

7. **Не строить Food Scanner и Craving Predictor в MVP.** Stitch может показывать их как концепты, но FEATURES.md (F14, F15) помечает как v1.5–v2.0.

8. **Не использовать tone военного штаба в текстах.** «AGENT-07 ENGAGED» в Stitch — это визуальный декор, не копирайт. Реальные тексты пишем в тоне поддерживающей подруги (UX-SPEC Принцип 2). Никакого осуждения при срыве.

9. **Не запрашивать push-уведомления на первом экране.** Контекстный запрос — после объяснения ценности, на экране 1.17 (ONBOARDING-RESEARCH.md). Ранний запрос = отказ навсегда.

10. **Не добавлять `any` в TypeScript.** Строгий режим. Router routes типизировать через `as const` или Expo Router typed routes.

---

## 10. Pre-commit Checklist

Перед каждым коммитом с UI-изменениями:

- [ ] **Цвета** — только `colors.X` из tokens. Поиск `#[0-9a-f]{3,6}` в изменённых файлах.
- [ ] **Safe Areas** — `useSafeAreaInsets()` подключён, `paddingTop`/`paddingBottom` учитывают `insets`.
- [ ] **Haptics** — каждая `Pressable` с `onPress` имеет `Haptics.impactAsync()` или `Haptics.notificationAsync()`.
- [ ] **ReducedMotion** — все компоненты с `withRepeat` возвращают статичный fallback при `useReducedMotion() === true`.
- [ ] **Навигация** — роуты матчат `docs/04-ux/SCREEN-MAP.md`. Нет MISSIONS/INTEL/COMMAND/DASHBOARD.
- [ ] **SOS FAB** — positioned center-bottom. Нет bottom-right.
- [ ] **TypeScript strict** — нет `any`, все props типизированы интерфейсами.
- [ ] **StyleSheet.create** — нет inline-object стилей в render (кроме динамических переменных).
- [ ] **Состояния экрана** — loading / empty / error / offline обработаны или явно помечены `// TODO: state`.
- [ ] **Тон** — тексты в UI не содержат стыда, осуждения, military-tone. Только поддержка.

---

## Приложение: Навигация (из SCREEN-MAP.md)

```
Tab bar (4 таба):
  🏠 Home       → app/(tabs)/home.tsx        — streak, check-in, lesson, SOS
  📚 Curriculum → app/(tabs)/curriculum.tsx  — 90-day program
  📊 Progress   → app/(tabs)/progress.tsx    — stats, chart, badges
  👤 Profile    → app/(tabs)/profile.tsx     — settings, subscription

SOS FAB (floating, center-bottom):
  → app/(modals)/sos-transmission.tsx        — fullscreen AI chat

Modals:
  → app/(modals)/checkin.tsx                 — daily check-in 3 steps
  → app/(modals)/post-sos.tsx                — result after SOS
  → app/(modals)/milestone.tsx               — celebration
  → app/(modals)/paywall-contextual.tsx      — repeat paywall
  → app/(modals)/streak-freeze.tsx           — freeze prompt
  → app/(modals)/disclaimer.tsx              — medical disclaimer
```

---

*Документ актуален для MVP (v0.9). При добавлении фич v1.0+ (Community, Eat This Instead, Predictions) — обновить секции 5 и 7.*

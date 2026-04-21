# Sugar Quit — Design Tokens

**Дата:** 2026-04-19
**Источник:** `stitch-export/` — 12 экранов, извлечено из Tailwind config + inline `<style>` каждого HTML.
**Цель:** единая дизайн-система с разрешёнными конфликтами, готовая лечь в React Native через `/constants/tokens.ts`.

---

## 0. Как читать этот документ

Каждый экран из Stitch пришёл со своим tailwind config — по сути со своей **мини-темой**. Между экранами есть:

- **Каноничные значения** — совпадают в 10–12 экранах → берём как основу бренда
- **Осознанные вариации темы** — 3–4 экрана используют альтернативную палитру или градиент, но в рамках того же языка → оформляем как **Theme Variant**
- **Accidental drift** — 1 экран случайно дал другое значение (Onboarding с radius 0.25rem, например) → явно **отвергаем**, фиксируем причину

Каждое сомнительное значение в этом документе помечено:
- ✓ — каноничное
- ◐ — вариация темы (использовать на специфичных экранах)
- ✗ — отвергнуто как accidental
- ⚠ — конфликт требует твоего решения

---

## 1. Resolved Conflicts — одним взглядом

| Категория | Каноничное | Вариации (◐) | Отвергнуто (✗) |
|---|---|---|---|
| Primary | `#a53c30` | — | `#a53d12` (экран 3), `#ad4127` (экран 4) |
| Surface | `#fbf9f5` | — | `#fefcf4` (экран 4) |
| On-surface | `#31332f` | `#1e293b` slate (◐ Morning Sky theme), `#7c2d12` warm-brown (◐ Misty Plum theme) | `#373930` (экран 4) |
| Secondary | `#6a577f` lavender | — | `#6d4ea3` (экран 3), `#506b4a` green (экран 4) |
| Tertiary container | `#cfe0df` pale mint | `#b8e6e2` brighter mint, `#f8cec2` coral (Sunrise Greens theme) | — |
| Headline font | Plus Jakarta Sans | Playfair Display italic (◐ hero highlights) | Newsreader (экран 4) — слишком serif-heavy |
| Body font | Manrope | — | Public Sans (экран 4) |
| Radius DEFAULT | `1rem` | `1.25rem` (экран 2, minor drift) | `0.25rem` (экран 4) — ломает язык |
| Brand name в UI | **The Exhale** | "Sugar Quit" (экраны 5, 10, 12) | ⚠ надо выбрать финальное |

⚠ **Единственный вопрос, который нужно решить осознанно:** "Sugar Quit" или "The Exhale" как in-app brand name. Всё остальное решено ниже автоматически по принципу большинства + согласованности.

---

## 2. Brand Identity

### 2.1 Brand name conflict

| Screen | Brand name shown |
|---|---|
| 01 SOS Breathe | THE EXHALE |
| 02 Craving Forecast A | THE EXHALE |
| 03 Living Dashboard | THE EXHALE |
| 05 Your Craving Profile | Sugar Quit |
| 06 Craving Forecast B | THE EXHALE |
| 07 Sleep Insight | Exhale |
| 08 90-Day Horizon | THE EXHALE + "Roadmap" subhead |
| 09 Craving Forecast C | The Exhale |
| 10 Craving Forecast D | SUGAR QUIT |
| 11 Craving Forecast E | The Exhale |
| 12 Daily Wellness Weather | Sugar Quit |

**Соотношение:** 8 экранов "The Exhale" / 3 "Sugar Quit" / 1 "Exhale".

**Default выбор (до решения):** **The Exhale** как in-app brand, **Sugar Quit** как product/repo/marketing name. Уже зафиксировано в memory.

### 2.2 Logo mark

Все 12 экранов: `material-symbols-outlined data-icon="bubble_chart"` — **пузырьки/bubble-chart glyph**. Цвет — `text-rose-900` (≈ `#881337`) или `text-primary` (`#a53c30`).

**Canonical logo:** bubble_chart glyph в primary (`#a53c30`) + wordmark в Plus Jakarta Sans weight 800 tracking-tighter. Для whisper-header варианта — weight 300 + uppercase + tracking-widest + size 10px.

---

## 3. Color System — Canonical Palette

Это **база Material 3 token scheme** с кастомной палитрой. Единая для всех экранов (кроме явных theme variants в §4).

### 3.1 Primary (rust / terracotta) — ядро бренда

| Token | HEX | Роль |
|---|---|---|
| `primary` ✓ | `#a53c30` | SOS button fill, active accents, CTA solid, ring anchors |
| `primary-dim` | `#953025` | Hover/pressed state primary, gradient endpoint |
| `primary-container` | `#ffaca0` | Light rust tint — card background, badge fill, breath ring outer |
| `primary-fixed` | `#ffaca0` | Same as primary-container, semantic fixed |
| `primary-fixed-dim` | `#ff9788` | Slightly saturated container, ghost number fill, gradient stop |
| `on-primary` | `#fff7f6` | Text/icon on primary fill (nearly white, 2% warm) |
| `on-primary-container` | `#761911` | Text on light primary card — deep warm maroon |
| `on-primary-fixed` | `#570202` | Deeper variant |
| `on-primary-fixed-variant` | `#822219` | Medium deep |
| `surface-tint` | `#a53c30` | Elevation tint = primary |
| `inverse-primary` | `#fd7d6c` | Primary on dark surface (90-Day Horizon dark mode) |

### 3.2 Surface (cream)

| Token | HEX | Роль |
|---|---|---|
| `surface` ✓ | `#fbf9f5` | Base app background |
| `background` | `#fbf9f5` | Same (Material 3 alias) |
| `surface-bright` | `#fbf9f5` | Same |
| `surface-dim` | `#dadad4` | Empty slot / unfilled dot tint |
| `surface-container-lowest` | `#ffffff` | Glass card overlay base (opacity applied) |
| `surface-container-low` | `#f5f3ef` | Subtle container |
| `surface-container` | `#efeee9` | Default container |
| `surface-container-high` | `#e9e8e3` | Nav background bright mode |
| `surface-container-highest` | `#e3e3dd` | Avatar placeholder, max elevation |
| `surface-variant` | `#e3e3dd` | Variant surface |
| `inverse-surface` | `#0e0e0d` | Dark inverse (tooltips, dark snackbar) |
| `inverse-on-surface` | `#9e9d9a` | Text on dark inverse |

### 3.3 On-surface (text colors)

| Token | HEX | Роль |
|---|---|---|
| `on-surface` ✓ | `#31332f` | Primary body text — warm near-black |
| `on-surface-variant` | `#5e605b` | Secondary/whisper text |
| `on-background` | `#31332f` | Same as on-surface |
| `outline` | `#7a7b76` | Border color, divider |
| `outline-variant` | `#b2b2ad` | Fainter border |

### 3.4 Secondary (muted lavender)

| Token | HEX | Роль |
|---|---|---|
| `secondary` ✓ | `#6a577f` | Whisper accents, icon outline, data line (sleep curve) |
| `secondary-dim` | `#5e4b72` | Deeper lavender, gradient endpoint |
| `secondary-container` | `#efdbff` | Pale lavender chip/badge background |
| `secondary-fixed` | `#efdbff` | Same semantic |
| `secondary-fixed-dim` | `#e3cbfa` | Slightly saturated lavender |
| `on-secondary` | `#fff6ff` | Text on deep lavender |
| `on-secondary-container` | `#5c4a71` | Text on pale lavender |
| `on-secondary-fixed` | `#49385d` | Deepest lavender text |
| `on-secondary-fixed-variant` | `#66547b` | Medium lavender |

### 3.5 Tertiary (muted teal / grey-green)

| Token | HEX | Роль |
|---|---|---|
| `tertiary` ✓ | `#526262` | Muted teal — "Exhale" mint mode text, evening accent |
| `tertiary-dim` | `#465656` | Deeper teal |
| `tertiary-container` | `#cfe0df` | Pale mint card background (evening/exhale zone) |
| `tertiary-fixed` | `#cfe0df` | Same |
| `tertiary-fixed-dim` | `#c1d2d1` | Slightly saturated mint |
| `on-tertiary` | `#eafdfc` | Text on deep teal |
| `on-tertiary-container` | `#415151` | Text on pale mint |
| `on-tertiary-fixed` | `#2f3f3e` | Deepest teal text |
| `on-tertiary-fixed-variant` | `#4b5b5b` | Medium teal |

### 3.6 Error (muted maroon)

| Token | HEX | Роль |
|---|---|---|
| `error` ✓ | `#ac3434` | Error state, SOS-danger variant |
| `error-dim` | `#70030f` | Deep error, gradient endpoint |
| `error-container` | `#f56965` | Light error tint — destructive action container |
| `on-error` | `#fff7f6` | Text on error fill |
| `on-error-container` | `#65000b` | Text on light error |

---

## 4. Color System — Theme Variants (5 themes)

Дизайн-язык один, но Stitch сгенерировал **5 атмосферных тем**. Они не конфликтующие — они применяются к разным контекстам экрана.

### Theme A — **Dawn** (default, 8 экранов)

**Настроение:** cream → peach → lavender → mint, тёплое утро.
**Экраны:** 01 SOS, 02 Forecast A, 03 Living Dashboard, 05 Craving Profile, 09 Forecast C, 11 Forecast E, 12 Daily Weather, + большинство будущих.
**Палитра:** полная canonical (§3).
**Фоновый градиент:** 3-radial atmospheric (см. §9.1).

### Theme B — **Misty Plum** (1 экран — 06)

**Настроение:** cream → amber → rose → plum, closeroom insight, "reading at dusk".
**Экраны:** 06 Craving Forecast B (withdrawal timeline + insight screens).
**Палитра отличается:** text warm-brown вместо on-surface.
| Token | HEX | Роль |
|---|---|---|
| `text-warm` ◐ | `#7c2d12` | Headline/body text в этой теме (вместо `#31332f`) |
| `text-soft` ◐ | `#9d8b85` | Whisper/secondary text |
| `amber-mist` ◐ | `#fdf2e9` | Floating blur orb |
| `rose-mist` ◐ | `#fce7f3` | Gradient mid-stop |
| `plum-soft` ◐ | `#e9d5ff` | Gradient lower-stop |
| `timeline-thread` ◐ | `rgba(124,45,18,0.15)` | Thin horizontal timeline line |

**Градиент:**
```css
background: linear-gradient(180deg, #fff9f5 0%, #fdf2e9 25%, #fae8e0 50%, #fce7f3 75%, #f3e8ff 100%);
```
**Где применять:** withdrawal symptoms, pattern insights, pensive/reflective экраны.

### Theme C — **Dark Horizon** (1 экран — 08, DARK MODE)

**Настроение:** navy → lavender → rust → cream, путь через глубину.
**Экраны:** 08 90-Day Horizon (Roadmap / Progress overview) — это **единственный dark-mode экран** в корпусе.
**Палитра отличается:**
| Token | HEX | Роль |
|---|---|---|
| bg gradient ◐ | см. §9.4 | Full-screen fixed gradient |
| on-surface on dark ◐ | `text-white/90`, `/80`, `/60`, `/40`, `/30`, `/20`, `/10` | Hierarchy через opacity |
| accent text ◐ | `text-rose-900` / `text-rose-100` | Brand accent (same tone) |
| card surface ◐ | `bg-white/10` + `backdrop-blur-3xl` | Glass on dark |

**Ethereal glow:** `filter: blur(12px); opacity: 0.6` — для неактивных узлов.
**Где применять:** progress roadmap, 90-day journey, milestones overview, anything про time-forward perspective.

### Theme D — **Morning Sky** (1 экран — 10, светлый slate)

**Настроение:** pale blue → lavender → peach → rose, рассвет на горизонте.
**Экраны:** 10 Craving Forecast D (variant — minimal forecast с timeline).
**Палитра отличается:**
| Token | HEX | Роль |
|---|---|---|
| `zenith-blue` ◐ | `#94a3b8` | Slate accent |
| `soft-lavender` ◐ | `#e0e7ff` | Gradient mid-stop |
| `warm-peach` ◐ | `#ffedd5` | Gradient warm-stop |
| `horizon-rose` ◐ | `#fecaca` | Gradient end-stop |
| `on-surface` в этой теме ◐ | `#1e293b` (slate-900) | Headline text |
| text body ◐ | `text-slate-800/60`, `/70`, `/40`, `/30` | Hierarchy через opacity |

**Градиент:**
```css
background: linear-gradient(to bottom, #dbeafe 0%, #e0e7ff 25%, #ffedd5 70%, #fecaca 100%);
```
**Где применять:** 24-hour forecast minimal, prediction screen, "quiet data" экраны где rust anchor был бы громок.

### Theme E — **Sunrise Greens** (1 экран — 04, onboarding)

**Настроение:** cream → coral → mint-green, рассвет как начало пути.
**Экраны:** 04 Onboarding Why Now (и возможно весь onboarding flow).
**Палитра отличается — здесь серьёзные отклонения:**
| Token | HEX | Роль |
|---|---|---|
| `primary` в этой теме ◐ | `#ad4127` (чуть темнее canonical `#a53c30`) | Тональный сдвиг |
| `primary-fixed` ◐ | `#fe7d5e` | Brighter coral |
| `primary-fixed-dim` ◐ | `#ed7153` | Coral dim |
| `secondary` ◐ | `#506b4a` (olive green) | Green accent — уникально для onboarding |
| `secondary-fixed` ◐ | `#ccebc2` (pale green) | Gradient end-stop |
| `tertiary-container` ◐ | `#f8cec2` (peach coral) | Card tint |
| surface ◐ | `#fefcf4` (чуть жёлтее) | Onboarding background |
| headline font ◐ | **Newsreader serif italic** | Onboarding hero "Why now?" в serif |
| label font ◐ | Public Sans | Onboarding UPPERCASE labels |
| radius DEFAULT ◐ | `0.25rem` (почти square!) ⚠ | **СИЛЬНО конфликтует с 1rem** |

**Градиент:**
```css
background: linear-gradient(to bottom, #fefcf4 0%, #f8cec2 50%, #ccebc2 100%);
```
**CTA pill gradient:**
```css
background: linear-gradient(to right, #FF7E5F, #FEB47B);
```

⚠ **РЕШЕНИЕ по Theme E:** Mint-green accent и serif Newsreader оставляем — они делают onboarding **мягче и менее "product"**, что правильно для первого контакта. НО radius 0.25rem отвергаем (ломает язык остальных 11 экранов) → **принудительно перевести cards в radius 1rem / 1.25rem (pills)**. Это единственное принудительное исправление.

---

## 5. Typography

### 5.1 Font families

| Token | Font | Weight range | Роль |
|---|---|---|---|
| `font-headline` ✓ | **Plus Jakarta Sans** | 200, 300, 400, 500, 600, 700, 800 | Hero display, section headers, streak numbers |
| `font-body` ✓ | **Manrope** | 200, 300, 400, 500, 600, 700 | Body paragraphs, descriptions |
| `font-label` ✓ | **Manrope** | 400, 500, 600 | UPPERCASE TRACKED micro-labels |
| `font-serif` ◐ | **Playfair Display** | 400, 500, 700 (italic + regular) | Hero word highlights ("Stress Eater", "Light") — only когда hero на glass card with warm tint |
| `font-serif-onboarding` ◐ | **Newsreader** | 300, 400, 700 (italic + regular) | **Только onboarding flow** для мягкости |

**Fallback:** `sans-serif` универсально, `serif` для serif-variants.

**⚠ Решение по serif**: двух serif-шрифтов (Playfair + Newsreader) слишком много. **Оставляем один — Playfair Display** как единственный serif в системе, используем его и на onboarding, и на hero highlights. Newsreader отвергаем (экран 4 делал выбор исходя из более мягкого starting feel, но Playfair достигает того же эффекта при правильном weight/italic).

### 5.2 Type scale

Stitch использует Tailwind text utility классы. Вот наблюдаемая иерархия:

| Level | Class / size | Observed weight | Usage |
|---|---|---|---|
| `display-xl` | 160px (экран 12 streak "8") | thin italic | Hero number на Home |
| `display-lg` | 120px (экран 11 ghost "17:45") | extrabold | Ghost translucent number |
| `display-md` | 80px (экран 8 "Day 14") | extrabold | Section hero |
| `h1` | 60–96px / `text-6xl` / `text-7xl` / `text-8xl` | thin italic / extrabold | Screen hero ("Light.", "Breathe with me", "Stress Eater") |
| `h2` | 28–48px / `text-2xl` / `text-3xl` / `text-4xl` | bold / light / italic | Card headlines |
| `h3` | 20–24px / `text-xl` / `text-2xl` | light / medium | Card sub-headlines |
| `body-lg` | 18–20px / `text-lg` / `text-xl` | light | Hero subtitle, intro paragraphs |
| `body-md` | 14–16px / `text-sm` / `text-base` | light / thin | Body paragraphs |
| `body-sm` | 12–13px / `text-xs` / `text-[13px]` | light | Secondary text |
| `label` | 10–12px / `text-[10px]` / `text-[11px]` / `text-xs` | 500, 600 | **UPPERCASE TRACKED letter-spacing 0.15–0.4em** |
| `label-micro` | 9–10px / `text-[9px]` / `text-[10px]` | 200, 300 | Nav labels, chart axis |

### 5.3 Letter-spacing / tracking

| Token | Value | Usage |
|---|---|---|
| `tracking-tighter` | `-0.025em` | Hero numbers and large display |
| `tracking-tight` | `-0.015em` | h1/h2 |
| `tracking-normal` | `0` | body |
| `tracking-wide` | `0.025em` | body emphasis |
| `tracking-widest` | `0.1em` | small labels |
| `tracking-[0.15em]` | `0.15em` | UPPERCASE labels — onboarding steps |
| `tracking-[0.2em]` | `0.2em` | UPPERCASE labels — "NEXT JOURNEY", "YOUR CRAVING PROFILE" |
| `tracking-[0.3em]` | `0.3em` | UPPERCASE whisper header (logo wordmark "THE EXHALE") |
| `tracking-[0.4em]` | `0.4em` | UPPERCASE deep-whisper (chart corner labels) |

### 5.4 Italic roles

Italic используется **смысловой окраской**, не декоративно:
- Hero word highlight inside non-italic sentence: "Today is *Light*", "*the hardest part* is behind you"
- Quotes / voice: "*Less sleep = more cravings. Tuesday proved it.*"
- Whisper status: "*fading*", "*peaking*", "*almost gone*"

---

## 6. Border Radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | `0.25rem` (4px) | ✗ — не используем, экран 4 отвергнут |
| `rounded-md` | `0.5rem` (8px) | ✗ — не используем |
| `rounded` ✓ | `1rem` (16px) | Default — всё, что явно не pill |
| `rounded-lg` ✓ | `2rem` (32px) | Cards |
| `rounded-xl` ✓ | `3rem` (48px) | Large container, bento grid large card |
| `rounded-full` ✓ | `9999px` | Pills, buttons, avatars, dots, breathing circle |

⚠ Есть **drift в экране 2** (`1.25rem` / `2.25rem` / `3.25rem`). Признаём — **это микро-вариация для bento-grid layouts** (чуть более "soft" выглядит из-за перехода между множеством карточек). Фиксируем как:
- `rounded-soft-sm` ◐ = `1.25rem`
- `rounded-soft-md` ◐ = `2.25rem`
- `rounded-soft-lg` ◐ = `3.25rem`

Использовать **только** в screens с 4+ карточками в bento-grid (Forecast A, C, E, Living Dashboard). Everywhere else — canonical.

---

## 7. Opacity Scale

Stitch использует opacity на ВСЁМ — на тексте, фонах, glass layers, тенях. Полная шкала:

| Token | Tailwind | Usage пример |
|---|---|---|
| `opacity-5` | `/5` | Ambient orb behind glass (primary/5) |
| `opacity-10` | `/10` | Glass low (bg-white/10), inactive background |
| `opacity-20` | `/20` | Glass medium low, token glow softer |
| `opacity-30` | `/30` | Border/divider medium, inactive ring |
| `opacity-40` | `/40` | **Default glass opacity** (bg-white/40 glass-card) |
| `opacity-50` | `/50` | Label whisper |
| `opacity-60` | `/60` | Glass card rest-state (bg-surface-container-lowest/60) |
| `opacity-70` | `/70` | Body text secondary |
| `opacity-80` | `/80` | Heavy glass (bg-white/80) |
| `opacity-90` | `/90` | Near-solid |

**Правило:** никогда не использовать промежуточные (opacity-15, opacity-45 и т.д.). Только из этой шкалы.

### 7.1 Opacity по роли
- **Glass card default:** white/40 + backdrop-blur-xl
- **Glass card rest:** white/60 OR surface-container-lowest/60
- **Glass card heavy:** white/80 OR surface-container-lowest/80
- **Ambient orb:** primary-container/10 или /20
- **Inactive dot:** primary/20 (или bg-outline-variant/30)
- **Whisper text:** opacity-40 (whispery labels), opacity-60 (quiet labels)
- **Body secondary text:** text-on-surface-variant (no opacity) OR opacity-70
- **Hero headline text shadow (glow):** drop-shadow with primary at /10 or /15

---

## 8. Blur Scale

### 8.1 Backdrop blur (для glass)

| Token | Value | Usage |
|---|---|---|
| `backdrop-blur` | `8px` | Minimal — badge chip on solid background |
| `backdrop-blur-[10px]` | `10px` | Onboarding selected card |
| `backdrop-blur-md` | `12px` | Check-in strip |
| `backdrop-blur-lg` | `16px` | Secondary card |
| `backdrop-blur-xl` ✓ | `24px` | **Default glass card** |
| `backdrop-blur-2xl` ✓ | `40px` | **Heavy glass (hero cards)** |
| `backdrop-blur-3xl` ✓ | `64px` | Deep glass (Dark Horizon card, large nav) |

**Правило:** `.glass-panel` base class = `backdrop-filter: blur(40px)` + `-webkit-backdrop-filter: blur(40px)`.

### 8.2 Image / background blur (orbs)

| Token | Value | Usage |
|---|---|---|
| `blur-[50px]` | 50px | Small ambient glow behind streak number |
| `blur-[60px]` | 60px | Small floating orb |
| `blur-[80px]` | 80px | Medium orb (breathing glow) |
| `blur-[100px]` ✓ | 100px | **Default atmospheric orb** |
| `blur-[120px]` | 120px | Large background orb |
| `blur-[140px]` | 140px | Screen-spanning atmosphere |

### 8.3 Filter blur (ethereal glow for nodes)

| Token | Value | Usage |
|---|---|---|
| `.ethereal-glow` | `filter: blur(12px); opacity: 0.6` | Dark Horizon inactive nodes |
| `.text-glow` | `text-shadow: 0 0 20px rgba(251,191,36,0.2)` | Misty Plum theme headline |

---

## 9. Gradients Library

**Это сердце дизайна.** Сложнее всего свести — здесь больше всего драйфа. Ниже — 9 типов, из которых 4 являются "theme atmospheric", 3 "component-level", 2 "text-fill".

### 9.1 Atmospheric background — **Default (Dawn)** ✓

**Использовать на:** Home / Forecast / Insights / SOS / Dashboard / Profile.

```css
background:
  radial-gradient(circle at 10% 10%, #ffaca0 0%, transparent 40%),
  radial-gradient(circle at 90% 40%, #efdbff 0%, transparent 40%),
  radial-gradient(circle at 50% 90%, #cfe0df 0%, transparent 50%),
  #fbf9f5;
```

**Семантика стопов:**
- Верхний-левый: `primary-container` (#ffaca0, peach-coral) — утро/warmth
- Верхний-правый: `secondary-fixed` (#efdbff, lavender) — day ambient
- Низ-центр: `tertiary-container` (#cfe0df, mint) — evening exhale
- Base: `surface` (#fbf9f5)

Это **narrative gradient** — warmer tones mean higher craving risk; cooler tones mean calm.

### 9.2 Atmospheric background — **Misty Plum** ◐

```css
background: linear-gradient(180deg,
  #fff9f5 0%,
  #fdf2e9 25%,
  #fae8e0 50%,
  #fce7f3 75%,
  #f3e8ff 100%);
```

### 9.3 Atmospheric background — **Morning Sky** ◐

```css
background: linear-gradient(to bottom,
  #dbeafe 0%,
  #e0e7ff 25%,
  #ffedd5 70%,
  #fecaca 100%);
```

### 9.4 Atmospheric background — **Dark Horizon** ◐

```css
background: linear-gradient(180deg,
  #1a1c2c 0%,
  #6a577f 40%,
  #a53c30 85%,
  #fbf9f5 100%);
```

Fixed attachment. Full viewport height.

### 9.5 Atmospheric background — **Sunrise Greens (Onboarding)** ◐

```css
background: linear-gradient(to bottom,
  #fefcf4 0%,
  #f8cec2 50%,
  #ccebc2 100%);
background-attachment: fixed;
```

### 9.6 Living Dashboard variant (2-radial) ◐

```css
background:
  radial-gradient(at 0% 0%, #ffad91 0%, transparent 40%),
  radial-gradient(at 100% 0%, #ebdcff 0%, transparent 40%),
  radial-gradient(at 50% 50%, #fbf9f5 0%, #fbf9f5 100%);
background-attachment: fixed;
```

Отличается от 9.1 — использует `#ffad91` вместо `#ffaca0` и `#ebdcff` вместо `#efdbff`. **Рекомендация:** унифицировать с 9.1 при миграции в RN (разница визуально неощутима).

### 9.7 Card body soft — **Craving Profile 5-stop** ◐

```css
background: linear-gradient(180deg,
  #fbf9f5 0%,
  #fdf0e9 20%,
  #ffdcd5 45%,
  #ffe1d9 65%,
  #eef7f6 100%);
```

Использовать для **long editorial pages** (Result screen, Craving Profile, long content lessons). Плавный переход от cream вниз к mint.

### 9.8 Card internal — **Purple-to-Rust bento card**

Applied inside a card (`atmospheric-gradient` class в экране 7):
```css
background: linear-gradient(135deg, #6a577f 0%, #a53c30 100%);
```

Use for **insight callout cards** with white text (Sleep & Sugar Insight pattern). Always pair with `text-on-primary` (#fff7f6).

### 9.9 Pill CTA gradient (horizontal)

Variant 1 — **primary to deep-coral** (saturated, Craving Profile):
```css
background: linear-gradient(90deg, #a53c30 0%, #c75b48 100%);
```
Variant 2 — **primary to dim** (Daily Weather "See plan" button):
```css
background: linear-gradient(to right, #a53c30, #953025);
```
Variant 3 — **sunset orange** (Onboarding CTA):
```css
background: linear-gradient(to right, #FF7E5F, #FEB47B);
```

**⚠ Решение:** канонизируем Variant 1 (`#a53c30 → #c75b48`) как **primary CTA**. Variant 3 допустим только на Onboarding. Variant 2 — как compact inline button внутри карточки.

### 9.10 Text gradient fills

**Hero italic text fill** ("Stress Eater"):
```css
background: linear-gradient(90deg, #a53c30 0%, #d87158 100%);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```

**Streak number fill** (Daily Weather "8"):
```css
background: linear-gradient(to bottom, #a53c30 0%, #5e4b72 100%);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```
(Primary vertically → secondary-dim — необычно и красиво. Использовать только для Home streak hero.)

**Forecast "Light." Daily Weather:**
```css
background: linear-gradient(to bottom-right, #a53c30 0%, #ff9788 100%);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```

### 9.11 FAB SOS gradient (radial button)

Daily Weather SOS button:
```css
background: linear-gradient(to bottom-right, #a53c30 0%, #ac3434 100%);
```
(primary to error — subtle intensification)

### 9.12 SOS Breathe internal stack (SOS screen)

**Three layers superimposed:**
```css
/* Layer 1 — base screen vertical gradient */
background: linear-gradient(to bottom,
  rgba(165,60,48,0.1) 0%,
  rgba(149,48,37,0.2) 50%,
  rgba(165,60,48,0.3) 100%);

/* Layer 2 — giant soft circle behind */
.big-soft-halo {
  background: rgba(165,60,48,0.05);
  filter: blur(120px);
  width: 150vw; height: 150vw;
  border-radius: 9999px;
}

/* Layer 3 — ambient orbs */
.orb-a { background: rgba(239,219,255,0.2); filter: blur(100px); } /* secondary-container */
.orb-b { background: rgba(255,172,160,0.1); filter: blur(80px); } /* primary-container */
```

---

## 10. Shadows / Glows Library

Полный каталог. Классифицировано по роли, чтобы не путаться.

### 10.1 Glow shadows (halo, emission) — характер: `0 0 {N}px {color}`

| Token | CSS | Usage |
|---|---|---|
| `glow-dot-sm` | `0 0 8px rgba(165,60,48,0.4)` | Active streak dot |
| `glow-dot-md` | `0 0 15px rgba(255,172,160,0.8)` | Symptom status dot (peaking) |
| `glow-dot-lavender` | `0 0 15px rgba(239,219,255,0.6)` | Symptom dot (fatigue) |
| `glow-dot-mint` | `0 0 15px rgba(207,224,223,0.5)` | Symptom dot (headache fading) |
| `glow-token` | `0 0 20px rgba(165,60,48,0.2)` | Selected mood circle |
| `glow-pain` | `0 0 30px 10px rgba(165,60,48,0.4)` | Chart intersection pain-point |
| `glow-ring` | `0 0 20px rgba(255,255,255,0.8)` | Dark Horizon current-node crisp dot |
| `glow-breath` | `0 0 80px rgba(165,60,48,0.3)` | SOS breathing circle ambient halo |

### 10.2 Soft drop shadows (elevation) — characterized by: `0 {Y}px {B}px rgba(X)`

| Token | CSS | Usage |
|---|---|---|
| `shadow-card-whisper` | `0 8px 40px rgba(0,0,0,0.02)` | Default glass card |
| `shadow-card-warm` | `0 8px 40px rgba(165,60,48,0.03)` | Glass card on coral gradient |
| `shadow-card-warmer` | `0 16px 40px rgba(165,60,48,0.06)` | Peak-hour card |
| `shadow-avatar` | `0 4px 12px rgba(165,60,48,0.15)` | Avatar |
| `shadow-button-sm` | `0 4px 20px rgba(165,60,48,0.2)` | Inline "See plan" pill |
| `shadow-button-md` | `0 12px 40px rgba(165,60,48,0.4)` | FAB SOS button |
| `shadow-pill-lg` | `0 20px 40px -10px rgba(165,60,48,0.4)` | Primary CTA (Begin program) |
| `shadow-pill-xl` | `0 32px 64px -12px rgba(173,65,39,0.1)` | Onboarding CTA (extra lift) |
| `shadow-dashboard-lift` | `0 40px 40px -10px rgba(0,0,0,0.06)` | Floating bottom nav pill |
| `shadow-nav-top` | `0 -4px 40px rgba(0,0,0,0.04)` | Bottom nav rising from bottom |
| `shadow-hero-text` | `0 8px 32px rgba(165,60,48,0.1)` | Streak hero text drop-shadow |

### 10.3 Embossed (inset + outset combination)

Used for Craving Forecast A pill-chips (Yesterday's Sugar: None / A little / Some / A lot):
```css
box-shadow:
  inset 1px 1px 2px rgba(255,255,255,0.8),
  inset -1px -1px 2px rgba(0,0,0,0.05),
  0 2px 4px rgba(0,0,0,0.05);
```

### 10.4 Text shadows

- **Hero number glow:** `drop-shadow(0 8px 32px rgba(165,60,48,0.1))` — Daily Weather streak
- **Dark Horizon headline:** `drop-shadow-2xl` (Tailwind: `0 25px 25px rgba(0,0,0,0.15)`) — "Day 14" over dark gradient
- **Subtle drop-shadow (avatar, avatar, pill):** Tailwind `shadow-sm`, `shadow-md`, `shadow-lg` defaults OK

---

## 11. Components

### 11.1 Glass Card

**Base:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 1rem; /* or 2rem / 3rem */
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.02);
}
```

**Variants:**
- `.glass-card-heavy` — bg white/60, blur 40px, shadow-card-warm
- `.glass-card-tinted-peach` — bg `primary-container/40` (saturated peach tint for "peak hour" mood)
- `.glass-card-tinted-mint` — bg `tertiary-container/30` (evening/exhale)
- `.glass-card-tinted-lavender` — bg `secondary-fixed/30`
- `.glass-card-dark` — bg white/10, blur 64px (Dark Horizon only)

**Tinted card pattern:** card picks up color of gradient beneath via saturated tint + higher opacity. Morning = peach-tint, afternoon-peak = coral-saturated, evening = mint-tint.

### 11.2 Primary Pill CTA

**Base:**
```css
.pill-cta {
  background: linear-gradient(90deg, #a53c30 0%, #c75b48 100%);
  color: #fff7f6;
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: 12px; /* 11-15 depending on context */
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 20px 40px;
  border-radius: 9999px;
  box-shadow: 0 20px 40px -10px rgba(165, 60, 48, 0.4);
  transition: transform 0.3s, filter 0.3s;
}
.pill-cta:active { transform: scale(0.98); }
.pill-cta:hover { filter: brightness(1.1); }
```

**Variants:**
- `.pill-cta-inline` — smaller padding, `shadow-button-sm`, for "See plan →" внутри карточки
- `.pill-cta-dark-text` — `bg-on-surface` (`#31332f`), white text (Craving Forecast A "Done")
- `.pill-cta-light-on-dark` — `bg-white text-rose-900` (Dark Horizon "Begin Session")

### 11.3 SOS FAB (Floating Action Button)

**Variant A — Round circle gradient** (default, Daily Weather):
```css
.sos-fab {
  position: fixed;
  bottom: 128px; right: 24px;
  width: 64px; height: 64px;
  border-radius: 9999px;
  background: linear-gradient(to bottom-right, #a53c30, #ac3434);
  color: #fff7f6;
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.1em;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 12px 40px rgba(165, 60, 48, 0.4);
  z-index: 40;
}
```

**Variant B — Inside bottom nav** (Sleep Insight): SOS tab pulled -mt-12 (elevated), circle 56×56, `bg-primary` solid, `emergency_home` filled icon, label beneath.

**Variant C — Central breathing circle** (SOS Breathe screen): 192×192, solid primary, breathing-glow shadow, pulsing rings (320×320 and 256×256) with primary/10 and primary-fixed-dim/30.

**Variant D — Square red** (Living Dashboard): bg-error sharp-corners (rounded-none), tracking-widest — avoid, **replace with Variant A**.

### 11.4 Token Dot (streak, filled/unfilled)

```css
.token-dot {
  width: 6px; height: 6px;
  border-radius: 9999px;
  background: #a53c30; /* filled */
  box-shadow: 0 0 8px rgba(165, 60, 48, 0.4);
}
.token-dot--empty {
  background: rgba(178, 178, 173, 0.3); /* outline-variant/30 */
  box-shadow: none;
}
```

### 11.5 Embossed Button (pill-chip)

```css
.chip-embossed {
  background: rgba(255,255,255,0.4);
  border: 1px solid rgba(255,255,255,0.6);
  padding: 12px 24px;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 14px;
  box-shadow:
    inset 1px 1px 2px rgba(255,255,255,0.8),
    inset -1px -1px 2px rgba(0,0,0,0.05),
    0 2px 4px rgba(0,0,0,0.05);
}
.chip-embossed--selected {
  background: rgba(255,255,255,0.8);
  border: 1px solid rgba(165, 60, 48, 0.2); /* primary/20 */
  font-weight: 600;
  color: #a53c30; /* primary */
}
```

### 11.6 Bottom Navigation

**Canonical variant (floating pill):**
```css
.nav-pill {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(40px);
  border-radius: 9999px;
  padding: 8px 16px;
  display: flex; gap: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.04);
  border: 1px solid rgba(255,255,255,0.2);
}
.nav-pill__item {
  width: 48px; height: 48px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 9999px;
  color: rgba(136, 19, 55, 0.4); /* rose-900/40 */
}
.nav-pill__item--active {
  background: rgba(255,255,255,0.2);
  color: rgba(136, 19, 55, 1); /* rose-900 */
}
```

**Variant — full bottom rounded bar** (Daily Weather):
```css
.nav-bar-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(40px);
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 16px 32px 32px;
  box-shadow: 0 -4px 40px rgba(0,0,0,0.04);
  display: flex; justify-content: space-around;
}
```

**⚠ Решение:** **canonical = floating pill** (более atmospheric, не ломает gradient narrative). Full bar использовать только если ScrollView требует always-visible (Home).

### 11.7 Breathing Circle (SOS centerpiece)

Three nested rings:
- Outer ring: 320×320, `bg-primary/10`, scale-110, opacity-40
- Middle ring: 256×256, `bg-primary-fixed-dim`, opacity-30
- Main button: 192×192, `bg-primary`, content: air icon + "INHALE" label, `box-shadow: 0 0 80px rgba(165,60,48,0.3)` (breathing-glow)

Animation in RN: Reanimated — scale 1 → 1.08 → 1 over 8s loop (inhale 4s / exhale 4s).

### 11.8 Ghost Typography Number

```tsx
<View style={{ position: 'absolute', right: -16, bottom: -40 }}>
  <Text style={{
    fontSize: 140,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: 'rgba(255, 172, 160, 0.2)', // primary-fixed/20
    letterSpacing: -5,
    userSelect: 'none',
  }}>3:12</Text>
</View>
```

Applied inside peak-hour card — translucent giant number filling negative space. Semantic: "This hour contains your peak."

### 11.9 Timeline Line (horizontal)

```css
.timeline-line {
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(30, 41, 59, 0.1) 20%,
    rgba(30, 41, 59, 0.1) 80%,
    transparent 100%);
}
```
Dots along the line: 4–6px circles, positioned absolute. Current dot is larger (10–16px), `bg-white shadow-ring` in dark mode, or `bg-primary glow-pain` in light mode.

---

## 12. Theme-to-Screen Mapping

| Screen (from SCREEN-MAP) | Recommended theme | Why |
|---|---|---|
| 1.1 Welcome | Sunrise Greens (E) | Soft, beckoning, decisive action |
| 1.2–1.12 Quiz | Sunrise Greens (E) | Coherent onboarding atmosphere |
| 1.13 Loading | Dawn (A) | Transition into product |
| 1.14 Result | Craving Profile 5-stop (variant of A) | Editorial reveal |
| 1.15 Paywall | Dawn (A) + warm amplification | Conversion heat |
| 1.16 Auth | Dawn (A) minimal | Quiet handshake |
| 1.17 Push Permission | Dawn (A) minimal | Soft ask |
| 2.1 Home | **Dawn (A)** | Canonical daily weather |
| 2.2.1 Curriculum Overview | Dawn (A) | Chapter browser |
| 2.2.2 Lesson | Dawn (A) or Misty Plum (B) | Editorial reading |
| 2.3.1 Progress Overview | **Dark Horizon (C)** | Roadmap depth — the single dark screen |
| 2.3.2 Weekly Summary | Dawn (A) | Reflection, same language |
| 2.3.3 Milestones | Dawn (A) | Soft celebration |
| 2.4.x Profile/Settings | Dawn (A) minimal | Utility, quiet |
| 3.1 SOS AI Chat | Dawn (A) + warm condensation | Held conversation |
| 3.1b SOS Breathe (centerpiece) | Dawn (A) + breathing stack §9.12 | Grounding |
| 3.2 Check-in | Evening Dawn (A base, cooler) | Day's closing |
| 3.3 Craving Logger | Dawn (A) minimal | Quick note |
| 3.4 Share Card | Dawn (A) full narrative | Magazine cover |
| 4.x Modals | parent screen's theme + fog | Inherit |
| 5.x System | Dawn (A) minimal | Consistency |

---

## 13. Rejected / Accidental Variants

**Явные отказы с причинами** — чтобы следующая сессия Stitch не создала ту же дрifted-версию ещё раз.

| Value | Screen where found | Why rejected |
|---|---|---|
| `#a53d12` (primary) | 03 Living Dashboard | Orange drift — на 1 пункт оранжевее canonical. Accidental. |
| `#ad4127` (primary) | 04 Onboarding | Darker drift. Accidental — likely auto-tune by Stitch. |
| `#fefcf4` (surface) | 04 Onboarding | Yellow drift — canonical `#fbf9f5` чуть холоднее. |
| `#373930` (on-surface) | 04 Onboarding | Darker body text drift. |
| `#6d4ea3` (secondary) | 03 Living Dashboard | Too bright purple. Canonical `#6a577f` muted. |
| `#506b4a` (secondary) | 04 Onboarding | Green accent valid as theme tertiary, not secondary. |
| `#ffad91` (primary-container) | 03 Living Dashboard | Orange-coral drift from canonical `#ffaca0`. |
| `DEFAULT: 0.25rem` (radius) | 04 Onboarding | Breaks entire soft-language. |
| `DEFAULT: 1.25rem` (radius) | 02 Forecast A | Minor drift — preserved as `rounded-soft-*` for bento grids only. |
| `Newsreader` (font) | 04 Onboarding | Redundant with Playfair Display. Use Playfair only. |
| `Public Sans` (font) | 04 Onboarding | Redundant with Manrope. |
| `rounded-none` SOS button | 03 Living Dashboard | Sharp corners break the language. Replace with `rounded-full`. |
| `#b8e6e2` tertiary-container | 03 Living Dashboard | Brighter mint drift. |
| `#ebdcff` secondary-fixed-dim | 03 Living Dashboard | Bright-lavender drift. |

---

## 14. Implementation Notes — React Native / Expo

### 14.1 File location

Создать `/constants/tokens.ts` в Expo приложении. Не использовать Tailwind для RN (Nativewind opcja, но canonical RN — StyleSheet).

```ts
// constants/tokens.ts

export const colors = {
  // primary
  primary: '#a53c30',
  primaryDim: '#953025',
  primaryContainer: '#ffaca0',
  primaryFixed: '#ffaca0',
  primaryFixedDim: '#ff9788',
  onPrimary: '#fff7f6',
  onPrimaryContainer: '#761911',
  onPrimaryFixed: '#570202',
  onPrimaryFixedVariant: '#822219',
  inversePrimary: '#fd7d6c',
  // surface
  surface: '#fbf9f5',
  background: '#fbf9f5',
  surfaceBright: '#fbf9f5',
  surfaceDim: '#dadad4',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f5f3ef',
  surfaceContainer: '#efeee9',
  surfaceContainerHigh: '#e9e8e3',
  surfaceContainerHighest: '#e3e3dd',
  surfaceVariant: '#e3e3dd',
  inverseSurface: '#0e0e0d',
  inverseOnSurface: '#9e9d9a',
  // on-surface
  onSurface: '#31332f',
  onSurfaceVariant: '#5e605b',
  onBackground: '#31332f',
  outline: '#7a7b76',
  outlineVariant: '#b2b2ad',
  // secondary
  secondary: '#6a577f',
  secondaryDim: '#5e4b72',
  secondaryContainer: '#efdbff',
  secondaryFixed: '#efdbff',
  secondaryFixedDim: '#e3cbfa',
  onSecondary: '#fff6ff',
  onSecondaryContainer: '#5c4a71',
  onSecondaryFixed: '#49385d',
  onSecondaryFixedVariant: '#66547b',
  // tertiary
  tertiary: '#526262',
  tertiaryDim: '#465656',
  tertiaryContainer: '#cfe0df',
  tertiaryFixed: '#cfe0df',
  tertiaryFixedDim: '#c1d2d1',
  onTertiary: '#eafdfc',
  onTertiaryContainer: '#415151',
  onTertiaryFixed: '#2f3f3e',
  onTertiaryFixedVariant: '#4b5b5b',
  // error
  error: '#ac3434',
  errorDim: '#70030f',
  errorContainer: '#f56965',
  onError: '#fff7f6',
  onErrorContainer: '#65000b',
  // theme variants (only in specific screens)
  mistyPlumTextWarm: '#7c2d12',
  mistyPlumTextSoft: '#9d8b85',
  mistyPlumAmberMist: '#fdf2e9',
  mistyPlumRoseMist: '#fce7f3',
  mistyPlumPlumSoft: '#e9d5ff',
  morningSkyZenithBlue: '#94a3b8',
  morningSkySoftLavender: '#e0e7ff',
  morningSkyWarmPeach: '#ffedd5',
  morningSkyHorizonRose: '#fecaca',
  sunrisePaleGreen: '#ccebc2',
  sunriseCoralCard: '#f8cec2',
  darkHorizonDeepNavy: '#1a1c2c',
} as const;

export const radius = {
  none: 0,
  sm: 16,     // 1rem
  md: 32,     // 2rem
  lg: 48,     // 3rem
  softSm: 20, // 1.25rem — bento grids only
  softMd: 36, // 2.25rem
  softLg: 52, // 3.25rem
  full: 9999,
} as const;

export const fonts = {
  headline: 'PlusJakartaSans',
  body: 'Manrope',
  label: 'Manrope',
  serif: 'PlayfairDisplay',
} as const;

export const fontWeights = {
  thin: '200',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const opacity = {
  o5: 0.05, o10: 0.1, o20: 0.2, o30: 0.3, o40: 0.4,
  o50: 0.5, o60: 0.6, o70: 0.7, o80: 0.8, o90: 0.9,
} as const;

export const blur = {
  sm: 12, md: 16, lg: 24, xl: 40, xl2: 64,
  orbSm: 60, orbMd: 80, orbLg: 100, orbXl: 120, orbXxl: 140,
} as const;

export const shadows = {
  glowDotSm:   { shadowColor: '#a53c30', shadowOpacity: 0.4, shadowRadius: 8,  shadowOffset: { width: 0, height: 0 } },
  glowDotMd:   { shadowColor: '#ffaca0', shadowOpacity: 0.8, shadowRadius: 15, shadowOffset: { width: 0, height: 0 } },
  glowToken:   { shadowColor: '#a53c30', shadowOpacity: 0.2, shadowRadius: 20, shadowOffset: { width: 0, height: 0 } },
  glowPain:    { shadowColor: '#a53c30', shadowOpacity: 0.4, shadowRadius: 30, shadowOffset: { width: 0, height: 0 } },
  glowBreath:  { shadowColor: '#a53c30', shadowOpacity: 0.3, shadowRadius: 80, shadowOffset: { width: 0, height: 0 } },
  cardWhisper: { shadowColor: '#000000', shadowOpacity: 0.02, shadowRadius: 40, shadowOffset: { width: 0, height: 8 } },
  cardWarm:    { shadowColor: '#a53c30', shadowOpacity: 0.03, shadowRadius: 40, shadowOffset: { width: 0, height: 8 } },
  buttonSm:    { shadowColor: '#a53c30', shadowOpacity: 0.2,  shadowRadius: 20, shadowOffset: { width: 0, height: 4 } },
  buttonMd:    { shadowColor: '#a53c30', shadowOpacity: 0.4,  shadowRadius: 40, shadowOffset: { width: 0, height: 12 } },
  pillLg:      { shadowColor: '#a53c30', shadowOpacity: 0.4,  shadowRadius: 40, shadowOffset: { width: 0, height: 20 } },
  navTop:      { shadowColor: '#000000', shadowOpacity: 0.04, shadowRadius: 40, shadowOffset: { width: 0, height: -4 } },
} as const;

// Gradients — use as `colors` prop in expo-linear-gradient
export const gradients = {
  atmosphericDawn: {
    // Реализуется тремя LinearGradient слоями поверх surface
    // (в RN нет multi-radial, имитируем через absolute layered RadialGradient или 3 LG)
    primaryTint: { colors: ['#ffaca0', 'transparent'], start: { x: 0.1, y: 0.1 }, end: { x: 0.5, y: 0.5 } },
    secondaryTint: { colors: ['#efdbff', 'transparent'], start: { x: 0.9, y: 0.4 }, end: { x: 0.5, y: 0.6 } },
    tertiaryTint: { colors: ['#cfe0df', 'transparent'], start: { x: 0.5, y: 0.9 }, end: { x: 0.5, y: 0.4 } },
    base: '#fbf9f5',
  },
  mistyPlum: { colors: ['#fff9f5', '#fdf2e9', '#fae8e0', '#fce7f3', '#f3e8ff'], locations: [0, 0.25, 0.5, 0.75, 1] },
  morningSky: { colors: ['#dbeafe', '#e0e7ff', '#ffedd5', '#fecaca'], locations: [0, 0.25, 0.7, 1] },
  darkHorizon: { colors: ['#1a1c2c', '#6a577f', '#a53c30', '#fbf9f5'], locations: [0, 0.4, 0.85, 1] },
  sunriseGreens: { colors: ['#fefcf4', '#f8cec2', '#ccebc2'], locations: [0, 0.5, 1] },
  cravingProfile: { colors: ['#fbf9f5', '#fdf0e9', '#ffdcd5', '#ffe1d9', '#eef7f6'], locations: [0, 0.2, 0.45, 0.65, 1] },
  insightCard: { colors: ['#6a577f', '#a53c30'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }, // 135deg
  pillCta: { colors: ['#a53c30', '#c75b48'], start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } }, // 90deg
  fab: { colors: ['#a53c30', '#ac3434'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  heroTextHorizontal: { colors: ['#a53c30', '#d87158'] }, // text-fill (use MaskedView in RN)
  heroTextVertical: { colors: ['#a53c30', '#5e4b72'] },
  onboardingCta: { colors: ['#FF7E5F', '#FEB47B'] },
} as const;
```

### 14.2 Atmospheric gradient implementation в RN

Multi-radial gradients в React Native — сложно. Есть два пути:

**Option A (рекомендуется): `expo-linear-gradient` + абсолютные слои**

```tsx
<View style={{ flex: 1, backgroundColor: colors.surface }}>
  <LinearGradient
    colors={['#ffaca0', 'transparent']}
    start={{ x: 0.1, y: 0.1 }}
    end={{ x: 0.6, y: 0.6 }}
    style={StyleSheet.absoluteFill}
  />
  <LinearGradient
    colors={['#efdbff', 'transparent']}
    start={{ x: 0.9, y: 0.4 }}
    end={{ x: 0.5, y: 0.7 }}
    style={StyleSheet.absoluteFill}
  />
  <LinearGradient
    colors={['#cfe0df', 'transparent']}
    start={{ x: 0.5, y: 0.9 }}
    end={{ x: 0.5, y: 0.4 }}
    style={StyleSheet.absoluteFill}
  />
  {children}
</View>
```

**Option B (точнее): `react-native-svg` с RadialGradient**

```tsx
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

// Точно повторяет CSS radial-gradient — три overlapping SVG circles
```

### 14.3 Glass effect в RN

**iOS:** `expo-blur` — `<BlurView intensity={40} tint="light">` работает идеально для glass cards.
**Android:** `expo-blur` на Android не так гладко — fallback на semi-transparent bg `rgba(255,255,255,0.6)` без blur.

```tsx
// components/GlassCard.tsx
import { BlurView } from 'expo-blur';
import { Platform, View, StyleSheet } from 'react-native';

export function GlassCard({ children, tint = 'default', style }) {
  const bgTint = {
    default: 'rgba(255,255,255,0.4)',
    peach: 'rgba(255,172,160,0.4)',
    mint: 'rgba(207,224,223,0.3)',
    lavender: 'rgba(239,219,255,0.3)',
  }[tint];

  if (Platform.OS === 'ios') {
    return (
      <BlurView intensity={40} tint="light" style={[styles.card, style]}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: bgTint }]} />
        {children}
      </BlurView>
    );
  }
  return (
    <View style={[styles.card, { backgroundColor: bgTint.replace('0.4', '0.6') }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    overflow: 'hidden',
    ...shadows.cardWhisper,
  },
});
```

### 14.4 Font loading (Expo)

В `app/_layout.tsx`:

```tsx
import { useFonts } from 'expo-font';
import {
  PlusJakartaSans_300Light, PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Manrope_300Light, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold
} from '@expo-google-fonts/manrope';
import {
  PlayfairDisplay_400Regular, PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_700Bold_Italic
} from '@expo-google-fonts/playfair-display';

const [loaded] = useFonts({
  PlusJakartaSans_300Light, PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold,
  Manrope_300Light, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold,
  PlayfairDisplay_400Regular, PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_700Bold_Italic,
});
```

### 14.5 Text gradient fill (MaskedView)

RN не поддерживает `background-clip: text`. Используется `@react-native-masked-view/masked-view`:

```tsx
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

<MaskedView maskElement={<Text style={{ fontFamily: 'PlusJakartaSans_800ExtraBold', fontSize: 160 }}>8</Text>}>
  <LinearGradient
    colors={['#a53c30', '#5e4b72']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{ height: 160, width: 100 }}
  />
</MaskedView>
```

---

## 15. Migration / Next Steps

- [ ] Создать `/constants/tokens.ts` в Expo app (см. §14.1)
- [ ] Создать `/components/ui/GlassCard.tsx`, `/components/ui/PillCTA.tsx`, `/components/ui/SOSFab.tsx`, `/components/ui/BottomNav.tsx`, `/components/ui/TokenDot.tsx`, `/components/ui/AtmosphericGradient.tsx` (default Dawn)
- [ ] Создать `/components/ui/theme/` с `MistyPlum.tsx`, `DarkHorizon.tsx`, `MorningSky.tsx`, `SunriseGreens.tsx`
- [ ] Решить: **Sugar Quit или The Exhale** как in-app brand name (единственное открытое design-решение)
- [ ] Feedback loop: при генерации следующих экранов в Stitch — класть `DESIGN-TOKENS.md` в `design.md` Stitch-проекта (не целиком, а §0 DESIGN-MANIFEST из `PROMPTS-ALL-SCREENS.md` уже содержит короткую версию)
- [ ] Через неделю — перегенерить 2–3 drifted screen (03 Living Dashboard, 04 Onboarding) с каноничными параметрами в промпте — проверить что Stitch уберёт accidental drift

---

*35+ экранов ждут реализации. Эта дизайн-система снимает неопределённость со всех цветов, градиентов и компонентов. Остался один вопрос — brand name.*

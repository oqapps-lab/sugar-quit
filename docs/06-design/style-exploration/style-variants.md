# Sugar Quit — Style Exploration (Phase A)

**Дата:** 14 апреля 2026
**Ключевой экран:** Home Screen (2.1) — дневной хаб, куда пользователь возвращается каждый день.
**Primary persona:** Stress Sarah — 28-35, женщина, офисный работник в tech, 3pm-craver, Instagram-friendly, empathetic tone.

---

## Что на экране (для всех промптов одинаково)

Элементы Home Screen по [SCREEN-MAP.md](../../04-ux/SCREEN-MAP.md):

- **Hero:** Streak counter — большая цифра "Day 15 sugar-free"
- **Floating CTA:** SOS button (bottom-right, prominent) — для SOS-разговора в момент тяги
- **Card 1:** Daily check-in prompt — "How are you today?"
- **Card 2:** Today's lesson — "Day 15: Sugar and Dopamine"
- **Counter row:** Quick stats — 15 days, $127 saved, 450g sugar avoided, 23 cravings defeated
- **Motivational quote:** короткая цитата (1 строка)
- **Top bar:** имя пользователя, avatar, bell icon

---

## Как использовать этот файл

1. Копируй каждый промпт в Stitch (Gemini 2.5 Flash, Standard режим).
2. Генерируй все 12 вариантов.
3. Сохраняй результаты как PNG в папке `screenshots/` рядом с этим файлом.
4. Выбираем 1 (или гибрид 2х) → переходим к Phase B.

---

## Вариант 1: Warm Minimal (Empathetic Friend)

**Направление:** Minimal / Warm / Soft
**Палитра:** Cream `#FDF6F0`, Coral `#FF9B7A`, Sage `#A8C4A0`, Charcoal `#2D2D2D`
**Типографика:** Rounded sans-serif (SF Pro Rounded / Nunito feel), weights 400/600/700
**Настроение:** Calm, reassuring, "like a hug"
**Целевое ощущение:** Тёплая подруга, не строгий диетолог. Ощущение "я не одна, меня поддерживают".

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", an AI-powered coaching app that helps women quit sugar addiction. Target user: a stressed office worker, woman aged 32, who wants empathetic support, not medical judgment.
>
> Style: warm, minimal, soft. Like a modern wellness app designed for a supportive best friend, not a clinical health tracker.
>
> Color palette: cream background (#FDF6F0), warm coral accents (#FF9B7A), sage green secondary (#A8C4A0), deep charcoal text (#2D2D2D). Subtle cream-to-blush gradient on hero cards.
>
> Typography: rounded sans-serif (SF Pro Rounded vibe), generous letter spacing on hero numbers, body text 15px with comfortable line-height 1.5.
>
> Shapes: 24px border radius on cards, pill-shaped buttons, circular avatars, soft 8% opacity shadows.
>
> Screen elements, top to bottom:
> - Top bar: small circular avatar left, "Hi Sarah" greeting in charcoal, bell icon right
> - Hero streak: massive "15" in coral, "Days sugar-free" subtitle in sage, centered, subtle confetti flecks
> - Quick stats row of 3 pill cards: "$127 saved", "450g avoided", "23 cravings won"
> - Daily check-in card (cream): "How are you feeling today?" with 5 soft emoji options
> - Today's lesson card (blush tint): "Day 15: Sugar and Dopamine" + 2-line preview + "Start →" pill button
> - Floating SOS button bottom-right: coral circle, 64px, with gentle shadow and pulse hint, white "SOS" text
> - Quote at bottom in small charcoal italic: "Progress, not perfection."
>
> Mood keywords: empathetic, gentle, Instagram-friendly, wellness, feminine, contemporary.

---

## Вариант 2: Bold Gen Z Gradient

**Направление:** Bold / Playful / High-saturation
**Палитра:** Electric purple `#7B2FFF`, Hot pink `#FF4FBF`, Sunny yellow `#FFD93D`, Off-white `#FAFAFA`
**Типографика:** Chunky display sans-serif (Space Grotesk / Clash Display), heavy weights
**Настроение:** Energetic, viral, shareable
**Целевое ощущение:** "TikTok challenge, который я выиграла". Хочется скриншотить и делиться.

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a TikTok-era coaching app for quitting sugar. Target user: a 28-year-old Instagram-native woman doing a 90-day no-sugar challenge with her friends.
>
> Style: bold, high-saturation, maximum contrast, playful but not childish. Inspired by modern Gen Z fintech and wellness apps like Cash App, Clear, and Noom rebrand.
>
> Color palette: electric purple (#7B2FFF), hot pink (#FF4FBF), sunny yellow (#FFD93D) accents on off-white background (#FAFAFA). Purple-to-pink gradient on hero block.
>
> Typography: chunky display sans-serif like Space Grotesk or Clash Display. Hero numbers in ultra-bold 96pt. Body in medium weight. Generous negative space between massive type.
>
> Shapes: hard 8px border radius, thick 2px borders on cards, no shadows (flat), tall rectangular buttons.
>
> Screen elements, top to bottom:
> - Top bar: "SARAH" in all-caps heavy type left, small black bell right
> - Hero block with purple-pink gradient: "15" enormous white number, "DAYS" all-caps below, "SUGAR-FREE" subtitle in yellow
> - Stats strip of 3 side-by-side panels with thick purple borders: "$127 / saved", "450g / avoided", "23 / cravings won"
> - Check-in card, bright yellow background with black border: "HOW ARE YOU TODAY?" bold, 5 emoji pills
> - Lesson card, pink background: "DAY 15 / SUGAR AND DOPAMINE" with purple "START" button
> - SOS button: bottom-right, hot pink circle, 72px, thick black border, "SOS" in heavy black type
> - Quote: "Sugar doesn't run your life anymore." bold black, no italic.
>
> Mood keywords: loud, viral, shareable, confident, bold, Gen Z.

---

## Вариант 3: Glassmorphism iOS Premium

**Направление:** Glassmorphism / Premium / iOS-native
**Палитра:** Blurred blue-to-pink gradient `#A8C5F0` → `#F0B8D0`, frosted white cards with 40% opacity, vivid accent `#FF3B94`
**Типографика:** SF Pro Display, standard iOS weights
**Настроение:** Airy, expensive, iOS-first
**Целевое ощущение:** "Это из Apple App Store Featured секции". Премиум, свежо, современно.

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a premium iOS-first coaching app for quitting sugar. Target user: iPhone 15+ owner, woman 30, who pays for Headspace and Apple Fitness+.
>
> Style: glassmorphism, premium, Apple-native. Inspired by iOS 18, Apple Health, Nothing phone OS, and Revolut premium tier.
>
> Color palette: soft blurred gradient background (blue #A8C5F0 top to pink #F0B8D0 bottom), frosted white cards at 40% opacity with subtle rim light, one vivid pink accent (#FF3B94) for CTA.
>
> Typography: SF Pro Display, San Francisco system fonts. Hero in semi-bold 80pt, body in regular 15pt, labels in medium 13pt. Light tracking.
>
> Shapes: 20px border radius, frosted-glass card backgrounds with 12px backdrop blur, subtle inner highlights, 1px white stroke at 30% opacity.
>
> Screen elements, top to bottom:
> - Top bar: avatar with glass ring, "Sarah" regular weight, SF bell icon
> - Hero card, floating glass panel: "15" centered massive, "days sugar-free" small below, faint animated particles
> - Stats row: three floating glass pills with numbers, blur behind each
> - Check-in card: translucent glass, "How are you today?" plus emoji chips that glow on hover
> - Lesson card: translucent glass with gradient edge glow, "Day 15: Sugar and Dopamine" plus chevron
> - SOS button bottom-right: vivid pink (#FF3B94) solid circle, 60px, with soft outer glow
> - Small quote in white 70% opacity at bottom: "Small steps. Real change."
>
> Mood keywords: premium, airy, iOS-native, expensive, modern, Apple.

---

## Вариант 4: Dark Premium Minimal

**Направление:** Dark / Premium / Minimal
**Палитра:** Near-black `#0A0A0A`, soft white `#F5F5F5`, gold accent `#D4AF37`, muted grey `#606060`
**Типографика:** Modern geo-sans (Inter Tight), refined weights
**Настроение:** Serious, premium, focused
**Целевое ощущение:** "Это серьёзная инвестиция в моё здоровье, не игрушка".

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a premium coaching app for serious sugar reduction. Target user: professional woman 35, who takes her health seriously and dislikes overly cute wellness apps.
>
> Style: dark premium, minimal, editorial restraint. Inspired by Revolut Metal, Whoop, Oura, and Linear Dark mode.
>
> Color palette: near-black background (#0A0A0A), soft white text (#F5F5F5), single gold accent (#D4AF37) for streak and CTA, muted grey (#606060) for secondary text.
>
> Typography: Inter Tight or similar modern geometric sans. Hero in light 96pt with wide tracking, body in regular 15pt, labels in uppercase 11pt with 10% letter-spacing.
>
> Shapes: sharp 4px border radius, hairline 1px dividers in grey, no shadows, subtle outline on cards.
>
> Screen elements, top to bottom:
> - Top bar: small monogram avatar, "SARAH" small-caps, minimal icon
> - Hero block: "15" light-weight gold, "DAYS SUGAR-FREE" uppercase white small, thin gold underline accent
> - Stats row: three columns separated by hairline dividers, uppercase labels, numbers in white, subtle gold accent on latest
> - Check-in card: black card with gold 1px outline, "How are you today?" in white, 5 small subtle emoji options
> - Lesson card: dark card with hairline gold left border, "DAY 15" uppercase grey small, "Sugar and Dopamine" white serif-ish large, "READ" gold with arrow
> - SOS button bottom-right: solid gold circle, 60px, "SOS" in black weight-500, no glow
> - Footer quote in grey italic: "Discipline is the bridge between goals and accomplishment."
>
> Mood keywords: premium, serious, editorial, restrained, masculine-neutral, luxury.

---

## Вариант 5: Organic Earthy Serif

**Направление:** Organic / Warm / Editorial
**Палитра:** Terracotta `#C65D3B`, Sage `#87A878`, Oat `#EDE5D3`, Ink `#2A2A2A`
**Типографика:** Serif headings (Playfair / Tiempos) + humanist sans body (Söhne / Inter)
**Настроение:** Grounded, natural, thoughtful
**Целевое ощущение:** "Осознанное питание, не диета. Goop-level, но доступнее."

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a mindful wellness app for quitting sugar. Target user: woman 33, who buys from Erewhon, reads Substack, and practices yoga.
>
> Style: organic, editorial, warm-botanical. Inspired by Goop, Oak Essentials, Our Place, and modern editorial magazines like Kinfolk.
>
> Color palette: warm oat background (#EDE5D3), terracotta accents (#C65D3B), sage green secondary (#87A878), deep ink text (#2A2A2A). Subtle organic texture on cards.
>
> Typography: serif for display (Playfair, Tiempos, or Canela) — especially hero numbers and lesson titles. Humanist sans-serif for body and labels. Mixed weights, italic for accents.
>
> Shapes: 16px border radius, some asymmetric organic shapes (slight irregular edges on hero block), no harsh shadows, subtle paper grain texture.
>
> Screen elements, top to bottom:
> - Top bar: "Sarah" in serif italic medium, small bell outline
> - Hero block: serif "15" in terracotta, "days sugar-free" in ink italic below, small botanical line illustration
> - Stats row: three vertical cards separated by dotted lines, serif numbers, sans labels in small-caps
> - Check-in card: oat tint with sage border, "How are you feeling today?" in serif, 5 hand-drawn emotion icons
> - Lesson card: terracotta tint, "Day 15" sans small-caps, "Sugar and Dopamine" serif italic large, "Continue reading →" sans with arrow
> - SOS button bottom-right: terracotta circle, 64px, serif "SOS" in oat color
> - Quote at bottom: serif italic ink: "And so, I fell in love with slow mornings."
>
> Mood keywords: mindful, editorial, natural, botanical, Goop, warm.

---

## Вариант 6: Playful 3D Candy

**Направление:** Playful / 3D / Gamified
**Палитра:** Mint `#A8E6D5`, Blush `#FFB8C2`, Butter `#FFE9A0`, Plum `#5D3FD3`
**Типографика:** Rounded friendly sans (Nunito / DM Sans), all soft
**Настроение:** Fun, gamified, encouraging
**Целевое ощущение:** "Поощрение за прогресс, как Duolingo, но для взрослых".

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a gamified coaching app for quitting sugar that makes the journey feel rewarding. Target user: woman 28, who uses Duolingo daily and loves streaks.
>
> Style: playful, soft 3D, candy-coloured but for adults (not kiddy). Inspired by Duolingo, Finch, Stepset, and modern gamified wellness apps.
>
> Color palette: mint (#A8E6D5), blush pink (#FFB8C2), butter yellow (#FFE9A0), plum purple (#5D3FD3) on cream background. 3D cards have soft color fills.
>
> Typography: Nunito or DM Sans, rounded friendly sans-serif. Hero in extra-bold 80pt, body in semi-bold 15pt. All caps avoided. Letter spacing neutral.
>
> Shapes: 28px border radius (extra rounded), soft 3D lift on all cards (4px offset shadow in dark plum), pill-shaped buttons with bottom shadow giving tactile "press me" feel.
>
> Screen elements, top to bottom:
> - Top bar: rounded avatar with gradient ring, "Hi, Sarah!" friendly sans, heart-shaped bell icon
> - Hero card, mint with 3D lift: cartoon-style "15" plum, "days sugar-free" sans below, small 3D trophy illustration, confetti dots
> - Stats row: three 3D pill cards (butter, blush, mint), rounded numbers, cheerful icons
> - Check-in card, blush pink with 3D lift: "How are you today?" friendly, 5 large 3D emoji faces with bounce affordance
> - Lesson card, butter yellow with 3D lift: "Day 15: Sugar and Dopamine" rounded, cute brain icon, big plum "Learn" pill button
> - SOS button bottom-right: plum circle, 72px, with 3D lift and "SOS" bold white, bounces on hover
> - Quote: "You're doing amazing!" in plum with sparkle emojis implied, not text.
>
> Mood keywords: gamified, playful, 3D, soft, encouraging, Duolingo.

---

## Вариант 7: Pastel Therapy

**Направление:** Pastel / Soft / Gentle
**Палитра:** Lavender `#D6CDF0`, Powder blue `#C8DBEA`, Blush `#F8D8D8`, Cream `#FFF8F3`
**Типографика:** Rounded quirky (DM Sans / Work Sans), light-medium weights
**Настроение:** Therapeutic, gentle, non-judgmental
**Целевое ощущение:** "Mental health hug. Мне не стыдно здесь сорваться."

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a gentle therapy-informed coaching app for quitting sugar without shame. Target user: woman 30 who also uses Finch, How We Feel, or similar mental wellness apps.
>
> Style: pastel, soft, therapeutic, gentle. Inspired by Finch, How We Feel, Journey, Stoic, and modern mental health apps.
>
> Color palette: pastel lavender (#D6CDF0), powder blue (#C8DBEA), blush pink (#F8D8D8), cream background (#FFF8F3). Soft gradients between pastels.
>
> Typography: DM Sans or similar humanist sans with slightly rounded edges. Hero in medium weight 72pt (not too heavy), body in regular 15pt. Generous line-height 1.6.
>
> Shapes: 20px border radius, soft dreamy blur between sections, barely-there shadows (2% opacity), cloud-like card edges.
>
> Screen elements, top to bottom:
> - Top bar: soft lavender avatar ring, "Hey Sarah" gentle sans, small cloud bell
> - Hero block: lavender-to-blush gradient background, "15" medium weight in deep lavender, "days sugar-free" small cream-text, tiny floating star sparkles
> - Stats row: three cloud-shaped cards (lavender, blue, blush), soft numbers, icon above
> - Check-in card: powder blue with soft cream edge: "How are you today?" gentle, 5 watercolour-style emoji
> - Lesson card: blush with lavender accent: "Day 15 — Sugar and Dopamine" title, soft "Continue" button in lavender
> - SOS button bottom-right: lavender-to-pink gradient circle, 68px, soft glow, "SOS" in cream
> - Quote: "Be kind to yourself today." in soft dusty lavender.
>
> Mood keywords: therapy, gentle, non-judgmental, pastel, soft, mental wellness.

---

## Вариант 8: Bento Grid Health

**Направление:** Bento / Dense / Data-rich
**Палитра:** White `#FFFFFF`, Apple Health green `#30D158`, orange `#FF9F0A`, pink `#FF375F`, grey `#8E8E93`
**Типографика:** SF Pro Display, mixed weights
**Настроение:** Data-driven, credible, healthtech
**Целевое ощущение:** "Серьёзный health-tracking, как Apple Health — но про сахар".

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a data-rich health tracking app for quitting sugar. Target user: woman 33 who wears Apple Watch, checks Apple Health daily, and likes seeing metrics.
>
> Style: bento grid, data-dense, credible healthtech. Inspired by Apple Health (iOS 18), Whoop, Oura, and bento-style dashboards.
>
> Color palette: white background (#FFFFFF), Apple Health green (#30D158) for streak, orange (#FF9F0A) for warnings, pink (#FF375F) for SOS, grey (#8E8E93) for secondary. Vibrant color badges per metric.
>
> Typography: SF Pro Display, mixed weights. Hero numbers bold 48pt, labels in medium 12pt, body in regular 15pt. Very tight tracking on numbers.
>
> Shapes: 16px border radius, bento grid layout (varied card sizes tile together without gaps), thin 0.5px grey dividers inside cards, no shadows (flat).
>
> Screen elements, bento layout:
> - Top: "Today" label left, date right, small profile circle
> - Large hero card (spans 2 columns): green "15" with tiny flame icon, "day streak" grey below, mini 7-day sparkline chart
> - Grid of 4 small cards:
>   - "$127" dollar sign, "saved this month" grey
>   - "450g" grey, "sugar avoided" grey
>   - "23" pink, "cravings defeated" grey
>   - "A+" green, "current grade" grey
> - Medium card: "Today's lesson" grey label, "Sugar and Dopamine" black medium, progress ring 0/10
> - Small card: "Check-in" label, "How are you?" black, emoji row
> - Large card bottom: "This week" label, weekly bar chart with green bars and one orange
> - SOS button bottom-right: pink circle, 56px, "SOS" in white bold, no glow
> - No quote (data-first).
>
> Mood keywords: data-rich, bento, healthtech, Apple, dashboard, credible.

---

## Вариант 9: Brutalist Monochrome Pop

**Направление:** Brutalist / High-contrast / Graphic
**Палитра:** Pure white `#FFFFFF`, Pure black `#000000`, Electric accent `#00E5FF` (cyan) — только ОДИН акцент
**Типографика:** Monospace (JetBrains Mono) + heavy sans (Inter Black)
**Настроение:** Bold, anti-wellness, confident
**Целевое ощущение:** "Это не очередной cute app. Я серьёзно про перемены."

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a no-BS, anti-wellness-cliche sugar reduction app. Target user: woman 29, skeptical of pastel wellness apps, who prefers Linear, Arc browser, and Cash App aesthetics.
>
> Style: brutalist, high-contrast monochrome with a single electric accent. Inspired by Cash App, Linear, Arc, Dieter Rams, and Swiss graphic design.
>
> Color palette: pure white (#FFFFFF) background, pure black (#000000) type and borders, single electric cyan accent (#00E5FF) only on streak number and SOS. No greys, no gradients.
>
> Typography: JetBrains Mono or similar monospace for data and numbers. Inter Black or Helvetica Black for headings. Mixed — brutal contrast between mono and heavy sans.
>
> Shapes: 0px border radius (sharp rectangles), 2px solid black borders on every card, no shadows (flat graphic), heavy grid lines.
>
> Screen elements, top to bottom:
> - Top bar: "SARAH" mono all-caps black left, "/ APR 14" mono grey right, 2px black divider below
> - Hero: "15" enormous cyan mono number, "DAYS_SUGAR_FREE" mono black caps underneath, 2px black underline
> - Stats row: 3 stark rectangles with 2px black borders, mono labels inside ("MONEY // +$127", "SUGAR // -450g", "WINS // 23")
> - Check-in card: black rectangle, white text "// HOW_ARE_YOU?", 5 minimal outline emoji in white
> - Lesson card: stark white rectangle with 2px black border, mono "DAY_015" top-left, "SUGAR_AND_DOPAMINE" heavy black sans below, "→ OPEN" bottom-right
> - SOS button bottom-right: cyan square, 64px sharp, "SOS" in black mono heavy, no glow
> - Quote at bottom: mono black "// one_day_at_a_time.exe"
>
> Mood keywords: brutalist, anti-cute, high-contrast, mono, confident, graphic.

---

## Вариант 10: Editorial Serif Magazine

**Направление:** Editorial / Serif / Literary
**Палитра:** Paper `#F8F4EE`, Deep ink `#1A1A1A`, Dusty rose `#B88A8A`, Accent gold `#B8965A`
**Типографика:** Serif display (GT Sectra / Tiempos Headline) + humanist sans body
**Настроение:** Thoughtful, intellectual, Substack-like
**Целевое ощущение:** "Это журнал обо мне. Путь, не приложение."

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a mindful app that treats quitting sugar as a long-form personal journey. Target user: woman 34 who reads The Cut, subscribes to 5 Substacks, loves longform journalism.
>
> Style: editorial magazine, serif-led, literary, restrained. Inspired by The New York Times Cooking, Substack, The Cut, Pitchfork, and print magazine layouts.
>
> Color palette: warm paper background (#F8F4EE), deep ink text (#1A1A1A), single dusty rose accent (#B88A8A), subtle gold (#B8965A) on lesson card. Subtle newsprint texture.
>
> Typography: GT Sectra, Tiempos Headline, or Canela for display. Humanist sans (Söhne, Inter) for body. Hero in italic medium weight 84pt. Body with drop-cap on lesson card.
>
> Shapes: 8px border radius (restrained), 1px hairline rule dividers, no shadows, generous whitespace, asymmetric grid.
>
> Screen elements, top to bottom:
> - Top bar: "VOL. 15 // SARAH" in mono small-caps, left-aligned, simple bell right
> - Hero: massive serif italic "Fifteen" in ink (word, not digit), small-caps "DAYS SUGAR-FREE" below in rose, hairline rule underneath, date in small grey
> - A stat row rendered as a magazine table of contents: "01 — Money saved / $127 // 02 — Sugar avoided / 450g // 03 — Cravings won / 23", mono sans separated by thin rules
> - Check-in card: paper with rose hairline border, small-caps "TODAY'S CHECK-IN", serif "How are you feeling, Sarah?", 5 typographic emotion labels (not emoji): "well, anxious, tired, hopeful, craving"
> - Lesson card: bold serif headline "Sugar and Dopamine" with "DAY 15 // Chapter 3" pre-headline, 2-line serif italic pull-quote, "CONTINUE READING" small-caps link with gold arrow
> - SOS button bottom-right: rose circle, 64px, serif "SOS" in ink, minimal
> - Quote at bottom: serif italic, no quote marks: "The small hours teach us the most."
>
> Mood keywords: editorial, literary, Substack, magazine, serif, thoughtful.

---

## Вариант 11: Sunset Gradient Y2K

**Направление:** Gradient / Warm / Y2K-nostalgia
**Палитра:** Peach→Pink→Purple sunset gradient `#FFB88C → #FF6F91 → #845EC2`, Cream text `#FFF5EE`
**Типографика:** Retro-modern sans (PP Editorial New + Greed mix), mixed weights
**Настроение:** Nostalgic, warm, golden-hour
**Целевое ощущение:** "Вечер пятницы, я на балконе с водой, а не с мороженым".

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a warm, hopeful coaching app for quitting sugar that feels like a sunset meditation. Target user: woman 27, Instagram-aesthetic, pastel sunset photography enthusiast.
>
> Style: sunset gradient, Y2K-nostalgic, warm golden-hour. Inspired by Co-Star astrology app, Poolsuite FM, Glossier, and Y2K revival aesthetics.
>
> Color palette: full-screen peach-to-pink-to-purple sunset gradient (#FFB88C top to #FF6F91 middle to #845EC2 bottom). Cream text (#FFF5EE). Translucent cards with subtle noise texture.
>
> Typography: PP Editorial New or similar retro-modern serif display for hero, Greed or Neue Haas for body. Mixed weights. Playful italic accents.
>
> Shapes: 32px border radius (very soft), translucent frosted cards with gradient showing through, subtle noise grain, no harsh shadows, organic asymmetric layout.
>
> Screen elements, top to bottom:
> - Top bar: cream "sarah ☾" lowercase with tiny crescent, floating circle avatar, cream bell
> - Hero block centered on gradient: dreamy serif italic "15" cream, "days sugar-free" small-caps cream, surrounded by faint sun-flare glow
> - Stats row: three translucent cream-frosted pills, values in cream, labels in pink small caps
> - Check-in card: translucent cream frost, "how are we feeling today, love?" italic serif, 5 soft emoji in sunset tones
> - Lesson card: translucent cream frost with pink accent, "day 15 · sugar and dopamine" italic serif, "dive in" in small-caps cream
> - SOS button bottom-right: peach-to-pink gradient circle, 68px, "sos" lowercase cream italic, soft bloom glow
> - Quote at bottom, centered cream italic: "every sunset is an invitation to begin again."
>
> Mood keywords: sunset, nostalgic, Y2K, gradient, Instagram aesthetic, hopeful.

---

## Вариант 12: Clinical Trust Pharma

**Направление:** Clinical / Medical / Trustworthy
**Палитра:** Medical white `#FCFCFC`, Signal red `#E63946` (sugar alert), Navy `#1D3557`, Sage `#A8DADC`
**Типографика:** Neue Haas / Inter, geometric precise
**Настроение:** Clinical but approachable, healthtech
**Целевое ощущение:** "Настоящая медицина, доказательная база. Не ТикТок-тренд."

**Промпт для Stitch:**
> Home dashboard for "Sugar Quit", a clinically credible coaching app for quitting sugar backed by neuroscience and peer-reviewed research. Target user: woman 34 with elevated A1C, whose doctor recommended reducing sugar.
>
> Style: clinical healthtech, trustworthy, evidence-based, approachable. Inspired by Levels, Lingo, Zoe, Oura, and medical-grade wellness apps.
>
> Color palette: medical white background (#FCFCFC), signal red (#E63946) for alerts and SOS, deep navy (#1D3557) for headings and trust, sage accent (#A8DADC) for calm data, muted grey for secondary.
>
> Typography: Inter or Neue Haas Grotesk, geometric precise. Hero numbers bold 72pt, body regular 15pt with generous line-height, labels in medium 12pt uppercase, subtle tabular numbers.
>
> Shapes: 12px border radius, 1px sage borders on cards, subtle elevated shadows (8% opacity), precise grid alignment.
>
> Screen elements, top to bottom:
> - Top bar: small circle avatar, "Sarah Miller" navy medium, "Apr 14" grey small, bell outlined
> - Hero card, white with sage left border: navy "15" bold, "DAYS SUGAR-FREE" uppercase navy below, small "LOW RISK" sage badge, subtle "your A1C trajectory" mini-chart
> - Stats row: three precise cards with sage borders — "USD 127" navy, "SAVED" label grey, similarly for "SUGAR AVOIDED / 450g" and "CRAVINGS MANAGED / 23"
> - Check-in card: "DAILY CHECK-IN" uppercase sage label, "How do you feel today, Sarah?" navy, 5 small standardized emoji with labels below (1-5 scale)
> - Lesson card: "DAY 15 / EDUCATION MODULE" sage label, "Sugar and Dopamine Pathways" navy bold, "Peer-reviewed · 8 min read" grey meta, red "BEGIN" button
> - SOS button bottom-right: signal red circle, 60px, "SOS" bold white, subtle shadow, looks like an emergency medical button
> - Footer: small grey "Disclaimer: not a substitute for medical advice."
>
> Mood keywords: clinical, medical, evidence-based, trustworthy, precise, healthtech.

---

## Как выбрать

Оценивай варианты по трём осям:

1. **Попадает ли в Sarah?** — чувствует ли она "это для меня"?
2. **Читаемо и иерархия ясна?** — streak видно сразу, SOS заметен, нет визуального шума?
3. **Будет ли это жить 2 года?** — тренд-look (glass, Y2K) может устареть; классика (minimal, editorial) живёт дольше.

### Возможные гибриды

После выбора можно скомбинировать:
- Вариант 1 (warm minimal) + палитра Варианта 5 (terracotta) → "warm editorial minimal"
- Вариант 4 (dark premium) + акцент Варианта 8 (healthtech green) → "serious data-rich dark"
- Вариант 2 (bold Gen Z) + структура Варианта 8 (bento) → "bold bento для молодых"

Эти гибриды раскрываются на Phase B.

---

**Дальше:** пользователь выбирает 1-2 фаворита → переходим к Phase B (3-5 уточнений палитры/плотности на том же Home screen).

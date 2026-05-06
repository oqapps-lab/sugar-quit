# Sugar Quit — Stitch Prompts for All Screens

**Дата:** 2026-04-19
**Стадия:** Design (Stage 6)
**Источники:** [SCREEN-MAP](../04-ux/SCREEN-MAP.md), [WIREFRAMES](../04-ux/WIREFRAMES.md), [FORMULA](./style-exploration/FORMULA.md), [v10 Editorial Narrative](./style-exploration/v10-editorial-narrative.md), [v10 Journey Path](./style-exploration/v10-journey-path.md), [v10 Breathing Anchor](./style-exploration/v10-breathing-anchor.md)

**Как пользоваться:**
1. В Stitch-проекте создай файл `design.md` и вставь туда **DESIGN-MANIFEST** (§0 ниже) — Stitch прочитает его перед каждой генерацией, повторять стиль в каждом промте не надо.
2. Для каждого экрана копируй промпт ИЗ блока ``` ... ``` (целиком, от первой строки до `Primary Design Surface: App.`).
3. Ключевые экраны (отмечены ⭐) — в Pro (Gemini 2.5 Experimental), остальные — в Flash.
4. Промпты выдержаны в едином editorial-narrative регистре из v10 (gradient as interface, natural metaphors, numbers as heroes, editorial typography).

---

## §0 — DESIGN-MANIFEST (копируй в design.md в Stitch)

```
# Sugar Quit — Design Language

## Product essence
AI craving coach for the moment your hand hovers over sugar. Real-time SOS conversation during cravings, trigger prediction, 90-day neuroscience program. Not a tracker. A companion for the exhale.

## Emotional register
Warm, empathetic, editorial. Like a thoughtful wellness magazine crossed with the quiet of a diary. Never clinical, never gamified, never cartoon.

## Palette — natural light, not HEX swatches
A single long vertical gradient carries every screen. The day lives inside it:
— cream at the top for dawn calm
— warming through peach and coral for afternoon peak risk
— cooling into pale lavender and soft mint for evening exhale
Color is function: warmer tones mean higher craving risk or active support; cooler tones mean calm, completed, at-rest. Honey and amber mark warmth of things already lived; plum and cool grey mark things still ahead.

## Anchor rule
One element per screen is fully saturated — coral-to-amber, sometimes pink — with a soft warm shadow. It says "I am here." The SOS pill, the current-chapter card, the breathing orb, the primary CTA. Everything else rests in frosted glass or whisper tones.

## Cards
Frosted-glass surfaces that pick up the color of the gradient beneath them. No flat white containers. No opaque rectangles. The card is the gradient, quieted.

## Typography — by role, not by font name
— Massive thin italic serif for hero words ("Light", "Day 47", "The Exhale")
— Clean humanist sans for body
— Whisper-weight sans for descriptions and dates
— Tiny UPPERCASE TRACKED labels with extra letterspacing, only for section labels
Numbers are the heroes. Streak counts, days clean, grams of sugar avoided — large, at the surface, casting no shadow.

## Composition
Editorial, not dashboard. 4-6 story-sections per screen with air between them, not 11 cramped widgets. Each section has a personality and a voice. Elements are named like natural-world objects — stones along a path, pages turning, the horizon line, a river, a shelf of tools.

## Motion (for reference, not rendered by Stitch)
Slow, breath-paced. No bounces. No snap. Fades and gentle drifts.

## What NEVER appears
— Flat dashboard grids
— Orbs-behind-glass decoration (v6 pattern, abandoned)
— Chart types named as chart types (no "donut chart", "bar chart" — it's a "torus", a "flowing curve", a "river")
— UPPERCASE for everything (reserve for section labels only)
— Multi-colored brand rainbows — only the editorial warm-to-cool narrative
— iOS 17 glass-pastel SaaS templates — this is a wellness magazine, not a fitness app

Primary Design Surface: App.
```

---

# 1. Onboarding Flow

## 1.1 Welcome Screen ⭐

```
Sugar Quit — AI craving coach for the moment your hand hovers above the cupboard. This is the first page of a 90-day walk — the threshold, the breath before stepping.

Mood & visual identity: imagine the very first morning of a long walk — warm honey light on the horizon, a single path visible just ahead, everything else waiting in soft cream. This screen lives in the moment of deciding to begin. The palette settles: cream at the top holding the sky of possibility, warming gently into peach at the waist of the screen, resting in soft mint toward the base like grass still damp from dawn.

A single editorial headline IS the interface — a story beginning, not a login form. The primary CTA is the anchor — a saturated coral-to-amber pill with a soft warm shadow, the only fully-saturated element. "Begin here."

Typography is editorial and unhurried — massive thin italic serif for the hero promise, clean whisper sans for the sub-line, tiny UPPERCASE TRACKED label for the step counter.

One screen. The threshold before the journey.

At the very top, a hair-thin horizontal progress rail in warm honey — the first of fifteen soft ticks filled, the rest waiting in whisper-grey. Beneath it in tiny UPPERCASE TRACKED label in muted honey: "STEP 1 OF 15 · ~3 MINUTES".

In the upper third, a quiet flat-illustrated scene — a hand releasing a sugar cube into warm air that turns it into a small green apple in blush and sage tones. Not photorealistic. Like a page of a children's book for adults.

Hero: "Meet the" in clean sans on one line, then "quiet coach" in massive thin italic serif on the next, then "for your cravings." in medium serif italic on the third. A soft subtitle in whisper sans beneath: "Three minutes, and a 90-day plan written for your body, your triggers, your life."

Lower middle: the primary anchor — a large saturated coral-to-amber gradient pill with a warm shadow, "Begin" in clean sans inside, a small soft rightward arrow-glyph. This pill is the only fully-saturated surface on the screen.

Beneath the pill, a whisper-weight line in tiny sans: "Already walking? Sign in." — "Sign in" in soft serif italic, underlined.

Near the bottom, a small exhale-glyph logo centered, "Sugar Quit" beside it in clean sans whisper-weight.

Primary Design Surface: App.
```

---

## 1.2 Quiz — Goal Selection

```
Sugar Quit onboarding. The first question of a conversation about your relationship with sugar. Not a form. An opening line.

Mood & visual identity: imagine being asked gently, for the first time, what you actually want — by someone who is patient enough to wait. The palette is early-morning diary light — cream at the top, pale peach through the middle, soft mint at the base. Cool, unhurried, unjudgmental.

Option cards rest on the gradient as small river stones placed along a path — each one its own rounded frosted-glass shape, carrying a single illustrated glyph, a short title, and a whisper-subtitle. The selected stone is the anchor — it warms into a saturated coral-to-peach frosted gradient with a soft glow halo. "You chose me."

Typography is editorial and quiet — a large italic serif question, thin sans for option titles, whisper sans for option subtitles, tiny UPPERCASE TRACKED label for the step counter.

One screen. The first quiet question.

At the very top, a thin horizontal progress rail — two of fifteen soft honey ticks filled. A small leftward arrow-glyph on the left. Beneath the rail, a tiny UPPERCASE TRACKED honey label: "STEP 2 OF 15".

Hero (upper third): "What's the shape" in clean sans, then "of your goal?" in massive italic serif on the next line. A whisper subtitle beneath: "Choose the one that fits the life you want. You can change this later."

Below the hero, three stone-cards in a soft vertical stack, each a rounded frosted-glass surface with an illustrated glyph on the left:
— a flat-illustrated flame-to-ember glyph in blush + sage tones: "Quit completely" in thin sans serif, with "Zero added sugar, for my reasons" in whisper sans beneath.
— a flat-illustrated balanced scale glyph in peach + sage: "Reduce gradually" in thin sans, with "Less sugar, more often, better mood" beneath.
— a flat-illustrated leaf-unfurling glyph in mint + honey: "I'm exploring" in thin sans, with "Not sure yet. Show me what's possible" beneath.

One of the three is selected — softly warmed into a saturated coral-to-peach gradient frosted card with a gentle glow halo.

At the very bottom, a primary anchor — a saturated coral-to-amber gradient pill with a warm shadow, "Continue" in clean sans with a small rightward arrow-glyph. Slightly dimmed if none is selected.

Primary Design Surface: App.
```

---

## 1.3 Quiz — Motivation

```
Sugar Quit onboarding. The third question — the why beneath the what.

Mood & visual identity: same dawn gradient as the previous screen — cream warming through peach into pale mint — this is a conversation continuing. The selected card is the anchor, warming into saturated coral. Other cards rest in frosted whisper-glass.

The question is editorial — large italic serif. The options are natural-world motivations, each carried by a tiny flat-illustrated glyph.

One screen. The why-card.

Top: thin progress rail, three of fifteen ticks filled, leftward arrow-glyph, tiny UPPERCASE TRACKED honey label "STEP 3 OF 15".

Hero: "Why now?" in massive italic serif, with a whisper subtitle "Pick what feels true. Multi-select is fine."

Below, a soft vertical stack of five multi-select stone-cards, each a rounded frosted-glass surface with a small illustrated glyph on the left:
— a flat-illustrated heartbeat-line in coral: "Health is asking me to" in thin sans, "Blood work, doctor, a number that worried me" in whisper.
— a flat-illustrated cloud-clearing glyph in peach + sage: "I want clearer energy" in thin sans, "No more 3pm crashes" in whisper.
— a flat-illustrated waistline + sprouting leaf glyph in mint: "My body feels different" in thin sans, "Weight, bloat, skin, sleep" in whisper.
— a flat-illustrated coin-into-savings glyph in honey: "It's costing too much" in thin sans, "Money, time, focus" in whisper.
— a flat-illustrated small-compass glyph in lavender: "I just want to feel in charge" in thin sans, "Of my choices, my cravings, my day" in whisper.

Selected cards warm into saturated coral-to-peach frosted gradients with soft halos. Unselected rest in pale whisper-glass.

Bottom: a saturated coral-to-amber "Continue" pill with a warm shadow.

Primary Design Surface: App.
```

---

## 1.4 Quiz — Sugar Goal (Quit / Reduce)

```
Sugar Quit onboarding. The fourth question — the how of your ask.

Mood & visual identity: same dawn gradient. Two stone-cards, larger and more weighted than the previous question — this is a choice that shapes the whole 90-day plan. The selected card becomes the anchor, warmed into saturated coral-to-amber.

One screen. The fork in the path.

Top: progress rail, four of fifteen ticks filled, leftward arrow-glyph, tiny UPPERCASE TRACKED "STEP 4 OF 15".

Hero: "How do you" in clean sans, "want to walk it?" in massive italic serif, with whisper subtitle "Either path is valid. You can change this later."

Below, two larger frosted-glass cards stacked vertically, each with more air inside:

Card 1 (the flame): a flat-illustrated wick-going-out glyph in blush. "Quit cold" as a medium italic serif headline. A whisper body: "I want a clean line. Zero added sugar from Day 1. Most people feel withdrawal in the first three days and clarity by Day 7."

Card 2 (the gradient): a flat-illustrated dimmer-knob glyph in peach + honey. "Reduce slowly" as a medium italic serif headline. A whisper body: "I want to taper. Cut refined sugar first, then watch hidden sources, then choose. Gentler, slower, still effective."

One card is selected — warmed into a saturated coral-to-amber gradient with a soft shadow. The other rests in frosted whisper-glass.

Bottom: coral-to-amber "Continue" pill.

Primary Design Surface: App.
```

---

## 1.5 Motivational 1 — Social Proof ⭐

```
Sugar Quit onboarding. A pause between asks. A quiet moment of "you are not the only one."

Mood & visual identity: the gradient briefly warms — peach and coral rise up from the base — as if the screen itself is confirming the user. Editorial. No cards. A page of a magazine.

A single large hero number IS the interface — the crowd behind the user, rendered as typography. No stock-photo carousel. No horizontal avatar pile.

One screen. The quiet crowd.

Top: progress rail, five of fifteen ticks filled, leftward arrow-glyph, tiny UPPERCASE TRACKED honey label "YOU'RE NOT ALONE".

Hero number: "127,000" in massive thin italic serif with a coral-to-amber gradient text fill, a soft radial glow halo behind. Beneath in whisper sans: "people have walked this path with us."

Middle: a flat-illustrated scene — a long gentle path curving into soft mist, with small warm dots along it marking other walkers — rendered in honey, blush, and sage tones. Quiet, not dramatic.

Below the illustration, a single testimonial in medium italic serif, softly indented: "I stopped thinking about it as quitting. I started thinking about it as finally listening to my body." — and a whisper attribution: "Sarah, Day 62."

Bottom: a saturated coral-to-amber "Continue" pill with warm shadow. "Continue" in clean sans.

Primary Design Surface: App.
```

---

## 1.6 Quiz — Peak Craving Time

```
Sugar Quit onboarding. The sixth question — when your body asks.

Mood & visual identity: the dawn gradient — cream at top, peach in the middle, pale mint at the base. But now a warm honey band subtly widens where the user's peak time will sit once selected. Color as function: warmer ring = higher-risk hour.

A 24-hour torus IS the interface — a thick circular gradient ring, hours shown as soft ticks along its curve. The user taps the hour where their craving peaks; that hour warms into a saturated coral arc with a soft glow.

One screen. The clock of your body.

Top: progress rail, six of fifteen ticks filled, leftward arrow-glyph, tiny UPPERCASE TRACKED "STEP 6 OF 15".

Hero: "When does" in clean sans, "the urge arrive?" in massive italic serif, with whisper subtitle "Tap the hour your cravings usually peak. Most people feel it around 3pm."

Centered: a large 24-hour torus ring — pale peach along most of its curve, with small hour-ticks in whisper honey. When the user taps, a four-hour window around that hour warms into a saturated coral-to-amber gradient with a soft glow halo on the outer edge. Inside the torus: the selected hour in large thin italic serif (e.g., "3:00 PM") with a tiny UPPERCASE TRACKED label beneath: "YOUR PEAK WINDOW".

Below the torus, three whisper-chips for alternate selections: "MORNING" · "AFTERNOON" · "EVENING" — tiny rounded frosted pills in whisper honey, the selected one warming into soft coral.

Bottom: coral-to-amber "Continue" pill.

Primary Design Surface: App.
```

---

## 1.7 Quiz — Triggers (Multi-Select)

```
Sugar Quit onboarding. The seventh question — what lights the match.

Mood & visual identity: dawn gradient continues. The trigger cards are stone-chips arranged in a soft two-column grid. Selected chips warm into saturated coral-to-peach gradients with soft glow; unselected rest in pale whisper-glass.

Functional aesthetic: the more triggers selected, the more visible the user's pattern becomes — a quiet warmth gathering across the screen.

One screen. The match-book.

Top: progress rail, seven of fifteen ticks filled, leftward arrow-glyph, tiny UPPERCASE TRACKED "STEP 7 OF 15".

Hero: "What sparks it?" in massive italic serif, with whisper subtitle "Multi-select. Choose what feels true most weeks."

Below, a soft two-column grid of six stone-chips — each a rounded frosted-glass card with a tiny flat-illustrated glyph on top and a short label beneath:
— flat-illustrated storm-cloud in coral: "Stress"
— flat-illustrated empty-chair in lavender: "Boredom"
— flat-illustrated fork-and-plate in sage: "After meals"
— flat-illustrated small-crowd glyph in peach: "Social pressure"
— flat-illustrated tear-drop in soft blue-grey: "Emotions"
— flat-illustrated moon-with-eye in deep plum: "Late-night"

Selected chips warm into saturated coral-to-peach gradients with soft halos.

Bottom: coral-to-amber "Continue" pill with a tiny counter in whisper: "3 selected".

Primary Design Surface: App.
```

---

## 1.8 Quiz — Consumption Level

```
Sugar Quit onboarding. The eighth question — the honest count.

Mood & visual identity: dawn gradient. This question uses a visual scale rather than text options — a row of five small sugar-glyphs graded from a single cube to a pile, rendered in blush tones. The selected level warms into saturated coral.

One screen. The honest count.

Top: progress rail, eight of fifteen ticks filled, leftward arrow-glyph, tiny UPPERCASE TRACKED "STEP 8 OF 15".

Hero: "Honest answer —" in clean sans, "how much sugar" in large italic serif on one line, "in a normal week?" on the next. Whisper subtitle: "No judgment. This is just for calibration."

Centered: five flat-illustrated consumption cards in a horizontal row, each a rounded frosted-glass tile with an illustrated sugar-glyph on top:
— one small sugar cube in blush: "A little" · "1–2 treats a week"
— two cubes + small dot: "Moderate" · "Almost daily sweet"
— three cubes + a pastry: "A lot" · "Multiple sweets a day"
— a small pile of cubes + soda-glyph: "A great deal" · "Sugar in most meals"
— a pile + a flame glyph in coral: "It runs my day" · "I think about sugar often"

The selected tile warms into a saturated coral-to-amber frosted gradient with a soft glow. Below, a tiny UPPERCASE TRACKED label: "YOUR BASELINE".

Bottom: coral-to-amber "Continue" pill.

Primary Design Surface: App.
```

---

## 1.9 Motivational 2 — You're Not Alone ⭐

```
Sugar Quit onboarding. The second quiet pause. The nervous-system unclench.

Mood & visual identity: the gradient briefly deepens — warmer coral across the midsection — this is the empathy beat. Editorial, no cards, wide air.

One screen. The normalizing moment.

Top: progress rail, nine of fifteen ticks filled, leftward arrow-glyph, tiny UPPERCASE TRACKED label in warm honey "THE TRUTH".

Hero number: "75%" in massive thin italic serif with a coral-to-amber gradient text fill, a soft radial halo behind. Beneath in whisper sans: "of adults in the US want to reduce sugar. Most don't know where to start."

Middle: a flat-illustrated scene — a quiet group of silhouettes walking the same gentle path, each carrying a small warm light, rendered in honey and coral tones. None of them look back. All of them are walking.

Below, a single editorial line in medium italic serif: "You are not behind. You are not alone. You are the 75% who decided today is the day."

Bottom: saturated coral-to-amber "Continue" pill with warm shadow.

Primary Design Surface: App.
```

---

## 1.10 Quiz — Past Attempts

```
Sugar Quit onboarding. The tenth question — the history of trying.

Mood & visual identity: dawn gradient. Four stone-cards stacked. Non-judgmental. The selected card warms into saturated coral.

One screen. The honest history.

Top: progress rail, ten of fifteen ticks filled, leftward arrow-glyph, tiny UPPERCASE TRACKED "STEP 10 OF 15".

Hero: "Have you tried" in clean sans, "before?" in massive italic serif, with whisper subtitle "This helps us start where you actually are."

Below, four frosted-glass stone-cards stacked:
— flat-illustrated closed-book glyph in honey: "This is my first real try" in thin sans, with whisper "I'm starting fresh."
— flat-illustrated short-path-loop in peach: "A few times, short" in thin sans, with whisper "Days or weeks, then back."
— flat-illustrated longer-path-with-turn in coral: "Once or twice, longer" in thin sans, with whisper "Months of progress, but returned."
— flat-illustrated winding-path-many-stones in sage: "Many times" in thin sans, with whisper "It's a long on-and-off story."

The selected card warms into saturated coral-to-peach frosted gradient.

Bottom: coral-to-amber "Continue" pill.

Primary Design Surface: App.
```

---

## 1.11 Quiz — Work Environment

```
Sugar Quit onboarding. The eleventh question — where the temptation lives during the day.

Mood & visual identity: dawn gradient. Four environment-cards in a soft grid with flat-illustrated scenes.

One screen. The landscape of your day.

Top: progress rail, eleven of fifteen ticks filled, leftward arrow-glyph, tiny UPPERCASE TRACKED "STEP 11 OF 15".

Hero: "Where does" in clean sans, "your day happen?" in massive italic serif, with whisper subtitle "So we can place the right tools in the right moment."

Below, a soft 2×2 grid of frosted-glass environment cards, each with a small flat-illustrated scene and a short label:
— a desk-with-monitor illustration in blush + sage: "Office / desk work"
— a house-with-kitchen glyph in peach: "Home / remote"
— a service-counter glyph in honey: "On my feet / public-facing"
— a van-with-road glyph in lavender: "Mobile / varies"

The selected card warms into saturated coral-to-peach frosted gradient with soft halo.

Bottom: coral-to-amber "Continue" pill.

Primary Design Surface: App.
```

---

## 1.12 Quiz — Name (Optional)

```
Sugar Quit onboarding. The twelfth question — the softest ask.

Mood & visual identity: dawn gradient. Minimal. Just a single input line and a quiet greeting.

One screen. The name on the letter.

Top: progress rail, twelve of fifteen ticks filled, leftward arrow-glyph, tiny UPPERCASE TRACKED "STEP 12 OF 15 · OPTIONAL".

Hero: "What should we" in clean sans, "call you?" in massive italic serif, with whisper subtitle "Only your first name. Skip if you'd rather stay anonymous."

Centered on the screen: a single frosted-glass input line with a hair-thin warm-honey underline, placeholder "Sarah" in whisper sans italic, a small caret pulsing softly.

Beneath the input in whisper sans: "Used only in the app. Never shared."

Bottom: two pills side by side — a quieter "Skip" text-link in whisper sans on the left, and a saturated coral-to-amber "Continue" pill on the right.

Primary Design Surface: App.
```

---

## 1.13 Loading Screen ⭐

```
Sugar Quit onboarding. The pause where the plan is written. Five to eight seconds of perceived work that earns the result.

Mood & visual identity: the dawn gradient begins to warm through — peach deepening into coral in the upper-middle — as if the screen itself is composing something. A single slow animated line traverses the screen like a thread being woven.

A thin warm-honey progress thread IS the interface — it grows slowly across the screen from left to right, writing the plan as it goes. No spinner. No bar. A line that takes its time.

One screen. The weaving.

Top: no progress rail — this screen is outside the count. Tiny UPPERCASE TRACKED honey label centered: "WRITING YOUR PLAN".

Centered vertically, three story-lines appear one at a time in soft sequence, each in clean whisper sans with a small dot-glyph ahead of it:
— "Reading your triggers…" (already finished, dot softly filled coral)
— "Matching your peak hour to the 90-day arc…" (current, dot softly pulsing coral-to-amber)
— "Composing your first week…" (upcoming, dot outlined in whisper honey)

Below the story-lines, a single thin horizontal thread — the honey-to-coral progress line — slowly growing from left to right across the screen, thinner than a hair, no percentages.

Below the thread in whisper sans italic: "This takes a moment. It's worth it."

Near the bottom, a soft flat-illustrated scene — a pen tracing a path onto an open page — rendered in honey and blush tones, quiet and unhurried.

Primary Design Surface: App.
```

---

## 1.14 Result Screen ⭐

```
Sugar Quit onboarding. The aha-moment. The personalized map that earns the paywall that follows.

Mood & visual identity: the gradient arrives at full editorial narrative — cream at top, warming through peach and coral in the mid, cooling into pale mint at the base. This screen tells the user: "We see you. Here is your shape."

The user's personalized craving type IS the anchor — a single medium italic serif phrase in warm coral, like a book title given to them. Below it, three story-sections unfold.

One screen. The plan as a magazine page.

Top: a small exhale-glyph + "Sugar Quit" in whisper sans on the left. A small rightward "Skip to plan" in whisper sans on the right.

Beneath, a tiny UPPERCASE TRACKED label in warm honey: "YOUR CRAVING PROFILE".

Hero: "You are a" in clean sans on one line, then "Stress Eater" in massive thin italic serif with a coral-to-amber gradient text fill, "with a 3pm crash" in medium italic serif on the next line. A whisper subtitle beneath: "Cortisol + afternoon dip + desk-work routine. This is common, and very manageable."

Below the hero, three editorial story-sections with air between them:

Section 1 — THE PATTERN (frosted-glass card, peach-tinted): a small flat-illustrated clock-with-warm-band glyph on the left. "Your peak window is 3:00–5:00 PM." in medium italic serif. Whisper body: "Low blood sugar meets meeting fatigue. We'll place two breathing anchors and one alternative snack in this window from Day 1."

Section 2 — THE FIRST WEEK (frosted-glass card, coral-tinted, slightly larger): a flat-illustrated seven-stones-along-path glyph on the left. "Week 1 — Withdrawal, then clarity" in medium italic serif. Whisper body: "Days 1–3: mild fatigue and cravings (this is normal). Days 4–5: energy begins to return. Day 7: the first quiet morning without craving."

Section 3 — THE HORIZON (frosted-glass card, mint-lavender-tinted): a flat-illustrated distant-mountain glyph on the left. "By Day 30, taste buds reset." in medium italic serif. Whisper body: "Fruit becomes sweet again. Savings: ~$72. Cravings defeated: ~40. Energy floor lifts by 15%."

Bottom: a large saturated coral-to-amber "Begin the program" pill with a soft warm shadow, the only fully-saturated surface on the screen.

Primary Design Surface: App.
```

---

## 1.15 Paywall (First, Post-Result) ⭐

```
Sugar Quit onboarding. The conversion moment. Built on the invested buy-in of the result screen.

Mood & visual identity: the gradient warms slightly — more coral, less cream — this screen has heat. Editorial. A magazine page about a decision, not a pricing table.

The annual tier IS the anchor — a frosted-glass pricing card with a glowing coral-to-amber gradient border halo, saturated, shouldering the decision. The monthly tier rests in whisper-glass beside it.

One screen. The page of the decision.

Top: a tiny "×" in whisper sans at top-right (dismissable). A small exhale-glyph + "Sugar Quit" on the left.

Beneath: tiny UPPERCASE TRACKED warm honey label: "SARAH, YOUR PLAN IS READY".

Hero: "A $0.22 / day" in clean sans, "decision." in massive italic serif, with whisper subtitle: "Less than the candy bar you already skipped today. Seven days free. Cancel in one tap."

Below the hero, a tight frosted-glass card listing what unlocks, with each item as a story-line in thin sans preceded by a tiny coral check-glyph:
— "Unlimited SOS conversations, any hour"
— "Your personalized 90-day program"
— "Trigger prediction tuned to your 3pm"
— "Streak Freeze — one missed day forgiven per week"

Beneath the list, a soft single-line testimonial in medium italic serif: "The SOS saved me from the 3pm chocolate. Twice this week." — whisper attribution: "★★★★★ — Maya, Day 34."

Below the testimonial, two pricing cards side-by-side:
— MONTHLY: plain frosted-glass card. "$9.99 / month" in thin sans. Small whisper line: "Switch anytime."
— ANNUAL: frosted-glass with a glowing coral-to-amber gradient border halo, slightly larger, selected by default. "$79.99 / year" in thin sans, "$6.67 / month · save 44%" in smaller whisper. A tiny UPPERCASE TRACKED label above: "BEST VALUE". A small check-glyph in the top-right corner of this card.

Below the cards, a large saturated coral-to-amber CTA pill with a soft warm shadow: "Start 7 days free" in clean sans, a small rightward arrow-glyph inside.

Below the CTA, a thin honey-colored trial timeline as three small dots with hair-thin connecting line: "Day 1 — Full access" · "Day 5 — We remind you" · "Day 7 — You decide" — all in tiny UPPERCASE TRACKED whisper.

Very bottom, a soft "Maybe later" link in whisper-weight sans, subtle but visible.

Primary Design Surface: App.
```

---

## 1.16 Auth Screen

```
Sugar Quit onboarding. Sign in — the quick handshake after the decision.

Mood & visual identity: dawn gradient, calm and settled. This screen is almost silent — the work has already happened.

One screen. The handshake.

Top: a small exhale-glyph + "Sugar Quit" centered in whisper sans. Beneath in tiny UPPERCASE TRACKED honey: "SAVE YOUR PLAN".

Hero: "One last step —" in clean sans, "keep your plan." in massive italic serif, with whisper subtitle: "Sign in so your plan, streak, and SOS history stay with you."

Below the hero, three auth pills stacked vertically with quiet air between:
— Apple button: a solid charcoal pill with the Apple glyph on the left and "Continue with Apple" in clean sans. A soft warm shadow.
— Google button: a frosted-glass pill with a soft border, Google glyph on the left, "Continue with Google" in clean sans.
— Email option: a whisper text-link beneath in clean sans, "Continue with email" — small, but clear.

At the very bottom, tiny whisper sans: "By continuing, you agree to our" + serif italic "Terms" + "and" + serif italic "Privacy."

Primary Design Surface: App.
```

---

## 1.17 Push Permission Request

```
Sugar Quit onboarding. The push ask — framed as a promise, not a permission.

Mood & visual identity: dawn gradient, with a very soft pulse of warm honey around an illustrated watch-glyph. This screen is asking for trust, so it shows its intent.

One screen. The quiet promise.

Top: tiny UPPERCASE TRACKED honey label "THE PROMISE".

Hero: "We'll warn you" in clean sans, "15 minutes before" in massive italic serif, "your 3pm." Below in whisper sans: "One push when the pattern predicts a craving. That's it. No spam, ever."

Centered, a flat-illustrated scene — a soft watch-face with a warm honey glow around the 3 o'clock position, rendered in blush and coral tones, a gentle ripple emanating outward.

Below the illustration, three tiny promise-lines in whisper sans with coral dot-glyphs:
— "Only when your pattern predicts a craving"
— "Max 1 push per day"
— "Turn off anytime in settings"

Bottom: a large saturated coral-to-amber "Turn on predictions" pill with warm shadow. Beneath it, a smaller whisper text-link "Maybe later" — never "Don't allow."

Primary Design Surface: App.
```

---

# 2. Main Tabs

## 2.1 Home — With Data (Day 8+) ⭐

```
Sugar Quit home. The daily wellness weather report. Read like a thoughtful magazine page, not a dashboard.

Mood & visual identity: imagine the slow exhale after you successfully resist a craving. This screen lives in that exhale. The palette breathes — one long vertical gradient narrates the day: cream at the top for dawn calm, warming through peach and coral in the middle for afternoon peak risk, cooling into pale lavender and soft mint at the bottom for evening exhale. The gradient IS the interface. Warmer color means higher craving risk; cooler means calm.

Cards float on this gradient as frosted-glass surfaces that pick up the color of the gradient beneath them. The SOS pill is the anchor — a saturated coral-to-amber gradient pill with a soft warm shadow, floating at the lower-right above the tab bar. "I am here when you reach for sugar."

Typography is editorial — a large italic serif forecast word, clean sans for body, tiny UPPERCASE TRACKED section labels, a massive thin serif streak number at the bottom.

One screen. Today read like a wellness weather report.

Top: a small exhale-glyph + "Sugar Quit" in whisper sans on the left. A small circular user avatar on the right.

Tiny UPPERCASE TRACKED honey label beneath: "TODAY'S FORECAST · 19 APRIL".

Hero: "Today is" in clean sans on one line, then "Light" in massive thin italic serif with a coral-to-amber gradient text fill on the next. Below in whisper sans: "Morning is calm. A small 3pm surge. Evening exhales into mint."

Below the hero, three time-zone forecast cards stacked vertically with air between them:

Morning card (peach-tinted frosted glass, softer, the calmest): tiny UPPERCASE TRACKED "08:00 — 12:00" top-left. A medium italic serif "Calm." Whisper body: "Low risk. Perfect for deep work." A small flat-illustrated peach water-drop glyph at the right.

Afternoon card (saturated coral-to-amber frosted glass, noticeably more vibrant — the peak): tiny UPPERCASE TRACKED "15:00 — 18:00" top-left. A medium italic serif "High surge." Whisper body: "Cortisol peak. Two breathing anchors placed early." Behind the text, ghosted into the card as translucent mega-typography: "3:12 PM" in massive thin sans at 20% opacity, filling the card's negative space. At the card's lower-right, a smaller coral-to-amber pill in clean sans: "See plan →".

Evening card (mint-to-lavender frosted glass, cool, closing): tiny UPPERCASE TRACKED "18:00 — 22:00" top-left. A medium italic serif "The exhale." Whisper body: "Risk drops to zero. Lesson and check-in await."

Below the three forecast cards, a thin horizontal divider, then a check-in strip — a frosted-glass horizontal card: "Yesterday's check-in?" in thin sans on the left, "Mark now →" in small coral serif italic on the right. Pulsing gently if unfulfilled.

Below the check-in strip, today's lesson card — a frosted-glass card with sage tint: a small flat-illustrated sprout-glyph on the left, "Day 8 — Your taste buds are waking up" in medium italic serif, a whisper "5 min read" beneath. A tiny rightward arrow-glyph on the far right.

Near the bottom, the streak hero: a massive bold thin italic serif "8" with a coral-to-lavender gradient text fill, a soft radial glow halo behind the digit. Beneath it in tiny UPPERCASE TRACKED honey: "DAYS CLEAN · BEST STREAK 12". A thin row of 14 small honey-dots beneath, the first 8 filled, the rest waiting.

Very bottom: a minimal frosted tab bar with 4 whisper icons — home (active, coral), curriculum, progress, profile. The SOS pill — a saturated coral-to-amber gradient orb — floats above the tab bar at the right with a soft warm shadow and a tiny "SOS" in clean sans inside.

Primary Design Surface: App.
```

---

## 2.1b Home — Empty State (Day 1)

```
Sugar Quit home, day 1. The first morning. No streak yet — the page waits with anticipation, not emptiness.

Mood & visual identity: dawn gradient, cleaner and brighter than Day 8 — cream at top, soft peach through middle, pale mint at base. No coral warming yet: the day has not peaked. This is the beginning of beginning.

A welcome card IS the center of gravity — a larger frosted-glass card with a honey tint, holding the user's first-day plan.

One screen. The first page.

Top: small exhale-glyph + "Sugar Quit" on left, avatar on right. Tiny UPPERCASE TRACKED honey label "WELCOME · DAY 1".

Hero: "Your path" in clean sans, "begins here." in massive thin italic serif, with whisper subtitle "Three soft tasks for today. No rush. No perfect."

Below the hero, a large frosted-glass welcome card with honey tint, containing a story-list of three numbered items in thin sans:
1. "Check in tonight — how did the day go?"
2. "Read Day 1 — why sugar catches the brain." (5 min)
3. "Use SOS if a craving arrives. Even once. That's the muscle."

Below this card, today's lesson card — frosted-glass with sage tint, flat-illustrated open-book glyph on the left, "Day 1 — Why sugar catches the brain" in medium italic serif, whisper "7 min read" beneath, small rightward arrow-glyph.

Below the lesson card, a soft quiet tip in whisper sans italic: "When the urge arrives — the warm pill at the bottom is the one you tap. It will not judge, not count, not shame."

Very bottom: minimal frosted tab bar with 4 icons — home (active), curriculum, progress, profile. The SOS pill — saturated coral-to-amber gradient — floats above the tab bar at the right with soft warm shadow and gentle pulse.

Primary Design Surface: App.
```

---

## 2.2.1 Curriculum Overview ⭐

```
Sugar Quit curriculum. The 90-day journal laid open. Chapters as pages.

Mood & visual identity: imagine a diary open on a warm afternoon — early pages glow with honey warmth from the window, the current page sits open in saturated coral, the pages ahead wait in soft shadow. Color temperature tells you where you are on the journey. Completed chapters glow warm; the current chapter saturates; upcoming rest in pale plum.

The current lesson IS the anchor — a large saturated coral-to-amber frosted-glass card, visibly warmer than any other card on the screen. "You are here. Day 8 is open."

One screen. The journal of your 90 days.

Top: small exhale-glyph + "Sugar Quit" on the left, avatar on the right. Tiny UPPERCASE TRACKED warm honey label beneath: "YOUR 90-DAY PATH".

Hero: "Day 8" in massive thin italic serif on one line, "of 90" in medium italic serif on the next, with whisper subtitle: "You've walked further than most begin. Week 2 is about learning to sit with what used to send you running."

Below the hero, a thin horizontal progress rail — the first 8 of 90 ticks filled warm honey, the rest in pale plum whisper-tone.

Below the progress rail, a stacked list of chapter cards — each chapter a pair of lessons bundled into a small frosted-glass surface:

Phase 1 — Acute (Days 1–3): three small honey-tinted frosted-glass cards with gold serif italic "Day 1 · Why sugar catches the brain ✓", "Day 2 · The 72-hour storm ✓", "Day 3 · First quiet morning ✓", each with a tiny soft honey dot-glyph on the left and a small whisper completion date on the right.

Phase 2 — Adaptation (Days 4–7): four honey-tinted completed cards, same pattern, slightly cooler tone.

Phase 3 — Clarity (Days 8–14): the Day 8 card is the anchor — a larger saturated coral-to-amber frosted-glass card with a soft warm shadow, "Day 8 · Your taste buds are waking up" in larger medium italic serif, whisper "5 min · the current page" beneath, a small rightward arrow-glyph. Days 9–14 sit below in pale plum frosted glass with outlined markers — upcoming, not locked.

Phase 4 — Integration (Days 15–30): a single collapsed chapter card in cool plum-grey frosted glass, "Days 15–30" in whisper italic serif, with a small 🔒 glyph on the right — "Unlocks as you walk."

Phase 5 — Mastery (Days 31–90): another collapsed card in deeper plum, "Days 31–90" in whisper.

Very bottom: minimal frosted tab bar — home, curriculum (active, coral), progress, profile. The SOS pill floats above-right.

Primary Design Surface: App.
```

---

## 2.2.2 Lesson Screen ⭐

```
Sugar Quit — a single daily lesson. A quiet article in a wellness magazine, not an e-learning card.

Mood & visual identity: the dawn gradient softens into reading light — cream at the top, warm peach holding the middle, pale sage at the base. This screen is a page.

The lesson's mini-assignment IS the anchor — a saturated coral-to-amber frosted-glass card at the bottom, inviting a single small action. Everything else is text, air, and one illustration.

One screen. The page open.

Top: a small leftward arrow-glyph, tiny UPPERCASE TRACKED honey "DAY 8 OF 90". Thin horizontal progress rail beneath — 8 of 90 filled.

Hero: tiny UPPERCASE TRACKED coral label "DAY 8". Beneath, a massive thin italic serif title on two lines: "Your taste buds" / "are waking up." A whisper subtitle: "5 min read · neuroscience + one practice."

Below the hero, a thin horizontal divider line in warm honey.

Section 1 — WHAT'S HAPPENING (tiny UPPERCASE TRACKED label in sage): a medium paragraph in clean thin sans: "By day 8 without excess sugar, your taste receptors begin to recalibrate. Fruit will start tasting noticeably sweeter by day 14. A 2019 University of Michigan study showed a 40% increase in perceived fruit sweetness after two weeks of sugar reduction."

Beside the paragraph, a flat-illustrated scene — a simple taste-bud diagram rendered as a soft rose bloom, in blush and sage tones, not clinical.

Section 2 — THE PRACTICE (tiny UPPERCASE TRACKED label in peach): a medium paragraph in clean thin sans: "Tonight, eat a fruit you used to find 'not sweet enough' — a Granny Smith apple, a grapefruit, blueberries. Notice. No judgment, no measuring. Just notice."

Section 3 — THE MINI-TASK (anchor — saturated coral-to-amber frosted-glass card with a soft warm shadow): tiny UPPERCASE TRACKED "TONIGHT'S NOTE". A line in medium italic serif: "Rate the fruit's sweetness." A horizontal row of five small rounded stones, each a tap target, from "sour" in whisper on the left to "sweet" in whisper on the right. The stones rest in pale frosted-glass.

At the bottom, a whisper-weight attribution in tiny italic serif: "Source: Wise et al., 2019, Nutrients."

Below the source, a saturated coral-to-amber "Mark lesson complete" pill with a small soft check-glyph.

Primary Design Surface: App.
```

---

## 2.2.3 Lesson Complete

```
Sugar Quit — the quiet closing of a lesson page.

Mood & visual identity: the gradient settles into a warm sunset — honey at the top, soft peach in the middle, deep plum at the base. The page has closed.

A single soft badge glyph IS the anchor — a small flat-illustrated natural object (a stone, a leaf, a feather), rendered in saturated coral-to-amber, with a soft halo.

One screen. The page closing.

Center of the screen, vertically balanced:

Tiny UPPERCASE TRACKED honey label at the top: "DAY 8 · COMPLETE".

Below it, the small anchor glyph — a flat-illustrated river stone in saturated coral-to-amber with a soft halo, sized like a large thumbprint.

Below the glyph, a medium italic serif line: "You placed another stone on the path."

Below that, a whisper subtitle in clean sans: "Day 9 opens tomorrow morning. Your taste buds are quietly changing tonight."

Below, a thin horizontal row of three small honey-dots — today's progress anchors — with whisper labels: "Lesson · Check-in · SOS (ready)".

Bottom: a saturated coral-to-amber "Back to today" pill with warm shadow.

Primary Design Surface: App.
```

---

## 2.3.1 Progress Overview ⭐

```
Sugar Quit progress. The long walk looked back at. Warmth behind, clarity now, soft mist ahead.

Mood & visual identity: imagine looking back over a quiet walk at dusk — behind you the path is marked with small stones and low plants you placed yourself; ahead, the path continues into soft misted distance. The palette is late-afternoon walking light — warm honey high at the horizon, cooling through soft rose into deep plum-shadow. Color temperature does the hierarchy.

Today-you IS the anchor — a small warm-saturated marker at the current position on the path, the only element at full saturation. "Day 8. You are here."

One screen. The path at dusk.

Top: small exhale-glyph + "Sugar Quit" on the left, avatar on the right. Tiny UPPERCASE TRACKED warm honey label: "YOUR PATH".

Hero: "You are on" in clean sans, "Day 8 of 90" in massive italic serif. Whisper subtitle: "The path behind is marked. The path ahead is written in soft light."

Below the hero, a long gently curving vertical brass-colored thread running down through the center-right of the screen from top to bottom — thinner than you'd expect. Warmer honey-amber along the upper portion (where the 8 days behind lie), transitioning to saturated coral at the current marker, then cooling into misted lavender-grey as it descends.

Along the path, small natural milestone-markers placed as if along a trail:
— upper: a small flat-illustrated pebble in warm honey, "Day 1" whisper label floating beside it.
— higher-middle: a tiny wooden post glyph in amber, "Day 3 · first quiet morning" whisper italic serif.
— at the saturated current position: a slightly larger flat-illustrated sprout in saturated coral-to-amber, "Day 8 · you are here" in medium italic serif coral.
— lower-middle: a small flat-illustrated closed bud in pale plum, "Day 14" whisper.
— lowest visible: a soft flat-illustrated distant peak glyph in cool lavender, "Day 30" whisper, fading into mist.

To the left of the path, three small quiet stats — stacked story-numbers with air between:
— a massive thin italic serif "6" with coral-to-amber gradient text fill, below in tiny UPPERCASE TRACKED "CRAVINGS DEFEATED THIS WEEK"
— a massive thin italic serif "$18" with soft honey text fill, below in tiny UPPERCASE TRACKED "SAVED"
— a massive thin italic serif "80%" with sage text fill, below in tiny UPPERCASE TRACKED "SUCCESS RATE"

At the bottom, a thin frosted-glass share pill in whisper sans: "Share this week →".

Very bottom: minimal frosted tab bar — home, curriculum, progress (active, coral), profile. SOS pill floats above-right.

Primary Design Surface: App.
```

---

## 2.3.2 Weekly Summary

```
Sugar Quit weekly summary. One week, read as a chapter.

Mood & visual identity: warm walking-light gradient. This screen is a single editorial chapter — Week 2.

One screen. The chapter.

Top: small leftward arrow-glyph, tiny UPPERCASE TRACKED honey "WEEK 2 · 13–19 APRIL".

Hero: "The week you" in clean sans, "stopped fearing the 3pm dip." in massive italic serif. Whisper subtitle: "A gentle summary of what actually happened."

Below the hero, four story-sections in a soft vertical stack, each a frosted-glass card with quiet air between:

Section 1 — THE NUMBERS (honey-tinted frosted-glass card): a soft row of three hero numbers side by side:
— "6" thin italic serif, below tiny UPPERCASE TRACKED "CRAVINGS MET"
— "5" thin italic serif, below tiny UPPERCASE TRACKED "CRAVINGS WALKED THROUGH"
— "1" thin italic serif, below tiny UPPERCASE TRACKED "CRAVINGS GIVEN TO"

Section 2 — THE CURVE (peach-tinted frosted-glass card): a soft flowing curve in coral-to-peach gradient tracing seven data points (one per day), each point a small gradient dot, today's point a slightly larger gradient orb with soft glow. Below the curve in whisper: "Peak: Tuesday 3:14 PM. Softest: Sunday morning."

Section 3 — THE PATTERN (sage-tinted frosted-glass card): a small flat-illustrated magnifying-loop glyph on the left. A paragraph in thin sans: "Your stress-trigger dropped by 30% this week. Boredom-cravings are now the leading pattern — 2 of 6. Worth placing a walk or a call in your 4pm pocket."

Section 4 — NEXT WEEK (coral-to-amber saturated frosted-glass card, the anchor): "WEEK 3 · MEETING YOUR TRIGGERS" tiny UPPERCASE TRACKED. Medium italic serif: "Three small practices to try." A whisper list: "Notice without responding. Name the feeling. Place a 3-minute breath at 3pm."

Bottom: saturated coral-to-amber "Share this chapter" pill.

Primary Design Surface: App.
```

---

## 2.3.3 Milestones

```
Sugar Quit milestones. The small stones you've picked up along the path.

Mood & visual identity: late-afternoon walking light — honey warmth above, cool plum-mist below. Milestones appear as small natural objects — no badges, no trophies — each one unique.

The next milestone IS the anchor — the one coming into view on the path, rendered in saturated coral-to-amber, with a gentle glow; all others are either warm-earned or cool-ahead.

One screen. The stones.

Top: small leftward arrow-glyph, tiny UPPERCASE TRACKED honey "YOUR STONES".

Hero: "8 stones placed." in massive italic serif. Whisper subtitle: "Each one a day you chose yourself. The next is close."

Below the hero, a soft vertical layout of milestone objects — not a grid, more like a winding arrangement. Each milestone is a small flat-illustrated natural object with a whisper caption beside it:

Earned stones (warm honey-amber, placed above):
— a smooth river-pebble illustration in warm honey + blush: "Day 1 · the first decision"
— a small sprout glyph in honey + sage: "Day 3 · first quiet morning"
— a tiny wooden-post glyph in amber: "Day 7 · first week, whole"

Current / approaching (saturated coral-to-amber, the anchor):
— a slightly larger flat-illustrated sea-glass piece in saturated coral-to-amber with a soft glow: "Day 14 · adaptation — 6 days away"

Ahead (cool plum-grey, still to come):
— a small outlined feather glyph in pale plum: "Day 30 · taste reset"
— a small outlined tree-ring glyph in cool lavender: "Day 60 · new identity"
— a small outlined mountain-peak glyph in deep cool grey: "Day 90 · the horizon"

Bottom: tiny whisper sans line centered: "Each stone is a sentence in your story."

Primary Design Surface: App.
```

---

## 2.4.1 Profile

```
Sugar Quit profile. The quiet title page of your account.

Mood & visual identity: dawn gradient, calm and settled. A single portrait-like arrangement at the top, a quiet menu list below.

One screen. The title page.

Top: tiny UPPERCASE TRACKED honey "PROFILE".

Centered, upper third: a small circular avatar in a warm honey frosted-glass ring. Below the avatar, "Sarah" in medium italic serif. Below the name, tiny UPPERCASE TRACKED coral "PREMIUM · SINCE 6 APRIL".

Below the name, a small frosted-glass info card in peach-tint containing three story-lines in thin sans:
— a tiny flat-illustrated compass-glyph in coral: "Goal — reduce gradually"
— a tiny flat-illustrated watch-glyph in amber: "Peak hour — 3:00 PM"
— a tiny flat-illustrated storm-cloud-glyph in plum: "Main trigger — stress"

Below the info card, a soft vertical list of menu items, each a frosted-glass row with a small glyph on the left and a small rightward arrow on the right:
— pencil glyph: "Edit profile"
— bell glyph: "Notifications"
— small-heart + credit glyph: "Subscription · Premium · $79.99/yr"
— gear glyph: "Settings"
— soft-speech-bubble glyph: "Support"
— small book-glyph: "Privacy"
— small scroll glyph: "Terms"

Below the list, whisper sans centered: "v0.9.0".

Very bottom: minimal frosted tab bar — home, curriculum, progress, profile (active, coral). SOS pill floats above-right.

Primary Design Surface: App.
```

---

## 2.4.2 Settings

```
Sugar Quit settings. Quiet list, no drama.

Mood & visual identity: dawn gradient, softest and calmest. Grouped lists with breathing air between sections.

One screen. The quiet desk.

Top: small leftward arrow-glyph, centered small serif italic "Settings".

Below, three grouped sections with tiny UPPERCASE TRACKED section labels:

NOTIFICATIONS (honey label): a soft frosted-glass grouped list of four rows:
— "Morning check-in · 08:00" · small toggle, filled coral
— "Daily lesson · 09:30" · toggle filled coral
— "Motivation of the day · random" · toggle filled coral
— "Streak at risk · 21:00" · toggle filled coral

ACCOUNT (peach label): a frosted-glass grouped list:
— "Email · s***@gmail.com" with a small rightward arrow
— "Change password" with arrow
— "Restore purchases" with arrow

DATA (sage label): a frosted-glass grouped list:
— "Export my data" with arrow
— "Delete account" in soft warning-coral with arrow

ABOUT (plum label): a frosted-glass grouped list:
— "Privacy Policy" with arrow
— "Terms of Service" with arrow
— "Version 0.9.0" in whisper grey

Very bottom: no tab bar — modal-style full screen.

Primary Design Surface: App.
```

---

## 2.4.3 Edit Profile

```
Sugar Quit edit profile. A quiet revision of the title page.

Mood & visual identity: dawn gradient. A soft form with editable fields floating on the gradient, each a frosted-glass input line with a hair-thin warm-honey underline.

One screen. The revision.

Top: leftward arrow-glyph, small serif italic "Edit profile" centered. On the right, a small "Save" text-link in coral italic serif, only visible when a change has been made.

Centered, upper third: a circular avatar in a warm honey frosted-glass ring. Beneath the avatar in whisper sans italic: "Change photo" — underlined.

Below, a soft vertical stack of labeled frosted-glass input lines:
— "Name" tiny UPPERCASE TRACKED honey label above; below, a frosted-glass line with "Sarah" in medium italic serif.
— "Goal" label; below, a frosted-glass row showing "Reduce gradually" in thin sans with a tiny rightward arrow-glyph (taps to change).
— "Peak hour" label; below, a frosted-glass row showing "3:00 PM" in thin sans with tiny arrow.
— "Main trigger" label; below, a frosted-glass row showing "Stress" in thin sans with tiny arrow.
— "Motivation" label; below, a frosted-glass line showing "Clearer energy, no 3pm crash" in thin sans italic, soft pencil-glyph on the right.

Bottom: a soft "Cancel" text-link in whisper on the left, a saturated coral-to-amber "Save changes" pill on the right.

Primary Design Surface: App.
```

---

# 3. Core Features

## 3.1 SOS AI Chat ⭐

```
Sugar Quit SOS. The core. The companion in the exact moment your hand hovers above the cupboard.

Mood & visual identity: the gradient condenses into a quiet warm room — deep honey at the top, warm coral through the middle, pale amber at the base. The screen is holding you. The SOS is not a panic button — it is a room.

The AI coach's presence IS the anchor — not an avatar, but a soft warm glow behind the first message, as if a small warm lamp is on in the room. Messages drift in on the gradient. No hurry. No typing race.

Typography is editorial and kind — medium italic serif for the AI's opening lines, clean thin sans for the body of responses, whisper sans for the user's messages, tiny UPPERCASE TRACKED "COACH IS HERE" header label.

One screen. The warm room.

Top: a very small leftward arrow-glyph on the left, tiny UPPERCASE TRACKED coral "COACH IS HERE" centered, small "End" text-link in whisper sans on the right.

Beneath the header, a hair-thin warm-honey horizontal line.

Below the line, a tiny whisper sans disclaimer centered: "This is a companion, not a medical advisor."

Below the disclaimer, the conversation begins:

AI opening message — a frosted-glass bubble on the left that subtly picks up the warm honey glow of the gradient behind it, text in medium italic serif: "I feel you reached out. That matters already. What's in your hand right now — or in your mind?" A tiny soft-ember coral glyph in the bubble's corner.

User reply — a small pale whisper-glass bubble on the right, clean thin sans: "3pm. Chocolate bar. Meeting just ended."

AI response — another frosted-glass bubble on the left, glowing warm honey: a medium italic serif opening line "This is textbook cortisol dip + post-meeting release. Not weakness." Followed by a thin body paragraph: "Before the chocolate — would you try one of these for two minutes?" Then a small list with soft coral dot-glyphs: "— a handful of almonds + one square of 85% dark · — stand up and walk for three minutes · — a glass of water with lemon, slowly."

User reply — whisper-glass bubble on the right: "The walk."

AI response — warm bubble: "Good. I'll be here. Come back in three minutes and tell me what you noticed."

At the very bottom, the input: a frosted-glass pill spanning the screen width, a coral-in-whisper placeholder "tell me what you're feeling…" in italic serif. On the right inside the pill, a small saturated coral-to-amber send-orb with a gentle glow — the only fully-saturated element in the lower half.

Primary Design Surface: App.
```

---

## 3.2.1 Check-in — Sugar Status

```
Sugar Quit daily check-in, step 1 of 3. The honest first question of the evening.

Mood & visual identity: evening gradient — soft plum at the top, cool mint through the middle, pale cream at the base. This screen is closing the day.

The three options are stone-cards arranged vertically with wide air. Non-judgmental. The selected card warms into saturated coral-to-amber briefly before the screen advances.

One screen. The quiet ask.

Top: small leftward arrow-glyph, centered small serif italic "Daily check-in · 1 of 3". On the right, tiny UPPERCASE TRACKED in whisper "TONIGHT".

Hero centered: "How did" in clean sans on one line, "the day go?" in massive italic serif on the next. Whisper subtitle: "Honest only. No streak is worth a lie."

Below the hero, three large frosted-glass stone-cards stacked with wide air between:

Card 1 — mint-tinted frosted-glass: a flat-illustrated gentle-wave glyph in sage + mint on the left. Medium italic serif: "Sugar-free." Whisper body: "Whole day. Added nothing."

Card 2 — peach-tinted frosted-glass: a flat-illustrated small-drop glyph in peach + honey on the left. Medium italic serif: "Had a little." Whisper body: "A bit. Deliberate or small."

Card 3 — deeper coral-tinted frosted-glass: a flat-illustrated soft-swirl glyph in coral on the left. Medium italic serif: "Lost the thread." Whisper body: "A full return. That's data, not failure."

No button. A tap on a card advances the screen.

Very bottom: a thin row of three whisper dots — the first one coral (current step), the other two outlined.

Primary Design Surface: App.
```

---

## 3.2.2 Check-in — Mood

```
Sugar Quit check-in, step 2 of 3. The softer question after the honest one.

Mood & visual identity: evening gradient, even calmer — pale lavender above, soft mint below. The screen has space to breathe.

One screen. The mood question.

Top: centered small serif italic "Daily check-in · 2 of 3".

Hero centered, upper third: "How are you" in clean sans, "feeling tonight?" in massive italic serif. Whisper subtitle: "Tap the closest one."

Centered vertically, a soft horizontal row of five mood-glyphs — not emoji, flat-illustrated tiny face-tokens rendered in gentle palette:
— a wide-bright glyph in soft honey: "Great"
— a calm-smile glyph in peach: "Good"
— a neutral flat-line glyph in cream: "Okay"
— a soft-downturn glyph in pale lavender: "Low"
— a furrowed glyph in deep plum: "Rough"

Each glyph has a tiny whisper label beneath. On tap, the chosen one warms into a soft coral glow and the screen advances.

Very bottom: thin row of three dots — first filled coral, second coral (active), third outlined.

Primary Design Surface: App.
```

---

## 3.2.3 Check-in — Complete

```
Sugar Quit check-in, step 3 of 3. The quiet confirmation.

Mood & visual identity: evening gradient warming briefly at the bottom — a soft coral glow, like a lamp being lit. This is a small celebration, not a firework.

A massive streak number IS the anchor — thin italic serif, coral-to-amber gradient text fill, soft halo. The number has grown.

One screen. The lit lamp.

Top: no header — this screen is a quiet arrival.

Centered vertically:
— A soft flat-illustrated glyph of a small lantern with warm honey light in blush + honey tones, at the top.
— Tiny UPPERCASE TRACKED honey label: "DAY 8 · CHECK-IN COMPLETE".
— Massive thin italic serif "8" with coral-to-amber gradient text fill, soft radial halo behind.
— Below the number, a whisper sans line: "Days clean · streak intact."
— Below, a soft summary line in medium italic serif: "Sugar-free · mood: calm."
— Below that, a whisper italic serif quote: "Every day you answered is a sentence in your story."

Bottom: a saturated coral-to-amber "Back to today" pill with warm shadow.

Primary Design Surface: App.
```

---

## 3.3.1 Craving Logger — Quick Log

```
Sugar Quit craving logger. A quiet 10-second note when the wave passes.

Mood & visual identity: dawn gradient, calm. This screen is not an emergency — it is a journaling moment.

One screen. The short note.

Top: small leftward arrow-glyph, centered small serif italic "Log a craving". On the right, small "Save" text-link in whisper coral.

Hero upper third: "What happened?" in massive italic serif. Whisper subtitle: "A minute of honesty. No judgment."

Below the hero, three frosted-glass story-blocks stacked vertically:

Block 1 — INTENSITY (tiny UPPERCASE TRACKED honey label): a horizontal row of five rounded stones from small to large, filled in gradient whisper-peach to saturated coral. Tap the stone matching intensity — it warms into saturated coral. Beneath in whisper sans: "1 — barely there · 5 — couldn't think of anything else."

Block 2 — TRIGGER (tiny UPPERCASE TRACKED peach label): a soft horizontal wrap of trigger-chips — rounded frosted-glass pills with tiny flat-illustrated glyphs: "Stress" · "Boredom" · "After meal" · "Social" · "Emotion" · "Late night". Selected chips warm into saturated coral-to-peach.

Block 3 — OUTCOME (tiny UPPERCASE TRACKED sage label): two larger frosted-glass cards side by side:
— left card with sage tint: flat-illustrated small-standing-figure glyph in sage + mint, "Walked through it" in medium italic serif.
— right card with coral tint: flat-illustrated small-leaning-figure glyph in soft coral, "Gave to it" in medium italic serif. "This is data, not failure" in tiny whisper beneath.

Bottom: tiny whisper sans input line labeled "Notes (optional)" with a hair-thin underline. Followed by a saturated coral-to-amber "Save note" pill.

Primary Design Surface: App.
```

---

## 3.3.2 Craving Logged — Confirmation

```
Sugar Quit craving logged. A quiet acknowledgment.

Mood & visual identity: dawn gradient, with a warm soft pulse in the middle — the moment is held.

One screen. The quiet nod.

Centered vertically:
— A flat-illustrated small note-with-ribbon glyph in honey + coral at the top.
— Tiny UPPERCASE TRACKED honey label: "NOTED".
— Medium italic serif line: "Thank you for the honest note."
— Below in whisper sans: "Patterns are being quietly learned. Your next forecast will know more."

Bottom: a saturated coral-to-amber "Back to today" pill.

Primary Design Surface: App.
```

---

## 3.4 Share Card

```
Sugar Quit share card. A shareable editorial moment — designed for Instagram stories, not a trophy shot.

Mood & visual identity: the gradient in its most complete form — cream at top, warming through peach and coral, cooling into mint-lavender at the base. Portrait 9:16. The card is the whole screen, edge to edge.

One screen. The magazine cover.

Top: small exhale-glyph + "Sugar Quit" in whisper sans centered.

Upper-third: tiny UPPERCASE TRACKED warm honey label "MY 30-DAY WALK".

Hero: "30 days" in massive thin italic serif, with coral-to-amber gradient text fill, soft halo. Below in medium italic serif: "quieter with sugar."

Below the hero, three quiet stats in a soft horizontal row, each a story-number:
— "42" thin serif, tiny UPPERCASE TRACKED beneath: "CRAVINGS WALKED THROUGH"
— "$72" thin serif, tiny UPPERCASE TRACKED: "SAVED"
— "1,800g" thin serif, tiny UPPERCASE TRACKED: "SUGAR NOT EATEN"

Middle: a flat-illustrated scene — a small winding path into warm honey sunset, with a single sprout at the current position in saturated coral.

Lower-middle: a whisper italic serif line centered: "One stone at a time."

Very bottom: tiny whisper sans attribution: "sugar-quit.app".

Below (outside the share frame, in the sharing UI): three small share-action pills — "Save image", "Share to Instagram", "More…"

Primary Design Surface: App.
```

---

# 4. Modals & Overlays

## 4.1 Paywall Modal (Repeat, Contextual) ⭐

```
Sugar Quit paywall modal — triggered when a free user taps a premium feature. Contextual, not a wall. A quiet "here's why it's worth it" page.

Mood & visual identity: the background blurs to a warm honey fog; the modal rises as a frosted-glass surface with a coral-to-amber glow halo. Gentle. Not nagging.

One modal surface. The gentle ask.

Top: a tiny "×" in whisper sans at top-right.

Centered, upper third: tiny UPPERCASE TRACKED warm honey label "UNLIMITED SOS".

Hero: "You've used" in clean sans, "3 of 3 free SOS" in medium italic serif, "this month." Whisper subtitle: "And you walked through 2 of 3. That's a real muscle."

Below the hero, a short list of three small story-lines in thin sans with tiny coral dot-glyphs:
— "Unlimited SOS, any hour"
— "Full 90-day program unlocks"
— "Trigger prediction, tuned to your 3pm"

Below the list, two small pricing cards side-by-side:
— left — plain frosted-glass: "$9.99 / month" in thin sans, whisper "Switch anytime."
— right — frosted-glass with glowing coral-to-amber border halo: "$79.99 / year" in thin sans, "save 44%" whisper beneath, a tiny check-glyph in the corner.

Bottom: a saturated coral-to-amber "Try 7 days free" pill with warm shadow. Beneath it, a whisper text-link "Not now."

Primary Design Surface: App.
```

---

## 4.2 Streak Freeze Modal

```
Sugar Quit streak freeze. The forgiveness modal — offered when a check-in is missed.

Mood & visual identity: the background blurs to pale plum-mist. The modal rises as a soft mint-tinted frosted-glass card. Cool, patient, not dramatic.

One modal surface. The forgiveness.

Centered card:

Tiny UPPERCASE TRACKED honey label at the top: "YESTERDAY".

Medium italic serif headline: "You missed a check-in."

A thin whisper sans paragraph: "Use one of your Streak Freezes to keep your 8-day streak intact. You have 1 freeze this week."

Below the paragraph, a small flat-illustrated scene — a soft snowflake turning into a warm ember in mint + coral tones.

Below the illustration, two pills stacked:
— top — saturated coral-to-amber "Use Streak Freeze" pill with warm shadow.
— bottom — whisper text-link in clean sans: "Let the streak reset. Tomorrow is Day 1."

Primary Design Surface: App.
```

---

## 4.3 Milestone Celebration Modal ⭐

```
Sugar Quit milestone celebration. The quiet fireworks — when 7, 14, 30, 60, or 90 days is reached.

Mood & visual identity: the background blurs to warm honey light. The modal rises as a frosted-glass card with a slow, soft coral-to-amber glow halo. The celebration is warm, not loud. Confetti is soft rose petals, not glitter.

The milestone number IS the anchor — a massive thin italic serif number with a coral-to-amber gradient text fill and a radial halo. The number is the hero.

One modal surface. The slow fireworks.

Centered card:

Near the top, a soft scatter of flat-illustrated rose petals and small gradient dots drifting slowly down — the gentle confetti.

Tiny UPPERCASE TRACKED warm honey label: "A MILESTONE".

Massive thin italic serif "30" with coral-to-amber gradient text fill, soft halo.

Below the number, a medium italic serif phrase: "days sugar-free."

A thin horizontal divider in whisper honey.

Below the divider, three small story-numbers in a horizontal row, each a thin italic serif digit with a tiny UPPERCASE TRACKED whisper label beneath:
— "42 · CRAVINGS MET"
— "$72 · SAVED"
— "1,800g · AVOIDED"

Below, a whisper italic serif line: "You placed a large stone today. The next is 30 days further along the path."

Bottom: two pills stacked:
— top — a frosted-glass "Share this chapter" pill.
— bottom — a saturated coral-to-amber "Back to today" pill with warm shadow.

Primary Design Surface: App.
```

---

## 4.4 Craving Defeated Modal

```
Sugar Quit craving defeated. The small warm nod after a successful SOS.

Mood & visual identity: background fades to warm coral fog. Modal is a soft frosted-glass card that glows coral-to-amber from within.

One modal surface. The warm nod.

Centered card:

A flat-illustrated small shield-to-sprout glyph at the top in coral + sage.

Tiny UPPERCASE TRACKED coral label: "CRAVING MET, WALKED THROUGH".

Medium italic serif: "One more stone on the path."

Whisper sans beneath: "That's 3 this week. 42 total."

Bottom: a saturated coral-to-amber "Close" pill with warm shadow.

Primary Design Surface: App.
```

---

## 4.5 SOS Post-Session Modal ⭐

```
Sugar Quit SOS post-session. The soft closing question after a chat. Always three options. Always non-judgmental.

Mood & visual identity: the chat background settles into a warm peach-to-coral gradient. The modal is a soft frosted-glass card that holds the three options with equal warmth — none of them is wrong.

One modal surface. The honest closing.

Centered card:

A flat-illustrated small shield + medal glyph in coral + honey at the top — quiet, not triumphant.

Tiny UPPERCASE TRACKED warm honey label: "HOW ARE YOU NOW?".

Medium italic serif headline: "Any answer is a good answer."

Three stone-cards stacked vertically with wide air between:
— sage-tinted frosted-glass: a flat-illustrated small check-mark-in-circle glyph in sage. Medium italic serif "I walked through it." Whisper body: "The wave passed. I'm okay."
— peach-tinted frosted-glass: a flat-illustrated small soft-breath glyph in peach. Medium italic serif "Better, but still there." Whisper body: "Softer. I'll stay a while."
— coral-tinted frosted-glass: a flat-illustrated small released-cord glyph in soft coral. Medium italic serif "I gave to it." Whisper body: "That's data. Still proud you reached out."

Bottom: a whisper italic serif line centered: "Every answer is the right one."

Primary Design Surface: App.
```

---

## 4.6 Rate App Modal

```
Sugar Quit rate app modal — shown after first milestone (Day 7+).

Mood & visual identity: dawn gradient softened into a background fog. Modal is a soft honey-tinted frosted-glass card.

One modal surface. The quiet ask.

Centered card:

A flat-illustrated small open-hand holding a warm-honey sun glyph at the top.

Tiny UPPERCASE TRACKED honey label: "A SMALL ASK".

Medium italic serif: "You've walked 7 days. Would you rate us?"

Whisper sans: "It helps others find this quiet walk."

Below, five rounded pale stones in a horizontal row — tap-targets for a 1–5 rating. The stones warm into honey as tapped.

Below, two small text-links stacked:
— saturated coral-to-amber "Leave a review on the App Store" pill.
— whisper sans "Maybe later" text-link.

Primary Design Surface: App.
```

---

## 4.7 Push Re-Permission Banner

```
Sugar Quit push re-permission banner — appears at the top of Home if push was previously declined.

Mood & visual identity: a thin frosted-glass band across the very top of the Home screen, warm-honey tinted, with a tiny soft pulse of coral on the left.

One banner. The second chance.

Thin horizontal frosted-glass band at the top edge, cream-to-honey gradient.

Inside the band, left-aligned: a tiny flat-illustrated bell glyph in coral with a small pulse ring around it. Beside in thin sans: "Want predictions of your 3pm craving?" In smaller whisper serif italic beneath: "One push per day. No noise."

Right-aligned inside the band: a small saturated coral-to-amber "Turn on" pill. Beside it, a tiny "×" in whisper.

Primary Design Surface: App.
```

---

## 4.8 Disclaimer Modal

```
Sugar Quit disclaimer — shown on first SOS tap.

Mood & visual identity: background fogs to warm cream. Modal is a soft peach-tinted frosted-glass card, understated.

One modal surface. The quiet fine-print.

Centered card:

A flat-illustrated small open-book glyph in honey + sage at the top.

Tiny UPPERCASE TRACKED warm honey label: "BEFORE WE TALK".

A thin paragraph in medium italic serif: "Sugar Quit is a companion, not a medical advisor."

Whisper sans beneath: "If you're dealing with diabetes, disordered eating, or any medical condition — please see a doctor too. The SOS is here beside your care, not in place of it."

Bottom: a saturated coral-to-amber "I understand — let's talk" pill.

Primary Design Surface: App.
```

---

# 5. System Screens

## 5.1 Splash Screen

```
Sugar Quit splash — the first breath of the app opening.

Mood & visual identity: the whole screen is the dawn gradient at its softest — cream fading into pale peach and ending in mint at the base. A single centered logo breathes.

One screen. The breath.

Centered vertically: a flat-illustrated exhale-glyph (a small curved leaf, or a soft wave, or a gentle smoke-breath) rendered in saturated coral-to-amber with a soft halo, medium size. Beneath it, "Sugar Quit" in medium thin italic serif. Nothing else on the screen. No loading spinner. No tagline.

Primary Design Surface: App.
```

---

## 5.2 Loading Screen (Generic)

```
Sugar Quit generic loading state — skeleton placeholders for a screen being fetched.

Mood & visual identity: dawn gradient at half opacity. Content skeletons are frosted-glass shapes with a slow breathing shimmer — not a bar, not a spinner. A faint honey shimmer moves across the surfaces like cloud shadow.

One screen. The breath between.

Layout mimics the target screen (home, progress, etc.) but every text block is a soft frosted-glass rectangle in whisper-honey tone, every number a rounded blur, every illustration a ghosted outline. A slow honey-coral shimmer drifts diagonally across the placeholders every 2 seconds.

No text. No label. Just the quiet breath.

Primary Design Surface: App.
```

---

## 5.3 No Internet Screen ⭐

```
Sugar Quit no-internet state. The app acknowledges the absence, but keeps what's cached, and offers a breathing tool in place of SOS.

Mood & visual identity: the gradient cools slightly — less coral, more plum — a moment of quiet distance. Not broken. Just offline.

The breathing-tool card IS the anchor — a frosted-glass card in saturated coral-to-amber that does what SOS can't do offline: offer a three-step breath.

One screen. The offline room.

Top: a thin whisper band across the very top — a small flat-illustrated broken-thread glyph on the left, in whisper sans: "Offline — cached view." No dramatic error colors.

Below the band, tiny UPPERCASE TRACKED warm honey label: "STILL WITH YOU".

Hero: "The internet" in clean sans, "is quiet today." in medium italic serif. Whisper subtitle: "Here's what's still here."

Below the hero, two small frosted-glass cards side-by-side showing cached data:
— left (honey-tinted): a massive thin italic serif "8" with coral gradient text, tiny UPPERCASE TRACKED below "DAYS CLEAN · CACHED".
— right (sage-tinted): "Day 8 lesson — cached" in medium italic serif, whisper "Tap to read offline."

Below these two, the anchor card — a large saturated coral-to-amber frosted-glass breathing card:
Tiny UPPERCASE TRACKED "IN PLACE OF SOS". Medium italic serif: "Three breaths, slowly." A soft list in thin sans:
— "Inhale four counts. Your chest lifts."
— "Hold two counts. Notice the pause."
— "Exhale six counts. Longer than the inhale."
A whisper italic serif line beneath: "Do this three times. The urge softens."

Bottom: a small frosted-glass "Try again" pill in whisper sans.

Primary Design Surface: App.
```

---

## 5.4 Force Update Screen

```
Sugar Quit force-update screen — shown when app version is too old to continue.

Mood & visual identity: dawn gradient softened. A single editorial message, no alarm.

One screen. The gentle nudge.

Centered vertically:
— Tiny UPPERCASE TRACKED honey label: "SOFT UPDATE".
— A small flat-illustrated turning-leaf glyph in honey + sage at the top.
— Medium italic serif: "Sugar Quit has grown."
— Whisper sans: "This version is older than the walk allows. Please update to continue. Your streak and data are safe."

Bottom: a saturated coral-to-amber "Open App Store" pill with warm shadow.

Primary Design Surface: App.
```

---

## 5.5 Maintenance Screen

```
Sugar Quit maintenance screen — shown briefly during backend updates.

Mood & visual identity: the gradient rests at its coolest — pale mint throughout, with a very soft coral pulse in the center.

One screen. The tea break.

Centered vertically:
— A flat-illustrated small teapot-with-soft-steam glyph in peach + sage at the top.
— Tiny UPPERCASE TRACKED honey label: "BRIEF PAUSE".
— Medium italic serif: "We're tending to the garden."
— Whisper sans: "Back in a few minutes. Your streak, lessons, and history are safely waiting."

Bottom: whisper sans only, centered: "Try again shortly."

Primary Design Surface: App.
```

---

# Checklist & Tips

## Before you paste a prompt

1. `design.md` from §0 must be in the Stitch project.
2. Select **Pro (Gemini 2.5 Experimental)** for ⭐ screens (Welcome, Motivational 1 & 2, Loading, Result, Paywall, Home, Curriculum Overview, Lesson, Progress Overview, SOS Chat, Milestone, Post-SOS, No Internet). Flash for the rest.
3. Copy the prompt from the first line to `Primary Design Surface: App.` — nothing more, nothing less.
4. No reference images. The design language carries through words.

## If a screen comes back "generic wellness SaaS"

- The atmosphere block is too short. Add one more sentence of bodily-moment metaphor at the top.
- You mentioned chart types, pixel sizes, or font names. Remove them.
- You used UPPERCASE TRACKED for normal text. Reserve it only for tiny section labels.

## If a screen comes back "flat and boring"

- The anchor isn't saturated enough. Name the anchor element explicitly as "the only fully-saturated surface on the screen".
- The cards are too flat. Re-read the card rule: "frosted-glass surfaces that pick up the color of the gradient beneath them."

## If a screen comes back "too dashboard-y"

- You listed too many elements. Cut to 4-6 story-sections with air between.
- Each section needs a personality ("Calm", "High surge", "The exhale") — not a generic label.

## After generation

- Export each screen at 2x from Stitch (Figma or PNG).
- Stage them in order in Figma — you'll see immediately if the gradient narrative is consistent.
- If two neighboring screens clash, rerun one of them with an added sentence tying its gradient to the previous screen's exit palette.

---

*~35 screens. One editorial language. One long gradient. The path at dusk.*

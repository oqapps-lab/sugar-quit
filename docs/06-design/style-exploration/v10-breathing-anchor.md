# Sugar Quit — Breathing Anchor screen (formula-filled example)

**Экран:** Grounding tool, открывается по тапу SOS во время тяги. Функция: провести через breathing exercise чтобы разорвать craving loop.
**Референс-качество:** Zen Editorial (breathing app) — одиночный screen с hero orb + techniques + intensity + mood check.
**Цель:** проверить что FORMULA.md даёт работающий промпт на экране с другим концептом, чем Home/Forecast.

---

## Промпт

```
Sugar Quit — AI craving coach. Real-time breathing anchors during cravings, guided grounding techniques, in-the-moment support when the urge arrives. For the moment your hand hovers above the cupboard — that split-second pause where you can still turn away.

Mood & visual identity: imagine the four-second gap between wanting and wanting-less — that tiny space where you can step out of the craving and into your breath. This app lives in that four-second gap. The palette slows — pale sage settling into deep forest-green at the core, warm cream lifting into soft blush at the edges, like the inside of a seashell where sound rests. The colors hold still more than they move. A single radiating orb IS the interface — expanding with the inhale, contracting with the exhale — time becomes breath instead of a progress bar.

One hero presence at the center of the screen, everything else orbits it at respectful distances. The breathing orb is the world. Technique names rest below it like small quiet siblings. Intensity options sit in a row further down like stones placed along a path. The mood check waits patiently at the far bottom, a gentle question after the breath has happened.

The breathing orb's size pulses with the count — larger on the inhale, smaller on the exhale. Its softness shows technique depth — a gentle glow for beginner techniques, a deeper saturation for advanced. Color temperature matches emotional purpose — sage green for coherent breathing, warm amber for focus, soft cool blue for sleep.

The orb is the anchor — a single large radial-gradient presence in the upper third of the screen, glowing outward from a deep sage core into pale mint edges that dissolve into the background, with the inhale count "4s" sitting precisely inside its center in minimal serif. The orb is the only element with real luminance. "Match me. I'll hold you."

Typography is still and minimal. Numbers are the heroes — the breath count, the session timer, the minutes today, the days practiced — large thin serif for the hero counts, clean thin sans for labels, whisper-weight for descriptions. Numbers exist in patient stillness, casting no shadow.

One screen. The session: the quiet room of the breath.

The breathing orb at the upper third — radiating sage, pulsing slow, with "Inhale / 4s" in minimal serif inside its core. A tiny row of four carousel dots beneath it, the first one active.

Below the orb, a single UPPERCASE TRACKED label in muted tone: "BOX BREATHING."

Beneath it, the session timer — "4:32" in large thin serif, with a thin horizontal line divider beneath marking time flowed.

Below the timer, three breathing techniques resting like tools on a quiet shelf, each a row: a small wave glyph + "Coherent" + a whisper line "Balancing heart rate variability." A small square-wave glyph + "Box Breathing" + "Focus and stress reduction." A longer wave glyph + "4-7-8" + "Natural tranquilizer for sleep."

Below the techniques, three intensity stones in a horizontal row — Gentle / Balanced / Deep — small circular presences with a soft sage fill on the chosen one (Deep), hollow outlines on the others.

Below that, three small family-glyphs as a tight row — a wind curl, a water ripple, a soft cloud — each a thin-stroked circular token, the chosen one ringed in sage.

Toward the bottom, the minutes-today count as a quiet hero number — "12" in thin serif, with "MINUTES TODAY" in tiny UPPERCASE TRACKED beneath, and a gentle horizontal wave-line underneath marking time as a small river that flowed today.

At the very bottom of the content area, a soft mood check — "How do you feel?" in minimal sans — with three small emoji-circles ascending from heavy to light (furrowed / neutral / gentle-smile), the chosen one softly glowing sage.

The minimal tab bar at the very base: four whisper icons — wind / timer / session (center, slightly larger, sage-filled, anchored) / settings. The session icon is the hero of the bar.

Primary Design Surface: App.
```

---

## Какой слот формулы чем заполнен

| Слот | Заполнено |
|---|---|
| **Identity + moment** | "For the moment your hand hovers above the cupboard — that split-second pause" |
| **Mood via bodily moment** | "the four-second gap between wanting and wanting-less" |
| **Palette via nature metaphor** | "like the inside of a seashell where sound rests" |
| **X-instead-of-Y** | "time becomes breath instead of a progress bar" |
| **Functional aesthetic** | "orb size pulses with the count"; "softness shows technique depth"; "temperature matches emotional purpose" |
| **Anchor with voice** | "The orb is the anchor... 'Match me. I'll hold you.'" |
| **Typography by role** | "thin serif for hero counts, thin sans for labels, whisper-weight for descriptions" |
| **Numbers as heroes** | "the breath count, the session timer, the minutes today" |
| **Elements as metaphor-objects** | "tools on a shelf", "stones along a path", "family-glyphs", "small river that flowed today" |
| **Mini-mechanics** | "orb size pulses with count"; "chosen intensity in sage fill, others hollow outlines" |
| **Scene composition** | "The quiet room of the breath" + "orb at upper third / techniques below like siblings / intensity stones further down / mood check waits at the far bottom" |
| **Closer** | `Primary Design Surface: App.` |

---

## Отличие от The Exhale (не копия оригинального промпта)

| The Exhale (Home/Forecast) | Breathing Anchor (этот) |
|---|---|
| Atmospheric screen-wide gradient narrating the day (cream → coral → mint) | Single hero orb at center; palette settles (не moves) |
| 3 time-zone cards (morning / peak / evening) | 1 central orb + tools-on-shelf + path-of-stones |
| Color as forecast temperature | Color as technique emotional purpose |
| Hero word: "Light" (weather) | Hero count: "4s" (breath) |
| Anchor: SOS coral pill | Anchor: breathing orb itself |
| Landscape composition (morning/peak/evening arc) | Quiet-room composition (center + respectful orbits) |

Те же 13 правил формулы, разный контент, разная атмосфера, разная сцена.

---

## Что проверить в результате

- Orb настоящий radial gradient (не flat circle), с реальным glow
- Палитра settles в sage/mint/blush (не скачет и не клэшит)
- Technique rows выглядят как "tools on a shelf" — спокойный вертикальный ритм
- Три intensity stones чётко отличаются (chosen vs rest)
- "12 MINUTES TODAY" — большая thin-serif цифра как quiet hero
- Mood check три emoji внизу, chosen glows
- Tab bar минимальный, session-icon по центру выделен
- Везде stillness — не "bold presentation", а "quiet room"

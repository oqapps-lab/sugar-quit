# Sugar Quit

AI-powered sugar addiction coach. "Reframe for sugar." SOS button for craving moments → AI conversation. Predicts YOUR triggers (time, stress, location). Daily check-ins, streaks, "eat this instead" alternatives, 90-day curriculum.

## Stack
- Expo SDK 55, React Native, TypeScript (strict)
- expo-router (file-based routing)
- Supabase (auth, database, storage)
- Adapty (subscriptions)
- Claude API / OpenAI API (SOS craving conversations, trigger prediction)

## Getting started

### Clean clone (first-time setup)
```bash
npm install --legacy-peer-deps   # reanimated@4 peer conflict — legacy flag required
cp .env.example .env              # fill in real keys (or leave placeholders — app runs in demo mode)
npx expo start                    # opens Metro, press `i` for iOS simulator
```

### On your feature branch (student workflow)
```bash
git checkout feature/<your-github-handle>
git fetch origin
git merge origin/main             # pull the latest scaffold + fixes
# (conflicts should only hit files you touched; docs/ changes merge cleanly)
npm install --legacy-peer-deps
npx expo start
```

### Common issues
- **`expo-haptics` plugin resolver error** — already removed from `app.json`
  plugins; if you re-added it, take it out (it's a runtime API, not a config
  plugin).
- **TurboModule `PlatformConstants` error in Expo Go** — versions out of
  sync. Run `npx expo install --check` then `npx expo install --fix`.
- **Port 8081 already in use** — another Metro is running. Start on an
  alternate port: `npx expo start --port 8082`.
- **Hard keyboard prevents software keyboard from appearing in the sim** —
  iOS Simulator menu → I/O → Keyboard → toggle off "Connect Hardware
  Keyboard".

### Port convention (if you run multiple oqapps-lab projects in parallel)
Sugar Quit defaults to 8081. If taken, 8082. Check `lsof -iTCP:8081`.

## Project structure
See `CLAUDE.md` for the full architectural rules and the 3-layer layout system.

Documentation lives in `/docs/`:
- `01-research/` — market research, competitors, personas, domain research, research brief
- `02-product/` — product vision, features, problem-solution fit, audience, monetization
- `03-practices/` — onboarding/paywall/retention/ASO research + practices brief
- `04-ux/` — screen map, user flows, wireframes, UX spec, funnel
- `05-database/` — DB schema, migrations, RLS policies
- `06-design/` — Stitch outputs, design system, screenshots
- `07-development/` — implementation notes, guides
- `08-deployment/` — store listings, release notes

## Current stage
Design (Stage 6) — дизайн-система собрана из 12 Stitch-экранов, 4 экрана реализованы в RN.

## Screens (implemented)
- `app/index.tsx` — **Home** (Daily Wellness Weather — forecast cards, streak hero, SOS FAB)
- `app/sos.tsx` — **SOS: Breathe** (pulsing breathing circle, physical anchor card)
- `app/progress.tsx` — **Progress: 90-Day Horizon** (dark mode, timeline with current node)
- `app/profile.tsx` — **Craving Profile** (result page — Stress Eater 3pm crash)

## Design system
- `constants/tokens.ts` — colors, radius, fonts, gradients, shadows, spacing, tracking
- `components/ui/` — `AtmosphericGradient`, `GlassCard`, `PillCTA`, `SOSFab`, `TokenDot`, `GradientText`, `BottomNav`
- `docs/06-design/DESIGN-TOKENS.md` — full extraction with resolved conflicts (15 rejected drifts documented)
- `docs/06-design/PROMPTS-ALL-SCREENS.md` — 35+ editorial prompts for remaining screens
- `docs/06-design/stitch-export/` — 12 source PNGs + HTML + metadata


# Sugar Quit

AI-powered sugar addiction coach. "Reframe for sugar." SOS button for craving moments → AI conversation. Predicts YOUR triggers (time, stress, location). Daily check-ins, streaks, "eat this instead" alternatives, 90-day curriculum.

## Stack
- Expo SDK 55, React Native, TypeScript (strict)
- expo-router (file-based routing)
- Supabase (auth, database, storage)
- Adapty (subscriptions)
- Claude API / OpenAI API (SOS craving conversations, trigger prediction)

## Getting started
```bash
npm install
cp .env.example .env  # fill in real keys
npm start
```

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


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
Development (Stage 6 complete) — design system built, all core screens implemented in React Native.

## Screens

### Onboarding
| Screen | File |
|---|---|
| Welcome | `app/(onboarding)/welcome.tsx` |
| Quiz: Name | `app/(onboarding)/quiz/name.tsx` |
| Quiz: Goal | `app/(onboarding)/quiz/goal.tsx` |
| Quiz: Sugar intake | `app/(onboarding)/quiz/consumption.tsx` |
| Quiz: Peak time | `app/(onboarding)/quiz/peak-time.tsx` |
| Quiz: Triggers | `app/(onboarding)/quiz/triggers.tsx` |
| Quiz: Motivation | `app/(onboarding)/quiz/motivation.tsx` |
| Quiz: Past attempts | `app/(onboarding)/quiz/past-attempts.tsx` |
| Quiz: Work environment | `app/(onboarding)/quiz/work-environment.tsx` |
| Result | `app/(onboarding)/result.tsx` |
| Paywall | `app/(onboarding)/paywall.tsx` |

### Main tabs
| Screen | File |
|---|---|
| Home | `app/(tabs)/home.tsx` |
| Curriculum (90-day path) | `app/(tabs)/curriculum/index.tsx` |
| Curriculum: Day detail | `app/(tabs)/curriculum/[day].tsx` |
| Progress | `app/(tabs)/progress/index.tsx` |
| Progress: Milestones (Your Stones) | `app/(tabs)/progress/milestones.tsx` |
| Progress: Weekly chart | `app/(tabs)/progress/weekly.tsx` |
| Profile | `app/(tabs)/profile/index.tsx` |
| Profile: Edit | `app/(tabs)/profile/edit.tsx` |
| Profile: Settings | `app/(tabs)/profile/settings.tsx` |

### Modals
| Screen | File |
|---|---|
| Daily Check-in | `app/(modals)/checkin.tsx` |
| SOS Coach (chat) | `app/(modals)/sos.tsx` |
| Post-SOS reflection | `app/(modals)/post-sos.tsx` |
| Milestone celebration | `app/(modals)/milestone.tsx` |
| Streak freeze | `app/(modals)/streak-freeze.tsx` |
| SOS disclaimer | `app/(modals)/disclaimer.tsx` |
| Craving log | `app/(modals)/craving-log.tsx` |
| Paywall (contextual) | `app/(modals)/paywall-contextual.tsx` |
| Forecast window | `app/(modals)/forecast-window.tsx` |
| Rate app | `app/(modals)/rate-app.tsx` |

## Design system
- `constants/tokens.ts` — colors, radius, fonts, spacing, type scale
- `constants/curriculum.ts` — 90-day lesson data (shared between Home and Curriculum screens)
- `components/primitives/` — `Txt`, `Card`, `Eyebrow`, `PillCTA`, `AppHeader`, `Stat`, `Divider`
- `components/ui/` — `AtmosphericGradient`, `BottomNav`, `SOSFab`, `StreakOrb`, `TokenDot`
- `docs/06-design/DESIGN-GUIDE.md` — full design system reference

## Development
See [`docs/07-development/RUN-LOCAL.md`](docs/07-development/RUN-LOCAL.md) for setup and run instructions.


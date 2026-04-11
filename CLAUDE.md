# Sugar Quit

## Stack
- Expo SDK 55, React Native, TypeScript strict
- expo-router (file-based routing)
- Supabase (auth, database, storage)
- Adapty (subscriptions)
- Claude API / OpenAI API (SOS craving conversations, trigger prediction)

## About
AI-powered sugar addiction coach. "Reframe for sugar." SOS button for craving moments → AI conversation that talks you through it. Predicts YOUR triggers (time, stress, location). Daily check-ins, streaks, community support, "eat this instead" alternatives, 90-day curriculum.

## Target Audience
- Office workers who stress-eat sugar (primary: "Stress Sarah")
- Pre-diabetics scared by health numbers ("Pre-Diabetic Paul")
- Social media health enthusiasts doing challenges ("Challenge Chloe")

## Current Stage
Research (Stage 3)

## Rules
- useWindowDimensions() for responsive
- useSafeAreaInsets() for safe areas
- Haptics.impactAsync() on buttons
- aspectRatio for images
- Mock data from /mock/ (NO real API until Stage 6)
- Functional components + TypeScript strict
- StyleSheet.create (no inline styles)
- No class components
- No any types

## 3-Layer Layout System
Each screen has three layers:
1. **Background** — absolute, gradients/images, NOT inside ScrollView
2. **Content** — flex/scroll, text, cards, interactive
3. **Floating UI** — absolute, bottom buttons/top header

## File Structure
- /app/ — screens (expo-router)
- /components/ui/ — shared UI components
- /components/[feature]/ — feature-specific components
- /constants/ — colors, fonts, layout
- /docs/ — all documentation
- /docs/01-research/ — market research + product brief

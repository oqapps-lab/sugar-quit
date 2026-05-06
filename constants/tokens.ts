/**
 * Sugar Quit — Design Tokens
 * Source: docs/06-design/stitch-raw/screenshots/ (visual inspection Apr 2026)
 */

export const colors = {
  // canvas — warm parchment background
  canvas: '#FEF9F0',

  // primary — coral (SOS button, streak ring, key accents)
  primary: '#FF6B6B',
  primaryDim: '#E55555',
  primaryContainer: '#FFD6D6',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#8B0000',
  inversePrimary: '#FF9B9B',

  // surface — white cards on canvas
  surface: '#FFFFFF',
  background: '#FEF9F0',
  surfaceBright: '#FFFFFF',
  surfaceDim: '#F0EBE0',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#FAF6EE',
  surfaceContainer: '#F5F0E8',
  surfaceContainerHigh: '#EDE8DF',
  surfaceContainerHighest: '#E5E0D7',
  surfaceVariant: '#E5E0D7',
  inverseSurface: '#1A1A1A',
  inverseOnSurface: '#9A9590',

  // on-surface — warm near-black text
  onSurface: '#2D2D2D',
  onSurfaceVariant: '#8A8580',
  onBackground: '#2D2D2D',
  outline: '#C5C0B8',
  outlineVariant: '#DDD8D0',

  // success — teal/mint (coach, sugar-free state)
  secondary: '#2EC4A0',
  secondaryDim: '#25A889',
  secondaryContainer: '#C0F0E8',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#00544A',

  // warning — amber (partial relapse)
  tertiary: '#FFAA33',
  tertiaryDim: '#E09020',
  tertiaryContainer: '#FFE8B0',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#7A4800',

  // error / full relapse
  error: '#FF6B6B',
  errorDim: '#E55555',
  errorContainer: '#FFD6D6',
  onError: '#FFFFFF',
  onErrorContainer: '#8B0000',

  // semantic aliases for readability
  success: '#2EC4A0',
  warning: '#FFAA33',
  textPrimary: '#2D2D2D',
  textSecondary: '#8A8580',
  chatBackground: '#EEF5F2',
} as const;

export const radius = {
  none: 0,
  sm: 16,      // 1rem — default cards
  md: 32,      // 2rem — larger cards
  lg: 48,      // 3rem — hero containers
  softSm: 20,  // 1.25rem — bento-grid mode only
  softMd: 36,  // 2.25rem — bento-grid mode only
  softLg: 52,  // 3.25rem — bento-grid mode only
  full: 9999,
} as const;

/**
 * Typography — modern mobile app.
 * No italic serif display (not a magazine).
 * Headline: Plus Jakarta Sans — confident geometric sans.
 * Body/label: Manrope — softer humanist sans, good for reading.
 */
export const fonts = {
  // Plus Jakarta Sans — for headlines, numbers, CTAs
  headlineLight: 'PlusJakartaSans_300Light',
  headlineRegular: 'PlusJakartaSans_400Regular',
  headlineMedium: 'PlusJakartaSans_500Medium',
  headlineSemibold: 'PlusJakartaSans_600SemiBold',
  headlineBold: 'PlusJakartaSans_700Bold',
  headlineExtraBold: 'PlusJakartaSans_800ExtraBold',
  // Backwards compat aliases
  headline: 'PlusJakartaSans_600SemiBold',
  // Manrope — body + labels
  bodyLight: 'Manrope_300Light',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodySemibold: 'Manrope_600SemiBold',
  label: 'Manrope_500Medium',
} as const;

/**
 * Type scale — sane mobile app sizes, not magazine.
 */
export const typeScale = {
  // Hero number — streak, big counts. Large but not absurd.
  heroNumber: 72,
  // Section hero — "Today is Light" on Home
  displayLarge: 36,
  displayMedium: 28,
  displaySmall: 22,
  // Card titles
  titleLarge: 20,
  titleMedium: 17,
  titleSmall: 15,
  // Body
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 13,
  // Labels
  label: 12,
  labelSmall: 10,
} as const;

export const opacity = {
  o5: 0.05,
  o10: 0.1,
  o20: 0.2,
  o30: 0.3,
  o40: 0.4,
  o50: 0.5,
  o60: 0.6,
  o70: 0.7,
  o80: 0.8,
  o90: 0.9,
} as const;

export const blur = {
  sm: 12,
  md: 16,
  lg: 24,
  xl: 40,
  xxl: 64,
} as const;

/**
 * Gradient definitions — use with expo-linear-gradient.
 * Atmospheric background is achieved by stacking 3 LinearGradients absolutely.
 */
export const gradients = {
  // Primary CTA pill — horizontal
  pillCta: {
    colors: ['#FF6B6B', '#FF8E8E'] as const,
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
  // SOS FAB — diagonal
  fab: {
    colors: ['#FF6B6B', '#E55555'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // Hero number vertical fill
  heroVertical: {
    colors: ['#FF6B6B', '#2EC4A0'] as const,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  // Hero word horizontal fill
  heroHorizontal: {
    colors: ['#FF6B6B', '#FF9B9B'] as const,
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
  // Insight card teal-to-coral
  insightCard: {
    colors: ['#2EC4A0', '#FF6B6B'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // Canvas warm fade
  canvasFade: {
    colors: ['#FEF9F0', '#FFF5E8', '#FEF9F0'] as const,
    locations: [0, 0.5, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // Onboarding warm sunrise
  sunriseGreens: {
    colors: ['#FEF9F0', '#FFD6D6', '#C0F0E8'] as const,
    locations: [0, 0.5, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
} as const;

/**
 * Shadow tokens — RN shadow props.
 * Note: on Android, shadows only render with `elevation` — add manually where needed.
 */
export const shadows = {
  // Glow shadows (halo around elements)
  glowDotSm: {
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  glowToken: {
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  glowBreath: {
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.3,
    shadowRadius: 80,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  // Soft drop shadows
  cardWhisper: {
    shadowColor: '#000000',
    shadowOpacity: 0.02,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },
  cardWarm: {
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.03,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  buttonMd: {
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.4,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  pillLg: {
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.4,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 20 },
    elevation: 10,
  },
  navTop: {
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const tracking = {
  tighter: -0.6,
  tight: -0.3,
  normal: 0,
  wide: 0.5,
  widest: 2,
  label: 2.5,       // 0.15em at 16px
  labelWide: 3.5,   // 0.2em at 16px
  labelWidest: 5,   // 0.3em at 16px
} as const;

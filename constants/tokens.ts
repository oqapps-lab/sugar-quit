/**
 * Sugar Quit — Design Tokens
 * Source: docs/06-design/DESIGN-TOKENS.md
 * Extracted from 12 Stitch screens (stitch-export/), with conflicts resolved.
 */

export const colors = {
  // primary — magenta pink (from Stitch design-theme.json)
  primary: '#b50058',
  primaryDim: '#9f004d',
  primaryContainer: '#ff709e',
  primaryFixed: '#ff709e',
  primaryFixedDim: '#ff5290',
  onPrimary: '#ffeff1',
  onPrimaryContainer: '#4c0021',
  onPrimaryFixed: '#000000',
  onPrimaryFixedVariant: '#5d002a',
  inversePrimary: '#ff4a8d',

  // surface — light blue-gray (from Stitch design-theme.json)
  surface: '#f1f7fa',
  background: '#f1f7fa',
  surfaceBright: '#f1f7fa',
  surfaceDim: '#ccd6db',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#ebf2f5',
  surfaceContainer: '#e2e9ed',
  surfaceContainerHigh: '#dbe4e8',
  surfaceContainerHighest: '#d5dee3',
  surfaceVariant: '#d5dee3',
  inverseSurface: '#090f11',
  inverseOnSurface: '#979ea1',

  // on-surface
  onSurface: '#293032',
  onSurfaceVariant: '#565c5f',
  onBackground: '#293032',
  outline: '#71787b',
  outlineVariant: '#a8aeb1',

  // secondary — muted lavender
  secondary: '#6a577f',
  secondaryDim: '#5e4b72',
  secondaryContainer: '#efdbff',
  secondaryFixed: '#efdbff',
  secondaryFixedDim: '#e3cbfa',
  onSecondary: '#fff6ff',
  onSecondaryContainer: '#5c4a71',
  onSecondaryFixed: '#49385d',
  onSecondaryFixedVariant: '#66547b',

  // tertiary — muted teal / pale mint
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

  // theme variant — Dark Horizon (Progress screen only)
  darkHorizonDeepNavy: '#1a1c2c',
  darkHorizonRose100: '#ffe4e6',
  darkHorizonRose900: '#881337',
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
  // Primary CTA pill — Stitch gradient: magenta → pink
  pillCta: {
    colors: ['#b50058', '#ff709e'] as const,
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
  // SOS FAB — diagonal magenta
  fab: {
    colors: ['#b50058', '#9f004d'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // Hero number vertical fill
  heroVertical: {
    colors: ['#b50058', '#811cd9'] as const,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  // Hero word horizontal fill
  heroHorizontal: {
    colors: ['#b50058', '#ff709e'] as const,
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
  // Insight card purple-to-pink
  insightCard: {
    colors: ['#811cd9', '#b50058'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // Dark Horizon body gradient
  darkHorizon: {
    colors: ['#1a1c2c', '#6a577f', '#a53c30', '#fbf9f5'] as const,
    locations: [0, 0.4, 0.85, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // Craving Profile 5-stop linear
  cravingProfile: {
    colors: ['#fbf9f5', '#fdf0e9', '#ffdcd5', '#ffe1d9', '#eef7f6'] as const,
    locations: [0, 0.2, 0.45, 0.65, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // Onboarding Sunrise Greens
  sunriseGreens: {
    colors: ['#fefcf4', '#f8cec2', '#ccebc2'] as const,
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
    shadowColor: '#a53c30',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  glowToken: {
    shadowColor: '#a53c30',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  glowBreath: {
    shadowColor: '#a53c30',
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
    shadowColor: '#a53c30',
    shadowOpacity: 0.03,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  buttonMd: {
    shadowColor: '#a53c30',
    shadowOpacity: 0.4,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  pillLg: {
    shadowColor: '#a53c30',
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

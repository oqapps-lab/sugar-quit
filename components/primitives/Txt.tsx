import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { colors, fonts, tracking, typeScale } from '../../constants/tokens';

type Variant =
  | 'hero'
  | 'displayLg'
  | 'displayMd'
  | 'displaySm'
  | 'titleLg'
  | 'titleMd'
  | 'titleSm'
  | 'bodyLg'
  | 'bodyMd'
  | 'bodySm'
  | 'label'
  | 'labelSm'
  | 'eyebrow';

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>;
  italic?: boolean;
  center?: boolean;
  numberOfLines?: number;
};

const VARIANT_STYLE: Record<Variant, TextStyle> = {
  hero: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.heroNumber,
    letterSpacing: tracking.tighter,
    color: colors.textPrimary,
  },
  displayLg: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.displayLarge,
    letterSpacing: tracking.tight,
    color: colors.textPrimary,
  },
  displayMd: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.displayMedium,
    letterSpacing: tracking.tight,
    color: colors.textPrimary,
  },
  displaySm: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.displaySmall,
    letterSpacing: tracking.tight,
    color: colors.textPrimary,
  },
  titleLg: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    letterSpacing: tracking.normal,
    color: colors.textPrimary,
  },
  titleMd: {
    fontFamily: fonts.headlineMedium,
    fontSize: typeScale.titleMedium,
    letterSpacing: tracking.normal,
    color: colors.textPrimary,
  },
  titleSm: {
    fontFamily: fonts.headlineMedium,
    fontSize: typeScale.titleSmall,
    letterSpacing: tracking.normal,
    color: colors.textPrimary,
  },
  bodyLg: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    letterSpacing: tracking.normal,
    color: colors.textPrimary,
  },
  bodyMd: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    letterSpacing: tracking.normal,
    color: colors.textSecondary,
  },
  bodySm: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    letterSpacing: tracking.normal,
    color: colors.textSecondary,
  },
  label: {
    fontFamily: fonts.label,
    fontSize: typeScale.label,
    letterSpacing: tracking.label,
    color: colors.textSecondary,
  },
  labelSm: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.label,
    color: colors.textSecondary,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.label,
    letterSpacing: tracking.labelWide,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
};

/**
 * Txt — token-based text with variant system.
 * Covers all type scale levels from hero (72) down to labelSm (10).
 */
export function Txt({ children, variant = 'bodyMd', color, style, italic, center, numberOfLines }: Props) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        VARIANT_STYLE[variant],
        color ? { color } : null,
        italic ? { fontStyle: 'italic' } : null,
        center ? { textAlign: 'center' } : null,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

import { Text, TextStyle, StyleSheet, StyleProp } from 'react-native';
import { colors, fonts, tracking, typeScale } from '../../constants/tokens';

export type TextVariant =
  | 'heroNumber'      // 72px — streak digit
  | 'displayLarge'    // 36px — Home hero
  | 'displayMedium'   // 28px — card headline
  | 'displaySmall'    // 22px — section title
  | 'titleLarge'      // 20px — card heading
  | 'titleMedium'     // 17px — lesson title
  | 'bodyLarge'       // 16px — button label
  | 'bodyMedium'      // 14px — card body
  | 'bodySmall'       // 13px — secondary info
  | 'label'           // 12px ALL CAPS — system labels
  | 'labelSmall';     // 10px ALL CAPS — meta / sub-info

type Props = {
  variant?: TextVariant;
  color?: string;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  /** Force uppercase transform (auto for label variants). */
  caps?: boolean;
};

const VARIANT_STYLE: Record<TextVariant, TextStyle> = {
  heroNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.heroNumber,
    lineHeight: typeScale.heroNumber,
    letterSpacing: tracking.tighter,
    color: colors.primary,
  },
  displayLarge: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge,
    lineHeight: typeScale.displayLarge * 1.1,
    letterSpacing: tracking.tight,
    color: colors.onSurface,
  },
  displayMedium: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    lineHeight: typeScale.displayMedium * 1.15,
    letterSpacing: tracking.tight,
    color: colors.onSurface,
  },
  displaySmall: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.displaySmall,
    lineHeight: typeScale.displaySmall * 1.2,
    letterSpacing: tracking.tight,
    color: colors.onSurface,
  },
  titleLarge: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleLarge,
    lineHeight: typeScale.titleLarge * 1.3,
    letterSpacing: tracking.normal,
    color: colors.onSurface,
  },
  titleMedium: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    lineHeight: typeScale.titleMedium * 1.4,
    letterSpacing: tracking.normal,
    color: colors.onSurface,
  },
  bodyLarge: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.bodyLarge,
    lineHeight: typeScale.bodyLarge * 1.5,
    letterSpacing: tracking.wide,
    color: colors.onSurface,
  },
  bodyMedium: {
    fontFamily: fonts.label,
    fontSize: typeScale.bodyMedium,
    lineHeight: typeScale.bodyMedium * 1.5,
    letterSpacing: tracking.wide,
    color: colors.onSurfaceVariant,
  },
  bodySmall: {
    fontFamily: fonts.label,
    fontSize: typeScale.bodySmall,
    lineHeight: typeScale.bodySmall * 1.5,
    letterSpacing: tracking.normal,
    color: colors.onSurfaceVariant,
  },
  label: {
    fontFamily: fonts.label,
    fontSize: typeScale.label,
    lineHeight: typeScale.label * 1.4,
    letterSpacing: tracking.labelWide,
    textTransform: 'uppercase',
    color: colors.onSurfaceVariant,
  },
  labelSmall: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    lineHeight: typeScale.labelSmall * 1.4,
    letterSpacing: tracking.labelWide,
    textTransform: 'uppercase',
    color: colors.onSurfaceVariant,
  },
};

export function ThemedText({
  variant = 'bodyMedium',
  color,
  children,
  style,
  numberOfLines,
  caps,
}: Props) {
  const base = VARIANT_STYLE[variant];
  const colorOverride = color ? { color } : undefined;
  const capsOverride = caps ? { textTransform: 'uppercase' as const } : undefined;

  return (
    <Text
      style={[base, colorOverride, capsOverride, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

// Pre-composed shortcuts

export function Eyebrow({ children, color, style }: Omit<Props, 'variant'>) {
  return (
    <ThemedText
      variant="label"
      color={color ?? colors.onSurfaceVariant}
      style={[styles.eyebrow, style as TextStyle | undefined]}
    >
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    marginBottom: 4,
  },
});

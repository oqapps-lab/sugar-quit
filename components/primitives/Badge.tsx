import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, radius, spacing, tracking } from '../../constants/tokens';

type Variant = 'live' | 'active' | 'premium' | 'info';

type Props = {
  label: string;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
};

const VARIANT_COLORS: Record<Variant, { bg: string; text: string }> = {
  live:    { bg: colors.error,     text: colors.onError },
  active:  { bg: colors.primary,   text: colors.onPrimary },
  premium: { bg: colors.secondary, text: colors.onSecondary },
  info:    { bg: colors.surfaceContainerHigh, text: colors.onSurfaceVariant },
};

/**
 * Badge — small status pill for LIVE / ACTIVE / PREMIUM / INFO labels.
 * Auto-uppercases label text.
 */
export function Badge({ label, variant = 'info', style }: Props) {
  const { bg, text } = VARIANT_COLORS[variant];

  return (
    <View style={[styles.pill, { backgroundColor: bg }, style]}>
      <Text style={[styles.label, { color: text }]}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: fonts.label,
    fontSize: 10,
    letterSpacing: tracking.labelWide,
    lineHeight: 14,
  },
});

import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, radius, shadows, spacing, tracking, typeScale } from '../../constants/tokens';

type Props = {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  accent?: string;
};

/**
 * Stat — compact stat chip. Icon + value + label.
 * Used in Home Dashboard row: "15 CRAVINGS", "$24 SAVED".
 */
export function Stat({ value, label, icon, style, accent }: Props) {
  const circleColor = accent ?? colors.primary;
  return (
    <View style={[styles.chip, style]}>
      {icon !== undefined && (
        <View style={[styles.iconCircle, { backgroundColor: circleColor + '22' }]}>
          {icon}
        </View>
      )}
      <Text style={[styles.value, { color: colors.success }]}>{value}</Text>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: colors.outline,
    ...shadows.cardWhisper,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  value: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    color: colors.textPrimary,
    letterSpacing: tracking.tight,
  },
  label: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.textSecondary,
    letterSpacing: tracking.label,
    marginTop: 2,
  },
});

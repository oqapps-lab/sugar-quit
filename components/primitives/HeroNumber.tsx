import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, tracking, typeScale } from '../../constants/tokens';

type Props = {
  value: string | number;
  label?: string;
  color?: string;
  style?: ViewStyle;
};

/**
 * HeroNumber — large display number for streak counts, savings, cravings avoided.
 * Optional label below (e.g. "DAYS SUGAR-FREE").
 */
export function HeroNumber({ value, label, color, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.number, color ? { color } : null]}>
        {value}
      </Text>
      {label && <Text style={styles.label}>{label.toUpperCase()}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  number: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.heroNumber,
    letterSpacing: tracking.tighter,
    color: colors.primary,
  },
  label: {
    fontFamily: fonts.label,
    fontSize: typeScale.label,
    letterSpacing: tracking.labelWide,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

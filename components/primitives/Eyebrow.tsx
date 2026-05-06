import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { colors, fonts, tracking, typeScale } from '../../constants/tokens';

type Props = {
  children: React.ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
};

/**
 * Eyebrow — small uppercase label above a title.
 * "DAY 8 · LESSON", "YOUR STREAK", "CRAVING ALERT"
 */
export function Eyebrow({ children, color, style }: Props) {
  return (
    <Text style={[styles.text, color ? { color } : null, style]}>
      {typeof children === 'string' ? children.toUpperCase() : children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.label,
    fontSize: typeScale.label,
    letterSpacing: tracking.labelWide,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
});

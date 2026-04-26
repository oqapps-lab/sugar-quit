import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../../constants/tokens';

type Props = {
  style?: ViewStyle;
  inset?: boolean;
};

/**
 * Divider — hairline horizontal separator between sections or list items.
 * inset: indented 16px from both sides (inside a card).
 */
export function Divider({ style, inset = false }: Props) {
  return (
    <View
      style={[
        styles.line,
        inset && styles.inset,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
    marginVertical: spacing.sm,
  },
  inset: {
    marginHorizontal: spacing.md,
  },
});

import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../constants/tokens';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  bordered?: boolean;
  noPadding?: boolean;
};

/**
 * Card — white surface card with subtle shadow and rounded corners.
 * Use for any contained content block on canvas background.
 */
export function Card({ children, style, padding, bordered = false, noPadding = false }: Props) {
  return (
    <View
      style={[
        styles.card,
        noPadding ? null : { padding: padding ?? spacing.md },
        bordered && styles.bordered,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    elevation: 0,
    shadowOpacity: 0,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.outline,
  },
});

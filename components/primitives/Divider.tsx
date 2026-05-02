import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../../constants/tokens';

type Props = {
  /** Horizontal inset on both sides. Default spacing.md (16). */
  inset?: number;
  style?: StyleProp<ViewStyle>;
};

export function Divider({ inset = spacing.md, style }: Props) {
  return (
    <View
      style={[styles.line, { marginHorizontal: inset }, style]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.outlineVariant,
    marginVertical: spacing.sm,
  },
});

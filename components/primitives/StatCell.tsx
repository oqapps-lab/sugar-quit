import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import { spacing } from '../../constants/tokens';

type Props = {
  /** ALL CAPS label above the number. */
  label: string;
  value: string | number;
  /** Optional unit string appended to value (e.g. "g", "days"). */
  unit?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * StatCell — compact label + value pair for dashboard grids.
 * label: labelSmall variant (10px ALL CAPS)
 * value: displayMedium variant (28px)
 */
export function StatCell({ label, value, unit, style }: Props) {
  return (
    <View style={[styles.root, style]}>
      <ThemedText variant="labelSmall">{label}</ThemedText>
      <View style={styles.row}>
        <ThemedText variant="displayMedium">{String(value)}</ThemedText>
        {unit ? (
          <ThemedText variant="bodySmall" style={styles.unit}>{unit}</ThemedText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  unit: {
    marginBottom: 4,
  },
});

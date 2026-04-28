import * as Haptics from 'expo-haptics';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';
import { colors, spacing } from '../../constants/tokens';

type Props = {
  title?: string;
  /** Left slot — usually a back/close icon. */
  left?: React.ReactNode;
  /** Right slot — usually an action icon. */
  right?: React.ReactNode;
  onClose?: () => void;
  /** Add safe-area top padding. Default true. */
  safeArea?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * TopBar — modal and full-screen navigation header.
 * Height: 48 + optional safeArea.top.
 * left / right slots accept any ReactNode.
 */
export function TopBar({ title, left, right, onClose, safeArea = true, style }: Props) {
  const insets = useSafeAreaInsets();

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose?.();
  };

  return (
    <View
      style={[
        styles.bar,
        safeArea && { paddingTop: insets.top + spacing.sm },
        style,
      ]}
    >
      <View style={styles.slot}>
        {onClose ? (
          <Pressable
            onPress={handleClose}
            accessibilityRole="button"
            accessibilityLabel="Close"
            hitSlop={12}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            {left}
          </Pressable>
        ) : (
          left ?? null
        )}
      </View>

      {title ? (
        <ThemedText variant="titleMedium" style={styles.title} numberOfLines={1}>
          {title}
        </ThemedText>
      ) : null}

      <View style={[styles.slot, styles.slotRight]}>
        {right ?? null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.onSurface,
  },
  slot: {
    width: 40,
    alignItems: 'flex-start',
  },
  slotRight: {
    alignItems: 'flex-end',
  },
});

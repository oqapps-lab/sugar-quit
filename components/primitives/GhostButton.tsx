import * as Haptics from 'expo-haptics';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts, radius, spacing, tracking } from '../../constants/tokens';

type Props = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  /** 'outline' shows border, 'text' is borderless. Default 'outline'. */
  variant?: 'outline' | 'text';
  style?: StyleProp<ViewStyle>;
};

/**
 * GhostButton — secondary action, transparent background.
 * 'outline': border in outlineVariant color.
 * 'text': no border, subtle underline intent.
 */
export function GhostButton({
  label,
  onPress,
  disabled = false,
  variant = 'outline',
  style,
}: Props) {
  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        variant === 'outline' && styles.outline,
        variant === 'text' && styles.text,
        { opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
        style,
      ]}
    >
      <Text style={[styles.label, variant === 'text' && styles.labelText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
  },
  text: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  label: {
    fontFamily: fonts.headlineSemibold,
    fontSize: 14,
    letterSpacing: tracking.label,
    textTransform: 'uppercase',
    color: colors.onSurface,
  },
  labelText: {
    textTransform: 'none',
    letterSpacing: tracking.normal,
    color: colors.onSurfaceVariant,
  },
});

import * as Haptics from 'expo-haptics';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius } from '../../constants/tokens';

type Props = {
  icon: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  /** Circle size in px. Default 44. */
  size?: number;
  /** Background tint. Default transparent. */
  bg?: string;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * IconButton — circular pressable wrapping any icon node.
 * Minimum 44×44 touch target per Apple HIG.
 */
export function IconButton({
  icon,
  onPress,
  disabled = false,
  size = 44,
  bg = 'transparent',
  accessibilityLabel,
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
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.btn,
        {
          width: size,
          height: size,
          borderRadius: radius.full,
          backgroundColor: bg,
          opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

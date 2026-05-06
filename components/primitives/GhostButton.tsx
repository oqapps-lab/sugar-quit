import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts, radius, tracking } from '../../constants/tokens';

type Props = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  small?: boolean;
};

/**
 * GhostButton — text-only or subtly bordered button for secondary actions.
 * "Maybe later", "Skip", dismiss links.
 */
export function GhostButton({ label, onPress, style, small = false }: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.btn,
        small ? styles.small : styles.regular,
        { opacity: pressed ? 0.5 : 1 },
        style,
      ]}
    >
      <Text style={[styles.label, small && styles.labelSmall]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regular: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    minHeight: 44,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  label: {
    color: colors.textSecondary,
    fontFamily: fonts.label,
    fontSize: 14,
    letterSpacing: tracking.normal,
  },
  labelSmall: {
    fontSize: 12,
    letterSpacing: tracking.label,
    textTransform: 'uppercase',
  },
});

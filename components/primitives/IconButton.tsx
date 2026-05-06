import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, radius, shadows } from '../../constants/tokens';

type Variant = 'default' | 'primary' | 'ghost';

type Props = {
  icon: string;
  onPress?: () => void;
  variant?: Variant;
  size?: number;
  style?: ViewStyle;
  accessibilityLabel: string;
};

/**
 * IconButton — circular icon button. Size >= 44 to meet touch target requirements.
 * variant primary: coral fill (send button, SOS-like actions)
 * variant ghost: transparent with border
 * variant default: white surface with whisper shadow
 */
export function IconButton({ icon, onPress, variant = 'default', size = 44, style, accessibilityLabel }: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : variant === 'ghost' ? styles.ghost : styles.default,
        variant === 'primary' ? shadows.buttonMd : shadows.cardWhisper,
        { width: size, height: size, borderRadius: size / 2 },
        { transform: [{ scale: pressed ? 0.9 : 1 }] },
        style,
      ]}
    >
      <Text style={[styles.icon, variant === 'primary' ? styles.iconPrimary : styles.iconDefault]}>
        {icon}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: colors.surface,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  ghost: {
    borderWidth: 1,
    borderColor: colors.outline,
    backgroundColor: 'transparent',
  },
  icon: {
    fontSize: 18,
  },
  iconPrimary: {
    color: colors.onPrimary,
  },
  iconDefault: {
    color: colors.textPrimary,
  },
});

import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts, gradients, radius, shadows, tracking } from '../../constants/tokens';

type Variant = 'primary' | 'ghost' | 'success';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  style?: ViewStyle;
  disabled?: boolean;
  fullWidth?: boolean;
};

/**
 * PillCTA — primary action button. Full-width by default.
 * primary: coral gradient with shadow
 * ghost: outlined, transparent
 * success: teal gradient (check-in done state)
 */
export function PillCTA({ label, onPress, variant = 'primary', style, disabled = false, fullWidth = true }: Props) {
  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  if (variant === 'ghost') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          styles.pill,
          styles.ghost,
          fullWidth && styles.fullWidth,
          { opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
          style,
        ]}
      >
        <Text style={styles.labelGhost}>{label}</Text>
      </Pressable>
    );
  }

  const gradient = variant === 'success'
    ? { colors: ['#2EC4A0', '#25A889'] as const, start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } }
    : gradients.pillCta;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        fullWidth && styles.fullWidth,
        { opacity: disabled ? 0.4 : pressed ? 0.92 : 1 },
        style,
      ]}
    >
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        style={[styles.pill, styles.pillPrimary, shadows.buttonMd]}
      >
        <Text style={styles.labelPrimary}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
  },
  pillPrimary: {},
  ghost: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  labelPrimary: {
    color: colors.onPrimary,
    fontFamily: fonts.headlineSemibold,
    fontSize: 15,
    letterSpacing: tracking.label,
    textTransform: 'uppercase',
  },
  labelGhost: {
    color: colors.primary,
    fontFamily: fonts.headlineSemibold,
    fontSize: 15,
    letterSpacing: tracking.label,
    textTransform: 'uppercase',
  },
});

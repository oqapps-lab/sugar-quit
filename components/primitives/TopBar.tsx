import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, shadows, spacing, typeScale } from '../../constants/tokens';

type Props = {
  title?: string;
  leftIcon?: string;
  rightLabel?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: ViewStyle;
  transparent?: boolean;
};

/**
 * TopBar — screen header with optional back/close icon and right action.
 * transparent: no background (float over content).
 */
export function TopBar({
  title,
  leftIcon = '←',
  rightLabel,
  onLeftPress,
  onRightPress,
  style,
  transparent = false,
}: Props) {
  const insets = useSafeAreaInsets();

  const handleLeft = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLeftPress?.();
  };

  const handleRight = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onRightPress?.();
  };

  return (
    <View
      style={[
        styles.bar,
        { paddingTop: insets.top + spacing.sm },
        !transparent && styles.solid,
        style,
      ]}
    >
      <Pressable
        onPress={handleLeft}
        style={styles.side}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="Back"
      >
        <Text style={styles.icon}>{leftIcon}</Text>
      </Pressable>

      {title ? (
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      ) : (
        <View style={styles.side} />
      )}

      {rightLabel ? (
        <Pressable
          onPress={handleRight}
          style={[styles.side, styles.right]}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={rightLabel}
        >
          <Text style={styles.rightLabel}>{rightLabel}</Text>
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    minHeight: 44 + spacing.sm,
  },
  solid: {
    backgroundColor: colors.canvas,
    ...shadows.navTop,
  },
  side: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  icon: {
    fontFamily: fonts.body,
    fontSize: 20,
    color: colors.textPrimary,
  },
  rightLabel: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.primary,
  },
});

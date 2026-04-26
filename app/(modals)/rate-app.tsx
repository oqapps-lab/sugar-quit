import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';

export default function RateApp() {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState<number | null>(null);

  const pickStone = (n: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRating(n);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Txt variant="titleSm">Rate the app</Txt>
        <Pressable onPress={() => router.dismiss()} hitSlop={8}
          accessibilityRole="button" accessibilityLabel="Close rate app">
          <Txt variant="bodyLg" color={colors.textSecondary}>✕</Txt>
        </Pressable>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.textBlock}>
          <Eyebrow color={colors.primary}>Seven days in</Eyebrow>
          <Txt variant="displayMd" style={styles.title}>A small ask</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
            If this week felt worth something, a rating helps other people find us. Completely optional.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.stonesRow}>
          {[1, 2, 3, 4, 5].map((n) => {
            const active = rating !== null && rating >= n;
            return (
              <Pressable
                key={n}
                onPress={() => pickStone(n)}
                style={[styles.stone, active && styles.stoneActive]}
                accessibilityRole="radio"
                accessibilityState={{ selected: rating === n }}
                accessibilityLabel={`Rate ${n} out of 5`}
              >
                <Txt variant="titleMd" color={active ? colors.onPrimary : colors.textSecondary}>●</Txt>
              </Pressable>
            );
          })}
        </Animated.View>

        {rating !== null && (
          <Animated.View entering={FadeInDown.duration(300)}>
            <Txt variant="bodyMd" color={colors.textSecondary} center style={styles.caption}>
              {rating >= 4 ? 'Thank you — that means a lot.' : 'Got it. Thanks for the honesty.'}
            </Txt>
          </Animated.View>
        )}
      </View>

      {/* Footer */}
      <Animated.View
        entering={FadeInDown.delay(500).duration(400)}
        style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}
      >
        <PillCTA
          label="Leave a review on the App Store"
          onPress={() => router.dismiss()}
          disabled={rating === null}
        />
        <Pressable onPress={() => router.dismiss()} hitSlop={8} accessibilityRole="button">
          <Txt variant="bodyMd" color={colors.textSecondary} center style={styles.laterLabel}>
            Maybe later
          </Txt>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  headerLeft: { minWidth: 40 },

  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  textBlock: { gap: spacing.sm },
  title: {
    letterSpacing: -0.6,
    lineHeight: 34,
    marginTop: spacing.xs,
  },
  sub: { lineHeight: 24 },

  stonesRow: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
  },
  stone: {
    width: 54,
    height: 54,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stoneActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  caption: { fontStyle: 'italic' },

  footer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  laterLabel: { paddingVertical: spacing.sm },
});

import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';
import { useUserStore, getTodayISODate } from '../../stores/useUserStore';

export default function StreakFreeze() {
  const insets = useSafeAreaInsets();
  const useStreakFreeze = useUserStore((s) => s.useStreakFreeze);
  const resetStreak = useUserStore((s) => s.resetStreak);
  const freezesAvail = useUserStore((s) => s.streakFreezesAvailableThisWeek);
  const freezesUsed = useUserStore((s) => s.streakFreezesUsedThisWeek);
  const remaining = Math.max(0, freezesAvail - freezesUsed);

  const onFreeze = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const ok = useStreakFreeze();
    if (ok) useUserStore.setState({ lastCheckInDate: getTodayISODate() });
    router.dismiss();
  };

  const onReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    resetStreak();
    useUserStore.setState({ lastCheckInDate: getTodayISODate() });
    router.dismiss();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Txt variant="titleSm">Streak Freeze</Txt>
        <Pressable onPress={() => router.dismiss()} hitSlop={8}
          accessibilityRole="button" accessibilityLabel="Close">
          <Txt variant="bodyLg" color={colors.textSecondary}>✕</Txt>
        </Pressable>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.textBlock}>
          <Eyebrow color={colors.primary}>Yesterday was quiet</Eyebrow>
          <Txt variant="displayMd" style={styles.title}>You missed the check-in.</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
            Skipping isn't a slip. Use a Streak Freeze to keep the thread — or let it reset. Both are fine.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.freezeRow}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[styles.freezeDot, i < remaining && styles.freezeDotActive]}
            />
          ))}
          <Txt variant="labelSm" color={colors.textSecondary} style={styles.remainingLabel}>
            {`${remaining} left this week`}
          </Txt>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View
        entering={FadeInDown.delay(320).duration(400)}
        style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}
      >
        <PillCTA label="Use Streak Freeze" onPress={onFreeze} disabled={remaining === 0} />
        <Pressable onPress={onReset} hitSlop={8} accessibilityRole="button">
          <Txt variant="bodyMd" color={colors.textSecondary} center style={styles.resetLabel}>
            Let it reset
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
  sub: {
    lineHeight: 24,
  },

  freezeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    alignSelf: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  freezeDot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.outline,
  },
  freezeDotActive: {
    backgroundColor: colors.primary,
  },
  remainingLabel: {
    marginLeft: spacing.xs,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  resetLabel: {
    paddingVertical: spacing.sm,
  },
});

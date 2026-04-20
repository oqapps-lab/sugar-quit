import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { useUserStore, getTodayISODate } from '../../stores/useUserStore';

/**
 * 4.2 Streak Freeze — you missed yesterday's check-in.
 * Warm, not punitive. One freeze available this week.
 *
 * "Use Streak Freeze" → call useStreakFreeze() action; if successful, mark
 * lastCheckInDate to today so home doesn't keep re-prompting. If freeze is
 * exhausted, the action returns false and we still dismiss (UI can be improved
 * later to show "no freezes left").
 *
 * "Let it reset" → resetStreak() then dismiss.
 */

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
    if (ok) {
      // Mark today as checked-in so the auto-trigger on home doesn't fire again
      // (this is a soft "freeze counts as check-in").
      useUserStore.setState({ lastCheckInDate: getTodayISODate() });
    }
    router.dismiss();
  };

  const onReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    resetStreak();
    useUserStore.setState({ lastCheckInDate: getTodayISODate() });
    router.dismiss();
  };

  return (
    <AtmosphericGradient theme="dawn">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={{ width: 36 }} />
        <Pressable onPress={() => router.dismiss()} style={styles.closeBtn}>
          <Text style={styles.closeX}>×</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.glyphWrap}>
          <View style={styles.glyphGlow} />
          <View style={styles.glyphOrb}>
            <Text style={styles.glyphMark}>❄</Text>
          </View>
        </View>

        <Text style={styles.eyebrow}>YESTERDAY WAS QUIET</Text>
        <Text style={styles.title}>You missed the check-in.</Text>
        <Text style={styles.body}>
          Skipping isn't a slip. Use a Streak Freeze to keep the thread — or let it reset. Both are fine.
        </Text>

        <View style={styles.remainingRow}>
          <View style={remaining > 0 ? styles.freezeDotActive : styles.freezeDot} />
          <View style={styles.freezeDot} />
          <View style={styles.freezeDot} />
          <Text style={styles.remainingLabel}>{`${remaining} left this week`}</Text>
        </View>
      </View>

      <View style={[styles.actions, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Use Streak Freeze" onPress={onFreeze} disabled={remaining === 0} />
        <Pressable onPress={onReset} style={styles.resetBtn} accessibilityRole="button" accessibilityLabel="Let streak reset">
          <Text style={styles.resetLabel}>Let it reset</Text>
        </Pressable>
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: { fontSize: 22, color: colors.onSurface, lineHeight: 22, fontFamily: fonts.headlineLight },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },

  glyphWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  glyphGlow: {
    position: 'absolute',
    width: 180, height: 180, borderRadius: radius.full,
    backgroundColor: 'rgba(255,172,160,0.25)',
  },
  glyphOrb: {
    width: 120, height: 120, borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.25, shadowRadius: 24, shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  glyphMark: {
    fontFamily: fonts.headlineBold,
    fontSize: 52,
    color: colors.primary,
    lineHeight: 60,
  },

  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.sm,
  },
  title: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    letterSpacing: -0.8,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 320,
    marginTop: spacing.sm,
  },

  remainingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xl,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  freezeDot: {
    width: 8, height: 8, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.15)',
  },
  freezeDotActive: {
    width: 8, height: 8, borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  remainingLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
    marginLeft: spacing.xs,
  },

  actions: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  resetBtn: { padding: spacing.md },
  resetLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
});

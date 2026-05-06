import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';
import { getMilestoneDueIfAny, useUserStore } from '../../stores/useUserStore';

export default function Milestone() {
  const insets = useSafeAreaInsets();
  const streakDays = useUserStore((s) => s.streakDays);
  const cravings = useUserStore((s) => s.cravings);
  const sosLog = useUserStore((s) => s.sosLog);
  const milestonesCelebrated = useUserStore((s) => s.milestonesCelebrated);
  const markMilestoneCelebrated = useUserStore((s) => s.markMilestoneCelebrated);

  const due = getMilestoneDueIfAny(streakDays, milestonesCelebrated);
  const dayShown = due ?? Math.max(1, streakDays);

  const sosWalked = sosLog.filter((s) => s.outcome === 'walked' || s.outcome === 'softer').length;
  const cravingsWalked = cravings.filter((c) => c.outcome === 'walked').length;
  const cravingsMet = sosWalked + cravingsWalked;
  const totalDaysClean = useUserStore((s) => s.totalDaysClean);
  const dollarsSaved = (totalDaysClean * 1.5).toFixed(0);
  const kgSugarAvoided = (totalDaysClean * 0.025).toFixed(1);

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (due !== null) markMilestoneCelebrated(due);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/home');
  };

  const onShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await Share.share({
      message: `${dayShown} ${dayShown === 1 ? 'day' : 'days'} sugar-free 🌿 ${cravingsMet} cravings met · $${dollarsSaved} saved · ${kgSugarAvoided}kg sugar avoided — Sugar Quit`,
    });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* Hero */}
      <View style={styles.content}>
        <Animated.View entering={FadeInUp.duration(400)}>
          <Eyebrow color={colors.primary} style={styles.eyebrow}>A milestone</Eyebrow>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.orbWrap}>
          <View style={styles.orb}>
            <Text
              style={styles.orbNumber}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {dayShown}
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(250).duration(400)}>
          <Txt variant="displayMd" center style={styles.milestoneLine}>
            {dayShown === 1 ? 'day sugar-free' : 'days sugar-free'}
          </Txt>
        </Animated.View>

        <View style={styles.divider} />

        <Animated.View entering={FadeInDown.delay(350).duration(400)} style={styles.statsRow}>
          <View style={[styles.statTile, { backgroundColor: colors.primary + '18' }]}>
            <Txt variant="displaySm" color={colors.primary} style={styles.statValue}>{cravingsMet}</Txt>
            <Txt variant="labelSm" color={colors.textSecondary} style={styles.statLabel}>{cravingsMet === 1 ? 'CRAVING MET' : 'CRAVINGS MET'}</Txt>
          </View>
          <View style={[styles.statTile, { backgroundColor: colors.success + '18' }]}>
            <Txt variant="displaySm" color={colors.success} style={styles.statValue}>${dollarsSaved}</Txt>
            <Txt variant="labelSm" color={colors.textSecondary} style={styles.statLabel}>SAVED</Txt>
          </View>
          <View style={[styles.statTile, { backgroundColor: colors.warning + '18' }]}>
            <Txt variant="displaySm" color={colors.warning} style={styles.statValue}>{kgSugarAvoided}kg</Txt>
            <Txt variant="labelSm" color={colors.textSecondary} style={styles.statLabel}>SUGAR AVOIDED</Txt>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(450).duration(400)}>
          <Txt variant="bodySm" color={colors.textSecondary} center style={styles.quote}>
            "You placed a large stone today. Each day adds another to the path."
          </Txt>
        </Animated.View>
      </View>

      {/* Actions */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Pressable onPress={onShare} hitSlop={8} accessibilityRole="button">
          <Txt variant="bodyMd" color={colors.primary} center style={styles.shareLabel}>
            Share this chapter
          </Txt>
        </Pressable>
        <PillCTA label="Back to today" onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  eyebrow: { marginBottom: spacing.xs },

  orbWrap: { marginVertical: spacing.sm },
  orb: {
    width: 160,
    height: 160,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbNumber: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 80,
    color: colors.onPrimary,
    textAlign: 'center',
    includeFontPadding: false,
  } as any,

  milestoneLine: { letterSpacing: -0.6 },

  divider: {
    width: 40,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
  },

  statsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: spacing.sm,
    alignItems: 'stretch',
  },
  statTile: {
    flex: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  statValue: { letterSpacing: -0.6 },
  statLabel: { textAlign: 'center', lineHeight: 14 },

  quote: {
    fontStyle: 'italic',
    lineHeight: 20,
    paddingHorizontal: spacing.md,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  shareLabel: { paddingVertical: spacing.sm },
});

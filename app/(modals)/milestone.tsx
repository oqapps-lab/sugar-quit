import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, useReducedMotion } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { getMilestoneDueIfAny, useUserStore } from '../../stores/useUserStore';

/**
 * Milestone Celebration — presented as full-screen modal.
 * Quiet fireworks, not loud. Soft petals, warm honey glow.
 *
 * The milestone day is computed from the store. We mark it celebrated on
 * mount so the Home auto-trigger doesn't re-push us in a loop after dismiss.
 */
export default function Milestone() {
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotion();
  const streakDays = useUserStore((s) => s.streakDays);
  const cravings = useUserStore((s) => s.cravings);
  const sosLog = useUserStore((s) => s.sosLog);
  const milestonesCelebrated = useUserStore((s) => s.milestonesCelebrated);
  const markMilestoneCelebrated = useUserStore((s) => s.markMilestoneCelebrated);

  // The milestone we're celebrating: the largest unrecorded one ≤ streak,
  // OR — if user reached this screen via deep-link with no due milestone —
  // fall back to the largest reached so the screen still has content.
  const due = getMilestoneDueIfAny(streakDays, milestonesCelebrated);
  const dayShown = due ?? Math.max(1, streakDays);

  // Stats — same honest formulas as Profile.
  const sosWalked = sosLog.filter((s) => s.outcome === 'walked' || s.outcome === 'softer').length;
  const cravingsWalked = cravings.filter((c) => c.outcome === 'walked').length;
  const cravingsMet = sosWalked + cravingsWalked;
  const dollarsSaved = (dayShown * 1.5).toFixed(0);
  // Cross-surface consistency: Profile / Progress / Share-card all use toFixed(2)
  // so a 1-day user reads "0.03kg" everywhere rather than "0.0" in some surfaces.
  const kgSugarAvoided = (dayShown * 0.025).toFixed(2);

  // C4: Milestone celebration — Success notification + mark celebrated so the
  // Home auto-trigger stops re-pushing this modal in a loop.
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

  return (
    <AtmosphericGradient theme="dawn">
      {/* F2: Confetti dots — skipped when reduce-motion is on */}
      {!reducedMotion && (
        <View style={styles.confettiLayer} pointerEvents="none">
          {[...Array(12)].map((_, i) => {
            const left = (i * 37) % 90;
            const top = (i * 23 + 15) % 60;
            const size = 4 + (i % 3) * 2;
            const color = [colors.primary, colors.primaryContainer, colors.secondaryFixedDim, colors.tertiaryContainer][i % 4];
            return (
              <View
                key={i}
                style={[
                  styles.confetti,
                  {
                    left: `${left}%`,
                    top: `${top}%`,
                    width: size, height: size,
                    backgroundColor: color,
                    opacity: 0.7,
                  },
                ]}
              />
            );
          })}
        </View>
      )}

      <View style={[styles.content, { paddingTop: insets.top + spacing.xxl }]}>
        <Pressable
          onPress={onClose}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Close milestone"
          hitSlop={12}
        >
          <Text style={styles.closeX}>×</Text>
        </Pressable>

        <Animated.Text entering={FadeInUp.duration(400)} style={styles.eyebrow}>
          A MILESTONE
        </Animated.Text>

        {/* Hero number — sits inside a soft coral orb with outer glow + a small
            flame glyph tucked top-right as a decorative accent. */}
        <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.heroOrb}>
          <View style={styles.heroGlow} />
          <Text style={styles.heroNumber}>{dayShown}</Text>
          <View style={styles.heroFlameBadge} pointerEvents="none">
            <DecorGlyph variant="flame" size={32} />
          </View>
        </Animated.View>

        <Animated.Text entering={FadeInUp.delay(250).duration(400)} style={styles.milestoneTitle}>
          {dayShown === 1 ? 'day sugar-free' : 'days sugar-free'}
        </Animated.Text>

        <View style={styles.divider} />

        {/* Stats row — computed from real activity, with small glyph leaders */}
        <Animated.View entering={FadeInDown.delay(350).duration(400)} style={styles.statsRow}>
          <View style={styles.stat}>
            <DecorGlyph variant="heart" size={22} />
            <Text style={styles.statNumber}>{cravingsMet}</Text>
            <Text style={styles.statLabel}>{cravingsMet === 1 ? 'craving met' : 'cravings met'}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <DecorGlyph variant="compass" size={22} />
            <Text style={styles.statNumber}>${dollarsSaved}</Text>
            <Text style={styles.statLabel}>saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <DecorGlyph variant="snowflake" size={22} />
            <Text style={styles.statNumber}>{kgSugarAvoided}kg</Text>
            <Text style={styles.statLabel}>sugar avoided</Text>
          </View>
        </Animated.View>

        <Animated.Text entering={FadeInDown.delay(450).duration(400)} style={styles.quote}>
          You placed a large stone today. Each day adds another to the path.
        </Animated.Text>
      </View>

      {/* Actions */}
      <View style={[styles.actions, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Pressable
          onPress={() => router.push('/(modals)/share-card')}
          style={styles.shareBtn}
          accessibilityRole="button"
          accessibilityLabel="Share this chapter"
        >
          <Text style={styles.shareLabel}>Share this chapter</Text>
        </Pressable>
        <PillCTA label="Back to today" onPress={onClose} />
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  confettiLayer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, height: '50%',
  },
  confetti: {
    position: 'absolute',
    borderRadius: radius.full,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  closeBtn: {
    position: 'absolute',
    top: spacing.md, right: spacing.lg,
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: { fontSize: 22, color: colors.onSurface, lineHeight: 22, fontFamily: fonts.headlineLight },

  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.xxl,
  },

  heroOrb: {
    width: 180, height: 180, borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    marginTop: spacing.md,
    shadowColor: colors.primary,
    shadowOpacity: 0.4, shadowRadius: 40, shadowOffset: { width: 0, height: 20 },
    elevation: 12,
  },
  heroGlow: {
    position: 'absolute',
    width: 220, height: 220, borderRadius: radius.full,
    backgroundColor: 'rgba(165,60,48,0.15)',
  },
  heroFlameBadge: {
    position: 'absolute',
    top: -8, right: -8,
    width: 48, height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  heroNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 96,
    color: colors.onPrimary,
    letterSpacing: -4,
    lineHeight: 96,
  },

  milestoneTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    letterSpacing: -0.8,
    marginTop: spacing.sm,
  },

  divider: {
    width: 40, height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
    marginVertical: spacing.md,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  stat: { alignItems: 'center', gap: 2, flex: 1 },
  statNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.titleLarge,
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
    textAlign: 'center',
  },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(49,51,47,0.1)' },

  quote: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
    marginTop: spacing.md,
    maxWidth: 320,
  },

  actions: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  shareBtn: {
    padding: spacing.md,
  },
  shareLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },
});

import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../../components/ui/AuraBlob';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

/**
 * Progress — Tactical Liftoff Confirmed.
 * Matches stitch-try-1 progress-liftoff-confirmed:
 *   TRAJECTORY + ACTIVE → "Day NN. Liftoff confirmed." →
 *   MISSION PROGRESS · pct% · N DAYS TO ORBIT →
 *   orbital arc card → two stat cards →
 *   summary "You're NN days…" + inline "· KEEP BURNING ·"
 */
export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const streakDays = useUserStore((s) => s.streakDays);
  const cravings = useUserStore((s) => s.cravings);
  const sosLog = useUserStore((s) => s.sosLog);

  const currentDay = Math.max(1, streakDays);
  const daysLeft = Math.max(0, 90 - currentDay);
  const missionPct = Math.min(100, Math.round((currentDay / 90) * 100));
  const dayPadded = String(currentDay).padStart(2, '0');

  // Stats
  const sosWalked = sosLog.filter((s) => s.outcome === 'walked' || s.outcome === 'softer').length;
  const cravingsWalked = cravings.filter((c) => c.outcome === 'walked').length;
  const cravingsCrushed = sosWalked + cravingsWalked;

  const goMilestones = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/progress/milestones');
  };
  const onKeepBurning = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(modals)/sos-transmission');
  };

  return (
    <AtmosphericGradient theme="darkHorizon">

      {/* Background aura blobs — dark-horizon safe tints */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral"  size={320} style={styles.auraTopRight}    intensity={0.4} drift={20} />
        <AuraBlob tint="golden" size={260} style={styles.auraBottomRight} intensity={0.3} drift={16} />
      </View>

      {/* ── NAV ── */}
      <View style={[styles.nav, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>SUGAR_QUIT</Text>
        </View>
        <Text style={styles.navCenter}>TRAJECTORY</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>S</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 160 }]}
        showsVerticalScrollIndicator={false}
      >

        {/* ── HERO ── */}
        <Animated.View entering={FadeInUp.duration(500)} style={styles.heroSection}>

          {/* Eyebrow: TRAJECTORY + ACTIVE */}
          <View style={styles.eyebrowRow}>
            <View style={styles.eyebrowPill}>
              <Text style={styles.eyebrowText}>TRAJECTORY</Text>
            </View>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>ACTIVE</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.heroDay}>
            {'Day '}
            <Text style={styles.heroDayNum}>{dayPadded}</Text>
            {'.'}
          </Text>
          <Text style={styles.heroLiftoff}>Liftoff confirmed.</Text>

          {/* Mission sub */}
          <Text style={styles.missionSub}>
            {'✈ MISSION PROGRESS · '}
            <Text style={styles.missionPct}>{missionPct}%</Text>
            {` · ${daysLeft} DAYS TO ORBIT`}
          </Text>
        </Animated.View>

        {/* ── ORBITAL ARC CARD ── */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.arcCard}>
          {/* Outer arc circle */}
          <View style={styles.arcCircle} />
          {/* Inner arc circle for depth */}
          <View style={styles.arcCircleInner} />

          {/* YOU marker — bottom-left zone */}
          <View style={styles.arcYouMarker}>
            <View style={styles.arcYouDot} />
            <Text style={styles.arcYouLabel}>YOU</Text>
          </View>

          {/* Goal marker — top-right zone */}
          <View style={styles.arcGoalMarker}>
            <View style={styles.arcGoalDot} />
            <Text style={styles.arcGoalLabel}>{`${daysLeft}D`}</Text>
          </View>

          {/* Progress dot on arc */}
          <View style={styles.arcProgressDot} />
        </Animated.View>

        {/* ── STATS: two white cards ── */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <Pressable
            onPress={goMilestones}
            style={styles.statCards}
            accessibilityRole="button"
            accessibilityLabel="Milestones details"
          >
            <View style={styles.statCard}>
              <Text style={styles.statCardLabel}>CRAVINGS CRUSHED</Text>
              <Text style={styles.statCardNum}>{String(cravingsCrushed).padStart(2, '0')}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statCardLabel, styles.statCardLabelAccent]}>DAYS CLEAN</Text>
              <Text style={[styles.statCardNum, styles.statCardNumAccent]}>{dayPadded}</Text>
            </View>
          </Pressable>
        </Animated.View>

        {/* ── SUMMARY + inline KEEP BURNING ── */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.summarySection}>
          <Text style={styles.summaryText}>
            {"You're "}
            <Text style={styles.summaryBold}>{dayPadded}</Text>
            {' days into a new life.'}
          </Text>
          <View style={styles.summaryFooterRow}>
            <Text style={styles.summaryRemain}>{`· ${daysLeft} DAYS REMAIN · `}</Text>
            <Pressable onPress={onKeepBurning}>
              <Text style={styles.keepBurning}>KEEP BURNING</Text>
            </Pressable>
            <Text style={styles.summaryRemain}>{' ·'}</Text>
          </View>
        </Animated.View>

      </ScrollView>

    </AtmosphericGradient>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const DARK_TEXT    = 'rgba(255,255,255,0.95)';
const DARK_BODY    = 'rgba(255,255,255,0.60)';
const DARK_WHISPER = 'rgba(255,255,255,0.35)';

const styles = StyleSheet.create({

  // ── Nav ──────────────────────────────────────────────────────────────────
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    zIndex: 10,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoMark: {
    width: 10, height: 10, borderRadius: radius.full,
    backgroundColor: colors.primaryFixedDim,
  },
  brandWord: {
    fontFamily: fonts.label,
    fontSize: typeScale.label,
    color: DARK_TEXT,
    letterSpacing: tracking.labelWide,
  },
  navCenter: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: DARK_BODY,
    letterSpacing: tracking.labelWide,
  },
  avatar: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyMedium,
    color: DARK_TEXT,
  },

  // ── Scroll ───────────────────────────────────────────────────────────────
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },

  // ── Hero ─────────────────────────────────────────────────────────────────
  heroSection: { marginBottom: spacing.xl },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  eyebrowPill: {
    borderWidth: 1,
    borderColor: colors.primaryFixedDim,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  eyebrowText: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primaryFixedDim,
    letterSpacing: tracking.labelWide,
  },
  activeBadge: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  activeBadgeText: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: DARK_BODY,
    letterSpacing: tracking.labelWide,
  },
  heroDay: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge + 10,
    color: DARK_TEXT,
    letterSpacing: -1.5,
    lineHeight: 68,
  },
  heroDayNum: {
    color: colors.primaryFixedDim,
  },
  heroLiftoff: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge + 10,
    color: DARK_TEXT,
    letterSpacing: -1.5,
    lineHeight: 68,
    marginBottom: spacing.lg,
  },
  missionSub: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: DARK_WHISPER,
    letterSpacing: tracking.wide,
  },
  missionPct: {
    color: colors.primaryFixedDim,
  },

  // ── Orbital arc card ─────────────────────────────────────────────────────
  arcCard: {
    backgroundColor: '#ffffff',
    borderRadius: radius.md,
    height: 160,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: spacing.lg,
  },
  // Large circle — center at bottom-left so only top-right quarter shows
  arcCircle: {
    position: 'absolute',
    width: 340,
    height: 340,
    borderRadius: 170,
    bottom: -110,
    left: -110,
    borderWidth: 1.5,
    borderColor: 'rgba(165,60,48,0.35)',
    // borderStyle 'dashed' doesn't work on iOS circles — use solid with opacity
  },
  arcCircleInner: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    bottom: -80,
    left: -80,
    borderWidth: 1,
    borderColor: 'rgba(165,60,48,0.15)',
  },
  arcYouMarker: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    alignItems: 'center',
    gap: 4,
  },
  arcYouDot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: colors.primary,
  },
  arcYouLabel: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: colors.primary,
    letterSpacing: tracking.wide,
  },
  arcGoalMarker: {
    position: 'absolute',
    top: 16,
    right: 20,
    alignItems: 'center',
    gap: 4,
  },
  arcGoalDot: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(165,60,48,0.4)',
    backgroundColor: 'rgba(165,60,48,0.08)',
  },
  arcGoalLabel: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: 'rgba(0,0,0,0.4)',
    letterSpacing: tracking.wide,
  },
  arcProgressDot: {
    position: 'absolute',
    // Positioned roughly at the arc line based on missionPct (~2% = near start)
    bottom: 60,
    left: 60,
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },

  // ── Stat cards (two side by side) ────────────────────────────────────────
  statCards: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  statCardLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: 'rgba(0,0,0,0.45)',
    letterSpacing: tracking.labelWide,
  },
  statCardLabelAccent: {
    color: colors.primary,
  },
  statCardNum: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge + 8,
    color: colors.inverseSurface,
    letterSpacing: -2,
    lineHeight: 72,
  },
  statCardNumAccent: {
    color: colors.primary,
  },

  // ── Summary ───────────────────────────────────────────────────────────────
  summarySection: {
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  summaryText: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    color: DARK_TEXT,
    lineHeight: 30,
  },
  summaryBold: {
    color: colors.primaryFixedDim,
    fontFamily: fonts.headlineExtraBold,
  },
  summaryFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  summaryRemain: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: DARK_WHISPER,
    letterSpacing: tracking.labelWide,
  },
  keepBurning: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primaryFixedDim,
    letterSpacing: tracking.labelWide,
    textDecorationLine: 'underline',
  },

  // ── Background aura ───────────────────────────────────────────────────────
  auraLayer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  auraTopRight:    { position: 'absolute', top: -60, right: -120 },
  auraBottomRight: { position: 'absolute', bottom: '20%', right: -100 },
});

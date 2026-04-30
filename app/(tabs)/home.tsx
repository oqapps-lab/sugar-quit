import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { TokenDot } from '../../components/ui/TokenDot';
import {
  colors,
  fonts,
  gradients,
  radius,
  spacing,
  tracking,
  typeScale,
} from '../../constants/tokens';
import {
  getMilestoneDueIfAny,
  getTodayISODate,
  getYesterdayISODate,
  useUserStore,
} from '../../stores/useUserStore';

const TOTAL_DAYS = 90;
const DOT_COUNT  = 10;
const NAV_HEIGHT = 56;

/**
 * Home — Tactical Daily Command.
 * Light-dawn theme matching the Stitch design:
 *  - Cream atmospheric background
 *  - Giant dark streak number with pink glow
 *  - "This craving is dying. Not you."
 *  - STRIKE (pink pill) / BREATHE (black pill) / LOG (black pill)
 */
export default function Home() {
  const insets = useSafeAreaInsets();
  const rm     = useReducedMotion();

  // ── Store ────────────────────────────────────────────────────────────────────
  const streakDays           = useUserStore((s) => s.streakDays);
  const firstName            = useUserStore((s) => s.firstName);
  const lastCheckInDate      = useUserStore((s) => s.lastCheckInDate);
  const milestonesCelebrated = useUserStore((s) => s.milestonesCelebrated);
  const pushDenied           = useUserStore((s) => s.pushPermissionDenied);
  const pushDeniedAt         = useUserStore((s) => s.pushDeniedAt);
  const sosDisclaimerAccepted = useUserStore((s) => s.sosDisclaimerAccepted);
  const markMilestoneCelebrated = useUserStore((s) => s.markMilestoneCelebrated);

  // ── Derived ──────────────────────────────────────────────────────────────────
  const daysToLaunch = Math.max(0, TOTAL_DAYS - streakDays);
  const missionPct   = Math.min(100, Math.round((streakDays / TOTAL_DAYS) * 100));

  // Push re-permission banner (show if denied 3+ days ago)
  let showPushBanner = false;
  if (pushDenied && pushDeniedAt) {
    const today = getTodayISODate();
    const [y1, m1, d1] = pushDeniedAt.split('-').map(Number);
    const [y2, m2, d2] = today.split('-').map(Number);
    const daysSince =
      (Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000;
    if (daysSince >= 3) showPushBanner = true;
  }

  // ── Auto-triggers on mount ───────────────────────────────────────────────────
  useEffect(() => {
    const today     = getTodayISODate();
    const yesterday = getYesterdayISODate(today);
    if (
      streakDays > 0 &&
      lastCheckInDate &&
      lastCheckInDate !== today &&
      lastCheckInDate !== yesterday
    ) {
      router.push('/(modals)/streak-freeze');
      return;
    }
    const due = getMilestoneDueIfAny(streakDays, milestonesCelebrated);
    if (due !== null) {
      markMilestoneCelebrated(due);
      router.push('/(modals)/milestone');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── LIVE dot pulse ────────────────────────────────────────────────────────────
  const liveDotOpacity = useSharedValue(1);
  useEffect(() => {
    if (rm) return;
    liveDotOpacity.value = withRepeat(
      withTiming(0.2, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    return () => cancelAnimation(liveDotOpacity);
  }, [rm, liveDotOpacity]);
  const liveDotStyle = useAnimatedStyle(() => ({ opacity: liveDotOpacity.value }));

  // ── Navigation handlers ───────────────────────────────────────────────────────
  const onStrike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    router.push(sosDisclaimerAccepted ? '/(modals)/sos-transmission' : '/(modals)/disclaimer');
  };
  const onBreathe = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(modals)/sos-transmission');
  };
  const onLog = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(modals)/checkin');
  };

  const avatarInitial = (firstName?.[0] ?? 'S').toUpperCase();

  return (
    <AtmosphericGradient theme="dawn">

      {/* Background aura blobs */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral"    size={340} style={styles.auraTopRight}    intensity={0.55} drift={24} />
        <AuraBlob tint="lavender" size={280} style={styles.auraMidLeft}     intensity={0.45} drift={18} />
        <AuraBlob tint="golden"   size={220} style={styles.auraBottomRight} intensity={0.5}  drift={16} />
      </View>

      {/* Push re-permission banner */}
      {showPushBanner && (
        <View style={[styles.pushBanner, { top: insets.top + 4 }]}>
          <View style={styles.pushBannerDot} />
          <Text style={styles.pushBannerText}>
            Включите уведомления, чтобы не пропустить тягу
          </Text>
          <Pressable onPress={() => router.push('/(onboarding)/push-permission')}>
            <Text style={styles.pushBannerCta}>Включить →</Text>
          </Pressable>
        </View>
      )}

      {/* ── Nav bar ── */}
      <View style={[styles.nav, { paddingTop: insets.top + spacing.xs }]}>
        <View style={styles.navLeft}>
          <View style={styles.logoMark} />
          <Text style={styles.navBrand}>SUGAR_QUIT</Text>
        </View>
        <View style={styles.navRight}>
          <Pressable
            onPress={() => router.push('/(tabs)/profile')}
            style={styles.livePill}
            accessibilityRole="button"
            accessibilityLabel="Профиль"
          >
            <Animated.View style={[styles.livePillDot, liveDotStyle]} />
            <Text style={styles.livePillLabel}>LIVE</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(tabs)/profile')}
            style={styles.avatar}
            accessibilityRole="button"
            accessibilityLabel="Открыть профиль"
          >
            <Text style={styles.avatarInitial}>{avatarInitial}</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + NAV_HEIGHT + spacing.xl,
            paddingBottom: insets.bottom + 220,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Hero ── */}
        <Animated.View entering={FadeInUp.duration(420)} style={styles.heroSection}>
          <Text style={styles.heroEyebrow}>SUGAR-FREE</Text>

          {/* Giant streak number with pink radial glow */}
          <View style={styles.heroNumRow}>
            <View style={styles.heroGlow} />
            <Text style={styles.heroNum}>
              {String(streakDays).padStart(2, '0')}
            </Text>
          </View>

          <Text style={styles.heroSubLabel}>
            {`DAYS · ${daysToLaunch} TO LAUNCH`}
          </Text>
        </Animated.View>

        {/* ── Dot grid (10 dots) ── */}
        <Animated.View entering={FadeInUp.delay(80).duration(420)} style={styles.dotBlock}>
          <View style={styles.dotGrid}>
            {[...Array(DOT_COUNT)].map((_, i) => (
              <TokenDot key={i} filled={i < Math.min(streakDays, DOT_COUNT)} size={10} />
            ))}
          </View>
          <Text style={styles.dotLabel}>
            {`${String(streakDays).padStart(2, '0')} / ${TOTAL_DAYS} · GALAXY UNLOCKED`}
          </Text>
        </Animated.View>

        {/* ── Mission progress bar ── */}
        <Animated.View entering={FadeInUp.delay(120).duration(420)} style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={gradients.pillCta.colors}
              start={gradients.pillCta.start}
              end={gradients.pillCta.end}
              style={[styles.progressFill, { width: `${missionPct}%` }]}
            />
          </View>
          <Text style={styles.progressLabel}>{`MISSION PROGRESS · ${missionPct}%`}</Text>
        </Animated.View>

        {/* ── Tactical text (no card) ── */}
        <Animated.View entering={FadeInDown.delay(160).duration(400)} style={styles.strikeBlock}>
          <Text style={styles.strikeHeadline}>
            {'This craving is '}
            <Text style={styles.strikeAccent}>dying.</Text>
          </Text>
          <Text style={styles.strikeHeadline}>Not you.</Text>
        </Animated.View>

        {/* ── Action stack: STRIKE / BREATHE / LOG — pill shaped ── */}
        <Animated.View entering={FadeInDown.delay(220).duration(400)} style={styles.actionStack}>

          {/* STRIKE — pink gradient pill */}
          <Pressable
            onPress={onStrike}
            style={styles.actionBtnStrike}
            accessibilityRole="button"
            accessibilityLabel="Strike — open SOS command"
          >
            <LinearGradient
              colors={['#b50058', '#ff709e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.actionBtnGradient}
            >
              <Text style={styles.actionIconStrike}>⚡</Text>
              <Text style={styles.actionLabelStrike}>STRIKE</Text>
            </LinearGradient>
          </Pressable>

          {/* BREATHE — black pill */}
          <Pressable
            onPress={onBreathe}
            style={styles.actionBtnBlack}
            accessibilityRole="button"
            accessibilityLabel="Breathe — open breathing protocol"
          >
            <Text style={styles.actionIconBlack}>≈</Text>
            <Text style={styles.actionLabelBlack}>BREATHE</Text>
          </Pressable>

          {/* LOG — black pill */}
          <Pressable
            onPress={onLog}
            style={styles.actionBtnBlack}
            accessibilityRole="button"
            accessibilityLabel="Log — open daily check-in"
          >
            <Text style={styles.actionIconBlack}>▶</Text>
            <Text style={styles.actionLabelBlack}>LOG</Text>
          </Pressable>

        </Animated.View>

      </ScrollView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({

  // ── Aura layer ───────────────────────────────────────────────────────────────
  auraLayer:       { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  auraTopRight:    { position: 'absolute', top: -80,    right: -120 },
  auraMidLeft:     { position: 'absolute', top: '35%',  left: -140 },
  auraBottomRight: { position: 'absolute', bottom: '25%', right: -80 },

  // ── Push banner ──────────────────────────────────────────────────────────────
  pushBanner: {
    position: 'absolute',
    left: spacing.lg, right: spacing.lg,
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: 'rgba(255,172,160,0.4)',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderWidth: 1, borderColor: 'rgba(165,60,48,0.2)',
    zIndex: 20,
  },
  pushBannerDot: {
    width: 6, height: 6, borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  pushBannerText: {
    flex: 1, fontFamily: fonts.body, fontSize: typeScale.bodySmall,
    color: colors.onPrimaryContainer,
  },
  pushBannerCta: {
    fontFamily: fonts.bodySemibold, fontSize: typeScale.bodySmall,
    color: colors.primary,
  },

  // ── Nav bar ──────────────────────────────────────────────────────────────────
  nav: {
    position: 'absolute', top: 0, left: 0, right: 0,
    zIndex: 50, height: NAV_HEIGHT + 40,
    flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingBottom: spacing.sm,
  },
  navLeft:  { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  logoMark: {
    width: 10, height: 10, borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  navBrand: {
    fontFamily: fonts.label, fontSize: typeScale.bodyMedium,
    color: colors.onSurface, letterSpacing: tracking.labelWide,
  },
  navRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  livePill: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm + 4, paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  livePillDot: {
    width: 6, height: 6, borderRadius: radius.full,
    backgroundColor: colors.onPrimary,
  },
  livePillLabel: {
    fontFamily: fonts.label, fontSize: typeScale.labelSmall,
    color: colors.onPrimary, letterSpacing: tracking.label,
  },
  avatar: {
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: fonts.headlineSemibold, fontSize: typeScale.bodySmall,
    color: colors.onSurface,
  },

  // ── Scroll ───────────────────────────────────────────────────────────────────
  scroll: { paddingHorizontal: spacing.lg },

  // ── Hero ─────────────────────────────────────────────────────────────────────
  heroSection: { alignItems: 'center', marginBottom: spacing.xl },
  heroEyebrow: {
    fontFamily: fonts.label, fontSize: typeScale.bodyMedium,
    color: colors.primary, letterSpacing: tracking.labelWidest,
    marginBottom: spacing.md,
  },
  heroNumRow: {
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.md,
    // Primary pink glow around the number (Stitch: glow-aura)
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
  },
  // Soft pink blush circle behind the number
  heroGlow: {
    position: 'absolute',
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: colors.primaryContainer,
    opacity: 0.35,
  },
  heroNum: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 128,
    color: colors.inverseSurface,
    letterSpacing: -5,
    lineHeight: 132,
  },
  heroSubLabel: {
    fontFamily: fonts.label, fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant, letterSpacing: tracking.labelWide,
    marginTop: spacing.sm,
  },

  // ── Dot grid ─────────────────────────────────────────────────────────────────
  dotBlock: { alignItems: 'center', marginBottom: spacing.lg, gap: spacing.sm },
  dotGrid:  { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dotLabel: {
    fontFamily: fonts.label, fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant, letterSpacing: tracking.wide,
  },

  // ── Progress bar ─────────────────────────────────────────────────────────────
  progressWrap: { marginBottom: spacing.xl, gap: spacing.xs },
  progressTrack: {
    height: 4, borderRadius: 2,
    backgroundColor: colors.surfaceContainerHighest,
    overflow: 'hidden',
  },
  progressFill:  { height: '100%', borderRadius: 2 },
  progressLabel: {
    fontFamily: fonts.label, fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant, letterSpacing: tracking.wide,
    textAlign: 'right',
  },

  // ── Strike text block ────────────────────────────────────────────────────────
  strikeBlock: {
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    marginTop: spacing.sm,
  },
  strikeHeadline: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    letterSpacing: tracking.tight,
    lineHeight: 38,
  },
  strikeAccent: {
    fontStyle: 'italic',
    color: colors.primary,
  },

  // ── Action stack: STRIKE / BREATHE / LOG — all pills ─────────────────────────
  actionStack: {
    flexDirection: 'column', gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  // STRIKE — Stitch gradient pill: #b50058 → #ff709e, rounded-[20px]
  actionBtnStrike: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.primary,       // rgba(181,0,88,0.3) = Stitch glow-aura
    shadowOpacity: 0.4,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  actionBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md + 4,
    paddingHorizontal: spacing.lg,
  },
  actionIconStrike:  { fontSize: 18, lineHeight: 22 },
  actionLabelStrike: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.bodyLarge,
    color: colors.onPrimary,
    letterSpacing: tracking.wide,
  },

  // BREATHE / LOG — bg-inverse-surface = #090f11, rounded-[20px]
  actionBtnBlack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.inverseSurface,
    borderRadius: 20,
    paddingVertical: spacing.md + 4,
    paddingHorizontal: spacing.lg,
    shadowColor: '#811cd9',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  actionIconBlack: {
    fontSize: 16, lineHeight: 20,
    color: 'rgba(255,255,255,0.65)',
  },
  actionLabelBlack: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.bodyLarge,
    color: '#ffffff',
    letterSpacing: tracking.wide,
  },
});

import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../../components/ui/AuraBlob';
import { DecorGlyph } from '../../../components/ui/DecorGlyph';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, shadows, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

/**
 * Progress — 90-Day Journey on Dark Horizon gradient.
 * Modern app typography — no serif italic.
 */
export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const streakDays = useUserStore((s) => s.streakDays);
  const cravings = useUserStore((s) => s.cravings);
  const sosLog = useUserStore((s) => s.sosLog);
  const currentDay = Math.max(1, streakDays);

  // Hero copy by phase — replaces hardcoded "The subtle shift / Two weeks in"
  const phase: { title: string; body: string } =
    currentDay <= 3
      ? { title: 'The first decision', body: 'Day one or three or now — the only act that matters is that you started.' }
      : currentDay <= 7
      ? { title: 'The 72-hour line', body: 'Withdrawal peaks then eases. By the end of week one, the worst is behind you.' }
      : currentDay <= 14
      ? { title: 'The subtle shift', body: 'Two weeks in. The storm has passed; the quiet is starting to feel normal.' }
      : currentDay <= 30
      ? { title: 'New defaults forming', body: 'Your reflexes are rewiring. Sugar slips out of the auto-reach.' }
      : currentDay <= 60
      ? { title: 'Identity, not effort', body: "You don't decide each time anymore. The choice has become who you are." }
      : { title: 'The horizon', body: 'You walk past the candy aisle without noticing it. The path is yours now.' };

  // Stats — same honest formulas as Profile / Milestone
  const sosWalked = sosLog.filter((s) => s.outcome === 'walked' || s.outcome === 'softer').length;
  const cravingsWalked = cravings.filter((c) => c.outcome === 'walked').length;
  const cravingsMet = sosWalked + cravingsWalked;
  const dollarsSaved = (currentDay * 1.5).toFixed(0);
  const kgSugar = (currentDay * 0.025).toFixed(1);

  const goWeekly = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/progress/weekly');
  };
  const goMilestones = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/progress/milestones');
  };

  const nodes = [
    { label: 'Arrival',  phase: 'Week 1', state: 'done' as const,     glyph: 'compass' as const },
    { label: 'Detox',    phase: 'Week 2', state: 'done' as const,     glyph: 'flame' as const },
    { label: 'Exhale',   phase: 'Now',    state: 'current' as const,  glyph: 'moon' as const },
    { label: 'Clarity',  phase: 'Week 4', state: 'upcoming' as const, glyph: 'sun' as const },
    { label: 'Horizon',  phase: 'Day 90', state: 'goal' as const,     glyph: 'orbit' as const },
  ];

  // Health Timeline — physiological markers per FEATURES.md.
  // Each entry has a `unlocksAt` day. Items with day <= currentDay show as
  // "happening" (active state); the rest read as quiet upcoming text.
  const healthMarkers = [
    { day: 1,  label: 'Insulin spikes soften',          detail: 'Within hours of cutting refined sugar.' },
    { day: 3,  label: 'Cravings peak, then ease',       detail: 'Dopamine receptors recalibrating.' },
    { day: 7,  label: 'Sleep depth increases',          detail: 'Cortisol rhythm normalizing.' },
    { day: 14, label: 'Taste buds regenerate',          detail: 'Fruit registers ~40% sweeter.' },
    { day: 30, label: 'Liver fat measurably reduces',   detail: 'Average ~10% drop in NAFLD markers.' },
    { day: 60, label: 'Inflammation markers drop',      detail: 'CRP and HbA1c trending down.' },
    { day: 90, label: 'Insulin sensitivity peaks',      detail: 'Metabolic flexibility restored.' },
  ];

  return (
    <AtmosphericGradient theme="darkHorizon">
      {/* Background aura blobs — dark-horizon safe tints, low intensity */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.4} drift={20} />
        <AuraBlob tint="golden" size={260} style={styles.auraBottomRight} intensity={0.3} drift={16} />
      </View>

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>Sugar Quit</Text>
        </View>
        <Text style={styles.roadmapLabel}>Journey</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>S</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 160 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero — phase-aware copy with a decorative sun/moon glyph */}
        <Animated.View entering={FadeInUp.duration(500)} style={styles.heroSection}>
          <View style={styles.heroRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroEyebrow}>{`DAY ${currentDay} OF 90`}</Text>
              <Text style={styles.heroTitle}>{phase.title}</Text>
            </View>
            {/* Sun-like on early days, moon-like later — mood shift */}
            <DecorGlyph variant={currentDay <= 14 ? 'sun' : 'orbit'} size={72} />
          </View>
          <Text style={styles.heroBody}>{phase.body}</Text>
        </Animated.View>

        {/* Timeline (weekly preview) */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
        <Pressable
          onPress={goWeekly}
          style={styles.timelineSection}
          accessibilityRole="button"
          accessibilityLabel="Weekly progress details"
        >
          <View style={styles.horizonLine} />
          <View style={styles.nodesRow}>
            {nodes.map((n, i) => (
              <View key={i} style={styles.nodeCol}>
                <Text
                  style={[
                    styles.nodeLabel,
                    n.state === 'current' && styles.nodeLabelActive,
                    n.state === 'upcoming' && styles.nodeLabelDim,
                    n.state === 'goal' && styles.nodeLabelDim,
                  ]}
                >
                  {n.label}
                </Text>

                <View style={styles.nodeWrap}>
                  {n.state === 'current' && <View style={styles.nodeGlow} />}
                  <View
                    style={[
                      styles.nodeGlyphBg,
                      n.state === 'done' && styles.nodeBgDone,
                      n.state === 'current' && styles.nodeBgCurrent,
                      n.state === 'upcoming' && styles.nodeBgUpcoming,
                      n.state === 'goal' && styles.nodeBgGoal,
                    ]}
                  >
                    <View
                      style={[
                        styles.nodeGlyphInner,
                        n.state === 'upcoming' && { opacity: 0.45 },
                        n.state === 'goal' && { opacity: 0.55 },
                      ]}
                    >
                      <DecorGlyph variant={n.glyph} size={n.state === 'current' ? 22 : 18} />
                    </View>
                  </View>
                </View>

                <Text style={[styles.nodePhase, n.state === 'current' && styles.nodePhaseActive]}>
                  {n.phase}
                </Text>
              </View>
            ))}
          </View>
        </Pressable>
        </Animated.View>

        {/* Details card — internal gradient overlay for depth (insightCard tokens) */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.detailsWrap}>
          <LinearGradient
            colors={['rgba(106,87,127,0.55)', 'rgba(165,60,48,0.35)'] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.detailsGradient}
          />
          <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsLabel}>TODAY'S FOCUS</Text>
          </View>

          <Text style={styles.detailsTitle}>Deepening the rhythmic pattern</Text>
          <Text style={styles.detailsSub}>
            Your body is learning a new cadence. Two practices to support the shift.
          </Text>

          <View style={styles.practicesList}>
            <View style={styles.practiceRow}>
              <View style={styles.practiceNumber}><Text style={styles.practiceNumberText}>1</Text></View>
              <View style={styles.practiceContent}>
                <Text style={styles.practiceTitle}>Conscious breathwork</Text>
                <Text style={styles.practiceBody}>15 min · morning session</Text>
              </View>
            </View>

            <View style={styles.practiceRow}>
              <View style={styles.practiceNumber}><Text style={styles.practiceNumberText}>2</Text></View>
              <View style={styles.practiceContent}>
                <Text style={styles.practiceTitle}>Mental mapping</Text>
                <Text style={styles.practiceBody}>Reflect on transition points</Text>
              </View>
            </View>
          </View>

          <PillCTA
            label="Begin session"
            variant="lightOnDark"
            onPress={() => router.push('/(modals)/sos')}
            style={styles.sessionCTA}
          />
          </View>
        </Animated.View>

        {/* Health Timeline — physiological markers per FEATURES.md G4 */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.healthSection}>
          <Text style={styles.sectionLabel}>HEALTH TIMELINE</Text>
          <Text style={styles.sectionHint}>What's happening in your body, not just your mind.</Text>
          <View style={styles.healthList}>
            {healthMarkers.map((m, i) => {
              const reached = currentDay >= m.day;
              return (
                <Animated.View
                  key={m.day}
                  entering={FadeInDown.delay(80 + i * 70).duration(400)}
                  style={styles.healthRow}
                >
                  <View style={[styles.healthDot, reached && styles.healthDotActive]} />
                  <View style={styles.healthLine} />
                  <View style={styles.healthText}>
                    <View style={styles.healthHeadRow}>
                      <Text style={[styles.healthDay, reached && styles.healthDayActive]}>
                        {`DAY ${m.day}`}
                      </Text>
                      {reached && <Text style={styles.healthBadge}>HAPPENING</Text>}
                    </View>
                    <Text style={[styles.healthLabel, reached && styles.healthLabelActive]}>
                      {m.label}
                    </Text>
                    <Text style={[styles.healthDetail, reached && styles.healthDetailActive]}>
                      {m.detail}
                    </Text>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>

        {/* Quick stats row (milestones entry) */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
        <Pressable
          onPress={goMilestones}
          style={styles.statsRow}
          accessibilityRole="button"
          accessibilityLabel="Milestones — your stones"
        >
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{cravingsMet}</Text>
            <Text style={styles.statLabel}>cravings met</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>${dollarsSaved}</Text>
            <Text style={styles.statLabel}>saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{kgSugar}kg</Text>
            <Text style={styles.statLabel}>sugar avoided</Text>
          </View>
        </Pressable>
        </Animated.View>
      </ScrollView>

    </AtmosphericGradient>
  );
}

const DARK_TEXT = 'rgba(255,255,255,0.95)';
const DARK_BODY = 'rgba(255,255,255,0.6)';
const DARK_WHISPER = 'rgba(255,255,255,0.35)';

const styles = StyleSheet.create({
  header: {
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
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleSmall,
    color: DARK_TEXT,
    letterSpacing: -0.2,
  },
  roadmapLabel: {
    fontFamily: fonts.headlineMedium,
    fontSize: typeScale.bodyLarge,
    color: DARK_TEXT,
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

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },

  heroSection: { marginBottom: spacing.xxl, marginTop: spacing.lg },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  heroEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primaryFixedDim,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge + 6,
    color: DARK_TEXT,
    letterSpacing: -1.2,
    lineHeight: 44,
    marginBottom: spacing.md,
  },
  heroBody: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyLarge,
    color: DARK_BODY,
    lineHeight: 22,
    maxWidth: 320,
  },

  timelineSection: {
    marginBottom: spacing.xxl,
    position: 'relative',
  },
  horizonLine: {
    position: 'absolute',
    left: 20, right: 20,
    top: 54,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  nodesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 24,
    paddingHorizontal: spacing.xs,
  },
  nodeCol: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  nodeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.labelSmall + 1,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: spacing.xs,
  },
  nodeLabelActive: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyMedium,
    color: '#ffffff',
  },
  nodeLabelDim: { color: 'rgba(255,255,255,0.3)' },
  nodeWrap: {
    alignItems: 'center', justifyContent: 'center',
    width: 32, height: 32,
  },
  nodeGlow: {
    position: 'absolute',
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  // Node background pill — holds the DecorGlyph inside
  nodeGlyphBg: {
    width: 32, height: 32, borderRadius: radius.full,
    alignItems: 'center', justifyContent: 'center',
  },
  nodeGlyphInner: {
    width: 22, height: 22,
    alignItems: 'center', justifyContent: 'center',
  },
  nodeBgDone: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  nodeBgCurrent: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  nodeBgUpcoming: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  nodeBgGoal: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  nodePhase: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: tracking.wide,
    textTransform: 'uppercase',
  },
  nodePhaseActive: { color: colors.primaryFixedDim, fontWeight: '700' },

  detailsWrap: {
    marginBottom: spacing.xl,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  detailsGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.sm,
  },
  detailsCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  detailsHeader: { marginBottom: spacing.sm },
  detailsLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primaryFixedDim,
    letterSpacing: tracking.labelWide,
  },
  detailsTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge + 2,
    color: DARK_TEXT,
    letterSpacing: -0.5,
    lineHeight: 28,
    marginBottom: spacing.xs,
  },
  detailsSub: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: DARK_BODY,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  practicesList: { gap: spacing.md, marginBottom: spacing.lg },
  practiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  practiceNumber: {
    width: 28, height: 28, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  practiceNumberText: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.bodyMedium,
    color: DARK_TEXT,
  },
  practiceContent: { flex: 1 },
  practiceTitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyLarge,
    color: DARK_TEXT,
    marginBottom: 2,
  },
  practiceBody: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodySmall,
    color: DARK_WHISPER,
  },
  sessionCTA: { marginTop: spacing.xs },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: radius.sm,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statNumber: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.displaySmall,
    color: DARK_TEXT,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: DARK_WHISPER,
    letterSpacing: tracking.wide,
  },
  statDivider: {
    width: 1, height: 32,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  // Health Timeline
  healthSection: { marginTop: spacing.xxl, marginBottom: spacing.xxl },
  sectionLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primaryFixedDim,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.xs,
  },
  sectionHint: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: DARK_BODY,
    lineHeight: 20,
    marginBottom: spacing.xl,
    maxWidth: 320,
  },
  healthList: { gap: spacing.lg },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    position: 'relative',
  },
  healthDot: {
    width: 12, height: 12, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginTop: 4,
    zIndex: 1,
  },
  healthDotActive: {
    backgroundColor: colors.primaryFixedDim,
    shadowColor: colors.primaryFixedDim,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  healthLine: {
    position: 'absolute',
    left: 5, // (12-2)/2 — half dot width minus half line width
    top: 16,
    bottom: -spacing.lg + 4,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  healthText: { flex: 1, gap: 2, paddingBottom: spacing.xs },
  healthHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 2,
  },
  healthDay: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: DARK_WHISPER,
    letterSpacing: tracking.wide,
  },
  healthDayActive: { color: colors.primaryFixedDim },
  healthBadge: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: colors.onPrimary,
    backgroundColor: colors.primary,
    letterSpacing: tracking.widest,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  healthLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyLarge,
    color: DARK_BODY,
    lineHeight: 22,
  },
  healthLabelActive: { color: DARK_TEXT },
  healthDetail: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodySmall,
    color: DARK_WHISPER,
    lineHeight: 18,
    marginTop: 2,
  },
  healthDetailActive: { color: DARK_BODY },

  // Background aura layer (dark-horizon safe tints)
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -60,
    right: -120,
  },
  auraBottomRight: {
    position: 'absolute',
    bottom: '20%',
    right: -100,
  },
});

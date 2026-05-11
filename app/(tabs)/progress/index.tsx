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
import { t } from '../../../lib/i18n';
import { useUserStore } from '../../../stores/useUserStore';
import { PHASES, phaseForDay, phaseIndexForDay } from '../../../lib/phases';

/**
 * Progress — 90-Day Journey on Dark Horizon gradient.
 * Modern app typography — no serif italic.
 */
export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const streakDays = useUserStore((s) => s.streakDays);
  const firstName = useUserStore((s) => s.firstName);
  const cravings = useUserStore((s) => s.cravings);
  const sosLog = useUserStore((s) => s.sosLog);
  const currentDay = Math.max(1, streakDays);
  const avatarInitial = (firstName?.[0] ?? 'S').toUpperCase();

  // Hero copy is sourced from the canonical PHASES taxonomy — same phase used
  // on Curriculum + Home so the user never sees conflicting labels.
  const currentPhase = phaseForDay(currentDay);
  const phase: { title: string; body: string } = {
    title: currentPhase.heroTitle,
    body: currentPhase.heroBody,
  };

  // Stats — same honest formulas as Profile / Milestone
  const sosWalked = sosLog.filter((s) => s.outcome === 'walked' || s.outcome === 'softer').length;
  const cravingsWalked = cravings.filter((c) => c.outcome === 'walked').length;
  const cravingsMet = sosWalked + cravingsWalked;
  const dollarsSaved = (currentDay * 1.5).toFixed(0);
  const kgSugar = (currentDay * 0.025).toFixed(2);

  const goWeekly = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/progress/weekly');
  };
  const goMilestones = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/progress/milestones');
  };

  // Timeline nodes — derived from canonical PHASES so the "NOW" marker
  // sits on the user's actual phase and labels match Curriculum/Home.
  const phaseIndex = phaseIndexForDay(currentDay);
  const lastIdx = PHASES.length - 1;
  const phaseKey = (name: string) =>
    ({Arrival:'phase_arrival',Detox:'phase_detox',Clarity:'phase_clarity',
      Integration:'phase_integration',Identity:'phase_identity',Freedom:'phase_freedom'} as any)[name];
  const nodes = PHASES.map((p, i) => ({
    label: t(`curriculum.${phaseKey(p.name)}`),
    phase: i === phaseIndex ? t('progress.now_short') : p.shortLabel,
    glyph: p.glyph,
    state:
      i < phaseIndex                                    ? 'done'     as const
      : i === phaseIndex                                ? 'current'  as const
      : i === lastIdx && phaseIndex < lastIdx           ? 'goal'     as const
      :                                                   'upcoming' as const,
  }));

  // Today's Focus — keyed by canonical phase name so a copy change to one
  // phase doesn't drift between Curriculum/Progress/Home.
  const focusByPhase: Record<string, { title: string; sub: string; practices: { title: string; body: string }[] }> = {
    Arrival: {
      title: 'Landing in the first day',
      sub: "Two short practices anchor the new rhythm before willpower fatigues.",
      practices: [
        { title: 'Two slow breaths', body: '60 sec · before any sugar reach' },
        { title: 'Name the moment',  body: 'Say "this is the loop" out loud' },
      ],
    },
    Detox: {
      title: 'Riding through the storm',
      sub: 'Withdrawal peaks; physiology stabilises with two anchors.',
      practices: [
        { title: 'Hydrate first',  body: 'Glass of water before any decision' },
        { title: 'Move 3 minutes', body: 'Walk anywhere — kitchen counts' },
      ],
    },
    Clarity: {
      title: 'Deepening the rhythmic pattern',
      sub: 'Your body is learning a new cadence. Two practices to support the shift.',
      practices: [
        { title: 'Conscious breathwork', body: '15 min · morning session' },
        { title: 'Mental mapping',       body: 'Reflect on transition points' },
      ],
    },
    Integration: {
      title: 'Building new defaults',
      sub: 'Replacement rituals harden into habit. Two cues, two responses.',
      practices: [
        { title: 'Pre-decide your snack', body: 'Before 2pm, name your option' },
        { title: 'Evening tea ritual',    body: 'A warm cup replaces dessert' },
      ],
    },
    Identity: {
      title: t('progress.identity_over_effort'),
      sub: t('progress.identity_over_effort_sub'),
      practices: [
        { title: t('progress.notice_non_reach'), body: t('progress.notice_non_reach_sub') },
        { title: t('progress.share_protocol'),   body: t('progress.share_protocol_sub') },
      ],
    },
    Freedom: {
      title: 'Walking free',
      sub: 'The path is yours. Maintenance is just paying attention.',
      practices: [
        { title: 'Weekly review',         body: '5 min · look at your week' },
        { title: 'Choose your next mile', body: 'Set the next 90-day frontier' },
      ],
    },
  };
  const focus = focusByPhase[currentPhase.name];

  // Health Timeline — physiological markers per FEATURES.md.
  // Each entry has a `unlocksAt` day. Items with day <= currentDay show as
  // "happening" (active state); the rest read as quiet upcoming text.
  const healthMarkers = [
    { day: 1,  label: t('progress.body_day_4'),       detail: t('progress.body_day_4_sub') },
    { day: 3,  label: t('progress.body_day_4'),       detail: t('progress.body_day_4_sub') },
    { day: 7,  label: t('progress.body_day_7'),       detail: t('progress.body_day_7_sub') },
    { day: 14, label: t('progress.body_day_11'),      detail: t('progress.body_day_11_sub') },
    { day: 30, label: t('progress.body_day_30'),      detail: t('progress.body_day_30_sub') },
    { day: 60, label: t('progress.body_day_14'),      detail: t('progress.body_day_14_sub') },
    { day: 90, label: t('progress.body_day_90'),      detail: t('progress.body_day_90_sub') },
  ];

  return (
    <AtmosphericGradient theme="darkHorizon">
      {/* Background aura blobs — dark-horizon safe tints, low intensity */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.4} drift={20} />
        <AuraBlob tint="golden" size={260} style={styles.auraBottomRight} intensity={0.3} drift={16} />
      </View>

      {/* Header — Journey label is absolutely centered between brandRow
          and avatar so it stays on the screen-axis regardless of the
          brand-text width vs. avatar width (kakoccc #45 header alignment
          2026-04-29). */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>Sugar Quit</Text>
        </View>
        <View pointerEvents="none" style={[styles.headerCenter, { top: insets.top + spacing.sm }]}>
          <Text style={styles.roadmapLabel}>{t('progress.journey')}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>{avatarInitial}</Text>
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
              <Text style={styles.heroEyebrow}>{`${t('progress.day_short', { n: currentDay })} / 90`}</Text>
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
          {/* Horizontal connector line removed — it was rendering behind
              circle backgrounds that are too transparent (rgba 0.06-0.18
              alpha), so the line bled through visibly across each circle.
              The five spaced circles already convey horizontal progression
              without a track. */}
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
            <Text style={styles.detailsLabel}>{t('progress.todays_focus')}</Text>
          </View>

          <Text style={styles.detailsTitle}>{focus.title}</Text>
          <Text style={styles.detailsSub}>{focus.sub}</Text>

          <View style={styles.practicesList}>
            {focus.practices.map((p, i) => (
              <View key={i} style={styles.practiceRow}>
                <View style={styles.practiceNumber}><Text style={styles.practiceNumberText}>{i + 1}</Text></View>
                <View style={styles.practiceContent}>
                  <Text style={styles.practiceTitle}>{p.title}</Text>
                  <Text style={styles.practiceBody}>{p.body}</Text>
                </View>
              </View>
            ))}
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
          <Text style={styles.sectionLabel}>{t('progress.health_timeline')}</Text>
          <Text style={styles.sectionHint}>{t('progress.health_hint')}</Text>
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
                        {t('progress.day_short', { n: m.day })}
                      </Text>
                      {reached && <Text style={styles.healthBadge}>{t('progress.happening')}</Text>}
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
            <Text style={styles.statLabel}>{t('progress.cravings_met')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>${dollarsSaved}</Text>
            <Text style={styles.statLabel}>{t('progress.saved')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{kgSugar}kg</Text>
            <Text style={styles.statLabel}>{t('progress.sugar_avoided')}</Text>
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
  headerCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: spacing.sm,
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
    includeFontPadding: false,
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
    // align number circle to title baseline, not row vertical center.
    // Earlier `alignItems: 'center'` left the "1" floating between
    // title and body, looking misaligned with the title it labels.
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  practiceNumber: {
    width: 28, height: 28, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
    // Nudge number down slightly so its visual center aligns with the
    // title's cap-height baseline (title fontSize ~17, lineHeight 22).
    marginTop: 1,
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

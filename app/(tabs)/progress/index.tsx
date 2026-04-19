import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, shadows, spacing, tracking, typeScale } from '../../../constants/tokens';

/**
 * Progress — 90-Day Journey on Dark Horizon gradient.
 * Modern app typography — no serif italic.
 */
export default function ProgressScreen() {
  const insets = useSafeAreaInsets();

  const nodes = [
    { label: 'Arrival', phase: 'Week 1', state: 'done' as const },
    { label: 'Detox', phase: 'Week 2', state: 'done' as const },
    { label: 'Exhale', phase: 'Now', state: 'current' as const },
    { label: 'Clarity', phase: 'Week 4', state: 'upcoming' as const },
    { label: 'Horizon', phase: 'Day 90', state: 'goal' as const },
  ];

  return (
    <AtmosphericGradient theme="darkHorizon">
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
        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={styles.heroEyebrow}>DAY 14 OF 90</Text>
          <Text style={styles.heroTitle}>The subtle shift</Text>
          <Text style={styles.heroBody}>
            Two weeks in. The storm has passed and the quiet is starting to feel normal.
          </Text>
        </View>

        {/* Timeline */}
        <View style={styles.timelineSection}>
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
                      styles.node,
                      n.state === 'done' && styles.nodeDone,
                      n.state === 'current' && styles.nodeCurrent,
                      n.state === 'upcoming' && styles.nodeUpcoming,
                      n.state === 'goal' && styles.nodeGoal,
                    ]}
                  />
                </View>

                <Text style={[styles.nodePhase, n.state === 'current' && styles.nodePhaseActive]}>
                  {n.phase}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Details card */}
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

        {/* Quick stats row */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>cravings met</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>$72</Text>
            <Text style={styles.statLabel}>saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>89%</Text>
            <Text style={styles.statLabel}>success</Text>
          </View>
        </View>
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
  node: { width: 8, height: 8, borderRadius: radius.full },
  nodeDone: { backgroundColor: 'rgba(255,255,255,0.45)' },
  nodeCurrent: {
    width: 14, height: 14,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  nodeUpcoming: {
    width: 6, height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  nodeGoal: {
    width: 8, height: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'transparent',
  },
  nodePhase: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: tracking.wide,
    textTransform: 'uppercase',
  },
  nodePhaseActive: { color: colors.primaryFixedDim, fontWeight: '700' },

  detailsCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: spacing.xl,
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
});

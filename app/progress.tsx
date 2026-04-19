import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../components/ui/AtmosphericGradient';
import { BottomNav } from '../components/ui/BottomNav';
import { PillCTA } from '../components/ui/PillCTA';
import { colors, fonts, radius, shadows, spacing, tracking } from '../constants/tokens';

/**
 * Progress — The 90-Day Horizon (Dark mode).
 * Mirror of screen 08 (stitch-export/08-90-day-horizon.png).
 * Theme: Dark Horizon gradient (navy → lavender → rust → cream).
 */
export default function ProgressScreen() {
  const insets = useSafeAreaInsets();

  const nodes = [
    { label: 'Arrival', phase: 'Phase 01', state: 'done' as const },
    { label: 'Detox', phase: null, state: 'done' as const },
    { label: 'The Exhale', phase: 'Current', state: 'current' as const },
    { label: 'Clarity', phase: 'Phase 02', state: 'upcoming' as const },
    { label: 'Resonance', phase: null, state: 'upcoming' as const },
    { label: 'New Horizon', phase: 'Day 90', state: 'goal' as const },
  ];

  return (
    <AtmosphericGradient theme="darkHorizon">
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>THE EXHALE</Text>
        </View>
        <Text style={styles.roadmapLabel}>Roadmap</Text>
        <View style={styles.avatar} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 180 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={styles.dayNumber}>Day 14</Text>
          <Text style={styles.daySubtitle}>THE SUBTLE SHIFT</Text>
        </View>

        {/* Horizon timeline */}
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

                {/* Node dot */}
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

                {n.phase && (
                  <Text style={[styles.nodePhase, n.state === 'current' && styles.nodePhaseActive]}>
                    {n.phase}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Details card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <View>
              <Text style={styles.detailsTitle}>Today's Focus</Text>
              <Text style={styles.detailsSub}>Deepening the rhythmic pattern.</Text>
            </View>
            <Text style={styles.detailsIcon}>✧</Text>
          </View>

          <View style={styles.detailsList}>
            <View style={styles.practiceRow}>
              <View style={styles.practiceIcon}>
                <Text style={styles.practiceIconGlyph}>~</Text>
              </View>
              <View style={styles.practiceContent}>
                <Text style={styles.practiceTitle}>Conscious Breathwork</Text>
                <Text style={styles.practiceBody}>15 minutes · Morning session</Text>
              </View>
            </View>

            <View style={styles.practiceRow}>
              <View style={styles.practiceIcon}>
                <Text style={styles.practiceIconGlyph}>✎</Text>
              </View>
              <View style={styles.practiceContent}>
                <Text style={styles.practiceTitle}>Mental Mapping</Text>
                <Text style={styles.practiceBody}>Reflect on the transition points.</Text>
              </View>
            </View>
          </View>

          <PillCTA
            label="Begin Session"
            variant="lightOnDark"
            onPress={() => router.push('/sos')}
            style={styles.sessionCTA}
          />
        </View>
      </ScrollView>

      <BottomNav
        dark
        tabs={[
          { key: 'home', label: 'Home', icon: '◉' },
          { key: 'progress', label: 'Progress', icon: '≋', active: true },
          { key: 'sos-tab', label: 'SOS', icon: '!' },
          { key: 'profile', label: 'Profile', icon: '◯' },
        ]}
        onPress={(key) => {
          if (key === 'home') router.push('/');
          if (key === 'profile') router.push('/profile');
          if (key === 'sos-tab') router.push('/sos');
        }}
      />
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    zIndex: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoMark: {
    width: 18,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: colors.darkHorizonRose100,
    opacity: 0.7,
  },
  brandWord: {
    fontFamily: fonts.headlineLight,
    fontSize: 10,
    color: colors.darkHorizonRose100,
    letterSpacing: tracking.labelWidest,
    opacity: 0.7,
    fontWeight: '300',
  },
  roadmapLabel: {
    fontFamily: fonts.headline,
    fontSize: 18,
    color: colors.darkHorizonRose100,
    letterSpacing: tracking.tight,
    fontWeight: '700',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xxxl,
  },
  dayNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 80,
    lineHeight: 80,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: tracking.tighter,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 8 },
    textShadowRadius: 20,
  },
  daySubtitle: {
    fontFamily: fonts.label,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 5,
    marginTop: spacing.md,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  timelineSection: {
    width: '100%',
    marginBottom: spacing.xxxl,
    paddingHorizontal: spacing.md,
    position: 'relative',
  },
  horizonLine: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    top: '50%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  nodesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 120,
    paddingVertical: 30,
  },
  nodeCol: {
    alignItems: 'center',
    flex: 1,
  },
  nodeLabel: {
    fontFamily: fonts.bodyThin,
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: tracking.wide,
    marginBottom: spacing.lg,
    fontWeight: '200',
  },
  nodeLabelActive: {
    fontFamily: fonts.headlineLight,
    fontSize: 14,
    color: '#ffffff',
    letterSpacing: tracking.widest,
    fontWeight: '300',
  },
  nodeLabelDim: {
    color: 'rgba(255,255,255,0.2)',
  },
  nodeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  nodeGlow: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  node: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
  },
  nodeDone: {
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  nodeCurrent: {
    width: 16,
    height: 16,
    backgroundColor: '#ffffff',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#ffffff',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  nodeUpcoming: {
    width: 6,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  nodeGoal: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'transparent',
  },
  nodePhase: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: tracking.widest,
    textTransform: 'uppercase',
    marginTop: spacing.lg,
    fontWeight: '500',
  },
  nodePhaseActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  detailsCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: radius.sm,
    padding: spacing.xl + spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    ...shadows.cardWhisper,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  detailsTitle: {
    fontFamily: fonts.headlineLight,
    fontSize: 22,
    color: 'rgba(255,255,255,0.95)',
    letterSpacing: tracking.tight,
    fontWeight: '300',
  },
  detailsSub: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
  },
  detailsIcon: {
    fontSize: 28,
    color: 'rgba(255,255,255,0.4)',
  },
  detailsList: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  practiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  practiceIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceIconGlyph: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '300',
  },
  practiceContent: {
    flex: 1,
  },
  practiceTitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  practiceBody: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
  },
  sessionCTA: {
    marginTop: spacing.md,
  },
});

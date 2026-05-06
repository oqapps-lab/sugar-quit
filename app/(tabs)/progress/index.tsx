import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AppHeader } from '../../../components/primitives/AppHeader';
import { Card } from '../../../components/primitives/Card';
import { Eyebrow } from '../../../components/primitives/Eyebrow';
import { Txt } from '../../../components/primitives/Txt';
import { colors, radius, spacing } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';


const HEALTH_MARKERS = [
  { day: 1,  label: 'Insulin spikes soften',        detail: 'Within hours of cutting refined sugar.' },
  { day: 3,  label: 'Cravings peak, then ease',     detail: 'Dopamine receptors recalibrating.' },
  { day: 7,  label: 'Sleep depth increases',        detail: 'Cortisol rhythm normalizing.' },
  { day: 14, label: 'Taste buds regenerate',        detail: 'Fruit registers ~40% sweeter.' },
  { day: 30, label: 'Liver fat measurably reduces', detail: 'Average ~10% drop in NAFLD markers.' },
  { day: 60, label: 'Inflammation markers drop',    detail: 'CRP and HbA1c trending down.' },
  { day: 90, label: 'Insulin sensitivity peaks',    detail: 'Metabolic flexibility restored.' },
];

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const streakDays = useUserStore((s) => s.streakDays);
  const cravings = useUserStore((s) => s.cravings);
  const sosLog = useUserStore((s) => s.sosLog);
  const currentDay = Math.max(1, streakDays);

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

  const sosWalked = sosLog.filter((s) => s.outcome === 'walked' || s.outcome === 'softer').length;
  const cravingsWalked = cravings.filter((c) => c.outcome === 'walked').length;
  const cravingsMet = sosWalked + cravingsWalked;
  const totalDaysClean = useUserStore((s) => s.totalDaysClean);
  const dollarsSaved = (totalDaysClean * 1.5).toFixed(0);
  const kgSugar = (totalDaysClean * 0.025).toFixed(1);

  const goWeekly = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/progress/weekly');
  };
  const goMilestones = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/progress/milestones');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader center="Journey" />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 160 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.duration(500)} style={styles.heroSection}>
          <Eyebrow color={colors.primary} style={styles.heroEyebrow}>{`DAY ${currentDay} OF 90`}</Eyebrow>
          <Txt variant="displayLg" style={styles.heroTitle}>{phase.title}</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.heroBody}>{phase.body}</Txt>
        </Animated.View>



        {/* Health timeline */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.healthSection}>
          <Eyebrow color={colors.primary} style={styles.sectionEyebrow}>HEALTH TIMELINE</Eyebrow>
          <Txt variant="bodyMd" color={colors.textSecondary} style={styles.sectionHint}>
            What's happening in your body, not just your mind.
          </Txt>
          <View style={styles.healthList}>
            {HEALTH_MARKERS.map((m, i) => {
              const reached = currentDay >= m.day;
              return (
                <Animated.View
                  key={m.day}
                  entering={FadeInDown.delay(80 + i * 70).duration(400)}
                  style={styles.healthRow}
                >
                  <View style={[styles.healthDot, reached && styles.healthDotActive]} />
                  {i < HEALTH_MARKERS.length - 1 && <View style={styles.healthLine} />}
                  <View style={styles.healthText}>
                    <View style={styles.healthHeadRow}>
                      <Eyebrow color={reached ? colors.success : colors.textSecondary}>
                        {`DAY ${m.day}`}
                      </Eyebrow>
                      {reached && (i === HEALTH_MARKERS.length - 1 || currentDay < HEALTH_MARKERS[i + 1].day) && (
                        <View style={styles.happeningBadge}>
                          <Txt variant="labelSm" color={colors.onPrimary} style={styles.happeningText}>ACTIVE</Txt>
                        </View>
                      )}
                    </View>
                    <Txt
                      variant="bodyMd"
                      color={reached ? colors.onSurface : colors.textSecondary}
                      style={styles.healthLabel}
                    >
                      {m.label}
                    </Txt>
                    <Txt variant="bodySm" color={colors.textSecondary} style={styles.healthDetail}>
                      {m.detail}
                    </Txt>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>

        {/* Stats row → milestones */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)}>
          <Pressable
            onPress={goMilestones}
            accessibilityRole="button"
            accessibilityLabel="Milestones — your stones"
          >
            <View style={styles.statsCard}>
              <View style={styles.statsHeader}>
                <Eyebrow color={colors.textSecondary}>YOUR MILESTONES</Eyebrow>
                <MaterialCommunityIcons name="arrow-right" size={20} color={colors.primary} />
              </View>
              <View style={styles.statsRow}>
                <View style={[styles.statTile, { backgroundColor: colors.primary + '15' }]}>
                  <Txt variant="displaySm" color={colors.primary} style={styles.statNumber}>{cravingsMet}</Txt>
                  <Txt variant="labelSm" color={colors.textSecondary} style={styles.statLabel}>{cravingsMet === 1 ? 'CRAVING MET' : 'CRAVINGS MET'}</Txt>
                </View>
                <View style={[styles.statTile, { backgroundColor: colors.success + '15' }]}>
                  <Txt variant="displaySm" color={colors.success} style={styles.statNumber}>${dollarsSaved}</Txt>
                  <Txt variant="labelSm" color={colors.textSecondary} style={styles.statLabel}>SAVED</Txt>
                </View>
                <View style={[styles.statTile, { backgroundColor: colors.warning + '15' }]}>
                  <Txt variant="displaySm" color={colors.warning} style={styles.statNumber}>{kgSugar}kg</Txt>
                  <Txt variant="labelSm" color={colors.textSecondary} style={styles.statLabel}>SUGAR AVOIDED</Txt>
                </View>
              </View>
            </View>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },

  heroSection: { marginBottom: spacing.xxl },
  heroEyebrow: { marginBottom: spacing.sm },
  heroTitle: { letterSpacing: -1.2, lineHeight: 44, marginBottom: spacing.md },
  heroBody: { lineHeight: 22, maxWidth: 320 },



  healthSection: { marginBottom: spacing.xxl },
  sectionEyebrow: { marginBottom: spacing.xs },
  sectionHint: { lineHeight: 20, marginBottom: spacing.xl, maxWidth: 320 },
  healthList: { gap: spacing.lg },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    position: 'relative',
  },
  healthDot: {
    width: 12,
    height: 12,
    borderRadius: radius.full,
    backgroundColor: colors.outline,
    marginTop: 4,
    zIndex: 1,
  },
  healthDotActive: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  healthLine: {
    position: 'absolute',
    left: 5,
    top: 10,
    bottom: -(spacing.lg + 10),
    width: 2,
    backgroundColor: colors.outline,
  },
  healthText: { flex: 1, gap: 2, paddingBottom: spacing.xs },
  healthHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: 2,
  },
  happeningBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  happeningText: { fontSize: 9 },
  healthLabel: { lineHeight: 22 },
  healthDetail: { lineHeight: 18, marginTop: 2 },

  statsCard: {
    gap: spacing.sm,
  },
  statsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statsRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'stretch' },
  statTile: {
    flex: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: { letterSpacing: -0.6 },
  statLabel: { textAlign: 'center', lineHeight: 14 },
});

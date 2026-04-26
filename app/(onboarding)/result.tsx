import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Card } from '../../components/primitives/Card';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';

const TRIGGER_TYPE_BY_KEY: Record<string, string> = {
  stress:   'Stress-Triggered',
  emotions: 'Emotion-Triggered',
  boredom:  'Comfort-Seeking',
  meals:    'Habit & Routine',
  social:   'Socially Triggered',
  night:    'Late-Night',
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const triggers = useUserStore((s) => s.triggers);
  const peakHour = useUserStore((s) => s.peakHour);

  const dominantTrigger = triggers[0] ?? 'stress';
  const personaName = TRIGGER_TYPE_BY_KEY[dominantTrigger] ?? 'Stress Eater';
  const peakLabel = peakHour ?? '3:00 PM';
  const peakHourShort = peakLabel.replace(/(:00 )?(AM|PM)/, '$2').toLowerCase();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoMark} />
          <Txt variant="titleSm">Sugar Quit</Txt>
        </View>
        <View style={styles.logoRow} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Animated.View entering={FadeInUp.duration(500)} style={styles.heroSection}>
          <Eyebrow color={colors.primary} style={styles.heroEyebrow}>Your craving profile</Eyebrow>
          <Txt variant="displayLg" style={styles.heroTitle}>
            Your pattern:{'\n'}
            <Txt variant="displayLg" color={colors.onSurface}>{personaName}</Txt>
          </Txt>
          <Txt variant="displaySm" color={colors.textSecondary} style={styles.heroSub}>
            with a {peakHourShort} crash
          </Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.heroBody}>
            Your body seeks rapid energy drops to counter cortisol peaks.
            We'll replace the spike with steady emotional grounding.
          </Txt>
        </Animated.View>

        {/* Cards */}
        <View style={styles.cardsCol}>
          {/* Peak window */}
          <Animated.View entering={FadeInDown.delay(200).duration(450)}>
            <Card bordered style={styles.insightCard}>
              <Eyebrow color={colors.primary}>Peak window</Eyebrow>
              <Txt variant="titleLg" style={styles.cardTitle}>{peakLabel}</Txt>
              <Txt variant="bodyMd" style={styles.cardBody}>
                Cortisol dips naturally mid-afternoon. We'll introduce a 2-minute
                breath protocol right before the craving hits.
              </Txt>
            </Card>
          </Animated.View>

          {/* Week 1 */}
          <Animated.View entering={FadeInDown.delay(300).duration(450)}>
            <Card bordered style={styles.insightCard}>
              <Eyebrow color={colors.primary}>Week 1</Eyebrow>
              <Txt variant="titleLg" style={styles.cardTitle}>Withdrawal, then clarity</Txt>
              <Txt variant="bodyMd" style={styles.cardBody}>
                The first 4 days are a physiological unbinding. By day 7, the mental
                fog lifts and the deep fatigue subsides. Expect emotional turbulence,
                met with soft interventions.
              </Txt>
              <View style={styles.timelineRow}>
                <View style={styles.timelineDay}>
                  <Txt variant="titleMd" color={colors.primary}>Day 1–4</Txt>
                  <Txt variant="labelSm" color={colors.primary}>unbind</Txt>
                </View>
                <Txt variant="bodyMd" color={colors.textSecondary} style={styles.timelineArrow}>→</Txt>
                <View style={styles.timelineDay}>
                  <Txt variant="titleMd" color={colors.warning}>Day 5–6</Txt>
                  <Txt variant="labelSm" color={colors.warning}>turbulence</Txt>
                </View>
                <Txt variant="bodyMd" color={colors.textSecondary} style={styles.timelineArrow}>→</Txt>
                <View style={styles.timelineDay}>
                  <Txt variant="titleMd" color={colors.success}>Day 7</Txt>
                  <Txt variant="labelSm" color={colors.success}>clarity</Txt>
                </View>
              </View>
            </Card>
          </Animated.View>

          {/* By day 30 */}
          <Animated.View entering={FadeInDown.delay(400).duration(450)}>
            <Card bordered style={styles.insightCard}>
              <Eyebrow color={colors.success}>By day 30</Eyebrow>
              <Txt variant="titleLg" style={styles.cardTitle}>Taste buds reset</Txt>
              <Txt variant="bodyMd" style={styles.cardBody}>
                Natural foods will taste vibrant again. The compulsion fades into
                a gentle, manageable whisper.
              </Txt>
            </Card>
          </Animated.View>
        </View>
      </ScrollView>

      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Begin the program" onPress={() => router.push('/(onboarding)/paywall')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoMark: { width: 10, height: 10, borderRadius: radius.full, backgroundColor: colors.primary },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },

  heroSection: { gap: spacing.sm, marginBottom: spacing.lg },
  heroEyebrow: { marginBottom: spacing.xs },
  heroTitle: { letterSpacing: -0.8, lineHeight: 44 },
  heroSub: { letterSpacing: -0.4, marginTop: spacing.xs },
  heroBody: { lineHeight: 22, marginTop: spacing.sm, maxWidth: 360 },

  cardsCol: { gap: spacing.md },
  insightCard: { gap: spacing.sm },
  cardTitle: { letterSpacing: -0.3, lineHeight: 26 },
  cardBody: { lineHeight: 20 },

  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  timelineDay: { alignItems: 'center', gap: 2 },
  timelineArrow: { opacity: 0.4 },

  ctaWrap: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});

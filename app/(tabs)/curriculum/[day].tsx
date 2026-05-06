import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Card } from '../../../components/primitives/Card';
import { Eyebrow } from '../../../components/primitives/Eyebrow';
import { PillCTA } from '../../../components/primitives/PillCTA';
import { Txt } from '../../../components/primitives/Txt';
import { colors, radius, spacing } from '../../../constants/tokens';

const PHASE_COLORS: Record<string, string> = {
  'ACUTE PHASE':    colors.primary,
  'ADAPTATION':     colors.warning,
  'CLARITY PHASE':  colors.success,
  'INTEGRATION':    colors.primary,
};

type LessonContent = { phase: string; title: string; body: string };

const LESSONS: Record<number, LessonContent> = {
  1: {
    phase: 'ACUTE PHASE',
    title: 'Why sugar catches the brain',
    body: 'Sugar triggers dopamine release like other addictive substances. Day 1 is awareness — noticing the loop without trying to stop it yet.',
  },
  2: {
    phase: 'ACUTE PHASE',
    title: 'The 72-hour storm',
    body: 'Withdrawal peaks now: irritability, headache, intense cravings. This is your body renegotiating its relationship with glucose. By tomorrow morning the worst will be behind you.',
  },
  3: {
    phase: 'ACUTE PHASE',
    title: 'First quiet morning',
    body: "You wake up and something is different. The first thought isn't \"sugar\". That moment — where the loop doesn't fire — is your new baseline forming. Notice it, don't rush past it.",
  },
  4: {
    phase: 'ADAPTATION',
    title: 'Your 3pm pattern, mapped',
    body: "The afternoon crash is cortisol + blood sugar swinging together. We've tuned your forecast to this window. A 2-minute breath protocol 10 minutes before the dip is worth more than willpower after.",
  },
  5: {
    phase: 'ADAPTATION',
    title: 'Why fruit tastes bland',
    body: "A banana used to taste \"not sweet enough\". That's not the banana — that's your taste receptors numbed by processed sugar. Over the next two weeks, sensitivity returns. Fruit gets its flavor back.",
  },
  6: {
    phase: 'ADAPTATION',
    title: 'The sleep–sugar loop',
    body: "Short sleep spikes ghrelin (hunger hormone) and blunts leptin (satiety). One bad night → next-day sugar cravings feel 30% stronger. Guard tonight's sleep as a craving-management tool.",
  },
  7: {
    phase: 'ADAPTATION',
    title: 'One whole week',
    body: 'Your insulin sensitivity has measurably improved. Energy is steadier between meals. Sleep deepens. This is the floor of the adaptation phase — everything from here compounds.',
  },
  8: {
    phase: 'CLARITY PHASE',
    title: 'Your taste buds are waking up',
    body: 'By day 8 without excess sugar, taste receptors begin to recalibrate. Fruit will taste noticeably sweeter by day 14. Tonight, eat a fruit you used to find "not sweet enough" — a Granny Smith, a strawberry. Notice what changed.',
  },
  9: {
    phase: 'CLARITY PHASE',
    title: 'Triggers without reactions',
    body: 'A trigger is a signal, not a sentence. When stress shows up today, name it out loud — "this is the 3pm pattern" — before the reach. Labelling it activates the prefrontal cortex, which cuts the craving circuit by roughly a third.',
  },
  10: {
    phase: 'CLARITY PHASE',
    title: 'The stress–sugar reflex',
    body: 'Cortisol tells the body "find fast fuel". Sugar was the fastest fuel you knew. Today we practice a different default: water + 5 slow breaths + a 3-minute walk. The reflex weakens with every swap.',
  },
  11: {
    phase: 'CLARITY PHASE',
    title: 'Alternatives that actually work',
    body: "Not all substitutes are equal. A handful of almonds + one square of 85% dark chocolate lands in the same reward slot as a cookie, without the crash. We'll test three combinations this week.",
  },
  14: {
    phase: 'CLARITY PHASE',
    title: 'Two weeks — the subtle shift',
    body: 'The 2-week mark is where most quit attempts fail and where success solidifies. Your brain pathways are forming new defaults. The craving is still there — but the automatic reach is softer.',
  },
  30: {
    phase: 'INTEGRATION',
    title: 'Day 30 — taste reset',
    body: "Natural foods taste vibrant again. The compulsion fades into a manageable whisper. You've rewired the reward loop — the identity catches up next.",
  },
};

export default function Lesson() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ day?: string }>();
  const dayNum = Math.max(1, Math.min(90, parseInt(params.day ?? '8', 10) || 8));
  const lesson = LESSONS[dayNum] ?? LESSONS[8];
  const [rating, setRating] = useState<number | null>(null);

  const phaseColor = PHASE_COLORS[lesson.phase] ?? colors.primary;

  const onRate = (n: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRating(n);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Back to curriculum"
        >
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Eyebrow color={colors.primary}>{`DAY ${dayNum} OF 90`}</Eyebrow>
        <View style={{ width: 72 }} />
      </View>

      <View style={styles.progressRail}>
        <View style={[styles.progressFill, { width: `${(dayNum / 90) * 100}%` as `${number}%` }]} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 240 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.duration(400)} style={styles.heroRow}>
          <Eyebrow color={phaseColor} style={styles.lessonEyebrow}>{lesson.phase}</Eyebrow>
          <Txt variant="displayLg" style={styles.lessonTitle}>{lesson.title}</Txt>
          <Txt variant="bodyMd" color={colors.textSecondary}>5 min · neuroscience + one practice</Txt>
        </Animated.View>

        <View style={styles.divider} />

        <Animated.View entering={FadeInDown.delay(150).duration(400)}>
          <Eyebrow color={colors.primary} style={styles.sectionLabel}>WHAT'S HAPPENING</Eyebrow>
          <Txt variant="bodyLg" color={colors.onSurface} style={styles.body}>{lesson.body}</Txt>
          <Txt variant="bodyLg" color={colors.onSurface} style={styles.body}>
            A 2019 University of Michigan study showed a 40% increase in perceived fruit sweetness after two weeks of sugar reduction.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(350).duration(400)}>
          <Eyebrow color={colors.primary} style={styles.sectionLabel}>THE PRACTICE</Eyebrow>
          <Txt variant="bodyLg" color={colors.onSurface} style={styles.body}>
            Tonight, eat a fruit you used to find "not sweet enough" — a Granny Smith apple, a grapefruit, blueberries.
          </Txt>
          <Txt variant="bodyLg" color={colors.onSurface} style={styles.body}>
            Notice. No judgment, no measuring. Just notice.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(450).duration(400)}>
          <Card bordered style={styles.taskCard}>
            <Eyebrow color={colors.primary}>TONIGHT'S NOTE</Eyebrow>
            <Txt variant="titleLg" color={colors.onSurface} style={styles.taskTitle}>
              Rate the fruit's sweetness
            </Txt>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((n) => {
                const active = rating === n;
                return (
                  <Pressable
                    key={n}
                    onPress={() => onRate(n)}
                    hitSlop={6}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={`Rate ${n} of 5`}
                    style={[styles.ratingStone, active && styles.ratingStoneActive]}
                  >
                    <Txt
                      variant="bodyLg"
                      color={active ? colors.onPrimary : colors.textSecondary}
                    >
                      {String(n)}
                    </Txt>
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.ratingLabels}>
              <Txt variant="labelSm" color={colors.textSecondary}>sour</Txt>
              <Txt variant="labelSm" color={colors.textSecondary}>sweet</Txt>
            </View>
            {rating !== null && (
              <Txt variant="bodyMd" color={colors.primary} center style={styles.ratingHint}>
                {rating <= 2 ? 'Less sweet than you remembered.' :
                 rating === 3 ? 'About what you expected.' :
                 'Sweeter than before — your taste is recalibrating.'}
              </Txt>
            )}
          </Card>
        </Animated.View>

        <Txt variant="labelSm" color={colors.textSecondary} center style={styles.source}>
          Source: Wise et al., 2019, Nutrients
        </Txt>
      </ScrollView>

      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + 110 }]}>
        <PillCTA label="Mark lesson complete" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backBtn: { minWidth: 72 },

  progressRail: {
    height: 3,
    backgroundColor: colors.outline,
    marginHorizontal: spacing.lg,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },

  heroRow: { gap: spacing.sm, marginBottom: spacing.sm },
  lessonEyebrow: { marginBottom: 2 },
  lessonTitle: { letterSpacing: -1.2, lineHeight: 40 },

  divider: {
    height: 1,
    backgroundColor: colors.outline,
    marginVertical: spacing.lg,
  },

  sectionLabel: { marginTop: spacing.lg, marginBottom: spacing.sm },
  body: { lineHeight: 26, marginBottom: spacing.md },

  taskCard: { gap: spacing.sm, marginTop: spacing.lg, marginBottom: spacing.lg },
  taskTitle: { letterSpacing: -0.4 },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  ratingStone: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingStoneActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  ratingHint: { marginTop: spacing.sm },

  source: { marginTop: spacing.xl, marginBottom: spacing.lg, opacity: 0.6 },

  ctaWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});

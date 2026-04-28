import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../../components/ui/AuraBlob';
import { DecorGlyph } from '../../../components/ui/DecorGlyph';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { phaseForDay } from '../../../lib/phases';

// Phase label + glyph are derived from canonical PHASES taxonomy at render time
// so the eyebrow + glyph always match the day's true phase. The `phase: '...'`
// field on each LESSONS entry below is legacy — left in place to avoid a churn
// migration but no longer read by the UI.

type LessonContent = {
  phase: string;
  title: string;
  body: string;
  minutes: number;
  kicker: string;
};

// Source of truth: keep titles + phases in sync with curriculum/index.tsx PHASES.
// Every day referenced in the index must have a LESSONS entry — otherwise the
// lesson screen silently falls back to a different day's body (drift bug).
const LESSONS: Record<number, LessonContent> = {
  // --- Acute (Days 1–3) ---
  1: {
    phase: 'ACUTE PHASE',
    title: 'Why sugar catches the brain',
    minutes: 7,
    kicker: 'neuroscience + first practice',
    body: 'Sugar triggers dopamine release like other addictive substances. Day 1 is awareness — noticing the loop without trying to stop it yet.',
  },
  2: {
    phase: 'ACUTE PHASE',
    title: 'The 72-hour storm',
    minutes: 5,
    kicker: 'physiology + breathing protocol',
    body: 'Withdrawal peaks now: irritability, headache, intense cravings. This is your body renegotiating its relationship with glucose. By tomorrow morning the worst will be behind you.',
  },
  3: {
    phase: 'ACUTE PHASE',
    title: 'First quiet morning',
    minutes: 4,
    kicker: 'baseline + daily ritual',
    body: 'You wake up and something is different. The first thought isn\'t "sugar". That moment — where the loop doesn\'t fire — is your new baseline forming. Notice it, don\'t rush past it.',
  },

  // --- Adaptation (Days 4–7) ---
  4: {
    phase: 'ADAPTATION',
    title: 'Your 3pm pattern, mapped',
    minutes: 6,
    kicker: 'pattern + breath tool',
    body: 'The afternoon crash is cortisol + blood sugar swinging together. We\'ve tuned your forecast to this window. A 2-minute breath protocol 10 minutes before the dip is worth more than willpower after.',
  },
  5: {
    phase: 'ADAPTATION',
    title: 'Why fruit tastes bland',
    minutes: 5,
    kicker: 'taste receptors + fruit test',
    body: 'A banana used to taste "not sweet enough". That\'s not the banana — that\'s your taste receptors numbed by processed sugar. Over the next two weeks, sensitivity returns. Fruit gets its flavor back.',
  },
  6: {
    phase: 'ADAPTATION',
    title: 'The sleep–sugar loop',
    minutes: 6,
    kicker: 'hormones + sleep hygiene',
    body: 'Short sleep spikes ghrelin (hunger hormone) and blunts leptin (satiety). One bad night → next-day sugar cravings feel 30% stronger. Guard tonight\'s sleep as a craving-management tool.',
  },
  7: {
    phase: 'ADAPTATION',
    title: 'One whole week',
    minutes: 4,
    kicker: 'body markers + reflection',
    body: 'Your insulin sensitivity has measurably improved. Energy is steadier between meals. Sleep deepens. This is the floor of the adaptation phase — everything from here compounds.',
  },

  // --- Clarity (Days 8–14) ---
  8: {
    phase: 'CLARITY PHASE',
    title: 'Your taste buds are waking up',
    minutes: 5,
    kicker: 'taste recalibration + tonight\'s test',
    body: 'By day 8 without excess sugar, taste receptors begin to recalibrate. Fruit will taste noticeably sweeter by day 14. Tonight, eat a fruit you used to find "not sweet enough" — a Granny Smith, a strawberry. Notice what changed.',
  },
  9: {
    phase: 'CLARITY PHASE',
    title: 'Triggers without reactions',
    minutes: 6,
    kicker: 'prefrontal cortex + labeling practice',
    body: 'A trigger is a signal, not a sentence. When stress shows up today, name it out loud — "this is the 3pm pattern" — before the reach. Labelling it activates the prefrontal cortex, which cuts the craving circuit by roughly a third.',
  },
  10: {
    phase: 'CLARITY PHASE',
    title: 'The stress–sugar reflex',
    minutes: 5,
    kicker: 'cortisol + replacement ritual',
    body: 'Cortisol tells the body "find fast fuel". Sugar was the fastest fuel you knew. Today we practice a different default: water + 5 slow breaths + a 3-minute walk. The reflex weakens with every swap.',
  },
  11: {
    phase: 'CLARITY PHASE',
    title: 'Alternatives that actually work',
    minutes: 7,
    kicker: 'swap protocol + 3-combo test',
    body: 'Not all substitutes are equal. A handful of almonds + one square of 85% dark chocolate lands in the same reward slot as a cookie, without the crash. We\'ll test three combinations this week.',
  },

  12: {
    phase: 'CLARITY PHASE',
    title: 'When dopamine baselines shift',
    minutes: 5,
    kicker: 'reward system + small wins',
    body: "By day 12 the reward loop has loosened. Tiny gains — a clean morning, a deep breath before reaching — register more vividly than they did before. This is the brain learning to value the new normal. Notice one small win today and name it.",
  },

  13: {
    phase: 'CLARITY PHASE',
    title: 'The check-in becomes a ritual',
    minutes: 4,
    kicker: 'habits compound',
    body: "You've been showing up. Two-week mark is the cliff where most stops happen — and where the rest gets easier. The check-in stops feeling like a chore and starts being a moment of self-respect. Tonight, mark the day as you would any anchor.",
  },

  // --- Deeper markers (used by milestone flow) ---
  14: {
    phase: 'CLARITY PHASE',
    title: 'Two weeks — the subtle shift',
    minutes: 6,
    kicker: 'neural rewiring + reflection',
    body: 'The 2-week mark is where most quit attempts fail and where success solidifies. Your brain pathways are forming new defaults. The craving is still there — but the automatic reach is softer.',
  },
  30: {
    phase: 'INTEGRATION',
    title: 'Day 30 — taste reset',
    minutes: 8,
    kicker: 'identity + milestone reflection',
    body: 'Natural foods taste vibrant again. The compulsion fades into a manageable whisper. You\'ve rewired the reward loop — the identity catches up next.',
  },
};

export default function Lesson() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ day?: string }>();
  const dayNum = Math.max(1, Math.min(90, parseInt(params.day ?? '8', 10) || 8));
  const lesson = LESSONS[dayNum] ?? LESSONS[8];
  // Mini-task: rate the fruit's sweetness 1-5. Local state — would persist
  // to a future `lessonProgress[day]` slice in the store; out of scope here.
  const [rating, setRating] = useState<number | null>(null);

  const onRate = (n: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRating(n);
  };

  return (
    <AtmosphericGradient theme="dawn">
      {/* Background aura blobs — ambient depth behind all content */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="lavender" size={320} style={styles.auraTopRight} intensity={0.5} drift={22} />
        <AuraBlob tint="peach" size={260} style={styles.auraBottomLeft} intensity={0.5} drift={18} />
      </View>

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Back to curriculum"
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerLabel}>DAY {dayNum} OF 90</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Thin progress */}
      <View style={styles.progressRail}>
        <View style={[styles.progressFill, { width: `${(dayNum / 90) * 100}%` }]} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 240 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero — now with a large phase glyph that anchors the screen */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.heroRow}>
          <View style={styles.heroCol}>
            <Text style={styles.lessonEyebrow}>{`${phaseForDay(dayNum).name.toUpperCase()} PHASE`}</Text>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonMeta}>{`${lesson.minutes} min · ${lesson.kicker}`}</Text>
          </View>
          <View style={styles.heroGlyphWrap}>
            <DecorGlyph
              variant={phaseForDay(dayNum).glyph}
              size={72}
            />
          </View>
        </Animated.View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Section 1 — What's happening.
            Earlier this rendered a hardcoded "2019 Michigan study" citation
            below every lesson body — same quote on Day 1, Day 7, Day 30 etc.
            Per Rule 5 (text-pair duplicate check) — moved into the per-lesson
            body where appropriate so each day reads unique content. */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)}>
          <Text style={styles.sectionLabel}>WHAT'S HAPPENING</Text>
          <Text style={styles.body}>{lesson.body}</Text>
        </Animated.View>

        {/* Illustration — centered phase glyph (128px) with a bloom halo behind */}
        <Animated.View entering={FadeInUp.delay(250).duration(500)} style={styles.illustration}>
          <View style={styles.illoHalo} />
          <DecorGlyph
            variant={phaseForDay(dayNum).glyph}
            size={128}
          />
        </Animated.View>

        {/* Section 2 — Practice */}
        <Animated.View entering={FadeInDown.delay(350).duration(400)}>
          <Text style={styles.sectionLabel}>THE PRACTICE</Text>
          <Text style={styles.body}>
            Tonight, eat a fruit you used to find "not sweet enough" — a Granny Smith
            apple, a grapefruit, blueberries.
          </Text>
          <Text style={styles.body}>
            Notice. No judgment, no measuring. Just notice.
          </Text>
        </Animated.View>

        {/* Section 3 — Mini-task (anchor card). Interactive 1-5 rating.
            Wrapped in an internal gradient overlay for depth (like home SOS counter). */}
        <Animated.View entering={FadeInDown.delay(450).duration(400)} style={styles.taskWrap}>
          <LinearGradient
            colors={['rgba(255,215,168,0.4)', 'rgba(255,172,160,0.22)'] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.taskGradient}
          />
          <GlassCard tint="peach" style={styles.taskCard}>
            <Text style={styles.taskLabel}>TONIGHT'S NOTE</Text>
            <Text style={styles.taskTitle}>Rate the fruit's sweetness</Text>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((n) => {
                const active = rating === n;
                return (
                  <Pressable
                    key={n}
                    onPress={() => onRate(n)}
                    hitSlop={6}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={`Rate ${n} of 5`}
                    style={[styles.ratingStone, active && styles.ratingStoneActive]}
                  >
                    <Text style={[styles.ratingStoneText, active && styles.ratingStoneTextActive]}>{n}</Text>
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.ratingLabels}>
              <Text style={styles.ratingLabel}>sour</Text>
              <Text style={styles.ratingLabel}>sweet</Text>
            </View>
            {rating !== null && (
              <Text style={styles.ratingHint}>
                {rating <= 2 ? 'Less sweet than you remembered.' :
                 rating === 3 ? 'About what you expected.' :
                 'Sweeter than before — your taste is recalibrating.'}
              </Text>
            )}
          </GlassCard>
        </Animated.View>

        {/* Source */}
        <Text style={styles.source}>Source: Wise et al., 2019, Nutrients</Text>
      </ScrollView>

      {/* CTA — sits above the floating tab bar (bar takes ~114pt from bottom) */}
      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + 110 }]}>
        <PillCTA label="Mark lesson complete" onPress={() => router.back()} />
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 22, color: colors.onSurface, lineHeight: 22 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },

  progressRail: {
    height: 3,
    backgroundColor: 'rgba(49,51,47,0.08)',
    marginHorizontal: spacing.lg,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },

  lessonEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.secondary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.sm,
  },
  lessonTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge,
    color: colors.onSurface,
    letterSpacing: -1.2,
    lineHeight: 40,
    marginBottom: spacing.sm,
  },
  lessonMeta: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.lg,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(49,51,47,0.1)',
    marginVertical: spacing.lg,
  },

  sectionLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    lineHeight: 26,
    marginBottom: spacing.md,
  },

  illustration: {
    alignItems: 'center',
    marginVertical: spacing.xl,
    height: 180,
    justifyContent: 'center',
  },
  illoHalo: {
    position: 'absolute',
    alignSelf: 'center',
    top: (180 - 170) / 2,
    width: 170, height: 170, borderRadius: 85,
    backgroundColor: colors.primaryContainer,
    opacity: 0.55,
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  // Hero layout (title left, glyph right)
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  heroCol: { flex: 1, gap: spacing.xs },
  heroGlyphWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  taskWrap: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  taskGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.sm,
  },
  taskCard: {
    padding: spacing.lg,
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  taskLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  taskTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    color: colors.onSurface,
    letterSpacing: -0.4,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  ratingStone: {
    width: 44, height: 44, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center', justifyContent: 'center',
  },
  ratingStoneActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ratingStoneText: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
  },
  ratingStoneTextActive: { color: colors.onPrimary },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  ratingLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
  },
  ratingHint: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },

  source: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.xl,
    fontStyle: 'italic',
  },

  ctaWrap: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },

  // Background aura layer
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -80,
    right: -110,
  },
  auraBottomLeft: {
    position: 'absolute',
    bottom: '18%',
    left: -120,
  },
});

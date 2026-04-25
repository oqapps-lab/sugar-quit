import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { DecorGlyph } from '../../../components/ui/DecorGlyph';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';

// Per-phase hero glyph for lesson screens — matches the curriculum phase
const PHASE_GLYPH_BY_LABEL: Record<string, 'flame' | 'sun' | 'compass' | 'orbit'> = {
  'ACUTE PHASE': 'flame',
  'ADAPTATION': 'sun',
  'CLARITY PHASE': 'compass',
  'INTEGRATION': 'orbit',
};

type LessonContent = { phase: string; title: string; body: string };

const LESSONS: Record<number, LessonContent> = {
  1: { phase: 'ACUTE PHASE', title: 'Why sugar catches the brain', body: 'Sugar triggers dopamine release like other addictive substances. Day 1 is awareness — noticing the loop without trying to stop it yet.' },
  3: { phase: 'ACUTE PHASE', title: 'The 72-hour storm', body: 'Withdrawal peaks now: irritability, headache, intense cravings. By tomorrow morning the worst will be behind you.' },
  7: { phase: 'ADAPTATION', title: 'One whole week', body: 'Your insulin sensitivity has measurably improved. Energy is steadier between meals. Sleep deepens.' },
  8: { phase: 'CLARITY PHASE', title: 'Your taste buds are waking up', body: 'By day 8 without excess sugar, your taste receptors begin to recalibrate. Fruit will start tasting noticeably sweeter by day 14.' },
  14: { phase: 'CLARITY PHASE', title: 'Two weeks — the subtle shift', body: 'The 2-week mark is where most quit attempts fail and where success solidifies. Your brain pathways are forming new defaults.' },
  30: { phase: 'INTEGRATION', title: 'Day 30 — taste reset', body: 'Natural foods taste vibrant again. The compulsion fades into a manageable whisper. You\'ve rewired the reward loop.' },
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
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
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
            <Text style={styles.lessonEyebrow}>{lesson.phase}</Text>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            <Text style={styles.lessonMeta}>5 min · neuroscience + one practice</Text>
          </View>
          <View style={styles.heroGlyphWrap}>
            <DecorGlyph
              variant={PHASE_GLYPH_BY_LABEL[lesson.phase] ?? 'orbit'}
              size={72}
            />
          </View>
        </Animated.View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Section 1 — What's happening */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)}>
          <Text style={styles.sectionLabel}>WHAT'S HAPPENING</Text>
          <Text style={styles.body}>{lesson.body}</Text>
          <Text style={styles.body}>
            A 2019 University of Michigan study showed a 40% increase in perceived
            fruit sweetness after two weeks of sugar reduction.
          </Text>
        </Animated.View>

        {/* Illustration — two overlapping blooms + a tiny accent */}
        <Animated.View entering={FadeInUp.delay(250).duration(500)} style={styles.illustration}>
          <View style={styles.illoBloom} />
          <View style={[styles.illoBloom, styles.illoBloomSmall]} />
          <View style={styles.illoAccent} />
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

        {/* Section 3 — Mini-task (anchor card). Interactive 1-5 rating. */}
        <Animated.View entering={FadeInDown.delay(450).duration(400)}>
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
                  accessibilityRole="radio"
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
    height: 140,
    justifyContent: 'center',
  },
  illoBloom: {
    width: 100, height: 100, borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    opacity: 0.8,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  illoBloomSmall: {
    position: 'absolute',
    width: 64, height: 64,
    backgroundColor: colors.tertiaryContainer,
    left: '58%',
    top: '44%',
    opacity: 0.9,
  },
  illoAccent: {
    position: 'absolute',
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: colors.primary,
    right: '32%',
    top: '18%',
    opacity: 0.7,
    shadowColor: colors.primary,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
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

  taskCard: { padding: spacing.lg, marginTop: spacing.lg, gap: spacing.sm },
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
});

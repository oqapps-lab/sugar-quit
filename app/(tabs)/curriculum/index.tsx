import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { DecorGlyph } from '../../../components/ui/DecorGlyph';
import { GlassCard } from '../../../components/ui/GlassCard';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

// Map each phase to a decorative glyph — visual shorthand for the phase feel.
const PHASE_GLYPHS: Record<string, 'flame' | 'sun' | 'compass' | 'orbit'> = {
  Acute: 'flame',        // burning withdrawal
  Adaptation: 'sun',     // the sun comes out
  Clarity: 'compass',    // direction appears
  Integration: 'orbit',  // settling into orbit
};

type LessonState = 'done' | 'current' | 'upcoming' | 'locked';
type LessonStatic = { day: number; title: string; minutes: number };
type Lesson = LessonStatic & { state: LessonState };

// Phase content is static; per-lesson state is computed at render time from
// the user's current streak. Keeps the source of truth in the store, not in
// hand-edited card metadata.
const PHASES: { name: string; days: string; lessons: LessonStatic[]; locked?: boolean }[] = [
  {
    name: 'Acute',
    days: 'Days 1–3',
    lessons: [
      { day: 1, title: 'Why sugar catches the brain',    minutes: 7 },
      { day: 2, title: 'The 72-hour storm',               minutes: 5 },
      { day: 3, title: 'First quiet morning',             minutes: 4 },
    ],
  },
  {
    name: 'Adaptation',
    days: 'Days 4–7',
    lessons: [
      { day: 4, title: 'Your 3pm pattern, mapped',        minutes: 6 },
      { day: 5, title: 'Why fruit tastes bland',          minutes: 5 },
      { day: 6, title: 'The sleep-sugar loop',            minutes: 6 },
      { day: 7, title: 'One whole week',                  minutes: 4 },
    ],
  },
  {
    name: 'Clarity',
    days: 'Days 8–14',
    lessons: [
      { day: 8,  title: 'Your taste buds are waking up',   minutes: 5 },
      { day: 9,  title: 'Triggers without reactions',      minutes: 6 },
      { day: 10, title: 'The stress-sugar reflex',         minutes: 5 },
      { day: 11, title: 'Alternatives that actually work', minutes: 7 },
    ],
  },
  {
    name: 'Integration',
    days: 'Days 15–30',
    lessons: [], // locked phase (premium)
    locked: true,
  },
];

function computeLessonState(day: number, currentDay: number): LessonState {
  if (day < currentDay) return 'done';
  if (day === currentDay) return 'current';
  return 'upcoming';
}

/**
 * Pick the hero subtitle based on which phase the user is in.
 * Drops the hardcoded "Week 2 · clarity phase" copy that read wrong on Day 1.
 */
function heroForDay(day: number): string {
  if (day <= 3) return `Acute phase. The first ${day === 1 ? 'day' : `${day} days`} — your brain notices the loop without judgment.`;
  if (day <= 7) return 'Adaptation phase. The 72-hour storm has passed; cravings start losing their grip.';
  if (day <= 14) return `Clarity phase. Two weeks in — your body and mind are catching up with each other.`;
  if (day <= 30) return 'Integration phase. New defaults forming. Sugar slips out of the auto-reach.';
  if (day <= 60) return 'Identity phase. You no longer ask "should I". You just don\'t.';
  return 'Horizon. The path is yours now.';
}

export default function Curriculum() {
  const insets = useSafeAreaInsets();
  const streakDays = useUserStore((s) => s.streakDays);
  const firstName = useUserStore((s) => s.firstName);
  const currentDay = Math.max(1, streakDays);
  const progressPct = (currentDay / 90) * 100;
  const avatarInitial = (firstName?.[0] ?? 'S').toUpperCase();

  return (
    <AtmosphericGradient theme="dawn">
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>Sugar Quit</Text>
        </View>
        <View style={styles.avatar}><Text style={styles.avatarInitial}>{avatarInitial}</Text></View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero — title on the left, orbit glyph on the right */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.heroRow}>
          <View style={styles.heroTextCol}>
            <Text style={styles.eyebrow}>YOUR 90-DAY PATH</Text>
            <Text style={styles.heroTitle}>
              Day <Text style={styles.heroAccent}>{currentDay}</Text> of 90
            </Text>
          </View>
          <DecorGlyph variant="orbit" size={64} />
        </Animated.View>

        <Animated.Text entering={FadeInUp.delay(100).duration(400)} style={styles.heroBody}>
          {heroForDay(currentDay)}
        </Animated.Text>

        {/* Progress bar with bigger label and percentage */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Day 1</Text>
            <Text style={styles.progressLabelMid}>{Math.round(progressPct)}% of the way</Text>
            <Text style={styles.progressLabelEnd}>Day 90</Text>
          </View>
        </Animated.View>

        {/* Phases */}
        <View style={styles.phases}>
          {PHASES.map((phase, pi) => (
            <Animated.View
              key={pi}
              entering={FadeInDown.delay(300 + pi * 80).duration(400)}
              style={styles.phaseBlock}
            >
              <View style={styles.phaseHeader}>
                <DecorGlyph variant={PHASE_GLYPHS[phase.name] ?? 'orbit'} size={28} />
                <View style={styles.phaseHeaderText}>
                  <Text style={styles.phaseName}>{phase.name}</Text>
                  <Text style={styles.phaseDays}>{phase.days}</Text>
                </View>
              </View>

              {phase.lessons.length === 0 ? (
                <Pressable
                  onPress={() => router.push('/(modals)/paywall-contextual')}
                  accessibilityRole="button"
                  accessibilityLabel={`${phase.name} phase locked — upgrade to unlock`}
                >
                  <GlassCard tint="default" style={styles.lockedCard}>
                    <View style={styles.lockedRow}>
                      <View style={styles.lockIcon}><Text style={styles.lockIconGlyph}>🔒</Text></View>
                      <Text style={styles.lockedText}>Unlocks as you walk</Text>
                    </View>
                  </GlassCard>
                </Pressable>
              ) : (
                <View style={styles.lessonsList}>
                  {phase.lessons.map((lesson, li) => {
                    const state = computeLessonState(lesson.day, currentDay);
                    const stateLabel =
                      state === 'done' ? 'completed'
                      : state === 'current' ? 'today'
                      : 'upcoming';
                    return (
                      <Pressable
                        key={lesson.day}
                        onPress={() => router.push(`/(tabs)/curriculum/${lesson.day}` as any)}
                        accessibilityRole="button"
                        accessibilityLabel={`Day ${lesson.day} · ${lesson.title} · ${lesson.minutes} min · ${stateLabel}`}
                      >
                        <GlassCard
                          tint={state === 'current' ? 'peach' : 'default'}
                          style={[
                            styles.lessonCard,
                            state === 'current' && styles.lessonCardCurrent,
                          ]}
                        >
                          <View style={styles.lessonRow}>
                            <View style={[
                              styles.dayBadge,
                              state === 'current' && styles.dayBadgeCurrent,
                              state === 'done' && styles.dayBadgeDone,
                            ]}>
                              <Text style={[
                                styles.dayBadgeText,
                                state === 'current' && styles.dayBadgeTextCurrent,
                                state === 'done' && styles.dayBadgeTextDone,
                              ]}>
                                {state === 'done' ? '✓' : lesson.day}
                              </Text>
                            </View>
                            <View style={styles.lessonText}>
                              <Text style={[
                                styles.lessonTitle,
                                state === 'current' && styles.lessonTitleCurrent,
                                state === 'upcoming' && styles.lessonTitleUpcoming,
                              ]}>
                                {lesson.title}
                              </Text>
                              <Text style={styles.lessonMeta}>
                                {lesson.minutes} min · Day {lesson.day}
                                {state === 'current' && ' · today'}
                              </Text>
                            </View>
                            {state === 'current' && (
                              <View style={styles.currentArrow}><Text style={styles.currentArrowText}>→</Text></View>
                            )}
                          </View>
                        </GlassCard>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </Animated.View>
          ))}
        </View>
      </ScrollView>

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
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoMark: { width: 10, height: 10, borderRadius: radius.full, backgroundColor: colors.primary },
  brandWord: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleSmall,
    color: colors.onSurface,
  },
  avatar: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
  },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },

  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  heroTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge + 4,
    color: colors.onSurface,
    letterSpacing: -1.2,
    lineHeight: 44,
  },
  heroAccent: { color: colors.primary },
  heroBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 340,
  },

  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(49,51,47,0.08)',
    overflow: 'hidden',
    marginTop: spacing.xl,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  progressLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
  },
  progressLabelEnd: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
    opacity: 0.5,
  },

  phases: { gap: spacing.xl, marginTop: spacing.xxl },
  phaseBlock: { gap: spacing.sm },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  phaseHeaderText: { flex: 1 },
  phaseName: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    color: colors.onSurface,
    letterSpacing: -0.4,
  },
  phaseDays: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
    marginTop: 2,
  },

  // Hero layout
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  heroTextCol: { flex: 1, gap: spacing.xs },
  progressLabelMid: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.wide,
  },
  lessonsList: { gap: spacing.xs },
  lessonCard: { paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.md },
  lessonCardCurrent: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  dayBadge: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.08)',
    alignItems: 'center', justifyContent: 'center',
  },
  dayBadgeCurrent: { backgroundColor: colors.primary },
  dayBadgeDone: { backgroundColor: colors.tertiaryContainer },
  dayBadgeText: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  dayBadgeTextCurrent: { color: colors.onPrimary },
  dayBadgeTextDone: { color: colors.tertiary },
  lessonText: { flex: 1, gap: 2 },
  lessonTitle: {
    fontFamily: fonts.headlineMedium,
    fontSize: typeScale.titleSmall,
    color: colors.onSurface,
    letterSpacing: -0.2,
  },
  lessonTitleCurrent: {
    fontFamily: fonts.headlineSemibold,
    color: colors.onPrimaryContainer,
  },
  lessonTitleUpcoming: { color: colors.onSurfaceVariant, opacity: 0.75 },
  lessonMeta: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
  },
  currentArrow: {
    width: 28, height: 28, borderRadius: radius.full,
    alignItems: 'center', justifyContent: 'center',
  },
  currentArrowText: { color: colors.primary, fontSize: 18 },

  lockedCard: { paddingVertical: spacing.md, paddingHorizontal: spacing.md, opacity: 0.65 },
  lockedRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  lockIcon: {
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  lockIconGlyph: { fontSize: 14 },
  lockedText: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
});

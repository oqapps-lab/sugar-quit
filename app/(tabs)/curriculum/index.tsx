import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';

type LessonState = 'done' | 'current' | 'upcoming' | 'locked';
type Lesson = { day: number; title: string; minutes: number; state: LessonState };

const PHASES: { name: string; days: string; lessons: Lesson[] }[] = [
  {
    name: 'Acute',
    days: 'Days 1–3',
    lessons: [
      { day: 1, title: 'Why sugar catches the brain',    minutes: 7, state: 'done' },
      { day: 2, title: 'The 72-hour storm',               minutes: 5, state: 'done' },
      { day: 3, title: 'First quiet morning',             minutes: 4, state: 'done' },
    ],
  },
  {
    name: 'Adaptation',
    days: 'Days 4–7',
    lessons: [
      { day: 4, title: 'Your 3pm pattern, mapped',        minutes: 6, state: 'done' },
      { day: 5, title: 'Why fruit tastes bland',          minutes: 5, state: 'done' },
      { day: 6, title: 'The sleep-sugar loop',            minutes: 6, state: 'done' },
      { day: 7, title: 'One whole week',                  minutes: 4, state: 'done' },
    ],
  },
  {
    name: 'Clarity',
    days: 'Days 8–14',
    lessons: [
      { day: 8, title: 'Your taste buds are waking up',   minutes: 5, state: 'current' },
      { day: 9, title: 'Triggers without reactions',      minutes: 6, state: 'upcoming' },
      { day: 10, title: 'The stress-sugar reflex',        minutes: 5, state: 'upcoming' },
      { day: 11, title: 'Alternatives that actually work',minutes: 7, state: 'upcoming' },
    ],
  },
  {
    name: 'Integration',
    days: 'Days 15–30',
    lessons: [], // locked phase
  },
];

export default function Curriculum() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="dawn">
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>Sugar Quit</Text>
        </View>
        <View style={styles.avatar}><Text style={styles.avatarInitial}>S</Text></View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Text style={styles.eyebrow}>YOUR 90-DAY PATH</Text>
        <Text style={styles.heroTitle}>
          Day <Text style={styles.heroAccent}>8</Text> of 90
        </Text>
        <Text style={styles.heroBody}>
          Week 2 · clarity phase. Your body and mind start catching up with each other.
        </Text>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(8 / 90) * 100}%` }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Day 1</Text>
          <Text style={styles.progressLabelEnd}>Day 90</Text>
        </View>

        {/* Phases */}
        <View style={styles.phases}>
          {PHASES.map((phase, pi) => (
            <View key={pi} style={styles.phaseBlock}>
              <View style={styles.phaseHeader}>
                <Text style={styles.phaseName}>{phase.name}</Text>
                <Text style={styles.phaseDays}>{phase.days}</Text>
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
                  {phase.lessons.map((lesson) => (
                    <Pressable key={lesson.day} onPress={() => router.push('/(tabs)/curriculum/8')}>
                      <GlassCard
                        tint={lesson.state === 'current' ? 'peach' : 'default'}
                        style={[
                          styles.lessonCard,
                          lesson.state === 'current' && styles.lessonCardCurrent,
                        ]}
                      >
                        <View style={styles.lessonRow}>
                          <View style={[
                            styles.dayBadge,
                            lesson.state === 'current' && styles.dayBadgeCurrent,
                            lesson.state === 'done' && styles.dayBadgeDone,
                          ]}>
                            <Text style={[
                              styles.dayBadgeText,
                              lesson.state === 'current' && styles.dayBadgeTextCurrent,
                              lesson.state === 'done' && styles.dayBadgeTextDone,
                            ]}>
                              {lesson.state === 'done' ? '✓' : lesson.day}
                            </Text>
                          </View>
                          <View style={styles.lessonText}>
                            <Text style={[
                              styles.lessonTitle,
                              lesson.state === 'current' && styles.lessonTitleCurrent,
                              lesson.state === 'upcoming' && styles.lessonTitleUpcoming,
                            ]}>
                              {lesson.title}
                            </Text>
                            <Text style={styles.lessonMeta}>
                              {lesson.minutes} min · Day {lesson.day}
                              {lesson.state === 'current' && ' · today'}
                            </Text>
                          </View>
                          {lesson.state === 'current' && (
                            <View style={styles.currentArrow}><Text style={styles.currentArrowText}>→</Text></View>
                          )}
                        </View>
                      </GlassCard>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
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
    alignItems: 'baseline',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
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

import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { DecorGlyph } from '../../../components/ui/DecorGlyph';
import { GlassCard } from '../../../components/ui/GlassCard';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { t } from '../../../lib/i18n';
import { useUserStore } from '../../../stores/useUserStore';
import { PHASES, phaseForDay } from '../../../lib/phases';

type LessonState = 'done' | 'current' | 'upcoming' | 'locked';
type LessonStatic = { day: number; title: string; minutes: number };

// Lesson content — flat list keyed by day. Phase grouping is derived from the
// canonical PHASES taxonomy in lib/phases.ts, never duplicated here.
const LESSONS: readonly LessonStatic[] = [
  { day: 1,  title: 'Why sugar catches the brain',     minutes: 7 },
  { day: 2,  title: 'The 72-hour storm',                minutes: 5 },
  { day: 3,  title: 'First quiet morning',              minutes: 4 },
  { day: 4,  title: 'Your 3pm pattern, mapped',         minutes: 6 },
  { day: 5,  title: 'Why fruit tastes bland',           minutes: 5 },
  { day: 6,  title: 'The sleep-sugar loop',             minutes: 6 },
  { day: 7,  title: 'One whole week',                   minutes: 4 },
  { day: 8,  title: 'Your taste buds are waking up',    minutes: 5 },
  { day: 9,  title: 'Triggers without reactions',       minutes: 6 },
  { day: 10, title: 'The stress-sugar reflex',          minutes: 5 },
  { day: 11, title: 'Alternatives that actually work',  minutes: 7 },
];

function computeLessonState(day: number, currentDay: number): LessonState {
  if (day < currentDay) return 'done';
  if (day === currentDay) return 'current';
  return 'upcoming';
}

export default function Curriculum() {
  const insets = useSafeAreaInsets();
  const streakDays = useUserStore((s) => s.streakDays);
  const firstName = useUserStore((s) => s.firstName);
  const isPremium = useUserStore((s) => s.isPremium);
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
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 200 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero — title on the left, orbit glyph on the right */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.heroRow}>
          <View style={styles.heroTextCol}>
            <Text style={styles.eyebrow}>{t('curriculum.your_90_path')}</Text>
            <Text style={styles.heroTitle}>
              {(() => {
                const tpl = t('curriculum.day_of', { day: '__DAY__', total: 90 });
                const parts = tpl.split('__DAY__');
                return (
                  <>
                    {parts[0]}
                    <Text style={styles.heroAccent}>{currentDay}</Text>
                    {parts[1] ?? ''}
                  </>
                );
              })()}
            </Text>
          </View>
          <DecorGlyph variant="orbit" size={64} />
        </Animated.View>

        <Animated.Text entering={FadeInUp.delay(100).duration(400)} style={styles.heroBody}>
          {t('curriculum.identity_phase')}
        </Animated.Text>

        {/* Progress bar with bigger label and percentage */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>1</Text>
            <Text style={styles.progressLabelMid}>{Math.round(progressPct)}%</Text>
            <Text style={styles.progressLabelEnd}>90</Text>
          </View>
        </Animated.View>

        {/* Phases */}
        <View style={styles.phases}>
          {PHASES.map((phase, pi) => {
            const phaseLessons = LESSONS.filter(
              (l) => l.day >= phase.startDay && l.day <= phase.endDay,
            );
            return (
            <Animated.View
              key={phase.name}
              entering={FadeInDown.delay(300 + pi * 80).duration(400)}
              style={styles.phaseBlock}
            >
              <View style={styles.phaseHeader}>
                <DecorGlyph variant={phase.glyph} size={28} />
                <View style={styles.phaseHeaderText}>
                  <Text style={styles.phaseName}>{t(`curriculum.${({Arrival:'phase_arrival',Detox:'phase_detox',Clarity:'phase_clarity',Integration:'phase_integration',Identity:'phase_identity',Freedom:'phase_freedom'} as any)[phase.name] ?? 'phase_arrival'}`)}</Text>
                  <Text style={styles.phaseDays}>{t(`curriculum.${({Arrival:'phase_arrival_days',Detox:'phase_detox_days',Clarity:'phase_clarity_days',Integration:'phase_integration_days',Identity:'phase_identity_days',Freedom:'phase_freedom_days'} as any)[phase.name] ?? 'phase_arrival_days'}`)}</Text>
                </View>
              </View>

              {phaseLessons.length === 0 ? (
                isPremium ? (
                  // Premium user: lessons not yet released for this phase.
                  // Show "Coming soon" — never the upgrade paywall (they're already paid).
                  <GlassCard tint="default" style={styles.lockedCard}>
                    <View style={styles.lockedRow}>
                      <View style={styles.lockIcon}><Text style={styles.lockIconGlyph}>✨</Text></View>
                      <Text
                        style={styles.lockedText}
                        accessibilityLabel={`${phase.name} phase content coming soon`}
                      >
                        {t('curriculum.locked_coming_soon')}
                      </Text>
                    </View>
                  </GlassCard>
                ) : (
                  <Pressable
                    onPress={() => router.push('/(modals)/paywall-contextual')}
                    accessibilityRole="button"
                    accessibilityLabel={`${phase.name} phase locked — upgrade to unlock`}
                  >
                    <GlassCard tint="default" style={styles.lockedCard}>
                      <View style={styles.lockedRow}>
                        {/* DRAFT (kakoccc #26 2026-04-29): replaced 🔒 emoji
                            (which read as a UI glitch / out-of-system icon)
                            with a lightweight inline lock shape — square
                            shackle on a body — built from two Views. Designer
                            can swap for proper DecorGlyph variant later. */}
                        <View style={styles.lockIcon}>
                          <View style={styles.lockShackle} />
                          <View style={styles.lockBody} />
                        </View>
                        <Text style={styles.lockedText}>{t('curriculum.locked_unlocks')}</Text>
                      </View>
                    </GlassCard>
                  </Pressable>
                )
              ) : (
                <View style={styles.lessonsList}>
                  {phaseLessons.map((lesson, li) => {
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
            );
          })}
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
    includeFontPadding: false,
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
  // DRAFT inline lock shape (kakoccc #26): shackle ▄ + body █ in onSurface
  // tone, ~14×16 px, no emoji fallback risk.
  lockShackle: {
    width: 9, height: 6,
    borderTopLeftRadius: 5, borderTopRightRadius: 5,
    borderWidth: 2, borderBottomWidth: 0,
    borderColor: colors.onSurfaceVariant,
    marginBottom: -1,
  },
  lockBody: {
    width: 13, height: 9,
    borderRadius: 2,
    backgroundColor: colors.onSurfaceVariant,
  },
  lockedText: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
});

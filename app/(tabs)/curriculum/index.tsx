import React from 'react';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown, FadeInUp,
  useAnimatedStyle, useSharedValue, withSequence, withTiming,
} from 'react-native-reanimated';
import { AppHeader } from '../../../components/primitives/AppHeader';
import { Card } from '../../../components/primitives/Card';
import { Eyebrow } from '../../../components/primitives/Eyebrow';
import { Txt } from '../../../components/primitives/Txt';
import { colors, radius, spacing } from '../../../constants/tokens';
import { getLessonForDay, PHASES, type LessonStatic } from '../../../constants/curriculum';
import { useUserStore } from '../../../stores/useUserStore';

type LessonState = 'done' | 'current' | 'upcoming' | 'locked';
type Lesson = LessonStatic & { state: LessonState };

function computeLessonState(day: number, currentDay: number): LessonState {
  if (day < currentDay) return 'done';
  if (day === currentDay) return 'current';
  return 'upcoming';
}

function heroForDay(day: number): string {
  if (day <= 3) return `Acute phase. The first ${day === 1 ? 'day' : `${day} days`} — your brain notices the loop without judgment.`;
  if (day <= 7) return 'Adaptation phase. The 72-hour storm has passed; cravings start losing their grip.';
  if (day <= 14) return 'Clarity phase. Two weeks in — your body and mind are catching up with each other.';
  if (day <= 30) return 'Integration phase. New defaults forming. Sugar slips out of the auto-reach.';
  if (day <= 60) return "Identity phase. You no longer ask \"should I\". You just don't.";
  return 'Horizon. The path is yours now.';
}

function LockedPhaseCard() {
  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const onPress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    shakeX.value = withSequence(
      withTiming(-7, { duration: 45 }),
      withTiming(7,  { duration: 45 }),
      withTiming(-5, { duration: 45 }),
      withTiming(5,  { duration: 45 }),
      withTiming(0,  { duration: 45 }),
    );
  };

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Animated.View style={shakeStyle}>
        <Card bordered style={styles.lockedCard}>
          <View style={styles.lockedRow}>
            <View style={styles.lockIcon}>
              <Txt variant="bodyMd" color={colors.textSecondary}>🔒</Txt>
            </View>
            <Txt variant="bodyMd" color={colors.textSecondary}>Unlocks as you walk</Txt>
          </View>
        </Card>
      </Animated.View>
    </Pressable>
  );
}

function LessonCard({ lesson, state, currentRef }: {
  lesson: LessonStatic;
  state: LessonState;
  currentRef?: React.RefObject<View>;
}) {
  const shakeX = useSharedValue(0);
  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const onPress = () => {
    if (state === 'upcoming') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      shakeX.value = withSequence(
        withTiming(-7, { duration: 45 }),
        withTiming(7,  { duration: 45 }),
        withTiming(-5, { duration: 45 }),
        withTiming(5,  { duration: 45 }),
        withTiming(0,  { duration: 45 }),
      );
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/(tabs)/curriculum/${lesson.day}` as any);
  };

  const stateLabel = state === 'done' ? 'completed' : state === 'current' ? 'today' : 'upcoming';

  return (
    <Pressable
      ref={state === 'current' ? (currentRef as any) : undefined}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Day ${lesson.day} · ${lesson.title} · ${lesson.minutes} min · ${stateLabel}`}
    >
      <Animated.View style={shakeStyle}>
        <Card bordered style={[styles.lessonCard, state === 'current' && styles.lessonCardCurrent]}>
          <View style={styles.lessonRow}>
            <View style={[
              styles.dayBadge,
              state === 'current' && styles.dayBadgeCurrent,
              state === 'done'    && styles.dayBadgeDone,
            ]}>
              <Txt
                variant="bodySm"
                color={
                  state === 'current' ? colors.onPrimary :
                  state === 'done'    ? colors.success :
                  colors.textSecondary
                }
              >
                {state === 'done' ? '✓' : String(lesson.day)}
              </Txt>
            </View>
            <View style={styles.lessonText}>
              <Txt
                variant="titleSm"
                color={state === 'upcoming' ? colors.textSecondary : colors.onSurface}
                style={state === 'upcoming' && styles.lessonTitleDim}
              >
                {lesson.title}
              </Txt>
              <Txt variant="labelSm" color={colors.textSecondary}>
                {lesson.minutes} min · Day {lesson.day}
                {state === 'current' ? ' · today' : ''}
              </Txt>
            </View>
            {state === 'current' && (
              <Txt variant="bodyMd" color={colors.primary}>→</Txt>
            )}
          </View>
        </Card>
      </Animated.View>
    </Pressable>
  );
}

export default function Curriculum() {
  const insets = useSafeAreaInsets();
  const totalDaysClean = useUserStore((s) => s.totalDaysClean);
  const currentDay = Math.max(1, totalDaysClean);
  const { focus } = useLocalSearchParams<{ focus?: string }>();
  const scrollRef = useRef<ScrollView>(null);
  const currentLessonRef = useRef<View>(null) as React.RefObject<View>;

  useEffect(() => {
    if (!focus) return;
    const timer = setTimeout(() => {
      if (!currentLessonRef.current || !scrollRef.current) return;
      currentLessonRef.current.measureLayout(
        scrollRef.current as any,
        (_x: number, y: number) =>
          scrollRef.current?.scrollTo({ y: Math.max(0, y - 120), animated: true }),
        () => {}
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [focus]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.duration(400)} style={styles.heroRow}>
          <View style={styles.heroTextCol}>
            <Eyebrow color={colors.primary} style={styles.eyebrow}>YOUR 90-DAY PATH</Eyebrow>
            <Txt variant="displayLg" style={styles.heroTitle}>
              Day{'\u2003'}
              <Txt variant="displayLg" color={colors.success}>{currentDay}</Txt>
              {'\u2003'}of{'\u2003'}90
            </Txt>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100).duration(400)}>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.heroBody}>
            {heroForDay(currentDay)}
          </Txt>
        </Animated.View>

        <View style={styles.phases}>
          {PHASES.map((phase, pi) => {
            const phaseDone   = currentDay > phase.endDay;
            const phaseActive = !phaseDone && (pi === 0 || currentDay > PHASES[pi - 1].endDay);
            const BADGE_COLORS = [
              { bg: colors.success + '22', fg: colors.success },
              { bg: colors.success + '22', fg: colors.success },
              { bg: colors.primaryContainer, fg: colors.primary },
              { bg: colors.primaryContainer, fg: colors.primary },
            ];
            const { bg: badgeBg, fg: badgeColor } = BADGE_COLORS[pi];
            return (
            <Animated.View
              key={pi}
              entering={FadeInDown.delay(300 + pi * 80).duration(400)}
              style={styles.phaseBlock}
            >
              <View style={styles.phaseHeader}>
                <View style={[styles.phaseGlyphCircle, { backgroundColor: badgeBg }]}>
                  <Text style={[styles.badgeText, { color: badgeColor }]}>
                    {phaseDone ? '✓' : String(pi + 1)}
                  </Text>
                </View>
                <View style={styles.phaseHeaderText}>
                  <Txt variant="titleLg" color={colors.onSurface} style={styles.phaseName}>{phase.name}</Txt>
                  <Eyebrow color={colors.textSecondary}>{phase.days}</Eyebrow>
                </View>
              </View>

              {phase.lessons.length === 0 ? (
                <LockedPhaseCard />

              ) : (
                <View style={styles.lessonsList}>
                  {phase.lessons.map((lesson) => {
                    const state = computeLessonState(lesson.day, currentDay);
                    return (
                      <LessonCard
                        key={lesson.day}
                        lesson={lesson}
                        state={state}
                        currentRef={currentLessonRef}
                      />
                    );
                  })}
                </View>
              )}
            </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },

  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  heroTextCol: { flex: 1 },
  eyebrow: { marginBottom: spacing.sm },
  heroTitle: { letterSpacing: -1.2, lineHeight: 44 },
  heroBody: {
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 340,
    marginBottom: spacing.xl,
  },

  phases: { gap: spacing.xl },
  phaseBlock: { gap: spacing.sm },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  phaseGlyphCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false,
  },
  phaseHeaderText: { flex: 1, gap: 2 },
  phaseName: { letterSpacing: -0.4 },

  lessonsList: { gap: spacing.xs },
  lessonCard: {},
  lessonCardCurrent: { borderColor: colors.primary, borderWidth: 1.5 },
  lessonRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  dayBadge: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadgeCurrent: { backgroundColor: colors.primary },
  dayBadgeDone: { backgroundColor: colors.success + '22' },
  lessonText: { flex: 1, gap: 2 },
  lessonTitleDim: { opacity: 0.75 },

  lockedCard: { opacity: 0.65 },
  lockedRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  lockIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SOSFab } from '../../components/ui/SOSFab';
import { StreakOrb } from '../../components/ui/StreakOrb';
import { TokenDot } from '../../components/ui/TokenDot';
import { AppHeader } from '../../components/primitives/AppHeader';
import { Card } from '../../components/primitives/Card';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { Stat } from '../../components/primitives/Stat';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';
import { MOCK_USER } from '../../mock/user';
import { getLessonForDay } from '../../constants/curriculum';
import {
  getMilestoneDueIfAny,
  getTodayISODate,
  getYesterdayISODate,
  useUserStore,
} from '../../stores/useUserStore';

export default function Home() {
  const insets = useSafeAreaInsets();
  const streakDays      = useUserStore((s) => s.streakDays);
  const bestStreak      = useUserStore((s) => s.bestStreak);
  const totalDaysClean  = useUserStore((s) => s.totalDaysClean);
  const firstName       = useUserStore((s) => s.firstName);
  const lastCheckInDate     = useUserStore((s) => s.lastCheckInDate);
  const milestonesCelebrated = useUserStore((s) => s.milestonesCelebrated);
  const sosUsedThisMonth    = useUserStore((s) => s.sosUsedThisMonth);
  const sosFreeLimit        = useUserStore((s) => s.sosFreeLimit);
  const sosDisclaimerAccepted = useUserStore((s) => s.sosDisclaimerAccepted);
  const markMilestoneCelebrated = useUserStore((s) => s.markMilestoneCelebrated);

  useEffect(() => {
    const today     = getTodayISODate();
    const yesterday = getYesterdayISODate(today);

    if (
      streakDays > 0 &&
      lastCheckInDate &&
      lastCheckInDate !== today &&
      lastCheckInDate !== yesterday
    ) {
      router.push('/(modals)/streak-freeze');
      return;
    }

    const due = getMilestoneDueIfAny(streakDays, milestonesCelebrated);
    if (due !== null) {
      markMilestoneCelebrated(due);
      router.push('/(modals)/milestone');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const today         = getTodayISODate();
  const isDayOne      = streakDays === 0 && !lastCheckInDate;
  const isCheckedIn   = lastCheckInDate === today;
  const avatarInitial = (firstName?.[0] ?? '?').toUpperCase();
  const currentDay    = Math.max(1, totalDaysClean);
  const todayLesson   = getLessonForDay(currentDay);

  const SEGMENTS: [number, number][] = [[1,14],[14,30],[30,60],[60,90]];
  const segment     = SEGMENTS.find(([,end]) => streakDays < end) ?? null;
  const prevMile    = segment ? segment[0] : 90;
  const nextMile    = segment ? segment[1] : 90;
  const filledDots  = segment
    ? Math.round(((streakDays - prevMile) / (nextMile - prevMile)) * 14)
    : 14;
  const daysToNext  = segment ? nextMile - streakDays : 0;

  const onSos = () =>
    router.push(sosDisclaimerAccepted ? '/(modals)/sos' : '/(modals)/disclaimer');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      <AppHeader />

      {/* ── Scrollable content ── */}
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 155 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <Animated.View entering={FadeInUp.duration(400)}>
          <Txt variant="displayMd" style={styles.greeting}>
            {isDayOne
              ? 'Welcome!'
              : `Welcome back, ${firstName ?? 'Sarah'}`}
          </Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.greetingSub}>
            {isDayOne
              ? 'Your journey starts today.'
              : 'The sanctuary is ready for you today.'}
          </Txt>
        </Animated.View>

        {/* ── Streak section ── */}
        <Animated.View entering={FadeInUp.delay(80).duration(400)} style={styles.streakSection}>
          <StreakOrb count={streakDays} size={200} />

          <Txt variant="titleMd" color={colors.primary} style={styles.streakLabel}>
            {streakDays === 1 ? 'DAY SUGAR-FREE' : 'DAYS SUGAR-FREE'}
          </Txt>

          {!isDayOne && (
            <>
              {segment ? (
                <>
                  <View style={styles.dotRail}>
                    <Txt variant="labelSm" color={colors.textSecondary}>{prevMile}</Txt>
                    <View style={styles.dots}>
                      {[...Array(14)].map((_, i) => (
                        <TokenDot key={i} filled={i < filledDots} size={7} />
                      ))}
                    </View>
                    <Txt variant="labelSm" color={colors.textSecondary}>{nextMile}</Txt>
                  </View>
                  <Txt variant="bodySm" color={colors.textSecondary} style={styles.streakCaption}>
                    {`${daysToNext} days until your ${nextMile}-day badge`}
                  </Txt>
                </>
              ) : (
                <Txt variant="bodySm" color={colors.textSecondary} style={styles.streakCaption}>
                  {`🏆 Best streak: ${bestStreak} days`}
                </Txt>
              )}
            </>
          )}
        </Animated.View>

        {/* ── Stats row ── */}
        {!isDayOne && (
          <Animated.View entering={FadeInUp.delay(160).duration(400)} style={styles.statsRow}>
            <Stat
              icon={<MaterialCommunityIcons name="shield-check-outline" size={16} color={colors.success} />}
              value={String(MOCK_USER.cravingsDefeated)}
              label="Cravings"
              accent={colors.success}
              style={styles.statFlex}
            />
            <Stat
              icon={<MaterialCommunityIcons name="cash" size={16} color={colors.success} />}
              value={`$${MOCK_USER.moneySavedDollars}`}
              label="Saved"
              accent={colors.success}
              style={styles.statFlex}
            />
          </Animated.View>
        )}

        {/* ── Check-in card ── */}
        {!isCheckedIn && (
          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <Pressable
              onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.push('/(modals)/checkin'); }}
              accessibilityRole="button"
              accessibilityLabel="Open daily check-in"
            >
              <Card style={styles.checkinCard}>
                <View style={styles.checkinRow}>
                  <View style={[styles.cardIconCircle, { backgroundColor: colors.primary + '18' }]}>
                    <MaterialCommunityIcons name="calendar-check-outline" size={18} color={colors.primary} />
                  </View>
                  <View style={styles.checkinText}>
                    <Txt variant="titleMd">How did yesterday go?</Txt>
                    <Txt variant="bodySm" color={colors.textSecondary}>Takes 10 seconds</Txt>
                  </View>
                  <Txt variant="titleMd" color={colors.primary}>›</Txt>
                </View>
              </Card>
            </Pressable>
          </Animated.View>
        )}

        {/* ── Lesson card ── */}
        <Animated.View entering={FadeInDown.delay(isDayOne ? 160 : 280).duration(400)}>
          <Pressable
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.push({ pathname: '/(tabs)/curriculum', params: { focus: Date.now().toString() } } as any); }}
            accessibilityRole="button"
            accessibilityLabel="Open today's lesson"
          >
            <Card style={styles.lessonCard}>
              <View style={styles.checkinRow}>
                <View style={[styles.cardIconCircle, { backgroundColor: colors.primary + '18' }]}>
                  <MaterialCommunityIcons name="head-cog-outline" size={18} color={colors.primary} />
                </View>
                <View style={styles.checkinText}>
                  <Eyebrow color={colors.primary}>{`DAY ${currentDay}`}</Eyebrow>
                  <Txt variant="titleMd" style={styles.lessonTitle}>
                    {todayLesson.title}
                  </Txt>
                  <Txt variant="bodySm" color={colors.textSecondary}>
                    {`${todayLesson.minutes} min · Neuroscience`}
                  </Txt>
                </View>
                <Txt variant="titleMd" color={colors.primary}>›</Txt>
              </View>
            </Card>
          </Pressable>
        </Animated.View>

        {/* Day 1 — tasks + SOS tip */}
        {isDayOne && (
          <Animated.View entering={FadeInDown.delay(240).duration(400)}>
            <Card style={styles.tasksCard}>
              <Eyebrow color={colors.primary}>Today's plan</Eyebrow>
              {[
                'Mark a check-in tonight',
                'Read Day 1 lesson (7 min)',
                'Tap SOS if a craving hits',
              ].map((text, i) => (
                <View key={i} style={styles.taskRow}>
                  <View style={styles.taskNum}>
                    <Txt variant="labelSm" color={colors.primary}>{String(i + 1)}</Txt>
                  </View>
                  <Txt variant="bodyMd" style={styles.taskText}>{text}</Txt>
                </View>
              ))}
            </Card>
          </Animated.View>
        )}

        {/* Day N — motivational quote */}
        {!isDayOne && (
          <Animated.View entering={FadeInDown.delay(320).duration(400)}>
            <Txt variant="bodyMd" color={colors.textSecondary} center style={styles.quote}>
              "Every day without sugar is a victory."
            </Txt>
          </Animated.View>
        )}
      </ScrollView>

      {/* ── Floating SOS button ── */}
      <SOSFab onPress={onSos} bottom={Math.max(insets.bottom, 16) + 88} position="center" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },


  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },

  greeting: { letterSpacing: -0.8 },
  greetingSub: { marginTop: spacing.xs },

  // Streak
  streakSection: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  streakLabel: {
    letterSpacing: 1.2,
    marginTop: spacing.sm,
  },
  dotRail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outline,
    marginTop: spacing.xs,
  },
  dots: {
    flexDirection: 'row',
    gap: 5,
  },
  streakCaption: { marginTop: -spacing.xs },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statFlex: { flex: 1 },

  // Check-in card
  checkinCard: { borderWidth: 1, borderColor: colors.outline },
  checkinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  checkinText: { gap: 2 },

  cardIconCircle: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Lesson card
  lessonTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lessonCard: {
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  lessonTitle: { letterSpacing: -0.3 },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },

  // Day 1 tasks
  tasksCard: {
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  taskRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  taskNum: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: { flex: 1 },

  quote: {
    fontStyle: 'italic',
    lineHeight: 22,
    paddingVertical: spacing.sm,
  },
});

import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../components/ui/GlassCard';
import { SOSFab } from '../../components/ui/SOSFab';
import { TokenDot } from '../../components/ui/TokenDot';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import {
  getMilestoneDueIfAny,
  getTodayISODate,
  getYesterdayISODate,
  useUserStore,
} from '../../stores/useUserStore';

/**
 * Home — Daily Wellness Weather.
 * Two states: Day 1 (empty, welcoming tips) and Day N (with data — forecast cards).
 *
 * Auto-trigger effects on mount:
 *  - missed yesterday's check-in → Streak Freeze modal
 *  - new uncelebrated milestone reached → Milestone modal
 *  - push permission denied 3+ days ago → render top re-permission banner
 */
export default function Home() {
  const insets = useSafeAreaInsets();
  const streakDays = useUserStore((s) => s.streakDays);
  const bestStreak = useUserStore((s) => s.bestStreak);
  const firstName = useUserStore((s) => s.firstName);
  const lastCheckInDate = useUserStore((s) => s.lastCheckInDate);
  const milestonesCelebrated = useUserStore((s) => s.milestonesCelebrated);
  const pushDenied = useUserStore((s) => s.pushPermissionDenied);
  const pushDeniedAt = useUserStore((s) => s.pushDeniedAt);
  const sosUsedThisMonth = useUserStore((s) => s.sosUsedThisMonth);
  const sosFreeLimit = useUserStore((s) => s.sosFreeLimit);
  const sosDisclaimerAccepted = useUserStore((s) => s.sosDisclaimerAccepted);
  const freezesAvail = useUserStore((s) => s.streakFreezesAvailableThisWeek);
  const freezesUsed = useUserStore((s) => s.streakFreezesUsedThisWeek);
  const freezesLeft = Math.max(0, freezesAvail - freezesUsed);

  // Auto-triggers on mount
  useEffect(() => {
    const today = getTodayISODate();
    const yesterday = getYesterdayISODate(today);

    // 1. Streak Freeze: existed-but-broken streak → offer freeze
    if (
      streakDays > 0 &&
      lastCheckInDate &&
      lastCheckInDate !== today &&
      lastCheckInDate !== yesterday
    ) {
      router.push('/(modals)/streak-freeze');
      return; // don't stack two modals
    }

    // 2. Milestone: due milestone uncelebrated → push celebration
    const due = getMilestoneDueIfAny(streakDays, milestonesCelebrated);
    if (due !== null) {
      router.push('/(modals)/milestone');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDayOne = streakDays === 0 && !lastCheckInDate;
  const isCheckedInToday = lastCheckInDate === getTodayISODate();
  const sosRemaining = Number.isFinite(sosFreeLimit)
    ? Math.max(0, sosFreeLimit - sosUsedThisMonth)
    : null;

  // Push re-permission banner: visible if denied >3 days ago
  let showPushBanner = false;
  if (pushDenied && pushDeniedAt) {
    const today = getTodayISODate();
    const [y1, m1, d1] = pushDeniedAt.split('-').map(Number);
    const [y2, m2, d2] = today.split('-').map(Number);
    const daysSince =
      (Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000;
    if (daysSince >= 3) showPushBanner = true;
  }

  const dateLabel = firstName
    ? `Доброе утро, ${firstName}`.toUpperCase()
    : "TODAY'S FORECAST";
  const avatarInitial = (firstName?.[0] ?? 'S').toUpperCase();

  const onSos = () => {
    router.push(sosDisclaimerAccepted ? '/(modals)/sos' : '/(modals)/disclaimer');
  };

  return (
    <AtmosphericGradient theme="dawn">
      {/* Push re-permission banner */}
      {showPushBanner && (
        <View style={[styles.pushBanner, { top: insets.top + 4 }]}>
          <View style={styles.pushBannerDot} />
          <Text style={styles.pushBannerText}>
            Включите уведомления, чтобы не пропустить тягу
          </Text>
          <Pressable
            onPress={() => router.push('/(onboarding)/push-permission')}
            accessibilityRole="button"
            accessibilityLabel="Включить уведомления"
          >
            <Text style={styles.pushBannerCta}>Включить →</Text>
          </Pressable>
        </View>
      )}

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + (showPushBanner ? 56 : spacing.sm) }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>Sugar Quit</Text>
        </View>
        <Pressable
          onPress={() => router.push('/(tabs)/profile')}
          style={styles.avatar}
          accessibilityRole="button"
          accessibilityLabel="Открыть профиль"
        >
          <Text style={styles.avatarInitial}>{avatarInitial}</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 180 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dateLabel}>{dateLabel}</Text>

        {/* HERO — Day 1 vs Day N */}
        {isDayOne ? (
          <>
            <Text style={styles.heroPrefix}>Welcome,</Text>
            <Text style={styles.heroWord}>Day 1.</Text>
            <Text style={styles.heroSub}>
              Three soft tasks for today. No rush. No perfect.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.heroPrefix}>Today is</Text>
            <Text style={styles.heroWord}>Light.</Text>
            <Text style={styles.heroSub}>
              Morning is calm. A small 3pm surge. Evening exhales into mint.
            </Text>
          </>
        )}

        {/* Day 1 onboarding tasks card */}
        {isDayOne && (
          <GlassCard tint="cream" style={styles.welcomeCard}>
            <Text style={styles.welcomeLabel}>WHAT'S WAITING</Text>
            <View style={styles.taskRow}>
              <View style={styles.taskNum}><Text style={styles.taskNumText}>1</Text></View>
              <Text style={styles.taskText}>Mark a check-in tonight — how did the day go?</Text>
            </View>
            <View style={styles.taskRow}>
              <View style={styles.taskNum}><Text style={styles.taskNumText}>2</Text></View>
              <Text style={styles.taskText}>Read Day 1 — why sugar catches the brain (5 min)</Text>
            </View>
            <View style={styles.taskRow}>
              <View style={styles.taskNum}><Text style={styles.taskNumText}>3</Text></View>
              <Text style={styles.taskText}>Use SOS if a craving arrives. Even once.</Text>
            </View>
          </GlassCard>
        )}

        {/* Forecast cards — only on Day N */}
        {!isDayOne && (
          <View style={styles.cardsCol}>
            <GlassCard tint="default" style={styles.forecastCard}>
              <View style={styles.forecastRow}>
                <View style={styles.forecastText}>
                  <Text style={styles.timeLabel}>08:00 — 12:00</Text>
                  <Text style={styles.forecastTitle}>Calm</Text>
                  <Text style={styles.forecastBody}>
                    Low risk. Cortisol stable. Good for deep work.
                  </Text>
                </View>
                <View style={[styles.dotLarge, { backgroundColor: colors.tertiaryContainer }]} />
              </View>
            </GlassCard>

            <GlassCard tint="peach" style={styles.forecastCardPeak}>
              <View style={styles.forecastRow}>
                <View style={styles.forecastText}>
                  <Text style={styles.timeLabelPeak}>15:00 — 18:00</Text>
                  <Text style={styles.forecastTitlePeak}>High surge</Text>
                  <Text style={styles.forecastBodyPeak}>
                    Energy dip triggers craving response.
                  </Text>
                </View>
                <View style={styles.peakBadge}>
                  <Text style={styles.peakBadgeNumber}>3:12</Text>
                  <Text style={styles.peakBadgeLabel}>PM</Text>
                </View>
              </View>
              <Pressable
                style={styles.peakActionRow}
                onPress={onSos}
                accessibilityRole="button"
                accessibilityLabel="Открыть план на пиковый час"
              >
                <Text style={styles.peakAction}>See plan</Text>
                <Text style={styles.peakArrow}>→</Text>
              </Pressable>
            </GlassCard>

            <GlassCard tint="mint" style={styles.forecastCard}>
              <View style={styles.forecastRow}>
                <View style={styles.forecastText}>
                  <Text style={styles.timeLabel}>18:00 — 22:00</Text>
                  <Text style={styles.forecastTitle}>The exhale</Text>
                  <Text style={styles.forecastBody}>
                    System resets. Prepare for deep restorative sleep.
                  </Text>
                </View>
                <View style={[styles.dotLarge, { backgroundColor: colors.secondaryFixedDim }]} />
              </View>
            </GlassCard>
          </View>
        )}

        {/* Check-in strip — only if not done today */}
        {!isCheckedInToday && (
          <Pressable onPress={() => router.push('/(modals)/checkin')}>
            <GlassCard tint="cream" radius={radius.full} style={styles.checkinStrip}>
              <View style={styles.checkinRow}>
                <View style={styles.pulseDot} />
                <Text style={styles.checkinLabel}>{isDayOne ? 'Your first check-in' : 'Daily check-in'}</Text>
              </View>
              <Text style={styles.checkinCta}>Mark now →</Text>
            </GlassCard>
          </Pressable>
        )}

        {/* Lesson card */}
        <Pressable onPress={() => router.push('/(tabs)/curriculum')}>
          <GlassCard tint="lavender" style={styles.lessonCard}>
            <Text style={styles.lessonLabel}>DAILY INSIGHT</Text>
            <Text style={styles.lessonTitle}>
              {isDayOne
                ? 'Day 1 — why sugar catches the brain'
                : `Day ${Math.max(1, streakDays)} — your taste buds are waking up`}
            </Text>
            <Text style={styles.lessonBody}>
              {isDayOne
                ? '7 min · neuroscience + first practice.'
                : 'Fruit will taste 40% sweeter by day 14. 5 min read.'}
            </Text>
          </GlassCard>
        </Pressable>

        {/* SOS counter chip — only if free + non-zero used */}
        {sosRemaining !== null && sosUsedThisMonth > 0 && (
          <View style={styles.sosCounter}>
            <Text style={styles.sosCounterText}>
              SOS · {sosUsedThisMonth}/{sosFreeLimit} this month
            </Text>
          </View>
        )}

        {/* Streak section — hidden on Day 1 to avoid mocking 0 */}
        {!isDayOne && (
          <View
            style={styles.streakSection}
            accessibilityRole="text"
            accessibilityLabel={`Streak: ${streakDays} дней без сахара. ${freezesLeft} заморозок осталось на этой неделе.`}
          >
            <Text style={styles.streakNumber}>{streakDays}</Text>
            <Text style={styles.streakCaption}>{`DAYS CLEAN · BEST ${bestStreak}`}</Text>
            <View style={styles.streakDots}>
              {[...Array(14)].map((_, i) => (
                <TokenDot key={i} filled={i < streakDays} size={6} />
              ))}
            </View>
            {/* Streak freeze indicator — small chip under the streak */}
            <View style={styles.freezeIndicator}>
              <Text style={styles.freezeGlyph}>❄</Text>
              <Text style={styles.freezeText}>
                {freezesLeft === 0
                  ? 'No freezes left this week'
                  : `${freezesLeft} freeze${freezesLeft === 1 ? '' : 's'} left this week`}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <SOSFab onPress={onSos} bottom={insets.bottom + 96} />
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  pushBanner: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,172,160,0.4)',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(165,60,48,0.2)',
    zIndex: 20,
  },
  pushBannerDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  pushBannerText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.onPrimaryContainer,
  },
  pushBannerCta: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodySmall,
    color: colors.primary,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    zIndex: 10,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoMark: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  brandWord: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleSmall,
    color: colors.onSurface,
    letterSpacing: -0.2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
  },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },

  dateLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.label,
    marginBottom: spacing.lg,
  },

  heroPrefix: {
    fontFamily: fonts.headlineLight,
    fontSize: typeScale.displayMedium,
    color: colors.onSurfaceVariant,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  heroWord: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge + 20,
    color: colors.primary,
    letterSpacing: -1.5,
    lineHeight: 58,
    marginBottom: spacing.md,
  },
  heroSub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: spacing.xl,
    maxWidth: 300,
  },

  // Day 1 welcome card
  welcomeCard: { padding: spacing.lg, gap: spacing.md, marginBottom: spacing.lg },
  welcomeLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: 2,
  },
  taskRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  taskNum: {
    width: 24, height: 24, borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 2,
  },
  taskNumText: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
  },
  taskText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
    lineHeight: 20,
  },

  cardsCol: { gap: spacing.md, marginBottom: spacing.lg },
  forecastCard: { padding: spacing.lg },
  forecastCardPeak: { padding: spacing.lg, gap: spacing.md },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  forecastText: { flex: 1, gap: 4 },
  timeLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.outline,
    letterSpacing: tracking.labelWide,
  },
  timeLabelPeak: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onPrimaryContainer,
    letterSpacing: tracking.labelWide,
  },
  forecastTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  forecastTitlePeak: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleLarge + 2,
    color: colors.onPrimaryContainer,
    letterSpacing: -0.4,
  },
  forecastBody: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
  },
  forecastBodyPeak: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onPrimaryContainer,
    lineHeight: 20,
  },
  dotLarge: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
    marginTop: 4,
  },

  peakBadge: {
    backgroundColor: 'rgba(165,60,48,0.1)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  peakBadgeNumber: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleLarge,
    color: colors.primary,
    letterSpacing: -0.3,
  },
  peakBadgeLabel: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: colors.primary,
    letterSpacing: tracking.widest,
    marginTop: -2,
  },
  peakActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.xs,
  },
  peakAction: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },
  peakArrow: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },

  checkinStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingLeft: spacing.lg,
    paddingRight: spacing.md,
    marginBottom: spacing.lg,
  },
  checkinRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  checkinLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
  },
  checkinCta: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },

  lessonCard: { padding: spacing.lg, marginBottom: spacing.xl, gap: spacing.xs },
  lessonLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.secondary,
    letterSpacing: tracking.labelWide,
    marginBottom: 2,
  },
  lessonTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.onSurface,
    lineHeight: 22,
    letterSpacing: -0.3,
  },
  lessonBody: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginTop: 4,
  },

  sosCounter: {
    alignSelf: 'center',
    backgroundColor: 'rgba(165,60,48,0.08)',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginBottom: spacing.md,
  },
  sosCounterText: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.wide,
  },

  streakSection: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  streakNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.heroNumber,
    color: colors.primary,
    letterSpacing: -2,
    lineHeight: 80,
  },
  streakCaption: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  streakDots: { flexDirection: 'row', gap: 6 },

  freezeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    marginTop: spacing.md,
  },
  freezeGlyph: {
    fontFamily: fonts.headlineBold,
    fontSize: 12,
    color: colors.primary,
  },
  freezeText: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
  },
});

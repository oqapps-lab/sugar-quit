import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { GlassCard } from '../../components/ui/GlassCard';
import { SOSFab } from '../../components/ui/SOSFab';
import { StreakOrb } from '../../components/ui/StreakOrb';
import { TokenDot } from '../../components/ui/TokenDot';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { t } from '../../lib/i18n';
import { peakWindow24h } from '../../lib/peakHour';
import { phaseForDay } from '../../lib/phases';
import {
  getMilestoneDueIfAny,
  getTodayISODate,
  getYesterdayISODate,
  useUserStore,
} from '../../stores/useUserStore';

/**
 * Compute the day's forecast tone from streak + sos pressure. Eventually this
 * will read day-of-week and history of slips per weekday; for now it's a
 * rough heuristic to stop hard-coding "Light".
 */
type ForecastTone = 'Welcome' | 'Light' | 'Calm' | 'Steady' | 'Storm';

function computeForecast(
  streakDays: number,
  sosUsedToday: number,
  isCheckedInToday: boolean,
  peakHour: string | null,
): { toneKey: string; tone: string; sub: string } {
  const peakShort = (peakHour ?? '3 PM').replace(/:00/g, '').toLowerCase();

  if (streakDays === 0) {
    return { toneKey: 'home.tone_welcome', tone: t('home.tone_welcome'), sub: t('home.sub_welcome') };
  }
  if (sosUsedToday >= 2) {
    return { toneKey: 'home.tone_storm', tone: t('home.tone_storm'), sub: t('home.sub_storm') };
  }
  if (sosUsedToday === 1) {
    return { toneKey: 'home.tone_steady', tone: t('home.tone_steady'), sub: t('home.sub_steady') };
  }
  if (streakDays >= 14) {
    // Phase-aware "calm day" subtitle. Earlier this read "Two weeks in"
    // for ALL days >= 14, which felt stale on Day 48+ (Identity phase).
    const phase = phaseForDay(streakDays);
    const subByPhase: Record<string, string> = {
      Clarity:     t('home.sub_calm_clarity'),
      Integration: t('home.sub_calm_integration'),
      Identity:    t('home.sub_calm_identity'),
      Freedom:     t('home.sub_calm_freedom'),
    };
    return { toneKey: 'home.tone_calm', tone: t('home.tone_calm'), sub: subByPhase[phase.name] ?? t('home.sub_calm_default') };
  }
  if (isCheckedInToday) {
    return { toneKey: 'home.tone_light', tone: t('home.tone_light'), sub: t('home.sub_light_morning', { peak: peakShort }) };
  }
  return { toneKey: 'home.tone_light', tone: t('home.tone_light'), sub: t('home.sub_light_default') };
}

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
  const markMilestoneCelebrated = useUserStore((s) => s.markMilestoneCelebrated);
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

    // 2. Milestone: due milestone uncelebrated → mark celebrated AND push.
    // Marking BEFORE push prevents the auto-trigger from re-firing on the
    // next Home mount if the user closes by tab-switching away (state hasn't
    // round-tripped through the modal yet).
    const due = getMilestoneDueIfAny(streakDays, milestonesCelebrated);
    if (due !== null) {
      markMilestoneCelebrated(due);
      router.push('/(modals)/milestone');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDayOne = streakDays === 0 && !lastCheckInDate;
  const isCheckedInToday = lastCheckInDate === getTodayISODate();
  const sosRemaining = Number.isFinite(sosFreeLimit)
    ? Math.max(0, sosFreeLimit - sosUsedThisMonth)
    : null;

  // Today's forecast — count SOS sessions opened today (any outcome).
  const sosLog = useUserStore((s) => s.sosLog) ?? [];
  const todayISO = getTodayISODate();
  const sosUsedToday = sosLog.filter((s) => s.timestamp?.slice(0, 10) === todayISO).length;
  const peakHour = useUserStore.getState().peakHour;
  const forecast = computeForecast(streakDays, sosUsedToday, isCheckedInToday, peakHour);

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

  const greetingForHour = (hour: number): string => {
    if (hour < 5) return t('greetings.late_night');
    if (hour < 12) return t('greetings.good_morning');
    if (hour < 17) return t('greetings.good_afternoon');
    if (hour < 22) return t('greetings.good_evening');
    return t('greetings.late_night');
  };
  const dateLabel = firstName
    ? `${greetingForHour(new Date().getHours())}, ${firstName}`.toUpperCase()
    : "TODAY'S FORECAST";
  const avatarInitial = (firstName?.[0] ?? 'S').toUpperCase();

  const onSos = () => {
    router.push(sosDisclaimerAccepted ? '/(modals)/sos' : '/(modals)/disclaimer');
  };

  return (
    <AtmosphericGradient theme="dawn">
      {/* Background aura blobs — give the screen ambient depth */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={340} style={styles.auraTopRight} intensity={0.55} drift={24} />
        <AuraBlob tint="lavender" size={280} style={styles.auraMidLeft} intensity={0.45} drift={18} />
        <AuraBlob tint="golden" size={220} style={styles.auraBottomRight} intensity={0.5} drift={16} />
      </View>

      {/* Push re-permission banner */}
      {showPushBanner && (
        <View style={[styles.pushBanner, { top: insets.top + 4 }]}>
          <View style={styles.pushBannerDot} />
          <Text style={styles.pushBannerText}>
            Turn on notifications so you don't miss a craving
          </Text>
          <Pressable
            onPress={() => router.push('/(onboarding)/push-permission')}
            accessibilityRole="button"
            accessibilityLabel="Enable notifications"
          >
            <Text style={styles.pushBannerCta}>Enable →</Text>
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
          accessibilityLabel="Open profile"
        >
          <Text style={styles.avatarInitial}>{avatarInitial}</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 180 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.dateLabel}>{dateLabel}</Text>

        {/* HERO row — forecast text on the left, streak orb on the right.
            Day 1 (no streak yet) gets text-only hero. */}
        {isDayOne ? (
          <>
            <Text style={styles.heroPrefix}>Welcome,</Text>
            <Text style={styles.heroWord}>Day 1.</Text>
            <Text style={styles.heroSub}>{forecast.sub}</Text>
          </>
        ) : (
          <Animated.View entering={FadeInUp.duration(450)} style={styles.heroRow}>
            <View style={styles.heroTextCol}>
              <Text style={styles.heroPrefix}>{t('home.today_is')}</Text>
              <Text style={styles.heroWord}>{forecast.tone}.</Text>
              <Text style={styles.heroSub}>{forecast.sub}</Text>
            </View>

            {/* Compact streak orb + dots pill below, right column */}
            <View
              style={styles.heroOrbCol}
              accessibilityRole="text"
              accessibilityLabel={`Streak: ${streakDays} days without sugar. Best ${bestStreak}. ${freezesLeft} freezes left this week.`}
            >
              <Text style={styles.heroOrbEyebrow}>{t('home.your_streak').toUpperCase()}</Text>
              <StreakOrb count={streakDays} size={140} />
              <Text style={styles.heroOrbCaption}>{`${t('home.days_clean').toUpperCase()} · ${t('home.best').toUpperCase()} ${bestStreak}`}</Text>
              <View style={styles.heroDotsPill}>
                {[...Array(14)].map((_, i) => (
                  <TokenDot key={i} filled={i < streakDays} size={7} />
                ))}
              </View>
              <Text style={styles.heroDotsLabel}>{t('home.last_14_days')}</Text>
            </View>
          </Animated.View>
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

        {/* First-time legend — 4 distinct cards in a horizontal carousel,
            each with its own decorative glyph and accent tint. Shown during
            the acute phase (Days 0-3). Carousel deliberately bleeds beyond
            the screen edge (negative right margin via negative scroll-end
            padding) so the next card is visibly peeking. */}
        {streakDays <= 3 && (
          <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.legendBlock}>
            <Text style={styles.legendSectionLabel}>WHAT EVERYTHING MEANS</Text>
            <Text style={styles.legendSectionHint}>Swipe to learn the four concepts →</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.legendScroll}
              snapToInterval={260 + 12}
              decelerationRate="fast"
              style={styles.legendScrollView}
            >
              <GlassCard tint="peach" style={styles.legendCardHoriz}>
                <View style={styles.legendHeaderRow}>
                  <DecorGlyph variant="sun" size={52} />
                  <View style={styles.legendBadge}><Text style={styles.legendBadgeText}>1</Text></View>
                </View>
                <Text style={styles.legendCardTitle}>Your day's forecast</Text>
                <Text style={styles.legendCardBody}>
                  Light, Calm, Storm — we predict how heavy cravings will feel today.
                </Text>
              </GlassCard>

              <GlassCard tint="default" style={styles.legendCardHoriz}>
                <View style={styles.legendHeaderRow}>
                  <DecorGlyph variant="lightning" size={52} />
                  <View style={styles.legendBadge}><Text style={styles.legendBadgeText}>2</Text></View>
                </View>
                <Text style={styles.legendCardTitle}>The SOS button</Text>
                <Text style={styles.legendCardBody}>
                  Tap when a craving hits. AI talks you through it. 3 free per month.
                </Text>
              </GlassCard>

              <GlassCard tint="mint" style={styles.legendCardHoriz}>
                <View style={styles.legendHeaderRow}>
                  <DecorGlyph variant="snowflake" size={52} />
                  <View style={styles.legendBadge}><Text style={styles.legendBadgeText}>3</Text></View>
                </View>
                <Text style={styles.legendCardTitle}>Streak Freeze</Text>
                <Text style={styles.legendCardBody}>
                  One missed day forgiven per week — your streak doesn't break.
                </Text>
              </GlassCard>

              <GlassCard tint="lavender" style={styles.legendCardHoriz}>
                <View style={styles.legendHeaderRow}>
                  <DecorGlyph variant="flame" size={52} />
                  <View style={styles.legendBadge}><Text style={styles.legendBadgeText}>4</Text></View>
                </View>
                <Text style={styles.legendCardTitle}>Your streak</Text>
                <Text style={styles.legendCardBody}>
                  Days in a row sugar-free. Builds with each daily check-in.
                </Text>
              </GlassCard>
            </ScrollView>
          </Animated.View>
        )}

        {/* Forecast cards — every one is tappable, opens the explainer modal
            with the slot context (morning / peak / evening). */}
        {!isDayOne && (
          <View style={styles.cardsCol}>
            <Animated.View entering={FadeInDown.delay(100).duration(500)}>
              <Pressable
                onPress={() => router.push('/(modals)/forecast-window?slot=morning')}
                accessibilityRole="button"
                accessibilityLabel="Calm morning window — tap to learn more"
              >
                <GlassCard tint="default" style={styles.forecastCard}>
                  <View style={styles.forecastRow}>
                    <View style={styles.forecastText}>
                      <Text style={styles.timeLabel}>08:00 — 12:00</Text>
                      <Text style={styles.forecastTitle}>{t('home.forecast_calm')}</Text>
                      <Text style={styles.forecastBody}>
                        {t('home.forecast_calm_hint')}
                      </Text>
                    </View>
                    <DecorGlyph variant="sun" size={56} />
                  </View>
                </GlassCard>
              </Pressable>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(500)}>
              <Pressable
                onPress={() => router.push('/(modals)/forecast-window?slot=peak')}
                accessibilityRole="button"
                accessibilityLabel="Peak surge window — tap to see your plan"
              >
                <GlassCard tint="peach" style={styles.forecastCardPeak}>
                  <View style={styles.forecastRow}>
                    <View style={styles.forecastText}>
                      <View style={styles.peakTitleRow}>
                        <DecorGlyph variant="lightning" size={28} />
                        <Text style={styles.timeLabelPeak}>{peakWindow24h(useUserStore.getState().peakHour)}</Text>
                      </View>
                      <Text style={styles.forecastTitlePeak}>{t('home.forecast_high_surge')}</Text>
                      <Text style={styles.forecastBodyPeak}>
                        {t('home.forecast_high_surge_hint')}
                      </Text>
                    </View>
                    {(() => {
                      // Peak badge — split user's peakHour into number + AM/PM.
                      // Accepts both "3:00 PM" (12h, picker default) and
                      // "21:00" (24h, server seed) formats.
                      const raw = useUserStore.getState().peakHour ?? '3:00 PM';
                      const m12 = raw.match(/(\d{1,2}:\d{2})\s*(AM|PM)/i);
                      let num = '3:00';
                      let ampm = 'PM';
                      if (m12) {
                        num = m12[1];
                        ampm = m12[2].toUpperCase();
                      } else {
                        const m24 = raw.match(/^(\d{1,2}):(\d{2})$/);
                        if (m24) {
                          let h = parseInt(m24[1], 10);
                          ampm = h >= 12 ? 'PM' : 'AM';
                          if (h > 12) h -= 12;
                          if (h === 0) h = 12;
                          num = `${h}:${m24[2]}`;
                        }
                      }
                      return (
                        <View style={styles.peakBadge}>
                          <Text style={styles.peakBadgeNumber}>{num}</Text>
                          <Text style={styles.peakBadgeLabel}>{ampm}</Text>
                        </View>
                      );
                    })()}
                  </View>
                  <View style={styles.peakActionRow}>
                    <Text style={styles.peakAction}>{t('home.see_plan')}</Text>
                    <Text style={styles.peakArrow}>→</Text>
                  </View>
                </GlassCard>
              </Pressable>
            </Animated.View>

            {(() => {
              // Bug 24 fix: don't render Exhale if peak window already runs
              // into the 18:00-22:00 evening (e.g. peakHour=21:00 → peak
              // ends at 00:00, fully consumes evening). Two cards on the
              // same hour was confusing.
              const raw = useUserStore.getState().peakHour ?? '3:00 PM';
              const m12 = raw.match(/(\d{1,2}):\d{2}\s*(AM|PM)/i);
              let peakStartH = 15;
              if (m12) {
                let h = parseInt(m12[1], 10);
                if (m12[2].toUpperCase() === 'PM' && h < 12) h += 12;
                if (m12[2].toUpperCase() === 'AM' && h === 12) h = 0;
                peakStartH = h;
              } else {
                const m24 = raw.match(/^(\d{1,2}):/);
                if (m24) peakStartH = parseInt(m24[1], 10);
              }
              const peakEndH = (peakStartH + 3) % 24;
              // Hide Exhale if peak overlaps 18:00-22:00 window.
              if (peakStartH >= 18 || peakEndH > 18 || peakEndH === 0) return null;
              return (
              <Animated.View entering={FadeInDown.delay(300).duration(500)}>
              <Pressable
                onPress={() => router.push('/(modals)/forecast-window?slot=evening')}
                accessibilityRole="button"
                accessibilityLabel="Evening exhale window — tap to learn more"
              >
                <GlassCard tint="mint" style={styles.forecastCard}>
                  <View style={styles.forecastRow}>
                    <View style={styles.forecastText}>
                      <Text style={styles.timeLabel}>18:00 — 22:00</Text>
                      <Text style={styles.forecastTitle}>{t('home.forecast_exhale')}</Text>
                      <Text style={styles.forecastBody}>
                        {t('home.forecast_exhale_hint')}
                      </Text>
                    </View>
                    <DecorGlyph variant="moon" size={56} />
                  </View>
                </GlassCard>
              </Pressable>
            </Animated.View>
              );
            })()}
          </View>
        )}

        {/* Check-in strip — only if not done today. Border + chevron makes it
            clearly tappable (was reading as a passive notice card). */}
        {!isCheckedInToday && (
          <Pressable
            onPress={() => router.push('/(modals)/checkin')}
            accessibilityRole="button"
            accessibilityLabel={isDayOne ? 'Open your first check-in' : 'Open daily check-in'}
          >
            <GlassCard tint="peach" radius={radius.full} style={styles.checkinStrip}>
              <View style={styles.checkinRow}>
                <View style={styles.pulseDot} />
                <Text style={styles.checkinLabel}>{isDayOne ? t('home.first_checkin') : t('home.daily_checkin')}</Text>
              </View>
              <View style={styles.checkinCtaWrap}>
                <Text style={styles.checkinCta}>{t('home.mark_now')}</Text>
                <Text style={styles.checkinChevron}>→</Text>
              </View>
            </GlassCard>
          </Pressable>
        )}

        {/* Lesson card — phase-aware insight, not "Day 14 reference" for a
            Day 47 user. Bands match the Progress timeline phase model so
            copy stays consistent across surfaces. */}
        <Pressable onPress={() => router.push('/(tabs)/curriculum')}>
          <GlassCard tint="lavender" style={styles.lessonCard}>
            <Text style={styles.lessonLabel}>{t('home.daily_insight')}</Text>
            {(() => {
              const day = Math.max(1, streakDays);
              const phase = phaseForDay(day);
              // Identity phase is translated; other phases fall back to English
              // (only the seeded Day 48 Sarah state is captured in screenshots).
              if (phase.name === 'Identity') {
                return (
                  <>
                    <Text style={styles.lessonTitle}>{t('home.insight_identity_title', { day })}</Text>
                    <Text style={styles.lessonBody}>{t('home.insight_identity_body')}</Text>
                  </>
                );
              }
              const insightByPhase: Record<string, { title: string; body: string }> = {
                Arrival: {
                  title: day === 1
                    ? 'Day 1 — why sugar catches the brain'
                    : `Day ${day} — the storm settling in`,
                  body: 'Cortisol withdrawal peaks around now. 4 min read.',
                },
                Detox: {
                  title: `Day ${day} — the 72-hour fog lifts`,
                  body: 'After day 3, the spike fades. Receptors recalibrate. 4 min read.',
                },
                Clarity: {
                  title: `Day ${day} — your taste buds are waking up`,
                  body: 'Fruit gets noticeably sweeter around the two-week mark. 5 min read.',
                },
                Integration: {
                  title: `Day ${day} — new defaults forming`,
                  body: 'Replacement rituals harden into habit. 5 min read.',
                },
                Freedom: {
                  title: `Day ${day} — walking free`,
                  body: 'The habit is automatic. You walk past the candy aisle. 5 min read.',
                },
              };
              const insight = insightByPhase[phase.name];
              return (
                <>
                  <Text style={styles.lessonTitle}>{insight.title}</Text>
                  <Text style={styles.lessonBody}>{insight.body}</Text>
                </>
              );
            })()}
          </GlassCard>
        </Pressable>

        {/* SOS counter — GlassCard with internal gradient overlay for depth.
            When the user is at limit the tone shifts to warmer / more urgent. */}
        {sosRemaining !== null && sosUsedThisMonth > 0 && (
          <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.sosCounterWrap}>
            <LinearGradient
              colors={
                sosRemaining === 0
                  ? ['rgba(255,158,125,0.35)', 'rgba(165,60,48,0.18)'] as const
                  : ['rgba(255,215,168,0.4)', 'rgba(255,172,160,0.25)'] as const
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sosCounterGradient}
            />
            <GlassCard tint="peach" style={styles.sosCounterCard}>
              <View style={styles.sosCounterHeader}>
                <View style={styles.sosCounterGlyphWrap}>
                  <DecorGlyph variant="compass" size={32} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sosCounterEyebrow}>SOS USAGE · THIS MONTH</Text>
                  <Text style={styles.sosCounterText}>
                    {sosUsedThisMonth} of {sosFreeLimit} {sosFreeLimit === 1 ? 'session' : 'sessions'} used
                  </Text>
                </View>
              </View>
              <View style={styles.sosCounterDotsRow}>
                {Number.isFinite(sosFreeLimit) &&
                  [...Array(sosFreeLimit)].map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.sosCounterSlot,
                        i < sosUsedThisMonth && styles.sosCounterSlotUsed,
                      ]}
                    />
                  ))}
              </View>
              {sosRemaining === 0 && (
                <View style={styles.sosCounterUpgrade}>
                  <Text style={styles.sosCounterUpgradeText}>
                    Upgrade to Premium for unlimited →
                  </Text>
                </View>
              )}
            </GlassCard>
          </Animated.View>
        )}

        {/* Streak freeze card — cool mint/blue internal gradient, large
            snowflake with its own halo. */}
        {!isDayOne && (
          <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.freezeWrap}>
            <LinearGradient
              colors={['rgba(207,224,223,0.5)', 'rgba(230,240,240,0.3)'] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.freezeGradient}
            />
            <GlassCard tint="default" style={styles.freezeCard}>
              <View style={styles.freezeHeaderRow}>
                <View style={styles.freezeGlyphWrap}>
                  <View style={styles.freezeGlyphAura} />
                  <DecorGlyph variant="snowflake" size={44} />
                </View>
                <View style={styles.freezeHeaderText}>
                  <Text style={styles.freezeTitle}>
                    {freezesLeft === 0
                      ? t('home.freezes_zero')
                      : freezesLeft === 1
                        ? t('home.freezes_left_one')
                        : t('home.freezes_left', { n: freezesLeft })}
                  </Text>
                  <Text style={styles.freezeSubtitle}>
                    {t('home.freeze_subtitle')}
                  </Text>
                </View>
              </View>
            </GlassCard>
          </Animated.View>
        )}
      </ScrollView>

      <SOSFab onPress={onSos} bottom={insets.bottom + 96} position="right" />
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
    // Drop Android font padding so the red brand dot in brandRow
    // (alignItems: center) lines up with the visual center of the text
    // (kakoccc #16 brand dot baseline alignment 2026-04-29).
    includeFontPadding: false,
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
    fontSize: typeScale.displayMedium + 12,
    color: colors.primary,
    letterSpacing: -1.5,
    lineHeight: 48,
    marginBottom: spacing.md,
  },
  heroSub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 0,
  },

  // Hero row layout (text left, orb right)
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  heroTextCol: {
    flex: 1,
  },
  heroOrbCol: {
    width: 150,
    alignItems: 'center',
    gap: spacing.xs,
  },
  heroOrbEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.xs,
  },
  heroOrbCaption: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  heroDotsPill: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    marginTop: spacing.sm,
  },
  heroDotsLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
    letterSpacing: 0.3,
    marginTop: spacing.xs + 2,
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
  checkinCtaWrap: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  checkinCta: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },
  checkinChevron: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium + 2,
    color: colors.primary,
  },

  // Day 1 first-time legend
  legendCard: { padding: spacing.lg, gap: spacing.md, marginBottom: spacing.lg },
  legendLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.xs,
  },
  legendRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  legendGlyph: {
    fontSize: 22,
    width: 28,
    textAlign: 'center',
    color: colors.primary,
  },
  legendText: { flex: 1, gap: 2 },
  legendTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
  },
  legendBody: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },

  lessonCard: { padding: spacing.lg, marginBottom: spacing.lg, gap: spacing.xs },
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

  sosCounterWrap: {
    marginBottom: spacing.lg,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  sosCounterGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.sm,
  },
  sosCounterCard: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  sosCounterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  sosCounterGlyphWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sosCounterUpgrade: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    marginTop: spacing.md,
  },
  sosCounterUpgradeText: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },
  sosCounterEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: 2,
  },
  sosCounterText: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    letterSpacing: -0.2,
  },
  sosCounterDotsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  sosCounterSlot: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(165,60,48,0.18)',
  },
  sosCounterSlotUsed: {
    backgroundColor: colors.primary,
  },
  sosCounterHint: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },

  streakSection: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  streakEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.sm,
  },
  orbFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  streakCaption: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.md,
  },
  streakDotsBlock: {
    alignItems: 'center',
    marginTop: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    gap: spacing.xs,
  },
  streakDotsLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
    opacity: 0.8,
  },
  streakDotsRow: { flexDirection: 'row', gap: 8 },

  // Legend carousel — the ScrollView itself gets a NEGATIVE right margin that
  // cancels the parent ScrollView's paddingHorizontal, so cards can fully
  // bleed past the screen edge. Inner contentContainer adds back-padding so
  // cards start flush with screen left.
  legendBlock: {
    marginBottom: spacing.lg,
  },
  legendScrollView: {
    marginRight: -spacing.lg,
  },
  legendSectionLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.xs,
  },
  legendSectionHint: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.md,
  },
  legendScroll: {
    paddingRight: spacing.lg * 2,
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  legendCardHoriz: {
    width: 260,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  legendHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  legendBadge: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.85,
  },
  legendBadgeText: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.labelSmall,
    color: colors.onPrimary,
    // includeFontPadding default (true) on Android adds top padding inside
    // the line box that pushes the digit visually below center in a tight
    // 24×24 circle. iOS no-ops on this prop (kakoccc #25 2026-04-29).
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: typeScale.labelSmall + 2,
  },
  legendCardTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  legendCardBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
  },

  // Freeze card — cool-toned mint/blue gradient wrap + snowflake halo
  freezeWrap: {
    marginBottom: spacing.lg,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  freezeGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.sm,
  },
  freezeCard: {
    padding: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  freezeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  freezeGlyphWrap: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freezeGlyphAura: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(165,60,48,0.12)',
  },
  freezeHeaderText: { flex: 1, gap: 4 },
  freezeTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    letterSpacing: -0.2,
  },
  freezeSubtitle: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },

  // Background aura layer
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -80,
    right: -120,
  },
  auraMidLeft: {
    position: 'absolute',
    top: '35%',
    left: -140,
  },
  auraBottomRight: {
    position: 'absolute',
    bottom: '25%',
    right: -80,
  },

  peakTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 2,
  },

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

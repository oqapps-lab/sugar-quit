import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../components/ui/AtmosphericGradient';
import { BottomNav } from '../components/ui/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientText } from '../components/ui/GradientText';
import { SOSFab } from '../components/ui/SOSFab';
import { TokenDot } from '../components/ui/TokenDot';
import { colors, fonts, radius, shadows, spacing, tracking } from '../constants/tokens';

/**
 * Home — Daily Wellness Weather Report.
 * Mirror of screen 12 (stitch-export/12-daily-wellness-weather.png).
 * Theme: Dawn atmospheric.
 */
export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="dawn">
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>SUGAR QUIT</Text>
        </View>
        <View style={styles.avatar} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 180 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Date label */}
        <Text style={styles.dateLabel}>TODAY'S FORECAST · 19 APRIL</Text>

        {/* Editorial hero */}
        <Text style={styles.heroPrefix}>Today is</Text>
        <GradientText style={styles.heroWord} gradient="heroHorizontal">
          Light.
        </GradientText>
        <Text style={styles.heroSub}>
          Morning is calm. A small 3pm surge. Evening exhales into mint.
        </Text>

        {/* Forecast cards */}
        <View style={styles.cardsCol}>
          {/* Morning */}
          <GlassCard tint="default" style={styles.forecastCard}>
            <Text style={styles.timeLabel}>08:00 — 12:00</Text>
            <Text style={styles.forecastTitleLight}>Calm.</Text>
            <Text style={styles.forecastBody}>
              Low risk environment. Your cortisol is stabilizing naturally.
            </Text>
          </GlassCard>

          {/* Afternoon — peak (anchor) */}
          <GlassCard tint="peach" style={styles.forecastCardPeak}>
            {/* Ghost number */}
            <Text style={styles.ghostNumber}>3:12</Text>
            <Text style={styles.timeLabelPeak}>15:00 — 18:00</Text>
            <Text style={styles.forecastTitleSurge}>High surge.</Text>
            <View style={styles.peakRow}>
              <Text style={styles.forecastBodyPeak}>
                Energy dip triggers craving response.
              </Text>
              <View style={styles.peakPill}>
                <Text style={styles.peakPillLabel}>See plan →</Text>
              </View>
            </View>
          </GlassCard>

          {/* Evening — exhale */}
          <GlassCard tint="mint" style={styles.forecastCard}>
            <Text style={styles.timeLabel}>18:00 — 22:00</Text>
            <Text style={styles.forecastTitleLight}>The exhale.</Text>
            <Text style={styles.forecastBody}>
              System resets. Prepare for deep restorative sleep.
            </Text>
          </GlassCard>
        </View>

        {/* Check-in strip */}
        <GlassCard tint="cream" radius={radius.full} style={styles.checkinStrip}>
          <View style={styles.checkinRow}>
            <View style={styles.pulseDot} />
            <Text style={styles.checkinLabel}>Midday Check-in</Text>
          </View>
          <Text style={styles.checkinCta}>Mark now →</Text>
        </GlassCard>

        {/* Lesson card */}
        <GlassCard tint="lavender" style={styles.lessonCard}>
          <Text style={styles.lessonLabel}>DAILY INSIGHT</Text>
          <Text style={styles.lessonTitle}>
            Day 8 — Your taste buds are waking up
          </Text>
        </GlassCard>

        {/* Streak hero */}
        <View style={styles.streakSection}>
          <GradientText style={styles.streakNumber} gradient="heroVertical">
            8
          </GradientText>
          <Text style={styles.streakCaption}>DAYS CLEAN · BEST STREAK 12</Text>
          <View style={styles.streakDots}>
            {[...Array(14)].map((_, i) => (
              <TokenDot key={i} filled={i < 8} size={6} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* SOS */}
      <SOSFab onPress={() => router.push('/sos')} bottom={insets.bottom + 120} />

      {/* Bottom nav */}
      <BottomNav
        tabs={[
          { key: 'home', label: 'Home', icon: '◉', active: true },
          { key: 'progress', label: 'Progress', icon: '≋' },
          { key: 'sos-tab', label: 'SOS', icon: '!' },
          { key: 'profile', label: 'Profile', icon: '◯' },
        ]}
        onPress={(key) => {
          if (key === 'progress') router.push('/progress');
          if (key === 'profile') router.push('/profile');
          if (key === 'sos-tab') router.push('/sos');
        }}
      />
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
    zIndex: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoMark: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    opacity: 0.9,
  },
  brandWord: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 14,
    color: colors.onSurface,
    letterSpacing: tracking.widest,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHighest,
    ...shadows.cardWhisper,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  dateLabel: {
    fontFamily: fonts.label,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.label,
    marginBottom: spacing.lg,
    fontWeight: '500',
  },
  heroPrefix: {
    fontFamily: fonts.headlineLight,
    fontSize: 24,
    color: colors.onSurface,
    marginBottom: spacing.xs,
    letterSpacing: tracking.tight,
    fontWeight: '300',
  },
  heroWord: {
    fontFamily: fonts.serifBoldItalic,
    fontSize: 96,
    lineHeight: 96,
    fontWeight: '700',
    fontStyle: 'italic',
    letterSpacing: tracking.tighter,
    marginBottom: spacing.md,
  },
  heroSub: {
    fontFamily: fonts.bodyLight,
    fontSize: 17,
    color: colors.onSurfaceVariant,
    lineHeight: 26,
    marginBottom: spacing.xl,
    maxWidth: 280,
    fontWeight: '300',
  },
  cardsCol: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  forecastCard: {
    padding: spacing.xl,
  },
  forecastCardPeak: {
    padding: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 180,
  },
  ghostNumber: {
    position: 'absolute',
    right: -20,
    bottom: -40,
    fontSize: 140,
    fontFamily: fonts.headlineExtraBold,
    color: 'rgba(255, 172, 160, 0.35)',
    letterSpacing: -5,
    lineHeight: 140,
    fontWeight: '800',
  },
  timeLabel: {
    fontFamily: fonts.label,
    fontSize: 10,
    color: colors.outline,
    letterSpacing: tracking.widest,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  timeLabelPeak: {
    fontFamily: fonts.label,
    fontSize: 10,
    color: colors.onPrimaryContainer,
    letterSpacing: tracking.widest,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  forecastTitleLight: {
    fontFamily: fonts.headlineLight,
    fontSize: 28,
    color: colors.onSurface,
    marginBottom: spacing.md,
    fontWeight: '300',
  },
  forecastTitleSurge: {
    fontFamily: fonts.headline,
    fontSize: 28,
    color: colors.onPrimaryContainer,
    marginBottom: spacing.lg,
    fontWeight: '600',
  },
  forecastBody: {
    fontFamily: fonts.bodyThin,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    maxWidth: 220,
    fontWeight: '200',
  },
  peakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  forecastBodyPeak: {
    fontFamily: fonts.bodyLight,
    fontSize: 14,
    color: colors.onPrimaryContainer,
    lineHeight: 20,
    flex: 1,
    fontWeight: '300',
  },
  peakPill: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.full,
  },
  peakPillLabel: {
    color: colors.onPrimary,
    fontFamily: fonts.label,
    fontSize: 13,
    fontWeight: '500',
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
  checkinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  checkinLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.onSurface,
    letterSpacing: tracking.wide,
    fontWeight: '500',
  },
  checkinCta: {
    fontFamily: fonts.bodyMedium,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  lessonCard: {
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  lessonLabel: {
    fontFamily: fonts.label,
    fontSize: 10,
    color: colors.secondary,
    letterSpacing: tracking.widest,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  lessonTitle: {
    fontFamily: fonts.headline,
    fontSize: 18,
    color: colors.onSurface,
    lineHeight: 24,
    fontWeight: '500',
  },
  streakSection: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  streakNumber: {
    fontFamily: fonts.serifItalic,
    fontSize: 160,
    lineHeight: 160,
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: tracking.tighter,
    marginBottom: spacing.md,
    height: 160,
  },
  streakCaption: {
    fontFamily: fonts.label,
    fontSize: 11,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.lg,
    fontWeight: '500',
  },
  streakDots: {
    flexDirection: 'row',
    gap: 8,
  },
});

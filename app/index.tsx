import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../components/ui/AtmosphericGradient';
import { BottomNav } from '../components/ui/BottomNav';
import { GlassCard } from '../components/ui/GlassCard';
import { SOSFab } from '../components/ui/SOSFab';
import { TokenDot } from '../components/ui/TokenDot';
import { colors, fonts, radius, shadows, spacing, tracking, typeScale } from '../constants/tokens';

/**
 * Home — Daily Wellness Weather.
 * Modern mobile typography (not magazine). Clean sans-serif throughout.
 */
export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="dawn">
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>Sugar Quit</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>S</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 180 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Date label */}
        <Text style={styles.dateLabel}>TODAY'S FORECAST · 19 APRIL</Text>

        {/* Hero */}
        <Text style={styles.heroPrefix}>Today is</Text>
        <Text style={styles.heroWord}>Light.</Text>
        <Text style={styles.heroSub}>
          Morning is calm. A small 3pm surge. Evening exhales into mint.
        </Text>

        {/* Forecast cards */}
        <View style={styles.cardsCol}>
          {/* Morning */}
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

          {/* Afternoon — peak (anchor) */}
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
            <View style={styles.peakActionRow}>
              <Text style={styles.peakAction}>See plan</Text>
              <Text style={styles.peakArrow}>→</Text>
            </View>
          </GlassCard>

          {/* Evening — exhale */}
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

        {/* Check-in strip */}
        <GlassCard tint="cream" radius={radius.full} style={styles.checkinStrip}>
          <View style={styles.checkinRow}>
            <View style={styles.pulseDot} />
            <Text style={styles.checkinLabel}>Midday check-in</Text>
          </View>
          <Text style={styles.checkinCta}>Mark now →</Text>
        </GlassCard>

        {/* Lesson card */}
        <GlassCard tint="lavender" style={styles.lessonCard}>
          <Text style={styles.lessonLabel}>DAILY INSIGHT</Text>
          <Text style={styles.lessonTitle}>
            Day 8 — your taste buds are waking up
          </Text>
          <Text style={styles.lessonBody}>
            Fruit will taste 40% sweeter by day 14. 5 min read.
          </Text>
        </GlassCard>

        {/* Streak */}
        <View style={styles.streakSection}>
          <Text style={styles.streakNumber}>8</Text>
          <Text style={styles.streakCaption}>DAYS CLEAN · BEST 12</Text>
          <View style={styles.streakDots}>
            {[...Array(14)].map((_, i) => (
              <TokenDot key={i} filled={i < 8} size={6} />
            ))}
          </View>
        </View>
      </ScrollView>

      <SOSFab onPress={() => router.push('/sos')} bottom={insets.bottom + 120} />

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

  lessonCard: { padding: spacing.lg, marginBottom: spacing.xxl, gap: spacing.xs },
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
});

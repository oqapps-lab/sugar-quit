import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../components/ui/GlassCard';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * Profile — Your Craving Profile (post-onboarding result).
 * Clean modern typography. No serif italic.
 */
export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="cravingProfile">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>Sugar Quit</Text>
        </View>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.skipLabel}>Skip</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero — clean app style */}
        <View style={styles.heroSection}>
          <Text style={styles.eyebrow}>YOUR CRAVING PROFILE</Text>
          <Text style={styles.heroTitle}>
            You're a <Text style={styles.heroTitleAccent}>Stress Eater</Text>
          </Text>
          <Text style={styles.heroSubtitle}>with a 3pm crash</Text>
          <Text style={styles.heroBody}>
            Your body seeks rapid energy drops to counter cortisol peaks.
            We'll replace the spike with steady emotional grounding.
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cardsCol}>
          <GlassCard tint="default" style={styles.insightCard}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconGlyph}>⧗</Text>
              </View>
              <Text style={styles.cardEyebrow}>PEAK WINDOW</Text>
            </View>
            <Text style={styles.cardTitle}>3:00 – 5:00 PM</Text>
            <Text style={styles.cardBody}>
              Cortisol dips naturally mid-afternoon. We'll introduce a 2-minute
              breath protocol right before the craving hits.
            </Text>
          </GlassCard>

          <GlassCard tint="peach" style={styles.insightCardLarge}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconAccent}>
                <Text style={styles.cardIconGlyphAccent}>◈</Text>
              </View>
              <Text style={styles.cardEyebrowAccent}>WEEK 1</Text>
            </View>
            <Text style={styles.cardTitleLarge}>Withdrawal, then clarity</Text>
            <Text style={styles.cardBody}>
              The first 4 days are a physiological unbinding. By day 7, the mental
              fog lifts and the deep fatigue subsides. Expect emotional turbulence,
              met with soft interventions.
            </Text>
            <View style={styles.timelineRow}>
              <View style={styles.timelineDay}>
                <Text style={styles.timelineDayNumber}>1–4</Text>
                <Text style={styles.timelineDayLabel}>unbind</Text>
              </View>
              <View style={styles.timelineArrow}><Text style={styles.timelineArrowText}>→</Text></View>
              <View style={styles.timelineDay}>
                <Text style={styles.timelineDayNumber}>5–6</Text>
                <Text style={styles.timelineDayLabel}>turbulence</Text>
              </View>
              <View style={styles.timelineArrow}><Text style={styles.timelineArrowText}>→</Text></View>
              <View style={styles.timelineDay}>
                <Text style={[styles.timelineDayNumber, { color: colors.primary }]}>7</Text>
                <Text style={[styles.timelineDayLabel, { color: colors.primary }]}>clarity</Text>
              </View>
            </View>
          </GlassCard>

          <GlassCard tint="mint" style={styles.insightCard}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIconMint}>
                <Text style={[styles.cardIconGlyph, { color: colors.tertiary }]}>△</Text>
              </View>
              <Text style={[styles.cardEyebrow, { color: colors.tertiary }]}>BY DAY 30</Text>
            </View>
            <Text style={styles.cardTitle}>Taste buds reset</Text>
            <Text style={styles.cardBody}>
              Natural foods will taste vibrant again. The compulsion fades into
              a gentle, manageable whisper.
            </Text>
          </GlassCard>
        </View>
      </ScrollView>

      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Begin the program" onPress={() => router.push('/(onboarding)/paywall')} />
      </View>
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
    letterSpacing: -0.2,
  },
  skipLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.xl },

  heroSection: { gap: spacing.xs },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge + 4,
    color: colors.onSurface,
    letterSpacing: -1.2,
    lineHeight: 44,
  },
  heroTitleAccent: {
    color: colors.primary,
  },
  heroSubtitle: {
    fontFamily: fonts.headlineLight,
    fontSize: typeScale.displaySmall,
    color: colors.onSurfaceVariant,
    letterSpacing: -0.5,
    marginBottom: spacing.sm,
  },
  heroBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginTop: spacing.xs,
    maxWidth: 360,
  },

  cardsCol: { gap: spacing.md },
  insightCard: { padding: spacing.lg, gap: spacing.sm },
  insightCardLarge: { padding: spacing.lg, gap: spacing.sm },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  cardIcon: {
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: 'rgba(165,60,48,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  cardIconAccent: {
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  cardIconMint: {
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: 'rgba(207,224,223,0.6)',
    alignItems: 'center', justifyContent: 'center',
  },
  cardIconGlyph: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.headlineBold,
  },
  cardIconGlyphAccent: {
    fontSize: 16,
    color: colors.onPrimary,
    fontFamily: fonts.headlineBold,
  },
  cardEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  cardEyebrowAccent: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  cardTitle: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleLarge + 2,
    color: colors.onSurface,
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  cardTitleLarge: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.displaySmall,
    color: colors.onSurface,
    letterSpacing: -0.6,
    lineHeight: 30,
  },
  cardBody: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
  },

  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(49,51,47,0.08)',
  },
  timelineDay: { alignItems: 'center', gap: 2 },
  timelineDayNumber: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleMedium,
    color: colors.onSurface,
  },
  timelineDayLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
  },
  timelineArrow: { opacity: 0.3 },
  timelineArrowText: { fontSize: 14, color: colors.onSurfaceVariant },

  ctaWrap: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});

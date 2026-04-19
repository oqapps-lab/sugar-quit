import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../components/ui/AtmosphericGradient';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientText } from '../components/ui/GradientText';
import { PillCTA } from '../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking } from '../constants/tokens';

/**
 * Profile — Your Craving Profile (post-onboarding Result screen).
 * Mirror of screen 05 (stitch-export/05-craving-profile.png).
 * Theme: cravingProfile — 5-stop soft linear gradient.
 */
export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="cravingProfile">
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
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
        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={styles.eyebrow}>YOUR CRAVING PROFILE</Text>
          <Text style={styles.youAreA}>You are a</Text>
          <GradientText style={styles.heroName} gradient="heroHorizontal">
            Stress Eater
          </GradientText>
          <Text style={styles.heroSuffix}>with a 3pm crash.</Text>
          <Text style={styles.heroBody}>
            Your body seeks rapid energy drops to counter cortisol peaks.
            We'll replace the spike with steady emotional grounding.
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cardsCol}>
          {/* Card 1 — peak window */}
          <GlassCard tint="default" style={styles.insightCard}>
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconGlyph}>◷</Text>
            </View>
            <Text style={styles.cardTitle}>Your peak window is 3:00–5:00 PM.</Text>
            <Text style={styles.cardBody}>
              Cortisol dips naturally mid-afternoon. We'll introduce a 2-minute
              breath protocol right before the craving hits.
            </Text>
          </GlassCard>

          {/* Card 2 — Week 1 (bigger, anchor) */}
          <GlassCard tint="peach" style={styles.insightCardLarge}>
            <View style={styles.cardIconLarge}>
              <Text style={styles.cardIconGlyphLarge}>↯</Text>
            </View>
            <Text style={styles.cardTitleLarge}>
              Week 1 — Withdrawal, then clarity.
            </Text>
            <Text style={styles.cardBodyLarge}>
              The first 4 days are a physiological unbinding. By day 7, the mental
              fog lifts and the deep fatigue subsides. Expect emotional turbulence,
              met with soft interventions.
            </Text>
          </GlassCard>

          {/* Card 3 — Day 30 */}
          <GlassCard tint="mint" style={styles.insightCard}>
            <View style={styles.cardIconMint}>
              <Text style={styles.cardIconGlyph}>△</Text>
            </View>
            <Text style={styles.cardTitle}>By Day 30, taste buds reset.</Text>
            <Text style={styles.cardBody}>
              Natural foods will taste vibrant again. The compulsion will fade into
              a gentle, manageable whisper.
            </Text>
          </GlassCard>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Begin the program" onPress={() => router.push('/')} />
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
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoMark: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  brandWord: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 20,
    color: colors.primary,
    letterSpacing: tracking.tight,
    fontWeight: '800',
  },
  skipLabel: {
    fontFamily: fonts.bodyLight,
    fontSize: 15,
    color: colors.onSurfaceVariant,
    fontWeight: '300',
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.xxxl,
  },
  heroSection: {
    gap: spacing.sm,
    paddingLeft: spacing.xs,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: 11,
    color: '#d87158',
    letterSpacing: tracking.labelWide,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  youAreA: {
    fontFamily: fonts.bodyLight,
    fontSize: 20,
    color: colors.tertiaryDim,
    fontWeight: '300',
  },
  heroName: {
    fontFamily: fonts.serifBoldItalic,
    fontSize: 64,
    lineHeight: 68,
    fontWeight: '700',
    fontStyle: 'italic',
    letterSpacing: tracking.tight,
    marginTop: -4,
    height: 68,
  },
  heroSuffix: {
    fontFamily: fonts.serifItalic,
    fontSize: 28,
    fontStyle: 'italic',
    color: colors.secondaryDim,
    fontWeight: '400',
    marginTop: 4,
  },
  heroBody: {
    fontFamily: fonts.bodyLight,
    fontSize: 17,
    color: colors.onSurfaceVariant,
    lineHeight: 26,
    marginTop: spacing.md,
    maxWidth: 360,
    fontWeight: '300',
  },
  cardsCol: {
    gap: spacing.lg,
  },
  insightCard: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  insightCardLarge: {
    padding: spacing.xl + spacing.xs,
    gap: spacing.md,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 151, 136, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  cardIconLarge: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: 'rgba(165, 60, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  cardIconMint: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: 'rgba(207, 224, 223, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  cardIconGlyph: {
    fontSize: 22,
    color: colors.primaryDim,
    fontWeight: '300',
  },
  cardIconGlyphLarge: {
    fontSize: 28,
    color: colors.primary,
    fontWeight: '300',
  },
  cardTitle: {
    fontFamily: fonts.serifItalic,
    fontSize: 22,
    color: colors.onSurface,
    lineHeight: 28,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  cardTitleLarge: {
    fontFamily: fonts.serifItalic,
    fontSize: 30,
    color: colors.onSurface,
    lineHeight: 36,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  cardBody: {
    fontFamily: fonts.bodyLight,
    fontSize: 15,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    fontWeight: '300',
  },
  cardBodyLarge: {
    fontFamily: fonts.bodyLight,
    fontSize: 17,
    color: colors.onSurfaceVariant,
    lineHeight: 26,
    maxWidth: 440,
    fontWeight: '300',
  },
  ctaWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});

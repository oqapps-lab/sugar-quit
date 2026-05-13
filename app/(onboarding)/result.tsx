import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { GlassCard } from '../../components/ui/GlassCard';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';
import { t } from '../../lib/i18n';

const TRIGGER_TYPE_BY_KEY: Record<string, string> = {
  stress: t('onboarding.result.persona_stress'),
  emotions: t('onboarding.result.persona_emotions'),
  boredom: t('onboarding.result.persona_boredom'),
  meals: t('onboarding.result.persona_meals'),
  social: t('onboarding.result.persona_social'),
  night: t('onboarding.result.persona_night'),
};

/**
 * Result Screen — post-onboarding "Your Craving Profile".
 * Personalises the hero based on the dominant trigger picked in quiz/triggers.
 * Adapts peak hour from quiz/peak-time.
 */
export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const triggers = useUserStore((s) => s.triggers);
  const peakHour = useUserStore((s) => s.peakHour);

  const dominantTrigger = triggers[0] ?? 'stress';
  const personaName = TRIGGER_TYPE_BY_KEY[dominantTrigger] ?? 'Stress Eater';
  const peakLabel = peakHour ?? '3:00 PM';
  // Build a sub-headline with the picked time, e.g. "with a 3pm crash"
  const peakHourShort = peakLabel.replace(/(:00 )?(AM|PM)/, '$2').toLowerCase();
  const subline = t('onboarding.result.subline', { peak: peakHourShort });

  return (
    <AtmosphericGradient theme="cravingProfile">
      {/* Background aura blobs — ambient warmth */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={340} style={styles.auraTopRight} intensity={0.55} drift={24} />
        <AuraBlob tint="lavender" size={280} style={styles.auraMidLeft} intensity={0.45} drift={18} />
        <AuraBlob tint="mint" size={220} style={styles.auraBottomRight} intensity={0.4} drift={16} />
      </View>

      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>Sugar Quit</Text>
        </View>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.skipLabel}>{t('onboarding.result.skip')}</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero — persona + peak + flame glyph */}
        <Animated.View entering={FadeInUp.duration(500)} style={styles.heroSection}>
          <View style={styles.heroEyebrowRow}>
            <DecorGlyph variant="flame" size={40} />
            <Text style={styles.eyebrow}>{t('onboarding.result.eyebrow')}</Text>
          </View>
          <Text style={styles.heroTitle}>
            {t('onboarding.result.title_lead')} <Text style={styles.heroTitleAccent}>{personaName}</Text>
          </Text>
          <Text style={styles.heroSubtitle}>{subline}</Text>
          <Text style={styles.heroBody}>
            {t('onboarding.result.hero_body')}
          </Text>
        </Animated.View>

        {/* Cards */}
        <View style={styles.cardsCol}>
          <Animated.View entering={FadeInDown.delay(200).duration(450)}>
            <GlassCard tint="default" style={styles.insightCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <DecorGlyph variant="compass" size={22} />
                </View>
                <Text style={styles.cardEyebrow}>{t('onboarding.result.card1_eyebrow')}</Text>
              </View>
              <Text style={styles.cardTitle}>{peakLabel}</Text>
              <Text style={styles.cardBody}>
                {t('onboarding.result.card1_body')}
              </Text>
            </GlassCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(450)}>
            <GlassCard tint="peach" style={styles.insightCardLarge}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIconAccent}>
                  <DecorGlyph variant="lightning" size={22} />
                </View>
                <Text style={styles.cardEyebrowAccent}>{t('onboarding.result.card2_eyebrow')}</Text>
              </View>
              <Text style={styles.cardTitleLarge}>{t('onboarding.result.card2_title')}</Text>
              <Text style={styles.cardBody}>
                {t('onboarding.result.card2_body')}
              </Text>
              <View style={styles.timelineRow}>
                <View style={styles.timelineDay}>
                  <Text style={styles.timelineDayNumber}>1–4</Text>
                  <Text style={styles.timelineDayLabel}>{t('onboarding.result.timeline_unbind')}</Text>
                </View>
                <View style={styles.timelineArrow}><Text style={styles.timelineArrowText}>→</Text></View>
                <View style={styles.timelineDay}>
                  <Text style={styles.timelineDayNumber}>5–6</Text>
                  <Text style={styles.timelineDayLabel}>{t('onboarding.result.timeline_turbulence')}</Text>
                </View>
                <View style={styles.timelineArrow}><Text style={styles.timelineArrowText}>→</Text></View>
                <View style={styles.timelineDay}>
                  <Text style={[styles.timelineDayNumber, { color: colors.primary }]}>7</Text>
                  <Text style={[styles.timelineDayLabel, { color: colors.primary }]}>{t('onboarding.result.timeline_clarity')}</Text>
                </View>
              </View>
            </GlassCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(450)}>
            <GlassCard tint="mint" style={styles.insightCard}>
              <View style={styles.cardHeader}>
                <View style={styles.cardIconMint}>
                  <DecorGlyph variant="heart" size={22} />
                </View>
                <Text style={[styles.cardEyebrow, { color: colors.tertiary }]}>{t('onboarding.result.card3_eyebrow')}</Text>
              </View>
              <Text style={styles.cardTitle}>{t('onboarding.result.card3_title')}</Text>
              <Text style={styles.cardBody}>
                {t('onboarding.result.card3_body')}
              </Text>
            </GlassCard>
          </Animated.View>
        </View>
      </ScrollView>

      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label={t('onboarding.result.cta')} onPress={() => router.push('/(onboarding)/paywall')} />
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
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
    bottom: '20%',
    right: -80,
  },
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
    includeFontPadding: false,
  },
  skipLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },

  heroSection: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  heroEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
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
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(165,60,48,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  cardIconAccent: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center', justifyContent: 'center',
  },
  cardIconMint: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(207,224,223,0.6)',
    alignItems: 'center', justifyContent: 'center',
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
    fontFamily: fonts.body,
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

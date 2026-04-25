import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { getTiers, purchase, type Tier as AdaptyTier } from '../../lib/adapty';
import { shortPeak } from '../../lib/peakHour';
import { useUserStore } from '../../stores/useUserStore';

type Tier = 'annual' | 'monthly';
type GlyphVariant = 'lightning' | 'orbit' | 'compass' | 'snowflake';

export default function Paywall() {
  const insets = useSafeAreaInsets();
  const [tier, setTier] = useState<Tier>('annual');
  const [tiers, setTiers] = useState<AdaptyTier[] | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const firstName = useUserStore((s) => s.firstName);
  const peakHour = useUserStore((s) => s.peakHour);
  // Personalize the trigger-prediction benefit so a 9pm-peak user doesn't
  // see "tuned to your 3pm" — the universal "stress eater = afternoon" copy.
  const BENEFITS: { glyph: GlyphVariant; label: string }[] = [
    { glyph: 'lightning', label: 'Unlimited SOS conversations, any hour' },
    { glyph: 'orbit',     label: 'Your personalized 90-day program' },
    { glyph: 'compass',   label: `Trigger prediction tuned to your ${shortPeak(peakHour)}` },
    { glyph: 'snowflake', label: 'Streak Freeze — one missed day forgiven per week' },
  ];
  const setPremium = useUserStore((s) => s.setPremium);
  const eyebrow = firstName
    ? `${firstName.toUpperCase()}, YOUR PLAN IS READY`
    : 'YOUR PLAN IS READY';

  // Fetch real Adapty tiers (mock-fallback in Expo Go).
  useEffect(() => {
    let cancelled = false;
    getTiers().then((t) => {
      if (!cancelled) setTiers(t);
    });
    return () => { cancelled = true; };
  }, []);

  const annualPrice  = tiers?.find((t) => t.id === 'annual')?.priceLabel  ?? '$79.99';
  const annualPerMo  = tiers?.find((t) => t.id === 'annual')?.perPeriodLabel ?? '$6.67 / month';
  const monthlyPrice = tiers?.find((t) => t.id === 'monthly')?.priceLabel ?? '$9.99';

  const onStartTrial = async () => {
    if (purchasing) return;
    setPurchasing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const result = await purchase(tier);
    setPurchasing(false);
    if (!result.ok) {
      if (result.code === 'cancelled') {
        // Silent — user just backed out of the system sheet.
        return;
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      // Even on error in skeleton mode, advance to auth so demo flow continues.
      router.push('/(onboarding)/auth');
      return;
    }
    setPremium(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push('/(onboarding)/auth');
  };

  return (
    <AtmosphericGradient theme="cravingProfile">
      {/* Background aura blobs */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.5} drift={22} />
        <AuraBlob tint="lavender" size={260} style={styles.auraMidLeft} intensity={0.4} drift={18} />
      </View>

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>Sugar Quit</Text>
        </View>
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/(onboarding)/result'))}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Close paywall"
        >
          <Text style={styles.closeX}>×</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 260 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Animated.View entering={FadeInUp.duration(450)} style={styles.heroWrap}>
          <View style={styles.heroEyebrowRow}>
            <DecorGlyph variant="orbit" size={36} />
            <Text style={styles.eyebrow}>{eyebrow}</Text>
          </View>
          <Text style={styles.heroTitle}>
            A <Text style={styles.heroAccent}>$0.22</Text> / day decision
          </Text>
          <Text style={styles.heroSub}>
            Less than the candy bar you already skipped today. Seven days free. Cancel in one tap.
          </Text>
        </Animated.View>

        {/* Benefits */}
        <Animated.View entering={FadeInDown.delay(150).duration(450)} style={styles.benefitsCard}>
          {BENEFITS.map((b, i) => (
            <View key={i} style={[styles.benefitRow, i > 0 && styles.benefitRowBorder]}>
              <View style={styles.benefitGlyph}>
                <DecorGlyph variant={b.glyph} size={22} />
              </View>
              <Text style={styles.benefitLabel}>{b.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Testimonial */}
        <Animated.View entering={FadeInDown.delay(250).duration(450)} style={styles.testimonial}>
          <Text style={styles.stars}>★ ★ ★ ★ ★</Text>
          <Text style={styles.testimonialText}>
            "The SOS saved me from the 3pm chocolate. Twice this week."
          </Text>
          <Text style={styles.testimonialAuthor}>Maya · Day 34</Text>
        </Animated.View>

        {/* Pricing cards */}
        <Animated.View entering={FadeInDown.delay(350).duration(450)} style={styles.pricingRow}>
          <Pressable
            style={[styles.priceCard, tier === 'annual' && styles.priceCardActive]}
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setTier('annual'); }}
            accessibilityRole="radio"
            accessibilityState={{ selected: tier === 'annual' }}
            accessibilityLabel={`Annual plan, ${annualPrice}, ${annualPerMo}`}
          >
            {tier === 'annual' && <View style={styles.bestBadge}><Text style={styles.bestBadgeText}>BEST VALUE</Text></View>}
            <Text style={styles.priceLabel}>Annual</Text>
            <Text style={styles.priceMain}>{annualPrice}</Text>
            <Text style={styles.pricePerMonth}>{annualPerMo}</Text>
            <Text style={styles.priceSave}>save 33%</Text>
          </Pressable>

          <Pressable
            style={[styles.priceCard, tier === 'monthly' && styles.priceCardActive]}
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setTier('monthly'); }}
            accessibilityRole="radio"
            accessibilityState={{ selected: tier === 'monthly' }}
            accessibilityLabel={`Monthly plan, ${monthlyPrice} per month`}
          >
            <Text style={styles.priceLabel}>Monthly</Text>
            <Text style={styles.priceMain}>{monthlyPrice}</Text>
            <Text style={styles.pricePerMonth}>per month</Text>
            <Text style={styles.priceSave}>switch anytime</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>

      {/* Sticky CTA footer */}
      <View style={[styles.ctaFooter, { paddingBottom: insets.bottom + spacing.md }]}>
        <PillCTA
          label={purchasing ? '…' : 'Start 7 days free'}
          onPress={onStartTrial}
          disabled={purchasing}
          style={styles.cta}
        />
        <View style={styles.trialTimeline}>
          <View style={styles.timelineStep}>
            <View style={[styles.timelineDot, styles.timelineDotActive]} />
            <Text style={styles.timelineLabel}>Day 1 · Full access</Text>
          </View>
          <View style={styles.timelineDash} />
          <View style={styles.timelineStep}>
            <View style={styles.timelineDot} />
            <Text style={styles.timelineLabel}>Day 5 · Reminder</Text>
          </View>
          <View style={styles.timelineDash} />
          <View style={styles.timelineStep}>
            <View style={styles.timelineDot} />
            <Text style={styles.timelineLabel}>Day 7 · Decide</Text>
          </View>
        </View>
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/(onboarding)/result'))}
          accessibilityRole="button"
          accessibilityLabel="Maybe later, continue without starting trial"
        >
          <Text style={styles.maybeLater}>Maybe later</Text>
        </Pressable>
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
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: { fontSize: 22, color: colors.onSurfaceVariant, lineHeight: 22, fontFamily: fonts.headlineLight },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },

  heroWrap: { marginBottom: spacing.lg },
  heroEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    flexShrink: 1,
  },
  heroTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge + 2,
    color: colors.onSurface,
    letterSpacing: -1.2,
    lineHeight: 42,
  },
  heroAccent: { color: colors.primary },
  heroSub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginTop: spacing.xs,
    maxWidth: 340,
  },

  benefitsCard: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  benefitRowBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(49,51,47,0.06)',
  },
  benefitGlyph: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  benefitLabel: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
    flex: 1,
    lineHeight: 20,
  },

  testimonial: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: 4,
    marginBottom: spacing.lg,
  },
  stars: {
    fontSize: 14,
    color: colors.primary,
    letterSpacing: 2,
  },
  testimonialText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: 300,
    lineHeight: 20,
    marginTop: 2,
  },
  testimonialAuthor: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
    marginTop: 4,
  },

  pricingRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  priceCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    gap: 2,
    alignItems: 'flex-start',
    position: 'relative',
  },
  priceCardActive: {
    backgroundColor: 'rgba(255,172,160,0.3)',
    borderColor: colors.primary,
  },
  bestBadge: {
    position: 'absolute',
    top: -10, right: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  bestBadgeText: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: colors.onPrimary,
    letterSpacing: tracking.widest,
  },
  priceLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
    marginBottom: 4,
  },
  priceMain: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    letterSpacing: -0.8,
    lineHeight: 32,
  },
  pricePerMonth: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  priceSave: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    marginTop: 2,
  },

  ctaFooter: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: 'rgba(254,225,217,0.7)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
    gap: spacing.sm,
    alignItems: 'center',
  },
  cta: { alignSelf: 'stretch' },
  trialTimeline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  timelineStep: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timelineDot: {
    width: 6, height: 6, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.2)',
  },
  timelineDotActive: { backgroundColor: colors.primary },
  timelineLabel: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
  },
  timelineDash: {
    width: 12, height: 1,
    backgroundColor: 'rgba(49,51,47,0.15)',
  },
  maybeLater: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    padding: spacing.sm,
  },
});

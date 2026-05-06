import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Card } from '../../components/primitives/Card';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';
import { getTiers, purchase, type Tier as AdaptyTier } from '../../lib/adapty';
import { useUserStore } from '../../stores/useUserStore';

type Tier = 'annual' | 'monthly';

const BENEFITS: { glyph: string; glyphBg: string; glyphFg: string; label: string; glyphSize?: number }[] = [
  { glyph: 'SOS', glyphBg: colors.primary,          glyphFg: colors.onPrimary, label: 'Unlimited SOS conversations, any hour' },
  { glyph: '90d', glyphBg: colors.success + '22',   glyphFg: colors.success,   label: 'Your personalized 90-day program' },
  { glyph: '3pm', glyphBg: colors.warning + '22',   glyphFg: colors.warning,   label: 'Trigger prediction tuned to your peak hour' },
  { glyph: '❄',  glyphBg: colors.primaryContainer, glyphFg: colors.primary,   label: 'Streak Freeze — one missed day covered per week', glyphSize: 18 },
];

export default function Paywall() {
  const insets = useSafeAreaInsets();
  const [tier, setTier] = useState<Tier>('annual');
  const [tiers, setTiers] = useState<AdaptyTier[] | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const firstName = useUserStore((s) => s.firstName);
  const setPremium = useUserStore((s) => s.setPremium);
  const eyebrow = firstName
    ? `${firstName.toUpperCase()}, YOUR PLAN IS READY`
    : 'YOUR PLAN IS READY';

  useEffect(() => {
    let cancelled = false;
    getTiers().then((t) => { if (!cancelled) setTiers(t); });
    return () => { cancelled = true; };
  }, []);

  const annualPrice = tiers?.find((t) => t.id === 'annual')?.priceLabel ?? '$79.99';
  const annualPerMo = tiers?.find((t) => t.id === 'annual')?.perPeriodLabel ?? '$6.67 / month';
  const monthlyPrice = tiers?.find((t) => t.id === 'monthly')?.priceLabel ?? '$9.99';

  const perDay = tier === 'annual'
    ? `$${(parseFloat(annualPrice.replace(/[^0-9.]/g, '')) / 365).toFixed(2)}`
    : `$${(parseFloat(monthlyPrice.replace(/[^0-9.]/g, '')) / 30).toFixed(2)}`;

  const onStartTrial = async () => {
    if (purchasing) return;
    setPurchasing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const result = await purchase(tier);
    setPurchasing(false);
    if (!result.ok) {
      if (result.code === 'cancelled') return;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      router.push('/(onboarding)/auth');
      return;
    }
    setPremium(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push('/(onboarding)/auth');
  };

  const onClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(onboarding)/auth');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Txt variant="titleSm">Sugar Quit</Txt>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: 260 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.duration(450)} style={styles.heroWrap}>
          <Eyebrow color={colors.primary} style={styles.eyebrow}>{eyebrow}</Eyebrow>
          <Txt variant="displayLg" style={styles.heroTitle}>
            A{' '}
            <Txt variant="displayLg" color={colors.success}>{perDay}</Txt>
            {' '}/ day decision
          </Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.heroSub}>
            {tier === 'annual'
              ? 'Less than the candy bar you already skipped today. Seven days free. Cancel in one tap.'
              : 'Less than a coffee. Seven days free. Cancel in one tap.'}
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).duration(450)} style={styles.pricingRow}>
          <Pressable
            style={[styles.priceCard, tier === 'annual' && styles.priceCardOn]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setTier('annual');
            }}
            accessibilityRole="radio"
            accessibilityState={{ selected: tier === 'annual' }}
            accessibilityLabel={`Annual plan, ${annualPrice}, ${annualPerMo}`}
          >
            <View style={styles.bestBadge}>
                <Txt variant="labelSm" color={colors.onPrimary} style={styles.bestBadgeText}>BEST VALUE</Txt>
              </View>
            <Eyebrow color={colors.textSecondary}>Annual</Eyebrow>
            <Txt variant="displayMd" style={styles.priceMain}>{annualPrice}</Txt>
            <Txt variant="bodySm" color={colors.textSecondary}>{annualPerMo}</Txt>
            <Txt variant="bodySm" color={colors.primary}>save 33%</Txt>
          </Pressable>

          <Pressable
            style={[styles.priceCard, tier === 'monthly' && styles.priceCardOn]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setTier('monthly');
            }}
            accessibilityRole="radio"
            accessibilityState={{ selected: tier === 'monthly' }}
            accessibilityLabel={`Monthly plan, ${monthlyPrice} per month`}
          >
            <Eyebrow color={colors.textSecondary}>Monthly</Eyebrow>
            <Txt variant="displayMd" style={styles.priceMain}>{monthlyPrice}</Txt>
            <Txt variant="bodySm" color={colors.textSecondary}>per month</Txt>
            <Txt variant="bodySm" color={colors.textSecondary}>switch anytime</Txt>
          </Pressable>
        </Animated.View>

        <PillCTA
          label="Buy now"
          variant="ghost"
          onPress={onStartTrial}
          disabled={purchasing}
          style={styles.buyNowPill}
        />

        <Animated.View entering={FadeInDown.delay(250).duration(450)}>
          <Card bordered style={styles.benefitsCard}>
            {BENEFITS.map((b, i) => (
              <View key={i} style={[styles.benefitRow, i > 0 && styles.benefitRowBorder]}>
                <View style={[styles.benefitIcon, { backgroundColor: b.glyphBg }]}>
                  <Txt variant="labelSm" color={b.glyphFg} style={[styles.benefitGlyph, b.glyphSize ? { fontSize: b.glyphSize, lineHeight: undefined, marginBottom: 2 } : null]}>{b.glyph}</Txt>
                </View>
                <Txt variant="bodyMd" color={colors.onSurface} style={styles.benefitLabel}>{b.label}</Txt>
              </View>
            ))}
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(350).duration(450)} style={styles.testimonial}>
          <Txt variant="bodyMd" color={colors.primary}>★ ★ ★ ★ ★</Txt>
          <Txt variant="bodyMd" color={colors.onSurface} center style={styles.testimonialText}>
            "The SOS saved me from the 3pm chocolate. Twice this week."
          </Txt>
          <Txt variant="labelSm" color={colors.textSecondary}>Maya · Day 34</Txt>
        </Animated.View>
      </ScrollView>

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
            <Txt variant="labelSm" color={colors.textSecondary}>Day 1 · Full access</Txt>
          </View>
          <View style={styles.timelineDash} />
          <View style={styles.timelineStep}>
            <View style={styles.timelineDot} />
            <Txt variant="labelSm" color={colors.textSecondary}>Day 5 · Reminder</Txt>
          </View>
          <View style={styles.timelineDash} />
          <View style={styles.timelineStep}>
            <View style={styles.timelineDot} />
            <Txt variant="labelSm" color={colors.textSecondary}>Day 7 · Decide</Txt>
          </View>
        </View>
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Maybe later, continue without starting trial"
        >
          <Txt variant="bodyMd" color={colors.textSecondary}>Maybe later</Txt>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoMark: { width: 10, height: 10, borderRadius: radius.full, backgroundColor: colors.primary },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },

  heroWrap: { marginBottom: spacing.lg },
  eyebrow: { marginBottom: spacing.sm },
  heroTitle: { letterSpacing: -1.2, lineHeight: 40, marginBottom: spacing.sm },
  heroSub: { lineHeight: 22, maxWidth: 340 },

  benefitsCard: { gap: 0 },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  benefitRowBorder: { borderTopWidth: 1, borderTopColor: colors.outline },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitGlyph: { fontSize: 9, lineHeight: 9, includeFontPadding: false, letterSpacing: 0 },
  benefitLabel: { flex: 1, lineHeight: 20 },

  testimonial: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  testimonialText: { lineHeight: 20, maxWidth: 300, marginTop: spacing.xs },

  pricingRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  priceCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.outline,
    gap: spacing.xs,
    position: 'relative',
  },
  priceCardOn: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  bestBadge: {
    position: 'absolute',
    top: -10,
    right: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  bestBadgeText: { fontSize: 9 },
  priceMain: { letterSpacing: -0.8, lineHeight: 32, marginTop: 2 },

  ctaFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.canvas,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
    gap: spacing.sm,
    alignItems: 'center',
  },
  cta: { alignSelf: 'stretch' },
  buyNowLink: { textDecorationLine: 'underline' },
  buyNowPill: { marginBottom: spacing.sm },
  trialTimeline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timelineStep: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  timelineDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.outline,
  },
  timelineDotActive: { backgroundColor: colors.primary },
  timelineDash: { width: 12, height: 1, backgroundColor: colors.outline },
});

import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Card } from '../../components/primitives/Card';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';

type Tier = 'annual' | 'monthly';

const BENEFITS: { glyph: string; glyphBg: string; glyphFg: string; label: string; glyphSize?: number }[] = [
  { glyph: 'SOS', glyphBg: colors.primary,          glyphFg: colors.onPrimary, label: 'Unlimited SOS conversations, any hour' },
  { glyph: '90d', glyphBg: colors.success + '22',   glyphFg: colors.success,   label: 'Your personalized 90-day program' },
  { glyph: '3pm', glyphBg: colors.warning + '22',   glyphFg: colors.warning,   label: 'Trigger prediction tuned to your peak hour' },
  { glyph: '❄',  glyphBg: colors.primaryContainer, glyphFg: colors.primary,   label: 'Streak Freeze — one missed day covered per week', glyphSize: 18 },
];

export default function PaywallContextual() {
  const insets = useSafeAreaInsets();
  const [tier, setTier] = useState<Tier>('annual');

  const pickTier = (t: Tier) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTier(t);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom + spacing.lg }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.dismiss(); }}
          hitSlop={8} accessibilityRole="button" accessibilityLabel="Back">
          <Txt variant="bodyMd" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="titleSm">Upgrade</Txt>
        <View style={styles.headerRight} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Limit banner */}
        <Animated.View entering={FadeInUp.duration(400)}>
          <Card bordered style={styles.limitCard}>
            <Eyebrow color={colors.primary}>Free limit reached</Eyebrow>
            <Txt variant="titleMd" style={styles.limitHeadline}>3 of 3 SOS used this month</Txt>
          </Card>
        </Animated.View>

        {/* Hero copy */}
        <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.heroCopy}>
          <Eyebrow color={colors.primary}>Keep the coach close</Eyebrow>
          <Txt variant="displayMd" color={colors.success} style={styles.heroPrice}>
            {tier === 'annual' ? '$0.22' : '$0.33'} / day
          </Txt>
          <Txt variant="bodyLg" color={colors.textSecondary}>Less than the candy you just skipped.</Txt>
        </Animated.View>

        {/* Benefits */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <Card bordered style={styles.benefitsCard}>
            {BENEFITS.map((b, i) => (
              <View key={i} style={[styles.benefitRow, i > 0 && styles.benefitBorder]}>
                <View style={[styles.benefitIcon, { backgroundColor: b.glyphBg }]}>
                  <Txt variant="labelSm" color={b.glyphFg} style={[styles.benefitGlyph, b.glyphSize ? { fontSize: b.glyphSize, lineHeight: undefined, marginBottom: 2 } : null]}>{b.glyph}</Txt>
                </View>
                <Txt variant="bodyMd" color={colors.onSurface} style={styles.benefitLabel}>{b.label}</Txt>
              </View>
            ))}
          </Card>
        </Animated.View>

        {/* Pricing */}
        <Animated.View entering={FadeInDown.delay(280).duration(400)} style={styles.pricingRow}>
          {(['annual', 'monthly'] as Tier[]).map((t) => {
            const active = tier === t;
            const isAnnual = t === 'annual';
            return (
              <Pressable
                key={t}
                style={styles.priceWrap}
                onPress={() => pickTier(t)}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                accessibilityLabel={isAnnual ? 'Annual plan, best value' : 'Monthly plan'}
              >
                {isAnnual && (
                  <View style={styles.bestBadge}>
                    <Txt variant="labelSm" color={colors.onPrimary}>BEST VALUE</Txt>
                  </View>
                )}
                <Card bordered style={[styles.priceCard, active && styles.priceCardOn]}>
                  <Txt variant="labelSm" color={colors.textSecondary}>
                    {isAnnual ? 'Annual' : 'Monthly'}
                  </Txt>
                  <Txt variant="displayMd" style={styles.priceAmount}>
                    {isAnnual ? '$79.99' : '$9.99'}
                  </Txt>
                  <Txt variant="bodySm">{isAnnual ? '$6.67 / month' : 'per month'}</Txt>
                  <Txt variant="bodySm" color={colors.primary}>
                    {isAnnual ? 'save 33%' : 'cancel anytime'}
                  </Txt>
                </Card>
              </Pressable>
            );
          })}
        </Animated.View>
      </View>

      {/* Footer CTA */}
      <Animated.View entering={FadeInDown.delay(350).duration(400)} style={styles.footer}>
        <PillCTA label="Try 7 days free" onPress={() => router.dismiss()} style={styles.cta} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  headerRight: { minWidth: 40 },

  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.md,
    justifyContent: 'center',
  },

  limitCard: { gap: spacing.xs },
  limitHeadline: { marginTop: 2, letterSpacing: 0.4 },

  heroCopy: { gap: spacing.sm },
  heroPrice: { letterSpacing: -0.8, marginTop: spacing.xs },

  benefitsCard: { gap: 0 },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  benefitBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitGlyph: { fontSize: 9, lineHeight: 9, includeFontPadding: false, letterSpacing: 0 },
  benefitLabel: { flex: 1 },

  pricingRow: { flexDirection: 'row', gap: spacing.sm },
  priceWrap: { flex: 1 },
  priceCard: { gap: 2, borderWidth: 2, borderColor: 'transparent' },
  priceCardOn: { borderColor: colors.primary },
  priceAmount: { letterSpacing: -0.8, marginVertical: 2 },
  bestBadge: {
    position: 'absolute',
    top: -10,
    right: 12,
    zIndex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  cta: { alignSelf: 'stretch' },
});

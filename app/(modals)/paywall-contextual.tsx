import { router } from 'expo-router';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { purchase } from '../../lib/adapty';
import { safeDismiss } from '../../lib/nav';
import { useUserStore } from '../../stores/useUserStore';

/**
 * 4.1 Contextual paywall — SOS free limit hit.
 * Compact variant of onboarding paywall.
 */

type Tier = 'annual' | 'monthly';

const BENEFITS = [
  { glyph: '∞', label: 'Unlimited SOS, any hour' },
  { glyph: '◉', label: 'Your trigger prediction' },
  { glyph: '❄', label: 'Streak Freeze, weekly' },
];

export default function PaywallContextual() {
  const insets = useSafeAreaInsets();
  const [tier, setTier] = useState<Tier>('annual');
  const [purchasing, setPurchasing] = useState(false);
  const setPremium = useUserStore((s) => s.setPremium);

  const pickTier = (t: Tier) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTier(t);
  };

  const onStartTrial = async () => {
    if (purchasing) return;
    setPurchasing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const result = await purchase(tier);
    setPurchasing(false);
    if (!result.ok) {
      if (result.code === 'cancelled') return; // user backed out of system sheet
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      // In skeleton mode, even on error we flip premium so the demo can
      // continue exercising the unlocked flows. Replace with strict failure
      // handling when real Adapty is wired up.
      setPremium(true);
      safeDismiss();
      return;
    }
    setPremium(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    safeDismiss();
  };

  return (
    <AtmosphericGradient theme="cravingProfile">
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={340} style={styles.auraTopRight} intensity={0.55} drift={22} />
        <AuraBlob tint="golden" size={280} style={styles.auraBottomLeft} intensity={0.45} drift={18} />
      </View>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={{ width: 36 }} />
        <Pressable
          onPress={() => safeDismiss()}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Close paywall"
        >
          <Text style={styles.closeX}>×</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.heroGlyphWrap}>
          <DecorGlyph variant="flame" size={80} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.limitCard}>
          <Text style={styles.limitLabel}>FREE LIMIT REACHED</Text>
          <Text style={styles.limitHeadline}>3 of 3 SOS used this month</Text>
        </Animated.View>

        <Animated.Text entering={FadeInUp.delay(180).duration(400)} style={styles.eyebrow}>
          KEEP THE COACH CLOSE
        </Animated.Text>
        <Animated.Text entering={FadeInUp.delay(240).duration(400)} style={styles.title}>
          <Text style={styles.titleAccent}>$0.22</Text> / day
        </Animated.Text>
        <Animated.Text entering={FadeInUp.delay(300).duration(400)} style={styles.sub}>
          Less than the candy you just skipped.
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(360).duration(400)} style={styles.benefitsCard}>
          {BENEFITS.map((b, i) => (
            <View key={i} style={[styles.benefitRow, i > 0 && styles.benefitBorder]}>
              <View style={styles.benefitGlyph}>
                <Text style={styles.benefitGlyphText}>{b.glyph}</Text>
              </View>
              <Text style={styles.benefitLabel}>{b.label}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(440).duration(400)} style={styles.pricingRow}>
          <Pressable
            style={[styles.priceCard, tier === 'annual' && styles.priceCardActive]}
            onPress={() => pickTier('annual')}
            accessibilityRole="radio"
            accessibilityState={{ selected: tier === 'annual' }}
            accessibilityLabel="Annual plan, $79.99, $6.67 per month, best value"
          >
            {tier === 'annual' && <View style={styles.bestBadge}><Text style={styles.bestBadgeText}>BEST VALUE</Text></View>}
            <Text style={styles.priceLabel}>Annual</Text>
            <Text style={styles.priceMain}>$79.99</Text>
            <Text style={styles.pricePerMonth}>$6.67 / month</Text>
            <Text style={styles.priceSave}>save 33%</Text>
          </Pressable>
          <Pressable
            style={[styles.priceCard, tier === 'monthly' && styles.priceCardActive]}
            onPress={() => pickTier('monthly')}
            accessibilityRole="radio"
            accessibilityState={{ selected: tier === 'monthly' }}
            accessibilityLabel="Monthly plan, $9.99 per month, cancel anytime"
          >
            <Text style={styles.priceLabel}>Monthly</Text>
            <Text style={styles.priceMain}>$9.99</Text>
            <Text style={styles.pricePerMonth}>per month</Text>
            <Text style={styles.priceSave}>cancel anytime</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>

      <View style={[styles.ctaFooter, { paddingBottom: insets.bottom + spacing.md }]}>
        <PillCTA
          label={purchasing ? '…' : 'Try 7 days free'}
          onPress={onStartTrial}
          disabled={purchasing}
          style={{ alignSelf: 'stretch' }}
        />
        <Pressable
          onPress={() => safeDismiss()}
          accessibilityRole="button"
          accessibilityLabel="Not now, dismiss paywall"
        >
          <Text style={styles.notNow}>Not now</Text>
        </Pressable>
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: { fontSize: 22, color: colors.onSurfaceVariant, lineHeight: 22, fontFamily: fonts.headlineLight },

  scroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 220,
    gap: spacing.md,
  },

  // Background aura layer
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -90,
    right: -120,
  },
  auraBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -100,
  },
  heroGlyphWrap: {
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  limitCard: {
    backgroundColor: 'rgba(255,172,160,0.35)',
    borderRadius: radius.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(165,60,48,0.3)',
    alignItems: 'center',
    gap: 4,
  },
  limitLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  limitHeadline: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.onPrimaryContainer,
  },

  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.sm,
  },
  title: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge,
    color: colors.onSurface,
    letterSpacing: -1,
    lineHeight: 38,
  },
  titleAccent: { color: colors.primary },
  sub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    marginTop: -2,
  },

  benefitsCard: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    padding: spacing.sm,
    marginTop: spacing.xs,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  benefitBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(49,51,47,0.06)',
  },
  benefitGlyph: {
    width: 26, height: 26, borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
  },
  benefitGlyphText: {
    fontFamily: fonts.headlineBold,
    fontSize: 13,
    color: colors.primary,
  },
  benefitLabel: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
    flex: 1,
  },

  pricingRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  priceCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
    gap: 2,
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
  notNow: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    padding: spacing.sm,
  },
});

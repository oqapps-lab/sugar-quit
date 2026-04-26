import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { GhostButton } from '../../components/primitives/GhostButton';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';

export default function Welcome() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Progress rail */}
      <View style={styles.progressWrap}>
        <View style={styles.progressRail}>
          {[...Array(15)].map((_, i) => (
            <View key={i} style={[styles.progressDot, i === 0 && styles.progressDotFilled]} />
          ))}
        </View>
        <Eyebrow color={colors.textSecondary}>Step 1 of 15 · ~3 min</Eyebrow>
      </View>

      {/* Hero */}
      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(500)} style={styles.illoWrap}>
          <View style={styles.illoHalo}>
            <View style={styles.illoInnerOuter} />
          </View>
          <View style={[styles.illoHalo, styles.illoHaloSm]}>
            <View style={styles.illoInnerSm} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100).duration(400)}>
          <Eyebrow color={colors.primary} style={styles.brandEyebrow}>Sugar Quit</Eyebrow>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(150).duration(400)}>
          <Txt variant="displayLg" style={styles.headline} numberOfLines={3}>
            Meet the quiet coach for your cravings
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(220).duration(400)}>
          <Txt variant="bodyLg" color={colors.textSecondary} center style={styles.sub}>
            Three minutes, and you'll have a 90-day plan for your body,
            your triggers, and the moment your hand reaches for sugar.
          </Txt>
        </Animated.View>
      </View>

      {/* CTA */}
      <Animated.View entering={FadeInDown.delay(280).duration(400)} style={styles.footer}>
        <PillCTA
          label="Begin"
          onPress={() => router.push('/(onboarding)/quiz/goal')}
          style={styles.ctaFull}
        />
        <GhostButton
          label="Already walking? Sign in"
          onPress={() => router.push('/(onboarding)/auth')}
        />
        {/* DEV: skip to home */}
        <GhostButton
          label="[dev] → Home"
          onPress={() => router.replace('/(tabs)/home' as any)}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  progressWrap: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  progressRail: {
    flexDirection: 'row',
    gap: 5,
  },
  progressDot: {
    width: 5,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: colors.outline,
  },
  progressDotFilled: {
    backgroundColor: colors.primary,
  },

  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: -spacing.xl,
  },

  illoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  illoHalo: {
    width: 112,
    height: 112,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer + '60',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary + '25',
  },
  illoHaloSm: {
    width: 80,
    height: 80,
    marginLeft: -20,
    marginTop: 32,
    backgroundColor: colors.surfaceVariant + '80',
    borderColor: colors.outline + '60',
  },
  illoInnerOuter: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    opacity: 0.85,
  },
  illoInnerSm: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.textSecondary,
    opacity: 0.3,
  },

  brandEyebrow: { textAlign: 'center', marginBottom: spacing.xs },
  headline: {
    textAlign: 'center',
    letterSpacing: -1.2,
    lineHeight: 42,
    maxWidth: 300,
  },
  sub: {
    lineHeight: 24,
    maxWidth: 320,
    marginTop: spacing.xs,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  ctaFull: { alignSelf: 'stretch' },
});

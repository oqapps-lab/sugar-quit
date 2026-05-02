import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { PillCTA } from '../../components/ui/PillCTA';
import { Eyebrow, GhostButton, ProgressBar, ThemedText } from '../../components/primitives';
import { colors, radius, spacing } from '../../constants/tokens';

const TOTAL_STEPS = 15;

/**
 * Welcome — first screen of onboarding (1.1 from SCREEN-MAP).
 * Primitives used: Eyebrow, ThemedText, ProgressBar, GhostButton.
 * UX-SPEC: sunriseGreens theme, CTA → quiz/goal, sign-in link at bottom.
 */
export default function Welcome() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="sunriseGreens">
      {/* Layer 1 — ambient aura blobs */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.55} drift={22} />
        <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={18} />
      </View>

      {/* Step indicator — ProgressBar primitive replaces 15 manual TokenDots */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <ProgressBar progress={1 / TOTAL_STEPS} gradient style={styles.progressBar} />
        <ThemedText variant="labelSmall" style={styles.stepLabel}>
          {'STEP 1 OF 15 · ~3 MIN'}
        </ThemedText>
      </View>

      {/* Hero illustration + copy */}
      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(500)} style={styles.illustration}>
          <View style={styles.illoHalo}>
            <DecorGlyph variant="sun" size={84} />
          </View>
          <View style={[styles.illoHalo, styles.illoHaloSmall]}>
            <DecorGlyph variant="moon" size={56} />
          </View>
        </Animated.View>

        {/* Eyebrow primitive — label variant, auto-uppercase */}
        <Animated.View entering={FadeInUp.delay(80).duration(400)}>
          <Eyebrow color={colors.primary} style={styles.eyebrow}>SUGAR QUIT</Eyebrow>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(150).duration(400)}>
          <ThemedText variant="displayLarge" style={styles.heroTitle} numberOfLines={4}>
            Meet the quiet coach for your cravings
          </ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(250).duration(400)}>
          <ThemedText variant="bodyMedium" style={styles.heroSub}>
            Three minutes, and you'll have a 90-day plan for your body, your triggers, and the moment your hand reaches for sugar.
          </ThemedText>
        </Animated.View>
      </View>

      {/* Footer — CTA + ghost sign-in link */}
      <Animated.View
        entering={FadeInDown.delay(300).duration(400)}
        style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}
      >
        <PillCTA
          label="Begin"
          variant="onboarding"
          onPress={() => router.push('/(onboarding)/quiz/goal')}
          style={styles.cta}
        />
        {/* GhostButton primitive — secondary text-only action */}
        <GhostButton
          label="Already walking? Sign in"
          variant="text"
          onPress={() => router.push('/(onboarding)/auth')}
        />
      </Animated.View>
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
  auraBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -120,
  },

  header: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  progressBar: {
    width: '100%',
  },
  stepLabel: {
    marginTop: spacing.xs,
  },

  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: -spacing.xxl,
  },
  illustration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  illoHalo: {
    width: 120,
    height: 120,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,172,160,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illoHaloSmall: {
    width: 84,
    height: 84,
    marginLeft: -24,
    marginTop: 36,
    backgroundColor: 'rgba(196,168,216,0.35)',
  },

  eyebrow: {
    textAlign: 'center',
  },
  heroTitle: {
    textAlign: 'center',
    lineHeight: 40,
    maxWidth: 320,
  },
  heroSub: {
    textAlign: 'center',
    lineHeight: 20,
    marginTop: spacing.sm,
    maxWidth: 340,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    alignItems: 'center',
  },
  cta: {
    alignSelf: 'stretch',
  },
});

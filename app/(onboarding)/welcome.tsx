import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { PillCTA } from '../../components/ui/PillCTA';
import { TokenDot } from '../../components/ui/TokenDot';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * Welcome — first screen of onboarding flow (screen 1.1 from SCREEN-MAP).
 * Sunrise greens theme to match quiz flow.
 */
export default function Welcome() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="sunriseGreens">
      {/* Background aura blobs — dawn feel */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.55} drift={22} />
        <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={18} />
      </View>

      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.progressRail}>
          {[...Array(15)].map((_, i) => (
            <TokenDot key={i} filled={i === 0} size={5} />
          ))}
        </View>
        <Text style={styles.progressLabel}>STEP 1 OF 15 · ~3 MIN</Text>
      </View>

      <View style={styles.body}>
        {/* Hero illustration — sun + moon = 24-hour coverage */}
        <Animated.View entering={FadeInUp.duration(500)} style={styles.illustration}>
          <View style={styles.illoHalo}>
            <DecorGlyph variant="sun" size={84} />
          </View>
          <View style={[styles.illoHalo, styles.illoHaloSmall]}>
            <DecorGlyph variant="moon" size={56} />
          </View>
        </Animated.View>

        <Animated.Text entering={FadeInUp.delay(100).duration(400)} style={styles.eyebrow}>
          SUGAR QUIT
        </Animated.Text>
        <Animated.Text entering={FadeInUp.delay(150).duration(400)} style={styles.heroTitle} numberOfLines={4}>
          Meet the quiet coach for your cravings
        </Animated.Text>
        <Animated.Text entering={FadeInUp.delay(250).duration(400)} style={styles.heroSub}>
          Three minutes, and you'll have a 90-day plan for your body, your triggers,
          and the moment your hand reaches for sugar.
        </Animated.Text>
      </View>

      <Animated.View entering={FadeInDown.delay(300).duration(400)} style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label="Begin"
          variant="onboarding"
          onPress={() => router.push('/(onboarding)/quiz/goal')}
          style={styles.cta}
        />
        <Pressable onPress={() => router.push('/(onboarding)/auth')} style={styles.signInRow}>
          <Text style={styles.signInText}>
            Already walking? <Text style={styles.signInLink}>Sign in</Text>
          </Text>
        </Pressable>
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
  progressRail: {
    flexDirection: 'row',
    gap: 5,
  },
  progressLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
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
    width: 120, height: 120,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,172,160,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  illoHaloSmall: {
    width: 84, height: 84,
    marginLeft: -24,
    marginTop: 36,
    backgroundColor: 'rgba(196,168,216,0.35)',
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWidest,
    marginBottom: spacing.xs,
  },
  heroTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge,
    color: colors.onSurface,
    letterSpacing: -1.2,
    textAlign: 'center',
    lineHeight: 40,
    maxWidth: 320,
  },
  heroSub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 340,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    alignItems: 'center',
  },
  cta: { alignSelf: 'stretch' },
  signInRow: { padding: spacing.sm },
  signInText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  signInLink: {
    fontFamily: fonts.bodySemibold,
    color: colors.primary,
  },
});

import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { GradientText } from '../../components/ui/GradientText';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * 1.9 Motivational — "75% of adults in the US want to reduce sugar."
 * Editorial single-focus. No cards.
 */
export default function Motivational2() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="sunriseGreens">
      {/* Background aura blobs */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="peach" size={320} style={styles.auraTopRight} intensity={0.5} drift={22} />
        <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={18} />
      </View>

      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>STEP 9 OF 15</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.glyphWrap}>
          <DecorGlyph variant="flame" size={56} />
        </Animated.View>
        <Animated.Text entering={FadeInUp.delay(100).duration(400)} style={styles.eyebrow}>
          YOU ARE NOT ALONE
        </Animated.Text>
        <Animated.View entering={FadeInUp.delay(150).duration(400)}>
          <GradientText style={styles.bigNumber} gradient="heroHorizontal">
            75%
          </GradientText>
        </Animated.View>
        <Animated.Text entering={FadeInUp.delay(250).duration(400)} style={styles.headline}>
          of adults in the US want to reduce sugar.
        </Animated.Text>
        <Animated.Text entering={FadeInUp.delay(350).duration(400)} style={styles.sub}>
          You are not alone. This is a quiet epidemic,
          and you are one of many stepping out of it.
        </Animated.Text>
      </View>

      <Animated.View entering={FadeInDown.delay(400).duration(400)} style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label="Continue"
          variant="onboarding"
          onPress={() => router.push('/(onboarding)/quiz/past-attempts')}
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  backBtn: { width: 40, height: 40, borderRadius: radius.full, backgroundColor: 'rgba(49,51,47,0.06)', alignItems: 'center', justifyContent: 'center' },
  back: { fontSize: 22, color: colors.onSurface, lineHeight: 22 },
  progressLabel: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.onSurfaceVariant, letterSpacing: tracking.labelWide },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: -spacing.xxl,
  },
  glyphWrap: {
    marginBottom: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWidest,
    marginBottom: spacing.md,
  },
  bigNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 120,
    letterSpacing: -5,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 124,
  },
  headline: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.displaySmall,
    color: colors.onSurface,
    letterSpacing: -0.6,
    textAlign: 'center',
    lineHeight: 30,
    maxWidth: 320,
    marginTop: spacing.sm,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 320,
  },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

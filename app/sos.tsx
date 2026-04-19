import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../components/ui/AtmosphericGradient';
import { GlassCard } from '../components/ui/GlassCard';
import { colors, fonts, radius, shadows, spacing, tracking } from '../constants/tokens';

/**
 * SOS: Breathe — grounding screen.
 * Mirror of screen 01 (stitch-export/01-sos-breathe.png).
 * Central breathing circle pulses on 8s cycle: inhale 4s / exhale 4s.
 */
export default function SOSScreen() {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
    return () => cancelAnimation(scale);
  }, [scale]);

  const animatedCircle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedRingOuter = useAnimatedStyle(() => ({
    transform: [{ scale: 1.1 + (scale.value - 1) * 1.5 }],
    opacity: 0.4 - (scale.value - 1) * 2,
  }));

  return (
    <AtmosphericGradient theme="dawn">
      {/* Header — brand whisper */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.brandRow}>
          <View style={styles.logoMark} />
          <Text style={styles.brandWord}>THE EXHALE</Text>
        </View>
        <View style={styles.avatar} />
      </View>

      {/* Center content */}
      <View style={styles.center}>
        {/* Hero text */}
        <Text style={styles.heroTitle}>Breathe with me</Text>
        <Text style={styles.heroSub}>
          Release the tension. Focus only on this moment.
        </Text>

        {/* Breathing circle stack */}
        <View style={styles.breathStack}>
          {/* Outer pulse ring */}
          <Animated.View style={[styles.pulseRingOuter, animatedRingOuter]} />
          {/* Middle ring */}
          <View style={styles.pulseRingMid} />
          {/* Main circle */}
          <Animated.View style={[styles.mainCircle, animatedCircle, shadows.glowBreath]}>
            <Text style={styles.inhaleLabel}>INHALE</Text>
          </Animated.View>
        </View>

        {/* Physical anchor card */}
        <GlassCard tint="cream" style={styles.anchorCard}>
          <View style={styles.anchorRow}>
            <View style={styles.anchorIcon}>
              <Text style={styles.anchorIconGlyph}>~</Text>
            </View>
            <View style={styles.anchorText}>
              <Text style={styles.anchorTitle}>The Physical Anchor</Text>
              <Text style={styles.anchorBody}>
                Feel your feet firmly on the floor. Soften your shoulders.
              </Text>
            </View>
          </View>
        </GlassCard>
      </View>

      {/* End session */}
      <Pressable
        onPress={() => router.back()}
        style={[styles.endSession, { bottom: insets.bottom + spacing.xl }]}
      >
        <View style={styles.endIcon}>
          <Text style={styles.endIconGlyph}>×</Text>
        </View>
        <Text style={styles.endLabel}>END SESSION</Text>
      </Pressable>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoMark: {
    width: 18,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: colors.onPrimaryContainer,
    opacity: 0.85,
  },
  brandWord: {
    fontFamily: fonts.headlineLight,
    fontSize: 10,
    color: colors.onPrimaryContainer,
    letterSpacing: tracking.labelWidest,
    opacity: 0.85,
    fontWeight: '300',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHighest,
    opacity: 0.8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  heroTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 48,
    color: colors.onPrimaryContainer,
    textAlign: 'center',
    letterSpacing: tracking.tighter,
    marginBottom: spacing.md,
    fontWeight: '800',
    lineHeight: 52,
  },
  heroSub: {
    fontFamily: fonts.bodyLight,
    fontSize: 17,
    color: colors.onPrimaryContainer,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: spacing.xxxl,
    letterSpacing: tracking.wide,
    fontWeight: '300',
  },
  breathStack: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxxl * 1.5,
  },
  pulseRingOuter: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: radius.full,
    backgroundColor: 'rgba(165, 60, 48, 0.1)',
  },
  pulseRingMid: {
    position: 'absolute',
    width: 256,
    height: 256,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 151, 136, 0.3)',
  },
  mainCircle: {
    width: 192,
    height: 192,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inhaleLabel: {
    fontFamily: fonts.headline,
    fontSize: 14,
    color: colors.onPrimary,
    letterSpacing: tracking.labelWide,
    fontWeight: '700',
  },
  anchorCard: {
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  anchorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  anchorIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 172, 160, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anchorIconGlyph: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: '600',
  },
  anchorText: {
    flex: 1,
  },
  anchorTitle: {
    fontFamily: fonts.headline,
    fontSize: 15,
    color: colors.onPrimaryContainer,
    marginBottom: 4,
    fontWeight: '700',
  },
  anchorBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.onSurfaceVariant,
    opacity: 0.8,
    lineHeight: 18,
  },
  endSession: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -40 }],
    alignItems: 'center',
    gap: spacing.sm,
    opacity: 0.6,
  },
  endIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(49, 51, 47, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  endIconGlyph: {
    fontSize: 24,
    color: colors.onSurfaceVariant,
    fontWeight: '300',
    lineHeight: 26,
  },
  endLabel: {
    fontFamily: fonts.label,
    fontSize: 10,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWidest,
    fontWeight: '500',
  },
});

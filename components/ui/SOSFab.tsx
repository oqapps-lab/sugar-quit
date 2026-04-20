import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { colors, fonts, gradients, radius, shadows } from '../../constants/tokens';

type Props = {
  onPress?: () => void;
  style?: ViewStyle;
  bottom?: number;
  /**
   * Position mode:
   * - 'center' (default, per UX-SPEC §2.4) — centered above bottom tab bar
   * - 'right' — alternate legacy right-bottom
   */
  position?: 'center' | 'right';
};

/**
 * SOSFab — floating action button with live pulse rings.
 *
 * UX-SPEC §2.4: SOS is center-bottom, above the tab bar, 56–64dp round.
 * Haptic per §4.2: HEAVY impact (core emergency action).
 *
 * Visual layers (back to front):
 *   1. Two pulsing aura rings (expand + fade, staggered)
 *   2. Soft coral halo (static, always-on)
 *   3. Gradient core with inner glow + outline
 *   4. "SOS" label
 */
export function SOSFab({ onPress, style, bottom = 96, position = 'center' }: Props) {
  const rm = useReducedMotion();
  const pulse1 = useSharedValue(0);
  const pulse2 = useSharedValue(0);

  useEffect(() => {
    if (rm) return;
    pulse1.value = withRepeat(
      withTiming(1, { duration: 2400, easing: Easing.out(Easing.quad) }),
      -1,
      false,
    );
    pulse2.value = withDelay(
      1200,
      withRepeat(
        withTiming(1, { duration: 2400, easing: Easing.out(Easing.quad) }),
        -1,
        false,
      ),
    );
    return () => {
      cancelAnimation(pulse1);
      cancelAnimation(pulse2);
    };
  }, [rm, pulse1, pulse2]);

  const pulseStyle1 = useAnimatedStyle(() => ({
    opacity: 0.55 * (1 - pulse1.value),
    transform: [{ scale: 0.8 + pulse1.value * 0.9 }],
  }));
  const pulseStyle2 = useAnimatedStyle(() => ({
    opacity: 0.4 * (1 - pulse2.value),
    transform: [{ scale: 0.8 + pulse2.value * 1.1 }],
  }));

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress?.();
  };

  const positionStyle: ViewStyle = position === 'center'
    ? { bottom, left: '50%', transform: [{ translateX: -48 }] } // half of 96 outer
    : { bottom, right: 16 };

  return (
    <View style={[styles.root, positionStyle, style]} pointerEvents="box-none">
      {/* Pulse rings — animated, non-interactive */}
      <Animated.View style={[styles.pulseRing, pulseStyle1]} pointerEvents="none" />
      <Animated.View style={[styles.pulseRing, pulseStyle2]} pointerEvents="none" />

      {/* Static halo */}
      <View style={styles.halo} pointerEvents="none" />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="SOS — получить помощь с тягой к сахару"
        accessibilityHint="Открывает AI-чат для помощи в момент тяги"
        onPress={handlePress}
        style={({ pressed }) => [
          styles.pressable,
          pressed && { transform: [{ scale: 0.92 }] },
        ]}
      >
        <LinearGradient
          colors={gradients.fab.colors}
          start={gradients.fab.start}
          end={gradients.fab.end}
          style={[styles.fab, shadows.buttonMd]}
        >
          {/* inner rim highlight for dimension */}
          <View style={styles.innerRim} pointerEvents="none" />
          <Text style={styles.label}>SOS</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const OUTER = 96;
const CORE = 64;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 40,
    width: OUTER,
    height: OUTER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: CORE,
    height: CORE,
    borderRadius: CORE / 2,
    backgroundColor: colors.primary,
  },
  halo: {
    position: 'absolute',
    width: OUTER,
    height: OUTER,
    borderRadius: OUTER / 2,
    backgroundColor: 'rgba(165,60,48,0.15)',
  },
  pressable: {
    width: CORE,
    height: CORE,
    borderRadius: CORE / 2,
  },
  fab: {
    width: CORE,
    height: CORE,
    borderRadius: CORE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  innerRim: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: CORE - 12,
    height: CORE - 12,
    borderRadius: (CORE - 12) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  label: {
    color: colors.onPrimary,
    fontFamily: fonts.headlineExtraBold,
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: '800',
  },
});

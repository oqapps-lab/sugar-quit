import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { radius } from '../../constants/tokens';

/**
 * AuraBlob — soft decorative gradient orb for background ambience.
 * Use absolutely positioned, behind content. Slowly drifts + pulses so the
 * screen feels alive without being distracting.
 *
 * Palette choices are coral / peach / lavender — matching our dawn theme.
 */

type Tint = 'coral' | 'peach' | 'lavender' | 'mint' | 'golden';

type Props = {
  tint?: Tint;
  size?: number;
  style?: ViewStyle;
  /** Max opacity (pulse floats between 0.5*this and this). Default 0.6. */
  intensity?: number;
  /** Drift radius in pixels. Default 20. */
  drift?: number;
};

const TINT_COLORS: Record<Tint, readonly [string, string, string]> = {
  coral:    ['#FF9E7D', '#FF7E5F', '#E85A3A'],
  peach:    ['#FFD7A8', '#FFB89E', '#FF9E7D'],
  lavender: ['#E5D4F0', '#C4A8D8', '#8A6BA8'],
  mint:     ['#CFE0DF', '#A8D0CC', '#7FB5AF'],
  golden:   ['#FFE8BC', '#FFC978', '#FF9E7D'],
};

export function AuraBlob({
  tint = 'coral',
  size = 280,
  style,
  intensity = 0.6,
  drift = 20,
}: Props) {
  const rm = useReducedMotion();
  const opacity = useSharedValue(intensity);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  useEffect(() => {
    if (rm) return;
    // pulse
    opacity.value = withRepeat(
      withSequence(
        withTiming(intensity, { duration: 3500, easing: Easing.inOut(Easing.quad) }),
        withTiming(intensity * 0.5, { duration: 3500, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
    // drift
    tx.value = withRepeat(
      withSequence(
        withTiming(drift, { duration: 6000, easing: Easing.inOut(Easing.sin) }),
        withTiming(-drift, { duration: 6000, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
    ty.value = withRepeat(
      withSequence(
        withTiming(-drift * 0.6, { duration: 5000, easing: Easing.inOut(Easing.sin) }),
        withTiming(drift * 0.6, { duration: 5000, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [rm, intensity, drift, opacity, tx, ty]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: rm ? intensity * 0.7 : opacity.value,
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }));

  const colors = TINT_COLORS[tint];

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
        animStyle,
      ]}
    >
      <LinearGradient
        colors={[colors[0], colors[1], 'rgba(255,255,255,0)'] as const}
        start={{ x: 0.3, y: 0.3 }}
        end={{ x: 0.9, y: 0.9 }}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={{
          position: 'absolute',
          top: size * 0.1,
          left: size * 0.1,
          width: size * 0.4,
          height: size * 0.4,
          borderRadius: (size * 0.4) / 2,
          backgroundColor: colors[0],
          opacity: 0.5,
        }}
      />
    </Animated.View>
  );
}

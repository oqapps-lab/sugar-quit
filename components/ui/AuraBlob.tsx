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

/**
 * AuraBlob — soft, round, drifting gradient orb for ambient background.
 *
 * Implementation note: expo-linear-gradient is LINEAR only — to get a
 * true radial soft-edge bloom we stack 5 concentric circles with decreasing
 * size and decreasing opacity. Each circle has a full border-radius so
 * edges are perfectly round (no square artifacts).
 *
 * Animation: the whole stack drifts gently and pulses opacity.
 * Reduce-motion aware.
 */

type Tint = 'coral' | 'peach' | 'lavender' | 'mint' | 'golden';

type Props = {
  tint?: Tint;
  size?: number;
  style?: ViewStyle;
  /** Max opacity of the brightest circle. Default 0.55. */
  intensity?: number;
  /** Drift radius in pixels. Default 20. */
  drift?: number;
};

const TINT: Record<Tint, string> = {
  coral:    '#FF9E7D',
  peach:    '#FFC099',
  lavender: '#C4A8D8',
  mint:     '#9CC9C4',
  golden:   '#FFD792',
};

export function AuraBlob({
  tint = 'coral',
  size = 280,
  style,
  intensity = 0.55,
  drift = 20,
}: Props) {
  const rm = useReducedMotion();
  const pulse = useSharedValue(intensity);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  useEffect(() => {
    if (rm) return;
    pulse.value = withRepeat(
      withSequence(
        withTiming(intensity, { duration: 3500, easing: Easing.inOut(Easing.quad) }),
        withTiming(intensity * 0.55, { duration: 3500, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
    tx.value = withRepeat(
      withSequence(
        withTiming(drift, { duration: 6400, easing: Easing.inOut(Easing.sin) }),
        withTiming(-drift, { duration: 6400, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
    ty.value = withRepeat(
      withSequence(
        withTiming(-drift * 0.55, { duration: 5400, easing: Easing.inOut(Easing.sin) }),
        withTiming(drift * 0.55, { duration: 5400, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, [rm, intensity, drift, pulse, tx, ty]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: rm ? intensity * 0.7 : pulse.value,
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }));

  const color = TINT[tint];

  // Radial soft bloom via 5 stacked concentric circles — each smaller and
  // more opaque than the previous. Reads as a proper fuzzy halo.
  // Radii (relative to size) and opacities are hand-tuned for a soft fall-off.
  const layers = [
    { r: 1.00, o: 0.08 },
    { r: 0.85, o: 0.14 },
    { r: 0.65, o: 0.22 },
    { r: 0.45, o: 0.32 },
    { r: 0.25, o: 0.45 },
  ];

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
        animStyle,
      ]}
    >
      {layers.map((l, i) => {
        const d = size * l.r;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: d,
              height: d,
              borderRadius: d / 2,
              backgroundColor: color,
              opacity: l.o,
            }}
          />
        );
      })}
    </Animated.View>
  );
}

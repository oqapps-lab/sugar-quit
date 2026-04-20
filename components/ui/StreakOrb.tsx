import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors, fonts, radius } from '../../constants/tokens';

/**
 * StreakOrb — large animated centerpiece for the streak section.
 * - Slowly rotating outer ring (honeyed gradient arc)
 * - Pulsing inner glow behind the number
 * - Big count number at the core
 *
 * Reduce-motion aware: animations are skipped when the system flag is on.
 */

type Props = {
  count: number;
  size?: number;
};

export function StreakOrb({ count, size = 180 }: Props) {
  const rm = useReducedMotion();
  const rotation = useSharedValue(0);
  const glow = useSharedValue(0.6);

  useEffect(() => {
    if (rm) {
      rotation.value = 0;
      glow.value = 0.6;
      return;
    }
    rotation.value = withRepeat(
      withTiming(360, { duration: 22000, easing: Easing.linear }),
      -1,
      false,
    );
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.6, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
    return () => {
      cancelAnimation(rotation);
      cancelAnimation(glow);
    };
  }, [rm, rotation, glow]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [{ scale: 0.95 + glow.value * 0.1 }],
  }));

  const outerRing = size;
  const midRing = size * 0.78;
  const innerDisc = size * 0.62;

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      {/* Rotating outer ring with honey gradient */}
      <Animated.View
        style={[
          styles.ring,
          { width: outerRing, height: outerRing, borderRadius: outerRing / 2 },
          ringStyle,
        ]}
      >
        <LinearGradient
          colors={['#FFD7A8', 'rgba(255,172,160,0.15)', '#FF9E7D', 'rgba(255,215,168,0.1)', '#FFD7A8'] as const}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Middle hollow cut — creates the ring look via masking */}
      <View
        style={[
          styles.cut,
          {
            width: midRing,
            height: midRing,
            borderRadius: midRing / 2,
            top: (outerRing - midRing) / 2,
            left: (outerRing - midRing) / 2,
          },
        ]}
      />

      {/* Pulsing glow behind the number */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: (outerRing - innerDisc) / 2,
            left: (outerRing - innerDisc) / 2,
            width: innerDisc,
            height: innerDisc,
            borderRadius: innerDisc / 2,
            backgroundColor: 'rgba(165,60,48,0.16)',
          },
          glowStyle,
        ]}
      />

      {/* The number */}
      <View style={[styles.numberWrap, { width: outerRing, height: outerRing }]}>
        <Text style={styles.number}>{count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    overflow: 'hidden',
  },
  cut: {
    position: 'absolute',
    backgroundColor: '#FDE8E0', // matches AtmosphericGradient dawn's mid tone softly
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  numberWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 88,
    color: colors.primary,
    letterSpacing: -3,
    textShadowColor: 'rgba(165,60,48,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
});

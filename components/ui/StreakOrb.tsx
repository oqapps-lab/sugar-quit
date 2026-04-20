import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors, fonts } from '../../constants/tokens';

/**
 * StreakOrb — the ceremonial centerpiece for the streak section.
 * Architecture from back to front:
 *   1. Soft diffuse aura (coral/golden blur spots drifting slowly)
 *   2. Rotating outer ring (honey gradient, 22s linear)
 *   3. Rotating mid ring (opposite direction, slower, thinner)
 *   4. Pulsing glow behind the central disc (3.6s ease)
 *   5. Frosted glass disc with internal radial-style gradient
 *   6. Big streak number with layered text shadows
 *   7. Small orbiting petals (3 tiny circles circling the orb)
 *
 * All motion is reduce-motion aware (useReducedMotion) — if on, the orb is
 * static but still visually rich.
 */

type Props = {
  count: number;
  size?: number;
};

export function StreakOrb({ count, size = 240 }: Props) {
  const rm = useReducedMotion();

  const rotation = useSharedValue(0);
  const counterRotation = useSharedValue(0);
  const glow = useSharedValue(0.55);
  const petalRot = useSharedValue(0);

  useEffect(() => {
    if (rm) return;
    rotation.value = withRepeat(
      withTiming(360, { duration: 22000, easing: Easing.linear }),
      -1,
      false,
    );
    counterRotation.value = withRepeat(
      withTiming(-360, { duration: 34000, easing: Easing.linear }),
      -1,
      false,
    );
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.55, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
    petalRot.value = withRepeat(
      withTiming(360, { duration: 28000, easing: Easing.linear }),
      -1,
      false,
    );
    return () => {
      cancelAnimation(rotation);
      cancelAnimation(counterRotation);
      cancelAnimation(glow);
      cancelAnimation(petalRot);
    };
  }, [rm, rotation, counterRotation, glow, petalRot]);

  const outerRingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  const midRingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${counterRotation.value}deg` }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [{ scale: 0.95 + glow.value * 0.12 }],
  }));
  const petalStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${petalRot.value}deg` }],
  }));

  // Sizes derived from prop
  const S = size;
  const outerRing = S;
  const midRing = S * 0.82;
  const discSize = S * 0.56;
  const glowSize = S * 0.75;

  // Petal positions (3 small circles evenly spaced around the orb)
  const petalTrack = S * 0.49; // orbit radius
  const petalSize = S * 0.055;
  const petalAngles = [0, 120, 240];

  return (
    <View style={[styles.wrap, { width: S, height: S }]}>
      {/* 1. Outer soft aura — two diffuse blobs (coral + golden) */}
      <View
        style={[
          styles.auraWrap,
          { width: S * 1.2, height: S * 1.2, top: -S * 0.1, left: -S * 0.1 },
        ]}
      >
        <LinearGradient
          colors={['rgba(255,158,125,0.55)', 'rgba(255,215,168,0)'] as const}
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 0.9, y: 0.9 }}
          style={[StyleSheet.absoluteFill, { borderRadius: S }]}
        />
      </View>

      {/* 2. Outer rotating ring — honey gradient sweep */}
      <Animated.View
        style={[
          styles.ring,
          { width: outerRing, height: outerRing, borderRadius: outerRing / 2 },
          outerRingStyle,
        ]}
      >
        <LinearGradient
          colors={[
            '#FFE8BC',
            'rgba(255,158,125,0.0)',
            '#FF9E7D',
            'rgba(255,232,188,0.0)',
            '#E85A3A',
            'rgba(255,158,125,0.0)',
            '#FFE8BC',
          ] as const}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* 3. Mid hollow ring — counter-rotating thinner gradient */}
      <Animated.View
        style={[
          styles.midRingOuter,
          {
            width: midRing,
            height: midRing,
            borderRadius: midRing / 2,
            top: (outerRing - midRing) / 2,
            left: (outerRing - midRing) / 2,
          },
          midRingStyle,
        ]}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.9)', 'rgba(255,232,217,0.6)', 'rgba(255,255,255,0.9)'] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* 4. Pulsing glow behind the disc */}
      <Animated.View
        style={[
          styles.innerGlow,
          {
            width: glowSize,
            height: glowSize,
            borderRadius: glowSize / 2,
            top: (outerRing - glowSize) / 2,
            left: (outerRing - glowSize) / 2,
          },
          glowStyle,
        ]}
      >
        <LinearGradient
          colors={['rgba(255,172,160,0.6)', 'rgba(255,172,160,0)'] as const}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: glowSize / 2 }]}
        />
      </Animated.View>

      {/* 5. Frosted-glass inner disc */}
      <View
        style={[
          styles.disc,
          {
            width: discSize,
            height: discSize,
            borderRadius: discSize / 2,
            top: (outerRing - discSize) / 2,
            left: (outerRing - discSize) / 2,
          },
        ]}
      >
        {Platform.OS === 'ios' ? (
          <BlurView
            intensity={60}
            tint="light"
            style={[StyleSheet.absoluteFill, { borderRadius: discSize / 2 }]}
            pointerEvents="none"
          />
        ) : (
          <View
            style={[
              StyleSheet.absoluteFill,
              { borderRadius: discSize / 2, backgroundColor: 'rgba(255,255,255,0.7)' },
            ]}
          />
        )}
        {/* Inner radial-like gradient fill */}
        <LinearGradient
          colors={['rgba(255,255,255,0.85)', 'rgba(255,215,208,0.55)'] as const}
          start={{ x: 0.3, y: 0.2 }}
          end={{ x: 0.8, y: 0.95 }}
          style={[StyleSheet.absoluteFill, { borderRadius: discSize / 2 }]}
          pointerEvents="none"
        />
      </View>

      {/* 6. The number — big, with layered shadow */}
      <View style={[styles.numberWrap, { width: outerRing, height: outerRing }]}>
        <Text style={[styles.number, { fontSize: discSize * 0.56 }]}>{count}</Text>
      </View>

      {/* 7. Orbiting petals */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: outerRing,
            height: outerRing,
            top: 0,
            left: 0,
          },
          petalStyle,
        ]}
        pointerEvents="none"
      >
        {petalAngles.map((a) => (
          <View
            key={a}
            style={{
              position: 'absolute',
              top: outerRing / 2 - petalSize / 2,
              left: outerRing / 2 - petalSize / 2,
              width: petalSize,
              height: petalSize,
              borderRadius: petalSize / 2,
              backgroundColor: colors.primary,
              opacity: 0.85,
              transform: [
                { rotate: `${a}deg` },
                { translateX: petalTrack },
              ],
              shadowColor: colors.primary,
              shadowOpacity: 0.8,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 0 },
              elevation: 6,
            }}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraWrap: {
    position: 'absolute',
    opacity: 0.7,
  },
  ring: {
    position: 'absolute',
    overflow: 'hidden',
  },
  midRingOuter: {
    position: 'absolute',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  innerGlow: {
    position: 'absolute',
    overflow: 'hidden',
  },
  disc: {
    position: 'absolute',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#a53c30',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  numberWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: fonts.headlineExtraBold,
    color: colors.primary,
    letterSpacing: -3,
    textShadowColor: 'rgba(165,60,48,0.35)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 12,
  },
});

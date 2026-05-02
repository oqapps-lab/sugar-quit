import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, radius } from '../../constants/tokens';

/**
 * DecorGlyph — small decorative illustration built from React Native
 * primitives (no SVG / no PNG). Each variant is a composition of circles,
 * gradients, and unicode glyphs — meant to sit in the corner of a card or
 * next to a heading to add visual interest without requiring asset files.
 *
 * Sized by `size` prop (defaults to 48). Auto-contained in a square box.
 */

type Variant =
  | 'sun'        // warm morning — rays + gradient disc
  | 'moon'       // evening exhale — crescent with stars
  | 'lightning'  // peak surge — zap with glow
  | 'snowflake'  // streak freeze — classic ❄ with ring
  | 'flame'      // streak / fire — petal-shaped gradient
  | 'orbit'      // streak orbital — concentric rings
  | 'compass'    // forecast — directional ring
  | 'heart';     // wellbeing — soft pulse

type Props = {
  variant: Variant;
  size?: number;
  style?: ViewStyle;
};

export function DecorGlyph({ variant, size = 48, style }: Props) {
  return (
    <View style={[{ width: size, height: size }, styles.wrap, style]} pointerEvents="none">
      {variant === 'sun' && <Sun size={size} />}
      {variant === 'moon' && <Moon size={size} />}
      {variant === 'lightning' && <Lightning size={size} />}
      {variant === 'snowflake' && <Snowflake size={size} />}
      {variant === 'flame' && <Flame size={size} />}
      {variant === 'orbit' && <Orbit size={size} />}
      {variant === 'compass' && <Compass size={size} />}
      {variant === 'heart' && <Heart size={size} />}
    </View>
  );
}

function Sun({ size }: { size: number }) {
  const s = size;
  const discSize = s * 0.55;
  const rayWidth = s * 0.04;
  const rayLength = s * 0.15;
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <>
      {/* rays */}
      {rays.map((deg) => (
        <View
          key={deg}
          style={{
            position: 'absolute',
            top: s / 2 - rayWidth / 2,
            left: s / 2 - rayLength / 2,
            width: rayLength,
            height: rayWidth,
            borderRadius: rayWidth / 2,
            backgroundColor: colors.primary,
            opacity: 0.35,
            transform: [{ rotate: `${deg}deg` }, { translateX: s * 0.32 - rayLength / 2 }],
          }}
        />
      ))}
      <LinearGradient
        colors={['#FFD7A8', '#FF9E7D', '#E85A3A'] as const}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 0.8, y: 0.9 }}
        style={{
          position: 'absolute',
          top: (s - discSize) / 2,
          left: (s - discSize) / 2,
          width: discSize,
          height: discSize,
          borderRadius: discSize / 2,
        }}
      />
    </>
  );
}

function Moon({ size }: { size: number }) {
  const s = size;
  const base = s * 0.72;
  const cutout = s * 0.55;
  return (
    <>
      {/* star dust */}
      <View style={[styles.star, { top: s * 0.12, left: s * 0.12, width: 3, height: 3 }]} />
      <View style={[styles.star, { top: s * 0.25, right: s * 0.08, width: 2, height: 2 }]} />
      <View style={[styles.star, { bottom: s * 0.15, left: s * 0.22, width: 2, height: 2 }]} />
      {/* moon base */}
      <LinearGradient
        colors={['#E5D4F0', '#B89ECC', '#8A6BA8'] as const}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 0.9, y: 0.9 }}
        style={{
          position: 'absolute',
          top: (s - base) / 2,
          left: (s - base) / 2,
          width: base,
          height: base,
          borderRadius: base / 2,
        }}
      />
      {/* crescent cutout */}
      <View
        style={{
          position: 'absolute',
          top: (s - cutout) / 2 - s * 0.02,
          left: (s - cutout) / 2 + s * 0.14,
          width: cutout,
          height: cutout,
          borderRadius: cutout / 2,
          backgroundColor: '#fbe1e9', // match card tint peach
        }}
      />
    </>
  );
}

function Lightning({ size }: { size: number }) {
  const s = size;
  return (
    <>
      {/* glow */}
      <View
        style={{
          position: 'absolute',
          top: s * 0.1,
          left: s * 0.1,
          width: s * 0.8,
          height: s * 0.8,
          borderRadius: s * 0.4,
          backgroundColor: 'rgba(255,172,160,0.35)',
        }}
      />
      {/* Lightning bolt drawn from two trapezoid-like Views for crisp rendering.
          Emoji "⚡" inside a custom font family silently falls back to ? on iOS. */}
      <View
        style={{
          position: 'absolute',
          top: s * 0.18,
          left: s * 0.38,
          width: s * 0.22,
          height: s * 0.3,
          backgroundColor: colors.primary,
          transform: [{ skewX: '-18deg' }, { rotate: '8deg' }],
          borderTopLeftRadius: 3,
          borderBottomRightRadius: 2,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: s * 0.42,
          left: s * 0.32,
          width: s * 0.26,
          height: s * 0.36,
          backgroundColor: colors.primary,
          transform: [{ skewX: '-18deg' }, { rotate: '8deg' }],
          borderTopRightRadius: 2,
          borderBottomLeftRadius: 4,
          opacity: 0.9,
        }}
      />
    </>
  );
}

function Snowflake({ size }: { size: number }) {
  const s = size;
  const armWidth = s * 0.055;
  const armLength = s * 0.44;
  const arms = [0, 60, 120]; // 6-fold symmetry via 3 crossing lines
  return (
    <>
      {/* ring */}
      <View
        style={{
          position: 'absolute',
          top: s * 0.08,
          left: s * 0.08,
          width: s * 0.84,
          height: s * 0.84,
          borderRadius: s * 0.42,
          borderWidth: 1.5,
          borderColor: 'rgba(165,60,48,0.25)',
        }}
      />
      {/* 3 arms crossing = 6-point star */}
      {arms.map((deg) => (
        <View
          key={deg}
          style={{
            position: 'absolute',
            top: s / 2 - armWidth / 2,
            left: s / 2 - armLength / 2,
            width: armLength,
            height: armWidth,
            borderRadius: armWidth / 2,
            backgroundColor: colors.primary,
            transform: [{ rotate: `${deg}deg` }],
          }}
        />
      ))}
      {/* center dot */}
      <View
        style={{
          position: 'absolute',
          top: s / 2 - s * 0.06,
          left: s / 2 - s * 0.06,
          width: s * 0.12,
          height: s * 0.12,
          borderRadius: s * 0.06,
          backgroundColor: colors.primary,
        }}
      />
    </>
  );
}

function Flame({ size }: { size: number }) {
  const s = size;
  return (
    <>
      {/* outer glow */}
      <View
        style={{
          position: 'absolute',
          top: s * 0.08,
          left: s * 0.18,
          width: s * 0.64,
          height: s * 0.85,
          borderTopLeftRadius: s * 0.5,
          borderTopRightRadius: s * 0.5,
          borderBottomLeftRadius: s * 0.32,
          borderBottomRightRadius: s * 0.32,
          backgroundColor: 'rgba(255,172,160,0.35)',
        }}
      />
      {/* inner flame */}
      <LinearGradient
        colors={['#FFC978', '#FF6B47', '#C93218'] as const}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={{
          position: 'absolute',
          top: s * 0.2,
          left: s * 0.28,
          width: s * 0.44,
          height: s * 0.62,
          borderTopLeftRadius: s * 0.32,
          borderTopRightRadius: s * 0.32,
          borderBottomLeftRadius: s * 0.22,
          borderBottomRightRadius: s * 0.22,
        }}
      />
    </>
  );
}

function Orbit({ size }: { size: number }) {
  const s = size;
  const rings = [0.9, 0.7, 0.5, 0.3];
  return (
    <>
      {rings.map((f, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            top: (s - s * f) / 2,
            left: (s - s * f) / 2,
            width: s * f,
            height: s * f,
            borderRadius: (s * f) / 2,
            borderWidth: 1,
            borderColor: `rgba(165,60,48,${0.12 + i * 0.08})`,
          }}
        />
      ))}
      <View
        style={{
          position: 'absolute',
          top: s / 2 - s * 0.08,
          left: s / 2 - s * 0.08,
          width: s * 0.16,
          height: s * 0.16,
          borderRadius: s * 0.08,
          backgroundColor: colors.primary,
        }}
      />
    </>
  );
}

function Compass({ size }: { size: number }) {
  const s = size;
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: s,
          height: s,
          borderRadius: s / 2,
          borderWidth: 1.5,
          borderColor: 'rgba(165,60,48,0.3)',
        }}
      />
      {/* needle */}
      <View
        style={{
          position: 'absolute',
          top: s * 0.12,
          left: s / 2 - 1,
          width: 2,
          height: s * 0.76,
          backgroundColor: colors.primary,
          borderRadius: 1,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: s * 0.4,
          left: s / 2 - s * 0.1,
          width: s * 0.2,
          height: s * 0.2,
          borderRadius: s * 0.1,
          backgroundColor: colors.primary,
        }}
      />
    </>
  );
}

function Heart({ size }: { size: number }) {
  // Heart drawn from two circles + rotated square, system-font-free.
  const s = size;
  const lobe = s * 0.35;
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: s * 0.2,
          left: s * 0.15,
          width: lobe,
          height: lobe,
          borderRadius: lobe / 2,
          backgroundColor: colors.primary,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: s * 0.2,
          right: s * 0.15,
          width: lobe,
          height: lobe,
          borderRadius: lobe / 2,
          backgroundColor: colors.primary,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: s * 0.33,
          left: s / 2 - lobe / 2,
          width: lobe,
          height: lobe,
          backgroundColor: colors.primary,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden' },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: radius.full,
    opacity: 0.8,
    shadowColor: '#ffffff',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 0 },
  },
});

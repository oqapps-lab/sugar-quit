import { BlurView } from 'expo-blur';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { radius, shadows } from '../../constants/tokens';

type Tint = 'default' | 'peach' | 'mint' | 'lavender' | 'cream' | 'dark';

type Props = {
  tint?: Tint;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  radius?: number;
  blurIntensity?: number;
};

const TINT_BG: Record<Tint, string> = {
  default:  'rgba(255, 255, 255, 0.4)',
  peach:    'rgba(255, 172, 160, 0.35)',  // primaryContainer/35
  mint:     'rgba(207, 224, 223, 0.3)',   // tertiaryContainer/30
  lavender: 'rgba(239, 219, 255, 0.3)',   // secondaryFixed/30
  cream:    'rgba(255, 255, 255, 0.6)',
  dark:     'rgba(255, 255, 255, 0.08)',  // Dark Horizon card
};

const TINT_BORDER: Record<Tint, string> = {
  default:  'rgba(255, 255, 255, 0.4)',
  peach:    'rgba(255, 172, 160, 0.3)',
  mint:     'rgba(193, 210, 209, 0.4)',
  lavender: 'rgba(227, 203, 250, 0.4)',
  cream:    'rgba(255, 255, 255, 0.6)',
  dark:     'rgba(255, 255, 255, 0.08)',
};

/**
 * GlassCard — frosted-glass container.
 * iOS: expo-blur BlurView. Android: semi-transparent fallback (expo-blur is
 * noisy on Android).
 */
export function GlassCard({
  tint = 'default',
  children,
  style,
  radius: borderRadius = radius.sm,
  blurIntensity = 40,
}: Props) {
  const isDark = tint === 'dark';

  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={blurIntensity}
        tint={isDark ? 'dark' : 'light'}
        // pointerEvents="box-none" — BlurView is purely visual; without this,
        // iOS UIVisualEffectView captures touches and breaks any parent
        // <Pressable> wrapping the card (e.g. onboarding trigger chips,
        // craving log option chips). The inner content View still receives
        // touches normally for any interactive children placed inside.
        pointerEvents="box-none"
        style={[
          styles.card,
          { borderRadius, borderColor: TINT_BORDER[tint] },
          isDark ? shadows.cardWhisper : shadows.cardWarm,
          style,
        ]}
      >
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { backgroundColor: TINT_BG[tint] }]}
        />
        <View style={styles.content}>{children}</View>
      </BlurView>
    );
  }

  // Android fallback — solid-ish tint without blur.
  // No elevation: Android renders elevation as an opaque rectangular drop
  // shadow that does not honor the parent's transparent background, producing
  // a visible "inner rectangle" artifact behind the rounded card on
  // light-tinted screens (kakoccc 2026-04-29 reports #5, #25, #27).
  // The borderColor + soft tint already give enough surface separation.
  const androidBg = TINT_BG[tint].replace(/[\d.]+\)$/, (m) => {
    const alpha = parseFloat(m);
    return `${Math.min(1, alpha + 0.3)})`;
  });

  return (
    <View
      style={[
        styles.card,
        {
          borderRadius,
          borderColor: TINT_BORDER[tint],
          backgroundColor: androidBg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  content: {
    // Full-width container. NO `flex: 1` — it collapses intrinsic height on
    // BlurView when parent has no fixed height, making children vanish.
    width: '100%',
  },
});

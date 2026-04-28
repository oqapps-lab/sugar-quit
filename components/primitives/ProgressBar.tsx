import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, gradients, radius } from '../../constants/tokens';

type Props = {
  /** 0–1 progress value. */
  progress: number;
  /** Bar height in px. Default 6. */
  height?: number;
  /** Use pillCta gradient instead of solid primary. Default false. */
  gradient?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * ProgressBar — thin horizontal progress indicator.
 * Track: outlineVariant. Fill: primary color or pillCta gradient.
 */
export function ProgressBar({ progress, height = 6, gradient = false, style }: Props) {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.track, { height, borderRadius: radius.full }, style]}>
      {gradient ? (
        <LinearGradient
          colors={gradients.pillCta.colors}
          start={gradients.pillCta.start}
          end={gradients.pillCta.end}
          style={[styles.fill, { width: `${clamped * 100}%`, borderRadius: radius.full }]}
        />
      ) : (
        <View
          style={[
            styles.fill,
            { width: `${clamped * 100}%`, borderRadius: radius.full, backgroundColor: colors.primary },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});

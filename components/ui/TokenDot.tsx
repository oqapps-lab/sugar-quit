import { StyleSheet, View } from 'react-native';
import { colors, shadows } from '../../constants/tokens';

type Props = {
  filled?: boolean;
  size?: number;
  color?: string;
};

/**
 * TokenDot — малый круглый индикатор (streak, timeline, quiz progress).
 * filled: primary + glow. empty: outline-variant без glow.
 */
export function TokenDot({ filled = true, size = 6, color = colors.primary }: Props) {
  return (
    <View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: filled ? color : 'rgba(178, 178, 173, 0.3)',
        },
        filled && { ...shadows.glowDotSm, shadowColor: color },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {},
});

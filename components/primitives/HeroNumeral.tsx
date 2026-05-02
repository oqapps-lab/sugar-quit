import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { GradientText } from '../ui/GradientText';
import { ThemedText } from './ThemedText';
import { spacing } from '../../constants/tokens';

type Props = {
  value: string | number;
  /** Sub-label rendered below the number in ALL CAPS style. */
  sublabel?: string;
  /** Gradient key from gradients object. Default 'heroVertical'. */
  gradient?: 'heroVertical' | 'heroHorizontal' | 'pillCta';
  style?: StyleProp<ViewStyle>;
  numberStyle?: TextStyle;
};

/**
 * HeroNumeral — the large streak / day / milestone number.
 * Uses GradientText for the primary-to-secondary fill.
 * Sublabel rendered as label variant below.
 *
 * DESIGN-GUIDE: typeScale.heroNumber (72), lineHeight = fontSize, tracking.tighter
 */
export function HeroNumeral({ value, sublabel, gradient = 'heroVertical', style, numberStyle }: Props) {
  return (
    <View style={[styles.root, style]}>
      <GradientText
        gradient={gradient}
        style={numberStyle ? [styles.number, numberStyle] : styles.number}
      >
        {String(value)}
      </GradientText>
      {sublabel ? (
        <ThemedText variant="label" style={styles.sub}>
          {sublabel}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  number: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 72,
    lineHeight: 72,
    letterSpacing: -0.6,
  },
  sub: {
    marginTop: spacing.xs,
  },
});

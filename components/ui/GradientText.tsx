import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { gradients } from '../../constants/tokens';

type Props = {
  children: string;
  style?: TextStyle | TextStyle[];
  gradient?: keyof typeof gradients;
};

/**
 * GradientText — uses MaskedView + LinearGradient for text-fill gradient.
 * Works on iOS and Android (Web does not support MaskedView — falls back to
 * plain text).
 */
export function GradientText({ children, style, gradient = 'heroHorizontal' }: Props) {
  const g = gradients[gradient];
  const colors = (g as any).colors as readonly [string, string, ...string[]];
  const start = (g as any).start ?? { x: 0, y: 0 };
  const end = (g as any).end ?? { x: 1, y: 0 };

  return (
    <MaskedView maskElement={<Text style={[styles.mask, style]}>{children}</Text>}>
      <LinearGradient colors={colors} start={start} end={end}>
        <Text style={[styles.mask, style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  mask: {
    backgroundColor: 'transparent',
  },
});

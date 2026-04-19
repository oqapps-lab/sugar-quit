import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts, gradients, radius, shadows } from '../../constants/tokens';

type Props = {
  onPress?: () => void;
  style?: ViewStyle;
  bottom?: number;
  right?: number;
};

/**
 * SOSFab — floating action button, всегда в правом нижнем углу.
 * Gradient: primary → error. Haptic: medium.
 */
export function SOSFab({ onPress, style, bottom = 110, right = 24 }: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.root,
        { bottom, right, transform: [{ scale: pressed ? 0.96 : 1 }] },
        style,
      ]}
    >
      <LinearGradient
        colors={gradients.fab.colors}
        start={gradients.fab.start}
        end={gradients.fab.end}
        style={[styles.fab, shadows.buttonMd]}
      >
        <Text style={styles.label}>SOS</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 40,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.onPrimary,
    fontFamily: fonts.headlineExtraBold,
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: '800',
  },
});

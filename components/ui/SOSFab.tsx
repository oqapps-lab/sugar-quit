import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts, gradients, radius, shadows } from '../../constants/tokens';

type Props = {
  onPress?: () => void;
  style?: ViewStyle;
  bottom?: number;
  /**
   * Position mode:
   * - 'center' (default, per UX-SPEC §2.4) — centered above bottom tab bar
   * - 'right' — alternate legacy right-bottom
   */
  position?: 'center' | 'right';
};

/**
 * SOSFab — floating action button.
 *
 * UX-SPEC §2.4: SOS is center-bottom, above the tab bar, 56–64dp round.
 * Haptic per §4.2: HEAVY impact (core emergency action).
 * Accessibility per §5.2: label + hint in Russian.
 *
 * Hidden on: onboarding, auth, SOS chat itself, modals.
 */
export function SOSFab({ onPress, style, bottom = 96, position = 'center' }: Props) {
  const handlePress = () => {
    // Per UX-SPEC §4.2: SOS button tap = Heavy impact
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress?.();
  };

  const positionStyle: ViewStyle = position === 'center'
    ? { bottom, left: '50%', transform: [{ translateX: -32 }] }  // 32 = half of 64px FAB
    : { bottom, right: 24 };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="SOS — получить помощь с тягой к сахару"
      accessibilityHint="Открывает AI-чат для помощи в момент тяги"
      onPress={handlePress}
      style={({ pressed }) => [
        styles.root,
        positionStyle,
        pressed && { transform: [...(positionStyle.transform ?? []), { scale: 0.92 }] as any },
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

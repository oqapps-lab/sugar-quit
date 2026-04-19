import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, gradients, radius, shadows, tracking } from '../../constants/tokens';

type Variant = 'primary' | 'inline' | 'darkText' | 'lightOnDark' | 'onboarding';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  style?: ViewStyle;
  disabled?: boolean;
};

export function PillCTA({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
}: Props) {
  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  if (variant === 'darkText') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.pill,
          styles.darkText,
          shadows.pillLg,
          { opacity: disabled ? 0.4 : pressed ? 0.9 : 1 },
          style,
        ]}
      >
        <Text style={styles.labelOnDark}>{label.toUpperCase()}</Text>
      </Pressable>
    );
  }

  if (variant === 'lightOnDark') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.pill,
          styles.lightOnDark,
          { opacity: disabled ? 0.4 : pressed ? 0.9 : 1 },
          style,
        ]}
      >
        <Text style={styles.labelOnLight}>{label}</Text>
      </Pressable>
    );
  }

  const gradient = variant === 'onboarding'
    ? { colors: ['#FF7E5F', '#FEB47B'] as const, start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } }
    : gradients.pillCta;

  const isInline = variant === 'inline';

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        { opacity: disabled ? 0.4 : pressed ? 0.92 : 1 },
        style,
      ]}
    >
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        style={[
          styles.pill,
          isInline ? styles.pillInline : styles.pillPrimary,
          isInline ? null : shadows.pillLg,
        ]}
      >
        <Text style={isInline ? styles.labelInline : styles.labelPrimary}>
          {variant === 'onboarding' ? label.toUpperCase() : label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillPrimary: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  pillInline: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  darkText: {
    backgroundColor: colors.onSurface,
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  lightOnDark: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 40,
  },
  labelPrimary: {
    color: colors.onPrimary,
    fontFamily: fonts.headline,
    fontSize: 14,
    letterSpacing: tracking.label,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  labelInline: {
    color: colors.onPrimary,
    fontFamily: fonts.label,
    fontSize: 13,
    letterSpacing: 0.4,
    fontWeight: '500',
  },
  labelOnDark: {
    color: '#ffffff',
    fontFamily: fonts.headline,
    fontSize: 13,
    letterSpacing: tracking.label,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  labelOnLight: {
    color: colors.darkHorizonRose900,
    fontFamily: fonts.headline,
    fontSize: 15,
    fontWeight: '700',
  },
});

import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../constants/tokens';

type Theme = 'dawn' | 'mistyPlum' | 'morningSky' | 'darkHorizon' | 'sunriseGreens' | 'cravingProfile';

type Props = {
  theme?: Theme;
  children?: React.ReactNode;
  style?: ViewStyle;
};

/**
 * AtmosphericGradient — canvas для всех screens.
 * Default = Dawn (3-radial-имитация через stacked LinearGradient).
 * Theme variants — для специфичных экранов: Progress (darkHorizon), Onboarding (sunriseGreens), etc.
 */
export function AtmosphericGradient({ theme = 'dawn', children, style }: Props) {
  if (theme === 'dawn') {
    return (
      <View style={[styles.root, { backgroundColor: colors.surface }, style]}>
        {/* Layer 1: primary-container pink — top-left neon orb */}
        <LinearGradient
          colors={['rgba(255,112,158,0.22)', 'transparent']}
          start={{ x: 0.05, y: 0.1 }}
          end={{ x: 0.65, y: 0.55 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Layer 2: tertiary purple — middle-right neon orb */}
        <LinearGradient
          colors={['rgba(204,155,255,0.18)', 'transparent']}
          start={{ x: 0.95, y: 0.4 }}
          end={{ x: 0.35, y: 0.75 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Layer 3: secondary cyan — bottom-right neon orb */}
        <LinearGradient
          colors={['rgba(0,251,251,0.12)', 'transparent']}
          start={{ x: 0.9, y: 1 }}
          end={{ x: 0.4, y: 0.4 }}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </View>
    );
  }

  if (theme === 'darkHorizon') {
    return (
      <View style={[styles.root, { backgroundColor: colors.darkHorizonDeepNavy }, style]}>
        <LinearGradient
          colors={['#1a1c2c', '#6a577f', '#a53c30', '#fbf9f5']}
          locations={[0, 0.4, 0.85, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </View>
    );
  }

  if (theme === 'mistyPlum') {
    return (
      <View style={[styles.root, style]}>
        <LinearGradient
          colors={['#fff9f5', '#fdf2e9', '#fae8e0', '#fce7f3', '#f3e8ff']}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </View>
    );
  }

  if (theme === 'morningSky') {
    return (
      <View style={[styles.root, style]}>
        <LinearGradient
          colors={['#dbeafe', '#e0e7ff', '#ffedd5', '#fecaca']}
          locations={[0, 0.25, 0.7, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </View>
    );
  }

  if (theme === 'sunriseGreens') {
    return (
      <View style={[styles.root, style]}>
        <LinearGradient
          colors={['#fefcf4', '#f8cec2', '#ccebc2']}
          locations={[0, 0.5, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </View>
    );
  }

  // cravingProfile
  return (
    <View style={[styles.root, style]}>
      <LinearGradient
        colors={['#fbf9f5', '#fdf0e9', '#ffdcd5', '#ffe1d9', '#eef7f6']}
        locations={[0, 0.2, 0.45, 0.65, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

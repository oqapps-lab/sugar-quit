import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../ui/AtmosphericGradient';
import { spacing } from '../../constants/tokens';

type Theme = 'dawn' | 'mistyPlum' | 'morningSky' | 'darkHorizon' | 'sunriseGreens' | 'cravingProfile';

type Props = {
  children: React.ReactNode;
  theme?: Theme;
  /** Scrollable content area. Default true. */
  scrollable?: boolean;
  /** Extra top padding added on top of safe area + base. */
  topOffset?: number;
  /** Bottom padding (added to safe area). Default 120 — room for FAB + tab bar. */
  bottomOffset?: number;
  contentStyle?: ViewStyle;
};

/**
 * Screen — full-screen layout container.
 * Layer 1: AtmosphericGradient (absoluteFill, non-interactive)
 * Layer 2: ScrollView or View with safe-area padding
 *
 * UX-SPEC: paddingTop = insets.top + topOffset (default spacing.xl)
 *          paddingBottom = insets.bottom + bottomOffset (default 120)
 *          paddingHorizontal = spacing.lg
 */
export function Screen({
  children,
  theme = 'dawn',
  scrollable = true,
  topOffset = spacing.xl,
  bottomOffset = 120,
  contentStyle,
}: Props) {
  const insets = useSafeAreaInsets();

  const padStyle: ViewStyle = {
    paddingTop: insets.top + topOffset,
    paddingBottom: insets.bottom + bottomOffset,
    paddingHorizontal: spacing.lg,
  };

  return (
    <View style={styles.root}>
      <AtmosphericGradient theme={theme} style={StyleSheet.absoluteFillObject} />
      {scrollable ? (
        <ScrollView
          style={styles.fill}
          contentContainerStyle={[padStyle, contentStyle]}
          showsVerticalScrollIndicator={false}
          bounces
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.fill, padStyle, contentStyle]}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  fill: {
    flex: 1,
  },
});

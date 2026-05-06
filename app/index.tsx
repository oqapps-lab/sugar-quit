import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/tokens';
import { useHasHydrated, useUserStore } from '../stores/useUserStore';

/**
 * Entry redirect.
 * Reads onboarded flag from persisted store. Returning users route straight
 * to (tabs)/home; fresh users go through the full onboarding flow. While the
 * persisted store is hydrating we render a neutral cream canvas to avoid a
 * navigation flicker.
 */
export default function Index() {
  const hydrated = useHasHydrated();
  const onboarded = useUserStore((s) => s.onboarded);

  if (!hydrated) {
    return <View style={styles.splash} />;
  }

  return <Redirect href={onboarded ? '/(tabs)/home' : '/(onboarding)/welcome'} />;
}

const styles = StyleSheet.create({
  splash: { flex: 1, backgroundColor: colors.surface },
});

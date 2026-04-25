import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/tokens';
import { isSupabaseConfigured } from '../lib/env';
import { useHasHydrated, useUserStore } from '../stores/useUserStore';

/**
 * Entry redirect — three-way gate.
 * 1. Persisted store still hydrating → cream canvas (avoid flicker).
 * 2. Supabase configured + no signed-in user → /(auth)/sign-in.
 * 3. Signed in (or Supabase unconfigured for dev mode):
 *      - onboarded → /(tabs)/home
 *      - else      → /(onboarding)/welcome
 */
export default function Index() {
  const hydrated = useHasHydrated();
  const userId = useUserStore((s) => s.userId);
  const onboarded = useUserStore((s) => s.onboarded);

  if (!hydrated) {
    return <View style={styles.splash} />;
  }

  if (isSupabaseConfigured && !userId) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Redirect href={onboarded ? '/(tabs)/home' : '/(onboarding)/welcome'} />;
}

const styles = StyleSheet.create({
  splash: { flex: 1, backgroundColor: colors.surface },
});

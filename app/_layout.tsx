import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import {
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
} from '@expo-google-fonts/manrope';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import appsFlyer from 'react-native-appsflyer';
import { getSupabase } from '../lib/supabase';
import { useUserStore } from '../stores/useUserStore';

/**
 * Root Stack. Three groups:
 *  - (onboarding) — linear new-user flow (welcome → quiz → result → paywall → auth → home)
 *  - (tabs)       — main app with bottom tabs (home / curriculum / progress / profile)
 *  - (modals)     — contextual overlays (sos / checkin / paywall-contextual / milestone / …)
 *
 * Entry point: app/index.tsx routes new users to (onboarding)/welcome,
 * returning users to (tabs)/home.
 */
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    Manrope_200ExtraLight,
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });

  // Firebase bootstrap — Crashlytics auto-collects crashes from native
  // exceptions; Analytics fires app_open + screen_view when the SDK
  // initializes. Both auto-init from GoogleService-Info.plist; the
  // explicit log_event below is a sanity check that the SDK loaded.
  useEffect(() => {
    crashlytics().log('app_started');
    analytics().logEvent('app_opened').catch(() => {/* offline ok */});

    // AppsFlyer bootstrap — init SDK so installs are attributed to ad
    // campaigns. Wait up to 10s for ATT permission prompt before sending
    // the first event (gives the user time to grant tracking).
    appsFlyer.initSdk(
      {
        devKey: process.env.EXPO_PUBLIC_APPSFLYER_DEV_KEY ?? '',
        appId: '6764313527', // ASC numeric App ID
        isDebug: __DEV__,
        onInstallConversionDataListener: true,
        onDeepLinkListener: true,
        timeToWaitForATTUserAuthorization: 10,
      },
      () => crashlytics().log('appsflyer_initialized'),
      (err) => crashlytics().log(`appsflyer_init_failed: ${err}`),
    );
  }, []);

  // Auth bootstrap — mirror Supabase session into the Zustand store. Runs
  // once at root mount; supabase-js with persistSession=true emits
  // INITIAL_SESSION on cold start, then SIGNED_IN/SIGNED_OUT on transitions.
  // We pull canonical cloud state on each successful sign-in.
  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    const { data: sub } = sb.auth.onAuthStateChange((event, session) => {
      const store = useUserStore.getState();
      if (session?.user) {
        const incomingId = session.user.id;
        const sameUser = store.userId === incomingId;
        store.setSession({ userId: incomingId, email: session.user.email ?? null });
        if (event === 'SIGNED_IN' || (event === 'INITIAL_SESSION' && !sameUser)) {
          void store.hydrateFromCloud();
        }
      } else if (event === 'SIGNED_OUT') {
        store.clearSession();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#fbf9f5' }} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fbf9f5' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="(modals)"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

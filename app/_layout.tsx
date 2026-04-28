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
import { MOCK_USER } from '../mock/user';
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
  // In dev: seed mock data on first launch so Home shows real content (Sarah, Day 8).
  useEffect(() => {
    if (__DEV__) {
      const store = useUserStore.getState();
      if (!store.onboarded) {
        useUserStore.setState(MOCK_USER);
      }
    }
  }, []);

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

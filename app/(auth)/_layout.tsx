import { Stack } from 'expo-router';

/**
 * (auth) — email/password sign-in & sign-up screens.
 *
 * Plain stack with the same warm cream backdrop and fade animation used by
 * the rest of the app. The router gate elsewhere decides when to send the
 * user into this group (e.g. after onboarding or when no session is found).
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fbf9f5' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}

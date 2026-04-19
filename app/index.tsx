import { Redirect } from 'expo-router';

/**
 * Entry redirect.
 * For now — always route to (onboarding)/welcome so the full new-user flow is
 * exercised during development. Later, read auth/storage state and route
 * returning users directly to (tabs)/home.
 */
export default function Index() {
  return <Redirect href="/(onboarding)/welcome" />;
}

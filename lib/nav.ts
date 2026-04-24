import { router } from 'expo-router';

/**
 * Safe modal dismiss.
 *
 * `router.dismiss()` throws "The action 'POP' with payload {count:1}…"
 * when the modal was opened via a cold deep-link and there's no back-stack
 * (e.g. the user followed a notification straight into a modal route, or
 * Expo Go re-launched mid-modal). In that case we land them on the main
 * tabs instead of leaving them stuck on an error overlay.
 *
 * Call this anywhere a modal would have called `router.dismiss()`.
 */
export function safeDismiss() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/(tabs)/home');
  }
}

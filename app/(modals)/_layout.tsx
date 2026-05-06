import { Stack } from 'expo-router';

/**
 * Modals group — all routes here are presented as modals over the current tab/screen.
 * Dismissal: use router.dismiss() from inside the modal, NOT router.back() (which
 * fails when the modal was opened via deep link without a back target).
 */
export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        animation: 'slide_from_bottom',
        contentStyle: { backgroundColor: '#fbf9f5' },
      }}
    />
  );
}

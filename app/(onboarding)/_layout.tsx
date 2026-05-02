import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fbf9f5' },
        animation: 'slide_from_right',
      }}
    />
  );
}

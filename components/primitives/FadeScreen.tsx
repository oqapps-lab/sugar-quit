import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function FadeScreen({ children, style }: Props) {
  const opacity = useSharedValue(0);

  useFocusEffect(useCallback(() => {
    opacity.value = 0;
    opacity.value = withTiming(1, { duration: 180 });
  }, []));

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={[{ flex: 1 }, animStyle, style]}>
      {children}
    </Animated.View>
  );
}

import { router, Tabs, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, fonts, radius, shadows, spacing } from '../../constants/tokens';

/**
 * Main bottom-tabs layout. 4 tabs: home / curriculum / progress / profile.
 * SOS is NOT a tab — it's a floating action button on each tab screen.
 * Custom tab bar for glass-pill look.
 */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // hide default, we render custom below
      }}
      tabBar={() => <CustomTabBar />}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="curriculum" options={{ title: 'Curriculum' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const TABS = [
  { key: 'home',       glyph: '◉', label: 'Home',     href: '/(tabs)/home'       as const },
  { key: 'curriculum', glyph: '≡', label: 'Path',     href: '/(tabs)/curriculum' as const },
  { key: 'progress',   glyph: '≋', label: 'Progress', href: '/(tabs)/progress'   as const },
  { key: 'profile',    glyph: '◯', label: 'Profile',  href: '/(tabs)/profile'    as const },
];

function CustomTabBar() {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 16) + 16;

  // Source of truth for active tab — useSegments is native to expo-router and
  // updates reliably after router.replace/push. Previously we relied on
  // state.routes[state.index].name from the Tabs prop, which didn't always
  // re-render the bar after a tab switch (the bar component only mounts once
  // and React doesn't re-evaluate state.index for it consistently).
  const segments = useSegments() as string[];
  // For /(tabs)/home segments = ['(tabs)', 'home']; for /(tabs)/curriculum/[day]
  // segments = ['(tabs)', 'curriculum', '5'] — second segment is the tab name.
  const activeKey = segments[1] ?? 'home';
  const activeIndex = Math.max(0, TABS.findIndex((t) => t.key === activeKey));

  // Animated indicator — slides between tab slots with a spring.
  // We animate a translateX on a pill-shaped View positioned behind the icons.
  const indicatorPos = useSharedValue(activeIndex);
  useEffect(() => {
    indicatorPos.value = withSpring(activeIndex, {
      damping: 22,
      stiffness: 220,
      mass: 0.7,
    });
  }, [activeIndex, indicatorPos]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPos.value * (100 / TABS.length) + '%' as any }],
  }));

  const go = (href: (typeof TABS)[number]['href']) => {
    Haptics.selectionAsync();
    router.replace(href);
  };

  // Render BlurView (or fallback) as an absolute backdrop with pointerEvents="none"
  // so it can't intercept taps. The Pressable row sits in a sibling layer above.
  // Nesting Pressables inside BlurView occasionally swallows touches on iOS.
  return (
    <View style={[styles.pill, { bottom }, shadows.cardWhisper]} accessibilityRole="tablist">
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={40}
          tint="light"
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      ) : (
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.85)' }]}
          pointerEvents="none"
        />
      )}

      {/* Animated active-tab indicator (peach pill that slides) */}
      <View style={styles.indicatorTrack} pointerEvents="none">
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>

      <View style={styles.inner}>
        {TABS.map((t) => {
          const active = t.key === activeKey;
          return (
            <Pressable
              key={t.key}
              onPress={() => go(t.href)}
              hitSlop={8}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={t.label}
              style={({ pressed }) => [
                styles.tab,
                { transform: [{ scale: pressed ? 0.94 : 1 }] },
              ]}
            >
              <Text style={[styles.glyph, active && styles.glyphActive]}>{t.glyph}</Text>
              <Text style={[styles.label, active && styles.labelActive]}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  indicatorTrack: {
    position: 'absolute',
    left: spacing.sm,
    right: spacing.sm,
    top: spacing.sm,
    bottom: spacing.sm,
    flexDirection: 'row',
  },
  indicator: {
    width: `${100 / TABS.length}%`,
    height: '100%',
    borderRadius: radius.full,
    backgroundColor: 'rgba(165,60,48,0.12)',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  glyph: {
    fontSize: 18,
    color: colors.outline,
    fontFamily: fonts.headlineMedium,
    lineHeight: 20,
  },
  glyphActive: { color: colors.primary },
  label: {
    fontSize: 9,
    fontFamily: fonts.label,
    color: colors.outline,
    letterSpacing: 0.5,
  },
  labelActive: {
    color: colors.primary,
    fontFamily: fonts.bodySemibold,
  },
});

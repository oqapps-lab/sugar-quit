import { router, Tabs, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
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
  const { width: screenWidth } = useWindowDimensions();
  const bottom = Math.max(insets.bottom, 16) + 16;

  // Pill geometry — pure pixels, computed from screen width. Reanimated's
  // translateX accepts numbers (px) reliably; the previous '%' string approach
  // wasn't interpolated correctly and the indicator stuck at its first value.
  const pillOuterWidth = screenWidth - spacing.lg * 2;            // pill spans this
  const pillInnerWidth = pillOuterWidth - spacing.sm * 2;          // minus inner padding
  const slotWidth = pillInnerWidth / TABS.length;

  // Source of truth for active tab — useSegments is native to expo-router and
  // updates reliably after router.replace/push.
  const segments = useSegments() as string[];
  const activeKey = segments[1] ?? 'home';
  const activeIndex = Math.max(0, TABS.findIndex((t) => t.key === activeKey));

  // Animated indicator — slides between tab slots with a spring.
  const indicatorPos = useSharedValue(activeIndex * slotWidth);
  useEffect(() => {
    indicatorPos.value = withSpring(activeIndex * slotWidth, {
      damping: 22,
      stiffness: 220,
      mass: 0.7,
    });
  }, [activeIndex, slotWidth, indicatorPos]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPos.value }],
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

      {/* Animated active-tab indicator (peach pill that slides between slots) */}
      <View style={styles.indicatorTrack} pointerEvents="none">
        <Animated.View style={[styles.indicator, { width: slotWidth }, indicatorStyle]} />
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
    // width is set inline at runtime from slotWidth (depends on screen width)
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

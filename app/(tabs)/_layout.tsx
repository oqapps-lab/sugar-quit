import { router, Tabs } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="curriculum" options={{ title: 'Curriculum' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

function CustomTabBar({ state }: any) {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 16) + 16;

  const TABS: { key: string; glyph: string; label: string; href: '/(tabs)/home' | '/(tabs)/curriculum' | '/(tabs)/progress' | '/(tabs)/profile' }[] = [
    { key: 'home',       glyph: '◉', label: 'Home',     href: '/(tabs)/home' },
    { key: 'curriculum', glyph: '≡', label: 'Path',     href: '/(tabs)/curriculum' },
    { key: 'progress',   glyph: '≋', label: 'Progress', href: '/(tabs)/progress' },
    { key: 'profile',    glyph: '◯', label: 'Profile',  href: '/(tabs)/profile' },
  ];

  // expo-router: use `router.replace` to switch tabs (no stack buildup).
  // The previous `navigation.navigate(routeName)` was the React Navigation API,
  // not understood by expo-router's wrapper — it raised
  // "The action 'NAVIGATE' with payload {name: 'curriculum'} was not handled".
  const go = (href: (typeof TABS)[number]['href']) => {
    Haptics.selectionAsync();
    router.replace(href);
  };

  const activeRoute = state.routes[state.index].name;

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
      <View style={styles.inner}>
        {TABS.map((t) => {
          const active = activeRoute === t.key;
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
                active && styles.tabActive,
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
  tabActive: {
    backgroundColor: 'rgba(165,60,48,0.1)',
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

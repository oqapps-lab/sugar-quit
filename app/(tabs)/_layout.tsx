import { Tabs } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, spacing, typeScale } from '../../constants/tokens';

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

function CustomTabBar({ state, navigation }: any) {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 16) + 16;

  const TABS: { key: string; glyph: string; label: string }[] = [
    { key: 'home',       glyph: '◉', label: 'Home' },
    { key: 'curriculum', glyph: '≡', label: 'Path' },
    { key: 'progress',   glyph: '≋', label: 'Progress' },
    { key: 'profile',    glyph: '◯', label: 'Profile' },
  ];

  const go = (routeName: string) => {
    Haptics.selectionAsync();
    navigation.navigate(routeName);
  };

  const activeRoute = state.routes[state.index].name;

  const content = (
    <View style={styles.inner}>
      {TABS.map((t) => {
        const active = activeRoute === t.key;
        return (
          <Pressable
            key={t.key}
            onPress={() => go(t.key)}
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
  );

  if (Platform.OS === 'ios') {
    return (
      <BlurView intensity={40} tint="light" style={[styles.pill, { bottom }, shadows.cardWhisper]}>
        {content}
      </BlurView>
    );
  }
  return (
    <View style={[styles.pill, { bottom, backgroundColor: 'rgba(255,255,255,0.85)' }, shadows.cardWhisper]}>
      {content}
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

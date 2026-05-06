import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { colors, fonts, radius, shadows, spacing, tracking, typeScale } from '../../constants/tokens';

export type TabItem = {
  key: string;
  label: string;
  icon: string;
  active?: boolean;
};

type Props = {
  tabs: TabItem[];
  onPress?: (key: string) => void;
};

const DEFAULT_TABS: TabItem[] = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'curriculum', label: 'Learn', icon: '📖' },
  { key: 'progress', label: 'Progress', icon: '📈' },
  { key: 'profile', label: 'Profile', icon: '○' },
];

/**
 * BottomNav — floating pill tab bar.
 * Tabs: Home / Curriculum / Progress / Profile (per UX-SPEC 2.3).
 * SOS FAB is NOT part of this component — render SOSFab separately above it.
 */
export function BottomNav({ tabs = DEFAULT_TABS, onPress }: Props) {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, spacing.md) + spacing.md;

  const handlePress = (key: string) => {
    Haptics.selectionAsync();
    onPress?.(key);
  };

  const inner = (
    <View style={styles.inner}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          onPress={() => handlePress(tab.key)}
          accessibilityRole="tab"
          accessibilityLabel={tab.label}
          accessibilityState={{ selected: tab.active }}
          style={({ pressed }) => [
            styles.tab,
            tab.active && styles.tabActive,
            { transform: [{ scale: pressed ? 0.9 : 1 }] },
          ]}
        >
          <Text style={[styles.icon, tab.active && styles.iconActive]}>{tab.icon}</Text>
          <Text style={[styles.label, tab.active && styles.labelActive]}>{tab.label}</Text>
        </Pressable>
      ))}
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={40}
        tint="light"
        style={[styles.pill, { bottom }, shadows.cardWhisper]}
      >
        {inner}
      </BlurView>
    );
  }

  return (
    <View style={[styles.pill, { bottom, backgroundColor: 'rgba(255,255,255,0.92)' }, shadows.cardWhisper]}>
      {inner}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.sm,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    minWidth: 64,
    minHeight: 44,
  },
  tabActive: {
    backgroundColor: colors.primaryContainer,
  },
  icon: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  iconActive: {
    color: colors.primary,
  },
  label: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.label,
    color: colors.textSecondary,
    marginTop: 2,
  },
  labelActive: {
    color: colors.primary,
    fontFamily: fonts.bodySemibold,
  },
});

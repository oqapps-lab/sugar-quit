import { BlurView } from 'expo-blur';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius, shadows, tracking } from '../../constants/tokens';

export type NavTab = {
  key: string;
  label: string;
  icon: string; // text-based glyph placeholder; in production — expo-symbols or SF
  active?: boolean;
};

type Props = {
  tabs: NavTab[];
  onPress?: (key: string) => void;
  dark?: boolean;
};

/**
 * BottomNav — floating pill (canonical variant).
 * 4 tabs + blur. Optional dark mode for Dark Horizon screen.
 */
export function BottomNav({ tabs, onPress, dark = false }: Props) {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, 16) + 16;

  const content = (
    <View style={styles.inner}>
      {tabs.map((t) => (
        <Pressable
          key={t.key}
          onPress={() => onPress?.(t.key)}
          style={({ pressed }) => [
            styles.tab,
            t.active && (dark ? styles.tabActiveDark : styles.tabActive),
            { transform: [{ scale: pressed ? 0.94 : 1 }] },
          ]}
        >
          <Text
            style={[
              styles.icon,
              { color: t.active
                ? (dark ? '#ffffff' : colors.darkHorizonRose900)
                : (dark ? 'rgba(255,255,255,0.3)' : 'rgba(136,19,55,0.4)') },
            ]}
          >
            {t.icon}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={40}
        tint={dark ? 'dark' : 'light'}
        style={[
          styles.pill,
          { bottom },
          shadows.cardWhisper,
          { backgroundColor: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)' },
        ]}
      >
        {content}
      </BlurView>
    );
  }

  return (
    <View
      style={[
        styles.pill,
        {
          bottom,
          backgroundColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.75)',
        },
        shadows.cardWhisper,
      ]}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -120 }],
    width: 240,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tab: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  tabActiveDark: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  icon: {
    fontSize: 18,
    fontFamily: fonts.label,
    letterSpacing: tracking.widest,
  },
});

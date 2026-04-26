import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Card } from '../../../components/primitives/Card';
import { Eyebrow } from '../../../components/primitives/Eyebrow';
import { PillCTA } from '../../../components/primitives/PillCTA';
import { Txt } from '../../../components/primitives/Txt';
import { colors, radius, spacing } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

const OPTIONS = [
  { key: 'stress',   title: 'Stress',         accent: '#C05840' },
  { key: 'boredom',  title: 'Boredom',         accent: '#7A8090' },
  { key: 'meals',    title: 'After meals',     accent: '#D4900A' },
  { key: 'social',   title: 'Social pressure', accent: '#5A7AA8' },
  { key: 'emotions', title: 'Emotions',        accent: '#C96C80' },
  { key: 'night',    title: 'Late-night',      accent: '#4A4A70' },
];

export default function QuizTriggers() {
  const insets = useSafeAreaInsets();
  const setTriggers = useUserStore((s) => s.setTriggers);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected((s) => s.includes(key) ? s.filter((k) => k !== key) : [...s, key]);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }} hitSlop={8} accessibilityRole="button" style={styles.backBtn}>
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="labelSm" color={colors.textSecondary}>STEP 7 OF 15</Txt>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.textBlock}>
          <Eyebrow color={colors.primary}>Your triggers</Eyebrow>
          <Txt variant="displayMd" style={styles.hero}>What tends to set it off?</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
            Pick any that ring true.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(400)} style={styles.grid}>
          {OPTIONS.map((o) => {
            const isOn = selected.includes(o.key);
            return (
              <Pressable
                key={o.key}
                style={styles.gridItem}
                onPress={() => toggle(o.key)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isOn }}
                accessibilityLabel={o.title}
              >
                <Card
                  style={[
                    styles.optionCard,
                    { backgroundColor: o.accent + '1A' },
                    isOn && styles.optionCardOn,
                  ]}
                >
                  <Txt variant="titleMd" color={isOn ? colors.primary : colors.onSurface} center>
                    {o.title}
                  </Txt>
                </Card>
              </Pressable>
            );
          })}
        </Animated.View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label="Continue"
          disabled={selected.length === 0}
          onPress={() => {
            if (selected.length === 0) return;
            setTriggers(selected);
            router.push('/(onboarding)/quiz/consumption');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  backBtn: { minWidth: 60 },
  headerRight: { minWidth: 60 },

  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  textBlock: { gap: spacing.sm },
  hero: { letterSpacing: -0.6, marginTop: spacing.xs },
  sub: { lineHeight: 22 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  gridItem: { width: '48.5%' },
  optionCard: {
    aspectRatio: 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardOn: { borderColor: colors.primary },

  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

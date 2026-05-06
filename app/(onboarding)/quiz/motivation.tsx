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
  { key: 'health',  title: 'A health concern',      accent: '#5BA858' },
  { key: 'energy',  title: 'My energy levels',      accent: '#D4900A' },
  { key: 'body',    title: 'My weight',              accent: '#C96C80' },
  { key: 'cost',    title: 'My mood',                accent: '#5A7AA8' },
  { key: 'charge',  title: 'I feel hooked on it',   accent: '#7A6BA8' },
];

export default function QuizMotivation() {
  const insets = useSafeAreaInsets();
  const setMotivations = useUserStore((s) => s.setMotivations);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected((s) => s.includes(key) ? s.filter((k) => k !== key) : [...s, key]);
  };

  const handleContinue = () => {
    if (selected.length === 0) return;
    setMotivations(selected);
    router.push('/(onboarding)/quiz/sugar-goal');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }} hitSlop={8} accessibilityRole="button" style={styles.backBtn}>
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="labelSm" color={colors.textSecondary}>STEP 3 OF 15</Txt>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.textBlock}>
          <Eyebrow color={colors.primary}>Your motivation</Eyebrow>
          <Txt variant="displayMd" style={styles.hero}>What's pulling you here?</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
            Pick any that feel true. Choose more than one.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(400)} style={styles.optionsCol}>
          {OPTIONS.map((o) => {
            const isOn = selected.includes(o.key);
            return (
              <Pressable
                key={o.key}
                onPress={() => toggle(o.key)}
                style={styles.optionItem}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isOn }}
                accessibilityLabel={o.title}
              >
                <Card
                  padding={spacing.lg}
                  style={[
                    styles.optionCard,
                    { backgroundColor: o.accent + '1A' },
                    isOn && styles.optionCardOn,
                  ]}
                >
                  <View style={styles.optionRow}>
                    <Txt variant="titleMd" color={isOn ? colors.primary : colors.onSurface} style={styles.optionLabel}>
                      {o.title}
                    </Txt>
                    <View style={[styles.checkDot, isOn && styles.checkDotOn]}>
                      {isOn && <Txt variant="labelSm" color={colors.onPrimary}>✓</Txt>}
                    </View>
                  </View>
                </Card>
              </Pressable>
            );
          })}
        </Animated.View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Continue" onPress={handleContinue} disabled={selected.length === 0} />
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
    paddingBottom: spacing.sm,
  },
  textBlock: { gap: spacing.sm, marginBottom: spacing.lg },
  hero: { letterSpacing: -0.6, marginTop: spacing.xs },
  sub: { lineHeight: 22 },

  optionsCol: { flex: 1, gap: spacing.sm },
  optionItem: { flex: 1 },
  optionCard: { flex: 1, justifyContent: 'center', borderRadius: radius.sm, borderWidth: 2, borderColor: 'transparent' },
  optionCardOn: { borderColor: colors.primary },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  optionLabel: { flex: 1 },
  checkDot: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDotOn: { backgroundColor: colors.primary, borderColor: colors.primary },

  footer: { paddingHorizontal: spacing.lg, alignItems: 'center', paddingTop: spacing.sm },
});

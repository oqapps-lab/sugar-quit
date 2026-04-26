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
import { useUserStore, type Consumption } from '../../../stores/useUserStore';

const LEVELS: { key: Consumption; title: string; hint: string; accent: string }[] = [
  { key: 'little',   title: 'Just a bit',          hint: 'I can take it or leave it',                accent: '#5BA858' },
  { key: 'moderate', title: 'Here and there',       hint: 'A treat now and then — no big deal',       accent: '#D4900A' },
  { key: 'alot',     title: 'Most days, yeah',      hint: 'It sneaks into my routine more than I plan', accent: '#E07840' },
  { key: 'great',    title: 'Honestly, daily',      hint: "It's kind of become the default",          accent: '#C05840' },
  { key: 'runs',     title: 'It runs my day',       hint: 'I reach for it without even thinking',     accent: '#9A3030' },
];

export default function QuizConsumption() {
  const insets = useSafeAreaInsets();
  const setConsumption = useUserStore((s) => s.setConsumption);
  const [selected, setSelected] = useState<Consumption | null>(null);

  const pick = (key: Consumption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(key);
  };

  const handleContinue = () => {
    if (!selected) return;
    setConsumption(selected);
    router.push('/(onboarding)/motivational-2');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }} hitSlop={8} accessibilityRole="button" style={styles.backBtn}>
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="labelSm" color={colors.textSecondary}>STEP 8 OF 15</Txt>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.textBlock}>
          <Eyebrow color={colors.primary}>Your intake</Eyebrow>
          <Txt variant="displayMd" style={styles.hero}>How much sugar runs through your week?</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
            Be honest. Only you see this.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(400)} style={styles.optionsCol}>
          {LEVELS.map((l) => {
            const isOn = selected === l.key;
            return (
              <Pressable
                key={l.key}
                onPress={() => pick(l.key)}
                style={styles.optionItem}
                accessibilityRole="radio"
                accessibilityState={{ selected: isOn }}
                accessibilityLabel={`${l.title}. ${l.hint}`}
              >
                <Card
                  padding={spacing.lg}
                  style={[
                    styles.optionCard,
                    { backgroundColor: l.accent + '1A' },
                    isOn && styles.optionCardOn,
                  ]}
                >
                  <Txt variant="titleMd" color={isOn ? colors.primary : colors.onSurface}>{l.title}</Txt>
                  <Txt variant="bodySm" color={colors.textSecondary} style={styles.optionHint}>{l.hint}</Txt>
                </Card>
              </Pressable>
            );
          })}
        </Animated.View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Continue" onPress={handleContinue} disabled={!selected} />
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
  optionCard: { flex: 1, gap: spacing.xs, justifyContent: 'center', borderRadius: radius.sm, borderWidth: 2, borderColor: 'transparent' },
  optionCardOn: { borderColor: colors.primary },
  optionHint: { lineHeight: 16 },

  footer: { paddingHorizontal: spacing.lg, alignItems: 'center', paddingTop: spacing.sm },
});

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

type GoalOption = 'quit' | 'reduce' | 'explore';

const OPTIONS: { key: GoalOption; title: string; body: string; accent: string }[] = [
  { key: 'quit',    title: 'Quit completely',  body: 'Zero added sugar, for my reasons.',    accent: '#C05840' },
  { key: 'reduce',  title: 'Reduce gradually', body: 'Less sugar, more often, better mood.', accent: '#D4900A' },
  { key: 'explore', title: "I'm exploring",    body: "Not sure yet. Show me what's possible.", accent: '#3AABA0' },
];

export default function QuizGoal() {
  const insets = useSafeAreaInsets();
  const setGoal = useUserStore((s) => s.setGoal);
  const [selected, setSelected] = useState<GoalOption | null>(null);

  const pick = (key: GoalOption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(key);
  };

  const handleContinue = () => {
    if (!selected) return;
    if (selected === 'quit' || selected === 'reduce') setGoal(selected);
    router.push('/(onboarding)/quiz/motivation');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }} hitSlop={8} accessibilityRole="button" style={styles.backBtn}>
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="labelSm" color={colors.textSecondary}>STEP 2 OF 15</Txt>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.textBlock}>
          <Eyebrow color={colors.primary}>Your goal</Eyebrow>
          <Txt variant="displayMd" style={styles.hero}>What's the shape of your goal?</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
            Choose what fits. You can change this later.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(400)} style={styles.optionsCol}>
          {OPTIONS.map((o) => {
            const isOn = selected === o.key;
            return (
              <Pressable
                key={o.key}
                onPress={() => pick(o.key)}
                style={styles.optionItem}
                accessibilityRole="radio"
                accessibilityState={{ selected: isOn }}
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
                  <Txt variant="titleMd" color={isOn ? colors.primary : colors.onSurface}>{o.title}</Txt>
                  <Txt variant="bodyMd" color={colors.textSecondary} style={styles.optionBody}>{o.body}</Txt>
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
  optionBody: { lineHeight: 18 },

  footer: { paddingHorizontal: spacing.lg, alignItems: 'center', paddingTop: spacing.sm },
});

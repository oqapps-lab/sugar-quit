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
import { useUserStore, type WorkEnvironment } from '../../../stores/useUserStore';

const OPTIONS: { key: WorkEnvironment; title: string; body: string; accent: string }[] = [
  { key: 'office', title: 'Sitting, often stressed',      body: 'Desk job, deadlines, not much movement.',     accent: '#5A7AA8' },
  { key: 'home',   title: 'Home — kitchen always close',  body: 'Remote or stay-at-home, relaxed pace.',       accent: '#5BA858' },
  { key: 'feet',   title: 'Physical and tiring',          body: 'On my feet, body works hard all day.',        accent: '#D4900A' },
  { key: 'mobile', title: 'Out and about',                body: 'Social, errands, no fixed routine.',          accent: '#7A6BA8' },
  { key: 'night',  title: 'Night shifts or odd hours',    body: 'Schedule flips — nights, early mornings, irregular.', accent: '#4A4A70' },
];

export default function QuizWorkEnvironment() {
  const insets = useSafeAreaInsets();
  const setWorkEnvironment = useUserStore((s) => s.setWorkEnvironment);
  const [selected, setSelected] = useState<WorkEnvironment | null>(null);

  const pick = (key: WorkEnvironment) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(key);
  };

  const handleContinue = () => {
    if (!selected) return;
    setWorkEnvironment(selected);
    router.push('/(onboarding)/quiz/name');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }} hitSlop={8} accessibilityRole="button" style={styles.backBtn}>
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="labelSm" color={colors.textSecondary}>STEP 11 OF 15</Txt>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.textBlock}>
          <Eyebrow color={colors.primary}>Your days</Eyebrow>
          <Txt variant="displayMd" style={styles.hero}>What's your day usually like?</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
            The mood and pace of your day shapes when cravings hit.
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
                accessibilityLabel={`${o.title}. ${o.body}`}
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

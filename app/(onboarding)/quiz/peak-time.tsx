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

const CHIPS = [
  { key: 'morning',   label: 'Morning',   time: '9:00 AM',  accent: '#D4900A' },
  { key: 'afternoon', label: 'Afternoon', time: '3:00 PM',  accent: '#C05840' },
  { key: 'evening',   label: 'Evening',   time: '7:00 PM',  accent: '#7A6BA8' },
  { key: 'night',     label: 'Night',     time: '11:00 PM', accent: '#4A4A70' },
];

export default function QuizPeakTime() {
  const insets = useSafeAreaInsets();
  const setPeakHour = useUserStore((s) => s.setPeakHour);
  const [selected, setSelected] = useState('afternoon');

  const pick = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(key);
  };

  const activeChip = CHIPS.find((c) => c.key === selected) ?? CHIPS[1];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }} hitSlop={8} accessibilityRole="button" style={styles.backBtn}>
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="labelSm" color={colors.textSecondary}>STEP 6 OF 15</Txt>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.textBlock}>
          <Eyebrow color={colors.primary}>Peak window</Eyebrow>
          <Txt variant="displayMd" style={styles.hero}>When does it hit hardest?</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
            Not sure? Afternoon is the most common — just tap Continue.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.chipsRow}>
          {CHIPS.map((c) => {
            const isOn = selected === c.key;
            return (
              <Pressable
                key={c.key}
                onPress={() => pick(c.key)}
                style={[
                  styles.chip,
                  { backgroundColor: isOn ? colors.primary : c.accent + '1A', borderColor: isOn ? colors.primary : c.accent + '50' },
                ]}
                accessibilityRole="radio"
                accessibilityState={{ selected: isOn }}
                accessibilityLabel={c.label}
              >
                <Txt variant="labelSm" color={isOn ? colors.onPrimary : colors.onSurface}>
                  {c.label.toUpperCase()}
                </Txt>
              </Pressable>
            );
          })}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).duration(400)}>
          <Card style={styles.timeCard}>
            <Eyebrow color={colors.primary}>Typical craving window</Eyebrow>
            <Txt variant="displayLg" style={styles.timeBig}>{activeChip.time}</Txt>
          </Card>
        </Animated.View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label="Continue"
          onPress={() => {
            setPeakHour(activeChip.key);
            router.push('/(onboarding)/quiz/triggers');
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

  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
  },

  timeCard: {
    alignItems: 'center',
    gap: spacing.xs,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  timeBig: { letterSpacing: -1 },

  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Card } from '../../components/primitives/Card';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';

type Slot = 'morning' | 'peak' | 'evening';

const CONTENT: Record<Slot, {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  practice: string;
  icon: string;
  accent: string;
}> = {
  morning: {
    eyebrow: '08:00 — 12:00',
    title: 'Calm window',
    subtitle: 'Your low-risk hours.',
    body: 'Cortisol is steady, blood sugar is even, dopamine baseline is regulated. Cravings are rare here because the body has nothing to "fix" with sugar. This is your high-leverage time for deep work and any meaningful decisions.',
    practice: 'Tip: do the hard task now, while willpower is cheap.',
    icon: '○',
    accent: colors.success,
  },
  peak: {
    eyebrow: '15:00 — 18:00',
    title: 'Peak surge',
    subtitle: 'The hour you booked sugar in your past.',
    body: "We've watched your pattern: this is when energy dips, cortisol kicks back up, and your brain reaches for the fastest fix. Most cravings happen in this 3-hour window. Knowing it is half the work.",
    practice: 'Tip: pre-decide. Have water + protein ready before 14:30.',
    icon: '◆',
    accent: colors.primary,
  },
  evening: {
    eyebrow: '18:00 — 22:00',
    title: 'The exhale',
    subtitle: 'System reset begins.',
    body: 'After dinner, insulin slowly returns to baseline and the day starts unwinding. Sleep is being prepared chemically right now. Sugar this late spikes blood glucose in a way that disrupts deep sleep — costing you tomorrow.',
    practice: 'Tip: stop eating 2–3 hours before bed. Your morning will thank you.',
    icon: '◑',
    accent: colors.warning,
  },
};

export default function ForecastWindow() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ slot?: string }>();
  const slot: Slot = params.slot === 'morning' ? 'morning' : params.slot === 'evening' ? 'evening' : 'peak';
  const c = CONTENT[slot];
  const peakHour = useUserStore((s) => s.peakHour);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Txt variant="titleSm">{c.title}</Txt>
        <Pressable onPress={() => router.dismiss()} hitSlop={8}
          accessibilityRole="button" accessibilityLabel="Close">
          <Txt variant="bodyLg" color={colors.textSecondary}>✕</Txt>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.duration(400)} style={styles.heroSection}>
          <View style={[styles.iconCircle, { backgroundColor: c.accent + '20' }]}>
            <Txt variant="displayLg" color={c.accent}>{c.icon}</Txt>
          </View>
          <Eyebrow color={colors.primary}>{c.eyebrow}</Eyebrow>
          <Txt variant="displayMd" style={styles.heroTitle}>{c.title}</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary}>{c.subtitle}</Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(160).duration(400)}>
          <Card bordered style={styles.bodyCard}>
            <Txt variant="bodyLg" color={colors.onSurface} style={styles.bodyText}>{c.body}</Txt>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(260).duration(400)}>
          <Card bordered style={styles.practiceCard}>
            <Eyebrow color={colors.primary}>Practice</Eyebrow>
            <Txt variant="bodyLg" color={colors.onSurface} style={styles.practiceText}>{c.practice}</Txt>
          </Card>
        </Animated.View>

        {slot === 'peak' && peakHour && (
          <Txt variant="bodySm" center italic style={styles.personalNote}>
            Personalised from your quiz: peak around {peakHour.toLowerCase()}.
          </Txt>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Got it" onPress={() => router.dismiss()} />
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
  headerLeft: { minWidth: 40 },

  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },

  heroSection: { alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  heroTitle: { letterSpacing: -0.6, textAlign: 'center' },

  bodyCard: {},
  bodyText: { lineHeight: 24 },

  practiceCard: { gap: spacing.sm },
  practiceText: { lineHeight: 22 },

  personalNote: {
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },

  footer: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});

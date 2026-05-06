import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Card } from '../../components/primitives/Card';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';
import { useUserStore, type SosOutcome } from '../../stores/useUserStore';

const ANSWERS: { key: SosOutcome; title: string; body: string; accent: string }[] = [
  { key: 'walked', title: 'Walked through it',       body: 'The wave came. You stayed.',             accent: colors.success },
  { key: 'softer', title: 'Softer, but still there', body: 'Noisier than before, quieter than peak.', accent: colors.warning },
  { key: 'gave',   title: 'Gave in to it',           body: 'Honest answer. Data, not failure.',       accent: colors.textSecondary },
];

export default function PostSOS() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ session?: string }>();
  const sessionId = typeof params.session === 'string' ? params.session : '';
  const logSosOutcome = useUserStore((s) => s.logSosOutcome);
  const [picked, setPicked] = useState<SosOutcome | null>(null);

  const onPick = (key: SosOutcome) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPicked(key);
  };

  const onSave = () => {
    if (!picked) return;
    logSosOutcome(sessionId, picked);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.dismiss();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.dismiss()} style={styles.backBtn} hitSlop={8}
          accessibilityRole="button" accessibilityLabel="Close">
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="titleSm">After the wave</Txt>
        <View style={styles.headerRight} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)}>
          <Eyebrow color={colors.primary}>Check-out</Eyebrow>
          <Txt variant="displayMd" style={styles.title}>How are you now?</Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
            Whatever the answer — it's worth logging.
          </Txt>
        </Animated.View>

        <View style={styles.cards}>
          {ANSWERS.map((a, idx) => {
            const active = picked === a.key;
            return (
              <Animated.View key={a.key} entering={FadeInDown.delay(120 + idx * 80).duration(350)}>
                <Pressable
                  onPress={() => onPick(a.key)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={`${a.title}. ${a.body}`}
                >
                  <Card style={[styles.card, active && { borderColor: a.accent, borderWidth: 2 }]}>
                    <View style={[styles.accentBar, { backgroundColor: a.accent }]} />
                    <View style={styles.cardContent}>
                      <Txt variant="titleMd" style={active && { color: a.accent }}>{a.title}</Txt>
                      <Txt variant="bodyMd" color={colors.textSecondary}>{a.body}</Txt>
                    </View>
                    {active && (
                      <View style={[styles.checkCircle, { backgroundColor: a.accent }]}>
                        <Txt variant="labelSm" color={colors.onPrimary}>✓</Txt>
                      </View>
                    )}
                  </Card>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Save & close" onPress={onSave} disabled={!picked} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
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
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  title: {
    letterSpacing: -0.6,
    lineHeight: 34,
    marginTop: spacing.xs,
  },
  sub: {
    lineHeight: 24,
    marginTop: spacing.sm,
  },

  cards: { gap: spacing.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outline,
    padding: 0,
    overflow: 'hidden',
  },
  accentBar: {
    width: 4,
    alignSelf: 'stretch',
  },
  cardContent: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    gap: 2,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});

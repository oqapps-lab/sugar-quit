import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Card } from '../../components/primitives/Card';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';

type Intensity = 1 | 2 | 3 | 4 | 5;
type Outcome = 'walked' | 'gave';

const TRIGGERS = ['Stress', 'Boredom', 'After meal', 'Social', 'Emotion', 'Late-night'];
const OUTCOMES: { key: Outcome; title: string; body: string; accent: string }[] = [
  { key: 'walked', title: 'Walked through', body: 'Rode the wave.',     accent: colors.success },
  { key: 'gave',   title: 'Gave in to it',  body: 'Honest. Data only.', accent: colors.textSecondary },
];

export default function CravingLog() {
  const insets = useSafeAreaInsets();
  const logCraving = useUserStore((s) => s.logCraving);
  const [intensity, setIntensity] = useState<Intensity | null>(null);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [notes, setNotes] = useState('');

  const canSave = intensity !== null && outcome !== null;

  const onSave = () => {
    if (!canSave) return;
    logCraving({ intensity: intensity!, triggers, outcome: outcome!, notes: notes.trim() });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.dismiss();
  };

  const toggleTrigger = (t: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTriggers((cur) => cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ paddingTop: insets.top }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.dismiss()} style={styles.backBtn} hitSlop={8}
            accessibilityRole="button" accessibilityLabel="Close craving log">
            <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
          </Pressable>
          <Txt variant="titleSm">Log a craving</Txt>
          <View style={styles.headerRight} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Intensity */}
        <Animated.View entering={FadeInUp.duration(400)}>
          <Eyebrow color={colors.primary} style={styles.sectionLabel}>Intensity</Eyebrow>
          <View style={styles.stonesRow}>
            {[1, 2, 3, 4, 5].map((n) => {
              const active = intensity !== null && intensity >= n;
              return (
                <Pressable
                  key={n}
                  onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setIntensity(n as Intensity); }}
                  style={[styles.stone, active && styles.stoneActive]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: intensity === n }}
                  accessibilityLabel={`Craving intensity ${n} of 5`}
                >
                  <Txt variant="titleMd" color={active ? colors.onPrimary : colors.textSecondary}>{n}</Txt>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>

        {/* Triggers */}
        <Animated.View entering={FadeInUp.delay(120).duration(400)} style={styles.section}>
          <Eyebrow color={colors.primary} style={styles.sectionLabel}>Trigger · tap any</Eyebrow>
          <View style={styles.chips}>
            {TRIGGERS.map((t) => {
              const active = triggers.includes(t);
              return (
                <Pressable
                  key={t}
                  onPress={() => toggleTrigger(t)}
                  style={[styles.chip, active && styles.chipActive]}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: active }}
                  accessibilityLabel={t}
                >
                  <Txt variant="bodyMd" color={active ? colors.primary : colors.textSecondary}>{t}</Txt>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>

        {/* Outcome */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.section}>
          <Eyebrow color={colors.primary} style={styles.sectionLabel}>Outcome</Eyebrow>
          <View style={styles.outcomeRow}>
            {OUTCOMES.map((o) => {
              const active = outcome === o.key;
              return (
                <Pressable
                  key={o.key}
                  onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setOutcome(o.key); }}
                  style={{ flex: 1 }}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                >
                  <Card style={[styles.outcomeCard, active && { borderColor: o.accent, borderWidth: 2 }]}>
                    <View style={[styles.accentBar, { backgroundColor: o.accent }]} />
                    <View style={styles.outcomeContent}>
                      <Txt variant="titleSm">{o.title}</Txt>
                      <Txt variant="bodySm" color={colors.textSecondary}>{o.body}</Txt>
                    </View>
                  </Card>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>

        {/* Notes */}
        <Animated.View entering={FadeInDown.delay(280).duration(400)} style={styles.section}>
          <Eyebrow color={colors.primary} style={styles.sectionLabel}>Note · optional</Eyebrow>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="what was happening…"
            placeholderTextColor={colors.textSecondary}
            multiline
            style={styles.notesInput}
            accessibilityLabel="Optional note about the craving"
          />
        </Animated.View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Save craving" onPress={onSave} disabled={!canSave} />
      </View>
    </KeyboardAvoidingView>
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

  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl ?? spacing.xl,
    gap: spacing.xs,
  },

  sectionLabel: { marginBottom: spacing.sm },
  section: { marginTop: spacing.lg },

  stonesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  stone: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stoneActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  chipActive: {
    backgroundColor: colors.primary + '18',
    borderColor: colors.primary,
  },

  outcomeRow: { flexDirection: 'row', gap: spacing.sm },
  outcomeCard: {
    flexDirection: 'row',
    padding: 0,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.outline,
    minHeight: 80,
  },
  accentBar: { width: 4, alignSelf: 'stretch' },
  outcomeContent: {
    flex: 1,
    padding: spacing.md,
    gap: 2,
    justifyContent: 'center',
  },

  notesInput: {
    minHeight: 90,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outline,
    padding: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
    textAlignVertical: 'top',
    lineHeight: 22,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});

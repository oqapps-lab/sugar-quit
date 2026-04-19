import { router } from 'expo-router';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../components/ui/GlassCard';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * 3.3 Quick craving log.
 * Intensity (1-5 stones) → triggers (multi-select chips) → outcome → optional notes.
 */

type Intensity = 1 | 2 | 3 | 4 | 5;
type Outcome = 'walked' | 'gave';

const TRIGGERS = ['Stress', 'Boredom', 'After meal', 'Social', 'Emotion', 'Late-night'];
const OUTCOMES: { key: Outcome; title: string; body: string; tint: 'mint' | 'default' }[] = [
  { key: 'walked', title: 'Walked through', body: 'Rode the wave.',     tint: 'mint' },
  { key: 'gave',   title: 'Gave in to it',  body: 'Honest. Data only.', tint: 'default' },
];

export default function CravingLog() {
  const insets = useSafeAreaInsets();
  const [intensity, setIntensity] = useState<Intensity | null>(null);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [notes, setNotes] = useState('');

  const toggleTrigger = (t: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTriggers((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  };

  const pickIntensity = (n: Intensity) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIntensity(n);
  };

  const pickOutcome = (o: Outcome) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setOutcome(o);
  };

  const canSave = intensity !== null && outcome !== null;

  return (
    <AtmosphericGradient theme="dawn">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <View style={{ width: 36 }} />
          <Text style={styles.headerTitle}>Log a craving</Text>
          <Pressable onPress={() => router.dismiss()} style={styles.closeBtn}>
            <Text style={styles.closeX}>×</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Intensity */}
          <Text style={styles.sectionLabel}>INTENSITY</Text>
          <View style={styles.stonesRow}>
            {[1, 2, 3, 4, 5].map((n) => {
              const active = intensity !== null && intensity >= n;
              return (
                <Pressable key={n} onPress={() => pickIntensity(n as Intensity)} style={[styles.stone, active && styles.stoneActive]}>
                  <Text style={[styles.stoneNum, active && styles.stoneNumActive]}>{n}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Triggers */}
          <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>TRIGGER · TAP ANY</Text>
          <View style={styles.chipsWrap}>
            {TRIGGERS.map((t) => {
              const active = triggers.includes(t);
              return (
                <Pressable key={t} onPress={() => toggleTrigger(t)} style={[styles.chip, active && styles.chipActive]}>
                  <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{t}</Text>
                </Pressable>
              );
            })}
          </View>

          {/* Outcome */}
          <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>OUTCOME</Text>
          <View style={styles.outcomeRow}>
            {OUTCOMES.map((o) => (
              <Pressable key={o.key} onPress={() => pickOutcome(o.key)} style={{ flex: 1 }}>
                <GlassCard tint={o.tint} style={[styles.outcomeCard, outcome === o.key && styles.outcomeActive]}>
                  <Text style={styles.outcomeTitle}>{o.title}</Text>
                  <Text style={styles.outcomeBody}>{o.body}</Text>
                </GlassCard>
              </Pressable>
            ))}
          </View>

          {/* Notes */}
          <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>NOTE · OPTIONAL</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="what was happening…"
            placeholderTextColor={colors.outline}
            multiline
            style={styles.notesInput}
          />
        </ScrollView>

        <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
          <PillCTA label="Save craving" onPress={() => router.dismiss()} disabled={!canSave} />
        </View>
      </KeyboardAvoidingView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: { fontSize: 22, color: colors.onSurface, lineHeight: 22, fontFamily: fonts.headlineLight },

  scroll: { padding: spacing.lg, paddingBottom: spacing.xxxl + 40 },

  sectionLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.sm,
  },

  stonesRow: { flexDirection: 'row', gap: spacing.sm, justifyContent: 'space-between' },
  stone: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center', justifyContent: 'center',
  },
  stoneActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  stoneNum: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleLarge,
    color: colors.onSurfaceVariant,
  },
  stoneNumActive: { color: colors.onPrimary },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  chipActive: { backgroundColor: colors.primaryContainer, borderColor: colors.primary },
  chipLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
  },
  chipLabelActive: { color: colors.onPrimaryContainer, fontFamily: fonts.bodySemibold },

  outcomeRow: { flexDirection: 'row', gap: spacing.sm },
  outcomeCard: { padding: spacing.md, minHeight: 90, gap: 4 },
  outcomeActive: { borderColor: colors.primary, borderWidth: 2 },
  outcomeTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleSmall,
    color: colors.onSurface,
  },
  outcomeBody: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodySmall,
    color: colors.onSurfaceVariant,
  },

  notesInput: {
    minHeight: 90,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    padding: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    textAlignVertical: 'top',
  },

  ctaWrap: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});

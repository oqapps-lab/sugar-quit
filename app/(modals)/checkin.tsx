import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../components/ui/GlassCard';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

type Step = 'sugar' | 'mood' | 'done';
type Sugar = 'free' | 'some' | 'relapse';
type Mood = 1 | 2 | 3 | 4 | 5;

const SUGAR_OPTIONS: { key: Sugar; title: string; body: string; tint: 'mint' | 'peach' | 'default' }[] = [
  { key: 'free',    title: 'Sugar-free',      body: 'Whole day. Added nothing.',          tint: 'mint' },
  { key: 'some',    title: 'Had a little',    body: 'A bit. Deliberate or small.',        tint: 'peach' },
  { key: 'relapse', title: 'Lost the thread', body: "A full return. Data, not failure.",  tint: 'default' },
];

const MOODS: { value: Mood; label: string; emoji: string }[] = [
  { value: 5, label: 'Great',   emoji: '◎' },
  { value: 4, label: 'Good',    emoji: '◐' },
  { value: 3, label: 'Okay',    emoji: '◯' },
  { value: 2, label: 'Low',     emoji: '◑' },
  { value: 1, label: 'Rough',   emoji: '●' },
];

export default function CheckIn() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<Step>('sugar');
  const [sugar, setSugar] = useState<Sugar | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);

  const onSugar = (s: Sugar) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSugar(s);
    setTimeout(() => setStep('mood'), 240);
  };
  const onMood = (m: Mood) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMood(m);
    setTimeout(() => setStep('done'), 240);
  };

  return (
    <AtmosphericGradient theme="dawn">
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.dismiss()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Daily check-in</Text>
        <View style={styles.stepIndicator}>
          <View style={[styles.stepDot, (step === 'sugar' || step === 'mood' || step === 'done') && styles.stepDotActive]} />
          <View style={[styles.stepDot, (step === 'mood' || step === 'done') && styles.stepDotActive]} />
          <View style={[styles.stepDot, step === 'done' && styles.stepDotActive]} />
        </View>
      </View>

      {step === 'sugar' && (
        <View style={styles.body}>
          <Text style={styles.stepEyebrow}>STEP 1 OF 3 · TONIGHT</Text>
          <Text style={styles.stepTitle}>How did the day go?</Text>
          <Text style={styles.stepBody}>Honest only. No streak is worth a lie.</Text>

          <View style={styles.cardsCol}>
            {SUGAR_OPTIONS.map((opt) => (
              <Pressable key={opt.key} onPress={() => onSugar(opt.key)}>
                <GlassCard tint={opt.tint} style={[styles.optionCard, sugar === opt.key && styles.optionCardActive]}>
                  <View style={styles.optionRow}>
                    <View style={styles.optionText}>
                      <Text style={styles.optionTitle}>{opt.title}</Text>
                      <Text style={styles.optionBody}>{opt.body}</Text>
                    </View>
                    <View style={[styles.optionArrow, sugar === opt.key && styles.optionArrowActive]}>
                      <Text style={[styles.optionArrowText, sugar === opt.key && styles.optionArrowTextActive]}>→</Text>
                    </View>
                  </View>
                </GlassCard>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {step === 'mood' && (
        <View style={styles.body}>
          <Text style={styles.stepEyebrow}>STEP 2 OF 3</Text>
          <Text style={styles.stepTitle}>How are you feeling?</Text>
          <Text style={styles.stepBody}>Tap the closest one.</Text>

          <View style={styles.moodGrid}>
            {MOODS.map((m) => (
              <Pressable key={m.value} onPress={() => onMood(m.value)}>
                <View style={[styles.moodTile, mood === m.value && styles.moodTileActive]}>
                  <Text style={[styles.moodGlyph, mood === m.value && styles.moodGlyphActive]}>{m.emoji}</Text>
                  <Text style={[styles.moodLabel, mood === m.value && styles.moodLabelActive]}>{m.label}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {step === 'done' && (
        <View style={styles.bodyCenter}>
          <View style={styles.completeGlow}>
            <View style={styles.completeOrb}>
              <Text style={styles.completeStreak}>9</Text>
            </View>
          </View>
          <Text style={styles.completeEyebrow}>DAY 9 · STREAK INTACT</Text>
          <Text style={styles.completeTitle}>Thank you for the honest note.</Text>
          <Text style={styles.completeBody}>
            Every day you answer is a sentence in your story.
          </Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>SUGAR</Text>
              <Text style={styles.summaryValue}>{sugar === 'free' ? 'Clean' : sugar === 'some' ? 'A little' : 'Slip'}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>MOOD</Text>
              <Text style={styles.summaryValue}>{MOODS.find((x) => x.value === mood)?.label}</Text>
            </View>
          </View>

          <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
            <PillCTA label="Back to today" onPress={() => router.dismiss()} />
          </View>
        </View>
      )}
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
  backBtn: {
    width: 44, height: 44, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 22, color: colors.onSurface, fontFamily: fonts.headlineLight, lineHeight: 22 },
  headerTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
  },
  stepIndicator: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  stepDot: {
    width: 8, height: 3, borderRadius: 2,
    backgroundColor: 'rgba(49,51,47,0.15)',
  },
  stepDotActive: { backgroundColor: colors.primary },

  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.sm },
  bodyCenter: { flex: 1, paddingHorizontal: spacing.lg, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },

  stepEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.md,
  },
  stepTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium + 2,
    color: colors.onSurface,
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  stepBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },

  cardsCol: { gap: spacing.sm, marginTop: spacing.sm },
  optionCard: { padding: spacing.lg },
  optionCardActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  optionText: { flex: 1, gap: 2 },
  optionTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  optionBody: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  optionArrow: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  optionArrowActive: { backgroundColor: colors.primary },
  optionArrowText: { color: colors.onSurfaceVariant, fontSize: 16 },
  optionArrowTextActive: { color: colors.onPrimary },

  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  moodTile: {
    width: 100, height: 100, borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center', justifyContent: 'center',
    gap: 8,
  },
  moodTileActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primary,
  },
  moodGlyph: { fontSize: 32, color: colors.onSurface, fontFamily: fonts.headlineBold, lineHeight: 32 },
  moodGlyphActive: { color: colors.primary },
  moodLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
  },
  moodLabelActive: { color: colors.primary, fontFamily: fonts.bodySemibold },

  completeGlow: {
    width: 160, height: 160, borderRadius: radius.full,
    backgroundColor: 'rgba(165,60,48,0.08)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  completeOrb: {
    width: 110, height: 110, borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.4, shadowRadius: 30, shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  completeStreak: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.heroNumber,
    color: colors.onPrimary,
    letterSpacing: -2,
    lineHeight: 72,
  },
  completeEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.md,
  },
  completeTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    textAlign: 'center',
    letterSpacing: -0.8,
    lineHeight: 32,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    maxWidth: 300,
  },
  completeBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
    marginBottom: spacing.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xxl,
  },
  summaryItem: { alignItems: 'center', gap: 2 },
  summaryLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
  },
  summaryValue: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.onSurface,
  },
  summaryDivider: { width: 1, height: 28, backgroundColor: 'rgba(49,51,47,0.1)' },

  ctaWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: spacing.lg, alignItems: 'center' },
});

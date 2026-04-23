import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { GlassCard } from '../../components/ui/GlassCard';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';

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
  const completeCheckIn = useUserStore((s) => s.completeCheckIn);
  const streakDays = useUserStore((s) => s.streakDays);

  const onSugar = (s: Sugar) => {
    // Per UX-SPEC §4.2: Check-in submit = Medium impact
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSugar(s);
    setTimeout(() => setStep('mood'), 240);
  };
  const onMood = (m: Mood) => {
    // Per UX-SPEC §4.2: Check-in submit = Medium impact
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setMood(m);
    setTimeout(() => setStep('done'), 240);
  };

  // C3: On step 3 — actually persist the check-in via store, then celebrate
  // with Success notification haptic per UX-SPEC §4.2.
  useEffect(() => {
    if (step === 'done' && sugar) {
      completeCheckIn(sugar);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <AtmosphericGradient theme="dawn">
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="peach" size={320} style={styles.auraTopRight} intensity={0.5} drift={20} />
        <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={16} />
      </View>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(400)} style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable
          onPress={() => router.dismiss()}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Close check-in"
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Daily check-in</Text>
        <View style={styles.stepIndicator}>
          <View style={[styles.stepDot, (step === 'sugar' || step === 'mood' || step === 'done') && styles.stepDotActive]} />
          <View style={[styles.stepDot, (step === 'mood' || step === 'done') && styles.stepDotActive]} />
          <View style={[styles.stepDot, step === 'done' && styles.stepDotActive]} />
        </View>
      </Animated.View>

      {step === 'sugar' && (
        <View style={styles.body}>
          <Animated.View entering={FadeInUp.duration(400)} style={styles.stepGlyphWrap}>
            <DecorGlyph variant="flame" size={88} />
          </Animated.View>
          <Animated.Text entering={FadeInUp.delay(100).duration(400)} style={styles.stepEyebrow}>
            STEP 1 OF 3 · TONIGHT
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(150).duration(400)} style={styles.stepTitle}>
            How did the day go?
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(200).duration(400)} style={styles.stepBody}>
            Honest only. No streak is worth a lie.
          </Animated.Text>

          <View style={styles.cardsCol}>
            {SUGAR_OPTIONS.map((opt, idx) => (
              <Animated.View key={opt.key} entering={FadeInDown.delay(250 + idx * 80).duration(400)}>
                <Pressable
                  onPress={() => onSugar(opt.key)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: sugar === opt.key }}
                  accessibilityLabel={`${opt.title} — ${opt.body}`}
                >
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
              </Animated.View>
            ))}
          </View>
        </View>
      )}

      {step === 'mood' && (
        <View style={styles.body}>
          <Animated.View entering={FadeInUp.duration(400)} style={styles.stepGlyphWrap}>
            <DecorGlyph variant="heart" size={88} />
          </Animated.View>
          <Animated.Text entering={FadeInUp.delay(100).duration(400)} style={styles.stepEyebrow}>
            STEP 2 OF 3
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(150).duration(400)} style={styles.stepTitle}>
            How are you feeling?
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(200).duration(400)} style={styles.stepBody}>
            Tap the closest one.
          </Animated.Text>

          <Animated.View entering={FadeInDown.delay(280).duration(400)} style={styles.moodGrid}>
            {MOODS.map((m) => (
              <Pressable
                key={m.value}
                onPress={() => onMood(m.value)}
                accessibilityRole="radio"
                accessibilityState={{ selected: mood === m.value }}
                accessibilityLabel={`Mood: ${m.label}`}
              >
                <View style={[styles.moodTile, mood === m.value && styles.moodTileActive]}>
                  <Text style={[styles.moodGlyph, mood === m.value && styles.moodGlyphActive]}>{m.emoji}</Text>
                  <Text style={[styles.moodLabel, mood === m.value && styles.moodLabelActive]}>{m.label}</Text>
                </View>
              </Pressable>
            ))}
          </Animated.View>
        </View>
      )}

      {step === 'done' && (
        <View style={styles.bodyCenter}>
          <Animated.View entering={FadeInUp.duration(450)} style={styles.completeGlyphOverlay}>
            <DecorGlyph variant="orbit" size={200} />
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(80).duration(450)} style={styles.completeGlow}>
            <View style={styles.completeOrb}>
              <Text style={styles.completeStreak}>{streakDays}</Text>
            </View>
          </Animated.View>
          <Animated.Text entering={FadeInUp.delay(180).duration(400)} style={styles.completeEyebrow}>
            {`DAY ${streakDays} · STREAK INTACT`}
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(240).duration(400)} style={styles.completeTitle}>
            Thank you for the honest note.
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(300).duration(400)} style={styles.completeBody}>
            Every day you answer is a sentence in your story.
          </Animated.Text>

          <Animated.View entering={FadeInDown.delay(360).duration(400)} style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>SUGAR</Text>
              <Text style={styles.summaryValue}>{sugar === 'free' ? 'Clean' : sugar === 'some' ? 'A little' : 'Slip'}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>MOOD</Text>
              <Text style={styles.summaryValue}>{MOODS.find((x) => x.value === mood)?.label}</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(420).duration(400)} style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
            <PillCTA label="Back to today" onPress={() => router.dismiss()} />
          </Animated.View>
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

  // Background aura layer
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -80,
    right: -110,
  },
  auraBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -100,
  },

  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.sm },
  bodyCenter: { flex: 1, paddingHorizontal: spacing.lg, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  stepGlyphWrap: {
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  completeGlyphOverlay: {
    position: 'absolute',
    top: '18%',
    opacity: 0.35,
  },

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

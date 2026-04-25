import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore, type Consumption } from '../../../stores/useUserStore';

/**
 * 1.8 Quiz: Consumption — 5-level scale.
 */
export default function QuizConsumption() {
  const insets = useSafeAreaInsets();
  const stored = useUserStore((s) => s.consumption);
  const setConsumption = useUserStore((s) => s.setConsumption);
  const [selected, setSelected] = useState<Consumption | null>(stored);

  const levels: { key: Consumption; title: string; hint: string }[] = [
    { key: 'little',   title: 'A little',        hint: 'Barely registers most days' },
    { key: 'moderate', title: 'Moderate',        hint: 'Shows up, not overwhelming' },
    { key: 'alot',     title: 'A lot',           hint: 'Regular loud visits' },
    { key: 'great',    title: 'A great deal',    hint: 'Most afternoons, most days' },
    { key: 'runs',     title: 'It runs my day',  hint: 'The sugar plans the hours' },
  ];

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
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>STEP 8 OF 15</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>YOUR INTAKE</Text>
        <Text style={styles.hero}>How much sugar runs through your week?</Text>
        <Text style={styles.sub}>Be honest. Only you see this.</Text>

        <View style={styles.optionsCol}>
          {levels.map((l, i) => {
            const isOn = selected === l.key;
            return (
              <Pressable
                key={l.key}
                onPress={() => pick(l.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: isOn }}
                accessibilityLabel={`${l.title}. ${l.hint}`}
              >
                <GlassCard
                  tint={isOn ? 'peach' : 'default'}
                  style={[styles.optionCard, isOn && styles.optionCardOn]}
                >
                  <View style={styles.optionRow}>
                    <Text style={[styles.levelIndex, isOn && styles.levelIndexOn]}>
                      {String(i + 1).padStart(2, '0')}
                    </Text>
                    <View style={styles.optionTextCol}>
                      <Text style={[styles.optionTitle, isOn && styles.optionTitleOn]}>{l.title}</Text>
                      <Text style={styles.optionHint}>{l.hint}</Text>
                    </View>
                  </View>
                </GlassCard>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label="Continue"
          variant="onboarding"
          onPress={handleContinue}
          disabled={!selected}
        />
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  backBtn: { width: 40, height: 40, borderRadius: radius.full, backgroundColor: 'rgba(49,51,47,0.06)', alignItems: 'center', justifyContent: 'center' },
  back: { fontSize: 22, color: colors.onSurface, lineHeight: 22 },
  progressLabel: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.onSurfaceVariant, letterSpacing: tracking.labelWide },
  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, gap: spacing.sm },
  eyebrow: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.primary, letterSpacing: tracking.labelWide },
  hero: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium + 2, color: colors.onSurface, letterSpacing: -0.8, lineHeight: 34, marginTop: spacing.sm },
  sub: { fontFamily: fonts.body, fontSize: typeScale.bodyLarge, color: colors.onSurfaceVariant, lineHeight: 22, marginBottom: spacing.lg },
  optionsCol: { gap: spacing.sm },
  optionCard: { padding: spacing.md },
  optionCardOn: { borderColor: colors.primary, borderWidth: 1.5 },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  levelIndex: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleLarge,
    color: colors.outlineVariant,
    letterSpacing: -0.5,
    width: 36,
  },
  levelIndexOn: { color: colors.primary },
  optionTextCol: { flex: 1, gap: 2 },
  optionTitle: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleMedium, color: colors.onSurface },
  optionTitleOn: { color: colors.primary },
  optionHint: { fontFamily: fonts.bodyLight, fontSize: typeScale.bodySmall, color: colors.onSurfaceVariant },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

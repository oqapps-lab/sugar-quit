import * as Haptics from 'expo-haptics';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore, type Consumption } from '../../../stores/useUserStore';
import { t } from '../../../lib/i18n';

/**
 * 1.8 Quiz: Consumption — 5-level scale.
 */
export default function QuizConsumption() {
  const insets = useSafeAreaInsets();
  const stored = useUserStore((s) => s.consumption);
  const setConsumption = useUserStore((s) => s.setConsumption);
  const [selected, setSelected] = useState<Consumption | null>(stored);
  // Re-sync local selection when screen regains focus (back-nav from later
  // quiz step shouldn't show stale state).
  useFocusEffect(useCallback(() => { setSelected(stored); }, [stored]));

  const levels: { key: Consumption; title: string; hint: string }[] = [
    { key: 'little',   title: t('onboarding.quiz_consumption.level_little'),        hint: t('onboarding.quiz_consumption.level_little_hint') },
    { key: 'moderate', title: t('onboarding.quiz_consumption.level_moderate'),        hint: t('onboarding.quiz_consumption.level_moderate_hint') },
    { key: 'alot',     title: t('onboarding.quiz_consumption.level_alot'),           hint: t('onboarding.quiz_consumption.level_alot_hint') },
    { key: 'great',    title: t('onboarding.quiz_consumption.level_great'),    hint: t('onboarding.quiz_consumption.level_great_hint') },
    { key: 'runs',     title: t('onboarding.quiz_consumption.level_runs'),  hint: t('onboarding.quiz_consumption.level_runs_hint') },
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
        <Text style={styles.progressLabel}>{t('onboarding.quiz.step_of_15', { n: '8' })}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>{t('onboarding.quiz_consumption.eyebrow')}</Text>
        <Text style={styles.hero}>{t('onboarding.quiz_consumption.hero')}</Text>
        <Text style={styles.sub}>{t('onboarding.quiz_consumption.sub')}</Text>

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
          label={t('common.continue')}
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
  back: { fontSize: 22, color: colors.onSurface, includeFontPadding: false, textAlignVertical: 'center' },
  progressLabel: { fontFamily: fonts.label, fontSize: typeScale.label, color: colors.onSurface, letterSpacing: tracking.label },
  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, gap: spacing.sm },
  eyebrow: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.primary, letterSpacing: tracking.labelWide },
  hero: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium + 2, color: colors.onSurface, letterSpacing: -0.8, lineHeight: 38, marginTop: spacing.sm },
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

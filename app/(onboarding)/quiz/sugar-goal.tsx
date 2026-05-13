import * as Haptics from 'expo-haptics';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore, type Goal } from '../../../stores/useUserStore';
import { t } from '../../../lib/i18n';

/**
 * 1.4 Quiz: Sugar Goal — "How do you want to move?" (single-select, 2 options).
 */
export default function QuizSugarGoal() {
  const insets = useSafeAreaInsets();
  const setGoal = useUserStore((s) => s.setGoal);
  const storedGoal = useUserStore((s) => s.goal);
  const [selected, setSelected] = useState<Goal | null>(storedGoal);
  useFocusEffect(useCallback(() => { setSelected(storedGoal); }, [storedGoal]));

  // Tint must NOT be 'peach' for unselected — that's our selected-state color.
  const options: { key: Goal; title: string; body: string; tint: 'default' | 'mint' }[] = [
    { key: 'quit',   title: t('onboarding.quiz_sugar_goal.opt_quit_title'), body: t('onboarding.quiz_sugar_goal.opt_quit_body') , tint: 'default' },
    { key: 'reduce', title: t('onboarding.quiz_sugar_goal.opt_reduce_title'),    body: t('onboarding.quiz_sugar_goal.opt_reduce_body')    , tint: 'mint' },
  ];

  const pick = (key: Goal) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(key);
  };

  const handleContinue = () => {
    if (!selected) return;
    setGoal(selected);
    router.push('/(onboarding)/motivational-1');
  };

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>{t('onboarding.quiz.step_of_15', { n: '4' })}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>{t('onboarding.quiz_sugar_goal.eyebrow')}</Text>
        <Text style={styles.hero}>{t('onboarding.quiz_sugar_goal.hero')}</Text>
        <Text style={styles.sub}>{t('onboarding.quiz_sugar_goal.sub')}</Text>

        <View style={styles.optionsCol}>
          {options.map((o) => {
            const isOn = selected === o.key;
            return (
              <Pressable
                key={o.key}
                onPress={() => pick(o.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: isOn }}
                accessibilityLabel={o.title}
              >
                <GlassCard tint={o.tint} style={[styles.optionCard, isOn && styles.optionCardOn]}>
                  <Text style={[styles.optionTitle, isOn && styles.optionTitleOn]}>{o.title}</Text>
                  <Text style={styles.optionBody}>{o.body}</Text>
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
  optionsCol: { gap: spacing.md },
  optionCard: { padding: spacing.lg, gap: spacing.xs },
  optionCardOn: { borderColor: colors.primary, borderWidth: 1.5 },
  optionTitle: { fontFamily: fonts.headlineBold, fontSize: typeScale.titleLarge, color: colors.onSurface, letterSpacing: -0.3 },
  optionTitleOn: { color: colors.primary },
  optionBody: { fontFamily: fonts.bodyLight, fontSize: typeScale.bodyMedium, color: colors.onSurfaceVariant, lineHeight: 20 },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

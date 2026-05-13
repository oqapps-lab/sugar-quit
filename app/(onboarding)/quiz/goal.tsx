import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';
import { t } from '../../../lib/i18n';

type GoalOption = 'quit' | 'reduce';

/**
 * 1.2 Quiz: Goal — "What's the shape of your goal?" (single-select, 2 options).
 * Consistent pattern with Step 4 (sugar-goal): pick → visible selection →
 * explicit Continue.
 *
 * Earlier this had a third "I'm exploring" option that mapped to no value
 * in the store (the Goal type union is `'quit' | 'reduce'`), leaving Profile
 * showing "Goal — —" forever. Dropped — the user can revisit goal in
 * Profile/Edit.
 */
export default function QuizGoal() {
  const insets = useSafeAreaInsets();
  const setGoal = useUserStore((s) => s.setGoal);
  const [selected, setSelected] = useState<GoalOption | null>(null);

  const options: { key: GoalOption; title: string; body: string }[] = [
    { key: 'quit',    title: t('onboarding.quiz_goal.opt_quit_title'),  body: t('onboarding.quiz_goal.opt_quit_body') },
    { key: 'reduce',  title: t('onboarding.quiz_goal.opt_reduce_title'), body: t('onboarding.quiz_goal.opt_reduce_body') },
  ];

  const pick = (key: GoalOption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(key);
  };

  const handleContinue = () => {
    if (!selected) return;
    setGoal(selected);
    router.push('/(onboarding)/quiz/motivation');
  };

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>{t('onboarding.quiz.step_of_15', { n: '2' })}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>{t('onboarding.quiz_goal.eyebrow')}</Text>
        <Text style={styles.hero}>{t('onboarding.quiz_goal.hero')}</Text>
        <Text style={styles.sub}>{t('onboarding.quiz_goal.sub')}</Text>

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
                <GlassCard tint={isOn ? 'peach' : 'default'} style={[styles.optionCard, isOn && styles.optionCardOn]}>
                  <Text style={[styles.optionTitle, isOn && styles.optionTitleOn]}>{o.title}</Text>
                  <Text style={styles.optionBody}>{o.body}</Text>
                </GlassCard>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label={t('common.continue')} variant="onboarding" onPress={handleContinue} disabled={!selected} />
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
  optionCard: { padding: spacing.md + 2, gap: 2 },
  optionCardOn: { borderColor: colors.primary, borderWidth: 1.5 },
  optionTitle: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleMedium, color: colors.onSurface },
  optionTitleOn: { color: colors.primary },
  optionBody: { fontFamily: fonts.bodyLight, fontSize: typeScale.bodyMedium, color: colors.onSurfaceVariant, lineHeight: 18 },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

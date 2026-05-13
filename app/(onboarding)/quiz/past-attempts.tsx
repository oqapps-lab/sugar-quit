import * as Haptics from 'expo-haptics';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore, type PastAttempts } from '../../../stores/useUserStore';
import { t } from '../../../lib/i18n';

/**
 * 1.10 Quiz: Past Attempts — 4 options, single-select.
 */
export default function QuizPastAttempts() {
  const insets = useSafeAreaInsets();
  const stored = useUserStore((s) => s.pastAttempts);
  const setPastAttempts = useUserStore((s) => s.setPastAttempts);
  const [selected, setSelected] = useState<PastAttempts | null>(stored);
  useFocusEffect(useCallback(() => { setSelected(stored); }, [stored]));

  const options: { key: PastAttempts; title: string; body: string }[] = [
    { key: 'first',  title: t('onboarding.quiz_past.opt_first_title'),  body: t('onboarding.quiz_past.opt_first_body') },
    { key: 'short',  title: t('onboarding.quiz_past.opt_short_title'),         body: t('onboarding.quiz_past.opt_short_body') },
    { key: 'longer', title: t('onboarding.quiz_past.opt_longer_title'),      body: t('onboarding.quiz_past.opt_longer_body') },
    { key: 'many',   title: t('onboarding.quiz_past.opt_many_title'),                 body: t('onboarding.quiz_past.opt_many_body') },
  ];

  const pick = (key: PastAttempts) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(key);
  };

  const handleContinue = () => {
    if (!selected) return;
    setPastAttempts(selected);
    router.push('/(onboarding)/quiz/work-environment');
  };

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>{t('onboarding.quiz.step_of_15', { n: '10' })}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>{t('onboarding.quiz_past.eyebrow')}</Text>
        <Text style={styles.hero}>{t('onboarding.quiz_past.hero')}</Text>
        <Text style={styles.sub}>{t('onboarding.quiz_past.sub')}</Text>

        <View style={styles.optionsCol}>
          {options.map((o) => {
            const isOn = selected === o.key;
            return (
              <Pressable
                key={o.key}
                onPress={() => pick(o.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: isOn }}
                accessibilityLabel={`${o.title}. ${o.body}`}
              >
                <GlassCard
                  tint={isOn ? 'peach' : 'default'}
                  style={[styles.optionCard, isOn && styles.optionCardOn]}
                >
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
  optionsCol: { gap: spacing.sm },
  optionCard: { padding: spacing.md + 2, gap: 2 },
  optionCardOn: { borderColor: colors.primary, borderWidth: 1.5 },
  optionTitle: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleMedium, color: colors.onSurface },
  optionTitleOn: { color: colors.primary },
  optionBody: { fontFamily: fonts.bodyLight, fontSize: typeScale.bodyMedium, color: colors.onSurfaceVariant, lineHeight: 18 },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

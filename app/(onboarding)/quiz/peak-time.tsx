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

const TIME_BY_KEY: Record<string, string> = {
  morning: '9:00 AM',
  afternoon: '3:00 PM',
  evening: '7:00 PM',
  night: '11:00 PM',
};

/**
 * 1.6 Quiz: Peak Time — "When does it hit hardest?" 4 chips + default time.
 */
export default function QuizPeakTime() {
  const insets = useSafeAreaInsets();
  const setPeakHour = useUserStore((s) => s.setPeakHour);
  const [selected, setSelected] = useState<string>('afternoon');

  const chips = [
    { key: 'morning',   label: t('onboarding.quiz_peak.chip_morning')   },
    { key: 'afternoon', label: t('onboarding.quiz_peak.chip_afternoon') },
    { key: 'evening',   label: t('onboarding.quiz_peak.chip_evening')   },
    { key: 'night',     label: t('onboarding.quiz_peak.chip_night')     },
  ];

  const pick = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(key);
  };

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>{t('onboarding.quiz.step_of_15', { n: '6' })}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>{t('onboarding.quiz_peak.eyebrow')}</Text>
        <Text style={styles.hero}>{t('onboarding.quiz_peak.hero')}</Text>
        <Text style={styles.sub}>{t('onboarding.quiz_peak.sub')}</Text>

        <View style={styles.chipsRow}>
          {chips.map((c) => {
            const isOn = selected === c.key;
            return (
              <Pressable
                key={c.key}
                onPress={() => pick(c.key)}
                style={[styles.chip, isOn && styles.chipOn]}
                accessibilityRole="button"
                accessibilityState={{ selected: isOn }}
                accessibilityLabel={c.label}
              >
                <Text style={[styles.chipLabel, isOn && styles.chipLabelOn]}>{c.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <GlassCard tint="peach" style={styles.timeCard}>
          <Text style={styles.timeEyebrow}>{t('onboarding.quiz_peak.time_eyebrow')}</Text>
          <Text style={styles.timeBig}>{TIME_BY_KEY[selected] ?? '3:00 PM'}</Text>
          <Text style={styles.timeHint}>{t('onboarding.quiz_peak.time_hint')}</Text>
        </GlassCard>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label={t('common.continue')}
          variant="onboarding"
          onPress={() => {
            setPeakHour(TIME_BY_KEY[selected] ?? '3:00 PM');
            router.push('/(onboarding)/quiz/triggers');
          }}
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
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(49,51,47,0.08)',
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall + 1,
    color: colors.onSurface,
    letterSpacing: tracking.label,
  },
  chipLabelOn: { color: colors.onPrimary },
  timeCard: { padding: spacing.lg, alignItems: 'center', gap: spacing.xs },
  timeEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  timeBig: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge,
    color: colors.onSurface,
    letterSpacing: -1.2,
  },
  timeHint: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodySmall,
    color: colors.onSurfaceVariant,
  },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

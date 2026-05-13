import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';
import { t } from '../../../lib/i18n';

/**
 * 1.7 Quiz: Triggers — multi-select 6 options.
 */
export default function QuizTriggers() {
  const insets = useSafeAreaInsets();
  const setTriggers = useUserStore((s) => s.setTriggers);
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    { key: 'stress',   title: t('triggers.stress') },
    { key: 'boredom',  title: t('triggers.boredom') },
    { key: 'meals',    title: t('triggers.meals') },
    { key: 'social',   title: t('triggers.social') },
    { key: 'emotions', title: t('triggers.emotion') },
    { key: 'night',    title: t('triggers.night') },
  ];

  const toggle = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));
  };

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>{t('onboarding.quiz.step_of_15', { n: '7' })}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>{t('onboarding.quiz_triggers.eyebrow')}</Text>
        <Text style={styles.hero}>{t('onboarding.quiz_triggers.hero')}</Text>
        <Text style={styles.sub}>{t('onboarding.quiz_triggers.sub')}</Text>

        <View style={styles.grid}>
          {options.map((o) => {
            const isOn = selected.includes(o.key);
            return (
              // Plain Pressable + View instead of GlassCard — iOS BlurView
              // (expo-blur) does NOT honor RN's pointerEvents on its host
              // UIVisualEffectView, so any touchable nested in or wrapping a
              // GlassCard is silently swallowed. Use a flat semi-transparent
              // background to approximate the glass tint.
              <Pressable
                key={o.key}
                style={[
                  styles.gridItem,
                  styles.optionCard,
                  isOn ? styles.optionCardOn : styles.optionCardOff,
                ]}
                onPress={() => toggle(o.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: isOn }}
                accessibilityLabel={`${o.title}${isOn ? ', selected' : ''}`}
                hitSlop={4}
              >
                <Text style={[styles.optionTitle, isOn && styles.optionTitleOn]}>{o.title}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label={t('common.continue')}
          variant="onboarding"
          disabled={selected.length === 0}
          onPress={() => {
            if (selected.length === 0) return;
            setTriggers(selected);
            router.push('/(onboarding)/quiz/consumption');
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  gridItem: { width: '48.5%' },
  optionCard: {
    paddingVertical: spacing.md + 4,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  optionCardOff: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderColor: 'rgba(255,255,255,0.5)',
  },
  optionCardOn: {
    backgroundColor: 'rgba(255,172,160,0.4)',
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  optionTitle: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleMedium, color: colors.onSurface },
  optionTitleOn: { color: colors.primary },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';

/**
 * 1.10 Quiz: Past Attempts — 4 options, single-select.
 */
export default function QuizPastAttempts() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { key: 'first',  title: 'This is my first real try',  body: 'Starting fresh.' },
    { key: 'short',  title: 'A few times, short',         body: 'Days, not weeks.' },
    { key: 'longer', title: 'Once or twice, longer',      body: 'Weeks, even months.' },
    { key: 'many',   title: 'Many times',                 body: 'Cycled in and out.' },
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
        <Text style={styles.progressLabel}>STEP 10 OF 15</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>YOUR HISTORY</Text>
        <Text style={styles.hero}>Have you tried to quit before?</Text>
        <Text style={styles.sub}>Everything you've tried is information.</Text>

        <View style={styles.optionsCol}>
          {options.map((o) => {
            const isOn = selected === o.key;
            return (
              <Pressable key={o.key} onPress={() => pick(o.key)}>
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
          label="Continue"
          variant="onboarding"
          onPress={() => router.push('/(onboarding)/quiz/work-environment')}
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
  optionCard: { padding: spacing.md + 2, gap: 2 },
  optionCardOn: { borderColor: colors.primary, borderWidth: 1.5 },
  optionTitle: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleMedium, color: colors.onSurface },
  optionTitleOn: { color: colors.primary },
  optionBody: { fontFamily: fonts.bodyLight, fontSize: typeScale.bodyMedium, color: colors.onSurfaceVariant, lineHeight: 18 },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

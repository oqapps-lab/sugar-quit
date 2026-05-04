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

/**
 * 1.3 Quiz: Motivation — "What's pulling you here?" (multi-select, min 1).
 */
export default function QuizMotivation() {
  const insets = useSafeAreaInsets();
  const stored = useUserStore((s) => s.motivations);
  const setMotivations = useUserStore((s) => s.setMotivations);
  const [selected, setSelected] = useState<string[]>(stored);

  const options = [
    { key: 'health',   title: 'Health is asking me to',   tint: 'peach' as const },
    { key: 'energy',   title: 'I want clearer energy',    tint: 'default' as const },
    { key: 'body',     title: 'My body feels different',  tint: 'mint' as const },
    { key: 'cost',     title: "It's costing too much",    tint: 'default' as const },
    { key: 'charge',   title: 'I just want to feel in charge', tint: 'peach' as const },
  ];

  const toggle = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));
  };

  const handleContinue = () => {
    if (selected.length === 0) return;
    setMotivations(selected);
    router.push('/(onboarding)/quiz/sugar-goal');
  };

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>STEP 3 OF 15</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>YOUR MOTIVATION</Text>
        <Text style={styles.hero}>What's pulling you here?</Text>
        <Text style={styles.sub}>Pick any that feel true. Choose more than one.</Text>

        <View style={styles.optionsCol}>
          {options.map((o) => {
            const isOn = selected.includes(o.key);
            return (
              <Pressable
                key={o.key}
                onPress={() => toggle(o.key)}
                accessibilityRole="button"
                accessibilityState={{ checked: isOn }}
                accessibilityLabel={o.title}
              >
                <GlassCard tint={isOn ? 'peach' : o.tint} style={[styles.optionCard, isOn && styles.optionCardOn]}>
                  <View style={styles.optionRow}>
                    <Text style={[styles.optionTitle, isOn && styles.optionTitleOn]}>{o.title}</Text>
                    <View style={[styles.checkDot, isOn && styles.checkDotOn]}>
                      {isOn ? <Text style={styles.checkGlyph}>✓</Text> : null}
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
          disabled={selected.length === 0}
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
  hero: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium + 2, color: colors.onSurface, letterSpacing: -0.8, lineHeight: 38, marginTop: spacing.sm },
  sub: { fontFamily: fonts.body, fontSize: typeScale.bodyLarge, color: colors.onSurfaceVariant, lineHeight: 22, marginBottom: spacing.lg },
  optionsCol: { gap: spacing.sm },
  optionCard: { padding: spacing.md + 2 },
  optionCardOn: { borderColor: colors.primary, borderWidth: 1.5 },
  optionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  optionTitle: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleMedium, color: colors.onSurface, flex: 1 },
  optionTitleOn: { color: colors.primary },
  checkDot: { width: 22, height: 22, borderRadius: radius.full, borderWidth: 1.5, borderColor: 'rgba(49,51,47,0.25)', alignItems: 'center', justifyContent: 'center' },
  checkDotOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkGlyph: { color: colors.onPrimary, fontSize: 12, fontFamily: fonts.headlineBold },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

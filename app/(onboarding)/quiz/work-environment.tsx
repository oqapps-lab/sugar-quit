import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore, type WorkEnvironment } from '../../../stores/useUserStore';

/**
 * 1.11 Quiz: Work Environment — 4 options in 2×2 grid.
 */
export default function QuizWorkEnvironment() {
  const insets = useSafeAreaInsets();
  const stored = useUserStore((s) => s.workEnvironment);
  const setWorkEnvironment = useUserStore((s) => s.setWorkEnvironment);
  const [selected, setSelected] = useState<WorkEnvironment | null>(stored);

  const options: { key: WorkEnvironment; title: string; glyph: string; tint: 'default' | 'mint' | 'peach' }[] = [
    { key: 'office', title: 'Office',      glyph: '▢', tint: 'default' },
    { key: 'home',   title: 'Home',        glyph: '△', tint: 'mint' },
    { key: 'feet',   title: 'On my feet',  glyph: '◇', tint: 'peach' },
    { key: 'mobile', title: 'Mobile',      glyph: '◯', tint: 'default' },
  ];

  const pick = (key: WorkEnvironment) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(key);
  };

  const handleContinue = () => {
    if (!selected) return;
    setWorkEnvironment(selected);
    router.push('/(onboarding)/quiz/name');
  };

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>STEP 11 OF 15</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>YOUR DAYS</Text>
        <Text style={styles.hero}>Where do you spend your days?</Text>
        <Text style={styles.sub}>Context shapes the cravings we'll watch for.</Text>

        <View style={styles.grid}>
          {options.map((o) => {
            const isOn = selected === o.key;
            return (
              <Pressable
                key={o.key}
                style={styles.gridItem}
                onPress={() => pick(o.key)}
                accessibilityRole="radio"
                accessibilityState={{ selected: isOn }}
                accessibilityLabel={o.title}
              >
                <GlassCard
                  tint={isOn ? 'peach' : o.tint}
                  style={[styles.optionCard, isOn && styles.optionCardOn]}
                >
                  <Text style={[styles.optionGlyph, isOn && styles.optionGlyphOn]}>{o.glyph}</Text>
                  <Text style={[styles.optionTitle, isOn && styles.optionTitleOn]}>{o.title}</Text>
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  gridItem: { width: '48.5%' },
  optionCard: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 120,
    justifyContent: 'center',
  },
  optionCardOn: { borderColor: colors.primary, borderWidth: 1.5 },
  optionGlyph: {
    fontSize: 32,
    color: colors.onSurfaceVariant,
    fontFamily: fonts.headlineLight,
  },
  optionGlyphOn: { color: colors.primary },
  optionTitle: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleMedium, color: colors.onSurface },
  optionTitleOn: { color: colors.primary },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

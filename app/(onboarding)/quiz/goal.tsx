import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

/**
 * 1.2 Quiz: Goal — "What's the shape of your goal?"
 * SKELETON — will be fleshed out by onboarding agent.
 */
export default function QuizGoal() {
  const insets = useSafeAreaInsets();
  const setGoal = useUserStore((s) => s.setGoal);

  const options = [
    { key: 'quit',    title: 'Quit completely',  body: 'Zero added sugar, for my reasons.' },
    { key: 'reduce',  title: 'Reduce gradually', body: 'Less sugar, more often, better mood.' },
    { key: 'explore', title: "I'm exploring",    body: "Not sure yet. Show me what's possible." },
  ];

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>STEP 2 OF 15</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>YOUR GOAL</Text>
        <Text style={styles.hero}>What's the shape of your goal?</Text>
        <Text style={styles.sub}>Choose what fits. You can change this later.</Text>

        <View style={styles.optionsCol}>
          {options.map((o) => (
            <Pressable
              key={o.key}
              onPress={() => {
                if (o.key === 'quit' || o.key === 'reduce') setGoal(o.key);
                router.push('/(onboarding)/quiz/motivation');
              }}
              accessibilityRole="radio"
              accessibilityLabel={o.title}
            >
              <GlassCard tint="default" style={styles.optionCard}>
                <Text style={styles.optionTitle}>{o.title}</Text>
                <Text style={styles.optionBody}>{o.body}</Text>
              </GlassCard>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Continue" variant="onboarding" onPress={() => router.push('/(onboarding)/quiz/motivation')} />
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
  optionTitle: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleMedium, color: colors.onSurface },
  optionBody: { fontFamily: fonts.bodyLight, fontSize: typeScale.bodyMedium, color: colors.onSurfaceVariant, lineHeight: 18 },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

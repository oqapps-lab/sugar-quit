import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { GradientText } from '../../components/ui/GradientText';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * 1.5 Motivational — "127,000 people have walked this path with us"
 * Editorial single-focus. No cards.
 */
export default function Motivational1() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>STEP 5 OF 15</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>YOU'RE NOT ALONE</Text>
        <GradientText style={styles.bigNumber} gradient="heroHorizontal">
          127,000
        </GradientText>
        <Text style={styles.headline}>
          people have walked this path with us
        </Text>
        <Text style={styles.sub}>
          Quiet mornings, tough afternoons, softer nights.
          You're stepping into good company.
        </Text>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label="Continue"
          variant="onboarding"
          onPress={() => router.push('/(onboarding)/quiz/peak-time')}
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
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: -spacing.xxl,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWidest,
    marginBottom: spacing.md,
  },
  bigNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.heroNumber,
    letterSpacing: -3,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: typeScale.heroNumber + 2,
  },
  headline: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.displaySmall,
    color: colors.onSurface,
    letterSpacing: -0.6,
    textAlign: 'center',
    lineHeight: 30,
    maxWidth: 320,
    marginTop: spacing.sm,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 320,
  },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

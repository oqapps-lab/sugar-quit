import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../components/ui/PillCTA';
import { TokenDot } from '../../components/ui/TokenDot';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * Welcome — first screen of onboarding flow (screen 1.1 from SCREEN-MAP).
 * Sunrise greens theme to match quiz flow.
 */
export default function Welcome() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.progressRail}>
          {[...Array(15)].map((_, i) => (
            <TokenDot key={i} filled={i === 0} size={5} />
          ))}
        </View>
        <Text style={styles.progressLabel}>STEP 1 OF 15 · ~3 MIN</Text>
      </View>

      <View style={styles.body}>
        {/* Illustration placeholder */}
        <View style={styles.illustration}>
          <View style={styles.illoCircle}>
            <View style={styles.illoCircleInner} />
          </View>
          <View style={[styles.illoCircle, styles.illoCircleSmall]}>
            <View style={[styles.illoCircleInner, { backgroundColor: colors.tertiaryContainer }]} />
          </View>
        </View>

        <Text style={styles.eyebrow}>SUGAR QUIT</Text>
        <Text style={styles.heroTitle}>
          Meet the quiet coach for your cravings
        </Text>
        <Text style={styles.heroSub}>
          Three minutes, and you'll have a 90-day plan for your body, your triggers,
          and the moment your hand reaches for sugar.
        </Text>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label="Begin"
          variant="onboarding"
          onPress={() => router.push('/(onboarding)/quiz/goal')}
          style={styles.cta}
        />
        <Pressable onPress={() => {}} style={styles.signInRow}>
          <Text style={styles.signInText}>
            Already walking? <Text style={styles.signInLink}>Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  progressRail: {
    flexDirection: 'row',
    gap: 5,
  },
  progressLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.xs,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: -spacing.xxl,
  },
  illustration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  illoCircle: {
    width: 120, height: 120,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255,172,160,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  illoCircleSmall: {
    width: 72, height: 72,
    marginLeft: -30,
    marginTop: 32,
    backgroundColor: 'rgba(207,224,223,0.5)',
  },
  illoCircleInner: {
    width: 52, height: 52,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    opacity: 0.9,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWidest,
    marginBottom: spacing.xs,
  },
  heroTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge,
    color: colors.onSurface,
    letterSpacing: -1.2,
    textAlign: 'center',
    lineHeight: 40,
    maxWidth: 320,
  },
  heroSub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 340,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    alignItems: 'center',
  },
  cta: { alignSelf: 'stretch' },
  signInRow: { padding: spacing.sm },
  signInText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  signInLink: {
    fontFamily: fonts.bodySemibold,
    color: colors.primary,
  },
});

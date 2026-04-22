import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';

/**
 * 2.3.2 Weekly Summary — "The Chapter".
 * Narrative week-report: 7-day curve, 3 stat numbers, pattern insight, next-week focus.
 * SKELETON.
 */
export default function Weekly() {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <AtmosphericGradient theme="dawn">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable
          onPress={handleBack}
          hitSlop={12}
          style={styles.headerSide}
          accessibilityRole="button"
          accessibilityLabel="Back to Progress tab"
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.headerCrumb}>Week 2 · 13–19 APR</Text>
        </Pressable>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>THE CHAPTER</Text>
        <Text style={styles.hero}>
          The week you stopped fearing the 3pm dip
        </Text>

        {/* Numbers row */}
        <GlassCard tint="default" style={styles.numbersCard}>
          <View style={styles.numbersRow}>
            <View style={styles.numberBlock}>
              <Text style={styles.numberBig}>6</Text>
              <Text style={styles.numberLabel}>met</Text>
            </View>
            <View style={styles.numberDivider} />
            <View style={styles.numberBlock}>
              <Text style={styles.numberBig}>5</Text>
              <Text style={styles.numberLabel}>walked through</Text>
            </View>
            <View style={styles.numberDivider} />
            <View style={styles.numberBlock}>
              <Text style={styles.numberBig}>1</Text>
              <Text style={styles.numberLabel}>given to</Text>
            </View>
          </View>
        </GlassCard>

        {/* Flowing curve card (static rect stand-in) */}
        <GlassCard tint="lavender" style={styles.curveCard}>
          <Text style={styles.sectionLabel}>YOUR WEEK IN ONE BREATH</Text>
          <View style={styles.curveBox}>
            <LinearGradient
              colors={['#ffaca0', '#efdbff', '#cfe0df']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.curveGradient}
            />
            <View style={styles.curveAxisRow}>
              <Text style={styles.curveAxisLabel}>MON</Text>
              <Text style={styles.curveAxisLabel}>SUN</Text>
            </View>
          </View>
          <Text style={styles.curveCaption}>
            Intensity softened after Wednesday. The curve found a rhythm.
          </Text>
        </GlassCard>

        {/* Pattern card — sage/mint tint */}
        <GlassCard tint="mint" style={styles.patternCard}>
          <Text style={[styles.sectionLabel, { color: colors.onTertiaryContainer }]}>
            A PATTERN EMERGED
          </Text>
          <Text style={styles.patternTitle}>
            Your stress-trigger dropped by 30%.
          </Text>
          <Text style={styles.patternBody}>
            Boredom-cravings leading: 2 of 6. A new front opens.
          </Text>
        </GlassCard>

        {/* Next week focus — saturated peach */}
        <GlassCard tint="peach" style={styles.nextCard}>
          <Text style={styles.nextEyebrow}>NEXT WEEK · MEETING YOUR TRIGGERS</Text>
          <Text style={styles.nextTitle}>
            Bring curiosity to the boredom window.
          </Text>
          <Text style={styles.nextBody}>
            Three micro-rituals for the 2–4pm lull. Short reads, no pressure.
          </Text>
          <View style={styles.nextChevronRow}>
            <Text style={styles.nextAction}>Preview the plan</Text>
            <Text style={styles.nextArrow}>→</Text>
          </View>
        </GlassCard>

        <View style={styles.ctaWrap}>
          <PillCTA
            label="Share this chapter"
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          />
        </View>
      </ScrollView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    zIndex: 10,
  },
  headerSide: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerSpacer: { width: 32 },
  backArrow: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    color: colors.onSurface,
  },
  headerCrumb: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
  },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, gap: spacing.lg },

  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.sm,
  },
  hero: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    letterSpacing: -0.8,
    lineHeight: 34,
    marginBottom: spacing.sm,
  },

  numbersCard: { padding: spacing.lg },
  numbersRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  numberBlock: { flex: 1, alignItems: 'center', gap: 2 },
  numberBig: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.primary,
    letterSpacing: -1,
  },
  numberLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
  },
  numberDivider: { width: 1, height: 36, backgroundColor: 'rgba(49,51,47,0.08)' },

  curveCard: { padding: spacing.lg, gap: spacing.sm },
  sectionLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.secondary,
    letterSpacing: tracking.labelWide,
  },
  curveBox: {
    height: 100,
    borderRadius: radius.sm,
    overflow: 'hidden',
    marginTop: spacing.xs,
    justifyContent: 'space-between',
    padding: spacing.sm,
  },
  curveGradient: { ...StyleSheet.absoluteFillObject },
  curveAxisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  curveAxisLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurface,
    letterSpacing: tracking.wide,
  },
  curveCaption: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginTop: spacing.xs,
  },

  patternCard: { padding: spacing.lg, gap: 4 },
  patternTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    color: colors.onTertiaryContainer,
    letterSpacing: -0.4,
    marginTop: 2,
  },
  patternBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onTertiaryContainer,
    lineHeight: 20,
    marginTop: 4,
  },

  nextCard: { padding: spacing.lg, gap: spacing.xs },
  nextEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onPrimaryContainer,
    letterSpacing: tracking.labelWide,
  },
  nextTitle: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleLarge,
    color: colors.onPrimaryContainer,
    letterSpacing: -0.4,
    marginTop: 2,
  },
  nextBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onPrimaryContainer,
    lineHeight: 20,
    marginTop: 2,
  },
  nextChevronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  nextAction: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },
  nextArrow: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },

  ctaWrap: { alignItems: 'center', marginTop: spacing.md },
});

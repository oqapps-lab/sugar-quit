import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';

/**
 * Lesson screen — Day 8 example. Editorial reading.
 */
export default function Lesson() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="dawn">
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerLabel}>DAY 8 OF 90</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Thin progress */}
      <View style={styles.progressRail}>
        <View style={[styles.progressFill, { width: `${(8 / 90) * 100}%` }]} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Text style={styles.lessonEyebrow}>CLARITY PHASE</Text>
        <Text style={styles.lessonTitle}>Your taste buds are waking up</Text>
        <Text style={styles.lessonMeta}>5 min · neuroscience + one practice</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Section 1 — What's happening */}
        <Text style={styles.sectionLabel}>WHAT'S HAPPENING</Text>
        <Text style={styles.body}>
          By day 8 without excess sugar, your taste receptors begin to recalibrate.
          Fruit will start tasting noticeably sweeter by day 14.
        </Text>
        <Text style={styles.body}>
          A 2019 University of Michigan study showed a 40% increase in perceived
          fruit sweetness after two weeks of sugar reduction.
        </Text>

        {/* Illustration placeholder */}
        <View style={styles.illustration}>
          <View style={styles.illoBloom} />
          <View style={[styles.illoBloom, styles.illoBloomSmall]} />
        </View>

        {/* Section 2 — Practice */}
        <Text style={styles.sectionLabel}>THE PRACTICE</Text>
        <Text style={styles.body}>
          Tonight, eat a fruit you used to find "not sweet enough" — a Granny Smith
          apple, a grapefruit, blueberries.
        </Text>
        <Text style={styles.body}>
          Notice. No judgment, no measuring. Just notice.
        </Text>

        {/* Section 3 — Mini-task (anchor card) */}
        <GlassCard tint="peach" style={styles.taskCard}>
          <Text style={styles.taskLabel}>TONIGHT'S NOTE</Text>
          <Text style={styles.taskTitle}>Rate the fruit's sweetness</Text>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <View key={n} style={[styles.ratingStone, n === 3 && styles.ratingStoneActive]}>
                <Text style={[styles.ratingStoneText, n === 3 && styles.ratingStoneTextActive]}>{n}</Text>
              </View>
            ))}
          </View>
          <View style={styles.ratingLabels}>
            <Text style={styles.ratingLabel}>sour</Text>
            <Text style={styles.ratingLabel}>sweet</Text>
          </View>
        </GlassCard>

        {/* Source */}
        <Text style={styles.source}>Source: Wise et al., 2019, Nutrients</Text>
      </ScrollView>

      {/* CTA */}
      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.md }]}>
        <PillCTA label="Mark lesson complete" onPress={() => router.back()} />
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 22, color: colors.onSurface, lineHeight: 22 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },

  progressRail: {
    height: 3,
    backgroundColor: 'rgba(49,51,47,0.08)',
    marginHorizontal: spacing.lg,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },

  lessonEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.secondary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.sm,
  },
  lessonTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge,
    color: colors.onSurface,
    letterSpacing: -1.2,
    lineHeight: 40,
    marginBottom: spacing.sm,
  },
  lessonMeta: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.lg,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(49,51,47,0.1)',
    marginVertical: spacing.lg,
  },

  sectionLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    lineHeight: 26,
    marginBottom: spacing.md,
  },

  illustration: {
    alignItems: 'center',
    marginVertical: spacing.xl,
    height: 120,
    justifyContent: 'center',
  },
  illoBloom: {
    width: 84, height: 84, borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    opacity: 0.7,
  },
  illoBloomSmall: {
    position: 'absolute',
    width: 52, height: 52,
    backgroundColor: colors.tertiaryContainer,
    left: '55%',
    top: '50%',
  },

  taskCard: { padding: spacing.lg, marginTop: spacing.lg, gap: spacing.sm },
  taskLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  taskTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    color: colors.onSurface,
    letterSpacing: -0.4,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  ratingStone: {
    width: 44, height: 44, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center', justifyContent: 'center',
  },
  ratingStoneActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ratingStoneText: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
  },
  ratingStoneTextActive: { color: colors.onPrimary },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  ratingLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
  },

  source: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.xl,
    fontStyle: 'italic',
  },

  ctaWrap: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});

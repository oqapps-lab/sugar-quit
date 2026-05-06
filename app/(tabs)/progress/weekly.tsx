import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../../components/primitives/Card';
import { Eyebrow } from '../../../components/primitives/Eyebrow';
import { PillCTA } from '../../../components/primitives/PillCTA';
import { Txt } from '../../../components/primitives/Txt';
import { colors, radius, spacing } from '../../../constants/tokens';

export default function Weekly() {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          hitSlop={12}
          style={styles.headerLeft}
          accessibilityRole="button"
          accessibilityLabel="Back to Progress tab"
        >
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Eyebrow color={colors.textSecondary}>Week 2 · 13–19 APR</Eyebrow>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow color={colors.primary} style={styles.eyebrow}>THE CHAPTER</Eyebrow>
        <Txt variant="displayMd" style={styles.hero}>
          The week you stopped fearing the 3pm dip
        </Txt>

        <Card bordered style={styles.numbersCard}>
          <View style={styles.numbersRow}>
            <View style={styles.numberBlock}>
              <Txt variant="displayMd" color={colors.primary} style={styles.numberBig}>6</Txt>
              <Txt variant="labelSm" color={colors.textSecondary}>met</Txt>
            </View>
            <View style={styles.numberDivider} />
            <View style={styles.numberBlock}>
              <Txt variant="displayMd" color={colors.primary} style={styles.numberBig}>5</Txt>
              <Txt variant="labelSm" color={colors.textSecondary}>walked through</Txt>
            </View>
            <View style={styles.numberDivider} />
            <View style={styles.numberBlock}>
              <Txt variant="displayMd" color={colors.primary} style={styles.numberBig}>1</Txt>
              <Txt variant="labelSm" color={colors.textSecondary}>given to</Txt>
            </View>
          </View>
        </Card>

        <Card bordered style={styles.curveCard}>
          <Eyebrow color={colors.textSecondary}>YOUR WEEK IN ONE BREATH</Eyebrow>
          <View style={styles.curveBox}>
            <View style={styles.curveGradient} />
            <View style={styles.curveAxisRow}>
              <Txt variant="labelSm" color={colors.onSurface}>MON</Txt>
              <Txt variant="labelSm" color={colors.onSurface}>SUN</Txt>
            </View>
          </View>
          <Txt variant="bodySm" color={colors.textSecondary} style={styles.curveCaption}>
            Intensity softened after Wednesday. The curve found a rhythm.
          </Txt>
        </Card>

        <Card bordered style={styles.patternCard}>
          <Eyebrow color={colors.success}>A PATTERN EMERGED</Eyebrow>
          <Txt variant="titleLg" color={colors.onSurface} style={styles.patternTitle}>
            Your stress-trigger dropped by 30%.
          </Txt>
          <Txt variant="bodyMd" color={colors.onSurface}>
            Boredom-cravings leading: 2 of 6. A new front opens.
          </Txt>
        </Card>

        <Card bordered style={styles.nextCard}>
          <Eyebrow color={colors.primary}>NEXT WEEK · MEETING YOUR TRIGGERS</Eyebrow>
          <Txt variant="titleLg" color={colors.onSurface} style={styles.nextTitle}>
            Bring curiosity to the boredom window.
          </Txt>
          <Txt variant="bodyMd" color={colors.onSurface}>
            Three micro-rituals for the 2–4pm lull. Short reads, no pressure.
          </Txt>
          <View style={styles.nextChevronRow}>
            <Txt variant="bodyMd" color={colors.primary}>Preview the plan</Txt>
            <Txt variant="bodyMd" color={colors.primary}>→</Txt>
          </View>
        </Card>

        <View style={styles.ctaWrap}>
          <PillCTA
            label="Share this chapter"
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  headerLeft: { minWidth: 72 },
  headerSpacer: { minWidth: 72 },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.md },

  eyebrow: { marginBottom: spacing.sm },
  hero: { letterSpacing: -0.8, lineHeight: 34, marginBottom: spacing.sm },

  numbersCard: {},
  numbersRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  numberBlock: { flex: 1, alignItems: 'center', gap: 2 },
  numberBig: { letterSpacing: -1 },
  numberDivider: { width: 1, height: 36, backgroundColor: colors.outline },

  curveCard: { gap: spacing.sm },
  curveBox: {
    height: 100,
    borderRadius: radius.sm,
    overflow: 'hidden',
    marginTop: spacing.xs,
    justifyContent: 'space-between',
    padding: spacing.sm,
    backgroundColor: colors.primaryContainer,
  },
  curveGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.primaryContainer, opacity: 0.6 },
  curveAxisRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1 },
  curveCaption: { lineHeight: 20, marginTop: spacing.xs },

  patternCard: { gap: spacing.xs },
  patternTitle: { letterSpacing: -0.4, marginTop: 2 },

  nextCard: { gap: spacing.xs },
  nextTitle: { letterSpacing: -0.4, marginTop: 2 },
  nextChevronRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },

  ctaWrap: { alignItems: 'center', marginTop: spacing.sm, paddingBottom: spacing.md },
});

import { router } from 'expo-router';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * 4.6 Rate app — after Day 7 milestone.
 * "A small ask." Five tappable stones.
 */

export default function RateApp() {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState<number | null>(null);

  const pickStone = (n: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRating(n);
  };

  return (
    <AtmosphericGradient theme="mistyPlum">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={{ width: 36 }} />
        <Pressable onPress={() => router.dismiss()} style={styles.closeBtn}>
          <Text style={styles.closeX}>×</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.eyebrow}>SEVEN DAYS IN</Text>
        <Text style={styles.title}>A small ask</Text>
        <Text style={styles.body}>
          If this week felt worth something, a rating helps other people find us. Completely optional.
        </Text>

        <View style={styles.stonesRow}>
          {[1, 2, 3, 4, 5].map((n) => {
            const active = rating !== null && rating >= n;
            return (
              <Pressable key={n} onPress={() => pickStone(n)} style={[styles.stone, active && styles.stoneActive]}>
                <Text style={[styles.stoneMark, active && styles.stoneMarkActive]}>●</Text>
              </Pressable>
            );
          })}
        </View>

        {rating !== null && (
          <Text style={styles.caption}>
            {rating >= 4 ? 'Thank you — that means a lot.' : 'Got it. Thanks for the honesty.'}
          </Text>
        )}
      </View>

      <View style={[styles.actions, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label="Leave a review on the App Store"
          onPress={() => router.dismiss()}
          disabled={rating === null}
        />
        <Pressable onPress={() => router.dismiss()} style={styles.laterBtn}>
          <Text style={styles.laterLabel}>Maybe later</Text>
        </Pressable>
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: { fontSize: 22, color: colors.onSurface, lineHeight: 22, fontFamily: fonts.headlineLight },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  title: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge,
    color: colors.onSurface,
    letterSpacing: -1,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 320,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },

  stonesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  stone: {
    width: 54, height: 54, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center', justifyContent: 'center',
  },
  stoneActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.3, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  stoneMark: {
    fontFamily: fonts.headlineBold,
    fontSize: 24,
    color: 'rgba(49,51,47,0.2)',
    lineHeight: 28,
  },
  stoneMarkActive: { color: colors.onPrimary },

  caption: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
    textAlign: 'center',
    marginTop: spacing.lg,
    fontStyle: 'italic',
  },

  actions: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  laterBtn: { padding: spacing.md },
  laterLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
});

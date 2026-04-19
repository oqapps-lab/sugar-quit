import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * Milestone Celebration — presented as full-screen modal.
 * Quiet fireworks, not loud. Soft petals, warm honey glow.
 */
export default function Milestone() {
  const insets = useSafeAreaInsets();

  return (
    <AtmosphericGradient theme="dawn">
      {/* Confetti dots - static placeholders */}
      <View style={styles.confettiLayer} pointerEvents="none">
        {[...Array(12)].map((_, i) => {
          const left = (i * 37) % 90;
          const top = (i * 23 + 15) % 60;
          const size = 4 + (i % 3) * 2;
          const color = [colors.primary, colors.primaryContainer, colors.secondaryFixedDim, colors.tertiaryContainer][i % 4];
          return (
            <View
              key={i}
              style={[
                styles.confetti,
                {
                  left: `${left}%`,
                  top: `${top}%`,
                  width: size, height: size,
                  backgroundColor: color,
                  opacity: 0.7,
                },
              ]}
            />
          );
        })}
      </View>

      <View style={[styles.content, { paddingTop: insets.top + spacing.xxl }]}>
        <Pressable onPress={() => router.dismiss()} style={styles.closeBtn}>
          <Text style={styles.closeX}>×</Text>
        </Pressable>

        <Text style={styles.eyebrow}>A MILESTONE</Text>

        {/* Hero number */}
        <View style={styles.heroOrb}>
          <View style={styles.heroGlow} />
          <Text style={styles.heroNumber}>30</Text>
        </View>

        <Text style={styles.milestoneTitle}>days sugar-free</Text>

        <View style={styles.divider} />

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>cravings met</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>$72</Text>
            <Text style={styles.statLabel}>saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>1.8kg</Text>
            <Text style={styles.statLabel}>sugar avoided</Text>
          </View>
        </View>

        <Text style={styles.quote}>
          You placed a large stone today. The next is thirty days further along the path.
        </Text>
      </View>

      {/* Actions */}
      <View style={[styles.actions, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Pressable style={styles.shareBtn}>
          <Text style={styles.shareLabel}>Share this chapter</Text>
        </Pressable>
        <PillCTA label="Back to today" onPress={() => router.dismiss()} />
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  confettiLayer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, height: '50%',
  },
  confetti: {
    position: 'absolute',
    borderRadius: radius.full,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  closeBtn: {
    position: 'absolute',
    top: spacing.md, right: spacing.lg,
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: { fontSize: 22, color: colors.onSurface, lineHeight: 22, fontFamily: fonts.headlineLight },

  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginTop: spacing.xxl,
  },

  heroOrb: {
    width: 180, height: 180, borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    marginTop: spacing.md,
    shadowColor: colors.primary,
    shadowOpacity: 0.4, shadowRadius: 40, shadowOffset: { width: 0, height: 20 },
    elevation: 12,
  },
  heroGlow: {
    position: 'absolute',
    width: 220, height: 220, borderRadius: radius.full,
    backgroundColor: 'rgba(165,60,48,0.15)',
  },
  heroNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 96,
    color: colors.onPrimary,
    letterSpacing: -4,
    lineHeight: 96,
  },

  milestoneTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    letterSpacing: -0.8,
    marginTop: spacing.sm,
  },

  divider: {
    width: 40, height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
    marginVertical: spacing.md,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  stat: { alignItems: 'center', gap: 2, flex: 1 },
  statNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.titleLarge,
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
    textAlign: 'center',
  },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(49,51,47,0.1)' },

  quote: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
    marginTop: spacing.md,
    maxWidth: 320,
  },

  actions: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  shareBtn: {
    padding: spacing.md,
  },
  shareLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },
});

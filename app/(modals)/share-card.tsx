import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * 3.4 Share card — preview + native share sheet placeholder.
 * 9:16 aspect card preview with headline + stats.
 */

const ACTIONS = [
  { key: 'save',      label: 'Save image',          glyph: '↓' },
  { key: 'instagram', label: 'Instagram',           glyph: '◈' },
  { key: 'more',      label: 'More',                glyph: '⋯' },
];

export default function ShareCard() {
  const insets = useSafeAreaInsets();

  const onAction = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <AtmosphericGradient theme="dawn">
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.5} drift={22} />
        <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={16} />
      </View>
      <Animated.View entering={FadeInUp.duration(400)} style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={{ width: 36 }} />
        <Text style={styles.headerTitle}>Share your chapter</Text>
        <Pressable
          onPress={() => router.dismiss()}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Close share card"
        >
          <Text style={styles.closeX}>×</Text>
        </Pressable>
      </Animated.View>

      <View style={styles.content}>
        {/* 9:16 card preview */}
        <Animated.View entering={FadeInUp.delay(120).duration(450)} style={styles.cardFrame}>
          <View style={styles.card}>
            <View style={styles.cardInner}>
              <View style={styles.logoRow}>
                <View style={styles.logoMark} />
                <Text style={styles.logoWord}>Sugar Quit</Text>
              </View>

              <View style={styles.cardCenter}>
                <Text style={styles.cardNumber}>30</Text>
                <Text style={styles.cardHeadline}>days quieter with sugar</Text>
              </View>

              <View style={styles.cardStatsRow}>
                <View style={styles.cardStat}>
                  <Text style={styles.cardStatNum}>42</Text>
                  <Text style={styles.cardStatLabel}>CRAVINGS MET</Text>
                </View>
                <View style={styles.cardStatDivider} />
                <View style={styles.cardStat}>
                  <Text style={styles.cardStatNum}>$72</Text>
                  <Text style={styles.cardStatLabel}>SAVED</Text>
                </View>
                <View style={styles.cardStatDivider} />
                <View style={styles.cardStat}>
                  <Text style={styles.cardStatNum}>1.8</Text>
                  <Text style={styles.cardStatLabel}>KG AVOIDED</Text>
                </View>
              </View>

              <Text style={styles.cardFooter}>sugarquit.app</Text>
            </View>
          </View>
        </Animated.View>

        {/* Action row */}
        <Animated.View entering={FadeInDown.delay(260).duration(400)} style={styles.actionsRow}>
          {ACTIONS.map((a) => (
            <Pressable
              key={a.key}
              onPress={onAction}
              style={styles.actionBtn}
              accessibilityRole="button"
              accessibilityLabel={a.label}
            >
              <View style={styles.actionGlyph}>
                <Text style={styles.actionGlyphText}>{a.glyph}</Text>
              </View>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </Animated.View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Text style={styles.footerNote}>Nothing is posted without your tap.</Text>
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
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: { fontSize: 22, color: colors.onSurface, lineHeight: 22, fontFamily: fonts.headlineLight },

  // Background aura layer
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -80,
    right: -110,
  },
  auraBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -100,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    alignItems: 'center',
    gap: spacing.xl,
  },

  cardFrame: {
    width: '70%',
    aspectRatio: 9 / 16,
    maxHeight: 520,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: spacing.xs,
    shadowColor: colors.primary,
    shadowOpacity: 0.15, shadowRadius: 30, shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  card: {
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.primaryContainer,
    overflow: 'hidden',
  },
  cardInner: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoMark: { width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.primary },
  logoWord: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.labelSmall,
    color: colors.onPrimaryContainer,
    letterSpacing: tracking.wide,
  },
  cardCenter: { alignItems: 'center', gap: spacing.xs },
  cardNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 96,
    color: colors.primary,
    letterSpacing: -4,
    lineHeight: 96,
  },
  cardHeadline: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.onPrimaryContainer,
    letterSpacing: -0.3,
    textAlign: 'center',
    maxWidth: 200,
  },
  cardStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(118,25,17,0.2)',
  },
  cardStat: { alignItems: 'center', gap: 2, flex: 1 },
  cardStatNum: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleMedium,
    color: colors.primary,
  },
  cardStatLabel: {
    fontFamily: fonts.label,
    fontSize: 8,
    color: colors.onPrimaryContainer,
    letterSpacing: tracking.widest,
  },
  cardStatDivider: { width: 1, height: 20, backgroundColor: 'rgba(118,25,17,0.2)' },
  cardFooter: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: colors.onPrimaryContainer,
    letterSpacing: tracking.widest,
    textAlign: 'center',
    opacity: 0.7,
  },

  actionsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: { alignItems: 'center', gap: spacing.xs, width: 80 },
  actionGlyph: {
    width: 56, height: 56, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center', justifyContent: 'center',
  },
  actionGlyphText: {
    fontFamily: fonts.headlineBold,
    fontSize: 22,
    color: colors.primary,
    lineHeight: 24,
  },
  actionLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodySmall,
    color: colors.onSurface,
  },

  footer: { alignItems: 'center', paddingHorizontal: spacing.lg },
  footerNote: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    opacity: 0.7,
    letterSpacing: tracking.wide,
  },
});

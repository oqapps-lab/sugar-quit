import { router } from 'expo-router';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../components/ui/GlassCard';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * 4.5 Post-SOS reflection.
 * Non-judgmental: any answer is valid data, no moral framing.
 */

type Answer = 'walked' | 'softer' | 'gave';

const ANSWERS: { key: Answer; title: string; body: string; tint: 'mint' | 'peach' | 'default' }[] = [
  { key: 'walked', title: 'Walked through it',        body: "The wave came, you stayed.",              tint: 'mint' },
  { key: 'softer', title: 'Softer, but still there',  body: 'Noisier than before, quieter than peak.', tint: 'peach' },
  { key: 'gave',   title: 'Gave in to it',            body: "Honest answer. Data, not failure.",       tint: 'default' },
];

export default function PostSOS() {
  const insets = useSafeAreaInsets();
  const [picked, setPicked] = useState<Answer | null>(null);

  const onPick = (a: Answer) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPicked(a);
  };

  return (
    <AtmosphericGradient theme="dawn">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={{ width: 36 }} />
        <Text style={styles.headerTitle}>After the wave</Text>
        <Pressable onPress={() => router.dismiss()} style={styles.closeBtn}>
          <Text style={styles.closeX}>×</Text>
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>CHECK-OUT</Text>
        <Text style={styles.title}>How are you now?</Text>
        <Text style={styles.sub}>Whatever the answer — it's worth logging.</Text>

        <View style={styles.cards}>
          {ANSWERS.map((a) => (
            <Pressable key={a.key} onPress={() => onPick(a.key)}>
              <GlassCard tint={a.tint} style={[styles.card, picked === a.key && styles.cardActive]}>
                <View style={styles.row}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={styles.cardTitle}>{a.title}</Text>
                    <Text style={styles.cardBody}>{a.body}</Text>
                  </View>
                  <View style={[styles.arrow, picked === a.key && styles.arrowActive]}>
                    <Text style={[styles.arrowText, picked === a.key && styles.arrowTextActive]}>→</Text>
                  </View>
                </View>
              </GlassCard>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Save & close" onPress={() => router.dismiss()} disabled={!picked} />
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

  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.sm },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  title: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium + 2,
    color: colors.onSurface,
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },

  cards: { gap: spacing.sm },
  card: { padding: spacing.lg },
  cardActive: { borderColor: colors.primary, borderWidth: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  cardTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  cardBody: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  arrow: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  arrowActive: { backgroundColor: colors.primary },
  arrowText: { color: colors.onSurfaceVariant, fontSize: 16 },
  arrowTextActive: { color: colors.onPrimary },

  ctaWrap: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
});

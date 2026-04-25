import { router, useLocalSearchParams } from 'expo-router';
import { safeDismiss } from '../../lib/nav';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { GlassCard } from '../../components/ui/GlassCard';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { peakWindow24h } from '../../lib/peakHour';
import { useUserStore } from '../../stores/useUserStore';

/**
 * Forecast Window — info modal opened when the user taps a forecast card on
 * Home (Calm 8-12, Peak Surge 15-18, Exhale 18-22). Explains what the window
 * means in their day, why it's marked that way, and gives one practical tip.
 *
 * Route: /(modals)/forecast-window?slot=morning|peak|evening
 */

type Slot = 'morning' | 'peak' | 'evening';

const CONTENT: Record<Slot, {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  practice: string;
  tint: 'mint' | 'peach' | 'lavender';
  glyph: 'sun' | 'lightning' | 'moon';
}> = {
  morning: {
    eyebrow: '08:00 — 12:00',
    title: 'Calm window',
    subtitle: 'Your low-risk hours.',
    body: 'Cortisol is steady, blood sugar is even, dopamine baseline is regulated. Cravings are rare here because the body has nothing to "fix" with sugar. This is your high-leverage time for deep work and any meaningful decisions.',
    practice: 'Tip: do the hard task now, while willpower is cheap.',
    tint: 'mint',
    glyph: 'sun',
  },
  peak: {
    eyebrow: '15:00 — 18:00',
    title: 'Peak surge',
    subtitle: 'The hour you booked sugar in your past.',
    body: "We've watched your pattern: this is when energy dips, cortisol kicks back up, and your brain reaches for the fastest fix. Most cravings happen in this 3-hour window. Knowing it is half the work.",
    practice: 'Tip: pre-decide. Have water + protein ready *before* 14:30.',
    tint: 'peach',
    glyph: 'lightning',
  },
  evening: {
    eyebrow: '18:00 — 22:00',
    title: 'The exhale',
    subtitle: 'System reset begins.',
    body: 'After dinner, insulin slowly returns to baseline and the day starts unwinding. Sleep is being prepared chemically right now. Sugar this late spikes blood glucose in a way that disrupts deep sleep — costing you tomorrow.',
    practice: 'Tip: stop eating 2-3 hours before bed. Your morning will thank you.',
    tint: 'lavender',
    glyph: 'moon',
  },
};

export default function ForecastWindow() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ slot?: string }>();
  const slot: Slot = (params.slot === 'peak' || params.slot === 'evening') ? params.slot : (params.slot === 'morning' ? 'morning' : 'peak');
  const peakHour = useUserStore((s) => s.peakHour);
  // Peak window eyebrow is derived from the user's peakHour, so a 9pm peak
  // doesn't render "15:00 — 18:00" at the top of the modal.
  const c = {
    ...CONTENT[slot],
    eyebrow: slot === 'peak' ? peakWindow24h(peakHour) : CONTENT[slot].eyebrow,
  };

  return (
    <AtmosphericGradient theme="dawn">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={{ width: 36 }} />
        <Pressable onPress={() => safeDismiss()} style={styles.closeBtn} accessibilityRole="button" accessibilityLabel="Close">
          <Text style={styles.closeX}>×</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero glyph — big, centered, declares the slot mood */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.heroGlyph}>
          <DecorGlyph variant={c.glyph} size={120} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100).duration(400)}>
          <Text style={styles.eyebrow}>{c.eyebrow}</Text>
          <Text style={styles.title}>{c.title}</Text>
          <Text style={styles.subtitle}>{c.subtitle}</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <GlassCard tint={c.tint} style={styles.bodyCard}>
            <Text style={styles.bodyText}>{c.body}</Text>
          </GlassCard>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <GlassCard tint="cream" style={styles.practiceCard}>
            <Text style={styles.practiceLabel}>PRACTICE</Text>
            <Text style={styles.practiceText}>{c.practice}</Text>
          </GlassCard>
        </Animated.View>

        {slot === 'peak' && peakHour && (
          <Text style={styles.personalNote}>
            Personalised from your quiz: peak around {peakHour.toLowerCase()}.
          </Text>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Got it" onPress={() => safeDismiss()} />
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
  closeBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: { fontSize: 22, color: colors.onSurface, lineHeight: 22, fontFamily: fonts.headlineLight },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, gap: spacing.md },
  heroGlyph: { alignItems: 'center', marginBottom: spacing.md },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  title: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium + 4,
    color: colors.onSurface,
    letterSpacing: -1,
    lineHeight: 36,
    marginTop: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.md,
  },
  bodyCard: { padding: spacing.lg },
  bodyText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    lineHeight: 24,
  },
  practiceCard: { padding: spacing.lg, gap: spacing.xs },
  practiceLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  practiceText: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    lineHeight: 22,
  },
  personalNote: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: spacing.md,
  },

  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

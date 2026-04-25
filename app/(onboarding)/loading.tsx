import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * 1.13 Loading — "Writing your plan..." auto-advances to result after 4s.
 * Uses router.replace so loading isn't in back stack.
 */
const DURATION_MS = 4000;

const STATUS_LINES = [
  'Reading your patterns',
  'Finding your peak window',
  'Writing your plan',
];

export default function LoadingScreen() {
  const insets = useSafeAreaInsets();
  const [statusIdx, setStatusIdx] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();

    // Progress fill (tick every 80ms)
    const progressTick = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const p = Math.min(100, (elapsed / DURATION_MS) * 100);
      setPercent(p);
    }, 80);

    // Rotate status every ~1.33s
    const statusTick = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUS_LINES.length);
    }, Math.floor(DURATION_MS / STATUS_LINES.length));

    // Navigate once at 4s
    const done = setTimeout(() => {
      router.replace('/(onboarding)/result');
    }, DURATION_MS);

    return () => {
      clearInterval(progressTick);
      clearInterval(statusTick);
      clearTimeout(done);
    };
  }, []);

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.body}>
          <Text style={styles.eyebrow}>ONE MOMENT</Text>
          <Text style={styles.headline}>Writing your plan…</Text>

          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${percent}%` }]} />
            </View>
            <Text style={styles.percent}>{Math.round(percent)}%</Text>
          </View>

          <View style={styles.statusWrap}>
            {STATUS_LINES.map((line, i) => {
              const isActive = i === statusIdx;
              const isPast = i < statusIdx;
              return (
                <View key={line} style={styles.statusRow}>
                  <View style={[
                    styles.statusDot,
                    isActive && styles.statusDotActive,
                    isPast && styles.statusDotPast,
                  ]} />
                  <Text style={[
                    styles.statusLine,
                    isActive && styles.statusLineActive,
                    isPast && styles.statusLinePast,
                  ]}>
                    {line}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </AtmosphericGradient>
  );
}

const HONEY = '#d88c3f'; // thin honey line

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWidest,
    marginBottom: spacing.sm,
  },
  headline: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium + 2,
    color: colors.onSurface,
    letterSpacing: -0.8,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: spacing.md,
  },
  progressWrap: {
    width: '100%',
    maxWidth: 320,
    gap: spacing.sm,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 3,
    borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: HONEY,
  },
  percent: {
    fontFamily: fonts.headlineMedium,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
  },
  statusWrap: {
    gap: spacing.sm,
    marginTop: spacing.md,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  statusDot: {
    width: 6, height: 6, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.2)',
  },
  statusDotActive: { backgroundColor: colors.primary },
  statusDotPast: { backgroundColor: colors.tertiary },
  statusLine: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  statusLineActive: {
    fontFamily: fonts.bodySemibold,
    color: colors.onSurface,
  },
  statusLinePast: {
    color: colors.onSurfaceVariant,
    opacity: 0.6,
  },
});

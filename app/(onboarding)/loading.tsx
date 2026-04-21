import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  FadeInUp,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
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

  // Rotating orbit glyph
  const rm = useReducedMotion();
  const rotation = useSharedValue(0);
  useEffect(() => {
    if (rm) return;
    rotation.value = withRepeat(
      withTiming(360, { duration: 6000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rm, rotation]);
  const orbitStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

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
      {/* Background aura blobs */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="peach" size={320} style={styles.auraTopRight} intensity={0.5} drift={20} />
        <AuraBlob tint="mint" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={16} />
      </View>

      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.body}>
          <Animated.View entering={FadeInUp.duration(400)} style={styles.orbitWrap}>
            <Animated.View style={orbitStyle}>
              <DecorGlyph variant="orbit" size={96} />
            </Animated.View>
          </Animated.View>

          <Animated.Text entering={FadeInUp.delay(100).duration(400)} style={styles.eyebrow}>
            ONE MOMENT
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(150).duration(400)} style={styles.headline}>
            Writing your plan…
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(250).duration(400)} style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${percent}%` }]} />
            </View>
            <Text style={styles.percent}>{Math.round(percent)}%</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(350).duration(400)} style={styles.statusWrap}>
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
          </Animated.View>
        </View>
      </View>
    </AtmosphericGradient>
  );
}

const HONEY = '#d88c3f'; // thin honey line

const styles = StyleSheet.create({
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -80,
    right: -120,
  },
  auraBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -120,
  },
  container: { flex: 1 },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },
  orbitWrap: {
    marginBottom: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
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

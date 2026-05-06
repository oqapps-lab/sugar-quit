import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';

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

  const rm = useReducedMotion();
  const rotation = useSharedValue(0);
  useEffect(() => {
    if (rm) return;
    rotation.value = withRepeat(
      withTiming(360, { duration: 1800, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rm, rotation]);
  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    const startedAt = Date.now();

    const progressTick = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setPercent(Math.min(100, (elapsed / DURATION_MS) * 100));
    }, 80);

    const statusTick = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUS_LINES.length);
    }, Math.floor(DURATION_MS / STATUS_LINES.length));

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
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.body}>
        {/* Spinner */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.spinnerWrap}>
          <Animated.View style={[styles.spinner, !rm && spinStyle]} />
          <View style={styles.spinnerDot} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100).duration(400)}>
          <Eyebrow color={colors.primary} style={styles.eyebrow}>One moment</Eyebrow>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(150).duration(400)}>
          <Txt variant="displayMd" style={styles.headline}>Writing your plan…</Txt>
        </Animated.View>

        {/* Progress bar */}
        <Animated.View entering={FadeInUp.delay(250).duration(400)} style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${percent}%` as `${number}%` }]} />
          </View>
          <Txt variant="labelSm" color={colors.textSecondary}>{Math.round(percent)}%</Txt>
        </Animated.View>

        {/* Status lines */}
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
                <Txt
                  variant={isActive ? 'bodyMd' : 'bodySm'}
                  color={isActive ? colors.onSurface : undefined}
                  style={isPast && styles.statusLinePast}
                >
                  {line}
                </Txt>
              </View>
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },

  spinnerWrap: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  spinner: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: colors.primary,
    borderTopColor: 'transparent',
  },
  spinnerDot: {
    width: 12,
    height: 12,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },

  eyebrow: { textAlign: 'center', marginBottom: spacing.xs },
  headline: {
    letterSpacing: -0.6,
    textAlign: 'center',
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
    backgroundColor: colors.outline,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },

  statusWrap: {
    gap: spacing.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.outline,
  },
  statusDotActive: { backgroundColor: colors.primary },
  statusDotPast: { backgroundColor: colors.success },
  statusLinePast: { opacity: 0.5 },
});

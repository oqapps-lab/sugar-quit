import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eyebrow } from '../../../components/primitives/Eyebrow';
import { Txt } from '../../../components/primitives/Txt';
import { colors, radius, spacing } from '../../../constants/tokens';
import { MILESTONE_DAYS, useUserStore } from '../../../stores/useUserStore';

type Status = 'earned' | 'current' | 'upcoming' | 'goal';

type Milestone = {
  day: number;
  title: string;
  phrase: string;
  status: Status;
};

const MILESTONE_META: Record<number, { title: string; phrase: string }> = {
  1:  { title: 'The first decision',  phrase: 'You showed up.'       },
  3:  { title: 'First quiet morning', phrase: 'The storm passed.'    },
  7:  { title: 'First week, whole',   phrase: 'One whole week.'      },
  14: { title: 'Adaptation',          phrase: 'The body adjusts.'    },
  30: { title: 'Taste reset',         phrase: 'Taste reset begins.'  },
  60: { title: 'New identity',        phrase: 'You are different.'   },
  90: { title: 'The horizon',         phrase: 'The path is yours.'   },
};

function buildMilestones(streakDays: number): Milestone[] {
  return MILESTONE_DAYS.map((day) => {
    const meta = MILESTONE_META[day] ?? { title: `Day ${day}`, phrase: '' };
    let status: Status;
    if (day === 90 && streakDays < 90) status = 'goal';
    else if (day <= streakDays) status = day === MILESTONE_DAYS.filter((d) => d <= streakDays).at(-1) ? 'current' : 'earned';
    else status = 'upcoming';
    return { day, ...meta, status };
  });
}

export default function Milestones() {
  const insets = useSafeAreaInsets();
  const streakDays = useUserStore((s) => s.streakDays);
  const milestonesCelebrated = useUserStore((s) => s.milestonesCelebrated);
  const milestones = buildMilestones(streakDays);
  const earnedCount = milestones.filter((m) => m.status === 'earned' || m.status === 'current').length;

  const openMilestone = (day: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    useUserStore.setState({
      milestonesCelebrated: milestonesCelebrated.filter((d) => d !== day),
    });
    router.push('/(modals)/milestone');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }}
          hitSlop={12}
          style={styles.headerSide}
          accessibilityRole="button"
        >
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="titleMd" style={styles.headerTitle}>Your stones</Txt>
        <View style={styles.headerSide} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 60 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.hero}>
          <Txt variant="displayMd" style={styles.heroNumber}>
            {earnedCount === 1 ? '1 stone placed' : `${earnedCount} stones placed`}
          </Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} center style={styles.heroSub}>
            Each one, a day you chose.
          </Txt>

          {/* Stone row */}
          <View style={styles.stoneRow}>
            {milestones.map((m) => (
              <View
                key={m.day}
                style={[
                  styles.stone,
                  m.status === 'earned'   && styles.stoneEarned,
                  m.status === 'current'  && styles.stoneCurrent,
                  m.status === 'goal'     && styles.stoneGoal,
                ]}
              />
            ))}
          </View>
          <Txt variant="labelSm" color={colors.textSecondary} style={styles.stoneHint}>
            {earnedCount} of {milestones.length}
          </Txt>
        </Animated.View>

        {/* List */}
        <View style={styles.list}>
          {milestones.map((m, i) => (
            <Animated.View key={m.day} entering={FadeInDown.delay(100 + i * 60).duration(400)}>
              <MilestoneRow
                milestone={m}
                onOpen={openMilestone}
              />
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function MilestoneRow({ milestone, onOpen }: { milestone: Milestone; onOpen: (day: number) => void }) {
  const { day, title, phrase, status } = milestone;
  const earned = status === 'earned' || status === 'current';

  return (
    <Pressable
      onPress={() => earned ? onOpen(day) : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      style={[styles.row, earned && styles.rowEarned, status === 'goal' && styles.rowGoal]}
      accessibilityRole="button"
      accessibilityLabel={`Day ${day}: ${title}, ${status}`}
    >
      {/* Day number */}
      <View style={[styles.dayBox, earned && styles.dayBoxEarned]}>
        <Txt
          variant="displaySm"
          color={earned ? colors.success : colors.outline}
          style={styles.dayNumber}
        >
          {day}
        </Txt>
      </View>

      {/* Content */}
      <View style={styles.rowContent}>
        <Txt
          variant="titleSm"
          color={earned ? colors.onSurface : colors.textSecondary}
          style={[styles.rowTitle, !earned && styles.rowTitleDim]}
        >
          {title}
        </Txt>
        {earned ? (
          <Txt variant="bodySm" color={colors.success} style={styles.rowPhrase}>{phrase}</Txt>
        ) : (
          <Txt variant="bodySm" color={colors.outline} style={styles.rowPhrase}>Day {day}</Txt>
        )}
      </View>

      {/* Status indicator */}
      <View style={[styles.statusDot, earned && styles.statusDotEarned, status === 'current' && styles.statusDotCurrent]} />
    </Pressable>
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
  headerSide: { minWidth: 72 },
  headerTitle: { letterSpacing: -0.2 },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.xl },

  hero: { alignItems: 'center', gap: spacing.sm },
  heroNumber: { letterSpacing: -0.8 },
  heroSub: { opacity: 0.7 },

  stoneRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  stone: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.outline + '60',
    borderWidth: 1.5,
    borderColor: colors.outline,
  },
  stoneEarned: {
    backgroundColor: colors.success + '30',
    borderColor: colors.success + '80',
  },
  stoneCurrent: {
    backgroundColor: colors.success + '50',
    borderColor: colors.success,
    borderWidth: 2,
  },
  stoneGoal: {
    borderStyle: 'dashed',
    borderColor: colors.outline,
    backgroundColor: 'transparent',
  },
  stoneHint: { opacity: 0.5, marginTop: spacing.xs },

  list: { gap: spacing.sm },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.outline,
    backgroundColor: colors.surface,
  },
  rowEarned: {
    backgroundColor: colors.success + '08',
    borderColor: colors.success + '25',
  },
  rowGoal: {
    borderStyle: 'dashed',
  },

  dayBox: {
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBoxEarned: {},
  dayNumber: { letterSpacing: -1, lineHeight: 26, includeFontPadding: false },

  rowContent: { flex: 1, gap: 2 },
  rowTitle: { letterSpacing: -0.2 },
  rowTitleDim: { opacity: 0.45 },
  rowPhrase: { lineHeight: 16 },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.outline,
  },
  statusDotEarned: { backgroundColor: colors.success + '60' },
  statusDotCurrent: { backgroundColor: colors.success, width: 10, height: 10 },
});

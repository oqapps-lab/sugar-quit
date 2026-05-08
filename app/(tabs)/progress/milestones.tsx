import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { colors, fonts, radius, shadows, spacing, tracking, typeScale } from '../../../constants/tokens';
import { MILESTONE_DAYS, useUserStore } from '../../../stores/useUserStore';

/**
 * 2.3.3 Milestones — "Your stones".
 * Dark-horizon grid of 7 milestone cards. Status is computed from streakDays:
 *  - day < streakDays → earned
 *  - day === current milestone (largest day ≤ streakDays) → current
 *  - day > streakDays && day < 90 → upcoming
 *  - day === 90 → goal
 */
type Status = 'earned' | 'current' | 'upcoming' | 'goal';

type Milestone = {
  day: number;
  title: string;
  status: Status;
};

const TITLES: Record<number, string> = {
  1:  'The first decision',
  3:  'First quiet morning',
  7:  'First week, whole',
  14: 'The fog lifts',
  30: 'New defaults',
  60: 'New identity',
  90: 'Walking free',
};

function buildMilestones(streakDays: number): Milestone[] {
  // The "current" stone is the largest milestone ≤ streakDays. Everything below
  // it is earned, everything above is upcoming. Day 90 always reads as goal
  // unless reached.
  const earnedDays = MILESTONE_DAYS.filter((d) => d <= streakDays);
  const currentDay = earnedDays.length > 0 ? earnedDays[earnedDays.length - 1] : null;
  return MILESTONE_DAYS.map((day) => {
    let status: Status;
    if (day === 90 && streakDays < 90) status = 'goal';
    else if (day === currentDay) status = 'current';
    else if (day < streakDays) status = 'earned';
    else status = 'upcoming';
    return { day, title: TITLES[day] ?? `Day ${day}`, status };
  });
}

export default function Milestones() {
  const insets = useSafeAreaInsets();
  const streakDays = useUserStore((s) => s.streakDays);
  const milestones = buildMilestones(streakDays);
  const earnedCount = milestones.filter((m) => m.status === 'earned' || m.status === 'current').length;

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/progress');
  };

  return (
    <AtmosphericGradient theme="darkHorizon">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable
          onPress={handleBack}
          hitSlop={12}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Back to Progress tab"
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Your stones</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 160 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heroNumber}>
          {earnedCount === 1 ? '1 stone placed' : `${earnedCount} stones placed`}
        </Text>
        <Text style={styles.heroSub}>Each one a day you chose yourself.</Text>

        <View style={styles.grid}>
          {milestones.map((m) => (
            <MilestoneCard key={m.day} milestone={m} />
          ))}
        </View>
      </ScrollView>
    </AtmosphericGradient>
  );
}

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const { day, title, status } = milestone;

  const cardStyle = [
    styles.card,
    status === 'earned'   && styles.cardEarned,
    status === 'current'  && styles.cardCurrent,
    status === 'upcoming' && styles.cardUpcoming,
    status === 'goal'     && styles.cardGoal,
    status === 'current'  && shadows.glowToken,
  ];

  const glyphStyle = [
    styles.glyph,
    status === 'earned'   && styles.glyphEarned,
    status === 'current'  && styles.glyphCurrent,
    status === 'upcoming' && styles.glyphUpcoming,
    status === 'goal'     && styles.glyphGoal,
  ];

  const textColor =
    status === 'upcoming' ? 'rgba(255,255,255,0.45)' :
    status === 'goal'     ? 'rgba(255,255,255,0.7)' :
    '#ffffff';

  return (
    <Pressable
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      style={cardStyle}
      accessibilityRole="button"
      accessibilityLabel={`Day ${day}: ${title}, ${status}`}
    >
      {/* DRAFT (kakoccc #47 2026-04-29): replaced flat-colored circle with
          a status-specific glyph so each milestone reads as something
          beyond "yet another pink dot". */}
      <View style={glyphStyle}>
        {status === 'earned' && (
          <Text style={styles.glyphEarnedMark}>✓</Text>
        )}
        {status === 'current' && (
          <View style={styles.glyphCurrentInner} />
        )}
        {status === 'goal' && (
          <Text style={styles.glyphGoalMark}>★</Text>
        )}
      </View>
      <Text style={[styles.cardDayLabel, { color: textColor, opacity: status === 'upcoming' ? 0.6 : 1 }]}>
        DAY {day}
      </Text>
      <Text style={[styles.cardTitle, { color: textColor }]} numberOfLines={2}>
        {title}
      </Text>
      {status === 'current' && (
        <Text style={styles.currentBadge}>IN PROGRESS</Text>
      )}
      {status === 'goal' && (
        <Text style={styles.goalBadge}>THE GOAL</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    zIndex: 10,
  },
  backBtn: { width: 32, alignItems: 'flex-start' },
  backArrow: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    color: '#ffffff',
  },
  headerTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: '#ffffff',
    letterSpacing: -0.2,
  },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },

  heroNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: '#ffffff',
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  heroSub: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyLarge,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },

  card: {
    width: '47%',
    minHeight: 150,
    borderRadius: radius.sm,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 1,
  },
  cardEarned: {
    backgroundColor: 'rgba(255, 172, 160, 0.18)',
    borderColor: 'rgba(255, 172, 160, 0.35)',
  },
  cardCurrent: {
    backgroundColor: 'rgba(165, 60, 48, 0.35)',
    borderColor: '#ff9788',
  },
  cardUpcoming: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(255,255,255,0.12)',
  },
  cardGoal: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.35)',
    borderStyle: 'dashed',
  },

  glyph: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyphEarned:   { backgroundColor: '#ffaca0' },
  glyphCurrent:  { backgroundColor: '#fd7d6c' },
  glyphUpcoming: { backgroundColor: 'rgba(255,255,255,0.12)' },
  glyphGoal:     { backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,255,255,0.55)' },
  glyphEarnedMark: { color: '#7a1c10', fontSize: 16, fontFamily: fonts.headlineBold, includeFontPadding: false, textAlignVertical: 'center', lineHeight: 18 },
  glyphCurrentInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ffffff' },
  glyphGoalMark: { color: 'rgba(255,255,255,0.85)', fontSize: 14, includeFontPadding: false, textAlignVertical: 'center', lineHeight: 16 },

  cardDayLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.labelWide,
  },
  cardTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleSmall,
    letterSpacing: -0.2,
    lineHeight: 19,
  },
  currentBadge: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: '#ffe4e6',
    letterSpacing: tracking.widest,
    marginTop: spacing.xs,
  },
  goalBadge: {
    fontFamily: fonts.label,
    fontSize: 9,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: tracking.widest,
    marginTop: spacing.xs,
  },
});

/**
 * SAMPLE — Progress screen sketch using primitives.
 * Dark Horizon theme. Not a real screen — composition reference.
 */
import { View, StyleSheet } from 'react-native';
import { Screen } from '../components/primitives/Screen';
import { ThemedText, Eyebrow } from '../components/primitives/ThemedText';
import { HeroNumeral } from '../components/primitives/HeroNumeral';
import { Card } from '../components/primitives/Card';
import { StatCell } from '../components/primitives/StatCell';
import { ProgressBar } from '../components/primitives/ProgressBar';
import { Badge } from '../components/primitives/Badge';
import { Divider } from '../components/primitives/Divider';
import { spacing, colors } from '../constants/tokens';

export default function ProgressScreenSample() {
  return (
    <Screen theme="darkHorizon">

      {/* Header */}
      <Eyebrow style={styles.eyebrow}>Your Progress</Eyebrow>
      <HeroNumeral value={42} sublabel="days free" gradient="heroHorizontal" style={styles.hero} />

      {/* 90-day journey */}
      <Card tint="dark" style={styles.card}>
        <View style={styles.cardHeader}>
          <ThemedText variant="titleMedium" color={colors.onPrimary}>90-Day Journey</ThemedText>
          <Badge label="47%" variant="info" />
        </View>
        <ProgressBar progress={0.47} gradient height={8} style={styles.progress} />
        <ThemedText variant="bodySmall" color={colors.onPrimaryContainer}>
          48 days remaining to your goal
        </ThemedText>
      </Card>

      <Divider />

      {/* Lifetime stats */}
      <Eyebrow>Lifetime stats</Eyebrow>
      <View style={styles.grid}>
        <StatCell label="Sugar avoided" value={1420} unit="g" />
        <StatCell label="Cravings beaten" value={34} />
        <StatCell label="Money saved" value="$96" />
        <StatCell label="SOS sessions" value={12} />
      </View>

      <Divider />

      {/* Weekly breakdown */}
      <Card tint="dark" style={styles.card}>
        <Eyebrow>This week vs last week</Eyebrow>
        <ThemedText variant="labelSmall" style={styles.barLabel}>Cravings</ThemedText>
        <ProgressBar progress={0.3} style={styles.progress} />
        <ThemedText variant="labelSmall" style={styles.barLabel}>Check-ins completed</ThemedText>
        <ProgressBar progress={0.85} gradient style={styles.progress} />
        <ThemedText variant="labelSmall" style={styles.barLabel}>SOS avoided</ThemedText>
        <ProgressBar progress={0.7} gradient style={styles.progress} />
      </Card>

    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    marginTop: spacing.md,
  },
  hero: {
    alignSelf: 'center',
    marginVertical: spacing.xl,
  },
  card: {
    marginVertical: spacing.sm,
    gap: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progress: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
    marginVertical: spacing.md,
  },
  barLabel: {
    marginTop: spacing.xs,
  },
});

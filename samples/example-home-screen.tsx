/**
 * SAMPLE — Home screen layout sketch using primitives.
 * Shows how Screen + Card + HeroNumeral + StatCell + Badge fit together.
 * Not a real screen — just a composition reference.
 */
import { View, StyleSheet } from 'react-native';
import { Screen } from '../components/primitives/Screen';
import { ThemedText, Eyebrow } from '../components/primitives/ThemedText';
import { HeroNumeral } from '../components/primitives/HeroNumeral';
import { Card } from '../components/primitives/Card';
import { StatCell } from '../components/primitives/StatCell';
import { Badge } from '../components/primitives/Badge';
import { Divider } from '../components/primitives/Divider';
import { ProgressBar } from '../components/primitives/ProgressBar';
import { PillCTA } from '../components/ui/PillCTA';
import { spacing } from '../constants/tokens';

export default function HomeScreenSample() {
  return (
    <Screen theme="dawn">

      {/* Hero streak */}
      <View style={styles.heroRow}>
        <HeroNumeral value={14} sublabel="days clean" gradient="heroVertical" />
      </View>

      {/* Today's mission card */}
      <Card tint="peach" style={styles.card}>
        <View style={styles.cardHeader}>
          <Eyebrow>Today's Mission</Eyebrow>
          <Badge label="active" variant="active" />
        </View>
        <ThemedText variant="titleLarge">Swap your 3pm cookie</ThemedText>
        <ThemedText variant="bodySmall">Replace with a handful of almonds + sparkling water</ThemedText>
        <ProgressBar progress={0.4} gradient style={styles.progress} />
        <ThemedText variant="labelSmall">Day 3 of 7</ThemedText>
      </Card>

      <Divider />

      {/* Stats row */}
      <Eyebrow>This week</Eyebrow>
      <View style={styles.statsRow}>
        <StatCell label="Sugar avoided" value={340} unit="g" />
        <StatCell label="Cravings beaten" value={8} />
        <StatCell label="Money saved" value="$24" />
      </View>

      <Divider />

      {/* Insight card */}
      <Card tint="lavender" style={styles.card}>
        <Eyebrow>Sleep insight</Eyebrow>
        <ThemedText variant="titleMedium">You crave more on 6h sleep</ThemedText>
        <ThemedText variant="bodySmall">Your last 3 SOS moments happened after short nights</ThemedText>
      </Card>

      {/* CTA */}
      <PillCTA label="Start today's check-in" variant="primary" style={styles.cta} />

    </Screen>
  );
}

const styles = StyleSheet.create({
  heroRow: {
    alignItems: 'center',
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
    marginTop: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
  },
  cta: {
    marginTop: spacing.xl,
  },
});

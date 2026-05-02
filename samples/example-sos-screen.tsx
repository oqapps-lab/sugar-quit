/**
 * SAMPLE — SOS craving screen sketch using primitives.
 * Immediate AI chat layout. Not a real screen — composition reference.
 */
import { View, StyleSheet } from 'react-native';
import { Screen } from '../components/primitives/Screen';
import { TopBar } from '../components/primitives/TopBar';
import { ThemedText } from '../components/primitives/ThemedText';
import { Card } from '../components/primitives/Card';
import { GhostButton } from '../components/primitives/GhostButton';
import { Badge } from '../components/primitives/Badge';
import { PillCTA } from '../components/ui/PillCTA';
import { spacing, colors } from '../constants/tokens';

export default function SOSScreenSample() {
  return (
    <Screen theme="cravingProfile" scrollable={false}>

      <TopBar
        title="SOS — Craving Mode"
        safeArea
        right={<Badge label="live" variant="live" />}
      />

      {/* AI message */}
      <View style={styles.body}>
        <Card tint="peach" style={styles.aiMessage}>
          <ThemedText variant="labelSmall" color={colors.primary}>Sugar Quit AI</ThemedText>
          <ThemedText variant="titleMedium">
            Hey, I'm here. Tell me what's happening right now.
          </ThemedText>
          <ThemedText variant="bodySmall">
            What triggered this craving? Stress, boredom, habit?
          </ThemedText>
        </Card>

        {/* Quick replies */}
        <ThemedText variant="labelSmall" style={styles.quickLabel}>Quick reply</ThemedText>
        <View style={styles.quickRow}>
          <GhostButton label="Work stress" variant="outline" />
          <GhostButton label="Just bored" variant="outline" />
          <GhostButton label="It's a habit" variant="outline" />
        </View>
      </View>

      {/* Bottom CTA */}
      <PillCTA label="Tell me more" variant="primary" style={styles.cta} />

    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  aiMessage: {
    gap: spacing.sm,
  },
  quickLabel: {
    marginBottom: spacing.xs,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  cta: {
    marginBottom: spacing.lg,
  },
});

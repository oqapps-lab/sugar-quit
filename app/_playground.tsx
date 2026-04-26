import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '@/components/primitives/Screen';
import { Card } from '@/components/primitives/Card';
import { Txt } from '@/components/primitives/Txt';
import { PillCTA } from '@/components/primitives/PillCTA';
import { GhostButton } from '@/components/primitives/GhostButton';
import { IconButton } from '@/components/primitives/IconButton';
import { HeroNumber } from '@/components/primitives/HeroNumber';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { Stat } from '@/components/primitives/Stat';
import { Divider } from '@/components/primitives/Divider';
import { TopBar } from '@/components/primitives/TopBar';
import { BottomNav, TabItem } from '@/components/primitives/BottomNav';
import { colors, spacing } from '@/constants/tokens';

const TABS: TabItem[] = [
  { key: 'home', label: 'Home', icon: '⌂', active: true },
  { key: 'curriculum', label: 'Learn', icon: '📖' },
  { key: 'progress', label: 'Progress', icon: '📈' },
  { key: 'profile', label: 'Profile', icon: '○' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Eyebrow style={styles.sectionTitle}>{title}</Eyebrow>
      {children}
    </View>
  );
}

export default function Playground() {
  const [activeTab, setActiveTab] = useState('home');
  const tabs = TABS.map(t => ({ ...t, active: t.key === activeTab }));

  return (
    <Screen
      floating={
        <>
          <TopBar title="Primitives Playground" transparent />
          <BottomNav tabs={tabs} onPress={setActiveTab} />
        </>
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Txt ── */}
        <Section title="Txt — type scale">
          <Txt variant="hero">72</Txt>
          <Txt variant="displayLg">Display Large 36</Txt>
          <Txt variant="displayMd">Display Medium 28</Txt>
          <Txt variant="displaySm">Display Small 22</Txt>
          <Txt variant="titleLg">Title Large 20</Txt>
          <Txt variant="titleMd">Title Medium 17</Txt>
          <Txt variant="titleSm">Title Small 15</Txt>
          <Txt variant="bodyLg">Body Large 16 — main text</Txt>
          <Txt variant="bodyMd">Body Medium 14 — secondary text</Txt>
          <Txt variant="bodySm">Body Small 13 — captions</Txt>
          <Txt variant="label">Label 12 — UPPERCASE LABEL</Txt>
          <Txt variant="labelSm">Label Small 10</Txt>
          <Txt variant="eyebrow">Eyebrow label</Txt>
          <Txt variant="bodyLg" italic center color={colors.textSecondary}>
            "Italic centered quote"
          </Txt>
        </Section>

        <Divider />

        {/* ── HeroNumber ── */}
        <Section title="HeroNumber">
          <View style={styles.row}>
            <HeroNumber value={8} label="Days Sugar-Free" />
            <HeroNumber value="$24" label="Saved" color={colors.success} />
            <HeroNumber value={15} label="Cravings" color={colors.warning} />
          </View>
        </Section>

        <Divider />

        {/* ── Eyebrow ── */}
        <Section title="Eyebrow">
          <Eyebrow>Day 8 · Lesson</Eyebrow>
          <Eyebrow color={colors.primary}>Your Streak</Eyebrow>
          <Eyebrow color={colors.success}>Sugar-Free</Eyebrow>
        </Section>

        <Divider />

        {/* ── Card ── */}
        <Section title="Card">
          <Card style={styles.cardDemo}>
            <Txt variant="titleMd">Default card</Txt>
            <Txt variant="bodyMd">Surface white, whisper shadow, radius 16.</Txt>
          </Card>
          <Card bordered style={styles.cardDemo}>
            <Txt variant="titleMd">Bordered card</Txt>
            <Txt variant="bodyMd">With 1px outline border.</Txt>
          </Card>
          <Card noPadding style={styles.cardDemo}>
            <View style={styles.noPadContent}>
              <Txt variant="titleMd">No-padding card</Txt>
            </View>
          </Card>
        </Section>

        <Divider />

        {/* ── Stat ── */}
        <Section title="Stat chips">
          <View style={styles.row}>
            <Stat icon="🔥" value={15} label="Cravings" accent={colors.primary} />
            <Stat icon="💰" value="$24" label="Saved" accent={colors.success} />
          </View>
          <View style={[styles.row, { marginTop: spacing.sm }]}>
            <Stat icon="📅" value={8} label="Days" />
            <Stat icon="⚡" value="90%" label="On Track" accent={colors.warning} />
          </View>
        </Section>

        <Divider />

        {/* ── PillCTA ── */}
        <Section title="PillCTA">
          <PillCTA label="Start 7-Day Free Trial →" style={styles.btn} />
          <PillCTA label="Done ✓" variant="success" style={styles.btn} />
          <PillCTA label="Ghost variant" variant="ghost" style={styles.btn} />
          <PillCTA label="Disabled" disabled style={styles.btn} />
        </Section>

        <Divider />

        {/* ── GhostButton ── */}
        <Section title="GhostButton">
          <GhostButton label="Maybe later" />
          <GhostButton label="Skip" small />
        </Section>

        <Divider />

        {/* ── IconButton ── */}
        <Section title="IconButton">
          <View style={styles.iconRow}>
            <IconButton icon="↑" variant="primary" accessibilityLabel="Send" />
            <IconButton icon="←" variant="default" accessibilityLabel="Back" />
            <IconButton icon="✕" variant="ghost" accessibilityLabel="Close" />
            <IconButton icon="⋯" variant="default" size={36} accessibilityLabel="More" />
          </View>
        </Section>

        <Divider />

        {/* ── Divider variants ── */}
        <Section title="Divider">
          <Card>
            <Txt variant="bodyMd">Above inset divider</Txt>
            <Divider inset />
            <Txt variant="bodyMd">Below inset divider</Txt>
          </Card>
          <Divider style={styles.fullDivider} />
          <Txt variant="bodySm">Full-width divider above</Txt>
        </Section>

        {/* spacer for BottomNav */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.md,
    paddingTop: 80,
    paddingBottom: spacing.xl,
  },
  section: {
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  btn: {
    marginBottom: spacing.xs,
  },
  cardDemo: {
    marginBottom: spacing.sm,
  },
  noPadContent: {
    padding: spacing.md,
  },
  fullDivider: {
    marginVertical: spacing.md,
  },
});

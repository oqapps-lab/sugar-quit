import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../../components/primitives/Card';
import { Eyebrow } from '../../../components/primitives/Eyebrow';
import { Txt } from '../../../components/primitives/Txt';
import { colors, radius, spacing } from '../../../constants/tokens';

type ToggleRow = { kind: 'toggle'; label: string; sub?: string; initial: boolean };
type LinkRow   = { kind: 'link';   label: string; value?: string; warning?: boolean };
type StaticRow = { kind: 'static'; label: string; value: string };
type Row = ToggleRow | LinkRow | StaticRow;
type Section = { label: string; rows: Row[] };

const SECTIONS: Section[] = [
  {
    label: 'NOTIFICATIONS',
    rows: [
      { kind: 'toggle', label: 'Morning check-in',     sub: '08:00', initial: true  },
      { kind: 'toggle', label: 'Daily lesson',          sub: '09:30', initial: true  },
      { kind: 'toggle', label: 'Motivation of the day',              initial: false },
      { kind: 'toggle', label: 'Streak at risk',        sub: '21:00', initial: true  },
    ],
  },
  {
    label: 'ACCOUNT',
    rows: [
      { kind: 'link', label: 'Email',             value: 's***@gmail.com' },
      { kind: 'link', label: 'Change password' },
      { kind: 'link', label: 'Restore purchases' },
    ],
  },
  {
    label: 'DATA',
    rows: [
      { kind: 'link', label: 'Export my data' },
      { kind: 'link', label: 'Delete account', warning: true },
    ],
  },
  {
    label: 'ABOUT',
    rows: [
      { kind: 'link',   label: 'Privacy Policy' },
      { kind: 'link',   label: 'Terms of Service' },
      { kind: 'static', label: 'Version', value: '0.1.0' },
    ],
  },
];

export default function Settings() {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          hitSlop={12}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Back to profile"
        >
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="titleMd" style={styles.headerTitle}>Settings</Txt>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {SECTIONS.map((section) => (
          <View key={section.label} style={styles.section}>
            <Eyebrow color={colors.primary} style={styles.sectionLabel}>{section.label}</Eyebrow>
            <Card bordered style={styles.sectionCard}>
              {section.rows.map((row, idx) => (
                <RowItem
                  key={`${section.label}-${row.label}`}
                  row={row}
                  isLast={idx === section.rows.length - 1}
                />
              ))}
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function RowItem({ row, isLast }: { row: Row; isLast: boolean }) {
  const borderStyle = !isLast && styles.rowBorder;

  if (row.kind === 'toggle') {
    return <ToggleItem label={row.label} sub={row.sub} initial={row.initial} border={borderStyle} />;
  }

  if (row.kind === 'static') {
    return (
      <View style={[styles.row, borderStyle]}>
        <View style={styles.rowDot} />
        <Txt variant="bodyLg" color={colors.onSurface} style={styles.rowLabel}>{row.label}</Txt>
        <Txt variant="bodyMd" color={colors.textSecondary}>{row.value}</Txt>
      </View>
    );
  }

  return (
    <Pressable
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      style={[styles.row, borderStyle]}
      accessibilityRole="button"
      accessibilityLabel={row.value ? `${row.label}: ${row.value}` : row.label}
      accessibilityHint={row.warning ? 'Destructive action' : undefined}
    >
      <View style={styles.rowDot} />
      <Txt
        variant="bodyLg"
        color={row.warning ? colors.error : colors.onSurface}
        style={styles.rowLabel}
      >
        {row.label}
      </Txt>
      {row.value ? <Txt variant="bodyMd" color={colors.textSecondary}>{row.value}</Txt> : null}
      <Txt variant="bodyMd" color={row.warning ? colors.error : colors.textSecondary} style={styles.rowChevron}>→</Txt>
    </Pressable>
  );
}

function ToggleItem({
  label,
  sub,
  initial,
  border,
}: {
  label: string;
  sub?: string;
  initial: boolean;
  border: object | false;
}) {
  const [on, setOn] = useState(initial);

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setOn((v) => !v);
      }}
      style={[styles.row, border]}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={sub ? `${label}, ${sub}` : label}
    >
      <View style={styles.rowDot} />
      <View style={styles.rowTextBlock}>
        <Txt variant="bodyLg" color={colors.onSurface}>{label}</Txt>
        {sub ? <Txt variant="labelSm" color={colors.textSecondary}>{sub}</Txt> : null}
      </View>
      <View style={[styles.togglePill, on ? styles.togglePillOn : styles.togglePillOff]}>
        <Txt
          variant="labelSm"
          color={on ? colors.onPrimary : colors.textSecondary}
          style={styles.toggleText}
        >
          {on ? 'ON' : 'OFF'}
        </Txt>
      </View>
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
  backBtn: { minWidth: 72 },
  headerTitle: { letterSpacing: -0.2 },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.lg },

  section: { gap: spacing.sm },
  sectionLabel: { marginLeft: spacing.xs },
  sectionCard: { gap: 0 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.outline },
  rowDot: {
    width: 18,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
  },
  rowTextBlock: { flex: 1, gap: 2 },
  rowLabel: { flex: 1 },
  rowChevron: { opacity: 0.5 },

  togglePill: {
    minWidth: 52,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglePillOn:  { backgroundColor: colors.primary },
  togglePillOff: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.outline },
  toggleText: {},
});

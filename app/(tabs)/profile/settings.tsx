import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';

/**
 * 2.4.2 Settings — grouped lists: Notifications / Account / Data / About.
 * SKELETON.
 */

type ToggleRow = {
  kind: 'toggle';
  label: string;
  sub?: string;
  initial: boolean;
};

type LinkRow = {
  kind: 'link';
  label: string;
  value?: string;
  warning?: boolean;
};

type StaticRow = {
  kind: 'static';
  label: string;
  value: string;
};

type Row = ToggleRow | LinkRow | StaticRow;

type Section = {
  label: string;
  rows: Row[];
};

const SECTIONS: Section[] = [
  {
    label: 'NOTIFICATIONS',
    rows: [
      { kind: 'toggle', label: 'Morning check-in',    sub: '08:00', initial: true  },
      { kind: 'toggle', label: 'Daily lesson',        sub: '09:30', initial: true  },
      { kind: 'toggle', label: 'Motivation of the day',             initial: false },
      { kind: 'toggle', label: 'Streak at risk',      sub: '21:00', initial: true  },
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
    <AtmosphericGradient theme="dawn">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={handleBack} hitSlop={12} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 160 }]}
        showsVerticalScrollIndicator={false}
      >
        {SECTIONS.map((section) => (
          <View key={section.label} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.label}</Text>
            <View style={styles.sectionBody}>
              {section.rows.map((row, idx) => (
                <RenderRow
                  key={`${section.label}-${row.label}-${idx}`}
                  row={row}
                  isLast={idx === section.rows.length - 1}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </AtmosphericGradient>
  );
}

function RenderRow({ row, isLast }: { row: Row; isLast: boolean }) {
  const rowStyle = [styles.row, !isLast && styles.rowBorder];

  if (row.kind === 'toggle') {
    return <ToggleItem label={row.label} sub={row.sub} initial={row.initial} style={rowStyle} />;
  }

  if (row.kind === 'static') {
    return (
      <View style={rowStyle}>
        <View style={styles.rowIcon} />
        <Text style={styles.rowLabel}>{row.label}</Text>
        <Text style={styles.rowValueMuted}>{row.value}</Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      style={rowStyle}
    >
      <View style={styles.rowIcon} />
      <Text style={[styles.rowLabel, row.warning && styles.rowLabelWarning]}>
        {row.label}
      </Text>
      {row.value ? <Text style={styles.rowValueMuted}>{row.value}</Text> : null}
      <Text style={[styles.rowChevron, row.warning && styles.rowChevronWarning]}>→</Text>
    </Pressable>
  );
}

function ToggleItem({
  label,
  sub,
  initial,
  style,
}: {
  label: string;
  sub?: string;
  initial: boolean;
  style: any;
}) {
  const [on, setOn] = useState(initial);

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setOn((v) => !v);
      }}
      style={style}
    >
      <View style={styles.rowIcon} />
      <View style={styles.rowTextBlock}>
        <Text style={styles.rowLabel}>{label}</Text>
        {sub ? <Text style={styles.rowSub}>{sub}</Text> : null}
      </View>
      <View style={[styles.togglePill, on ? styles.togglePillOn : styles.togglePillOff]}>
        <Text style={[styles.toggleText, on ? styles.toggleTextOn : styles.toggleTextOff]}>
          {on ? 'ON' : 'OFF'}
        </Text>
      </View>
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
    color: colors.onSurface,
  },
  headerTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.onSurface,
    letterSpacing: -0.2,
  },

  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },

  section: { gap: spacing.sm },
  sectionLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginLeft: spacing.sm,
  },
  sectionBody: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(49,51,47,0.06)',
  },
  rowIcon: {
    width: 18,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.08)',
  },
  rowTextBlock: { flex: 1, gap: 2 },
  rowLabel: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
  },
  rowLabelWarning: { color: colors.errorContainer },
  rowSub: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
  },
  rowValueMuted: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  rowChevron: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    opacity: 0.5,
    marginLeft: spacing.xs,
  },
  rowChevronWarning: {
    color: colors.errorContainer,
    opacity: 0.8,
  },

  togglePill: {
    minWidth: 52,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglePillOn: { backgroundColor: colors.primary },
  togglePillOff: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  toggleText: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.label,
  },
  toggleTextOn:  { color: colors.onPrimary },
  toggleTextOff: { color: colors.outline },
});

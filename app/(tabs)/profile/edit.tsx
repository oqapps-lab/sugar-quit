import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Keyboard, Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../../components/primitives/Card';
import { Eyebrow } from '../../../components/primitives/Eyebrow';
import { Txt } from '../../../components/primitives/Txt';
import { colors, radius, spacing } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

// ---------------------------------------------------------------------------
// Option data
// ---------------------------------------------------------------------------

const GOAL_OPTIONS = [
  { key: 'quit',   label: 'Quit completely' },
  { key: 'reduce', label: 'Reduce gradually' },
];

const PEAK_OPTIONS = [
  { key: 'morning',   label: 'Morning',   sub: '9:00 AM' },
  { key: 'afternoon', label: 'Afternoon', sub: '3:00 PM' },
  { key: 'evening',   label: 'Evening',   sub: '7:00 PM' },
  { key: 'night',     label: 'Night',     sub: '11:00 PM' },
];

const TRIGGER_OPTIONS = [
  { key: 'stress',   label: 'Stress' },
  { key: 'boredom',  label: 'Boredom' },
  { key: 'meals',    label: 'After meals' },
  { key: 'social',   label: 'Social pressure' },
  { key: 'emotions', label: 'Emotions' },
  { key: 'night',    label: 'Late-night' },
];

const CONSUMPTION_OPTIONS = [
  { key: 'little',   label: 'Just a bit',     sub: 'I can take it or leave it' },
  { key: 'moderate', label: 'Here and there', sub: 'A treat now and then' },
  { key: 'alot',     label: 'Most days',      sub: 'Sneaks into my routine' },
  { key: 'great',    label: 'Honestly, daily', sub: "It's kind of the default" },
  { key: 'runs',     label: 'It runs my day', sub: 'Reach for it without thinking' },
];

const TRIGGER_LABELS: Record<string, string> = {
  stress: 'Stress', boredom: 'Boredom', meals: 'After meals',
  social: 'Social pressure', emotions: 'Emotions', night: 'Late-night',
};

// ---------------------------------------------------------------------------
// PickerSheet — minimal bottom sheet
// ---------------------------------------------------------------------------

type SingleSheetProps = {
  visible: boolean;
  title: string;
  options: { key: string; label: string; sub?: string }[];
  selected: string;
  onSelect: (key: string) => void;
  onClose: () => void;
};

function useSheetAnim(visible: boolean) {
  const translateY = useRef(new Animated.Value(400)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      translateY.setValue(400);
      backdropOpacity.setValue(0);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 440,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 320,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      translateY.setValue(400);
      backdropOpacity.setValue(0);
    }
  }, [visible]);
  return { translateY, backdropOpacity };
}

function SingleSheet({ visible, title, options, selected, onSelect, onClose }: SingleSheetProps) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState(selected);
  const { translateY, backdropOpacity } = useSheetAnim(visible);
  useEffect(() => { if (visible) setDraft(selected); }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.sheetRoot}>
        <Animated.View style={[styles.sheetBackdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
        </Animated.View>
        <Animated.View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg, transform: [{ translateY }] }]}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetTitleRow}>
            <Txt variant="titleSm" style={styles.sheetTitle}>{title}</Txt>
            <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); onSelect(draft); }} hitSlop={8}>
              <Txt variant="bodyLg" color={colors.success}>Done ✓</Txt>
            </Pressable>
          </View>
          {options.map((o, i) => (
            <Pressable
              key={o.key}
              style={[styles.sheetRow, i < options.length - 1 && styles.sheetRowBorder]}
              onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setDraft(o.key); }}
              android_ripple={{ color: colors.primaryContainer, borderless: false }}
              accessibilityRole="radio"
              accessibilityState={{ selected: draft === o.key }}
            >
              <View style={styles.sheetRowText}>
                <Txt variant="bodyLg" color={draft === o.key ? colors.primary : colors.onSurface}>{o.label}</Txt>
                {o.sub ? <Txt variant="bodySm" color={colors.textSecondary}>{o.sub}</Txt> : null}
              </View>
              {draft === o.key && (
                <Txt variant="bodyMd" color={colors.primary}>✓</Txt>
              )}
            </Pressable>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
}

type MultiSheetProps = {
  visible: boolean;
  title: string;
  options: { key: string; label: string }[];
  selected: string[];
  onDone: (keys: string[]) => void;
  onClose: () => void;
};

function MultiSheet({ visible, title, options, selected, onDone, onClose }: MultiSheetProps) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState<string[]>(selected);
  const { translateY, backdropOpacity } = useSheetAnim(visible);
  useEffect(() => { if (visible) setDraft(selected); }, [visible]);

  const toggle = (key: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDraft((d) => d.includes(key) ? d.filter((k) => k !== key) : [...d, key]);
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.sheetRoot}>
        <Animated.View style={[styles.sheetBackdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
        </Animated.View>
        <Animated.View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg, transform: [{ translateY }] }]}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetTitleRow}>
            <Txt variant="titleSm" style={styles.sheetTitle}>{title}</Txt>
            <Pressable
              onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); onDone(draft); }}
              hitSlop={8}
            >
              <Txt variant="bodyLg" color={colors.success}>Done ✓</Txt>
            </Pressable>
          </View>
          {options.map((o, i) => {
            const on = draft.includes(o.key);
            return (
              <Pressable
                key={o.key}
                style={[styles.sheetRow, i < options.length - 1 && styles.sheetRowBorder]}
                onPress={() => toggle(o.key)}
                android_ripple={{ color: colors.primaryContainer, borderless: false }}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: on }}
              >
                <Txt variant="bodyLg" color={on ? colors.primary : colors.onSurface} style={styles.sheetRowText}>{o.label}</Txt>
                <View style={[styles.checkbox, on && styles.checkboxOn]}>
                  {on && <Txt variant="labelSm" color={colors.onPrimary} style={styles.checkmark}>✓</Txt>}
                </View>
              </Pressable>
            );
          })}
        </Animated.View>
      </View>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

type Sheet = 'goal' | 'peak' | 'triggers' | 'consumption' | null;

export default function EditProfile() {
  const insets = useSafeAreaInsets();
  const firstName    = useUserStore((s) => s.firstName);
  const goal         = useUserStore((s) => s.goal);
  const peakHour     = useUserStore((s) => s.peakHour);
  const triggers     = useUserStore((s) => s.triggers);
  const consumption  = useUserStore((s) => s.consumption);
  const setFirstName = useUserStore((s) => s.setFirstName);
  const setGoal      = useUserStore((s) => s.setGoal);
  const setPeakHour  = useUserStore((s) => s.setPeakHour);
  const setTriggers  = useUserStore((s) => s.setTriggers);
  const setConsumption = useUserStore((s) => s.setConsumption);

  const [nameDraft, setNameDraft] = useState(firstName ?? '');
  const [sheet, setSheet] = useState<Sheet>(null);
  const initial = (nameDraft[0] ?? 'Y').toUpperCase();

  const openSheet = (s: Sheet) => { Keyboard.dismiss(); setSheet(s); };

  const goalLabel    = goal === 'quit' ? 'Quit completely' : goal === 'reduce' ? 'Reduce gradually' : '—';
  const peakLabel    = PEAK_OPTIONS.find((p) => p.key === peakHour)?.sub ?? peakHour ?? '—';
  const triggerLabel = triggers.length > 0
    ? triggers.map((t) => TRIGGER_LABELS[t] ?? t).join(', ')
    : '—';
  const consumptionLabel = CONSUMPTION_OPTIONS.find((c) => c.key === consumption)?.label ?? '—';

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }}
          hitSlop={12} style={styles.headerSide} accessibilityRole="button">
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="titleMd" style={styles.headerTitle}>Edit profile</Txt>
        <View style={styles.headerSide} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarBlock}>
          <View style={styles.avatar}>
            <Txt variant="displayMd" color={colors.primary} style={styles.avatarInitial}>{initial}</Txt>
          </View>
          <Pressable onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} hitSlop={8}>
            <Txt variant="bodyMd" color={colors.primary}>Change photo</Txt>
          </Pressable>
        </View>

        {/* Name */}
        <View style={styles.fieldBlock}>
          <Eyebrow color={colors.textSecondary} style={styles.fieldLabel}>NAME</Eyebrow>
          <Card bordered>
            <TextInput
              value={nameDraft}
              onChangeText={setNameDraft}
              onBlur={() => setFirstName(nameDraft)}
              placeholder="Your first name"
              placeholderTextColor={colors.outline}
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="done"
              textContentType="givenName"
            />
          </Card>
        </View>

        {/* Goal */}
        <FieldRow label="GOAL" value={goalLabel} onPress={() => openSheet('goal')} />

        {/* Peak hour */}
        <FieldRow label="PEAK HOUR" value={peakLabel} onPress={() => openSheet('peak')} />

        {/* Triggers */}
        <FieldRow label="TRIGGERS" value={triggerLabel} onPress={() => openSheet('triggers')} />

        {/* Consumption */}
        <FieldRow label="SUGAR INTAKE" value={consumptionLabel} onPress={() => openSheet('consumption')} />
      </ScrollView>

      {/* Sheets */}
      <SingleSheet
        visible={sheet === 'consumption'}
        title="Sugar intake"
        options={CONSUMPTION_OPTIONS}
        selected={consumption ?? ''}
        onSelect={(k) => { setConsumption(k as any); setSheet(null); }}
        onClose={() => setSheet(null)}
      />
      <SingleSheet
        visible={sheet === 'goal'}
        title="Your goal"
        options={GOAL_OPTIONS}
        selected={goal ?? ''}
        onSelect={(k) => { setGoal(k as any); setSheet(null); }}
        onClose={() => setSheet(null)}
      />
      <SingleSheet
        visible={sheet === 'peak'}
        title="Peak craving time"
        options={PEAK_OPTIONS}
        selected={peakHour ?? ''}
        onSelect={(k) => { setPeakHour(k); setSheet(null); }}
        onClose={() => setSheet(null)}
      />
      <MultiSheet
        visible={sheet === 'triggers'}
        title="Your triggers"
        options={TRIGGER_OPTIONS}
        selected={triggers}
        onDone={(keys) => { setTriggers(keys); setSheet(null); }}
        onClose={() => setSheet(null)}
      />
    </View>
  );
}

// ---------------------------------------------------------------------------
// FieldRow
// ---------------------------------------------------------------------------

function FieldRow({ label, value, onPress }: { label: string; value: string; onPress: () => void }) {
  return (
    <View style={styles.fieldBlock}>
      <Eyebrow color={colors.textSecondary} style={styles.fieldLabel}>{label}</Eyebrow>
      <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onPress(); }}
        accessibilityRole="button">
        <Card bordered style={styles.pickerRow}>
          <Txt variant="bodyLg" color={colors.onSurface} style={styles.pickerValue}>{value}</Txt>
          <Txt variant="bodyMd" color={colors.textSecondary}>→</Txt>
        </Card>
      </Pressable>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

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

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.md },

  avatarBlock: { alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { letterSpacing: -1 },

  fieldBlock: { gap: spacing.xs },
  fieldLabel: { marginLeft: spacing.xs },
  input: { fontSize: 16, color: colors.onSurface, paddingVertical: spacing.xs },
  pickerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pickerValue: { flex: 1 },

  // Sheet
  sheetRoot: { flex: 1, flexDirection: 'column' },
  sheetBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    width: '100%',
    backgroundColor: colors.canvas,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.outline,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  sheetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sheetTitle: { marginBottom: spacing.sm },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    width: '100%',
  },
  sheetRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.outline },
  sheetRowText: { flex: 1, gap: 2 },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkmark: { lineHeight: 10, includeFontPadding: false },
});

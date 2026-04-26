import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

const TRIGGER_LABELS: Record<string, string> = {
  stress: 'Stress', boredom: 'Boredom', meals: 'After meals',
  social: 'Social pressure', emotions: 'Emotions', night: 'Late-night',
};

/**
 * 2.4.3 Edit Profile — name, goal, peak hour, trigger. Wired to store.
 */
export default function EditProfile() {
  const insets = useSafeAreaInsets();
  const firstName = useUserStore((s) => s.firstName);
  const goal = useUserStore((s) => s.goal);
  const peakHour = useUserStore((s) => s.peakHour);
  const triggers = useUserStore((s) => s.triggers);
  const setFirstName = useUserStore((s) => s.setFirstName);

  const [nameDraft, setNameDraft] = useState(firstName ?? '');
  const initial = (nameDraft[0] ?? 'Y').toUpperCase();
  const goalLabel = goal === 'quit' ? 'Quit completely' : goal === 'reduce' ? 'Reduce gradually' : '—';
  const peakLabel = peakHour ?? '—';
  const mainTriggerLabel = triggers[0] ? (TRIGGER_LABELS[triggers[0]] ?? triggers[0]) : '—';

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFirstName(nameDraft);
    router.back();
  };

  return (
    <AtmosphericGradient theme="dawn">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable
          onPress={handleBack}
          hitSlop={12}
          style={styles.headerSide}
          accessibilityRole="button"
          accessibilityLabel="Back without saving"
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Edit profile</Text>
        <Pressable
          onPress={handleSave}
          hitSlop={12}
          style={styles.headerSideRight}
          accessibilityRole="button"
          accessibilityLabel="Save profile changes"
        >
          <Text style={styles.headerLink}>Save</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarBlock}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>{initial}</Text>
          </View>
          <Pressable
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Change profile photo"
          >
            <Text style={styles.avatarLink}>Change photo</Text>
          </Pressable>
        </View>

        {/* Name */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>NAME</Text>
          <View style={styles.inputFrost}>
            <TextInput
              value={nameDraft}
              onChangeText={setNameDraft}
              placeholder="Your first name"
              placeholderTextColor={colors.outline}
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="done"
              textContentType="givenName"
              accessibilityLabel="Your first name"
            />
          </View>
        </View>

        {/* Goal */}
        <FieldRow label="GOAL" value={goalLabel} />

        {/* Peak hour */}
        <FieldRow label="PEAK HOUR" value={peakLabel} />

        {/* Main trigger */}
        <FieldRow label="MAIN TRIGGER" value={mainTriggerLabel} />

        {/* Bottom actions */}
        <View style={styles.footer}>
          <Pressable
            onPress={handleBack}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Cancel editing profile"
          >
            <Text style={styles.cancelLink}>Cancel</Text>
          </Pressable>
          <PillCTA label="Save" onPress={handleSave} variant="inline" />
        </View>
      </ScrollView>
    </AtmosphericGradient>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  // Read-only display row. The earlier Pressable claimed "Tap to change" in
  // its a11y label but only fired Haptics — no picker existed. That's a
  // misleading affordance: the row LOOKS interactive (chevron arrow,
  // pressable styling) and is announced as a button to VoiceOver, but tap
  // changes nothing. Until proper picker modals exist for goal / peak hour
  // / trigger, render the field as a non-interactive label so the user
  // doesn't expect editability that's not there. Re-onboarding via sign-out
  // remains the workaround for editing these fields.
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View
        style={styles.pickerRow}
        accessible
        accessibilityLabel={`${label}: ${value}`}
      >
        <Text style={styles.pickerValue}>{value}</Text>
      </View>
    </View>
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
  headerSide: { width: 48, alignItems: 'flex-start' },
  headerSideRight: { width: 48, alignItems: 'flex-end' },
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
  headerLink: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyLarge,
    color: colors.primary,
  },

  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },

  avatarBlock: {
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: 44,
    color: colors.primary,
    letterSpacing: -1,
  },
  avatarLink: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },

  fieldBlock: { gap: spacing.xs },
  fieldLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
    marginLeft: spacing.xs,
  },

  inputFrost: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: spacing.md,
  },
  input: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    paddingVertical: spacing.md,
  },

  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  pickerValue: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
  },
  pickerArrow: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    opacity: 0.6,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  cancelLink: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
  },
});

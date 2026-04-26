import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppHeader } from '../../../components/primitives/AppHeader';
import { Card } from '../../../components/primitives/Card';
import { Eyebrow } from '../../../components/primitives/Eyebrow';
import { Txt } from '../../../components/primitives/Txt';
import { colors, radius, spacing } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

const TRIGGER_LABELS: Record<string, string> = {
  stress:   'Stress',
  boredom:  'Boredom',
  meals:    'After meals',
  social:   'Social pressure',
  emotions: 'Emotions',
  night:    'Late-night',
};

export default function Profile() {
  const insets = useSafeAreaInsets();
  const firstName   = useUserStore((s) => s.firstName);
  const goal        = useUserStore((s) => s.goal);
  const peakHour    = useUserStore((s) => s.peakHour);
  const triggers    = useUserStore((s) => s.triggers);
  const streakDays  = useUserStore((s) => s.streakDays);
  const isPremium   = useUserStore((s) => s.isPremium);
  const cravings    = useUserStore((s) => s.cravings);
  const sosLog      = useUserStore((s) => s.sosLog);
  const totalDaysClean = useUserStore((s) => s.totalDaysClean);

  const displayName  = firstName ?? 'You';
  const initial      = displayName[0]?.toUpperCase() ?? 'Y';
  const planLabel    = isPremium ? 'PREMIUM' : 'FREE PLAN';
  const goalLabel    = goal === 'quit' ? 'Quit completely' : goal === 'reduce' ? 'Reduce gradually' : '—';
  const PEAK_TIMES: Record<string, string> = {
    morning: '9:00 AM', afternoon: '3:00 PM', evening: '7:00 PM', night: '11:00 PM',
  };
  const peakLabel = peakHour ? (PEAK_TIMES[peakHour] ?? peakHour) : '—';
  const triggerLabel = triggers.length > 0
    ? triggers.map((t) => TRIGGER_LABELS[t] ?? t).join(', ')
    : '—';

  const CONSUMPTION_LABELS: Record<string, string> = {
    little: 'Just a bit', moderate: 'Here and there',
    alot: 'Most days', great: 'Honestly, daily', runs: 'It runs my day',
  };
  const consumption     = useUserStore((s) => s.consumption);
  const consumptionLabel = consumption ? (CONSUMPTION_LABELS[consumption] ?? consumption) : '—';

  const sosWalked    = sosLog.filter((s) => s.outcome === 'walked' || s.outcome === 'softer').length;
  const cravingsMet  = sosWalked + cravings.filter((c) => c.outcome === 'walked').length;
  const dollarsSaved = (totalDaysClean * 1.5).toFixed(0);
  const kgSugar      = (totalDaysClean * 0.025).toFixed(1);

  const go = (fn: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    fn();
  };

  const menuItems = [
    { label: 'Edit profile',   icon: 'account-edit-outline',      onPress: () => go(() => router.push('/(tabs)/profile/edit')) },
    { label: 'Notifications',  icon: 'bell-outline',               onPress: () => go(() => router.push('/(tabs)/profile/settings')) },
    { label: 'Subscription',   icon: 'crown-outline',              onPress: () => go(() => router.push('/(modals)/paywall-contextual')) },
    { label: 'Settings',       icon: 'cog-outline',                onPress: () => go(() => router.push('/(tabs)/profile/settings')) },
    { label: 'Support',        icon: 'help-circle-outline',        onPress: undefined },
    { label: 'Privacy Policy', icon: 'shield-lock-outline',        onPress: undefined },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <AppHeader center="Profile" />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar hero */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.heroBlock}>
          <Pressable onPress={() => go(() => router.push('/(tabs)/profile/edit'))} accessibilityRole="button">
          <View style={styles.avatarWrap}>
            <View style={styles.avatarHalo} />
            <View style={styles.avatar}>
              <Txt variant="displayMd" color={colors.primary} style={styles.avatarInitial}>{initial}</Txt>
            </View>
          </View>
          </Pressable>
          <Txt variant="displaySm" style={styles.name}>{displayName}</Txt>
          <View style={[styles.planBadge, isPremium && styles.planBadgePremium]}>
            <Eyebrow color={isPremium ? colors.success : colors.primary}>{planLabel}</Eyebrow>
          </View>
        </Animated.View>

        {/* Stats tiles */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.statsRow}>
          <View style={[styles.statTile, { backgroundColor: colors.primary + '15' }]}>
            <Txt variant="displaySm" color={colors.primary} style={styles.statNumber}>{cravingsMet}</Txt>
            <Txt variant="labelSm" color={colors.textSecondary} style={styles.statLabel}>
              {cravingsMet === 1 ? 'CRAVING MET' : 'CRAVINGS MET'}
            </Txt>
          </View>
          <View style={[styles.statTile, { backgroundColor: colors.success + '15' }]}>
            <Txt variant="displaySm" color={colors.success} style={styles.statNumber}>${dollarsSaved}</Txt>
            <Txt variant="labelSm" color={colors.textSecondary} style={styles.statLabel}>SAVED</Txt>
          </View>
          <View style={[styles.statTile, { backgroundColor: colors.warning + '15' }]}>
            <Txt variant="displaySm" color={colors.warning} style={styles.statNumber}>{kgSugar}kg</Txt>
            <Txt variant="labelSm" color={colors.textSecondary} style={styles.statLabel}>SUGAR AVOIDED</Txt>
          </View>
        </Animated.View>


        {/* Craving profile */}
        <Animated.View entering={FadeInDown.delay(250).duration(400)}>
          <Pressable onPress={() => go(() => router.push('/(tabs)/profile/edit'))} accessibilityRole="button">
          <Card bordered style={styles.infoCard}>
            <Eyebrow color={colors.primary} style={styles.infoEyebrow}>YOUR CRAVING PROFILE</Eyebrow>
            {[
              { label: 'Goal',         value: goalLabel        },
              { label: 'Peak hour',    value: peakLabel        },
              { label: 'Main trigger', value: triggerLabel     },
              { label: 'Sugar intake', value: consumptionLabel },
            ].map((row) => (
              <View key={row.label} style={styles.infoRow}>
                <Txt variant="bodyMd" color={colors.textSecondary} style={styles.infoRowLabel}>{row.label}</Txt>
                <Txt variant="bodyMd" color={colors.onSurface} style={styles.infoRowValue}>{row.value}</Txt>
              </View>
            ))}
          </Card>
          </Pressable>
        </Animated.View>

        {/* Menu */}
        <Animated.View entering={FadeInDown.delay(350).duration(400)}>
          <Card bordered style={styles.menu}>
            {menuItems.map((m, i) => (
              <Pressable
                key={m.label}
                style={[styles.menuRow, i < menuItems.length - 1 && styles.menuRowBorder]}
                onPress={m.onPress}
                accessibilityRole="button"
                accessibilityLabel={m.label}
              >
                <View style={styles.menuIconWrap}>
                  <MaterialCommunityIcons
                    name={m.icon as any}
                    size={18}
                    color={colors.textSecondary}
                  />
                </View>
                <Txt variant="bodyLg" color={colors.onSurface} style={styles.menuLabel}>{m.label}</Txt>
                <MaterialCommunityIcons name="chevron-right" size={18} color={colors.outline} />
              </Pressable>
            ))}
          </Card>
        </Animated.View>

        <Txt variant="labelSm" color={colors.textSecondary} center style={styles.version}>v0.1.0</Txt>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.md },

  heroBlock: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.md },
  avatarWrap: { alignItems: 'center', justifyContent: 'center', width: 100, height: 100 },
  avatarHalo: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryContainer,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { letterSpacing: -1, lineHeight: 28, includeFontPadding: false },
  name: { letterSpacing: -0.6 },
  planBadge: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  planBadgePremium: {
    backgroundColor: colors.success + '22',
  },

  statsRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'stretch' },
  statTile: {
    flex: 1,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: { letterSpacing: -0.6 },
  statLabel: { textAlign: 'center', lineHeight: 14 },
  sugarHint: { opacity: 0.5, marginTop: -spacing.xs },

  infoCard: { gap: spacing.sm },
  infoEyebrow: { marginBottom: spacing.xs },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, paddingVertical: 2 },
  infoRowLabel: { width: 100, opacity: 0.6, flexShrink: 0 },
  infoRowValue: { flex: 1 },

  menu: { gap: 0 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.outline },
  menuIconWrap: {
    width: 28,
    alignItems: 'center',
  },
  menuLabel: { flex: 1 },

  version: { opacity: 0.4, marginTop: spacing.sm },
});

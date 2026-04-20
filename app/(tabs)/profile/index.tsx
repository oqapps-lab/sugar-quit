import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

const TRIGGER_LABELS: Record<string, string> = {
  stress: 'stress',
  boredom: 'boredom',
  meals: 'after meals',
  social: 'social pressure',
  emotions: 'emotions',
  night: 'late-night',
};

/**
 * 2.4.1 Profile tab — real profile, distinct from onboarding Result screen.
 * Reads identity, craving profile, stats from the persistent user store.
 */
export default function Profile() {
  const insets = useSafeAreaInsets();
  const firstName = useUserStore((s) => s.firstName);
  const goal = useUserStore((s) => s.goal);
  const peakHour = useUserStore((s) => s.peakHour);
  const triggers = useUserStore((s) => s.triggers);
  const streakDays = useUserStore((s) => s.streakDays);
  const isPremium = useUserStore((s) => s.isPremium);
  const cravings = useUserStore((s) => s.cravings);
  const sosLog = useUserStore((s) => s.sosLog);

  const displayName = firstName ?? 'You';
  const initial = displayName[0]?.toUpperCase() ?? 'Y';
  const planLabel = isPremium ? 'PREMIUM' : 'FREE PLAN';
  const goalLabel =
    goal === 'quit' ? 'Quit completely' : goal === 'reduce' ? 'Reduce gradually' : '—';
  const peakLabel = peakHour ?? '—';
  const triggerLabel =
    triggers.length > 0
      ? triggers.map((t) => TRIGGER_LABELS[t] ?? t).slice(0, 2).join(', ')
      : '—';

  // Stats — computed from real activity, not hardcoded multipliers.
  // - cravingsMet: each craving entry where user "walked through" + each SOS
  //   session resolved as "walked" or "softer".
  // - dollarsSaved: rough heuristic — average chocolate bar / candy unit
  //   $1.50/day (USD), times days clean. Conservative.
  // - kgSugar: average ~25g added sugar avoided per day = 0.025kg/day.
  const sosWalked = sosLog.filter((s) => s.outcome === 'walked' || s.outcome === 'softer').length;
  const cravingsWalked = cravings.filter((c) => c.outcome === 'walked').length;
  const cravingsMet = sosWalked + cravingsWalked;
  const dollarsSaved = (streakDays * 1.5).toFixed(0);
  const kgSugarAvoided = (streakDays * 0.025).toFixed(2);

  return (
    <AtmosphericGradient theme="dawn">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + name + plan */}
        <View style={styles.heroBlock}>
          <View style={styles.avatar}><Text style={styles.avatarInitial}>{initial}</Text></View>
          <Text style={styles.name}>{displayName}</Text>
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>{planLabel}</Text>
          </View>
        </View>

        {/* Stats — computed from real activity (cravings + SOS log + days).
            Numbers are honest: zero on Day 1, grow with use. */}
        <GlassCard tint="peach" style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{streakDays}</Text>
              <Text style={styles.statLabel}>days clean</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{cravingsMet}</Text>
              <Text style={styles.statLabel}>cravings met</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>${dollarsSaved}</Text>
              <Text style={styles.statLabel}>saved</Text>
            </View>
          </View>
          <Text style={styles.statsHint}>
            Approx {kgSugarAvoided}kg of added sugar avoided.
            {' '}<Text style={styles.statsHintMuted}>(~25g/day baseline)</Text>
          </Text>
        </GlassCard>

        {/* Info about craving profile */}
        <GlassCard tint="default" style={styles.infoCard}>
          <Text style={styles.infoLabel}>YOUR CRAVING PROFILE</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🎯</Text>
            <Text style={styles.infoText}>Goal — {goalLabel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>⏰</Text>
            <Text style={styles.infoText}>Peak hour — {peakLabel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>⚡</Text>
            <Text style={styles.infoText}>Main trigger — {triggerLabel}</Text>
          </View>
        </GlassCard>

        {/* Menu */}
        <View style={styles.menu}>
          {[
            { label: 'Edit profile',   icon: '✎', onPress: () => router.push('/(tabs)/profile/edit') },
            { label: 'Notifications',  icon: '♪', onPress: () => router.push('/(tabs)/profile/settings') },
            { label: 'Subscription',   icon: '◆', onPress: () => router.push('/(modals)/paywall-contextual') },
            { label: 'Settings',       icon: '⚙', onPress: () => router.push('/(tabs)/profile/settings') },
            { label: 'Support',        icon: '?', onPress: undefined },
            { label: 'Privacy Policy', icon: '🔒', onPress: undefined },
          ].map((m) => (
            <Pressable
              key={m.label}
              style={styles.menuRow}
              onPress={m.onPress}
              accessibilityRole="button"
              accessibilityLabel={m.label}
            >
              <Text style={styles.menuIcon}>{m.icon}</Text>
              <Text style={styles.menuLabel}>{m.label}</Text>
              <Text style={styles.menuArrow}>→</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.version}>v0.1.0</Text>
      </ScrollView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm, alignItems: 'center' },
  title: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleLarge, color: colors.onSurface, letterSpacing: -0.3 },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.lg },
  heroBlock: { alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  avatar: { width: 80, height: 80, borderRadius: radius.full, backgroundColor: colors.primaryContainer, alignItems: 'center', justifyContent: 'center' },
  avatarInitial: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium, color: colors.primary },
  name: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displaySmall, color: colors.onSurface, letterSpacing: -0.6 },
  planBadge: { backgroundColor: 'rgba(165,60,48,0.1)', paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: radius.full },
  planBadgeText: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.primary, letterSpacing: tracking.labelWide },

  statsCard: { padding: spacing.md },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statNumber: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.titleLarge + 4, color: colors.onSurface, letterSpacing: -0.5 },
  statLabel: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.onSurfaceVariant, letterSpacing: tracking.wide },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(49,51,47,0.1)' },
  statsHint: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  statsHintMuted: { opacity: 0.6 },

  infoCard: { padding: spacing.md, gap: spacing.sm },
  infoLabel: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.primary, letterSpacing: tracking.labelWide, marginBottom: spacing.xs },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  infoIcon: { fontSize: 16, width: 22 },
  infoText: { fontFamily: fonts.body, fontSize: typeScale.bodyMedium, color: colors.onSurface },

  menu: { backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: radius.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.7)' },
  menuRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, paddingHorizontal: spacing.md, borderBottomWidth: 1, borderBottomColor: 'rgba(49,51,47,0.05)' },
  menuIcon: { width: 22, fontSize: 14, color: colors.onSurfaceVariant, textAlign: 'center' },
  menuLabel: { flex: 1, fontFamily: fonts.body, fontSize: typeScale.bodyLarge, color: colors.onSurface },
  menuArrow: { color: colors.onSurfaceVariant, fontSize: 16, opacity: 0.5 },

  version: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.onSurfaceVariant, textAlign: 'center', opacity: 0.4, marginTop: spacing.md },
});

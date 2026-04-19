import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';

/**
 * 2.4.1 Profile tab — real profile, distinct from onboarding Result screen.
 * SKELETON.
 */
export default function Profile() {
  const insets = useSafeAreaInsets();

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
          <View style={styles.avatar}><Text style={styles.avatarInitial}>S</Text></View>
          <Text style={styles.name}>Sarah</Text>
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>PREMIUM · SINCE 6 APR</Text>
          </View>
        </View>

        {/* Stats quick */}
        <GlassCard tint="peach" style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>days clean</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>42</Text>
              <Text style={styles.statLabel}>cravings met</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>$72</Text>
              <Text style={styles.statLabel}>saved</Text>
            </View>
          </View>
        </GlassCard>

        {/* Info about craving profile */}
        <GlassCard tint="default" style={styles.infoCard}>
          <Text style={styles.infoLabel}>YOUR CRAVING PROFILE</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🎯</Text>
            <Text style={styles.infoText}>Goal — reduce gradually</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>⏰</Text>
            <Text style={styles.infoText}>Peak hour — 3:00 PM</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>⚡</Text>
            <Text style={styles.infoText}>Main trigger — stress</Text>
          </View>
        </GlassCard>

        {/* Menu */}
        <View style={styles.menu}>
          {[
            { label: 'Edit profile', icon: '✎' },
            { label: 'Notifications', icon: '♪' },
            { label: 'Subscription', icon: '◆' },
            { label: 'Settings', icon: '⚙' },
            { label: 'Support', icon: '?' },
            { label: 'Privacy Policy', icon: '🔒' },
          ].map((m) => (
            <Pressable key={m.label} style={styles.menuRow}>
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

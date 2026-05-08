import { router } from 'expo-router';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { DecorGlyph } from '../../../components/ui/DecorGlyph';
import { GlassCard } from '../../../components/ui/GlassCard';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { LINKS } from '../../../lib/links';
import { signOut as supabaseSignOut } from '../../../lib/supabase';
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
  const email = useUserStore((s) => s.email);
  const goal = useUserStore((s) => s.goal);
  const peakHour = useUserStore((s) => s.peakHour);
  const triggers = useUserStore((s) => s.triggers);
  const streakDays = useUserStore((s) => s.streakDays);
  const isPremium = useUserStore((s) => s.isPremium);
  const cravings = useUserStore((s) => s.cravings);
  const sosLog = useUserStore((s) => s.sosLog);
  const clearSession = useUserStore((s) => s.clearSession);

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
        {/* Avatar + name + plan. Avatar has a soft halo (concentric glow).
            Decorative flame next to the name marks the streak context. */}
        <Animated.View entering={FadeInUp.duration(400)} style={styles.heroBlock}>
          <View style={styles.avatarHaloWrap}>
            <View style={styles.avatarHaloOuter} />
            <View style={styles.avatarHaloInner} />
            <View style={styles.avatar}>
              <Text style={styles.avatarInitial}>{initial}</Text>
            </View>
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{displayName}</Text>
            {streakDays > 0 && <DecorGlyph variant="flame" size={32} style={{ marginLeft: 6 }} />}
          </View>
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>{planLabel}</Text>
          </View>
          {email && <Text style={styles.email}>{email}</Text>}
        </Animated.View>

        {/* Stats — computed from real activity (cravings + SOS log + days).
            Numbers are honest: zero on Day 1, grow with use. */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)}>
          <GlassCard tint="peach" style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <DecorGlyph variant="flame" size={24} />
                <Text style={styles.statNumber}>{streakDays}</Text>
                <Text style={styles.statLabel}>{streakDays === 1 ? 'day clean' : 'days clean'}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <DecorGlyph variant="heart" size={24} />
                <Text style={styles.statNumber}>{cravingsMet}</Text>
                <Text style={styles.statLabel}>{cravingsMet === 1 ? 'craving met' : 'cravings met'}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <DecorGlyph variant="compass" size={24} />
                <Text style={styles.statNumber}>${dollarsSaved}</Text>
                <Text style={styles.statLabel}>saved</Text>
              </View>
            </View>
            <Text style={styles.statsHint}>
              About {kgSugarAvoided}kg of added sugar avoided.
              {' '}<Text style={styles.statsHintMuted}>Based on the average 25g a day people add to coffee, snacks, and drinks.</Text>
            </Text>
          </GlassCard>
        </Animated.View>

        {/* Craving profile — replace emoji leaders (they render as ? box
            inside Plus Jakarta Sans) with DecorGlyph composition icons. */}
        <Animated.View entering={FadeInDown.delay(250).duration(400)}>
          <GlassCard tint="default" style={styles.infoCard}>
            <Text style={styles.infoLabel}>YOUR CRAVING PROFILE</Text>
            <View style={styles.infoRow}>
              <DecorGlyph variant="compass" size={22} />
              <Text style={styles.infoText}>Goal — {goalLabel}</Text>
            </View>
            <View style={styles.infoRow}>
              <DecorGlyph variant="sun" size={22} />
              <Text style={styles.infoText}>Peak hour — {peakLabel}</Text>
            </View>
            <View style={styles.infoRow}>
              <DecorGlyph variant="lightning" size={22} />
              <Text style={styles.infoText}>Main trigger — {triggerLabel}</Text>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Menu — icons are unicode BMP characters that render reliably
            across iOS fonts (emoji like 🔒 silently fall back to ? inside
            Plus Jakarta Sans). "✎ ♪ ◆ ⚙ ◐ ◉" all ship in the font. */}
        <Animated.View entering={FadeInDown.delay(350).duration(400)}>
          <View style={styles.menu}>
            {[
              { label: 'Edit profile',   iconKind: 'edit' as MenuIconKind, onPress: () => router.push('/(tabs)/profile/edit') },
              {
                // Subscription row is premium-aware:
                //  - free → upgrade paywall
                //  - premium → iOS native "Manage subscription" sheet
                label: isPremium ? 'Manage subscription' : 'Subscription',
                iconKind: 'subscription' as MenuIconKind,
                onPress: isPremium
                  ? () => Linking.openURL(LINKS.manageSubscription)
                  : () => router.push('/(modals)/paywall-contextual'),
              },
              { label: 'Settings',       iconKind: 'settings' as MenuIconKind, onPress: () => router.push('/(tabs)/profile/settings') },
              { label: 'Support',        iconKind: 'support' as MenuIconKind, onPress: () => router.push('/(modals)/support-form') },
              { label: 'Privacy Policy', iconKind: 'privacy' as MenuIconKind, onPress: () => Linking.openURL(LINKS.privacyPolicy) },
              {
                label: 'Sign out',
                iconKind: 'signout' as MenuIconKind,
                onPress: async () => {
                  await supabaseSignOut();
                  clearSession();
                  router.replace('/(auth)/sign-in');
                },
              },
            ].map((m) => (
              <Pressable
                key={m.label}
                style={styles.menuRow}
                onPress={m.onPress}
                accessibilityRole="button"
                accessibilityLabel={m.label}
              >
                <View style={styles.menuIconSlot}>
                  <MenuIcon kind={m.iconKind} />
                </View>
                <Text style={styles.menuLabel}>{m.label}</Text>
                <Text style={styles.menuArrow}>›</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        <Text style={styles.version}>v0.1.0</Text>
      </ScrollView>
    </AtmosphericGradient>
  );
}

/**
 * Inline vector menu icons. Built from plain Views/borders so they don't
 * depend on Plus Jakarta Sans (which doesn't ship ✎ ⚙ etc — they fell
 * through to [?] boxes). 6 kinds: edit/subscription/settings/support/
 * privacy/signout. Each ~22×22, primary tone.
 */
type MenuIconKind = 'edit' | 'subscription' | 'settings' | 'support' | 'privacy' | 'signout';

function MenuIcon({ kind }: { kind: MenuIconKind }) {
  const tint = colors.onSurface;
  if (kind === 'edit') {
    // Pencil: angled rectangle with tip.
    return (
      <View style={menuGlyph.canvas}>
        <View style={[menuGlyph.editBody, { backgroundColor: tint, transform: [{ rotate: '-45deg' }] }]} />
        <View style={[menuGlyph.editTip, { borderTopColor: tint, transform: [{ rotate: '-45deg' }] }]} />
      </View>
    );
  }
  if (kind === 'subscription') {
    // Diamond/gem.
    return (
      <View style={menuGlyph.canvas}>
        <View style={[menuGlyph.diamond, { backgroundColor: tint, transform: [{ rotate: '45deg' }] }]} />
      </View>
    );
  }
  if (kind === 'settings') {
    // 3 horizontal lines (sliders / settings).
    return (
      <View style={menuGlyph.canvas}>
        <View style={[menuGlyph.line, { backgroundColor: tint, top: 5 }]} />
        <View style={[menuGlyph.line, { backgroundColor: tint, top: 10 }]} />
        <View style={[menuGlyph.line, { backgroundColor: tint, top: 15 }]} />
      </View>
    );
  }
  if (kind === 'support') {
    // Speech bubble: rounded rect + small triangle tail.
    return (
      <View style={menuGlyph.canvas}>
        <View style={[menuGlyph.bubble, { borderColor: tint }]} />
      </View>
    );
  }
  if (kind === 'privacy') {
    // Shield: square with rounded top.
    return (
      <View style={menuGlyph.canvas}>
        <View style={[menuGlyph.shield, { borderColor: tint }]} />
      </View>
    );
  }
  // signout — arrow-out-of-box: small box + arrow leaving right.
  return (
    <View style={menuGlyph.canvas}>
      <View style={[menuGlyph.signoutBox, { borderColor: tint }]} />
      <View style={[menuGlyph.signoutArrow, { backgroundColor: tint }]} />
    </View>
  );
}

const menuGlyph = StyleSheet.create({
  canvas: { width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
  // edit (pencil)
  editBody: { width: 16, height: 4, position: 'absolute' },
  editTip: {
    width: 0, height: 0,
    position: 'absolute',
    borderLeftWidth: 3, borderRightWidth: 3,
    borderTopWidth: 4,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
    transform: [{ translateX: 9 }, { translateY: 0 }],
  },
  // subscription (diamond)
  diamond: { width: 12, height: 12 },
  // settings (3 lines)
  line: { position: 'absolute', left: 4, right: 4, height: 2, borderRadius: 1 },
  // support (chat bubble)
  bubble: { width: 18, height: 14, borderRadius: 4, borderWidth: 1.5 },
  // privacy (shield)
  shield: { width: 14, height: 16, borderTopLeftRadius: 7, borderTopRightRadius: 7, borderBottomLeftRadius: 2, borderBottomRightRadius: 2, borderWidth: 1.5 },
  // signout
  signoutBox: { width: 13, height: 14, borderWidth: 1.5, borderRadius: 1, borderRightWidth: 0, position: 'absolute', left: 2 },
  signoutArrow: { width: 10, height: 2, position: 'absolute', right: 1, top: 10 },
});

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm, alignItems: 'center' },
  title: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleLarge, color: colors.onSurface, letterSpacing: -0.3 },

  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.lg },
  heroBlock: { alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },

  avatarHaloWrap: { alignItems: 'center', justifyContent: 'center', width: 128, height: 128 },
  avatarHaloOuter: {
    position: 'absolute',
    width: 128, height: 128, borderRadius: 64,
    backgroundColor: 'rgba(255,172,160,0.2)',
  },
  avatarHaloInner: {
    position: 'absolute',
    width: 104, height: 104, borderRadius: 52,
    backgroundColor: 'rgba(255,172,160,0.35)',
  },
  avatar: {
    width: 80, height: 80, borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.25, shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  avatarInitial: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium, color: colors.primary },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displaySmall, color: colors.onSurface, letterSpacing: -0.6 },
  planBadge: { backgroundColor: 'rgba(165,60,48,0.1)', paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: radius.full },
  planBadgeText: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.primary, letterSpacing: tracking.labelWide },
  email: { fontFamily: fonts.bodyLight, fontSize: typeScale.labelSmall, color: colors.onSurfaceVariant, letterSpacing: tracking.wide, marginTop: 2 },

  statsCard: { padding: spacing.md },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stat: { flex: 1, alignItems: 'center', gap: 4 },
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
  // Slot for inline MenuIcon vector glyph (replaces text-based unicode that
  // rendered as [?] inside Plus Jakarta Sans — kakoccc #34 2026-04-29).
  menuIconSlot: { width: 28, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontFamily: fonts.body, fontSize: typeScale.bodyLarge, color: colors.onSurface },
  // Bumped opacity 0.5 → 0.7 + fontSize 16 → 18 so the right-side chevron
  // reads as a clear affordance, not a faint shadow (kakoccc #34).
  menuArrow: { color: colors.onSurfaceVariant, fontSize: 18, opacity: 0.7, includeFontPadding: false, textAlignVertical: 'center' },

  version: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.onSurfaceVariant, textAlign: 'center', opacity: 0.4, marginTop: spacing.md },
});

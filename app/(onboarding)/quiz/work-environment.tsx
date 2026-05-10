import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore, type WorkEnvironment } from '../../../stores/useUserStore';

/**
 * 1.11 Quiz: Work Environment — 4 options in 2×2 grid.
 */
export default function QuizWorkEnvironment() {
  const insets = useSafeAreaInsets();
  const stored = useUserStore((s) => s.workEnvironment);
  const setWorkEnvironment = useUserStore((s) => s.setWorkEnvironment);
  const [selected, setSelected] = useState<WorkEnvironment | null>(stored);

  // DRAFT (kakoccc #13 2026-04-29): replaced primitive geometric symbols
  // ▢ △ ◇ ◯ — which read as "draft placeholders" — with custom inline
  // shape glyphs (office, house, walking person, backpack) drawn from
  // plain Views. Emoji rendered as [?] boxes inside Plus Jakarta Sans
  // (no fallback), so we ship vector-style shapes instead. Designer can
  // swap for proper DecorGlyph SVGs later.
  // Unselected tint MUST NOT be 'peach' — that's our selected-state color
  // and creates visual confusion (option looks pre-selected).
  const options: { key: WorkEnvironment; title: string; tint: 'default' | 'mint' }[] = [
    { key: 'office', title: 'Office',     tint: 'default' },
    { key: 'home',   title: 'Home',       tint: 'mint' },
    { key: 'feet',   title: 'On my feet', tint: 'default' },
    { key: 'mobile', title: 'Mobile',     tint: 'mint' },
  ];

  const pick = (key: WorkEnvironment) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(key);
  };

  const handleContinue = () => {
    if (!selected) return;
    setWorkEnvironment(selected);
    router.push('/(onboarding)/quiz/name');
  };

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>STEP 11 OF 15</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.eyebrow}>YOUR DAYS</Text>
        <Text style={styles.hero}>Where do you spend your days?</Text>
        <Text style={styles.sub}>Context shapes the cravings we'll watch for.</Text>

        <View style={styles.grid}>
          {options.map((o) => {
            const isOn = selected === o.key;
            return (
              <Pressable
                key={o.key}
                style={styles.gridItem}
                onPress={() => pick(o.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: isOn }}
                accessibilityLabel={o.title}
              >
                <GlassCard
                  tint={isOn ? 'peach' : o.tint}
                  style={[styles.optionCard, isOn && styles.optionCardOn]}
                >
                  <View style={styles.glyphSlot}>
                    <WorkEnvGlyph kind={o.key} active={isOn} />
                  </View>
                  <Text style={[styles.optionTitle, isOn && styles.optionTitleOn]}>{o.title}</Text>
                </GlassCard>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA
          label="Continue"
          variant="onboarding"
          onPress={handleContinue}
          disabled={!selected}
        />
      </View>
    </AtmosphericGradient>
  );
}

/**
 * Inline vector glyphs for work-environment options. Each is built from
 * plain Views — no font dependency, renders identically across iOS+Android.
 * Active state uses primary color, inactive uses onSurfaceVariant.
 */
function WorkEnvGlyph({ kind, active }: { kind: WorkEnvironment; active: boolean }) {
  const tint = active ? colors.primary : colors.onSurfaceVariant;
  if (kind === 'office') {
    // Tall building with rows of windows.
    return (
      <View style={glyph.canvas}>
        <View style={[glyph.officeBody, { borderColor: tint }]}>
          <View style={[glyph.officeWindow, { backgroundColor: tint, top: 4, left: 5 }]} />
          <View style={[glyph.officeWindow, { backgroundColor: tint, top: 4, right: 5 }]} />
          <View style={[glyph.officeWindow, { backgroundColor: tint, top: 14, left: 5 }]} />
          <View style={[glyph.officeWindow, { backgroundColor: tint, top: 14, right: 5 }]} />
          <View style={[glyph.officeWindow, { backgroundColor: tint, top: 24, left: 5 }]} />
          <View style={[glyph.officeWindow, { backgroundColor: tint, top: 24, right: 5 }]} />
        </View>
      </View>
    );
  }
  if (kind === 'home') {
    // Pitched-roof house silhouette: triangle roof + square body.
    return (
      <View style={glyph.canvas}>
        <View style={[glyph.homeRoof, { borderBottomColor: tint }]} />
        <View style={[glyph.homeBody, { borderColor: tint, marginTop: -1 }]}>
          <View style={[glyph.homeDoor, { backgroundColor: tint }]} />
        </View>
      </View>
    );
  }
  if (kind === 'feet') {
    // Two footprints, staggered.
    return (
      <View style={glyph.canvas}>
        <View style={[glyph.foot, { backgroundColor: tint, top: 2, left: 4, transform: [{ rotate: '-12deg' }] }]} />
        <View style={[glyph.foot, { backgroundColor: tint, top: 14, right: 4, transform: [{ rotate: '12deg' }] }]} />
      </View>
    );
  }
  // mobile — backpack silhouette.
  return (
    <View style={glyph.canvas}>
      <View style={[glyph.bagStrap, { borderColor: tint }]} />
      <View style={[glyph.bagBody, { borderColor: tint, backgroundColor: 'transparent', marginTop: -2 }]}>
        <View style={[glyph.bagPocket, { borderColor: tint }]} />
      </View>
    </View>
  );
}

const glyph = StyleSheet.create({
  canvas: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  // office
  officeBody: { width: 24, height: 32, borderWidth: 1.5, borderRadius: 2, position: 'relative' },
  officeWindow: { position: 'absolute', width: 4, height: 4, borderRadius: 1 },
  // home
  homeRoof: {
    width: 0, height: 0,
    borderLeftWidth: 16, borderRightWidth: 16,
    borderBottomWidth: 13,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
  },
  homeBody: { width: 26, height: 18, borderWidth: 1.5, borderRadius: 2, alignItems: 'center', justifyContent: 'flex-end' },
  homeDoor: { width: 6, height: 10, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  // feet
  foot: { position: 'absolute', width: 12, height: 16, borderRadius: 6 },
  // mobile (backpack)
  bagStrap: { width: 18, height: 6, borderTopLeftRadius: 9, borderTopRightRadius: 9, borderWidth: 1.5, borderBottomWidth: 0 },
  bagBody: { width: 24, height: 22, borderWidth: 1.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  bagPocket: { width: 14, height: 6, borderRadius: 1, borderWidth: 1.2 },
});

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  backBtn: { width: 40, height: 40, borderRadius: radius.full, backgroundColor: 'rgba(49,51,47,0.06)', alignItems: 'center', justifyContent: 'center' },
  back: { fontSize: 22, color: colors.onSurface, includeFontPadding: false, textAlignVertical: 'center' },
  progressLabel: { fontFamily: fonts.label, fontSize: typeScale.label, color: colors.onSurface, letterSpacing: tracking.label },
  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, gap: spacing.sm },
  eyebrow: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.primary, letterSpacing: tracking.labelWide },
  hero: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium + 2, color: colors.onSurface, letterSpacing: -0.8, lineHeight: 38, marginTop: spacing.sm },
  sub: { fontFamily: fonts.body, fontSize: typeScale.bodyLarge, color: colors.onSurfaceVariant, lineHeight: 22, marginBottom: spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  gridItem: { width: '48.5%' },
  optionCard: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: 120,
    justifyContent: 'center',
  },
  optionCardOn: { borderColor: colors.primary, borderWidth: 1.5 },
  glyphSlot: { height: 40, alignItems: 'center', justifyContent: 'center' },
  optionTitle: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleMedium, color: colors.onSurface },
  optionTitleOn: { color: colors.primary },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

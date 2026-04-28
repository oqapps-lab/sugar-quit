import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  cancelAnimation,
  Easing,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { GlassCard } from '../../components/ui/GlassCard';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

type CommandRoute = '/(modals)/sos' | '/(modals)/craving-log';

const COMMANDS: { id: string; label: string; route: CommandRoute }[] = [
  { id: '01', label: 'Breathing combat protocol', route: '/(modals)/sos' },
  { id: '02', label: 'Emergency substitute', route: '/(modals)/craving-log' },
  { id: '03', label: 'Talk to AI now', route: '/(modals)/sos' },
];

export default function SosTransmissionScreen() {
  const insets = useSafeAreaInsets();
  const rm = useReducedMotion();
  const [lineWidth, setLineWidth] = useState(0);

  const dotX = useSharedValue(0);
  const dotScale = useSharedValue(1);
  const liveDotOpacity = useSharedValue(1);

  useEffect(() => {
    if (rm) return;
    liveDotOpacity.value = withRepeat(
      withTiming(0.2, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    dotScale.value = withRepeat(
      withTiming(1.5, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    return () => {
      cancelAnimation(liveDotOpacity);
      cancelAnimation(dotScale);
    };
  }, [rm, liveDotOpacity, dotScale]);

  useEffect(() => {
    if (rm || lineWidth === 0) return;
    dotX.value = 0;
    dotX.value = withRepeat(
      withTiming(lineWidth - 16, { duration: 8000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
    return () => cancelAnimation(dotX);
  }, [rm, lineWidth, dotX]);

  const dotAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: dotX.value }, { scale: dotScale.value }],
  }));

  const liveDotStyle = useAnimatedStyle(() => ({
    opacity: liveDotOpacity.value,
  }));

  const onLineLayout = (e: LayoutChangeEvent) => {
    setLineWidth(e.nativeEvent.layout.width);
  };

  const handleCommand = (route: CommandRoute) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route);
  };

  const handleDismiss = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.dismiss();
  };

  return (
    <AtmosphericGradient theme="dawn">
      {/* Layer 1 — Background auras */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <AuraBlob tint="coral" size={380} style={styles.auraTopLeft} intensity={0.4} drift={22} />
        <AuraBlob tint="lavender" size={310} style={styles.auraBottomRight} intensity={0.35} drift={18} />
      </View>

      {/* Layer 3 (top) — Nav bar */}
      <View style={[styles.nav, { paddingTop: insets.top + spacing.xs }]}>
        <View style={styles.navLeft}>
          <Text style={styles.navBrand}>SUGAR_QUIT</Text>
        </View>
        <Pressable
          onPress={handleDismiss}
          style={styles.livePill}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Animated.View style={[styles.livePillDot, liveDotStyle]} />
          <Text style={styles.livePillLabel}>LIVE</Text>
        </Pressable>
      </View>

      {/* Layer 2 — Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + NAV_HEIGHT + spacing.lg,
            paddingBottom: insets.bottom + spacing.xxxl + spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Status header */}
        <Animated.View entering={FadeInUp.duration(380)} style={styles.statusRow}>
          <View style={styles.aiLiveBadge}>
            <View style={styles.aiLiveDot} />
            <Text style={styles.aiLiveLabel}>AI · LIVE</Text>
          </View>
          <View style={styles.agentBlock}>
            <Text style={styles.agentId}>AGENT-07</Text>
            <Text style={styles.agentStatus}>ENGAGED</Text>
          </View>
        </Animated.View>

        {/* Strike message card */}
        <Animated.View entering={FadeInUp.delay(80).duration(380)} style={styles.cardWrap}>
          <GlassCard tint="cream" style={styles.strikeCard}>
            <View style={styles.strikeContent}>
              <Text style={styles.headline}>
                {'Hold. This wave dies in\n'}
                <Text style={styles.headlineAccent}>4 minutes.</Text>
              </Text>

              <View style={styles.telemetry}>
                <View style={styles.telemetryBar} />
                <View style={styles.telemetryLines}>
                  <View style={styles.telemetryRow}>
                    <Text style={styles.telemetryGlyph}>&gt;</Text>
                    <Text style={styles.telemetryText}>
                      {'CRAVING DETECTED: '}
                      <Text style={styles.telemetryDanger}>HIGH</Text>
                    </Text>
                  </View>
                  <View style={styles.telemetryRow}>
                    <Text style={styles.telemetryGlyph}>&gt;</Text>
                    <Text style={styles.telemetryText}>{"YOU'VE CRUSHED 1 BEFORE THIS"}</Text>
                  </View>
                  <View style={styles.telemetryRow}>
                    <Text style={styles.telemetryGlyph}>&gt;</Text>
                    <Text style={[styles.telemetryText, styles.telemetryWin]}>
                      YOU WILL CRUSH THIS ONE
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Breathing pacer */}
        <Animated.View entering={FadeInUp.delay(160).duration(380)} style={styles.breathingModule}>
          <Text style={styles.breathingLabel}>◉ INHALE · HOLD · EXHALE</Text>
          <View style={styles.breathingViz} onLayout={onLineLayout}>
            <LinearGradient
              colors={[colors.secondary, colors.primary, colors.tertiary]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.breathLine}
            />
            {lineWidth > 0 && (
              <Animated.View style={[styles.breathDot, dotAnimStyle]} />
            )}
          </View>
        </Animated.View>

        {/* Command list */}
        <Animated.View entering={FadeInDown.delay(220).duration(380)} style={styles.commands}>
          {COMMANDS.map((cmd) => (
            <Pressable
              key={cmd.id}
              style={({ pressed }) => [styles.cmdBtn, pressed && styles.cmdBtnActive]}
              onPress={() => handleCommand(cmd.route)}
              accessibilityRole="button"
              accessibilityLabel={cmd.label}
            >
              <View style={styles.cmdLeft}>
                <Text style={styles.cmdNumber}>{cmd.id}</Text>
                <Text style={styles.cmdLabel}>{cmd.label}</Text>
              </View>
              <Text style={styles.cmdArrow}>→</Text>
            </Pressable>
          ))}
        </Animated.View>
      </ScrollView>
    </AtmosphericGradient>
  );
}

const NAV_HEIGHT = 56;

const styles = StyleSheet.create({
  // ── Aura blobs ──────────────────────────────────────────────────────────────
  auraTopLeft: {
    position: 'absolute',
    top: -80,
    left: -100,
  },
  auraBottomRight: {
    position: 'absolute',
    bottom: -100,
    right: -80,
  },

  // ── Nav bar ─────────────────────────────────────────────────────────────────
  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    height: NAV_HEIGHT + 40,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: 'rgba(251,249,245,0.75)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(165,60,48,0.08)',
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  navBrand: {
    fontFamily: fonts.label,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
    letterSpacing: tracking.labelWide,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  livePillDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.onPrimary,
  },
  livePillLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onPrimary,
    letterSpacing: tracking.label,
  },

  // ── Scroll content ───────────────────────────────────────────────────────────
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },

  // ── Status row ───────────────────────────────────────────────────────────────
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.inverseSurface,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
  },
  aiLiveDot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
    backgroundColor: colors.tertiary,
  },
  aiLiveLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.surfaceBright,
    letterSpacing: tracking.label,
  },
  agentBlock: { alignItems: 'flex-end' },
  agentId: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.widest,
  },
  agentStatus: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    fontWeight: '700',
  },

  // ── Strike card ──────────────────────────────────────────────────────────────
  cardWrap: { borderRadius: radius.sm, overflow: 'hidden' },
  strikeCard: { borderRadius: radius.sm },
  strikeContent: { padding: spacing.lg + spacing.xs },
  headline: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    letterSpacing: tracking.tight,
    lineHeight: 36,
    marginBottom: spacing.lg,
  },
  headlineAccent: {
    color: colors.primary,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.primary,
  },

  // Telemetry block
  telemetry: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  telemetryBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
    opacity: 0.7,
  },
  telemetryLines: { flex: 1, gap: spacing.sm },
  telemetryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  telemetryGlyph: {
    fontFamily: fonts.label,
    fontSize: typeScale.bodyMedium,
    color: colors.secondary,
    opacity: 0.7,
  },
  telemetryText: {
    fontFamily: fonts.label,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
    flexShrink: 1,
  },
  telemetryDanger: {
    color: colors.error,
    fontWeight: '700',
  },
  telemetryWin: {
    color: colors.primary,
    fontWeight: '700',
  },

  // ── Breathing module ─────────────────────────────────────────────────────────
  breathingModule: { alignItems: 'center', gap: spacing.sm },
  breathingLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.secondary,
    letterSpacing: tracking.labelWide,
    opacity: 0.8,
  },
  breathingViz: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  breathLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    borderRadius: 1,
  },
  breathDot: {
    position: 'absolute',
    left: 0,
    width: 16,
    height: 16,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },

  // ── Command buttons ──────────────────────────────────────────────────────────
  commands: { gap: spacing.sm },
  cmdBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cmdBtnActive: {
    backgroundColor: colors.surfaceContainer,
    borderColor: colors.outlineVariant,
  },
  cmdLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  cmdNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.titleLarge,
    color: colors.outlineVariant,
  },
  cmdLabel: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    letterSpacing: tracking.wide,
  },
  cmdArrow: {
    fontFamily: fonts.headlineBold,
    fontSize: typeScale.titleMedium,
    color: colors.primary,
  },
});

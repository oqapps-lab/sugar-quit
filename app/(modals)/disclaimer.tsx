import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';

/**
 * 4.8 First-time SOS disclaimer.
 * Shown before the very first SOS chat. On accept → mark flag in store so
 * subsequent SOS opens skip this screen, then replace with /(modals)/sos.
 */

export default function Disclaimer() {
  const insets = useSafeAreaInsets();
  const acceptSosDisclaimer = useUserStore((s) => s.acceptSosDisclaimer);

  const onAccept = () => {
    acceptSosDisclaimer();
    router.replace('/(modals)/sos');
  };

  const bullets = [
    "Our coach is AI. It's trained to listen well — not to diagnose or prescribe.",
    "If something feels like a medical issue, please speak to a clinician.",
    "Anything you share stays private to your account.",
  ];

  return (
    <AtmosphericGradient theme="dawn">
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.5} drift={22} />
        <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={16} />
      </View>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={{ width: 36 }} />
        <Pressable
          onPress={() => router.dismiss()}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Close disclaimer"
        >
          <Text style={styles.closeX}>×</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.glyph}>
          <DecorGlyph variant="compass" size={64} />
        </Animated.View>

        <Animated.Text entering={FadeInUp.delay(120).duration(400)} style={styles.eyebrow}>
          BEFORE WE TALK
        </Animated.Text>
        <Animated.Text entering={FadeInUp.delay(180).duration(400)} style={styles.title}>
          Sugar Quit is a companion, not a medical advisor.
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(250).duration(400)} style={styles.bullets}>
          {bullets.map((b, i) => (
            <Animated.View key={i} entering={FadeInDown.delay(320 + i * 80).duration(400)} style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>{b}</Text>
            </Animated.View>
          ))}
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.delay(600).duration(400)} style={[styles.actions, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="I understand — let's talk" onPress={onAccept} />
        <Pressable
          onPress={() => router.dismiss()}
          style={styles.cancelBtn}
          accessibilityRole="button"
          accessibilityLabel="Not now, dismiss disclaimer"
        >
          <Text style={styles.cancelLabel}>Not now</Text>
        </Pressable>
      </Animated.View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: { fontSize: 22, color: colors.onSurface, lineHeight: 22, fontFamily: fonts.headlineLight },

  // Background aura layer
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -80,
    right: -110,
  },
  auraBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -100,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  glyph: {
    width: 96, height: 96, borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  title: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    letterSpacing: -0.8,
    textAlign: 'center',
    lineHeight: 34,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    maxWidth: 320,
  },

  bullets: {
    gap: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  bulletRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 6, height: 6, borderRadius: radius.full,
    backgroundColor: colors.primary,
    marginTop: 8,
  },
  bulletText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
    lineHeight: 20,
  },

  actions: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  cancelBtn: { padding: spacing.md },
  cancelLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
});

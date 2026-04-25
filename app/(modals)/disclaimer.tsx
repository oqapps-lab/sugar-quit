import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
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

  return (
    <AtmosphericGradient theme="dawn">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={{ width: 36 }} />
        <Pressable onPress={() => router.dismiss()} style={styles.closeBtn}>
          <Text style={styles.closeX}>×</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.glyph}>
          <Text style={styles.glyphMark}>◈</Text>
        </View>

        <Text style={styles.eyebrow}>BEFORE WE TALK</Text>
        <Text style={styles.title}>Sugar Quit is a companion, not a medical advisor.</Text>

        <View style={styles.bullets}>
          <View style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>
              Our coach is AI. It's trained to listen well — not to diagnose or prescribe.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>
              If something feels like a medical issue, please speak to a clinician.
            </Text>
          </View>
          <View style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>
              Anything you share stays private to your account.
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.actions, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="I understand — let's talk" onPress={onAccept} />
        <Pressable onPress={() => router.dismiss()} style={styles.cancelBtn}>
          <Text style={styles.cancelLabel}>Not now</Text>
        </Pressable>
      </View>
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
  glyphMark: {
    fontFamily: fonts.headlineBold,
    fontSize: 40,
    color: colors.primary,
    lineHeight: 44,
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

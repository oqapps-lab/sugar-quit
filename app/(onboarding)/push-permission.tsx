import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { shortPeak } from '../../lib/peakHour';
import { useUserStore } from '../../stores/useUserStore';

/**
 * 1.17 Push Permission — framed as a promise, not a permission.
 * Terminal screen of onboarding; replaces to (tabs)/home.
 */
export default function PushPermission() {
  const insets = useSafeAreaInsets();
  const peakHour = useUserStore((s) => s.peakHour);
  const finish = () => router.replace('/(tabs)/home');

  return (
    <AtmosphericGradient theme="dawn">
      {/* Background aura blobs */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.5} drift={22} />
        <AuraBlob tint="golden" size={260} style={styles.auraBottomLeft} intensity={0.45} drift={18} />
      </View>

      <View style={[styles.root, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.lg }]}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.hero}>
          <Text style={styles.eyebrow}>THE PROMISE</Text>
          <Text style={styles.title}>We'll warn you 15 minutes before your {shortPeak(peakHour)}</Text>
          <Text style={styles.sub}>One push when the pattern predicts a craving. That's it. No spam, ever.</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(150).duration(450)} style={styles.illustration}>
          <View style={styles.bellOuter}>
            <View style={styles.bellInner} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(250).duration(450)} style={styles.promises}>
          <PromiseRow text="Only when your pattern predicts a craving" />
          <PromiseRow text="Max 1 push per day" />
          <PromiseRow text="Turn off anytime in settings" />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(450)} style={styles.footer}>
          <PillCTA label="Turn on predictions" onPress={finish} />
          <Pressable
            onPress={finish}
            style={styles.laterBtn}
            accessibilityRole="button"
            accessibilityLabel="Maybe later, skip notifications"
          >
            <Text style={styles.laterLabel}>Maybe later</Text>
          </Pressable>
        </Animated.View>
      </View>
    </AtmosphericGradient>
  );
}

function PromiseRow({ text }: { text: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.dot} />
      <Text style={styles.rowText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -80,
    right: -120,
  },
  auraBottomLeft: {
    position: 'absolute',
    bottom: -60,
    left: -120,
  },
  root: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'space-between' },
  hero: { alignItems: 'center', gap: spacing.xs },
  eyebrow: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.primary, letterSpacing: tracking.labelWide, marginBottom: spacing.sm },
  title: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium, color: colors.onSurface, textAlign: 'center', letterSpacing: -0.8, lineHeight: 32, maxWidth: 320 },
  sub: { fontFamily: fonts.body, fontSize: typeScale.bodyLarge, color: colors.onSurfaceVariant, textAlign: 'center', lineHeight: 22, maxWidth: 320, marginTop: spacing.xs },

  illustration: { alignItems: 'center' },
  bellOuter: { width: 120, height: 120, borderRadius: radius.full, backgroundColor: 'rgba(255,172,160,0.3)', alignItems: 'center', justifyContent: 'center' },
  bellInner: { width: 64, height: 64, borderRadius: radius.full, backgroundColor: colors.primary },

  promises: { gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.md },
  dot: { width: 6, height: 6, borderRadius: radius.full, backgroundColor: colors.primary },
  rowText: { fontFamily: fonts.body, fontSize: typeScale.bodyMedium, color: colors.onSurface, flex: 1, lineHeight: 20 },

  footer: { gap: spacing.md, alignItems: 'center' },
  laterBtn: { padding: spacing.sm },
  laterLabel: { fontFamily: fonts.bodyMedium, fontSize: typeScale.bodyMedium, color: colors.onSurfaceVariant },
});

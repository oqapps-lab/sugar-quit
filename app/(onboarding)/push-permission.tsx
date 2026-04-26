import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';

export default function PushPermission() {
  const insets = useSafeAreaInsets();
  const finish = () => router.replace('/(tabs)/home');

  return (
    <View style={[styles.root, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.lg }]}>
      <Animated.View entering={FadeInUp.duration(450)} style={styles.hero}>
        <Eyebrow color={colors.primary} style={styles.eyebrow}>The promise</Eyebrow>
        <Txt variant="displayMd" style={styles.title} center>
          We'll warn you 15 minutes before your 3pm
        </Txt>
        <Txt variant="bodyLg" color={colors.textSecondary} center style={styles.sub}>
          One push when the pattern predicts a craving. That's it. No spam, ever.
        </Txt>
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
          <Txt variant="bodyMd" color={colors.textSecondary}>Maybe later</Txt>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function PromiseRow({ text }: { text: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.dot} />
      <Txt variant="bodyMd" color={colors.onSurface} style={styles.rowText}>{text}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },
  hero: { alignItems: 'center', gap: spacing.xs },
  eyebrow: { textAlign: 'center', marginBottom: spacing.sm },
  title: { letterSpacing: -0.8, lineHeight: 32, maxWidth: 320 },
  sub: { lineHeight: 22, maxWidth: 320, marginTop: spacing.xs },

  illustration: { alignItems: 'center' },
  bellOuter: {
    width: 120,
    height: 120,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellInner: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },

  promises: { gap: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  dot: { width: 6, height: 6, borderRadius: radius.full, backgroundColor: colors.primary },
  rowText: { flex: 1, lineHeight: 20 },

  footer: { gap: spacing.md, alignItems: 'center' },
  laterBtn: { padding: spacing.sm },
});

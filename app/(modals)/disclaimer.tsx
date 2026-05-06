import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, spacing } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';

export default function Disclaimer() {
  const insets = useSafeAreaInsets();
  const acceptSosDisclaimer = useUserStore((s) => s.acceptSosDisclaimer);

  const onAccept = () => {
    acceptSosDisclaimer();
    router.replace('/(modals)/sos');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>

      {/* Content */}
      <View style={styles.content}>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.textBlock}>
          <Eyebrow color={colors.primary}>Before we talk</Eyebrow>
          <Txt variant="displayMd" style={styles.title}>
            Sugar Quit is a companion, not a medical advisor.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(120).duration(400)} style={styles.bullets}>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.bullet}>
            Our coach is AI — trained to listen well, not to diagnose or prescribe.
          </Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.bullet}>
            If something feels like a medical issue, please speak to a clinician.
          </Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.bullet}>
            Anything you share stays private to your account.
          </Txt>
        </Animated.View>
      </View>

      {/* Actions */}
      <Animated.View entering={FadeInDown.delay(240).duration(400)} style={styles.actions}>
        <PillCTA label="I understand — let's talk" onPress={onAccept} />
        <Pressable
          onPress={() => router.dismiss()}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Not now"
        >
          <Txt variant="bodyMd" color={colors.textSecondary} center style={styles.cancel}>
            Not now
          </Txt>
        </Pressable>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    gap: spacing.xl,
  },

  textBlock: { gap: spacing.md },
  title: {
    letterSpacing: -0.6,
    lineHeight: 34,
  },

  bullets: { gap: spacing.lg },
  bullet: { lineHeight: 24 },

  actions: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
    alignItems: 'center',
  },
  cancel: { paddingVertical: spacing.sm },
});

import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { HeroNumber } from '../../components/primitives/HeroNumber';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, spacing } from '../../constants/tokens';

export default function Motivational2() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }} hitSlop={8}
          accessibilityRole="button" style={styles.backBtn}>
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="labelSm" color={colors.textSecondary}>STEP 9 OF 15</Txt>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.body}>
        <Animated.View entering={FadeInUp.duration(400)}>
          <Eyebrow color={colors.primary} style={styles.eyebrow}>You're not alone</Eyebrow>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.numberWrap}>
          <HeroNumber value="75%" color={colors.primary} style={styles.heroNum} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.textBlock}>
          <Txt variant="displaySm" style={styles.headline}>
            of adults in the US want to reduce sugar.
          </Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
            You're not alone. This is a quiet epidemic,{'\n'}
            and you are one of many stepping out of it.
          </Txt>
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeInDown.delay(350).duration(400)}
        style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}
      >
        <PillCTA
          label="Continue"
          onPress={() => router.push('/(onboarding)/quiz/past-attempts')}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  backBtn: { minWidth: 60 },
  headerRight: { minWidth: 60 },

  body: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
  },
  eyebrow: { textAlign: 'center' },
  numberWrap: { alignItems: 'center' },
  heroNum: { marginVertical: spacing.sm },
  textBlock: { alignItems: 'center', gap: spacing.md, maxWidth: 320 },
  headline: {
    letterSpacing: -0.5,
    textAlign: 'center',
    lineHeight: 30,
  },
  sub: {
    textAlign: 'center',
    lineHeight: 22,
  },

  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

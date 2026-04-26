import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eyebrow } from '../../../components/primitives/Eyebrow';
import { PillCTA } from '../../../components/primitives/PillCTA';
import { Txt } from '../../../components/primitives/Txt';
import { colors, radius, spacing } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

export default function QuizName() {
  const insets = useSafeAreaInsets();
  const stored = useUserStore((s) => s.firstName);
  const setFirstName = useUserStore((s) => s.setFirstName);
  const [name, setName] = useState(stored ?? '');

  const goNext = () => {
    setFirstName(name);
    router.push('/(onboarding)/loading');
  };

  return (
    <KeyboardAvoidingView
      style={styles.kav}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={[styles.root, { paddingTop: insets.top }]}>
          <View style={styles.header}>
            <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }} hitSlop={8}
              accessibilityRole="button" style={styles.backBtn}>
              <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
            </Pressable>
            <Txt variant="labelSm" color={colors.textSecondary}>STEP 12 OF 15</Txt>
            <Pressable onPress={goNext} hitSlop={8} accessibilityRole="button" accessibilityLabel="Skip">
              <Txt variant="bodyMd" color={colors.textSecondary}>Skip</Txt>
            </Pressable>
          </View>

          <View style={styles.body}>
            <Animated.View entering={FadeInUp.duration(400)} style={styles.textBlock}>
              <Eyebrow color={colors.primary}>One last thing</Eyebrow>
              <Txt variant="displayMd" style={styles.hero}>What should we call you?</Txt>
              <Txt variant="bodyLg" color={colors.textSecondary} style={styles.sub}>
                Optional. We'll keep it soft and personal.
              </Txt>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(120).duration(400)}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your first name"
                placeholderTextColor={colors.outline}
                style={styles.input}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={goNext}
                textContentType="givenName"
                accessibilityLabel="Your first name"
              />
            </Animated.View>
          </View>

          <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
            <PillCTA label="Continue" onPress={goNext} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kav: { flex: 1, backgroundColor: colors.canvas },
  root: { flex: 1 },
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

  body: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  textBlock: { gap: spacing.sm },
  hero: { letterSpacing: -0.6, marginTop: spacing.xs },
  sub: { lineHeight: 22 },

  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 20,
    color: colors.onSurface,
    letterSpacing: -0.3,
  },

  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

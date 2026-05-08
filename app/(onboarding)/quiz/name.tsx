import { router } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { useUserStore } from '../../../stores/useUserStore';

/**
 * 1.12 Quiz: Name — optional text input + Skip + Continue.
 *
 * Keyboard handling:
 * - KeyboardAvoidingView keeps the Continue CTA above the keyboard (iOS padding).
 * - Tapping anywhere outside the TextInput dismisses the keyboard.
 */
export default function QuizName() {
  const insets = useSafeAreaInsets();
  const stored = useUserStore((s) => s.firstName);
  const setFirstName = useUserStore((s) => s.setFirstName);
  const [name, setName] = useState(stored ?? '');

  const goNext = () => {
    // Persist whatever they typed (empty string clears to null in the store helper).
    setFirstName(name);
    router.push('/(onboarding)/loading');
  };

  return (
    <AtmosphericGradient theme="sunriseGreens">
      {/* N5 fix (live ui-qa 2026-05-04): the prior wrapper used
          StyleSheet.absoluteFill on both KAV and the inner View. AbsoluteFill
          pins to all four edges, so KAV's `behavior: padding` could not
          shrink the visible area when the keyboard rose — Continue stayed
          underneath. Flex layout (`flex: 1`) lets the bottom edge actually
          rise. */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
              <Pressable onPress={() => router.back()} style={styles.backBtn} accessibilityRole="button" accessibilityLabel="Back">
                <Text style={styles.back}>←</Text>
              </Pressable>
              <Text style={styles.progressLabel}>STEP 12 OF 15</Text>
              <Pressable onPress={goNext} style={styles.skipBtn} accessibilityRole="button" accessibilityLabel="Skip name">
                <Text style={styles.skipLabel}>Skip</Text>
              </Pressable>
            </View>

            <View style={styles.body}>
              <Text style={styles.eyebrow}>ONE LAST THING</Text>
              <Text style={styles.hero}>What should we call you?</Text>
              <Text style={styles.sub}>Optional. We'll keep it soft and personal.</Text>

              <View style={styles.inputWrap}>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Your first name"
                  placeholderTextColor={colors.outline}
                  selectionColor={colors.primary}
                  cursorColor={colors.primary}
                  style={styles.input}
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={goNext}
                  textContentType="givenName"
                  accessibilityLabel="Your first name"
                  accessibilityHint="Optional. Press Done or Continue to proceed."
                />
              </View>
            </View>

            <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
              <PillCTA label="Continue" variant="onboarding" onPress={goNext} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  backBtn: { width: 40, height: 40, borderRadius: radius.full, backgroundColor: 'rgba(49,51,47,0.06)', alignItems: 'center', justifyContent: 'center' },
  back: { fontSize: 22, color: colors.onSurface, includeFontPadding: false, textAlignVertical: 'center' },
  progressLabel: { fontFamily: fonts.label, fontSize: typeScale.label, color: colors.onSurface, letterSpacing: tracking.label },
  // skipBtn matches backBtn's 40dp slot so the centered progressLabel doesn't
  // drift left or right depending on Skip's intrinsic text width
  // (kakoccc #14 onboarding header alignment 2026-04-29).
  skipBtn: { width: 40, height: 40, alignItems: 'flex-end', justifyContent: 'center' },
  skipLabel: { fontFamily: fonts.bodyMedium, fontSize: typeScale.bodyMedium, color: colors.onSurfaceVariant },
  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, gap: spacing.sm },
  eyebrow: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.primary, letterSpacing: tracking.labelWide },
  hero: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium + 2, color: colors.onSurface, letterSpacing: -0.8, lineHeight: 38, marginTop: spacing.sm },
  sub: { fontFamily: fonts.body, fontSize: typeScale.bodyLarge, color: colors.onSurfaceVariant, lineHeight: 22, marginBottom: spacing.lg },
  inputWrap: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(49,51,47,0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    marginTop: spacing.sm,
  },
  input: {
    fontFamily: fonts.headlineMedium,
    fontSize: typeScale.titleLarge,
    color: colors.onSurface,
    paddingVertical: spacing.md,
    letterSpacing: -0.3,
  },
  footer: { paddingHorizontal: spacing.lg, alignItems: 'center' },
});

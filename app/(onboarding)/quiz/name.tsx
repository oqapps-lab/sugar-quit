import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';

/**
 * 1.12 Quiz: Name — optional text input + Skip + Continue.
 */
export default function QuizName() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');

  const goNext = () => router.push('/(onboarding)/loading');

  return (
    <AtmosphericGradient theme="sunriseGreens">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.progressLabel}>STEP 12 OF 15</Text>
        <Pressable onPress={goNext}>
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
            style={styles.input}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={goNext}
          />
        </View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <PillCTA label="Continue" variant="onboarding" onPress={goNext} />
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  backBtn: { width: 40, height: 40, borderRadius: radius.full, backgroundColor: 'rgba(49,51,47,0.06)', alignItems: 'center', justifyContent: 'center' },
  back: { fontSize: 22, color: colors.onSurface, lineHeight: 22 },
  progressLabel: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.onSurfaceVariant, letterSpacing: tracking.labelWide },
  skipLabel: { fontFamily: fonts.bodyMedium, fontSize: typeScale.bodyMedium, color: colors.onSurfaceVariant },
  body: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, gap: spacing.sm },
  eyebrow: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.primary, letterSpacing: tracking.labelWide },
  hero: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium + 2, color: colors.onSurface, letterSpacing: -0.8, lineHeight: 34, marginTop: spacing.sm },
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

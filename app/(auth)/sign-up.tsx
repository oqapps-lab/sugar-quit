import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { PillCTA } from '../../components/ui/PillCTA';
import {
  colors,
  fonts,
  radius,
  spacing,
  tracking,
  typeScale,
} from '../../constants/tokens';
import { signUpWithEmail } from '../../lib/supabase';
import { useUserStore } from '../../stores/useUserStore';

/**
 * Sign-up — new account creation.
 *
 * After a successful create we send the user to /(onboarding)/welcome so the
 * quiz personalises the first chapter; returning users use sign-in instead.
 * Confirm-password mismatch is checked locally before any network call.
 */
export default function SignUp() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Reset local form state every time the screen gains focus. Without this,
  // returning to /(auth)/sign-up via deep-link or back-navigation keeps the
  // previous email/password/error around — the iOS Strong Password popup
  // dismissal already wipes the inputs in the underlying TextInput, so the
  // mismatch between React state and the input can produce duplicated text.
  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
      setConfirm('');
      setError(null);
    }, []),
  );

  const onSubmit = async (): Promise<void> => {
    if (submitting) return;
    setError(null);
    const trimmed = email.trim();
    if (trimmed.length === 0) {
      setError('Enter your email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setSubmitting(true);
    const result = await signUpWithEmail(trimmed, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    // Mirror session into the store immediately so the router gate sees a
    // signed-in user. Fresh accounts are by definition not onboarded — the
    // auto-trigger on auth.users created the empty profiles row already.
    useUserStore.getState().setSession({ userId: result.userId, email: result.email });
    router.replace('/(onboarding)/welcome');
  };

  const goToSignIn = (): void => {
    router.replace('/(auth)/sign-in');
  };

  return (
    <AtmosphericGradient theme="dawn">
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob
          tint="lavender"
          size={320}
          style={styles.auraTopRight}
          intensity={0.5}
          drift={20}
        />
        <AuraBlob
          tint="mint"
          size={260}
          style={styles.auraBottomLeft}
          intensity={0.4}
          drift={16}
        />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            {
              paddingTop: insets.top + spacing.xxl,
              paddingBottom: insets.bottom + spacing.xl,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.Text
            entering={FadeInUp.duration(420)}
            style={styles.eyebrow}
          >
            SUGAR QUIT
          </Animated.Text>
          <Animated.Text
            entering={FadeInUp.delay(80).duration(420)}
            style={styles.title}
          >
            Begin your chapter.
          </Animated.Text>
          <Animated.Text
            entering={FadeInUp.delay(140).duration(420)}
            style={styles.subtitle}
          >
            One quiet account to keep your streak.
          </Animated.Text>

          <Animated.View
            entering={FadeInUp.delay(220).duration(420)}
            style={styles.form}
          >
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>EMAIL</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@quietmail.com"
                placeholderTextColor="rgba(49,51,47,0.35)"
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                editable={!submitting}
                style={styles.input}
                accessibilityLabel="Email address"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>PASSWORD</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="At least 6 characters"
                placeholderTextColor="rgba(49,51,47,0.35)"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="new-password"
                textContentType="newPassword"
                editable={!submitting}
                style={styles.input}
                accessibilityLabel="Password"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>CONFIRM PASSWORD</Text>
              <TextInput
                value={confirm}
                onChangeText={setConfirm}
                placeholder="Type it again"
                placeholderTextColor="rgba(49,51,47,0.35)"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="new-password"
                textContentType="newPassword"
                editable={!submitting}
                style={styles.input}
                accessibilityLabel="Confirm password"
              />
            </View>

            {error !== null ? (
              <Text
                style={styles.errorText}
                accessibilityLiveRegion="polite"
                accessibilityRole="text"
              >
                {error}
              </Text>
            ) : null}
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(320).duration(420)}
            style={styles.actions}
          >
            <PillCTA
              label={submitting ? 'Creating…' : 'Create account'}
              onPress={onSubmit}
              disabled={submitting}
              style={styles.cta}
            />

            <Pressable
              onPress={goToSignIn}
              style={styles.linkBtn}
              accessibilityRole="link"
              accessibilityLabel="Already have an account? Sign in."
            >
              <Text style={styles.linkText}>
                Already have an account?{' '}
                <Text style={styles.linkAccent}>Sign in.</Text>
              </Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
  },
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -90,
    right: -110,
  },
  auraBottomLeft: {
    position: 'absolute',
    bottom: -70,
    left: -110,
  },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWidest,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayLarge,
    color: colors.onSurface,
    letterSpacing: -1.2,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginTop: spacing.sm,
    maxWidth: 320,
  },
  form: {
    marginTop: spacing.xxl,
    gap: spacing.lg,
  },
  fieldGroup: {
    gap: spacing.xs,
  },
  fieldLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(49,51,47,0.06)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
  },
  errorText: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodySmall,
    color: colors.error,
    marginTop: spacing.xs,
  },
  actions: {
    marginTop: spacing.xxl,
    gap: spacing.md,
    alignItems: 'center',
  },
  cta: { alignSelf: 'stretch' },
  linkBtn: { padding: spacing.sm },
  linkText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  linkAccent: {
    fontFamily: fonts.bodySemibold,
    color: colors.primary,
  },
});

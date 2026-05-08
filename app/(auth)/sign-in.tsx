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
import { signInWithEmail } from '../../lib/supabase';
import { useUserStore } from '../../stores/useUserStore';

/**
 * Sign-in — returning user enters email + password to resume their chapter.
 *
 * Validation is done before hitting Supabase: trimmed email must be non-empty
 * and password must be at least 6 chars (matches Supabase default minimum).
 * On success we replace the route with the home tabs; the router gate
 * elsewhere handles session-based redirects on subsequent launches.
 */
export default function SignIn() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  // DRAFT (kakoccc #35 2026-04-29): track which field is the source of the
  // current error so we can highlight just that field's border + show the
  // message inline near it, instead of a global toast disconnected from
  // the offending input.
  const [invalidField, setInvalidField] = useState<'email' | 'password' | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Reset on focus — same reasoning as sign-up: redepending on autofill /
  // strong-password popup interactions, the input view and React state can
  // diverge after an aborted attempt. Cleaner UX to start fresh each time.
  useFocusEffect(
    useCallback(() => {
      setError(null);
      // Intentionally NOT clearing email/password — sign-in users typically
      // want their last value back. Just clear stale errors.
    }, []),
  );

  const onSubmit = async (): Promise<void> => {
    if (submitting) return;
    setError(null);
    setInvalidField(null);
    const trimmed = email.trim();
    if (trimmed.length === 0) {
      setError('Enter your email.');
      setInvalidField('email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setInvalidField('password');
      return;
    }
    setSubmitting(true);
    const result = await signInWithEmail(trimmed, password);
    if (!result.ok) {
      setSubmitting(false);
      setError(result.error);
      setInvalidField('password');
      return;
    }
    // Eagerly mirror session into the store + pull canonical state so we can
    // route to the right place. Without this, the onAuthStateChange listener
    // in _layout still fires asynchronously and we'd race past it with a
    // hard-coded /home target — landing onboarded:false users on the wrong
    // screen.
    const store = useUserStore.getState();
    store.setSession({ userId: result.userId, email: result.email });
    try {
      await store.hydrateFromCloud();
    } catch {
      // Pull failed (offline or transient) — fall through; the user can still
      // proceed with whatever the local store currently has.
    }
    setSubmitting(false);
    const onboarded = useUserStore.getState().onboarded;
    router.replace(onboarded ? '/(tabs)/home' : '/(onboarding)/welcome');
  };

  const goToSignUp = (): void => {
    router.replace('/(auth)/sign-up');
  };

  return (
    <AtmosphericGradient theme="dawn">
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob
          tint="coral"
          size={320}
          style={styles.auraTopLeft}
          intensity={0.5}
          drift={20}
        />
        <AuraBlob
          tint="lavender"
          size={260}
          style={styles.auraBottomRight}
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
            Welcome back.
          </Animated.Text>
          <Animated.Text
            entering={FadeInUp.delay(140).duration(420)}
            style={styles.subtitle}
          >
            Sign in to continue your chapter.
          </Animated.Text>

          <Animated.View
            entering={FadeInUp.delay(220).duration(420)}
            style={styles.form}
          >
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>EMAIL</Text>
              <TextInput
                value={email}
                onChangeText={(t) => { setEmail(t); if (invalidField === 'email') { setInvalidField(null); setError(null); } }}
                placeholder="you@quietmail.com"
                placeholderTextColor="rgba(49,51,47,0.35)"
                selectionColor={colors.primary}
                cursorColor={colors.primary}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                editable={!submitting}
                style={[styles.input, invalidField === 'email' && styles.inputInvalid]}
                accessibilityLabel="Email address"
              />
              {invalidField === 'email' && error !== null ? (
                <Text style={styles.fieldError} accessibilityLiveRegion="polite">{error}</Text>
              ) : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>PASSWORD</Text>
              <TextInput
                value={password}
                onChangeText={(t) => { setPassword(t); if (invalidField === 'password') { setInvalidField(null); setError(null); } }}
                placeholder="At least 6 characters"
                placeholderTextColor="rgba(49,51,47,0.35)"
                selectionColor={colors.primary}
                cursorColor={colors.primary}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="current-password"
                textContentType="password"
                editable={!submitting}
                style={[styles.input, invalidField === 'password' && styles.inputInvalid]}
                accessibilityLabel="Password"
              />
              {invalidField === 'password' && error !== null ? (
                <Text style={styles.fieldError} accessibilityLiveRegion="polite">{error}</Text>
              ) : null}
            </View>

            {error !== null && invalidField === null ? (
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
              label={submitting ? 'Signing in…' : 'Sign in'}
              onPress={onSubmit}
              disabled={submitting}
              style={styles.cta}
            />

            <Pressable
              onPress={goToSignUp}
              style={styles.linkBtn}
              accessibilityRole="link"
              accessibilityLabel="New here? Create an account."
            >
              <Text style={styles.linkText}>
                New here? <Text style={styles.linkAccent}>Create an account.</Text>
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
  auraTopLeft: {
    position: 'absolute',
    top: -90,
    left: -110,
  },
  auraBottomRight: {
    position: 'absolute',
    bottom: -70,
    right: -110,
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
  // DRAFT (kakoccc #35): when validation fails for a specific field,
  // outline that field in the error palette so the user knows where to
  // look. Inline message renders right below.
  inputInvalid: {
    borderColor: colors.error,
    borderWidth: 1.5,
    backgroundColor: 'rgba(186,52,52,0.06)',
  },
  fieldError: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodySmall,
    color: colors.error,
    marginTop: 6,
    paddingHorizontal: 4,
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

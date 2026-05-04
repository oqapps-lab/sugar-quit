import { router } from 'expo-router';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, typeScale } from '../../constants/tokens';
import { isSupabaseConfigured } from '../../lib/env';
import { LINKS } from '../../lib/links';
import { signInWithEmail, signUpWithEmail } from '../../lib/supabase';

/**
 * 1.16 Auth — Sign in / Sign up.
 *
 * Apple/Google buttons are placeholders — real native sign-in requires
 * `expo-apple-authentication` + a dev client (won't work in Expo Go). For now
 * they advance the flow as if successful, since we're still in skeleton mode.
 *
 * Email auth uses Supabase password flow when keys are configured. If not,
 * we still advance the flow so the demo can be walked end-to-end.
 */
export default function Auth() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<'menu' | 'email'>('menu');
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const advanceToPushPermission = () => router.push('/(onboarding)/push-permission');

  const onApple = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO(stage-6): expo-apple-authentication + supabase.auth.signInWithIdToken
    advanceToPushPermission();
  };
  const onGoogle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO(stage-6): expo-auth-session/google + supabase.auth.signInWithIdToken
    advanceToPushPermission();
  };
  const onEmail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMode('email');
  };

  const onSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password required');
      return;
    }
    setSubmitting(true);
    setError(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const fn = isSignUp ? signUpWithEmail : signInWithEmail;
    const result = await fn(email.trim(), password);
    setSubmitting(false);
    if (!result.ok) {
      // If Supabase isn't configured we still let the demo flow continue —
      // shouldn't block onboarding while building.
      if (!isSupabaseConfigured) {
        advanceToPushPermission();
        return;
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError(result.error);
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    advanceToPushPermission();
  };

  if (mode === 'email') {
    return (
      <AtmosphericGradient theme="dawn">
        {/* Background aura blobs */}
        <View style={styles.auraLayer} pointerEvents="none">
          <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.5} drift={22} />
          <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={18} />
        </View>

        <View style={[styles.root, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.lg }]}>
          <Animated.View entering={FadeInUp.duration(450)} style={styles.hero}>
            <View style={styles.mark} />
            <Text style={styles.brand}>Sugar Quit</Text>
            <Text style={styles.title}>{isSignUp ? 'Create your account' : 'Welcome back'}</Text>
            <Text style={styles.sub}>{isSignUp ? 'Save your plan, streak, and SOS history.' : 'Pick up where you left off.'}</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).duration(450)} style={styles.formCol}>
            <View style={styles.inputWrap}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="email@example.com"
                placeholderTextColor={colors.outline}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                accessibilityLabel="Email"
              />
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="password"
                placeholderTextColor={colors.outline}
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={onSubmit}
                accessibilityLabel="Password"
              />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
            {!isSupabaseConfigured && (
              <Text style={styles.configHint}>
                Supabase not configured — demo mode (any input continues).
              </Text>
            )}

            <PillCTA
              label={submitting ? '…' : isSignUp ? 'Create account' : 'Sign in'}
              onPress={onSubmit}
              disabled={submitting}
            />
            <Pressable
              onPress={() => setIsSignUp((v) => !v)}
              style={styles.toggleBtn}
              accessibilityRole="button"
              accessibilityLabel={isSignUp ? 'Switch to sign in' : 'Switch to sign up'}
            >
              <Text style={styles.toggleText}>
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setMode('menu')}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Back to other sign-in options"
            >
              <Text style={styles.toggleText}>← Other options</Text>
            </Pressable>
          </Animated.View>

          <Text style={styles.terms}>
            By continuing, you agree to our{' '}
            <Text
              style={styles.termsLink}
              onPress={() => Linking.openURL(LINKS.termsOfService)}
              accessibilityRole="link"
              accessibilityLabel="Read Terms of Service"
            >
              Terms
            </Text>
            {' '}and{' '}
            <Text
              style={styles.termsLink}
              onPress={() => Linking.openURL(LINKS.privacyPolicy)}
              accessibilityRole="link"
              accessibilityLabel="Read Privacy Policy"
            >
              Privacy
            </Text>
            .
          </Text>
        </View>
      </AtmosphericGradient>
    );
  }

  return (
    <AtmosphericGradient theme="dawn">
      {/* Background aura blobs */}
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.5} drift={22} />
        <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={18} />
      </View>

      <View style={[styles.root, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.lg }]}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.hero}>
          <View style={styles.mark} />
          <Text style={styles.brand}>Sugar Quit</Text>
          <Text style={styles.title} numberOfLines={4}>One last step — keep your plan</Text>
          <Text style={styles.sub}>Sign in so your plan, streak, and SOS history stay with you.</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).duration(450)} style={styles.buttonsCol}>
          <Pressable
            onPress={onApple}
            style={styles.appleBtn}
            accessibilityRole="button"
            accessibilityLabel="Continue with Apple"
          >
            <Text style={styles.appleLabel}> Continue with Apple</Text>
          </Pressable>
          <Pressable
            onPress={onGoogle}
            style={styles.googleBtn}
            accessibilityRole="button"
            accessibilityLabel="Continue with Google"
          >
            <Text style={styles.googleLabel}>G  Continue with Google</Text>
          </Pressable>
          <Pressable
            onPress={onEmail}
            style={styles.emailBtn}
            accessibilityRole="button"
            accessibilityLabel="Continue with email"
          >
            <Text style={styles.emailLabel}>Continue with email</Text>
          </Pressable>
        </Animated.View>

        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text
            style={styles.termsLink}
            onPress={() => Linking.openURL(LINKS.termsOfService)}
            accessibilityRole="link"
            accessibilityLabel="Read Terms of Service"
          >
            Terms
          </Text>
          {' '}and{' '}
          <Text
            style={styles.termsLink}
            onPress={() => Linking.openURL(LINKS.privacyPolicy)}
            accessibilityRole="link"
            accessibilityLabel="Read Privacy Policy"
          >
            Privacy
          </Text>
          .
        </Text>
      </View>
    </AtmosphericGradient>
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
  hero: { alignItems: 'center', gap: spacing.sm, marginTop: spacing.xxl },
  mark: { width: 12, height: 12, borderRadius: radius.full, backgroundColor: colors.primary, marginBottom: spacing.xs },
  brand: { fontFamily: fonts.headlineSemibold, fontSize: typeScale.titleSmall, color: colors.onSurface, marginBottom: spacing.md },
  title: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium, color: colors.onSurface, textAlign: 'center', letterSpacing: -0.8, lineHeight: 32, maxWidth: 320 },
  sub: { fontFamily: fonts.body, fontSize: typeScale.bodyLarge, color: colors.onSurfaceVariant, textAlign: 'center', lineHeight: 22, maxWidth: 320, marginTop: spacing.xs },

  buttonsCol: { gap: spacing.sm },
  appleBtn: { backgroundColor: colors.onSurface, paddingVertical: 16, borderRadius: radius.full, alignItems: 'center' },
  appleLabel: { color: '#ffffff', fontFamily: fonts.headlineSemibold, fontSize: typeScale.bodyLarge },
  googleBtn: { backgroundColor: 'rgba(255,255,255,0.7)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)', paddingVertical: 16, borderRadius: radius.full, alignItems: 'center' },
  googleLabel: { color: colors.onSurface, fontFamily: fonts.headlineSemibold, fontSize: typeScale.bodyLarge },
  emailBtn: { paddingVertical: 14, alignItems: 'center' },
  emailLabel: { color: colors.onSurfaceVariant, fontFamily: fonts.bodyMedium, fontSize: typeScale.bodyMedium },

  formCol: { gap: spacing.sm, alignItems: 'stretch' },
  inputWrap: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  input: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    paddingVertical: spacing.md,
  },
  errorText: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodySmall,
    color: colors.error,
    textAlign: 'center',
  },
  configHint: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodySmall,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  toggleBtn: { padding: spacing.sm, alignItems: 'center' },
  backBtn: { padding: spacing.sm, alignItems: 'center' },
  toggleText: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.primary,
  },

  terms: { fontFamily: fonts.bodyLight, fontSize: typeScale.bodySmall, color: colors.onSurfaceVariant, textAlign: 'center', opacity: 0.7 },
  termsLink: { fontFamily: fonts.bodySemibold, color: colors.primary, textDecorationLine: 'underline' },
});

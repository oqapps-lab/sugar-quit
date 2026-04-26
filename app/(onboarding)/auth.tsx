import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';
import { isSupabaseConfigured } from '../../lib/env';
import { signInWithEmail, signUpWithEmail } from '../../lib/supabase';

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
    advanceToPushPermission();
  };
  const onGoogle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
      <View style={[styles.root, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.lg }]}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.hero}>
          <View style={styles.logoRow}>
            <View style={styles.logoMark} />
            <Txt variant="titleSm">Sugar Quit</Txt>
          </View>
          <Txt variant="displayMd" style={styles.title} center>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} center style={styles.sub}>
            {isSignUp ? 'Save your plan, streak, and SOS history.' : 'Pick up where you left off.'}
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).duration(450)} style={styles.formCol}>
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
          {!!error && (
            <Txt variant="bodySm" color={colors.error} center>{error}</Txt>
          )}
          {!isSupabaseConfigured && (
            <Txt variant="bodySm" color={colors.textSecondary} center>
              Supabase not configured — demo mode (any input continues).
            </Txt>
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
          >
            <Txt variant="bodyMd" color={colors.primary} center>
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </Txt>
          </Pressable>
          <Pressable onPress={() => setMode('menu')} style={styles.toggleBtn} accessibilityRole="button">
            <Txt variant="bodyMd" color={colors.primary} center>← Other options</Txt>
          </Pressable>
        </Animated.View>

        <Txt variant="bodySm" center style={styles.terms}>
          By continuing you agree to our{' '}
          <Txt variant="bodySm" color={colors.primary}>Terms</Txt>
          {' '}and{' '}
          <Txt variant="bodySm" color={colors.primary}>Privacy</Txt>.
        </Txt>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.lg }]}>
      <Animated.View entering={FadeInUp.duration(450)} style={styles.hero}>
        <View style={styles.logoRow}>
          <View style={styles.logoMark} />
          <Txt variant="titleSm">Sugar Quit</Txt>
        </View>
        <Txt variant="displayMd" style={styles.title} center numberOfLines={4}>
          One last step — keep your plan
        </Txt>
        <Txt variant="bodyLg" color={colors.textSecondary} center style={styles.sub}>
          Sign in so your plan, streak, and SOS history stay with you.
        </Txt>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(150).duration(450)} style={styles.buttonsCol}>
        <Pressable
          onPress={onApple}
          style={styles.appleBtn}
          accessibilityRole="button"
          accessibilityLabel="Continue with Apple"
        >
          <Txt variant="titleSm" color="#FFFFFF"> Continue with Apple</Txt>
        </Pressable>
        <Pressable
          onPress={onGoogle}
          style={styles.googleBtn}
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
        >
          <Txt variant="titleSm" color={colors.onSurface}>G  Continue with Google</Txt>
        </Pressable>
        <Pressable
          onPress={onEmail}
          style={styles.emailBtn}
          accessibilityRole="button"
          accessibilityLabel="Continue with email"
        >
          <Txt variant="bodyMd" color={colors.textSecondary} center>Continue with email</Txt>
        </Pressable>
      </Animated.View>

      <Txt variant="bodySm" center style={styles.terms}>
        By continuing you agree to our{' '}
        <Txt variant="bodySm" color={colors.primary}>Terms</Txt>
        {' '}and{' '}
        <Txt variant="bodySm" color={colors.primary}>Privacy</Txt>.
      </Txt>
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
  hero: { alignItems: 'center', gap: spacing.sm },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  logoMark: { width: 12, height: 12, borderRadius: radius.full, backgroundColor: colors.primary },
  title: { letterSpacing: -0.8, lineHeight: 32, maxWidth: 320 },
  sub: { lineHeight: 22, maxWidth: 320, marginTop: spacing.xs },

  buttonsCol: { gap: spacing.sm },
  appleBtn: {
    backgroundColor: colors.onSurface,
    paddingVertical: 16,
    borderRadius: radius.full,
    alignItems: 'center',
  },
  googleBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingVertical: 16,
    borderRadius: radius.full,
    alignItems: 'center',
  },
  emailBtn: { paddingVertical: 14, alignItems: 'center' },

  formCol: { gap: spacing.sm, alignItems: 'stretch' },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.onSurface,
  },
  toggleBtn: { padding: spacing.sm, alignItems: 'center' },

  terms: { opacity: 0.7 },
});

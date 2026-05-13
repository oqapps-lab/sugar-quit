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
import { t } from '../../lib/i18n';

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
      setError(t('auth.error_required'));
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
          <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.5} drift={12} />
          <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={10} />
        </View>

        <View style={[styles.root, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.lg }]}>
          <Animated.View entering={FadeInUp.duration(450)} style={styles.hero}>
            <View style={styles.mark} />
            <Text style={styles.brand}>Sugar Quit</Text>
            <Text style={styles.title}>{isSignUp ? t('auth.email_title_signup') : t('auth.email_title_signin')}</Text>
            <Text style={styles.sub}>{isSignUp ? t('auth.email_sub_signup') : t('auth.email_sub_signin')}</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).duration(450)} style={styles.formCol}>
            <View style={styles.inputWrap}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={t('auth.email_placeholder')}
                placeholderTextColor={colors.outline}
                selectionColor={colors.primary}
                cursorColor={colors.primary}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                accessibilityLabel={t('auth.a11y_email')}
              />
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder={t('auth.password_placeholder')}
                placeholderTextColor={colors.outline}
                selectionColor={colors.primary}
                cursorColor={colors.primary}
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={onSubmit}
                accessibilityLabel={t('auth.a11y_password')}
              />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
            {!isSupabaseConfigured && (
              <Text style={styles.configHint}>
                {t('auth.config_hint')}
              </Text>
            )}

            <PillCTA
              label={submitting ? '…' : isSignUp ? t('auth.cta_create') : t('auth.cta_signin')}
              onPress={onSubmit}
              disabled={submitting}
            />
            <Pressable
              onPress={() => setIsSignUp((v) => !v)}
              style={styles.toggleBtn}
              accessibilityRole="button"
              accessibilityLabel={isSignUp ? t('auth.a11y_to_signin') : t('auth.a11y_to_signup')}
            >
              <Text style={styles.toggleText}>
                {isSignUp ? t('auth.toggle_to_signin') : t('auth.toggle_to_signup')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setMode('menu')}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel={t('auth.a11y_back_options')}
            >
              <Text style={styles.toggleText}>{t('auth.back_options')}</Text>
            </Pressable>
          </Animated.View>

          <Text style={styles.terms}>
            {t('auth.terms_lead')}{' '}
            <Text
              style={styles.termsLink}
              onPress={() => Linking.openURL(LINKS.termsOfService)}
              accessibilityRole="link"
              accessibilityLabel={t('auth.a11y_terms')}
            >
              {t('auth.terms_word')}
            </Text>
            {' '}{t('auth.terms_and')}{' '}
            <Text
              style={styles.termsLink}
              onPress={() => Linking.openURL(LINKS.privacyPolicy)}
              accessibilityRole="link"
              accessibilityLabel={t('auth.a11y_privacy')}
            >
              {t('auth.terms_privacy')}
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
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.5} drift={12} />
        <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={10} />
      </View>

      <View style={[styles.root, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.lg }]}>
        <Animated.View entering={FadeInUp.duration(450)} style={styles.hero}>
          <View style={styles.mark} />
          <Text style={styles.brand}>Sugar Quit</Text>
          <Text style={styles.title} numberOfLines={4}>{t('auth.menu_title')}</Text>
          <Text style={styles.sub}>{t('auth.menu_sub')}</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).duration(450)} style={styles.buttonsCol}>
          <Pressable
            onPress={onApple}
            style={styles.appleBtn}
            accessibilityRole="button"
            accessibilityLabel={t('auth.continue_apple')}
          >
            <Text style={styles.appleLabel}>{' '}{t('auth.continue_apple')}</Text>
          </Pressable>
          <Pressable
            onPress={onGoogle}
            style={styles.googleBtn}
            accessibilityRole="button"
            accessibilityLabel={t('auth.continue_google')}
          >
            <Text style={styles.googleLabel}>G  {t('auth.continue_google')}</Text>
          </Pressable>
          <Pressable
            onPress={onEmail}
            style={styles.emailBtn}
            accessibilityRole="button"
            accessibilityLabel={t('auth.continue_email')}
          >
            <Text style={styles.emailLabel}>{t('auth.continue_email')}</Text>
          </Pressable>
        </Animated.View>

        <Text style={styles.terms}>
          {t('auth.terms_lead')}{' '}
          <Text
            style={styles.termsLink}
            onPress={() => Linking.openURL(LINKS.termsOfService)}
            accessibilityRole="link"
            accessibilityLabel={t('auth.a11y_terms')}
          >
            {t('auth.terms_word')}
          </Text>
          {' '}{t('auth.terms_and')}{' '}
          <Text
            style={styles.termsLink}
            onPress={() => Linking.openURL(LINKS.privacyPolicy)}
            accessibilityRole="link"
            accessibilityLabel={t('auth.a11y_privacy')}
          >
            {t('auth.terms_privacy')}
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
  title: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium, color: colors.onSurface, textAlign: 'center', letterSpacing: -0.8, lineHeight: 36, maxWidth: 320 },
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

import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { colors, fonts, radius, spacing, typeScale } from '../../constants/tokens';

/**
 * 1.16 Auth — Sign in with Apple / Google / Email
 * SKELETON — full OAuth flow to be wired by onboarding agent.
 */
export default function Auth() {
  const insets = useSafeAreaInsets();

  const next = () => router.push('/(onboarding)/push-permission');

  return (
    <AtmosphericGradient theme="dawn">
      <View style={[styles.root, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.hero}>
          <View style={styles.mark} />
          <Text style={styles.brand}>Sugar Quit</Text>
          <Text style={styles.title} numberOfLines={4}>One last step — keep your plan</Text>
          <Text style={styles.sub}>Sign in so your plan, streak, and SOS history stay with you.</Text>
        </View>

        <View style={styles.buttonsCol}>
          <Pressable
            onPress={next}
            style={styles.appleBtn}
            accessibilityRole="button"
            accessibilityLabel="Continue with Apple"
          >
            <Text style={styles.appleLabel}> Continue with Apple</Text>
          </Pressable>
          <Pressable
            onPress={next}
            style={styles.googleBtn}
            accessibilityRole="button"
            accessibilityLabel="Continue with Google"
          >
            <Text style={styles.googleLabel}>G  Continue with Google</Text>
          </Pressable>
          <Pressable
            onPress={next}
            style={styles.emailBtn}
            accessibilityRole="button"
            accessibilityLabel="Continue with email"
          >
            <Text style={styles.emailLabel}>Continue with email</Text>
          </Pressable>
        </View>

        <Text style={styles.terms}>
          By continuing, you agree to our <Text style={styles.termsLink}>Terms</Text> and <Text style={styles.termsLink}>Privacy</Text>.
        </Text>
      </View>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
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

  terms: { fontFamily: fonts.bodyLight, fontSize: typeScale.labelSmall, color: colors.onSurfaceVariant, textAlign: 'center', opacity: 0.7 },
  termsLink: { fontFamily: fonts.bodySemibold, color: colors.primary, textDecorationLine: 'underline' },
});

import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * 1.17 Push Permission — framed as a promise, not a permission.
 * Terminal screen of onboarding; replaces to (tabs)/home.
 */
export default function PushPermission() {
  const insets = useSafeAreaInsets();
  const finish = () => router.replace('/(tabs)/home');

  return (
    <AtmosphericGradient theme="dawn">
      <View style={[styles.root, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>THE PROMISE</Text>
          <Text style={styles.title}>We'll warn you 15 minutes before your 3pm</Text>
          <Text style={styles.sub}>One push when the pattern predicts a craving. That's it. No spam, ever.</Text>
        </View>

        <View style={styles.illustration}>
          <View style={styles.bellOuter}>
            <View style={styles.bellInner} />
          </View>
        </View>

        <View style={styles.promises}>
          <PromiseRow text="Only when your pattern predicts a craving" />
          <PromiseRow text="Max 1 push per day" />
          <PromiseRow text="Turn off anytime in settings" />
        </View>

        <View style={styles.footer}>
          <PillCTA label="Turn on predictions" onPress={finish} />
          <Pressable onPress={finish} style={styles.laterBtn}>
            <Text style={styles.laterLabel}>Maybe later</Text>
          </Pressable>
        </View>
      </View>
    </AtmosphericGradient>
  );
}

function PromiseRow({ text }: { text: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.dot} />
      <Text style={styles.rowText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'space-between' },
  hero: { alignItems: 'center', gap: spacing.xs },
  eyebrow: { fontFamily: fonts.label, fontSize: typeScale.labelSmall, color: colors.primary, letterSpacing: tracking.labelWide, marginBottom: spacing.sm },
  title: { fontFamily: fonts.headlineExtraBold, fontSize: typeScale.displayMedium, color: colors.onSurface, textAlign: 'center', letterSpacing: -0.8, lineHeight: 32, maxWidth: 320 },
  sub: { fontFamily: fonts.body, fontSize: typeScale.bodyLarge, color: colors.onSurfaceVariant, textAlign: 'center', lineHeight: 22, maxWidth: 320, marginTop: spacing.xs },

  illustration: { alignItems: 'center' },
  bellOuter: { width: 120, height: 120, borderRadius: radius.full, backgroundColor: 'rgba(255,172,160,0.3)', alignItems: 'center', justifyContent: 'center' },
  bellInner: { width: 64, height: 64, borderRadius: radius.full, backgroundColor: colors.primary },

  promises: { gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.md },
  dot: { width: 6, height: 6, borderRadius: radius.full, backgroundColor: colors.primary },
  rowText: { fontFamily: fonts.bodyLight, fontSize: typeScale.bodyMedium, color: colors.onSurface, flex: 1 },

  footer: { gap: spacing.md, alignItems: 'center' },
  laterBtn: { padding: spacing.sm },
  laterLabel: { fontFamily: fonts.bodyMedium, fontSize: typeScale.bodyMedium, color: colors.onSurfaceVariant },
});

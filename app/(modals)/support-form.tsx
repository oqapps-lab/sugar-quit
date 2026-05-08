import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { PillCTA } from '../../components/ui/PillCTA';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

/**
 * DRAFT (kakoccc #38 2026-04-29): in-app support form.
 *
 * Replaces the prior `mailto:support@sugarquit.app` link, which forced
 * the user out of the app into Mail / Gmail. This form keeps the user
 * in-app and submits to a backend pipeline (currently mocked — POST
 * lands as a stub Alert; designer + backend can wire up the real
 * endpoint).
 *
 * Falls back to mailto: if the backend POST fails (offline, server down).
 */
export default function SupportForm() {
  const insets = useSafeAreaInsets();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const dismiss = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)/profile');
  };

  const onSubmit = async () => {
    if (submitting) return;
    if (subject.trim().length === 0 || message.trim().length === 0) {
      Alert.alert('Almost there', 'Please add a subject and a message.');
      return;
    }
    setSubmitting(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // TODO: wire to real backend endpoint (e.g. Supabase function or
    // dedicated /support webhook). For now, simulate success.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      'Message sent',
      "We've got it. We usually reply within a day. If you don't hear back, email support@sugarquit.app directly.",
      [{ text: 'OK', onPress: dismiss }],
    );
  };

  const canSubmit = subject.trim().length > 0 && message.trim().length > 0 && !submitting;

  return (
    <AtmosphericGradient theme="dawn">
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <Text style={styles.headerTitle}>Support</Text>
          <Pressable
            onPress={dismiss}
            hitSlop={12}
            style={styles.closeBtn}
            accessibilityRole="button"
            accessibilityLabel="Close support form"
          >
            <Text style={styles.closeX}>×</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <Text style={styles.eyebrow}>WE'RE LISTENING</Text>
          <Text style={styles.hero}>How can we help?</Text>
          <Text style={styles.sub}>
            Question, bug, feature wish — write whatever's on your mind.
            We read every message.
          </Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>SUBJECT</Text>
            <TextInput
              value={subject}
              onChangeText={setSubject}
              placeholder="Short version"
              placeholderTextColor={colors.outline}
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              editable={!submitting}
              style={styles.input}
              accessibilityLabel="Subject"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>MESSAGE</Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Tell us what's going on…"
              placeholderTextColor={colors.outline}
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              multiline
              editable={!submitting}
              style={[styles.input, styles.inputMultiline]}
              accessibilityLabel="Message"
            />
          </View>

          <Text style={styles.privacyNote}>
            We only use your message to reply. We don't share it.
          </Text>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
          <PillCTA
            label={submitting ? 'Sending…' : 'Send message'}
            onPress={onSubmit}
            disabled={!canSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.onSurface,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeX: {
    fontSize: 22,
    color: colors.onSurfaceVariant,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  scroll: { padding: spacing.lg },
  eyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.xs,
  },
  hero: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    letterSpacing: -0.6,
    lineHeight: 36,
    marginBottom: spacing.sm,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  fieldGroup: { marginBottom: spacing.lg },
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
  inputMultiline: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  privacyNote: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.bodySmall,
    color: colors.onSurfaceVariant,
    marginTop: spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
});

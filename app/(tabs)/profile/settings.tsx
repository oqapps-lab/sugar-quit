import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Alert, Linking, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../../components/ui/AtmosphericGradient';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../../constants/tokens';
import { restorePurchases } from '../../../lib/adapty';
import { getSupabase, signOut as supabaseSignOut } from '../../../lib/supabase';
import { useUserStore, type UserState } from '../../../stores/useUserStore';

/** Mask "alex@sugarquit.test" → "a***@sugarquit.test" for the Settings row. */
function maskEmail(email: string | null): string {
  if (!email) return 'Sign in to set';
  const at = email.indexOf('@');
  if (at < 1) return email;
  return `${email[0]}***${email.slice(at)}`;
}

/**
 * 2.4.2 Settings — grouped lists: Notifications / Account / Data / About.
 * SKELETON.
 */

type PrefKey = keyof UserState['notificationPrefs'];

type ToggleRow = {
  kind: 'toggle';
  label: string;
  sub?: string;
  prefKey: PrefKey;
};

type LinkRow = {
  kind: 'link';
  label: string;
  value?: string;
  warning?: boolean;
  onPress?: () => void;
};

type StaticRow = {
  kind: 'static';
  label: string;
  value: string;
};

type Row = ToggleRow | LinkRow | StaticRow;

type Section = {
  label: string;
  rows: Row[];
};

export default function Settings() {
  const insets = useSafeAreaInsets();
  const email = useUserStore((s) => s.email);
  const userId = useUserStore((s) => s.userId);
  const setPremium = useUserStore((s) => s.setPremium);
  const clearSession = useUserStore((s) => s.clearSession);

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  // Account flows
  const onChangePassword = () => {
    if (!email) {
      Alert.alert('Sign in first', 'Sign in to your account before changing the password.');
      return;
    }
    Alert.alert(
      'Reset password by email',
      `We'll send a password-reset link to ${email}. Tap Send to continue.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: async () => {
            const sb = getSupabase();
            if (!sb) {
              Alert.alert('Not configured', 'Supabase is not configured in this build.');
              return;
            }
            const { error } = await sb.auth.resetPasswordForEmail(email);
            if (error) {
              Alert.alert('Could not send', error.message);
            } else {
              Alert.alert('Check your inbox', `A reset link is on its way to ${email}.`);
            }
          },
        },
      ],
    );
  };

  const onRestorePurchases = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const result = await restorePurchases();
    if (result.ok && result.isPremium) {
      setPremium(true);
      Alert.alert('Purchases restored', 'Your premium subscription is active.');
    } else if (result.ok) {
      Alert.alert('No purchases found', 'No active subscription was found on this Apple ID.');
    } else {
      Alert.alert('Restore failed', result.error ?? 'Unknown error.');
    }
  };

  const onExportData = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const sb = getSupabase();
    if (!sb || !userId) {
      Alert.alert('Sign in first', 'Sign in to export your data.');
      return;
    }
    const [profile, streak, cravings, sosLog] = await Promise.all([
      sb.from('profiles').select('*').eq('user_id', userId).maybeSingle(),
      sb.from('streaks').select('*').eq('user_id', userId).maybeSingle(),
      sb.from('cravings').select('*').eq('user_id', userId).order('ts'),
      sb.from('sos_log').select('*').eq('user_id', userId).order('started_at'),
    ]);
    const dump = {
      exported_at: new Date().toISOString(),
      profile: profile.data,
      streak: streak.data,
      cravings: cravings.data,
      sos_log: sosLog.data,
    };
    try {
      await Share.share({
        message: JSON.stringify(dump, null, 2),
        title: 'Sugar Quit — my data export',
      });
    } catch {
      // Share sheet dismissed — silent.
    }
  };

  const onDeleteAccount = () => {
    Alert.alert(
      'Delete account',
      'This will sign you out immediately. To permanently erase your data, email support@sugarquit.app — we process deletes within 7 days under GDPR.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign out now',
          style: 'destructive',
          onPress: async () => {
            await supabaseSignOut();
            clearSession();
            router.replace('/(auth)/sign-in');
          },
        },
      ],
    );
  };

  const SECTIONS: Section[] = [
    {
      label: 'NOTIFICATIONS',
      rows: [
        { kind: 'toggle', label: 'Morning check-in',     sub: '08:00', prefKey: 'morningCheckIn' },
        { kind: 'toggle', label: 'Daily lesson',         sub: '09:30', prefKey: 'dailyLesson' },
        { kind: 'toggle', label: 'Motivation of the day',              prefKey: 'motivation' },
        { kind: 'toggle', label: 'Streak at risk',       sub: '21:00', prefKey: 'streakAtRisk' },
      ],
    },
    {
      label: 'ACCOUNT',
      rows: [
        { kind: 'link', label: 'Email',             value: maskEmail(email) },
        { kind: 'link', label: 'Change password',   onPress: onChangePassword },
        { kind: 'link', label: 'Restore purchases', onPress: onRestorePurchases },
      ],
    },
    {
      label: 'DATA',
      rows: [
        { kind: 'link', label: 'Export my data',  onPress: onExportData },
        { kind: 'link', label: 'Delete account',  warning: true, onPress: onDeleteAccount },
      ],
    },
    {
      label: 'ABOUT',
      rows: [
        { kind: 'link',   label: 'Privacy Policy',   onPress: () => Linking.openURL('https://sugarquit.app/privacy') },
        { kind: 'link',   label: 'Terms of Service', onPress: () => Linking.openURL('https://sugarquit.app/terms') },
        { kind: 'static', label: 'Version',          value: '0.1.0' },
      ],
    },
  ];

  return (
    <AtmosphericGradient theme="dawn">
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable
          onPress={handleBack}
          hitSlop={12}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Back to profile"
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {SECTIONS.map((section) => (
          <View key={section.label} style={styles.section}>
            <Text style={styles.sectionLabel}>{section.label}</Text>
            <View style={styles.sectionBody}>
              {section.rows.map((row, idx) => (
                <RenderRow
                  key={`${section.label}-${row.label}-${idx}`}
                  row={row}
                  isLast={idx === section.rows.length - 1}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </AtmosphericGradient>
  );
}

function RenderRow({ row, isLast }: { row: Row; isLast: boolean }) {
  const rowStyle = [styles.row, !isLast && styles.rowBorder];

  if (row.kind === 'toggle') {
    return <ToggleItem label={row.label} sub={row.sub} prefKey={row.prefKey} style={rowStyle} />;
  }

  if (row.kind === 'static') {
    return (
      <View style={rowStyle}>
        <View style={styles.rowIcon} />
        <Text style={styles.rowLabel}>{row.label}</Text>
        <Text style={styles.rowValueMuted}>{row.value}</Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        row.onPress?.();
      }}
      style={rowStyle}
      accessibilityRole="button"
      accessibilityLabel={row.value ? `${row.label}: ${row.value}` : row.label}
      accessibilityHint={row.warning ? 'Destructive action' : undefined}
    >
      <View style={styles.rowIcon} />
      <Text style={[styles.rowLabel, row.warning && styles.rowLabelWarning]}>
        {row.label}
      </Text>
      {row.value ? <Text style={styles.rowValueMuted}>{row.value}</Text> : null}
      <Text style={[styles.rowChevron, row.warning && styles.rowChevronWarning]}>→</Text>
    </Pressable>
  );
}

function ToggleItem({
  label,
  sub,
  prefKey,
  style,
}: {
  label: string;
  sub?: string;
  prefKey: PrefKey;
  style: any;
}) {
  const on = useUserStore((s) => s.notificationPrefs[prefKey]);
  const setNotificationPref = useUserStore((s) => s.setNotificationPref);

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setNotificationPref(prefKey, !on);
      }}
      style={style}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={sub ? `${label}, ${sub}` : label}
    >
      <View style={styles.rowIcon} />
      <View style={styles.rowTextBlock}>
        <Text style={styles.rowLabel}>{label}</Text>
        {sub ? <Text style={styles.rowSub}>{sub}</Text> : null}
      </View>
      <View style={[styles.togglePill, on ? styles.togglePillOn : styles.togglePillOff]}>
        <Text style={[styles.toggleText, on ? styles.toggleTextOn : styles.toggleTextOff]}>
          {on ? 'ON' : 'OFF'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    zIndex: 10,
  },
  backBtn: { width: 32, alignItems: 'flex-start' },
  backArrow: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleLarge,
    color: colors.onSurface,
  },
  headerTitle: {
    fontFamily: fonts.headlineSemibold,
    fontSize: typeScale.titleMedium,
    color: colors.onSurface,
    letterSpacing: -0.2,
  },

  scroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },

  section: { gap: spacing.sm },
  sectionLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginLeft: spacing.sm,
  },
  sectionBody: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(49,51,47,0.06)',
  },
  rowIcon: {
    width: 18,
    height: 18,
    borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.08)',
  },
  rowTextBlock: { flex: 1, gap: 2 },
  rowLabel: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
  },
  rowLabelWarning: { color: colors.errorContainer },
  rowSub: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    letterSpacing: tracking.wide,
  },
  rowValueMuted: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  rowChevron: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
    opacity: 0.5,
    marginLeft: spacing.xs,
  },
  rowChevronWarning: {
    color: colors.errorContainer,
    opacity: 0.8,
  },

  togglePill: {
    minWidth: 52,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglePillOn: { backgroundColor: colors.primary },
  togglePillOff: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  toggleText: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    letterSpacing: tracking.label,
  },
  toggleTextOn:  { color: colors.onPrimary },
  toggleTextOff: { color: colors.outline },
});

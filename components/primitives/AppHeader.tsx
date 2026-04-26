import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';
import { Txt } from './Txt';

type Props = {
  center?: string;
};

export function AppHeader({ center }: Props) {
  const firstName = useUserStore((s) => s.firstName);
  const avatarInitial = (firstName?.[0] ?? '?').toUpperCase();

  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <View style={styles.logoMark} />
        <Txt variant="titleSm">Sugar Quit</Txt>
      </View>

      {center ? (
        <Txt variant="bodyMd" color={colors.textSecondary}>{center}</Txt>
      ) : (
        <View />
      )}

      <Pressable
        style={styles.avatar}
        onPress={() => router.push('/(tabs)/profile')}
        accessibilityRole="button"
        accessibilityLabel="Open profile"
      >
        <Txt variant="bodySm" color={colors.onSurface}>{avatarInitial}</Txt>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logoMark: { width: 10, height: 10, borderRadius: radius.full, backgroundColor: colors.primary },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

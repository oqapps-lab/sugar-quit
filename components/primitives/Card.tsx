import { StyleProp, ViewStyle } from 'react-native';
import { GlassCard } from '../ui/GlassCard';
import { spacing, radius } from '../../constants/tokens';

type Tint = 'default' | 'peach' | 'mint' | 'lavender' | 'cream' | 'dark';

type Props = {
  children: React.ReactNode;
  tint?: Tint;
  /** Adds padding.md (16) inside card. Default true. */
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Card — standard GlassCard with consistent padding + radius.
 * Preset: radius.sm (16), padding.md (16).
 */
export function Card({ children, tint = 'default', padded = true, style }: Props) {
  return (
    <GlassCard
      tint={tint}
      radius={radius.sm}
      style={[padded && { padding: spacing.md }, style]}
    >
      {children}
    </GlassCard>
  );
}

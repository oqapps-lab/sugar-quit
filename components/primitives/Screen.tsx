import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/tokens';

type Props = {
  children: React.ReactNode;
  background?: React.ReactNode;
  floating?: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
};

/**
 * Screen — 3-layer wrapper (Background / Content / Floating UI).
 * background: absolute gradient/image layer (Layer 1)
 * children: scrollable/flex content (Layer 2)
 * floating: absolute overlay — SOSFab, TopBar, BottomNav (Layer 3)
 */
export function Screen({ children, background, floating, style, backgroundColor }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: backgroundColor ?? colors.canvas }]}>
      {background && <View style={StyleSheet.absoluteFill} pointerEvents="none">{background}</View>}
      <View style={[styles.content, { paddingTop: insets.top }, style]}>
        {children}
      </View>
      {floating && <View style={StyleSheet.absoluteFill} pointerEvents="box-none">{floating}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

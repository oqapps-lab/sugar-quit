import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/primitives/Card';
import { Divider } from '../../components/primitives/Divider';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, fonts, radius, spacing, typeScale } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';

type Step  = 'sugar' | 'mood' | 'done';
type Sugar = 'free' | 'some' | 'relapse';
type Mood  = 1 | 2 | 3 | 4 | 5;

const SUGAR_OPTIONS: { key: Sugar; title: string; body: string; accent: string; iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'] }[] = [
  { key: 'free',    title: 'Sugar-free!',  body: "I didn't have added sugar",       accent: colors.success, iconName: 'check-circle-outline' },
  { key: 'some',    title: 'Had a little', body: 'Some sugar, but I\'m aware of it', accent: colors.warning, iconName: 'cookie-outline' },
  { key: 'relapse', title: 'Full relapse', body: "It's data, not failure",           accent: colors.primary, iconName: 'restore' },
];

const MOODS: { value: Mood; label: string; body: string; accent: string; iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'] }[] = [
  { value: 5, label: 'Great',  body: 'Energised and in control',  accent: '#2EC4A0',  iconName: 'emoticon-excited-outline' },
  { value: 4, label: 'Good',   body: 'Calm, managing well',       accent: '#72C15A',  iconName: 'emoticon-happy-outline' },
  { value: 3, label: 'Okay',   body: 'Neutral, nothing special',  accent: '#FFAA33',  iconName: 'emoticon-neutral-outline' },
  { value: 2, label: 'Low',    body: 'Tired or a bit stressed',   accent: '#FF7043',  iconName: 'emoticon-sad-outline' },
  { value: 1, label: 'Rough',  body: 'Struggling today',          accent: '#D94F4F',  iconName: 'emoticon-cry-outline' },
];

export default function CheckIn() {
  const insets = useSafeAreaInsets();
  const [step,  setStep]  = useState<Step>('sugar');
  const [sugar, setSugar] = useState<Sugar | null>(null);
  const [mood,  setMood]  = useState<Mood | null>(null);
  const completeCheckIn = useUserStore((s) => s.completeCheckIn);
  const streakDays      = useUserStore((s) => s.streakDays);

  const onSugar = (s: Sugar) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSugar(s);
    setTimeout(() => setStep('mood'), 220);
  };

  const onMood = (m: Mood) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setMood(m);
    setTimeout(() => setStep('done'), 220);
  };

  useEffect(() => {
    if (step === 'done' && sugar) {
      completeCheckIn(sugar);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.dismiss()}
          accessibilityRole="button"
          accessibilityLabel="Close"
          style={styles.backBtn}
          hitSlop={8}
        >
          <Txt variant="bodyLg" color={colors.textSecondary}>← back</Txt>
        </Pressable>
        <Txt variant="titleSm">Daily Check-in</Txt>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Step 1: Sugar ── */}
        {step === 'sugar' && (
          <Animated.View entering={FadeInUp.duration(300)} style={styles.stepWrap}>
            <Txt variant="displayMd" style={styles.question}>
              How did yesterday go?
            </Txt>
            <Txt variant="bodyLg" color={colors.textSecondary} style={styles.questionSub}>
              Be honest — all answers help you learn
            </Txt>

            <View style={styles.optionList}>
              {SUGAR_OPTIONS.map((opt, idx) => (
                <Animated.View key={opt.key} entering={FadeInDown.delay(idx * 60).duration(300)}>
                  <Pressable
                    onPress={() => onSugar(opt.key)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: sugar === opt.key }}
                    accessibilityLabel={`${opt.title} — ${opt.body}`}
                  >
                    <Card
                      noPadding
                      style={[
                        styles.optionCard,
                        sugar === opt.key && { borderColor: opt.accent, borderWidth: 2 },
                      ]}
                    >
                      <View style={[styles.optionBar, { backgroundColor: opt.accent }]} />
                      <View style={styles.optionContent}>
                        <View style={styles.optionIconWrap}>
                          <MaterialCommunityIcons name={opt.iconName} size={20} color={opt.accent} />
                        </View>
                        <View style={styles.optionText}>
                          <Txt variant="titleMd">{opt.title}</Txt>
                          <Txt variant="bodyMd" color={colors.textSecondary}>{opt.body}</Txt>
                        </View>
                        <Txt variant="bodyLg" color={colors.textSecondary}>›</Txt>
                      </View>
                    </Card>
                  </Pressable>
                </Animated.View>
              ))}
            </View>

            <Txt variant="bodySm" color={colors.textSecondary} center style={styles.bottomHint}>
              Every check-in makes your plan smarter
            </Txt>
            <View style={styles.stepDots}>
              <View style={[styles.dot, styles.dotActive]} />
              <View style={[styles.dot, styles.dotInactive]} />
            </View>
          </Animated.View>
        )}

        {/* ── Step 2: Mood ── */}
        {step === 'mood' && (
          <Animated.View entering={FadeInUp.duration(300)} style={styles.stepWrap}>
            <Txt variant="displayMd" style={styles.question}>
              How are you feeling?
            </Txt>
            <Txt variant="bodyLg" color={colors.textSecondary} style={styles.questionSub}>
              Tap the closest one.
            </Txt>

            <View style={styles.optionList}>
              {MOODS.map((m, idx) => (
                <Animated.View key={m.value} entering={FadeInDown.delay(idx * 60).duration(300)}>
                  <Pressable
                    onPress={() => onMood(m.value)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: mood === m.value }}
                    accessibilityLabel={`${m.label} — ${m.body}`}
                  >
                    <Card
                      noPadding
                      style={[
                        styles.optionCard,
                        mood === m.value && { borderColor: m.accent, borderWidth: 2 },
                      ]}
                    >
                      <View style={[styles.optionBar, { backgroundColor: m.accent }]} />
                      <View style={styles.optionContent}>
                        <View style={styles.optionIconWrap}>
                          <MaterialCommunityIcons name={m.iconName} size={20} color={m.accent} />
                        </View>
                        <View style={styles.optionText}>
                          <Txt variant="titleMd">{m.label}</Txt>
                          <Txt variant="bodyMd" color={colors.textSecondary}>{m.body}</Txt>
                        </View>
                        <Txt variant="bodyLg" color={colors.textSecondary}>›</Txt>
                      </View>
                    </Card>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
            <View style={styles.stepDots}>
              <View style={[styles.dot, styles.dotInactive]} />
              <View style={[styles.dot, styles.dotActive]} />
            </View>
          </Animated.View>
        )}

        {/* ── Step 3: Done ── */}
        {step === 'done' && (
          <Animated.View entering={FadeInUp.duration(350)} style={styles.doneWrap}>
            <View style={styles.doneOrb}>
              <Text style={styles.doneNumber} adjustsFontSizeToFit numberOfLines={1}>
                {streakDays}
              </Text>
            </View>

            <Animated.View entering={FadeInUp.delay(100).duration(300)}>
              <Eyebrow color={colors.primary} style={styles.center}>
                {`Day ${streakDays} · Streak intact`}
              </Eyebrow>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(160).duration(300)}>
              <Txt variant="displayMd" style={[styles.doneTitle, styles.center]}>
                Thank you for the honest note.
              </Txt>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(220).duration(300)}>
              <Txt variant="bodyLg" color={colors.textSecondary} center style={styles.doneBody}>
                Every day you answer is a sentence in your story.
              </Txt>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(280).duration(300)}>
              <Card style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <Eyebrow>Sugar</Eyebrow>
                    <Txt variant="titleMd">
                      {sugar === 'free' ? 'Clean' : sugar === 'some' ? 'A little' : 'Slip'}
                    </Txt>
                  </View>
                  <Divider style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <Eyebrow>Mood</Eyebrow>
                    <Txt variant="titleMd">{MOODS.find((x) => x.value === mood)?.label}</Txt>
                  </View>
                </View>
              </Card>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(340).duration(300)} style={styles.ctaWrap}>
              <PillCTA
                variant="success"
                label="Back to today ✓"
                onPress={() => router.dismiss()}
              />
            </Animated.View>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
  },
  backBtn: { minWidth: 60 },
  headerRight: { minWidth: 60 },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },

  stepWrap: { gap: spacing.lg },

  question: { letterSpacing: -0.8, lineHeight: 36 },
  questionSub: { marginTop: -spacing.sm, lineHeight: 22 },

  // Sugar options
  optionList: { gap: spacing.md },
  optionCard: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  optionBar: { width: 4 },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  optionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: { flex: 1, gap: 2 },

  stepDots: {
    flexDirection: 'row',
    gap: 6,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
  },
  dotActive: { backgroundColor: colors.primary },
  dotInactive: { backgroundColor: colors.outline },

  bottomHint: { fontStyle: 'italic', marginTop: spacing.sm },

  // Mood grid
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  moodTile: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.outline,
  },

  // Done state
  doneWrap: {
    alignItems: 'center',
    gap: spacing.lg,
    paddingTop: spacing.xl,
  },
  doneOrb: {
    width: 140,
    height: 140,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.success,
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  doneNumber: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.heroNumber,
    color: colors.onPrimary,
    textAlign: 'center',
    width: 140,
    includeFontPadding: false,
  },
  center: { textAlign: 'center' },
  doneTitle: { letterSpacing: -0.6, lineHeight: 34, maxWidth: 280 },
  doneBody: { lineHeight: 22, maxWidth: 300 },

  summaryCard: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors.outline,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  summaryItem: { alignItems: 'center', gap: 4 },
  summaryDivider: { width: 1, height: 32, marginVertical: 0 },

  ctaWrap: { alignSelf: 'stretch' },
});

import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from '../../components/primitives/Card';
import { Eyebrow } from '../../components/primitives/Eyebrow';
import { PillCTA } from '../../components/primitives/PillCTA';
import { Txt } from '../../components/primitives/Txt';
import { colors, radius, spacing } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';

type Msg = { role: 'ai' | 'user'; text: string; time: string };

function nowTime() {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

const INITIAL_MESSAGES: Msg[] = [
  { role: 'ai', text: "Hey — I can feel something's pulling at you right now. What's going on?", time: nowTime() },
];

const AI_FOLLOWUP: Msg[] = [
  { role: 'ai', text: "That's a 3pm energy crash + stress combo — pure neurochemistry, not weakness. Here's what cuts through it:", time: nowTime() },
];

const SUGGESTIONS: { emoji: string; label: string }[] = [
  { emoji: '🥚', label: 'Protein snack' },
  { emoji: '🚶', label: '5-min walk' },
  { emoji: '💧', label: 'Cold water + lemon' },
];

const OFFLINE_TIPS = [
  'Set a 4-minute timer. Walk anywhere — the kitchen counts.',
  'Drink a full glass of water before any decision.',
  'Name the trigger in one word. Just label it.',
  'If you eat, choose protein first. Cravings shrink with fat + fiber.',
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const logSosOpen    = useUserStore((s) => s.logSosOpen);
  const sosFreeLimit  = useUserStore((s) => s.sosFreeLimit);
  const isPremium     = useUserStore((s) => s.isPremium);
  const [messages, setMessages]           = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput]                 = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showOffline, setShowOffline]     = useState(false);
  const [blocked, setBlocked]             = useState(false);
  const [kbVisible, setKbVisible]         = useState(false);
  const sessionIdRef  = useRef<string | null>(null);
  const aiTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef     = useRef<ScrollView>(null);

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const result = logSosOpen();
    if (!result.allowed) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setBlocked(true);
      return;
    }
    sessionIdRef.current = result.sessionId;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKbVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKbVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  const send = () => {
    if (!input.trim()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const userMsg: Msg = { role: 'user', text: input.trim(), time: nowTime() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setShowOffline(false);
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    let arrived = false;
    aiTimerRef.current = setTimeout(() => {
      arrived = true;
      setMessages((m) => [...m, ...AI_FOLLOWUP]);
      setShowSuggestions(true);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 700);
    setTimeout(() => { if (!arrived) setShowOffline(true); }, 6000);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const onDone = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const session = sessionIdRef.current ?? '';
    router.replace({ pathname: '/(modals)/post-sos', params: { session } });
  };

  // ── Blocked state ──────────────────────────────────────────────────────────
  if (blocked) {
    return (
      <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.dismiss()} style={styles.backBtn} hitSlop={8}
            accessibilityRole="button" accessibilityLabel="Close">
            <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
          </Pressable>
          <Txt variant="titleSm">SOS Coach</Txt>
          <View style={styles.headerRight} />
        </View>
        <Animated.View entering={FadeInUp.duration(400)} style={styles.blockedWrap}>
          <Txt variant="displayMd" style={styles.blockedTitle}>
            You've used all {sosFreeLimit} SOS sessions this month.
          </Txt>
          <Txt variant="bodyLg" color={colors.textSecondary} style={styles.blockedBody}>
            Sugar Quit Premium gives you unlimited conversations — for the moments that matter most.
          </Txt>
          <PillCTA label="Try Premium free" onPress={() => router.replace('/(modals)/paywall-contextual')} />
          <Pressable onPress={() => router.dismiss()} accessibilityRole="button">
            <Txt variant="bodyMd" color={colors.textSecondary} center style={{ marginTop: spacing.sm }}>Not now</Txt>
          </Pressable>
          <Txt variant="labelSm" color={colors.textSecondary} center style={{ marginTop: spacing.xl }}>
            {`Current plan: ${isPremium ? 'premium' : 'free'}`}
          </Txt>
        </Animated.View>
      </View>
    );
  }

  // ── Main chat ──────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior="padding"
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Pressable onPress={() => router.dismiss()} style={styles.backBtn} hitSlop={8}
          accessibilityRole="button" accessibilityLabel="Close SOS">
          <Txt variant="bodyLg" color={colors.textSecondary}>← Back</Txt>
        </Pressable>
        <Txt variant="titleSm">SOS Coach</Txt>
        <Pressable onPress={onDone} hitSlop={8} accessibilityRole="button" accessibilityLabel="Done">
          <Txt variant="bodyLg" color={colors.success}>Done ✓</Txt>
        </Pressable>
      </View>

      {/* Disclaimer */}
      <Txt variant="labelSm" color={colors.success} center style={styles.disclaimer}>
        Not medical advice
      </Txt>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={[styles.messagesContent, { paddingBottom: spacing.lg }]}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((msg, i) => (
          <Animated.View key={i} entering={FadeInDown.duration(250)} style={msg.role === 'ai' ? styles.aiRow : styles.userRow}>
            {msg.role === 'ai' && (
              <Eyebrow color={colors.success} style={styles.coachLabel}>Coach</Eyebrow>
            )}
            <View style={msg.role === 'ai' ? styles.aiBubble : styles.userBubble}>
              <Txt variant="bodyLg" color={msg.role === 'ai' ? colors.textPrimary : colors.onPrimary}
                style={styles.bubbleText}>
                {msg.text}
              </Txt>
            </View>
            <Txt variant="labelSm" color={colors.textSecondary} style={msg.role === 'user' ? styles.timeRight : styles.timeLeft}>
              {msg.time}
            </Txt>
          </Animated.View>
        ))}

        {showSuggestions && (
          <Animated.View entering={FadeInDown.duration(300)}>
            <Eyebrow color={colors.textSecondary} style={styles.suggestionsLabel}>
              Try one →
            </Eyebrow>
            <View style={styles.chipsWrap}>
              {SUGGESTIONS.map((s, i) => (
                <Pressable
                  key={i}
                  style={({ pressed }) => [styles.chip, pressed && styles.chipPressed]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setInput(s.label);
                  }}
                  accessibilityRole="button"
                >
                  <Txt variant="bodyMd">{s.emoji}</Txt>
                  <Txt variant="bodyMd" color={colors.textPrimary}>{s.label}</Txt>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        )}

        {showOffline && (
          <Animated.View entering={FadeInDown.duration(300)}>
            <Card style={styles.offlineCard}>
              <Eyebrow color={colors.primary}>Offline — try one of these</Eyebrow>
              {OFFLINE_TIPS.map((s, i) => (
                <View key={i} style={styles.offlineRow}>
                  <View style={styles.offlineDot} />
                  <Txt variant="bodyMd" color={colors.textPrimary} style={{ flex: 1 }}>{s}</Txt>
                </View>
              ))}
            </Card>
          </Animated.View>
        )}

        <Txt variant="bodySm" color={colors.textSecondary} center style={styles.quote}>
          "You've survived 100% of your cravings so far. This one is no different."
        </Txt>
      </ScrollView>

      {/* Input bar */}
      <View style={[styles.inputBar, { paddingBottom: spacing.xs + (kbVisible ? 0 : insets.bottom) }]}>
        <View style={styles.inputWrap}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Write a message..."
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
            onSubmitEditing={send}
            returnKeyType="send"
            multiline
            maxLength={1000}
            accessibilityLabel="Message to the coach"
          />
          <Pressable
            onPress={send}
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            accessibilityState={{ disabled: !input.trim() }}
          >
            <MaterialCommunityIcons name="arrow-up" size={18} color={colors.onPrimary} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
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

  disclaimer: {
    paddingVertical: spacing.sm,
  },

  messages: { flex: 1 },
  messagesContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },

  aiRow: { alignItems: 'flex-start', gap: 4 },
  userRow: { alignItems: 'flex-end', gap: 4 },

  coachLabel: { marginLeft: 2 },

  aiBubble: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderTopLeftRadius: 4,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.outline,
    maxWidth: '82%',
  },
  userBubble: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    borderTopRightRadius: 4,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    maxWidth: '82%',
  },
  bubbleText: { lineHeight: 22 },

  timeLeft:  { marginLeft: 2 },
  timeRight: { marginRight: 2 },

  suggestionsLabel: {
    marginBottom: spacing.xs,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.success + '18',
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  chipPressed: {
    opacity: 0.55,
  },

  offlineCard: {
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  offlineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  offlineDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    marginTop: 7,
  },

  quote: {
    fontStyle: 'italic',
    lineHeight: 20,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },

  inputBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
    backgroundColor: colors.canvas,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingLeft: 6,
    paddingRight: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 4,
    maxHeight: 22 * 6.5,
    lineHeight: 22,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.4 },

  // Blocked state
  blockedWrap: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    gap: spacing.md,
  },
  blockedTitle: {
    letterSpacing: -0.6,
    lineHeight: 34,
  },
  blockedBody: {
    lineHeight: 24,
  },
});

import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { AuraBlob } from '../../components/ui/AuraBlob';
import { DecorGlyph } from '../../components/ui/DecorGlyph';
import { PillCTA } from '../../components/ui/PillCTA';
import { Badge, Card, ThemedText, TopBar } from '../../components/primitives';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';
import { useUserStore } from '../../stores/useUserStore';

type Msg = { role: 'ai' | 'user'; text: string };

const INITIAL_MESSAGES: Msg[] = [
  { role: 'ai', text: "I feel you reached out. That matters already." },
  { role: 'ai', text: "What's in your hand right now — or in your mind?" },
];

const AI_FOLLOWUP: Msg[] = [
  { role: 'ai', text: "This is textbook cortisol dip plus post-meeting release. Not weakness." },
  { role: 'ai', text: "Before the sugar — would you try one of these for two minutes?" },
];

const SUGGESTIONS = [
  'Almonds + one square of 85% dark',
  'Stand up and walk for three minutes',
  'A glass of water with lemon',
];

// Offline-fallback: shown when the user has no connectivity. Pure-content tips
// from FEATURES.md F1 — same advice pattern, no AI call needed.
const OFFLINE_TIPS = [
  'Set a 4-minute timer. Walk anywhere — the kitchen counts.',
  'Drink a full glass of water before any decision.',
  'Name the trigger in one word. Just label it.',
  "If you eat, choose protein first. Cravings shrink with fat + fiber.",
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const logSosOpen = useUserStore((s) => s.logSosOpen);
  const sosFreeLimit = useUserStore((s) => s.sosFreeLimit);
  const isPremium = useUserStore((s) => s.isPremium);
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [showOffline, setShowOffline] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount: spend one SOS credit (or surface limit-reached UI). Heavy haptic
  // per UX-SPEC §4.2 C1 — SOS is the most urgent surface in the app.
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

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: 'user', text: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setShowOffline(false);
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    // Mock AI response (700ms). Offline-fallback fires after 6 s with no
    // response arriving — graceful degradation per FEATURES.md F1.
    let arrived = false;
    aiTimerRef.current = setTimeout(() => {
      arrived = true;
      setMessages((m) => [...m, ...AI_FOLLOWUP]);
      setShowSuggestions(true);
    }, 700);
    setTimeout(() => {
      if (!arrived) setShowOffline(true);
    }, 6000);
  };

  const onEnd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const session = sessionIdRef.current ?? '';
    router.replace({ pathname: '/(modals)/post-sos', params: { session } });
  };

  // Limit-reached state: free user already used all 3 SOS this month.
  if (blocked) {
    const tier = isPremium ? 'premium' : 'free';
    return (
      <AtmosphericGradient theme="dawn">
        <View style={styles.auraLayer} pointerEvents="none">
          <AuraBlob tint="coral" size={340} style={styles.auraTopRight} intensity={0.55} drift={22} />
          <AuraBlob tint="peach" size={280} style={styles.auraBottomLeft} intensity={0.45} drift={18} />
        </View>
        <TopBar
          safeArea
          onClose={() => router.dismiss()}
          left={<Text style={styles.backArrow}>←</Text>}
          style={styles.topBarStyle}
        />
        <View style={styles.blockedContent}>
          <Animated.View entering={FadeInUp.duration(400)} style={styles.blockedGlyphWrap}>
            <DecorGlyph variant="flame" size={108} />
          </Animated.View>
          <Animated.Text entering={FadeInUp.delay(120).duration(400)} style={styles.blockedEyebrow}>
            FREE LIMIT REACHED
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(180).duration(400)} style={styles.blockedTitle}>
            You've used all {sosFreeLimit} SOS sessions this month.
          </Animated.Text>
          <Animated.Text entering={FadeInUp.delay(240).duration(400)} style={styles.blockedBody}>
            Sugar Quit Premium gives you unlimited conversations — for the moments that matter most.
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(320).duration(400)} style={styles.blockedActions}>
            <PillCTA label="Try Premium free" onPress={() => router.replace('/(modals)/paywall-contextual')} />
            <Pressable onPress={() => router.dismiss()} style={styles.blockedSkip}>
              <Text style={styles.blockedSkipText}>Not now</Text>
            </Pressable>
          </Animated.View>
          <Text style={styles.blockedTier}>Current plan: {tier}</Text>
        </View>
      </AtmosphericGradient>
    );
  }

  return (
    <AtmosphericGradient theme="dawn">
      <View style={styles.auraLayer} pointerEvents="none">
        <AuraBlob tint="coral" size={320} style={styles.auraTopRight} intensity={0.5} drift={20} />
        <AuraBlob tint="lavender" size={260} style={styles.auraBottomLeft} intensity={0.4} drift={16} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
        style={{ flex: 1 }}
      >
          {/* TopBar primitive — left: back, title: centered, right: End */}
        <TopBar
          safeArea
          title="COACH IS HERE"
          onClose={() => router.dismiss()}
          left={<Text style={styles.backArrow}>←</Text>}
          right={
            <Pressable
              onPress={onEnd}
              accessibilityRole="button"
              accessibilityLabel="End SOS — go to reflection"
            >
              <ThemedText variant="bodyMedium" color={colors.onSurfaceVariant}>End</ThemedText>
            </Pressable>
          }
          style={[styles.topBarStyle, { paddingTop: insets.top + spacing.xs }]}
        />

        {/* Badge primitive: AI LIVE status + disclaimer */}
        <View style={styles.statusRow}>
          <Badge label="AI · LIVE" variant="live" />
          <ThemedText variant="labelSmall" style={styles.disclaimer}>
            A companion, not a medical advisor.
          </ThemedText>
        </View>

        {/* Messages */}
        <ScrollView
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, i) => (
            <View key={i} style={msg.role === 'ai' ? styles.aiRow : styles.userRow}>
              {msg.role === 'ai' ? (
                /* Card primitive for AI bubbles — cream tint glass */
                <Card tint="cream" padded style={styles.aiBubbleCard}>
                  <ThemedText variant="bodyMedium" color={colors.onSurface} style={styles.aiTextInCard}>
                    {msg.text}
                  </ThemedText>
                </Card>
              ) : (
                <View style={styles.userBubble}>
                  <Text style={styles.userText}>{msg.text}</Text>
                </View>
              )}
            </View>
          ))}

          {showSuggestions && (
            <View style={styles.suggestionsBlock}>
              {SUGGESTIONS.map((s, i) => (
                <View key={i} style={styles.suggestionRow}>
                  <View style={styles.suggestionDot} />
                  <Text style={styles.suggestionText}>{s}</Text>
                </View>
              ))}
            </View>
          )}

          {showOffline && (
            <View style={[styles.suggestionsBlock, styles.offlineBlock]}>
              <Text style={styles.offlineLabel}>OFFLINE — TRY ONE OF THESE</Text>
              {OFFLINE_TIPS.map((s, i) => (
                <View key={i} style={styles.suggestionRow}>
                  <View style={styles.suggestionDot} />
                  <Text style={styles.suggestionText}>{s}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={[styles.inputBar, { paddingBottom: insets.bottom + spacing.sm }]}>
          <View style={styles.inputWrap}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="tell me what you're feeling…"
              placeholderTextColor={colors.outline}
              style={styles.input}
              onSubmitEditing={send}
              returnKeyType="send"
            />
            <Pressable onPress={send} style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}>
              <Text style={styles.sendArrow}>↑</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </AtmosphericGradient>
  );
}

const styles = StyleSheet.create({
  topBarStyle: {
    backgroundColor: 'rgba(251,249,245,0.85)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(165,60,48,0.12)',
  },
  backArrow: { fontSize: 22, color: colors.onSurface, lineHeight: 22 },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  disclaimer: {
    flex: 1,
    textAlign: 'right',
    opacity: 0.6,
  },

  // AI bubble via Card primitive
  aiBubbleCard: {
    borderTopLeftRadius: 4,
    maxWidth: '85%',
  },
  aiTextInCard: {
    lineHeight: 22,
    fontSize: typeScale.bodyLarge,
  },

  messages: { flex: 1 },
  messagesContent: { padding: spacing.lg, gap: spacing.sm },

  aiRow: { alignItems: 'flex-start', maxWidth: '80%' },
  userRow: { alignItems: 'flex-end', maxWidth: '80%', alignSelf: 'flex-end' },

  aiBubble: {
    backgroundColor: 'rgba(255,255,255,0.65)',
    borderRadius: radius.sm,
    borderTopLeftRadius: 4,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,172,160,0.25)',
  },
  aiText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    lineHeight: 22,
  },

  userBubble: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    borderTopRightRadius: 4,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  userText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onPrimary,
    lineHeight: 22,
  },

  suggestionsBlock: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: radius.sm,
    padding: spacing.md,
    gap: spacing.sm,
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  suggestionDot: {
    width: 6, height: 6, borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  suggestionText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurface,
    flex: 1,
  },

  inputBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: radius.full,
    paddingLeft: spacing.md,
    paddingRight: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  input: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurface,
    paddingVertical: spacing.sm,
  },
  sendBtn: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.4 },
  sendArrow: {
    fontSize: 18,
    color: colors.onPrimary,
    fontFamily: fonts.headlineBold,
    lineHeight: 18,
  },

  offlineBlock: {
    borderColor: 'rgba(165,60,48,0.3)',
    backgroundColor: 'rgba(255,237,217,0.7)',
  },
  offlineLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
    marginBottom: spacing.xs,
  },

  // Background aura layer
  auraLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  auraTopRight: {
    position: 'absolute',
    top: -90,
    right: -120,
  },
  auraBottomLeft: {
    position: 'absolute',
    bottom: -80,
    left: -110,
  },

  // Limit-reached layout
  blockedContent: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    gap: spacing.sm,
  },
  blockedGlyphWrap: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  blockedEyebrow: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  blockedTitle: {
    fontFamily: fonts.headlineExtraBold,
    fontSize: typeScale.displayMedium,
    color: colors.onSurface,
    letterSpacing: -0.8,
    lineHeight: 34,
    marginTop: spacing.xs,
  },
  blockedBody: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyLarge,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  blockedActions: { gap: spacing.sm, alignItems: 'center' },
  blockedSkip: { padding: spacing.md },
  blockedSkipText: {
    fontFamily: fonts.bodySemibold,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  blockedTier: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.outline,
    letterSpacing: tracking.wide,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});

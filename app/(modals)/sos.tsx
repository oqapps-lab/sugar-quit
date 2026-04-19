import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AtmosphericGradient } from '../../components/ui/AtmosphericGradient';
import { colors, fonts, radius, spacing, tracking, typeScale } from '../../constants/tokens';

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

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: 'user', text: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    // Mock AI response
    setTimeout(() => {
      setMessages((m) => [...m, ...AI_FOLLOWUP]);
      setShowSuggestions(true);
    }, 700);
  };

  return (
    <AtmosphericGradient theme="dawn">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <Pressable onPress={() => router.dismiss()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
          <View style={styles.headerCenter}>
            <View style={styles.headerDot} />
            <Text style={styles.headerLabel}>COACH IS HERE</Text>
          </View>
          <Pressable onPress={() => router.dismiss()} style={styles.endBtn}>
            <Text style={styles.endLabel}>End</Text>
          </Pressable>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>A companion, not a medical advisor.</Text>

        {/* Messages */}
        <ScrollView
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, i) => (
            <View key={i} style={msg.role === 'ai' ? styles.aiRow : styles.userRow}>
              <View style={msg.role === 'ai' ? styles.aiBubble : styles.userBubble}>
                <Text style={msg.role === 'ai' ? styles.aiText : styles.userText}>{msg.text}</Text>
              </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: 'rgba(49,51,47,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 22, color: colors.onSurface, lineHeight: 22 },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  headerDot: {
    width: 8, height: 8, borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  headerLabel: {
    fontFamily: fonts.label,
    fontSize: typeScale.labelSmall,
    color: colors.primary,
    letterSpacing: tracking.labelWide,
  },
  endBtn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  endLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: typeScale.bodyMedium,
    color: colors.onSurfaceVariant,
  },

  disclaimer: {
    fontFamily: fonts.bodyLight,
    fontSize: typeScale.labelSmall,
    color: colors.onSurfaceVariant,
    opacity: 0.6,
    textAlign: 'center',
    paddingBottom: spacing.md,
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
});

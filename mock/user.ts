/**
 * Mock data — Stress Sarah (primary persona, USER-PERSONAS.md)
 * 31 y/o marketing manager, Austin TX, 3pm office craver, Day 8 streak.
 */

export const MOCK_USER = {
  firstName: 'Sarah',
  streakDays: 8,
  bestStreak: 12,
  lastCheckInDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
  isPremium: false,
  sosFreeLimit: 3,
  sosUsedThisMonth: 1,
  peakHour: '3 PM',
  triggers: ['stress', 'boredom', 'post-meeting'],
  goal: 'quit',
  cravingsDefeated: 15,
  cravingsThisWeek: 6,
  moneySavedDollars: 24,
  sugarAvoidedGrams: 480,
  streakFreezesAvailableThisWeek: 1,
  streakFreezesUsedThisWeek: 0,
} as const;

export const MOCK_LESSON_TODAY = {
  day: 8,
  title: 'Your taste buds are waking up',
  preview: 'After one week, your tongue starts resetting. Foods you liked suddenly taste too sweet.',
  readMinutes: 6,
  phase: 'Improvement' as const,
} as const;

export const MOCK_CHAT_MESSAGES = [
  { role: 'ai' as const, text: "I feel you reached out. That matters already." },
  { role: 'ai' as const, text: "What's in your hand right now — or in your mind?" },
];

export const MOCK_QUIZ_PROGRESS = {
  currentStep: 1,
  totalSteps: 15,
  answers: {} as Record<string, string | string[]>,
};

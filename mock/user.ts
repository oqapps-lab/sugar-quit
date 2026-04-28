import type { UserState } from '../stores/useUserStore';

const now = new Date();
const todayISO = now.toISOString().slice(0, 10);

function daysAgoISO(n: number): string {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const MOCK_USER: Partial<UserState> = {
  onboarded: true,
  firstName: 'Sarah',
  goal: 'quit',
  peakHour: '15:00',
  triggers: ['stress', 'boredom', 'habit'],
  motivations: ['energy', 'weight', 'health'],
  consumption: 'alot',
  pastAttempts: 'short',
  workEnvironment: 'office',

  streakDays: 8,
  bestStreak: 8,
  lastCheckInDate: todayISO,
  streakFreezesUsedThisWeek: 0,
  streakFreezesAvailableThisWeek: 1,

  sosUsedThisMonth: 1,
  sosResetMonth: now.toISOString().slice(0, 7),
  sosDisclaimerAccepted: true,
  sosFreeLimit: 3,
  sosLog: [
    { id: '1', timestamp: daysAgoISO(6), outcome: 'walked' },
    { id: '2', timestamp: daysAgoISO(4), outcome: 'softer' },
    { id: '3', timestamp: daysAgoISO(1), outcome: 'walked' },
  ],

  cravings: [
    { id: 'c1', timestamp: daysAgoISO(7), intensity: 4, triggers: ['stress'], outcome: 'walked', notes: '' },
    { id: 'c2', timestamp: daysAgoISO(6), intensity: 3, triggers: ['boredom'], outcome: 'gave', notes: '' },
    { id: 'c3', timestamp: daysAgoISO(5), intensity: 5, triggers: ['stress', 'habit'], outcome: 'walked', notes: '' },
    { id: 'c4', timestamp: daysAgoISO(4), intensity: 2, triggers: ['habit'], outcome: 'walked', notes: '' },
    { id: 'c5', timestamp: daysAgoISO(3), intensity: 4, triggers: ['stress'], outcome: 'walked', notes: '' },
    { id: 'c6', timestamp: daysAgoISO(2), intensity: 3, triggers: ['boredom'], outcome: 'walked', notes: '' },
    { id: 'c7', timestamp: daysAgoISO(1), intensity: 2, triggers: ['habit'], outcome: 'walked', notes: '' },
  ],

  milestonesCelebrated: [],

  isPremium: false,

  pushPermissionDenied: false,
  pushDeniedAt: null,
};

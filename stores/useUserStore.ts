import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Goal = 'quit' | 'reduce';
export type CheckInStatus = 'free' | 'some' | 'relapse';
export type Consumption = 'little' | 'moderate' | 'alot' | 'great' | 'runs';
export type PastAttempts = 'first' | 'short' | 'longer' | 'many';
export type WorkEnvironment = 'office' | 'home' | 'feet' | 'mobile';

export type UserState = {
  // identity
  onboarded: boolean;
  firstName: string | null;

  // craving profile (collected during quiz)
  goal: Goal | null;
  peakHour: string | null;
  triggers: string[];
  motivations: string[];
  consumption: Consumption | null;
  pastAttempts: PastAttempts | null;
  workEnvironment: WorkEnvironment | null;

  // streak
  streakDays: number;
  bestStreak: number;
  lastCheckInDate: string | null; // ISO date YYYY-MM-DD
  streakFreezesUsedThisWeek: number;
  streakFreezesAvailableThisWeek: number; // 1 on free, 3 on premium

  // SOS
  sosUsedThisMonth: number;
  sosResetMonth: string | null; // "YYYY-MM" tracked for auto-reset
  sosDisclaimerAccepted: boolean;
  sosFreeLimit: number; // 3 on free, Infinity on premium

  // milestones
  milestonesCelebrated: number[]; // [1, 3, 7, 14, 30, 60, 90] once each

  // subscription
  isPremium: boolean;

  // push
  pushPermissionDenied: boolean;
  pushDeniedAt: string | null; // ISO date to detect 3-day escalation
};

export type UserActions = {
  setOnboarded: (v: boolean) => void;
  setFirstName: (name: string) => void;
  setGoal: (g: Goal) => void;
  setPeakHour: (h: string) => void;
  setTriggers: (t: string[]) => void;
  setMotivations: (m: string[]) => void;
  setConsumption: (c: Consumption) => void;
  setPastAttempts: (p: PastAttempts) => void;
  setWorkEnvironment: (w: WorkEnvironment) => void;
  completeCheckIn: (status: CheckInStatus) => void;
  useStreakFreeze: () => boolean; // returns true if used successfully
  resetStreak: () => void;
  logSosOpen: () => { allowed: boolean; remainingThisMonth: number };
  acceptSosDisclaimer: () => void;
  markMilestoneCelebrated: (day: number) => void;
  setPremium: (v: boolean) => void;
  markPushDenied: () => void;
  reset: () => void; // for dev / sign-out
};

export type UserStore = UserState & UserActions;

// ---------------------------------------------------------------------------
// Helpers (exported for tests and components)
// ---------------------------------------------------------------------------

/**
 * Today's date in YYYY-MM-DD (local timezone).
 */
export function getTodayISODate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Current month as YYYY-MM (local timezone).
 */
export function getCurrentMonth(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

/**
 * Returns the ISO date of the day before `today` (a YYYY-MM-DD string).
 */
export function getYesterdayISODate(today: string): string {
  const [y, m, d] = today.split('-').map(Number);
  // Use UTC to avoid DST surprises when subtracting a day.
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() - 1);
  const yy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

export const MILESTONE_DAYS = [1, 3, 7, 14, 30, 60, 90] as const;

/**
 * Returns the latest milestone that the user has reached but not yet
 * celebrated. Null if none pending.
 */
export function getMilestoneDueIfAny(
  streakDays: number,
  celebrated: number[] | Set<number>,
): number | null {
  const set = celebrated instanceof Set ? celebrated : new Set(celebrated);
  let due: number | null = null;
  for (const day of MILESTONE_DAYS) {
    if (streakDays >= day && !set.has(day)) due = day;
  }
  return due;
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

const initialState: UserState = {
  onboarded: false,
  firstName: null,

  goal: null,
  peakHour: null,
  triggers: [],
  motivations: [],
  consumption: null,
  pastAttempts: null,
  workEnvironment: null,

  streakDays: 0,
  bestStreak: 0,
  lastCheckInDate: null,
  streakFreezesUsedThisWeek: 0,
  streakFreezesAvailableThisWeek: 1,

  sosUsedThisMonth: 0,
  sosResetMonth: null,
  sosDisclaimerAccepted: false,
  sosFreeLimit: 3,

  milestonesCelebrated: [],

  isPremium: false,

  pushPermissionDenied: false,
  pushDeniedAt: null,
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setOnboarded: (v) => set({ onboarded: v }),

      setFirstName: (name) => {
        const trimmed = name.trim();
        set({ firstName: trimmed.length > 0 ? trimmed : null });
      },

      setGoal: (g) => set({ goal: g }),

      setPeakHour: (h) => set({ peakHour: h }),

      setTriggers: (t) => set({ triggers: t }),

      setMotivations: (m) => set({ motivations: m }),

      setConsumption: (c) => set({ consumption: c }),

      setPastAttempts: (p) => set({ pastAttempts: p }),

      setWorkEnvironment: (w) => set({ workEnvironment: w }),

      completeCheckIn: (status) => {
        const state = get();
        const today = getTodayISODate();

        // Already checked in today → no-op.
        if (state.lastCheckInDate === today) return;

        const yesterday = getYesterdayISODate(today);
        let streakDays = state.streakDays;

        if (status === 'free') {
          if (state.lastCheckInDate === yesterday) {
            streakDays = state.streakDays + 1;
          } else {
            // First ever, or chain broken → fresh start.
            streakDays = 1;
          }
        } else if (status === 'some') {
          // Soft day — hold the streak. If there's no streak yet, seed with 1
          // so the user sees credit for showing up.
          streakDays = state.streakDays > 0 ? state.streakDays : 1;
        } else {
          // relapse → reset.
          streakDays = 0;
        }

        const bestStreak = Math.max(state.bestStreak, streakDays);

        set({
          streakDays,
          bestStreak,
          lastCheckInDate: today,
        });
      },

      useStreakFreeze: () => {
        const state = get();
        if (state.streakFreezesUsedThisWeek >= state.streakFreezesAvailableThisWeek) {
          return false;
        }
        set({ streakFreezesUsedThisWeek: state.streakFreezesUsedThisWeek + 1 });
        return true;
      },

      resetStreak: () => set({ streakDays: 0 }),

      logSosOpen: () => {
        const state = get();
        const currentMonth = getCurrentMonth();

        // Monthly rollover.
        let used = state.sosUsedThisMonth;
        if (state.sosResetMonth !== currentMonth) {
          used = 0;
        }

        const limit = state.sosFreeLimit;
        if (used >= limit) {
          // Ensure the reset month is recorded even on a blocked attempt so
          // subsequent attempts don't keep rolling over.
          if (state.sosResetMonth !== currentMonth) {
            set({ sosResetMonth: currentMonth, sosUsedThisMonth: 0 });
          }
          return { allowed: false, remainingThisMonth: 0 };
        }

        const next = used + 1;
        set({
          sosUsedThisMonth: next,
          sosResetMonth: currentMonth,
        });

        const remaining = Number.isFinite(limit) ? Math.max(0, limit - next) : Infinity;
        return { allowed: true, remainingThisMonth: remaining };
      },

      acceptSosDisclaimer: () => set({ sosDisclaimerAccepted: true }),

      markMilestoneCelebrated: (day) => {
        const state = get();
        if (state.milestonesCelebrated.includes(day)) return;
        set({ milestonesCelebrated: [...state.milestonesCelebrated, day] });
      },

      setPremium: (v) =>
        set({
          isPremium: v,
          sosFreeLimit: v ? Number.POSITIVE_INFINITY : 3,
          streakFreezesAvailableThisWeek: v ? 3 : 1,
        }),

      markPushDenied: () =>
        set({
          pushPermissionDenied: true,
          pushDeniedAt: getTodayISODate(),
        }),

      reset: () => set({ ...initialState }),
    }),
    {
      name: 'sugarquit.user',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      // Persist everything in UserState — actions are re-attached on rehydrate.
      partialize: (state) => ({
        onboarded: state.onboarded,
        firstName: state.firstName,
        goal: state.goal,
        peakHour: state.peakHour,
        triggers: state.triggers,
        motivations: state.motivations,
        consumption: state.consumption,
        pastAttempts: state.pastAttempts,
        workEnvironment: state.workEnvironment,
        streakDays: state.streakDays,
        bestStreak: state.bestStreak,
        lastCheckInDate: state.lastCheckInDate,
        streakFreezesUsedThisWeek: state.streakFreezesUsedThisWeek,
        streakFreezesAvailableThisWeek: state.streakFreezesAvailableThisWeek,
        sosUsedThisMonth: state.sosUsedThisMonth,
        sosResetMonth: state.sosResetMonth,
        sosDisclaimerAccepted: state.sosDisclaimerAccepted,
        sosFreeLimit: state.sosFreeLimit,
        milestonesCelebrated: state.milestonesCelebrated,
        isPremium: state.isPremium,
        pushPermissionDenied: state.pushPermissionDenied,
        pushDeniedAt: state.pushDeniedAt,
      }),
    },
  ),
);

/**
 * True once AsyncStorage has rehydrated into the store. Use in `app/index.tsx`
 * to gate the first-run redirect so we don't flash the wrong screen.
 */
export function useHasHydrated(): boolean {
  // useUserStore.persist.hasHydrated is stable across renders; we subscribe to
  // the hydration lifecycle via a tiny hook-shaped wrapper.
  return useUserStoreHydration();
}

// Internal hook implemented separately to keep the public hook name tidy.
import { useEffect, useState } from 'react';

function useUserStoreHydration(): boolean {
  const [hydrated, setHydrated] = useState<boolean>(() =>
    useUserStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const unsubFinish = useUserStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
    // Safety: if already hydrated by the time this effect runs, flip it.
    if (useUserStore.persist.hasHydrated()) setHydrated(true);
    return () => {
      unsubFinish();
    };
  }, []);

  return hydrated;
}

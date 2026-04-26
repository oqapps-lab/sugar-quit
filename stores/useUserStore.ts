import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  cancelPendingPushes,
  pullUserData,
  pushCraving,
  pushProfileDebounced,
  pushSosOpen,
  pushSosOutcome,
  pushStreakDebounced,
} from '../lib/sync';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Goal = 'quit' | 'reduce';
export type CheckInStatus = 'free' | 'some' | 'relapse';
export type Consumption = 'little' | 'moderate' | 'alot' | 'great' | 'runs';
export type PastAttempts = 'first' | 'short' | 'longer' | 'many';
export type WorkEnvironment = 'office' | 'home' | 'feet' | 'mobile';
export type SosOutcome = 'walked' | 'softer' | 'gave';

export type CravingLogEntry = {
  /** ISO timestamp (Date.now() in ms is fine for sorting; ISO is for portability). */
  id: string;
  timestamp: string; // ISO 8601
  intensity: 1 | 2 | 3 | 4 | 5;
  triggers: string[];
  outcome: 'walked' | 'gave';
  notes: string; // empty string allowed
};

export type SosLogEntry = {
  id: string;
  timestamp: string; // ISO 8601, when the user opened SOS
  outcome: SosOutcome | null; // filled when post-sos modal completes; null while session is open
};

export type UserState = {
  // session (cloud auth)
  userId: string | null;
  email: string | null;

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
  // 3 on free, 9999 sentinel on premium (treated as unlimited).
  // Stored as integer so Zustand persist (JSON) round-trips cleanly —
  // earlier `Infinity` serialized to "null" and reset to 3 on rehydrate,
  // breaking premium unlimited-SOS access on cold restart (Bug 26).
  sosFreeLimit: number;
  sosLog: SosLogEntry[]; // every open + outcome (newest last)

  // craving log
  cravings: CravingLogEntry[]; // newest last

  // milestones
  milestonesCelebrated: number[]; // [1, 3, 7, 14, 30, 60, 90] once each

  // subscription
  isPremium: boolean;

  // push
  pushPermissionDenied: boolean;
  pushDeniedAt: string | null; // ISO date to detect 3-day escalation

  // notification preferences (persisted local; backend wiring comes with
  // the push notifications service in Stage 6)
  notificationPrefs: {
    morningCheckIn: boolean;
    dailyLesson: boolean;
    motivation: boolean;
    streakAtRisk: boolean;
  };
};

export type UserActions = {
  setSession: (s: { userId: string; email: string | null }) => void;
  clearSession: () => void;
  hydrateFromCloud: () => Promise<void>;
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
  logSosOpen: () => { allowed: boolean; remainingThisMonth: number; sessionId: string | null };
  logSosOutcome: (sessionId: string, outcome: SosOutcome) => void;
  acceptSosDisclaimer: () => void;
  logCraving: (entry: Omit<CravingLogEntry, 'id' | 'timestamp'>) => void;
  markMilestoneCelebrated: (day: number) => void;
  setPremium: (v: boolean) => void;
  markPushDenied: () => void;
  setNotificationPref: (key: keyof UserState['notificationPrefs'], on: boolean) => void;
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
  userId: null,
  email: null,
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
  sosLog: [],

  cravings: [],

  milestonesCelebrated: [],

  isPremium: false,

  pushPermissionDenied: false,
  pushDeniedAt: null,

  notificationPrefs: {
    morningCheckIn: true,
    dailyLesson: true,
    motivation: false,
    streakAtRisk: true,
  },
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSession: ({ userId, email }) => {
        set({ userId, email });
      },

      clearSession: () => {
        // Cancel any debounced profile/streak push that's pending — we don't
        // want a timer to fire post-signOut, lose its JWT, and 401-warning.
        cancelPendingPushes();
        set({ ...initialState });
      },

      hydrateFromCloud: async () => {
        const userId = get().userId;
        if (!userId) return;
        const merged = await pullUserData(userId);
        if (merged) set(merged);
      },

      setOnboarded: (v) => {
        set({ onboarded: v });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

      setFirstName: (name) => {
        // Sanitize: strip control chars (\n, \r, \t, backslash), collapse
        // whitespace, trim, cap at 40. Prevents literal "\n" or pasted
        // paragraphs from leaking into the app-wide greeting. Empty after
        // cleanup → null, so Home eyebrow falls back to "TODAY'S FORECAST".
        const cleaned = name
          .replace(/[\u0000-\u001F\u007F\\]/g, '')  // control chars + literal backslash
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 40);
        set({ firstName: cleaned.length > 0 ? cleaned : null });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

      setGoal: (g) => {
        set({ goal: g });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

      setPeakHour: (h) => {
        set({ peakHour: h });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

      setTriggers: (t) => {
        set({ triggers: t });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

      setMotivations: (m) => {
        set({ motivations: m });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

      setConsumption: (c) => {
        set({ consumption: c });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

      setPastAttempts: (p) => {
        set({ pastAttempts: p });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

      setWorkEnvironment: (w) => {
        set({ workEnvironment: w });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

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
        const userId = get().userId;
        if (userId) pushStreakDebounced(userId, get());
      },

      useStreakFreeze: () => {
        const state = get();
        if (state.streakFreezesUsedThisWeek >= state.streakFreezesAvailableThisWeek) {
          return false;
        }
        set({ streakFreezesUsedThisWeek: state.streakFreezesUsedThisWeek + 1 });
        const userId = get().userId;
        if (userId) pushStreakDebounced(userId, get());
        return true;
      },

      resetStreak: () => {
        set({ streakDays: 0 });
        const userId = get().userId;
        if (userId) pushStreakDebounced(userId, get());
      },

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
          return { allowed: false, remainingThisMonth: 0, sessionId: null };
        }

        const next = used + 1;
        const sessionId = `sos_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const session: SosLogEntry = {
          id: sessionId,
          timestamp: new Date().toISOString(),
          outcome: null,
        };
        set({
          sosUsedThisMonth: next,
          sosResetMonth: currentMonth,
          sosLog: [...state.sosLog, session],
        });

        const userId = get().userId;
        if (userId) {
          pushStreakDebounced(userId, get());
          void pushSosOpen(userId, session);
        }

        // limit >= 9999 means unlimited (premium); otherwise finite cap.
        const remaining = limit >= 9999 ? Infinity : Math.max(0, limit - next);
        return { allowed: true, remainingThisMonth: remaining, sessionId };
      },

      logSosOutcome: (sessionId, outcome) => {
        const state = get();
        const idx = state.sosLog.findIndex((s) => s.id === sessionId);
        if (idx < 0) {
          // Session not found — append a stand-alone outcome entry so the data
          // isn't lost (covers the case where post-sos opens without going
          // through logSosOpen, e.g. deep link).
          const newId = sessionId || `sos_${Date.now()}`;
          const orphan: SosLogEntry = {
            id: newId,
            timestamp: new Date().toISOString(),
            outcome,
          };
          set({ sosLog: [...state.sosLog, orphan] });
          const userId = get().userId;
          if (userId) void pushSosOpen(userId, orphan);
          return;
        }
        const next = [...state.sosLog];
        next[idx] = { ...next[idx], outcome };
        set({ sosLog: next });
        void pushSosOutcome(sessionId, outcome);
      },

      acceptSosDisclaimer: () => {
        set({ sosDisclaimerAccepted: true });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

      logCraving: (entry) => {
        const state = get();
        const full: CravingLogEntry = {
          ...entry,
          id: `craving_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
          timestamp: new Date().toISOString(),
        };
        set({ cravings: [...state.cravings, full] });
        const userId = get().userId;
        if (userId) void pushCraving(userId, full);
      },

      markMilestoneCelebrated: (day) => {
        const state = get();
        if (state.milestonesCelebrated.includes(day)) return;
        set({ milestonesCelebrated: [...state.milestonesCelebrated, day] });
        const userId = get().userId;
        if (userId) pushStreakDebounced(userId, get());
      },

      setPremium: (v) => {
        set({
          isPremium: v,
          sosFreeLimit: v ? 9999 : 3,
          streakFreezesAvailableThisWeek: v ? 3 : 1,
        });
        const userId = get().userId;
        if (userId) {
          pushProfileDebounced(userId, get());
          pushStreakDebounced(userId, get());
        }
      },

      markPushDenied: () => {
        set({
          pushPermissionDenied: true,
          pushDeniedAt: getTodayISODate(),
        });
        const userId = get().userId;
        if (userId) pushProfileDebounced(userId, get());
      },

      setNotificationPref: (key, on) => {
        const state = get();
        set({
          notificationPrefs: { ...state.notificationPrefs, [key]: on },
        });
        // Local-only for now; once the push notifications backend is wired
        // (Stage 6), schedule a debounced cloud push of these prefs.
      },

      reset: () => set({ ...initialState }),
    }),
    {
      name: 'sugarquit.user',
      storage: createJSONStorage(() => AsyncStorage),
      version: 2,
      // v1 → v2: added motivations/consumption/pastAttempts/workEnvironment + sosLog/cravings.
      // Hydrate older payloads with sane defaults so existing users don't reset.
      migrate: (persisted: any, fromVersion) => {
        if (!persisted || typeof persisted !== 'object') return persisted;
        if (fromVersion < 2) {
          return {
            ...persisted,
            motivations: persisted.motivations ?? [],
            consumption: persisted.consumption ?? null,
            pastAttempts: persisted.pastAttempts ?? null,
            workEnvironment: persisted.workEnvironment ?? null,
            sosLog: persisted.sosLog ?? [],
            cravings: persisted.cravings ?? [],
          };
        }
        return persisted;
      },
      // Persist everything in UserState — actions are re-attached on rehydrate.
      partialize: (state) => ({
        userId: state.userId,
        email: state.email,
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
        sosLog: state.sosLog,
        cravings: state.cravings,
        milestonesCelebrated: state.milestonesCelebrated,
        isPremium: state.isPremium,
        pushPermissionDenied: state.pushPermissionDenied,
        pushDeniedAt: state.pushDeniedAt,
        notificationPrefs: state.notificationPrefs,
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

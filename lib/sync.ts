/**
 * Supabase ↔ Zustand sync layer.
 *
 * - Local Zustand store remains the single source of truth for UI reads.
 * - Mutations write through to Supabase fire-and-forget (offline = silent
 *   skip; next session pull reconciles).
 * - On sign-in, pullUserData() loads the canonical server state and merges
 *   it into the store, overwriting local cache.
 *
 * Debounced helpers coalesce rapid bursts (typing in onboarding text inputs,
 * tapping multiple checkboxes) into a single upsert.
 */
import type {
  CravingLogEntry,
  SosLogEntry,
  UserState,
} from '../stores/useUserStore';
import { getSupabase } from './supabase';

type ProfileRow = {
  user_id: string;
  email: string | null;
  onboarded: boolean;
  first_name: string | null;
  goal: string | null;
  peak_hour: string | null;
  user_triggers: string[];
  motivations: string[];
  consumption: string | null;
  past_attempts: string | null;
  work_environment: string | null;
  is_premium: boolean;
  push_permission_denied: boolean;
  push_denied_at: string | null;
  sos_disclaimer_accepted: boolean;
};

type StreakRow = {
  user_id: string;
  streak_days: number;
  best_streak: number;
  last_check_in_date: string | null;
  streak_freezes_used_this_week: number;
  streak_freezes_available_this_week: number;
  sos_used_this_month: number;
  sos_reset_month: string | null;
  sos_free_limit: number;
  milestones_celebrated: number[];
};

type CravingRow = {
  id: string;
  user_id: string;
  ts: string;
  intensity: number;
  craving_triggers: string[];
  outcome: 'walked' | 'gave';
  notes: string;
};

type SosLogRow = {
  id: string;
  user_id: string;
  started_at: string;
  outcome: 'walked' | 'softer' | 'gave' | null;
};

const warn = (label: string, err: unknown) => {
  if (err) console.warn(`[sync] ${label}`, err);
};

const finiteOrThree = (n: number) => (Number.isFinite(n) ? n : 9999);

// ─── Pull (sign-in) ──────────────────────────────────────────────────────

export type PulledData = Partial<UserState>;

/**
 * Load the user's full canonical state from Supabase and shape it into a
 * partial UserState that can be applied via `useUserStore.setState`.
 * Returns null if Supabase is unconfigured or any query fails — caller can
 * fall back to local persisted state.
 */
export async function pullUserData(userId: string): Promise<PulledData | null> {
  const sb = getSupabase();
  if (!sb || !userId) return null;

  const [profileRes, streakRes, cravingsRes, sosRes] = await Promise.all([
    sb.from('profiles').select('*').eq('user_id', userId).maybeSingle(),
    sb.from('streaks').select('*').eq('user_id', userId).maybeSingle(),
    sb.from('cravings').select('*').eq('user_id', userId).order('ts', { ascending: true }),
    sb.from('sos_log').select('*').eq('user_id', userId).order('started_at', { ascending: true }),
  ]);

  if (profileRes.error) warn('pull profiles', profileRes.error);
  if (streakRes.error) warn('pull streaks', streakRes.error);
  if (cravingsRes.error) warn('pull cravings', cravingsRes.error);
  if (sosRes.error) warn('pull sos_log', sosRes.error);

  const p = (profileRes.data ?? null) as ProfileRow | null;
  const s = (streakRes.data ?? null) as StreakRow | null;
  const cs = (cravingsRes.data ?? []) as CravingRow[];
  const ss = (sosRes.data ?? []) as SosLogRow[];

  const merged: PulledData = {};

  if (p) {
    merged.onboarded = p.onboarded;
    merged.firstName = p.first_name;
    merged.goal = (p.goal as UserState['goal']) ?? null;
    merged.peakHour = p.peak_hour;
    merged.triggers = p.user_triggers ?? [];
    merged.motivations = p.motivations ?? [];
    merged.consumption = (p.consumption as UserState['consumption']) ?? null;
    merged.pastAttempts = (p.past_attempts as UserState['pastAttempts']) ?? null;
    merged.workEnvironment = (p.work_environment as UserState['workEnvironment']) ?? null;
    merged.isPremium = p.is_premium;
    merged.pushPermissionDenied = p.push_permission_denied;
    merged.pushDeniedAt = p.push_denied_at;
    merged.sosDisclaimerAccepted = p.sos_disclaimer_accepted;
  }

  if (s) {
    merged.streakDays = s.streak_days;
    merged.bestStreak = s.best_streak;
    merged.lastCheckInDate = s.last_check_in_date;
    merged.streakFreezesUsedThisWeek = s.streak_freezes_used_this_week;
    merged.streakFreezesAvailableThisWeek = s.streak_freezes_available_this_week;
    merged.sosUsedThisMonth = s.sos_used_this_month;
    merged.sosResetMonth = s.sos_reset_month;
    // sosFreeLimit may be Infinity locally — server stores 9999 as proxy.
    merged.sosFreeLimit = s.sos_free_limit >= 9999 ? Number.POSITIVE_INFINITY : s.sos_free_limit;
    merged.milestonesCelebrated = s.milestones_celebrated ?? [];
  }

  merged.cravings = cs.map((r): CravingLogEntry => ({
    id: r.id,
    timestamp: r.ts,
    intensity: r.intensity as CravingLogEntry['intensity'],
    triggers: r.craving_triggers ?? [],
    outcome: r.outcome,
    notes: r.notes ?? '',
  }));

  merged.sosLog = ss.map((r): SosLogEntry => ({
    id: r.id,
    timestamp: r.started_at,
    outcome: r.outcome,
  }));

  return merged;
}

// ─── Push: profile (debounced) ───────────────────────────────────────────

let profileTimer: ReturnType<typeof setTimeout> | null = null;
const PROFILE_DEBOUNCE_MS = 250;

export function pushProfileDebounced(userId: string, state: UserState): void {
  if (!userId) return;
  if (profileTimer) clearTimeout(profileTimer);
  profileTimer = setTimeout(() => {
    void pushProfileNow(userId, state);
  }, PROFILE_DEBOUNCE_MS);
}

export async function pushProfileNow(userId: string, state: UserState): Promise<void> {
  const sb = getSupabase();
  if (!sb || !userId) return;
  const row: Partial<ProfileRow> & { user_id: string } = {
    user_id: userId,
    onboarded: state.onboarded,
    first_name: state.firstName,
    goal: state.goal,
    peak_hour: state.peakHour,
    user_triggers: state.triggers,
    motivations: state.motivations,
    consumption: state.consumption,
    past_attempts: state.pastAttempts,
    work_environment: state.workEnvironment,
    is_premium: state.isPremium,
    push_permission_denied: state.pushPermissionDenied,
    push_denied_at: state.pushDeniedAt,
    sos_disclaimer_accepted: state.sosDisclaimerAccepted,
  };
  const { error } = await sb.from('profiles').upsert(row, { onConflict: 'user_id' });
  warn('push profile', error);
}

// ─── Push: streak (debounced) ────────────────────────────────────────────

let streakTimer: ReturnType<typeof setTimeout> | null = null;
const STREAK_DEBOUNCE_MS = 250;

export function pushStreakDebounced(userId: string, state: UserState): void {
  if (!userId) return;
  if (streakTimer) clearTimeout(streakTimer);
  streakTimer = setTimeout(() => {
    void pushStreakNow(userId, state);
  }, STREAK_DEBOUNCE_MS);
}

export async function pushStreakNow(userId: string, state: UserState): Promise<void> {
  const sb = getSupabase();
  if (!sb || !userId) return;
  const row: Partial<StreakRow> & { user_id: string } = {
    user_id: userId,
    streak_days: state.streakDays,
    best_streak: state.bestStreak,
    last_check_in_date: state.lastCheckInDate,
    streak_freezes_used_this_week: state.streakFreezesUsedThisWeek,
    streak_freezes_available_this_week: state.streakFreezesAvailableThisWeek,
    sos_used_this_month: state.sosUsedThisMonth,
    sos_reset_month: state.sosResetMonth,
    sos_free_limit: finiteOrThree(state.sosFreeLimit),
    milestones_celebrated: state.milestonesCelebrated,
  };
  const { error } = await sb.from('streaks').upsert(row, { onConflict: 'user_id' });
  warn('push streak', error);
}

// ─── Push: cravings (immediate) ──────────────────────────────────────────

export async function pushCraving(userId: string, entry: CravingLogEntry): Promise<void> {
  const sb = getSupabase();
  if (!sb || !userId) return;
  const row: CravingRow = {
    id: entry.id,
    user_id: userId,
    ts: entry.timestamp,
    intensity: entry.intensity,
    craving_triggers: entry.triggers,
    outcome: entry.outcome,
    notes: entry.notes,
  };
  const { error } = await sb.from('cravings').insert(row);
  warn('push craving', error);
}

// ─── Push: sos_log (immediate insert + outcome update) ───────────────────

export async function pushSosOpen(userId: string, entry: SosLogEntry): Promise<void> {
  const sb = getSupabase();
  if (!sb || !userId) return;
  const row: SosLogRow = {
    id: entry.id,
    user_id: userId,
    started_at: entry.timestamp,
    outcome: entry.outcome,
  };
  const { error } = await sb.from('sos_log').insert(row);
  warn('push sos_open', error);
}

export async function pushSosOutcome(sosId: string, outcome: 'walked' | 'softer' | 'gave'): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  const { error } = await sb.from('sos_log').update({ outcome }).eq('id', sosId);
  warn('push sos_outcome', error);
}

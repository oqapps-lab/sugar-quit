/**
 * Supabase client + thin auth helpers.
 *
 * Status:
 *  - Email/password sign-in / sign-up: works out of the box once you set
 *    `EXPO_PUBLIC_SUPABASE_URL` + `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
 *  - Apple / Google OAuth via `signInWithOAuth`: works in Expo Go for the
 *    redirect-based flow (slow). For native Sign in with Apple, you need
 *    `expo-apple-authentication` + a dev client (NOT Expo Go).
 *
 * In Expo Go without keys configured: every helper returns a not-configured
 * sentinel so the UI can show a "Configure Supabase to enable sign-in" hint
 * instead of crashing.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env, isSupabaseConfigured } from './env';

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (_client) return _client;
  _client = createClient(env.supabase.url, env.supabase.anonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // RN — no URL hash to read
    },
  });
  return _client;
}

export type AuthResult =
  | { ok: true; userId: string; email: string | null }
  | { ok: false; error: string };

// User-facing message when the Supabase client can't be initialised. Earlier
// this leaked the env var names directly into the sign-in/sign-up form
// ("Set EXPO_PUBLIC_SUPABASE_URL + EXPO_PUBLIC_SUPABASE_ANON_KEY") which is
// developer-debug content showing up to real users (kakoccc bug-report
// 2026-04-29 #36). Plain language for the form; logs still tell devs.
const NOT_CONFIGURED: AuthResult = {
  ok: false,
  error: 'Sign-in is temporarily unavailable. Please try again in a moment.',
};

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const sb = getSupabase();
  if (!sb) return NOT_CONFIGURED;
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true, userId: data.user.id, email: data.user.email ?? null };
}

export async function signUpWithEmail(email: string, password: string): Promise<AuthResult> {
  const sb = getSupabase();
  if (!sb) return NOT_CONFIGURED;
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true, userId: data.user?.id ?? '', email: data.user?.email ?? null };
}

export async function signOut(): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: true }; // nothing to sign out of
  const { error } = await sb.auth.signOut();
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function getCurrentUserId(): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data.session?.user?.id ?? null;
}

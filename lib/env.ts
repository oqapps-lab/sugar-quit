/**
 * Environment configuration — read from app.json `extra` block (preferred) or
 * EXPO_PUBLIC_* process env (Expo Router auto-loads .env files for these).
 *
 * No secrets here. Anything in `extra` ships in the app bundle, so this file is
 * only for *publishable* keys (Supabase anon key, Adapty SDK key — both are
 * designed to live in client code).
 *
 * Setup:
 *   1. Copy .env.example → .env (gitignored)
 *   2. Fill in values from Supabase Dashboard + Adapty Console
 *   3. Restart Metro
 */
import Constants from 'expo-constants';

type ExtraConfig = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  adaptyPublicKey?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as ExtraConfig;

export const env = {
  supabase: {
    url: extra.supabaseUrl ?? process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    anonKey: extra.supabaseAnonKey ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
  adapty: {
    publicKey: extra.adaptyPublicKey ?? process.env.EXPO_PUBLIC_ADAPTY_PUBLIC_KEY ?? '',
  },
};

export const isSupabaseConfigured = !!(env.supabase.url && env.supabase.anonKey);
export const isAdaptyConfigured = !!env.adapty.publicKey;

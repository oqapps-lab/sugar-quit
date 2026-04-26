/**
 * Client-side helper for the SOS chat.
 *
 * Calls the Supabase edge function at `/functions/v1/sos-chat`, which
 * proxies Anthropic's Claude API.  The Anthropic key never ships in the
 * client bundle — it lives only in Supabase secrets.
 *
 * Returns `null` on:
 *   - Supabase not configured (no edge function host)
 *   - Network failure (offline)
 *   - HTTP error (e.g. ANTHROPIC_API_KEY not set in Supabase secrets)
 *   - Empty / malformed response
 *
 * Caller (app/(modals)/sos.tsx) treats `null` as "AI unavailable" and
 * falls back to the canned offline tips already in the modal.
 */
import { env, isSupabaseConfigured } from './env';
import { getSupabase } from './supabase';

export type ChatTurn = { role: 'user' | 'assistant'; content: string };

export async function requestSosCoachReply(messages: ChatTurn[]): Promise<string | null> {
  if (!isSupabaseConfigured) return null;
  const sb = getSupabase();
  if (!sb) return null;

  const { data: sessionData } = await sb.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) return null; // anonymous users cannot reach the function

  const url = `${env.supabase.url}/functions/v1/sos-chat`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { reply?: string };
    const reply = (json.reply ?? '').trim();
    return reply.length > 0 ? reply : null;
  } catch {
    return null;
  }
}

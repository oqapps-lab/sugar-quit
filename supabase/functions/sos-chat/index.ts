// @ts-nocheck — Deno Edge Function (TS deps not in this project's tsconfig)
//
// Sugar Quit — SOS chat edge function.
//
// Provider-agnostic LLM proxy.  Picks OpenAI or Anthropic at runtime
// based on `LLM_PROVIDER`, so we can swap models / providers without a
// client release.  The chosen provider's key lives ONLY in Supabase
// secrets — never in the client bundle.
//
// ─── Configuration (Supabase secrets) ──────────────────────────────────
//
//   LLM_PROVIDER       'openai' (default) | 'anthropic'
//   OPENAI_API_KEY     sk-...        (required when provider=openai)
//   OPENAI_MODEL       gpt-5.5       (default — latest as of 2026-04-23)
//   ANTHROPIC_API_KEY  sk-ant-...    (required when provider=anthropic)
//   ANTHROPIC_MODEL    claude-sonnet-4-6  (default)
//
// Switch provider:
//   supabase secrets set LLM_PROVIDER=anthropic
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//
// Switch model (same provider):
//   supabase secrets set OPENAI_MODEL=gpt-5.5-pro
//
// ─── Deploy ────────────────────────────────────────────────────────────
//
//   1. Set secrets (Supabase Dashboard → Project Settings → Edge Functions
//      → Secrets — or via CLI):
//        supabase secrets set OPENAI_API_KEY=sk-proj-...
//        # optional override:
//        supabase secrets set OPENAI_MODEL=gpt-5.5
//   2. Deploy:
//        supabase functions deploy sos-chat \
//          --project-ref mzgierbwqegichdznsub
//   3. Verify:
//        curl -X POST \
//          -H "Authorization: Bearer <ANON_KEY>" \
//          -H "Content-Type: application/json" \
//          -d '{"messages":[{"role":"user","content":"sugar craving"}]}' \
//          https://mzgierbwqegichdznsub.supabase.co/functions/v1/sos-chat
//
// ─── Wire ──────────────────────────────────────────────────────────────
//
// Client (lib/sosChat.ts) → POST /functions/v1/sos-chat with
//   { messages: [{role: 'user'|'assistant', content: string}] }
// Response: { reply: string }
//
// On any failure the client falls back to the canned 2-bubble offline
// response in app/(modals)/sos.tsx.
//
// ─── Guardrails ────────────────────────────────────────────────────────
//
// - JWT verification ON (default) — only authenticated users can call.
// - Conversation pruned to the most recent 12 turns.
// - Output capped at 250 tokens.
// - System prompt embeds the Sugar Quit "companion, not medical advisor"
//   framing — mirror this in the disclaimer modal copy.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const MAX_TOKENS = 250;
const HISTORY_CAP = 12;

const SYSTEM_PROMPT = `You are the Sugar Quit SOS coach.  A user has tapped
the SOS button mid-craving.  Help them stay with the urge for 60 seconds
without acting on it.

Be present and concrete:
- Ask what they are physically holding or where they are sitting.
- Suggest one small physical action (water, walk, breath count) — never
  a complex protocol.
- Validate the craving without celebrating it.  No moralizing.  No
  shaming.  No "you can do it!" cheerleading.
- Keep replies under 30 words.  Two sentences max.
- Never give medical advice.  Never diagnose.  Never recommend specific
  diets, supplements, or medications.

If the user reports physical symptoms (chest pain, faintness, severe
nausea, etc.), reply once with: "That sounds beyond a craving — please
contact a clinician or local emergency line.  I'm a companion, not a
medical advisor."`;

type Turn = { role: "user" | "assistant"; content: string };

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { messages?: Turn[] };
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Invalid JSON body");
  }

  const messages = (body.messages ?? [])
    .filter((m) =>
      m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
    )
    .slice(-HISTORY_CAP);

  if (messages.length === 0) {
    return jsonError(400, "messages must include at least one user turn");
  }

  const provider = (Deno.env.get("LLM_PROVIDER") ?? "openai").toLowerCase();

  try {
    const reply =
      provider === "anthropic"
        ? await callAnthropic(messages)
        : await callOpenAI(messages);
    if (!reply) return jsonError(502, "Empty model reply");
    return new Response(JSON.stringify({ reply }), {
      headers: { "content-type": "application/json", connection: "keep-alive" },
    });
  } catch (err) {
    console.error("[sos-chat]", provider, err);
    const status = err?.status ?? 502;
    const message = err?.message ?? "Upstream model error";
    return jsonError(status, message);
  }
});

// ─── OpenAI ────────────────────────────────────────────────────────────

async function callOpenAI(messages: Turn[]): Promise<string> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw withStatus(500, "OPENAI_API_KEY not configured");
  const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-5.5";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_completion_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw withStatus(502, `openai ${res.status}: ${errText.slice(0, 300)}`);
  }
  const data = await res.json();
  return (data?.choices?.[0]?.message?.content ?? "").trim();
}

// ─── Anthropic ─────────────────────────────────────────────────────────

async function callAnthropic(messages: Turn[]): Promise<string> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) throw withStatus(500, "ANTHROPIC_API_KEY not configured");
  const model = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-sonnet-4-6";

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw withStatus(502, `anthropic ${res.status}: ${errText.slice(0, 300)}`);
  }
  const data = await res.json();
  return (data?.content?.[0]?.text ?? "").trim();
}

// ─── Helpers ───────────────────────────────────────────────────────────

function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function withStatus(status: number, message: string): Error & { status: number } {
  const e = new Error(message) as Error & { status: number };
  e.status = status;
  return e;
}

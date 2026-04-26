// @ts-nocheck — Deno Edge Function (TS deps not in this project's tsconfig)
//
// Sugar Quit — SOS chat edge function.
//
// Proxies a conversation through Anthropic's Claude API.  The Anthropic
// API key is held only in Supabase secrets and never ships to the client
// bundle.
//
// Deploy:
//   1. Set the Anthropic key as a Supabase secret:
//        supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
//   2. Deploy this function:
//        supabase functions deploy sos-chat --project-ref mzgierbwqegichdznsub
//   3. Verify it's live:
//        curl -X POST \
//          -H "Authorization: Bearer <ANON_KEY>" \
//          -H "Content-Type: application/json" \
//          -d '{"messages":[{"role":"user","content":"sugar craving"}]}' \
//          https://mzgierbwqegichdznsub.supabase.co/functions/v1/sos-chat
//
// Client request shape:
//   POST /functions/v1/sos-chat
//   Authorization: Bearer <anon-key>
//   Content-Type: application/json
//   {
//     "messages": [
//       { "role": "user", "content": "I'm reaching for the cookie jar" },
//       { "role": "assistant", "content": "What's in your hand right now?" },
//       { "role": "user", "content": "the jar" }
//     ]
//   }
//
// Response shape:
//   { "reply": "Where are you sitting?  Walk to a window for one breath." }
//
// Notes:
//   - JWT verification ON (default) — only authenticated users can call.
//   - Cost guardrails: capped at 250 output tokens, conversation pruned
//     to the most recent 12 messages so prompts stay small.
//   - System prompt embeds the Sugar Quit "companion, not medical advisor"
//     framing.  Mirror this in the disclaimer modal copy.
//
// Until the secret is set + this is deployed, the client falls back to
// the mock canned response in app/(modals)/sos.tsx.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 250;
const HISTORY_CAP = 12; // most-recent N messages

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

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return jsonError(500, "ANTHROPIC_API_KEY not configured");
  }

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "Invalid JSON body");
  }

  const messages = (body.messages ?? [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-HISTORY_CAP);

  if (messages.length === 0) {
    return jsonError(400, "messages must include at least one user turn");
  }

  const upstream = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!upstream.ok) {
    const errText = await upstream.text();
    console.error("[sos-chat] anthropic error", upstream.status, errText);
    return jsonError(502, "Upstream model error");
  }

  const data = await upstream.json();
  const reply = (data?.content?.[0]?.text ?? "").trim();
  if (!reply) {
    return jsonError(502, "Empty model reply");
  }

  return new Response(JSON.stringify({ reply }), {
    headers: {
      "content-type": "application/json",
      "connection": "keep-alive",
    },
  });
});

function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

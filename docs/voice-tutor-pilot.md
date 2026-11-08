# Continuous tiger voice tutor pilot

## Status

Draft implementation. No live paid model call, secret provision, production deployment or credit purchase was performed. The PR's Vercel preview can show `/voice-pilot`; it is **not voice-ready** until approved credentials and verified Firestore rules are configured. The same Vercel deployment can host the continuous relay. Voice quality, latency and grounding still need a paid smoke test. No claim of parity with ChatGPT voice or zero mistakes is made.

Latest scope: free for anyone while a **shared $100 USD lifetime API-usage pool** lasts. The earlier Premium-only / $2-per-user proposal is superseded. No top-ups or payments are implemented.

## Experience and architecture

The learner continuously streams mono PCM24 audio through a WebSocket relay to `gpt-realtime-2.1`. The same model listens, responds in speech and handles interruptions. This is not STT → text → TTS, push-to-talk or a recorded-video feature. PCM playback begins as model chunks arrive. `server_vad` controls turn detection; speaking stops local playback immediately, cancels generation and truncates provider history to the audio actually heard. A warm, lightly rumbly tiger character is prompted using the built-in `marin` voice, not a cloned/custom voice.

Entry: after a DMV or v1 TrainingCard answer when the public feature flag is on. The server reloads the real question, shown option order, answer key and explanation. Image-dependent items and v2 formats are not in this first pilot. The standalone preview shows one real DMV question. Unverified follow-ups should be acknowledged rather than invented. Prompt grounding reduces errors; it does not prove correctness.

Next.js issues a 30-second signed single-use relay ticket. No provider key reaches the browser. The relay owns model, instructions, token caps, settings and provider events; browser frames cannot call arbitrary API operations. Vercel WebSockets became generally available on October 20, 2026. The same deployment hosts the relay at `/api/voice-tutor/connect` using `upgradeWebSocket()` from `@vercel/functions` 3.10.0+, Node `ws`, Fluid compute and `maxDuration=180`. The route awaits usage settlement after disconnect. A standalone Node relay remains optional, not required. Local testing of this adapter uses Vercel CLI 54.14.2+ (`vercel dev`), not ordinary `next dev`. See [Vercel WebSocket docs](https://vercel.com/docs/functions/websockets) and [GA announcement](https://vercel.com/changelog/websocket-support-is-now-generally-available).

## Controls

- Hard 120-second server deadline and 30 seconds with no speech; no provider idle auto-response.
- At most 10 generated responses/session, 1024 output tokens/response, acknowledged 16,000 post-instruction input-token limit.
- 3 sessions per browser per UTC day, 10 per IP per day, one live session per browser. IP uses a daily HMAC; no raw IP is stored. Cookie deletion/VPNs can evade individual fair use, but not the shared pool.
- Signed HttpOnly SameSite cookie, exact browser Origin checks, bounded PCM frames/rate/total bytes, no compression, no automatic provider retries or reconnects.
- One atomic Firestore session reservation **before any audio is sent upstream**. At most $10.895360 is held temporarily for ten worst-case responses; actual cost replaces the hold on verified close. This can temporarily limit concurrency to nine sessions and stop admissions with unused balance. The large hold is deliberately conservative, not an expected conversation price.
- A provider configuration mismatch, missing usage, unexpected inference, ambiguous disconnect or accounting error retains the hold. Never auto-release unknown charges on timeout. Malformed/overrun accounting pauses the pool.
- Kill switch: unset `VOICE_TUTOR_PILOT`, and stop the relay to end existing sessions. Setting `voiceTutorPilot/budget.paused=true` stops new admissions; active sessions remain within their already reserved caps.

## Cost evidence

Rate card `openai-standard-usd-2026-11-08`, USD per million tokens: text input $4, cached $0.40, output $24; audio input $32, cached $0.40, output $64. Use response.done modality counts, including cancelled responses and repeatedly billed history; cache counts are subsets. No independent transcription, other backend model or tool calls are enabled.

Conservative per-response ceiling: full 128k instruction text allowance ×$4/M +16k post-instruction conversation ×$32/M +1024 outputs ×$64/M = $1.089536. The provider must acknowledge those limits before audio starts. Ten such ceilings form the session hold. Actual expected costs should be much lower. API account access and these configuration assumptions still need live verification.

Illustrative two-minute six-exchange scenario from the pricing research: 60 seconds of learner audio, 60 seconds of tutor audio, 6,000 billed text input tokens, 300 text output tokens, 5,100 cumulative input audio tokens and 1,200 output audio tokens costs about **$0.2712 without caching**, about **$0.1290 if 4,500 repeated audio tokens are cached**. These are calculations, not measured forecasts. Regional premiums, taxes, relay hosting, bandwidth and Firestore operations are outside the $100 model-token pool and must be reviewed before launch. GPT Live/Astra per-minute estimates are not this implementation's pricing.

Official references and schemas: [Realtime model](https://developers.openai.com/api/docs/models/gpt-realtime-2.1), [pricing](https://developers.openai.com/api/docs/pricing), [cost and latency](https://developers.openai.com/api/docs/guides/voice-latency-cost), [WebSocket API](https://developers.openai.com/api/docs/guides/voice-websockets). See also `voice-tutor-api-research.md`.

## Setup and preview launch checklist

1. Review draft PR and open its Vercel `/voice-pilot` preview. UI inspection works without credentials; live conversation does not.
2. Verify Fluid compute is enabled on the existing Vercel project and that the preview runtime supports the WebSocket route. The 180-second function duration fits the 120-second conversation plus cleanup, including on Hobby (300-second maximum). No additional hosting account is required. Review existing Vercel usage costs before enabling public access. The optional standalone command remains `npm run voice:relay` with WSS `/voice` and health `/health`.
3. Supply the approved OpenAI API key and existing Firebase Admin service account through Vercel's secret environment-variable settings, never browser env variables or source control. Provisioning new credentials/persistent access needs explicit approval. Use an isolated OpenAI project with a provider-side spend alert/limit as a backstop, with setup approval.
4. Configure a 32+ character `VOICE_TUTOR_COOKIE_SECRET` for Preview only. Leave `VOICE_TUTOR_RELAY_URL` and `VOICE_TUTOR_ALLOWED_ORIGIN` blank for the Vercel route: its URL and Origin check use the exact current preview origin automatically. The optional standalone relay instead requires both URL and allowed-origin settings and the same signing secret. Main app IP controls require Vercel's trusted `x-vercel-forwarded-for`, or localhost in development.
5. Review actual deployed Firestore rules. **Deny every client read/write** to `voiceTutorPilot/{document=**}`, `voiceTutorParticipants/{document=**}` and `voiceTutorIpDays/{document=**}`. An allow-all catch-all overrides narrower denies, so adding a deny fragment alone is insufficient. Verify with emulator tests/actual rules before setting `VOICE_TUTOR_LEDGER_RULES_VERIFIED=true`. No rules were changed remotely.
6. Set server `VOICE_TUTOR_PILOT=true` only after the above for the Vercel Preview environment only. Set `NEXT_PUBLIC_VOICE_TUTOR_PILOT=true` for in-training entry. Keep production flags off. A Vercel preview may carry existing production Firebase variables: use staging data/credentials for the initial smoke test, or explicitly approve the exact production ledger destination.
7. Authorize a bounded live test using the selected OpenAI project and host. Verify session acknowledgment, real usage dimensions, actual interruptions, stop/close/back navigation, network loss and maximum duration. Measure first audio latency, interruption delay, final cost and correctness on at least five questions (including shuffled choices and an unsupported follow-up). Only then call the pilot voice-ready.
8. Confirm OpenAI processing/privacy terms and 90-day post-pilot accounting cleanup ownership. The app stores numeric usage, pseudonymous browser/IP controls and question IDs, not speech or transcripts. Disable request-URL logging at proxies so short-lived tickets are not logged. Update retention automation as part of approved hosting setup; no cleanup job is deployed here.

## Measurement and reconciliation

Admin-only `GET /api/admin/voice-tutor` returns distinct browsers, sessions, provider responses, settled cost, reserved cost and duration. `voiceTutorParticipants/{id}/sessions/{session}/turns/realtime/responses/{responseId}` records each numeric usage event durably and idempotently. `voiceTutorPilot/budget` holds aggregate accounting. Unknown sessions keep reservations until a human reconciles provider billing. Do not simply clear `reservedMicrousd` or delete a hold. These records include model/rate version, but final invoices remain authoritative.

## Tests

Run `npm test`, `npm run typecheck`, `npm run lint`, `npx tsx scripts/build-training-parts.ts --check`, `python3 -I scripts/review-question-banks.py`. No test should contact OpenAI or production Firebase. Browser microphone playback, real provider behavior and hosting configuration need the approved live smoke test above.

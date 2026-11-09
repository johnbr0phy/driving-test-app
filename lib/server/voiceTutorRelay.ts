/** Testable server-owned relay engine. No listening sockets are opened on import. */
import { randomUUID } from 'node:crypto';
import WebSocket from 'ws';
import { VOICE_RATE_CARD, VOICE_SESSION_RESERVE_MICROUSD, VOICE_MAX_RESPONSES } from '../voice-tutor/config';
import { readVoiceTicket } from './voiceTutorSecurity';
import { loadVoiceQuestion, voiceInstructions, type VoiceQuestionKey } from './voiceTutorQuestion';
import { claimVoiceSession, readVoiceSession, endVoiceSession, reserveVoiceTurn, settleVoiceTurn, recordVoiceResponse } from './voiceTutorLedger';
import { realtimeCost } from './voiceTutorUsage';
import { realtimeSession, validRealtimeSession, AudioRateGuard } from './voiceTutorRealtime';

const defaults = { onFinished: () => {}, readVoiceSession, claimVoiceSession, loadVoiceQuestion, reserveVoiceTurn, settleVoiceTurn, endVoiceSession, recordVoiceResponse,
  createProvider: (identity: ReturnType<typeof readVoiceTicket>) => new WebSocket(`wss://api.openai.com/v1/realtime?model=${VOICE_RATE_CARD.model}`, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'OpenAI-Safety-Identifier': identity.participantId }, maxPayload: 2 * 1024 * 1024, perMessageDeflate: false }),
};

export async function serveVoiceRelay(client: WebSocket, identity: ReturnType<typeof readVoiceTicket>, overrides: Partial<typeof defaults> = {}, sessions = new Set<() => void>()) {
  const { onFinished, readVoiceSession, claimVoiceSession, loadVoiceQuestion, reserveVoiceTurn, settleVoiceTurn, endVoiceSession, recordVoiceResponse, createProvider } = { ...defaults, ...overrides };
  const base = { participantId: identity.participantId, ipKey: identity.ipKey, sessionId: identity.sessionId };
  const hold = { ...base, turnId: 'realtime' as const };
  let upstream: WebSocket | null = null; let reserved = false; let configured = false;
  let claimed = false; let finalizationQueued = false; let initializing = true; let closing = false; let finished = false; let unknown = false; let reason = 'Session ended. Your microphone is off.';
  let requested = 0; let awaiting = false; let activeId = ''; let speaking = false; let pending = false;
  let lastActivity = Date.now(); let speechStartedAt = 0; const startedAt = Date.now();
  let cost = 0; let responses = 0; const totals: Record<string, number> = {};
  const seen = new Set<string>(); const commits = new Set<string>();
  const outputMs = new Map<string, number>(); const transcripts = new Map<string, string>();
  const guard = new AudioRateGuard(startedAt); let serial = Promise.resolve();
  let deadline: ReturnType<typeof setTimeout> | undefined; let idle: ReturnType<typeof setInterval> | undefined; let drain: ReturnType<typeof setTimeout> | undefined; let startup: ReturnType<typeof setTimeout> | undefined;
  function send(data: object) { if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data)); }
  function toProvider(data: object) { if (upstream?.readyState !== WebSocket.OPEN) throw new Error('provider_not_open'); upstream.send(JSON.stringify(data)); }
  function enqueue(work: () => Promise<void>) {
    serial = serial.then(work).catch(() => { unknown = unknown || awaiting || !!activeId; close('The voice connection stopped. Please try later.'); });
  }
  async function finish() {
    if (finished) return; finished = true;
    clearTimeout(deadline); clearTimeout(drain); clearTimeout(startup); clearInterval(idle); sessions.delete(onShutdown);
    upstream?.close();
    try {
      if (reserved) await settleVoiceTurn({ ...hold, actualMicrousd: cost, usage: Object.keys(totals).length ? totals : { totalTokens: 0 }, providerRequestId: identity.sessionId,
        model: VOICE_RATE_CARD.model, durationMs: Date.now() - startedAt, responseCount: responses, status: unknown || awaiting || activeId ? 'unknown' : 'completed' });
      if (claimed) await endVoiceSession(base);
    } catch { /* Unsettled money remains reserved. Never release after an error. */ }
    send({ type: 'ended', reason, costUsd: cost / 1000000 }); client.close(1000);
    onFinished();
  }
  function requestFinish() {
    if (finalizationQueued || finished) return;
    finalizationQueued = true;
    // Stop receiving new work, then settle only after already received provider
    // events (including durable response writes) have completed.
    upstream?.close();
    serial = serial.then(finish).catch(() => { /* Keep the reservation on failure. */ });
  }
  function close(note: string) {
    if (closing) return; closing = true; configured = false; pending = false; reason = note;
    send({ type: 'speech.started' });
    if (initializing) return;
    if ((awaiting || activeId) && upstream?.readyState === WebSocket.OPEN) {
      try { toProvider({ type: 'response.cancel', ...(activeId ? { response_id: activeId } : {}) }); } catch { unknown = true; }
      drain = setTimeout(requestFinish, 5000);
    } else requestFinish();
  }
  const onShutdown = () => close('The voice service is restarting. Your microphone is off.'); sessions.add(onShutdown);
  function maybeRespond() {
    if (!configured || closing || speaking || !pending || awaiting || activeId) return;
    if (requested >= VOICE_MAX_RESPONSES) { close('This session has reached its 10-response limit. Your microphone is off.'); return; }
    pending = false; awaiting = true; requested++;
    toProvider({ type: 'response.create', response: { max_output_tokens: VOICE_RATE_CARD.maxOutputTokens, metadata: { pilot_response: `${identity.sessionId}-${requested}` } } });
  }
  client.on('close', () => close('The browser disconnected.'));
  client.on('error', () => close('The browser disconnected.'));
  client.on('message', (raw, binary) => {
    if (closing || !configured) return;
    if (binary) {
      const bytes = Buffer.isBuffer(raw) ? raw : Buffer.from(raw as ArrayBuffer);
      if (!guard.accept(bytes.length) || (upstream?.bufferedAmount ?? 0) > 256000) { close('The audio connection exceeded its safe streaming limit.'); return; }
      try { toProvider({ type: 'input_audio_buffer.append', audio: bytes.toString('base64') }); } catch { unknown = true; close('The voice connection stopped.'); }
      return;
    }
    try {
      const event = JSON.parse(raw.toString());
      if (event.type === 'end') close('Session ended. Your microphone is off.');
      else if (event.type === 'interrupt') { if (activeId) toProvider({ type: 'response.cancel', response_id: activeId }); }
      else if (event.type === 'playback' && typeof event.itemId === 'string' && outputMs.has(event.itemId) && Number.isFinite(event.audioEndMs) && event.audioEndMs >= 0) {
        toProvider({ type: 'conversation.item.truncate', item_id: event.itemId, content_index: 0, audio_end_ms: Math.floor(Math.min(event.audioEndMs, outputMs.get(event.itemId)!)) });
      } else close('Unsupported voice control.');
    } catch { close('Invalid voice control.'); }
  });
  try {
    const session = await readVoiceSession(identity);
    if (client.readyState !== WebSocket.OPEN || session.expiresAtMs <= Date.now()) { initializing = false; close('The voice session expired.'); if (closing) await finish(); return; }
    const claim = await claimVoiceSession({ ...base, connectionId: randomUUID() });
    if (claim.duplicate) throw new Error('ticket_reused');
    claimed = true;
    const question = loadVoiceQuestion(JSON.parse(session.questionKey) as VoiceQuestionKey);
    const held = await reserveVoiceTurn({ ...hold, questionKey: session.questionKey, reserveMicrousd: VOICE_SESSION_RESERVE_MICROUSD, model: VOICE_RATE_CARD.model, rateVersion: VOICE_RATE_CARD.version });
    if (held.duplicate) throw new Error('hold_reused');
    reserved = true; initializing = false;
    if (client.readyState !== WebSocket.OPEN || closing) { await finish(); return; }
    deadline = setTimeout(() => close('Your two-minute session ended. Your microphone is off.'), Math.max(0, session.expiresAtMs - Date.now()));
    idle = setInterval(() => {
      if (Date.now() - lastActivity >= 30000) close('No speech for 30 seconds. Your microphone is off.');
      if (speechStartedAt && Date.now() - speechStartedAt > 20000) close('Please keep each spoken question under 20 seconds. Session ended.');
    }, 500);
    startup = setTimeout(() => close('The voice provider did not confirm a safe session configuration.'), 10000);
    upstream = createProvider(identity);
    upstream.on('open', () => { if (closing) upstream?.close(); });
    upstream.on('error', () => { close('The voice provider disconnected.'); requestFinish(); });
    upstream.on('close', () => { if (!finished) { close('The voice provider disconnected.'); requestFinish(); } });
    upstream.on('message', raw => {
      if (finalizationQueued || finished) return;
      enqueue(async () => {
        const e = JSON.parse(raw.toString());
        if (e.type === 'session.created') toProvider({ type: 'session.update', session: realtimeSession(voiceInstructions(question)) });
        else if (e.type === 'session.updated') {
          if (!validRealtimeSession(e.session)) { unknown = requested > responses; close('The provider did not confirm the pilot’s spending controls.'); return; }
          if (!closing) { configured = true; clearTimeout(startup); send({ type: 'ready' }); }
        } else if (e.type === 'input_audio_buffer.speech_started') {
          speaking = true; speechStartedAt = Date.now(); lastActivity = Date.now(); send({ type: 'speech.started' });
        } else if (e.type === 'input_audio_buffer.speech_stopped') { speaking = false; speechStartedAt = 0; lastActivity = Date.now(); }
        else if (e.type === 'input_audio_buffer.committed') {
          if (!commits.has(e.item_id)) { commits.add(e.item_id); pending = true; maybeRespond(); }
        } else if (e.type === 'response.created') {
          if (!awaiting || activeId || typeof e.response?.id !== 'string') { unknown = true; close('Unexpected provider response. Session stopped.'); return; }
          activeId = e.response.id; awaiting = false;
        } else if (e.type === 'response.output_audio.delta') {
          if (e.response_id !== activeId || typeof e.item_id !== 'string' || typeof e.delta !== 'string') throw new Error('unexpected_audio');
          const length = Buffer.from(e.delta, 'base64').length;
          outputMs.set(e.item_id, (outputMs.get(e.item_id) || 0) + length / 48);
          lastActivity = Date.now();
          if (!closing && !speaking) send({ type: 'audio.delta', delta: e.delta, responseId: e.response_id, itemId: e.item_id });
        } else if (e.type === 'response.output_audio.done') send({ type: 'audio.done' });
        else if (e.type === 'response.output_audio_transcript.delta') transcripts.set(e.response_id, (transcripts.get(e.response_id) || '') + (e.delta || ''));
        else if (e.type === 'response.done') {
          const response = e.response; if (seen.has(response?.id)) return;
          if (!response || response.id !== activeId) throw new Error('unexpected_done');
          const metered = realtimeCost(response.usage);
          const recorded = await recordVoiceResponse({ ...hold, responseId: response.id, actualMicrousd: metered.microusd, usage: metered.usage, model: VOICE_RATE_CARD.model, status: response.status || 'unknown' });
          if (recorded.status !== 'reserved') throw new Error('accounting_failed');
          seen.add(response.id); cost += metered.microusd; responses++;
          for (const [key, value] of Object.entries(metered.usage)) totals[key] = (totals[key] || 0) + value;
          send({ type: 'response.done', text: transcripts.get(response.id) || '', costUsd: metered.microusd / 1000000 });
          transcripts.delete(response.id); activeId = ''; awaiting = false; lastActivity = Date.now();
          if (closing) requestFinish(); else maybeRespond();
        } else if (e.type === 'error') {
          if (e.error?.code === 'response_cancel_not_active') return;
          unknown = unknown || awaiting || !!activeId; close('The voice provider could not continue.');
        }
      });
    });
  } catch { initializing = false; close('The free pilot is unavailable or you have reached its fair-use limit. Please try later.'); if (closing && !awaiting && !activeId) await finish(); }
}

/** Server-only accounting. Never store learner speech, prompts or transcripts here.
 * Unfinished holds deliberately have no TTL. Reconcile against provider billing manually.
 */
import type { Firestore } from 'firebase-admin/firestore';
import { getAdminDb } from '../firebase-admin';

export const VOICE_PILOT_BUDGET_MICROUSD = 100_000_000;
export const VOICE_SESSION_MAX_MS = 120_000;
export const VOICE_SESSION_MAX_TURNS = 10;
export const VOICE_SESSION_IDLE_MS = 30_000;
export const VOICE_DEVICE_SESSIONS_PER_DAY = 3;
export const VOICE_IP_SESSIONS_PER_DAY = 10;
export class VoiceTutorLedgerError extends Error {
  constructor(public code: string, public httpStatus = 409) { super(code); this.name = 'VoiceTutorLedgerError'; }
}
function fail(code: string, status = 409): never { throw new VoiceTutorLedgerError(code, status); }
const integer = (n: unknown): n is number => Number.isSafeInteger(n) && Number(n) >= 0;
const id = (value: string) => { if (!/^[a-zA-Z0-9_-]{1,128}$/.test(value)) fail('invalid_id', 400); return value; };
const usageKeys = ['inputTokens', 'outputTokens', 'cachedInputTokens', 'input_tokens', 'output_tokens', 'cached_input_tokens', 'inputTextTokens', 'inputAudioTokens', 'cachedTextTokens', 'cachedAudioTokens', 'outputTextTokens', 'outputAudioTokens', 'totalTokens'];
const validUsage = (usage: unknown): usage is Record<string, number> => !!usage && typeof usage === 'object' && !Array.isArray(usage) && Object.keys(usage).length > 0 && Object.entries(usage).every(([k, v]) => usageKeys.includes(k) && integer(v));
const sameUsage = (a: Record<string, number>, b: Record<string, number>) => usageKeys.every(k => (a[k] || 0) === (b[k] || 0));
const day = (now: number) => new Date(now).toISOString().slice(0, 10);
const defaults = () => ({ budgetMicrousd: VOICE_PILOT_BUDGET_MICROUSD, spentMicrousd: 0, reservedMicrousd: 0, paused: false, distinctParticipants: 0, sessions: 0, turns: 0, completedTurns: 0, durationMs: 0, failedTurns: 0, providerResponses: 0 });
type Budget = ReturnType<typeof defaults>;
function checkBudget(b: Budget) {
  if (!integer(b.spentMicrousd) || !integer(b.reservedMicrousd) || b.spentMicrousd + b.reservedMicrousd > VOICE_PILOT_BUDGET_MICROUSD) fail('invalid_budget', 503);
}
const refs = (db: Firestore, participantId: string, sessionId?: string, turnId?: string) => ({
  budget: db.doc('voiceTutorPilot/budget'),
  participant: db.doc(`voiceTutorParticipants/${id(participantId)}`),
  session: sessionId ? db.doc(`voiceTutorParticipants/${id(participantId)}/sessions/${id(sessionId)}`) : null,
  turn: sessionId && turnId ? db.doc(`voiceTutorParticipants/${id(participantId)}/sessions/${id(sessionId)}/turns/${id(turnId)}`) : null,
});
export interface VoiceSessionInput { participantId: string; ipKey: string; sessionId: string; nowMs?: number }
export async function createVoiceSession(input: VoiceSessionInput & { questionKey: string }, db: Firestore = getAdminDb()) {
  if (typeof input.questionKey !== 'string' || !input.questionKey || input.questionKey.length > 2000) fail('invalid_question', 400);
  const now = input.nowMs ?? Date.now(); const today = day(now);
  const r = refs(db, input.participantId, input.sessionId);
  const ip = db.doc(`voiceTutorIpDays/${id(input.ipKey)}_${today}`);
  return db.runTransaction(async tx => {
    const [bs, ps, ss, ips] = await Promise.all([tx.get(r.budget), tx.get(r.participant), tx.get(r.session!), tx.get(ip)]);
    const b = { ...defaults(), ...bs.data() }; checkBudget(b);
    const p = ps.data() || {}; const s = ss.data(); const ipCount = ips.data()?.sessions || 0;
    if (s) {
      if (s.ipKey !== input.ipKey || s.questionKey !== input.questionKey) fail('session_mismatch');
      return { sessionId: input.sessionId, expiresAtMs: s.expiresAtMs as number, turns: s.turns as number, duplicate: true };
    }
    if (b.paused) fail('pilot_paused', 503);
    if (b.spentMicrousd + b.reservedMicrousd >= VOICE_PILOT_BUDGET_MICROUSD) fail('budget_exhausted', 429);
    if (p.quarantined || p.activeTurn) fail('participant_busy');
    if (p.sessionExpiresAtMs > now) fail('session_active');
    const count = p.day === today ? p.sessionsToday || 0 : 0;
    if (count >= VOICE_DEVICE_SESSIONS_PER_DAY || ipCount >= VOICE_IP_SESSIONS_PER_DAY) fail('daily_limit', 429);
    const expiresAtMs = now + VOICE_SESSION_MAX_MS;
    tx.set(r.budget, { ...b, budgetMicrousd: VOICE_PILOT_BUDGET_MICROUSD, sessions: b.sessions + 1, distinctParticipants: b.distinctParticipants + (ps.exists ? 0 : 1) });
    tx.set(r.participant, { ...p, day: today, sessionsToday: count + 1, sessionId: input.sessionId, sessionExpiresAtMs: expiresAtMs, activeTurn: null, quarantined: false });
    tx.set(r.session!, { ipKey: input.ipKey, createdAtMs: now, expiresAtMs, lastTurnAtMs: now, questionKey: input.questionKey, turns: 0 });
    tx.set(ip, { sessions: ipCount + 1 });
    return { sessionId: input.sessionId, expiresAtMs, turns: 0, duplicate: false };
  });
}
export interface ReserveVoiceTurnInput extends VoiceSessionInput { turnId: string; reserveMicrousd: number; questionKey: string; model?: string; rateVersion?: string }
export async function reserveVoiceTurn(input: ReserveVoiceTurnInput, db: Firestore = getAdminDb()) {
  if (!integer(input.reserveMicrousd) || input.reserveMicrousd === 0 || typeof input.questionKey !== 'string' || input.questionKey.length > 2000) fail('invalid_reservation', 400);
  if (input.model !== undefined && !/^[a-zA-Z0-9._-]{1,100}$/.test(input.model)) fail('invalid_model', 400);
  if (input.rateVersion !== undefined && !/^[a-zA-Z0-9._-]{1,100}$/.test(input.rateVersion)) fail('invalid_rate_version', 400);
  const r = refs(db, input.participantId, input.sessionId, input.turnId); const now = input.nowMs ?? Date.now();
  return db.runTransaction(async tx => {
    const [bs, ps, ss, ts] = await Promise.all([tx.get(r.budget), tx.get(r.participant), tx.get(r.session!), tx.get(r.turn!)]);
    const b = { ...defaults(), ...bs.data() }; checkBudget(b); const p = ps.data(); const s = ss.data(); const t = ts.data();
    if (t) {
      if (t.questionKey !== input.questionKey || t.reserveMicrousd !== input.reserveMicrousd || t.ipKey !== input.ipKey || t.model !== input.model || t.rateVersion !== input.rateVersion) fail('idempotency_conflict');
      return { duplicate: true, status: t.status as string, reserveMicrousd: t.reserveMicrousd as number };
    }
    if (b.paused) fail('pilot_paused', 503);
    if (!p || !s || s.ipKey !== input.ipKey || p.sessionId !== input.sessionId) fail('invalid_session', 403);
    if (p.quarantined || p.activeTurn) fail('participant_busy');
    if (s.questionKey !== input.questionKey) fail('session_mismatch');
    if (now - s.lastTurnAtMs >= VOICE_SESSION_IDLE_MS) fail('session_idle', 429);
    if (s.endedAtMs || now >= s.expiresAtMs || s.turns >= VOICE_SESSION_MAX_TURNS) fail('session_finished', 429);
    if (b.spentMicrousd + b.reservedMicrousd + input.reserveMicrousd > VOICE_PILOT_BUDGET_MICROUSD) fail('budget_exhausted', 429);
    tx.set(r.budget, { ...b, reservedMicrousd: b.reservedMicrousd + input.reserveMicrousd, turns: b.turns + 1 });
    tx.set(r.participant, { ...p, activeTurn: `${input.sessionId}/${input.turnId}` });
    tx.set(r.session!, { ...s, turns: s.turns + 1 });
    tx.set(r.turn!, { status: 'reserved', reserveMicrousd: input.reserveMicrousd, questionKey: input.questionKey, ipKey: input.ipKey, createdAtMs: now, ...(input.model ? { model: input.model } : {}), ...(input.rateVersion ? { rateVersion: input.rateVersion } : {}), ...(input.turnId === 'realtime' ? { reportedMicrousd: 0, responseCount: 0, reportedUsage: {} } : {}) });
    return { duplicate: false, status: 'reserved', reserveMicrousd: input.reserveMicrousd };
  });
}
export interface SettleVoiceTurnInput extends VoiceSessionInput {
  turnId: string; actualMicrousd: number; usage: Record<string, number>; providerRequestId: string;
  model: string; durationMs: number; responseCount?: number; status: 'completed' | 'failed' | 'unknown';
}
export async function settleVoiceTurn(input: SettleVoiceTurnInput, db: Firestore = getAdminDb()) {
  const r = refs(db, input.participantId, input.sessionId, input.turnId);
  return db.runTransaction(async tx => {
    const [bs, ps, ts, ss] = await Promise.all([tx.get(r.budget), tx.get(r.participant), tx.get(r.turn!), tx.get(r.session!)]);
    const b = { ...defaults(), ...bs.data() }; checkBudget(b); const p = ps.data(); const t = ts.data();
    if (!t || !p || t.ipKey !== input.ipKey) fail('unknown_reservation');
    if (t.status !== 'reserved') return { duplicate: true, status: t.status as string };
    const valid = integer(input.actualMicrousd) && integer(input.durationMs) && validUsage(input.usage) && typeof input.model === 'string' && input.model.length <= 100 && typeof input.providerRequestId === 'string' && input.providerRequestId.length <= 200;
    const aggregateMismatch = input.turnId === 'realtime' && (!integer(input.responseCount) || input.responseCount !== t.responseCount || input.actualMicrousd !== t.reportedMicrousd || !validUsage(input.usage) || !sameUsage(input.usage, t.reportedUsage || {}) || (t.model && input.model !== t.model));
    const overrun = integer(input.actualMicrousd) && input.actualMicrousd > t.reserveMicrousd;
    if (input.status !== 'completed' || !valid || overrun || aggregateMismatch) {
      // Unknown provider outcomes must never free budget or permit another charge.
      const status = overrun ? 'overrun' : aggregateMismatch ? 'aggregate_mismatch' : !valid ? 'invalid_settlement' : input.status;
      tx.set(r.budget, { ...b, paused: b.paused || overrun || !valid || aggregateMismatch, failedTurns: b.failedTurns + 1 });
      tx.set(r.participant, { ...p, quarantined: true });
      tx.set(r.turn!, { ...t, status, ...(valid ? { reportedActualMicrousd: input.actualMicrousd, usage: input.usage, model: input.model, providerRequestId: input.providerRequestId, durationMs: input.durationMs } : {}), settledAtMs: input.nowMs ?? Date.now() });
      return { duplicate: false, status };
    }
    if (b.reservedMicrousd < t.reserveMicrousd) fail('invalid_budget', 503);
    tx.set(r.budget, { ...b, reservedMicrousd: b.reservedMicrousd - t.reserveMicrousd, spentMicrousd: b.spentMicrousd + input.actualMicrousd, completedTurns: b.completedTurns + 1, durationMs: b.durationMs + input.durationMs });
    tx.set(r.participant, { ...p, activeTurn: null });
    tx.set(r.session!, { ...ss.data(), lastTurnAtMs: input.nowMs ?? Date.now() });
    tx.set(r.turn!, { ...t, status: 'completed', actualMicrousd: input.actualMicrousd, usage: input.usage, providerRequestId: input.providerRequestId, model: input.model, durationMs: input.durationMs, settledAtMs: input.nowMs ?? Date.now() });
    return { duplicate: false, status: 'completed' };
  });
}
export async function readVoiceTutorStatus(input: { participantId: string; nowMs?: number }, db: Firestore = getAdminDb()) {
  const r = refs(db, input.participantId);
  return db.runTransaction(async tx => {
    const [bs, ps] = await Promise.all([tx.get(r.budget), tx.get(r.participant)]);
    const b = { ...defaults(), ...bs.data() }; checkBudget(b); const p = ps.data() || {};
    return {
      budget: { budgetMicrousd: VOICE_PILOT_BUDGET_MICROUSD, spentMicrousd: b.spentMicrousd, reservedMicrousd: b.reservedMicrousd, remainingMicrousd: VOICE_PILOT_BUDGET_MICROUSD - b.spentMicrousd - b.reservedMicrousd, paused: b.paused },
      participant: { sessionsToday: p.day === day(input.nowMs ?? Date.now()) ? p.sessionsToday || 0 : 0, busy: !!p.activeTurn, quarantined: !!p.quarantined, sessionId: p.sessionId || null, sessionExpiresAtMs: p.sessionExpiresAtMs || null },
      limits: { sessionMaxMs: VOICE_SESSION_MAX_MS, turnsPerSession: VOICE_SESSION_MAX_TURNS, sessionsPerDay: VOICE_DEVICE_SESSIONS_PER_DAY, ipSessionsPerDay: VOICE_IP_SESSIONS_PER_DAY },
      metrics: { distinctParticipants: b.distinctParticipants, sessions: b.sessions, turns: b.turns, completedTurns: b.completedTurns, failedTurns: b.failedTurns, providerResponses: b.providerResponses, costMicrousd: b.spentMicrousd, durationMs: b.durationMs },
    };
  });
}

export async function readVoiceSession(input: { participantId: string; sessionId: string }, db: Firestore = getAdminDb()) {
  const r = refs(db, input.participantId, input.sessionId);
  const snap = await r.session!.get();
  if (!snap.exists) fail('invalid_session', 404);
  return snap.data() as { questionKey: string; ipKey: string; createdAtMs: number; expiresAtMs: number; lastTurnAtMs: number; turns: number };
}

/** A relay claims a session once. Duplicate callers must NOT open another socket. */
export async function claimVoiceSession(input: VoiceSessionInput & { connectionId: string }, db: Firestore = getAdminDb()) {
  id(input.connectionId);
  const r = refs(db, input.participantId, input.sessionId); const now = input.nowMs ?? Date.now();
  return db.runTransaction(async tx => {
    const [ss, ps, bs] = await Promise.all([tx.get(r.session!), tx.get(r.participant), tx.get(r.budget)]);
    const s = ss.data(); const p = ps.data(); const b = { ...defaults(), ...bs.data() }; checkBudget(b);
    if (!s || !p || s.ipKey !== input.ipKey || p.sessionId !== input.sessionId) fail('invalid_session', 403);
    if (s.connectionId) {
      if (s.connectionId !== input.connectionId) fail('session_claimed');
      return { duplicate: true };
    }
    if (b.paused || p.quarantined || p.activeTurn) fail('pilot_unavailable', 503);
    if (s.endedAtMs || now >= s.expiresAtMs || now - s.lastTurnAtMs >= VOICE_SESSION_IDLE_MS) fail('session_finished', 429);
    tx.set(r.session!, { ...s, connectionId: input.connectionId, claimedAtMs: now });
    return { duplicate: false };
  });
}
/** Closing a socket never releases a pending provider hold. */
export async function endVoiceSession(input: VoiceSessionInput, db: Firestore = getAdminDb()) {
  const r = refs(db, input.participantId, input.sessionId); const now = input.nowMs ?? Date.now();
  return db.runTransaction(async tx => {
    const [ss, ps] = await Promise.all([tx.get(r.session!), tx.get(r.participant)]);
    const s = ss.data(); const p = ps.data();
    if (!s || !p || s.ipKey !== input.ipKey) fail('invalid_session', 403);
    if (s.endedAtMs) return { duplicate: true, pending: !!p.activeTurn };
    tx.set(r.session!, { ...s, endedAtMs: now });
    if (p.sessionId === input.sessionId) tx.set(r.participant, { ...p, sessionExpiresAtMs: now });
    return { duplicate: false, pending: !!p.activeTurn };
  });
}

export interface RecordVoiceResponseInput {
  participantId: string; sessionId: string; turnId: 'realtime'; responseId: string;
  actualMicrousd: number; usage: Record<string, number>; model: string;
  status: 'completed' | 'cancelled' | 'canceled' | 'incomplete' | 'failed'; nowMs?: number;
}
/** Durable provider events never release a hold. Only known, fully reconciled
 * session shutdown can settle it; crashes leave the entire reservation intact. */
export async function recordVoiceResponse(input: RecordVoiceResponseInput, db: Firestore = getAdminDb()) {
  const r = refs(db, input.participantId, input.sessionId, input.turnId);
  const response = db.doc(`${r.turn!.path}/responses/${id(input.responseId)}`);
  return db.runTransaction(async tx => {
    const [bs, ps, ts, rs] = await Promise.all([tx.get(r.budget), tx.get(r.participant), tx.get(r.turn!), tx.get(response)]);
    const b = { ...defaults(), ...bs.data() }; checkBudget(b); const p = ps.data(); const t = ts.data(); const previous = rs.data();
    if (!t || !p || input.turnId !== 'realtime') fail('unknown_reservation');
    const valid = integer(input.actualMicrousd) && validUsage(input.usage) && typeof input.model === 'string' && /^[a-zA-Z0-9._-]{1,100}$/.test(input.model) && ['completed', 'cancelled', 'canceled', 'incomplete', 'failed'].includes(input.status) && (!t.model || t.model === input.model);
    if (previous && valid && previous.actualMicrousd === input.actualMicrousd && previous.status === input.status && previous.model === input.model && sameUsage(previous.usage || {}, input.usage)) {
      return { duplicate: true, status: t.status as string, reportedMicrousd: t.reportedMicrousd as number, responseCount: t.responseCount as number };
    }
    const reportedMicrousd = (t.reportedMicrousd || 0) + (valid && !previous ? input.actualMicrousd : 0);
    const responseCount = (t.responseCount || 0) + (valid && !previous ? 1 : 0);
    const reportedUsage: Record<string, number> = { ...(t.reportedUsage || {}) };
    if (valid && !previous) for (const [key, value] of Object.entries(input.usage)) reportedUsage[key] = (reportedUsage[key] || 0) + value;
    const bad = !valid || !!previous || t.status !== 'reserved' || !integer(reportedMicrousd) || Object.values(reportedUsage).some(n => !integer(n)) || reportedMicrousd > t.reserveMicrousd || responseCount > VOICE_SESSION_MAX_TURNS;
    const status = bad ? 'response_reconciliation_required' : 'reserved';
    if (valid && !previous) tx.set(response, { actualMicrousd: input.actualMicrousd, usage: input.usage, model: input.model, status: input.status, recordedAtMs: input.nowMs ?? Date.now() });
    tx.set(r.turn!, { ...t, status, reportedMicrousd, responseCount, reportedUsage });
    tx.set(r.budget, { ...b, paused: b.paused || bad, providerResponses: b.providerResponses + (valid && !previous ? 1 : 0) });
    if (bad) tx.set(r.participant, { ...p, quarantined: true });
    return { duplicate: false, status, reportedMicrousd, responseCount };
  });
}

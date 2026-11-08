require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const L = require('../lib/server/voiceTutorLedger.ts');
// Atomic serializable fake: enforces Firestore's read-before-write rule and
// commits only successful callbacks. Parallel callers share the same lock.
function database() {
  const docs = new Map(); let queue = Promise.resolve();
  const snap = path => ({ exists: docs.has(path), data: () => structuredClone(docs.get(path)) });
  return { docs, doc(path) { return { path, get: async () => snap(path) }; }, runTransaction(fn) {
    const result = queue.then(async () => {
      const writes = []; let writing = false;
      const value = await fn({ get: async ref => { assert.equal(writing, false, 'read after write'); return snap(ref.path); }, set(ref, data) { writing = true; writes.push([ref.path, structuredClone(data)]); } });
      writes.forEach(([key, value]) => docs.set(key, value)); return value;
    }); queue = result.catch(() => {}); return result;
  } };
}
const session = (participantId = 'alice', sessionId = 'one', nowMs = 1000, ipKey = 'ip') => ({ participantId, sessionId, nowMs, ipKey, questionKey: '{"examId":"dmv","questionId":"q1"}' });
const turn = (s = session(), turnId = 'turn1', reserveMicrousd = 400000) => ({ ...s, turnId, reserveMicrousd });
const settlement = (t = turn(), overrides = {}) => ({ ...t, actualMicrousd: 1000, usage: { inputTokens: 20, outputTokens: 30 }, providerRequestId: 'request1', model: 'test-model', durationMs: 500, status: 'completed', ...overrides });
const budget = db => db.docs.get('voiceTutorPilot/budget');
const error = code => e => e instanceof L.VoiceTutorLedgerError && e.code === code;

test('session, reserve, settlement are idempotent; metrics and budget reconcile', async () => {
  const db = database(); const s = session();
  assert.equal((await L.createVoiceSession(s, db)).duplicate, false);
  assert.equal((await L.createVoiceSession(s, db)).duplicate, true);
  assert.equal((await L.reserveVoiceTurn(turn(), db)).duplicate, false);
  assert.equal((await L.reserveVoiceTurn(turn(), db)).duplicate, true);
  assert.equal(budget(db).reservedMicrousd, 400000);
  await L.settleVoiceTurn(settlement(), db); const before = structuredClone([...db.docs]);
  assert.equal((await L.settleVoiceTurn(settlement(), db)).duplicate, true);
  assert.deepEqual([...db.docs], before);
  const status = await L.readVoiceTutorStatus({ participantId: 'alice', nowMs: 1000 }, db);
  assert.equal(status.budget.spentMicrousd, 1000); assert.equal(status.budget.reservedMicrousd, 0);
  assert.deepEqual(status.metrics, { distinctParticipants: 1, sessions: 1, turns: 1, completedTurns: 1, failedTurns: 0, providerResponses: 0, costMicrousd: 1000, durationMs: 500 });
  assert.equal((await L.readVoiceSession(s, db)).questionKey, s.questionKey);
});
test('parallel tabs cannot reserve two active turns for one participant', async () => {
  const db = database(); await L.createVoiceSession(session(), db);
  const results = await Promise.allSettled([L.reserveVoiceTurn(turn(), db), L.reserveVoiceTurn(turn(session(), 'turn2'), db)]);
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
  assert.equal(budget(db).reservedMicrousd, 400000);
});
test('parallel participants never exceed the shared lifetime $100 cap', async () => {
  const db = database(); await L.createVoiceSession(session(), db); await L.createVoiceSession(session('bob'), db);
  budget(db).spentMicrousd = 99_500_000;
  const results = await Promise.allSettled([L.reserveVoiceTurn(turn(), db), L.reserveVoiceTurn(turn(session('bob')), db)]);
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
  assert.equal(budget(db).spentMicrousd + budget(db).reservedMicrousd, 99_900_000);
});
for (const status of ['failed', 'unknown']) test(`${status} outcomes retain holds permanently and quarantine participant`, async () => {
  const db = database(); await L.createVoiceSession(session(), db); await L.reserveVoiceTurn(turn(), db);
  await L.settleVoiceTurn(settlement(turn(), { status }), db);
  assert.equal(budget(db).reservedMicrousd, 400000); assert.equal(budget(db).spentMicrousd, 0);
  await assert.rejects(L.createVoiceSession(session('alice', 'two', 864001000), db), error('participant_busy'));
  await L.settleVoiceTurn(settlement(), db); assert.equal(budget(db).reservedMicrousd, 400000);
});
for (const bad of [{ actualMicrousd: 400001 }, { actualMicrousd: -1 }, { actualMicrousd: NaN }, { usage: { transcript: 'secret speech' } }, { usage: {} }]) test(`invalid or overrun settlement fails closed: ${JSON.stringify(bad)}`, async () => {
  const db = database(); await L.createVoiceSession(session(), db); await L.reserveVoiceTurn(turn(), db);
  await L.settleVoiceTurn(settlement(turn(), bad), db);
  assert.equal(budget(db).reservedMicrousd, 400000); assert.equal(budget(db).spentMicrousd, 0); assert.equal(budget(db).paused, true);
  assert.equal(JSON.stringify([...db.docs]).includes('secret speech'), false);
});
test('immutable questions, IP ownership, and idempotency mismatch are rejected', async () => {
  const db = database(); await L.createVoiceSession(session(), db);
  await assert.rejects(L.reserveVoiceTurn({ ...turn(), questionKey: 'other' }, db), error('session_mismatch'));
  await assert.rejects(L.reserveVoiceTurn({ ...turn(), ipKey: 'other' }, db), error('invalid_session'));
  await L.reserveVoiceTurn(turn(), db);
  await assert.rejects(L.reserveVoiceTurn({ ...turn(), reserveMicrousd: 500000 }, db), error('idempotency_conflict'));
  await assert.rejects(L.settleVoiceTurn(settlement(turn(), { ipKey: 'other' }), db), error('unknown_reservation'));
});
test('30-second inactivity, 120-second lifetime and turn caps apply server-side', async () => {
  const db = database(); await L.createVoiceSession(session(), db);
  await assert.rejects(L.reserveVoiceTurn({ ...turn(), nowMs: 31000 }, db), error('session_idle'));
  for (let i = 0; i < 10; i++) {
    const t = turn(session('alice', 'one', 1000 + i * 1000), `t${i}`);
    await L.reserveVoiceTurn(t, db); await L.settleVoiceTurn(settlement(t), db);
  }
  await assert.rejects(L.reserveVoiceTurn(turn(session('alice', 'one', 12000), 't11'), db), error('session_finished'));
  const db2 = database(); await L.createVoiceSession(session(), db2);
  db2.docs.get('voiceTutorParticipants/alice/sessions/one').lastTurnAtMs = 120000;
  await assert.rejects(L.reserveVoiceTurn(turn(session('alice', 'one', 121000)), db2), error('session_finished'));
});
test('daily device and shared IP caps reset by UTC day, not lifetime budget', async () => {
  const db = database();
  for (let i = 0; i < 3; i++) await L.createVoiceSession(session('alice', `s${i}`, 1000 + i * 121000), db);
  await assert.rejects(L.createVoiceSession(session('alice', 's4', 500000), db), error('daily_limit'));
  await L.createVoiceSession(session('alice', 'tomorrow', 864001000), db);
  assert.equal(budget(db).distinctParticipants, 1);
  for (let i = 0; i < 7; i++) await L.createVoiceSession(session(`other${i}`), db);
  await assert.rejects(L.createVoiceSession(session('last'), db), error('daily_limit'));
});
test('unsettled reservations never automatically expire or refund after elapsed time', async () => {
  const db = database(); await L.createVoiceSession(session(), db); await L.reserveVoiceTurn(turn(), db);
  await assert.rejects(L.createVoiceSession(session('alice', 'later', 864001000), db), error('participant_busy'));
  assert.equal(budget(db).reservedMicrousd, 400000);
});
test('invalid integer reservations and path injection cannot mutate accounting', async () => {
  const db = database(); await L.createVoiceSession(session(), db);
  for (const n of [0, -1, 0.5, NaN, Infinity]) await assert.rejects(L.reserveVoiceTurn(turn(session(), 'bad', n), db), error('invalid_reservation'));
  await assert.rejects(L.createVoiceSession(session('../alice'), db), error('invalid_id'));
  assert.equal(budget(db).reservedMicrousd, 0);
});
test('relay claim is single-use and duplicate claims do not reopen a socket', async () => {
  const db = database(); await L.createVoiceSession(session(), db);
  assert.equal((await L.claimVoiceSession({ ...session(), connectionId: 'c1' }, db)).duplicate, false);
  assert.equal((await L.claimVoiceSession({ ...session(), connectionId: 'c1' }, db)).duplicate, true);
  await assert.rejects(L.claimVoiceSession({ ...session(), connectionId: 'c2' }, db), error('session_claimed'));
});
test('ending a session retains its hold and allows restart only after settlement', async () => {
  const db = database(); await L.createVoiceSession(session(), db); await L.reserveVoiceTurn(turn(), db);
  assert.equal((await L.endVoiceSession(session(), db)).pending, true);
  assert.equal(budget(db).reservedMicrousd, 400000);
  await assert.rejects(L.createVoiceSession(session('alice', 'next', 2000), db), error('participant_busy'));
  await L.settleVoiceTurn(settlement(turn(), { usage: { inputAudioTokens: 5, outputAudioTokens: 10, inputTextTokens: 20, outputTextTokens: 30, cachedTextTokens: 0, cachedAudioTokens: 0, totalTokens: 65 } }), db);
  await assert.rejects(L.reserveVoiceTurn(turn(session(), 'newturn'), db), error('session_finished'));
  assert.equal((await L.createVoiceSession(session('alice', 'next', 2000), db)).duplicate, false);
});
const realtime = () => ({ ...turn(session(), 'realtime', 10_895_360), model: 'gpt-realtime-2.1', rateVersion: '2026-11-08' });
const responseEvent = (responseId = 'resp1', actualMicrousd = 1000) => ({ participantId: 'alice', sessionId: 'one', turnId: 'realtime', responseId, actualMicrousd, usage: { inputAudioTokens: 20, outputAudioTokens: 30 }, model: 'gpt-realtime-2.1', status: 'completed' });
async function realtimeDb() { const db = database(); await L.createVoiceSession(session(), db); await L.reserveVoiceTurn(realtime(), db); return db; }
test('session reservation retains full hold while responses persist exactly once', async () => {
  const db = await realtimeDb();
  const results = await Promise.all([L.recordVoiceResponse(responseEvent(), db), L.recordVoiceResponse(responseEvent(), db)]);
  assert.equal(results.filter(r => r.duplicate).length, 1);
  await L.recordVoiceResponse({ ...responseEvent('resp2', 2000), status: 'cancelled' }, db);
  assert.equal(budget(db).spentMicrousd, 0); assert.equal(budget(db).reservedMicrousd, 10_895_360);
  assert.equal(budget(db).providerResponses, 2);
  const result = await L.settleVoiceTurn(settlement(realtime(), { actualMicrousd: 3000, responseCount: 2, usage: { inputAudioTokens: 40, outputAudioTokens: 60 }, model: 'gpt-realtime-2.1' }), db);
  assert.equal(result.status, 'completed'); assert.equal(budget(db).spentMicrousd, 3000); assert.equal(budget(db).reservedMicrousd, 0);
});
test('unknown crash preserves both full session hold and known response usage', async () => {
  const db = await realtimeDb(); await L.recordVoiceResponse(responseEvent(), db);
  await L.settleVoiceTurn(settlement(realtime(), { status: 'unknown', actualMicrousd: 1000, responseCount: 1, usage: responseEvent().usage, model: 'gpt-realtime-2.1' }), db);
  assert.equal(budget(db).reservedMicrousd, 10_895_360);
  assert.equal(db.docs.get('voiceTutorParticipants/alice/sessions/one/turns/realtime/responses/resp1').actualMicrousd, 1000);
});
for (const overrides of [{ actualMicrousd: 0 }, { responseCount: 0 }, { usage: { inputAudioTokens: 1 } }, { model: 'wrong-model' }]) test(`aggregate settlement must match durable response ledger: ${JSON.stringify(overrides)}`, async () => {
  const db = await realtimeDb(); await L.recordVoiceResponse(responseEvent(), db);
  const result = await L.settleVoiceTurn(settlement(realtime(), { actualMicrousd: 1000, responseCount: 1, usage: responseEvent().usage, model: 'gpt-realtime-2.1', ...overrides }), db);
  assert.equal(result.status, 'aggregate_mismatch'); assert.equal(budget(db).paused, true); assert.equal(budget(db).reservedMicrousd, 10_895_360);
});
test('response overrun pauses pilot without releasing aggregate hold', async () => {
  const db = await realtimeDb(); await L.recordVoiceResponse(responseEvent('huge', 10_895_361), db);
  assert.equal(budget(db).paused, true); assert.equal(budget(db).reservedMicrousd, 10_895_360);
});
test('conflicting response ID cannot double charge or overwrite original event', async () => {
  const db = await realtimeDb(); await L.recordVoiceResponse(responseEvent(), db); await L.recordVoiceResponse(responseEvent('resp1', 2000), db);
  assert.equal(budget(db).paused, true); assert.equal(budget(db).providerResponses, 1);
  assert.equal(db.docs.get('voiceTutorParticipants/alice/sessions/one/turns/realtime/responses/resp1').actualMicrousd, 1000);
});
test('malformed response never stores transcript and cannot release hold', async () => {
  const db = await realtimeDb(); await L.recordVoiceResponse({ ...responseEvent(), usage: { transcript: 'private transcript' } }, db);
  assert.equal(budget(db).paused, true); assert.equal(JSON.stringify([...db.docs]).includes('private transcript'), false);
});
test('eleventh response is recorded but pauses and quarantines for reconciliation', async () => {
  const db = await realtimeDb();
  for (let i = 0; i < 11; i++) await L.recordVoiceResponse(responseEvent(`resp${i}`), db);
  assert.equal(budget(db).providerResponses, 11); assert.equal(budget(db).paused, true); assert.equal(budget(db).reservedMicrousd, 10_895_360);
});
test('zero-response session can settle only explicit zero usage and count', async () => {
  const db = await realtimeDb();
  const result = await L.settleVoiceTurn(settlement(realtime(), { actualMicrousd: 0, responseCount: 0, usage: { totalTokens: 0 }, model: 'gpt-realtime-2.1' }), db);
  assert.equal(result.status, 'completed'); assert.equal(budget(db).reservedMicrousd, 0);
});

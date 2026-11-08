require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const { serveVoiceRelay } = require('../lib/server/voiceTutorRelay.ts');
const { realtimeSession } = require('../lib/server/voiceTutorRealtime.ts');
class Socket extends EventEmitter {
  readyState = 1; bufferedAmount = 0; sent = [];
  send(data) { this.sent.push(JSON.parse(data)); }
  close() { if (this.readyState === 3) return; this.readyState = 3; this.emit('close'); }
  event(data) { this.emit('message', Buffer.from(JSON.stringify(data)), false); }
}
const tick = () => new Promise(resolve => setImmediate(resolve));
const deferred = () => { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; };
function fixture(extra = {}) {
  const client = new Socket(); const provider = new Socket();
  const settled = []; const ended = []; const recorded = []; let opened = 0;
  const deps = {
    readVoiceSession: async () => ({ questionKey: '{}', expiresAtMs: Date.now() + 120000 }),
    claimVoiceSession: async () => ({ duplicate: false }),
    loadVoiceQuestion: () => ({ question: 'Test' }),
    reserveVoiceTurn: async () => ({ duplicate: false }),
    settleVoiceTurn: async data => { settled.push(data); },
    endVoiceSession: async data => { ended.push(data); },
    recordVoiceResponse: async data => { recorded.push(data); return { status: 'reserved' }; },
    createProvider: () => { opened++; return provider; }, ...extra,
  };
  const started = serveVoiceRelay(client, { participantId: 'p', sessionId: 's', ipKey: 'ip' }, deps);
  return { client, provider, settled, ended, recorded, started, get opened() { return opened; } };
}
async function beginResponse(f) {
  await f.started;
  f.provider.event({ type: 'session.updated', session: realtimeSession('test') });
  f.provider.event({ type: 'input_audio_buffer.committed', item_id: 'user1' });
  await tick();
  f.provider.event({ type: 'response.created', response: { id: 'resp1' } });
  await tick();
}
function done(f) {
  f.provider.event({ type: 'response.done', response: { id: 'resp1', status: 'completed', usage: {
    input_tokens: 3, output_tokens: 2, total_tokens: 5,
    input_token_details: { text_tokens: 3, audio_tokens: 0, cached_tokens: 0 },
    output_token_details: { text_tokens: 0, audio_tokens: 2 },
  } } });
}
test('first recorded response continues and settles its exact totals on disconnect', async () => {
  const f = fixture(); await beginResponse(f); done(f); await tick();
  assert.equal(f.client.readyState, 1);
  assert.equal(f.recorded.length, 1);
  assert.ok(f.client.sent.some(e => e.type === 'response.done'));
  f.client.close(); await tick();
  assert.equal(f.settled.length, 1);
  assert.equal(f.settled[0].actualMicrousd, 140);
  assert.equal(f.settled[0].responseCount, 1);
  assert.equal(f.settled[0].status, 'completed');
});
test('disconnect during reservation settles unused hold after setup completes', async () => {
  const gate = deferred(); const f = fixture({ reserveVoiceTurn: () => gate.promise });
  await tick(); f.client.close(); await tick();
  assert.equal(f.settled.length, 0);
  gate.resolve({ duplicate: false }); await f.started; await tick();
  assert.equal(f.opened, 0);
  assert.equal(f.settled.length, 1);
  assert.equal(f.settled[0].actualMicrousd, 0);
  assert.equal(f.settled[0].status, 'completed');
  assert.equal(f.ended.length, 1);
});
test('replayed ticket cannot end the owning connection session', async () => {
  const f = fixture({ claimVoiceSession: async () => { throw new Error('session_claimed'); } });
  await f.started; await tick();
  assert.equal(f.opened, 0);
  assert.equal(f.ended.length, 0);
  assert.equal(f.settled.length, 0);
  assert.equal(f.client.readyState, 3);
});
test('provider close during persistence waits and settles complete received usage', async () => {
  const gate = deferred(); const f = fixture({ recordVoiceResponse: () => gate.promise });
  await beginResponse(f); done(f); await tick();
  f.provider.close(); await tick();
  assert.equal(f.settled.length, 0);
  gate.resolve({ status: 'reserved' }); await tick(); await tick();
  assert.equal(f.settled.length, 1);
  assert.equal(f.settled[0].actualMicrousd, 140);
  assert.equal(f.settled[0].responseCount, 1);
  assert.equal(f.settled[0].status, 'completed');
  assert.equal(f.ended.length, 1);
});

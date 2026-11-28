require('tsx/cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const { AiSession } = require('../lib/server/ai.ts');
const { AiUnavailable, budgetWindow, remainingUsd } = require('../lib/ai/budget.ts');
const { toResponses, fromResponses } = require('../lib/ai/protocol.ts');
const { AiLedger } = require('../lib/server/aiBudget.ts');

const ask = { model: 'test', system: 'Write a short answer.', max_tokens: 100, messages: [{ role: 'user', content: 'Hello' }] };
const reply = { id: 'msg', model: 'test', type: 'message', role: 'assistant', content: [{ type: 'text', text: 'Hello' }], stop_reason: 'end_turn', usage: { input_tokens: 100, output_tokens: 10 } };
function ledger(limits = { claude: 5, openai: 5 }) {
  const charged = { claude: 0, openai: 0 };
  return { charged,
    async available(p) { return limits[p] - charged[p]; },
    async reserve(p, n) {
      if (charged[p] + n > limits[p]) throw new AiUnavailable('empty');
      charged[p] += n;
      return async (actual) => { charged[p] -= n - actual; };
    } };
}
async function configured(fn) {
  const keys = ['ANTHROPIC_API_KEY', 'OPENAI_API_KEY', 'OPENAI_TEXT_MODEL', 'OPENAI_INPUT_USD_PER_MTOK', 'OPENAI_OUTPUT_USD_PER_MTOK'];
  const saved = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  Object.assign(process.env, { ANTHROPIC_API_KEY: 'test-claude', OPENAI_API_KEY: 'test-openai', OPENAI_TEXT_MODEL: 'test-openai-model', OPENAI_INPUT_USD_PER_MTOK: '2', OPENAI_OUTPUT_USD_PER_MTOK: '10' });
  try { await fn(); } finally { for (const k of keys) saved[k] === undefined ? delete process.env[k] : process.env[k] = saved[k]; }
}
const openaiReply = { id: 'resp', model: 'test-openai-model', status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: 'Hello' }] }], usage: { input_tokens: 100, output_tokens: 10 } };

test('OpenAI grant requires verified dates, caps at $200, and does not reset on the first', () => {
  const grant = { id: 'grant-1', startsAt: '2026-11-27T00:00:00Z', expiresAt: '2026-12-05T00:00:00Z', usd: 50 };
  const w = budgetWindow('openai', grant, new Date('2026-12-01'));
  assert.equal(w.path, 'openaiSpend/grant-1');
  assert.equal(remainingUsd(w, { totalUsd: 49 }, 'source-triage'), 1);
  assert.equal(budgetWindow('openai', grant, new Date('2026-12-05')), null);
  assert.equal(budgetWindow('openai', { ...grant, usd: 201 }, new Date('2026-12-01')), null);
  assert.equal(budgetWindow('openai', null), null);
});

test('budget exhaustion and billing errors fall back to regular Responses', () => configured(async () => {
  for (const mode of ['budget', 'billing', 'rate']) {
    const l = ledger({ claude: mode === 'budget' ? 0 : 5, openai: 5 });
    const calls = [];
    const ai = new AiSession(l, 'source-triage', 1, async (url, init) => {
      calls.push(url);
      if (url.includes('anthropic')) return new Response(JSON.stringify({ error: { message: 'credit balance is too low' } }), { status: mode === 'rate' ? 429 : 400 });
      const body = JSON.parse(init.body);
      assert.equal(body.store, false);
      assert.equal(body.model, 'test-openai-model');
      return Response.json(openaiReply);
    });
    assert.equal((await ai.create(ask)).content[0].text, 'Hello');
    assert.equal(ai.lastProvider, 'openai');
    assert.equal(l.charged.claude, 0);
    assert.ok(l.charged.openai > 0);
    assert.ok(calls.every(u => !u.includes('codex')));
  }
}));

test('Claude works alone and OpenAI-only works without Claude credentials', () => configured(async () => {
  delete process.env.OPENAI_API_KEY;
  const ai = new AiSession(ledger(), 'source-triage', 1, async () => Response.json(reply));
  assert.equal((await ai.create(ask)).model, 'test');
  process.env.OPENAI_API_KEY = 'test'; delete process.env.ANTHROPIC_API_KEY;
  const other = new AiSession(ledger(), 'source-triage', 1, async () => Response.json(openaiReply));
  assert.equal((await other.create(ask)).model, 'test-openai-model');
}));

test('both empty, unknown jobs and ledger failures make no API call', () => configured(async () => {
  let calls = 0;
  const ai = new AiSession(ledger({ claude: 0, openai: 0 }), 'daily-brief', 1, async () => { calls++; });
  await assert.rejects(ai.create(ask), AiUnavailable);
  const broken = new AiSession({ available: async () => 1, reserve: async () => { throw new Error('ledger offline'); } }, 'daily-brief', 1, async () => { calls++; });
  await assert.rejects(broken.create(ask), /ledger offline/);
  assert.equal(calls, 0);
  assert.equal(remainingUsd({ limit: 200, untracked: 0 }, {}, 'unknown'), 0);
}));

test('ambiguous network outcomes retain reservations and never permit concurrent run overspend', () => configured(async () => {
  const l = ledger(); let calls = 0;
  const ai = new AiSession(l, 'daily-brief', 0.13, async () => { calls++; throw new Error('timeout'); });
  const outcomes = await Promise.allSettled([ai.create(ask), ai.create(ask)]);
  assert.ok(outcomes.every(r => r.status === 'rejected'));
  assert.ok(l.charged.claude + l.charged.openai <= 0.13);
  assert.ok(calls <= 2);
  assert.ok(l.charged.claude > 0);
}));

test('invalid requests do not fall back; billable malformed responses remain charged', () => configured(async () => {
  let calls = 0; const l = ledger();
  const bad = new AiSession(l, 'daily-brief', 1, async () => { calls++; return new Response('invalid schema', { status: 400 }); });
  await assert.rejects(bad.create(ask), /rejected/);
  assert.equal(calls, 1);
  const missing = new AiSession(l, 'daily-brief', 1, async () => Response.json({ content: [] }));
  await assert.rejects(missing.create(ask), /Missing API usage/);
  assert.ok(l.charged.claude > 0);
}));

test('protocol preserves tool calls, results, schema and web citations', () => {
  const body = toResponses({ ...ask, messages: [{ role: 'assistant', content: [{ type: 'tool_use', id: 'call1', name: 'Read', input: { file: 'a' } }] }, { role: 'user', content: [{ type: 'tool_result', tool_use_id: 'call1', content: 'Evidence' }] }], tools: [{ name: 'Read', input_schema: { type: 'object' } }], output_config: { format: { type: 'json_schema', schema: { type: 'object' } } } }, 'test');
  assert.equal(body.input[0].call_id, body.input[1].call_id);
  assert.equal(body.input[1].output, 'Evidence');
  assert.equal(body.text.format.strict, true);
  assert.throws(() => toResponses({ ...ask, messages: [{ role: 'user', content: [{ type: 'image' }] }] }, 'test'), /Unsupported/);
  const r = fromResponses({ ...openaiReply, output: [{ type: 'web_search_call', action: { sources: [{ url: 'https://example.org' }] } }, { type: 'message', content: [{ type: 'output_text', text: 'Answer', annotations: [{ type: 'url_citation', url: 'https://example.org', title: 'Official' }] }] }] });
  assert.equal(r.usage.server_tool_use.web_search_requests, 1);
  assert.equal(r.content[1].citations[0].url, 'https://example.org');
  assert.throws(() => fromResponses({ ...openaiReply, status: 'incomplete' }), /did not complete/);
});

// Serial transaction mock: exercise the real reservation/settlement code, including idempotence.
function firestore() {
  const docs = new Map(); let queue = Promise.resolve();
  const ref = (path) => ({ path, collection: (c) => ({ doc: (id) => ref(`${path}/${c}/${id}`) }), get: async () => ({ data: () => docs.get(path) }) });
  return { docs, doc: ref, runTransaction(fn) { const next = queue.then(() => fn({ get: r => r.get(), set: (r, d, options) => docs.set(r.path, options?.merge ? { ...docs.get(r.path), ...d } : d) })); queue = next.catch(() => {}); return next; } };
}
test('atomic ledger prevents parallel overbooking, settles once, and retains expired grant spend', async () => {
  const db = firestore();
  db.docs.set('apiCreditGrants/openai', { id: 'test-grant', startsAt: new Date(Date.now() - 1000).toISOString(), expiresAt: new Date(Date.now() + 3600000).toISOString(), usd: 1 });
  const a = new AiLedger(db, 'source-triage'), b = new AiLedger(db, 'source-triage');
  const results = await Promise.allSettled([a.reserve('openai', 0.75, 1000), b.reserve('openai', 0.75, 1000)]);
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
  const settle = results.find(r => r.status === 'fulfilled').value;
  await settle(0.25); await settle(0.25);
  assert.equal(db.docs.get('openaiSpend/test-grant').totalUsd, 0.25);
  assert.equal(await a.available('openai'), 0.75);
  db.docs.get('apiCreditGrants/openai').expiresAt = new Date(Date.now() - 1).toISOString();
  await assert.rejects(a.reserve('openai', 0.1, 1000), AiUnavailable);
  assert.equal(db.docs.get('openaiSpend/test-grant').totalUsd, 0.25);
});

test('existing Anthropic SDK consumes gateway streams, including a tool round trip', async () => {
  const Anthropic = require('@anthropic-ai/sdk').default;
  const { createAiGateway } = require('../lib/server/aiGateway.ts');
  let turns = 0;
  const server = createAiGateway({ create: async (a) => {
    turns++;
    if (turns === 1) return { ...reply, content: [{ type: 'tool_use', id: 'call-read', name: 'Read', input: { file: 'sources.md' } }], stop_reason: 'tool_use' };
    assert.equal(a.messages[1].content[0].tool_use_id, 'call-read');
    return reply;
  } }, 'local-test-token');
  const handler = server.listeners('request')[0];
  const transport = async (url, init) => {
    const request = new Request(url, init);
    const payload = Buffer.from(await request.text());
    const req = { url: new URL(url).pathname, headers: Object.fromEntries(request.headers), async *[Symbol.asyncIterator]() { yield payload; } };
    let status = 200, headers = {}, text = '';
    const res = { writeHead(code, h = {}) { status = code; Object.assign(headers, h); return this; }, setHeader(k, v) { headers[k] = v; }, end(body = '') { text = body; } };
    await handler(req, res);
    return new Response(text, { status, headers });
  };
  const baseURL = 'http://test.gateway';
  const unauthorized = await transport(`${baseURL}/v1/messages`, { method: 'POST', body: '{}' });
  assert.equal(unauthorized.status, 401);
  const client = new Anthropic({ apiKey: 'local-test-token', baseURL, maxRetries: 0, fetch: transport });
    const streamed = await client.messages.create({ ...ask, stream: true });
    const seen = [];
    for await (const e of streamed) seen.push(e);
    const call = seen.find(e => e.type === 'content_block_delta' && e.delta.type === 'input_json_delta');
    assert.equal(JSON.parse(call.delta.partial_json).file, 'sources.md');
    assert.equal(seen.find(e => e.type === 'message_delta').delta.stop_reason, 'tool_use');
    const final = await client.messages.create({ ...ask, messages: [{ role: 'assistant', content: [{ type: 'tool_use', id: 'call-read', name: 'Read', input: {} }] }, { role: 'user', content: [{ type: 'tool_result', tool_use_id: 'call-read', content: 'Official source' }] }] });
    assert.equal(final.content[0].text, 'Hello');
});

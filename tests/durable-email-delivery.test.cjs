require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const Module = require('node:module');
let db, provider;
const original = Module._load;
let sendDurableEmail;
try {
  Module._load = function (request, parent, main) {
    if (request === '@/lib/firebase-admin') return { getAdminDb: () => db };
    if (request === '@/lib/resend') return { sendEmail: payload => provider(payload) };
    if (request === 'firebase-admin/firestore') return { FieldValue: {
      arrayUnion: value => ({ union: value }), delete: () => ({ delete: true }), serverTimestamp: () => new Date().toISOString(),
    } };
    if (request === '@/lib/email-quota') return { QuotaExhaustedError: class extends Error {} };
    return original.call(this, request, parent, main);
  };
  ({ sendDurableEmail } = require('../lib/server/durableEmail.ts'));
} finally { Module._load = original; }
function database(data = {}) {
  const rows = new Map([['users/u', { ...data }]]);
  let chain = Promise.resolve();
  const apply = (key, value) => {
    const row = { ...rows.get(key) };
    for (const [k, v] of Object.entries(value)) {
      if (v?.delete) delete row[k];
      else if (v?.union) row[k] = [...new Set([...(row[k] || []), v.union])];
      else row[k] = v;
    }
    rows.set(key, row);
  };
  const ref = key => ({ key, get: async () => ({ data: () => rows.get(key) }), set: async value => apply(key, value) });
  return { rows, failSentCommit: false, collection: name => ({ doc: id => ref(`${name}/${id}`) }),
    runTransaction(fn) {
      const task = chain.then(async () => {
        const changes = [];
        const result = await fn({ get: ref => ref.get(), set: (ref, value) => changes.push([ref.key, value]) });
        if (this.failSentCommit && changes.some(([,value]) => value.status === 'sent')) { this.failSentCommit = false; throw new Error('marker unavailable'); }
        for (const [key,value] of changes) apply(key,value);
        return result;
      });
      chain = task.catch(() => {});
      return task;
    },
  };
}
const options = (extra = {}) => ({ uid: 'u', dedupeKey: 'welcome', emailKey: 'welcome', payload: { to: 'u@example.com', subject: 'Hello', html: 'One', kind: 'campaign' }, ...extra });
test('missing consent and opted-out welcome never call provider', async () => {
  provider = async () => { throw new Error('must not send'); };
  for (const data of [{}, { emailConsent: false }, { emailConsent: true, unsubscribed: true }]) {
    db = database(data);
    assert.equal(await sendDurableEmail(options()), 'ineligible');
  }
});
test('concurrent browser/backstop share one durable claim', async () => {
  db = database({ emailConsent: true });
  let sends = 0;
  provider = async () => { sends++; return { ok: true, id: 'one' }; };
  const results = await Promise.all([sendDurableEmail(options()), sendDurableEmail(options())]);
  assert.equal(sends, 1);
  assert.ok(results.includes('sent'));
  assert.ok(results.includes('in_flight'));
});
test('accepted provider + marker failure retries immutable payload/key, not new mail', async () => {
  db = database({ emailConsent: true }); db.failSentCommit = true;
  const seen = [];
  provider = async payload => { seen.push(payload); return { ok: true, id: 'one' }; };
  await assert.rejects(sendDurableEmail(options()), /marker unavailable/);
  for (const [key, value] of db.rows) if (key.startsWith('emailDeliveries/')) value.leaseUntil = 0;
  await sendDurableEmail(options());
  assert.equal(seen.length, 2);
  assert.deepEqual(seen[0], seen[1]);
  assert.ok(seen[0].idempotencyKey);
  assert.equal(await sendDurableEmail(options()), 'already_sent');
});
test('explicit quota rejection releases account, unknown outcome blocks other marketing', async () => {
  db = database({ emailConsent: true });
  provider = async () => ({ ok: false, quotaExhausted: true, uncertain: false, error: 'quota' });
  await assert.rejects(sendDurableEmail(options()));
  assert.equal(db.rows.get('users/u').marketingEmailLease, undefined);
  provider = async () => ({ ok: false, uncertain: true, error: 'timeout' });
  await assert.rejects(sendDurableEmail(options()));
  assert.equal(await sendDurableEmail(options({ dedupeKey: 'other', emailKey: 'other' })), 'in_flight');
});
test('uncertain old attempts quarantine instead of resending beyond provider retention', async () => {
  db = database({ emailConsent: true });
  provider = async () => ({ ok: false, uncertain: true, error: 'timeout' });
  await assert.rejects(sendDurableEmail(options()));
  for (const [key, value] of db.rows) if (key.startsWith('emailDeliveries/')) value.firstAttemptAt = Date.now() - 24 * 3600_000;
  provider = async () => { throw new Error('must not resend'); };
  assert.equal(await sendDurableEmail(options()), 'quarantined');
});
test('transactional purchase bypasses consent and marketing cooldown, replay dedupes', async () => {
  db = database({ emailConsent: false, unsubscribed: true, lastEmailSent: new Date().toISOString() });
  let sends = 0;
  provider = async () => { sends++; return { ok: true, id: 'receipt' }; };
  const opts = options({ dedupeKey: 'purchase/cs_1', emailKey: 'purchaseWelcome:cs_1', payload: { ...options().payload, kind: 'transactional' } });
  assert.equal(await sendDurableEmail(opts), 'sent');
  assert.equal(await sendDurableEmail(opts), 'already_sent');
  assert.equal(sends, 1);
  assert.equal(db.rows.get('users/u').unsubscribed, true);
});
test('known rejected retry still respects a newer account-wide marketing send', async () => {
  db = database({ emailConsent: true });
  provider = async () => ({ ok: false, uncertain: false, error: 'rejected' });
  await assert.rejects(sendDurableEmail(options()));
  db.rows.get('users/u').lastEmailSent = new Date().toISOString();
  provider = async () => { throw new Error('must not bypass cooldown'); };
  assert.equal(await sendDurableEmail(options()), 'ineligible');
});
test('fresh opt-out cancels before provider call', async () => {
  db = database({ emailConsent: true });
  const transaction = db.runTransaction.bind(db);
  db.runTransaction = async fn => {
    const result = await transaction(fn);
    db.rows.get('users/u').unsubscribed = true;
    return result;
  };
  provider = async () => { throw new Error('must not send after opt-out'); };
  assert.equal(await sendDurableEmail(options()), 'ineligible');
});

test('known quota rejection A followed by eligible event B sends B with a new provider key', async () => {
  db = database({ emailConsent: true });
  const seen = [];
  provider = async payload => { seen.push(payload); return { ok: false, uncertain: false, quotaExhausted: true, error: 'quota' }; };
  await assert.rejects(sendDurableEmail(options({ record: { questionId: 'A' } })));
  provider = async payload => { seen.push(payload); return { ok: true, id: 'B' }; };
  assert.equal(await sendDurableEmail(options({ payload: { ...options().payload, html: 'Question B' }, record: { questionId: 'B' }, eligible: () => true })), 'sent');
  assert.equal(seen[1].html, 'Question B');
  assert.notEqual(seen[0].idempotencyKey, seen[1].idempotencyKey);
  assert.equal(db.rows.get('users/u').questionId, 'B');
});
test('uncertain A cannot use B eligibility to resend A or send B', async () => {
  db = database({ emailConsent: true });
  let sends = 0;
  provider = async () => { sends++; return { ok: false, uncertain: true, error: 'timeout' }; };
  await assert.rejects(sendDurableEmail(options({ record: { questionId: 'A' } })));
  let eligibilityCalls = 0;
  const outcome = await sendDurableEmail(options({ payload: { ...options().payload, html: 'Question B' }, record: { questionId: 'B' }, eligible: () => { eligibilityCalls++; return true; } }));
  assert.equal(outcome, 'quarantined');
  assert.equal(sends, 1);
  assert.equal(eligibilityCalls, 0);
  assert.equal(db.rows.get('users/u').marketingEmailLease.uncertain, true);
});

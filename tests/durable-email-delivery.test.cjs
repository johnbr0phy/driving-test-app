require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const Module = require('node:module');
let db, provider, account = { email: 'u@example.com', disabled: false }, onAuthRead = () => {};
const { makeWelcomeRetryPolicy, makeSnapshotRetryPolicy } = require('../lib/server/emailRetryPolicy.ts');
const original = Module._load;
let sendDurableEmail, recoverDelivery, recoveryDisposition;
try {
  Module._load = function (request, parent, main) {
    if (request === '@/lib/firebase-admin') return { getAdminDb: () => db, getAdminAuth: () => ({ getUser: async () => { onAuthRead(); return account; } }) };
    if (request === '@/lib/resend') return { DEFAULT_FROM: 'Tigertest <noreply@tigertest.io>', sendEmail: (payload, options) => provider(payload, options) };
    if (request === 'firebase-admin/firestore') return { FieldValue: {
      arrayUnion: value => ({ union: value }), delete: () => ({ delete: true }), serverTimestamp: () => new Date().toISOString(),
    } };
    if (request === '@/lib/email-quota') return { QuotaExhaustedError: class extends Error {} };
    return original.call(this, request, parent, main);
  };
  ({ sendDurableEmail } = require('../lib/server/durableEmail.ts'));
  ({ recoverDelivery, recoveryDisposition } = require('../lib/server/emailRecovery.ts'));
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
const options = (extra = {}) => ({ uid: 'u', dedupeKey: 'welcome', emailKey: 'welcome', retryPolicy: makeWelcomeRetryPolicy({}, false, Date.now() + 86400000), payload: { to: 'u@example.com', subject: 'Hello', html: 'One', kind: 'campaign' }, ...extra });
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
  assert.equal(seen.length, 1); // persisted acceptance finalizes without replay
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


test('revoked consent after an uncertain send preserves the reconciliation lock', async () => {
  db = database({ emailConsent: true });
  let sends = 0;
  provider = async () => { sends++; return { ok: false, uncertain: true, error: 'timeout' }; };
  await assert.rejects(sendDurableEmail(options()));
  db.rows.get('users/u').unsubscribed = true;
  assert.equal(await sendDurableEmail(options()), 'ineligible');
  assert.equal(sends, 1);
  assert.equal(db.rows.get('users/u').marketingEmailLease.uncertain, true);
  assert.equal(db.rows.get('users/u').emailsSent, undefined);
});

test('known suppression does not record sent or retain the account campaign lock', async () => {
  db = database({ emailConsent: true });
  provider = async () => ({ ok: false, uncertain: false, error: 'Recipient is suppressed' });
  await assert.rejects(sendDurableEmail(options()), /suppressed/);
  assert.equal(db.rows.get('users/u').emailsSent, undefined);
  assert.equal(db.rows.get('users/u').marketingEmailLease, undefined);
  const delivery = [...db.rows].find(([key]) => key.startsWith('emailDeliveries/'))[1];
  assert.equal(delivery.status, 'failed_known');
});


function pending() { return [...db.rows].find(([key]) => key.startsWith('emailDeliveries/')); }
function due() { const [key, state] = pending(); state.leaseUntil = 0; state.nextAttemptAt = 0; return key.split('/')[1]; }
test('recovery replays stored transport and key without campaign audience enrollment', async () => {
  db = database({ emailConsent: true }); account = { email: 'u@example.com' };
  const seen = [];
  provider = async (payload, options) => { seen.push({ payload, options }); return { ok: false, uncertain: true, error: 'timeout' }; };
  await assert.rejects(sendDurableEmail(options()));
  const id = due();
  provider = async (payload, options) => { seen.push({ payload, options }); return { ok: true, id: 'accepted' }; };
  assert.equal(await recoverDelivery(id, true), 'sent');
  assert.deepEqual(seen[0].payload, seen[1].payload);
  assert.equal(seen[1].payload.from, 'Tigertest <noreply@tigertest.io>');
  assert.equal(seen[1].options.previousUncertain, true);
  assert.equal(await recoverDelivery('f'.repeat(64), true), 'missing');
});
test('ordinary rerun cannot replace stored snapshot or extend original deadline', async () => {
  db = database({ emailConsent: true, event: 'A' });
  provider = async () => ({ ok: false, uncertain: true, error: 'timeout' });
  const policy = makeSnapshotRetryPolicy(db.rows.get('users/u'), { expiresAt: Date.now() + 10000 });
  await assert.rejects(sendDurableEmail(options({ retryPolicy: policy })));
  due(); db.rows.get('users/u').event = 'B';
  provider = async () => { throw new Error('must not send a changed event'); };
  const newPolicy = makeSnapshotRetryPolicy(db.rows.get('users/u'), { expiresAt: Date.now() + 86400000 });
  assert.equal(await sendDurableEmail(options({ retryPolicy: newPolicy })), 'ineligible');
  assert.deepEqual(pending()[1].retryPolicy, policy);
});
test('recovery checks current auth address and disabled status without retargeting payload', async () => {
  for (const current of [{ email: 'changed@example.com' }, { email: 'u@example.com', disabled: true }]) {
    db = database({ emailConsent: true });
    provider = async () => ({ ok: false, uncertain: true, error: 'timeout' });
    await assert.rejects(sendDurableEmail(options())); const id = due(); account = current;
    provider = async () => { throw new Error('must not send'); };
    assert.equal(await recoverDelivery(id, true), 'ineligible');
  }
  account = { email: 'u@example.com' };
});
test('acceptance proof settles after retention without sending, preserving a newer lock/time', async () => {
  db = database({ emailConsent: true }); db.failSentCommit = true;
  provider = async () => ({ ok: true, id: 'accepted' });
  await assert.rejects(sendDurableEmail(options({ record: { emailVariants: { launch: { variant: 'v1' } } }, successTimestampPaths: ['emailVariants.launch.sentAt'] })), /marker unavailable/);
  const id = due(); const state = pending()[1];
  state.firstAttemptAt -= 86400000;
  const newer = Date.now() + 1000;
  Object.assign(db.rows.get('users/u'), { unsubscribed: true, lastEmailSent: new Date(newer), marketingEmailLease: { deliveryId: 'other', uncertain: true } });
  provider = async () => { throw new Error('reconciliation must never send'); };
  assert.equal(await recoverDelivery(id, false), 'reconciled');
  assert.equal(db.rows.get('users/u').marketingEmailLease.deliveryId, 'other');
  assert.equal(db.rows.get('users/u').lastEmailSent.getTime(), newer);
  assert.equal(db.rows.get('users/u').emailVariants.launch.sentAt, new Date(state.providerAcceptance.acceptedAt).toISOString());
  assert.equal(await recoverDelivery(id, false), 'not_pending');
});
test('invalid acceptance proof cannot bypass quarantine or cause sends', async () => {
  for (const change of [p => p.generation++, p => p.idempotencyKey = 'wrong', p => p.fingerprint = 'wrong', p => p.id = '']) {
    db = database({ emailConsent: true }); db.failSentCommit = true;
    provider = async () => ({ ok: true, id: 'accepted' });
    await assert.rejects(sendDurableEmail(options())); const id = due(); const state = pending()[1];
    state.firstAttemptAt -= 86400000; change(state.providerAcceptance);
    provider = async () => { throw new Error('must not send'); };
    assert.equal(await recoverDelivery(id, true), 'expired_or_invalid_attempt');
    assert.equal(state.status, 'sending'); // map transactions replace rows
    assert.equal(pending()[1].status, 'quarantined');
  }
});
test('legacy missing-policy attempt is held rather than assigned a fresh guard', async () => {
  db = database({ emailConsent: true });
  provider = async () => ({ ok: false, uncertain: true, error: 'timeout' });
  await assert.rejects(sendDurableEmail(options({ retryPolicy: undefined })));
  const id = due();
  assert.equal(await sendDurableEmail(options()), 'ineligible');
  assert.equal(await recoverDelivery(id, true), 'missing_or_invalid_retry_contract');
});


test('fresh invalidation never clears another delivery lease', async () => {
  db = database({ emailConsent: true });
  const transaction = db.runTransaction.bind(db); let first = true;
  db.runTransaction = async fn => {
    const result = await transaction(fn);
    if (first) { first = false; Object.assign(db.rows.get('users/u'), { unsubscribed: true, marketingEmailLease: { deliveryId: 'newer', uncertain: true } }); }
    return result;
  };
  provider = async () => { throw new Error('must not send'); };
  assert.equal(await sendDurableEmail(options()), 'ineligible');
  assert.equal(db.rows.get('users/u').marketingEmailLease.deliveryId, 'newer');
});
test('attempt cap and backoff block further provider calls while retaining uncertain claim', async () => {
  db = database({ emailConsent: true });
  provider = async () => ({ ok: false, uncertain: true, error: 'timeout' });
  await assert.rejects(sendDurableEmail(options()));
  provider = async () => { throw new Error('must not call during backoff or after cap'); };
  assert.equal(await sendDurableEmail(options()), 'in_flight');
  const id = due(); pending()[1].attemptCount = 8;
  assert.equal(await recoverDelivery(id, true), 'attempt_limit');
  assert.equal(db.rows.get('users/u').marketingEmailLease.uncertain, true);
});
test('normal uncertain retry rechecks auth rather than using its caller stale email', async () => {
  db = database({ emailConsent: true }); account = { email: 'u@example.com' };
  provider = async () => ({ ok: false, uncertain: true, error: 'timeout' });
  await assert.rejects(sendDurableEmail(options())); due();
  account = { email: 'changed@example.com' };
  provider = async () => { throw new Error('must not send'); };
  assert.equal(await sendDurableEmail(options()), 'ineligible');
  account = { email: 'u@example.com' };
});
test('unchanged launch record remains fingerprint-stable across failed attempts', async () => {
  db = database({ emailConsent: true });
  const opts = options({ record: { emailVariants: { newTests2026: { variant: 'v1' } } }, successTimestampPaths: ['emailVariants.newTests2026.sentAt'] });
  provider = async () => ({ ok: false, uncertain: true, error: 'timeout' });
  await assert.rejects(sendDurableEmail(opts)); due(); const fingerprint = pending()[1].fingerprint;
  provider = async () => ({ ok: true, id: 'launch' });
  assert.equal(await sendDurableEmail(opts), 'sent');
  assert.equal(pending()[1].fingerprint, fingerprint);
  assert.equal(db.rows.get('users/u').emailVariants.newTests2026.sentAt, new Date(pending()[1].sentAt).toISOString());
});


test('retry deadline crossing during Auth lookup stops before provider call', async () => {
  db = database({ emailConsent: true }); account = { email: 'u@example.com' };
  provider = async () => ({ ok: false, uncertain: true, error: 'timeout' });
  await assert.rejects(sendDurableEmail(options())); due();
  const originalNow = Date.now;
  onAuthRead = () => { Date.now = () => originalNow() + 23 * 3600000; };
  provider = async () => { throw new Error('must not send past safe replay deadline'); };
  try { assert.equal(await sendDurableEmail(options()), 'quarantined'); }
  finally { Date.now = originalNow; onAuthRead = () => {}; }
});


test('transport receives earlier original event expiry, not a refreshed retry deadline', async () => {
  db = database({ emailConsent: true });
  const policy = makeWelcomeRetryPolicy({}, false, Date.now() + 3600000);
  const deadlines = [];
  provider = async (_payload, opts) => { deadlines.push(opts.notAfter); return { ok: false, uncertain: true, error: 'timeout' }; };
  await assert.rejects(sendDurableEmail(options({ retryPolicy: policy }))); due();
  await assert.rejects(sendDurableEmail(options({ retryPolicy: makeWelcomeRetryPolicy({}, false, Date.now() + 86400000) })));
  assert.deepEqual(deadlines, [policy.expiresAt, policy.expiresAt]);
});

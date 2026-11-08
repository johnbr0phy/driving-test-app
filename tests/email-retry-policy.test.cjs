require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { makeSnapshotRetryPolicy, makeWelcomeRetryPolicy, makePurchaseRetryPolicy, retryPolicyEligible } = require('../lib/server/emailRetryPolicy.ts');
const now = Date.parse('2026-11-08T12:00:00Z');
const user = () => ({ emailConsent: true, firstSignupExamId: 'dmv', lastUpdated: new Date(now - 3600000).toISOString(),
  completedTests: [{ state: 'CA', completedAt: new Date(now - 3600000).toISOString() }], subscription: { isPremium: false } });

test('snapshot is stable across key order and our own claim mutations', () => {
  const raw = user();
  const policy = makeSnapshotRetryPolicy(raw, { expiresAt: now + 1000 }, now);
  const fresh = Object.fromEntries(Object.entries(raw).reverse());
  fresh.marketingEmailLease = { deliveryId: 'same', uncertain: true, until: now + 2000 };
  assert.equal(retryPolicyEligible(policy, fresh, now + 1), true);
  assert.equal(retryPolicyEligible(JSON.parse(JSON.stringify(policy)), fresh, now + 1), true);
});

test('every original eligibility change holds the message instead of selecting a new event', () => {
  const raw = user();
  const policy = makeSnapshotRetryPolicy(raw, { expiresAt: now + 1000 }, now);
  for (const change of [
    { emailConsent: false }, { unsubscribed: true }, { firstSignupExamId: 'sat' },
    { completedTests: [] }, { v2: { updatedAt: new Date(now).toISOString() } },
    { subscription: { isPremium: true } }, { lastUpdated: new Date(now).toISOString() },
    { emailsSent: ['other'] }, { lastEmailSent: new Date(now).toISOString() }, { photoURL: 'new-profile' },
  ]) assert.equal(retryPolicyEligible(policy, { ...raw, ...change }, now + 1), false, JSON.stringify(change));
});

test('timestamps preserve represented instant without colliding with ordinary values', () => {
  const raw = { timestamp: { toMillis: () => now }, date: new Date(now), value: 'timestamp:' + now };
  const policy = makeSnapshotRetryPolicy(raw, { expiresAt: now + 1000 }, now);
  assert.equal(retryPolicyEligible(policy, { ...raw, timestamp: { toMillis: () => now } }, now), true);
  assert.equal(retryPolicyEligible(policy, { ...raw, timestamp: String(now) }, now), false);
  assert.equal(retryPolicyEligible(policy, { ...raw, date: new Date(now + 1) }, now), false);
});

test('unsupported values and malformed or missing policy fail closed', () => {
  for (const raw of [{ value: NaN }, { value: Infinity }, { value: new Date('bad') }, { value: new Map() }, { value: () => true }]) {
    const p = makeSnapshotRetryPolicy(raw, { expiresAt: now + 1000 }, now);
    assert.equal(retryPolicyEligible(p, raw, now), false);
  }
  const raw = user();
  const p = makeSnapshotRetryPolicy(raw, { expiresAt: now + 1000 }, now);
  for (const value of [null, {}, [], { ...p, version: 2 }, { ...p, kind: 'future' }, { ...p, fingerprint: '' },
    { ...p, expiresAt: NaN }, { ...p, capturedAt: 0 }, { ...p, expiresAt: now - 1 }]) {
    assert.equal(retryPolicyEligible(value, raw, now), false);
  }
});

test('original eligibility deadline cannot be extended by a later invocation', () => {
  const raw = user();
  const p = makeSnapshotRetryPolicy(raw, { expiresAt: now + 1000 }, now);
  assert.equal(retryPolicyEligible(p, raw, now - 1), false);
  assert.equal(retryPolicyEligible(p, raw, now + 1000), true);
  assert.equal(retryPolicyEligible(p, raw, now + 1001), false);
});

test('each held campaign rechecks its present activation flag', () => {
  for (const gate of ['NEW_TESTS_CAMPAIGN', 'QUIZZES_CAMPAIGN', 'EXIT_QUESTION_CAMPAIGN']) {
    const old = process.env[gate];
    try {
      const raw = user();
      const p = makeSnapshotRetryPolicy(raw, { expiresAt: now + 1000, campaignGate: gate }, now);
      delete process.env[gate];
      assert.equal(retryPolicyEligible(p, raw, now), false);
      process.env[gate] = 'send';
      assert.equal(retryPolicyEligible(p, raw, now), true);
      process.env[gate] = 'paused';
      assert.equal(retryPolicyEligible(p, raw, now), false);
      assert.equal(retryPolicyEligible({ ...p, campaignGate: 'UNRECOGNIZED' }, raw, now), false);
    } finally { if (old === undefined) delete process.env[gate]; else process.env[gate] = old; }
  }
});

test('welcome retains exact signup identity while unrelated study progress can change', () => {
  const raw = { firstSignupExamId: 'sat', signupOrigin: { source: 'authenticated_signup', teacher: false } };
  const p = makeWelcomeRetryPolicy(raw, false, now + 1000, now);
  assert.equal(retryPolicyEligible(p, { ...raw, completedTests: [1] }, now), true);
  assert.equal(retryPolicyEligible(p, { ...raw, firstSignupExamId: 'act' }, now), false);
  assert.equal(retryPolicyEligible(p, { ...raw, signupOrigin: { ...raw.signupOrigin, teacher: true } }, now), false);
  assert.equal(retryPolicyEligible(p, raw, now + 1001), false);
});

test('teacher service welcome requires authenticated teacher origin', () => {
  const raw = { signupOrigin: { source: 'authenticated_signup', teacher: true } };
  const p = makeWelcomeRetryPolicy(raw, true, now + 1000, now);
  assert.equal(retryPolicyEligible(p, raw, now), true);
  for (const other of [{ teacher: false }, { teacher: true, source: 'untrusted' }]) {
    const q = makeWelcomeRetryPolicy({ signupOrigin: other }, true, now + 1000, now);
    assert.equal(retryPolicyEligible(q, { signupOrigin: other }, now), false);
  }
});

test('purchase receipt requires exact still-valid purchase entitlement, not campaign consent', () => {
  const subscription = { isPremium: true, stripePaymentId: 'pi_test', purchasedAt: new Date(now).toISOString() };
  const p = makePurchaseRetryPolicy(subscription, now);
  assert.equal(retryPolicyEligible(p, { subscription, unsubscribed: true, emailConsent: false }, now), true);
  assert.equal(retryPolicyEligible(p, { subscription: { ...subscription, isPremium: false } }, now), false);
  assert.equal(retryPolicyEligible(p, { subscription: { ...subscription, stripePaymentId: 'pi_other' } }, now), false);
  assert.equal(retryPolicyEligible(p, { subscription }, now + 23 * 3600000 + 1), false);
});

test('every current durable journey captures an explicit retry policy and upper bound', () => {
  for (const route of ['first-test-reminder', 'second-test-nudge', 'upgrade-pitch', 'reengagement', 'inactive-share-request', 'paywall-abandon', 'super-amazing', 'new-tests', 'quizzes-launch', 'exit-question']) {
    const source = fs.readFileSync(path.join(__dirname, `../app/api/cron/${route}/route.ts`), 'utf8');
    assert.match(source, /retryPolicy: \(u\) => makeSnapshotRetryPolicy\(u\.raw, \{ expiresAt:/, route);
  }
  const welcome = fs.readFileSync(path.join(__dirname, '../lib/server/welcomeEmail.ts'), 'utf8');
  assert.match(welcome, /makeWelcomeRetryPolicy\(data, teacher, new Date\(record\.metadata\.creationTime\)\.getTime\(\) \+ WELCOME_MAX_AGE_MS\)/);
  const receipt = fs.readFileSync(path.join(__dirname, '../app/api/stripe/webhook/route.ts'), 'utf8');
  assert.match(receipt, /retryPolicy: makePurchaseRetryPolicy/);
});

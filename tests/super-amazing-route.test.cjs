require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');

// Keep route tests offline: the shared audience and sender are mocked, while
// the actual frequency helper, achievement resolver and templates are used.
const cronPath = require.resolve('../lib/cron-email.ts');
const cron = require(cronPath);
const { voiceFor } = require('../lib/email-voice.ts');
let users = [];
let audienceCalls = 0;
let batch;
require.cache[cronPath].exports = {
  ...cron,
  buildAuthMap: async () => new Map(),
  getEligibleUsers: async (_auth, includeLegacy, includeInactive) => {
    audienceCalls++;
    assert.equal(includeLegacy, false);
    assert.equal(includeInactive, undefined, 'shared consent/activity/internal-account filtering stays enabled');
    return users;
  },
  processBatch: async (options) => {
    batch = options;
    return { sent: 0, failed: 0, skipped: 0, eligible: options.users.length, attempted: 0, stoppedForQuota: false };
  },
};
process.env.INCLUDE_LEGACY_CONSENT = 'false';
process.env.CRON_SECRET = 'test-only-super-amazing-secret';
const { GET } = require('../app/api/cron/super-amazing/route.ts');

const now = Date.now();
const hour = 60 * 60 * 1000;
const makeUser = (uid, key, overrides = {}) => ({
  uid, email: `${uid}@example.com`, creationTime: new Date(now),
  completedTests: [], emailsSent: [], subscription: {}, lastEmailSent: null,
  lastUpdated: new Date(now), questionsAnswered: 0, lastPaywallHit: null,
  superAmazingUnlockedAt: null, lastActiveAt: new Date(now),
  examId: 'dmv', voice: voiceFor('dmv'),
  raw: { superAmazingUnlocks: { [key]: new Date(now - hour).toISOString() } },
  ...overrides,
});

test('cron authorization, once-account marker, frequency cap and shared sender remain in force', async () => {
  let response = await GET(new Request('https://example.com/api/cron/super-amazing'));
  assert.equal(response.status, 401);
  assert.equal(audienceCalls, 0);
  users = [
    makeUser('dmv', 'dmv'), makeUser('ccma', 'ccma'), makeUser('sat', 'v2:sat'),
    makeUser('variant', 'realestate-ca'),
    makeUser('sent', 'ccma', { emailsSent: ['superAmazingUnlocked'] }),
    makeUser('recent-mail', 'ccma', { lastEmailSent: new Date(now - hour) }),
    makeUser('four-hours', 'ccma', { lastEmailSent: new Date(now - 4 * hour) }),
    makeUser('stale', 'ccma', { raw: { superAmazingUnlocks: { ccma: new Date(now - 8 * 24 * hour).toISOString() } } }),
    makeUser('old-dmv', 'dmv', { lastActiveAt: new Date(now - 4 * 24 * hour), raw: { superAmazingUnlocks: { dmv: new Date(now - 4 * 24 * hour).toISOString() } } }),
    makeUser('older-ccma', 'ccma', { lastActiveAt: new Date(now - 4 * 24 * hour), raw: { superAmazingUnlocks: { ccma: new Date(now - 4 * 24 * hour).toISOString() } } }),
    makeUser('unscoped', 'ccma', { raw: { superAmazingUnlockedAt: new Date(now - hour).toISOString() } }),
  ];
  response = await GET(new Request('https://example.com/api/cron/super-amazing', {
    headers: { authorization: `Bearer ${process.env.CRON_SECRET}` },
  }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).eligible, 6);
  assert.equal(audienceCalls, 1);
  assert.equal(batch.emailKey, 'superAmazingUnlocked');
  assert.equal(batch.label, 'super-amazing');
  assert.equal(typeof batch.subject, 'function');
  assert.deepEqual(batch.users.map((user) => user.uid), ['dmv', 'ccma', 'sat', 'variant', 'four-hours', 'older-ccma']);
  const ccma = batch.users.find((user) => user.uid === 'ccma');
  assert.equal(ccma.examId, 'ccma');
  assert.equal(batch.subject(ccma), 'CCMA: Super Amazing Mode unlocked');
  assert.match(batch.template(ccma), /\/ccma\/dashboard\?/);
  assert.doesNotMatch(batch.template(ccma), /DMV|questionCount/);
});

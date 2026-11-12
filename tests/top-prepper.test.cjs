// Pins the rules of the top prepper email (lib/topPrepper.ts) and its copy.
require('tsx/cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  percentBelow, topPrepperPct, inTopPrepperHoldout, tallyTopPrepper, emptyTopPrepperResult,
  TOP_PREPPER_MIN_ANSWERS, TOP_PREPPER_HOLDOUT_ONE_IN,
} = require('../lib/topPrepper.ts');
const { topPrepperEmail } = require('../lib/email-templates.ts');
const { topPrepperInbox } = require('../lib/email-inbox.ts');
const { voiceFor } = require('../lib/email-voice.ts');

const population = Array.from({ length: 1000 }, (_, i) => i + 1); // 1..1000 answers

test('the percentile counts only people with strictly fewer answers', () => {
  assert.equal(percentBelow(population, 1), 0);
  assert.equal(percentBelow(population, 501), 50);
  assert.equal(percentBelow(population, 5000), 100);
  assert.equal(percentBelow([], 50), 0);
  assert.equal(percentBelow([10, 10, 10, 10], 10), 0);
});

test('the claim is rounded down, capped at 99 and needs both the percentile and real volume', () => {
  assert.equal(topPrepperPct(population, 5000), 99);
  assert.equal(topPrepperPct(population, 927), 92);
  assert.equal(topPrepperPct(population, 700), null); // 69.9%: not top
  // Top of a tiny population, but too few answers to be called a top prepper.
  assert.equal(topPrepperPct([1, 2, 3], TOP_PREPPER_MIN_ANSWERS - 1), null);
});

test('the holdout is stable per account and about one in ten', () => {
  const uids = Array.from({ length: 5000 }, (_, i) => `uid-${i}-${(i * 7919).toString(36)}`);
  const held = uids.filter(inTopPrepperHoldout).length;
  assert.ok(Math.abs(held / uids.length - 1 / TOP_PREPPER_HOLDOUT_ONE_IN) < 0.03, String(held));
  for (const u of uids.slice(0, 50)) assert.equal(inTopPrepperHoldout(u), inTopPrepperHoldout(u));
});

test('a purchase counts only inside the 7 days after the stamp', () => {
  const day = 86_400_000;
  const at = 100 * day;
  const r = emptyTopPrepperResult();
  tallyTopPrepper(r, 'sent', at, at + 2 * day, at + 30 * day);     // bought in time
  tallyTopPrepper(r, 'sent', at, at + 9 * day, at + 30 * day);     // too late
  tallyTopPrepper(r, 'sent', at, at - day, at + 30 * day);         // bought before
  tallyTopPrepper(r, 'sent', at, null, at + 3 * day);              // still deciding
  tallyTopPrepper(r, 'holdout', at, at + day, at + 30 * day);
  tallyTopPrepper(r, 'holdout', at, null, at + 30 * day);
  assert.deepEqual(r, { sent: 4, sentPaid: 1, sentOpen: 1, holdout: 2, holdoutPaid: 1, holdoutOpen: 0 });
});

test('the email states the person\'s own numbers and links to the unlock on their test', () => {
  for (const id of ['dmv', 'cdl', 'cna']) {
    const v = voiceFor(id);
    const html = topPrepperEmail(v, { answers: 1340, pct: 92, item: 'Practice Test <6> & more' });
    assert.ok(html.includes('1,340 practice questions'), id);
    assert.ok(html.includes('more than 92%'), id);
    assert.ok(html.includes('Practice Test &lt;6&gt; &amp; more'), 'the paywall label is escaped');
    const link = [...html.matchAll(/href="([^"]+)"/g)].map((m) => new URL(m[1])).find((u) => u.searchParams.get('utm_campaign') === 'top_prepper');
    assert.equal(link.origin, 'https://www.tigertest.io');
    assert.equal(link.pathname, v.dashboardPath, id);
    assert.equal(link.searchParams.get('unlock'), '1');
    assert.ok(html.includes('{{unsubscribeToken}}'));
    assert.ok(!html.includes('—'));
  }
  assert.ok(topPrepperInbox(92).subject.includes('92%'));
});

test('both dashboards open the paywall for ?unlock=1, and the campaign is wired', () => {
  const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
  for (const p of ['app/dmv/dashboard/page.tsx', 'components/exam/ExamDashboard.tsx']) {
    assert.match(read(p), /searchParams\.get\("unlock"\) !== "1"/, p);
  }
  const vercel = JSON.parse(read('vercel.json'));
  assert.ok(vercel.crons.some((c) => c.path === '/api/cron/top-prepper'));
  const route = read('app/api/cron/top-prepper/route.ts');
  assert.match(route, /TOP_PREPPER_CAMPAIGN === "send"/);
  assert.ok(read('firestore.email-release.rules').includes("'topPrepper'"));
});

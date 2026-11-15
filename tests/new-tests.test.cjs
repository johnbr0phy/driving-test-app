// Pins the rules of the /admin New tests tab (lib/newTests.ts) and that every
// exam has a launch date (lib/examLaunchDates.json, scripts/build-landing-dates.ts).
require('tsx/cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const { testPages, onTestPages, daysLive, dayMinus, trafficOf, trafficCounts, groups, shares } = require('../lib/newTests.ts');
const launchDates = require('../lib/examLaunchDates.json');
const { EXAMS } = require('../lib/exams.ts');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');

test('a test owns its landings, app routes and topic pages, and nothing that only starts like them', () => {
  const pages = testPages(['/cdl-practice-test', '/es/examen-practica-cdl'], '/cdl', 'cdl');
  for (const p of ['/cdl-practice-test', '/CDL-Practice-Test/', '/es/examen-practica-cdl', '/cdl', '/cdl/dashboard', '/questions/cdl/air-brakes', '/cdl-practice-test?x=1'])
    assert.ok(onTestPages(p, pages), p);
  for (const p of ['/cdl-endorsements/dashboard', '/cdl-endorsement-practice-test', '/', '/questions/cdlx/a', null])
    assert.ok(!onTestPages(p, pages), String(p));
  const family = testPages(['/real-estate-practice-test'], '/real-estate', 'real-estate');
  assert.ok(onTestPages('/real-estate-practice-test/california', family));
});

test('days live counts launch day', () => {
  assert.equal(daysLive('2026-11-15', '2026-11-15'), 1);
  assert.equal(daysLive('2026-11-09', '2026-11-15'), 7);
  assert.equal(dayMinus('2026-11-15', 6), '2026-11-09');
});

const row = (id, visitors, live, signups = 0, group = 'G') => ({
  id, name: id, href: '/', group, launched: '2026-11-01', daysLive: live, visitors, visitors7d: visitors,
  perDay: visitors / live, signups, revenueUsdCents: 0, topSource: null,
});

test('a test is judged on traffic only after a week', () => {
  assert.equal(trafficOf(row('a', 0, 3)), 'tooNew');
  assert.equal(trafficOf(row('a', 0, 10)), 'none');
  assert.equal(trafficOf(row('a', 5, 10)), 'trickle');
  assert.equal(trafficOf(row('a', 10, 10)), 'steady');
  assert.deepEqual(trafficCounts([row('a', 0, 3), row('b', 0, 10), row('c', 20, 10)]), { steady: 1, trickle: 0, none: 1, tooNew: 1 });
});

test('groups rank by visitors a test a day, so a young test is not punished', () => {
  const g = groups([row('a', 10, 5, 1, 'X'), row('b', 30, 3, 2, 'X'), row('c', 70, 35, 0, 'Y')]);
  assert.equal(g[0].group, 'X');
  assert.equal(g[0].perTestDay, (2 + 10) / 2);
  assert.equal(g[0].signups, 3);
  assert.equal(g[0].best, 'b');
  assert.equal(g[1].best, 'c');
});

test('shares are biggest first and drop zeros', () => {
  assert.deepEqual(shares({ search: 3, chatgpt: 1, direct: 0 }), [
    { key: 'search', n: 3, share: 0.75 }, { key: 'chatgpt', n: 1, share: 0.25 },
  ]);
});

test('every exam has a launch date, so a new test shows on the tab', () => {
  const missing = [...EXAMS.map((e) => e.id), ...EXAMS_V2.map((e) => e.id)].filter((id) => !/^\d{4}-\d{2}-\d{2}$/.test(launchDates[id] || ''));
  assert.deepEqual(missing, [], 'run npx tsx scripts/build-landing-dates.ts');
});

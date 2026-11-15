// Pins the rules of the /admin New tests tab (lib/newTests.ts) and that every
// exam has a launch date (lib/examLaunchDates.json, scripts/build-landing-dates.ts).
require('tsx/cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const { testPages, onTestPages, daysLive, dayMinus, sumSince, mostRecent } = require('../lib/newTests.ts');
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

test('questions count from launch day on', () => {
  assert.equal(sumSince({ '2026-11-01': 5, '2026-11-02': 3, '2026-10-31': 9 }, '2026-11-01'), 8);
  assert.equal(sumSince(undefined, '2026-11-01'), 0);
});

test('the tab lists the newest launches first, capped', () => {
  const l = [{ id: 'a', day: '2026-11-01' }, { id: 'b', day: '2026-11-10' }, { id: 'c', day: '2026-11-05' }];
  assert.deepEqual(mostRecent(l, 2).map((x) => x.id), ['b', 'c']);
});

test('every exam has a launch date, so a new test shows on the tab', () => {
  const missing = [...EXAMS.map((e) => e.id), ...EXAMS_V2.map((e) => e.id)].filter((id) => !/^\d{4}-\d{2}-\d{2}$/.test(launchDates[id] || ''));
  assert.deepEqual(missing, [], 'run npx tsx scripts/build-landing-dates.ts');
});

// Pins the rules of the /admin New tests tab (lib/newTests.ts) and that every
// exam has a launch date (lib/examLaunchDates.json, scripts/build-landing-dates.ts).
require('tsx/cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const { testPages, onTestPages, daysLive, dayMinus, weekOf, cohorts, groups } = require('../lib/newTests.ts');
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

test('days live counts launch day, weeks start on Monday', () => {
  assert.equal(daysLive('2026-11-15', '2026-11-15'), 1);
  assert.equal(daysLive('2026-11-09', '2026-11-15'), 7);
  assert.equal(dayMinus('2026-11-15', 6), '2026-11-09');
  assert.equal(weekOf('2026-11-15'), '2026-11-09');
  assert.equal(weekOf('2026-11-09'), '2026-11-09');
});

const row = (id, launched, visitors, live, group = 'G') => ({
  id, name: id, href: '/', group, region: 'US', launched, daysLive: live, visitors, visitors7d: visitors, firstAnswers: 0,
  answers: 0, answers7d: 0, learners: 0, learners7d: 0, signups: 1, signups7d: 1, purchases: 0, revenueUsdCents: 0,
  visitorsPerDay: visitors / live,
});

test('cohorts and groups average visitors a test a day, so a young test is not punished', () => {
  const rows = [row('a', '2026-11-10', 10, 5, 'X'), row('b', '2026-11-12', 30, 3, 'X'), row('c', '2026-11-03', 70, 12, 'Y')];
  const [newest, older] = cohorts(rows);
  assert.equal(newest.week, '2026-11-09');
  assert.equal(newest.tests, 2);
  assert.equal(newest.visitors, 40);
  assert.equal(newest.visitorsPerTestDay, (2 + 10) / 2);
  assert.equal(older.week, '2026-11-02');
  const g = groups(rows);
  assert.equal(g[0].group, 'X');
  assert.equal(g[0].best.id, 'b');
});

test('every exam has a launch date, so a new test shows on the tab', () => {
  const missing = [...EXAMS.map((e) => e.id), ...EXAMS_V2.map((e) => e.id)].filter((id) => !/^\d{4}-\d{2}-\d{2}$/.test(launchDates[id] || ''));
  assert.deepEqual(missing, [], 'run npx tsx scripts/build-landing-dates.ts');
});

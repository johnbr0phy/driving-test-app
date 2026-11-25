// Run: node --test tests/daily-rank.test.cjs
// Daily rank (lib/dailyRank.ts, lib/dailyRankClient.ts): the counter, the
// percentile maths, the local-day reset and the guest-to-account merge.
// Every count here is made up; no real data.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const R = require('../lib/dailyRank.ts');
const C = require('../lib/dailyRankClient.ts');

// A histogram from a plain list of each person's correct count.
const histOf = (counts) => counts.reduce((h, c) => (c > 0 ? { ...h, [c]: (h[c] || 0) + 1 } : h), {});

// ── Counter ────────────────────────────────────────────────────────────────

test('counter: only the first answer to a question counts, and only if right', () => {
  let p = R.emptyPerson();
  p = R.applyAnswers(p, [{ key: 'a', ok: true }, { key: 'b', ok: false }, { key: 'c', ok: true }]);
  assert.equal(R.correctOf(p), 2);
  // Retry after a miss and a repeat of a right answer never count.
  p = R.applyAnswers(p, [{ key: 'b', ok: true }, { key: 'a', ok: true }, { key: 'a', ok: true }]);
  assert.equal(R.correctOf(p), 2);
  assert.deepEqual(p.w, ['b']);
});

test('counter: duplicates inside one batch count once', () => {
  const p = R.applyAnswers(R.emptyPerson(), [{ key: 'x', ok: true }, { key: 'x', ok: true }, { key: 'x', ok: false }]);
  assert.equal(R.correctOf(p), 1);
  assert.equal(p.w.length, 0);
});

test('counter: stops at the per-day cap', () => {
  const answers = Array.from({ length: 20 }, (_, i) => ({ key: `q${i}`, ok: true }));
  assert.equal(R.correctOf(R.applyAnswers(R.emptyPerson(), answers, 5)), 5);
});

test('client counter: queues first attempts and counts right ones at once', () => {
  let s = C.freshState('2026-11-25');
  s = C.addAnswer(s, 'cdl', 'CDL-1', true);
  s = C.addAnswer(s, 'cdl', 'CDL-2', false);
  const again = C.addAnswer(s, 'cdl', 'CDL-2', true);
  assert.equal(again, s, 'a second answer to the same question is ignored');
  // The same id on another exam is another question.
  s = C.addAnswer(s, 'dmv', 'CDL-1', true);
  assert.equal(s.correct, 2);
  assert.equal(s.pending.length, 3);
});

// ── Percentile maths ───────────────────────────────────────────────────────

test('percentile: top X% counts you, ties share the better rank', () => {
  // 10 people: 1,2,...,10 correct.
  const h = histOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.equal(R.topPercent(h, 10), 10);
  assert.equal(R.topPercent(h, 9), 20);
  assert.equal(R.topPercent(h, 1), 100);
  // Ties share the honest rank: 2 of 6 tied at the top are both top 34%, not top 17%.
  const tied = histOf([3, 3, 3, 3, 8, 8]);
  assert.equal(R.topPercent(tied, 8), 34);
  assert.equal(R.topPercent(tied, 3), 100);
  // 100 of 300 tied at the top are top 34%, never top 1%.
  assert.equal(R.topPercent(histOf([...Array(300)].map((_, i) => (i < 100 ? 9 : 1))), 9), 34);
  assert.equal(R.topPercent(tied, 0), null);
});

test('percentile: alone today is top 100% only by arithmetic, and never below 1', () => {
  assert.equal(R.topPercent(histOf([4]), 4), 100);
  const many = histOf(Array.from({ length: 1000 }, (_, i) => (i === 0 ? 500 : 1)));
  assert.equal(R.topPercent(many, 500), 1);
});

test('percentile: the browser estimate from cutoffs matches the server everywhere', () => {
  const counts = [];
  let seed = 7;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  for (let i = 0; i < 2500; i++) counts.push(1 + Math.floor(rand() * rand() * 120));
  const h = histOf(counts);
  const cutoffs = R.percentileCutoffs(h);
  assert.equal(cutoffs.length, 100);
  for (let mine = 1; mine <= 130; mine++) {
    assert.equal(R.topPercentFromCutoffs(cutoffs, mine), R.topPercent(h, mine), `count ${mine}`);
  }
});

test('percentile: cutoffs never reveal how many people answered', () => {
  const small = R.percentileCutoffs(histOf([1, 2, 3]));
  const big = R.percentileCutoffs(histOf([...Array(300)].map((_, i) => (i % 3) + 1)));
  // Same shape of distribution, very different head counts.
  assert.ok(small.every((c) => c === null || Number.isInteger(c)));
  assert.equal(R.topPercentFromCutoffs(small, 3), 34);
  assert.equal(R.topPercentFromCutoffs(big, 3), 34);
  assert.equal(R.topPercentFromCutoffs(small, 2), R.topPercentFromCutoffs(big, 2));
});

test('next 1,000: how many more correct to pass the next block of people', () => {
  // You at 10; 600 people at 10, 600 at 11, 600 at 14.
  const h = { 10: 601, 11: 600, 14: 600 };
  // Reaching 12 passes 600 + 600 = 1,200 >= 1,000.
  assert.deepEqual(R.nextTarget(h, 10), { kind: 'block', need: 2, people: 1000 });
  // Fewer than 1,000 level with or ahead: pass all of them.
  assert.deepEqual(R.nextTarget({ 5: 1, 7: 3, 9: 2 }, 5), { kind: 'everyone', need: 5, people: 5 });
  // Ties count: 3 others tied with you at 5 are passed with 1 more.
  assert.deepEqual(R.nextTarget({ 5: 4 }, 5), { kind: 'everyone', need: 1, people: 3 });
  // Nobody level or ahead.
  assert.deepEqual(R.nextTarget({ 2: 9, 6: 1 }, 6), { kind: 'top' });
  assert.equal(R.nextTarget({}, 0), null);
});

test('histogram: a person moves bucket, and 0 is never in it', () => {
  assert.deepEqual(R.histogramDelta(0, 1), { 1: 1 });
  assert.deepEqual(R.histogramDelta(3, 5), { 3: -1, 5: 1 });
  assert.deepEqual(R.histogramDelta(4, 0), { 4: -1 });
  assert.deepEqual(R.histogramDelta(5000, 6000), {}, 'counts above the cap share one bucket');
  assert.deepEqual(R.addHistograms({ 1: 2, 3: 1 }, { 1: -2, 4: 1 }, null), { 3: 1, 4: 1 });
});

test('status: nothing until 1 correct', () => {
  const s = R.rankStatus('2026-11-25', histOf([1, 2]), 0);
  assert.equal(s.correct, 0);
  assert.equal(s.topPercent, null);
  assert.equal(s.next, null);
  assert.deepEqual(s.cutoffs, []);
});

// ── Local day ──────────────────────────────────────────────────────────────

test('Tiger Time: one day for everyone, midnight to midnight Eastern time', () => {
  // 03:30 UTC on the 25th is 10:30pm on the 24th in New York, for everyone.
  const t = new Date('2026-11-25T03:30:00Z');
  assert.equal(R.TIGER_TIME_ZONE, 'America/New_York');
  assert.equal(R.tigerDay(t), '2026-11-24');
  assert.equal(R.tigerDay(new Date('2026-11-25T05:00:00Z')), '2026-11-25', 'a new day at midnight EST (05:00 UTC)');
  assert.equal(R.tigerDay(new Date('2026-07-01T04:00:00Z')), '2026-07-01', 'a new day at midnight EDT (04:00 UTC)');
  assert.equal(R.tigerTimeLeftMs(t), 1.5 * 3600_000);
  assert.equal(R.formatCountdown(4.5 * 3600_000 + 5_400), '4:30:05');
  // Local days still exist for the A/B test's next-day return.
  assert.equal(R.localDay(t, 'Asia/Tokyo'), '2026-11-25');
  assert.equal(R.nextDay('2026-11-30'), '2026-12-01');
});

test('Tiger Time countdown is right on the daylight saving nights', () => {
  // 8 Mar 2026: 23 hours. 01:30 EST (06:30 UTC) leaves 21.5 hours.
  assert.equal(R.tigerTimeLeftMs(new Date('2026-03-08T06:30:00Z')), 21.5 * 3600_000);
  // 1 Nov 2026: 25 hours. 00:30 EDT (04:30 UTC) leaves 24.5 hours.
  assert.equal(R.tigerTimeLeftMs(new Date('2026-11-01T04:30:00Z')), 24.5 * 3600_000);
  for (const iso of ['2026-03-08T06:30:00Z', '2026-11-01T04:30:00Z', '2026-06-15T18:00:00Z']) {
    const now = new Date(iso);
    const end = new Date(now.getTime() + R.tigerTimeLeftMs(now));
    assert.notEqual(R.tigerDay(end), R.tigerDay(now), `${iso}: the countdown ends on a new day`);
    assert.equal(R.tigerDay(new Date(end.getTime() - 1)), R.tigerDay(now), `${iso}: and not a moment early`);
  }
});

test('Tiger Time winner: most correct, ties to whoever got there first, accounts only', () => {
  const c = (uid, correct, reachedAt) => ({ uid, correct, reachedAt });
  const people = [c(null, 90, '2026-11-24T10:00:00Z'), c('a', 60, '2026-11-24T21:00:00Z'), c('b', 60, '2026-11-24T19:00:00Z'), c('z', 70, '2026-11-24T09:00:00Z')];
  // A guest with 90 cannot win; z is internal; a and b tie at 60 and b got there first.
  assert.equal(R.pickTigerTimeWinner(people, (uid) => uid === 'z').uid, 'b');
  assert.equal(R.pickTigerTimeWinner(people).uid, 'z');
  // Below the minimum nobody wins.
  assert.equal(R.pickTigerTimeWinner([c('a', R.TIGER_TIME_MIN_TO_WIN - 1, null)]), null);
  assert.equal(R.pickTigerTimeWinner([]), null);
});

test('Tiger Time day: the client count resets when the day changes, not before', () => {
  let s = C.freshState('2026-11-24');
  s = C.addAnswer(s, 'dmv', 'q1', true);
  s = { ...s, cutoffs: [5], next: { kind: 'top' } };
  assert.equal(C.rollDay(s, '2026-11-24'), s, 'same day keeps everything');
  const next = C.rollDay(s, '2026-11-25');
  assert.equal(next.correct, 0);
  assert.deepEqual(next.seen, []);
  assert.deepEqual(next.cutoffs, []);
  // Yesterday's question counts again today.
  assert.equal(C.addAnswer(next, 'dmv', 'q1', true).correct, 1);
});

test('client view: "N more" shrinks with answers made since the last sync', () => {
  const base = { ...C.freshState('2026-11-25'), correct: 12, serverCorrect: 10, cutoffs: R.percentileCutoffs({ 10: 5, 20: 5 }), next: { kind: 'block', need: 5, people: 1000 } };
  const v = C.viewOf(base);
  assert.equal(v.correct, 12);
  assert.deepEqual(v.next, { kind: 'block', need: 3, people: 1000 });
  assert.equal(C.viewOf({ ...base, correct: 16 }).next, null, 'reached: hidden until the next sync');
});

// ── Guest to account ───────────────────────────────────────────────────────

test('merge: today\'s guest count carries over to the account', () => {
  const guest = R.applyAnswers(R.emptyPerson(), [{ key: 'a', ok: true }, { key: 'b', ok: true }, { key: 'c', ok: false }]);
  const account = R.applyAnswers(R.emptyPerson(), [{ key: 'd', ok: true }]);
  const merged = R.mergePeople(account, guest);
  assert.equal(R.correctOf(merged), 3);
  // After merging, a question answered as a guest is still seen.
  assert.equal(R.correctOf(R.applyAnswers(merged, [{ key: 'c', ok: true }, { key: 'a', ok: true }])), 3);
});

test('merge: a question both answered counts once, right if either got it right', () => {
  const guest = R.applyAnswers(R.emptyPerson(), [{ key: 'q', ok: true }]);
  const account = R.applyAnswers(R.emptyPerson(), [{ key: 'q', ok: false }]);
  const merged = R.mergePeople(account, guest);
  assert.equal(R.correctOf(merged), 1);
  assert.deepEqual(merged.w, []);
});

test('merge: the histogram loses both old people and gains the merged one', () => {
  // Server mergeGuestDay sums these two deltas.
  const out = R.addHistograms({ 2: 5, 3: 5 }, R.histogramDelta(2, 0), R.histogramDelta(3, 5));
  assert.deepEqual(out, { 2: 4, 3: 4, 5: 1 });
});

// ── Wiring and rules ───────────────────────────────────────────────────────

const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');

test('wiring: every engine\'s answers feed the rank, sign-in merges, the API reuses the rate limiter', () => {
  assert.match(read('lib/classProgress.ts'), /noteRankAnswer\(examId, questionId, correct\)/);
  assert.match(read('contexts/AuthContext.tsx'), /mergeRankOnSignIn\(\)/);
  assert.match(read('app/api/rank/today/route.ts'), /grantAnswers\([\s\S]*?'rank'\)/);
  assert.match(read('components/FocusBar.tsx'), /<DailyRankChip \/>/);
  // The A/B test ended (Nov 25 2026): everyone sees Tiger Time, and its card is off the A/B tab.
  assert.doesNotMatch(read('components/admin/ABTestsTab.tsx'), /DailyRankTestCard/);
  assert.ok(!fs.existsSync(path.join(__dirname, '..', 'lib/dailyRankTest.ts')));
  assert.doesNotMatch(read('components/DailyRank.tsx'), /rankArm\(/);
});

test('privacy: the API never returns a head count, a raw rank or anyone else', () => {
  const status = R.rankStatus('2026-11-25', histOf([1, 2, 3, 4, 5]), 3);
  assert.deepEqual(Object.keys(status).sort(), ['correct', 'cutoffs', 'day', 'enterTop', 'next', 'place', 'placeGoal', 'topPercent']);
  // Everyone gets a place now (John, Nov 25 2026), however far down.
  const big = {}; for (let c = 1; c <= 300; c++) big[c] = 500;
  assert.equal(R.rankStatus('2026-11-25', big, 1).place, 299 * 500 + 1, 'far down: still a place');
  assert.equal(R.rankStatus('2026-11-25', big, 300).place, 1);
  // Every response is the caller's own status, built by rankStatus/statusFor, or an error.
  for (const file of ['app/api/rank/today/route.ts', 'app/api/rank/merge/route.ts']) {
    const route = read(file);
    assert.doesNotMatch(route, /loadDistribution/, `${file} must not return the raw histogram`);
    const bodies = [...route.matchAll(/NextResponse\.json\(\s*([^\n]{0,40})/g)].map((m) => m[1]);
    assert.ok(bodies.length > 0);
    for (const b of bodies) assert.match(b, /^(await statusFor\(|rankStatus\(|\{ error|\{ day: caller\.day, correct: 0)/, `${file}: ${b}`);
  }
});

test('copy: every language has every daily rank string, no em dashes, no speed', () => {
  const { en } = require('../i18n/en.ts');
  const langs = ['es', 'vi', 'ko', 'zh', 'de', 'fr', 'it', 'pl', 'nl', 'pt', 'sv', 'da', 'fi', 'hu', 'ro', 'el'];
  const keys = Object.keys(en.dailyRank);
  for (const lang of ['en', ...langs]) {
    const dict = require(`../i18n/${lang}.ts`)[lang].dailyRank;
    assert.ok(dict, `${lang} has dailyRank`);
    for (const k of keys) {
      assert.equal(typeof dict[k], 'string', `${lang}.dailyRank.${k}`);
      assert.doesNotMatch(dict[k], /—/, `${lang}.dailyRank.${k} has an em dash`);
      for (const v of (en.dailyRank[k].match(/\{\{\w+\}\}/g) || [])) {
        if (k.endsWith('One') && v === '{{need}}') continue;
        // English writes the place as an ordinal ({{place}}: "2nd"); other languages use {{n}} ("Platz 2").
        if (v === '{{place}}') assert.ok(/\{\{(place|n)\}\}/.test(dict[k]), `${lang}.dailyRank.${k} keeps the place`);
        else assert.ok(dict[k].includes(v), `${lang}.dailyRank.${k} keeps ${v}`);
      }
    }
  }
});

// ── Chip link to stats ─────────────────────────────────────────────────────

test('chip link: every runner route maps to its own stats page, quizzes to none', () => {
  require.extensions['.css'] = (module) => { module.exports = {}; };
  const { rankStatsHref } = require('../components/DailyRank.tsx');
  const { ALL_EXAMS } = require('../lib/exams.ts');
  const { getExamRoutes } = require('../lib/examRoutes.ts');
  const { EXAMS_V2, v2Routes } = require('../lib/v2/registry.ts');
  const check = (path, want) => assert.equal(rankStatsHref(path.split('?')[0]), want, path);
  for (const e of ALL_EXAMS) {
    const r = getExamRoutes(e.id);
    check(r.test(e.idBase + 1), r.stats);
    check(r.training(1), r.stats);
    check(r.drill(), r.stats);
  }
  for (const e of EXAMS_V2) {
    const r = v2Routes(e);
    check(r.test(1), r.stats);
    check(r.drill(0), r.stats);
  }
  for (const p of ['/test/1', '/practice/2', '/training']) check(p, '/stats');
  assert.equal(rankStatsHref('/q/ABC123/test'), null);
  assert.equal(rankStatsHref('/'), null);
});

test('stats pages: every stats page opens with the rank panel', () => {
  for (const f of ['components/exam/ExamStatsPage.tsx', 'components/v2/StatsV2.tsx', 'app/stats/page.tsx']) {
    assert.match(read(f), /<DailyRankPanel continueHref=/, f);
  }
  assert.match(read('components/DailyRank.tsx'), /href=\{`\$\{href\}#today-rank`\}/);
});

test('test bar: no rank on practice tests; in training and drills the chip replaces the right slot', () => {
  // Practice tests and mocks should feel like the real exam.
  for (const f of ['components/exam/ExamTestPage.tsx', 'app/test/[id]/page.tsx', 'components/quiz/QuizTest.tsx']) {
    assert.doesNotMatch(read(f), /rank="/, `${f} must not show the rank chip`);
  }
  // Training and drills: the chip takes the place of "View stats" / the stats upsell.
  for (const f of ['components/exam/ExamTrainingPage.tsx', 'app/training/page.tsx', 'components/v2/DrillRunner.tsx']) {
    assert.match(read(f), /<FocusBar\s+rank="replace"/, f);
  }
  // Quiz practice and flashcards: beside the slot (Shuffle is a control, not a link).
  for (const f of ['components/quiz/QuizPractice.tsx', 'components/quiz/QuizFlashcards.tsx']) {
    assert.match(read(f), /<FocusBar\s+rank="beside"/, f);
  }
  const bar = read('components/FocusBar.tsx');
  assert.match(bar, /\{rank && <DailyRankChip \/>\}/, 'no rank prop, no chip');
  assert.match(bar, /rankShown && rank === "replace" \? null : right/);
  const chip = read('components/DailyRank.tsx');
  // The count is always shown (it moves with every right answer); the percent
  // joins it from 360px, and the word "correct" from sm up.
  assert.match(chip, /key=\{`c\$\{rank\.correct\}`\}/, 'the count pops on every change');
  assert.match(chip, /key=\{`p\$\{rank\.place \?\? rank\.topPercent\}`\}[^>]*min-\[360px\]:inline/, 'place or percent from 360px, popping when it changes');
  assert.match(chip, /<span className="hidden sm:inline">\{count\}<\/span>/, '"N correct" from sm up');
});

test('Tiger Time wiring: daily winner cron, heartbeat, email, account deletion', () => {
  const vercel = JSON.parse(read('vercel.json'));
  const cron = vercel.crons.find((c) => c.path === '/api/cron/tiger-time');
  assert.ok(cron, 'scheduled in vercel.json');
  assert.equal(cron.schedule, '15 5 * * *', 'just after midnight Eastern (05:15 UTC)');
  const route = read('app/api/cron/tiger-time/route.ts');
  assert.match(route, /globalStats\/tigerTime/, 'every run leaves a heartbeat');
  assert.match(route, /kind: 'transactional'/);
  assert.match(route, /idempotencyKey: `tiger-time-\$\{day\}`/, 'one email per day, even on a rerun');
  assert.match(route, /if \(!sent\.ok\) throw/, 'a failed send is never marked as sent');
  assert.match(route, /user\.unsubscribed === true/);
  assert.match(read('lib/server/ownerWatch.ts'), /id: "tiger-time"/, 'the watchdog reads it');
  assert.match(read('app/api/account/delete/route.ts'), /deleteWhere\(db, "tigerTimeWinners", "uid", uid\)/);
  assert.match(read('lib/server/dailyRankRequest.ts'), /const day = tigerDay\(\)/, 'the server uses Tiger Time, not the browser zone');
  assert.doesNotMatch(read('app/settings/page.tsx'), /Trophies/, 'no badge on the site; the email is the prize');
});

test('Tiger Time email: plain words, full links, no em dashes', () => {
  const { tigerTimeEmail, tigerTimeDate, tigerTimeSubject, TIGER_TIME_SUBJECT } = require('../lib/email-templates.ts');
  const { voiceFor } = require('../lib/email-voice.ts');
  assert.equal(tigerTimeDate('2026-11-24'), 'Tuesday, November 24');
  const html = tigerTimeEmail(voiceFor('cdl'), { firstName: 'Sam', correct: 1234, day: '2026-11-24' });
  assert.match(html, /Hi Sam,/);
  assert.match(html, /1,234 questions right on the first try/);
  assert.match(html, /Tuesday, November 24/);
  assert.match(html, /midnight Eastern time/);
  assert.match(html, /href="https:\/\/www\.tigertest\.io\//, 'full www links');
  assert.doesNotMatch(html + TIGER_TIME_SUBJECT, /\u2014/, 'no em dashes');
  // Visible text only: URLs, keys and markup may say tigertest.
  const text = html.replace(/<[^>]*>/g, ' ').replace(/https?:\/\/\S+/g, ' ');
  assert.doesNotMatch(text, /TigerTest|tigertest/, '"Tigertest" styled right');
  assert.match(text, /Tigertest/);
  assert.match(tigerTimeEmail(voiceFor(undefined), { firstName: null, correct: 12, day: '2026-11-24' }), /Hi there,/);
  // Every language: its own subject and copy, no em dashes, the right date format.
  const { TIGER_TIME_EMAIL_COPY } = require('../lib/tigerTimeEmailCopy.ts');
  for (const lang of Object.keys(TIGER_TIME_EMAIL_COPY)) {
    const h = tigerTimeEmail(voiceFor(undefined), { firstName: 'Sam', correct: 1234, day: '2026-11-24', lang });
    assert.doesNotMatch(h + tigerTimeSubject(lang), /\u2014/, `${lang}: no em dashes`);
    assert.match(h, /Tiger Time/, `${lang}: keeps the name`);
    if (lang !== 'en' && lang !== 'en-GB') assert.notEqual(tigerTimeSubject(lang), TIGER_TIME_SUBJECT, `${lang} is translated`);
  }
  assert.match(tigerTimeEmail(voiceFor(undefined), { firstName: 'Sam', correct: 1234, day: '2026-11-24', lang: 'de' }), /1\.234/);
  assert.match(read('app/api/cron/tiger-time/route.ts'), /subject: tigerTimeSubject\(lang\)/, 'the cron sends it in the winner\'s language');
});

test('next goal: the closest percentile step up, then first place', () => {
  // Made-up cutoffs: Top 1% at 68, 5% at 44, 10% at 34, 25% at 21, 50% at 11.
  const cutoffs = Array(100).fill(null);
  const steps = [[1, 68], [5, 44], [10, 34], [25, 21], [50, 11], [101, 0]];
  for (let i = 0; i < steps.length - 1; i++) for (let q = steps[i][0]; q < steps[i + 1][0]; q++) cutoffs[q - 1] = steps[i][1];
  const block = { kind: 'block', need: 3, people: 1000 };
  // Top 10% (42 is past 34, short of 44) aims at Top 5%: 2 more to 44.
  assert.deepEqual(R.nextGoal(cutoffs, 42, block), { kind: 'tier', p: 5, cutoff: 44, need: 2 });
  assert.deepEqual(R.nextGoal(cutoffs, 3, block), { kind: 'tier', p: 50, cutoff: 11, need: 8 }, 'bottom half aims at Top 50%');
  assert.deepEqual(R.nextGoal(cutoffs, 70, { kind: 'everyone', need: 4, people: 2 }), { kind: 'chase', need: 4 }, 'past every step: chase the leaders');
  assert.deepEqual(R.nextGoal(cutoffs, 301, { kind: 'top' }), { kind: 'first' });
  assert.equal(R.nextGoal(cutoffs, 0, null), null);
});

test('place: for everyone, ties share the better place, the next place up', () => {
  // Made-up: one person on 300, two on 299, ten on 250, then a long tail.
  const h = { 300: 1, 299: 2, 250: 10 };
  for (let c = 1; c < 250; c++) h[c] = 40;
  assert.equal(R.placeOf(h, 300), 1);
  assert.equal(R.placeOf(h, 299), 2, 'tied, sharing 2nd');
  assert.equal(R.placeOf(h, 250), 4);
  assert.deepEqual(R.nextPlaceUp(h, 250), { place: 2, need: 49 }, 'reaching 299 ties for 2nd');
  assert.deepEqual(R.nextPlaceUp(h, 299), { place: 1, need: 1 });
  assert.equal(R.nextPlaceUp(h, 300), null);
  const far = R.rankStatus('d', h, 100);
  // 150 counts (101..249) x 40 people + 13 at 250+ are ahead of 100 correct.
  assert.equal(far.place, 149 * 40 + 13 + 1, 'far down: still a place');
  assert.deepEqual(far.placeGoal, { place: 149 * 40 + 13 + 1 - 40, need: 1 }, 'the next place up');
  assert.equal(far.enterTop, null, 'no "Top 100" step any more');
  // Goals: next place up, tied first, first, and the way into the top 100.
  assert.deepEqual(R.nextGoal([], 250, { kind: 'block', need: 1, people: 1 }, 4, { place: 2, need: 49 }), { kind: 'place', place: 2, need: 49 });
  assert.deepEqual(R.nextGoal([], 300, { kind: 'everyone', need: 1, people: 1 }, 1, null), { kind: 'tiedFirst' });
  assert.deepEqual(R.nextGoal([], 301, { kind: 'top' }, 1, null), { kind: 'first' });
  assert.deepEqual(R.nextGoal(Array(100).fill(1), 100, { kind: 'block', need: 1, people: 1000 }, null, null, { need: 150 }), { kind: 'top100', need: 150 });
});

test('internal accounts count like anyone else; test browsers keep a local count', () => {
  const client = read('lib/dailyRankClient.ts');
  assert.match(client, /function localOnly\(\): boolean \{\s*return isTestBrowser\(\);/);
  assert.equal((client.match(/localOnly\(\)/g) || []).length, 4, 'definition + flush, refresh, merge');
  // The server no longer refuses internal accounts (it answered 0 and wiped their count).
  for (const f of ['app/api/rank/today/route.ts', 'app/api/rank/merge/route.ts', 'lib/server/dailyRankRequest.ts', 'app/api/cron/tiger-time/route.ts']) {
    assert.doesNotMatch(read(f), /internal\b(?! accounts)/i, `${f} has no internal exclusion`);
  }
  assert.match(read('app/api/cron/tiger-time/route.ts'), /pickCheckedWinner\(candidates\)/, 'no exclusion list passed');
});

test('Tiger Time cheat check: scripted days are passed over and John is told', () => {
  const t0 = '2026-11-24T10:00:00.000Z';
  const at = (min) => new Date(Date.parse(t0) + min * 60_000).toISOString();
  const day = (uid, correct, minutes, wrong = 5) => ({ uid, correct, firstAt: t0, reachedAt: at(minutes), wrong });
  assert.equal(R.suspiciousDay(day('a', 49, 1)), null, 'small days are never checked');
  assert.equal(R.suspiciousDay(day('a', 300, 60)), null, '5 a minute is fast but human');
  assert.equal(R.suspiciousDay(day('a', 700, 60)).reason, 'fast', 'over 6 a minute');
  assert.equal(R.suspiciousDay(day('a', 250, 120, 0)).reason, 'perfect', '200+ and none wrong');
  assert.equal(R.suspiciousDay({ uid: 'a', correct: 900, reachedAt: at(1), firstAt: null, wrong: 3 }), null, 'older days without firstAt are not timed');
  const { winner, flagged } = R.pickCheckedWinner([day('bot', 2000, 30), day('b', 400, 300), day('c', 100, 60)]);
  assert.equal(winner.uid, 'b', 'the next honest account wins');
  assert.deepEqual(flagged.map((f) => f.uid), ['bot']);
  assert.deepEqual(R.pickCheckedWinner([day('b', 400, 300), day('slow-bot', 60, 1)]).flagged, [], 'flags that change nothing are not reported');
  const server = read('lib/server/dailyRank.ts');
  assert.match(server, /firstAt: firstAt \?\? now\.toISOString\(\)/, 'the first answer time is kept');
  assert.match(server, /firstAtOf\(snap\)\)/, 'updates keep it');
  const route = read('app/api/cron/tiger-time/route.ts');
  assert.match(route, /notifyFlagged\(day, flags/);
  assert.match(route, /idempotencyKey: `tiger-time-flags-\$\{day\}`/);
});

test('Tiger Time cleanup: rank days past three are deleted by the cron', () => {
  const server = read('lib/server/dailyRank.ts');
  assert.match(server, /export async function deleteOldDays\(db: Firestore, today: string, keepDays = 3/);
  assert.match(server, /db\.recursiveDelete\(r\)/);
  assert.match(read('app/api/cron/tiger-time/route.ts'), /deleteOldDays\(db, tigerDay\(\)\)/);
});

test('site header: the trophy chip takes the stats icon\'s place once there is 1 correct today', () => {
  const header = read('components/SiteHeader.tsx');
  assert.match(header, /const rankChip = useRankChipVisible\(\);/);
  assert.match(header, /\{rankChip \? \(\s*<DailyRankChip compact href=\{statsPath \? `\$\{statsPath\}#today-rank` : null\} \/>\s*\) : statsPath && \(/);
  // Phones: the header chip is just the trophy and the count (1.2K past 999), so a
  // guest's home header (TESTS, TEACH, chip, Sign In) fits at 320px.
  const chip = read('components/DailyRank.tsx');
  assert.match(chip, /compact \? "sm:inline" : "min-\[360px\]:inline"/);
  assert.match(chip, /compact && rank\.correct >= 1000/);
  // The chip takes an explicit link (or none) where it is not on a runner path.
  assert.match(read('components/DailyRank.tsx'), /hrefOverride === undefined \? rankStatsHref\(pathname\) : hrefOverride/);
});

test('every place but first gets a nudge to keep prepping', () => {
  const panel = read('components/DailyRank.tsx');
  assert.match(panel, /rank\.place > 1 && \(/);
  assert.match(panel, /rank\.place <= RANK_NEAR_TOP \? "dailyRank\.encourageTop" : "dailyRank\.encourage"/);
  const { en } = require('../i18n/en.ts');
  assert.equal(en.dailyRank.encourage, 'Every correct answer moves you up. Keep prepping!');
});

test('English places read as ordinals with thousands separators', () => {
  assert.match(read('components/DailyRank.tsx'), /\$\{n\.toLocaleString\("en-US"\)\}\$\{suffix\[/);
  const suffix = { one: 'st', two: 'nd', few: 'rd', other: 'th' };
  const ord = (n) => `${n.toLocaleString('en-US')}${suffix[new Intl.PluralRules('en-US', { type: 'ordinal' }).select(n)]}`;
  assert.deepEqual([1, 2, 3, 11, 22, 235, 48189].map(ord), ['1st', '2nd', '3rd', '11th', '22nd', '235th', '48,189th']);
});

test('the end-of-session card is the stats panel design, with sign-in for guests', () => {
  const src = read('components/DailyRank.tsx');
  assert.match(src, /export function DailyRankCard\([^)]*\) \{\s*return <DailyRankPanel className=\{className\} guestSignIn anchor=\{false\} \/>;/);
  assert.match(src, /\{guestSignIn && !user && \(/);
  assert.match(src, /id=\{anchor \? "today-rank" : undefined\}/);
  // The header chip and the test-bar chip are told apart in stats traffic.
  assert.match(src, /noteStatsSource\(hrefOverride === undefined \? "bar_chip" : "header_chip"\)/);
});

test('the DMV upsell in the test bar wraps on phones instead of crushing the title', () => {
  for (const f of ['app/training/page.tsx', 'app/test/[id]/page.tsx']) {
    assert.match(read(f), /max-w-\[9\.5rem\] text-right text-sm font-medium leading-tight[^"]*sm:max-w-none/, f);
  }
});

// The stored form of finished tests must give back exactly what went in, for
// every bank and every kind of session an account can hold. Seeded, so a
// failure can be replayed.
require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readdirSync, readFileSync } = require('node:fs');
const { compactCompletedTests, expandCompletedTests, isSlimQuestion } = require('../lib/testHistoryCompact.ts');
const { shuffleQuestionOptions } = require('../lib/shuffleOptions.ts');

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const banks = readdirSync('data')
  .filter((f) => /questions(_[a-z]{2})?\.json$/.test(f))
  .map((f) => {
    const raw = JSON.parse(readFileSync(`data/${f}`, 'utf8'));
    const list = Array.isArray(raw) ? raw : raw.questions;
    return { file: f, list: Array.isArray(list) ? list.filter((q) => q && typeof q.questionId === 'string' && typeof q.optionA === 'string') : [] };
  })
  .filter((b) => b.list.length >= 20);

const roundTrip = (v) => JSON.parse(JSON.stringify(v));

function mutate(q, r) {
  const roll = r();
  if (roll < 0.03) return { ...q, explanation: `${q.explanation} (older wording)` };
  if (roll < 0.05) return { ...q, optionB: `${q.optionB} (reworded)` };
  if (roll < 0.07) { const { optionOrder: _o, ...rest } = q; return rest; }
  if (roll < 0.08) { const { correctIndex: _c, ...rest } = q; return rest; }
  if (roll < 0.09) return { ...q, correctAnswer: 'ABCD'[Math.floor(r() * 4)] };
  if (roll < 0.10) return { ...q, extraField: { nested: [1, 'two', null] } };
  if (roll < 0.11) return { ...q, explanation: '' };
  if (roll < 0.12) return { ...q, optionC: q.optionA }; // two options with one text
  if (roll < 0.13) return { questionId: q.questionId }; // only an id survived
  return q;
}

function history(seed) {
  const r = rng(seed);
  const pick = (arr) => arr[Math.floor(r() * arr.length)];
  const sessions = [];
  let at = 1_700_000_000_000 + seed * 1000;
  const groups = 1 + Math.floor(r() * 5);
  const plans = [];
  for (let g = 0; g < groups; g++) {
    const bank = pick(banks);
    const size = pick([20, 24, 30, 35, 40, 50, 60, 70]);
    const start = Math.floor(r() * Math.max(1, bank.list.length - size));
    plans.push({ bank, slice: bank.list.slice(start, start + size), testNumber: 1 + Math.floor(r() * 4) + g * 100, state: pick(['CA', 'TX', 'CDL', 'REALESTATE_CA', 'DETHEORIE']) });
  }
  const total = 2 + Math.floor(r() * 14);
  for (let i = 0; i < total; i++) {
    const plan = pick(plans);
    at += 1 + Math.floor(r() * 1e7);
    const legacy = r() < 0.2; // saved before option order was recorded
    const questions = plan.slice.map((q) => {
      let out = r() < 0.9 ? shuffleQuestionOptions(q) : { ...q };
      if (legacy) { const { optionOrder: _o, ...rest } = out; out = rest; }
      return mutate(out, r);
    });
    const session = {
      id: r() < 0.03 ? undefined : r() < 0.03 && sessions.length ? sessions[0].id : `test-${plan.testNumber}-${at}`,
      testNumber: plan.testNumber,
      state: plan.state,
      questions: r() < 0.03 ? [] : questions,
      answers: questions.map((q) => ({ questionId: q.questionId, userAnswer: pick(['A', 'B', 'C', 'D', '']), isCorrect: r() < 0.7, answeredAt: new Date(at).toISOString() })),
      startedAt: new Date(at - 5e5).toISOString(),
      completedAt: new Date(at).toISOString(),
      score: Math.floor(r() * questions.length),
      totalQuestions: questions.length,
    };
    if (session.id === undefined) delete session.id;
    sessions.push(roundTrip(session));
  }
  return sessions;
}

test(`finished tests survive storage exactly, across ${banks.length} banks`, () => {
  assert.ok(banks.length > 250, `only ${banks.length} banks found`);
  let slimmed = 0;
  for (let seed = 1; seed <= 1500; seed++) {
    const original = history(seed);
    const frozen = JSON.stringify(original);

    // browser saves, account loads
    const stored = roundTrip(compactCompletedTests(original));
    assert.equal(JSON.stringify(original), frozen, `seed ${seed}: the input was changed`);
    const loaded = expandCompletedTests(stored);
    assert.deepEqual(loaded, original, `seed ${seed}: first load`);
    slimmed += stored.reduce((n, s) => n + (Array.isArray(s.questions) ? s.questions.filter(isSlimQuestion).length : 0), 0);

    // sessions keep their place and everything but `questions` and `qref`
    assert.equal(stored.length, original.length);
    stored.forEach((s, i) => {
      const { questions: _q, qref: _r, ...rest } = s;
      const { questions: _q2, ...want } = original[i];
      assert.deepEqual(rest, want, `seed ${seed}: session ${i} fields`);
      assert.equal(Array.isArray(s.questions) ? s.questions.length : -1, Array.isArray(original[i].questions) ? original[i].questions.length : -1);
    });

    // a second device: load, finish another test, save, load
    const more = history(seed + 100000).slice(0, 2).map((s, i) => ({ ...s, id: `later-${seed}-${i}`, testNumber: original[0].testNumber, state: original[0].state }));
    const grown = [...loaded, ...more];
    const storedAgain = roundTrip(compactCompletedTests(grown));
    assert.deepEqual(expandCompletedTests(storedAgain), grown, `seed ${seed}: second device`);

    // the assistant appends to the stored array as it is, then the browser loads
    const viaAssistant = [...stored, ...more];
    assert.deepEqual(expandCompletedTests(roundTrip(viaAssistant)), grown, `seed ${seed}: assistant append`);

    // a browser still running the old code saves the stored form back untouched,
    // then a new browser loads it
    assert.deepEqual(expandCompletedTests(roundTrip(stored)), original, `seed ${seed}: old client pass-through`);

    // storing what is already stored changes nothing
    assert.deepEqual(roundTrip(compactCompletedTests(stored)), stored, `seed ${seed}: idempotent`);
  }
  assert.ok(slimmed > 100000, `the fuzz did exercise pointers (${slimmed})`);
});

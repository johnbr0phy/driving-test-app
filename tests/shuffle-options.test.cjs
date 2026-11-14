// Answer options are shuffled every time a question is shown (training,
// practice tests, quizzes), so the answer can never be guessed from its slot
// or from the question before. These tests run the shuffle over every v1
// bank, in every language, and check it never changes which answer is right.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');

const { shuffleQuestionOptions, hasPositionDependentAnswers } = require('../lib/shuffleOptions.ts');

const LETTERS = ['A', 'B', 'C', 'D'];
const dataDir = path.join(__dirname, '..', 'data');

function banks() {
  const out = [];
  for (const file of fs.readdirSync(dataDir)) {
    if (!file.endsWith('.json')) continue;
    let rows;
    try { rows = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8')); } catch { continue; }
    if (!Array.isArray(rows) || !rows.length || typeof rows[0].optionA !== 'string') continue;
    out.push({ file, rows });
  }
  return out;
}

test('shuffling never changes the right answer, in any bank', () => {
  let checked = 0;
  for (const { file, rows } of banks()) {
    for (const q of rows) {
      const rightText = q[`option${q.correctAnswer}`];
      const texts = LETTERS.map((l) => q[`option${l}`]);
      assert.equal(new Set(texts).size, 4, `${file} ${q.questionId}: options must differ, or the key cannot be followed`);
      for (let i = 0; i < 3; i++) {
        const s = shuffleQuestionOptions(q);
        const where = `${file} ${q.questionId}`;
        assert.equal(s[`option${s.correctAnswer}`], rightText, `${where}: key moved off the right answer`);
        assert.equal(s.correctIndex ?? LETTERS.indexOf(s.correctAnswer), LETTERS.indexOf(s.correctAnswer), where);
        assert.deepEqual(LETTERS.map((l) => s[`option${l}`]).sort(), [...texts].sort(), `${where}: an option was lost`);
        // optionOrder names the bank letter shown in each slot.
        assert.match(s.optionOrder, /^[ABCD]{4}$/, where);
        LETTERS.forEach((l, slot) => assert.equal(s[`option${l}`], q[`option${s.optionOrder[slot]}`], where));
      }
      checked++;
    }
  }
  assert.ok(checked > 50000, `only ${checked} questions checked`);
});

test('an option that names other options keeps the bank order', () => {
  const q = (optionD, rest = ['Red', 'Green', 'Blue']) => ({
    questionId: 'T-1', optionA: rest[0], optionB: rest[1], optionC: rest[2], optionD, correctAnswer: 'D', correctIndex: 3,
  });
  const fixed = [
    'All of the above', 'None of the above', 'Both A and B', 'A and C', 'All these choices are correct', 'All these answers are correct',
    'Any of these', 'None of these', 'Both of these',
    // The same options in the other DMV languages.
    'Todas las anteriores', 'Ninguna de las anteriores', 'A y B', 'Tanto A como B', 'Cualquiera de estas',
    'Tất cả các câu trên', 'Cả A và B', 'Bất kỳ điều nào trong số này',
    '위의 모든 것', 'A와 B', '이 중 어느 것이든',
    '以上都对', '以上任何一种', 'A和B',
    // And in the languages of the native and translated exams.
    'Alle Antworten sind richtig', 'A und B', 'Toutes les réponses', 'A et B', 'Alle bovenstaande', 'A en B',
    'Todas as anteriores', 'Tutte le precedenti', 'Alla ovanstående', 'A och B', 'Alle ovenstående', 'A og B',
    'Kaikki edellä mainitut', 'A ja B', 'A fentiek mindegyike', 'A és B', 'Toate cele de mai sus', 'A și B', 'Όλα τα παραπάνω',
  ];
  for (const last of fixed) {
    assert.ok(hasPositionDependentAnswers(q(last)), last);
    for (let i = 0; i < 20; i++) assert.equal(shuffleQuestionOptions(q(last)).optionOrder, 'ABCD', last);
  }
  // Options that are the letters themselves (suspects A, B, C and D).
  assert.ok(hasPositionDependentAnswers(q('D', ['A', 'B', 'C'])));
  // Ordinary answers that only look similar are still shuffled.
  for (const plain of ['Both hands on the wheel', 'All four wheels', 'Neither of them', 'Class A', 'Above 60 mph', 'Any of these roads', 'En su mitad de la vía o a un carril de ella', 'Từ nóc và a cửa sổ', 'Vitamins A, D, E and K']) {
    assert.ok(!hasPositionDependentAnswers(q(plain)), plain);
  }
});

test('a translated question is held in order exactly when its original is', () => {
  // The banks share ids, so the same question must behave the same way in
  // every language: a missed wording here would shuffle "all of the above"
  // in one language only.
  const all = banks();
  let compared = 0;
  for (const { file, rows } of all) {
    const m = file.match(/^(.*)_([a-z]{2})\.json$/);
    if (!m) continue;
    const base = all.find((b) => b.file === `${m[1]}.json`);
    if (!base) continue;
    const byId = new Map(base.rows.map((q) => [q.questionId, q]));
    for (const q of rows) {
      const original = byId.get(q.questionId);
      if (!original) continue;
      assert.equal(hasPositionDependentAnswers(q), hasPositionDependentAnswers(original), `${file} ${q.questionId}: ${LETTERS.map((l) => q[`option${l}`]).join(' / ')}`);
      compared++;
    }
  }
  assert.ok(compared > 10000, `only ${compared} translated questions compared`);
});

test('training shuffles every question, not only missed ones', () => {
  const read = (f) => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
  for (const f of ['app/training/page.tsx', 'components/exam/ExamTrainingPage.tsx', 'components/quiz/QuizPractice.tsx']) {
    const src = read(f);
    assert.ok(src.includes('shuffleQuestionOptions('), f);
    assert.ok(!/wrongQueue\.includes\([^)]*\)\s*\)?\s*(\{|\?)\s*[^;]*shuffleQuestionOptions/.test(src), `${f}: shuffle must not depend on the wrong queue`);
  }
});

test('a run of shuffled questions has no A, B, C, D rotation', () => {
  const { rows } = banks().find((b) => b.file === 'questions.json');
  const keys = rows.filter((q) => !hasPositionDependentAnswers(q)).slice(0, 2000).map((q) => shuffleQuestionOptions(q).correctAnswer);
  let inRotation = 0;
  for (let i = 1; i < keys.length; i++) if (LETTERS[(LETTERS.indexOf(keys[i - 1]) + 1) % 4] === keys[i]) inRotation++;
  const share = inRotation / (keys.length - 1);
  assert.ok(share > 0.2 && share < 0.3, `next-letter share ${share.toFixed(3)} should be near 0.25`);
});

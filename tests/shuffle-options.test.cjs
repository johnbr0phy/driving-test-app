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
  for (const last of ['All of the above', 'None of the above', 'Both A and B', 'A and C', 'All these choices are correct', 'All these answers are correct', 'Todas las anteriores']) {
    assert.ok(hasPositionDependentAnswers(q(last)), last);
    for (let i = 0; i < 20; i++) assert.equal(shuffleQuestionOptions(q(last)).optionOrder, 'ABCD', last);
  }
  // Options that are the letters themselves (suspects A, B, C and D).
  assert.ok(hasPositionDependentAnswers(q('D', ['A', 'B', 'C'])));
  // Ordinary answers that only look similar are still shuffled.
  for (const plain of ['Both hands on the wheel', 'All four wheels', 'Neither of them', 'Class A', 'Above 60 mph']) {
    assert.ok(!hasPositionDependentAnswers(q(plain)), plain);
  }
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

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
require('tsx/cjs');

require('../lib/banks/realEstateStates.ts');
require('../lib/banks/lifeHealthStates.ts');
require('../lib/banks/propertyCasualtyStates.ts');
const { EXAM_VARIANTS, examTestLength } = require('../lib/exams.ts');
const { getExamQuestions } = require('../lib/examData.ts');
const { examTestQuestions } = require('../lib/examTestGenerator.ts');

const ids = (questions) => questions.map((q) => q.questionId);
const spread = (counts) => Math.max(...counts) - Math.min(...counts);

// CA and NJ real estate use the reviewed handoff's RE-CA-/RE-NJ- IDs for local
// content. Other state forms retain the built question's ID as its local source.
function stateItem(q, state) {
  return q.sourceQuestionId === q.questionId || q.sourceQuestionId.startsWith(`RE-${state}-`);
}

test('short state tests cover the approved full-length form exactly once, with a mix of general and state law', () => {
  for (const exam of EXAM_VARIANTS) {
    if (!['realestate', 'insurance', 'pnc'].includes(exam.variantOf)) continue;
    const bank = getExamQuestions(exam.id);
    const full = examTestQuestions(exam, 1);
    assert.deepEqual(ids(full).sort(), ids(bank).sort(), `${exam.id}: full-length test 1`);
    assert.equal(examTestLength(exam, 1), full.length, exam.id);

    const forms = [2, 3, 4].map((n) => {
      const questions = examTestQuestions(exam, n);
      assert.equal(questions.length, examTestLength(exam, n), `${exam.id} test ${n} length`);
      assert.deepEqual(ids(questions), ids(examTestQuestions(exam, n)), `${exam.id} test ${n} fixed membership`);
      return questions;
    });
    assert.deepEqual(ids(forms.flat()).sort(), ids(full).sort(), `${exam.id}: short tests partition the full form`);
    assert.ok(spread(forms.map((form) => form.length)) <= 1, `${exam.id}: short test lengths`);

    const stateCounts = forms.map((form) => form.filter((q) => stateItem(q, exam.jurisdiction.code)).length);
    assert.ok(stateCounts.every((n, i) => n > 0 && n < forms[i].length), `${exam.id}: national and local questions in every form`);
    assert.ok(spread(stateCounts) <= 1, `${exam.id}: local question counts ${stateCounts}`);
    for (const category of Object.keys(exam.blueprint)) {
      for (const local of [true, false]) {
        const counts = forms.map((form) => form.filter((q) =>
          q.category === category && stateItem(q, exam.jurisdiction.code) === local).length);
        assert.ok(spread(counts) <= 1, `${exam.id}: ${category}, local=${local}, counts=${counts}`);
      }
    }
  }
});

test('the full state exams and their short forms pass the bank answer-cue limits', () => {
  const pools = [];
  for (const exam of EXAM_VARIANTS.filter((e) => e.statePracticeCount)) {
    for (let n = 1; n <= exam.testCount + exam.statePracticeCount; n++) {
      const items = examTestQuestions(exam, n).map((q) => [
        q.questionId, q.category, [q.optionA, q.optionB, q.optionC, q.optionD], q.correctIndex, q.question,
      ]);
      pools.push([`${exam.id} /test/${n}`, items]);
    }
  }
  // Use the same scorers as the whole-bank checks, including for the 25-item forms.
  const check = spawnSync('python3', ['-I', '-c', `
import json, sys
sys.path.insert(0, sys.argv[1])
from check_length_rank import LIMIT, rank_scores
from check_option_reuse import ECHO_LIMIT, analyse
failures = []
for name, items in json.load(sys.stdin):
    rank = max(rank_scores([(opts, key) for _, _, opts, key, _ in items]))
    echo = analyse(items)
    gain = max(echo["echo_gain"], echo["anti_echo_gain"])
    if rank > LIMIT + 1e-9 or gain >= ECHO_LIMIT - 1e-9:
        failures.append(f"{name}: best answer-length rank {rank:.2%}, echo gain {gain:.2f} per 50")
if failures:
    sys.exit("\\n".join(failures))
`, path.resolve(__dirname, '../tools')], { input: JSON.stringify(pools), encoding: 'utf8' });
  if (check.error) throw check.error;
  assert.equal(check.status, 0, check.stderr);
});

test('state bank snapshots include the reviewed source corrections', () => {
  for (const family of ['realestate', 'insurance', 'pnc']) {
    const check = spawnSync('python3', ['-I', 'tools/apply_bank_corrections.py', family, '--check'], {
      cwd: path.resolve(__dirname, '..'), encoding: 'utf8',
    });
    if (check.error) throw check.error;
    assert.equal(check.status, 0, `${family}\n${check.stdout}${check.stderr}`);
  }
});

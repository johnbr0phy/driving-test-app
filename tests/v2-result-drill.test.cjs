require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { AWS } = require('../lib/v2/exams/aws.ts');
const { getBank, getQuestionIndex } = require('../lib/v2/bank.ts');
const { createSession, scoreSession } = require('../lib/v2/session.ts');
const { drillForResultDomain, drillQuestions } = require('../lib/v2/training.ts');
require('../lib/v2/banks/aws.ts');

const bank = getBank('aws').questions;
const byId = getQuestionIndex('aws');

function resultMissing(ids) {
  const session = createSession(AWS, bank, 2);
  for (const stage of session.stages) {
    for (const id of stage.questionIds) {
      const question = byId.get(id);
      stage.answers[id] = ids.includes(id)
        ? [(question.correct[0] + 1) % question.options.length]
        : question.correct;
    }
  }
  return scoreSession(AWS, session, byId);
}

test('held-out results recommend the split topic covering actual misses', () => {
  const result = resultMissing(['AWS-T2-065']); // S3 storage classes
  assert.deepEqual(result.items.filter(item => !item.correct).map(item => item.id), ['AWS-T2-065']);
  const recommended = drillForResultDomain(AWS, 'aws', 'technologyServices', result.items, byId);
  assert.equal(recommended.key, 'data-services');
  assert.ok(drillQuestions(bank, recommended, AWS).every(q => q.test !== 2));

  const mixed = resultMissing(['AWS-T2-065', 'AWS-T2-001', 'AWS-T2-005']);
  assert.equal(drillForResultDomain(AWS, 'aws', 'technologyServices', mixed.items, byId).key, 'infrastructure');
});

test('split domains without identifiable misses do not pick an arbitrary drill', () => {
  const perfect = resultMissing([]);
  assert.equal(drillForResultDomain(AWS, 'aws', 'technologyServices', perfect.items, byId), undefined);
  const missing = resultMissing(['AWS-T2-065']);
  assert.equal(drillForResultDomain(AWS, 'aws', 'technologyServices', missing.items, new Map()), undefined);
});

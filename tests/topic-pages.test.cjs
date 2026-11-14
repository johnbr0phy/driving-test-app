// Topic question pages (lib/topicPages.ts): every listed exam exists, and
// every topic has its own URL and questions to show.
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');
require('../lib/banks/all.ts');

const { getExamQuestions } = require('../lib/examData.ts');
const { TOPIC_EXAM_IDS, MOST_MISSED_SLUG, topicExams, examTopics, topicPath, topicExamBySlug, topicExamSlug } = require('../lib/topicPages.ts');

test('every topic exam is a real v1 exam with a URL slug that finds it', () => {
  const exams = topicExams();
  assert.equal(exams.length, TOPIC_EXAM_IDS.length);
  for (const exam of exams) assert.equal(topicExamBySlug(topicExamSlug(exam)).id, exam.id);
});

test('every topic has a unique path and at least five questions in the bank', () => {
  const paths = new Set();
  for (const exam of topicExams()) {
    const topics = examTopics(exam);
    assert.ok(topics.length >= 3, exam.id);
    const bank = getExamQuestions(exam.id);
    for (const t of topics) {
      const path = topicPath(exam, t);
      assert.ok(!paths.has(path), path);
      paths.add(path);
      assert.notEqual(t.slug, MOST_MISSED_SLUG);
      assert.ok(bank.filter((q) => q.category === t.key).length >= 5, path);
    }
  }
});

test('each CDL endorsement has its own titled page, linked from the CDL landing', () => {
  const { TOPIC_ALSO } = require('../lib/topicPages.ts');
  const cdlx = topicExams().find((e) => e.id === 'cdlx');
  const topics = examTopics(cdlx);
  assert.equal(topics.length, 5);
  for (const t of topics) assert.match(t.title, /^CDL .+ Practice Test$/);
  assert.ok(topics.some((t) => /HazMat/.test(t.title)) && topics.some((t) => /Tanker/.test(t.title)));
  for (const ids of Object.values(TOPIC_ALSO)) for (const id of ids) assert.ok(TOPIC_EXAM_IDS.includes(id), id);
  assert.deepEqual(TOPIC_ALSO.cdl, ['cdlx']);
});

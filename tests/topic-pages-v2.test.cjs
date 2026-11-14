// v2 topic question pages (lib/v2/topicPages.ts): every listed exam exists,
// its slug never collides with a v1 topic exam, every topic has its own URL
// and at least five printable questions, none from a held-out test.
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');

const { topicExamsV2, examTopicsV2, topicPathV2, topicExamBySlugV2, topicExamSlugV2, TOPIC_V2_EXAM_IDS } = require('../lib/v2/topicPages.ts');
const { topicQuestionsV2 } = require('../lib/v2/printable.ts');
const { heldOutTests } = require('../lib/v2/training.ts');
const { topicExams, topicExamSlug } = require('../lib/topicPages.ts');

for (const id of TOPIC_V2_EXAM_IDS) require(`../lib/v2/banks/${id}.ts`);

test('every v2 topic exam is real and its slug finds it, never a v1 topic exam', () => {
  const exams = topicExamsV2();
  assert.equal(exams.length, TOPIC_V2_EXAM_IDS.length);
  const v1 = new Set(topicExams().map(topicExamSlug));
  for (const exam of exams) {
    assert.equal(topicExamBySlugV2(topicExamSlugV2(exam)).id, exam.id);
    assert.ok(!v1.has(topicExamSlugV2(exam)), exam.id);
  }
});

test('every v2 topic has a unique path and printable questions', () => {
  const paths = new Set();
  for (const exam of topicExamsV2()) {
    const heldOut = heldOutTests(exam);
    for (const t of examTopicsV2(exam)) {
      const path = topicPathV2(exam, t);
      assert.ok(!paths.has(path), path);
      paths.add(path);
      const qs = topicQuestionsV2(exam.id, t);
      assert.ok(qs.length >= 5, `${path} has ${qs.length}`);
      assert.equal(new Set(qs.map((q) => q.id)).size, qs.length, path);
      for (const q of qs) assert.ok(!heldOut.includes(q.test), `${path} shows held-out ${q.id}`);
    }
  }
});

test('the ASVAB has a page for each of its eight subtests and the AFQT', () => {
  const asvab = topicExamsV2().find((e) => e.id === 'asvab');
  const slugs = examTopicsV2(asvab).map((t) => t.slug);
  for (const s of ['afqt', 'arithmetic-reasoning', 'word-knowledge', 'paragraph-comprehension', 'math-knowledge', 'general-science', 'electronics', 'auto-and-shop', 'mechanical-comprehension'])
    assert.ok(slugs.includes(s), s);
  const afqt = topicQuestionsV2('asvab', examTopicsV2(asvab).find((t) => t.slug === 'afqt'));
  assert.equal(new Set(afqt.map((q) => q.domain)).size, 4);
});

test('every subtest link on the ASVAB landing is a real topic page', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const src = fs.readFileSync(path.join(__dirname, '..', 'app', 'asvab-practice-test', 'page.tsx'), 'utf8');
  const asvab = topicExamsV2().find((e) => e.id === 'asvab');
  const paths = new Set(examTopicsV2(asvab).map((t) => topicPathV2(asvab, t)));
  const links = src.match(/\/questions\/asvab\/[a-z-]+/g) || [];
  assert.ok(links.length >= 9);
  for (const l of links) assert.ok(paths.has(l), l);
});

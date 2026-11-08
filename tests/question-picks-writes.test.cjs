// questionPicks/{examId} writes stay under Firestore's 500 field transforms
// per document, without losing or splitting any question's counts.
require('tsx/cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { sumPicks, pickUpdateChunks, transformCount, MAX_TRANSFORMS_PER_WRITE } = require('../lib/server/questionPickWrites.ts');

// Stand-in for FieldValue.increment, so the test can count and add them up.
const inc = (x) => ({ __inc: x });
const countIncs = (v) =>
  v && typeof v === 'object' ? ('__inc' in v ? 1 : Object.values(v).reduce((a, x) => a + countIncs(x), 0)) : 0;

// Apply each chunk as a merge, adding increments, like Firestore would.
function applyAll(chunks) {
  const doc = {};
  const merge = (into, from) => {
    for (const [k, v] of Object.entries(from)) {
      if (v && typeof v === 'object' && '__inc' in v) into[k] = (into[k] || 0) + v.__inc;
      else merge((into[k] ??= {}), v);
    }
  };
  for (const c of chunks) merge(doc, c);
  return doc;
}

// A full 200-item batch: every question different, strong browser, wrong pick,
// so each question carries n, w.{i}, s and sw.{i} = 4 increments (800 total).
const bigBatch = Array.from({ length: 200 }, (_, i) => ({ q: `Q${String(i).padStart(4, '0')}`, p: i % 4, ok: false, s: true }));

test('a batch needing more than 500 increments is split into writes under the limit', () => {
  const sums = sumPicks(bigBatch);
  const total = Object.values(sums).reduce((a, q) => a + transformCount(q), 0);
  assert.ok(total > 500, `fixture should exceed the limit, got ${total}`);

  const chunks = pickUpdateChunks(sums, inc);
  assert.ok(chunks.length > 1);
  for (const c of chunks) {
    const n = countIncs(c);
    assert.ok(n <= MAX_TRANSFORMS_PER_WRITE && n <= 500, `chunk has ${n} increments`);
  }
  assert.equal(chunks.reduce((a, c) => a + countIncs(c), 0), total);
});

test('no counts are lost and each question stays in one write', () => {
  const items = [...bigBatch, { q: 'Q0001', p: 2, ok: true, s: false }, { q: 'Q0001', p: -1, ok: false, s: true }];
  const sums = sumPicks(items);
  const chunks = pickUpdateChunks(sums, inc);

  const seen = new Set();
  for (const c of chunks) for (const qid of Object.keys(c)) {
    assert.equal(seen.has(qid), false, `${qid} split across writes`);
    seen.add(qid);
  }
  assert.equal(seen.size, 200);

  const doc = applyAll(chunks);
  assert.deepEqual(doc.Q0001, { n: 3, c: 1, w: { 1: 1 }, s: 2, sw: { 1: 1 } });
  assert.deepEqual(doc.Q0002, { n: 1, w: { 2: 1 }, s: 1, sw: { 2: 1 } });
  const answers = Object.values(doc).reduce((a, q) => a + q.n, 0);
  assert.equal(answers, items.length);
});

test('a small batch is still one write with the same shape as before', () => {
  const chunks = pickUpdateChunks(
    sumPicks([
      { q: 'A1', p: 0, ok: true, s: false },
      { q: 'A1', p: 3, ok: false, s: false },
    ]),
    inc,
  );
  assert.equal(chunks.length, 1);
  assert.deepEqual(applyAll(chunks), { A1: { n: 2, c: 1, w: { 3: 1 } } });
});

test('the route writes through the chunker', () => {
  const src = fs.readFileSync(path.join(__dirname, '../app/api/analytics/question-picks/route.ts'), 'utf8');
  assert.match(src, /pickUpdateChunks\(/);
  assert.match(src, /for \(const update of chunks\)/);
});

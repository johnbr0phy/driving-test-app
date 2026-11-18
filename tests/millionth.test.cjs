// Pins who wins the 1,000,000th question (lib/server/millionth.ts).
require('tsx/cjs');
const test = require('node:test');
const assert = require('node:assert/strict');

function fakeDb(docs) {
  const ref = (path) => ({ path });
  return {
    doc: ref,
    docs,
    async runTransaction(fn) {
      const writes = [];
      const tx = {
        async get(r) { const d = docs[r.path]; return { data: () => (d ? JSON.parse(JSON.stringify(d)) : undefined) }; },
        set(r, value, opts) { writes.push([r.path, value, opts]); },
      };
      const out = await fn(tx);
      for (const [path, value, opts] of writes) docs[path] = opts?.merge ? { ...(docs[path] || {}), ...value } : value;
      return out;
    },
  };
}

function freshModule() {
  const id = require.resolve('../lib/server/millionth.ts');
  delete require.cache[id];
  return require('../lib/server/millionth.ts');
}

test('seeds from the daily sum, skips guests and internal batches, crowns the first signed-in one, then stops', async () => {
  const { advanceMillionth, MILLIONTH_TARGET, MILLIONTH_DOC } = freshModule();
  // The daily sum already holds the first batch (the counter is bumped first).
  const db = fakeDb({ 'analytics/questions': { daily: { '2026-11-17': MILLIONTH_TARGET - 100, '2026-11-18': 50 } } });
  assert.equal(await advanceMillionth(db, { count: 50, uid: 'early', internal: false }), null);
  assert.equal(db.docs[MILLIONTH_DOC].count, MILLIONTH_TARGET - 50);
  // A guest crosses the line: nobody wins yet.
  assert.equal(await advanceMillionth(db, { count: 60, uid: null, internal: false }), null);
  assert.equal(db.docs[MILLIONTH_DOC].pending, true);
  // An internal account cannot win either.
  assert.equal(await advanceMillionth(db, { count: 1, uid: 'staff', internal: true }), null);
  const winner = await advanceMillionth(db, { count: 3, uid: 'learner', internal: false });
  assert.equal(winner.uid, 'learner');
  assert.equal(await advanceMillionth(db, { count: 3, uid: 'later', internal: false }), null);
  assert.equal(db.docs[MILLIONTH_DOC].winner.uid, 'learner');
});

test('the exact crossing batch wins when signed in, and an already-passed count crowns nobody', async () => {
  let m = freshModule();
  let db = fakeDb({ 'analytics/questions': { daily: { a: m.MILLIONTH_TARGET - 10 } } });
  await m.advanceMillionth(db, { count: 5, uid: 'u1', internal: false });
  const w = await m.advanceMillionth(db, { count: 20, uid: 'u2', internal: false });
  assert.equal(w.uid, 'u2');
  assert.equal(w.count, m.MILLIONTH_TARGET + 10);

  m = freshModule();
  db = fakeDb({ 'analytics/questions': { daily: { a: m.MILLIONTH_TARGET + 5 } } });
  assert.equal(await m.advanceMillionth(db, { count: 5, uid: 'u3', internal: false }), null);
  assert.equal(db.docs[m.MILLIONTH_DOC].missed, true);
});

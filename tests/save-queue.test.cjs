require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createSaveQueue } = require('../lib/saveQueue.ts');

const tick = (ms = 0) => new Promise((r) => setTimeout(r, ms));

test('saves never overlap and the newest snapshot is the last one written', async () => {
  const written = [];
  let running = 0;
  let overlapped = false;
  const queue = createSaveQueue(async (n) => {
    running++;
    if (running > 1) overlapped = true;
    await tick(written.length === 0 ? 30 : 5); // the first save is the slow one
    written.push(n);
    running--;
  });
  const first = queue.push(1);
  await tick(1);
  for (let n = 2; n <= 20; n++) queue.push(n); // twenty answers while the first save runs
  const last = queue.push(21);
  await Promise.all([first, last]);
  assert.equal(overlapped, false);
  assert.deepEqual(written, [1, 21], 'the answers in between ride in one save of the newest state');
});

test('a push resolves only after a save that includes it', async () => {
  const written = [];
  const queue = createSaveQueue(async (n) => {
    await tick(10);
    written.push(n);
  });
  queue.push('a');
  await tick(1);
  await queue.push('b');
  assert.deepEqual(written, ['a', 'b']);
});

test('a failed save does not stop the next one', async () => {
  const written = [];
  const queue = createSaveQueue(async (n) => {
    if (n === 'bad') throw new Error('offline');
    written.push(n);
  });
  const quiet = console.error;
  console.error = () => {};
  await queue.push('bad');
  console.error = quiet;
  await queue.push('good');
  await queue.idle();
  assert.deepEqual(written, ['good']);
});

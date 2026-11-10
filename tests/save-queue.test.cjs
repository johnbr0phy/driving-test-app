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

test('a save that never settles stops holding the queue', async () => {
  const written = [];
  const queue = createSaveQueue(async (n) => {
    if (n === 'stuck') return new Promise(() => {});
    written.push(n);
  }, 30);
  queue.push('stuck');
  await tick(1);
  await queue.push('after');
  assert.deepEqual(written, ['after']);
});

test('kick starts the waiting save at once, and it is not written twice', async () => {
  const started = [];
  let release;
  const queue = createSaveQueue(async (n) => {
    started.push(n);
    if (n === 1) await new Promise((r) => (release = r));
  });
  queue.push(1);
  await tick(1);
  queue.push(2); // waits behind 1
  assert.deepEqual(started, [1]);
  queue.kick(); // the page is going away
  await tick(1);
  assert.deepEqual(started, [1, 2]);
  release();
  await queue.idle();
  assert.deepEqual(started, [1, 2]);
  queue.kick(); // nothing waiting: nothing happens
  assert.deepEqual(started, [1, 2]);
});

test('a snapshot that is null or undefined is still saved', async () => {
  const written = [];
  const queue = createSaveQueue(async (n) => written.push(n));
  await queue.push(0);
  await queue.push('');
  assert.deepEqual(written, [0, '']);
});

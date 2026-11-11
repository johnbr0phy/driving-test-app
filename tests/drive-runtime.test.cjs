// Drive the Question: the pure runtime (state machine, motion, randomness).
const test = require('node:test');
const assert = require('node:assert/strict');
require('tsx/cjs');

const { createRng, hashSeed } = require('../src/drive/runtime/rng.js');
const { drive, track } = require('../src/drive/runtime/motion.js');
const { buildScript, createMachine, listBranches, SLOW_WINDOW, SLOW_SCALE } = require('../src/drive/runtime/machine.js');

const record = {
  rule: 'demo',
  questionId: 'T-1',
  state: 'ALL',
  decisions: [
    { id: 'a', prompt: 'A?', correctAction: { id: 'yes', label: 'Yes' }, wrongActions: [{ id: 'no', label: 'No', consequence: 'x' }] },
    {
      id: 'b',
      prompt: 'B?',
      correctAction: { id: 'go', label: 'Go' },
      wrongActions: [{ id: 'wait', label: 'Wait', consequence: 'y' }, { id: 'turn', label: 'Turn', consequence: 'z' }],
    },
  ],
};
const plan = {
  intro: { duration: 2, caption: 'intro' },
  decisions: {
    a: { yes: { duration: 3, caption: 'yes', cues: [{ at: 1, id: 'horn' }] }, no: { duration: 1, caption: 'no' } },
    b: { go: { duration: 1, caption: 'go' }, wait: { duration: 1, caption: 'wait' }, turn: { duration: 1, caption: 'turn' } },
  },
};

function run(machine, seconds, step = 1 / 60) {
  const events = [];
  for (let t = 0; t < seconds; t += step) events.push(...machine.advance(step));
  return events;
}

test('the same seed gives the same numbers', () => {
  const a = createRng('no-passing-zone:U-012:ALL');
  const b = createRng('no-passing-zone:U-012:ALL');
  assert.deepEqual([a.next(), a.next(), a.int(0, 9)], [b.next(), b.next(), b.int(0, 9)]);
  assert.notEqual(hashSeed('a'), hashSeed('b'));
  assert.deepEqual(createRng(7).shuffle([1, 2, 3, 4]), createRng(7).shuffle([1, 2, 3, 4]));
});

test('drive integrates a speed profile and track eases between keys', () => {
  const car = drive(10, [[0, 10], [2, 10], [4, 0]]);
  assert.equal(car.s(2), 30);
  assert.equal(car.s(4), 40);
  assert.equal(car.s(9), 40);
  assert.equal(car.v(3), 5);
  const x = track([[1, 0], [2, 4]]);
  assert.equal(x(0), 0);
  assert.equal(x(1.5), 2);
  assert.equal(x(5), 4);
});

test('a script has one branch per path and a stable option order', () => {
  const script = buildScript(record, plan);
  assert.deepEqual(buildScript(record, plan).decisions.b.options.map((o) => o.id), script.decisions.b.options.map((o) => o.id));
  const branches = listBranches(script);
  assert.equal(branches.length, 4); // no | yes+go | yes+wait | yes+turn
  assert.equal(branches.filter((b) => b.ok).length, 1);
  assert.equal(branches.find((b) => b.ok).duration, 6);
});

test('a plan missing an option is an error, not a silent hole', () => {
  assert.throws(() => buildScript(record, { ...plan, decisions: { ...plan.decisions, b: { go: { duration: 1 } } } }), /No plan for option b\./);
});

test('time slows before a decision, then waits for the choice', () => {
  const machine = createMachine(buildScript(record, plan));
  machine.start();
  const events = run(machine, 2 - SLOW_WINDOW + 0.2);
  assert.equal(machine.state.phase, 'decide');
  assert.ok(events.some((e) => e.type === 'decision' && e.id === 'a'));
  // 0.2 s of real time inside the window moved the scene only 0.2 * SLOW_SCALE.
  assert.ok(Math.abs(machine.state.t - (2 - SLOW_WINDOW + 0.2 * SLOW_SCALE)) < 0.03);
  run(machine, 30);
  assert.equal(machine.state.phase, 'decide', 'frozen until a choice');
  assert.equal(machine.state.t, 2);
});

test('the right choices reach the ok result and fire cues once', () => {
  const machine = createMachine(buildScript(record, plan));
  machine.start();
  run(machine, 10);
  assert.equal(machine.choose('nope'), null);
  assert.ok(machine.choose('yes'));
  assert.equal(machine.choose('no'), null, 'one choice per decision');
  const events = run(machine, 30);
  assert.equal(events.filter((e) => e.type === 'cue' && e.id === 'horn').length, 1);
  assert.equal(machine.state.decisionId, 'b');
  machine.choose('go');
  const end = run(machine, 5);
  assert.deepEqual(end.find((e) => e.type === 'result'), { type: 'result', ok: true, decisionId: 'b', optionId: 'go' });
  assert.equal(machine.state.phase, 'result');
  assert.deepEqual(machine.advance(1), []);
});

test('a wrong choice ends the scene with that option', () => {
  const machine = createMachine(buildScript(record, plan));
  machine.start();
  run(machine, 10);
  machine.choose('no');
  run(machine, 5);
  assert.deepEqual(machine.state.result, { ok: false, decisionId: 'a', optionId: 'no' });
});

test('a choice made inside the slow window still plays the segment out', () => {
  const machine = createMachine(buildScript(record, plan));
  machine.start();
  run(machine, 2 - SLOW_WINDOW + 0.1);
  machine.choose('no');
  const events = run(machine, 1);
  assert.ok(events.some((e) => e.type === 'segment' && e.id === 'a:no'));
});

test('reduced motion jumps from still to still', () => {
  const machine = createMachine(buildScript(record, plan), { reducedMotion: true });
  const started = machine.start();
  assert.equal(machine.state.phase, 'decide');
  assert.equal(machine.state.t, 2);
  assert.ok(started.some((e) => e.type === 'decision'));
  machine.choose('yes');
  assert.equal(machine.state.phase, 'decide');
  assert.equal(machine.state.decisionId, 'b');
  const end = machine.choose('turn');
  assert.ok(end.some((e) => e.type === 'result' && e.ok === false));
});

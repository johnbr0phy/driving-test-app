// V2Sync snapshots the device, awaits the account copy, then writes a merged
// copy back. A test started during that wait (tap Start module while the
// account loads) used to vanish and the start screen came back (Nov 2026).
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { mergeV2, withLocalChanges } = require('../lib/v2/merge.ts');

const empty = () => ({ sessions: {}, results: [], drills: {}, basics: {}, goals: {}, questionStats: {} });

test('a session started while the account loads survives the sync', () => {
  const before = empty();
  const remote = { ...empty(), goals: { servicenowcsa: 80 } };
  const session = { examId: 'servicenowcsa', testNumber: 1, startedAt: 'now', stages: [{ answers: {} }] };
  const after = { ...before, sessions: { 'servicenowcsa:1': session } };
  const out = withLocalChanges(mergeV2(before, remote), before, after);
  assert.equal(out.sessions['servicenowcsa:1'], session);
  assert.equal(out.goals.servicenowcsa, 80);
});

test('the account copy wins when nothing changed during the load', () => {
  const before = empty();
  const remote = { ...empty(), drills: { 'sat:craft': { mastered: ['A'] } } };
  const out = withLocalChanges(remote, before, before);
  assert.deepEqual(out, remote);
});

test('a session finished during the load is removed and its result kept', () => {
  const s = { examId: 'sat', testNumber: 1, stages: [{ answers: { A: [1] } }] };
  const before = { ...empty(), sessions: { 'sat:1': s } };
  const result = { key: 'sat:1', examId: 'sat', testNumber: 1, completedAt: '2026-11-18T00:00:00Z' };
  const after = { ...empty(), results: [result] };
  const out = withLocalChanges(mergeV2(before, before), before, after);
  assert.equal(out.sessions['sat:1'], undefined);
  assert.equal(out.results.length, 1);
});

test('a goal picked during the load beats the saved goal', () => {
  const before = { ...empty(), goals: { sat: 1200 } };
  const after = { ...before, goals: { sat: 1400 } };
  const remote = { ...empty(), goals: { sat: 1300 } };
  assert.equal(withLocalChanges(mergeV2(before, remote), before, after).goals.sat, 1400);
});

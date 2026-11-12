// Drive the Question: one smoke test per scene, plus the records, the links
// and the flag. Scenes are built with real three.js geometry but no renderer.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('tsx/cjs');

const { DRIVE_RULES, DRIVE_SLUGS, getDriveRule, nextDriveRule } = require('../src/drive/rules.js');
const { DRIVE_RECORDS, getDriveRecord, recordsForRule, validateRecord } = require('../src/drive/records/index.js');
const { DRIVE_QUESTION_LINKS, drivePathForQuestion } = require('../src/drive/links.js');
const { isDriveEnabled } = require('../src/drive/flag.js');
const { createMachine, listBranches } = require('../src/drive/runtime/machine.js');
const { createWorld } = require('../src/drive/runtime/world.js');
const bank = require('../data/questions.json');

const BUILDERS = Object.fromEntries(DRIVE_SLUGS.map((slug) => [slug, require(`../src/drive/builders/${slug}.js`)]));
const byId = new Map(bank.map((q) => [q.questionId, q]));

test('there are exactly five rules, each with a builder and a lead record', () => {
  assert.equal(DRIVE_RULES.length, 5);
  for (const rule of DRIVE_RULES) {
    assert.ok(BUILDERS[rule.slug].describe && BUILDERS[rule.slug].build, rule.slug);
    assert.equal(getDriveRecord(rule.slug).state, 'ALL', rule.slug);
    assert.equal(getDriveRule(rule.slug), rule);
    assert.ok(DRIVE_SLUGS.includes(nextDriveRule(rule.slug).slug));
  }
});

test('every record file is registered, valid, and matches its bank question', () => {
  const dir = path.join(__dirname, '../src/drive/records');
  const files = fs.readdirSync(dir).filter((d) => !d.includes('.')).flatMap((d) => fs.readdirSync(path.join(dir, d)).map((f) => `${d}/${f}`));
  assert.equal(files.length, DRIVE_RECORDS.length);
  for (const record of DRIVE_RECORDS) {
    assert.deepEqual(validateRecord(record), []);
    assert.ok(files.includes(`${record.rule}/${record.questionId}.json`));
    const q = byId.get(record.questionId);
    assert.ok(q, `${record.questionId} is in the bank`);
    assert.equal(record.prompt, q.question);
    assert.equal(record.state, q.state);
    assert.equal(record.bankAnswer, q[`option${q.correctAnswer}`]);
    for (const also of record.alsoCovers) assert.ok(byId.has(also), also);
  }
});

test('every decision asks the bank question with its four answers, word for word', () => {
  for (const record of DRIVE_RECORDS) {
    for (const decision of record.decisions) {
      const q = byId.get(decision.questionId);
      assert.ok(q, `${record.questionId}: ${decision.questionId} is in the bank`);
      assert.equal(decision.prompt, q.question, decision.questionId);
      assert.deepEqual(decision.options.map((o) => o.id), ['A', 'B', 'C', 'D'], decision.questionId);
      for (const option of decision.options) {
        assert.equal(option.text, q[`option${option.id}`], `${decision.questionId} ${option.id}`);
        assert.equal(option.correct, option.id === q.correctAnswer, `${decision.questionId} ${option.id} key`);
      }
    }
  }
});

test('a parking record drives the distance each answer names, and its rule matches the key', () => {
  for (const record of recordsForRule('parking-clearance')) {
    const options = record.decisions[0].options;
    for (const option of options) assert.equal(Number(option.text.match(/\d+/)[0]), option.distanceFt, `${record.questionId} ${option.id}`);
    const legal = options.find((o) => o.correct).distanceFt;
    assert.match(record.ruleText, new RegExp(`within ${legal} feet`), record.questionId);
    // A farther answer is legal on the street but wrong on the test: the card has to say so.
    for (const far of options.filter((o) => o.distanceFt > legal)) assert.match(far.consequence, /marked wrong on the test/, `${record.questionId} ${far.id}`);
  }
});

test('?state= and ?q= pick the right record', () => {
  assert.equal(getDriveRecord('parking-clearance').questionId, 'U-080');
  assert.equal(getDriveRecord('parking-clearance', { state: 'tx' }).questionId, 'TX-037');
  assert.equal(getDriveRecord('parking-clearance', { state: 'OR' }).questionId, 'OR-033', 'a state with only a hydrant record gets it');
  assert.equal(getDriveRecord('parking-clearance', { state: 'LA' }).questionId, 'LA-028', 'the crosswalk variant comes first');
  assert.equal(getDriveRecord('parking-clearance', { state: 'LA', q: 'LA-027' }).questionId, 'LA-027');
  assert.equal(getDriveRecord('parking-clearance', { state: 'ZZ' }).questionId, 'U-080');
  assert.equal(getDriveRecord('no-passing-zone', { q: 'U-081' }).questionId, 'U-081');
  assert.equal(getDriveRecord('double-arrow', { state: 'CA', q: 'U-080' }).questionId, 'U-019', 'a question of another rule is ignored');
  assert.equal(getDriveRecord('nope'), null);
});

test('every linked question has a record or is covered by one', () => {
  const covered = new Set(DRIVE_RECORDS.flatMap((r) => [r.questionId, ...r.alsoCovers]));
  for (const [questionId, link] of Object.entries(DRIVE_QUESTION_LINKS)) {
    assert.ok(covered.has(questionId), questionId);
    assert.ok(DRIVE_SLUGS.includes(link.slug));
    const url = new URL(drivePathForQuestion(questionId), 'https://www.tigertest.io');
    const record = getDriveRecord(link.slug, { state: url.searchParams.get('state'), q: url.searchParams.get('q') });
    assert.ok(record.questionId === questionId || record.alsoCovers.includes(questionId), `${questionId} opens ${record.questionId}`);
  }
  assert.equal(drivePathForQuestion('U-001'), null);
  assert.equal(drivePathForQuestion('OR-033'), '/drive/parking-clearance?state=OR&q=OR-033');
});

test('the flag is on in development, off in production, and the env var wins', () => {
  const saved = { ...process.env };
  const set = (env) => {
    for (const key of ['NODE_ENV', 'NEXT_PUBLIC_DRIVE_ENABLED', 'NEXT_PUBLIC_VERCEL_ENV']) delete process.env[key];
    Object.assign(process.env, env);
  };
  try {
    set({ NODE_ENV: 'development' });
    assert.equal(isDriveEnabled(), true);
    set({ NODE_ENV: 'production' });
    assert.equal(isDriveEnabled(), false);
    set({ NODE_ENV: 'production', NEXT_PUBLIC_VERCEL_ENV: 'production' });
    assert.equal(isDriveEnabled(), false);
    set({ NODE_ENV: 'production', NEXT_PUBLIC_VERCEL_ENV: 'preview' });
    assert.equal(isDriveEnabled(), true);
    set({ NODE_ENV: 'production', NEXT_PUBLIC_DRIVE_ENABLED: 'on' });
    assert.equal(isDriveEnabled(), true);
    set({ NODE_ENV: 'development', NEXT_PUBLIC_DRIVE_ENABLED: 'off' });
    assert.equal(isDriveEnabled(), false);
  } finally {
    for (const key of ['NODE_ENV', 'NEXT_PUBLIC_DRIVE_ENABLED', 'NEXT_PUBLIC_VERCEL_ENV']) delete process.env[key];
    Object.assign(process.env, saved);
  }
});

// One smoke test per scene: build it, then drive every branch frame by frame.
for (const rule of DRIVE_RULES) {
  test(`scene ${rule.slug}: builds under budget and plays every branch`, () => {
    const builder = BUILDERS[rule.slug];
    for (const record of recordsForRule(rule.slug)) {
      const script = builder.describe(record);
      assert.deepEqual(builder.describe(record), script, 'deterministic');
      const decisions = Object.values(script.decisions);
      assert.ok(decisions.length >= 1 && decisions.length <= 3);
      for (const decision of decisions) {
        assert.equal(decision.options.length, 4);
        assert.equal(decision.options.filter((o) => o.correct).length, 1);
      }
      const branches = listBranches(script);
      const best = branches.filter((b) => b.ok);
      assert.equal(best.length, 1);
      assert.ok(best[0].duration >= 15 && best[0].duration <= 25, `${record.questionId} right path is ${best[0].duration}s`);
      for (const branch of branches) assert.ok(branch.duration >= 9 && branch.duration <= 25, `${record.questionId} ${branch.choices} is ${branch.duration}s`);

      const world = createWorld({ seed: script.seed, heightAt: builder.heightAt ? (s) => builder.heightAt(s, record) : undefined });
      const actors = builder.build(world, record, script);
      world.finish();
      assert.ok(world.countMeshes() < 60, `${record.questionId}: ${world.countMeshes()} meshes`);
      assert.ok(world.statics.triangles < 30000, `${record.questionId}: ${world.statics.triangles} triangles`);

      for (const branch of branches) {
        const machine = createMachine(script);
        machine.start();
        const picks = [...branch.choices];
        let frames = 0;
        while (machine.state.phase !== 'result') {
          assert.ok(++frames < 60 * 60, 'the scene ends');
          machine.advance(1 / 30);
          if (machine.state.phase === 'decide' && machine.state.t >= script.segments[machine.state.seg].duration) machine.choose(picks.shift());
          const view = machine.view();
          const frame = actors.update({ ...view, clock: frames / 30 });
          assert.ok(Number.isFinite(frame.focus.s) && Number.isFinite(frame.focus.x), `${view.seg} @${view.t}`);
          assert.ok(frame.speedMph >= 0 && frame.speedMph < 80, `${view.seg} speed ${frame.speedMph}`);
          world.scene.traverse((o) => {
            if (o.isMesh) assert.ok(Number.isFinite(o.position.x + o.position.y + o.position.z), `${o.name} in ${view.seg}`);
          });
        }
        assert.equal(machine.state.result.ok, branch.ok);
      }
      world.dispose();
    }
  });
}

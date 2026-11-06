require('tsx/cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { MISTAKE_EXPLAINERS, manifestMatches } = require('../lib/mistakeExplainers/index.ts');

const banks = {
  dmv: require('../data/questions.json'),
  part107: require('../data/part107-questions.json'),
  crcst: require('../data/crcst-questions.json'),
  ccma: require('../data/ccma-questions.json'),
  ptcb: require('../data/ptcb-questions.json'),
};

test('every mistake explainer has a scene, a real question and a voice that matches its storyboard', () => {
  const scenes = fs.readFileSync(path.join(__dirname, '../components/mistakes/scenes/index.ts'), 'utf8')
    + fs.readFileSync(path.join(__dirname, '../app/explainers/frame3/page.tsx'), 'utf8');
  for (const ex of MISTAKE_EXPLAINERS) {
    assert.ok(scenes.includes(`"${ex.id}"`), `${ex.id}: no scene`);
    const bank = banks[ex.examId];
    assert.ok(bank, `${ex.id}: add its exam's bank to this test`);
    assert.ok(bank.some((q) => q.questionId === ex.questionId), `${ex.id}: ${ex.questionId} not in bank`);
    const dir = path.join(__dirname, '../public/mistake-explainers');
    assert.ok(fs.existsSync(path.join(dir, `${ex.id}.mp3`)), `${ex.id}: no mp3`);
    const m = JSON.parse(fs.readFileSync(path.join(dir, `${ex.id}.json`), 'utf8'));
    assert.ok(manifestMatches(ex, m), `${ex.id}: manifest is stale; re-run scripts/build-mistake-explainer-audio.ts`);
  }
});

test('every medical explainer has a claim ledger that passes scripts/check-mistake-claims.ts', () => {
  const medical = MISTAKE_EXPLAINERS.filter((e) => e.medical);
  for (const ex of medical) {
    assert.ok(fs.existsSync(path.join(__dirname, `../tools/mistakes/claims/${ex.id}.json`)), `${ex.id}: no claim ledger`);
  }
  if (!medical.length) return;
  // exits 1 on any unsourced line, wrong key or missing quote; drafts pass
  execFileSync('npx', ['tsx', 'scripts/check-mistake-claims.ts', ...medical.map((e) => e.id)], { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
});

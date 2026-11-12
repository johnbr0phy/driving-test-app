require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { basicsFor } = require('../lib/v2/basics.ts');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { regionOfTest } = require('../lib/region.ts');

function invariants(value, path = '', out = []) {
  if (path.endsWith('.audioDisabled')) return out;
  if (typeof value === 'number' || typeof value === 'boolean') out.push([path, value]);
  else if (typeof value === 'string') {
    if (/(?:^|\.)(id|kind|play)$/.test(path)) out.push([path, value]);
    // Localised prose must retain every numeric value, including distractors.
    else out.push([path, value.match(/[\d⁰¹²³⁴⁵⁶⁷⁸⁹]+(?:\.\d+)?/g) || []]);
  } else if (Array.isArray(value)) {
    out.push([path + '.length', value.length]);
    value.forEach((v, i) => invariants(v, `${path}.${i}`, out));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([k, v]) => invariants(v, `${path}.${k}`, out));
  }
  return out;
}

function readable(value, key = '') {
  if (['id', 'kind', 'play'].includes(key)) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map((v) => readable(v)).join('\n');
  if (value && typeof value === 'object') return Object.entries(value).map(([k, v]) => readable(v, k)).join('\n');
  return '';
}

test('every UK shared basics drill uses British wording without changing answers or progress keys', () => {
  const uk = EXAMS_V2.filter((exam) => regionOfTest(exam.id) === 'UK');
  assert.equal(uk.length, 9);
  let localisedSkills = 0;
  for (const exam of uk) for (const drill of exam.drills) {
    const original = basicsFor({ ...drill, basicsLocale: undefined });
    const snapshot = JSON.stringify(original);
    const british = basicsFor(drill);
    assert.deepEqual(invariants(british), invariants(original), `${exam.id}/${drill.key}`);
    assert.equal(JSON.stringify(original), snapshot, 'US library objects must not mutate');
    for (const skill of british) {
      assert.doesNotMatch(readable(skill), /\b(?:GCF|factoring|slope|PEMDAS|center|liters?|cookies?|candy|dollars?|dimes|TEAS|neighbors?|mail carrier)\b|\$\d/i, `${exam.id}/${skill.id}`);
    }
    if (drill.basicsLocale) localisedSkills += british.length;
  }
  assert.ok(localisedSkills > 30);
});

test('US lessons retain US terminology and unit conversions stay correct', () => {
  const base = { basics: ['slope', 'gcfLcm', 'factoring', 'unitConversion', 'circleBasics', 'fractionConvert', 'decimals'] };
  const us = basicsFor(base);
  const uk = basicsFor({ ...base, basicsLocale: 'en-GB' });
  assert.equal(us[0].name, 'Slope and starting value');
  assert.equal(us[1].name, 'GCF and LCM');
  assert.equal(us[2].name, 'Factoring');
  assert.equal(uk[0].name, 'Gradient and starting value');
  assert.equal(uk[1].name, 'HCF and LCM');
  assert.equal(uk[2].name, 'Factorising');
  assert.match(readable(uk[3]), /12 inches in a foot/);
  assert.match(readable(uk[4]), /tyre/);
  assert.match(readable(uk[5]), /100 pence/);
  assert.match(readable(uk[6]), /units of ten pence/);
  assert.doesNotMatch(readable(uk), /per penny/);
  for (const exam of EXAMS_V2.filter((e) => regionOfTest(e.id) !== 'UK')) {
    assert.ok(exam.drills.every((drill) => !drill.basicsLocale), `${exam.id} must retain its original lessons`);
  }
});

test('all 31 UK question banks are checked for American spelling regressions', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const { EXAMS } = require('../lib/exams.ts');
  const exams = [...EXAMS, ...EXAMS_V2].filter((exam) => regionOfTest(exam.id) === 'UK');
  assert.equal(exams.length, 31);
  const american = /\b(?:harmonized|colors?|colored|coloring|behaviors?|honors?|favorites?|centers?|centered|centering|analyz(?:e|es|ed|ing)|organ(?:ize|izes|ized|izing)|recogniz(?:e|es|ed|ing)|prioritiz(?:e|es|ed|ing)|customiz(?:e|es|ed|ing)|aluminum|sidewalks?|gasoline|windshields?|gray|canceled|canceling|traveled|traveling|labeled|labeling|practicing|practiced)\b/i;
  let questionCount = 0;
  for (const exam of exams) {
    const bank = EXAMS_V2.includes(exam) ? `lib/v2/banks/${exam.id}.ts` : `lib/banks/${exam.id}.ts`;
    const source = fs.readFileSync(path.join(__dirname, '..', bank), 'utf8');
    const files = [...source.matchAll(/@\/(data\/[^"']+\.json)/g)].map((m) => m[1]);
    assert.ok(files.length > 0, `${exam.id} has a bank under review`);
    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'));
      const questions = Array.isArray(data) ? data : data.questions;
      questionCount += questions.length;
      assert.doesNotMatch(JSON.stringify(data), american, file);
    }
  }
  assert.ok(questionCount > 5000, `reviewed ${questionCount} questions`);
});


test('changed British lessons cannot play original audio, even when word counts match', () => {
  const { hasExplainer, buildExplainer, words } = require('../lib/v2/explainer.ts');
  const us = basicsFor({ basics: ['factoring', 'apostrophes', 'rounding', 'distributing'] });
  const uk = basicsFor({ basics: ['factoring', 'apostrophes', 'rounding', 'distributing'], basicsLocale: 'en-GB' });
  assert.equal(hasExplainer(us[0]), true);
  assert.equal(uk[0].audioDisabled, true);
  assert.equal(hasExplainer(uk[0]), false);
  assert.equal(uk[0].id, us[0].id);
  // The previous word-count check alone would accept this stale recording.
  assert.deepEqual(buildExplainer(uk[0]).map((beat) => [beat.id, words(beat.say).length]),
    buildExplainer(us[0]).map((beat) => [beat.id, words(beat.say).length]));
  assert.equal(uk[1].audioDisabled, undefined);
  assert.equal(hasExplainer(uk[1]), true, 'unchanged UK apostrophes keeps valid audio');
  assert.equal(us[0].audioDisabled, undefined, 'US recordings stay available');
  assert.match(readable(uk[2]), /neighbour/i);
  assert.match(readable(uk[3]), /postal worker/);
  const source = require('node:fs').readFileSync(require('node:path').join(__dirname, '../components/v2/BasicsExplainer.tsx'), 'utf8');
  assert.match(source, /const audioEnabled = hasExplainer\(skill\)/);
  assert.match(source, /if \(!audioEnabled\) \{\s*setManifest\(null\);\s*return;\s*\}/);
  assert.match(source, /if \(!audioEnabled \|\| typeof Audio === "undefined"\)/);
  assert.match(source, /\[skill.id, beats, audioEnabled\]/);
  assert.match(source, /\[skill.id, audioEnabled\]/);
});

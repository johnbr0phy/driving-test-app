require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { EXAMS, examLandingPath } = require('../lib/exams.ts');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { regionOfTest, REGION_HOME } = require('../lib/region.ts');
const { EXAM_FACTS } = require('../lib/examFacts.ts');
const { getCatalogEntry } = require('../lib/testCatalog.ts');

// These unambiguous US spellings are a regression guard, not a spellchecker.
// Do not ban British alternatives such as learned/-ize, official names, the
// computing noun "program", the verb "license", or the noun "practice".
const americanCopy = /\b(?:practicing|practiced|colors?|colored|colorful|centers?|centered|behaviors?|favorites?|neighbors?|analyze|analyzed|analyzing|traveling|canceled|aluminum|counseling|pediatric|airplanes?)\b/i;
const ukExams = [...EXAMS, ...EXAMS_V2].filter(exam => regionOfTest(exam.id) === 'UK');
const knownUK = [
  'aatl2', 'cemap', 'ukcar', 'ukmoto', 'uklgv', 'ukpcv', 'ukadi', 'uksia',
  'uk18ed', 'cscs', 'ukseru', 'ukfood', 'ukaplh', 'ukfaw', 'ukcare', 'uklitu',
  'uknmc', 'timestables', 'ks2', 'elevenplus', 'gcsemaths', 'gcsehigher',
  'gcsescience', 'gcsecs', 'fsmaths',
];

function assertBritish(value, location) {
  if (typeof value === 'string') {
    if (/^(?:https?:\/\/|\/)/.test(value)) return;
    assert.doesNotMatch(value, americanCopy, `${location}: ${value}`);
  } else if (Array.isArray(value)) {
    value.forEach((entry, i) => assertBritish(entry, `${location}[${i}]`));
  } else if (value && typeof value === 'object') {
    for (const [key, entry] of Object.entries(value)) assertBritish(entry, `${location}.${key}`);
  }
}

function landingCopy(file) {
  const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const strings = [];
  function visit(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node)) {
      const parent = node.parent;
      // CSS and code attributes are not prose: e.g. text-center, bg-gray-50.
      if (ts.isJsxAttribute(parent) && !['alt', 'title', 'subtitle', 'label', 'aria-label', 'description'].includes(parent.name.text)) return;
      strings.push(node.text.trim());
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return strings;
}

test('UK English review includes every current UK exam and country-home copy', () => {
  for (const id of knownUK) assert.ok(ukExams.some(exam => exam.id === id), `${id} must remain in the UK review`);
  assertBritish(REGION_HOME.UK, 'UK homepage');
});

for (const exam of ukExams) {
  test(`${exam.id}: UK landing, exam configuration, facts and catalogue use British English`, () => {
    const landingPath = 'testCount' in exam ? examLandingPath(exam) : exam.landingPath;
    const file = path.join(__dirname, '..', 'app', landingPath, 'page.tsx');
    assertBritish(landingCopy(file), `${exam.id} landing`);
    assertBritish(exam, `${exam.id} configuration`);
    assert.ok(EXAM_FACTS[exam.id], `${exam.id} has reviewed exam facts`);
    assertBritish(EXAM_FACTS[exam.id], `${exam.id} facts`);
    assertBritish(getCatalogEntry(exam.id), `${exam.id} catalogue`);
  });
}

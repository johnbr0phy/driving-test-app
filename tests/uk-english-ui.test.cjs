require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { pageEnglishLocale } = require('../lib/pageLanguage.ts');
const { EXAMS } = require('../lib/exams.ts');
const { EXAMS_V2 } = require('../lib/v2/registry.ts');
const { regionOfTest } = require('../lib/region.ts');
const { createT, en } = require('../i18n/index.ts');
const { enGB } = require('../i18n/enGB.ts');
const { examUi } = require('../lib/examUi.ts');
const { classFaqJsonLd } = require('../components/exam/ExamClassFaq.tsx');
const uk = [...EXAMS, ...EXAMS_V2].filter(e => regionOfTest(e.id) === 'UK');

test('all UK exam landings and app routes override a saved US preference', () => {
  assert.ok(uk.length >= 25);
  for (const exam of uk) {
    for (const path of [exam.slug, exam.landingPath, ...['dashboard', 'practice/1', 'test/1', 'test/1/results', 'stats', 'drill', 'basics'].map(p => `${exam.slug}/${p}`)].filter(Boolean)) {
      assert.equal(pageEnglishLocale(path, 'US'), 'en-GB', `${exam.id}: ${path}`);
    }
  }
});
test('US exams and US homepage stay American despite a UK preference', () => {
  for (const exam of [...EXAMS, ...EXAMS_V2].filter(e => regionOfTest(e.id) === 'US')) {
    assert.equal(pageEnglishLocale(`${exam.slug}/dashboard`, 'UK'), 'en-US', exam.id);
  }
  for (const path of ['/', '/dmv/dashboard', '/test/1', '/practice/1', '/california-dmv-practice-test']) assert.equal(pageEnglishLocale(path, 'UK'), 'en-US', path);
});
test('country routes win; shared pages follow selected region', () => {
  assert.equal(pageEnglishLocale('/uk', 'US'), 'en-GB');
  for (const path of ['/teach', '/settings', '/tests', '/signup', '/login']) {
    assert.equal(pageEnglishLocale(path, 'UK'), 'en-GB');
    assert.equal(pageEnglishLocale(path, 'US'), 'en-US');
  }
});
test('reviewed dictionary overrides reference real keys and preserve other languages', () => {
  const gb = createT('en', 'en-GB'), us = createT('en');
  for (const [key, value] of Object.entries(enGB)) {
    assert.notEqual(us(key), key, `missing key: ${key}`);
    assert.equal(gb(key), value);
    assert.equal(createT('es', 'en-GB')(key), createT('es')(key));
  }
  assert.equal(gb('common.startPracticing'), 'Start practising');
  assert.equal(us('common.startPracticing'), 'Start practicing');
  assert.equal(gb('footer.practiceTests'), en.footer.practiceTests);
  assert.equal(examUi('en', 'en-GB').dateLocale, 'en-GB');
  assert.equal(examUi('en').dateLocale, 'en-US');
});
test('UK class FAQ structured data uses practised while US keeps practiced', () => {
  for (const exam of uk) assert.match(classFaqJsonLd(exam.id).acceptedAnswer.text, /who practised/);
  assert.match(classFaqJsonLd('cst').acceptedAnswer.text, /who practiced/);
});

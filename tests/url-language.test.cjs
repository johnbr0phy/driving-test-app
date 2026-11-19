// Run: node --test tests/url-language.test.cjs
// Every country homepage written in another language says so in a Content-Language
// header (crawlers get the country's language, never English). Until Nov 2026 nine
// of them (/es, /pt, /ro, /se, /gr, /dk, /hu, /be, /fi) sent none.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { REGIONS, regionHomePath } = require('../lib/region.ts');
const { COUNTRY_HOME_LANGUAGES, urlLanguageHeaders } = require('../lib/urlLanguage.ts');

test('COUNTRY_HOME_LANGUAGES lists every non-English country homepage with its language', () => {
  const expected = REGIONS.filter((r) => r.lang !== 'en')
    .map((r) => ({ path: regionHomePath(r.code), lang: r.lang }))
    .sort((a, b) => a.path.localeCompare(b.path));
  const actual = [...COUNTRY_HOME_LANGUAGES].sort((a, b) => a.path.localeCompare(b.path));
  assert.deepEqual(actual, expected);
});

test('each of those homepages gets exactly one Content-Language header, in its language', () => {
  const rules = urlLanguageHeaders();
  for (const { path, lang } of COUNTRY_HOME_LANGUAGES) {
    const hits = rules.filter((r) => r.source === path);
    assert.equal(hits.length, 1, `${path} has ${hits.length} header rules`);
    assert.equal(hits[0].headers[0].value, lang, path);
  }
});

test('an English country homepage gets no Content-Language header', () => {
  const rules = urlLanguageHeaders();
  for (const r of REGIONS.filter((x) => x.lang === 'en' && x.code !== 'US')) {
    assert.equal(rules.filter((h) => h.source === regionHomePath(r.code)).length, 0, regionHomePath(r.code));
  }
});

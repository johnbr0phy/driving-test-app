// New pages open at the top with the site header in view (Nov 26 2026).
// Next only scrolls a new page when its content starts off screen, so a page
// opened from a small scroll offset (or one clamped while it loads) hid the
// header on phones. components/ScrollToTopOnNavigate.tsx fixes that.
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const read = (f) => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');

test('root layout scrolls to the top on every new page, before <main>', () => {
  const layout = read('app/layout.tsx');
  const at = layout.indexOf('<ScrollToTopOnNavigate />');
  assert.ok(at > 0, 'ScrollToTopOnNavigate is in the root layout');
  assert.ok(at < layout.indexOf('<main'), 'it renders before <main>, so pages can scroll after it');
});

test('ScrollToTopOnNavigate leaves Back/Forward, hashes and the first load alone', () => {
  const src = read('components/ScrollToTopOnNavigate.tsx');
  assert.match(src, /addEventListener\("popstate"/);
  assert.match(src, /if \(window\.location\.hash\) return;/);
  assert.match(src, /first\.current = false;\s*return;/);
  assert.match(src, /window\.scrollTo\(\{ top: 0, left: 0, behavior: "instant" \}\)/);
  assert.match(src, /\}, \[pathname\]\);/);
});

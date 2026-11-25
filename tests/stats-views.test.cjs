// Run: node --test tests/stats-views.test.cjs
// Stats page traffic (lib/statsViews.ts): every way into a stats page notes
// its source, every stats page counts one view, and the admin card reads it.
require('tsx/cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');

test('sources are a fixed list; anything else is refused', () => {
  const S = require('../lib/statsViews.ts');
  assert.deepEqual([...S.STATS_SOURCES], ['header_icon', 'header_chip', 'bar_chip', 'bar_link', 'done_link', 'other']);
  for (const s of S.STATS_SOURCES) assert.ok(S.isStatsSource(s) && S.STATS_SOURCE_LABELS[s]);
  assert.ok(!S.isStatsSource('anything'));
  assert.match(read('app/api/analytics/stats-view/route.ts'), /if \(!isStatsSource\(body\.source\)\) return/);
});

test('every way into a stats page notes its source', () => {
  const tagged = {
    'components/SiteHeader.tsx': ['header_icon'],
    'components/DailyRank.tsx': [],
    'components/exam/ExamTestPage.tsx': ['bar_link'],
    'components/exam/ExamTrainingPage.tsx': ['bar_link', 'done_link'],
    'components/v2/DrillRunner.tsx': ['bar_link'],
    'app/training/page.tsx': ['bar_link', 'done_link'],
    'app/test/[id]/page.tsx': ['bar_link'],
  };
  // The chip notes bar_chip in the test bar and header_chip in the site header.
  assert.match(read('components/DailyRank.tsx'), /noteStatsSource\(hrefOverride === undefined \? "bar_chip" : "header_chip"\)/);
  for (const [file, sources] of Object.entries(tagged)) {
    for (const s of sources) assert.match(read(file), new RegExp(`noteStatsSource\\("${s}"\\)`), `${file} notes ${s}`);
  }
});

test('every stats page counts one view once it really shows', () => {
  assert.match(read('components/exam/ExamStatsPage.tsx'), /useStatsView\(exam\.id, hydrated && /);
  assert.match(read('app/stats/page.tsx'), /useStatsView\("dmv", hydrated && accountReady && !!user && !isGuest/);
  assert.match(read('components/v2/StatsV2.tsx'), /useStatsView\(exam\.id, hydrated\)/);
  // Test, internal and analytics-declined browsers never send; bots are refused.
  assert.match(read('lib/statsViews.ts'), /isTestBrowser\(\) \|\| isInternalBrowser\(auth\.currentUser\?\.email\)/);
  assert.match(read('app/api/analytics/stats-view/route.ts'), /if \(isBotRequest\(request\)\)/);
});

test('the admin card is on the Growth tab and its route is admin-only and cached', () => {
  assert.match(read('components/admin/GrowthTab.tsx'), /<StatsViewsCard \/>/);
  const route = read('app/api/admin/stats-views/route.ts');
  assert.match(route, /requireAdmin\(request\)/);
  assert.match(route, /cachedAdminPayload\(/);
  const card = read('components/admin/StatsViewsCard.tsx');
  assert.match(card, /useTopN\(days\)/);
  assert.match(card, /<ShowAllButton/);
});

// Dashboard reach on the /admin Growth tab: the funnel's dashboard step must
// fire from every dashboard and be filed by first-visit day, or the chart of
// new visitors who reach a dashboard silently goes flat.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const read = (p) => fs.readFileSync(path.join(__dirname, "..", p), "utf8");

test("every dashboard tracks the dashboard funnel step", () => {
  for (const file of [
    "app/dmv/dashboard/page.tsx",
    "components/exam/ExamDashboard.tsx",
    "components/v2/DashboardV2.tsx",
    "components/quiz/QuizHome.tsx",
  ]) {
    assert.match(read(file), /useTrackDashboardView\(\)/, `${file} must call useTrackDashboardView()`);
  }
  assert.match(read("hooks/useTrackDashboardView.ts"), /trackFunnelStep\("dashboard"\)/);
});

test("the funnel route accepts the step and files it by first-visit day", () => {
  const route = read("app/api/analytics/funnel/route.ts");
  assert.match(route, /'dashboard'/);
  assert.match(route, /dashboard_by_visit/);
  assert.match(read("lib/funnel.ts"), /visitDay: firstVisitDay\(\)/);
  assert.match(read("app/api/admin/metrics/route.ts"), /'dashboard', 'dashboard_by_visit'/);
  assert.match(read("components/admin/GrowthTab.tsx"), /<DashboardReach /);
});

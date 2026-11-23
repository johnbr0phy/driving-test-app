require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { buildSegment } = require("../lib/sitemaps.ts");
const { REGIONS, regionHomePath } = require("../lib/region.ts");
const { SITE_URL } = require("../lib/siteUrl.ts");

// Every country homepage is an hreflang alternate of every other, so each must be
// in the sitemap (the weekly SEO audit fails on an hreflang target outside it).
test("every country homepage is in the exams sitemap segment", async () => {
  const urls = new Set((await buildSegment("exams")).map((e) => e.url));
  const missing = REGIONS.filter((r) => r.code !== "US" && !urls.has(`${SITE_URL}${regionHomePath(r.code)}`)).map((r) => r.code);
  assert.deepEqual(missing, []);
});

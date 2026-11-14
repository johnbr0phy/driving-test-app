require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { renderLlmsTxt } = require("../lib/llmsTxt.ts");
const { TEST_CATALOG } = require("../lib/testCatalog.ts");
const { SITE_URL } = require("../lib/siteUrl.ts");

// Many AI fetchers read only about the first 100 KB of a page. llms.txt is
// far longer, so every landing must be linked inside that window.
test("every test's landing is linked in the first 100 KB of llms.txt", () => {
  const head = Buffer.from(renderLlmsTxt()).subarray(0, 100_000).toString();
  const missing = TEST_CATALOG.filter((t) => !head.includes(`(${SITE_URL}${t.href})`) && !head.includes(`${SITE_URL}${t.href}\n`)).map((t) => t.id);
  assert.deepEqual(missing, []);
});

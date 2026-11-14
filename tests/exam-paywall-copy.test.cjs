// The exam paywall's bullets exist in every interface language (lib/examPaywallCopy.ts).
const test = require("node:test");
const assert = require("node:assert");
require("tsx/cjs");
const { examPaywallCopy } = require("../lib/examPaywallCopy.ts");
const { LANGUAGES } = require("../i18n/index.ts");

test("every language has its own four premium and four stats bullets", () => {
  const en = examPaywallCopy("en");
  for (const { code } of LANGUAGES) {
    const c = examPaywallCopy(code);
    const premium = c.premium("XYZ");
    const stats = c.stats(200, "XYZ");
    assert.strictEqual(premium.length, 4, code);
    assert.strictEqual(stats.length, 4, code);
    assert.ok(premium.slice(0, 2).every((b) => b.includes("XYZ")), `${code} premium names the exam`);
    assert.ok(stats[0].includes("200") && stats[0].includes("XYZ"), `${code} stats names the count and exam`);
    for (const b of [...premium, ...stats]) assert.ok(!b.includes("—"), `${code} has no em dash`);
    if (code !== "en") {
      assert.notDeepStrictEqual(premium, en.premium("XYZ"), `${code} premium is translated`);
      assert.notDeepStrictEqual(stats, en.stats(200, "XYZ"), `${code} stats is translated`);
    }
  }
});

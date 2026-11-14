require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { redactPageUrl } = require("../lib/pageAnalytics.ts");

test("query strings go except utm tags, and the hash goes", () => {
  assert.equal(
    redactPageUrl("https://www.tigertest.io/cna-practice-test?utm_source=reddit&email=a%40b.com&redirect=/x#faq"),
    "https://www.tigertest.io/cna-practice-test?utm_source=reddit"
  );
  assert.equal(redactPageUrl("https://www.tigertest.io/login?redirect=%2Fsat"), "https://www.tigertest.io/login");
});

test("class and quiz codes are blanked", () => {
  assert.equal(redactPageUrl("https://www.tigertest.io/c/AB3KX"), "https://www.tigertest.io/c/[code]");
  assert.equal(redactPageUrl("https://www.tigertest.io/q/ABC234/test/results"), "https://www.tigertest.io/q/[code]/test/results");
  assert.equal(redactPageUrl("https://www.tigertest.io/teach/classes/AB3KX"), "https://www.tigertest.io/teach/classes/[code]");
  assert.equal(redactPageUrl("https://www.tigertest.io/cdl-practice-test"), "https://www.tigertest.io/cdl-practice-test");
});

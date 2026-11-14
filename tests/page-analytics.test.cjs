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

const { isTrackedPage } = require("../lib/pageAnalytics.ts");

test("landings, homepages and topic pages are counted", () => {
  for (const p of ["/", "/uk", "/tests", "/cdl-practice-test", "/dmv-practice-test", "/texas-dmv-practice-test",
    "/real-estate-practice-test/california", "/questions/cdl/air-brakes", "/teach", "/teach/cdl",
    "/es/test-dgt-permiso-b", "/create", "/about"]) assert.equal(isTrackedPage(p), true, p);
});

test("app pages are not counted", () => {
  for (const p of ["/dmv/dashboard", "/test/2", "/test/2/results", "/practice/1", "/cdl/dashboard", "/cdl/practice/2",
    "/sat/test/1", "/sat/stats", "/settings", "/admin", "/c/[code]", "/q/[code]/test", "/teach/classes/[code]",
    "/teach/new", "/signup", "/real-estate/ca/dashboard"]) assert.equal(isTrackedPage(p), false, p);
});

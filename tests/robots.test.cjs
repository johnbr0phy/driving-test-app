// robots.txt must never block a page we ask search engines to index, and must
// block the exam app routes that only spend crawl budget (docs/claude/seo.md).
const { test } = require("node:test");
const assert = require("node:assert");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const src = readFileSync(join(__dirname, "..", "app", "robots.ts"), "utf8");
const list = src.match(/export const DISALLOW = \[([\s\S]*?)\];/)[1];
const DISALLOW = [...list.matchAll(/^\s*"([^"]+)"/gm)].map((m) => m[1]);

// Google's matching: a prefix match where * is any run of characters and a
// trailing $ anchors the end.
const blocks = (rule, path) => {
  const anchored = rule.endsWith("$");
  const body = (anchored ? rule.slice(0, -1) : rule).split("*").map((s) => s.replace(/[.+?^${}()|[\]\\/]/g, "\\$&")).join(".*");
  return new RegExp(`^${body}${anchored ? "$" : ""}`).test(path);
};

test("exam app routes are disallowed", () => {
  for (const p of ["/cdl/dashboard", "/teas/practice/3?level=exam", "/cdl/test/1/results", "/teas/stats", "/cdl/drill?test=2", "/dmv/dashboard"]) {
    assert.ok(DISALLOW.some((r) => blocks(r, p)), `${p} is crawlable`);
  }
});

test("no rule blocks a landing, hub, topic, teach or translated page", () => {
  const pages = [
    "/",
    "/tests",
    "/practice-tests-by-state",
    "/cdl-practice-test",
    "/california-dmv-practice-test",
    "/real-estate-practice-test/california",
    "/questions/cdl/braking-systems",
    "/questions/asvab/afqt",
    "/teach/cdl",
    "/es/georgia-examen-practica-dmv",
    "/de/fuehrerschein-theorie-test",
    "/uk",
    "/llms.txt",
    "/sitemap.xml",
    "/sitemaps/exams.xml",
  ];
  for (const p of pages) {
    const rule = DISALLOW.find((r) => blocks(r, p));
    assert.strictEqual(rule, undefined, `${p} is blocked by ${rule}`);
  }
});

test("no rule blocks any landing route in app/", () => {
  const { readdirSync } = require("node:fs");
  const landings = readdirSync(join(__dirname, "..", "app")).filter((d) => d.endsWith("-practice-test"));
  assert.ok(landings.length > 300, "landing folders not found");
  for (const d of landings) {
    const rule = DISALLOW.find((r) => blocks(r, `/${d}`));
    assert.strictEqual(rule, undefined, `/${d} is blocked by ${rule}`);
  }
});

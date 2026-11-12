require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { manifest } = require("../scripts/uk-pages-manifest.cjs");
const { EXAMS } = require("../lib/exams.ts");
const { EXAMS_V2 } = require("../lib/v2/registry.ts");
const { regionOfTest } = require("../lib/region.ts");
const { examForAppSlug } = require("../lib/examAppRoute.ts");
const m = manifest();
test("UK page inventory includes every UK exam from both registries", () => {
  const expected = [...EXAMS, ...EXAMS_V2]
    .filter((e) => regionOfTest(e.id) === "UK")
    .map((e) => e.id)
    .sort();
  assert.deepEqual(m.exams.map((e) => e.id).sort(), expected);
  assert.equal(m.exams.length, 31);
  assert.equal(new Set(m.routes.map((r) => r.path)).size, m.routes.length);
});
test("every UK exam has a landing, root, dashboard, stats, practice, test and results route", () => {
  for (const e of m.exams)
    for (const kind of [
      "landing",
      "root",
      "dashboard",
      "stats",
      "practice",
      "test",
      "results-empty",
    ])
      assert.ok(
        m.routes.some((r) => r.exam === e.id && r.kind === kind),
        `${e.id}: ${kind}`,
      );
});
test("every UK route maps to an existing app page or shared dynamic handler", () => {
  for (const r of m.routes) {
    const p = r.path.split("?")[0];
    let source = path.join(__dirname, "../app", p, "page.tsx");
    if (!fs.existsSync(source)) {
      const match = p.match(/^\/[^/]+\/(practice|test)\/\d+(\/results)?$/);
      assert.ok(match, `No static page or recognised dynamic route: ${p}`);
      source = path.join(
        __dirname,
        "../app/[slug]",
        match[1],
        match[1] === "test" ? "[id]" : "[n]",
        match[2] ? "results" : "",
        "page.tsx",
      );
    }
    assert.ok(fs.existsSync(source), `Missing handler for ${p}`);
  }
});
test("every UK dynamic route resolves to the correct registry exam", () => {
  for (const e of m.exams) {
    const result = examForAppSlug(e.slug.slice(1));
    assert.equal(result?.exam.id, e.id);
    assert.equal(result?.kind, e.version);
  }
});

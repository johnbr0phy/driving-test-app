// Changed official pages (sourceWatch): /admin shows only the ones the daily
// source triage could not settle (sourceNeedsPerson in lib/questionQuality.ts).
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const { sourceNeedsPerson } = require("../lib/questionQuality.ts");

const watched = new Set(["https://a.example/rules"]);
const page = (over) => ({ url: "https://a.example/rules", changed: true, changedAt: "2026-11-12T04:10:00Z", failures: 0, triage: null, ...over });
const triage = (verdict, at = "2026-11-13T05:30:00Z") => ({ verdict, reason: "r", at });

test("an untriaged changed page needs a person; an unchanged one does not", () => {
  assert.strictEqual(sourceNeedsPerson(page(), watched), true);
  assert.strictEqual(sourceNeedsPerson(page({ changed: false }), watched), false);
});

test("a page the triage handled is hidden until it changes again", () => {
  assert.strictEqual(sourceNeedsPerson(page({ triage: triage("pending") }), watched), false);
  assert.strictEqual(sourceNeedsPerson(page({ triage: triage("updated") }), watched), false);
  assert.strictEqual(sourceNeedsPerson(page({ changedAt: "2026-11-14T04:10:00Z", triage: triage("pending") }), watched), true);
});

test("needs_person stays on /admin", () => {
  assert.strictEqual(sourceNeedsPerson(page({ triage: triage("needs_person") }), watched), true);
});

test("a broken page counts after two failures, and a URL no longer watched is gone", () => {
  assert.strictEqual(sourceNeedsPerson(page({ changed: false, failures: 1 }), watched), false);
  assert.strictEqual(sourceNeedsPerson(page({ changed: false, failures: 2 }), watched), true);
  assert.strictEqual(sourceNeedsPerson(page({ changed: false, failures: 2, triage: triage("pending") }), watched), false);
  assert.strictEqual(sourceNeedsPerson(page({ url: "https://old.example/x" }), watched), false);
});

// The watchdog and the weekly owner digest (lib/ownerWatch.ts): when a stopped
// job is worth an email, and that the digest lists only what needs a person.
require("tsx/cjs");
const test = require("node:test");
const assert = require("node:assert");
const { staleJobs, shouldAlert, buildOwnerDigest } = require("../lib/ownerWatch.ts");

const NOW = Date.parse("2026-11-16T12:10:00Z");
const hoursAgo = (h) => new Date(NOW - h * 3_600_000).toISOString();
const job = (over) => ({ id: "stats", title: "Nightly stats", lastAt: hoursAgo(9), maxAgeHours: 36, hint: "Check the logs.", ...over });

test("a job is stale only past its own limit, or when it never ran", () => {
  assert.deepStrictEqual(staleJobs([job()], NOW), []);
  assert.strictEqual(staleJobs([job({ lastAt: hoursAgo(37) })], NOW).length, 1);
  assert.strictEqual(staleJobs([job({ lastAt: null })], NOW)[0].detail.startsWith("It has never recorded a run."), true);
  // A weekly job is fine at eight days and stale at ten.
  assert.deepStrictEqual(staleJobs([job({ maxAgeHours: 216, lastAt: hoursAgo(8 * 24) })], NOW), []);
  assert.strictEqual(staleJobs([job({ maxAgeHours: 216, lastAt: hoursAgo(10 * 24) })], NOW).length, 1);
});

test("alert once per problem, again after three days, never when nothing is wrong", () => {
  const p = [{ id: "stats", title: "t", detail: "d" }];
  assert.strictEqual(shouldAlert([], { alertedIds: ["stats"], alertedAt: hoursAgo(200) }, NOW), false);
  assert.strictEqual(shouldAlert(p, {}, NOW), true);
  assert.strictEqual(shouldAlert(p, { alertedIds: ["stats"], alertedAt: hoursAgo(24) }, NOW), false);
  assert.strictEqual(shouldAlert(p, { alertedIds: ["stats"], alertedAt: hoursAgo(73) }, NOW), true);
  assert.strictEqual(shouldAlert([...p, { id: "flags", title: "t", detail: "d" }], { alertedIds: ["stats"], alertedAt: hoursAgo(2) }, NOW), true);
});

const none = { fixed: 0, kept: 0, replies: 0, sources: 0, upkeep: 0 };
const empty = { now: NOW, siteUrl: "https://www.tigertest.io", prs: [], jobs: [], handled: none };

test("a quiet week still sends one line, with what the automation did", () => {
  const d = buildOwnerDigest({ ...empty, handled: { ...none, fixed: 3, replies: 1, sources: 12 } });
  assert.strictEqual(d.count, 0);
  assert.strictEqual(d.subject, "Tigertest: nothing needs you this week");
  assert.match(d.html, /Nothing needs you this week/);
  assert.match(d.footer, /3 questions fixed, 1 student told how their report ended, 12 changed official pages handled/);
});

test("the digest lists only stopped jobs and open pull requests, never question quality", () => {
  const d = buildOwnerDigest({
    ...empty,
    prs: [
      { number: 801, title: "Search gaps: new test", url: "https://github.com/o/r/pull/801", createdAt: hoursAgo(72) },
      { number: 802, title: "Draft", url: "https://github.com/o/r/pull/802", createdAt: hoursAgo(5), draft: true },
    ],
    jobs: [{ id: "stats", title: "Nightly stats", detail: "It last finished 3 days ago." }],
  });
  assert.deepStrictEqual(d.sections.map((s) => s.title), ["Jobs that stopped running", "Pull requests waiting for you"]);
  const text = JSON.stringify(d.sections);
  assert.match(text, /#801/);
  assert.doesNotMatch(text, /#802/);
  assert.doesNotMatch(d.html, /tab=questions/);
  assert.strictEqual(d.count, 2);
  assert.strictEqual(d.subject, "Tigertest: 2 things need you");
});

test("text is escaped", () => {
  const d = buildOwnerDigest({ ...empty, jobs: [{ id: "x", title: "<b>odd</b> job", detail: "d" }] });
  assert.match(d.html, /&lt;b&gt;odd&lt;\/b&gt;/);
  assert.strictEqual(buildOwnerDigest({ ...empty, prs: null }).footer, "GitHub could not be read, so open pull requests are not listed.");
});

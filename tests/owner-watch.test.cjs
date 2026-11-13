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

const empty = { now: NOW, siteUrl: "https://www.tigertest.io", prs: [], jobs: [], sources: [], findings: [], openFlags: 0, reports: [], freshness: [], reviewDue: [], sourcesHandled: 0 };

test("a quiet week still sends one line", () => {
  const d = buildOwnerDigest({ ...empty, sourcesHandled: 12 });
  assert.strictEqual(d.count, 0);
  assert.strictEqual(d.subject, "Tigertest: nothing needs you this week");
  assert.match(d.html, /Nothing needs you this week/);
  assert.match(d.footer, /12 changed source pages handled without you/);
});

test("the digest lists what needs a person and leaves out what the automation may still settle", () => {
  const d = buildOwnerDigest({
    ...empty,
    prs: [
      { number: 801, title: "Search gaps: new test", url: "https://github.com/o/r/pull/801", createdAt: hoursAgo(72) },
      { number: 802, title: "Draft", url: "https://github.com/o/r/pull/802", createdAt: hoursAgo(5), draft: true },
    ],
    jobs: [{ id: "stats", title: "Nightly stats", detail: "It last finished 3 days ago." }],
    sources: [{ url: "https://dmv.example/handbook", exams: ["dmv"], reason: "Could not read the PDF." }],
    findings: [
      { examId: "cdl", questionId: "CDL-001", verdict: "wrong_key", createdAt: hoursAgo(100) },
      // Raised this morning: the fix run has not had its two days yet.
      { examId: "cdl", questionId: "CDL-002", verdict: "ambiguous", createdAt: hoursAgo(6) },
    ],
    openFlags: 3,
    reports: [{ createdAt: hoursAgo(90) }, { createdAt: hoursAgo(3) }],
    freshness: [
      { exam: "ccna", date: "2026-12-01", what: "v2.0 outline", state: "soon" },
      { exam: "nce", date: "2027-07-01", what: "new format", state: "later" },
      { exam: "itil", date: "2026-10-01", what: "handled", state: "done" },
    ],
    reviewDue: [{ exam: "htl", lastChanged: "2025-10-01" }],
  });
  const titles = d.sections.map((s) => s.title);
  assert.deepStrictEqual(titles, [
    "Jobs that stopped running",
    "Pull requests waiting for you",
    "Official pages the triage could not settle",
    "Audit findings the fix run left open",
    "Questions students or statistics doubt",
    "Exam changes due or coming within 30 days",
    "Yearly reviews due",
  ]);
  const text = JSON.stringify(d.sections);
  assert.match(text, /#801/);
  assert.doesNotMatch(text, /#802/);
  assert.match(text, /CDL-001/);
  assert.doesNotMatch(text, /CDL-002/);
  assert.match(text, /1 student report open/);
  assert.match(text, /ccna/);
  assert.doesNotMatch(text, /nce|itil/);
  assert.strictEqual(d.count, 8);
  assert.strictEqual(d.subject, "Tigertest: 8 things need you");
});

test("links are full URLs on the www host, and text is escaped", () => {
  const d = buildOwnerDigest({ ...empty, sources: [{ url: "https://a.example/x", exams: ["cdl"], reason: "<b>odd</b> page" }] });
  assert.match(d.html, /href="https:\/\/www\.tigertest\.io\/admin\?tab=questions"/);
  assert.match(d.html, /&lt;b&gt;odd&lt;\/b&gt;/);
  assert.strictEqual(buildOwnerDigest({ ...empty, prs: null }).footer, "GitHub could not be read, so open pull requests are not listed.");
});

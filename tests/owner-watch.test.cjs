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
    sources: [
      { url: "https://dmv.example/handbook", exams: ["dmv"], kind: "person", reason: "Could not read the PDF." },
      { url: "https://www.eqao.example/x", exams: ["eqao9"], kind: "broken", reason: "HTTP 404" },
    ],
    examName: (id) => (id === "eqao9" ? "EQAO Grade 9 Math" : undefined),
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
    "Scheduled jobs that stopped",
    "Pull requests to review",
    "Source links that no longer load",
    "Changed pages Claude handed to you",
    "Questions the audit thinks are wrong",
    "Questions to double-check",
    "Real exams changing soon",
    "Exams due a yearly review",
  ]);
  const text = JSON.stringify(d.sections);
  assert.match(text, /#801/);
  assert.doesNotMatch(text, /#802/);
  assert.match(text, /CDL-001/);
  assert.doesNotMatch(text, /CDL-002/);
  assert.match(text, /1 student report/);
  assert.match(text, /EQAO Grade 9 Math/);
  assert.match(text, /eqao\.example: the page has moved or been removed \(404\)/);
  assert.match(text, /The marked answer looks wrong/);
  assert.match(text, /ccna/);
  assert.doesNotMatch(text, /\bnce\b|\bitil\b/);
  // Each section counts its real items: 1 report + 3 flagged questions, 1 exam due.
  assert.strictEqual(d.count, 11);
  assert.strictEqual(d.subject, "Tigertest: 11 things need you");
});

test("links are full URLs on the www host, and text is escaped", () => {
  const d = buildOwnerDigest({ ...empty, sources: [{ url: "https://a.example/x", exams: ["cdl"], kind: "person", reason: "<b>odd</b> page" }] });
  assert.match(d.html, /href="https:\/\/www\.tigertest\.io\/admin\?tab=questions"/);
  assert.match(d.html, /&lt;b&gt;odd&lt;\/b&gt;/);
  // A long list is cut, but the count stays true.
  const many = buildOwnerDigest({ ...empty, sources: Array.from({ length: 12 }, (_, i) => ({ url: `https://s${i}.example/`, exams: ["cdl"], kind: "broken", reason: "fetch failed" })) });
  assert.strictEqual(many.count, 12);
  assert.strictEqual(many.sections[0].lines.length, 8);
  assert.match(many.html, /and 5 more/);
  assert.strictEqual(buildOwnerDigest({ ...empty, prs: null }).footer, "GitHub could not be read, so open pull requests are not listed.");
});

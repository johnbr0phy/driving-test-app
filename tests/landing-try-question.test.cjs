require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Every v2 landing shows a playable "Try one now" question in place of the
// screenshots. Exams with no plain-text question (SAT math, CogAT, the AP
// reading exams) take one with markup, KaTeX or a short passage, drawn as
// rich text on the server (lib/landingTryQuestion.ts, ExamLandingHero.tsx).
const root = path.join(__dirname, "..");
for (const f of fs.readdirSync(path.join(root, "lib/v2/banks"))) require(path.join(root, "lib/v2/banks", f));
const { pickLandingTryQuestion } = require("../lib/landingTryQuestion.ts");
const { getExamV2ByPath } = require("../lib/v2/registry.ts");

function v2Landings() {
  const out = [];
  for (const dir of fs.readdirSync(path.join(root, "app"))) {
    const file = path.join(root, "app", dir, "page.tsx");
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    if (!src.includes("ExamLandingHero") || src.includes("tryQuestion={false}")) continue;
    const href = src.match(/dashboardHref="([^"]+)"/)?.[1];
    if (href && getExamV2ByPath(href)) out.push({ dir, href });
  }
  return out;
}

test("every v2 landing has a try question", () => {
  const landings = v2Landings();
  assert.ok(landings.length > 100);
  const missing = landings.filter((l) => !pickLandingTryQuestion(l.href)).map((l) => l.dir);
  assert.deepEqual(missing, []);
});

test("plain questions stay plain; rich ones are flagged", () => {
  const cogat = pickLandingTryQuestion("/cogat/dashboard");
  assert.equal(cogat.rich, true, "CogAT stems carry bold and line breaks");
  for (const { href } of v2Landings()) {
    const q = pickLandingTryQuestion(href);
    if (q.rich) continue;
    for (const t of [q.stem, q.explanation, ...q.options]) assert.ok(!/\$|\*\*|__|\n/.test(t), `${q.questionId} is plain`);
  }
});

test("the key stays the right answer after reordering", () => {
  const { getBank } = require("../lib/v2/bank.ts");
  for (const { href } of v2Landings()) {
    const q = pickLandingTryQuestion(href);
    const bq = getBank(q.examId).questions.find((x) => x.id === q.questionId);
    assert.equal(q.options[q.correctIndex], bq.options[bq.correct[0]], q.questionId);
  }
});

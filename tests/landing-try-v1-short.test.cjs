require("tsx/cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// The "Try one now" card on v1 landings takes the shortest suitable question
// (lib/landingTryQuestion.ts): set 1 when it has one that fits a phone, else
// the shortest across the free sets, never a reading passage while anything
// else exists and never a Premium-locked set, so the options sit above the
// fold in the question-first layout.
const root = path.join(__dirname, "..");
for (const f of fs.readdirSync(path.join(root, "lib/banks"))) if (f.endsWith(".ts")) require(path.join(root, "lib/banks", f));
const { pickLandingTryQuestion, TRY_FITS_CHARS } = require("../lib/landingTryQuestion.ts");
const { getExamByPath } = require("../lib/exams.ts");
const { lockedTrainingParts } = require("../lib/examLocks.ts");

function v1Landings() {
  const out = [];
  for (const dir of fs.readdirSync(path.join(root, "app"))) {
    const file = path.join(root, "app", dir, "page.tsx");
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    if (!src.includes("ExamLandingHero") || src.includes("tryQuestion={false}")) continue;
    const href = src.match(/dashboardHref="([^"]+)"/)?.[1];
    if (href && getExamByPath(href)) out.push({ dir, href });
  }
  return out;
}

const size = (q) => q.stem.length + q.options.join("").length;

test("every v1 landing card fits a phone", () => {
  const landings = v1Landings();
  assert.ok(landings.length > 100, `found ${landings.length} v1 landings`);
  const long = [];
  for (const { dir, href } of landings) {
    const q = pickLandingTryQuestion(href);
    if (q && size(q) > TRY_FITS_CHARS) long.push(`${dir} (${size(q)})`);
  }
  assert.deepEqual(long, []);
});

test("an all-passage set 1 falls through to a short question in a free set", () => {
  const q = pickLandingTryQuestion("/police-exam/dashboard");
  assert.ok(q, "police exam has a card");
  assert.ok(!/^\s*read the passage/i.test(q.stem), q.stem);
  assert.ok(size(q) <= TRY_FITS_CHARS);
  const set = Number(q.practiceHref.match(/practice\/(\d+)/)[1]);
  const exam = getExamByPath("/police-exam/dashboard");
  assert.ok(!lockedTrainingParts(exam).some((p) => p.set.setNumber === set), `set ${set} is free`);
});

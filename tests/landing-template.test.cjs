// Every exam landing page (a page that renders ExamLandingHero) follows the one
// landing template: a centred hero on the brand gradient, How It Works, facts,
// sample questions, related tests and the final CTA on the brand gradient.
// In Nov 2026 a batch of ten landings shipped in a compressed layout of their
// own (left-aligned hero copy, no How It Works); this pins the template.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "..", "app");
const REQUIRED = [
  ['id="how-it-works"', "a How It Works section"],
  ["bg-gradient-to-t from-brand-light", "the final CTA on the brand gradient"],
  ["<ExamFacts", "ExamFacts"],
  ["<ExamRelatedTests", "ExamRelatedTests"],
  ["SampleQuestions", "sample questions"],
  ["<ExamLandingCTA", "the final ExamLandingCTA"],
];

test("every exam landing follows the landing template", () => {
  const bad = [];
  for (const dir of fs.readdirSync(APP)) {
    const file = path.join(APP, dir, "page.tsx");
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    if (!src.includes("ExamLandingHero")) continue;
    for (const [needle, what] of REQUIRED) {
      if (!src.includes(needle)) bad.push(`app/${dir}/page.tsx: missing ${what}`);
    }
    // the hero h1 sits in a centred container
    const hero = src.indexOf("<h1");
    if (hero >= 0 && !/text-center/.test(src.slice(Math.max(0, hero - 400), hero))) {
      bad.push(`app/${dir}/page.tsx: hero is not in a text-center container`);
    }
  }
  assert.deepStrictEqual(bad, [], "Copy the template (app/wa-firearm-safety-course-practice-test for v1, app/isc2-cc-practice-test for v2):\n" + bad.join("\n"));
});

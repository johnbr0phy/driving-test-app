// v1's training card (components/TrainingCard.tsx) is the reference UI: it is
// not changed to match v2. v2 draws answers, feedback and Next through
// components/question/, which copy v1's markup. These checks fail if the copy
// drifts from v1 or if v2 stops using it.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const v1 = read("components/TrainingCard.tsx");

// Class strings that define the v1 look, present in both v1 and the shared copy.
const SAME = {
  "components/question/AnswerOption.tsx": [
    "w-full text-left border-2 rounded-lg p-3 md:p-4 transition-all",
    "flex items-center gap-2 md:gap-3",
    "font-bold text-base md:text-lg w-6 shrink-0",
    "flex-1 text-sm md:text-base",
    "border-green-500 bg-green-50 dark:bg-green-950",
    "border-red-500 bg-red-50 dark:bg-red-950",
    "border-gray-300 dark:border-gray-700 opacity-50",
    "h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400 flex-shrink-0",
    "h-5 w-5 md:h-6 md:w-6 text-red-600 dark:text-red-400 flex-shrink-0",
  ],
  "components/question/AnswerFeedback.tsx": [
    "p-3 md:p-4 rounded-lg",
    "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800",
    "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800",
    "font-bold mb-1 md:mb-2 text-sm md:text-base",
  ],
  "components/question/NextButton.tsx": [
    "w-full bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200",
  ],
};

test("shared answer components copy v1's training card markup", () => {
  for (const [file, classes] of Object.entries(SAME)) {
    const src = read(file);
    for (const c of classes) {
      assert.ok(v1.includes(c), `TrainingCard no longer has "${c}"; update ${file} to v1's new look`);
      assert.ok(src.includes(c), `${file} drifted from v1: missing "${c}"`);
    }
  }
});

test("v2 questions and drills render through the shared components", () => {
  const view = read("components/v2/QuestionView.tsx");
  assert.match(view, /from "@\/components\/question\/AnswerOption"/);
  assert.match(view, /from "@\/components\/question\/AnswerFeedback"/);
  assert.doesNotMatch(view, /CheckCircle2|XCircle|amber/, "QuestionView draws its own icons or amber feedback");
  const drill = read("components/v2/DrillRunner.tsx");
  assert.match(drill, /from "@\/components\/question\/NextButton"/);
  assert.match(drill, /<FocusBar/);
});

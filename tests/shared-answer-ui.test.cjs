// v1, DMV, quizzes and v2 share one answer-option and feedback UI
// (components/question/). A question card that draws its own options or
// Correct/Incorrect box would let the engines drift apart again.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

const CARDS = ["components/TrainingCard.tsx", "components/QuestionCard.tsx", "components/v2/QuestionView.tsx"];

test("question cards render options and feedback through the shared components", () => {
  for (const f of CARDS) {
    const src = read(f);
    assert.match(src, /from "@\/components\/question\/AnswerOption"/, `${f} must use AnswerOption`);
    assert.match(src, /from "@\/components\/question\/AnswerFeedback"/, `${f} must use AnswerFeedback`);
    assert.doesNotMatch(src, /CheckCircle2|XCircle/, `${f} draws its own answer icons; AnswerOption owns them`);
  }
});

test("wrong answers show red, never amber", () => {
  const src = read("components/question/AnswerFeedback.tsx");
  assert.match(src, /bg-red-50/);
  assert.doesNotMatch(src, /amber/);
});

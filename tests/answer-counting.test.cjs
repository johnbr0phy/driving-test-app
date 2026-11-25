// Questions answered on /admin (analytics/questions.byExam, the New tests tab's
// "Questions answered") must count a practice-test answer when it is given,
// not when the test is handed in. Until Nov 2026 test answers were counted only
// on submit, so the many people who start Test 1 and leave part way through
// showed as 0 answers next to real traffic.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const read = (p) => fs.readFileSync(path.join(__dirname, "..", p), "utf8");
const between = (src, start, end) => {
  const i = src.indexOf(start);
  assert.ok(i >= 0, `missing ${start}`);
  const j = src.indexOf(end, i + start.length);
  return src.slice(i, j < 0 ? undefined : j);
};

test("v1 and DMV tests count each answer as it is first given", () => {
  const store = read("store/useStore.ts");
  const setAnswer = between(store, "setAnswer: (testId: number, questionIndex: number, answer: string) => {", "clearCurrentTest:");
  assert.match(setAnswer, /firstAnswer/);
  assert.match(setAnswer, /trackQuestionsAnswered\(1, examAnalyticsKey\(getExamForTestId\(testId\)\)\)/);
  const complete = between(store, "completeTest: (testId: number, score: number, questions: Question[], answers: { [key: number]: string }) => {", "getTestSession:");
  assert.match(complete, /questions\.length - alreadyCounted/, "submit counts only what was not counted yet");
});

test("v2 tests count each item as it is first answered", () => {
  const store = read("store/useV2Store.ts");
  const put = between(store, "putSession: (session) => {", "removeSession:");
  assert.match(put, /answeredIds\(session\)\.size - answeredIds\(get\(\)\.sessions\[session\.key\]\)\.size/);
  assert.match(put, /trackQuestionsAnswered\(fresh, session\.examId\)/);
  const add = between(store, "addResult: (result) => {", "answerDrill:");
  assert.match(add, /- counted/, "hand-in counts only what was not counted yet");
});

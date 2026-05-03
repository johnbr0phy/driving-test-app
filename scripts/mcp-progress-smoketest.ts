/**
 * CLI smoketest for lib/server/progress.ts
 *
 * Exercises every exported function from the progress module against a live
 * Firestore user document. Output is pretty-printed JSON. Write commands also
 * print post-mutation state so you can verify the doc was actually updated.
 *
 * ─── SETUP ───────────────────────────────────────────────────────────────────
 *
 * Required environment variable:
 *   FIREBASE_SERVICE_ACCOUNT_KEY   JSON string of the Firebase service account
 *                                  (same var used by the Next.js app)
 *
 * Export it before running:
 *   export FIREBASE_SERVICE_ACCOUNT_KEY='{ "type": "service_account", ... }'
 *
 * ─── WARNING ─────────────────────────────────────────────────────────────────
 *
 * WRITE COMMANDS MUTATE REAL FIRESTORE DATA.
 * DO NOT run against a production user UID.
 * Create a dedicated test Firebase Auth user first, note its UID, and use
 * that UID for all smoketest invocations. The set-state command clears ALL
 * progress for the user — exactly the same destructive behaviour as the web
 * app when switching states.
 *
 * ─── USAGE ───────────────────────────────────────────────────────────────────
 *
 *   npx tsx scripts/mcp-progress-smoketest.ts <subcommand> <uid> [args...]
 *
 * ─── SUBCOMMANDS (read-only) ─────────────────────────────────────────────────
 *
 *   get-user           <uid>
 *       Returns selectedState, language, and subscription for the user.
 *
 *   get-progress       <uid>
 *       Returns completedTestCount, averageScore, accuracy, passProbability,
 *       and trainingSetMastery for the user's currently selected state.
 *
 *   get-test-stats     <uid> <testId: 1-4>
 *       Returns firstScore, bestScore, attemptCount, lastAttemptAt for testId.
 *
 *   get-training       <uid> <setId: 1-4>
 *       Returns masteredCount, total (50), wrongQueueLength, complete flag.
 *
 *   get-question-perf  <uid>
 *       Returns per-question accuracy across tests + training, sorted by
 *       accuracy ascending (weakest questions first).
 *
 *   get-pass-prob      <uid>
 *       Returns the computed pass probability (0-100 integer).
 *
 *   check-daily-cap    <uid>
 *       Shows today's question count and how many remain before the 500/day cap.
 *
 * ─── SUBCOMMANDS (write — mutates Firestore) ─────────────────────────────────
 *
 *   set-state          <uid> <stateCode: 2-letter, e.g. CA>
 *       DESTRUCTIVE. Clears all test + training progress, sets selectedState.
 *
 *   set-language       <uid> <lang: en|es>
 *       Non-destructive. Updates the language field.
 *
 *   start-test         <uid> <testId: 1-4>
 *       Generates questions via testGenerator and writes currentTests[testId].
 *       Idempotent — no-op if a session already exists.
 *       Requires the user to have a selectedState set first (run set-state).
 *
 *   set-answer         <uid> <testId: 1-4> <questionIndex: 0-49> <answer: A-D>
 *       Records a single answer in currentTests[testId].answers.
 *       Increments the daily question counter (enforces 500/day cap).
 *
 *   complete-test      <uid> <testId: 1-4> <score: 0-50>
 *       Reads currentTests[testId] from Firestore, moves it into completedTests,
 *       and updates testAttempts stats. Requires start-test to have been run.
 *
 *   clear-test         <uid> <testId: 1-4>
 *       Abandons an in-progress test — deletes currentTests[testId].
 *
 *   answer-training    <uid> <setId: 1-4> <questionId> <correct: true|false>
 *       Updates trainingSets[setId].masteredIds and wrongQueue.
 *       Enforces 500/day cap. Set 4 requires subscription.isPremium.
 *
 *   reset-training     <uid> <setId: 1-4>
 *       Clears masteredIds and wrongQueue for the training set.
 *
 *   increment-daily    <uid>
 *       Manually increments today's question counter (for cap testing).
 *
 * ─── EXAMPLE WORKFLOW ────────────────────────────────────────────────────────
 *
 *   UID=<your-test-uid>
 *
 *   # 1. Set a state (destructive — clears progress)
 *   npx tsx scripts/mcp-progress-smoketest.ts set-state $UID CA
 *
 *   # 2. Read user info
 *   npx tsx scripts/mcp-progress-smoketest.ts get-user $UID
 *
 *   # 3. Start test 1 (generates questions)
 *   npx tsx scripts/mcp-progress-smoketest.ts start-test $UID 1
 *
 *   # 4. Record an answer for question 0
 *   npx tsx scripts/mcp-progress-smoketest.ts set-answer $UID 1 0 A
 *
 *   # 5. Complete test 1 with score 40
 *   npx tsx scripts/mcp-progress-smoketest.ts complete-test $UID 1 40
 *
 *   # 6. Check progress
 *   npx tsx scripts/mcp-progress-smoketest.ts get-progress $UID
 *
 *   # 7. Answer a training question
 *   npx tsx scripts/mcp-progress-smoketest.ts answer-training $UID 1 q_001 true
 *
 *   # 8. Check pass probability
 *   npx tsx scripts/mcp-progress-smoketest.ts get-pass-prob $UID
 *
 *   # 9. Check daily cap
 *   npx tsx scripts/mcp-progress-smoketest.ts check-daily-cap $UID
 *
 * ─── EXIT CODES ──────────────────────────────────────────────────────────────
 *
 *   0  Success
 *   1  Error (typed errors like PREMIUM_REQUIRED, RATE_LIMIT_DAILY, USER_NOT_FOUND,
 *      or invalid CLI arguments; message printed to stderr)
 */

import {
  getUser,
  getProgress,
  getTestAttemptStats,
  getTrainingSetProgress,
  getQuestionPerformance,
  getPassProbability,
  setSelectedState,
  setLanguage,
  startTest,
  setTestAnswer,
  completeTest,
  clearCurrentTest,
  answerTrainingSetQuestion,
  resetTrainingSet,
  checkDailyQuestionCap,
  incrementDailyQuestionCount,
} from "../lib/server/progress";
import { generateTest, shuffleQuestionOptions } from "../lib/testGenerator";
import { getAdminDb } from "../lib/firebase-admin";
import type { Question } from "../types";

type Subcommand =
  | "get-user"
  | "get-progress"
  | "get-test-stats"
  | "get-training"
  | "get-question-perf"
  | "get-pass-prob"
  | "set-state"
  | "set-language"
  | "start-test"
  | "set-answer"
  | "complete-test"
  | "clear-test"
  | "answer-training"
  | "reset-training"
  | "check-daily-cap"
  | "increment-daily";

const SUBCOMMANDS: Subcommand[] = [
  "get-user",
  "get-progress",
  "get-test-stats",
  "get-training",
  "get-question-perf",
  "get-pass-prob",
  "set-state",
  "set-language",
  "start-test",
  "set-answer",
  "complete-test",
  "clear-test",
  "answer-training",
  "reset-training",
  "check-daily-cap",
  "increment-daily",
];

function printUsage(): void {
  console.log(
    "Usage: npx tsx scripts/mcp-progress-smoketest.ts <subcommand> <uid> [args...]\n",
  );
  console.log("Subcommands:");
  console.log("  get-user           <uid>");
  console.log("  get-progress       <uid>");
  console.log("  get-test-stats     <uid> <testId>");
  console.log("  get-training       <uid> <setId>");
  console.log("  get-question-perf  <uid>");
  console.log("  get-pass-prob      <uid>");
  console.log("  set-state          <uid> <stateCode>");
  console.log("  set-language       <uid> <lang>  (en|es)");
  console.log("  start-test         <uid> <testId>");
  console.log("  set-answer         <uid> <testId> <questionIndex> <answer>");
  console.log("  complete-test      <uid> <testId> <score>");
  console.log("  clear-test         <uid> <testId>");
  console.log(
    "  answer-training    <uid> <setId> <questionId> <correct>  (true|false)",
  );
  console.log("  reset-training     <uid> <setId>");
  console.log("  check-daily-cap    <uid>");
  console.log("  increment-daily    <uid>");
}

function out(label: string, data: unknown): void {
  console.log(`\n=== ${label} ===`);
  console.log(JSON.stringify(data, null, 2));
}

function fatal(message: string): never {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function handleMutatorResult(label: string, result: { ok: boolean; data?: unknown; code?: string; message?: string }): void {
  if (!result.ok) {
    console.error(`\n=== ${label} FAILED ===`);
    console.error(JSON.stringify({ ok: false, code: result.code, message: result.message }, null, 2));
    process.exit(1);
  }
  out(label, result);
}

async function getUserState(uid: string): Promise<string | null> {
  const user = await getUser(uid);
  return user?.selectedState ?? null;
}

async function main(): Promise<void> {
  const [subcommand, uid, ...rest] = process.argv.slice(2);

  if (!subcommand || subcommand === "--help" || subcommand === "-h") {
    printUsage();
    process.exit(0);
  }

  if (!SUBCOMMANDS.includes(subcommand as Subcommand)) {
    console.error(`Unknown subcommand: ${subcommand}\n`);
    printUsage();
    process.exit(1);
  }

  if (!uid) {
    fatal(`<uid> is required. Usage: npx tsx scripts/mcp-progress-smoketest.ts ${subcommand} <uid> [args...]`);
  }

  // Verify firebase-admin can initialise (fails fast if env var is missing)
  getAdminDb();

  switch (subcommand as Subcommand) {
    case "get-user": {
      const result = await getUser(uid);
      out("getUser", result);
      break;
    }

    case "get-progress": {
      const result = await getProgress(uid);
      out("getProgress", result);
      break;
    }

    case "get-test-stats": {
      const testId = rest[0];
      if (!testId) fatal("get-test-stats requires <testId>");
      const id = Number(testId);
      if (!Number.isInteger(id) || id < 1 || id > 4)
        fatal("testId must be 1-4");
      const result = await getTestAttemptStats(uid, id as 1 | 2 | 3 | 4);
      out(`getTestAttemptStats(testId=${id})`, result);
      break;
    }

    case "get-training": {
      const setId = rest[0];
      if (!setId) fatal("get-training requires <setId>");
      const id = Number(setId);
      if (!Number.isInteger(id) || id < 1 || id > 4)
        fatal("setId must be 1-4");
      const result = await getTrainingSetProgress(uid, id as 1 | 2 | 3 | 4);
      out(`getTrainingSetProgress(setId=${id})`, result);
      break;
    }

    case "get-question-perf": {
      const result = await getQuestionPerformance(uid);
      out("getQuestionPerformance", result);
      break;
    }

    case "get-pass-prob": {
      const result = await getPassProbability(uid);
      out("getPassProbability", { passProbability: result });
      break;
    }

    case "set-state": {
      const stateCode = rest[0];
      if (!stateCode) fatal("set-state requires <stateCode>");
      if (!/^[A-Za-z]{2}$/.test(stateCode))
        fatal("stateCode must be a 2-letter code (e.g. CA)");
      const code = stateCode.toUpperCase();
      const result = await setSelectedState(uid, code);
      handleMutatorResult(`setSelectedState(${code})`, result);
      // Post-state: show user and progress
      const [userAfter, progressAfter] = await Promise.all([getUser(uid), getProgress(uid)]);
      out("getUser (post-state)", userAfter);
      out("getProgress (post-state)", progressAfter);
      break;
    }

    case "set-language": {
      const lang = rest[0];
      if (!lang) fatal("set-language requires <lang> (en|es)");
      if (lang !== "en" && lang !== "es")
        fatal('lang must be "en" or "es"');
      const result = await setLanguage(uid, lang as "en" | "es");
      handleMutatorResult(`setLanguage(${lang})`, result);
      const userAfter = await getUser(uid);
      out("getUser (post-language)", userAfter);
      break;
    }

    case "start-test": {
      const testId = rest[0];
      if (!testId) fatal("start-test requires <testId>");
      const id = Number(testId);
      if (!Number.isInteger(id) || id < 1 || id > 4)
        fatal("testId must be 1-4");

      const selectedState = await getUserState(uid);
      if (!selectedState) fatal("User has no selectedState — run set-state first");

      const questions = generateTest(id, selectedState).map(shuffleQuestionOptions);
      const result = await startTest(uid, id as 1 | 2 | 3 | 4, questions);
      handleMutatorResult(`startTest(testId=${id})`, result);
      out("first question (no answer revealed)", {
        questionId: questions[0].questionId,
        question: questions[0].question,
        options: {
          A: questions[0].optionA,
          B: questions[0].optionB,
          C: questions[0].optionC,
          D: questions[0].optionD,
        },
        category: questions[0].category,
      });
      break;
    }

    case "set-answer": {
      const [testIdRaw, qiRaw, answer] = rest;
      if (!testIdRaw || qiRaw === undefined || !answer)
        fatal("set-answer requires <testId> <questionIndex> <answer>");
      const testId = Number(testIdRaw);
      const qi = Number(qiRaw);
      if (!Number.isInteger(testId) || testId < 1 || testId > 4)
        fatal("testId must be 1-4");
      if (!Number.isInteger(qi) || qi < 0 || qi > 49)
        fatal("questionIndex must be 0-49");
      const answerUpper = answer.toUpperCase();
      if (!["A", "B", "C", "D"].includes(answerUpper))
        fatal("answer must be A, B, C, or D");

      const result = await setTestAnswer(uid, testId as 1 | 2 | 3 | 4, qi, answerUpper);
      handleMutatorResult(`setTestAnswer(testId=${testId}, qi=${qi}, answer=${answerUpper})`, result);
      const capAfter = await checkDailyQuestionCap(uid);
      out("checkDailyQuestionCap (post-answer)", capAfter);
      break;
    }

    case "complete-test": {
      const [testIdRaw, scoreRaw] = rest;
      if (!testIdRaw || scoreRaw === undefined)
        fatal("complete-test requires <testId> <score>");
      const testId = Number(testIdRaw);
      const score = Number(scoreRaw);
      if (!Number.isInteger(testId) || testId < 1 || testId > 4)
        fatal("testId must be 1-4");
      if (!Number.isInteger(score) || score < 0 || score > 50)
        fatal("score must be 0-50");

      // Read current test from Firestore to get questions and build a synthetic answers map
      const db = getAdminDb();
      const snap = await db.collection("users").doc(uid).get();
      if (!snap.exists) fatal("User document not found");
      const data = snap.data() as { currentTests?: Record<string, { questions: Question[]; answers: Record<string, string> }> };
      const currentTest = data.currentTests?.[String(testId)];
      if (!currentTest) fatal(`No in-progress test ${testId} — run start-test first`);

      const { questions, answers: existingAnswers } = currentTest;
      // Build answers map: use existing answers where recorded, else answer A for unrecorded
      const answersMap: { [key: number]: string } = {};
      for (let i = 0; i < questions.length; i++) {
        answersMap[i] = existingAnswers[String(i)] ?? "A";
      }

      const result = await completeTest(uid, testId as 1 | 2 | 3 | 4, score, questions, answersMap);
      handleMutatorResult(`completeTest(testId=${testId}, score=${score})`, result);
      const [statsAfter, progressAfter] = await Promise.all([
        getTestAttemptStats(uid, testId as 1 | 2 | 3 | 4),
        getProgress(uid),
      ]);
      out(`getTestAttemptStats(testId=${testId}) (post-complete)`, statsAfter);
      out("getProgress (post-complete)", progressAfter);
      break;
    }

    case "clear-test": {
      const testId = rest[0];
      if (!testId) fatal("clear-test requires <testId>");
      const id = Number(testId);
      if (!Number.isInteger(id) || id < 1 || id > 4)
        fatal("testId must be 1-4");
      const result = await clearCurrentTest(uid, id as 1 | 2 | 3 | 4);
      handleMutatorResult(`clearCurrentTest(testId=${id})`, result);
      break;
    }

    case "answer-training": {
      const [setIdRaw, questionId, correctRaw] = rest;
      if (!setIdRaw || !questionId || correctRaw === undefined)
        fatal("answer-training requires <setId> <questionId> <correct>");
      const setId = Number(setIdRaw);
      if (!Number.isInteger(setId) || setId < 1 || setId > 4)
        fatal("setId must be 1-4");
      if (correctRaw !== "true" && correctRaw !== "false")
        fatal('correct must be "true" or "false"');
      const isCorrect = correctRaw === "true";

      const result = await answerTrainingSetQuestion(uid, setId as 1 | 2 | 3 | 4, questionId, isCorrect);
      handleMutatorResult(`answerTrainingSetQuestion(setId=${setId}, qId=${questionId}, isCorrect=${isCorrect})`, result);
      const [trainingAfter, progressAfter] = await Promise.all([
        getTrainingSetProgress(uid, setId as 1 | 2 | 3 | 4),
        getProgress(uid),
      ]);
      out(`getTrainingSetProgress(setId=${setId}) (post-answer)`, trainingAfter);
      out("getProgress (post-answer)", progressAfter);
      break;
    }

    case "reset-training": {
      const setId = rest[0];
      if (!setId) fatal("reset-training requires <setId>");
      const id = Number(setId);
      if (!Number.isInteger(id) || id < 1 || id > 4)
        fatal("setId must be 1-4");
      const result = await resetTrainingSet(uid, id as 1 | 2 | 3 | 4);
      handleMutatorResult(`resetTrainingSet(setId=${id})`, result);
      const trainingAfter = await getTrainingSetProgress(uid, id as 1 | 2 | 3 | 4);
      out(`getTrainingSetProgress(setId=${id}) (post-reset)`, trainingAfter);
      break;
    }

    case "check-daily-cap": {
      const result = await checkDailyQuestionCap(uid);
      out("checkDailyQuestionCap", result);
      break;
    }

    case "increment-daily": {
      const result = await incrementDailyQuestionCount(uid);
      handleMutatorResult("incrementDailyQuestionCount", result);
      const capAfter = await checkDailyQuestionCap(uid);
      out("checkDailyQuestionCap (post-increment)", capAfter);
      break;
    }

    default: {
      const _exhaustive: never = subcommand as never;
      fatal(`Unhandled subcommand: ${_exhaustive}`);
    }
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});

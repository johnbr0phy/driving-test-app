import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { ok, fail, formatStateRequiredError } from '@/lib/server/mcp-tool-helpers';
import { states } from '@/data/states';
import { getUser, getProgress, getTestAttemptStats, getTrainingSetProgress, getTrainingSetData, getQuestionPerformance, setSelectedState, setLanguage, answerTrainingSetQuestion, resetTrainingSet, startTest, setTestAnswer, clearCurrentTest, completeTest, getCurrentTest, getRecentTestSession } from '@/lib/server/progress';
import { generateTest, getNextTrainingSetQuestion, getTrainingSetQuestions, shuffleQuestionOptions } from '@/lib/testGenerator';
import { SIGN_BY_QUESTION_ID } from '@/lib/signImages';
import questionsRaw from '@/data/questions.json';

const questionMeta = new Map<string, { question: string; category: string }>(
  (questionsRaw as Array<{ questionId: string; question: string; category: string }>).map(
    (q) => [q.questionId, { question: q.question, category: q.category }]
  )
);

export interface ToolContext {
  userId: string;
}

type ToolEntry = {
  name: string;
  description: string;
  register: (server: McpServer, ctx: ToolContext) => void;
};

/**
 * How to add a new tool:
 *
 * 1. Import the relevant function from lib/server/progress.ts.
 * 2. Declare a ToolEntry object with `name`, `description`, and `register`.
 * 3. Push it onto the `tools` array below.
 * 4. In `register`, call server.registerTool() with:
 *    - inputSchema: a Zod raw shape, e.g. `{ testId: z.number().int().min(1).max(4) }`.
 *      Use `{}` (empty object) for tools with no arguments.
 *    - A handler that receives typed `args` and returns ok() or fail().
 *
 * Conventions:
 * - Always derive userId from ctx.userId — never accept it as a tool argument.
 * - Use ok(data) to return a successful result; it pretty-prints JSON as a text block.
 * - Use fail(code, message) to return an error; it sets isError: true on the content block.
 * - Read-only tools must fail() with code='USER_NOT_FOUND' when progress.ts returns null.
 * - When a progress.ts function returns MutatorResult, propagate !result.ok as a fail().
 *
 * Example:
 *   import { getProgress } from '@/lib/server/progress';
 *   // ...
 *   {
 *     name: 'get_progress',
 *     description: 'Returns the user\'s overall progress.',
 *     register(server, ctx) {
 *       server.registerTool('get_progress', { description: this.description, inputSchema: {} }, async () => {
 *         const data = await getProgress(ctx.userId);
 *         if (!data) return fail('USER_NOT_FOUND', 'User not found.');
 *         return ok(data);
 *       });
 *     },
 *   }
 */

// Re-export for convenience so tool modules only need to import from mcp-tools.ts if desired.
export { z, ok, fail };

function readSignSvg(signId: string): string | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'signs', `${signId}.svg`);
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

function formatQuestionForTest(q: ReturnType<typeof shuffleQuestionOptions>, _issuerUrl: string) {
  const signId = SIGN_BY_QUESTION_ID[q.questionId];
  const svg = signId ? readSignSvg(signId) : null;
  return {
    questionId: q.questionId,
    question: q.question,
    category: q.category,
    options: { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD },
    ...(svg ? { imageSvg: svg } : {}),
  };
}

function formatQuestion(q: ReturnType<typeof shuffleQuestionOptions>, _issuerUrl: string) {
  const signId = SIGN_BY_QUESTION_ID[q.questionId];
  const svg = signId ? readSignSvg(signId) : null;
  return {
    questionId: q.questionId,
    question: q.question,
    category: q.category,
    options: { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD },
    ...(svg ? { imageSvg: svg } : {}),
  };
}

const tools: ToolEntry[] = [
  {
    name: 'ping',
    description:
      'Health check. Returns the authenticated user\'s UID and a timestamp. Use to verify the MCP connection works.',
    register(server, ctx) {
      server.registerTool(
        'ping',
        {
          description: this.description,
          inputSchema: {},
        },
        async () => ({
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                ok: true,
                userId: ctx.userId,
                timestamp: new Date().toISOString(),
              }),
            },
          ],
        }),
      );
    },
  },
  {
    name: 'list_states',
    description:
      'List all 51 supported states (50 states + DC) with their DMV passing scores and question counts. Static reference data — useful for showing the user what states are supported or comparing test difficulty across states.',
    register(server) {
      server.registerTool(
        'list_states',
        {
          description: this.description,
          inputSchema: {},
        },
        async () =>
          ok(
            states.map(({ code, name, passingScore, writtenTestQuestions }) => ({
              code,
              name,
              passingScore,
              writtenTestQuestions,
            }))
          )
      );
    },
  },
  {
    name: 'get_user_state',
    description:
      "Returns the user's currently selected DMV state and preferred language. Returns selectedState: null if no state has been picked yet — this is a valid response, not an error. Call this before running tests or checking progress to confirm a state is selected.",
    register(server, ctx) {
      server.registerTool(
        'get_user_state',
        {
          description: this.description,
          inputSchema: {},
        },
        async () => {
          const user = await getUser(ctx.userId);
          if (!user) return fail('USER_NOT_FOUND', 'User not found.');
          return ok({ selectedState: user.selectedState, language: user.language });
        }
      );
    },
  },
  {
    name: 'get_progress',
    description:
      "Returns a summary of the user's progress on their selected state: completedTestCount, averageScore, accuracy, passProbability (0-100 scale), and trainingSetMastery (mastered/total per set). Use this to give the user an overview of how they're doing. Fails with STATE_REQUIRED if no state is selected.",
    register(server, ctx) {
      server.registerTool(
        'get_progress',
        {
          description: this.description,
          inputSchema: {},
        },
        async () => {
          const progress = await getProgress(ctx.userId);
          if (!progress) return formatStateRequiredError();
          return ok(progress);
        }
      );
    },
  },
  {
    name: 'get_test_attempt_stats',
    description:
      'Returns historical attempt stats for one of the 4 practice tests (Test A, B, C, D). Use to tell the user how they\'ve improved over multiple attempts of the same test, or to recommend whether they should retake it.',
    register(server, ctx) {
      server.registerTool(
        'get_test_attempt_stats',
        {
          description: this.description,
          inputSchema: { testId: z.number().int().min(1).max(4) },
        },
        async (args) => {
          const testId = args.testId as 1 | 2 | 3 | 4;
          const data = await getTestAttemptStats(ctx.userId, testId);
          if (!data) return fail('USER_NOT_FOUND', 'User not found.');
          return ok(data);
        }
      );
    },
  },
  {
    name: 'get_training_set_progress',
    description:
      'Returns mastery progress for one of the 4 training sets. masteredCount of 50 means complete. wrongQueueLength is the number of questions queued for re-quiz due to past wrong answers. Use to recommend which set to work on next.',
    register(server, ctx) {
      server.registerTool(
        'get_training_set_progress',
        {
          description: this.description,
          inputSchema: { setId: z.number().int().min(1).max(4) },
        },
        async (args) => {
          const setId = args.setId as 1 | 2 | 3 | 4;
          const data = await getTrainingSetProgress(ctx.userId, setId);
          if (!data) return fail('USER_NOT_FOUND', 'User not found.');
          return ok(data);
        }
      );
    },
  },
  {
    name: 'get_weak_areas',
    description:
      "Returns the user's N weakest questions sorted ascending by accuracy. Each entry includes the question text and category so the AI can identify themes (e.g. 'mostly speed-limit questions'). Default limit is 10. Use this to help the user understand where to focus.",
    register(server, ctx) {
      server.registerTool(
        'get_weak_areas',
        {
          description: this.description,
          inputSchema: { limit: z.number().int().min(1).max(50).default(10).optional() },
        },
        async (args) => {
          const limit = args.limit ?? 10;
          const performance = await getQuestionPerformance(ctx.userId);
          if (!performance) {
            const user = await getUser(ctx.userId);
            if (!user) return fail('USER_NOT_FOUND', 'User not found.');
            if (!user.selectedState) return formatStateRequiredError();
            return ok([]);
          }
          if (performance.length === 0) return ok([]);
          const slice = performance.slice(0, limit);
          const enriched = slice.map((entry) => {
            const meta = questionMeta.get(entry.questionId);
            return {
              questionId: entry.questionId,
              accuracy: entry.accuracy,
              timesSeen: entry.timesSeen,
              timesCorrect: entry.timesCorrect,
              question: meta?.question ?? '',
              category: meta?.category ?? '',
            };
          });
          return ok(enriched);
        }
      );
    },
  },
  {
    name: 'start_training_set',
    description:
      'Begins a training set session (setId 1-4). Validates the user has a state selected and, for set 4, a premium subscription. Returns the first question without the correct answer. ALWAYS display all 4 answer options (A, B, C, D) with every question — never omit them. Display without bullet points, just letter and text on each line (e.g. "A. Option text"). After the user answers, call submit_training_answer. Keep looping with get_next_training_question until complete:true.',
    register(server, ctx) {
      server.registerTool(
        'start_training_set',
        { description: this.description, inputSchema: { setId: z.number().int().min(1).max(4) } },
        async (args) => {
          const setId = args.setId as 1 | 2 | 3 | 4;
          const user = await getUser(ctx.userId);
          if (!user) return fail('USER_NOT_FOUND', 'User not found.');
          if (!user.selectedState) return formatStateRequiredError();
          if (setId === 4 && !user.subscription?.isPremium) {
            return fail('PREMIUM_REQUIRED', 'Training set 4 requires a premium subscription.');
          }
          const [progress, setData] = await Promise.all([
            getTrainingSetProgress(ctx.userId, setId),
            getTrainingSetData(ctx.userId, setId),
          ]);
          if (!progress || !setData) return fail('USER_NOT_FOUND', 'User not found.');

          const raw = getNextTrainingSetQuestion(setId, user.selectedState, setData.masteredIds, setData.wrongQueue, null, user.language as 'en' | 'es');
          if (!raw) {
            return ok({ complete: true, progress: { mastered: progress.masteredCount, total: progress.total, wrongQueueSize: progress.wrongQueueLength } });
          }
          const issuerUrl = process.env.MCP_OAUTH_ISSUER_URL ?? '';
          return ok({
            complete: false,
            question: formatQuestion(raw, issuerUrl),
            progress: { mastered: progress.masteredCount, total: progress.total, wrongQueueSize: progress.wrongQueueLength },
          });
        }
      );
    },
  },
  {
    name: 'get_next_training_question',
    description:
      'Returns the next question in a training set. Call this after submit_training_answer to continue the loop. Returns complete:true when the set is fully mastered. ALWAYS display all 4 answer options (A, B, C, D) with every question — never omit them. Display without bullet points, just letter and text on each line (e.g. "A. Option text").',
    register(server, ctx) {
      server.registerTool(
        'get_next_training_question',
        { description: this.description, inputSchema: { setId: z.number().int().min(1).max(4) } },
        async (args) => {
          const setId = args.setId as 1 | 2 | 3 | 4;
          const user = await getUser(ctx.userId);
          if (!user) return fail('USER_NOT_FOUND', 'User not found.');
          if (!user.selectedState) return formatStateRequiredError();

          const [progress, setData] = await Promise.all([
            getTrainingSetProgress(ctx.userId, setId),
            getTrainingSetData(ctx.userId, setId),
          ]);
          if (!progress || !setData) return fail('USER_NOT_FOUND', 'User not found.');

          const raw = getNextTrainingSetQuestion(setId, user.selectedState, setData.masteredIds, setData.wrongQueue, null, user.language as 'en' | 'es');
          if (!raw) {
            return ok({ complete: true, progress: { mastered: progress.masteredCount, total: progress.total, wrongQueueSize: progress.wrongQueueLength } });
          }
          const issuerUrl = process.env.MCP_OAUTH_ISSUER_URL ?? '';
          return ok({
            complete: false,
            question: formatQuestion(raw, issuerUrl),
            progress: { mastered: progress.masteredCount, total: progress.total, wrongQueueSize: progress.wrongQueueLength },
          });
        }
      );
    },
  },
  {
    name: 'submit_training_answer',
    description:
      'Submits the user\'s answer for a training set question. Unlike practice tests, training mode reveals correctness immediately. Returns isCorrect, correctAnswer, explanation, and updated progress. Then call get_next_training_question.',
    register(server, ctx) {
      server.registerTool(
        'submit_training_answer',
        {
          description: this.description,
          inputSchema: {
            setId: z.number().int().min(1).max(4),
            questionId: z.string(),
            answer: z.enum(['A', 'B', 'C', 'D']),
          },
        },
        async (args) => {
          const setId = args.setId as 1 | 2 | 3 | 4;
          const user = await getUser(ctx.userId);
          if (!user) return fail('USER_NOT_FOUND', 'User not found.');
          if (!user.selectedState) return formatStateRequiredError();

          const setQuestions = getTrainingSetQuestions(setId, user.selectedState, user.language as 'en' | 'es');
          const question = setQuestions.find((q) => q.questionId === args.questionId);
          if (!question) return fail('QUESTION_NOT_FOUND', `Question ${args.questionId} not found in set ${setId}.`);

          const isCorrect = args.answer === question.correctAnswer;
          const result = await answerTrainingSetQuestion(ctx.userId, setId, args.questionId as string, isCorrect);
          if (!result.ok) return fail(result.code, result.message);

          return ok({
            isCorrect,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            progress: {
              mastered: result.data.masteredCount,
              total: 50,
              wrongQueueSize: result.data.wrongQueueLength,
              complete: result.data.complete,
            },
          });
        }
      );
    },
  },
  {
    name: 'reset_training_set',
    description:
      'Resets a training set — clears all mastery and wrong queue data for that set. DESTRUCTIVE. You MUST confirm with the user before calling. The `confirm: true` argument is required.',
    register(server, ctx) {
      server.registerTool(
        'reset_training_set',
        {
          description: this.description,
          inputSchema: {
            setId: z.number().int().min(1).max(4),
            confirm: z.literal(true),
          },
        },
        async (args) => {
          const setId = args.setId as 1 | 2 | 3 | 4;
          const result = await resetTrainingSet(ctx.userId, setId);
          if (!result.ok) return fail(result.code, result.message);
          return ok(result.data);
        }
      );
    },
  },
  {
    name: 'start_practice_test',
    description:
      'Begins one of the 4 DMV practice tests. Idempotent — if a session already exists for this testId it is left intact. Generates and stores 50 questions on first call. Returns the first question WITHOUT the correct answer or explanation (those are withheld until submit_practice_test). Test 4 requires premium. ALWAYS display all 4 answer options (A, B, C, D) with every question — never omit them. Display without bullet points, just letter and text on each line (e.g. "A. Option text").',
    register(server, ctx) {
      server.registerTool(
        'start_practice_test',
        { description: this.description, inputSchema: { testId: z.number().int().min(1).max(4) } },
        async (args) => {
          const testId = args.testId as 1 | 2 | 3 | 4;
          const user = await getUser(ctx.userId);
          if (!user) return fail('USER_NOT_FOUND', 'User not found.');
          if (!user.selectedState) return formatStateRequiredError();

          const questions = generateTest(testId, user.selectedState, user.language as 'en' | 'es').map(shuffleQuestionOptions);
          const startResult = await startTest(ctx.userId, testId, questions);
          if (!startResult.ok) return fail(startResult.code, startResult.message);

          // Read back the persisted test (idempotent — may be existing session)
          const session = await getCurrentTest(ctx.userId, testId);
          if (!session) return fail('INTERNAL_ERROR', 'Failed to read test session.');

          const issuerUrl = process.env.MCP_OAUTH_ISSUER_URL ?? '';
          const answeredCount = Object.keys(session.answers).length;
          const nextIndex = answeredCount; // first unanswered
          const q = session.questions[nextIndex];

          return ok({
            testId,
            totalQuestions: session.questions.length,
            answeredCount,
            nextQuestionIndex: nextIndex,
            question: formatQuestionForTest(q, issuerUrl),
          });
        }
      );
    },
  },
  {
    name: 'get_next_test_question',
    description:
      'Returns the next unanswered question in a practice test, or complete:true when all 50 are answered. Call submit_practice_test once complete:true is returned. ALWAYS display all 4 answer options (A, B, C, D) with every question — never omit them. Display without bullet points, just letter and text on each line (e.g. "A. Option text").',
    register(server, ctx) {
      server.registerTool(
        'get_next_test_question',
        { description: this.description, inputSchema: { testId: z.number().int().min(1).max(4) } },
        async (args) => {
          const testId = args.testId as 1 | 2 | 3 | 4;
          const session = await getCurrentTest(ctx.userId, testId);
          if (!session) return fail('TEST_NOT_STARTED', `No active test session for test ${testId}. Call start_practice_test first.`);

          const answeredCount = Object.keys(session.answers).length;
          if (answeredCount >= session.questions.length) {
            return ok({ complete: true, testId, answeredCount, totalQuestions: session.questions.length });
          }

          const nextIndex = answeredCount;
          const q = session.questions[nextIndex];
          const issuerUrl = process.env.MCP_OAUTH_ISSUER_URL ?? '';

          return ok({
            complete: false,
            testId,
            nextQuestionIndex: nextIndex,
            answeredCount,
            totalQuestions: session.questions.length,
            question: formatQuestionForTest(q, issuerUrl),
          });
        }
      );
    },
  },
  {
    name: 'submit_test_answer',
    description:
      'Records the user\'s answer for a practice test question. Does NOT reveal whether the answer is correct — that is withheld until submit_practice_test. Returns the next question (or complete:true) in the same response to save a round trip. ALWAYS display all 4 answer options (A, B, C, D) with every question — never omit them. Display without bullet points, just letter and text on each line (e.g. "A. Option text").',
    register(server, ctx) {
      server.registerTool(
        'submit_test_answer',
        {
          description: this.description,
          inputSchema: {
            testId: z.number().int().min(1).max(4),
            questionIndex: z.number().int().min(0).max(49),
            answer: z.enum(['A', 'B', 'C', 'D']),
          },
        },
        async (args) => {
          const testId = args.testId as 1 | 2 | 3 | 4;
          const result = await setTestAnswer(ctx.userId, testId, args.questionIndex as number, args.answer as string);
          if (!result.ok) return fail(result.code, result.message);

          const session = await getCurrentTest(ctx.userId, testId);
          if (!session) return fail('INTERNAL_ERROR', 'Failed to read test session.');

          const answeredCount = Object.keys(session.answers).length;
          if (answeredCount >= session.questions.length) {
            return ok({ complete: true, testId, answeredCount, totalQuestions: session.questions.length });
          }

          const nextIndex = answeredCount;
          const q = session.questions[nextIndex];
          const issuerUrl = process.env.MCP_OAUTH_ISSUER_URL ?? '';

          return ok({
            complete: false,
            testId,
            nextQuestionIndex: nextIndex,
            answeredCount,
            totalQuestions: session.questions.length,
            question: formatQuestionForTest(q, issuerUrl),
          });
        }
      );
    },
  },
  {
    name: 'submit_practice_test',
    description:
      'Grades the completed practice test. Returns score, pass/fail, per-question breakdown with correct answers and explanations, and category accuracy stats. Call only after all 50 questions are answered (get_next_test_question returns complete:true).',
    register(server, ctx) {
      server.registerTool(
        'submit_practice_test',
        { description: this.description, inputSchema: { testId: z.number().int().min(1).max(4) } },
        async (args) => {
          const testId = args.testId as 1 | 2 | 3 | 4;
          const session = await getCurrentTest(ctx.userId, testId);
          if (!session) return fail('TEST_NOT_STARTED', `No active test session for test ${testId}.`);

          const answeredCount = Object.keys(session.answers).length;
          if (answeredCount < session.questions.length) {
            return fail('TEST_INCOMPLETE', `Test has ${answeredCount}/${session.questions.length} answers. Answer all questions first.`);
          }

          // Score
          const answerMap: { [key: number]: string } = {};
          for (const [k, v] of Object.entries(session.answers)) answerMap[Number(k)] = v;

          let correctCount = 0;
          const breakdown = session.questions.map((q, i) => {
            const userAnswer = answerMap[i] ?? '';
            const isCorrect = userAnswer === q.correctAnswer;
            if (isCorrect) correctCount++;
            return { questionIndex: i, questionId: q.questionId, question: q.question, category: q.category, userAnswer, correctAnswer: q.correctAnswer, explanation: q.explanation, isCorrect };
          });

          // Category stats
          const catMap = new Map<string, { correct: number; total: number }>();
          for (const b of breakdown) {
            const e = catMap.get(b.category) ?? { correct: 0, total: 0 };
            e.total++;
            if (b.isCorrect) e.correct++;
            catMap.set(b.category, e);
          }
          const categoryStats = Array.from(catMap.entries()).map(([category, s]) => ({
            category,
            correct: s.correct,
            total: s.total,
            accuracy: Math.round((s.correct / s.total) * 100),
          }));

          const completeResult = await completeTest(ctx.userId, testId, correctCount, session.questions, answerMap);
          if (!completeResult.ok) return fail(completeResult.code, completeResult.message);

          const user = await getUser(ctx.userId);
          const stateData = user?.selectedState ? (await import('@/data/states')).states.find(s => s.code === user.selectedState) : null;
          const passingScore = stateData?.passingScore ?? 40;

          return ok({
            sessionId: completeResult.data.sessionId,
            testId,
            score: correctCount,
            totalQuestions: session.questions.length,
            passed: correctCount >= passingScore,
            passingScore,
            breakdown,
            categoryStats,
          });
        }
      );
    },
  },
  {
    name: 'resume_practice_test',
    description:
      'Returns metadata about an in-progress practice test: how many questions are answered, which index is next, and when it was started. Use to orient the user after a break before calling get_next_test_question.',
    register(server, ctx) {
      server.registerTool(
        'resume_practice_test',
        { description: this.description, inputSchema: { testId: z.number().int().min(1).max(4) } },
        async (args) => {
          const testId = args.testId as 1 | 2 | 3 | 4;
          const session = await getCurrentTest(ctx.userId, testId);
          if (!session) return fail('TEST_NOT_STARTED', `No active test session for test ${testId}.`);
          const answeredCount = Object.keys(session.answers).length;
          return ok({
            testId,
            startedAt: session.startedAt,
            answeredCount,
            totalQuestions: session.questions.length,
            nextQuestionIndex: answeredCount < session.questions.length ? answeredCount : null,
            complete: answeredCount >= session.questions.length,
          });
        }
      );
    },
  },
  {
    name: 'abandon_practice_test',
    description:
      'Abandons an in-progress practice test and deletes the session. All answers are lost. You MUST confirm with the user before calling. The `confirm: true` argument is required.',
    register(server, ctx) {
      server.registerTool(
        'abandon_practice_test',
        {
          description: this.description,
          inputSchema: { testId: z.number().int().min(1).max(4), confirm: z.literal(true) },
        },
        async (args) => {
          const testId = args.testId as 1 | 2 | 3 | 4;
          const result = await clearCurrentTest(ctx.userId, testId);
          if (!result.ok) return fail(result.code, result.message);
          return ok({ abandoned: true, testId });
        }
      );
    },
  },
  {
    name: 'get_test_results',
    description:
      'Returns the most recent completed test session for a given testId, including score, pass/fail, per-question breakdown with correct answers and explanations.',
    register(server, ctx) {
      server.registerTool(
        'get_test_results',
        { description: this.description, inputSchema: { testId: z.number().int().min(1).max(4) } },
        async (args) => {
          const testId = args.testId as 1 | 2 | 3 | 4;
          const session = await getRecentTestSession(ctx.userId, testId);
          if (!session) return fail('NO_RESULTS', `No completed sessions found for test ${testId}.`);

          const user = await getUser(ctx.userId);
          const stateData = user?.selectedState ? (await import('@/data/states')).states.find(s => s.code === user.selectedState) : null;
          const passingScore = stateData?.passingScore ?? 40;

          const breakdown = session.questions.map((q, i) => {
            const ua = session.answers[i];
            return {
              questionIndex: i,
              questionId: q.questionId,
              question: q.question,
              category: q.category,
              userAnswer: ua?.userAnswer ?? '',
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              isCorrect: ua?.isCorrect ?? false,
            };
          });

          return ok({
            sessionId: session.id,
            testId: session.testNumber,
            state: session.state,
            score: session.score,
            totalQuestions: session.totalQuestions,
            passed: session.score >= passingScore,
            passingScore,
            startedAt: session.startedAt,
            completedAt: session.completedAt,
            breakdown,
          });
        }
      );
    },
  },
  {
    name: 'set_user_state',
    description:
      "Sets the user's DMV state. DESTRUCTIVE: clears all test history, training progress, and mastery data. You MUST confirm with the user before calling this — explain that their progress will be reset. The `confirm: true` argument is required and forces you to obtain that confirmation first.",
    register(server, ctx) {
      server.registerTool(
        'set_user_state',
        {
          description: this.description,
          inputSchema: {
            stateCode: z.string().length(2).toUpperCase(),
            confirm: z.literal(true),
          },
        },
        async (args) => {
          const stateCode = (args.stateCode as string).toUpperCase();
          const valid = states.some((s) => s.code === stateCode);
          if (!valid) return fail('INVALID_STATE', `Unknown state code: ${stateCode}. Call list_states to see valid codes.`);
          const result = await setSelectedState(ctx.userId, stateCode);
          if (!result.ok) return fail(result.code, result.message);
          return ok(result.data);
        }
      );
    },
  },
  {
    name: 'set_language',
    description:
      'Sets the question language to English ("en") or Spanish ("es"). Non-destructive — does not clear any progress. The web app will immediately reflect the change.',
    register(server, ctx) {
      server.registerTool(
        'set_language',
        {
          description: this.description,
          inputSchema: { lang: z.enum(['en', 'es']) },
        },
        async (args) => {
          const result = await setLanguage(ctx.userId, args.lang as 'en' | 'es');
          if (!result.ok) return fail(result.code, result.message);
          return ok(result.data);
        }
      );
    },
  },
];

export function registerTools(server: McpServer, ctx: ToolContext): void {
  for (const tool of tools) {
    tool.register(server, ctx);
  }
}

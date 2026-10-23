import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ok, fail, formatStateRequiredError } from '@/lib/server/mcp-tool-helpers';
import { states } from '@/data/states';
import { getUser, getProgress, getTestAttemptStats, getTrainingSetProgress, getTrainingSetData, getQuestionPerformance, setSelectedState, setLanguage, answerTrainingSetQuestion, resetTrainingSet, startTest, setTestAnswer, clearCurrentTest, completeTest, getCurrentTest, getRecentTestSession } from '@/lib/server/progress';
import { generateTest, getNextTrainingSetQuestion, getTrainingSetQuestions, shuffleQuestionOptions } from '@/lib/testGenerator';
import { SIGN_BY_QUESTION_ID } from '@/lib/signImages';
import questionsRaw from '@/data/questions.json';
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin';
import {
  QUIZ_LIMITS,
  QUIZ_MAX_DESCRIPTION,
  QUIZ_MAX_EXPLANATION,
  QUIZ_MAX_OPTION_TEXT,
  QUIZ_MAX_QUESTION_TEXT,
  QUIZ_MAX_TITLE,
  QUIZ_MAX_TOPIC,
  QUIZ_MIN_QUESTIONS,
  QUIZ_OPTION_COUNT,
  isQuizCode,
  normalizeQuizCode,
  quizPath,
  quizPublic,
  quizSummary,
  quizTopics,
  type QuizDoc,
  type QuizSummary,
} from '@/lib/quizzes';
import {
  QuizError,
  listOwnerClasses,
  createQuiz,
  deleteQuiz,
  getQuiz,
  isPremiumUid,
  listMyQuizzes,
  quizAsClassDoc,
  quizLimits,
  quizReportSubject,
  updateQuiz,
  type QuizOwner,
} from '@/lib/server/quizzes';
import { buildClassReport, type MemberDoc } from '@/lib/server/classReport';
import { QUIZ_CONTEXT_GUIDANCE, QUIZ_WRITING_EXAMPLE, QUIZ_WRITING_GUIDE } from '@/lib/quizWritingGuide';
import { listInProgressTests, studyProgress } from '@/lib/server/mcpStudyProgress';
import { nextCatalogPractice, answerCatalogPractice } from '@/lib/server/mcpCatalogPractice';
import { nextV2Practice, answerV2Practice } from '@/lib/server/mcpV2Practice';
import { EXAMS_V2 } from '@/lib/v2/registry';
import { getExamById } from '@/lib/exams';
import { answerQuizQuestion, findQuizzes, loadPlayableQuiz, nextQuizQuestion, resetQuizPlay, type PlayableQuizError } from '@/lib/server/mcpQuizPlay';

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

function formatQuestionForTest(q: ReturnType<typeof shuffleQuestionOptions>, issuerUrl: string) {
  const signId = SIGN_BY_QUESTION_ID[q.questionId];
  return {
    questionId: q.questionId,
    question: q.question,
    category: q.category,
    options: { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD },
    ...(signId ? { imageUrl: `${issuerUrl}/signs/${signId}.svg` } : {}),
  };
}

function formatQuestion(q: ReturnType<typeof shuffleQuestionOptions>, issuerUrl: string) {
  const signId = SIGN_BY_QUESTION_ID[q.questionId];
  return {
    questionId: q.questionId,
    question: q.question,
    category: q.category,
    options: { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD },
    ...(signId ? { imageUrl: `${issuerUrl}/signs/${signId}.svg` } : {}),
  };
}

// ─── quiz_me / answer helpers (lib/server/mcpQuizPlay.ts) ───────────────────

function quizPlayFail(error: PlayableQuizError, code: string) {
  if (error === 'QUIZ_CLASS_ONLY') {
    return fail('QUIZ_CLASS_ONLY', `Quiz ${code.toUpperCase()} is only for one teacher's class, so it is played on the site: ${siteUrl()}/q/${code.toUpperCase()} (students type their class code there).`);
  }
  return error === 'QUIZ_PRIVATE'
    ? fail('QUIZ_PRIVATE', `Quiz ${code.toUpperCase()} is private to its creator.`)
    : fail('QUIZ_NOT_FOUND', `No quiz with code ${code.toUpperCase()}. Check the link (tigertest.io/q/<CODE>) or search with find_quiz.`);
}

async function quizMeResult(uid: string, quiz: QuizDoc) {
  const next = await nextQuizQuestion(uid, quiz);
  const links = quizLinks(quiz.code);
  if (next.complete) {
    return {
      quiz: quiz.code,
      title: quiz.title,
      complete: true,
      progress: next.progress,
      message: 'Every question is mastered. Offer to start over (reset_quiz_play) or to try another quiz (find_quiz).',
      url: links.url,
    };
  }
  return { quiz: quiz.code, title: quiz.title, by: quiz.ownerName, complete: false, question: next.question, progress: next.progress, answerWith: { tool: 'answer', quiz: quiz.code }, url: links.url };
}

/** The DMV side of quiz_me: the first training set that is not yet mastered, on the person's state. */
async function dmvQuizMe(uid: string) {
  const user = await getUser(uid);
  if (!user) return fail('USER_NOT_FOUND', 'User not found.');
  if (!user.selectedState) {
    return fail('STATE_REQUIRED', 'Ask which US state the person is taking the DMV test in, call set_user_state with its two-letter code, then call quiz_me with "dmv" again.');
  }
  const issuerUrl = process.env.MCP_OAUTH_ISSUER_URL ?? '';
  for (const setId of [1, 2, 3, 4] as const) {
    const [progress, setData] = await Promise.all([getTrainingSetProgress(uid, setId), getTrainingSetData(uid, setId)]);
    if (!progress || !setData) return fail('USER_NOT_FOUND', 'User not found.');
    const raw = getNextTrainingSetQuestion(setId, user.selectedState, setData.masteredIds, setData.wrongQueue, null, user.language as 'en' | 'es');
    if (!raw) continue;
    return ok({
      quiz: 'dmv',
      title: `${user.selectedState} DMV practice, training set ${setId}`,
      complete: false,
      question: formatQuestion(raw, issuerUrl),
      progress: { set: setId, mastered: progress.masteredCount, total: progress.total, wrongQueueSize: progress.wrongQueueLength },
      answerWith: { tool: 'answer', quiz: 'dmv' },
    });
  }
  return ok({ quiz: 'dmv', complete: true, message: 'All four DMV training sets are mastered. Suggest a full practice test (start_practice_test) or reset_training_set.' });
}

async function dmvAnswer(uid: string, questionId: string, letter: string) {
  const user = await getUser(uid);
  if (!user) return fail('USER_NOT_FOUND', 'User not found.');
  if (!user.selectedState) return formatStateRequiredError();
  const lang = user.language as 'en' | 'es';
  for (const setId of [1, 2, 3, 4] as const) {
    const question = getTrainingSetQuestions(setId, user.selectedState, lang).find((q) => q.questionId === questionId);
    if (!question) continue;
    const isCorrect = letter === question.correctAnswer;
    const result = await answerTrainingSetQuestion(uid, setId, questionId, isCorrect);
    if (!result.ok) return fail(result.code, result.message);
    const after = await dmvQuizMe(uid);
    const nextQuestion = 'isError' in after ? null : (JSON.parse(after.content[0].text) as { question?: unknown; complete?: boolean });
    return ok({
      quiz: 'dmv',
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      progress: { set: setId, mastered: result.data.masteredCount, total: 50, wrongQueueSize: result.data.wrongQueueLength, complete: result.data.complete },
      next: nextQuestion?.question ?? null,
    });
  }
  return fail('QUESTION_NOT_FOUND', `Question ${questionId} is not in the person's DMV training sets. Call quiz_me with "dmv" for a fresh one.`);
}

// ─── Quizzes (lib/quizzes.ts): the person's own material as a practice test ─

/** The public site, for links an AI client shows the person. */
function siteUrl(): string {
  return (process.env.MCP_OAUTH_ISSUER_URL || 'https://tigertest.io').replace(/\/$/, '');
}

/** Every link for one quiz: the play page, its three modes and the creator's report. */
function quizLinks(code: string) {
  const base = `${siteUrl()}${quizPath(code)}`;
  return {
    url: base,
    dashboard: `${base}/dashboard`,
    modes: { practice: `${base}/practice`, test: `${base}/test`, flashcards: `${base}/flashcards` },
    report: `${base}/report`,
    edit: `${base}/edit`,
  };
}

function summaryWithLinks(s: QuizSummary) {
  return { ...s, ...quizLinks(s.code) };
}

/** The caller as a quiz owner. The display name is one Auth lookup; it only seeds `ownerName` on create. */
async function quizOwner(uid: string, withName = false): Promise<QuizOwner> {
  const isPremium = await isPremiumUid(uid);
  let name: string | null = null;
  if (withName) {
    try {
      const u = await getAdminAuth().getUser(uid);
      name = u.displayName ?? u.email?.split('@')[0] ?? null;
    } catch {
      name = null;
    }
  }
  return { uid, name, isPremium };
}

/** A QuizError as a fail(): the message is written for the person, the code tells the assistant what kind of problem it is. */
function quizFail(error: unknown, owner?: QuizOwner) {
  if (error instanceof QuizError) {
    if (error.reason === 'CLASS_REQUIRED' || error.reason === 'NO_CLASSES') {
      return fail(error.reason, `${error.message}.${error.reason === 'CLASS_REQUIRED' ? ' Ask the person which class, then call again with its classCode.' : ' Offer the link to make one (free); students join it with a class code, no account needed.'}`, {
        classes: error.classes ?? [],
        makeClassUrl: `${siteUrl()}/teach/new`,
      });
    }
    const code =
      error.status === 402 || error.status === 429 ? 'LIMIT_REACHED'
      : error.status === 403 ? 'NOT_YOUR_QUIZ'
      : error.status === 404 ? 'QUIZ_NOT_FOUND'
      : error.status >= 500 ? 'INTERNAL_ERROR'
      : 'INVALID_QUIZ';
    return fail(code, error.message, {
      status: error.status,
      ...(owner
        ? {
            plan: owner.isPremium ? 'premium' : 'free',
            limits: quizLimits(owner.isPremium),
            ...(owner.isPremium ? {} : { premium: { ...QUIZ_LIMITS.premium, price: '$9.99 one time', url: `${siteUrl()}/upgrade` } }),
          }
        : {}),
    });
  }
  console.error('[mcp quiz]', error);
  return fail('INTERNAL_ERROR', 'Something went wrong on the Tigertest side. Try again in a moment.');
}

const quizCodeSchema = z
  .string()
  .describe('The 6-character quiz code from the quiz link (tigertest.io/q/<CODE>), case-insensitive.');

const quizQuestionSchema = z.object({
  question: z.string().min(1).describe(`The question, one idea, up to ${QUIZ_MAX_QUESTION_TEXT} characters. No "which is NOT".`),
  options: z
    .array(z.string().min(1))
    .length(QUIZ_OPTION_COUNT)
    .describe(`Exactly ${QUIZ_OPTION_COUNT} answer options (up to ${QUIZ_MAX_OPTION_TEXT} characters each), one correct and three plausible wrong ones of the same length and style. No "all of the above", no duplicates.`),
  correctIndex: z.number().int().min(0).max(QUIZ_OPTION_COUNT - 1).describe('Index of the correct option in `options` (0-3). Vary it across questions.'),
  explanation: z.string().optional().describe(`One sentence saying why the answer is right, up to ${QUIZ_MAX_EXPLANATION} characters. Strongly recommended: the person sees it after every answer.`),
  topic: z.string().optional().describe(`A short topic label, one to three words, up to ${QUIZ_MAX_TOPIC} characters (e.g. "Cell biology"). Reuse labels so a 20-question quiz has about 3 to 6 topics; the report groups misses by topic.`),
});

const quizQuestionsSchema = z.array(quizQuestionSchema).min(1).describe('The questions, in the order they should appear.');

const quizVisibilitySchema = z
  .enum(['private', 'link', 'public', 'class'])
  .describe('Who can play it. "link" (default): anyone with the link. "public": anyone, and also listed in the tigertest.io/quizzes library. "private": only the creator. "class": only students in one of the creator\'s Tigertest classes (pass `classCode`; see list_my_classes). Use "class" when the person says "share it with my class", "just my students" or names a class.');

const quizClassCodeSchema = z
  .string()
  .describe('visibility "class" only: the 5-character code of one of the person\'s classes, from list_my_classes. May be left out when they have exactly one class.');

const QUIZ_WRITING_HINT =
  `${QUIZ_CONTEXT_GUIDANCE} ` +
  `Write every question from the person's material: ${QUIZ_OPTION_COUNT} options, exactly one correct, three plausible distractors in the same style and length as the right answer, a one-sentence explanation of why the answer is right, and a short topic label (one to three words, reused across questions). Vary the position of the correct answer. ` +
  `At least ${QUIZ_MIN_QUESTIONS} questions; a free account can save ${QUIZ_LIMITS.free.questions} questions per quiz and keep ${QUIZ_LIMITS.free.quizzes} quizzes, Premium ($9.99 one time) ${QUIZ_LIMITS.premium.questions} and ${QUIZ_LIMITS.premium.quizzes}. ` +
  `Use the material's own title (a chapter name, a course and unit, a set name) and only ask the person for a title when the material has no obvious one.`;

const tools: ToolEntry[] = [
  {
    name: 'list_in_progress_tests',
    description: "Discover this person's signed-in Tigertest exams and custom quizzes from synced progress, using the site's In progress semantics. Start here when asked to quiz them on what they are studying. Ask them to choose when multiple are listed. Returns exact IDs, available practice and web-resume links. Guest-only/unsynced browser progress is unavailable.",
    register(server,ctx){server.registerTool(this.name,{description:this.description,inputSchema:{}},async()=>{const r=await listInProgressTests(ctx.userId);return r.ok?ok(r.data):fail(r.code,r.message);});},
  },
  {
    name: 'get_study_progress',
    description: 'Get mastery, weak topics/drills and active web test links for an exact examId from list_in_progress_tests. DMV uses get_progress/get_weak_areas. A web test link preserves timed/adaptive test rules; chat practice does not advance that sitting.',
    register(server,ctx){server.registerTool(this.name,{description:this.description,inputSchema:{examId:z.string().min(1).max(80)}},async({examId})=>{const r=await studyProgress(ctx.userId,examId);return r.ok?ok(r.data):fail(r.code,r.message);});},
  },
  {
    name: 'start_study_practice',
    description: 'Start or resume untimed practice for an exact catalog examId from list_in_progress_tests. Uses the existing account mastery queue. Optionally select a v1 setNumber or v2 drillKey from get_study_progress to target a weak area. Timed/adaptive tests remain on their web-resume links. Show the full question, passage, figure and structured answer instructions; never force complex formats into A-D. Submit with submit_study_answer and its attemptId. DMV/custom quizzes retain quiz_me/answer.',
    register(server,ctx){server.registerTool(this.name,{description:this.description,inputSchema:{examId:z.string().min(1).max(80),setNumber:z.number().int().min(1).max(100).optional(),drillKey:z.string().min(1).max(100).optional()}},async({examId,setNumber,drillKey})=>{
      if ((setNumber !== undefined && drillKey !== undefined) || (getExamById(examId) && drillKey !== undefined) || (EXAMS_V2.some(e=>e.id===examId) && setNumber !== undefined) || ((examId==='dmv'||examId.startsWith('quiz:')) && (setNumber!==undefined||drillKey!==undefined))) return fail('INVALID_SELECTOR','Use setNumber only for a catalog training set, or drillKey only for a v2 drill. Use the dedicated DMV tools to choose a DMV set.');
      if(examId==='dmv')return dmvQuizMe(ctx.userId);
      if(examId.startsWith('quiz:')){const found=await loadPlayableQuiz(ctx.userId,examId.slice(5));return 'error'in found?quizPlayFail(found.error,examId.slice(5)):ok(await quizMeResult(ctx.userId,found.quiz));}
      const r=getExamById(examId)?await nextCatalogPractice(ctx.userId,examId,undefined,setNumber):EXAMS_V2.some(e=>e.id===examId)?await nextV2Practice(ctx.userId,examId,undefined,{drillKey,practice:true}):{ok:false as const,code:'EXAM_NOT_FOUND',message:'Use an exact ID returned by list_in_progress_tests.'};return r.ok?ok(r.data):fail(r.code,r.message);
    });},
  },
  {
    name: 'submit_study_answer',
    description: 'Answer the exact pending catalog practice question. Copy examId, questionId and attemptId from the previous response. Follow its answerFormat: letter for v1, numeric text or structured zero-based index array for v2. A stale/replayed attempt is rejected without recording another answer. Returns feedback and next question. Use the NEW attemptId for each next answer. DMV/custom quizzes use answer instead.',
    register(server,ctx){server.registerTool(this.name,{description:this.description,inputSchema:{examId:z.string().min(1).max(80),questionId:z.string().min(1).max(160),attemptId:z.string().min(1).max(100),answer:z.union([z.string().max(200),z.array(z.number().int().min(0).max(100)).max(100)])}},async({examId,questionId,attemptId,answer})=>{
      const r=getExamById(examId)?typeof answer==='string'?await answerCatalogPractice(ctx.userId,examId,questionId,answer,attemptId):{ok:false as const,code:'BAD_ANSWER',message:'Use a letter A-D for this question.'}:EXAMS_V2.some(e=>e.id===examId)?await answerV2Practice(ctx.userId,examId,questionId,answer,undefined,attemptId):{ok:false as const,code:'EXAM_NOT_FOUND',message:'Use an exact catalog exam ID.'};return r.ok?ok(r.data):fail(r.code,r.message);
    });},
  },

  {
    name: 'ping',
    description:
      'Health check. Returns the authenticated user\'s UID and a timestamp. Use to verify the MCP connection works. Call list_in_progress_tests to discover the person\'s saved catalog exams and custom quizzes; start_study_practice supports catalog practice with shared account mastery. Existing tools support DMV permit test tutoring (list_states, get_progress, the training set and practice test tools) and quizzes, which turn the person\'s own material into a shareable Tigertest practice test (get_quiz_writing_guide, create_quiz, add_quiz_questions, list_my_quizzes, list_my_classes, get_quiz, update_quiz, delete_quiz, get_quiz_report).',
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
      'Begins a training set session (setId 1-4). Validates the user has a state selected and, for set 4, a premium subscription. Returns the first question without the correct answer. ALWAYS display all 4 answer options (A, B, C, D) with every question — never omit them. Display without bullet points, just letter and text on each line (e.g. "A. Option text"). If the question has an imageUrl field, fetch and display the image inline before showing the options. After the user answers, call submit_training_answer. Keep looping with get_next_training_question until complete:true.',
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
      'Returns the next question in a training set. Call this after submit_training_answer to continue the loop. Returns complete:true when the set is fully mastered. ALWAYS display all 4 answer options (A, B, C, D) with every question — never omit them. Display without bullet points, just letter and text on each line (e.g. "A. Option text"). If the question has an imageUrl field, fetch and display the image inline before showing the options.',
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

  // ─── Quizzes ───────────────────────────────────────────────────────────────
  {
    name: 'get_quiz_writing_guide',
    description:
      'The Tigertest rules for useful, coherent quizzes: establish missing audience, purpose, scope and source facts before writing; do not invent context or personal facts. Then research, write balanced questions and check the whole set. Call this before writing questions for create_quiz or add_quiz_questions.',
    register(server) {
      server.registerTool('get_quiz_writing_guide', { description: this.description, inputSchema: {} }, async () => ({
        content: [{ type: 'text', text: `${QUIZ_WRITING_GUIDE}\n\n${QUIZ_WRITING_EXAMPLE}` }],
      }));
    },
  },
  {
    name: 'create_quiz',
    description:
      `Call get_quiz_writing_guide first and follow it. Turns the person's own material (notes, a chapter, a syllabus, a term list, anything they paste or describe) into a Tigertest practice test they can play and share by link. ${QUIZ_WRITING_HINT} ` +
      'Returns the quiz code and its links: `url` is the share landing page (show it to the person as the link to share), `dashboard` opens their modes and progress, `modes.practice` is the mastery training set that brings back what they miss, `modes.test` is a timed test over every question, `modes.flashcards` is flashcards, and `report` is where the creator sees who played and what they missed. ' +
      'On LIMIT_REACHED tell the person the limit from the message (they can delete a quiz, shorten this one, or get Premium); on INVALID_QUIZ fix the question named in the message and call again. ' +
      'For a class quiz (visibility "class"): on CLASS_REQUIRED ask which of the returned `classes` and call again with its classCode; on NO_CLASSES offer `makeClassUrl`. Tell the person students already in the class go straight in and anyone else is asked for the class code.',
    register(server, ctx) {
      server.registerTool(
        'create_quiz',
        {
          description: this.description,
          inputSchema: {
            title: z.string().min(1).describe(`The quiz title, up to ${QUIZ_MAX_TITLE} characters.`),
            description: z.string().optional().describe(`One sentence on what the quiz covers, up to ${QUIZ_MAX_DESCRIPTION} characters. Optional.`),
            questions: quizQuestionsSchema,
            visibility: quizVisibilitySchema.optional(),
            classCode: quizClassCodeSchema.optional(),
            passPct: z.number().int().min(50).max(100).optional().describe('Pass mark for the Test mode as a percentage (50-100). Default 80.'),
          },
        },
        async (args) => {
          const owner = await quizOwner(ctx.userId, true);
          try {
            const quiz = await createQuiz(owner, {
              title: args.title,
              description: args.description,
              questions: args.questions,
              visibility: args.visibility ?? 'link',
              classCode: args.classCode,
              passPct: args.passPct,
              createdVia: 'mcp',
            });
            return ok({
              code: quiz.code,
              title: quiz.title,
              description: quiz.description,
              questionCount: quiz.questions.length,
              topics: quizTopics(quiz.questions),
              visibility: quiz.visibility,
              ...(quiz.classCode ? { classCode: quiz.classCode, className: quiz.className } : {}),
              passPct: quiz.passPct,
              ...quizLinks(quiz.code),
            });
          } catch (error) {
            return quizFail(error, owner);
          }
        },
      );
    },
  },
  {
    name: 'add_quiz_questions',
    description:
      `Call get_quiz_writing_guide first and follow it. Appends questions to a quiz the person owns (more material, a second chapter). ${QUIZ_WRITING_HINT} Existing questions and anyone's progress on them are untouched. Returns the new question count and the quiz links. On LIMIT_REACHED the quiz is at the plan's per-quiz limit: tell the person how many it holds now and the limit.`,
    register(server, ctx) {
      server.registerTool(
        'add_quiz_questions',
        { description: this.description, inputSchema: { code: quizCodeSchema, questions: quizQuestionsSchema } },
        async (args) => {
          const code = normalizeQuizCode(args.code);
          if (!isQuizCode(code)) return fail('QUIZ_NOT_FOUND', `"${args.code}" is not a quiz code.`);
          const owner = await quizOwner(ctx.userId);
          try {
            const quiz = await updateQuiz(owner, code, { addQuestions: args.questions });
            return ok({
              code: quiz.code,
              title: quiz.title,
              questionCount: quiz.questions.length,
              added: args.questions.length,
              topics: quizTopics(quiz.questions),
              ...quizLinks(quiz.code),
            });
          } catch (error) {
            return quizFail(error, owner);
          }
        },
      );
    },
  },
  {
    name: 'list_my_quizzes',
    description:
      "Lists the quizzes the person has made, most recently updated first: code, title, description, visibility, question count, topics, plays (browsers that answered at least one question), memberCount (players who gave their name, so they appear in the report), and the links. Use it to find a quiz's code before get_quiz, add_quiz_questions, update_quiz, delete_quiz or get_quiz_report, and to show the person what they have. Also returns the plan's limits and how many quizzes are left.",
    register(server, ctx) {
      server.registerTool('list_my_quizzes', { description: this.description, inputSchema: {} }, async () => {
        try {
          const [owner, quizzes] = await Promise.all([quizOwner(ctx.userId), listMyQuizzes(ctx.userId)]);
          const limits = quizLimits(owner.isPremium);
          return ok({
            quizzes: quizzes.map(summaryWithLinks),
            count: quizzes.length,
            plan: owner.isPremium ? 'premium' : 'free',
            limits,
            remaining: Math.max(0, limits.quizzes - quizzes.length),
            createUrl: `${siteUrl()}/create`,
          });
        } catch (error) {
          return quizFail(error);
        }
      });
    },
  },
  {
    name: 'list_my_classes',
    description:
      "Lists the person's Tigertest classes (from tigertest.io/teach): code, name, the exam the class practices for, and how many students joined. Use it before create_quiz or update_quiz with visibility \"class\" to pick the classCode, and ask which class when there is more than one. Empty when they have no class yet (offer `makeClassUrl`).",
    register(server, ctx) {
      server.registerTool('list_my_classes', { description: this.description, inputSchema: {} }, async () => {
        try {
          const classes = await listOwnerClasses(ctx.userId);
          return ok({ classes, count: classes.length, makeClassUrl: `${siteUrl()}/teach/new`, teachUrl: `${siteUrl()}/teach` });
        } catch (error) {
          return quizFail(error);
        }
      });
    },
  },
  {
    name: 'get_quiz',
    description:
      "Returns one quiz by code. For a quiz the person owns: every question with its options, correct answer, explanation and topic, plus plays, members and reports. For someone else's quiz that is shared by link or public: the title, description, creator, question count, topics and links only, never the answers (the person can play it at `url`). A private quiz someone else owns reads as not found; a class quiz someone else owns returns QUIZ_CLASS_ONLY (students play it on the site).",
    register(server, ctx) {
      server.registerTool('get_quiz', { description: this.description, inputSchema: { code: quizCodeSchema } }, async (args) => {
        const code = normalizeQuizCode(args.code);
        if (!isQuizCode(code)) return fail('QUIZ_NOT_FOUND', `"${args.code}" is not a quiz code.`);
        try {
          const quiz = await getQuiz(code);
          if (!quiz) return fail('QUIZ_NOT_FOUND', `No quiz with code ${code}.`);
          if (quiz.ownerUid === ctx.userId) {
            const mine = quizPublic(quiz, true);
            return ok({ ...mine, mine: true, questionCount: mine.questions.length, topics: quizTopics(mine.questions), ...quizLinks(code) });
          }
          if (quiz.visibility === 'private') return fail('QUIZ_NOT_FOUND', `No quiz with code ${code}.`);
          if (quiz.visibility === 'class') {
            return fail('QUIZ_CLASS_ONLY', `Quiz ${code} is for ${quiz.classTeacherName || quiz.ownerName}'s class. Students open it at ${quizLinks(code).url} and type the class code their teacher gave them.`);
          }
          const s = quizSummary(quiz);
          return ok({
            code: s.code,
            title: s.title,
            description: s.description,
            ownerName: s.ownerName,
            visibility: s.visibility,
            questionCount: s.questionCount,
            topics: s.topics,
            plays: s.plays,
            mine: false,
            url: quizLinks(code).url,
            modes: quizLinks(code).modes,
          });
        } catch (error) {
          return quizFail(error);
        }
      });
    },
  },
  {
    name: 'update_quiz',
    description:
      'Changes a quiz the person owns: title, description, visibility ("private", "link", "public" or "class" with classCode) or passPct. "Share it with my class" is visibility "class" (classCode from list_my_classes; on CLASS_REQUIRED ask which class, on NO_CLASSES offer `makeClassUrl`). Only the fields given change; questions are not touched (use add_quiz_questions, or the edit page at `edit` to rewrite one). Returns the updated summary and links.',
    register(server, ctx) {
      server.registerTool(
        'update_quiz',
        {
          description: this.description,
          inputSchema: {
            code: quizCodeSchema,
            title: z.string().min(1).optional().describe(`New title, up to ${QUIZ_MAX_TITLE} characters.`),
            description: z.string().optional().describe(`New description, up to ${QUIZ_MAX_DESCRIPTION} characters (empty string clears it).`),
            visibility: quizVisibilitySchema.optional(),
            classCode: quizClassCodeSchema.optional(),
            passPct: z.number().int().min(50).max(100).optional().describe('New pass mark for Test mode (50-100).'),
          },
        },
        async (args) => {
          const code = normalizeQuizCode(args.code);
          if (!isQuizCode(code)) return fail('QUIZ_NOT_FOUND', `"${args.code}" is not a quiz code.`);
          if (args.title === undefined && args.description === undefined && args.visibility === undefined && args.classCode === undefined && args.passPct === undefined) {
            return fail('INVALID_QUIZ', 'Give at least one of title, description, visibility, classCode or passPct.');
          }
          const owner = await quizOwner(ctx.userId);
          try {
            const quiz = await updateQuiz(owner, code, {
              ...(args.title !== undefined ? { title: args.title } : {}),
              ...(args.description !== undefined ? { description: args.description } : {}),
              ...(args.visibility !== undefined ? { visibility: args.visibility } : {}),
              ...(args.classCode !== undefined ? { classCode: args.classCode } : {}),
              ...(args.passPct !== undefined ? { passPct: args.passPct } : {}),
            });
            return ok({ ...summaryWithLinks(quizSummary(quiz)), passPct: quiz.passPct });
          } catch (error) {
            return quizFail(error, owner);
          }
        },
      );
    },
  },
  {
    name: 'delete_quiz',
    description:
      'Deletes a quiz the person owns, with its link and every player\'s record. DESTRUCTIVE and permanent. You MUST confirm with the person first, naming the quiz title. The `confirm: true` argument is required.',
    register(server, ctx) {
      server.registerTool(
        'delete_quiz',
        { description: this.description, inputSchema: { code: quizCodeSchema, confirm: z.literal(true) } },
        async (args) => {
          const code = normalizeQuizCode(args.code);
          if (!isQuizCode(code)) return fail('QUIZ_NOT_FOUND', `"${args.code}" is not a quiz code.`);
          const owner = await quizOwner(ctx.userId);
          try {
            await deleteQuiz(owner, code);
            return ok({ deleted: true, code });
          } catch (error) {
            return quizFail(error, owner);
          }
        },
      );
    },
  },
  {
    name: 'get_quiz_report',
    description:
      "The creator's report for a quiz the person owns: who played and what they missed. Returns plays (browsers that answered at least once), players (people who gave their name), answered, accuracy, activeThisWeek, passedATest, topics weakest first (accuracy per topic), the 10 most-missed questions with their miss counts and correct answers, and one row per player (name, answered, accuracy, best test score, topics to focus on). " +
      'Use it to tell the creator which questions and topics to go over with the group, which players need help, and who has not played yet; the full report with every question and pick count is at `report`. Players only appear once they give their name on the quiz page; anonymous play counts in plays alone.',
    register(server, ctx) {
      server.registerTool('get_quiz_report', { description: this.description, inputSchema: { code: quizCodeSchema } }, async (args) => {
        const code = normalizeQuizCode(args.code);
        if (!isQuizCode(code)) return fail('QUIZ_NOT_FOUND', `"${args.code}" is not a quiz code.`);
        try {
          const quiz = await getQuiz(code);
          if (!quiz) return fail('QUIZ_NOT_FOUND', `No quiz with code ${code}.`);
          if (quiz.ownerUid !== ctx.userId) return fail('NOT_YOUR_QUIZ', 'Only the quiz creator can see its report.');
          const snap = await getAdminDb().collection('quizzes').doc(code).collection('members').get();
          const members = snap.docs.map((d) => d.data() as MemberDoc);
          const report = buildClassReport(code, quizAsClassDoc(quiz), members, Date.now(), quizReportSubject(quiz));
          const pct = (c: number, a: number) => (a ? Math.round((c / a) * 100) : null);
          return ok({
            code,
            title: quiz.title,
            questionCount: quiz.questions.length,
            passPct: report.passPct,
            plays: quiz.plays ?? 0,
            players: report.students.length,
            answered: report.answered,
            correct: report.correct,
            accuracy: pct(report.correct, report.answered),
            activeThisWeek: report.activeThisWeek,
            passedATest: report.passedATest,
            topics: report.topics.map((t) => ({ topic: t.label, answered: t.answered, correct: t.correct, accuracy: pct(t.correct, t.answered) })),
            mostMissed: report.questions.slice(0, 10).map((q) => ({
              questionId: q.questionId,
              question: q.question,
              topic: q.topic,
              answer: q.answer,
              answered: q.answered,
              missed: q.missed,
            })),
            students: report.students.map((s) => ({
              name: s.name,
              answered: s.answered,
              correct: s.correct,
              accuracy: pct(s.correct, s.answered),
              testsTaken: s.testsTaken,
              bestTest: s.bestTest ? s.bestTest.pct : null,
              lastActive: s.lastActive,
              focus: s.detail.focus,
            })),
            ...quizLinks(code),
          });
        } catch (error) {
          return quizFail(error);
        }
      });
    },
  },
  // ─── The two-call quiz loop: any agent can quiz the person with no state of its own ───
  {
    name: 'quiz_me',
    description:
      'Start (or continue) quizzing the person and get the first question. `quiz` is a 6-character quiz code from a tigertest.io/q/<CODE> link, the word "dmv" for their DMV permit test, or a few words to search their own quizzes and the public library (e.g. "British phrases"). If the words match several quizzes, the result lists candidates and asks you to pick one by code. Then show the question with all four options on separate lines ("A. ...", "B. ...") and wait for the person to answer; send their letter to `answer`, which grades it and returns the next question, so you only need these two tools for a whole session. Missed questions come back until they are answered right; progress is saved to their Tigertest account and, for someone else\'s quiz, shows up on the creator\'s report.',
    register(server, ctx) {
      server.registerTool(
        'quiz_me',
        {
          description: this.description,
          inputSchema: { quiz: z.string().min(1).max(120).describe('A quiz code, "dmv", or words to search for a quiz') },
        },
        async (args) => {
          const raw = String(args.quiz).trim();
          if (raw.toLowerCase() === 'dmv') return dmvQuizMe(ctx.userId);
          if (isQuizCode(normalizeQuizCode(raw))) {
            const found = await loadPlayableQuiz(ctx.userId, raw);
            if ('error' in found) return quizPlayFail(found.error, raw);
            return ok(await quizMeResult(ctx.userId, found.quiz));
          }
          const matches = await findQuizzes(ctx.userId, raw, 8);
          if (!matches.length) {
            return fail('QUIZ_NOT_FOUND', `No quiz matches "${raw}". The person can make one at ${siteUrl()}/create (or you can with create_quiz), or say "dmv" for the DMV test.`);
          }
          const top = matches[0];
          const clear = matches.length === 1 || top.title.toLowerCase() === raw.toLowerCase() || (top.mine && !matches[1]?.mine);
          if (!clear) {
            return ok({
              needsChoice: true,
              message: 'Several quizzes match. Ask the person which one, then call quiz_me with its code.',
              candidates: matches.map((m) => ({ code: m.code, title: m.title, by: m.ownerName, questions: m.questionCount, mine: m.mine, url: quizLinks(m.code).url })),
            });
          }
          const found = await loadPlayableQuiz(ctx.userId, top.code);
          if ('error' in found) return quizPlayFail(found.error, top.code);
          return ok(await quizMeResult(ctx.userId, found.quiz));
        },
      );
    },
  },
  {
    name: 'answer',
    description:
      'Submit the person\'s answer (A, B, C or D) to the question quiz_me or a previous answer returned, for the same `quiz` (the code, or "dmv"). Returns isCorrect, the correct letter, a short explanation to read to them, their progress, and `next` (the next question, or null when every question is mastered). Show the result, then the next question with all four options.',
    register(server, ctx) {
      server.registerTool(
        'answer',
        {
          description: this.description,
          inputSchema: {
            quiz: z.string().min(1).max(120).describe('The quiz code from quiz_me, or "dmv"'),
            questionId: z.string().min(1).max(64),
            answer: z.enum(['A', 'B', 'C', 'D', 'a', 'b', 'c', 'd']),
          },
        },
        async (args) => {
          const raw = String(args.quiz).trim();
          const letter = String(args.answer).toUpperCase();
          if (raw.toLowerCase() === 'dmv') return dmvAnswer(ctx.userId, String(args.questionId), letter);
          const found = await loadPlayableQuiz(ctx.userId, raw);
          if ('error' in found) return quizPlayFail(found.error, raw);
          const result = await answerQuizQuestion(ctx.userId, found.quiz, String(args.questionId), letter);
          if ('error' in result) {
            return result.error === 'QUESTION_NOT_FOUND'
              ? fail('QUESTION_NOT_FOUND', `Question ${args.questionId} is not in quiz ${found.quiz.code}. Call quiz_me again to get a fresh one.`)
              : fail('BAD_ANSWER', 'The answer must be A, B, C or D.');
          }
          return ok({ quiz: found.quiz.code, title: found.quiz.title, ...result });
        },
      );
    },
  },
  {
    name: 'find_quiz',
    description:
      'Search the person\'s own quizzes and Tigertest\'s public library by words (title, topic, maker). Returns up to 10 matches with their codes, so you can offer a choice or pass a code to quiz_me. An empty query lists their own quizzes first, then popular public ones.',
    register(server, ctx) {
      server.registerTool(
        'find_quiz',
        { description: this.description, inputSchema: { query: z.string().max(120).default('').optional() } },
        async (args) => {
          const matches = await findQuizzes(ctx.userId, String(args.query ?? ''), 10);
          return ok(matches.map((m) => ({ code: m.code, title: m.title, description: m.description, by: m.ownerName, questions: m.questionCount, topics: m.topics, plays: m.plays, mine: m.mine, url: quizLinks(m.code).url })));
        },
      );
    },
  },
  {
    name: 'reset_quiz_play',
    description:
      'Start a quiz over from the first question for this person (clears their mastery on it; the creator\'s report keeps the history). Confirm with the person first; `confirm: true` is required.',
    register(server, ctx) {
      server.registerTool(
        'reset_quiz_play',
        { description: this.description, inputSchema: { quiz: quizCodeSchema, confirm: z.literal(true) } },
        async (args) => {
          const code = normalizeQuizCode(String(args.quiz));
          if (!isQuizCode(code)) return fail('QUIZ_NOT_FOUND', 'That is not a quiz code.');
          await resetQuizPlay(ctx.userId, code);
          return ok({ quiz: code, reset: true });
        },
      );
    },
  },
];

export function registerTools(server: McpServer, ctx: ToolContext): void {
  for (const tool of tools) {
    tool.register(server, ctx);
  }
  registerPrompts(server);
}

/**
 * MCP prompts. "write_quiz" is the question-writing guide
 * (lib/quizWritingGuide.ts) with the person's material appended, so a client
 * that lists prompts can start a quiz from it. Registering a prompt turns on
 * the server's prompts capability, so the route needs no change.
 */
function registerPrompts(server: McpServer): void {
  server.registerPrompt(
    'write_quiz',
    {
      title: 'Write a Tigertest quiz',
      description:
        'First establish any missing audience, purpose, scope and reliable facts; ask focused follow-ups when material is too sparse. Then write a coherent practice test and save it with create_quiz. Includes the Tigertest question-writing rules.',
      argsSchema: {
        material: z.string().optional().describe('Source material and any audience, level, purpose, scope or length preferences already known. A short topic alone may need clarification before writing. Optional: reuse conversation context before asking for more.'),
      },
    },
    ({ material }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text:
              `${QUIZ_WRITING_GUIDE}\n\n${QUIZ_WRITING_EXAMPLE}` +
              (material && material.trim()
                ? `\n\nMaterial:\n${material.trim()}`
                : '\n\nUse the context and sources already in our conversation. If key context or reliable facts are missing, ask only the focused questions needed before writing or saving.'),
          },
        },
      ],
    }),
  );
}

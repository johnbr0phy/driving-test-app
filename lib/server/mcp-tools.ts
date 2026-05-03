import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ok, fail, formatStateRequiredError } from '@/lib/server/mcp-tool-helpers';
import { states } from '@/data/states';
import { getUser, getProgress, getTestAttemptStats, getTrainingSetProgress, getQuestionPerformance } from '@/lib/server/progress';
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
];

export function registerTools(server: McpServer, ctx: ToolContext): void {
  for (const tool of tools) {
    tool.register(server, ctx);
  }
}

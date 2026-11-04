// Exit questions: the last question an account answered before it went quiet.
//
// Built nightly by /api/cron/aggregate-stats from the same answer history as
// Common Mistakes, saved to globalStats/exitQuestions and shown on the /admin
// Growth tab (components/admin/ExitQuestions.tsx). The point is to find bad
// questions: a confusing stem, a wrong key or a misleading explanation shows
// up as more people leaving right after it than its traffic predicts.
//
// Only accounts (guests keep their answers in the browser) and only answers
// with a timestamp: training answers and finished practice tests. v2 exams
// keep no per-answer times, so they are not covered.
//
// Each quiet account ends in one of four ways, and only the last points at a
// question:
//  - bounce:    fewer than EXIT_MIN_ANSWERS answers in all (never really started)
//  - passed:    passed a practice test at some point (left because they're done)
//  - test:      the last thing they did was finish a practice test
//  - question:  left in the middle of practice, right after this question
//
// A question's expected exits are the people who answered it times the exam's
// exit rate per question seen; "excess" is exits minus that, and it ranks the
// list, so a question needs both volume and a high rate to top it.

export const EXIT_QUIET_DAYS = 14;
export const EXIT_MIN_ANSWERS = 3;
/** Exits a question needs before it is listed. */
export const EXIT_MIN_EXITS = 3;
export const EXIT_TOP_N = 40;
/** Answers this close together are one sitting. */
const SESSION_GAP_MS = 30 * 60_000;

export type ExitKind = "bounce" | "passed" | "test" | "question";

export interface ExitQuestionRow {
  questionId: string;
  /** Quiet accounts whose last answer was this question. */
  exits: number;
  /** Of those, how many got it wrong. */
  exitsWrong: number;
  /** Accounts that answered it at least once. */
  seenBy: number;
  /** Integer percent of all answers to it that were wrong. */
  errorRate: number;
  /** seenBy times the exam's exit rate per question seen. */
  expected: number;
  /** exits / expected, one decimal. */
  lift: number;
  /** Median answers in the sitting that ended on it. */
  medianSession: number;
  /** Mean wrong answers in a row the sitting ended on. */
  avgWrongStreak: number;
}

export interface ExitExamStats {
  /** Accounts with a timestamped answer on this exam. */
  users: number;
  /** Of those, no answer anywhere for EXIT_QUIET_DAYS days, last seen on this exam. */
  quiet: number;
  kinds: Record<ExitKind, number>;
  /** Of the question exits, how many came right after a wrong answer. */
  questionExitsWrong: number;
  /** Share of all answers on this exam that were wrong (integer percent). */
  errorRate: number;
  questions: ExitQuestionRow[];
}

export interface ExitQuestionsDoc {
  exams: Record<string, ExitExamStats>;
  quietDays: number;
  minExits: number;
  updatedAt: string;
}

interface Answer {
  questionId: string;
  isCorrect: boolean;
  t: number;
  /** Index into completedTests, or -1 for a training answer. */
  test: number;
}

interface QuestionTally {
  exits: number;
  exitsWrong: number;
  seenBy: number;
  correct: number;
  wrong: number;
  sessions: number[];
  streaks: number;
}

interface ExamTally {
  users: number;
  quiet: number;
  kinds: Record<ExitKind, number>;
  questionExitsWrong: number;
  correct: number;
  wrong: number;
  questions: Map<string, QuestionTally>;
}

const median = (xs: number[]) => {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
};

/**
 * Collects accounts one at a time (`add`) and builds the doc (`build`).
 * `examOf` maps a question id to its exam id ("dmv" for the DMV), undefined
 * to skip it; `passPctOf` gives a finished test's pass mark from its state code.
 */
export function createExitTally(opts: {
  now: number;
  examOf: (questionId: string) => string | undefined;
  passPctOf: (testState: string | undefined, examId: string) => number;
}) {
  const exams = new Map<string, ExamTally>();
  const quietBefore = opts.now - EXIT_QUIET_DAYS * 24 * 3_600_000;

  const examTally = (id: string) => {
    let e = exams.get(id);
    if (!e) {
      e = { users: 0, quiet: 0, kinds: { bounce: 0, passed: 0, test: 0, question: 0 }, questionExitsWrong: 0, correct: 0, wrong: 0, questions: new Map() };
      exams.set(id, e);
    }
    return e;
  };
  const questionTally = (e: ExamTally, id: string) => {
    let q = e.questions.get(id);
    if (!q) {
      q = { exits: 0, exitsWrong: 0, seenBy: 0, correct: 0, wrong: 0, sessions: [], streaks: 0 };
      e.questions.set(id, q);
    }
    return q;
  };

  /** One account's user doc (trainingAnswerHistory and completedTests read). */
  function add(data: { trainingAnswerHistory?: unknown; completedTests?: unknown }) {
    const byExam = new Map<string, Answer[]>();
    const push = (questionId: unknown, isCorrect: unknown, iso: unknown, test: number) => {
      if (typeof questionId !== "string" || typeof iso !== "string") return;
      const t = Date.parse(iso);
      if (Number.isNaN(t)) return;
      const examId = opts.examOf(questionId);
      if (!examId) return;
      let list = byExam.get(examId);
      if (!list) byExam.set(examId, (list = []));
      list.push({ questionId, isCorrect: !!isCorrect, t, test });
    };

    const history = Array.isArray(data.trainingAnswerHistory) ? data.trainingAnswerHistory : [];
    for (const h of history) push(h?.questionId, h?.isCorrect, h?.answeredAt, -1);

    const tests = Array.isArray(data.completedTests) ? data.completedTests : [];
    // Tests passed, by exam.
    const passed = new Set<string>();
    tests.forEach((test: any, i: number) => {
      const answers = Array.isArray(test?.answers) ? test.answers : [];
      let examId: string | undefined;
      for (const a of answers) {
        if (!a?.userAnswer) continue;
        push(a.questionId, a.isCorrect, a.answeredAt, i);
        examId ??= typeof a.questionId === "string" ? opts.examOf(a.questionId) : undefined;
      }
      const total = Number(test?.totalQuestions) || answers.length;
      const score = Number(test?.score);
      if (examId && total > 0 && Number.isFinite(score) && (score / total) * 100 >= opts.passPctOf(test?.state, examId)) {
        passed.add(examId);
      }
    });

    // Quiet means quiet everywhere, and the exit belongs to the exam with the
    // account's last answer: someone who moved from the DMV to CDL did not
    // quit on their last DMV question.
    let lastT = -Infinity;
    let lastExam: string | undefined;
    for (const [examId, answers] of byExam) {
      for (const a of answers) {
        if (a.t > lastT) {
          lastT = a.t;
          lastExam = examId;
        }
      }
    }

    for (const [examId, answers] of byExam) {
      const e = examTally(examId);
      e.users++;
      answers.sort((a, b) => a.t - b.t);

      const seen = new Set<string>();
      for (const a of answers) {
        const q = questionTally(e, a.questionId);
        if (a.isCorrect) {
          q.correct++;
          e.correct++;
        } else {
          q.wrong++;
          e.wrong++;
        }
        if (!seen.has(a.questionId)) {
          seen.add(a.questionId);
          q.seenBy++;
        }
      }

      const last = answers[answers.length - 1];
      if (examId !== lastExam || lastT >= quietBefore) continue;
      e.quiet++;

      let kind: ExitKind;
      if (answers.length < EXIT_MIN_ANSWERS) kind = "bounce";
      else if (passed.has(examId)) kind = "passed";
      else if (last.test >= 0) kind = "test";
      else kind = "question";
      e.kinds[kind]++;
      if (kind !== "question") continue;

      const q = questionTally(e, last.questionId);
      q.exits++;
      if (!last.isCorrect) {
        q.exitsWrong++;
        e.questionExitsWrong++;
      }
      let session = 1;
      for (let i = answers.length - 1; i > 0 && answers[i].t - answers[i - 1].t <= SESSION_GAP_MS; i--) session++;
      q.sessions.push(session);
      let streak = 0;
      for (let i = answers.length - 1; i >= 0 && !answers[i].isCorrect; i--) streak++;
      q.streaks += streak;
    }
  }

  function build(): ExitQuestionsDoc {
    const out: Record<string, ExitExamStats> = {};
    for (const [examId, e] of exams) {
      let seenTotal = 0;
      for (const q of e.questions.values()) seenTotal += q.seenBy;
      const rate = seenTotal > 0 ? e.kinds.question / seenTotal : 0;
      const questions: ExitQuestionRow[] = [];
      for (const [questionId, q] of e.questions) {
        if (q.exits < EXIT_MIN_EXITS) continue;
        const expected = q.seenBy * rate;
        const total = q.correct + q.wrong;
        questions.push({
          questionId,
          exits: q.exits,
          exitsWrong: q.exitsWrong,
          seenBy: q.seenBy,
          errorRate: total ? Math.round((q.wrong / total) * 100) : 0,
          expected: Math.round(expected * 10) / 10,
          lift: expected > 0 ? Math.round((q.exits / expected) * 10) / 10 : 0,
          medianSession: median(q.sessions),
          avgWrongStreak: Math.round((q.streaks / q.exits) * 10) / 10,
        });
      }
      questions.sort((a, b) => b.exits - b.expected - (a.exits - a.expected));
      const answered = e.correct + e.wrong;
      out[examId] = {
        users: e.users,
        quiet: e.quiet,
        kinds: e.kinds,
        questionExitsWrong: e.questionExitsWrong,
        errorRate: answered ? Math.round((e.wrong / answered) * 100) : 0,
        questions: questions.slice(0, EXIT_TOP_N),
      };
    }
    return { exams: out, quietDays: EXIT_QUIET_DAYS, minExits: EXIT_MIN_EXITS, updatedAt: new Date(opts.now).toISOString() };
  }

  return { add, build };
}

/** What /api/admin/exit-questions sends: the doc with names and question text. */
export interface ExitQuestionDetail extends ExitQuestionRow {
  question: string;
  options: string[];
  answer: string;
  topic: string;
  explanation: string;
}
export interface ExitExamPayload extends Omit<ExitExamStats, "questions"> {
  id: string;
  name: string;
  questions: ExitQuestionDetail[];
}
export interface ExitQuestionsPayload {
  exams: ExitExamPayload[];
  quietDays: number;
  minExits: number;
  updatedAt: string | null;
}

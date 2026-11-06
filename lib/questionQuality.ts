// Question quality: the shared pieces of "Report this question" on exam
// questions, the anonymous option-pick counts and the nightly flags built from
// them (/api/cron/question-health). Import-light: used by client and server.
//
// Firestore:
//   questionReports/{auto}   one report: examId, questionId, reason, note, lang,
//                            page, picked, uid and email (signed-in reporter's
//                            account, or a guest's optional email, else null),
//                            status open | fixed | dismissed, createdAt
//   questionPicks/{examId}   per question: n answers, c correct, w.{i} wrong
//                            picks by bank option index, and the same for
//                            "strong" browsers (s, sc, sw): at least
//                            STRONG_MIN_ANSWERS answers on that exam at
//                            STRONG_ACCURACY or better
//   globalStats/questionFlags  the nightly flag list for /admin and the audit

export const REPORT_REASONS = [
  { value: "wrong_answer", label: "The marked answer is wrong" },
  { value: "two_answers", label: "More than one answer is right" },
  { value: "unclear", label: "The question is unclear" },
  { value: "outdated", label: "The rule or fact is out of date" },
  { value: "typo", label: "There is a typo" },
  { value: "other", label: "Something else" },
] as const;
export type ReportReason = (typeof REPORT_REASONS)[number]["value"];
export const REPORT_REASON_VALUES: readonly string[] = REPORT_REASONS.map((r) => r.value);

export const QUESTION_ID_RE = /^[A-Za-z0-9_-]{1,48}$/;
export const EXAM_KEY_RE = /^[a-z0-9_-]{1,40}$/;

/** A browser counts as strong on an exam once it has this many answers there... */
export const STRONG_MIN_ANSWERS = 30;
/** ...at this accuracy or better. Its picks are what tell a bad key apart from a hard question. */
export const STRONG_ACCURACY = 0.8;

/** Flags need this many answers on a question before they are trusted. */
export const FLAG_MIN_ANSWERS = 40;
/** And this many from strong browsers for the key-suspect flag. */
export const FLAG_MIN_STRONG = 12;

export interface QuestionPickCounts {
  n: number;
  c: number;
  w?: Record<string, number>;
  s?: number;
  sc?: number;
  sw?: Record<string, number>;
}

export type FlagKind = "keySuspect" | "splitAnswer" | "tooHard" | "tooEasy" | "reported";

export interface QuestionFlag {
  examId: string;
  questionId: string;
  kinds: FlagKind[];
  /** Answers, correct rate (0-100) and the strong browsers' numbers. */
  n: number;
  correctPct: number;
  strongN: number;
  strongCorrectPct: number | null;
  /** Bank index of the most-picked wrong option and its share of all answers (0-100). */
  topWrong: number | null;
  topWrongPct: number;
  /** Open reports on this question. */
  reports: number;
  /** Higher is worse: what /admin and the audit sort by. */
  score: number;
}

/**
 * Flags for one question's counts. The strong-browser rule is the key signal:
 * on a correctly keyed item, people who usually get things right mostly pick
 * the key; when they pick one wrong option as often as the key, the key is the
 * likely mistake.
 */
export function flagQuestion(examId: string, questionId: string, q: QuestionPickCounts, reports: number): QuestionFlag | null {
  const kinds: FlagKind[] = [];
  const n = q.n || 0;
  const correctPct = n ? Math.round((100 * (q.c || 0)) / n) : 0;
  const strongN = q.s || 0;
  const strongCorrectPct = strongN ? Math.round((100 * (q.sc || 0)) / strongN) : null;
  let topWrong: number | null = null;
  let topWrongN = 0;
  for (const [i, count] of Object.entries(q.w || {})) {
    if (count > topWrongN) {
      topWrongN = count;
      topWrong = Number(i);
    }
  }
  const topWrongPct = n ? Math.round((100 * topWrongN) / n) : 0;

  if (n >= FLAG_MIN_ANSWERS) {
    if (correctPct < 25) kinds.push("tooHard");
    if (correctPct >= 98) kinds.push("tooEasy");
    // One wrong option drawing nearly as many people as the key: two
    // defensible answers, or a key on the wrong option.
    if (topWrongPct >= 30 && topWrongN >= (q.c || 0) * 0.8) kinds.push("splitAnswer");
  }
  if (strongN >= FLAG_MIN_STRONG && strongCorrectPct !== null) {
    const strongWrong = topWrong !== null ? q.sw?.[String(topWrong)] || 0 : 0;
    if (strongCorrectPct < 50 || strongWrong >= (q.sc || 0) * 0.75) kinds.push("keySuspect");
  }
  if (reports > 0) kinds.push("reported");
  if (!kinds.length) return null;
  const score =
    (kinds.includes("keySuspect") ? 100 : 0) +
    Math.min(reports, 10) * 15 +
    (kinds.includes("splitAnswer") ? 40 : 0) +
    (kinds.includes("tooHard") ? 25 : 0) +
    (kinds.includes("tooEasy") ? 5 : 0) +
    Math.min(n, 500) / 50;
  return { examId, questionId, kinds, n, correctPct, strongN, strongCorrectPct, topWrong, topWrongPct, reports, score: Math.round(score) };
}

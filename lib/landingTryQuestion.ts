import { getExamTrainingSetQuestions } from "@/lib/examTestGenerator";
import { examBaseLanguage, examSetId, getExamByPath, localizeExam, trainingParts } from "@/lib/exams";
import { getExamRoutes } from "@/lib/examRoutes";
import { getSignIdForQuestion } from "@/lib/signImages";
import { hasPositionDependentAnswers } from "@/lib/shuffleOptions";
import { getBank } from "@/lib/v2/bank";
import { relabelChoices } from "@/lib/v2/grading";
import { isDrillLocked } from "@/lib/v2/premium";
import { isPrintable } from "@/lib/v2/printable";
import { getExamV2ByPath, v2Routes } from "@/lib/v2/registry";
import { drillKey, drillQuestions } from "@/lib/v2/training";
import type { DrillDef, QuestionV2 } from "@/lib/v2/types";
import type { Language } from "@/i18n";

// ─── "Try one now" on a landing ──────────────────────────────────────────────
// One real question from training set 1, shown playable in the landing hero
// so a visitor can answer before choosing anything. Its answer is recorded
// in set 1 like any training answer, and "Keep going" opens that set.
// Picked on the server from the bank the page already imports for its sample
// questions; a page that does not import its bank shows no card.
// v2 landings (SAT, NCLEX...) take an easy plain-text question from their
// first drill instead; the answer is recorded in that drill.

export type LandingTryQuestion = {
  examId: string;
  setId: number;
  questionId: string;
  category: string;
  stem: string;
  /** Options as shown, rotated so keys do not always sit at one letter. */
  options: string[];
  correctIndex: number;
  /** Bank letter of each shown option ("CDAB"), for the option pick counts. */
  optionOrder: string;
  explanation: string;
  practiceHref: string;
  /** Set on v2 exams: the answer goes to this drill, not a training set. */
  v2?: { drillKey: string; domain: string; order: number[] };
};

const LETTERS = ["A", "B", "C", "D"] as const;
const LETTERS6 = ["A", "B", "C", "D", "E", "F"];
/** Markup the card cannot draw: KaTeX, bold, underline, tables, lists, line breaks. */
const RICH = /\$|\*\*|__|\||\{\{|\[\[|\n/;
const POSITIONAL = /\b(all|none) of the above\b|\b(both|either|neither)\b.*\b[A-F]\b|\b[A-F]\s+(and|or)\s+[A-F]\b/i;

/** An easy plain-text question from a v2 exam's first free drill that has one, or null. */
function pickV2(dashboardHref: string): LandingTryQuestion | null {
  const exam = getExamV2ByPath(dashboardHref);
  if (!exam) return null;
  let bank;
  try {
    bank = getBank(exam.id).questions;
  } catch {
    return null;
  }
  const plain = (x: QuestionV2) =>
    isPrintable(exam.id, x, "alone") &&
    x.options!.length <= 6 &&
    x.stem.length <= 300 &&
    !!x.explanation &&
    ![x.stem, x.explanation, ...x.options!].some((t) => RICH.test(t));
  let drill: DrillDef | undefined;
  let q: QuestionV2 | undefined;
  for (const d of exam.drills) {
    if (isDrillLocked(exam, d.key, false)) continue;
    q = drillQuestions(bank, d, exam).find(plain);
    if (q) {
      drill = d;
      break;
    }
  }
  if (!q || !drill) return null;
  const n = q.options!.length;
  const nums = q.options!.map((o) => (/^-?\d/.test(o.trim()) ? parseFloat(o.replace(/,/g, "")) : NaN));
  let order: number[];
  if (nums.every((v) => !Number.isNaN(v))) {
    // Number answers read smallest first, as the banks write them.
    order = nums.map((_, i) => i).sort((a, b) => nums[a] - nums[b]);
  } else {
    const r = q.lockedOrder || q.options!.some((o) => POSITIONAL.test(o)) ? 0 : hash(q.id) % n;
    order = Array.from({ length: n }, (_, i) => (i + r) % n);
  }
  return {
    examId: exam.id,
    setId: 0,
    questionId: q.id,
    category: q.domain,
    stem: q.stem,
    options: order.map((i) => q.options![i]),
    correctIndex: order.indexOf(q.correct![0]),
    optionOrder: order.map((i) => LETTERS6[i]).join(""),
    explanation: relabelChoices(q.explanation, order),
    practiceHref: v2Routes(exam).drillQuestions(drill.key),
    v2: { drillKey: drillKey(exam.id, drill.key), domain: q.domain, order },
  };
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function pickLandingTryQuestion(dashboardHref: string, lang?: Language): LandingTryQuestion | null {
  const base = getExamByPath(dashboardHref);
  if (!base) return pickV2(dashboardHref);
  const language = lang ?? examBaseLanguage(base);
  const exam = localizeExam(base, language);
  const def = exam.trainingSets.find((s) => s.setNumber === 1);
  if (!def) return null;
  const split = trainingParts(def).length > 1;
  // An empty pool means the page did not import its bank: no card.
  let pool;
  try {
    pool = getExamTrainingSetQuestions(exam, 1, split ? 1 : undefined, language);
  } catch {
    return null;
  }
  const q = pool.find(
    (x) => !getSignIdForQuestion(x.questionId) && !hasPositionDependentAnswers(x) && x.explanation && x.optionD,
  );
  if (!q) return null;
  const bank = [q.optionA, q.optionB, q.optionC, q.optionD];
  const key = Math.max(0, LETTERS.indexOf(q.correctAnswer as (typeof LETTERS)[number]));
  const r = hash(q.questionId) % 4;
  const order = [0, 1, 2, 3].map((i) => (i + r) % 4);
  const routes = getExamRoutes(base.id, language);
  return {
    examId: base.id,
    setId: examSetId(base, 1),
    questionId: q.questionId,
    category: q.category,
    stem: q.question,
    options: order.map((i) => bank[i]),
    correctIndex: order.indexOf(key),
    optionOrder: order.map((i) => LETTERS[i]).join(""),
    explanation: q.explanation,
    practiceHref: routes.training(1, split ? 1 : undefined),
  };
}

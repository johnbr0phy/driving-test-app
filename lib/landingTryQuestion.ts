import { getExamTrainingSetQuestions } from "@/lib/examTestGenerator";
import { examBaseLanguage, examSetId, getExamByPath, localizeExam, trainingParts } from "@/lib/exams";
import { getExamRoutes } from "@/lib/examRoutes";
import { getSignIdForQuestion } from "@/lib/signImages";
import { lockedTrainingParts } from "@/lib/examLocks";
import type { Question } from "@/types";
import { hasPositionDependentAnswers } from "@/lib/shuffleOptions";
import { getBank } from "@/lib/v2/bank";
import { relabelChoices } from "@/lib/v2/grading";
import { isDrillLocked } from "@/lib/v2/premium";
import { isPrintable, samplePassage } from "@/lib/v2/printable";
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
// first drill instead; the answer is recorded in that drill. Exams with no
// plain-text question (SAT math, CogAT, AP reading...) fall back to one with
// markup or KaTeX, then to one on a short passage, drawn as rich text.

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
  /**
   * v2 only: the text carries bank markup (bold, line breaks, KaTeX), so the
   * server hero draws it with RichTextStatic instead of as plain text.
   */
  rich?: boolean;
  /** v2 only: the short shared passage the question is about (rich text). */
  passage?: { title?: string; text: string };
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
  // Rich fallback: what the landing samples can print (bold, line breaks,
  // KaTeX, a short text passage), but no tables or markup in the options.
  const richOk = (x: QuestionV2, passage: "alone" | "passage") =>
    isPrintable(exam.id, x, passage) &&
    x.options!.length <= 6 &&
    !!x.explanation &&
    !/\||\{\{|\[\[/.test(x.explanation) &&
    !x.options!.some((o) => /\||\{\{|\[\[|\n/.test(o));
  const tiers: ((x: QuestionV2) => boolean)[] = [plain, (x) => richOk(x, "alone"), (x) => richOk(x, "passage")];
  // Within the first tier that has any, the shortest question across the
  // free drills (passage included), so the card stays compact on a phone.
  const size = (x: QuestionV2) =>
    x.stem.length + x.options!.join("").length + (samplePassage(exam.id, x)?.text.length ?? 0);
  let drill: DrillDef | undefined;
  let q: QuestionV2 | undefined;
  let tier = 0;
  for (; tier < tiers.length && !q; tier++) {
    for (const d of exam.drills) {
      if (isDrillLocked(exam, d.key, false)) continue;
      for (const x of drillQuestions(bank, d, exam)) {
        if (!tiers[tier](x) || (q && size(x) >= size(q))) continue;
        q = x;
        drill = d;
      }
    }
  }
  tier--;
  if (!q || !drill) return null;
  const passage = tier === 2 ? samplePassage(exam.id, q) : null;
  const n = q.options!.length;
  // A KaTeX option counts as a number only when it is one ("$-4$", not "$2x$").
  const nums = q.options!.map((o) => {
    const t = o.trim();
    const m = t.match(/^\$(-?\d[\d,]*(?:\.\d+)?)\$$/);
    if (m) return parseFloat(m[1].replace(/,/g, ""));
    return /^-?\d/.test(t) && !t.includes("$") ? parseFloat(t.replace(/,/g, "")) : NaN;
  });
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
    ...(tier > 0 ? { rich: true } : {}),
    ...(passage ? { passage: { ...(passage.title ? { title: passage.title } : {}), text: passage.text } } : {}),
  };
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** A question plus its options at or under this many characters fits a phone's first screen in the card. */
export const TRY_FITS_CHARS = 220;
/** Reading-comprehension items: a whole passage never fits a hero. */
const PASSAGE_STEM = /^\s*(read the passage|passage:)/i;

export function pickLandingTryQuestion(dashboardHref: string, lang?: Language): LandingTryQuestion | null {
  const base = getExamByPath(dashboardHref);
  if (!base) return pickV2(dashboardHref);
  const language = lang ?? examBaseLanguage(base);
  const exam = localizeExam(base, language);
  // The shortest suitable question, so the card fits a phone: set 1 when it
  // has one that fits, else the shortest across the free (unlocked) sets.
  // Passages lose to anything else. The answer is recorded in the set it
  // came from and "Keep going" opens that set.
  const locked = new Set(lockedTrainingParts(base).map((p) => `${p.set.setNumber}:${p.part}`));
  type Pick = { q: Question; setNumber: number; part?: number; score: number };
  let best = null as Pick | null;
  const sets = [...exam.trainingSets].sort((a, b) => a.setNumber - b.setNumber);
  for (const def of sets) {
    const parts = trainingParts(def);
    for (const part of parts) {
      if (locked.has(`${def.setNumber}:${part.part}`)) continue;
      const partNo = parts.length > 1 ? part.part : undefined;
      let pool: Question[];
      try {
        pool = getExamTrainingSetQuestions(exam, def.setNumber, partNo, language);
      } catch {
        pool = [];
      }
      // An empty first set means the page did not import its bank: no card.
      if (!pool.length && def === sets[0] && part.part === 1) return null;
      for (const x of pool) {
        if (getSignIdForQuestion(x.questionId) || hasPositionDependentAnswers(x) || !x.explanation || !x.optionD) continue;
        const len = x.question.length + x.optionA.length + x.optionB.length + x.optionC.length + x.optionD.length;
        const score = len + (PASSAGE_STEM.test(x.question) ? 100_000 : 0);
        if (!best || score < best.score) best = { q: x, setNumber: def.setNumber, part: partNo, score };
      }
    }
    if (best && best.score <= TRY_FITS_CHARS) break;
  }
  if (!best) return null;
  const { q, setNumber, part } = best;
  const bank = [q.optionA, q.optionB, q.optionC, q.optionD];
  const key = Math.max(0, LETTERS.indexOf(q.correctAnswer as (typeof LETTERS)[number]));
  const r = hash(q.questionId) % 4;
  const order = [0, 1, 2, 3].map((i) => (i + r) % 4);
  const routes = getExamRoutes(base.id, language);
  return {
    examId: base.id,
    setId: examSetId(base, setNumber),
    questionId: q.questionId,
    category: q.category,
    stem: q.question,
    options: order.map((i) => bank[i]),
    correctIndex: order.indexOf(key),
    optionOrder: order.map((i) => LETTERS[i]).join(""),
    explanation: q.explanation,
    practiceHref: routes.training(setNumber, part),
  };
}

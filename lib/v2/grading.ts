import { AnswerValue, QuestionV2 } from "./types";

/** Parse a student-produced response: integers, decimals, fractions, negatives. */
export function parseNumeric(raw: string): number | null {
  // Thousands separators are fine to type ("5,600").
  const s = raw.trim().replace(/[\s,]+/g, "");
  if (!s) return null;
  const frac = s.match(/^(-?)(\d+)\/(\d+)$/);
  if (frac) {
    const d = Number(frac[3]);
    if (d === 0) return null;
    const v = Number(frac[2]) / d;
    return frac[1] ? -v : v;
  }
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  return Number(s);
}

/** Anything entered at all (matrix and cloze keep -1 in unanswered slots). */
export function isAnswered(answer: AnswerValue | undefined): boolean {
  if (answer === undefined) return false;
  if (typeof answer === "string") return answer.trim().length > 0;
  return answer.some((v) => v >= 0);
}

/** Highlightable phrases in a highlight item, in order of appearance. */
export const HIGHLIGHT_MARKER = /\{\{([^{}]+)\}\}/g;
export function highlightCount(question: QuestionV2): number {
  return ((question.passage || question.stem).match(HIGHLIGHT_MARKER) ?? []).length;
}

/** Bowtie: index of the first option of each group in the flat numbering. */
export function bowtieStarts(question: QuestionV2): number[] {
  const starts: number[] = [];
  let k = 0;
  for (const g of question.groups ?? []) {
    starts.push(k);
    k += g.options.length;
  }
  return starts;
}

/**
 * Ready to check or to move on from: every row, blank and step filled, the
 * required number chosen. Drills enable Check on this, and a linear section
 * (no going back) requires it before Next.
 */
export function isComplete(question: QuestionV2, answer: AnswerValue | undefined): boolean {
  if (!isAnswered(answer)) return false;
  if (question.format === "numeric") return typeof answer === "string" && parseNumeric(answer) !== null;
  if (answer === undefined || typeof answer === "string") return false;
  switch (question.format) {
    case "multi":
      return question.select ? answer.length === question.select : answer.length > 0;
    case "order":
      return answer.length === (question.options?.length ?? 0);
    case "matrix":
      return answer.length === (question.rows?.length ?? 0) && answer.every((v) => v >= 0);
    case "cloze":
      return answer.length === (question.blanks?.length ?? 0) && answer.every((v) => v >= 0);
    case "bowtie": {
      const starts = bowtieStarts(question);
      return (question.groups ?? []).every((g, i) => answer.filter((v) => v >= starts[i] && v < starts[i] + g.options.length).length === g.pick);
    }
    default:
      return answer.length > 0;
  }
}

const sameSet = (a: number[], b: number[]) => {
  const x = [...a].sort((p, q) => p - q);
  const y = [...b].sort((p, q) => p - q);
  return x.length === y.length && x.every((v, i) => v === y[i]);
};
const sameSequence = (a: number[], b: number[]) => a.length === b.length && a.every((v, i) => v === b[i]);

/** All or nothing for every format: partial credit is not modelled. */
export function isCorrect(question: QuestionV2, answer: AnswerValue | undefined): boolean {
  if (!isAnswered(answer)) return false;
  if (question.format === "numeric") {
    if (typeof answer !== "string" || !question.numeric) return false;
    const given = answer.trim();
    if (question.numeric.answers.some((a) => a.trim() === given)) return true;
    const value = parseNumeric(given);
    if (value === null) return false;
    const tol = question.numeric.tolerance ?? 0;
    return question.numeric.answers.some((a) => {
      const target = parseNumeric(a);
      return target !== null && Math.abs(target - value) <= tol + 1e-9;
    });
  }
  if (answer === undefined || typeof answer === "string" || !question.correct) return false;
  if (question.format === "order" || question.format === "matrix" || question.format === "cloze") return sameSequence(answer, question.correct);
  return sameSet(answer, question.correct);
}

/** Letter for an option in its presented position. */
export const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

const CHOICE_REF = /\b((?:[Cc]hoices?|[Oo]ptions?|[Aa]nswers?)\s+\(?)([A-F](?:\)?(?:,\s*(?:and\s+|or\s+)?|\s+(?:and|or)\s+)\(?[A-F])*)(?=\)?(?![\w']))/g;
const PAREN_REF = /(?<![\w$\\])\(([A-F])\)/g;

/**
 * Explanations name options by their letter in the bank ("Choice B", "(C)").
 * When the options are shown shuffled, rewrite those letters to the ones the
 * student actually sees. `order[pos]` is the bank index shown at `pos`.
 */
export function relabelChoices(text: string, order: number[]): string {
  if (order.every((orig, pos) => orig === pos)) return text;
  const shown = (letter: string) => {
    const pos = order.indexOf(letter.charCodeAt(0) - 65);
    return pos < 0 ? letter : OPTION_LETTERS[pos];
  };
  return text
    .replace(CHOICE_REF, (_m, lead: string, letters: string) => lead + letters.replace(/[A-F]/g, shown))
    .replace(PAREN_REF, (_m, letter: string) => `(${shown(letter)})`);
}

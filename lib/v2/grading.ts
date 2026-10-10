import { AnswerValue, QuestionV2 } from "./types";

/** Parse a student-produced response: integers, decimals, fractions, negatives. */
export function parseNumeric(raw: string): number | null {
  const s = raw.trim().replace(/\s+/g, "");
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

export function isAnswered(answer: AnswerValue | undefined): boolean {
  if (answer === undefined) return false;
  if (typeof answer === "string") return answer.trim().length > 0;
  return answer.length > 0;
}

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
  if (typeof answer === "string" || !question.correct) return false;
  const want = [...question.correct].sort((a, b) => a - b);
  const got = [...(answer as number[])].sort((a, b) => a - b);
  return want.length === got.length && want.every((v, i) => v === got[i]);
}

/** Letter for an option in its presented position. */
export const OPTION_LETTERS = ["A", "B", "C", "D", "E"];

const CHOICE_REF = /\b((?:[Cc]hoices?|[Oo]ptions?|[Aa]nswers?)\s+\(?)([A-E](?:\)?(?:,\s*(?:and\s+|or\s+)?|\s+(?:and|or)\s+)\(?[A-E])*)(?=\)?(?![\w']))/g;
const PAREN_REF = /(?<![\w$\\])\(([A-E])\)/g;

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
    .replace(CHOICE_REF, (_m, lead: string, letters: string) => lead + letters.replace(/[A-E]/g, shown))
    .replace(PAREN_REF, (_m, letter: string) => `(${shown(letter)})`);
}

const MATH = /\$\$[\s\S]+?\$\$|\$[^$\n]+?\$/g;

/**
 * Bank explanations are one block of text. Put each sentence in its own
 * paragraph (blank lines, which RichText renders as separate <p>) so the
 * reveal is easier to digest. Text that already has line breaks is left as
 * written.
 */
export function paragraphizeExplanation(text: string): string {
  if (text.includes("\n")) return text;
  // Hide math so periods inside it ($3.5$) never end a sentence.
  const math: string[] = [];
  const masked = text.replace(/\\\$/g, "\u0002").replace(MATH, (m) => `\u0001${math.push(m) - 1}\u0001`);
  return masked
    .split(/(?<!\b(?:Mr|Mrs|Ms|Dr|St|vs)\.)(?<=[.!?]["”)]?)\s+(?=["“(]?[A-Z$\u0001])/)
    .join("\n\n")
    .replace(/\u0001(\d+)\u0001/g, (_m, i: string) => math[Number(i)])
    .replace(/\u0002/g, "\\$");
}

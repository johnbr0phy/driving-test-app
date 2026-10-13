import { QuestionBank, QuestionV2, Stimulus } from "./types";

// Each exam's questions live in their own module under lib/v2/banks/ that
// registers itself here, so a page bundles only its own exam's bank. Every
// v2 page imports "@/lib/v2/banks/<exam>" for that side effect.
const BANKS: Record<string, QuestionBank> = {};

export function registerBank(examId: string, bank: QuestionBank) {
  BANKS[examId] = bank;
}

/** Plain array banks: QuestionV2[] with any passage inline. */
export function plainBank(files: unknown[][]): QuestionBank {
  return { questions: files.flat() as QuestionV2[], stimuli: {} };
}

/** Section files with shared passages: { stimuli: Stimulus[], questions: QuestionV2[] }. */
type SectionFile = { stimuli: Stimulus[]; questions: unknown[] };
export function withStimuli(files: SectionFile[]): QuestionBank {
  const stimuli: Record<string, Stimulus> = {};
  for (const f of files) for (const s of f.stimuli) stimuli[s.id] = s;
  return { questions: files.flatMap((f) => f.questions as QuestionV2[]), stimuli };
}

export function getBank(examId: string): QuestionBank {
  const bank = BANKS[examId];
  if (!bank) throw new Error(`No v2 bank for ${examId}: import "@/lib/v2/banks/${examId}" in the page`);
  return bank;
}

const INDEX: Record<string, Map<string, QuestionV2>> = {};

export function getQuestionIndex(examId: string): Map<string, QuestionV2> {
  if (!INDEX[examId]) INDEX[examId] = new Map(getBank(examId).questions.map((q) => [q.id, q]));
  return INDEX[examId];
}

/**
 * What shows beside the question: its own passage, a shared stimulus, or for
 * a case study both. The item's own update comes first, so new findings (and
 * any highlight markers) are in view without scrolling past the whole case.
 */
export function getStimulus(examId: string, q: QuestionV2): Stimulus | null {
  const shared = q.stimulusId ? getBank(examId).stimuli[q.stimulusId] ?? null : null;
  if (shared && q.passage) return { ...shared, text: `**New information**\n\n${q.passage}\n\n**The case so far**\n\n${shared.text}` };
  if (q.passage) return { id: q.id, text: q.passage };
  return shared;
}

import { QuestionBank, QuestionV2, Stimulus } from "./types";
import satRwM1 from "@/data/v2/sat/rw-m1.json";
import satRwM2 from "@/data/v2/sat/rw-m2.json";
import satMaM1 from "@/data/v2/sat/ma-m1.json";
import satMaM2 from "@/data/v2/sat/ma-m2.json";
import teasBank from "@/data/v2/teas/questions.json";
import hesiBank from "@/data/v2/hesi/questions.json";
import asvabBank from "@/data/v2/asvab/questions.json";
import accuplacerBank from "@/data/v2/accuplacer/questions.json";

const BANKS: Record<string, QuestionBank> = {
  sat: {
    questions: [...satRwM1, ...satRwM2, ...satMaM1, ...satMaM2] as QuestionV2[],
    stimuli: {},
  },
  teas: { questions: teasBank as QuestionV2[], stimuli: {} },
  hesi: { questions: hesiBank as QuestionV2[], stimuli: {} },
  asvab: { questions: asvabBank as QuestionV2[], stimuli: {} },
  accuplacer: { questions: accuplacerBank as QuestionV2[], stimuli: {} },
};

export function getBank(examId: string): QuestionBank {
  const bank = BANKS[examId];
  if (!bank) throw new Error(`No v2 bank for ${examId}`);
  return bank;
}

const INDEX: Record<string, Map<string, QuestionV2>> = {};

export function getQuestionIndex(examId: string): Map<string, QuestionV2> {
  if (!INDEX[examId]) INDEX[examId] = new Map(getBank(examId).questions.map((q) => [q.id, q]));
  return INDEX[examId];
}

export function getStimulus(examId: string, q: QuestionV2): Stimulus | null {
  if (q.passage) return { id: q.id, text: q.passage };
  if (q.stimulusId) return getBank(examId).stimuli[q.stimulusId] ?? null;
  return null;
}

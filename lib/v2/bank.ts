import { QuestionBank, QuestionV2, Stimulus } from "./types";
import satRwM1 from "@/data/v2/sat/rw-m1.json";
import satRwM2 from "@/data/v2/sat/rw-m2.json";
import satMaM1 from "@/data/v2/sat/ma-m1.json";
import satMaM2 from "@/data/v2/sat/ma-m2.json";
import teasBank from "@/data/v2/teas/questions.json";
import hesiBank from "@/data/v2/hesi/questions.json";
import asvabBank from "@/data/v2/asvab/questions.json";
import accuplacerBank from "@/data/v2/accuplacer/questions.json";
import satRwT1M2Lower from "@/data/v2/sat/rw-t1-m2-lower.json";
import satRwT2M1 from "@/data/v2/sat/rw-t2-m1.json";
import satRwT2M2Lower from "@/data/v2/sat/rw-t2-m2-lower.json";
import satRwT2M2Upper from "@/data/v2/sat/rw-t2-m2-upper.json";
import satMaT1M2Lower from "@/data/v2/sat/ma-t1-m2-lower.json";
import satMaT2M1 from "@/data/v2/sat/ma-t2-m1.json";
import satMaT2M2Lower from "@/data/v2/sat/ma-t2-m2-lower.json";
import satMaT2M2Upper from "@/data/v2/sat/ma-t2-m2-upper.json";
import actEnglishA from "@/data/v2/act/english-a.json";
import actEnglishB from "@/data/v2/act/english-b.json";
import actMathA from "@/data/v2/act/math-a.json";
import actMathB from "@/data/v2/act/math-b.json";
import actReadingA from "@/data/v2/act/reading-a.json";
import actReadingB from "@/data/v2/act/reading-b.json";
import actScienceA from "@/data/v2/act/science-a.json";
import actScienceB from "@/data/v2/act/science-b.json";
import actEnglishT2A from "@/data/v2/act/english-t2a.json";
import actEnglishT2B from "@/data/v2/act/english-t2b.json";
import actMathT2A from "@/data/v2/act/math-t2a.json";
import actMathT2B from "@/data/v2/act/math-t2b.json";
import actReadingT2A from "@/data/v2/act/reading-t2a.json";
import actReadingT2B from "@/data/v2/act/reading-t2b.json";
import actScienceT2A from "@/data/v2/act/science-t2a.json";
import actScienceT2B from "@/data/v2/act/science-t2b.json";
import actDrillEnglish from "@/data/v2/act/drill-english.json";
import actDrillMathA from "@/data/v2/act/drill-math-a.json";
import actDrillMathB from "@/data/v2/act/drill-math-b.json";
import actDrillReading from "@/data/v2/act/drill-reading.json";
import actDrillScience from "@/data/v2/act/drill-science.json";
import satRwDrillA from "@/data/v2/sat/rw-drill-a.json";
import satRwDrillB from "@/data/v2/sat/rw-drill-b.json";
import satMaDrillA from "@/data/v2/sat/ma-drill-a.json";
import satMaDrillB from "@/data/v2/sat/ma-drill-b.json";

/** Section files with shared passages: { stimuli: Stimulus[], questions: QuestionV2[] }. */
type SectionFile = { stimuli: Stimulus[]; questions: unknown[] };
function withStimuli(files: SectionFile[]): QuestionBank {
  const stimuli: Record<string, Stimulus> = {};
  for (const f of files) for (const s of f.stimuli) stimuli[s.id] = s;
  return { questions: files.flatMap((f) => f.questions as QuestionV2[]), stimuli };
}

const BANKS: Record<string, QuestionBank> = {
  sat: {
    questions: [
      ...satRwM1, ...satRwM2, ...satRwT1M2Lower, ...satRwT2M1, ...satRwT2M2Lower, ...satRwT2M2Upper,
      ...satMaM1, ...satMaM2, ...satMaT1M2Lower, ...satMaT2M1, ...satMaT2M2Lower, ...satMaT2M2Upper,
      ...satRwDrillA, ...satRwDrillB, ...satMaDrillA, ...satMaDrillB,
    ] as QuestionV2[],
    stimuli: {},
  },
  act: withStimuli([
    actEnglishA, actEnglishB, actMathA, actMathB, actReadingA, actReadingB, actScienceA, actScienceB,
    actEnglishT2A, actEnglishT2B, actMathT2A, actMathT2B, actReadingT2A, actReadingT2B, actScienceT2A, actScienceT2B,
    actDrillEnglish, actDrillMathA, actDrillMathB, actDrillReading, actDrillScience,
  ] as SectionFile[]),
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

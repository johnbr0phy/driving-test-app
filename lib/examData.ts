import { Question } from "@/types";
import cdlQuestions from "@/data/cdl-questions.json";
import motoQuestions from "@/data/motorcycle-questions.json";
import civicsQuestions from "@/data/civics-questions.json";
import htlQuestions from "@/data/htl-questions.json";
import cstQuestions from "@/data/cst-questions.json";
import crcstQuestions from "@/data/crcst-questions.json";
import type { ExamId } from "./exams";

// Question banks by exam. Kept apart from lib/exams.ts so the store can
// import the registry without bundling every bank.
const BANKS: Record<ExamId, Question[]> = {
  cdl: cdlQuestions as Question[],
  moto: motoQuestions as Question[],
  civics: civicsQuestions as Question[],
  htl: htlQuestions as Question[],
  cst: cstQuestions as Question[],
  crcst: crcstQuestions as Question[],
};

export function getExamQuestions(examId: ExamId): Question[] {
  return BANKS[examId];
}

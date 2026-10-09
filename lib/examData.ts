import { Question } from "@/types";
import cdlQuestions from "@/data/cdl-questions.json";
import cdlxQuestions from "@/data/cdl-endorsement-questions.json";
import motoQuestions from "@/data/motorcycle-questions.json";
import civicsQuestions from "@/data/civics-questions.json";
import part107Questions from "@/data/part107-questions.json";
import hamQuestions from "@/data/ham-questions.json";
import htlQuestions from "@/data/htl-questions.json";
import cstQuestions from "@/data/cst-questions.json";
import crcstQuestions from "@/data/crcst-questions.json";
import type { ExamId } from "./exams";

// Question banks by exam. Kept apart from lib/exams.ts so the store can
// import the registry without bundling every bank.
const BANKS: Record<ExamId, Question[]> = {
  cdl: cdlQuestions as Question[],
  cdlx: cdlxQuestions as Question[],
  moto: motoQuestions as Question[],
  civics: civicsQuestions as Question[],
  part107: part107Questions as Question[],
  ham: hamQuestions as Question[],
  htl: htlQuestions as Question[],
  cst: cstQuestions as Question[],
  crcst: crcstQuestions as Question[],
};

export function getExamQuestions(examId: ExamId): Question[] {
  return BANKS[examId];
}

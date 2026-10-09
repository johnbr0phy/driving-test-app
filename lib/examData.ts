import { Question } from "@/types";
import htlQuestions from "@/data/htl-questions.json";
import cstQuestions from "@/data/cst-questions.json";
import crcstQuestions from "@/data/crcst-questions.json";
import type { ExamId } from "./exams";

// Question banks by exam. Kept apart from lib/exams.ts so the store can
// import the registry without bundling every bank.
const BANKS: Record<ExamId, Question[]> = {
  htl: htlQuestions as Question[],
  cst: cstQuestions as Question[],
  crcst: crcstQuestions as Question[],
};

export function getExamQuestions(examId: ExamId): Question[] {
  return BANKS[examId];
}

import { Question } from "@/types";
import cdlQuestions from "@/data/cdl-questions.json";
import cdlxQuestions from "@/data/cdl-endorsement-questions.json";
import motoQuestions from "@/data/motorcycle-questions.json";
import civicsQuestions from "@/data/civics-questions.json";
import part107Questions from "@/data/part107-questions.json";
import hamQuestions from "@/data/ham-questions.json";
import epa608Questions from "@/data/epa608-questions.json";
import cnaQuestions from "@/data/cna-questions.json";
import ptcbQuestions from "@/data/ptcb-questions.json";
import phlebQuestions from "@/data/phlebotomy-questions.json";
import ccmaQuestions from "@/data/ccma-questions.json";
import cetQuestions from "@/data/cet-questions.json";
import danbQuestions from "@/data/danb-questions.json";
import emtQuestions from "@/data/emt-questions.json";
import foodmgrQuestions from "@/data/food-manager-questions.json";
import realestateQuestions from "@/data/real-estate-questions.json";
import insuranceQuestions from "@/data/life-health-questions.json";
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
  epa608: epa608Questions as Question[],
  cna: cnaQuestions as Question[],
  ptcb: ptcbQuestions as Question[],
  phleb: phlebQuestions as Question[],
  ccma: ccmaQuestions as Question[],
  cet: cetQuestions as Question[],
  danb: danbQuestions as Question[],
  emt: emtQuestions as Question[],
  foodmgr: foodmgrQuestions as Question[],
  realestate: realestateQuestions as Question[],
  insurance: insuranceQuestions as Question[],
  htl: htlQuestions as Question[],
  cst: cstQuestions as Question[],
  crcst: crcstQuestions as Question[],
};

export function getExamQuestions(examId: ExamId): Question[] {
  return BANKS[examId];
}

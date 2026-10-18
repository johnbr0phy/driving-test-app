import { Question } from "@/types";
import cdlQuestions from "@/data/cdl-questions.json";
import cdlQuestionsEs from "@/data/cdl-questions_es.json";
import foodhandlerQuestionsEs from "@/data/food-handler-questions_es.json";
import foodhandlerQuestionsKo from "@/data/food-handler-questions_ko.json";
import foodhandlerQuestionsVi from "@/data/food-handler-questions_vi.json";
import cdlxQuestionsEs from "@/data/cdl-endorsement-questions_es.json";
import oshaQuestionsEs from "@/data/osha-questions_es.json";
import forkliftQuestionsEs from "@/data/forklift-questions_es.json";
import cnaQuestionsEs from "@/data/cna-questions_es.json";
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
import foodmgrQuestions from "@/data/food-manager-questions.json";
import realestateQuestions from "@/data/real-estate-questions.json";
import insuranceQuestions from "@/data/life-health-questions.json";
import notaryQuestions from "@/data/notary-questions.json";
import foodhandlerQuestions from "@/data/food-handler-questions.json";
import boatingQuestions from "@/data/boating-questions.json";
import hunterQuestions from "@/data/hunter-questions.json";
import cprQuestions from "@/data/cpr-questions.json";
import oshaQuestions from "@/data/osha-questions.json";
import forkliftQuestions from "@/data/forklift-questions.json";
import alcoholQuestions from "@/data/alcohol-server-questions.json";
import securityQuestions from "@/data/security-guard-questions.json";
import lifeguardQuestions from "@/data/lifeguard-questions.json";
import pncQuestions from "@/data/property-casualty-questions.json";
import htlQuestions from "@/data/htl-questions.json";
import cstQuestions from "@/data/cst-questions.json";
import crcstQuestions from "@/data/crcst-questions.json";
import type { ExamId } from "./exams";
import type { Language } from "@/i18n";

// Question banks by exam. Kept apart from lib/exams.ts so the store can
// import the registry without bundling every bank.
const BANKS: Partial<Record<ExamId, Question[]>> = {
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
  foodmgr: foodmgrQuestions as Question[],
  realestate: realestateQuestions as Question[],
  insurance: insuranceQuestions as Question[],
  notary: notaryQuestions as Question[],
  foodhandler: foodhandlerQuestions as Question[],
  boating: boatingQuestions as Question[],
  hunter: hunterQuestions as Question[],
  cpr: cprQuestions as Question[],
  osha: oshaQuestions as Question[],
  forklift: forkliftQuestions as Question[],
  alcohol: alcoholQuestions as Question[],
  security: securityQuestions as Question[],
  lifeguard: lifeguardQuestions as Question[],
  pnc: pncQuestions as Question[],
  htl: htlQuestions as Question[],
  cst: cstQuestions as Question[],
  crcst: crcstQuestions as Question[],
};

/** State variant banks register here from lib/banks/*States.ts, which only the
 *  app/<slug>/[state] pages import, so no other exam's pages bundle them. */
export function registerExamBanks(banks: Partial<Record<ExamId, Question[]>>) {
  Object.assign(BANKS, banks);
}

// Translated banks: same questionIds, categories and answer keys as the
// English bank, so tests, sets and progress line up in every language.
// An exam listed here also needs ExamConfig.translations.
const TRANSLATED_BANKS: Partial<Record<ExamId, Partial<Record<Language, Question[]>>>> = {
  cdl: { es: cdlQuestionsEs as Question[] },
  foodhandler: { es: foodhandlerQuestionsEs as Question[], vi: foodhandlerQuestionsVi as Question[], ko: foodhandlerQuestionsKo as Question[] },
  cdlx: { es: cdlxQuestionsEs as Question[] },
  osha: { es: oshaQuestionsEs as Question[] },
  forklift: { es: forkliftQuestionsEs as Question[] },
  cna: { es: cnaQuestionsEs as Question[] },
};

export function getExamQuestions(examId: ExamId, language: Language = "en"): Question[] {
  const bank = TRANSLATED_BANKS[examId]?.[language] ?? BANKS[examId];
  if (!bank) throw new Error(`No question bank registered for ${examId}`);
  return bank;
}

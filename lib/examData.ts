import { Question } from "@/types";
import type { ExamId } from "./exams";
import type { Language } from "@/i18n";

// Question banks by exam, empty until an exam's pages import its module in
// lib/banks/ (lib/banks/<examId>.ts, or lib/banks/*States.ts for state
// variants). Each page then bundles only its own exam's questions.
const BANKS: Partial<Record<ExamId, Question[]>> = {};

// Translated banks: same questionIds, categories and answer keys as the
// English bank, so tests, sets and progress line up in every language.
// An exam with translated banks also needs ExamConfig.translations.
const TRANSLATED_BANKS: Partial<Record<ExamId, Partial<Record<Language, Question[]>>>> = {};

/** Banks register here from lib/banks/*, which only that exam's app pages
 *  import, so no other exam's pages bundle them. */
export function registerExamBanks(
  banks: Partial<Record<ExamId, Question[]>>,
  translations: Partial<Record<ExamId, Partial<Record<Language, Question[]>>>> = {},
) {
  Object.assign(BANKS, banks);
  Object.assign(TRANSLATED_BANKS, translations);
}

export function getExamQuestions(examId: ExamId, language: Language = "en"): Question[] {
  const bank = TRANSLATED_BANKS[examId]?.[language] ?? BANKS[examId];
  if (!bank) throw new Error(`No question bank registered for ${examId}: import "@/lib/banks/${examId}" in the page`);
  return bank;
}

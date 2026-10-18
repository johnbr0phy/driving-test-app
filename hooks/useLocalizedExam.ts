"use client";

import { useTranslation } from "@/contexts/LanguageContext";
import { ExamConfig, examLanguage, localizeExam } from "@/lib/exams";
import { getExamRoutes } from "@/lib/examRoutes";
import { examUi } from "@/lib/examUi";

/**
 * A registry exam in the person's language when the exam is offered in it
 * (ExamConfig.translations), English otherwise: the localized config, its
 * routes, the page copy, and `lang` to pass to the question generators.
 */
export function useLocalizedExam(source: ExamConfig) {
  const { language } = useTranslation();
  const lang = examLanguage(source, language);
  return {
    exam: localizeExam(source, lang),
    routes: getExamRoutes(source.id, lang),
    ui: examUi(lang),
    lang,
  };
}

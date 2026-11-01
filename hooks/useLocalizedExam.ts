"use client";

import { ExamConfig, examBaseLanguage, examLanguages, localizeExam } from "@/lib/exams";
import { getExamRoutes } from "@/lib/examRoutes";
import { examUi } from "@/lib/examUi";
import { useTestLanguage } from "@/hooks/useTestLanguage";

/**
 * A registry exam in its test language (hooks/useTestLanguage.ts): the
 * person's pick on its dashboard, else their own language when the exam is
 * offered in it (ExamConfig.translations), else the exam's own language. The
 * localized config, its routes, the page copy, and `lang` to pass to the
 * question generators, plus what the dashboard's language choice needs.
 */
export function useLocalizedExam(source: ExamConfig) {
  const { lang, offered, setLang } = useTestLanguage(source.id, examLanguages(source), examBaseLanguage(source));
  return {
    exam: localizeExam(source, lang),
    routes: getExamRoutes(source.id, lang),
    ui: examUi(lang),
    lang,
    testLanguages: offered,
    setTestLanguage: setLang,
  };
}

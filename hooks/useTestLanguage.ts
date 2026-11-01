"use client";

import { useTranslation } from "@/contexts/LanguageContext";
import { useStore } from "@/store/useStore";
import type { Language } from "@/i18n";
import { dmvLanguagesFor, testLanguageFor } from "@/lib/testLanguage";

export { dmvLanguagesFor, testLanguageFor };

/** The language a test's questions are in (lib/testLanguage.ts), with its
 *  choices and a setter for the dashboard's "Questions in". */
export function useTestLanguage(examId: string, offered: Language[], base: Language = offered[0] ?? "en") {
  const { preferredLanguage } = useTranslation();
  const pick = useStore((s) => s.testLanguages?.[examId]);
  const setTestLanguage = useStore((s) => s.setTestLanguage);
  return {
    lang: testLanguageFor(pick, offered, preferredLanguage, base),
    offered,
    /** True once the person picked a language for this exam. */
    picked: !!pick && offered.includes(pick),
    setLang: (lang: Language) => setTestLanguage(examId, lang),
  };
}

/** The DMV's question language for the selected state. */
export function useDmvTestLanguage() {
  const state = useStore((s) => s.selectedState);
  return useTestLanguage("dmv", dmvLanguagesFor(state), "en");
}

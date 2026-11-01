"use client";

import { useTranslation } from "@/contexts/LanguageContext";
import { useStore } from "@/store/useStore";
import type { Language } from "@/i18n";
import { isViState } from "@/data/viStates";
import { isKoState } from "@/data/koStates";
import { isZhState } from "@/data/zhStates";

/**
 * The language a test's questions are in, kept apart from the interface
 * language. Only languages the exam really exists in are offered; the
 * person's pick for this exam (useStore.testLanguages) wins, then their own
 * language when the exam has it, then the exam's own language.
 */
export function testLanguageFor(
  pick: Language | undefined,
  offered: Language[],
  preferred: Language,
  base: Language
): Language {
  if (pick && offered.includes(pick)) return pick;
  if (offered.includes(preferred)) return preferred;
  return base;
}

export function useTestLanguage(examId: string, offered: Language[], base: Language = offered[0] ?? "en") {
  const { preferredLanguage } = useTranslation();
  const pick = useStore((s) => s.testLanguages?.[examId]);
  const setTestLanguage = useStore((s) => s.setTestLanguage);
  return {
    lang: testLanguageFor(pick, offered, preferredLanguage, base),
    offered,
    setLang: (lang: Language) => setTestLanguage(examId, lang),
  };
}

/** The DMV's languages for a state: Spanish everywhere, Vietnamese, Korean and
 *  Chinese only in the states their state-specific questions cover. */
export function dmvLanguagesFor(state: string | null | undefined): Language[] {
  const langs: Language[] = ["en", "es"];
  if (state && isViState(state)) langs.push("vi");
  if (state && isKoState(state)) langs.push("ko");
  if (state && isZhState(state)) langs.push("zh");
  return langs;
}

/** The DMV's question language for the selected state. */
export function useDmvTestLanguage() {
  const state = useStore((s) => s.selectedState);
  return useTestLanguage("dmv", dmvLanguagesFor(state), "en");
}

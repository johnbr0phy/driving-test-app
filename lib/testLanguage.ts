// The language a test's questions are in, kept apart from the person's
// interface language (lib/language.ts). Pure, so both the hooks
// (hooks/useTestLanguage.ts) and the page language (lib/pageLanguage.ts) use it.

import type { Language } from "@/i18n";
import { isViState } from "@/data/viStates";
import { isKoState } from "@/data/koStates";
import { isZhState } from "@/data/zhStates";

/**
 * Only languages the exam really exists in are offered; the person's pick
 * for this exam wins, then their own language when the exam has it, then
 * the exam's own language.
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

/** The DMV's languages for a state: Spanish everywhere, Vietnamese, Korean and
 *  Chinese only in the states their state-specific questions cover. */
export function dmvLanguagesFor(state: string | null | undefined): Language[] {
  const langs: Language[] = ["en", "es"];
  if (state && isViState(state)) langs.push("vi");
  if (state && isKoState(state)) langs.push("ko");
  if (state && isZhState(state)) langs.push("zh");
  return langs;
}

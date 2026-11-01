// The person's interface language, as opposed to the language a test's
// questions are in (hooks/useTestLanguage.ts). A picked language is stored in
// useStore and mirrored to the tt-lang cookie, which middleware reads to serve
// a homepage in it; until someone picks, pages use their country's language.

import { isLanguage, type Language } from "@/i18n";
import { isRegion, regionInfo, REGION_COOKIE, type Region } from "@/lib/region";

export const LANG_COOKIE = "tt-lang";
const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** True once the person has picked a language. A stored language other than
 *  English predates the languageChosen flag, so it counts as picked too. */
export function languageIsChosen(s: { language: Language; languageChosen?: boolean }): boolean {
  return s.languageChosen === true || s.language !== "en";
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

export function writeLanguageCookie(lang: Language) {
  if (typeof document === "undefined") return;
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
}

export function readLanguageCookie(): Language | null {
  const v = readCookie(LANG_COOKIE);
  return isLanguage(v) ? v : null;
}

/** The language of this browser's country (the tt-region cookie or the
 *  account's pick), English when it has none. */
export function countryLanguage(storeRegion: Region | null): Language {
  const cookie = readCookie(REGION_COOKIE);
  const region = storeRegion ?? (isRegion(cookie) ? cookie : null);
  return region ? regionInfo(region).lang : "en";
}

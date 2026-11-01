// Which language a page's interface runs in. The person's language
// ("preferred": their pick, else their country's) applies everywhere except
// landing pages whose URL is in a language (/es/test-dgt-permiso-b, the
// DMV state pages) and a country homepage the person has not picked a
// language for, which shows in its country's language. A test's questions
// have their own language (hooks/useTestLanguage.ts).
// contexts/LanguageContext.tsx applies this.

import { DMV_LANGUAGES, type Language } from "@/i18n";
import { examBaseLanguage, examLandingPath, getExamByPath } from "@/lib/exams";
import { REGIONS, regionHomePath } from "@/lib/region";

// State landing suffixes in every DMV language (app/[slug], app/<lang>/[slug]).
const DMV_SUFFIXES = ["-dmv-practice-test", "-examen-practica-dmv", "-thi-thu-dmv", "-dmv-pilgi-siheom", "-dmv-bishi-lianxi"];
const DMV_BASES = ["/dmv", "/test", "/practice", "/training", "/stats", "/drill", "/onboarding"];
const DMV_PAGES = new Set([
  "/dmv-practice-test",
  "/practice-tests-by-state",
  "/es/examenes-practica-por-estado",
  "/vi/thi-thu-dmv-theo-tieu-bang",
  "/ko/juibyeol-dmv-pilgi-siheom",
  "/zh/gezhou-dmv-bishi-lianxi",
]);

/** True on the DMV flow's pages: its app routes, landing and state pages. */
export function isDmvPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (DMV_PAGES.has(pathname)) return true;
  if (DMV_BASES.some((b) => pathname === b || pathname.startsWith(`${b}/`))) return true;
  return DMV_SUFFIXES.some((s) => pathname.endsWith(s));
}

/** The DMV landing and state pages (not its app routes, which follow the person's language). */
function isDmvLandingPath(pathname: string): boolean {
  return DMV_PAGES.has(pathname) || DMV_SUFFIXES.some((s) => pathname.endsWith(s));
}

const HOME_LANG = new Map(REGIONS.map((r) => [regionHomePath(r.code), r.lang]));

/** The language the page at `pathname` shows its interface in. `chosen` says
 *  whether `preferred` is the person's own pick or only their country's. */
export function pageLanguage(pathname: string | null | undefined, preferred: Language, chosen = true): Language {
  if (!pathname) return preferred;
  const exam = getExamByPath(pathname);
  if (exam) {
    // A landing is in the language of its URL.
    if (pathname === examLandingPath(exam)) return examBaseLanguage(exam);
    const tr = Object.entries(exam.translations ?? {}).find(([, t]) => t?.landingPath === pathname);
    if (tr) return tr[0] as Language;
    return preferred;
  }
  // The DMV landing and state pages have one URL per DMV language.
  if (isDmvLandingPath(pathname)) return DMV_LANGUAGES.includes(preferred) ? preferred : "en";
  const home = HOME_LANG.get(pathname);
  if (home && !chosen) return home;
  return preferred;
}

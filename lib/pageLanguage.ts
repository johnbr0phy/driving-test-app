// Which language a page's chrome runs in. The person's stored choice
// (useStore.language, "preferred") is the default, but some pages decide for
// themselves: a native-language exam runs in its own language, the DMV only
// in the languages it has questions for, and a country homepage in that
// country's language. contexts/LanguageContext.tsx applies this.

import { DMV_LANGUAGES, type Language } from "@/i18n";
import { examBaseLanguage, examLanguage, getExamByPath } from "@/lib/exams";
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

const HOME_LANG = new Map(REGIONS.map((r) => [regionHomePath(r.code), r.lang]));

/** The language the page at `pathname` shows its chrome in. */
export function pageLanguage(pathname: string | null | undefined, preferred: Language): Language {
  if (!pathname) return preferred;
  const exam = getExamByPath(pathname);
  if (exam && examBaseLanguage(exam) !== "en") {
    // A landing is in the language of its URL; the app pages follow the
    // person's choice when the exam is offered in it, else the exam's own.
    if (pathname === exam.landingPath) return examBaseLanguage(exam);
    const tr = Object.entries(exam.translations ?? {}).find(([, t]) => t?.landingPath === pathname);
    if (tr) return tr[0] as Language;
    return examLanguage(exam, preferred);
  }
  if (isDmvPath(pathname)) return DMV_LANGUAGES.includes(preferred) ? preferred : "en";
  const home = HOME_LANG.get(pathname);
  if (home) return home;
  return preferred;
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemePath } from "@/hooks/useThemePath";
import { useTranslation } from "@/contexts/LanguageContext";
import { states } from "@/data/states";
import { isViState } from "@/data/viStates";
import { isKoState } from "@/data/koStates";
import { isZhState } from "@/data/zhStates";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { examLandingPath, getExamByPath } from "@/lib/exams";
import { isTestPagePath } from "@/lib/pageLanguage";
import { relatedTests } from "@/lib/testCatalog";
import { getExamV2ByPath } from "@/lib/v2/registry";


const popularStateSlugs = [
  "california", "texas", "florida", "new-york", "pennsylvania",
  "illinois", "ohio", "georgia", "north-carolina", "michigan",
  "new-jersey", "virginia", "washington", "arizona", "massachusetts",
];

const popularStates = popularStateSlugs
  .map((slug) => states.find((s) => s.slug === slug))
  .filter(Boolean);

export function Footer() {
  const { t, language } = useTranslation();
  const pathname = usePathname();
  const themePath = useThemePath();
  const isEs = language === "es";
  const isVi = language === "vi";
  const isKo = language === "ko";
  const isZh = language === "zh";
  const v1Exam = getExamByPath(themePath);
  const v2Exam = getExamV2ByPath(themePath);
  const exam = v1Exam ?? (v2Exam ? { id: v2Exam.id } : undefined);
  const isHomepage = pathname === "/dmv-practice-test";
  const isQuizPage =
    pathname === "/q" || !!pathname?.startsWith("/q/") || pathname === "/quizzes" || pathname === "/create" || pathname === "/home-v2";

  // SEO landing pages have dedicated /es/ and /vi/ URLs, so they manage
  // language by routing.
  const isSeoPage =
    pathname?.endsWith("-dmv-practice-test") ||
    pathname?.endsWith("-examen-practica-dmv") ||
    pathname?.endsWith("-thi-thu-dmv") ||
    pathname?.endsWith("-dmv-pilgi-siheom") ||
    pathname?.endsWith("-dmv-bishi-lianxi") ||
    pathname === "/practice-tests-by-state" ||
    pathname === "/es/examenes-practica-por-estado" ||
    pathname === "/vi/thi-thu-dmv-theo-tieu-bang" ||
    pathname === "/ko/juibyeol-dmv-pilgi-siheom" ||
    pathname === "/zh/gezhou-dmv-bishi-lianxi";

  // One short footer everywhere. Landing pages (the URLs meant to rank) add
  // one line of internal links: popular states on the DMV landing and state
  // pages, the test's own cluster (relatedTests) on an exam landing.
  const onExamLanding =
    (!!v1Exam &&
      (pathname === examLandingPath(v1Exam) || Object.values(v1Exam.translations ?? {}).some((tr) => tr?.landingPath === pathname))) ||
    (!!v2Exam && pathname === v2Exam.landingPath);
  const onDmvLanding = isHomepage || !!isSeoPage;

  // The picker sets the person's own language (lib/language.ts), which every
  // page follows except landings whose URL is in a language (they have their
  // own switcher) and the v2 exams, which have no translations. A test's
  // questions have their own choice on its dashboard; a test's own pages run
  // in the test's language, so a picker there would change nothing visible.
  const showLanguageToggle =
    !isHomepage && !isSeoPage && !isQuizPage && !v2Exam && !onExamLanding && !isTestPagePath(pathname);

  const stateHref = (slug: string, code: string) =>
    isEs
      ? `/es/${slug}-examen-practica-dmv`
      : isVi && isViState(code)
        ? `/vi/${slug}-thi-thu-dmv`
        : isKo && isKoState(code)
          ? `/ko/${slug}-dmv-pilgi-siheom`
          : isZh && isZhState(code)
            ? `/zh/${slug}-dmv-bishi-lianxi`
            : `/${slug}-dmv-practice-test`;
  const allStatesHref = isEs
    ? "/es/examenes-practica-por-estado"
    : isVi
      ? "/vi/thi-thu-dmv-theo-tieu-bang"
      : isKo
        ? "/ko/juibyeol-dmv-pilgi-siheom"
        : isZh
          ? "/zh/gezhou-dmv-bishi-lianxi"
          : "/practice-tests-by-state";

  const link = "hover:text-gray-900 dark:hover:text-gray-50 hover:underline";

  return (
    <footer className="relative mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900" data-theme={exam?.id}>
      <div className="px-4 py-5 sm:px-6 space-y-3 text-sm text-gray-500 dark:text-gray-400">
        {onDmvLanding && (
          <nav aria-label={t("footer.allStates")} className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1">
            {popularStates.map((state) =>
              state ? (
                <Link key={state.slug} href={stateHref(state.slug, state.code)} className={link}>
                  {state.name}
                </Link>
              ) : null
            )}
            <Link href={allStatesHref} className="font-medium text-gray-700 dark:text-gray-200 hover:underline">
              {t("footer.allStates")}
            </Link>
          </nav>
        )}
        {onExamLanding && exam && (
          <nav aria-label={t("footer.practiceTests")} className="flex flex-wrap justify-center md:justify-start items-center gap-x-3 gap-y-1">
            <span className="font-medium text-gray-700 dark:text-gray-200">{t("footer.practiceTests")}:</span>
            {relatedTests(exam.id, 8).map((test) => (
              <Link key={test.id} href={test.href} className={link}>
                {test.shortName}
              </Link>
            ))}
          </nav>
        )}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-center md:text-left text-gray-600 dark:text-gray-300">
            {t("footer.madeWith")}{" "}
            <span className="text-red-500 dark:text-red-400" role="img" aria-label="love">
              ❤️
            </span>{" "}
            {t("footer.by")}{" "}
            <a
              href="https://x.com/JohnBr0"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 dark:text-gray-50 hover:underline"
            >
              @JohnBr0
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2">
            <CountrySwitcher />
            {showLanguageToggle && <LanguageSwitcher />}
            <ThemeToggle className="h-7 w-7" />
            <Link href="/create" className={link}>
              {t("footer.makeAQuiz")}
            </Link>
            <Link href="/teach" className={link}>
              {t("footer.forTeachers")}
            </Link>
            <Link href="/tests" className={link}>
              {t("footer.allTests")}
            </Link>
            <Link href="/privacy" className={link}>
              {t("footer.privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

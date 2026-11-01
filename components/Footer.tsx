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
  // Non-DMV exams share the compact footer (no state links, no language toggle).
  const isAltExam = !!exam;
  // Site-wide links stay inside the current test's cluster (driving tests on
  // DMV pages, nursing on nursing pages...). The /tests hub links everything.
  const footerTests = relatedTests(exam?.id ?? "dmv", 8);
  const isHomepage = pathname === "/dmv-practice-test";
  // User-made quizzes are not a test cluster: no state or test links there.
  const isQuizPage =
    pathname === "/q" || !!pathname?.startsWith("/q/") || pathname === "/quizzes" || pathname === "/create" ||
    // The search homepage trial wants the same short footer.
    pathname === "/home-v2";
  // Driving schools only belong next to driving tests (DMV, CDL, motorcycle).

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

  // The picker sets the person's own language (lib/language.ts), which every
  // page follows except landings whose URL is in a language (they have their
  // own switcher) and the v2 exams, which have no translations. A test's
  // questions have their own choice on its dashboard.
  const onExamLanding =
    !!v1Exam &&
    (pathname === examLandingPath(v1Exam) || Object.values(v1Exam.translations ?? {}).some((tr) => tr?.landingPath === pathname));
  // A test's own pages run in the test's language, set by its dashboard's
  // Change box, so a picker here would change nothing visible.
  const showLanguageToggle =
    !isHomepage && !isSeoPage && !isQuizPage && !v2Exam && !onExamLanding && !isTestPagePath(pathname);

  const dataTheme = exam?.id;

  return (
    <footer className="relative border-t bg-white dark:bg-gray-900 mt-auto" data-theme={dataTheme}>
      <div className="container mx-auto px-4 py-6">
        {!isAltExam && !isQuizPage && (
          <div className="flex flex-wrap justify-center md:justify-between gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
            {popularStates.map(
              (state) =>
                state && (
                  <Link
                    key={state.slug}
                    href={
                      isEs
                        ? `/es/${state.slug}-examen-practica-dmv`
                        : isVi && isViState(state.code)
                          ? `/vi/${state.slug}-thi-thu-dmv`
                          : isKo && isKoState(state.code)
                            ? `/ko/${state.slug}-dmv-pilgi-siheom`
                            : isZh && isZhState(state.code)
                              ? `/zh/${state.slug}-dmv-bishi-lianxi`
                              : `/${state.slug}-dmv-practice-test`
                    }
                    className="hover:text-brand"
                  >
                    {state.name}
                  </Link>
                )
            )}
            <Link
              href={
                isEs
                  ? "/es/examenes-practica-por-estado"
                  : isVi
                    ? "/vi/thi-thu-dmv-theo-tieu-bang"
                    : isKo
                      ? "/ko/juibyeol-dmv-pilgi-siheom"
                      : isZh
                        ? "/zh/gezhou-dmv-bishi-lianxi"
                        : "/practice-tests-by-state"
              }
              className="text-brand-dark hover:text-brand-darker font-medium"
            >
              {t("footer.allStates")}
            </Link>
          </div>
        )}
        {!isQuizPage && (
          <nav
            aria-label={t("footer.practiceTests")}
            className={`flex flex-wrap justify-center md:justify-start items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400 ${isAltExam ? "" : "mt-3"}`}
          >
            <span className="font-medium text-gray-700 dark:text-gray-200">{t("footer.practiceTests")}:</span>
            {footerTests.map((test) => (
              <Link key={test.id} href={test.href} className="hover:text-brand">
                {test.shortName}
              </Link>
            ))}
            <Link href="/tests" className="text-brand-dark hover:text-brand-darker font-medium">
              {t("footer.allTests")}
            </Link>
          </nav>
        )}
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm text-gray-600 dark:text-gray-300 ${isQuizPage ? "" : "mt-4"}`}>
          <p className="text-center md:text-left">
            {t("footer.madeWith")}{" "}
            <span className="text-red-500 dark:text-red-400" role="img" aria-label="love">
              ❤️
            </span>{" "}
            {t("footer.by")}{" "}
            <a
              href="https://x.com/JohnBr0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-dark hover:text-brand-darker font-medium hover:underline"
            >
              @JohnBr0
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-gray-500 dark:text-gray-400">
            <CountrySwitcher />
            {showLanguageToggle && <LanguageSwitcher />}
            <ThemeToggle className="h-7 w-7" />
            <Link href="/create" className="hover:text-brand hover:underline">
              {t("footer.makeAQuiz")}
            </Link>
            <Link href="/teach" className="hover:text-brand hover:underline">
              {t("footer.forTeachers")}
            </Link>
            <Link href="/privacy" className="hover:text-brand hover:underline">
              {t("footer.privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

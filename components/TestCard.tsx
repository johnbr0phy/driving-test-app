import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { TestCatalogEntry } from "@/lib/testCatalog";
import { TestIcon } from "@/components/TestIcon";
import { CountUp } from "@/components/CountUp";
import { hasTigerSet } from "@/lib/tigerAssets";
import { getExamById } from "@/lib/exams";
import { LANGUAGES, type Language } from "@/i18n";
import { homeCopy } from "@/components/home/homeCopy";

// No "use client": the homepage renders its whole catalog from the server
// (components/TestCatalogStatic.tsx), so 330 cards are plain HTML that the
// browser never hydrates. The /tests grid, a client component, imports the
// same card.

/**
 * One test on the hub. Every card has the same rows so a grid lines up:
 * name and certifying body (always two lines tall, flags on the second for
 * multilingual tests), a chip row (size, price) and the optional weekly count,
 * with a chevron on the right like the dashboard rows.
 */
/** A test's landing in the page's language when it has one (the Spanish DGT
 *  test on the Spanish homepage), else its usual landing. */
function landingIn(test: TestCatalogEntry, lang: Language): string {
  return getExamById(test.id)?.translations?.[lang]?.landingPath ?? test.href;
}

export function TestCard({ test, answered, headingLevel = 3, lang = "en" }: { test: TestCatalogEntry; answered?: number | null; headingLevel?: 3 | 4; lang?: Language }) {
  const tiger = hasTigerSet(test.id);
  const c = homeCopy(lang).card;
  // A native exam shows its own name on a page in its language (the German homepage).
  const name = test.nativeName && test.language === lang ? test.nativeName : test.name;
  // Cards sit under a section or group heading, so their names are one level below it.
  const Heading = headingLevel === 4 ? "h4" : "h3";
  return (
    <div data-theme={test.theme} className="h-full min-w-0">
      <Link
        href={landingIn(test, lang)}
        className="group flex h-full items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 transition-all hover:border-brand hover:shadow-lg"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tiger ? "" : "bg-brand text-white"}`}>
              <TestIcon examId={test.id} icon={test.icon} className={tiger ? "h-12 w-12" : "h-6 w-6"} />
            </div>
            <div className="min-w-0">
              <Heading className="text-balance text-lg font-semibold leading-snug text-gray-900 dark:text-gray-50">{name}</Heading>
              {/* Two lines tall either way: a long org wraps into the second, a multilingual test puts its flags there. */}
              {test.languages.length > 1 ? (
                <div className="min-h-[2.5rem] text-sm leading-5 text-gray-500 dark:text-gray-400">
                  <p className="truncate">{test.org}</p>
                  <LanguageFlags languages={test.languages} lang={lang} />
                </div>
              ) : (
                <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-gray-500 dark:text-gray-400">{test.org}</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-gray-700 dark:text-gray-300">
              {c.questions(test.questions)}
            </span>
            <span
              className="rounded-full bg-brand-light px-2.5 py-1 text-brand-dark"
              title={test.pricing ? `Practice tests: ${test.pricing}` : undefined}
            >
              {test.pricing ? c.freePlusPremium : c.free}
            </span>
          </div>

          {answered ? (
            <p className="mt-4 border-t border-gray-200 dark:border-gray-800 pt-3 text-center text-xs text-gray-500 dark:text-gray-400">
              <CountUp value={answered} className="text-sm font-semibold text-gray-900 dark:text-gray-50" />
              <span className="ml-1">{c.answeredThisWeek}</span>
            </p>
          ) : null}
        </div>
        <ChevronRight
          className="h-5 w-5 shrink-0 text-gray-300 dark:text-gray-600 transition-all group-hover:translate-x-0.5 group-hover:text-brand"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

/** The flags of every language a test comes in, same flags as the language switcher. */
function LanguageFlags({ languages, lang }: { languages: TestCatalogEntry["languages"]; lang: Language }) {
  // In the test's own order (base language first), as the languages call themselves.
  const langs = languages.map((code) => LANGUAGES.find((l) => l.code === code)).filter((l) => !!l);
  const names = langs.map((l) => (lang === "en" ? l.englishName : l.label)).join(", ");
  const label = homeCopy(lang).card.availableIn(names);
  return (
    <span className="flex h-5 items-center gap-1" title={label}>
      <span className="sr-only">{label}</span>
      {langs.map((l) => (
        <span key={l.code} aria-hidden="true" className="text-sm leading-none">
          {l.flag}
        </span>
      ))}
    </span>
  );
}

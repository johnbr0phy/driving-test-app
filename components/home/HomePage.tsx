import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemedScreenshot } from "@/components/ThemedScreenshot";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { TestCard, TestCatalogGrid } from "@/components/TestCatalogGrid";
import { CountUp } from "@/components/CountUp";
import { getPopularTests } from "@/lib/server/popularTests";
import { getTrendingSearches } from "@/lib/server/trendingSearches";
import { SearchHome } from "@/components/home/SearchHome";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/siteSchema";
import { EXAM_FACTS } from "@/lib/examFacts";
import { HUB_PAGES_UPDATED_AT } from "@/lib/seoDates";
import { states } from "@/data/states";
import { NON_DRIVING_TESTS, REGIONS, REGION_HOME, REGION_HREFLANG, Region, regionHomePath, regionOfTest, regionInfo } from "@/lib/region";
import type { TestCatalogEntry } from "@/lib/testCatalog";
import { countryNameIn, homeCopy } from "@/components/home/homeCopy";
import type { Language } from "@/i18n";
import { landingContent } from "@/lib/landingContent";
import { getExamById } from "@/lib/exams";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";
const examCount = TEST_CATALOG.length;

const title = `Tigertest: Free Practice Tests for ${examCount} Exams - DMV, SAT & More`;
const description = `Free practice tests for ${examCount} exams: the DMV permit test in all 50 states, SAT, ACT, CDL, nursing and healthcare certifications, IT certs, real estate, insurance and more. Every answer explained. No account needed.`;
const metaDescription = `Free practice tests for ${examCount} exams: the DMV permit test in every state, SAT, ACT, CDL, nursing, IT, real estate and more. Every answer explained.`;

// Every country homepage names the others as alternates, the US page as the default.
const countryAlternates = {
  ...Object.fromEntries(REGIONS.map((r) => [REGION_HREFLANG[r.code], `${siteUrl}${r.code === "US" ? "" : regionHomePath(r.code)}`])),
  "x-default": siteUrl,
};

export const homeMetadata: Metadata = {
  title: { absolute: title },
  description: metaDescription,
  alternates: { canonical: siteUrl, languages: countryAlternates },
  openGraph: {
    title,
    description: metaDescription,
    url: siteUrl,
    siteName: "Tigertest",
    type: "website",
    images: [{ url: shareImageUrl("home"), width: 1200, height: 630, alt: `Tigertest: ${examCount} free practice tests` }],
  },
  twitter: { card: "summary_large_image", title, description: metaDescription, images: [shareImageUrl("home")] },
};

/** /uk, /ie, /de...: the country's own title, description and canonical, in its language. */
export function countryHomeMetadata(region: Exclude<Region, "US">): Metadata {
  const { title: t, description: d } = REGION_HOME[region];
  const url = `${siteUrl}${regionHomePath(region)}`;
  return {
    title: { absolute: t },
    description: d,
    alternates: { canonical: url, languages: countryAlternates },
    openGraph: {
      title: t,
      description: d,
      url,
      siteName: "Tigertest",
      type: "website",
      locale: REGION_HREFLANG[region].replace("-", "_"),
      images: [{ url: shareImageUrl(region.toLowerCase()), width: 1200, height: 630, alt: t }],
    },
    twitter: { card: "summary_large_image", title: t, description: d, images: [shareImageUrl(region.toLowerCase())] },
  };
}


// Outside the US the FAQ talks about that country's tests, never the DMV.
const AUTHORITY: Record<Exclude<Region, "US">, string> = {
  UK: "the DVSA",
  CA: "any provincial licensing authority",
  AU: "any state road authority",
  IN: "any RTO or transport department",
  IE: "the RSA or the NDLS",
  NZ: "NZTA or any testing agent",
  PH: "the LTO",
  MY: "JPJ",
  SG: "the Traffic Police or any driving centre",
  HK: "the Transport Department",
  AE: "the RTA or any licensing authority",
  ZA: "any driving licence testing centre",
  NG: "the FRSC, JAMB, TRCN or any recruiting service",
  KE: "the NTSA",
  PK: "any provincial or ICT licensing authority",
  ES: "the DGT (Dirección General de Tráfico)",
  PT: "the IMT",
  RO: "the DGPCI (formerly DRPCIV) or any county driving licence service",
  SE: "Trafikverket or Transportstyrelsen",
  GR: "the Ministry of Infrastructure and Transport or any Transport Directorate",
  DK: "Færdselsstyrelsen",
  HU: "the KAV or any Hungarian authority",
  BE: "GOCA, any exam centre or the regional authorities",
  FI: "Traficom, Ajovarma or A-Katsastus",
  MT: "Transport Malta",
  DE: "TÜV/DEKRA",
};

// AUTHORITY is written for an English sentence ("the IMT"); other languages
// get the bare names, and Belgium's list in Dutch on its own page.
const AUTHORITY_NL_BE = "GOCA, de examencentra of de gewestelijke overheden";
function authorityIn(region: Exclude<Region, "US">, lang: Language): string {
  if (lang === "en") return AUTHORITY[region];
  if (region === "BE" && lang === "nl") return AUTHORITY_NL_BE;
  return AUTHORITY[region].replace(/^the /, "");
}

function faqsFor(region: Region, lang: Language = regionInfo(region).lang) {
  if (region === "US") return homeCopy(lang).usFaqs(examCount);
  const local = TEST_CATALOG.filter((t) => regionOfTest(t.id) === region && !NON_DRIVING_TESTS.has(t.id)).length;
  return homeCopy(lang).faqs({ local, inName: countryNameIn(region, lang), authority: authorityIn(region, lang), examCount });
}

/** "About each test": the exam's facts answer, in English (EXAM_FACTS) or, on a
 *  page in another language, the facts answer of the exam's landing in that
 *  language (lib/landingContent.ts). */
function aboutTest(t: TestCatalogEntry, lang: string): string | undefined {
  if (lang === "en") return EXAM_FACTS[t.id]?.answer;
  return landingContent(t.id, lang)?.facts.answer;
}

/** A test's name in the page's language: a native exam's own name on its country's page, else the English one. */
/** The catalog test a landing path belongs to: its main landing or one of its translated ones. */
function catalogTestForHref(href: string): TestCatalogEntry | undefined {
  return TEST_CATALOG.find(
    (t) => t.href === href || Object.values(getExamById(t.id)?.translations ?? {}).some((tr) => tr?.landingPath === href)
  );
}

function nameIn(t: TestCatalogEntry, lang: string): string {
  return t.nativeName && t.language === lang ? t.nativeName : t.name;
}

function jsonLdFor(region: Region) {
  const faqs = faqsFor(region);
  const us = region === "US";
  const pageUrl = us ? siteUrl : `${siteUrl}${regionHomePath(region)}`;
  // A country page lists its own tests and the worldwide ones, like the page itself.
  const listed = us ? TEST_CATALOG : TEST_CATALOG.filter((t) => regionOfTest(t.id) === region || regionOfTest(t.id) === "GLOBAL");
  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}/#webpage`,
      url: pageUrl,
      name: us ? title : REGION_HOME[region].title,
      description: us ? description : REGION_HOME[region].description,
      inLanguage: REGION_HREFLANG[region],
      dateModified: HUB_PAGES_UPDATED_AT,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "ItemList",
      name: us ? "Tigertest practice tests" : homeCopy(regionInfo(region).lang).listName(countryNameIn(region, regionInfo(region).lang)),
      itemListElement: listed.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: nameIn(t, regionInfo(region).lang),
        url: `${siteUrl}${t.href}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
  };
}

const popularStateSlugs = [
  "california", "texas", "florida", "new-york", "pennsylvania", "illinois",
  "ohio", "georgia", "north-carolina", "michigan", "new-jersey", "virginia",
];
const popularStates = popularStateSlugs
  .map((slug) => states.find((s) => s.slug === slug))
  .filter((s): s is (typeof states)[number] => !!s);

// The homepage for one country (lib/region.ts): "/" for the US, app/uk,
// app/ca and app/au for the others, each its own indexable page, in the
// country's language. `lang` serves it in another language for someone who
// picked one (middleware.ts rewrites to app/home-lang/[region]/[lang]): the
// country's own lines (REGION_HOME) then give way to the copy's generic ones.
export async function HomePage({ region, lang: pickedLang }: { region: Region; lang?: Language }) {
  const us = region === "US";
  const { tests: allRanked, totalAnswered } = await getPopularTests(500);
  const ranked = us ? allRanked.slice(0, 6) : allRanked.slice(0, 100);
  // Outside the US "Popular this week" only counts the country's own and worldwide tests,
  // and only ones someone actually answered (never the US fallback list).
  const popular = us
    ? ranked
    : ranked
        .filter((p) => p.answered !== null && p.answered > 0 && (regionOfTest(p.test.id) === region || regionOfTest(p.test.id) === "GLOBAL"))
        .slice(0, 6);
  // Outside the US: the country's own tests, busiest first.
  const answeredById = new Map(ranked.map((p) => [p.test.id, p.answered]));
  const byAnswered = (a: { id: string }, b: { id: string }) => (answeredById.get(b.id) ?? 0) - (answeredById.get(a.id) ?? 0);
  const localTests = TEST_CATALOG.filter((t) => regionOfTest(t.id) === region && !NON_DRIVING_TESTS.has(t.id)).sort(byAnswered);
  const home = us ? null : REGION_HOME[region];
  const nativeLang = regionInfo(region).lang;
  const lang = pickedLang ?? nativeLang;
  const native = lang === nativeLang;
  const faqs = faqsFor(region, lang);
  const inName = countryNameIn(region, lang);
  const c = homeCopy(lang);
  // A country's main CTA points at its first test (or that test's landing in
  // the page's language); it waits until that test is in the catalog.
  const ctaTest = home ? catalogTestForHref(home.cta.href) : undefined;
  const cta = home && ctaTest ? (native ? home.cta : { label: nameIn(ctaTest, lang), href: ctaTest.href }) : null;

  // English homepages open on the search (one box over every test, Nov 2026);
  // the other languages keep the hero, How it works and the catalog below.
  const search = lang === "en";
  const popularity: Record<string, number> = {};
  for (const p of allRanked) popularity[p.test.id] = p.answered ?? 0;
  const trending = search ? await trendingFor(region, allRanked) : [];

  return (
    <div className={`flex-1 bg-white ${search ? "dark:bg-gray-950" : "dark:bg-gray-900"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFor(region)) }} />

      {search && <SearchHome initialRegion={region} popularity={popularity} trending={trending} answeredThisWeek={totalAnswered} />}

      {/* The search homepages: every test right under the box, like /tests (the US
          lists every country's tests, other countries their own and worldwide). */}
      {search && (
      <div id="all-tests" className="max-w-5xl mx-auto px-6 pt-10 pb-16 md:pb-24 scroll-mt-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-center mb-6">
          {us ? c.everyTest : c.testsFor(inName)}
        </h2>
        <TestCatalogGrid showPopular={false} nested region={region} regionPicker localOnly={!us} lang={lang} searchBox={false} />
        {!us && (
          <p className="mt-10 text-sm text-gray-600 dark:text-gray-300">
            {c.usExamPrompt}{" "}
            <Link href="/tests" className="font-medium text-brand-dark hover:underline">{c.seeAllTests(examCount)}</Link>
          </p>
        )}
      </div>
      )}

      {!search && (<>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-6">
            {c.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {home ? (native ? home.lead : c.countryLead(inName)) : c.usLead(examCount)}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#all-tests"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-lg font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              {c.findYourTest} <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            {(us || cta) && (
            <Link
              href={cta ? cta.href : "/dmv-practice-test"}
              className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-700 px-8 py-4 text-lg font-semibold text-gray-900 dark:text-gray-50 hover:border-brand hover:text-brand transition-colors"
            >
              {cta ? cta.label : c.dmv.cta}
            </Link>
            )}
          </div>
          {totalAnswered !== null && totalAnswered > 0 && (
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              <CountUp value={totalAnswered} className="font-semibold text-gray-900 dark:text-gray-50" /> {c.answeredThisWeek}
            </p>
          )}
        </div>
      </div>

      </>)}

      {/* Popular this week (outside the US only once someone there has answered questions) */}
      {!search && popular.length > 0 && (
      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-20">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
            {popular[0]?.answered !== null ? c.popularThisWeek : c.popularTests}
          </h2>
          <Link href="/tests" className="text-sm font-medium text-brand-dark hover:underline">
            {c.allTests(examCount)} &rarr;
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map(({ test, answered }) => (
            <TestCard key={test.id} test={test} answered={answered} lang={lang} />
          ))}
        </div>
      </div>
      )}

      {/* The US: the DMV state grid */}
      {us && (
      /* DMV by state: keeps the homepage linking straight to the state pages */
      <div className="bg-gray-50 dark:bg-gray-950 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
              {c.dmv.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {c.dmv.body}{" "}
              <Link href="/dmv-practice-test" className="text-brand-dark hover:underline font-medium">
                {c.dmv.about}
              </Link>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularStates.map((state) => (
              <Link
                key={state.slug}
                href={`/${state.slug}-dmv-practice-test`}
                className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-brand-border hover:bg-brand-light transition-colors"
              >
                <span className="font-medium text-gray-900 dark:text-gray-50 text-sm">{state.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  <span aria-hidden="true">{state.writtenTestQuestions}Q</span>
                  <span className="sr-only">, {c.dmv.questionsOnTest(state.writtenTestQuestions)}</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/practice-tests-by-state" className="text-brand-dark hover:text-brand-darker font-medium hover:underline">
              {c.dmv.viewAll} &rarr;
            </Link>
          </div>
        </div>
      </div>
      )}

      {/* Outside the US: the country's own tests (none yet on a brand-new country page) */}
      {home && localTests.length > 0 && (!search || localTests.some((t) => aboutTest(t, lang))) && (
          <div className={`max-w-5xl mx-auto px-6 pb-16 md:pb-20 ${search ? "pt-4" : ""}`}>
            {!search && (<>
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mb-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">{native ? home.testsTitle : c.testsFor(inName)}</h2>
                {native && <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">{home.testsSub}</p>}
              </div>
              <Link href="/tests" className="text-sm font-medium text-brand-dark hover:underline">
                {c.allTests(examCount)} &rarr;
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {localTests.map((test) => (
                <TestCard key={test.id} test={test} answered={answeredById.get(test.id) ?? null} lang={lang} />
              ))}
            </div>
            </>)}
            {/* The facts of each real test in plain sentences: what search
                snippets and AI answers quote for "<country> driving test". */}
            {localTests.some((t) => aboutTest(t, lang)) && (
              <div className={search ? "" : "mt-12"}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  {localTests.length === 1 ? c.aboutTheTest : c.aboutEachTest}
                </h2>
                <div className="space-y-6">
                  {localTests.filter((t) => aboutTest(t, lang)).map((test) => (
                    <div key={test.id}>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-1">
                        <Link href={test.href} className="hover:text-brand-dark hover:underline">{nameIn(test, lang)}</Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{aboutTest(test, lang)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
      )}

      {!search && (<>
      {/* How it works: real screens from the app, one step per row */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-14 md:mb-20">
          {c.howItWorks}
        </h2>

        <div className="space-y-16 md:space-y-24">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-brand-dark mb-2">{c.steps[0].label}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">{c.steps[0].title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">{c.steps[0].body}</p>
            </div>
            <div className="md:col-span-3 flex justify-center items-start gap-3 sm:gap-4">
              {[
                { src: "/landing/sat-mobile.png", alt: c.shotAlts.phones[0] },
                { src: "/landing/cst-mobile.png", alt: c.shotAlts.phones[1] },
                { src: "/landing/cna-mobile.png", alt: c.shotAlts.phones[2] },
              ].map((shot, i) => (
                <div
                  key={shot.src}
                  className={`rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 w-[30%] max-w-[180px] ${i === 1 ? "md:-mt-6" : "md:mt-6"}`}
                >
                  <ThemedScreenshot src={shot.src} alt={shot.alt} width={768} height={1280} sizes="(min-width: 768px) 180px, 30vw" className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2 md:order-2">
              <p className="text-sm font-semibold text-brand-dark mb-2">{c.steps[1].label}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">{c.steps[1].title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">{c.steps[1].body}</p>
            </div>
            <div className="md:col-span-3 md:order-1">
              <div className="rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <ThemedScreenshot src="/landing/sat-desktop.png" alt={c.shotAlts.desktop} width={1215} height={790} sizes="(min-width: 1024px) 560px, 100vw" className="w-full h-auto" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-brand-dark mb-2">{c.steps[2].label}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">{c.steps[2].title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">{c.steps[2].body}</p>
            </div>
            <div className="md:col-span-3">
              <div className="rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <ThemedScreenshot src="/dashboard.png" alt={c.shotAlts.dashboard} width={1320} height={1143} sizes="(min-width: 1024px) 560px, 100vw" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Every test */}
      <div id="all-tests" className="max-w-5xl mx-auto px-6 py-16 md:py-24 scroll-mt-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-8">
          {us ? c.everyTest : c.testsFor(inName)}
        </h2>
        <TestCatalogGrid showPopular={false} nested region={region} regionPicker localOnly lang={lang} />
        {!us && (
          <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-300">
            {c.usExamPrompt}{" "}
            <Link href="/tests" className="font-medium text-brand-dark hover:underline">{c.seeAllTests(examCount)}</Link>
          </p>
        )}
      </div>

      </>)}

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            {c.faqTitle}
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Request a test */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">{c.requestTitle}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{c.requestBody}</p>
        <Link
          href="/request-test"
          className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full font-medium hover:bg-brand-hover transition-colors"
        >
          {c.requestCta}
        </Link>
      </div>
    </div>
  );
}

/** Trending searches for a homepage: what people searched most this week,
 *  topped up with this week's busiest tests from the country (or worldwide),
 *  then the country's own tests, so the list is never short. */
async function trendingFor(region: Region, ranked: { test: TestCatalogEntry; answered: number | null }[]): Promise<string[]> {
  const local = (id: string) => regionOfTest(id) === region || regionOfTest(id) === "GLOBAL";
  const feed: TestCatalogEntry[] = ranked.filter((p) => local(p.test.id)).map((p) => p.test);
  for (const test of TEST_CATALOG) {
    if (feed.length >= 6) break;
    if (regionOfTest(test.id) === region && !feed.includes(test)) feed.push(test);
  }
  const trending = await getTrendingSearches(6);
  for (const test of feed) {
    if (trending.length >= 6) break;
    const name = test.name.toLowerCase();
    if (!trending.includes(name)) trending.push(name);
  }
  return trending;
}

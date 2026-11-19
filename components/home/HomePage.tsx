import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { TestCard } from "@/components/TestCard";
import { TestCatalogStatic } from "@/components/TestCatalogStatic";
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
import { SITE_URL } from "@/lib/siteUrl";
import { regionHeadline } from "@/lib/regionHeadline";

const siteUrl = SITE_URL;
const examCount = TEST_CATALOG.length;
/** How many of a country's own tests "About each test" describes (the rest stay in the catalog below). */
const LOCAL_TESTS_SHOWN = 8;

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
  IE: "the RSA, the NDLS, SOLAS, the NTA, the Central Bank, QQI or the PSA",
  NZ: "NZTA, NZQA, Firearms Safety and Education New Zealand, the Nursing Council or any testing agent",
  PH: "the LTO, the PRC, the Civil Service Commission, NAPOLCOM, the AFP or the Insurance Commission",
  MY: "JPJ or the Asian Institute of Insurance",
  SG: "the Traffic Police, any driving centre, CEA, SCI, MAS or LTA",
  HK: "the Transport Department, the Insurance Authority, the SFC or the HKSI Institute",
  AE: "the RTA, SIRA or any licensing authority",
  ZA: "any driving licence testing centre, the FSCA, SAPS or PSIRA",
  NG: "the FRSC, JAMB, TRCN or any recruiting service",
  KE: "the NTSA or the Nursing Council of Kenya",
  PK: "any provincial or ICT licensing authority, the PPSC, Punjab Police, the Pakistan Army, the PAF, PMDC or PNMC",
  ES: "the DGT (Dirección General de Tráfico)",
  PT: "the IMT",
  RO: "the DGPCI (formerly DRPCIV), the ARR, the Ministry of Health or the universities of medicine",
  SE: "Trafikverket, Transportstyrelsen, Naturvårdsverket or UHR",
  GR: "the Ministry of Infrastructure and Transport, any Transport Directorate, the General Secretariat for Citizenship or ΕΟΠΠΕΠ",
  DK: "Færdselsstyrelsen, SIRI or Naturstyrelsen",
  HU: "the KAV, the Hungarian Red Cross, the MNB or any Hungarian authority",
  BE: "GOCA, any exam centre or the regional authorities",
  FI: "Traficom, Ajovarma, Ruokavirasto or Suomen riistakeskus",
  MT: "Transport Malta",
  DE: "TÜV/DEKRA",
  IT: "the Motorizzazione Civile or the universities for foreigners in Siena and Perugia",
  FR: "the Interior Ministry or the approved exam centres",
  CH: "the cantonal road traffic offices (Strassenverkehrsämter) or the asa",
};

// AUTHORITY is written for an English sentence ("the IMT"); other languages
// get the bare names, and Belgium's list in Dutch, Sweden's in Swedish, Denmark's in Danish, Finland's in Finnish, Hungary's in Hungarian, Romania's in Romanian and Greece's in Greek on their own pages.
const AUTHORITY_NL_BE = "GOCA, de examencentra of de gewestelijke overheden";
const AUTHORITY_SV_SE = "Trafikverket, Transportstyrelsen, Naturvårdsverket eller UHR";
const AUTHORITY_DA_DK = "Færdselsstyrelsen, SIRI eller Naturstyrelsen";
const AUTHORITY_FI_FI = "Traficom, Ajovarma, Ruokavirasto tai Suomen riistakeskus";
const AUTHORITY_HU_HU = "KAV, Magyar Vöröskereszt, MNB vagy más magyar hatóság";
const AUTHORITY_EL_GR = "Υπουργείο Υποδομών και Μεταφορών, Διευθύνσεις Μεταφορών, Γενική Γραμματεία Ιθαγένειας ή ΕΟΠΠΕΠ";
const AUTHORITY_IT_IT = "Motorizzazione Civile, Università per Stranieri di Siena o di Perugia";
const AUTHORITY_FR_FR = "le ministère de l'Intérieur ou les centres d'examen agréés";
const AUTHORITY_RO_RO = "DGPCI (fostul DRPCIV), ARR, Ministerul Sănătății, universitățile de medicină";
function authorityIn(region: Exclude<Region, "US">, lang: Language): string {
  if (lang === "en") return AUTHORITY[region];
  if (region === "BE" && lang === "nl") return AUTHORITY_NL_BE;
  if (region === "SE" && lang === "sv") return AUTHORITY_SV_SE;
  if (region === "DK" && lang === "da") return AUTHORITY_DA_DK;
  if (region === "FI" && lang === "fi") return AUTHORITY_FI_FI;
  if (region === "HU" && lang === "hu") return AUTHORITY_HU_HU;
  if (region === "RO" && lang === "ro") return AUTHORITY_RO_RO;
  if (region === "GR" && lang === "el") return AUTHORITY_EL_GR;
  if (region === "IT" && lang === "it") return AUTHORITY_IT_IT;
  if (region === "FR" && lang === "fr") return AUTHORITY_FR_FR;
  return AUTHORITY[region].replace(/^the /, "");
}

function faqsFor(region: Region, lang: Language = regionInfo(region).lang) {
  if (region === "US") return homeCopy(lang).usFaqs(examCount);
  const own = TEST_CATALOG.filter((t) => regionOfTest(t.id) === region);
  const local = own.filter((t) => !NON_DRIVING_TESTS.has(t.id)).length;
  // Every other test of the country (school, trade, citizenship...), so the FAQ's count is the whole list.
  const others = own.length - local;
  return homeCopy(lang).faqs({ local, others, inName: countryNameIn(region, lang), authority: authorityIn(region, lang), examCount });
}

/** "About each test": the exam's facts answer, in English (EXAM_FACTS) or, on a
 *  page in another language, the facts answer of the exam's landing in that
 *  language (lib/landingContent.ts). */
function aboutTest(t: TestCatalogEntry, lang: string): string | undefined {
  if (lang === "en") return EXAM_FACTS[t.id]?.answer;
  return landingContent(t.id, lang)?.facts.answer;
}

/** A test's name in the page's language: a native exam's own name on its country's page, else the English one. */
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
  const answeredById = new Map(allRanked.map((p) => [p.test.id, p.answered]));
  const byAnswered = (a: { id: string }, b: { id: string }) => (answeredById.get(b.id) ?? 0) - (answeredById.get(a.id) ?? 0);
  // The country's own tests for "About each test": every driving test, then the
  // busiest of the rest, LOCAL_TESTS_SHOWN in all (Nov 2026: it used to show the
  // driving tests only, so /in described 1 of its 39 tests and /it 1 of 5).
  const ownTests = TEST_CATALOG.filter((t) => regionOfTest(t.id) === region);
  const localTests = [
    ...ownTests.filter((t) => !NON_DRIVING_TESTS.has(t.id)).sort(byAnswered),
    ...ownTests.filter((t) => NON_DRIVING_TESTS.has(t.id)).sort(byAnswered),
  ].slice(0, Math.max(LOCAL_TESTS_SHOWN, ownTests.filter((t) => !NON_DRIVING_TESTS.has(t.id)).length));
  const home = us ? null : REGION_HOME[region];
  const nativeLang = regionInfo(region).lang;
  const lang = pickedLang ?? nativeLang;
  const native = lang === nativeLang;
  const faqs = faqsFor(region, lang);
  const inName = countryNameIn(region, lang);
  const c = homeCopy(lang);
  // Every homepage opens on the search (one box over every test): English since Nov 2026,
  // the other languages since Nov 18 2026 (they had a hero, How it works and a card catalog).
  const popularity: Record<string, number> = {};
  for (const p of allRanked) popularity[p.test.id] = p.answered ?? 0;
  const trending = await trendingFor(region, allRanked, lang);
  // A country page's own h1 and lead: built from the catalog in English (lib/regionHeadline.ts),
  // the country's own title and tests line in its language (REGION_HOME), else the generic ones.
  const headline = !home
    ? null
    : lang === "en"
      ? regionHeadline(region as Exclude<Region, "US">)
      : native
        ? { h1: home.title.replace(/\s*\|\s*Tigertest$/, ""), lead: home.testsSub }
        : { h1: c.testsFor(inName), lead: c.countryLead(inName) };

  return (
    <div className={`flex-1 bg-white dark:bg-gray-950`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFor(region)) }} />

      <SearchHome
        initialRegion={region}
        popularity={popularity}
        trending={trending}
        answeredThisWeek={totalAnswered}
        headline={headline?.h1}
        lang={lang}
        locale={lang === nativeLang ? regionInfo(region).locale : lang}
        labels={
          lang === "en"
            ? undefined
            : { placeholder: c.search.placeholder, label: c.search.label, clear: c.search.clear, answered: c.answeredThisWeek, findYourTest: c.findYourTest }
        }
      />

      {/* The search homepages: every test right under the box, like /tests (the US
          lists every country's tests, other countries their own and worldwide). */}
      <div id="all-tests" data-search-rest className="max-w-5xl mx-auto px-6 pt-10 pb-16 md:pb-24 scroll-mt-6">
        <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-center ${headline ? "mb-3" : "mb-6"}`}>
          {us ? c.everyTest : c.testsFor(inName)}
        </h2>
        {headline && <p className="mx-auto mb-6 max-w-2xl text-center text-gray-600 dark:text-gray-300">{headline.lead}</p>}
        {popular.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{c.popularThisWeek}</h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map(({ test, answered }) => (
                <TestCard key={test.id} test={test} answered={answered} headingLevel={4} lang={lang} />
              ))}
            </div>
          </div>
        )}
        {/* Every category as short text links (the busiest first), not a card per
            test: keeps each landing linked from the homepage at a fraction of the length. */}
        <TestCatalogStatic region={region} localOnly={!us} lang={lang} popularity={popularity} />
        <div className="mt-4 text-center">
          {!us && <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{c.usExamPrompt}</p>}
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 px-6 py-3 font-semibold text-gray-900 dark:text-gray-50 hover:border-brand hover:text-brand transition-colors"
          >
            {c.seeAllTests(examCount)} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* The US: the DMV state grid */}
      {us && (
      /* DMV by state: keeps the homepage linking straight to the state pages */
      <div data-search-rest className="bg-gray-50 dark:bg-gray-950 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
              {c.dmv.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {c.dmv.body}{" "}
              <Link href="/dmv-practice-test" className="text-brand-dark underline underline-offset-2 hover:decoration-2 font-medium">
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
      {home && localTests.some((t) => aboutTest(t, lang)) && (
          <div data-search-rest className="max-w-5xl mx-auto px-6 pb-16 md:pb-20 pt-4">
            {/* The facts of each real test in plain sentences: what search
                snippets and AI answers quote for "<country> driving test". */}
            {localTests.some((t) => aboutTest(t, lang)) && (
              <div>
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

      {/* FAQ */}
      <div data-search-rest className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
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
      <div data-search-rest className="max-w-3xl mx-auto px-6 py-16 text-center">
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
async function trendingFor(region: Region, ranked: { test: TestCatalogEntry; answered: number | null }[], lang: string): Promise<string[]> {
  const local = (id: string) => regionOfTest(id) === region || regionOfTest(id) === "GLOBAL";
  const feed: TestCatalogEntry[] = ranked.filter((p) => local(p.test.id)).map((p) => p.test);
  for (const test of TEST_CATALOG) {
    if (feed.length >= 6) break;
    if (regionOfTest(test.id) === region && !feed.includes(test)) feed.push(test);
  }
  // Outside the US only searches made there, so /uk never shows the US list.
  const trending = await getTrendingSearches(6, region === "US" ? undefined : region);
  for (const test of feed) {
    if (trending.length >= 6) break;
    const name = nameIn(test, lang).toLowerCase();
    if (!trending.includes(name)) trending.push(name);
  }
  return trending;
}

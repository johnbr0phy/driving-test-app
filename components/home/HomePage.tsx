import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ThemedScreenshot } from "@/components/ThemedScreenshot";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { TestCard, TestCatalogGrid } from "@/components/TestCatalogGrid";
import { CountUp } from "@/components/CountUp";
import { getPopularTests } from "@/lib/server/popularTests";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/siteSchema";
import { states } from "@/data/states";
import { NON_DRIVING_TESTS, REGION_HOME, Region, regionOfTest, regionInfo } from "@/lib/region";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";
const examCount = TEST_CATALOG.length;

const title = `Tigertest: Free Practice Tests for ${examCount} Exams - DMV, SAT & More`;
const description = `Free practice tests for ${examCount} exams: the DMV permit test in all 50 states, SAT, ACT, CDL, nursing and healthcare certifications, IT certs, real estate, insurance and more. Every answer explained. No account needed.`;
const metaDescription = `Free practice tests for ${examCount} exams: the DMV permit test in every state, SAT, ACT, CDL, nursing, IT, real estate and more. Every answer explained.`;

export const homeMetadata: Metadata = {
  title: { absolute: title },
  description: metaDescription,
  alternates: { canonical: siteUrl },
  openGraph: {
    title,
    description: metaDescription,
    url: siteUrl,
    siteName: "Tigertest",
    type: "website",
    images: [{ url: "/og-tests.png", width: 1200, height: 630, alt: `Tigertest: ${examCount} free practice tests` }],
  },
  twitter: { card: "summary_large_image", title, description: metaDescription, images: ["/og-tests.png"] },
};

const usFaqs = [
  {
    q: "What is Tigertest?",
    a: `Tigertest is a free practice test site for ${examCount} exams, from the DMV permit test in every state to the SAT, ACT, nursing, healthcare, IT, trade and licensing exams. Each test follows the real exam's published outline, and every question explains the right answer.`,
  },
  {
    q: "Is Tigertest free?",
    a: "Yes. Most tests are completely free. The DMV, SAT and ACT have free practice tests and training plus an optional one-time $9.99 Premium purchase (not a subscription) that unlocks the extra tests for all three.",
  },
  {
    q: "Do I need an account?",
    a: "No. You can start any test without signing up. Make a free account if you want your progress saved across devices.",
  },
  {
    q: "How does Tigertest help me pass?",
    a: "Training mode gives instant feedback and brings back the questions you miss until you know them. Full practice tests then simulate the real exam, and your results show which topics still need work.",
  },
  {
    q: "Is Tigertest affiliated with the DMV or any testing company?",
    a: "No. Tigertest is independent and is not affiliated with any DMV, testing company or certification body.",
  },
];

// Outside the US the FAQ talks about that country's tests, never the DMV.
const AUTHORITY: Record<Exclude<Region, "US">, string> = {
  UK: "the DVSA",
  CA: "any provincial licensing authority",
  AU: "any state road authority",
};

function faqsFor(region: Region) {
  if (region === "US") return usFaqs;
  const local = TEST_CATALOG.filter((t) => regionOfTest(t.id) === region && !NON_DRIVING_TESTS.has(t.id)).length;
  const where = regionInfo(region).inName;
  return [
    {
      q: "What is Tigertest?",
      a: `Tigertest is a free practice test site. For ${where} it has ${local} driving tests written from the official handbooks, plus certifications that are the same everywhere, such as CompTIA and AWS. Every question explains the right answer.`,
    },
    {
      q: "Is Tigertest free?",
      a: `Yes. Every test for ${where} is free, with no subscription.`,
    },
    usFaqs[2],
    usFaqs[3],
    {
      q: "Is Tigertest an official test?",
      a: `No. Tigertest is independent and is not affiliated with ${AUTHORITY[region]} or any testing company. The questions are original and written from the official handbooks.`,
    },
  ];
}

function jsonLdFor(region: Region) {
  const faqs = faqsFor(region);
  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: title,
      description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "ItemList",
      name: "Tigertest practice tests",
      itemListElement: TEST_CATALOG.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
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

const quotes = [
  { text: "Used this to help me study. Passed today! Thank you :)", who: "u/Naive_Usual1910", href: "https://www.reddit.com/r/driving/comments/1ep1644/comment/lxra5co/" },
  { text: "it was sooooo much better than Quizlet or making my own flashcards", who: "u/yabukothestray" },
  { text: "it was very helpful... I passed the written test this morning", who: "ideapad101" },
  { text: "The interface is smooth and easy to navigate, unlike other free practice tests. I passed with only two mistakes!", who: "Yzabelle" },
  { text: "i passed in 3 minutes", who: "u/Curdled_Cave", href: "https://www.reddit.com/r/driving/comments/1ep1644/comment/m6ndsvp/" },
  { text: "felt confident after just studying the previous day", who: "JayjayX12" },
];

// The homepage for one country (lib/region.ts). "/" is the US version;
// middleware.ts serves app/home/[region] at "/" for the UK, Canada and
// Australia, so search engines only ever see this one URL.
export async function HomePage({ region }: { region: Region }) {
  const us = region === "US";
  const { tests: ranked, totalAnswered } = await getPopularTests(us ? 6 : 100);
  const popular = us ? ranked : [];
  // Outside the US: the country's own tests, busiest first, then the certifications taken everywhere.
  const answeredById = new Map(ranked.map((p) => [p.test.id, p.answered]));
  const byAnswered = (a: { id: string }, b: { id: string }) => (answeredById.get(b.id) ?? 0) - (answeredById.get(a.id) ?? 0);
  const localTests = TEST_CATALOG.filter((t) => regionOfTest(t.id) === region && !NON_DRIVING_TESTS.has(t.id)).sort(byAnswered);
  const alsoTests = [
    ...TEST_CATALOG.filter((t) => regionOfTest(t.id) === region && NON_DRIVING_TESTS.has(t.id)),
    ...TEST_CATALOG.filter((t) => regionOfTest(t.id) === "GLOBAL").sort(byAnswered),
  ];
  const home = us ? null : REGION_HOME[region];
  const faqs = faqsFor(region);

  return (
    <div className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFor(region)) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-14 pb-12 md:pt-20 md:pb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-6">
            Free practice tests that get you to a pass
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {home ? home.lead : `${examCount} exams, from the DMV permit test to the SAT, nursing and IT certs. Every answer explained. No signup.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#all-tests"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-lg font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Find your test <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <Link
              href={home ? home.cta.href : "/dmv-practice-test"}
              className="inline-flex items-center rounded-full border border-gray-300 dark:border-gray-700 px-8 py-4 text-lg font-semibold text-gray-900 dark:text-gray-50 hover:border-brand hover:text-brand transition-colors"
            >
              {home ? home.cta.label : "DMV permit test"}
            </Link>
          </div>
          {totalAnswered !== null && totalAnswered > 0 && (
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              <CountUp value={totalAnswered} className="font-semibold text-gray-900 dark:text-gray-50" /> questions answered this week
            </p>
          )}
        </div>
      </div>

      {/* The US: popular tests and the DMV state grid */}
      {us && (
        <>
      {/* Popular this week */}
      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-20">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">
            {popular[0]?.answered !== null ? "Popular this week" : "Popular tests"}
          </h2>
          <Link href="/tests" className="text-sm font-medium text-brand-dark hover:underline">
            All {examCount} tests &rarr;
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map(({ test, answered }) => (
            <TestCard key={test.id} test={test} answered={answered} />
          ))}
        </div>
      </div>

      {/* DMV by state: keeps the homepage linking straight to the state pages */}
      <div className="bg-gray-50 dark:bg-gray-950 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
              Taking your DMV permit test?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              200 questions written from your state&apos;s own driver&apos;s manual, for all 50 states and DC.{" "}
              <Link href="/dmv-practice-test" className="text-brand-dark hover:underline font-medium">
                About the DMV practice test
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
                  <span className="sr-only">, {state.writtenTestQuestions} questions on the written test</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/practice-tests-by-state" className="text-brand-dark hover:text-brand-darker font-medium hover:underline">
              View all 50 states &rarr;
            </Link>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Outside the US: the country's own tests, then the certifications taken everywhere */}
      {home && (
        <>
          <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-20">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mb-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50">{home.testsTitle}</h2>
                <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">{home.testsSub}</p>
              </div>
              <Link href="/tests" className="text-sm font-medium text-brand-dark hover:underline">
                All {examCount} tests &rarr;
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {localTests.map((test) => (
                <TestCard key={test.id} test={test} answered={answeredById.get(test.id) ?? null} />
              ))}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-950 py-14 md:py-20">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">Also used in {regionInfo(region).inName}</h2>
              <p className="mb-6 max-w-2xl text-gray-600 dark:text-gray-300">More practice that works in {regionInfo(region).inName}, including certifications that are the same exam everywhere.</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {alsoTests.map((test) => (
                  <TestCard key={test.id} test={test} answered={answeredById.get(test.id) ?? null} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* How it works and the Reddit quotes are about the DMV, so they stay on the US page */}
      {us && (
        <>
      {/* How it works: real screens from the app, one step per row */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-14 md:mb-20">
          How Tigertest works
        </h2>

        <div className="space-y-16 md:space-y-24">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-brand-dark mb-2">Step 1</p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">Learn it on your phone</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Tap an answer and see right away whether it&apos;s right and why. Questions you miss come back until you
                get them, so a few minutes on the bus actually counts.
              </p>
            </div>
            <div className="md:col-span-3 flex justify-center items-start gap-3 sm:gap-4">
              {[
                { src: "/landing/sat-mobile.png", alt: "SAT math drill on a phone" },
                { src: "/landing/cst-mobile.png", alt: "Surgical technologist question on a phone" },
                { src: "/landing/cna-mobile.png", alt: "CNA practice question on a phone" },
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
              <p className="text-sm font-semibold text-brand-dark mb-2">Step 2</p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">Sit the real thing</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                When the questions feel easy, take a full practice test built from the real exam&apos;s outline, with the
                same mix of topics. Then you know your score before it counts.
              </p>
            </div>
            <div className="md:col-span-3 md:order-1">
              <div className="rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <ThemedScreenshot src="/landing/sat-desktop.png" alt="Timed SAT practice test on a computer" width={1215} height={790} sizes="(min-width: 1024px) 560px, 100vw" className="w-full h-auto" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-brand-dark mb-2">Step 3</p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">Know when you&apos;re ready</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Your dashboard turns green as you finish each set and pass each test. When it&apos;s all green, go book
                the exam.
              </p>
            </div>
            <div className="md:col-span-3">
              <div className="rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <ThemedScreenshot src="/dashboard.png" alt="Tigertest DMV dashboard with training sets and practice tests" width={1320} height={1143} sizes="(min-width: 1024px) 560px, 100vw" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social proof */}
      <div className="bg-brand-light py-14">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8 flex items-center justify-center gap-2">
            From r/driving, r/DMV and r/Histology on
            <Image src="/reddit.png" alt="Reddit" width={72} height={24} className="h-[55px] w-auto inline-block dark:hidden" />
            <Image src="/reddit-dark.png" alt="Reddit" width={72} height={24} className="h-[55px] w-auto hidden dark:inline-block" />
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((q) => {
              const body = (
                <>
                  <blockquote className="text-gray-800 dark:text-gray-100 mb-3">&quot;{q.text}&quot;</blockquote>
                  <figcaption className="text-sm text-gray-500 dark:text-gray-400">{q.who}</figcaption>
                </>
              );
              return q.href ? (
                <a key={q.who} href={q.href} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-white dark:bg-gray-900 p-6 hover:shadow-md transition-shadow">
                  <figure>{body}</figure>
                </a>
              ) : (
                <figure key={q.who} className="rounded-2xl bg-white dark:bg-gray-900 p-6">{body}</figure>
              );
            })}
          </div>
        </div>
      </div>
        </>
      )}

      {/* Every test */}
      <div id="all-tests" className="max-w-5xl mx-auto px-6 py-16 md:py-24 scroll-mt-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-8">
          {us ? "Every practice test" : `Practice tests for ${regionInfo(region).inName}`}
        </h2>
        <TestCatalogGrid showPopular={false} nested region={region} regionPicker localOnly />
        {!us && (
          <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-300">
            Moving to the US or studying for a US exam?{" "}
            <Link href="/tests" className="font-medium text-brand-dark hover:underline">See all {examCount} tests</Link>
          </p>
        )}
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            Frequently asked questions
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">Don&apos;t see your exam?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We add new tests based on requests. Tell us which one you are studying for.
        </p>
        <Link
          href="/request-test"
          className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full font-medium hover:bg-brand-hover transition-colors"
        >
          Request a test
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { TestCard } from "@/components/TestCard";
import { HOMESCHOOL_BANDS, HOMESCHOOL_FAQS, HOMESCHOOL_PATH, homeschoolBandTests } from "@/lib/homeschool";
import { HOMESCHOOL_PAGE_UPDATED_AT } from "@/lib/seoDates";
import { ORGANIZATION_ID } from "@/lib/siteSchema";
import { SITE_URL } from "@/lib/siteUrl";

// Indexed hub for parents searching "homeschool practice test", "homeschool
// standardized testing" and "free homeschool assessment" (docs/claude/seo.md).

const url = `${SITE_URL}${HOMESCHOOL_PATH}`;
const title = "Free Homeschool Practice Tests by Grade";
const description =
  "Free practice tests for homeschoolers, grades 2 to 12: MAP Growth, CogAT, SSAT, ISEE, HSPT, PSAT, SAT, ACT, AP and GED. Track every child in one free family class. No account needed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: { title: `${title} | Tigertest`, description, url, type: "website" },
  twitter: { card: "summary_large_image", title: `${title} | Tigertest`, description },
};

const FAMILY_STEPS = [
  { h: "Make a family class", p: "Sign in, pick the test and name the class. It takes under a minute." },
  { h: "Send each child the link", p: "Each child opens it on their own device and joins with their first name. No accounts for the kids." },
  { h: "See how each one is doing", p: "Your class page shows who practiced, their practice test scores and the topics and questions they miss most." },
];

export default function HomeschoolPage() {
  const bands = HOMESCHOOL_BANDS.map((band) => ({ band, tests: homeschoolBandTests(band) }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        dateModified: HOMESCHOOL_PAGE_UPDATED_AT,
        inLanguage: "en",
        audience: { "@type": "EducationalAudience", educationalRole: "parent" },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": ORGANIZATION_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: bands
            .flatMap((b) => b.tests)
            .map(({ test }, i) => ({ "@type": "ListItem", position: i + 1, name: test.name, url: `${SITE_URL}${test.href}` })),
        },
      },
      { "@type": "FAQPage", mainEntity: HOMESCHOOL_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div data-theme="mapgrowth" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-14 md:pt-24 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-dark">For homeschool families</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">{title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Practice for the tests homeschoolers actually take, from MAP Growth in grade 2 to the SAT, ACT and AP exams. Every test is free, with explanations
            for every answer, and you can follow each child&apos;s progress in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#grades" className="inline-block rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-lg font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
              Find tests by grade
            </a>
            <a href="#family" className="inline-block rounded-full border border-gray-300 dark:border-gray-700 px-8 py-4 text-lg font-semibold text-gray-900 dark:text-gray-50 hover:border-brand">
              Track your kids
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Free, no account needed.</p>
        </div>
      </div>

      <div id="grades" className="max-w-5xl mx-auto px-6 py-12 scroll-mt-20">
        <nav aria-label="Grade bands" className="mb-10 flex flex-wrap justify-center gap-2">
          {bands.map(({ band }) => (
            <a key={band.id} href={`#${band.id}`} className="rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
              {band.title}
            </a>
          ))}
        </nav>
        {bands.map(({ band, tests }) => (
          <section key={band.id} id={band.id} className="mb-14 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">{band.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{band.intro}</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tests.map(({ test, who }) => (
                <li key={test.id} className="flex flex-col gap-2">
                  <TestCard test={test} />
                  <p className="px-1 text-sm text-gray-500 dark:text-gray-400">{who}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div id="family" className="bg-gray-50 dark:bg-gray-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 text-center mb-3">Follow every child in one family class</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            The same free classes teachers use. Make one for the test your kids are working on and see each child&apos;s progress without looking over their shoulder.
          </p>
          <ol className="grid md:grid-cols-3 gap-6">
            {FAMILY_STEPS.map((s, i) => (
              <li key={s.h} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <p className="text-sm font-semibold text-brand-dark mb-1">Step {i + 1}</p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{s.h}</h3>
                <p className="text-gray-600 dark:text-gray-300">{s.p}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center">
            <Link href="/teach/new" className="inline-block rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-lg font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
              Make a free family class
            </Link>
          </p>
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Have your own material? <Link href="/create" className="underline underline-offset-2">Turn a chapter into a quiz</Link> and share it with the class.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Questions homeschool parents ask</h2>
        <div className="space-y-6">
          {HOMESCHOOL_FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-1">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center">
          <a href="#grades" className="inline-block rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-lg font-semibold text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200">
            Pick a test to start
          </a>
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteUrl";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/siteSchema";
import { PRESS_CONTACT, PRESS_RELEASES, formatPressDate } from "@/lib/pressReleases";

// Press release, 19 Nov 2026. Figures read that day from the live data:
// globalStats/wrongQuestions (nightly run of 2026-11-19 03:01 UTC, 6,164
// accounts) and the homepage's questions answered in the last 7 days. Never
// update them here; a newer story is a new release.

const release = PRESS_RELEASES.find((r) => r.slug === "road-signs-new-drivers-miss")!;
const url = `${SITE_URL}/press/${release.slug}`;

export const metadata: Metadata = {
  title: { absolute: `${release.title} | Tigertest Press` },
  description: release.summary,
  alternates: { canonical: url },
  openGraph: { title: release.title, description: release.summary, url, siteName: "Tigertest", type: "article" },
};

const MISSED: { question: string; answer: string; missed: number; attempts: number }[] = [
  { question: "What does a double-arrow sign mean?", answer: "Traffic may pass on either side of an obstruction", missed: 58, attempts: 5470 },
  { question: "What does a pennant-shaped sign mean?", answer: "No passing zone", missed: 53, attempts: 5453 },
  { question: "What does a stop-ahead sign look like?", answer: "A yellow diamond with the word STOP", missed: 53, attempts: 3049 },
  { question: "What does a no-turn-on-red sign mean?", answer: "No turning while the light is red", missed: 50, attempts: 2778 },
  { question: "What does a yellow BUMP sign mean?", answer: "A sharp rise in the road ahead", missed: 49, attempts: 4528 },
  { question: "What shape is a school zone sign?", answer: "A pentagon", missed: 44, attempts: 5154 },
  { question: "What color is a yield sign?", answer: "Red and white", missed: 39, attempts: 5128 },
];

const h2 = "text-2xl font-semibold mb-4 mt-2";
const p = "text-gray-700 dark:text-gray-200 leading-relaxed";

export default function RoadSignsRelease() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    url,
    headline: release.title,
    description: release.summary,
    datePublished: release.date,
    dateModified: release.date,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 py-16 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto">
        <p className="text-sm mb-4">
          <Link href="/press" className="underline text-gray-600 dark:text-gray-300">
            Press
          </Link>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          For immediate release · {formatPressDate(release.date)}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{release.title}</h1>

        <div className="space-y-6">
          <p className={`${p} text-lg`}>
            Most people studying for a driver&apos;s permit know the rules of the road. It&apos;s the signs that trip them
            up. Answers from more than 6,000 learner drivers practicing on Tigertest show that the seven DMV permit test
            questions missed most are all about road signs. The double-arrow sign, which means traffic may pass on either
            side of an obstruction, is missed in 58% of attempts. The pennant-shaped no-passing sign is missed in 53%.
          </p>

          <section>
            <h2 className={h2}>The road signs learner drivers miss most</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="py-2 pr-4 font-semibold">Question</th>
                    <th className="py-2 pr-4 font-semibold">Correct answer</th>
                    <th className="py-2 pr-4 font-semibold text-right">Missed</th>
                    <th className="py-2 font-semibold text-right">Attempts</th>
                  </tr>
                </thead>
                <tbody>
                  {MISSED.map((m) => (
                    <tr key={m.question} className="border-b border-gray-100 dark:border-gray-800 align-top">
                      <td className="py-2 pr-4">{m.question}</td>
                      <td className="py-2 pr-4">{m.answer}</td>
                      <td className="py-2 pr-4 text-right font-semibold">{m.missed}%</td>
                      <td className="py-2 text-right">{m.attempts.toLocaleString("en-US")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className={h2}>Shapes and colors carry the meaning</h2>
            <p className={p}>
              Most of these signs are learned by shape or color, not words. A school zone sign is the only five-sided
              sign, yet 44% of attempts get it wrong. Nearly four in ten attempts miss that a yield sign is red and white;
              US yield signs were yellow until 1971, which may add to the confusion. On the real test, a
              question about a sign&apos;s shape or color counts the same as any other, and a few misses can be the
              difference between passing and failing.
            </p>
          </section>

          <section>
            <h2 className={h2}>Quote</h2>
            <blockquote className={`${p} border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic`}>
              &ldquo;People study the rules and skim the signs, because the signs feel obvious. Then they meet a pennant or
              a double arrow on the test and guess. The good news is that signs are the easiest part of the test to fix
              with a little practice.&rdquo;
              <footer className="not-italic mt-2 text-sm">John Brophy, founder of Tigertest</footer>
            </blockquote>
          </section>

          <section>
            <h2 className={h2}>About the data</h2>
            <p className={p}>
              The figures come from answers given in Tigertest&apos;s DMV practice tests and training sets by 6,164 people
              with Tigertest accounts, aggregated on November 19, 2026. They cover the questions shared by every state&apos;s
              practice test. Percentages are the share of attempts answered wrong, not the share of people, and a learner
              can answer a question more than once. Test accounts and automated traffic are excluded. Learners on Tigertest
              answered 152,285 practice questions across all tests in the seven days before publication.
            </p>
          </section>

          <section>
            <h2 className={h2}>About Tigertest</h2>
            <p className={p}>
              Tigertest is a practice-test site, free to start, for the DMV permit test in every US state and hundreds of
              other licence, certification and school exams in countries around the world. It is independent and not
              affiliated with any DMV or test maker. Learners can try the{" "}
              <Link className="underline" href="/dmv-practice-test">
                DMV practice test
              </Link>{" "}
              with no account. More on the{" "}
              <Link className="underline" href="/about">
                about page
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className={h2}>Media contact</h2>
            <p className={p}>
              John Brophy,{" "}
              <a className="underline" href={`mailto:${PRESS_CONTACT}`}>
                {PRESS_CONTACT}
              </a>
              . State-by-state figures and the full list of most-missed questions are available on request.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

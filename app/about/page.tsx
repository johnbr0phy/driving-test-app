import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/siteUrl";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { REGIONS } from "@/lib/region";
import { ORGANIZATION_ID, WEBSITE_ID } from "@/lib/siteSchema";
import { ABOUT_PAGE_UPDATED_AT } from "@/lib/seoDates";

// /about: who makes Tigertest, how the questions are written and what it
// costs. The page search and AI answer engines read when they ask whether a
// practice-test site can be trusted, linked from the footer and llms.txt.

const CONTACT = "john@johnbrophy.net";
const EXAM_COUNT = TEST_CATALOG.length;
const COUNTRY_COUNT = REGIONS.length;

const title = "About Tigertest";
const description = `Tigertest is a free practice-test site run by John Brophy: ${EXAM_COUNT} exams in ${COUNTRY_COUNT} countries, original questions written to each exam's official outline, independent of every test maker.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: { title, description, url: `${SITE_URL}/about`, siteName: "Tigertest", type: "website" },
};

const h2 = "text-lg font-semibold text-gray-900 dark:text-gray-50 mt-8 mb-2";
const p = "text-gray-700 dark:text-gray-200 leading-relaxed";
const a = "underline underline-offset-2 text-gray-900 dark:text-gray-50";

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: title,
    description,
    dateModified: ABOUT_PAGE_UPDATED_AT,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    mainEntity: { "@id": ORGANIZATION_ID },
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">About Tigertest</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated {ABOUT_PAGE_UPDATED_AT}</p>

        <p className={`${p} mt-6`}>
          Tigertest is a free practice-test site for {EXAM_COUNT} exams in {COUNTRY_COUNT} countries: the DMV permit test
          in every US state, driving theory tests from the UK to Malaysia, and licensing, certification, school and
          admissions exams such as the CDL, NCLEX, SAT, CompTIA Security+ and the UK citizenship test. It is run by John
          Brophy.
        </p>

        <h2 className={h2}>How the questions are written</h2>
        <p className={p}>
          Every question is original, written to the exam&apos;s published content outline or official handbook, in that
          country&apos;s own rules, spelling and units. The ham radio test is the exception: it uses the official public
          question pool. Each practice test follows the real exam&apos;s topic weighting where the exam publishes one,
          and each exam page lists the official source its facts come from (question count, time limit, pass mark) and
          when they were last checked. Rules change, so check that source before test day.
        </p>

        <h2 className={h2}>How practice works</h2>
        <p className={p}>
          Training sets bring back every question you miss until you get it right, and practice tests are scored like
          the real exam. You can start without an account; signing in keeps your progress across devices. Teachers can
          make a free class for any test, and anyone can turn their own notes into a shareable quiz.
        </p>

        <h2 className={h2}>What it costs</h2>
        <p className={p}>
          Practice is free on every exam. The DMV test has an optional one-time $9.99 Premium purchase that unlocks two
          more DMV tests and training sets and the full stats pages of every US exam. There is no subscription.
        </p>

        <h2 className={h2}>Independence</h2>
        <p className={p}>
          Tigertest is not affiliated with, endorsed by or connected to any DMV, licensing board, government agency,
          test maker or certification body. Exam names belong to their owners and are used only to say which exam a
          practice test is for. Passing a practice test here does not guarantee a result on the real exam.
        </p>

        <h2 className={h2}>Contact</h2>
        <p className={p}>
          Found a wrong answer or an out-of-date rule? Email{" "}
          <a className={a} href={`mailto:${CONTACT}`}>
            {CONTACT}
          </a>{" "}
          and it will be fixed. See also the <Link className={a} href="/tests">full list of tests</Link>, the{" "}
          <Link className={a} href="/privacy">privacy policy</Link> and the <Link className={a} href="/terms">terms</Link>.
        </p>
      </div>
    </div>
  );
}

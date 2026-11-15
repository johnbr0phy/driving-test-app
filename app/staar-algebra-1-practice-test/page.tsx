import "@/lib/v2/banks/staaralg1";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free STAAR Algebra I Practice Test 2027 - Texas Algebra 1 EOC";
const metaDescription =
  "Free STAAR Algebra I EOC practice: two full 50-question tests on TEA's blueprint and assessed TEKS, seven topic drills and an explanation for every question.";
const description =
  "A free practice test for the Texas STAAR Algebra I end-of-course assessment: two full 50-question tests built on TEA's blueprint and the assessed Algebra I TEKS, across all five reporting categories, with typed answers, multiselect, match table and drop-down questions like the redesigned online test. Seven topic drills, the basics taught first in three of them, and an explanation for every question. Teachers can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "STAAR Algebra 1 practice test, STAAR Algebra I EOC practice, Algebra 1 EOC Texas, STAAR Algebra 1 review, Algebra I end of course exam Texas, STAAR EOC practice, STAAR Algebra 1 reference sheet, free STAAR practice test",
  alternates: {
    canonical: `${siteUrl}/staar-algebra-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/staar-algebra-1-practice-test`,
    images: [{ url: shareImageUrl("staaralg1"), width: 1200, height: 630, alt: "Tigertest free STAAR Algebra I practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("staaralg1")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the STAAR Algebra I EOC?",
    a: "The test covers the Algebra I TEKS in five reporting categories: Number and Algebraic Methods (polynomials, factoring, exponents, radicals, functions and sequences), Describing and Graphing Linear Functions, Equations and Inequalities, Writing and Solving Linear Functions, Equations and Inequalities, Quadratic Functions and Equations, and Exponential Functions and Equations. TEA's blueprint gives the third category the most questions, 12 to 14.",
  },
  {
    q: "How many questions are on the STAAR Algebra I test?",
    a: "50 questions worth 59 points: 41 one-point questions and 9 two-point questions, which can earn partial credit. Since the 2022-23 redesign no more than 75% of the questions are multiple choice; the rest are question types such as typed answers, graphing, number lines, drop-down menus, hot spots, drag and drop, match tables and multiselect.",
  },
  {
    q: "How long is the STAAR Algebra I test, and can I use a calculator?",
    a: "There is no fixed time limit. TEA expects most students to finish in three to four hours, and the test must be finished the same school day. A graphing calculator is required: every student must have one for the whole test, and one is built into the online platform. The STAAR Algebra I reference materials, with the factoring, exponent, linear and quadratic formulas, are provided too.",
  },
  {
    q: "What score do you need to pass STAAR Algebra I?",
    a: "Passing is Approaches Grade Level, a scale score of 3550. The number of points that takes changes a little with each test: on the Spring 2026 test it was 19 of 59 points, with Meets Grade Level from 31 points and Masters Grade Level from 41.",
  },
  {
    q: "Is STAAR changing?",
    a: "Yes. House Bill 8, passed in 2025, replaces STAAR with a new program, the Student Success Tool, starting in the 2027-28 school year, with an end-of-course Algebra I test still required. Until then, students take STAAR Algebra I on the current blueprint, which is what this practice follows.",
  },
  {
    q: "Is the Tigertest STAAR Algebra I practice free?",
    a: "Yes, all of it: both full practice tests, all seven drills, the basics lessons and every explanation, with no account required. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free STAAR Algebra I Practice Test",
      description,
      url: `${siteUrl}/staar-algebra-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("staaralg1"),
      featureList: [
        "Two full practice tests of 50 questions, on TEA's STAAR Algebra I blueprint",
        "All five reporting categories and the assessed Algebra I TEKS",
        "Typed answers, multiselect, match table and drop-down questions",
        "Untimed, with a calculator and the reference sheet on every question",
        "Seven topic drills, three opening with the basics",
        "Practice Test 2 held out of the drills for a clean score",
        "An explanation for every question",
        "Free class dashboards for teachers",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("staaralg1"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Number and Algebraic Methods", section: "Reporting category 1", weight: "10 per test" },
  { name: "Describing and Graphing Linear Functions", section: "Reporting category 2", weight: "11 per test" },
  { name: "Writing and Solving Linear Functions", section: "Reporting category 3", weight: "13 per test" },
  { name: "Quadratic Functions and Equations", section: "Reporting category 4", weight: "10 per test" },
  { name: "Exponential Functions and Equations", section: "Reporting category 5", weight: "6 per test" },
];

export default function StaarAlgebra1LandingPage() {
  return (
    <div data-theme="staaralg1" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free STAAR Algebra I Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/staar-algebra-1/dashboard"
            shortName="STAAR Algebra I"
            subtitle="Two full 50-question Texas Algebra I EOC practice tests on TEA's blueprint, plus seven topic drills from factoring to exponential growth. Everything is free, no account needed."
            shots={{ mobile: "/landing/staaralg1-mobile.png", desktop: "/landing/staaralg1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="staaralg1" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven short drills, one for each part of the course, from polynomials and factoring to quadratics and exponential functions. Three open with the basics, such as solving for x and the laws of exponents. One tap to check, an explanation straight away, and every miss comes back until it is mastered.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Test on a Computer</h3>
              <p className="text-gray-600 dark:text-gray-300">
                50 questions with no clock, like the real EOC, a calculator and the Algebra I reference sheet on every question, and a mix of multiple choice, typed answers, drop-downs and match tables. Flag questions to come back to, then see your score by reporting category and what to drill next.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the Real Exam Format</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test has 50 questions spread across TEA&apos;s five reporting categories in the ranges the STAAR Algebra I blueprint sets, written from the assessed Algebra I TEKS. Every question here is worth one point and graphs are described in words or tables; the real test has nine two-point questions and asks you to draw some graphs, and it reports a scale score.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{area.section}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("staaralg1", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach Algebra I?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Set it for your class for free: post one link, students join with just their name, and you see who practiced, their scores by reporting category and the questions your class misses most.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a class at tigertest.io/teach
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for STAAR Algebra I</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the reference sheet</h3>
              <p>
                The slope formula, the forms of a line, the quadratic formula, the axis of symmetry and the exponent rules are all on the reference materials. Practice with the sheet open so you know where each formula is and spend your memory on how to use it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Put the linear categories first</h3>
              <p>
                Graphing, writing and solving linear functions, equations and inequalities make up about half of the test. Slope, rate of change, systems and domain and range come up again and again, so master those drills before the rest.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check answers by substituting</h3>
              <p>
                Most Algebra I answers can be checked: put a solution back into the equation, multiply factors back out, or test a point in an inequality. On an untimed test, a quick check is the cheapest way to catch a sign error.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the graphing calculator you will use</h3>
              <p>
                The real test needs a graphing calculator for tables, intersections and lines of fit. Use the one built into the testing platform, or the one your school provides, while you practice, so it is familiar on test day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">STAAR Algebra I Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="staaralg1" />
        </div>
      </div>

      <SampleQuestionsV2 examId="staaralg1" />

      <ExamRelatedTests examId="staaralg1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the Algebra I EOC?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two full practice tests and seven drills, from factoring to exponential growth.</p>
          <ExamLandingCTA dashboardHref="/staar-algebra-1/dashboard" />
        </div>
      </div>
    </div>
  );
}

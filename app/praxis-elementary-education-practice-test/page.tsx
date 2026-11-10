import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Praxis Elementary Education Practice Test 2026 (5001) - Free";
const metaDescription =
  "Free Praxis Elementary Education 5001 practice test: 200 original questions on reading and language arts, math, social studies and science, four 50-question tests, every answer explained.";
const description =
  "Free practice for Praxis Elementary Education: Multiple Subjects (5001): 200 original questions written from the ETS content topics for all four subtests, Reading and Language Arts (5002), Mathematics (5003), Social Studies (5004) and Science (5005). Four 50-question practice tests that mix the subjects in the same proportions as the real 245 questions, and five training sets, one per subject with reading split from writing and language.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "praxis 5001 practice test, praxis elementary education practice test, praxis elementary education multiple subjects, praxis 5002 practice test, praxis 5003 practice test, praxis 5004 practice test, praxis 5005 practice test, praxis elementary free practice questions",
  alternates: {
    canonical: `${siteUrl}/praxis-elementary-education-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/praxis-elementary-education-practice-test`,
    images: [{ url: shareImageUrl("praxis5001"), width: 1200, height: 630, alt: "Tigertest free Praxis Elementary Education 5001 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("praxis5001")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Praxis Elementary Education 5001 Practice Test",
      description,
      url: `${siteUrl}/praxis-elementary-education-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 Praxis Elementary Education 5001 practice questions",
        "4 practice tests of 50 questions mixing all four subtests in their real proportions",
        "5 training sets: reading, writing and language, math, social studies, science",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the Praxis Elementary Education: Multiple Subjects (5001)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Praxis Elementary Education: Multiple Subjects (test code 5001) is an ETS content knowledge test that many states require for a generalist elementary teaching license. It has four subtests: Reading and Language Arts (5002), Mathematics (5003), Social Studies (5004) and Science (5005). It checks what a beginning elementary teacher needs to know in each subject; teaching methods in general are tested separately, for example on the Praxis PLT.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the Praxis 5001 and how long is it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "245 questions in 4 hours 35 minutes, in four separately timed subtests: Reading and Language Arts 80 questions in 90 minutes, Mathematics 50 in 65 minutes, Social Studies 60 in 60 minutes and Science 55 in 60 minutes. Questions are selected response and numeric entry, and an on-screen scientific calculator is provided for Mathematics and Science. You can take all four subtests in one session or one at a time, at a test center or at home online.",
          },
        },
        {
          "@type": "Question",
          name: "What is the passing score for the Praxis 5001?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ETS does not set a passing score. Each state or licensing agency sets its own qualifying score for each of the four subtests, so check your state on the ETS score requirements page. Each practice test here uses 70% as a readiness line, not an official cut.",
          },
        },
        {
          "@type": "Question",
          name: "Is the Praxis 5001 being replaced?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, in time. ETS launched the new Elementary Education Fundamentals tests in spring 2026 and says they are designed to replace 5001, with the current tests targeted to retire in August 2028; ETS is working with states on their own transition dates. Until your state switches, 5001 is still the test to take, and the subject content here applies to both.",
          },
        },
        {
          "@type": "Question",
          name: "Are these real Praxis questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the content topics in the ETS Study Companion for 5001, so it practices the same content without copying any ETS item. All questions here are single answer with four choices; multiple-selection, order-matching, grid and numeric-entry formats are written as single-answer questions, and graphs and maps are described in words. Tigertest is not affiliated with ETS or the Praxis program; check ets.org for test dates, registration and changes.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "5002 Reading and Language Arts", weight: "80 questions · 90 min" },
  { name: "5003 Mathematics", weight: "50 questions · 65 min" },
  { name: "5004 Social Studies", weight: "60 questions · 60 min" },
  { name: "5005 Science", weight: "55 questions · 60 min" },
];

export default function PraxisElementaryLandingPage() {
  return (
    <div data-theme="praxis5001" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Praxis Elementary Education Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/praxis-elementary/dashboard"
            shortName="Praxis 5001"
            subtitle="200 original questions for Praxis Elementary Education: Multiple Subjects (5001): reading and language arts, math, social studies and science. Four 50-question practice tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/praxis5001-mobile.png", desktop: "/landing/praxis5001-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="praxis5001" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the subtests: reading, writing and language, mathematics, social studies and science, each split by the ETS content categories. Questions you miss come back until you have mastered them, so you can work on the subtest you take next.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                The real 5001 is 245 questions over four timed subtests. Each practice test here is 50 questions in the same proportions: 17 reading and language arts, 10 math, 12 social studies and 11 science. Aim for 70% or better. No question appears in more than one test.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the ETS Content Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each subtest is timed and scored on its own, and each state sets its own qualifying score for each one. Every question here is written from the ETS content categories: reading and writing, speaking and listening; numbers and operations, algebraic thinking, and geometry, measurement, data and probability; US history and government, geography and world history and economics; earth, life and physical science. Teacher preparation programs can set Tigertest as class practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the class misses most.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("praxis5001", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make Tigertest Better</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Have an idea, a topic you&apos;d like covered, or a question that could be clearer? We read every message and use it to improve every test.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Share Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Pass the Praxis 5001
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with your weakest subtest</h3>
              <p>
                Each subtest is passed on its own, so a strong reading score cannot make up for a weak science score. Take one mixed practice test, check your accuracy by subject, and train the lowest subject first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the reading vocabulary</h3>
              <p>
                Reading and Language Arts is the longest subtest. Know phonemes, onsets and rimes, the six syllable types, digraphs and diphthongs, the three parts of fluency, the three tiers of vocabulary and the three measures of text complexity.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice math by hand, then check with a calculator</h3>
              <p>
                The math subtest stresses why procedures work: place value, fraction operations, remainders, order of operations, unit rates and how area and volume change when dimensions grow. Some real questions ask you to type the number rather than pick it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 70% or better on every practice test. After each test, drill the questions you missed and retrain the weakest subject.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Praxis Elementary Education Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Praxis Elementary Education: Multiple Subjects (5001)?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Praxis Elementary Education: Multiple Subjects (test code 5001) is an ETS content knowledge test that many states require for a generalist elementary teaching license. It has four subtests: Reading and Language Arts (5002), Mathematics (5003), Social Studies (5004) and Science (5005). It checks what a beginning elementary teacher needs to know in each subject; teaching methods in general are tested separately, for example on the Praxis PLT.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the Praxis 5001 and how long is it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              245 questions in 4 hours 35 minutes, in four separately timed subtests: Reading and Language Arts 80 questions in 90 minutes, Mathematics 50 in 65 minutes, Social Studies 60 in 60 minutes and Science 55 in 60 minutes. Questions are selected response and numeric entry, and an on-screen scientific calculator is provided for Mathematics and Science. You can take all four subtests in one session or one at a time, at a test center or at home online.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the passing score for the Praxis 5001?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              ETS does not set a passing score. Each state or licensing agency sets its own qualifying score for each of the four subtests, so check your state on the ETS score requirements page. Each practice test here uses 70% as a readiness line, not an official cut.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the Praxis 5001 being replaced?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, in time. ETS launched the new Elementary Education Fundamentals tests in spring 2026 and says they are designed to replace 5001, with the current tests targeted to retire in August 2028; ETS is working with states on their own transition dates. Until your state switches, 5001 is still the test to take, and the subject content here applies to both.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these real Praxis questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the content topics in the ETS Study Companion for 5001, so it practices the same content without copying any ETS item. All questions here are single answer with four choices; multiple-selection, order-matching, grid and numeric-entry formats are written as single-answer questions, and graphs and maps are described in words. Tigertest is not affiliated with ETS or the Praxis program; check ets.org for test dates, registration and changes.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="praxis5001" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Praxis 5001?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all four subtests of Praxis Elementary Education: Multiple Subjects.</p>
          <ExamLandingCTA dashboardHref="/praxis-elementary/dashboard" />
        </div>
      </div>
    </div>
  );
}

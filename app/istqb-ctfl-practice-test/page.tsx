import "@/lib/v2/banks/istqb";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
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

const title = "Free ISTQB CTFL Practice Test 2026 - Foundation Level v4.0";
const metaDescription =
  "Free ISTQB Foundation Level practice exam: 200 original questions on the CTFL v4.0 syllabus, with two full 40-question mock exams in 60 minutes and an explanation on every answer.";
const description =
  "Free ISTQB Certified Tester Foundation Level practice tests with 200 original questions written to the CTFL v4.0.1 syllabus: fundamentals and the seven principles, testing in the SDLC, static testing and reviews, black-box, white-box and experience-based techniques, test planning and estimation, risk and defect management, and test tools. Two full mock exams of 40 questions in 60 minutes with the 26-point pass line, plus eight drills, with an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the ISTQB Foundation Level exam?",
    a: "The CTFL v4.0 exam has 40 multiple-choice questions worth one point each, and you have 60 minutes, or 75 minutes if you take it in a language that is not your native one. You need 26 points (65 percent) to pass. Exam delivery, languages and fees are set by each ISTQB member board or exam provider, so check those with yours.",
  },
  {
    q: "Which version of the ISTQB Foundation Level syllabus is current?",
    a: "CTFL v4.0. ISTQB's current syllabus document is version 4.0.1 (September 2024), an errata release of v4.0 that aligns some wording with the ISTQB glossary, and the exam follows the CTFL v4.0 exam structure. This practice test is written to v4.0.1.",
  },
  {
    q: "What topics does the CTFL v4.0 exam cover?",
    a: "Six chapters: Fundamentals of Testing (8 questions), Testing Throughout the Software Development Lifecycle (6), Static Testing (4), Test Analysis and Design (11), Managing the Test Activities (9) and Test Tools (2). Most questions test understanding (K2), and 8 are K3 application questions, mostly on test techniques such as equivalence partitioning, boundary value analysis, decision tables and state transitions, and on estimation, prioritization and defect reports.",
  },
  {
    q: "Is this practice test the same format as the real ISTQB CTFL exam?",
    a: "Each practice test is 40 single-answer questions in 60 minutes, weighted chapter by chapter like the ISTQB exam structure, with the 26-point pass line shown on your results. The questions are original and written from the syllabus, not taken from the ISTQB sample exams. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.",
  },
  {
    q: "Is the Tigertest ISTQB practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and most of the drills are free; the last drills and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ISTQB practice test, ISTQB Foundation Level practice exam, CTFL practice test, CTFL v4.0 mock exam, ISTQB CTFL questions, ISTQB Foundation 2026, ISTQB sample questions, software testing certification practice",
  alternates: {
    canonical: `${siteUrl}/istqb-ctfl-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/istqb-ctfl-practice-test`,
    images: [{ url: shareImageUrl("istqb"), width: 1200, height: 630, alt: "Tigertest free ISTQB CTFL practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("istqb")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ISTQB CTFL Practice Test",
      description,
      url: `${siteUrl}/istqb-ctfl-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("istqb"),
      featureList: [
        "200 original ISTQB Foundation Level practice questions with explanations",
        "2 full mock exams of 40 questions in 60 minutes, with the 26-point pass line",
        "8 drills covering every chapter of the CTFL v4.0 syllabus",
        "Worked technique questions on partitions, boundaries, decision tables and state transitions",
        "Auto-save progress",
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
        classFaqJsonLd("istqb"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Test analysis and design", weight: "11 of 40" },
  { name: "Managing the test activities", weight: "9 of 40" },
  { name: "Fundamentals of testing", weight: "8 of 40" },
  { name: "Testing throughout the SDLC", weight: "6 of 40" },
  { name: "Static testing", weight: "4 of 40" },
  { name: "Test tools", weight: "2 of 40" },
];

export default function IstqbLandingPage() {
  return (
    <div data-theme="istqb" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ISTQB CTFL Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/istqb-ctfl/dashboard"
            shortName="ISTQB CTFL"
            subtitle="200 original questions and two full 40-question mock exams on the Foundation Level v4.0 syllabus. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/istqb-mobile.png", desktop: "/landing/istqb-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="istqb" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Syllabus Chapter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover the whole syllabus, from the seven testing principles to test automation, with worked questions on equivalence partitions, boundary values, decision tables, state transitions, coverage and estimation. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 40-question tests in 60 minutes, the real exam&apos;s length and pace, scored against the 26-point pass line. Practice Test 2 is held out of the drills, so it shows whether you are ready to book.
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
                Weighted Like the Real Exam
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ISTQB&apos;s exam structure sets how many of the 40 questions come from each syllabus chapter. Every Tigertest practice test follows the same split, so test analysis and design, the chapter with the most application questions, gets the most.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("istqb", 3)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Study guide */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          How to Pass ISTQB Foundation Level
        </h2>
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Practise the techniques until they are routine</h3>
            <p>
              Most of the application questions ask you to work something out: the number of equivalence partitions, the 2-value or 3-value boundary values, the rule a test exercises in a decision table, or the fewest tests for valid transitions coverage. Work through each kind by hand until you can do it quickly.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the terms the syllabus uses</h3>
            <p>
              Every keyword in the syllabus can be examined for its definition. Know the difference between an error, a defect and a failure, between confirmation and regression testing, between test analysis and test design, and between a walkthrough, a technical review and an inspection.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the formulas in chapter 5</h3>
            <p>
              Three-point estimation, E = (a + 4m + b) / 6, estimation by ratios, test case prioritization with dependencies and risk level as likelihood times impact all appear as worked questions. Practise them with different numbers until the method is automatic.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take a full mock exam under time</h3>
            <p>
              Sixty minutes for 40 questions leaves time for the worked ones if you move quickly through the definitions. Take Practice Test 2 last, and book the exam once you are scoring comfortably above 26 of 40.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            ISTQB Foundation Level Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
            <ExamClassFaq examId="istqb" />
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

      <SampleQuestionsV2 examId="istqb" />

      <ExamRelatedTests examId="istqb" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass ISTQB Foundation Level?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the whole syllabus.</p>
          <ExamLandingCTA dashboardHref="/istqb-ctfl/dashboard" />
        </div>
      </div>
    </div>
  );
}

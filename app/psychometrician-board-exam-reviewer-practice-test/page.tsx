import "@/lib/banks/phpsychom";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Psychometrician Board Exam Reviewer 2026 - Free PmLE Practice Test";
const metaDescription =
  "Free psychometrician board exam reviewer: 200 original questions on developmental, abnormal and industrial-organizational psychology and psychological assessment, four 50-question mock exams, every answer explained.";
const description =
  "Free practice for the Philippine Psychometrician Licensure Examination (PmLE) given by the PRC and the Professional Regulatory Board of Psychology: 200 original questions weighted like the real rating, Developmental Psychology 20%, Abnormal Psychology 20%, Industrial-Organizational Psychology 20% and Psychological Assessment 40%. Four 50-question mock exams and five training sets covering developmental theories and the life span, disorders and their causes, selection, training and motivation at work, psychometrics and statistics, tests and their administration, and R.A. 10029 and the Code of Ethics.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "psychometrician board exam reviewer, pmle reviewer, psychometrician licensure exam reviewer, psychometrician reviewer 2026, psychological assessment reviewer, abnormal psychology reviewer, industrial organizational psychology reviewer, developmental psychology reviewer, prc psychometrician exam, blepp reviewer",
  alternates: {
    canonical: `${siteUrl}/psychometrician-board-exam-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/psychometrician-board-exam-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phpsychom"), width: 1200, height: 630, alt: "Tigertest free psychometrician board exam reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phpsychom")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Psychometrician Licensure Examination?",
    a: "The Psychometrician Licensure Examination (PmLE) is the board exam the Professional Regulation Commission (PRC) and the Professional Regulatory Board of Psychology give to psychology graduates who want to register as psychometricians under the Philippine Psychology Act of 2009 (R.A. 10029). A registered psychometrician may administer, score and interpret objective and structured personality tests (not projective tests), write reports on them and conduct preparatory intake interviews, always under the supervision of a licensed psychologist.",
  },
  {
    q: "What subjects are on the psychometrician board exam?",
    a: "The PRC programs for the 2024, 2025 and 2026 exams list four subjects over two days: Developmental Psychology (20%), Abnormal Psychology (20%), Industrial-Organizational Psychology (20%) and Psychological Assessment (40%), each in a three-hour session (8:00 to 11:00 a.m. or 1:00 to 4:00 p.m.). R.A. 10029 named Theories of Personality and Industrial Psychology; the Board may revise subjects, and its current programs list Developmental Psychology instead of Theories of Personality.",
  },
  {
    q: "What is the passing rate for the psychometrician board exam?",
    a: "Under Section 18 of R.A. 10029 you need a weighted general average of at least 75% with no rating below 60% in any subject. Tigertest's mock exams use 75% as the pass line on a mix of all four subjects; the 60% floor per subject is not modelled, so check that no single area falls far behind.",
  },
  {
    q: "How many items does each subject have?",
    a: "The PRC programs give the subjects and their weights but not the item counts. Guides quoting the Board's 2014 table of specifications report 150 items for Psychological Assessment and 100 for each other subject. The Board adopted an enhanced table of specifications in 2023 (Board Resolution No. 02, s. 2023), whose text is not posted with the programs, so check the PRC notice for your sitting. This reviewer uses four 50-question mock exams weighted 10, 10, 10 and 20 to match the 20/20/20/40 rating.",
  },
  {
    q: "Are these the real board exam questions?",
    a: "No. Every question is original, written by Tigertest from R.A. 10029, the Code of Ethics and Professional Standards for Psychology Practitioners and standard psychology content in the four subjects, without copying any past exam or review center material. Tigertest is not affiliated with the PRC or the Professional Regulatory Board of Psychology; check prc.gov.ph for schedules, requirements and the current table of specifications.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Psychometrician Board Exam Reviewer",
      description,
      url: `${siteUrl}/psychometrician-board-exam-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("phpsychom", "PHP"),
      featureList: [
        "200 psychometrician board exam practice questions",
        "4 mock exams of 50 questions weighted like the PRC rating",
        "5 training sets by subject",
        "Instant feedback with explanations",
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
        classFaqJsonLd("phpsychom"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Developmental Psychology", weight: "20%" },
  { name: "Abnormal Psychology", weight: "20%" },
  { name: "Industrial-Organizational Psychology", weight: "20%" },
  { name: "Psychological Assessment", weight: "40%" },
];

export default function PsychometricianReviewerLandingPage() {
  return (
    <div data-theme="phpsychom" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Psychometrician Board Exam Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/psychometrician-board-exam/dashboard"
            shortName="PmLE"
            subtitle="200 original questions on the four subjects of the PRC Psychometrician Licensure Examination: developmental, abnormal and industrial-organizational psychology, and psychological assessment. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phpsychom-mobile.png", desktop: "/landing/phpsychom-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phpsychom" />

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
                Five training sets: developmental, abnormal and industrial-organizational psychology, then psychological assessment in two parts, psychometrics and statistics, and tests, ethics and reports. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock exams of 50 questions: 10 each from developmental, abnormal and industrial-organizational psychology and 20 from psychological assessment, the same 20/20/20/40 split as the real rating. Aim for 75% or better. No question appears in more than one test.
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
                Weighted Like the PRC Rating
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The PRC program for the psychometrician board exam gives each subject a fixed weight, and every mock exam here keeps to it. The real exam is four three-hour subjects over two days; these 50-question mocks are shorter, so treat them as checkpoints. The 60% minimum per subject is not modelled. Review centers and psychology departments can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("phpsychom", 1)}
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
            How to Pass the Psychometrician Board Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put Psychological Assessment first</h3>
              <p>
                Psychological Assessment is 40% of the rating, twice any other subject. Know reliability and validity, standard scores, item analysis, the major intelligence and personality tests, and how to administer and report them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Keep every subject above 60%</h3>
              <p>
                A rating below 60% in any one subject fails the exam even with a 75% average. Developmental, abnormal and industrial-organizational psychology each carry 20%, so do not leave one for the last week.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your scope and ethics</h3>
              <p>
                R.A. 10029 limits psychometricians to objective and structured tests under a psychologist&apos;s supervision. Learn the Code of Ethics standards on informed consent, release of test data, test security and outdated results; they decide many situational items.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by area. Aim for 75% or better on every mock exam. After each test, drill the questions you missed and retrain the weakest area.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Psychometrician Board Exam FAQ
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="phpsychom" />
        </div>
      </div>

      <ExamSampleQuestions examId="phpsychom" />

      <ExamRelatedTests examId="phpsychom" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Psychometrician Board Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all four subjects of the PmLE.</p>
          <ExamLandingCTA dashboardHref="/psychometrician-board-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}

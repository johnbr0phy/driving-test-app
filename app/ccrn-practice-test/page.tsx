import "@/lib/banks/ccrn";
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

const title = "CCRN Practice Test 2026 - Free Adult CCRN Exam Questions";
const metaDescription =
  "Free CCRN practice test: 200 original questions on the AACN Adult CCRN test plan, four 50-question mock exams and five training sets, every answer explained.";
const description =
  "Practice for the AACN CCRN (Adult) critical care nursing certification exam: 200 original questions written from the Adult CCRN test plan for exams taken on and after November 12, 2025. Four 50-question mock exams weighted like the test plan, and five training sets covering cardiovascular and respiratory care; endocrine, hematology, GI and renal care; neuro, musculoskeletal and behavioral care; multisystem problems such as sepsis, shock and burns; and professional caring and ethical practice. Start for free.";

const faqs = [
  {
    q: "What is the CCRN (Adult) exam?",
    a: "CCRN is the specialty certification in acute and critical care nursing granted by AACN Certification Corporation, the credentialing arm of the American Association of Critical-Care Nurses. The Adult exam is for registered nurses and APRNs who care for, or influence the care of, acutely and critically ill adults. Candidates need a current, unencumbered U.S. RN or APRN license and either 1,750 hours of direct care of acutely or critically ill patients in the previous two years (875 in the most recent year) or 2,000 hours in five years (144 in the most recent year). Separate pathways exist for tele-critical care and knowledge professional roles.",
  },
  {
    q: "How many questions are on the CCRN exam?",
    a: "The CCRN exam is a 3-hour test of 150 multiple-choice questions. Of those, 125 are scored and 25 are unscored questions used to gather data on items for future exams. It is taken by computer at a PSI testing center or by live remote proctoring, and results show on screen when you finish.",
  },
  {
    q: "What score do you need to pass the CCRN?",
    a: "AACN sets the passing point with a modified Angoff study, in which experts rate every question. The cut score is a raw number of correct answers, not a percentage, and it can change when exam forms are updated, so AACN does not publish it as a percent. The 70 percent line on these practice tests is a readiness target. Your score report shows how many questions you answered correctly in each content area.",
  },
  {
    q: "What is on the CCRN Adult test plan?",
    a: "For exams taken on and after November 12, 2025, 80 percent of the exam is Clinical Judgment: Cardiovascular 13 percent, Respiratory 12 percent, Endocrine, Hematology/Immunology, GI, Renal/GU and Integumentary 21 percent, Musculoskeletal, Neurological and Behavioral/Psychosocial 18 percent, and Multisystem 16 percent. The other 20 percent is Professional Caring and Ethical Practice, built on the AACN Synergy Model: advocacy and moral agency, caring practices, clinical inquiry, collaboration, facilitation of learning, response to diversity and systems thinking.",
  },
  {
    q: "Are these the real CCRN questions?",
    a: "No. Every question is original, written by Tigertest from the AACN CCRN Exam Handbook and test plan and from current guidelines such as the Surviving Sepsis Campaign 2021, the 2024 hyperglycemic crises consensus report and the SCCM PADIS guideline. The AACN sample questions are not used. Each mock exam is a fixed 50-question form weighted like the test plan, shorter than the real 150. Tigertest is not affiliated with AACN or AACN Certification Corporation.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ccrn practice test, ccrn practice questions, ccrn adult exam, ccrn review questions, critical care nursing certification practice test, aacn ccrn exam, ccrn test plan 2026, free ccrn questions",
  alternates: {
    canonical: `${siteUrl}/ccrn-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ccrn-practice-test`,
    images: [{ url: shareImageUrl("ccrn"), width: 1200, height: 630, alt: "Tigertest CCRN practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ccrn")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - CCRN Practice Test",
      description,
      url: `${siteUrl}/ccrn-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ccrn"),
      featureList: [
        "200 CCRN (Adult) practice questions",
        "4 mock exams of 50 questions weighted like the AACN Adult CCRN test plan",
        "5 training sets by test plan area",
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
        classFaqJsonLd("ccrn"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Cardiovascular", weight: "13%" },
  { name: "Respiratory", weight: "12%" },
  { name: "Endocrine, Hematology/Immunology, GI, Renal/GU, Integumentary", weight: "21%" },
  { name: "Musculoskeletal, Neurological, Behavioral/Psychosocial", weight: "18%" },
  { name: "Multisystem", weight: "16%" },
  { name: "Professional Caring and Ethical Practice", weight: "20%" },
];

export default function CcrnLandingPage() {
  return (
    <div data-theme="ccrn" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            CCRN Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ccrn/dashboard"
            shortName="CCRN"
            subtitle="200 original questions on the AACN Adult CCRN test plan: cardiovascular, respiratory, multisystem, neuro and renal critical care, plus professional caring and ethics. Four 50-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/ccrn-mobile.png", desktop: "/landing/ccrn-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ccrn" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Content Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the Adult CCRN test plan: cardiovascular and respiratory; endocrine, hematology, GI and renal; neuro, musculoskeletal and behavioral; multisystem; and professional caring and ethical practice. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted like the Adult CCRN test plan. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the Adult CCRN Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AACN publishes the share of the exam that comes from each area, and every mock exam here keeps that balance, scaled to 50 questions: 7 cardiovascular, 6 respiratory, 10 endocrine, hematology, GI, renal and skin, 9 neuro, musculoskeletal and behavioral, 8 multisystem, and 10 professional caring and ethical practice. The real exam has 150 questions in 3 hours; these forms keep the same mix at a shorter length. Educators running a CCRN review course can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("ccrn", 1)}
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
            How to Pass the CCRN Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Study by body system, weighted like the test plan</h3>
              <p>
                Clinical judgment is 80% of the exam, and the combined endocrine, hematology, GI, renal and skin area (21%) is the single largest block. Cardiovascular and respiratory together are another quarter. Spend your time in roughly those proportions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the hemodynamic patterns cold</h3>
              <p>
                Shock states, preload and afterload, PAOP, cardiac index and SVR, IABP timing, pacemaker problems and CPP all come back to a few patterns. Practice reading a set of numbers and naming the problem before you look at the answers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the current guidelines</h3>
              <p>
                Sepsis care, DKA and HHS, ventilation in ARDS, and pain, sedation and delirium have clear published recommendations. Know the thresholds, such as a MAP of 65, a tidal volume of 6 mL/kg of predicted body weight and when potassium delays insulin.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip professional caring and ethics</h3>
              <p>
                One question in five comes from the Synergy Model: advocacy, caring practices, clinical inquiry, collaboration, teaching, diversity and systems thinking. Learn each competency&apos;s meaning and how it looks in a real situation at the bedside.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CCRN Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ccrn" />
        </div>
      </div>

      <ExamSampleQuestions examId="ccrn" />

      <ExamRelatedTests examId="ccrn" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CCRN?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every area of the Adult CCRN test plan.</p>
          <ExamLandingCTA dashboardHref="/ccrn/dashboard" />
        </div>
      </div>
    </div>
  );
}

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

const siteUrl = SITE_URL;

const title = "MedTech Board Exam Reviewer 2026 - Free MTLE Practice Test";
const metaDescription =
  "Free MedTech board exam reviewer: 200 original MTLE questions on the PRC table of specifications, four 50-question mock exams weighted like the six subjects, every answer explained.";
const description =
  "Free practice for the Philippine Medical Technologist Licensure Examination (MTLE): 200 original questions written from the PRC Board of Medical Technology's enhanced tables of specifications. Four 50-question mock exams weighted like the real six subjects, Clinical Chemistry, Microbiology and Parasitology, Hematology, Blood Banking and Serology at 20% each and Clinical Microscopy and Histopathologic Techniques with MT Laws at 10% each, plus five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "medtech board exam reviewer, mtle reviewer, mtle reviewer 2026, medical technologist licensure examination reviewer, medtech board exam questions, clinical chemistry reviewer, hematology reviewer, blood banking reviewer, microbiology and parasitology reviewer, clinical microscopy reviewer, mt laws reviewer, prc medtech board exam",
  alternates: {
    canonical: `${siteUrl}/medtech-board-exam-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/medtech-board-exam-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phmedtech"), width: 1200, height: 630, alt: "Tigertest free MedTech board exam reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phmedtech")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free MedTech Board Exam Reviewer",
      description,
      url: `${siteUrl}/medtech-board-exam-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "200 MTLE practice questions",
        "4 mock exams of 50 questions weighted like the six MTLE subjects",
        "5 training sets by subject",
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
          name: "What is the MedTech board exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Medical Technologist Licensure Examination (MTLE) is the licensure exam the Professional Regulation Commission (PRC) and the Professional Regulatory Board of Medical Technology give under RA 5527, the Philippine Medical Technology Act of 1969. Passing it and registering is required to practice as a medical technologist in the Philippines. In 2026 it was held in March and in August.",
          },
        },
        {
          "@type": "Question",
          name: "What subjects are on the MTLE and how much is each worth?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The exam runs over two days, three subjects a day, each in a two-hour session. Clinical Chemistry, Microbiology and Parasitology, Hematology, and Blood Banking and Serology are worth 20% each; Clinical Microscopy and Histopathologic Techniques, Medical Technology Laws and Ethics are worth 10% each. The PRC tables of specifications set 100 items for each subject.",
          },
        },
        {
          "@type": "Question",
          name: "What is the passing score for the MTLE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under RA 5527 you need a general weighted average of at least 75%, with no rating below 50% in any major subject, and you must not fail subjects making up 60% or more of the weights. Each 50-question mock exam here uses 75% as its pass line; the per-subject rules are not modelled, so check every subject in your stats.",
          },
        },
        {
          "@type": "Question",
          name: "How is this reviewer weighted?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each 50-question mock exam keeps the real weights: 10 Clinical Chemistry, 10 Microbiology and Parasitology (7 microbiology, 3 parasitology, as the table of specifications splits it), 10 Hematology, 10 Blood Banking and Serology, 5 Clinical Microscopy and 5 Histopathologic Techniques, MT Laws and Ethics. Topics within each subject follow the PRC Board of Medical Technology's 2023 enhanced tables of specifications.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real MTLE questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the PRC's published tables of specifications, so it practices the same competencies without copying any past exam. Tigertest is not affiliated with the PRC or the Professional Regulatory Board of Medical Technology; check prc.gov.ph for exam dates, requirements and any changes to the coverage.",
          },
        },
        classFaqJsonLd("phmedtech"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Clinical Chemistry", weight: "20%" },
  { name: "Microbiology & Parasitology", weight: "20%" },
  { name: "Hematology", weight: "20%" },
  { name: "Blood Banking & Serology", weight: "20%" },
  { name: "Clinical Microscopy", weight: "10%" },
  { name: "Histopathologic Techniques, MT Laws & Ethics", weight: "10%" },
];

export default function MedtechBoardExamLandingPage() {
  return (
    <div data-theme="phmedtech" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free MedTech Board Exam Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/medtech-board-exam/dashboard"
            shortName="MTLE"
            subtitle="200 original questions across all six subjects of the Medical Technologist Licensure Examination, written from the PRC tables of specifications. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phmedtech-mobile.png", desktop: "/landing/phmedtech-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phmedtech" />

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
                Five training sets cover the six board subjects: Clinical Chemistry, Microbiology and Parasitology, Hematology, Blood Banking and Immunoserology, and Clinical Microscopy with Histopathology and MT Laws. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions with the real weights: 10 questions each from the four 20% subjects and 5 each from the two 10% subjects. Aim for 75% or better. No question appears in more than one test.
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
                Built on the PRC Tables of Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The MTLE has six subjects of 100 items each, weighted as below in the PRC program for the August 2026 exam. Topics inside each subject follow the enhanced tables of specifications the Board of Medical Technology adopted in 2023 (Resolution No. 13, s. 2023), and every mock exam here keeps the same weights. The real exam has 600 items over two days; Tigertest models it as 50-question mocks at the same mix. Review centers and medical technology instructors can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("phmedtech", 1)}
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
            How to Pass the MedTech Board Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put the four big subjects first</h3>
              <p>
                Clinical Chemistry, Microbiology and Parasitology, Hematology, and Blood Banking and Serology are 80% of the rating. Know your reference methods, calculations, Westgard rules, culture media, cell morphology and blood group systems well.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Do not skip the 10% subjects</h3>
              <p>
                A rating below 50% in any subject fails the whole exam, even with a 75% average. Clinical Microscopy, histopathology, MT laws and ethics are short to review and easy to lose points on. Tigertest&apos;s mock exams score the average only, so watch every subject in your stats.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the calculations</h3>
              <p>
                Dilutions, molarity, red cell indices, corrected counts, anion gap and LDL estimates come up across subjects. A non-programmable calculator is allowed on the real exam; work each problem by hand first, then check.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by subject. Aim for 75% or better on every mock exam. After each test, drill the questions you missed and retrain the weakest subject.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          MedTech Board Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the MedTech board exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Medical Technologist Licensure Examination (MTLE) is the licensure exam the Professional Regulation Commission (PRC) and the Professional Regulatory Board of Medical Technology give under RA 5527, the Philippine Medical Technology Act of 1969. Passing it and registering is required to practice as a medical technologist in the Philippines. In 2026 it was held in March and in August.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What subjects are on the MTLE and how much is each worth?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The exam runs over two days, three subjects a day, each in a two-hour session. Clinical Chemistry, Microbiology and Parasitology, Hematology, and Blood Banking and Serology are worth 20% each; Clinical Microscopy and Histopathologic Techniques, Medical Technology Laws and Ethics are worth 10% each. The PRC tables of specifications set 100 items for each subject.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the passing score for the MTLE?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Under RA 5527 you need a general weighted average of at least 75%, with no rating below 50% in any major subject, and you must not fail subjects making up 60% or more of the weights. Each 50-question mock exam here uses 75% as its pass line; the per-subject rules are not modelled, so check every subject in your stats.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is this reviewer weighted?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each 50-question mock exam keeps the real weights: 10 Clinical Chemistry, 10 Microbiology and Parasitology (7 microbiology, 3 parasitology, as the table of specifications splits it), 10 Hematology, 10 Blood Banking and Serology, 5 Clinical Microscopy and 5 Histopathologic Techniques, MT Laws and Ethics. Topics within each subject follow the PRC Board of Medical Technology&apos;s 2023 enhanced tables of specifications.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real MTLE questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the PRC&apos;s published tables of specifications, so it practices the same competencies without copying any past exam. Tigertest is not affiliated with the PRC or the Professional Regulatory Board of Medical Technology; check prc.gov.ph for exam dates, requirements and any changes to the coverage.
            </p>
          </div>
          <ExamClassFaq examId="phmedtech" />
        </div>
      </div>

      <ExamRelatedTests examId="phmedtech" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the MedTech Board Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all six MTLE subjects.</p>
          <ExamLandingCTA dashboardHref="/medtech-board-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}

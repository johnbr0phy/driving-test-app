import "@/lib/banks/phmidwife";
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

const title = "Midwife Board Exam Reviewer 2026 - Free Practice Test (MLE)";
const metaDescription =
  "Free midwife board exam reviewer: 200 original questions on the five subjects of the PRC Midwife Licensure Examination, four 50-question mock exams, every answer explained.";
const description =
  "Free practice for the Philippine Midwife Licensure Examination (MLE) given by the PRC and the Professional Regulatory Board of Midwifery: 200 original questions on its five subjects, Obstetrics, Fundamentals of Health Care, Infant Care and Feeding, Primary Health Care, and Professional Growth and Development, with the integrated sciences. Four 50-question mock exams give each subject equal weight, and five training sets, one per subject, bring missed questions back until you master them.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "midwife board exam reviewer, midwifery board exam reviewer 2026, midwife licensure examination reviewer, mle reviewer, midwife board exam practice test, prc midwife exam questions, obstetrics reviewer, primary health care reviewer midwife, infant care and feeding reviewer",
  alternates: {
    canonical: `${siteUrl}/midwife-board-exam-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/midwife-board-exam-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phmidwife"), width: 1200, height: 630, alt: "Tigertest free midwife board exam reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phmidwife")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Midwife Board Exam Reviewer",
      description,
      url: `${siteUrl}/midwife-board-exam-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("phmidwife", "PHP"),
      featureList: [
        "200 midwife board exam practice questions",
        "4 mock exams of 50 questions, 10 from each of the five subjects",
        "5 training sets, one per board exam subject",
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
          name: "What is the Midwife Licensure Examination?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Midwife Licensure Examination is the board exam that the Professional Regulation Commission (PRC) and the Professional Regulatory Board of Midwifery give to graduates of midwifery. Under R.A. 7392, the Philippine Midwifery Act of 1992, no one may practice midwifery in the Philippines without passing it and holding a certificate of registration and a professional license.",
          },
        },
        {
          "@type": "Question",
          name: "What subjects are on the midwife board exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The PRC exam program lists five subjects over two days: Obstetrics, Fundamentals of Health Care, and Infant Care and Feeding on the first day, and Primary Health Care and Professional Growth and Development on the second. Each is a two-hour session. Fundamentals of sociology, principles of bacteriology, general anatomy and physiology, general psychology, nutrition, parasitology, microbiology and pharmacology are integrated into those subjects.",
          },
        },
        {
          "@type": "Question",
          name: "What is the passing score for the midwife board exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under Section 16 of R.A. 7392, you need a general rating of 75% with no grade lower than 50% in any subject. Each 50-question mock exam here uses 75% as its pass line; the 50% floor per subject is not modelled, so check your score in every training set too.",
          },
        },
        {
          "@type": "Question",
          name: "How is this reviewer laid out?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each of the four mock exams has 50 questions, 10 from each of the five board exam subjects, so every subject counts equally, as each does in the general rating. There are five training sets, one per subject, where missed questions come back until you master them. The real exam is longer; the PRC exam program gives each subject a two-hour session.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real midwife board exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from R.A. 7392, the PRC exam program and Department of Health guidelines, without copying any past exam. Tigertest is not affiliated with the PRC or the Professional Regulatory Board of Midwifery; check prc.gov.ph for exam dates, requirements and any changes to the coverage.",
          },
        },
        classFaqJsonLd("phmidwife"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Obstetrics", weight: "20%" },
  { name: "Fundamentals of Health Care", weight: "20%" },
  { name: "Infant Care and Feeding", weight: "20%" },
  { name: "Primary Health Care", weight: "20%" },
  { name: "Professional Growth and Development", weight: "20%" },
];

export default function MidwifeBoardExamLandingPage() {
  return (
    <div data-theme="phmidwife" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Midwife Board Exam Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/midwife-board-exam/dashboard"
            shortName="Midwife Board"
            subtitle="200 original questions on the five subjects of the PRC Midwife Licensure Examination. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phmidwife-mobile.png", desktop: "/landing/phmidwife-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phmidwife" />

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
                Five training sets, one for each board exam subject, with the integrated sciences inside them. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock exams of 50 questions, 10 from each subject, so every subject counts equally. Aim for 75% or better. No question appears in more than one test.
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
                Built on the PRC Exam Program
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The PRC program for the Midwife Licensure Examination lists five subjects, each a two-hour session, and integrates sociology, bacteriology, anatomy and physiology, psychology, nutrition, parasitology, microbiology and pharmacology into them. The Board has not published a table of specifications with weights inside each subject, so Tigertest gives the five subjects equal shares and spreads each across the scope of R.A. 7392. Midwifery schools and review centers can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("phmidwife", 1)}
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
            How to Pass the Midwife Board Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Give every subject its due</h3>
              <p>
                The general rating averages the five subjects, and a grade below 50% in any one of them fails the exam even with a 75% average. Do not rely on Obstetrics alone; train all five sets.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know what the law lets a midwife do</h3>
              <p>
                Section 23 of R.A. 7392 sets the midwife&apos;s scope: normal deliveries, internal examination in labor except with antenatal bleeding, oxytocic drugs only after the placenta, suturing perineal tears to control bleeding, and vitamin K for the newborn. Many situational items turn on it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the DOH programs as they are practiced</h3>
              <p>
                Essential intrapartum and newborn care, the routine immunization schedule, family planning methods, IMCI, nutrition and sanitation programs come up in Infant Care, Primary Health Care and Obstetrics alike.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by subject. Aim for 75% or better on every mock exam. After each test, drill the questions you missed and retrain your weakest subject.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Midwife Board Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Midwife Licensure Examination?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Midwife Licensure Examination is the board exam that the Professional Regulation Commission (PRC) and the Professional Regulatory Board of Midwifery give to graduates of midwifery. Under R.A. 7392, the Philippine Midwifery Act of 1992, no one may practice midwifery in the Philippines without passing it and holding a certificate of registration and a professional license.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What subjects are on the midwife board exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The PRC exam program lists five subjects over two days: Obstetrics, Fundamentals of Health Care, and Infant Care and Feeding on the first day, and Primary Health Care and Professional Growth and Development on the second. Each is a two-hour session. Fundamentals of sociology, principles of bacteriology, general anatomy and physiology, general psychology, nutrition, parasitology, microbiology and pharmacology are integrated into those subjects.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the passing score for the midwife board exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Under Section 16 of R.A. 7392, you need a general rating of 75% with no grade lower than 50% in any subject. Each 50-question mock exam here uses 75% as its pass line; the 50% floor per subject is not modelled, so check your score in every training set too.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is this reviewer laid out?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each of the four mock exams has 50 questions, 10 from each of the five board exam subjects, so every subject counts equally, as each does in the general rating. There are five training sets, one per subject, where missed questions come back until you master them. The real exam is longer; the PRC exam program gives each subject a two-hour session.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real midwife board exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from R.A. 7392, the PRC exam program and Department of Health guidelines, without copying any past exam. Tigertest is not affiliated with the PRC or the Professional Regulatory Board of Midwifery; check prc.gov.ph for exam dates, requirements and any changes to the coverage.
            </p>
          </div>
          <ExamClassFaq examId="phmidwife" />
        </div>
      </div>

      <ExamSampleQuestions examId="phmidwife" />

      <ExamRelatedTests examId="phmidwife" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Midwife Board Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all five subjects of the Midwife Licensure Examination.</p>
          <ExamLandingCTA dashboardHref="/midwife-board-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}

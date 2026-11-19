import "@/lib/banks/fpc";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free FPC Practice Test 2026 - Fundamental Payroll Certification Exam Questions";
const metaDescription =
  "Free FPC practice test: 200 original payroll questions on FLSA overtime, 2026 payroll taxes, gross-to-net, deposits, audits and payroll accounting, with every answer explained.";
const description =
  "Practice, free to start, for PayrollOrg's Fundamental Payroll Certification (FPC) exam: 200 original questions on the content outline effective September 5, 2026 and the federal law the exam tests, in effect January 1, 2026. Four 50-question practice tests and four training sets covering worker status and the FLSA, employment taxes, benefits and forms, compliance and deposits, paycheck calculations, payroll systems, administration, audits and payroll accounting.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "fpc practice test, fundamental payroll certification practice test, fpc exam questions, payroll certification practice test, payrollorg fpc, payroll exam practice, fpc study guide, payroll practice questions",
  alternates: {
    canonical: `${siteUrl}/fpc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/fpc-practice-test`,
    images: [{ url: shareImageUrl("fpc"), width: 1200, height: 630, alt: "Tigertest free FPC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("fpc")],
    title,
    description: metaDescription,
  },
};

const FAQ = [
  {
    q: "What is the FPC exam?",
    a: "The Fundamental Payroll Certification (FPC) is PayrollOrg's entry-level payroll credential, for people starting in payroll, consultants, systems analysts and payroll service staff. There are no eligibility requirements: anyone can apply, and PayrollOrg membership is not needed. The certification is valid for three full calendar years after the year you earn it.",
  },
  {
    q: "How many questions are on the FPC exam?",
    a: "The FPC exam has 150 multiple-choice questions in 3 hours. 125 are scored and 25 are unscored pre-test questions mixed in among them, and each question has four choices with one correct answer. You can test at a Pearson VUE center or, in North America, online through OnVUE.",
  },
  {
    q: "What score do you need to pass the FPC?",
    a: "PayrollOrg sets the passing raw score for each exam form with the Bookmark method, then converts it to a scaled score of 300 on every form. It does not publish a percentage. The 70 percent line on these practice tests is a readiness target, not the official cut score.",
  },
  {
    q: "Which tax year does the FPC exam test?",
    a: "Exams given from September 2026 through early September 2027 are based on federal laws and regulations in effect January 1, 2026, and the 2026 Form W-2. Changes made in the middle of the year are not on that year's exam. These practice questions use the 2026 figures, such as the $184,500 social security wage base.",
  },
  {
    q: "Are these the real FPC exam questions?",
    a: "No. Every question is original, written by Tigertest from PayrollOrg's FPC content outline and KSAs and from IRS and Department of Labor sources, so it tests the same knowledge without copying any exam. Tigertest is not affiliated with PayrollOrg.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free FPC Practice Test",
      description,
      url: `${siteUrl}/fpc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("fpc"),
      featureList: [
        "200 FPC practice questions",
        "4 practice tests of 50 questions across every area",
        "4 training sets by topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("fpc"),
      ],
    },
  ],
};

const topics = [
  { name: "Worker Status & the FLSA", weight: "14%" },
  { name: "Employment Taxes, Benefits & Forms", weight: "14%" },
  { name: "Payroll Systems & Continuity", weight: "14%" },
  { name: "Compliance, Deposits & Records", weight: "12%" },
  { name: "Gross Pay & Fringe Benefits", weight: "12%" },
  { name: "Deductions, Net Pay & Employer Taxes", weight: "12%" },
  { name: "Audits & Internal Controls", weight: "8%" },
  { name: "Payroll Accounting", weight: "8%" },
  { name: "Payroll Administration", weight: "6%" },
];

export default function FpcLandingPage() {
  return (
    <div data-theme="fpc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free FPC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/fpc/dashboard"
            shortName="FPC"
            subtitle="200 original questions for PayrollOrg's Fundamental Payroll Certification: FLSA overtime, 2026 payroll taxes, gross-to-net math, deposits, audits and payroll accounting. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/fpc-mobile.png", desktop: "/landing/fpc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="fpc" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: core payroll concepts; compliance and gross pay; net pay, taxes and systems; and administration, audits and accounting. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions that mix every area of the outline, the way the real exam does. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the 2026 FPC Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each 50-question test follows PayrollOrg&apos;s weights for exams from September 5, 2026: Core Payroll Concepts 29%, Calculation of the Paycheck 24%, Payroll Process and Systems 13%, Compliance 12%, Audits 8%, Accounting 8% and Administration 6%. The two biggest areas are split in two below. Dollar figures are the 2026 ones the exam uses.
              </p>
              <div className="space-y-3">
                {topics.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("fpc", 3)}
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
            How to Pass the FPC Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the 2026 numbers</h3>
              <p>
                The exam tests federal law in effect January 1, 2026. Know the social security wage base, the FICA and FUTA rates, the 22% and 37% supplemental rates and the deposit thresholds cold, so the math questions go fast.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice gross-to-net by hand</h3>
              <p>
                Work overtime with bonuses and two rates, pretax deductions that change some taxable wages but not others, grossing up, garnishment limits and imputed income until each step is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the forms and the deadlines</h3>
              <p>
                Forms W-4, W-2, 940, 941, 944, 945 and the 1099 series, the lookback period, monthly and semiweekly deposits, record retention and penalties all come up. Read IRS Publications 15, 15-A and 15-B and the DOL fact sheets PayrollOrg lists.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip controls and accounting</h3>
              <p>
                Audits, systems and accounting are about a third of the exam. Learn segregation of duties, batch controls, reconciliations and payroll journal entries, then retake the practice tests until you score 70% or better.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          FPC Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="fpc" />
        </div>
      </div>

      <ExamSampleQuestions examId="fpc" />

      <ExamRelatedTests examId="fpc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the FPC Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every area of the FPC outline.</p>
          <ExamLandingCTA dashboardHref="/fpc/dashboard" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Tigertest is not affiliated with PayrollOrg or Pearson VUE. FPC and Fundamental Payroll Certification are marks of their owner.
          </p>
        </div>
      </div>
    </div>
  );
}

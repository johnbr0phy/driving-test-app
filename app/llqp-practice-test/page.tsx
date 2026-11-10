import "@/lib/banks/llqp";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "LLQP Practice Test 2026 - Free Life Licence Exam Questions (Canada)";
const metaDescription =
  "Free LLQP practice for Canada's life licence exams: 200 original questions across the Life, Accident and Sickness, Segregated Funds and Annuities, and Ethics modules, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the Life Licence Qualification Program (LLQP) exams that provincial and territorial insurance regulators set for a life and accident and sickness licence in Canada: 200 original questions on Canadian life insurance, disability, critical illness and group benefits, segregated funds, annuities and registered plans, and ethics and professional practice. Four 50-question mock tests that mix the four modules in proportion, and one training set per module.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "llqp practice test, llqp exam questions, life licence qualification program exam, llqp mock exam, llqp segregated funds practice, llqp accident and sickness questions, llqp ethics practice, canada life insurance licence exam, llqp practice test 2026",
  alternates: {
    canonical: `${siteUrl}/llqp-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/llqp-practice-test`,
    images: [{ url: shareImageUrl("llqp"), width: 1200, height: 630, alt: "Tigertest free LLQP practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("llqp")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the LLQP exam?",
    a: "The Life Licence Qualification Program (LLQP) is the harmonized course and exam that Canada's provincial and territorial insurance regulators require before they license a life insurance agent. The curriculum is overseen by CISRO, and the exam is split into four modules: Life Insurance, Accident and Sickness Insurance, Segregated Funds and Annuities, and Ethics and Professional Practice (a Common Law version, or a Civil Code version in Quebec).",
  },
  {
    q: "How many questions are on each LLQP module and what score do you need?",
    a: "The Life Insurance, Accident and Sickness, and Segregated Funds and Annuities modules each have 35 multiple-choice questions scored out of 30, and the Ethics and Professional Practice module has 25 questions scored out of 20. The extra five in each module are unscored pilot questions. You have 75 minutes per module, and the pass mark is 60% on each module; marks are not averaged across modules.",
  },
  {
    q: "Which LLQP modules do I need?",
    a: "A full life licence usually needs all four modules. Segregated Funds and Annuities is the module that lets you sell seg funds and annuities, and some provinces offer an accident and sickness only licence that needs fewer modules. Rules on which modules, in what order and how long a pass stays valid vary by province, so check with your regulator.",
  },
  {
    q: "How are these mock tests different from the real LLQP exam?",
    a: "The real exam is written one module at a time. Each mock test here has 50 questions that mix the four modules in proportion (14 life, 13 accident and sickness, 13 segregated funds and annuities, 10 ethics) and uses the 60% pass line. To practise one module on its own, use its training set: there is one set per module.",
  },
  {
    q: "Are these the real LLQP exam questions?",
    a: "No. Every question is original, written by Tigertest from the module topics, the provincial Insurance Acts, the Income Tax Act and current CCIR and CISRO guidance, including the segregated funds guidance published in November 2025. Where Quebec law differs, the question says so. It is free practice, not affiliated with CISRO, any provincial regulator or the AMF, and it does not replace an approved LLQP course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free LLQP Practice Test",
      description,
      url: `${siteUrl}/llqp-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("llqp", "CAD"),
      featureList: [
        "200 LLQP practice questions",
        "4 mock tests of 50 questions across all four modules",
        "4 training sets, one per module",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Life Insurance", weight: "35 questions" },
  { name: "Accident and Sickness Insurance", weight: "35 questions" },
  { name: "Segregated Funds and Annuities", weight: "35 questions" },
  { name: "Ethics and Professional Practice", weight: "25 questions" },
];

export default function LlqpLandingPage() {
  return (
    <div data-theme="llqp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free LLQP Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/llqp/dashboard"
            shortName="LLQP"
            subtitle="200 original questions for Canada's life licence exams: life insurance and its taxation, disability and critical illness, group and government benefits, segregated funds, annuities and registered plans, and ethics. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/llqp-mobile.png", desktop: "/landing/llqp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="llqp" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Module at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one for each LLQP module: life insurance, accident and sickness, segregated funds and annuities, and ethics and professional practice. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions that mix all four modules in proportion, each with the real 60% pass line. No question appears in more than one test, and every policy gain, guarantee and needs calculation is worked through.
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
                Built on the Four LLQP Modules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each real module is a separate exam of 75 minutes, including five unscored pilot questions, with 60% to pass. Each mock test here has 14 life, 13 accident and sickness, 13 segregated funds and annuities, and 10 ethics questions in every 50.
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
                src={getTigerAsset("llqp", 1)}
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
            How to Pass the LLQP Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the tax rules once, then apply them everywhere</h3>
              <p>
                Policy gains are income, death benefits are tax-free, group LTD benefits are taxable when the employer pays, and seg fund top-ups are capital gains. Most calculation questions come back to a short list of rules: learn them as a table.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the time limits</h3>
              <p>
                Two years for contestability and reinstatement, a 30-day grace period, 10 days to rescind a life policy, two business days to cancel a seg fund contract, 31 days to convert group life, and 10 years to a seg fund maturity guarantee.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read ethics questions as the regulator would</h3>
              <p>
                The right answer puts the client first: needs analysis before any product, full disclosure of conflicts and replacements, consent before collecting information, and a report to FINTRAC when something looks wrong. Watch for the Quebec differences in the Civil Code version.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each module on its own</h3>
              <p>
                Each module is passed separately, so a strong life score cannot carry a weak ethics score. Finish each module&apos;s training set, then aim for 75% or better on every mock test before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          LLQP Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamSampleQuestions examId="llqp" />

      <ExamRelatedTests examId="llqp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the LLQP Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all four LLQP modules.</p>
          <ExamLandingCTA dashboardHref="/llqp/dashboard" />
        </div>
      </div>
    </div>
  );
}

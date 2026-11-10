import "@/lib/banks/aatl2";
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

const title = "AAT Level 2 Practice Test 2026 - Free Bookkeeping and Costing Questions";
const metaDescription =
  "Free AAT Level 2 Certificate in Accounting practice: 200 original questions on bookkeeping, control accounts, costing and the business environment, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the AAT Level 2 Certificate in Accounting (formerly the Foundation Certificate in Accounting): 200 original questions written from AAT's Q2022 qualification specification. Four 50-question mock tests weighted like the qualification's four units, and six training sets covering business documents and daybooks, discounts and VAT, the cash book and petty cash, control accounts and bank reconciliation, journals, errors and the trial balance, costing and budgets, contract law, the economy, ethics, business entities and the finance function.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "aat level 2 practice test, aat level 2 mock exam, aat foundation certificate in accounting, introduction to bookkeeping practice, principles of bookkeeping controls, principles of costing, aat business environment synoptic, aat level 2 questions",
  alternates: {
    canonical: `${siteUrl}/aat-level-2-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/aat-level-2-practice-test`,
    images: [{ url: shareImageUrl("aatl2"), width: 1200, height: 630, alt: "Tigertest free AAT Level 2 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aatl2")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the AAT Level 2 Certificate in Accounting?",
    a: "It is the entry-level accounting qualification from AAT (the Association of Accounting Technicians), once called the Foundation Certificate in Accounting. It has four mandatory units: Introduction to Bookkeeping, Principles of Bookkeeping Controls, Principles of Costing and The Business Environment. It leads to jobs such as accounts assistant or purchase and sales ledger clerk, and on to the AAT Level 3 Diploma in Accounting.",
  },
  {
    q: "How is AAT Level 2 assessed?",
    a: "All assessments are computer based, set and marked by AAT, and booked on demand through a training provider or assessment venue. Introduction to Bookkeeping, Principles of Bookkeeping Controls and Principles of Costing each have a 1 hour 30 minute unit assessment. The Business Environment is assessed in a 2 hour synoptic assessment that also draws on the bookkeeping units and includes some written answers. AAT keeps a pass mark of 70% on every assessment, and the overall grade is Pass (70 to 79%), Merit (80 to 89%) or Distinction (90% and over).",
  },
  {
    q: "How much does each unit count towards the grade?",
    a: "Under AAT's Q2022 specification, Introduction to Bookkeeping and Principles of Bookkeeping Controls are 25% each, Principles of Costing is 20% and The Business Environment, through the synoptic assessment, is 30%. Each mock test here has 13 Introduction to Bookkeeping, 12 Bookkeeping Controls, 10 Costing and 15 Business Environment questions to match.",
  },
  {
    q: "What does this practice test leave out?",
    a: "Tigertest asks four-option questions, so it covers the knowledge and calculations behind every unit but not the task formats themselves: entering transactions into ledger accounts and daybooks, numeric gap-fills, spreadsheet tasks in Principles of Costing, and the written emails and reports in the synoptic assessment. Use AAT's practice assessments, through your training provider, for those.",
  },
  {
    q: "Are these real AAT questions?",
    a: "No. Every question is original, written by Tigertest from AAT's published qualification specification and UK bookkeeping practice, with VAT at the current 20% standard rate. Tigertest is not affiliated with AAT, and this free practice does not replace your course or AAT's own practice assessments.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AAT Level 2 Practice Test",
      description,
      url: `${siteUrl}/aat-level-2-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aatl2", "GBP"),
      featureList: [
        "200 AAT Level 2 practice questions",
        "4 mock tests of 50 questions weighted by unit",
        "6 training sets by unit and topic",
        "Every calculation explained",
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
        classFaqJsonLd("aatl2"),
      ],
    },
  ],
};

const units = [
  { name: "Introduction to Bookkeeping", weight: "25%" },
  { name: "Principles of Bookkeeping Controls", weight: "25%" },
  { name: "Principles of Costing", weight: "20%" },
  { name: "The Business Environment (synoptic)", weight: "30%" },
];

export default function AatLevel2LandingPage() {
  return (
    <div data-theme="aatl2" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AAT Level 2 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/aat-level-2/dashboard"
            shortName="AAT Level 2"
            subtitle="200 original questions for the AAT Level 2 Certificate in Accounting: daybooks, discounts and VAT, control accounts, bank reconciliations, journals and the suspense account, costing, budgets and the business environment. Four 50-question mock tests, every calculation explained. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aatl2-mobile.png", desktop: "/landing/aatl2-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aatl2" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Unit</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six training sets: Introduction to Bookkeeping, control accounts and bank reconciliation, journals, errors and the trial balance, Principles of Costing, law, the economy and business entities, and ethics, the finance function and information. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Unit-Weighted Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions in the qualification&apos;s unit weights, with AAT&apos;s 70% pass line. No question appears in more than one test, and every calculation is worked through in the explanation.
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
                Built on AAT&apos;s Level 2 Specification
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AAT&apos;s Q2022 qualification specification sets each unit&apos;s share of the overall grade. Each test here has 13 Introduction to Bookkeeping, 12 Bookkeeping Controls, 10 Costing and 15 Business Environment questions. Ledger entry tools, spreadsheet tasks and the synoptic&apos;s written answers are not modelled.
              </p>
              <div className="space-y-3">
                {units.map((unit) => (
                  <div key={unit.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{unit.name}</span>
                    <span className="text-brand-dark font-semibold">{unit.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("aatl2", 1)}
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
            How to Pass AAT Level 2
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know where every document goes</h3>
              <p>
                Most bookkeeping marks come from knowing which daybook a document belongs in and which side of which account each total is posted to. Say the debit and the credit out loud for every transaction until it is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Get VAT and discounts right every time</h3>
              <p>
                Take trade and bulk discounts off before VAT, find VAT in a gross figure by dividing by six at 20%, and record prompt payment discount with a credit note. Small slips here cost marks across every bookkeeping task.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn which errors the trial balance shows</h3>
              <p>
                Commission, omission, original entry, principle, reversal and compensating errors all leave the trial balance balanced. Only one-sided or unequal entries go to suspense, and each journal that clears it has a suspense entry on one side.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not leave the business environment to the end</h3>
              <p>
                The Business Environment is 30% of the grade and is only assessed in the synoptic. Contract law, the five ethical principles, business entities and data security are short topics with fixed answers. Aim for 80% or better on every test here before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AAT Level 2 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aatl2" />
        </div>
      </div>

      <ExamSampleQuestions examId="aatl2" />

      <ExamRelatedTests examId="aatl2" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for AAT Level 2?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all four units of the AAT Level 2 Certificate in Accounting.</p>
          <ExamLandingCTA dashboardHref="/aat-level-2/dashboard" />
        </div>
      </div>
    </div>
  );
}

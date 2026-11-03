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

const siteUrl = SITE_URL;

const title = "ACCA FA Practice Test 2026 - Free Financial Accounting Questions";
const metaDescription =
  "Free ACCA Financial Accounting (FA) practice: 200 original objective test questions on the 2026-27 syllabus with IFRS 18 formats, four 50-question tests and every calculation explained.";
const description =
  "Free practice for ACCA's Applied Knowledge exam Financial Accounting (FA), also sat as FFA in the Foundations in Accountancy: 200 original Section A style objective test questions on every area of the syllabus, which ACCA carries unchanged into September 2026 to August 2027. Four 50-question tests across the syllabus, and seven training sets covering the regulatory framework and concepts, double entry and sales tax, inventories, non-current assets and depreciation, accruals and receivables, provisions and share capital, reconciliations, the trial balance and suspense accounts, financial statements and cash flows under IFRS 18, consolidation and ratios.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "acca fa practice test, acca financial accounting questions, acca fa mock exam, acca f3 practice questions, acca ffa practice test, acca fa 2026, acca fa objective test questions, free acca practice questions",
  alternates: {
    canonical: `${siteUrl}/acca-fa-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/acca-fa-practice-test`,
    images: [{ url: shareImageUrl("accafa"), width: 1200, height: 630, alt: "Tigertest free ACCA FA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("accafa")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the ACCA Financial Accounting (FA) exam?",
    a: "Financial Accounting (FA) is one of the three Applied Knowledge exams of the ACCA Qualification, alongside Business and Technology (BT) and Management Accounting (MA). The same exam is called FFA in ACCA's Foundations in Accountancy. It covers double-entry bookkeeping, recording transactions, reconciliations, the trial balance, preparing financial statements for sole traders and companies under IFRS Accounting Standards, basic consolidation and ratio analysis.",
  },
  {
    q: "How is the FA exam structured and what is the pass mark?",
    a: "FA is a two-hour computer-based exam with all questions compulsory. Section A has 35 objective test questions worth two marks each, and Section B has two multi-task questions worth 15 marks each, one on consolidation and one on preparing accounts. The pass mark is 50%. ACCA offers FA as an on-demand computer-based exam, so you can book it when you are ready.",
  },
  {
    q: "Has the FA syllabus changed for 2026-27?",
    a: "ACCA lists no change to the Financial Accounting syllabus for September 2026 to August 2027. The last changes came in September 2025, when IFRS 18 Presentation and Disclosure in Financial Statements replaced IAS 1: statements are now laid out in operating, investing and financing categories, with operating profit and profit before financing and income taxes as subtotals. Tigertest's questions use those IFRS 18 terms.",
  },
  {
    q: "Does this practice test include Section B multi-task questions?",
    a: "No. Tigertest models Section A only, with four-option single-answer questions, and some real Section A questions ask for more than one answer or a typed number. The two 15-mark multi-task questions in Section B, a consolidation and a set of accounts, are 30% of the real exam, so practise full questions as well before you sit FA.",
  },
  {
    q: "Are these real ACCA exam questions?",
    a: "No. Every question is original, written by Tigertest from ACCA's FA syllabus and study guide and the IFRS Accounting Standards it covers. Tigertest is not affiliated with ACCA, and this free practice does not replace an ACCA approved learning course or ACCA's own practice platform.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ACCA FA Practice Test",
      description,
      url: `${siteUrl}/acca-fa-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 ACCA FA objective test practice questions",
        "4 tests of 50 questions across the syllabus",
        "7 training sets by syllabus area",
        "IFRS 18 statement formats",
        "Every calculation explained",
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
        classFaqJsonLd("accafa"),
      ],
    },
  ],
};

const syllabusAreas = [
  { name: "A-B: Context, regulation and concepts", count: "4" },
  { name: "C-D: Double entry, sales tax and cash", count: "5" },
  { name: "D: Inventories", count: "4" },
  { name: "D: Non-current assets and depreciation", count: "7" },
  { name: "D: Accruals, receivables and payables", count: "6" },
  { name: "D: Provisions, capital and finance costs", count: "5" },
  { name: "E-F: Reconciliations, trial balance, errors", count: "6" },
  { name: "G: Financial statements and cash flows", count: "7" },
  { name: "H: Consolidation", count: "4" },
  { name: "I: Interpretation and ratios", count: "2" },
];

export default function AccaFaLandingPage() {
  return (
    <div data-theme="accafa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ACCA FA Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/acca-fa/dashboard"
            shortName="ACCA FA"
            subtitle="200 original objective test questions on the ACCA Financial Accounting syllabus: double entry, inventories, non-current assets, accruals, reconciliations, IFRS 18 statements, cash flows, consolidation and ratios. Four 50-question tests, every calculation explained. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/accafa-mobile.png", desktop: "/landing/accafa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="accafa" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Syllabus Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven training sets: context, concepts and double entry, inventories and non-current assets, accruals, receivables and payables, provisions and share capital, reconciliations and the trial balance, financial statements and cash flows, and consolidation and ratios. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full-Syllabus Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 Section A style questions across every syllabus area, with the real 50% pass mark. No question appears in more than one test, and every calculation is worked through in the explanation.
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
                Built on the ACCA FA Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ACCA&apos;s FA syllabus has nine areas, A to I, and publishes no weighting for them. Each 50-question test here follows Tigertest&apos;s split below, leaning on the areas Section B also tests: accounts preparation and consolidation. The Section B multi-task questions themselves are not modelled.
              </p>
              <div className="space-y-3">
                {syllabusAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.count} per test</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("accafa", 1)}
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
            How to Pass FA
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get double entry automatic</h3>
              <p>
                Almost every FA question rests on debits and credits: accruals, irrecoverable debts, disposals, suspense accounts, share issues. Write the journal before you work out the figure, and the answer usually follows.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the IFRS 18 layout</h3>
              <p>
                Since September 2025 statements follow IFRS 18. Know which items sit in the operating, investing and financing categories, how operating profit differs from profit before financing and income taxes, and that the indirect cash flow method now starts from operating profit.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise consolidation every week</h3>
              <p>
                A 15-mark consolidation question appears in every exam. Goodwill with non-controlling interest at fair value, intra-group balances, unrealised profit and mid-year acquisitions are fixed routines worth drilling until they are quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Prepare for Section B too</h3>
              <p>
                Use these questions to make the rules second nature, then practise full multi-task questions on preparing accounts and a consolidated statement. Aim for 70% or better on every test here before you book FA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ACCA FA Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="accafa" />
        </div>
      </div>

      <ExamRelatedTests examId="accafa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass FA?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every area of the ACCA FA syllabus.</p>
          <ExamLandingCTA dashboardHref="/acca-fa/dashboard" />
        </div>
      </div>
    </div>
  );
}

import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "CPA FAR Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free CPA Exam FAR practice: 200 original multiple-choice questions on the AICPA 2026 blueprint, four 50-question tests weighted by content area, every answer and calculation explained.";
const description =
  "Free practice for the Financial Accounting and Reporting (FAR) section of the Uniform CPA Examination: 200 original multiple-choice questions written from the AICPA Blueprints effective January 1, 2026. Four 50-question tests weighted like the real section's three content areas, and seven training sets covering financial statements and consolidation, not-for-profit and government reporting, public company reporting and ratios, cash, receivables and inventory, PP&E, intangibles and investments, liabilities and equity, accounting changes, revenue, income taxes, fair value and leases.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cpa far practice test, far practice questions, cpa exam far, financial accounting and reporting practice test, cpa far mcq, cpa far 2026, free cpa practice questions, far section cpa exam",
  alternates: {
    canonical: `${siteUrl}/cpa-far-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cpa-far-practice-test`,
    images: [{ url: shareImageUrl("cpafar"), width: 1200, height: 630, alt: "Tigertest free CPA FAR practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cpafar")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the FAR section of the CPA Exam?",
    a: "Financial Accounting and Reporting (FAR) is one of the three Core sections of the Uniform CPA Examination that every candidate takes, alongside AUD and REG, plus one Discipline section. It tests financial reporting under U.S. GAAP for for-profit and not-for-profit entities, foundational state and local government concepts, and SEC reporting for public companies.",
  },
  {
    q: "How is the FAR section structured and scored?",
    a: "FAR is a 4-hour section with 50 multiple-choice questions in two testlets of 25 and 7 task-based simulations in three testlets. Multiple-choice questions and simulations each count for 50% of the score. Scores run from 0 to 99 and 75 passes, but a 75 is not 75% correct: the AICPA scales scores for question difficulty. The tests here use a 75% line as a readiness target.",
  },
  {
    q: "What content does FAR cover in 2026?",
    a: "The AICPA Blueprints effective January 1, 2026 split FAR into three areas: Financial Reporting (30 to 40%), Select Balance Sheet Accounts (30 to 40%) and Select Transactions (25 to 35%). The Blueprints effective January 1, 2027 only add a reference to the section introduction and do not change the FAR content. Business combinations, goodwill and other indefinite-lived intangibles, internally developed software, research and development, foreign currency translation, derivatives and hedging, stock compensation, lessor accounting and employee benefit plan statements are tested in the BAR Discipline section, not FAR.",
  },
  {
    q: "Does this practice test include task-based simulations?",
    a: "No. Tigertest covers the multiple-choice half of FAR only. The task-based simulations, with their spreadsheets, journal entries and research in the FASB Codification, are half of the real score, so practice them with your review course or the AICPA's sample tests as well.",
  },
  {
    q: "Are these real CPA Exam questions?",
    a: "No. Every question is original, written by Tigertest from the AICPA blueprint and the FASB, GASB and SEC requirements it covers. Tigertest is not affiliated with the AICPA, NASBA or any state board of accountancy, and this free practice does not replace a full CPA review course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CPA FAR Practice Test",
      description,
      url: `${siteUrl}/cpa-far-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CPA FAR multiple-choice practice questions",
        "4 tests of 50 questions weighted by the AICPA blueprint",
        "7 training sets by topic",
        "Every calculation explained",
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
  { name: "Area I: Financial Reporting", weight: "30-40%" },
  { name: "Area II: Select Balance Sheet Accounts", weight: "30-40%" },
  { name: "Area III: Select Transactions", weight: "25-35%" },
];

export default function CpaFarLandingPage() {
  return (
    <div data-theme="cpafar" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CPA FAR Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cpa-far/dashboard"
            shortName="CPA FAR"
            subtitle="200 original multiple-choice questions on the AICPA 2026 blueprint: statements and consolidation, receivables and inventory, PP&E and investments, debt, revenue, income taxes and leases. Four 50-question tests, every calculation explained. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cpafar-mobile.png", desktop: "/landing/cpafar-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cpafar" />

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
                Seven training sets: statements and consolidation, not-for-profit, government and public companies, cash, receivables and inventory, PP&amp;E, intangibles and investments, liabilities and equity, changes, contingencies and revenue, and income taxes, fair value and leases. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Blueprint-Weighted Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 multiple-choice questions in the blueprint&apos;s area weights, with a 75% readiness line. No question appears in more than one test, and every calculation is worked through in the explanation.
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
                Built on the AICPA FAR Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AICPA Blueprints effective January 1, 2026 give FAR three content areas. Each test here has 17 Financial Reporting, 18 Balance Sheet Accounts and 15 Select Transactions questions. The 7 task-based simulations are not modelled.
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
                src={getTigerAsset("cpafar", 1)}
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
            How to Pass FAR
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the calculations by doing them</h3>
              <p>
                Most FAR questions are applied: bond amortization, EPS, deferred taxes, lease liabilities, inventory costing. Work each number on paper before you look at the choices, then check your path against the explanation, not just the answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know which model each topic uses</h3>
              <p>
                Impairment of PP&amp;E starts with undiscounted cash flows; credit losses use expected lifetime losses; contingencies need a probable loss; variable consideration needs a probable absence of reversal. Many wrong choices apply the right idea from the wrong standard.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip not-for-profit and government</h3>
              <p>
                Net asset classes, releases from restriction, contributions, measurement focus and fund types are smaller topics with fixed rules. They are quick points once learned, and candidates who skip them leave those points behind.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice simulations too</h3>
              <p>
                Simulations are half of the FAR score. Use these questions to make the rules automatic, then practice simulations and Codification research with your review course. Aim for 80% or better on every test here before you sit the section.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CPA FAR Frequently Asked Questions
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

      <ExamRelatedTests examId="cpafar" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass FAR?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every area of the AICPA FAR blueprint.</p>
          <ExamLandingCTA dashboardHref="/cpa-far/dashboard" />
        </div>
      </div>
    </div>
  );
}

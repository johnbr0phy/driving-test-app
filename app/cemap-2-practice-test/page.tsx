import "@/lib/banks/ukcemap2";
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

const title = "CeMAP 2 Practice Test 2026 - Free MORT (MRT1 and MRT2) Questions";
const metaDescription =
  "Free CeMAP 2 practice for LIBF's MORT module: 200 original questions on MCOB, affordability, surveys, property law, remortgages, arrears and mortgage products, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for CeMAP Module 2, LIBF's MORT module: 200 original questions across both units, MRT1 (Mortgage Law, Practice and Application) and MRT2 (Mortgage Products and Post Completion). Four 50-question mock tests with the 70% pass line, and four training sets covering regulated mortgage definitions and auctions, borrower types, MCOB duties of lenders and advisers, the property market and interest rate stress tests, affordability and suitability, guarantors and additional security, fees and charges, surveys, valuations and property value, further advances, remortgages and bridging, porting and transfers, debt consolidation, arrears and repossession, repayment methods and rate types, mortgage products, shared ownership and Islamic home finance.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cemap 2 practice test, cemap module 2 mock exam, mort practice questions, mrt1 mrt2 questions, libf cemap 2, mortgage law practice and application, mortgage products and post completion, mcob practice questions",
  alternates: {
    canonical: `${siteUrl}/cemap-2-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cemap-2-practice-test`,
    images: [{ url: shareImageUrl("ukcemap2"), width: 1200, height: 630, alt: "Tigertest free CeMAP 2 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukcemap2")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is CeMAP 2?",
    a: "CeMAP Module 2 is the MORT module of LIBF's Certificate in Mortgage Advice and Practice, the qualification that meets the FCA's education standard for mortgage advisers. It has two units: MRT1, Mortgage Law, Practice and Application, and MRT2, Mortgage Products and Post Completion. With FSRE (Module 1) and the synoptic ASEW/ASSC unit (Module 3) it completes CeMAP.",
  },
  {
    q: "How is CeMAP 2 assessed?",
    a: "Each unit is a one-hour online exam taken on LIBF's Brightspace platform with remote invigilation, at any time and with no booking. MRT1 has 50 standalone multiple-choice questions and you need 35 (70%) to pass; MRT2 has 40 standalone questions and you need 28 (70%). 80% is a merit and 90% a distinction.",
  },
  {
    q: "What does each mock test here cover?",
    a: "Each of the four mock tests has 50 questions: 28 from MRT1 (mortgage definitions and auctions, borrower types, MCOB, the market, affordability and suitability, security, fees, surveys and property value) and 22 from MRT2 (raising money, transfers and moves, debt consolidation, arrears and remedies, repayment and rate types, products and schemes), the same 50:40 balance as the two real units. LIBF publishes no weighting by topic, so the split is Tigertest's.",
  },
  {
    q: "Which rules are the questions based on?",
    a: "The FCA's MCOB sourcebook, the Regulated Activities Order, the Law of Property Act 1925 and Land Registration Act 2002 for England and Wales, the Mortgage Charter, PRA buy-to-let standards, RICS home survey and auction guidance, NHBC, Flood Re, Equity Release Council standards and GOV.UK scheme pages, as they stand in November 2026. No tax rates, fees or other money figures that change are asked.",
  },
  {
    q: "Are these real CeMAP questions?",
    a: "No. Every question is original, written by Tigertest from LIBF's published MRT1 and MRT2 learning outcomes and the rules above. Tigertest is not affiliated with LIBF or Walbrook Institute London, and this practice does not replace your course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CeMAP 2 Practice Test",
      description,
      url: `${siteUrl}/cemap-2-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukcemap2", "GBP"),
      featureList: [
        "200 CeMAP 2 (MORT) practice questions",
        "4 mock tests of 50 questions, 28 MRT1 and 22 MRT2",
        "4 training sets by topic",
        "Every answer explained",
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
        classFaqJsonLd("ukcemap2"),
      ],
    },
  ],
};

const units = [
  { name: "MRT1: definitions, borrowers, MCOB and the market", weight: "13 of 50" },
  { name: "MRT1: advice, security, fees, surveys and value", weight: "15 of 50" },
  { name: "MRT2: raising money, moves and debt consolidation", weight: "10 of 50" },
  { name: "MRT2: arrears, products and schemes", weight: "12 of 50" },
];

export default function Cemap2LandingPage() {
  return (
    <div data-theme="ukcemap2" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CeMAP 2 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cemap-2/dashboard"
            shortName="CeMAP 2"
            subtitle="200 original questions for CeMAP Module 2 (MORT), both MRT1 and MRT2: MCOB, affordability and suitability, surveys and property law, remortgages and porting, debt consolidation, arrears and repossession, and mortgage products. Four 50-question mock tests, every answer explained. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/ukcemap2-mobile.png", desktop: "/landing/ukcemap2-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukcemap2" />

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
                Four training sets: mortgages, borrowers and MCOB; advice, fees and the property; raising, moving and consolidating; and arrears, products and schemes. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Unit-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions, the length of the real MRT1 exam, mixing MRT1 and MRT2 in the 50:40 balance of the real units, with LIBF&apos;s 70% pass line. No question appears in more than one test, and every answer is explained.
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
                Built on LIBF&apos;s MORT Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                LIBF&apos;s CeMAP specification lists the learning outcomes of MRT1 and MRT2 but no weighting, so each test here has 28 MRT1 and 22 MRT2 questions, split by the breadth of each learning outcome.
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
                src={getTigerAsset("ukcemap2", 3)}
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
            How to Pass CeMAP 2
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know where each rule lives in MCOB</h3>
              <p>
                Most MRT1 marks come from a handful of MCOB chapters: initial disclosure and advice (MCOB 4), offers and the reflection period (MCOB 6A), affordability (MCOB 11), charges (MCOB 12) and arrears (MCOB 13). Learn which chapter answers which question and the rest follows.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the affordability building blocks</h3>
              <p>
                Net income, committed spending, basic essential spending and quality-of-living costs, the 1% and five-year rate stress, and what a lender may never rely on: equity, rising prices, self-certified income or a bare declaration. Sort a list of costs into the right bucket until it is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Fix the arrears timeline</h3>
              <p>
                Information within 15 business days, statements at least quarterly, no more than two direct debit attempts a month, the options a lender must consider, repossession only as a last resort, and what happens to a shortfall or surplus after sale. MRT2 asks about every step.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Compare products side by side</h3>
              <p>
                Tracker against discount, capped against collared, offset against flexible, lifetime mortgage against home reversion, ijara against murabaha. Being able to say what makes each one different wins quick marks. Aim for 80% or better on every test here before you sit each unit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CeMAP 2 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ukcemap2" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukcemap2" />

      <ExamRelatedTests examId="ukcemap2" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for CeMAP 2?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across both units of CeMAP Module 2, MRT1 and MRT2.</p>
          <ExamLandingCTA dashboardHref="/cemap-2/dashboard" />
        </div>
      </div>
    </div>
  );
}

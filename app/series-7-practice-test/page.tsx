import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Series 7 Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free Series 7 practice: 200 original questions on FINRA's content outline, four 50-question mock tests weighted like the real exam with its 72% pass line, every answer explained.";
const description =
  "Free practice for the FINRA Series 7 General Securities Representative exam: 200 original questions written from FINRA's content outline. Four 50-question mock tests weighted like the real 125-question exam, with its 72 percent passing score, and six training sets covering prospecting and account opening, equities, debt and municipal securities, options, packaged products and recommendations, and orders, margin and confirmations.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "series 7 practice test, series 7 exam practice, series 7 practice questions, finra series 7, general securities representative exam, series 7 options questions, series 7 mock exam, series 7 2026",
  alternates: {
    canonical: `${siteUrl}/series-7-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/series-7-practice-test`,
    images: [{ url: shareImageUrl("series7"), width: 1200, height: 630, alt: "Tigertest free Series 7 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("series7")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Series 7 exam?",
    a: "The Series 7 is FINRA's General Securities Representative Qualification Examination. Passing it, together with the Securities Industry Essentials (SIE) exam, qualifies a registered representative to sell most kinds of securities, including stocks, bonds, options, municipal securities and investment company products. You need a sponsoring FINRA member firm to take it.",
  },
  {
    q: "How many questions are on the Series 7 and what is the passing score?",
    a: "The exam has 125 scored multiple-choice questions plus 5 unscored pretest questions, and you have 3 hours 45 minutes. The passing score is 72. Each mock test here has 50 questions in the same proportions as the real exam and uses a 72 percent pass line.",
  },
  {
    q: "What does the Series 7 cover?",
    a: "FINRA's outline has four job functions: seeking business for the broker-dealer (9 questions), opening accounts (11), providing information, making suitable recommendations and maintaining records (91), and processing and confirming transactions (14). The third function is almost three quarters of the exam, which is why options, municipal and other debt securities, packaged products and suitability get the most practice here.",
  },
  {
    q: "Do I need to pass the SIE before the Series 7?",
    a: "The SIE is a corequisite, not a prerequisite: you can take the two in either order, but you are not registered as a general securities representative until you have passed both. The SIE covers basic industry knowledge, while the Series 7 goes deeper into options strategies, margin, municipal securities and recommendations.",
  },
  {
    q: "Are these the real Series 7 questions?",
    a: "No. Every question is original, written by Tigertest from FINRA's published content outline and the current rules, such as T+1 settlement and Regulation Best Interest. It is free practice, not an official FINRA product, and it does not replace your firm's training or a full prep course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Series 7 Practice Test",
      description,
      url: `${siteUrl}/series-7-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 Series 7 practice questions",
        "4 mock tests of 50 questions weighted like the real exam, 72% to pass",
        "6 training sets by topic",
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
  { name: "Seeking business for the broker-dealer", weight: "7%" },
  { name: "Opening accounts", weight: "9%" },
  { name: "Information, recommendations and records", weight: "73%" },
  { name: "Processing and confirming transactions", weight: "11%" },
];

export default function Series7LandingPage() {
  return (
    <div data-theme="series7" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Series 7 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/series-7/dashboard"
            shortName="Series 7"
            subtitle="200 original questions on FINRA's outline: options, municipal and other bonds, equities, funds and annuities, suitability, margin and trading. Four 50-question mock tests with the 72% pass line. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/series7-mobile.png", desktop: "/landing/series7-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="series7" />

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
                Six training sets: prospecting and opening accounts, equities, debt and municipal securities, options, packaged products and recommendations, and orders, margin and confirmations. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions in the real exam&apos;s proportions, each needing 72% to pass. No question appears in more than one test, and every calculation is worked through in the explanation.
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
                Built on FINRA&apos;s Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                FINRA splits the 125 scored questions across four job functions. Each mock test here keeps the same balance, so the third function, investment information and recommendations, makes up 36 of every 50 questions.
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
                src={getTigerAsset("series7", 1)}
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
            How to Pass the Series 7
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master options with a payoff table</h3>
              <p>
                For every strategy, write down the breakeven, maximum gain and maximum loss before you look at the choices. Calls break even at strike plus premium, puts at strike minus premium, and straddles at the strike plus and minus both premiums.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Separate general obligation from revenue bonds</h3>
              <p>
                Municipal questions turn on who pays: taxes for GO bonds, project income for revenue bonds. Pair each with its analysis (tax base and overlapping debt, or feasibility study and rate covenant) and learn the syndicate terms and the tax-equivalent yield formula.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the margin formulas until they are automatic</h3>
              <p>
                Equity is market value minus debit in a long account. Reg T is 50%, the minimum equity is $2,000, and the maintenance points are the debit divided by 0.75 (long) and the credit divided by 1.30 (short).
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read every suitability question as the customer</h3>
              <p>
                Start from the customer&apos;s objective, time horizon, tax bracket and liquidity needs, then remove any choice that does not fit. Aim for 80% or better on every mock test before you sit the real exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Series 7 Frequently Asked Questions
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

      <ExamRelatedTests examId="series7" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Series 7?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every function of FINRA&apos;s outline.</p>
          <ExamLandingCTA dashboardHref="/series-7/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/appraiser";
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
const path = "/licensed-residential-appraiser-practice-test";

const title = "Free Licensed Residential Appraiser Practice Test 2026";
const metaDescription =
  "200 original Licensed Residential Appraiser questions on the April 2026 AQB outline: market analysis, valuation, USPAP and statistics. Free to start.";
const description =
  "Practice for the national AQB Licensed Residential Real Property Appraiser examination: 200 original questions on the April 2026 outline, covering market analysis, property description, land and site valuation, sales comparison, cost, income, reconciliation, USPAP and statistics. Four 50-question practice tests and four training sets.";

const faqs = [
  { q: "How long is the Licensed Residential Appraiser exam?", a: "The national AQB Licensed Residential examination has 125 questions, including 110 scored and 15 unscored questions, with four hours allowed. Our four 50-question practice tests are shorter study sessions, not full-length simulations." },
  { q: "Does this also prepare me for Certified Residential or Certified General?", a: "This bank follows the Licensed Residential column of the April 2026 AQB outline. The Certified Residential and Certified General examinations have different content weights and requirements. State licensing rules, eligibility and required education also need separate review." },
  { q: "What is the passing score?", a: "The official national examination uses a scaled passing score of 75, which does not mean 75% correct. Tigertest uses 70% as a study target only; it is not a conversion of the official scale or a prediction of licensing success." },
  { q: "Which USPAP edition and questions are used?", a: "The practice uses current USPAP 2024 rules and original scenarios. It does not reproduce official exam questions or the full paid USPAP guidance and FAQ manual. Study the current standards and your approved course materials alongside this practice." },
  { q: "Is this practice free?", a: "It is free to start without an account. The first training sets and practice tests are free; the later ones require Premium. An account lets you save progress across devices." },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "licensed residential appraiser practice test, aqb appraisal exam, appraiser exam questions, uspap practice, real property valuation",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("appraiser"), width: 1200, height: 630, alt: "Tigertest free Licensed Residential Appraiser practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("appraiser")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Licensed Residential Appraiser Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("appraiser"),
      featureList: [
        "200 Licensed Residential Appraiser practice questions",
        "4 practice tests of 50 questions across the outline",
        "4 training sets by topic",
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
        classFaqJsonLd("appraiser"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Real estate market", weight: "10 of 50" },
  { name: "Property description", weight: "5 of 50" },
  { name: "Land and site valuation", weight: "2 of 50" },
  { name: "Sales comparison", weight: "13 of 50" },
  { name: "Cost approach", weight: "5 of 50" },
  { name: "Income approach", weight: "2 of 50" },
  { name: "Reconciliation", weight: "1 of 50" },
  { name: "USPAP", weight: "11 of 50" },
  { name: "Statistics", weight: "1 of 50" },
];

export default function AppraiserLandingPage() {
  return (
    <div data-theme="appraiser" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Licensed Residential Appraiser Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/appraiser/dashboard"
            shortName="Residential Appraiser"
            subtitle="200 questions and four shorter Licensed Residential practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/appraiser-mobile.png", desktop: "/landing/appraiser-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="appraiser" />

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
                Four training sets: Market and Property, Site and Sales Comparison, Valuation and Statistics, and USPAP. Work through each explanation and calculation. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four fixed practice tests of 50 questions check your understanding across the outline. They are shorter than the official 125-question exam. Aim for 70%, a study target only, not a conversion of the official scaled score.
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
                Weighted to the April 2026 AQB Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Counts approximate the April 2026 Licensed Residential outline in whole questions. The official 110 scored items allocate 22 to Market, 11 to Property, 5 to Site, 28 to Sales, 10 to Cost, 5 to Income, 2 to Reconciliation, 24 to USPAP and 3 to Statistics. This bank provides introductory and applied practice, not a calibrated prediction of exam difficulty. It does not simulate Certified Residential, Certified General or state-law exams, and does not replace qualifying education or the complete USPAP guidance manual.
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
                src={getTigerAsset("appraiser", 1)}
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
            We just launched this practice bank. Have an idea, a topic you&apos;d like covered, or a question that could be clearer? We read every message and use it to improve every test.
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
            How to Prepare for the Appraiser Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with the assignment</h3>
              <p>
                Identify the property interest, value definition and effective date before choosing an approach.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Check every adjustment</h3>
              <p>
                Adjust comparable sales to the subject and check every adjustment direction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Keep income measures apart</h3>
              <p>
                Keep gross income, net operating income and equity cash flow distinct.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Apply USPAP to the facts</h3>
              <p>
                Apply USPAP rules to the exact facts, and study current state licensing requirements separately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Appraiser Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="appraiser" />
        </div>
      </div>

      <ExamSampleQuestions examId="appraiser" count={4} />

      <ExamRelatedTests examId="appraiser" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Appraiser Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on residential appraisal and USPAP.</p>
          <ExamLandingCTA dashboardHref="/appraiser/dashboard" />
        </div>
      </div>
    </div>
  );
}

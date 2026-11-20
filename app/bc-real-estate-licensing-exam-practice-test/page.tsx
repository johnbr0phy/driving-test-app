import "@/lib/banks/bcrealestate";
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
const path = "/bc-real-estate-licensing-exam-practice-test";

const title = "Free BC Real Estate Exam Practice Test 2026 - Trading Services Licensing Exam Questions";
const metaDescription =
  "Free-to-start BC real estate exam practice test: 200 original questions on the Real Estate Services Act, agency duties, contracts, trust accounts, land title, strata and mortgage math, every answer explained.";
const description =
  "Practice for the British Columbia real estate trading services licensing exam, the final exam of the UBC Sauder course that BCFSA requires for a representative licence: 200 original questions written from the Real Estate Services Act and Rules, the Property Law, Land Title, Strata Property and Real Estate Development Marketing Acts and standard mortgage and valuation arithmetic. Four 50-question practice tests and four training sets, tuned for mobile.";

const faqs = [
  {
    q: "What is the BC real estate trading services exam?",
    a: "It is the final exam of the UBC Sauder Real Estate Trading Services Licensing Course, which BC Financial Services Authority (BCFSA) requires before you can be licensed as a representative providing trading services such as selling and leasing real estate. After you pass it you complete BCFSA's Residential or Commercial Trading Services Applied Practice Course and apply for a licence.",
  },
  {
    q: "How many questions are on the exam and what is the pass mark?",
    a: "UBC's Real Estate Division gives the exam as 100 multiple-choice questions, one mark each, in three hours, with a passing grade of 70%. These practice tests use 50 questions each and the same 70% target, so a test is half the length of the real exam.",
  },
  {
    q: "What does the exam cover?",
    a: "UBC does not publish a chapter list or weights online. The questions here cover the Real Estate Services Act and Rules (licensing, agency duties, disclosure, contracts, advertising, trust accounts and records), land law, strata and development sales, and the mortgage finance and valuation arithmetic that UBC's handbook says the course needs. The topic weights here are Tigertest's own.",
  },
  {
    q: "Do I need a calculator?",
    a: "UBC recommends a financial calculator such as the HP 10bII+ for the course, and some exam centres let you use its app on a tablet. The practice questions here keep the arithmetic simple and show the working in the explanation, so you can check your method with any calculator.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from the text of the Real Estate Services Act, the Real Estate Services Rules, the Property Law Act, the Land Title Act, the Strata Property Act and the Real Estate Development Marketing Act, so it covers the same law without copying the UBC exam or assignments. Tigertest is not affiliated with UBC or BCFSA.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "bc real estate exam, ubc sauder real estate exam, bcfsa licensing exam, bc realtor exam practice test, trading services licensing exam, british columbia real estate licence exam, real estate services act practice test, bc real estate exam 2026",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("bcrealestate"), width: 1200, height: 630, alt: "Tigertest free BC real estate exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("bcrealestate")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free BC Real Estate Exam Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("bcrealestate"),
      featureList: [
        "200 BC real estate exam practice questions",
        "4 practice tests of 50 questions",
        "4 training sets from the Act to mortgage math",
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
  { name: "Agency duties and disclosure", weight: "16%" },
  { name: "Licensing and the Real Estate Services Act", weight: "12%" },
  { name: "Contracts, offers and advertising", weight: "12%" },
  { name: "Land title and ownership", weight: "14%" },
  { name: "Strata and development sales", weight: "14%" },
  { name: "Mortgage finance", weight: "12%" },
  { name: "Trust accounts and records", weight: "10%" },
  { name: "Valuation and measurement", weight: "10%" },
];

export default function BcRealEstateLandingPage() {
  return (
    <div data-theme="bcrealestate" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free BC Real Estate Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/bc-real-estate-exam/dashboard"
            shortName="BC real estate exam"
            subtitle="200 BC real estate licensing questions. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/bcrealestate-mobile.png", desktop: "/landing/bcrealestate-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="bcrealestate" />

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
                Four training sets cover licensing and agency duties; contracts and trust accounts; land title and strata; and mortgages and valuation. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each covering every topic. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the Law the Exam Tests
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                UBC Sauder and BCFSA publish no chapter list or weights for this exam, so the split here is Tigertest&apos;s: every practice test spreads its 50 questions across eight topics, with the most on agency duties and disclosure. The legal questions are written from BC Laws consolidations of the Real Estate Services Act and Rules, the Property Law Act, the Land Title Act, the Strata Property Act and the Real Estate Development Marketing Act as they stand in November 2026.
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
                src={getTigerAsset("bcrealestate", 3)}
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
            How to Pass the BC Real Estate Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the agency duties cold</h3>
              <p>
                Learn what a licensee owes a client, when the representation disclosure is needed, how designated agency works, why dual agency is restricted, and which disclosures must be in writing and separate from the contract.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers the law fixes</h3>
              <p>
                Know the licence term, the three business day home buyer rescission period and the seven day period for new developments, the 3/4 and 80% strata votes, the one week for an Information Certificate and the seven years that records must be kept.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the arithmetic</h3>
              <p>
                Work loan-to-value, debt service ratios, simple and semi-annual interest, capitalization of income and the cost approach by hand until each takes under a minute, then check with a financial calculator.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 70% or better on every practice test before you book the exam. After each test, drill the questions you missed and retrain the weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          BC Real Estate Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="bcrealestate" />

      <ExamRelatedTests examId="bcrealestate" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the BC Real Estate Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every topic of the BC trading services exam.</p>
          <ExamLandingCTA dashboardHref="/bc-real-estate-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}

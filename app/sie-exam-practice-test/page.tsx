import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "SIE Exam Practice Test 2026 - Free FINRA SIE Questions";
const metaDescription =
  "Free SIE exam practice: 200 original questions on the FINRA content outline, four 50-question mock tests with a 70% pass line, every answer explained.";
const description =
  "Free practice for the FINRA Securities Industry Essentials (SIE) exam: 200 original questions written from FINRA's SIE content outline. Four 50-question mock tests weighted like the real exam, with a 70% pass line, and five training sets covering capital markets, equity and debt securities, funds and options, trading and settlement, and customer accounts, prohibited activities and regulation.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "sie exam practice test, sie practice exam, finra sie exam, securities industry essentials practice test, sie exam questions, free sie practice test, sie exam 2026",
  alternates: {
    canonical: `${siteUrl}/sie-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/sie-exam-practice-test`,
    images: [{ url: shareImageUrl("sie"), width: 1200, height: 630, alt: "Tigertest free SIE exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sie")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the SIE exam?",
    a: "The Securities Industry Essentials exam is FINRA's entry-level test of basic securities knowledge: how markets work, the main products and their risks, trading and customer accounts, prohibited practices and the regulators. Anyone 18 or older can take it, with no firm sponsorship, and it is a corequisite for representative registrations such as the Series 6 and Series 7.",
  },
  {
    q: "How many questions are on the SIE and what score do I need?",
    a: "The SIE has 75 scored multiple-choice questions plus a few unscored pretest questions, with 1 hour and 45 minutes to finish. The passing score is 70. Each mock test here has 50 questions with a 70% pass line, weighted like the real exam.",
  },
  {
    q: "What topics does the SIE cover?",
    a: "FINRA's content outline has four sections: Knowledge of Capital Markets (16%, 12 questions), Understanding Products and Their Risks (44%, 33 questions), Understanding Trading, Customer Accounts and Prohibited Activities (31%, 23 questions) and Overview of the Regulatory Framework (9%, 7 questions). Products is the biggest section, so it gets the most questions here.",
  },
  {
    q: "How long is a passing SIE result valid?",
    a: "A passing SIE result is valid for four years. To register as a representative you also need to be associated with a FINRA member firm and pass the matching top-off exam, such as the Series 7 for a general securities representative, while your SIE result is still valid.",
  },
  {
    q: "Are these the real SIE exam questions?",
    a: "No. Every question is original, written by Tigertest from FINRA's published SIE content outline and the rules it covers. It is free practice, not an official FINRA exam, and it does not register you for or replace the SIE.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SIE Exam Practice Test",
      description,
      url: `${siteUrl}/sie-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 SIE practice questions",
        "4 mock tests of 50 questions with a 70% pass line",
        "5 training sets by content outline section",
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
  { name: "Knowledge of Capital Markets", weight: "16%" },
  { name: "Understanding Products and Their Risks", weight: "44%" },
  { name: "Trading, Customer Accounts and Prohibited Activities", weight: "31%" },
  { name: "Overview of the Regulatory Framework", weight: "9%" },
];

export default function SieLandingPage() {
  return (
    <div data-theme="sie" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SIE Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/sie/dashboard"
            shortName="SIE"
            subtitle="200 original questions on FINRA's Securities Industry Essentials outline: markets, products and risks, trading and accounts, and regulation. Four 50-question mock tests with a 70% pass line. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sie-mobile.png", desktop: "/landing/sie-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sie" />

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
                Five training sets follow the outline: capital markets; stocks and bonds; funds, annuities and options; trading and settlement; and accounts, prohibited activities and regulation. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions, each weighted like FINRA&apos;s outline and needing 70% to pass. No question appears in more than one test, and every one comes with an explanation.
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
                FINRA publishes how many of the 75 scored questions come from each section. Every mock test here keeps the same balance, so products and their risks, the largest section, get the most questions.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("sie", 1)}
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
            How to Pass the SIE Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Spend most of your time on products</h3>
              <p>
                Products and their risks are 44% of the exam. Know how stocks, preferred stock, bonds, munis, money market instruments, mutual funds, ETFs, annuities, 529 plans, partnerships and options work, and which risks each one carries.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the inverse relationships</h3>
              <p>
                Many questions turn on one idea: bond prices move opposite to interest rates. Practice the yield order for discount and premium bonds, and the breakeven and maximum loss for buying calls and puts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Match each rule to its regulator</h3>
              <p>
                Keep a short list: the 1933 Act for new issues, the 1934 Act and the SEC for trading, the Federal Reserve for Regulation T margin, the MSRB for municipal rules, FINRA for its members, and the states for blue-sky laws.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80% or more on every mock test before you book. After each test, drill the questions you missed and retrain the weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SIE Exam Frequently Asked Questions
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

      <ExamRelatedTests examId="sie" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the SIE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every section of the outline.</p>
          <ExamLandingCTA dashboardHref="/sie/dashboard" />
        </div>
      </div>
    </div>
  );
}

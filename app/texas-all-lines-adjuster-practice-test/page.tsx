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

const title = "Texas Adjuster Practice Test 2026 - Free All-Lines Adjuster Exam Questions";
const metaDescription =
  "Free Texas all-lines adjuster practice: 200 original questions on the Pearson VUE outline effective September 2026, four 50-question mock tests weighted like the real exam, every answer explained.";
const description =
  "Free practice for the Texas All-Lines Adjuster license exam given by Pearson VUE for the Texas Department of Insurance: 200 original questions written from the content outline effective September 1, 2026. Four 50-question mock tests weighted like the real 150-question exam, and five training sets covering the Standard Fire Policy and homeowners, auto, commercial and marine lines, valuation and loss settlement, contracts and liability, and Texas licensing, claims practices and workers' compensation.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "texas adjuster practice test, texas all lines adjuster exam, texas adjuster license exam questions, pearson vue texas adjuster, all lines adjuster practice test, texas claims adjuster test, designated home state adjuster, texas adjuster practice test 2026",
  alternates: {
    canonical: `${siteUrl}/texas-all-lines-adjuster-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/texas-all-lines-adjuster-practice-test`,
    images: [{ url: shareImageUrl("txadjuster"), width: 1200, height: 630, alt: "Tigertest free Texas all-lines adjuster practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("txadjuster")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Texas all-lines adjuster exam?",
    a: "It is the licensing exam the Texas Department of Insurance (TDI) requires for the all-lines adjuster license, which covers property, casualty and workers' compensation claims. Pearson VUE gives it in English or Spanish. Many adjusters who live in states that do not license adjusters take it to get a Texas designated home state license.",
  },
  {
    q: "How many questions are on the Texas adjuster exam and what score do you need?",
    a: "The exam has 150 scored multiple-choice questions and you have 150 minutes. Pearson VUE reports a scaled score from 0 to 100, and 70 is passing; the scaled score is not the percent you got right. Each mock test here has 50 questions in the same proportions and uses 70 percent as its pass line.",
  },
  {
    q: "What does the Texas all-lines adjuster exam cover?",
    a: "The Pearson VUE outline effective September 1, 2026 has three parts: general property and casualty product knowledge for adjusters (40%), insurance terms and related concepts (40%), and Texas statutes and rules for adjusting (20%). The Texas part covers adjuster licensing, the Commissioner, prompt payment and unfair claim settlement practices, prohibited conduct and workers' compensation.",
  },
  {
    q: "Do I have to take the Texas adjuster exam to get licensed?",
    a: "Not always. TDI waives the exam if you completed a TDI-approved adjuster course within the 12 months before you apply, hold the CPCU or AIC designation, or hold a license in good standing in a reciprocal state. If you take the exam, you must apply for the license through Sircon within 12 months of passing.",
  },
  {
    q: "Are these the real Texas adjuster exam questions?",
    a: "No. Every question is original, written by Tigertest from the published Pearson VUE content outline, the standard policy forms and current Texas law, such as the prompt payment of claims statute and the Labor Code. It is free practice, not affiliated with the Texas Department of Insurance or Pearson VUE, and it does not replace an approved pre-licensing course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Texas All-Lines Adjuster Practice Test",
      description,
      url: `${siteUrl}/texas-all-lines-adjuster-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 Texas all-lines adjuster practice questions",
        "4 mock tests of 50 questions weighted like the real exam",
        "5 training sets by topic",
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
  { name: "General P&C product knowledge for adjusters", weight: "40%" },
  { name: "Insurance terms and related concepts", weight: "40%" },
  { name: "Texas statutes and rules for adjusting", weight: "20%" },
];

export default function TxAdjusterLandingPage() {
  return (
    <div data-theme="txadjuster" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Texas Adjuster Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/texas-adjuster/dashboard"
            shortName="TX Adjuster"
            subtitle="200 original questions on the Pearson VUE all-lines adjuster outline: the Standard Fire Policy, homeowners, auto, commercial and marine lines, loss settlement math, contracts and liability, and Texas claims law and workers' comp. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/txadjuster-mobile.png", desktop: "/landing/txadjuster-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="txadjuster" />

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
                Five training sets: the fire policy and homeowners; auto, commercial and marine; valuation and loss settlement; contracts, perils and liability; and Texas law, claims practices and workers&apos; comp. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions in the real exam&apos;s proportions, each with a 70% pass line. No question appears in more than one test, and every coinsurance, depreciation and benefit calculation is worked through.
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
                Built on the Pearson VUE Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real exam has 150 scored questions in three parts. Each mock test here keeps the same balance: 20 product knowledge, 20 terms and concepts, and 10 Texas law questions in every 50.
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
                src={getTigerAsset("txadjuster", 1)}
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
            How to Pass the Texas Adjuster Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the fire policy clock</h3>
              <p>
                The Standard Fire Policy runs on deadlines: 60 days for the sworn proof of loss, 20 days to name an appraiser and 15 to agree on an umpire, 30 days for the insurer to elect to repair, and payment 60 days after proof. Learn them as one timeline.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Work the settlement math by hand</h3>
              <p>
                Expect actual cash value from age and life, coinsurance with a deductible, percentage wind and hail deductibles figured on the dwelling limit, pro rata and excess other insurance, and salvage the insured keeps. Write each formula once, then practice it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the Texas prompt payment steps</h3>
              <p>
                Acknowledge and start investigating within 15 days, decide within 15 business days of getting everything needed (30 days if arson is suspected), take up to 45 more days with notice, and pay within five business days. Late payment costs the claim plus interest and attorney&apos;s fees.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep workers&apos; comp numbers straight</h3>
              <p>
                Income benefits start on the eighth day and go back to day one after two weeks, temporary benefits are 70% of the wage loss, impairment benefits run three weeks per point, and death benefits are 75%. Aim for 85% or better on every mock test before you sit the real one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Texas Adjuster Exam Frequently Asked Questions
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

      <ExamRelatedTests examId="txadjuster" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Texas Adjuster Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of the all-lines adjuster outline.</p>
          <ExamLandingCTA dashboardHref="/texas-adjuster/dashboard" />
        </div>
      </div>
    </div>
  );
}

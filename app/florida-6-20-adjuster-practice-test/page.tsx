import "@/lib/banks/fladjuster";
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

const title = "Florida 6-20 Adjuster Practice Test 2026 - Free All-Lines Adjuster Exam Questions";
const metaDescription =
  "Free Florida 6-20 all-lines adjuster practice: 200 original questions on the content outline effective January 1, 2026, four 50-question mock tests weighted like the real exam, every answer explained.";
const description =
  "Free practice for the Florida All-Lines Adjuster license exam (the 6-20 exam) given by Pearson VUE for the Florida Department of Financial Services: 200 original questions written from the examination content outline effective January 1, 2026. Four 50-question mock tests weighted like the real 100-question exam, and seven training sets covering insurance concepts and adjusting practices, auto liability, Florida PIP and physical damage, liability and Florida workers' compensation, homeowners, dwelling, flood and hurricane deductibles, commercial property and marine, Citizens and the residual markets, and Florida adjuster licensing, ethics and claims law.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "florida 6-20 practice test, florida all lines adjuster exam, 6-20 adjuster license exam questions, florida adjuster practice test, pearson vue florida adjuster, florida claims adjuster test, 7-20 adjuster, 70-20 designated home state adjuster, florida adjuster practice test 2026",
  alternates: {
    canonical: `${siteUrl}/florida-6-20-adjuster-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/florida-6-20-adjuster-practice-test`,
    images: [{ url: shareImageUrl("fladjuster"), width: 1200, height: 630, alt: "Tigertest free Florida 6-20 all-lines adjuster practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("fladjuster")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Florida 6-20 adjuster exam?",
    a: "It is the Florida All-Lines Adjuster exam, the licensing exam the Florida Department of Financial Services (DFS) requires for the all-lines adjuster license, which covers every line of insurance except life and annuities. The same exam serves the resident 6-20 license and the nonresident 7-20 and 70-20 (designated home state) licenses. Pearson VUE delivers it at test centers.",
  },
  {
    q: "How many questions are on the Florida all-lines adjuster exam and what score do you need?",
    a: "The exam has 100 scored questions plus 10 unscored pretest questions, and you have 2 hours. The passing score is 70 percent, figured as the share of questions you answer correctly. A passing score is valid for one year, and you may take the same exam up to five times in a 12-month period. Each mock test here has 50 questions in the same proportions and uses 70 percent as its pass line.",
  },
  {
    q: "What does the Florida 6-20 exam cover?",
    a: "The content outline effective January 1, 2026 has seven parts: property and liability concepts, contracts and adjusting practices (14%), casualty and liability insurance including auto, Florida no-fault PIP, general liability and workers' compensation (28%), fire and allied lines including dwelling, homeowners, commercial property, flood and marine (28%), motor vehicle physical damage and mechanical breakdown (15%), health insurance (2%), residual markets such as Citizens (2%) and selected Florida statutes and rules (11%).",
  },
  {
    q: "Do I have to take the Florida adjuster exam to get licensed?",
    a: "Not always. Florida waives the exam for applicants who hold certain designations, including the AIC and CPCU and several other DFS-approved adjuster designations, and for some applicants moving to Florida with a comparable license held for at least a year. Check the current list with the Florida Department of Financial Services before you choose a route.",
  },
  {
    q: "Are these the real Florida 6-20 exam questions?",
    a: "No. Every question is original, written by Tigertest from the published content outline, the standard policy forms and current Florida law, such as the property claim handling statute, the PIP statute and the workers' compensation law. It is free practice, not affiliated with the Florida Department of Financial Services or Pearson VUE, and it does not replace an approved pre-licensing course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Florida 6-20 All-Lines Adjuster Practice Test",
      description,
      url: `${siteUrl}/florida-6-20-adjuster-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("fladjuster"),
      featureList: [
        "200 Florida all-lines adjuster practice questions",
        "4 mock tests of 50 questions weighted like the real exam",
        "7 training sets by topic",
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
  { name: "Concepts, contracts and adjusting practices", weight: "14%" },
  { name: "Casualty and liability insurance", weight: "28%" },
  { name: "Fire and allied lines, marine and dwelling", weight: "28%" },
  { name: "Motor vehicle physical damage and mechanical breakdown", weight: "15%" },
  { name: "Health insurance", weight: "2%" },
  { name: "Residual markets", weight: "2%" },
  { name: "Selected Florida statutes and rules", weight: "11%" },
];

export default function FlAdjusterLandingPage() {
  return (
    <div data-theme="fladjuster" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Florida 6-20 Adjuster Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/florida-adjuster/dashboard"
            shortName="FL 6-20 Adjuster"
            subtitle="200 original questions on the Florida all-lines adjuster outline: PIP and auto, liability and workers' comp, homeowners, hurricane deductibles and flood, commercial and marine lines, Citizens, and Florida claims law and ethics. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/fladjuster-mobile.png", desktop: "/landing/fladjuster-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="fladjuster" />

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
                Seven training sets: concepts and adjusting; auto liability and Florida PIP; physical damage and mechanical breakdown; liability, workers&apos; comp and residual markets; homeowners, dwelling and flood; commercial property and marine; and Florida licensing and ethics. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions in the real exam&apos;s proportions, each with a 70% pass line. No question appears in more than one test, and every coinsurance and hurricane deductible calculation is worked through.
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
                Built on the Florida Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real exam has 100 scored questions in seven parts. Each mock test here keeps the same balance: 7 concepts and adjusting, 14 casualty and liability, 14 property and marine, 7 physical damage, 2 health and residual market, and 6 Florida law questions in every 50.
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
                src={getTigerAsset("fladjuster", 1)}
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
            How to Pass the Florida 6-20 Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the Florida claim clock</h3>
              <p>
                Residential property claims run on statute: acknowledge within 7 days, start investigating within 7 days of the proof of loss, inspect within 30 days, send any detailed estimate within 7 days, and pay or deny within 60 days. New claims must be reported within 1 year and supplemental claims within 18 months.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know PIP and workers&apos; comp by the numbers</h3>
              <p>
                Florida PIP pays 80% of medical bills and 60% of lost income, needs initial care within 14 days, and is overdue after 30 days. Workers&apos; comp has a 7-day waiting period that pays back after 21 days, 66 2/3% temporary total benefits, and 4 employees (1 in construction) before coverage is required.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Work hurricane deductibles and coinsurance by hand</h3>
              <p>
                A percentage hurricane deductible is figured on the dwelling limit, not the loss, and a hurricane runs from the first warning to 72 hours after the last watch or warning. Practice coinsurance, the homeowners 80% replacement cost rule and Florida&apos;s actual-cash-value-first payment on replacement cost claims.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read the code of ethics as a list of don&apos;ts</h3>
              <p>
                Do not steer claimants to firms you profit from, negotiate with a represented third party without the lawyer&apos;s consent, discourage anyone from hiring a lawyer or public adjuster, or take statements from someone in shock. Aim for 85% or better on every mock test before you sit the real one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Florida 6-20 Adjuster Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="fladjuster" />

      <ExamRelatedTests examId="fladjuster" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Florida 6-20 Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every part of the Florida all-lines adjuster outline.</p>
          <ExamLandingCTA dashboardHref="/florida-adjuster/dashboard" />
        </div>
      </div>
    </div>
  );
}

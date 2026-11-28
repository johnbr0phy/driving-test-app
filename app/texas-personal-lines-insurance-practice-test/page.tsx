import "@/lib/banks/txpersonal";
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

const title = "Free Texas Personal Lines Insurance Practice Test 2026";
const metaDescription =
  "Prepare for the Texas Personal Lines Property and Casualty Agent exam with 200 questions on home and auto policies, insurance contracts and Texas law.";
const description =
  "Prepare for the Texas Personal Lines Property and Casualty Agent exam with 200 questions on home and auto policies, insurance contracts and Texas law.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Texas personal lines insurance practice test, personal lines property and casualty agent exam, InsTX-PersPC55, Texas personal auto insurance licensing questions",
  alternates: {
    canonical: `${siteUrl}/texas-personal-lines-insurance-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/texas-personal-lines-insurance-practice-test`,
    images: [{ url: shareImageUrl("txpersonal"), width: 1200, height: 630, alt: "Texas Personal Lines Insurance practice questions" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("txpersonal")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest Texas Personal Lines Insurance Practice Test",
      description,
      url: `${siteUrl}/texas-personal-lines-insurance-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("txpersonal", "USD"),
      featureList: ["200 original questions", "Four 50-question practice tests", "Four topic sets", "Answer explanations"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which Texas insurance license does this cover?",
          acceptedAnswer: { "@type": "Answer", text: "It covers the Texas Personal Lines Property and Casualty Agent license. Study personal auto, homeowners and other policies written for individuals and families." },
        },
        {
          "@type": "Question",
          name: "How long is the Texas Personal Lines exam?",
          acceptedAnswer: { "@type": "Answer", text: "Pearson VUE allows 120 minutes for 100 scored questions and 10 unscored questions. The scored questions cover general insurance knowledge and Texas law." },
        },
        {
          "@type": "Question",
          name: "How is the official exam scored?",
          acceptedAnswer: { "@type": "Answer", text: "Pearson VUE reports a scaled score, with 70 required to pass. An official scaled score cannot be calculated directly from a Tigertest practice percentage." },
        },
        {
          "@type": "Question",
          name: "How much Texas law appears on a practice test?",
          acceptedAnswer: { "@type": "Answer", text: "Each practice test includes 12 Texas law questions. On the official exam, Texas law accounts for 25 of the 100 scored questions." },
        },
        {
          "@type": "Question",
          name: "Can I start for free?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. The first two practice tests and first two topic sets are free. Premium unlocks the rest and full statistics." },
        },
        classFaqJsonLd("txpersonal"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Property Policies", weight: "10%" },
  { name: "Casualty Policies", weight: "14%" },
  { name: "Insurance Terms and Concepts", weight: "28%" },
  { name: "Policy Provisions and Contract Law", weight: "24%" },
  { name: "Texas Laws Common to All Lines", weight: "14%" },
  { name: "Texas Personal Lines Rules", weight: "10%" },
];

export default function TxpersonalLandingPage() {
  return (
    <div data-theme="txpersonal" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Texas Personal Lines Insurance Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/txpersonal/dashboard"
            shortName="Texas Personal Lines Insurance"
            subtitle="Practice homeowners coverage, personal auto insurance and Texas licensing law with 200 original questions. Free to start, no account needed."
            shots={{ mobile: "/landing/txpersonal-mobile.png", desktop: "/landing/txpersonal-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="txpersonal" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose a topic, answer questions and read the explanation after each answer. Your missed questions are saved for another try.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each practice test mixes 38 general insurance questions with 12 on Texas law. The practice target is 35 correct out of 50.
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
                What Each Texas Personal Lines Practice Test Covers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each 50-question practice test follows the six areas in the Texas outline, rounded to whole questions.
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
                src={getTigerAsset("txpersonal", 1)}
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
            How to Study for Texas Personal Lines
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Identify the policy first</h3>
              <p>
                A renter, a homeowner and a condo owner can lose belongings in the same fire. Identify who owns the building before choosing which policy responds.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Separate a peril from a loss</h3>
              <p>
                Read the sequence of events. Identify what caused the damage, what property was affected and how the policy values that property.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the contract in order</h3>
              <p>
                Find the coverage grant, then check for an exclusion or an endorsement that changes it. Use the declarations to check limits and deductibles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Separate general rules from Texas law</h3>
              <p>
                When you miss a Texas question, note who had the duty, what triggered it and when action was due. Revisit that topic before your next practice test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Texas Personal Lines Exam Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which Texas insurance license does this cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It covers the Texas Personal Lines Property and Casualty Agent license. Study personal auto, homeowners and other policies written for individuals and families.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long is the Texas Personal Lines exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Pearson VUE allows 120 minutes for 100 scored questions and 10 unscored questions. The scored questions cover general insurance knowledge and Texas law.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is the official exam scored?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Pearson VUE reports a scaled score, with 70 required to pass. An official scaled score cannot be calculated directly from a Tigertest practice percentage.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How much Texas law appears on a practice test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each practice test includes 12 Texas law questions. On the official exam, Texas law accounts for 25 of the 100 scored questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I start for free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. The first two practice tests and first two topic sets are free. Premium unlocks the rest and full statistics.
            </p>
          </div>
          <ExamClassFaq examId="txpersonal" />
        </div>
      </div>

      <ExamSampleQuestions examId="txpersonal" />

      <ExamRelatedTests examId="txpersonal" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Try Your First Texas Personal Lines Practice Test</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with Property and Casualty Policies or take a mixed 50-question test.</p>
          <ExamLandingCTA dashboardHref="/txpersonal/dashboard" />
        </div>
      </div>
    </div>
  );
}

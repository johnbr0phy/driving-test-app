import "@/lib/banks/realestatebroker";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

const title = "Free Real Estate Broker Practice Test 2026 - National Portion";
const metaDescription =
  "US real estate broker national practice: 200 original questions on property, agency, valuation, brokerage, disclosures and finance. Free to start.";
const description =
  "Independent practice covering selected Pearson VUE national broker topics, with 200 original explained questions, four training sets and four shorter tests. State-law preparation is separate. Free to start.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "real estate broker practice test, national broker exam, Pearson VUE broker exam, broker license practice questions, managing broker exam prep 2026",
  alternates: {
    canonical: `${siteUrl}/real-estate-broker-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/real-estate-broker-practice-test`,
    images: [{ url: shareImageUrl("realestatebroker"), width: 1200, height: 630, alt: "Tigertest free real estate broker practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("realestatebroker")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Real Estate Broker Practice Tests",
      description,
      url: `${siteUrl}/real-estate-broker-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("realestatebroker"),
      featureList: [
        "200 national broker practice questions",
        "4 shorter practice tests across eight national topics",
        "4 training sets by topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What passing score should I use for national broker practice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tigertest uses 70 percent as a study target. Licensing jurisdictions set their own passing and scoring requirements, so this is not a universal national broker cut score. Check your board and current candidate handbook for the required national and state results.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the national broker exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Pearson VUE National/General Broker outline used here specifies 80 scored questions and 5 pretest questions. These practice tests contain 50 questions each, with editorial rounding of the topic proportions. Check your jurisdiction for time limits, state questions and current delivery arrangements.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does this broker practice cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eight topics from the Pearson VUE outline: real property characteristics, ownership and title, valuation, contracts and agency, real estate practice, property disclosures and environmental issues, financing and settlement, and real estate calculations. Broker operations include management agreements, trust records and federal compliance.",
          },
        },
        {
          "@type": "Question",
          name: "Does this prepare me for the state-law portion?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. State agency rules, trust-account deadlines, licensing requirements and state-specific contracts require separate study. This bank focuses on national concepts, federal rules and expressly stated transaction terms. It does not combine different state rules into a national standard.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the same as a PSI broker exam or an official question bank?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. This independent bank follows the Pearson VUE national broker outline and contains original questions. It is not an official exam, a PSI scenario simulation or a guarantee of passing. Free practice starts without an account; Premium unlocks later steps.",
          },
        },
        classFaqJsonLd("realestatebroker"),
      ],
    },
  ],
};

const contentAreas = [
  {
    "name": "Real Property Characteristics",
    "weight": "12%"
  },
  {
    "name": "Ownership, Title & Conveyance",
    "weight": "10%"
  },
  {
    "name": "Valuation & Appraisal",
    "weight": "12%"
  },
  {
    "name": "Contracts & Agency",
    "weight": "18%"
  },
  {
    "name": "Real Estate Practice",
    "weight": "16%"
  },
  {
    "name": "Disclosures & Environmental Issues",
    "weight": "12%"
  },
  {
    "name": "Financing & Settlement",
    "weight": "10%"
  },
  {
    "name": "Real Estate Calculations",
    "weight": "10%"
  }
];

export default function RealEstateBrokerLandingPage() {
  return (
    <div data-theme="realestatebroker" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Real Estate Broker Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/real-estate-broker/dashboard"
            shortName="Real Estate Broker"
            subtitle="200 national real estate broker questions. State law is separate. Free to start, no account needed."
            shots={{ mobile: "/landing/realestatebroker-mobile.png", desktop: "/landing/realestatebroker-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="realestatebroker" />

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
                Four training sets move from Property &amp; Title through Financing &amp; Calculations. Master a topic, then take a test. Questions you miss return for more practice.
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
                Four 50-question tests cover selected national topics, with major-category counts rounded from the Pearson VUE outline. Every item has an explanation. The 70 percent practice target does not replace your jurisdiction’s passing requirements.
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
                Built on the National Broker Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Pearson VUE allocates 80 scored national broker questions across eight topics. The weights below describe these shorter practice tests, rounded to 50 items. Contracts and agency have the largest share. Broker licensing courses can assign practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and review topic-level progress. Prepare separately for state law and confirm your vendor and jurisdiction requirements.
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
                src={getTigerAsset("realestatebroker", 1)}
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
            How to Study for the National Broker Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Distinguish the legal relationships</h3>
              <p>
                Compare ownership interests, deed functions, contract remedies and agency authority. Identify who holds the right, what the agreement authorizes and which facts would change the result.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice broker operations</h3>
              <p>
                Review listing and management agreements alongside beneficiary ledgers, reconciliation and federal compliance. For each transaction, distinguish the client’s money, the brokerage’s compensation and the authority for any disbursement.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Show your calculation steps</h3>
              <p>
                Write the units and the base for each percentage. Keep monthly and annual rent consistent, distinguish NOI from cash after debt service, and use the stated day-count convention for prorations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Review explanations and state requirements</h3>
              <p>
                Use missed questions to identify gaps, then revisit the corresponding training topic. Check the current vendor handbook and your licensing board for state content, timing and passing requirements before scheduling.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          National Broker Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What passing score should I use for national broker practice?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tigertest uses 70 percent as a study target. Licensing jurisdictions set their own passing and scoring requirements, so this is not a universal national broker cut score. Check your board and current candidate handbook for the required national and state results.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the national broker exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Pearson VUE National/General Broker outline used here specifies 80 scored questions and 5 pretest questions. These practice tests contain 50 questions each, with editorial rounding of the topic proportions. Check your jurisdiction for time limits, state questions and current delivery arrangements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What topics does this broker practice cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Eight topics from the Pearson VUE outline: real property characteristics, ownership and title, valuation, contracts and agency, real estate practice, property disclosures and environmental issues, financing and settlement, and real estate calculations. Broker operations include management agreements, trust records and federal compliance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this prepare me for the state-law portion?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. State agency rules, trust-account deadlines, licensing requirements and state-specific contracts require separate study. This bank focuses on national concepts, federal rules and expressly stated transaction terms. It does not combine different state rules into a national standard.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the same as a PSI broker exam or an official question bank?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. This independent bank follows the Pearson VUE national broker outline and contains original questions. It is not an official exam, a PSI scenario simulation or a guarantee of passing. Free practice starts without an account; Premium unlocks later steps.
            </p>
          </div>
          <ExamClassFaq examId="realestatebroker" />
        </div>
      </div>

      <ExamSampleQuestions examId="realestatebroker" />

      <ExamRelatedTests examId="realestatebroker" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practice National Broker Topics?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 original questions across eight national topics.</p>
          <ExamLandingCTA dashboardHref="/real-estate-broker/dashboard" />
        </div>
      </div>
    </div>
  );
}

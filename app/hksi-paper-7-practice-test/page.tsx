import "@/lib/banks/hklesfi7";
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

const title = "Free HKSI LE Paper 7 Practice Test 2026";
const metaDescription =
  "Prepare for HKSI LE Paper 7 Financial Markets with 200 original questions on Hong Kong markets, securities, derivatives and risk. Each answer has an explanation.";
const description =
  "Prepare for HKSI LE Paper 7 Financial Markets with 200 original questions on Hong Kong markets, securities, derivatives and risk. Each answer has an explanation.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "HKSI Paper 7 practice test, LE Paper 7 Financial Markets, Hong Kong licensing examination P7, HKSI mock questions",
  alternates: {
    canonical: `${siteUrl}/hksi-paper-7-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hksi-paper-7-practice-test`,
    images: [{ url: shareImageUrl("hklesfi7"), width: 1200, height: 630, alt: "Tigertest HKSI Paper 7 financial markets questions" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hklesfi7")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest HKSI LE Paper 7 Practice Test",
      description,
      url: `${siteUrl}/hksi-paper-7-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hklesfi7", "HKD"),
      featureList: ["200 original financial markets questions", "Four 50-question practice tests in English", "Five topic sets", "Answer explanations"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is HKSI LE Paper 7?",
          acceptedAnswer: { "@type": "Answer", text: "Financial Markets is a practical paper in the Hong Kong Securities and Investment Institute licensing examination. Its seven topics cover global and Hong Kong financial systems, equity, debt, foreign exchange and derivatives, risk management and financial sector applications." },
        },
        {
          "@type": "Question",
          name: "How is Paper 7 assessed?",
          acceptedAnswer: { "@type": "Answer", text: "The computer-based exam has 60 multiple-choice questions in 90 minutes and a 70% pass mark. HKSI provides the questions in English and Traditional Chinese." },
        },
        {
          "@type": "Question",
          name: "How does a Tigertest practice test compare?",
          acceptedAnswer: { "@type": "Answer", text: "Each practice test contains 50 questions in English, with a 70% target of 35 correct answers. The topic mix is a Tigertest allocation across the seven syllabus topics." },
        },
        {
          "@type": "Question",
          name: "Which study guide applies to my sitting?",
          acceptedAnswer: { "@type": "Answer", text: "HKSI study guide version 3.6 applies to Paper 7 sittings through 8 December 2026. HKSI begins examining version 3.7 on 9 December 2026." },
        },
        {
          "@type": "Question",
          name: "Can I practise one topic at a time?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. The five training sets let you focus on financial systems, equities, debt, derivatives and risk, or financial sector applications before attempting a mixed test." },
        },
        classFaqJsonLd("hklesfi7"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Global Financial System", weight: "12%" },
  { name: "Hong Kong Financial System", weight: "14%" },
  { name: "Equity Market", weight: "16%" },
  { name: "Debt Market", weight: "16%" },
  { name: "Foreign Exchange and Derivatives", weight: "16%" },
  { name: "Financial Risk Management", weight: "14%" },
  { name: "Financial Sector Applications", weight: "12%" },
];

export default function Hklesfi7LandingPage() {
  return (
    <div data-theme="hklesfi7" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free HKSI LE Paper 7 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hksi-paper-7/dashboard"
            shortName="HKSI LE Paper 7"
            subtitle="Practise equity, debt, derivatives and Hong Kong financial markets with 200 original questions in English. Free to start, no account needed."
            shots={{ mobile: "/landing/hklesfi7-mobile.png", desktop: "/landing/hklesfi7-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hklesfi7" />

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
                Study the financial systems first, then work through equities, debt, derivatives, risk and financial sector applications. Review the explanation after each answer.
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
                Each mixed practice test has 50 questions. Answer at least 35 correctly to meet the 70% target.
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
                What Each Financial Markets Practice Test Covers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The March 2026 HKSI syllabus sets out seven topics. The percentages below show how Tigertest divides its 50 questions among those topics on each practice test.
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
                src={getTigerAsset("hklesfi7", 1)}
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
            How to Study for Paper 7
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Follow a transaction</h3>
              <p>
                For a market scenario, identify the issuer, investor and intermediary. Track who receives the cash and who takes on the obligation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Draw the cash flows</h3>
              <p>
                Put coupon and principal payments on a timeline. Distinguish the bond&apos;s stated payments from the return at its current price.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Write down each currency</h3>
              <p>
                Mark the base and quote currencies before you calculate. Check the units on your answer before you compare it with the options.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Identify the exposure</h3>
              <p>
                List what can change before choosing a hedge. The direction of a price or rate movement matters as much as the instrument named in the question.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          HKSI Paper 7 Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is HKSI LE Paper 7?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Financial Markets is a practical paper in the Hong Kong Securities and Investment Institute licensing examination. Its seven topics cover global and Hong Kong financial systems, equity, debt, foreign exchange and derivatives, risk management and financial sector applications.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is Paper 7 assessed?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The computer-based exam has 60 multiple-choice questions in 90 minutes and a 70% pass mark. HKSI provides the questions in English and Traditional Chinese.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How does a Tigertest practice test compare?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each practice test contains 50 questions in English, with a 70% target of 35 correct answers. The topic mix is a Tigertest allocation across the seven syllabus topics.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which study guide applies to my sitting?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              HKSI study guide version 3.6 applies to Paper 7 sittings through 8 December 2026. HKSI begins examining version 3.7 on 9 December 2026.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I practise one topic at a time?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. The five training sets let you focus on financial systems, equities, debt, derivatives and risk, or financial sector applications before attempting a mixed test.
            </p>
          </div>
          <ExamClassFaq examId="hklesfi7" />
        </div>
      </div>

      <ExamSampleQuestions examId="hklesfi7" />

      <ExamRelatedTests examId="hklesfi7" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Try Your First HKSI Paper 7 Practice Test</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with Financial Systems or open a 50-question practice test.</p>
          <ExamLandingCTA dashboardHref="/hksi-paper-7/dashboard" />
        </div>
      </div>
    </div>
  );
}

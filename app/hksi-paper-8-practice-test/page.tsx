import "@/lib/banks/hklesfi8";
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

const title = "Free HKSI LE Paper 8 Practice Test 2026";
const metaDescription =
  "Revise for HKSI LE Paper 8 Securities with 200 original questions on Hong Kong markets, traded products, dealing, settlement and securities analysis.";
const description =
  "Revise for HKSI LE Paper 8 Securities with 200 original questions on Hong Kong markets, traded products, dealing, settlement and securities analysis.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "HKSI LE Paper 8 practice test, Hong Kong securities examination, P8 mock questions, HKSI securities practice, LE8 securities analysis",
  alternates: {
    canonical: `${siteUrl}/hksi-paper-8-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hksi-paper-8-practice-test`,
    images: [{ url: shareImageUrl("hklesfi8"), width: 1200, height: 630, alt: "Tigertest HKSI Paper 8 securities questions" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hklesfi8")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest HKSI LE Paper 8 Practice Test",
      description,
      url: `${siteUrl}/hksi-paper-8-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hklesfi8", "HKD"),
      featureList: ["200 original securities questions", "Four 50-question tests in English", "Five topic sets", "Answer explanations"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does HKSI Paper 8 cover?",
          acceptedAnswer: { "@type": "Answer", text: "Securities investments, primary and secondary markets, market participants, securities products, administration and securities analysis make up the six syllabus topics." },
        },
        {
          "@type": "Question",
          name: "How many questions are on Paper 8?",
          acceptedAnswer: { "@type": "Answer", text: "HKSI gives candidates 60 minutes for 40 multiple-choice questions. Questions are presented in English and Traditional Chinese." },
        },
        {
          "@type": "Question",
          name: "How does scoring work?",
          acceptedAnswer: { "@type": "Answer", text: "The official pass mark is 70%, equivalent to 28 out of 40. A Tigertest practice test has 50 questions, so the target here is 35 correct answers." },
        },
        {
          "@type": "Question",
          name: "Which study guide applies to Paper 8?",
          acceptedAnswer: { "@type": "Answer", text: "Version 3.6 applies to sittings through 8 December 2026. HKSI begins examining version 3.7 on 9 December 2026." },
        },
        {
          "@type": "Question",
          name: "How do I practise securities analysis?",
          acceptedAnswer: { "@type": "Answer", text: "Open the Securities Analysis training set to work on financial ratios, valuation and technical analysis. The mixed tests also include eight securities analysis questions each." },
        },
        classFaqJsonLd("hklesfi8"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Securities Investments", weight: "12%" },
  { name: "Primary and Secondary Markets", weight: "16%" },
  { name: "Market Participants", weight: "16%" },
  { name: "Securities Products", weight: "24%" },
  { name: "Trading and Administration", weight: "16%" },
  { name: "Securities Analysis", weight: "16%" },
];

export default function Hklesfi8LandingPage() {
  return (
    <div data-theme="hklesfi8" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free HKSI LE Paper 8 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hksi-paper-8/dashboard"
            shortName="HKSI LE Paper 8"
            subtitle="Revise Hong Kong securities markets, traded products, administration and analysis with 200 original questions. Free to start, no account needed."
            shots={{ mobile: "/landing/hklesfi8-mobile.png", desktop: "/landing/hklesfi8-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hklesfi8" />

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
                Study by topic, from primary and secondary markets to securities analysis. Each answer has an explanation you can use to review your working.
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
                Each mixed practice test has 50 questions in English, ten more than the real paper. Answer at least 35 correctly to reach the 70% target.
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
                What Each Securities Practice Test Covers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Tigertest uses the six topics in the March 2026 HKSI syllabus. These percentages show how the questions are divided on each practice test.
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
                src={getTigerAsset("hklesfi8", 1)}
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
            How to Study for Paper 8
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Trace where the money goes</h3>
              <p>
                In a market question, identify whether the issuer or an existing investor receives the proceeds. Then identify the parties carrying out the transaction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Compare product features</h3>
              <p>
                For each product you revise, note the holder&apos;s rights, how its value can change and which risks it introduces.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Follow the trade to settlement</h3>
              <p>
                Separate the execution of an order from the later transfers of cash and securities. Write down the party responsible at each stage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep units beside the figures</h3>
              <p>
                When you calculate a ratio, label each input as dollars, shares or earnings per share. Check whether the result should be a multiple, a percentage or a price.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          HKSI Paper 8 Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does HKSI Paper 8 cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Securities investments, primary and secondary markets, market participants, securities products, administration and securities analysis make up the six syllabus topics.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on Paper 8?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              HKSI gives candidates 60 minutes for 40 multiple-choice questions. Questions are presented in English and Traditional Chinese.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How does scoring work?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The official pass mark is 70%, equivalent to 28 out of 40. A Tigertest practice test has 50 questions, so the target here is 35 correct answers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which study guide applies to Paper 8?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Version 3.6 applies to sittings through 8 December 2026. HKSI begins examining version 3.7 on 9 December 2026.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How do I practise securities analysis?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Open the Securities Analysis training set to work on financial ratios, valuation and technical analysis. The mixed tests also include eight securities analysis questions each.
            </p>
          </div>
          <ExamClassFaq examId="hklesfi8" />
        </div>
      </div>

      <ExamSampleQuestions examId="hklesfi8" />

      <ExamRelatedTests examId="hklesfi8" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Try Your First HKSI Paper 8 Practice Test</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with Investments and Markets or try a mixed securities test.</p>
          <ExamLandingCTA dashboardHref="/hksi-paper-8/dashboard" />
        </div>
      </div>
    </div>
  );
}

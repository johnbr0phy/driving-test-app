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

const title = "CFA Level I Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free CFA Level I practice: 200 original questions across all ten topics, weighted like the 2027 Level I outline, four 50-question tests and every calculation explained.";
const description =
  "Free practice for the CFA Program Level I exam: 200 original multiple-choice questions written from the CFA Institute Level I topic outline. Four 50-question tests weighted like the topic weights for exams from February 2027, and seven training sets covering ethical and professional standards, quantitative methods, economics and corporate finance, financial statement analysis, equities, fixed income, and derivatives, alternative investments and portfolio construction.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cfa level 1 practice test, cfa level i practice questions, cfa level 1 mock exam, free cfa questions, cfa level 1 2027, cfa ethics practice, cfa fixed income questions, chartered financial analyst level 1",
  alternates: {
    canonical: `${siteUrl}/cfa-level-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cfa-level-1-practice-test`,
    images: [{ url: shareImageUrl("cfal1"), width: 1200, height: 630, alt: "Tigertest free CFA Level I practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cfal1")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the CFA Level I exam?",
    a: "Level I is the first of the three exams of the CFA Program run by CFA Institute. It tests knowledge and basic analysis across ten topics: ethical and professional standards, quantitative methods, economics, financial statement analysis, corporate finance, equities, fixed income, derivatives, alternative investments and portfolio construction.",
  },
  {
    q: "How is the CFA Level I exam structured?",
    a: "Level I has 180 multiple-choice questions in two sessions of 90 questions, each 135 minutes long, so about 90 seconds a question. Every question has three choices, all questions count equally and there is no penalty for a wrong answer. CFA Institute sets the minimum passing score after each exam and does not publish it; results are pass or do not pass. You must also complete a Practical Skills Module to receive your result.",
  },
  {
    q: "What are the Level I topic weights?",
    a: "For exams from February 2027 CFA Institute weights Ethics 10 to 15%, Quantitative Methods 11 to 14%, Economics 6 to 9%, Financial Statement Analysis 11 to 14%, Corporate Finance 6 to 9%, Equities 11 to 14%, Fixed Income 11 to 14%, Derivatives and Risk Management 6 to 9%, Alternative Investments 6 to 9% and Portfolio Construction 8 to 12%. Exams through November 2026 use the 2026 weights, with Ethics at 15 to 20% and Quantitative Methods at 6 to 9%. The tests here follow the 2027 weights.",
  },
  {
    q: "How do these practice questions differ from the real exam?",
    a: "Real Level I questions have three answer choices; ours have four, so a guess is a little harder here. Each practice test has 50 questions instead of 180, weighted by topic like the real exam, and 70% is a readiness line set by Tigertest, not an official pass mark.",
  },
  {
    q: "Are these real CFA exam questions?",
    a: "No. Every question is original, written by Tigertest from the CFA Institute topic outline and standard finance theory. Tigertest is not affiliated with or endorsed by CFA Institute, and this free practice does not replace the official curriculum and practice materials.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CFA Level I Practice Test",
      description,
      url: `${siteUrl}/cfa-level-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CFA Level I practice questions",
        "4 tests of 50 questions weighted by the Level I topic outline",
        "7 training sets by topic",
        "Every calculation explained",
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
  { name: "Ethical and Professional Standards", weight: "10-15%" },
  { name: "Quantitative Methods", weight: "11-14%" },
  { name: "Economics", weight: "6-9%" },
  { name: "Financial Statement Analysis", weight: "11-14%" },
  { name: "Corporate Finance", weight: "6-9%" },
  { name: "Equities", weight: "11-14%" },
  { name: "Fixed Income", weight: "11-14%" },
  { name: "Derivatives and Risk Management", weight: "6-9%" },
  { name: "Alternative Investments", weight: "6-9%" },
  { name: "Portfolio Construction", weight: "8-12%" },
];

export default function CfaLevel1LandingPage() {
  return (
    <div data-theme="cfal1" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CFA Level I Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cfa-level-1/dashboard"
            shortName="CFA Level I"
            subtitle="200 original questions across all ten Level I topics, from ethics and quant to fixed income, derivatives and portfolio construction. Four 50-question tests weighted like the 2027 outline, every calculation explained. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cfal1-mobile.png", desktop: "/landing/cfal1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cfal1" />

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
                Seven training sets: ethics, quantitative methods, economics and corporate finance, financial statement analysis, equities, fixed income, and derivatives, alternatives and portfolios. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Topic-Weighted Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions in the Level I topic weights, with a 70% readiness line. Real questions have three choices; ours have four. No question appears in more than one test, and every calculation is worked through.
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
                Built on the Level I Topic Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CFA Institute weights the ten Level I topics as below for exams from February 2027. Each test here has 6 questions each on ethics, quant, financial statement analysis, equities and fixed income, and 4 on each of the other five topics.
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
                src={getTigerAsset("cfal1", 1)}
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
            How to Prepare for Level I
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your calculator</h3>
              <p>
                Time value of money, bond pricing, duration and portfolio math come up across several topics. Work each number yourself before looking at the choices, and check your path against the explanation, not just the answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Treat ethics as a scoring topic</h3>
              <p>
                Ethics questions turn on which Standard applies and what a member should do first. Learn the seven Standards well enough to name the one a scenario breaks, and read every choice before you pick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn IFRS and its US GAAP differences</h3>
              <p>
                Financial statement analysis leans on IFRS: how interest and dividends are classified, revaluation, inventory write-down reversals, development costs and leases. Many wrong choices apply the US GAAP rule to an IFRS question.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Build up to full length</h3>
              <p>
                The real exam is two sessions of 135 minutes. Use these tests to find weak topics, then take full-length mocks from the official curriculum. Aim for 80% or better on every test here before you sit Level I.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CFA Level I Frequently Asked Questions
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

      <ExamRelatedTests examId="cfal1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Level I?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all ten Level I topics.</p>
          <ExamLandingCTA dashboardHref="/cfa-level-1/dashboard" />
        </div>
      </div>
    </div>
  );
}

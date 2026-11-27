import "@/lib/banks/ukr01";
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

const title = "Free CII R01 Practice Test 2026";
const metaDescription =
  "Revise UK financial services, regulation and ethics with 200 original CII R01 practice questions. Each of the four practice tests has 50 questions and explains every answer.";
const description =
  "Revise UK financial services, regulation and ethics with 200 original CII R01 practice questions. Each of the four practice tests has 50 questions and explains every answer.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CII R01 practice test, R01 mock exam, R01 revision questions, Diploma in Regulated Financial Planning, Financial Services Regulation and Ethics",
  alternates: {
    canonical: `${siteUrl}/cii-r01-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cii-r01-practice-test`,
    images: [{ url: shareImageUrl("ukr01"), width: 1200, height: 630, alt: "Tigertest CII R01 practice questions" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukr01")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest CII R01 Practice Test",
      description,
      url: `${siteUrl}/cii-r01-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukr01", "GBP"),
      featureList: ["200 original questions", "Four 50-question practice tests", "Five topic sets", "Answer explanations"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does CII R01 cover?",
          acceptedAnswer: { "@type": "Answer", text: "R01 is the Financial Services, Regulation and Ethics unit of the CII Diploma in Regulated Financial Planning. It covers the UK financial services industry, retail customers, the law that governs advice, financial regulation and professional ethics." },
        },
        {
          "@type": "Question",
          name: "How long is the R01 exam?",
          acceptedAnswer: { "@type": "Answer", text: "The CII allows two hours for 100 questions. Of these, 87 require one answer and 13 require multiple responses." },
        },
        {
          "@type": "Question",
          name: "What is the R01 pass mark?",
          acceptedAnswer: { "@type": "Answer", text: "The CII lists a standard pass mark of 65%. On a 50-question Tigertest practice test, 33 correct answers meet that target." },
        },
        {
          "@type": "Question",
          name: "How does a practice test compare with the CII exam?",
          acceptedAnswer: { "@type": "Answer", text: "Each Tigertest test has 50 single-answer questions. Topic counts follow the 2026/27 syllabus, rounded for the shorter test. Use the CII exam guide to practise the multiple-response format as well." },
        },
        {
          "@type": "Question",
          name: "Which questions can I practise for free?",
          acceptedAnswer: { "@type": "Answer", text: "Start with the first topic set and the first practice test for free. Premium unlocks the remaining locked steps and full performance statistics." },
        },
        classFaqJsonLd("ukr01"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Financial Markets", weight: "6%" },
  { name: "Retail Financial Needs", weight: "12%" },
  { name: "Law and Financial Advice", weight: "8%" },
  { name: "Regulatory Framework", weight: "6%" },
  { name: "Regulatory Supervision", weight: "30%" },
  { name: "Applying Regulatory Rules", weight: "10%" },
  { name: "Regulated Advice", weight: "12%" },
  { name: "Adviser Skills", weight: "4%" },
  { name: "Principles and Culture", weight: "6%" },
  { name: "Professional Ethics", weight: "6%" },
];

export default function Ukr01LandingPage() {
  return (
    <div data-theme="ukr01" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CII R01 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cii-r01/dashboard"
            shortName="CII R01"
            subtitle="Revise financial regulation, retail advice and ethics with four 50-question R01 practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/ukr01-mobile.png", desktop: "/landing/ukr01-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukr01" />

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
                Study by topic, from the needs of a retail client to the decisions an adviser faces under the regulatory framework.
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
                Each practice test draws 50 questions across the syllabus. Aim for 33 correct answers to meet the practice target.
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
                What Each R01 Practice Test Covers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                These are the proportions on each 50-question Tigertest practice test. The weights follow the CII 2026/27 syllabus, rounded to whole questions. The two learning outcomes on professional ethics share one category.
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
                src={getTigerAsset("ukr01", 1)}
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
            How to Revise for CII R01
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with the client</h3>
              <p>
                Sketch the household in a question. Identify the client&apos;s objective, time horizon and need for access before considering a product.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read each regulator&apos;s remit</h3>
              <p>
                When a question names the FCA or PRA, ask which objective the decision serves. Compare the impact on the customer with the impact on the firm&apos;s soundness.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Separate the rule from the remedy</h3>
              <p>
                For each complaint or redress question, write down what happened, who can act and what outcome the customer wants. Use the explanation to check the step you missed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Work through the ethical choice</h3>
              <p>
                Identify who would benefit from each action. Look for a conflict between the adviser&apos;s interests and the client&apos;s needs, then review the reasons given for the answer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CII R01 Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does CII R01 cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              R01 is the Financial Services, Regulation and Ethics unit of the CII Diploma in Regulated Financial Planning. It covers the UK financial services industry, retail customers, the law that governs advice, financial regulation and professional ethics.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long is the R01 exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The CII allows two hours for 100 questions. Of these, 87 require one answer and 13 require multiple responses.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the R01 pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The CII lists a standard pass mark of 65%. On a 50-question Tigertest practice test, 33 correct answers meet that target.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How does a practice test compare with the CII exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Each Tigertest test has 50 single-answer questions. Topic counts follow the 2026/27 syllabus, rounded for the shorter test. Use the CII exam guide to practise the multiple-response format as well.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which questions can I practise for free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Start with the first topic set and the first practice test for free. Premium unlocks the remaining locked steps and full performance statistics.
            </p>
          </div>
          <ExamClassFaq examId="ukr01" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukr01" />

      <ExamRelatedTests examId="ukr01" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Try Your First R01 Practice Test</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with Markets and Consumers or go straight to a 50-question test.</p>
          <ExamLandingCTA dashboardHref="/cii-r01/dashboard" />
        </div>
      </div>
    </div>
  );
}

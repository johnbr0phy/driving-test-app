import "@/lib/banks/txlifeonly";
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

const title = "Free Texas Life Agent Practice Test 2026";
const metaDescription =
  "Study for the Texas Life Agent licensing exam with 200 questions on life policies, annuities, underwriting and Texas insurance law.";
const description =
  "Study for the Texas Life Agent licensing exam with 200 questions on life policies, annuities, underwriting and Texas insurance law.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Texas Life Agent practice test, Texas life insurance exam, InsTX-Life01, Texas life-only license",
  alternates: {
    canonical: `${siteUrl}/texas-life-agent-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/texas-life-agent-practice-test`,
    images: [{ url: shareImageUrl("txlifeonly"), width: 1200, height: 630, alt: "Texas Life Agent practice questions" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("txlifeonly")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest Texas Life Agent Practice Test",
      description,
      url: `${siteUrl}/texas-life-agent-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("txlifeonly", "USD"),
      featureList: ["200 original questions", "Four 50-question tests", "Five topic sets", "Answer explanations"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which Texas insurance license does this cover?",
          acceptedAnswer: { "@type": "Answer", text: "This practice test follows the Texas Life Agent outline for InsTX-Life01. Candidates for the combined General Lines Life, Accident and Health license take a different exam." },
        },
        {
          "@type": "Question",
          name: "How long is the Texas Life Agent exam?",
          acceptedAnswer: { "@type": "Answer", text: "The English exam allows 120 minutes. It has 80 scored questions and 10 unscored questions." },
        },
        {
          "@type": "Question",
          name: "How is the official exam scored?",
          acceptedAnswer: { "@type": "Answer", text: "Pearson VUE reports a scaled score of 70 as passing. On Tigertest, your practice target is 35 correct out of 50." },
        },
        {
          "@type": "Question",
          name: "How much of the official exam is Texas law?",
          acceptedAnswer: { "@type": "Answer", text: "Texas law accounts for 30 of the 80 scored questions. Each Tigertest form includes 19 state-law questions." },
        },
        {
          "@type": "Question",
          name: "Can I start for free?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Start with a topic set or the first practice test. Premium unlocks the remaining locked steps and full statistics." },
        },
        classFaqJsonLd("txlifeonly"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Life Policies and Annuities", weight: "18%" },
  { name: "Riders, Provisions and Options", weight: "18%" },
  { name: "Underwriting and Policy Delivery", weight: "16%" },
  { name: "Retirement and Other Insurance Concepts", weight: "10%" },
  { name: "Texas Laws Common to Life and Health", weight: "26%" },
  { name: "Texas Life Insurance Law", weight: "12%" },
];

export default function TxlifeonlyLandingPage() {
  return (
    <div data-theme="txlifeonly" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Texas Life Agent Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/txlifeonly/dashboard"
            shortName="Texas Life Agent"
            subtitle="Practice life insurance, annuities, underwriting and Texas law with 200 original questions. Free to start, no account needed."
            shots={{ mobile: "/landing/txlifeonly-mobile.png", desktop: "/landing/txlifeonly-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="txlifeonly" />

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
                Choose a topic and read the explanation after each answer. Revisit missed questions from your dashboard.
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
                Each practice test mixes 31 general insurance questions with 19 on Texas law. Aim for 35 correct out of 50.
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
                What Each Texas Life Agent Practice Test Covers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each 50-question practice test follows the six scored domains in the Texas Life Agent outline.
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
                src={getTigerAsset("txlifeonly", 1)}
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
            How to Study for the Texas Life Agent Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Find the policy feature</h3>
              <p>
                Look for who controls the benefit, how long coverage lasts and which amounts the insurer guarantees.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Trace the cash flow</h3>
              <p>
                For annuities and settlement options, identify who pays, who receives the money and when payments end.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Track each underwriting step</h3>
              <p>
                Distinguish the application, evidence of insurability and policy delivery. The facts at each step affect the answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Identify the legal duty</h3>
              <p>
                For a Texas law question, identify who owes the duty, what triggered it and which document records the decision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Texas Life Agent Exam Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which Texas insurance license does this cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This practice test follows the Texas Life Agent outline for InsTX-Life01. Candidates for the combined General Lines Life, Accident and Health license take a different exam.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long is the Texas Life Agent exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The English exam allows 120 minutes. It has 80 scored questions and 10 unscored questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How is the official exam scored?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Pearson VUE reports a scaled score of 70 as passing. On Tigertest, your practice target is 35 correct out of 50.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How much of the official exam is Texas law?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Texas law accounts for 30 of the 80 scored questions. Each Tigertest form includes 19 state-law questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I start for free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Start with a topic set or the first practice test. Premium unlocks the remaining locked steps and full statistics.
            </p>
          </div>
          <ExamClassFaq examId="txlifeonly" />
        </div>
      </div>

      <ExamSampleQuestions examId="txlifeonly" />

      <ExamRelatedTests examId="txlifeonly" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Try Your First Texas Life Agent Practice Test</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with Life Policies and Annuities or take a mixed 50-question test.</p>
          <ExamLandingCTA dashboardHref="/txlifeonly/dashboard" />
        </div>
      </div>
    </div>
  );
}

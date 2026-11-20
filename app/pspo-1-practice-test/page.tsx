import "@/lib/v2/banks/pspo";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free PSPO I (PSPO1) Practice Test 2026 - Product Owner Questions";
const metaDescription =
  "Free PSPO I practice exam: 200 original Product Owner questions on product value, backlog management, stakeholders and Evidence-Based Management, with two full 80-question tests in 60 minutes.";
const description =
  "Free Professional Scrum Product Owner I (PSPO I) practice tests with 200 original questions written from the 2020 Scrum Guide, Scrum.org's product focus areas and the Evidence-Based Management Guide: the Scrum framework from the Product Owner's seat, product vision and strategy, product value and the four Key Value Areas, Product Backlog management, stakeholders and customers, and forecasting and release planning. Each test has 80 questions in 60 minutes, the real assessment's pace, mixing multiple choice, multiple answer and true/false items, with an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the PSPO I assessment?",
    a: "80 questions in 60 minutes, taken online in English or Japanese. The question types are multiple choice, multiple answer and true/false. You need 85 percent to pass, which is 68 correct answers out of 80.",
  },
  {
    q: "What does the PSPO I cover?",
    a: "Scrum.org lists three areas: understanding and applying the Scrum framework, developing people and teams, and managing products with agility. The product part covers forecasting and release planning, product vision, product value, Product Backlog management, business strategy, and stakeholders and customers. The Scrum Guide (November 2020) is the base, and Scrum.org's Evidence-Based Management Guide is the usual reference for measuring value.",
  },
  {
    q: "How is PSPO I different from PSM I?",
    a: "Both test the Scrum Guide, but PSPO I focuses on the Product Owner's accountability for value: ordering the Product Backlog, working with stakeholders, product vision and strategy, measuring value and planning releases. PSM I spends more time on the Scrum Master, the events and team facilitation. Tigertest has a separate PSM I practice test.",
  },
  {
    q: "Is this practice test the same format as the real PSPO I?",
    a: "It is built like it. Each practice test is 80 questions in 60 minutes, mixing single answer, multiple answer and true/false items, and every multiple answer item tells you how many to choose. The questions are original; they are not taken from Scrum.org or its Open Assessments.",
  },
  {
    q: "Is the Tigertest PSPO I practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last are free; the final drill and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "PSPO I practice test, PSPO 1 practice exam, free PSPO I questions, Professional Scrum Product Owner practice test, Product Owner certification practice, Evidence-Based Management quiz, PSPO I exam prep, scrum.org assessment practice",
  alternates: {
    canonical: `${siteUrl}/pspo-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pspo-1-practice-test`,
    images: [{ url: shareImageUrl("pspo"), width: 1200, height: 630, alt: "Tigertest free PSPO I practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pspo")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PSPO I Practice Test",
      description,
      url: `${siteUrl}/pspo-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("pspo"),
      featureList: [
        "200 original PSPO I practice questions with explanations",
        "2 full 80-question practice tests in 60 minutes",
        "6 drills on product value, the Product Backlog, stakeholders and releases",
        "Multiple choice, multiple answer and true/false items",
        "Scored against the real 85 percent pass mark",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("pspo"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Product Backlog management", count: "18" },
  { name: "Scrum framework for Product Owners", count: "14" },
  { name: "Product value and Evidence-Based Management", count: "14" },
  { name: "Product vision, strategy and goals", count: "12" },
  { name: "Stakeholders and customers", count: "12" },
  { name: "Forecasting and release planning", count: "10" },
];

export default function PspoLandingPage() {
  return (
    <div data-theme="pspo" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PSPO I Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pspo-1/dashboard"
            shortName="PSPO I"
            subtitle="200 original Product Owner questions on value, the backlog and stakeholders. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/pspo-mobile.png", desktop: "/landing/pspo-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pspo" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six drills follow Scrum.org&apos;s product focus areas: Scrum for Product Owners, vision and strategy, product value and Evidence-Based Management, the Product Backlog, stakeholders, and forecasting and releases. Questions you miss come back until you have mastered them.
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
                Two full 80-question tests in 60 minutes, the real assessment&apos;s pace, with flagging and review. Practice Test 2 is held out of the drills, so it measures readiness against the 85 percent pass mark.
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
                Built on Scrum.org&apos;s Product Focus Areas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Scrum.org does not publish a topic weighting for PSPO I, so every practice test covers each focus area, with the most questions on Product Backlog management, product value and the Scrum framework. Questions per 80-question test:
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("pspo", 3)}
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
            How to Pass the PSPO I
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the Scrum Guide first</h3>
              <p>
                Many questions are about the Scrum framework from the Product Owner&apos;s side: Sprint Planning, the Sprint Review, the Definition of Done and what the Product Owner decides. Read the Guide until the Product Owner&apos;s accountability is second nature.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Think in value, not output</h3>
              <p>
                Learn the four Key Value Areas of Evidence-Based Management (Current Value, Unrealized Value, Time-to-Market and Ability to Innovate) and which example measures belong to each. Velocity and items completed are output; customer outcomes are value.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the Product Owner traps</h3>
              <p>
                The Product Owner orders the backlog and others change it by convincing them, the Developers size items and decide how much fits a Sprint, forecasts rest on what has already happened, and Done Increments can be released at any time, not only after the Sprint Review.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice at the real pace</h3>
              <p>
                80 questions in 60 minutes is 45 seconds each, and 85 percent leaves room for only 12 misses. Take a full practice test under time, drill the areas you miss most, and aim for 90 percent before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PSPO I Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="pspo" />
        </div>
      </div>

      <SampleQuestionsV2 examId="pspo" />

      <ExamRelatedTests examId="pspo" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the PSPO I?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on product value, the backlog and stakeholders.</p>
          <ExamLandingCTA dashboardHref="/pspo-1/dashboard" />
        </div>
      </div>
    </div>
  );
}

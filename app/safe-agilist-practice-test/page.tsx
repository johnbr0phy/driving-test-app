import "@/lib/v2/banks/safe";
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

const title = "Free SAFe Agilist Practice Test 2026";
const metaDescription =
  "Free SAFe Agilist (Leading SAFe) practice tests: 202 original questions on SAFe's values and principles, ARTs, WSJF, PI Planning and Lean Portfolio Management, all explained.";
const description =
  "Free SAFe Agilist practice tests with 202 original questions weighted to Scaled Agile's exam study guide for Leading SAFe: business agility and value streams, the core values and Lean-Agile mindset, the ten Lean-Agile principles, Agile teams and Agile Release Trains, built-in quality and the continuous delivery pipeline, customer-centricity and WSJF, PI Planning and executing the PI, Lean budgets and guardrails, epics and the portfolio Kanban, and leading the change.";

const faqs = [
  {
    q: "How many questions are on the SAFe Agilist exam?",
    a: "45 multiple-choice questions in 90 minutes, each with one answer. The exam is web-based and closed book, and you take it from your Learning Plan after the Leading SAFe class.",
  },
  {
    q: "What is the passing score for the SAFe Agilist exam?",
    a: "80 percent, which is 36 of 45 questions. Unanswered questions count as wrong when time runs out, so answer every one. Aim for 85 percent or better on these practice tests before you sit it.",
  },
  {
    q: "What is on the SAFe Agilist exam?",
    a: "Six domains in Scaled Agile's current exam study guide: Adapt and Thrive with SAFe 7 to 9 percent, Build a Foundation with Mindset, Value, and Principles 21 to 23 percent, Establish Team and Technical Agility 10 to 12 percent, Product Development Flow 25 to 28 percent, Explore Lean Portfolio Management 21 to 23 percent, and Lead the Change 7 to 9 percent.",
  },
  {
    q: "How many attempts do I get?",
    a: "Scaled Agile includes your first two attempts when you take them within 60 days of finishing the course. Later attempts are paid, and after the third attempt there is a wait of 10 days, then 30 days, before each new try.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 45 single-answer questions in 90 minutes with free navigation and flagging, the same length and pace as the real exam. The questions are original, written from the exam study guide and the Scaled Agile Framework, not Scaled Agile's own practice test or course questions.",
  },
  {
    q: "Is the Tigertest SAFe Agilist practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the adapt and thrive, mindset, principles and team agility drills are free; the customer-centricity, PI Planning, Lean Portfolio Management and lead the change drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across devices.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SAFe Agilist practice test, Leading SAFe exam practice, SAFe Agilist exam questions, SA exam practice, Scaled Agile Framework practice test, SAFe certification practice test 2026",
  alternates: {
    canonical: `${siteUrl}/safe-agilist-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/safe-agilist-practice-test`,
    images: [{ url: shareImageUrl("safe"), width: 1200, height: 630, alt: "Tigertest free SAFe Agilist practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("safe")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SAFe Agilist Practice Tests",
      description,
      url: `${siteUrl}/safe-agilist-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("safe"),
      featureList: [
        "202 original SAFe Agilist practice questions",
        "2 full 45-question practice tests in 90 minutes",
        "8 drills covering every exam domain",
        "Instant feedback with explanations",
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
        classFaqJsonLd("safe"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Adapt and Thrive with SAFe", weight: "7-9%" },
  { name: "Mindset, Value, and Principles", weight: "21-23%" },
  { name: "Team and Technical Agility", weight: "10-12%" },
  { name: "Product Development Flow", weight: "25-28%" },
  { name: "Lean Portfolio Management", weight: "21-23%" },
  { name: "Lead the Change", weight: "7-9%" },
];

export default function SafeLandingPage() {
  return (
    <div data-theme="safe" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SAFe Agilist Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/safe-agilist/dashboard"
            shortName="SAFe Agilist"
            subtitle="202 questions weighted to the Leading SAFe exam study guide, from the core values to Lean budgets. Free to start, no account needed."
            shots={{ mobile: "/landing/safe-mobile.png", desktop: "/landing/safe-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="safe" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Eight Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Adapt and thrive; mindset, values and AI; the Lean-Agile principles; teams and technical agility; customer-centricity and WSJF; PI Planning and execution; Lean Portfolio Management; and lead the change. Questions you miss come back until you have mastered them.
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
                Two 45-question tests in 90 minutes with flagging and review, the full length and pace of the real exam. Questions mix every domain in the weights Scaled Agile publishes. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on the SAFe Agilist Exam Study Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Scaled Agile publishes six exam domains, one per lesson of Leading SAFe, with a weight range for each. Every practice test follows them, from business agility and the ten principles to PI Planning, WSJF, Lean budgets and leading with AI.
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
                src={getTigerAsset("safe", 3)}
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
            How to Pass the SAFe Agilist Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the lists cold</h3>
              <p>
                Many questions turn on a named list: the four core values, the ten principles by number, the four parts of the continuous delivery pipeline, the four Lean budget guardrails and the ROAM categories. Write each list from memory until it comes without effort.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise WSJF and Little&apos;s Law</h3>
              <p>
                A few questions ask you to rank features by cost of delay divided by job size, or to work out wait time from queue length and throughput. They are quick marks once you have done a handful by hand.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Walk through a whole PI</h3>
              <p>
                Product development flow is the biggest domain. Picture one Planning Interval from start to finish: PI Planning, iterations with ART Sync and System Demos, the IP iteration, then Inspect and Adapt. Know who leads each event and what comes out of it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak area, then sit a full test</h3>
              <p>
                Tigertest tracks your accuracy by domain. Retake the drill you miss most until you clear 85 percent, then take Practice Test 2 cold. Product development flow and Lean Portfolio Management together are about half the exam, so give them the most time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SAFe Agilist Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="safe" />
        </div>
      </div>

      <SampleQuestionsV2 examId="safe" />

      <ExamRelatedTests examId="safe" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the SAFe Agilist Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 202 questions across all six domains.</p>
          <ExamLandingCTA dashboardHref="/safe-agilist/dashboard" />
        </div>
      </div>
    </div>
  );
}

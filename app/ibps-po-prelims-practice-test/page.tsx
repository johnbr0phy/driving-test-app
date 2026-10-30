import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free IBPS PO Prelims Mock Test 2026 - Sectional Timing";
const metaDescription =
  "Free IBPS PO Prelims mock tests: 225 original questions in English, Quant and Reasoning, timed 20 minutes per section like the real exam. Every answer explained.";
const description =
  "Free IBPS PO Prelims practice with 225 original questions on the Preliminary Examination pattern: English Language 30, Quantitative Aptitude 35 and Reasoning Ability 35, 20 minutes per section. Two full 100-question mock tests with sectional timing, reading passages, cloze tests, data interpretation tables, puzzles and seating arrangements, and an explanation on every answer.";

const faqs = [
  {
    q: "What is the IBPS PO Prelims exam pattern?",
    a: "The IBPS PO Preliminary Examination is one online objective paper of 100 questions in 60 minutes: English Language 30 questions, Quantitative Aptitude 35 and Reasoning Ability 35, each worth one mark. Each section has its own 20-minute timer, so you work on one section at a time in a fixed order.",
  },
  {
    q: "Is there negative marking in IBPS PO Prelims?",
    a: "Yes. For every wrong answer, a quarter of the marks for that question is deducted. An unanswered question loses nothing. With five options per question, a blind guess gains nothing on average (+1 mark one time in five, -0.25 the other four). Ruling out even one wrong option makes the guess worth about +1/16 of a mark on average, and ruling out two about +1/6. Tigertest mock tests do not deduct marks, so count your wrong answers yourself and subtract a quarter of a mark for each.",
  },
  {
    q: "Can I switch between sections in IBPS PO Prelims?",
    a: "No. Each section is timed separately at 20 minutes and you cannot go back to a section once its time is over, even if you finish early. Inside a section you can move freely between questions and mark them for review. The Tigertest mock tests also time each section separately and never let you go back to a closed one.",
  },
  {
    q: "What score do I need to clear IBPS PO Prelims?",
    a: "IBPS sets a cutoff for each section and for the total score every year, separately for each category, and publishes them after the result. You have to clear every sectional cutoff as well as the overall cutoff to be called for the Mains. Prelims marks are not added to the final merit list. Aim for a comfortable margin in all three sections rather than a high score in one.",
  },
  {
    q: "Are these the real IBPS PO questions?",
    a: "No. These are original practice questions written to the IBPS PO Prelims pattern and syllabus, not questions from IBPS or past papers. They follow the real paper's question types: reading comprehension, cloze tests and error spotting; simplification, number series, quadratic equations, data interpretation and arithmetic; and inequalities, syllogisms, puzzles, seating arrangements, coding, blood relations and directions. Both mock tests and all nine drills are free, with no account required.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "IBPS PO mock test, IBPS PO prelims mock test free, IBPS PO practice test, IBPS PO prelims 2026, bank PO mock test, IBPS PO reasoning puzzles, IBPS PO quant data interpretation, IBPS PO English practice, IBPS PO sectional timing",
  alternates: {
    canonical: `${siteUrl}/ibps-po-prelims-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ibps-po-prelims-practice-test`,
    images: [{ url: shareImageUrl("ibpspo"), width: 1200, height: 630, alt: "Tigertest free IBPS PO Prelims mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ibpspo")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free IBPS PO Prelims Mock Test",
      description,
      url: `${siteUrl}/ibps-po-prelims-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "225 original IBPS PO Prelims practice questions with explanations",
        "2 full 100-question mock tests in 60 minutes with 20-minute sectional timing",
        "9 drills across English, Quantitative Aptitude and Reasoning Ability",
        "Puzzles and seating arrangements with five questions each",
        "Data interpretation tables, quadratic equations and number series",
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
        classFaqJsonLd("ibpspo"),
      ],
    },
  ],
};

const sections = [
  { name: "English Language", detail: "30 questions, 20 min" },
  { name: "Quantitative Aptitude", detail: "35 questions, 20 min" },
  { name: "Reasoning Ability", detail: "35 questions, 20 min" },
];

export default function IbpsPoLandingPage() {
  return (
    <div data-theme="ibpspo" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free IBPS PO Prelims Mock Test
          </h1>
          <ExamLandingHero
            dashboardHref="/ibps-po/dashboard"
            shortName="IBPS PO"
            subtitle="225 original questions in English, Quant and Reasoning, with 20-minute sectional timing. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ibpspo-mobile.png", desktop: "/landing/ibpspo-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ibpspo" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Question Type</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nine drills, three per section: reading and para jumbles, cloze and fillers, error spotting; simplification and series, data interpretation, arithmetic; inequalities and syllogisms, puzzles and seating, coding and directions. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 100-question mock tests in 60 minutes, each section on its own 20-minute clock with no going back, like the real Prelims. Mock Test 2 is held out of the drills, so it measures how ready you are.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the IBPS PO Prelims Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test has the same three sections, question counts and sectional timing as the real Preliminary Examination, with five options on every question. The real exam deducts a quarter mark for each wrong answer; Tigertest shows your raw score so you can see where guessing would have cost you.
              </p>
              <div className="space-y-3">
                {sections.map((s) => (
                  <div key={s.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                    <span className="text-brand-dark font-semibold">{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("ibpspo", 1)}
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
            How to Clear IBPS PO Prelims
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Plan each 20 minutes</h3>
              <p>
                Sectional timing means you cannot borrow time from a strong section. In English, do the quick grammar and filler questions before the reading passage. In Quant, take simplification, series and quadratics first, then data interpretation and arithmetic. In Reasoning, clear inequalities, syllogisms and short questions, then spend what is left on the puzzles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Solve a puzzle once, answer five</h3>
              <p>
                Puzzles and seating arrangements carry five questions each. Draw the grid on rough paper, place the fixed clues first (ends, middle, opposite seats), then the relative ones. Once the grid is complete, all five answers take seconds. If a puzzle has not settled after a few minutes, move on and come back.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Respect the negative marking</h3>
              <p>
                Each wrong answer costs a quarter mark, so a blind guess among five options gains nothing on average, while ruling out even one option tips the odds slightly in your favour. Skip what you cannot narrow down at all. Track your accuracy in the mock tests: if many of your attempts in a section are wrong, slow down there, because careless errors cost you both the mark and the penalty.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weakest section</h3>
              <p>
                You must clear every sectional cutoff, so one weak section can cost you the Mains call. Tigertest tracks your accuracy by question type; retake the drill you miss most until it is as solid as your best one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          IBPS PO Prelims Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ibpspo" />
        </div>
      </div>

      <ExamRelatedTests examId="ibpspo" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the IBPS PO Prelims?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 225 questions across all three sections.</p>
          <ExamLandingCTA dashboardHref="/ibps-po/dashboard" />
        </div>
      </div>
    </div>
  );
}

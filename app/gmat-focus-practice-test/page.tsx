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

const siteUrl = SITE_URL;

const title = "Free GMAT Practice Test 2026 - GMAT Focus Edition";
const metaDescription =
  "Free GMAT Focus practice tests: 169 original Quant, Verbal and Data Insights questions with explanations, timed 45-minute sections and a 205 to 805 score estimate.";
const description =
  "Free GMAT Focus Edition practice tests with 169 original questions: Quantitative Reasoning problem solving, Verbal Reasoning reading comprehension and critical reasoning, and Data Insights with data sufficiency, table analysis, graphics interpretation, two-part analysis and multi-source reasoning. Each full test has the real section lengths and times, 21, 23 and 20 questions in 45 minutes each, with an explanation on every answer and an estimated score.";

const faqs = [
  {
    q: "How many questions are on the GMAT?",
    a: "The GMAT Focus Edition has 64 questions in 2 hours 15 minutes: Quantitative Reasoning 21, Verbal Reasoning 23 and Data Insights 20, with 45 minutes for each section. You choose the order of the sections and may take one optional 10-minute break. There is no essay, no geometry and no sentence correction.",
  },
  {
    q: "How is the GMAT scored?",
    a: "Each section is scored from 60 to 90, and the total score runs from 205 to 805 in 10-point steps, with all three sections counting equally. The exam is computer adaptive, so your score reflects both how many questions you get right and how hard they were. Tigertest estimates section and total scores from the share you get right on its fixed practice tests, so treat them as a guide, not an official score.",
  },
  {
    q: "What is on the Data Insights section?",
    a: "Data Insights has five question types: Data Sufficiency, Table Analysis, Graphics Interpretation, Two-Part Analysis and Multi-Source Reasoning. They test whether you can read tables and charts, combine sources and judge whether information is enough to answer a question. It is the only section with an on-screen calculator.",
  },
  {
    q: "Is this practice test the same format as the real GMAT?",
    a: "It follows the real structure: the same three sections, question counts and 45-minute limits, five answer choices, the fixed Data Sufficiency choices, a calculator only in Data Insights, and the optional break. Two things differ. The practice tests are fixed forms rather than adaptive, and you can change any answer, while the real exam lets you change up to three per section. All questions are original, not taken from GMAC or the Official Guide.",
  },
  {
    q: "Is the Tigertest GMAT practice test free?",
    a: "Yes. Both full practice tests and all seven drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "GMAT practice test, GMAT Focus practice test, free GMAT practice test 2026, GMAT Focus Edition practice questions, GMAT data insights practice, data sufficiency practice, GMAT critical reasoning practice, GMAT quant practice",
  alternates: {
    canonical: `${siteUrl}/gmat-focus-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/gmat-focus-practice-test`,
    images: [{ url: shareImageUrl("gmat"), width: 1200, height: 630, alt: "Tigertest free GMAT Focus practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gmat")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free GMAT Focus Practice Test",
      description,
      url: `${siteUrl}/gmat-focus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "169 original GMAT Focus practice questions with explanations",
        "2 full practice tests: Quant 21, Verbal 23 and Data Insights 20 in 45 minutes each",
        "Estimated section scores (60 to 90) and total score (205 to 805)",
        "All five Data Insights question types, with an on-screen calculator",
        "7 drills by question type",
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
        classFaqJsonLd("gmat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Quantitative Reasoning", weight: "21 questions, 45 min" },
  { name: "Verbal Reasoning", weight: "23 questions, 45 min" },
  { name: "Data Insights", weight: "20 questions, 45 min" },
];

export default function GmatLandingPage() {
  return (
    <div data-theme="gmat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free GMAT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/gmat/dashboard"
            shortName="GMAT"
            subtitle="169 original Quant, Verbal and Data Insights questions in the GMAT Focus format. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/gmat-mobile.png", desktop: "/landing/gmat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gmat" />

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
                Seven drills, one for each question family: arithmetic, algebra, critical reasoning, reading comprehension, data sufficiency, tables and graphs, and two-part and multi-source questions. Questions you miss come back until you have mastered them.
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
                Two full tests with the real sections and timing: Quant 21, Verbal 23 and Data Insights 20, 45 minutes each, with the calculator only in Data Insights. You get estimated section scores and a total from 205 to 805. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the GMAT Focus Format
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The GMAT Focus Edition has three equally weighted sections. Every practice test here matches their question counts and time limits and mixes question types the way the real exam does: problem solving in Quant, reading and argument questions in Verbal, and all five Data Insights types.
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
                src={getTigerAsset("gmat", 1)}
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
            How to Prepare for the GMAT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Rebuild your mental math</h3>
              <p>
                Quantitative Reasoning has no calculator and no geometry. It is arithmetic and algebra: percents and successive changes, ratios, number properties, averages, counting and probability, equations, inequalities and word problems. Speed comes from quick, exact arithmetic and from spotting when testing an answer choice is faster than solving.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the Data Sufficiency method</h3>
              <p>
                The five Data Sufficiency choices never change, so learn them cold. Judge statement (1) alone, then statement (2) alone, and only then the two together. You rarely need the final number, only whether a single answer is forced; try two quick cases that fit a statement and see if they give different answers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read arguments for their gaps</h3>
              <p>
                In Critical Reasoning, find the conclusion and the evidence first, then ask what the argument takes for granted: another cause, a comparison that is not fair, a cost it ignores. Strengthen, weaken, assumption and evaluate questions all turn on that gap. In Reading Comprehension, note the purpose of each paragraph so that main idea and function questions are quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice under the clock, then drill your weakest type</h3>
              <p>
                Each section gives you about two minutes a question, and multi-source sets and long passages eat time. Take a full timed test, then use the score breakdown to pick the drill that costs you the most points, and retake it until you have mastered it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          GMAT Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gmat" />
        </div>
      </div>

      <ExamRelatedTests examId="gmat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Take On the GMAT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 169 questions across all three sections.</p>
          <ExamLandingCTA dashboardHref="/gmat/dashboard" />
        </div>
      </div>
    </div>
  );
}

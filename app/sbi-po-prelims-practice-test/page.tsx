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

const title = "Free SBI PO Prelims Mock Test 2026 - New 40/30/30 Pattern";
const metaDescription =
  "Free SBI PO Prelims mock tests on the 2026 pattern: English 40, Quant 30, Reasoning 30, timed 20 minutes per section. 231 original questions, every answer explained.";
const description =
  "Free SBI PO Prelims practice with 231 original questions on the 2026 Preliminary Examination pattern: English Language 40 questions, Quantitative Aptitude 30 and Reasoning Ability 30, 20 minutes per section. Two full 100-question mock tests with sectional timing, reading passages, cloze tests, data interpretation tables, puzzles and seating arrangements, and an explanation on every answer.";

const faqs = [
  {
    q: "What is the SBI PO Prelims exam pattern in 2026?",
    a: "The SBI PO Preliminary Examination is one online objective test of 100 marks in one hour, with separate timing for each section: English Language 40 questions in 20 minutes, Quantitative Aptitude 30 in 20 minutes and Reasoning Ability 30 in 20 minutes. This is the pattern in SBI's 2026 advertisement (CRPD/PO/2026-27/09). Earlier cycles had 30 English, 35 Quant and 35 Reasoning questions, so older mock tests may still use that split. Every question has five options with one correct answer, and every section except English Language is in both English and Hindi. Tigertest questions are in English.",
  },
  {
    q: "Is there negative marking in SBI PO Prelims?",
    a: "Yes. For every wrong answer, a quarter of the marks assigned to that question is deducted. A question left blank loses nothing. With five options per question, a blind guess gains nothing on average, while ruling out even one wrong option tips the odds slightly in your favour. Tigertest mock tests do not deduct marks, so count your wrong answers yourself and subtract a quarter of a mark for each.",
  },
  {
    q: "Is there a sectional cut-off in SBI PO Prelims?",
    a: "No. SBI's notification says there is no sectional cut-off in the preliminary examination. Candidates are ranked category-wise on their aggregate marks, and about ten times the number of vacancies in each category are called for the Main Examination. The Mains does have sectional cut-offs, and Prelims marks are not added to the final merit list.",
  },
  {
    q: "Can I switch between sections in SBI PO Prelims?",
    a: "No. Each section has its own 20-minute timer, so you cannot use time saved in one section on another. Inside a section you can move between questions and mark them for review. The Tigertest mock tests also time each section separately and never let you go back to a closed one.",
  },
  {
    q: "Are these the real SBI PO questions?",
    a: "No. These are original practice questions written to the SBI PO Prelims pattern, not questions from the State Bank of India or past papers, and Tigertest is not affiliated with SBI. They cover the usual question types: reading comprehension, para jumbles, cloze tests, fillers and error spotting; simplification, number series, quadratic equations, data interpretation and arithmetic; and inequalities, syllogisms, puzzles, seating arrangements, coding, blood relations and directions. Both mock tests and all nine drills are free, with no account required.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SBI PO mock test, SBI PO prelims mock test free, SBI PO practice test, SBI PO prelims 2026, SBI PO new pattern, bank PO mock test, SBI PO reasoning puzzles, SBI PO quant data interpretation, SBI PO English practice, SBI PO sectional timing",
  alternates: {
    canonical: `${siteUrl}/sbi-po-prelims-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/sbi-po-prelims-practice-test`,
    images: [{ url: shareImageUrl("sbipo"), width: 1200, height: 630, alt: "Tigertest free SBI PO Prelims mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sbipo")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SBI PO Prelims Mock Test",
      description,
      url: `${siteUrl}/sbi-po-prelims-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "231 original SBI PO Prelims practice questions with explanations",
        "2 full 100-question mock tests on the 2026 pattern (English 40, Quant 30, Reasoning 30) with 20-minute sectional timing",
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
        classFaqJsonLd("sbipo"),
      ],
    },
  ],
};

const sections = [
  { name: "English Language", detail: "40 questions, 20 min" },
  { name: "Quantitative Aptitude", detail: "30 questions, 20 min" },
  { name: "Reasoning Ability", detail: "30 questions, 20 min" },
];

export default function SbiPoLandingPage() {
  return (
    <div data-theme="sbipo" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SBI PO Prelims Mock Test
          </h1>
          <ExamLandingHero
            dashboardHref="/sbi-po/dashboard"
            shortName="SBI PO"
            subtitle="231 original questions on the 2026 pattern: English 40, Quant 30, Reasoning 30, with 20-minute sectional timing. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sbipo-mobile.png", desktop: "/landing/sbipo-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sbipo" />

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
                Nine drills, three per section: reading and para jumbles, cloze and fillers, error spotting; simplification, series and quadratics, data interpretation, arithmetic; inequalities and syllogisms, puzzles and seating, coding and directions. Questions you miss come back until you have mastered them.
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
                Two 100-question mock tests in 60 minutes, each section on its own 20-minute clock with no going back, like the real Prelims: 40 English, 30 Quant and 30 Reasoning questions. Mock Test 2 is held out of the drills, so it measures how ready you are.
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
                Built on the 2026 SBI PO Prelims Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test has the same three sections, question counts and sectional timing as SBI&apos;s 2026 Preliminary Examination, which moved to 40 English, 30 Quant and 30 Reasoning questions, with five options on every question. The real exam deducts a quarter of a question&apos;s marks for each wrong answer; Tigertest shows your raw score so you can see where guessing would have cost you.
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
                src={getTigerAsset("sbipo", 1)}
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
            How to Clear SBI PO Prelims
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Plan for 40 English questions in 20 minutes</h3>
              <p>
                English now has 40 questions on the same 20-minute clock, half a minute each. Take error spotting, sentence improvement and fillers first, then the cloze passage, and read the passages last with the questions in mind. In Quant, take simplification, series and quadratics before data interpretation and arithmetic. In Reasoning, clear inequalities, syllogisms and short questions, then spend what is left on the puzzles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Solve a puzzle once, answer five</h3>
              <p>
                Puzzles and seating arrangements carry five questions each. Draw the grid on rough paper, place the fixed clues first (ends, middle, top floor, opposite seats), then the relative ones. Once the grid is complete, all five answers take seconds. If a puzzle has not settled after a few minutes, move on and come back.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Respect the negative marking</h3>
              <p>
                Each wrong answer costs a quarter of the question&apos;s marks, so a blind guess among five options gains nothing on average. Skip what you cannot narrow down at all. Track your accuracy in the mock tests: if many of your attempts in a section are wrong, slow down there, because careless errors cost you both the mark and the penalty.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Chase the total, not one section</h3>
              <p>
                There is no sectional cut-off in the SBI PO Prelims, so the Mains call depends on your total against the other candidates in your category. Score where it comes fastest, and use the drills to lift the question types that cost you the most marks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SBI PO Prelims Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sbipo" />
        </div>
      </div>

      <ExamRelatedTests examId="sbipo" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the SBI PO Prelims?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 231 questions across all three sections.</p>
          <ExamLandingCTA dashboardHref="/sbi-po/dashboard" />
        </div>
      </div>
    </div>
  );
}

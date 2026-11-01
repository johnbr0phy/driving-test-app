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

const title = "Free AP US History Practice Test 2027 - APUSH Multiple Choice";
const metaDescription =
  "Free APUSH practice tests: 55 source-based multiple-choice questions in 55 minutes, Period 1 to Period 9, 201 original questions with explanations.";
const description =
  "Free AP U.S. History practice tests built like Part A of Section I of the AP U.S. History Exam: 55 multiple-choice questions with four choices in 55 minutes, in sets of three or four that share a source. 201 original questions, each with an explanation, on 51 original practice sources (excerpts written in the style of their time, historians' interpretations, paired historians and small tables), covering all nine periods, plus seven drills that bring missed questions back until you master them.";

const faqs = [
  {
    q: "What is the format of the AP U.S. History Exam?",
    a: "The AP U.S. History Exam is fully digital and lasts 3 hours 15 minutes. Section I has 55 multiple-choice questions in 55 minutes (40% of the score) and 3 short-answer questions in 40 minutes (20%). Section II has a document-based question with seven documents in 60 minutes, including a 15-minute reading period (25%), and a long essay in 40 minutes (15%).",
  },
  {
    q: "What do APUSH multiple-choice questions look like?",
    a: "They usually come in sets of three or four that share one or more sources: primary and secondary texts, images, charts and maps, with at least one set of paired texts on the exam. Each question has four answer choices, and the questions ask you to analyze the source and the history around it, not just recall a fact. No points are taken off for wrong answers.",
  },
  {
    q: "Which periods are on the AP U.S. History Exam?",
    a: "Nine periods from 1491 to the present. Period 1 (1491-1607) and Period 9 (1980-present) are each 4% to 6% of the multiple-choice section and Period 2 (1607-1754) is 6% to 8%. Periods 3 to 8, from 1754 to 1980, are each 10% to 17%. Every Tigertest practice test follows those weights.",
  },
  {
    q: "How is the AP U.S. History Exam scored?",
    a: "AP scores run from 1 to 5. The College Board combines the multiple-choice, short-answer, document-based and long essay sections into a composite and converts it to a score of 1 to 5 each year; it does not publish a fixed percentage for each score. Tigertest reports the percent you got right on a full multiple-choice section, and its goals are its own targets, not official cutoffs.",
  },
  {
    q: "Does the Tigertest APUSH practice test include the essays?",
    a: "No. Tigertest models the 55-question multiple-choice section only. The short-answer questions, the document-based question and the long essay are written responses scored by readers, so practice them with your teacher; the College Board is updating the short-answer and long essay questions for the May 2027 exam. The questions and sources here are original, written to the College Board course framework, and Tigertest is not affiliated with the College Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AP US History practice test, APUSH practice test, free APUSH practice test, AP US History multiple choice, APUSH multiple choice practice, APUSH MCQ, AP US History exam 2027, APUSH periods, APUSH review",
  alternates: {
    canonical: `${siteUrl}/ap-us-history-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ap-us-history-practice-test`,
    images: [{ url: shareImageUrl("apush"), width: 1200, height: 630, alt: "Tigertest free AP US History practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("apush")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AP US History Practice Test",
      description,
      url: `${siteUrl}/ap-us-history-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "201 original AP U.S. History practice questions with explanations",
        "2 full multiple-choice sections: 55 questions in 55 minutes, four choices each",
        "Source-based sets of three or four, including paired historians and tables",
        "All nine periods, weighted like the real exam",
        "7 drills, one for each period or pair of periods",
        "Score by period after every practice test",
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
        classFaqJsonLd("apush"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Period 1: 1491-1607", weight: "4-6%" },
  { name: "Period 2: 1607-1754", weight: "6-8%" },
  { name: "Period 3: 1754-1800", weight: "10-17%" },
  { name: "Period 4: 1800-1848", weight: "10-17%" },
  { name: "Period 5: 1844-1877", weight: "10-17%" },
  { name: "Period 6: 1865-1898", weight: "10-17%" },
  { name: "Period 7: 1890-1945", weight: "10-17%" },
  { name: "Period 8: 1945-1980", weight: "10-17%" },
  { name: "Period 9: 1980-present", weight: "4-6%" },
];

export default function ApUsHistoryLandingPage() {
  return (
    <div data-theme="apush" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AP US History Practice Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/ap-us-history/dashboard"
            shortName="AP US History"
            subtitle="201 original source-based multiple-choice questions, Period 1 to Period 9. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/apush-mobile.png", desktop: "/landing/apush-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="apush" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Period</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills: Periods 1 and 2 together, each of Periods 3 to 7, and Periods 8 and 9 together. Questions you miss come back until you have mastered them, so a weak period gets the practice it needs.
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
                Two full multiple-choice sections: 55 questions in 55 minutes, on the real clock, with the source beside each set and a score by period at the end. Practice Test 2 is held out of the drills, so it measures readiness. The essays are not included.
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
                Weighted Like the Real Exam
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                These are the College Board&apos;s weights for the nine periods. Every Tigertest practice test has 3 questions from Period 1, 4 from Period 2, 7 or 8 from each of Periods 3 to 8 and 3 from Period 9, all in source-based sets, including one set that compares two historians. The sources are original practice texts written in the style of their time; each label describes the kind of writer, not a real person.
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
                src={getTigerAsset("apush", 1)}
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
            How to Raise Your APUSH Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Date the source first</h3>
              <p>
                Before reading the questions, look at who wrote the source and when. Placing it in its period tells you what was happening around it, and most questions ask about that context: what caused it, what it reacted to, or what came next.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Answer from the history, not just the text</h3>
              <p>
                The source starts the question, but the answer usually needs what you know about the period. Eliminate choices from the wrong era first: an answer about the New Deal cannot explain a source from 1850.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Spend your time on Periods 3 to 8</h3>
              <p>
                Six periods from 1754 to 1980 make up most of the multiple-choice section. Know the causes and effects of the big turning points in each: the Revolution, the Constitution, the market revolution, the sectional crisis, industrialization, the New Deal and the Cold War.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep to a minute a question</h3>
              <p>
                With 55 questions in 55 minutes, read each source once, answer its set, and flag the hard ones to come back to. Wrong answers cost nothing, so never leave a question blank. Tigertest shows your score by period, so drill your weakest period before each full test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AP US History Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="apush" />
        </div>
      </div>

      <ExamRelatedTests examId="apush" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for APUSH?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 201 questions across all nine periods.</p>
          <ExamLandingCTA dashboardHref="/ap-us-history/dashboard" />
        </div>
      </div>
    </div>
  );
}

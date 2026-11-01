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

const title = "Free AP World History Practice Test 2027 - AP World Multiple Choice";
const metaDescription =
  "Free AP World History: Modern practice tests: 55 source-based multiple-choice questions in 55 minutes, all nine units, 200 original questions with explanations.";
const description =
  "Free AP World History: Modern practice tests built like Part A of Section I of the AP World History: Modern Exam: 55 multiple-choice questions with four choices in 55 minutes, in sets of three or four that share a source. 200 original questions, each with an explanation, on 49 original practice sources (excerpts written in the style of their time, historians' interpretations, paired historians and small tables), covering all nine units from c. 1200 to the present, plus six drills that bring missed questions back until you master them.";

const faqs = [
  {
    q: "What is the format of the AP World History: Modern Exam?",
    a: "The AP World History: Modern Exam is fully digital and lasts 3 hours 15 minutes. Section I has 55 multiple-choice questions in 55 minutes (40% of the score) and 3 short-answer questions in 40 minutes (20%). Section II has a document-based question with seven documents in 60 minutes, including a 15-minute reading period (25%), and a long essay in 40 minutes (15%).",
  },
  {
    q: "What do AP World History multiple-choice questions look like?",
    a: "They usually come in sets of three or four that share one or more sources: primary and secondary texts, images, charts and maps, with at least one set of paired texts on the exam. Each question has four answer choices, and the questions ask you to analyze the source and the history around it, not just recall a fact. No points are taken off for wrong answers.",
  },
  {
    q: "Which units are on the AP World History: Modern Exam?",
    a: "Nine units from c. 1200 to the present. Units 1 and 2 (c. 1200 to c. 1450) and Units 7, 8 and 9 (c. 1900 to the present) are each 8% to 10% of the multiple-choice section. Units 3 to 6, from c. 1450 to c. 1900, are each 12% to 15%. Every Tigertest practice test follows those weights.",
  },
  {
    q: "How is the AP World History: Modern Exam scored?",
    a: "AP scores run from 1 to 5. The College Board combines the multiple-choice, short-answer, document-based and long essay sections into a composite and converts it to a score of 1 to 5 each year; it does not publish a fixed percentage for each score. Tigertest reports the percent you got right on a full multiple-choice section, and its goals are its own targets, not official cutoffs.",
  },
  {
    q: "Does the Tigertest AP World History practice test include the essays?",
    a: "No. Tigertest models the 55-question multiple-choice section only. The short-answer questions, the document-based question and the long essay are written responses scored by readers, so practice them with your teacher; the College Board is updating the short-answer and long essay questions for the May 2027 exam. The questions and sources here are original, written to the College Board course framework, and Tigertest is not affiliated with the College Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AP World History practice test, AP World History Modern practice test, free AP World practice test, AP World History multiple choice, AP World MCQ, AP World History exam 2027, AP World History units, AP World review",
  alternates: {
    canonical: `${siteUrl}/ap-world-history-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ap-world-history-practice-test`,
    images: [{ url: shareImageUrl("apworld"), width: 1200, height: 630, alt: "Tigertest free AP World History practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("apworld")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AP World History Practice Test",
      description,
      url: `${siteUrl}/ap-world-history-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 original AP World History: Modern practice questions with explanations",
        "2 full multiple-choice sections: 55 questions in 55 minutes, four choices each",
        "Source-based sets of three or four, including paired historians and tables",
        "All nine units, weighted like the real exam",
        "6 drills by unit, from c. 1200 to the present",
        "Score by unit after every practice test",
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
        classFaqJsonLd("apworld"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Unit 1: The Global Tapestry (c. 1200 to c. 1450)", weight: "8-10%" },
  { name: "Unit 2: Networks of Exchange (c. 1200 to c. 1450)", weight: "8-10%" },
  { name: "Unit 3: Land-Based Empires (c. 1450 to c. 1750)", weight: "12-15%" },
  { name: "Unit 4: Transoceanic Interconnections (c. 1450 to c. 1750)", weight: "12-15%" },
  { name: "Unit 5: Revolutions (c. 1750 to c. 1900)", weight: "12-15%" },
  { name: "Unit 6: Consequences of Industrialization (c. 1750 to c. 1900)", weight: "12-15%" },
  { name: "Unit 7: Global Conflict (c. 1900 to the present)", weight: "8-10%" },
  { name: "Unit 8: Cold War and Decolonization (c. 1900 to the present)", weight: "8-10%" },
  { name: "Unit 9: Globalization (c. 1900 to the present)", weight: "8-10%" },
];

export default function ApWorldHistoryLandingPage() {
  return (
    <div data-theme="apworld" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AP World History Practice Test 2027
          </h1>
          <ExamLandingHero
            dashboardHref="/ap-world-history/dashboard"
            shortName="AP World History"
            subtitle="200 original source-based multiple-choice questions, c. 1200 to the present. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/apworld-mobile.png", desktop: "/landing/apworld-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="apworld" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Unit</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six drills: Units 1 and 2 together, each of Units 3 to 6, and Units 7 to 9 together. Questions you miss come back until you have mastered them, so a weak unit gets the practice it needs.
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
                Two full multiple-choice sections: 55 questions in 55 minutes, on the real clock, with the source beside each set and a score by unit at the end. Practice Test 2 is held out of the drills, so it measures readiness. The essays are not included.
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
                These are the College Board&apos;s weights for the nine units. Every Tigertest practice test has 5 questions from each of Units 1, 2, 7, 8 and 9 and 7 or 8 from each of Units 3 to 6, all in source-based sets, including one set that compares two historians and one built on a table. The sources are original practice texts written in the style of their time; each label describes the kind of writer, not a real person.
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
                src={getTigerAsset("apworld", 1)}
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
            How to Raise Your AP World History Score
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Place the source in its unit first</h3>
              <p>
                Before reading the questions, look at who wrote the source, where and when. Placing it in its unit tells you what was happening around it, and most questions ask about that context: what caused it, what it reacted to, or what came next.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Answer from the history, not just the text</h3>
              <p>
                The source starts the question, but the answer usually needs what you know about the period. Eliminate choices from the wrong era or the wrong region first: an answer about the Cold War cannot explain a source from the Mongol empire.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Spend your time on Units 3 to 6</h3>
              <p>
                The four units from c. 1450 to c. 1900 make up about half of the multiple-choice section. Know how the land-based and maritime empires gained and kept power, how the Atlantic revolutions and industrialization changed the world, and why imperialism followed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep to a minute a question</h3>
              <p>
                With 55 questions in 55 minutes, read each source once, answer its set, and flag the hard ones to come back to. Wrong answers cost nothing, so never leave a question blank. Tigertest shows your score by unit, so drill your weakest unit before each full test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AP World History Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="apworld" />
        </div>
      </div>

      <ExamRelatedTests examId="apworld" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for AP World History?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all nine units.</p>
          <ExamLandingCTA dashboardHref="/ap-world-history/dashboard" />
        </div>
      </div>
    </div>
  );
}

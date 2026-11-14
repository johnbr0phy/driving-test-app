import "@/lib/v2/banks/jkssbja";
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

const title = "Free JKSSB Junior Assistant Mock Test 2026 - Practice Test";
const metaDescription =
  "Free JKSSB Junior Assistant mock tests: 200 original questions on General English, General Awareness with J&K, numerical and reasoning ability and computers, with two full 80-question, 80-minute tests and an explanation on every answer.";
const description =
  "Free JKSSB Junior Assistant practice tests with 200 original questions on the official syllabus of the Jammu and Kashmir Services Selection Board: General English, General Awareness with special reference to J&K UT, Numerical and Reasoning Ability, and Basic Concepts of Computers. Each mock test has 80 questions in 80 minutes, the same as the real written test, with an explanation on every answer.";

const faqs = [
  {
    q: "What is the JKSSB Junior Assistant exam pattern?",
    a: "JKSSB's syllabus notice of 23 December 2025 sets one objective written test of 80 marks in 80 minutes, in four units of 20 marks each: General English, General Awareness with special reference to J&K UT, Numerical and Reasoning Ability, and Basic Concepts of Computers. The written test counts for 80 of the 100 selection points, and a type test at 35 words a minute counts for the other 20. Tigertest's mock tests follow the same 80 questions in 80 minutes and the same four units.",
  },
  {
    q: "Is there negative marking in the JKSSB Junior Assistant exam?",
    a: "JKSSB's instructions for its Junior Assistant tests say 0.25 marks are deducted for each wrong answer, so four wrong answers cancel one right one. Check your admit card and the instructions for your test. Tigertest scores percent correct and does not deduct marks, so note which of your answers were guesses.",
  },
  {
    q: "When was the latest JKSSB Junior Assistant exam?",
    a: "The OMR-based written test for the Junior Assistant posts of Advertisement Notification No. 08 of 2025 (27 September 2025) was moved from 5 April to 19 April 2026 by JKSSB's notice of 24 March 2026. Watch jkssb.nic.in for the next advertisement and its syllabus.",
  },
  {
    q: "What does the J&K part of General Awareness cover?",
    a: "The syllabus lists the history, economy, geography (weather, climate, crops, rivers, lakes, flora and fauna), heritage and culture, and important tourist destinations of Jammu and Kashmir, which has been a Union Territory since 31 October 2019. It also lists current events, which this bank does not cover: read the news of the past year separately.",
  },
  {
    q: "Are these JKSSB previous year questions?",
    a: "No. Every question is original, written to the Junior Assistant syllabus, and none is copied from previous papers or guidebooks. It is free to start, with no account needed. Practice Test 1 and every drill but the last two are free; the last two drills and the final practice test are part of Tigertest Premium, one payment with no subscription.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "JKSSB Junior Assistant mock test, JKSSB mock test, JKSSB Junior Assistant practice test free, JKSSB Junior Assistant 2026, JKSSB Junior Assistant syllabus, JKSSB exam questions, J&K GK questions, Jammu and Kashmir GK, JKSSB computer questions",
  alternates: {
    canonical: `${siteUrl}/jkssb-junior-assistant-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/jkssb-junior-assistant-practice-test`,
    images: [{ url: shareImageUrl("jkssbja"), width: 1200, height: 630, alt: "Tigertest free JKSSB Junior Assistant mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("jkssbja")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free JKSSB Junior Assistant Mock Test",
      description,
      url: `${siteUrl}/jkssb-junior-assistant-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("jkssbja", "INR"),
      featureList: [
        "200 original JKSSB Junior Assistant practice questions with explanations",
        "2 full mock tests of 80 questions in 80 minutes, like the real written test",
        "8 drills: grammar, vocabulary and comprehension, India GK, Jammu and Kashmir GK, arithmetic, reasoning, computer fundamentals, and MS Office and internet",
        "The official syllabus's four units of 20 marks",
        "Negative marking explained",
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
        classFaqJsonLd("jkssbja"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General English", weight: "20 marks" },
  { name: "General Awareness (J&K UT)", weight: "20 marks" },
  { name: "Numerical and Reasoning Ability", weight: "20 marks" },
  { name: "Basic Concepts of Computers", weight: "20 marks" },
];

export default function JkssbJuniorAssistantLandingPage() {
  return (
    <div data-theme="jkssbja" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free JKSSB Junior Assistant Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/jkssb-junior-assistant/dashboard"
            shortName="JKSSB JA"
            subtitle="200 original questions on English, GA with J&K, reasoning and computers. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/jkssbja-mobile.png", desktop: "/landing/jkssbja-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jkssbja" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover the whole Junior Assistant syllabus: grammar, vocabulary and comprehension, India GK, Jammu and Kashmir GK, arithmetic, reasoning, computer fundamentals, and MS Office and internet. Questions you miss come back until you have mastered them.
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
                Two full mock tests of 80 questions in 80 minutes, the same marks and time as the real written test, in its four units. Move between questions and flag the ones to revisit. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the Official Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                JKSSB&apos;s syllabus notice of 23 December 2025 splits the 80-mark written test into four units of 20 marks, shown below. Every Tigertest mock keeps the same split, each unit in two drills: grammar and vocabulary with a reading passage, India and J&K general awareness, arithmetic and reasoning, and computer fundamentals with MS Office and the internet. General awareness is static facts only, and reasoning questions are text only. The type test is not modelled.
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
                src={getTigerAsset("jkssbja", 1)}
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
            How to Prepare for the JKSSB Junior Assistant Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know Jammu and Kashmir well</h3>
              <p>
                Half of General Awareness is J&amp;K: its history from Kalhana&apos;s Kashmir to the Dogra state and the Union Territory of 2019, its rivers, lakes, passes and districts, its crafts, dances and festivals, and its tourist places. Add India&apos;s geography, culture, freedom struggle and Census, then read the past year&apos;s news for current events, which this bank does not cover.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make the computer unit easy marks</h3>
              <p>
                Basic Concepts of Computers is a full 20 marks and rewards plain memory: CPU and memory types, input and output devices, the operating system, MS Word and Excel shortcuts and functions, Access objects, PowerPoint views, e-mail and internet terms. A Junior Assistant uses all of these at work, so learn them by doing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Drill English and reasoning by type</h3>
              <p>
                Narration, voice, articles, prepositions, error spotting and jumbled sentences follow fixed rules, and so do series, coding, directions and blood relations. Learn each rule, then practise until each question takes well under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Guess with care, and keep typing</h3>
              <p>
                With 80 questions in 80 minutes you have a minute each, and a wrong answer costs a quarter mark, so answer what you can narrow down and skip blind guesses. The type test at 35 words a minute is a fifth of the selection, so practise typing alongside your written preparation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          JKSSB Junior Assistant Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="jkssbja" />
        </div>
      </div>

      <SampleQuestionsV2 examId="jkssbja" />

      <ExamRelatedTests examId="jkssbja" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the JKSSB Junior Assistant Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all four units.</p>
          <ExamLandingCTA dashboardHref="/jkssb-junior-assistant/dashboard" />
        </div>
      </div>
    </div>
  );
}

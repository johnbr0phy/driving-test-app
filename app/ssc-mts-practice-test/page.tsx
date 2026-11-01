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

const title = "Free SSC MTS Mock Test 2026 - MTS and Havaldar Practice";
const metaDescription =
  "Free SSC MTS and Havaldar mock tests: 212 original questions on maths, reasoning, general awareness and English, with two full 90-question tests in two 45-minute sessions and an explanation on every answer.";
const description =
  "Free SSC MTS and Havaldar practice with 212 original questions written to the Staff Selection Commission syllabus: Numerical and Mathematical Ability and Reasoning in Session 1, General Awareness and English Language and Comprehension in Session 2. Two full mock tests of 90 questions in two 45-minute sessions, eight topic drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the SSC MTS exam pattern?",
    a: "The SSC MTS and Havaldar exam is one computer-based test of 90 multiple-choice questions worth 270 marks, taken in two sessions of 45 minutes each on the same day. Session 1 has 20 questions on Numerical and Mathematical Ability and 20 on Reasoning Ability and Problem Solving. Session 2 has 25 questions on General Awareness and 25 on English Language and Comprehension. Every question carries 3 marks and both sessions are compulsory. Session 1 and the General Awareness section are offered in English, Hindi and 13 regional languages.",
  },
  {
    q: "Is there negative marking in SSC MTS?",
    a: "Only in Session 2. Session 1 (maths and reasoning) has no negative marking, so answer every question. In Session 2 (general awareness and English) each wrong answer costs 1 mark, a third of the 3 marks a right answer earns, and an unanswered question scores zero. Tigertest mock tests score percent correct and do not deduct marks, so note which Session 2 answers were guesses.",
  },
  {
    q: "What are the qualifying marks for SSC MTS?",
    a: "The 2025 notice sets the minimum qualifying marks for both Session 1 and Session 2 at 30 percent for unreserved candidates, 25 percent for OBC and EWS, and 20 percent for all other categories. Session 2 is evaluated only for candidates who qualify in Session 1, and the merit list is prepared solely from normalised Session 2 marks. Cut-offs above the minimum are set separately by category, state or UT and age group, and change every year, so check the current notice on ssc.gov.in.",
  },
  {
    q: "Are these the same questions as the real SSC MTS exam?",
    a: "No. These are original practice questions written to the official SSC MTS syllabus and pattern, not questions copied from past papers or the real exam. The general awareness questions cover static topics such as history, the Constitution, geography, economy and science; current affairs change every year, so study them separately from a recent source.",
  },
  {
    q: "Is the Tigertest SSC MTS mock test free?",
    a: "Yes. Both mock tests and all eight topic drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SSC MTS mock test, SSC MTS mock test free, SSC MTS practice test, SSC MTS 2026, SSC Havaldar mock test, SSC MTS session 1 session 2, SSC MTS reasoning questions, SSC MTS GK questions, SSC MTS maths practice, SSC MTS English practice, SSC MTS online test",
  alternates: {
    canonical: `${siteUrl}/ssc-mts-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ssc-mts-practice-test`,
    images: [{ url: shareImageUrl("sscmts"), width: 1200, height: 630, alt: "Tigertest free SSC MTS mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sscmts")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SSC MTS Mock Test",
      description,
      url: `${siteUrl}/ssc-mts-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "212 original SSC MTS and Havaldar practice questions with explanations",
        "2 full mock tests of 90 questions in two 45-minute sessions, in the real order",
        "8 topic drills across maths, reasoning, general awareness and English",
        "Cloze and reading comprehension passages",
        "Session 2 negative marking explained, with percent-correct scoring",
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
        classFaqJsonLd("sscmts"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Session 1: Numerical and Mathematical Ability", weight: "20 Qs, 60 marks" },
  { name: "Session 1: Reasoning Ability and Problem Solving", weight: "20 Qs, 60 marks" },
  { name: "Session 2: General Awareness", weight: "25 Qs, 75 marks" },
  { name: "Session 2: English Language and Comprehension", weight: "25 Qs, 75 marks" },
];

export default function SscMtsLandingPage() {
  return (
    <div data-theme="sscmts" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SSC MTS Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ssc-mts/dashboard"
            shortName="SSC MTS"
            subtitle="212 original MTS and Havaldar questions on maths, reasoning, GK and English. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sscmts-mobile.png", desktop: "/landing/sscmts-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sscmts" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Topic Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills, two for each part of the exam: arithmetic, numbers and mensuration, analogy and coding, relations and logic, history and polity, geography and science, grammar, and vocabulary with reading. Questions you miss come back until you have mastered them.
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
                Two mock tests of 90 questions in two timed sessions of 45 minutes, in the real exam&apos;s order, with a cloze passage and a reading passage in English. Move freely and flag questions inside a session, as in the exam. Mock Test 2 is held out of the drills, so it measures readiness.
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
                Built on the MTS Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test follows the Staff Selection Commission&apos;s MTS and Havaldar pattern: 90 questions, 3 marks each, 270 marks in two sessions of 45 minutes. Session 1 has no negative marking; Session 2 takes 1 mark off for every wrong answer. Tigertest scores percent correct; to see your exam-style Session 2 score, take three times your correct answers and subtract your wrong ones. Havaldar candidates also take a walking test and physical measurements, which are not part of this practice.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("sscmts", 1)}
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
            How to Prepare for SSC MTS
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Answer everything in Session 1</h3>
              <p>
                Session 1 has no negative marking, so a blank is a sure zero while a guess can earn 3 marks. With 40 questions in 45 minutes you have just over a minute each: do the quick reasoning questions first, then come back to the longer maths ones, and fill in every answer before time runs out.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Be careful in Session 2</h3>
              <p>
                In Session 2 a wrong answer costs 1 mark. A blind guess among four options gains nothing on average, but once you can rule out one or two options the guess is worth taking. Accuracy matters more than the number of questions attempted.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Master the basic methods</h3>
              <p>
                Percentage, profit and discount, ratio, average, simple interest, time and work, area and volume, number and letter series, coding and blood relations come up again and again at the MTS level. Tigertest&apos;s explanations show the quick method, so drill a topic until it is fast as well as right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Build static GK, then add current affairs</h3>
              <p>
                History, the Constitution, geography, economy and everyday science are asked every year and do not go out of date. Master them here, then add the last twelve months of current affairs from a recent source, since these change with each exam cycle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SSC MTS Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sscmts" />
        </div>
      </div>

      <ExamRelatedTests examId="sscmts" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the SSC MTS Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 212 questions across both sessions.</p>
          <ExamLandingCTA dashboardHref="/ssc-mts/dashboard" />
        </div>
      </div>
    </div>
  );
}

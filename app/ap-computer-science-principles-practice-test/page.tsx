import "@/lib/v2/banks/apcsp";
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

const title = "Free AP Computer Science Principles Practice Test";
const metaDescription =
  "200 original AP CSP questions across five big ideas. Free topic drills and two 70-question, 120-minute multiple-choice tests, including choose-two and reading passages. Create is not covered.";
const description =
  "Free AP Computer Science Principles practice with 200 original questions on the five big ideas of the current course framework: Creative Development, Data, Algorithms and Programming, Computer Systems and Networks, and Impact of Computing. Five topic drills and two 70-question, 120-minute multiple-choice tests with choose-two and reading-passage items. The Create performance task and written responses are not covered.";

const faqs = [
  {
    q: "What does this AP Computer Science Principles practice cover?",
    a: "It covers the current five big ideas: Creative Development, Data, Algorithms and Programming, Computer Systems and Networks, and Impact of Computing. There are 200 original questions, five topic drills and two 70-question multiple-choice tests. Code, passages and data are original. Diagrams are described in text.",
  },
  {
    q: "Does this include the Create performance task?",
    a: "No. The real multiple-choice section contributes 70% of the AP score; Create and its written responses contribute the other 30%. This app does not assess your program, video, Personalized Project Reference or written responses. Prepare those with your course and current College Board guidance.",
  },
  {
    q: "How closely do the practice tests match the MCQ format?",
    a: "Each test has 70 questions in 120 minutes: 57 standalone single-answer questions, five single-answer questions with an original computing-innovation passage, and eight choose-two questions. There are four options per question. The five big-idea counts fall within College Board's current weighting ranges. This is practice in Tigertest, not a reproduction of Bluebook.",
  },
  {
    q: "Is this AP Computer Science A?",
    a: "No. AP Computer Science Principles is a separate course covering a broad range of computing ideas. These questions use Principles-style pseudocode, not an AP Computer Science A Java curriculum. Choose the exam that matches your course.",
  },
  {
    q: "Can my percentage predict an AP score?",
    a: "No. The score is the percentage of these MCQ items fully correct, with both correct choices required on choose-two items. It excludes Create and written responses. Practice goals are study targets, not official AP cutoffs or a conversion to the AP 1 to 5 scale.",
  },
  {
    q: "Are all the tests and drills free?",
    a: "Yes. All 200 questions, both timed tests and all five drills are free, with no account required. The second test stays out of drills for a fresh check. AP is a College Board trademark; College Board is not affiliated with and does not endorse Tigertest.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "AP Computer Science Principles practice test, AP CSP, APCSP, AP CSP practice exam, AP CSP multiple choice, computing algorithms data networks",
  alternates: {
    canonical: `${siteUrl}/ap-computer-science-principles-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ap-computer-science-principles-practice-test`,
    images: [{ url: shareImageUrl("apcsp"), width: 1200, height: 630, alt: "Tigertest free AP Computer Science Principles practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("apcsp")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - AP Computer Science Principles Practice",
      description,
      url: `${siteUrl}/ap-computer-science-principles-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("apcsp"),
      featureList: [
        "200 original questions",
        "Five topic drills",
        "Two full-length 70-question MCQ tests in 120 minutes",
        "Choose-two and reading-passage items",
        "Instant feedback with explanations",
        "Create and written responses not covered",
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
        classFaqJsonLd("apcsp"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Creative Development", weight: "8 per test" },
  { name: "Data", weight: "14 per test" },
  { name: "Algorithms and Programming", weight: "23 per test" },
  { name: "Computer Systems and Networks", weight: "9 per test" },
  { name: "Impact of Computing", weight: "16 per test" },
];

export default function ApCspLandingPage() {
  return (
    <div data-theme="apcsp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AP Computer Science Principles Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/ap-computer-science-principles/dashboard"
            shortName="AP Computer Science Principles"
            subtitle="200 AP CSP questions, five drills and two MCQ tests, all free, no account needed. Prepare Create separately."
            shots={{ mobile: "/landing/apcsp-mobile.png", desktop: "/landing/apcsp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="apcsp" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Five Topic Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Trace code, interpret data and reason about computing scenarios, one big idea at a time. Questions you miss come back until you have mastered them, with an explanation for every answer.
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
                Two 70-question tests in 120 minutes, including choose-two and reading-passage items. Practice Test 2 is held out of the drills. Your percentage measures this practice, not your complete AP readiness.
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
                Built on the Five Big Ideas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test follows the course framework in the College Board&apos;s current Course and Exam Description, effective Fall 2023. The big-idea counts fall within the official weighting ranges: user needs and testing, binary data and compression, original pseudocode with lists and procedures, packets and fault tolerance, and bias, privacy and security.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("apcsp", 1)}
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
            How to Prepare for AP CSP Multiple Choice
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Trace every variable</h3>
              <p>
                Write down variable values after each statement, especially inside loops, before you look at the options.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Mind the reference syntax</h3>
              <p>
                Lists are indexed from 1, and RANDOM includes both of its endpoints. Read those details carefully in every code question.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check every option on choose-two questions</h3>
              <p>
                Both correct choices are required, so test each option against the scenario instead of stopping at the first good one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep working on Create</h3>
              <p>
                The multiple-choice section is 70% of the AP score. Keep preparing your Create task and written responses alongside MCQ practice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AP Computer Science Principles Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="apcsp" />
        </div>
      </div>

      <SampleQuestionsV2 examId="apcsp" />

      <ExamRelatedTests examId="apcsp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Build Your Computing Skills</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with a topic drill, then take a timed multiple-choice test. Free, no account required.</p>
          <ExamLandingCTA dashboardHref="/ap-computer-science-principles/dashboard" />
        </div>
      </div>
    </div>
  );
}

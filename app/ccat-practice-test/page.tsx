import "@/lib/v2/banks/ccat";
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

const title = "Free CCAT Practice Test 2026 - 50 Questions in 15 Minutes";
const metaDescription =
  "Criteria Cognitive Aptitude Test (CCAT) practice tests, free to start: 200 original questions with explanations, timed 50-question, 15-minute tests and drills on verbal, math, logic and spatial reasoning.";
const description =
  "CCAT practice tests, free to start, with 200 original questions on the question types Criteria Corp describes for the Criteria Cognitive Aptitude Test: two timed tests of 50 five-choice questions in 15 minutes, and eight drills on vocabulary, analogies, sentence completion, arithmetic, word problems, number and letter series, logic and spatial reasoning. Every answer has an explanation.";

const faqs = [
  {
    q: "What is on the CCAT?",
    a: "The Criteria Cognitive Aptitude Test has 50 multiple-choice questions in 15 minutes. Criteria Corp says it measures three abilities: verbal ability (vocabulary, sentence completion and word comparisons), math and logic (arithmetic, proportions, word problems and logic) and spatial reasoning (shape patterns, rotating or flipping shapes and spotting the odd one out). No calculator is allowed.",
  },
  {
    q: "How is the CCAT scored, and what is a good score?",
    a: "The employer gets your raw score, the number you answered correctly out of 50, and a percentile that compares you with Criteria's norm group, plus percentiles for verbal, math and logic, and spatial reasoning. There is no pass mark: each employer compares the score with a suggested range for the role. Criteria reports a median of 24 out of 50. Tigertest reports percent correct, so 48% matches that median, but it is not a CCAT percentile.",
  },
  {
    q: "How do I handle 50 questions in 15 minutes?",
    a: "That is about 18 seconds a question, and Criteria says very few people finish. A wrong answer costs nothing, so never leave a question blank: if one takes too long, guess and move on. Practice the fast skills (mental arithmetic, spotting a series rule, quick word meanings) until they are automatic.",
  },
  {
    q: "Is this the real CCAT?",
    a: "No. Every question here is original, written for Tigertest on the question types Criteria publishes, not taken from Criteria's example questions or any real test. Tigertest is not affiliated with Criteria Corp. The practice tests copy the real length and clock: 50 questions with five choices in 15 minutes. Spatial questions are written in words, since this practice test has no pictures.",
  },
  {
    q: "Can I retake the CCAT?",
    a: "Criteria does not set one retake rule: the employer who sends you the test decides whether you can take it again and when. Criteria's pages say the test can be taken on any device, a phone, tablet, laptop or desktop.",
  },
  {
    q: "Is the Tigertest CCAT practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the first four drills are free; Practice Test 2 and the other four drills are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CCAT practice test, free CCAT practice test 2026, Criteria Cognitive Aptitude Test practice, CCAT test questions, Criteria aptitude test, cognitive aptitude test practice, pre-employment aptitude test, 15 minute 50 question test",
  alternates: {
    canonical: `${siteUrl}/ccat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ccat-practice-test`,
    images: [{ url: shareImageUrl("ccat"), width: 1200, height: 630, alt: "Tigertest CCAT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ccat")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - CCAT Practice Test",
      description,
      url: `${siteUrl}/ccat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ccat"),
      featureList: [
        "200 original cognitive aptitude questions with explanations",
        "2 timed practice tests: 50 five-choice questions in 15 minutes",
        "Vocabulary, analogies, sentence completion, arithmetic, word problems, series, logic and spatial reasoning",
        "8 drills, one per question type",
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
        classFaqJsonLd("ccat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Vocabulary", weight: "6 questions" },
  { name: "Analogies", weight: "6 questions" },
  { name: "Sentence completion", weight: "6 questions" },
  { name: "Arithmetic", weight: "6 questions" },
  { name: "Word problems", weight: "8 questions" },
  { name: "Number and letter series", weight: "5 questions" },
  { name: "Logic", weight: "5 questions" },
  { name: "Spatial reasoning", weight: "8 questions" },
];

export default function CcatLandingPage() {
  return (
    <div data-theme="ccat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CCAT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ccat/dashboard"
            shortName="CCAT"
            subtitle="200 CCAT-style questions, timed like the real thing: 50 in 15 minutes. Free to start, no account needed."
            shots={{ mobile: "/landing/ccat-mobile.png", desktop: "/landing/ccat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ccat" />

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
                Eight drills: vocabulary, analogies, sentence completion, arithmetic, word problems, number and letter series, logic and spatial reasoning. Questions you miss come back until you have mastered them, and every answer is explained.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Timed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two tests of 50 five-choice questions on the real 15-minute clock, with a raw score, a percent-correct score and a breakdown by question type. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on Criteria&apos;s Own Description
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Criteria Corp describes the CCAT as 50 questions in 15 minutes on three abilities: verbal ability, math and logic, and spatial reasoning. It publishes no count per question type, so each practice test here spreads its 50 questions like this, with easy and hard questions mixed:
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
                src={getTigerAsset("ccat", 3)}
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
            How to Prepare for the CCAT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Answer every question</h3>
              <p>
                Criteria says there is no penalty for a wrong answer and very few people finish all 50. A blank scores nothing and a guess may score, so pick an answer for every question before the clock runs out.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Skip the slow ones</h3>
              <p>
                At about 18 seconds a question, one long word problem can cost you three quick vocabulary points. If you cannot see the method in a few seconds, guess, flag it and come back if time is left.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Make mental math automatic</h3>
              <p>
                Averages, percents, fractions and proportions come up again and again, with no calculator. Learn the shortcuts (an average times the count gives the total; 10% then add or halve for other percents) so a sum takes seconds.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Name the rule before you look</h3>
              <p>
                For a series, an analogy or a shape pattern, say the rule to yourself first (adds 7, part to whole, one more side each time), then find the choice that fits. Five choices are easier to sort when you already know what you want.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CCAT Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ccat" />
        </div>
      </div>

      <SampleQuestionsV2 examId="ccat" />

      <ExamRelatedTests examId="ccat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Beat the 15-Minute Clock?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across eight question types.</p>
          <ExamLandingCTA dashboardHref="/ccat/dashboard" />
        </div>
      </div>
    </div>
  );
}

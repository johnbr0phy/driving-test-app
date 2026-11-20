import "@/lib/v2/banks/wonderlic";
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

const title = "Free Wonderlic Practice Test 2026 - 50 Questions in 12 Minutes";
const metaDescription =
  "Wonderlic practice tests, free to start: 200 original cognitive ability questions with explanations, timed 50-question, 12-minute tests and drills on math, vocabulary, series, logic and spatial reasoning.";
const description =
  "Wonderlic practice tests, free to start, with 200 original questions on the question types Wonderlic describes for its cognitive ability test: two timed tests of 50 questions in 12 minutes that get harder as they go, and seven drills on vocabulary, verbal reasoning, arithmetic, word problems, number and letter series, logic and spatial reasoning. Every answer has an explanation.";

const faqs = [
  {
    q: "What is on the Wonderlic test?",
    a: "The Wonderlic cognitive ability test has 50 questions in 12 minutes. Wonderlic says the questions cover simple math, basic logic, language comprehension, spatial reasoning and pattern identification, and its test-taker pages name word problems, number series, logic puzzles, vocabulary and analogies, with no single topic dominating. The questions get harder as the test goes on. Employers may also give Wonderlic's personality and motivation sections, which are not covered here.",
  },
  {
    q: "How is the Wonderlic scored, and what is a good score?",
    a: "Wonderlic does not simply count right answers: it estimates ability from your whole response pattern, weighting each question by its difficulty and the effect of guessing. There is no universal pass or fail; each employer compares your result with the profile for the job. Wonderlic says the classic 50-question test averages a score of about 20. Tigertest reports percent correct, so 40% is roughly that average, but it is not a Wonderlic score.",
  },
  {
    q: "How do I finish 50 questions in 12 minutes?",
    a: "That is about 14 seconds a question. The early questions are the easiest, so move through them quickly, and when a question takes too long, make your best guess and move on, as Wonderlic's own advice says. Practice the fast skills (arithmetic without a calculator, spotting a series rule, quick word meanings) until they are automatic.",
  },
  {
    q: "Is this the real Wonderlic test?",
    a: "No. Every question here is original, written for Tigertest on the question types Wonderlic publishes, not taken from Wonderlic's sample questions or any real test. Tigertest is not affiliated with Wonderlic. The practice tests copy the real length and clock: 50 questions in 12 minutes, easier to harder. Spatial questions are written in words, since this practice test has no pictures.",
  },
  {
    q: "Can I use a calculator?",
    a: "Plan on working without one. The practice tests here give no calculator, and the arithmetic is the kind you can do in your head or on scratch paper in a few seconds. Follow the instructions your employer sends with the test.",
  },
  {
    q: "Is the Tigertest Wonderlic practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last are free; the Spatial Reasoning drill and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Wonderlic practice test, free Wonderlic practice test 2026, Wonderlic test questions, Wonderlic personnel test practice, WonScore practice, cognitive ability test practice, pre-employment test practice, 12 minute 50 question test",
  alternates: {
    canonical: `${siteUrl}/wonderlic-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/wonderlic-practice-test`,
    images: [{ url: shareImageUrl("wonderlic"), width: 1200, height: 630, alt: "Tigertest Wonderlic practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("wonderlic")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Wonderlic Practice Test",
      description,
      url: `${siteUrl}/wonderlic-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("wonderlic"),
      featureList: [
        "200 original cognitive ability questions with explanations",
        "2 timed practice tests: 50 questions in 12 minutes, easier to harder",
        "Vocabulary, verbal reasoning, arithmetic, word problems, series, logic and spatial reasoning",
        "7 drills, one per question type",
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
        classFaqJsonLd("wonderlic"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Vocabulary", weight: "8 questions" },
  { name: "Verbal reasoning", weight: "7 questions" },
  { name: "Arithmetic", weight: "8 questions" },
  { name: "Word problems", weight: "8 questions" },
  { name: "Number and letter series", weight: "7 questions" },
  { name: "Logic", weight: "7 questions" },
  { name: "Spatial reasoning", weight: "5 questions" },
];

export default function WonderlicLandingPage() {
  return (
    <div data-theme="wonderlic" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Wonderlic Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/wonderlic/dashboard"
            shortName="Wonderlic"
            subtitle="200 Wonderlic questions, timed like the real thing: 50 in 12 minutes. Free to start, no account needed."
            shots={{ mobile: "/landing/wonderlic-mobile.png", desktop: "/landing/wonderlic-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="wonderlic" />

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
                Seven drills: vocabulary, verbal reasoning, arithmetic, word problems, number and letter series, logic and spatial reasoning. Questions you miss come back until you have mastered them, and every answer is explained.
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
                Two tests of 50 questions on the real 12-minute clock, getting harder as they go, with a percent-correct score and a breakdown by question type. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on Wonderlic&apos;s Own Description
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Wonderlic describes its cognitive ability test as 50 questions in 12 minutes on simple math, basic logic, language comprehension, spatial reasoning and pattern identification, getting harder as it goes. It publishes no count per question type, so each practice test here spreads its 50 questions like this, from easier to harder:
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
                src={getTigerAsset("wonderlic", 3)}
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
            How to Prepare for the Wonderlic
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Bank time on the early questions</h3>
              <p>
                The test gets harder as it goes, so the first questions are your cheapest points. Answer them fast and carry the seconds you save into the harder ones near the end.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make mental math automatic</h3>
              <p>
                Percents, fractions, unit prices and simple rates come up again and again. Learn the shortcuts (10% then halve for 5%, multiply by the reciprocal to divide by a fraction) so a sum takes seconds, not a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the common patterns</h3>
              <p>
                Most series add, multiply, square or alternate two steps, and most analogies are part to whole, tool to use or opposite. Name the rule out loud before you look at the choices, and check it on two steps of the series.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice on the clock, then guess and move on</h3>
              <p>
                At about 14 seconds a question, getting stuck is the costliest mistake. Take a timed test, notice where you stall, drill that question type, and on test day make your best guess when a question runs long.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Wonderlic Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="wonderlic" />
        </div>
      </div>

      <SampleQuestionsV2 examId="wonderlic" />

      <ExamRelatedTests examId="wonderlic" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Beat the 12-Minute Clock?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across seven question types.</p>
          <ExamLandingCTA dashboardHref="/wonderlic/dashboard" />
        </div>
      </div>
    </div>
  );
}

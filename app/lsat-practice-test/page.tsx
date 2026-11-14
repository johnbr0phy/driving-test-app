import "@/lib/v2/banks/lsat";
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

const title = "Free LSAT Practice Test 2026 - Logical Reasoning & Reading";
const metaDescription =
  "Free LSAT practice tests: 203 original Logical Reasoning and Reading Comprehension questions with explanations, timed 35-minute sections and a 120 to 180 score estimate.";
const description =
  "Free LSAT practice tests with 203 original questions in the current format: two Logical Reasoning sections of 25 questions and a Reading Comprehension section of 27 questions on three passages and a comparative passage pair, each timed at 35 minutes with five answer choices. Every answer has an explanation, nine drills cover each question family, and each test ends with an estimated score from 120 to 180.";

const faqs = [
  {
    q: "What is on the LSAT?",
    a: "The LSAT has four 35-minute multiple-choice sections: two scored Logical Reasoning sections, one scored Reading Comprehension section and one unscored variable section, which can be either type and is used to try out new questions. There is a 10-minute intermission between the second and third sections. Separately, you write LSAT Argumentative Writing, a 50-minute unscored essay taken online, which must be on file before LSAC releases your score.",
  },
  {
    q: "Are logic games still on the LSAT?",
    a: "No. Analytical Reasoning, the section known as logic games, was removed starting with the August 2024 LSAT and replaced by a second scored Logical Reasoning section. That is why this practice test has two Logical Reasoning sections and no games.",
  },
  {
    q: "How is the LSAT scored?",
    a: "Your score is based on the number of questions you answer correctly, converted to a scale from 120 to 180, and there is no deduction for wrong answers, so never leave a question blank. Each test form has its own conversion. Tigertest estimates a 120 to 180 score from your total correct on its practice tests, so treat it as a guide, not an official score.",
  },
  {
    q: "Is the LSAT changing in 2027?",
    a: "LSAC has announced that from the August 2027 test the unscored questions will be built into the three scored sections instead of filling a fourth section: Reading Comprehension first, then two Logical Reasoning sections, with a break after each of the first two. LSAC says the test will measure the same skills with the same kinds of questions, so practice on today's question types still applies. Check lsac.org for the format in force when you test.",
  },
  {
    q: "Is this practice test the same format as the real LSAT?",
    a: "It follows the scored part of the test: two Logical Reasoning sections of 25 questions and one Reading Comprehension section of 27 questions on four passage sets, one of them a comparative pair, each 35 minutes, with five answer choices and the intermission after the second section. The unscored variable section and the writing sample are not included. Every question and passage is original, not taken from LSAC PrepTests or official samples.",
  },
  {
    q: "Is the Tigertest LSAT practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and every drill but the last two are free; those two drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "LSAT practice test, free LSAT practice test 2026, LSAT logical reasoning practice, LSAT reading comprehension practice, LSAT practice questions, law school admission test practice, LSAT comparative reading",
  alternates: {
    canonical: `${siteUrl}/lsat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/lsat-practice-test`,
    images: [{ url: shareImageUrl("lsat"), width: 1200, height: 630, alt: "Tigertest free LSAT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("lsat")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free LSAT Practice Test",
      description,
      url: `${siteUrl}/lsat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("lsat"),
      featureList: [
        "203 original LSAT practice questions with explanations",
        "2 full practice tests: Logical Reasoning 25 + 25 and Reading Comprehension 27, 35 minutes each",
        "Comparative reading passage pairs, five answer choices on every question",
        "Estimated LSAT score from 120 to 180",
        "9 drills by question family",
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
        classFaqJsonLd("lsat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Logical Reasoning, section 1", weight: "25 questions, 35 min" },
  { name: "Logical Reasoning, section 2", weight: "25 questions, 35 min" },
  { name: "Reading Comprehension", weight: "27 questions, 35 min" },
];

export default function LsatLandingPage() {
  return (
    <div data-theme="lsat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free LSAT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/lsat/dashboard"
            shortName="LSAT"
            subtitle="203 original Logical Reasoning and Reading Comprehension questions in the current LSAT format. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/lsat-mobile.png", desktop: "/landing/lsat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="lsat" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Question Family</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nine drills: argument structure, assumptions, strengthen and weaken, flaws, inference, and parallel reasoning and principles for Logical Reasoning, plus main point, detail and inference, and comparative reading for Reading Comprehension. Questions you miss come back until you have mastered them.
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
                Two full tests of the three scored sections on the real clock: two Logical Reasoning sections, the 10-minute intermission, then Reading Comprehension, 35 minutes each. You get an estimated score from 120 to 180. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the Current LSAT Format
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Since August 2024 the LSAT scores two Logical Reasoning sections and one Reading Comprehension section. Every practice test here has those three sections at the real length and time, with the full range of argument questions and a Reading Comprehension section of three single passages and one comparative pair.
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
                src={getTigerAsset("lsat", 1)}
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
            How to Prepare for the LSAT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Find the conclusion first</h3>
              <p>
                Most Logical Reasoning questions turn on the gap between an argument&apos;s evidence and its conclusion. Before reading the choices, say the conclusion in your own words and ask what it takes for granted. Assumption, strengthen, weaken and flaw questions are all about that gap.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn conditional reasoning</h3>
              <p>
                &quot;Only if,&quot; &quot;unless,&quot; &quot;every&quot; and &quot;no&quot; carry much of the test. Know that a condition being necessary does not make it sufficient, that a rule tells you nothing when its condition is absent, and how a chain of conditionals links up. Inference and parallel reasoning questions reward this most.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read passages for their structure</h3>
              <p>
                In Reading Comprehension, note what each paragraph does and where the author stands before you look at the questions. Main point, purpose and attitude questions then take seconds. For comparative pairs, ask what the two passages share and where they part ways.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice under the clock, then drill your weakest family</h3>
              <p>
                Each section gives you about 1 minute 20 seconds a question, and a wrong answer costs nothing, so answer every question. Take a full timed test, then use the score breakdown to pick the drill that costs you the most points, and work it until you have mastered it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          LSAT Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="lsat" />
        </div>
      </div>

      <SampleQuestionsV2 examId="lsat" />

      <ExamRelatedTests examId="lsat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Take On the LSAT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 203 questions across both question types.</p>
          <ExamLandingCTA dashboardHref="/lsat/dashboard" />
        </div>
      </div>
    </div>
  );
}

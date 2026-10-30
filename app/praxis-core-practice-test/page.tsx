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

const title = "Free Praxis Core Practice Test 2026 - Reading, Writing, Math";
const metaDescription =
  "Free Praxis Core practice test for future teachers: 200 original Reading (5713), Writing (5723) and Math (5733) questions, timed at the real pace, with explanations.";
const description =
  "Free Praxis Core practice tests with 200 original questions written to the ETS study companions for Reading 5713, Writing 5723 and Mathematics 5733. Each practice test has a timed Reading, Writing and Math section at the real pace, with passages, usage and sentence correction items, revision in context, research skills, a calculator on Math, select-all and numeric-entry questions, and an explanation for every answer. Seven drills, three of which teach the basics first.";

const faqs = [
  {
    q: "What is on the Praxis Core?",
    a: "Three tests, which you can take separately or together as the combined test (5752). Reading (5713) is 56 questions in 85 minutes on passages and short statements. Writing (5723) is a 40-minute section of 40 multiple-choice questions on usage, sentence correction, revision and research skills, then two 30-minute essays. Mathematics (5733) is 56 questions in 90 minutes on number and quantity, data and probability, and algebra and geometry.",
  },
  {
    q: "What score do I need to pass the Praxis Core?",
    a: "Each test is scored from 100 to 200, and each state sets its own passing score. Many states use 156 for Reading, 162 for Writing and 150 for Math, but some differ, so check your state's requirement on the ETS website or with your teacher preparation program. Tigertest reports percent correct, so aim for 70 percent or better before you book.",
  },
  {
    q: "Can I use a calculator on the Praxis Core Math test?",
    a: "Yes. The real Mathematics test (5733) gives you an on-screen four-function calculator, and you cannot bring your own. Tigertest has a calculator one tap away on every Math question. Some questions ask you to select more than one answer or to type a number instead of choosing one.",
  },
  {
    q: "Is this practice test the same format as the real Praxis Core?",
    a: "It follows the same structure at half length and the same pace: Reading 28 questions in 43 minutes, Writing 20 questions in 20 minutes and Math 28 questions in 45 minutes, with five answer choices and the real question types. The two Writing essays are not included. The questions are original, written to the ETS content topics, not taken from ETS.",
  },
  {
    q: "Is the Tigertest Praxis Core practice test free?",
    a: "Yes. Both practice tests, all seven drills, the basics lessons and every explanation are free, with no account required. A free account saves your progress across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Praxis Core practice test, free Praxis Core practice test, Praxis Core reading 5713, Praxis Core writing 5723, Praxis Core math 5733, Praxis 5752 combined test, Praxis Core Academic Skills for Educators, teacher certification test practice",
  alternates: {
    canonical: `${siteUrl}/praxis-core-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/praxis-core-practice-test`,
    images: [{ url: shareImageUrl("praxis"), width: 1200, height: 630, alt: "Tigertest free Praxis Core practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("praxis")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Praxis Core Practice Test",
      description,
      url: `${siteUrl}/praxis-core-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 original Praxis Core practice questions with explanations",
        "2 practice tests with timed Reading, Writing and Math sections at the real pace",
        "Passages, paired passages and data tables for Reading",
        "Usage, sentence correction, revision in context and research skills for Writing",
        "Calculator, select-all and numeric-entry questions for Math",
        "7 drills, with the basics taught first in reading, grammar and number skills",
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
        classFaqJsonLd("praxis"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Reading: Key Ideas and Details", weight: "17 to 22 of 56" },
  { name: "Reading: Craft, Structure, and Language Skills", weight: "14 to 19 of 56" },
  { name: "Reading: Integration of Knowledge and Ideas", weight: "17 to 22 of 56" },
  { name: "Writing: Language and Research Skills", weight: "28 to 34 of 40" },
  { name: "Writing: Text Types, Purposes, and Production", weight: "6 to 12 of 40, plus essays" },
  { name: "Math: Number and Quantity", weight: "36%" },
  { name: "Math: Data, Statistics, and Probability", weight: "32%" },
  { name: "Math: Algebra and Geometry", weight: "32%" },
];

export default function PraxisCoreLandingPage() {
  return (
    <div data-theme="praxis" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Praxis Core Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/praxis-core/dashboard"
            shortName="Praxis Core"
            subtitle="200 original Reading, Writing and Math questions for future teachers, timed at the real pace. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/praxis-mobile.png", desktop: "/landing/praxis-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="praxis" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Skill</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills follow the ETS content categories. Key Ideas, Usage and Number and Quantity open with short lessons on the basics, such as finding the main idea, subject-verb agreement and percents, before the test-level questions. Questions you miss come back until you have mastered them.
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
                Two practice tests, each with a timed Reading, Writing and Math section at half length and the real pace: 76 questions in about 1 hour 50 minutes. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.
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
                Built on the ETS Content Categories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ETS publishes the content categories for each Praxis Core test in its study companions. Every practice test here keeps the same balance across Reading, the Writing selected-response section and Math.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold text-right">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("praxis", 1)}
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
            How to Pass the Praxis Core
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Check your state&apos;s scores first</h3>
              <p>
                Each state sets its own passing score for each test, and some programs accept other tests instead. Find out which of the three you need and the score for each, then plan to take the weakest one when you are ready rather than all three at once.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read for what the passage says</h3>
              <p>
                Reading questions reward answers that the passage supports, not answers that are true in general. Underline the main claim, notice signal words like however and therefore, and on paired passages ask where the two authors agree before asking where they differ.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the handful of grammar rules that keep coming back</h3>
              <p>
                Usage and sentence correction questions test the same rules again and again: subject-verb agreement with words in between, pronoun case, verb tense, modifiers, parallel structure and comma splices. Remember that No error and choice A, the original, are sometimes right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the math without leaning on the calculator</h3>
              <p>
                The calculator is only four-function. Fractions, percents, ratios, rates, mean and median, and simple equations are quick points if you can set them up. Tigertest tracks your accuracy by category, so drill the one you miss most until you are comfortably over 70 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Praxis Core Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="praxis" />
        </div>
      </div>

      <ExamRelatedTests examId="praxis" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Praxis Core?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across Reading, Writing and Math.</p>
          <ExamLandingCTA dashboardHref="/praxis-core/dashboard" />
        </div>
      </div>
    </div>
  );
}

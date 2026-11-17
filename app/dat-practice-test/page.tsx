import "@/lib/v2/banks/dat";
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

const title = "Free DAT Practice Test 2026 - Sciences, Reading and Quantitative";
const metaDescription =
  "DAT practice test: 214 original questions in biology, general chemistry, organic chemistry, reading comprehension and quantitative reasoning, with explanations on every answer.";
const description =
  "DAT practice tests with 214 original questions on the ADA's Dental Admission Test specifications: the Survey of the Natural Sciences (biology, general chemistry and organic chemistry, on the organic chemistry outline in force since April 2026), Reading Comprehension on scientific passages, and Quantitative Reasoning with a calculator. Each practice test runs these three sections at half length and the real pace, with an explanation on every answer and a percent score by section. The picture-based Perceptual Ability Test is not included.";

const faqs = [
  {
    q: "What is on the DAT?",
    a: "The DAT has four multiple-choice sections. The Survey of the Natural Sciences has 100 questions: 40 biology, 30 general chemistry and 30 organic chemistry. The Perceptual Ability Test has 90 questions in six picture subtests: apertures, view recognition, angle discrimination, paper folding, cube counting and 3D form development. Reading Comprehension has 50 questions on three passages about scientific topics, and needs no prior knowledge of the topic. Quantitative Reasoning has 40 questions on algebra, data analysis and sufficiency, quantitative comparison, probability and statistics, and word problems.",
  },
  {
    q: "How long is the DAT?",
    a: "The Survey of the Natural Sciences takes 90 minutes, the Perceptual Ability Test 60, Reading Comprehension 60 and Quantitative Reasoning 45. With the optional 15-minute tutorial, an optional 30-minute break after the first two sections and an optional 15-minute survey, the whole appointment is 5 hours 15 minutes.",
  },
  {
    q: "How is the DAT scored?",
    a: "Since March 1, 2025, DAT results are scale scores from 200 to 600 in 10-point steps, which replaced the old 1 to 30 scale. There is no official passing score: each dental program decides what it accepts. You are not penalized for guessing, so answer every question. The ADA equates each test form and publishes no conversion from questions right, so Tigertest shows percent correct, not a DAT scale score.",
  },
  {
    q: "Can I use a calculator on the DAT?",
    a: "Only in Quantitative Reasoning, where a basic on-screen calculator is provided. The Survey of the Natural Sciences has no calculator, but a periodic table is available during the general chemistry questions. Tigertest's practice tests work the same way.",
  },
  {
    q: "How is this practice test different from the real DAT?",
    a: "Each practice test has the Survey of the Natural Sciences, Reading Comprehension and Quantitative Reasoning in the real order, each at half the real length at the same pace: 50 science questions in 45 minutes, 25 reading questions on two passages in 30 minutes and 20 quantitative questions in 23 minutes. The Perceptual Ability Test is left out because every one of its subtests is a picture task that cannot be shown faithfully in text. Organic structures are given as names and condensed formulas rather than drawings. Every question is original, written from the ADA's published test specifications.",
  },
  {
    q: "Is the Tigertest DAT practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and most drills are free; the last drill and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "DAT practice test, DAT practice exam, DAT practice questions, dental admission test practice, DAT biology practice, DAT organic chemistry practice, DAT general chemistry practice, DAT reading comprehension, DAT quantitative reasoning",
  alternates: {
    canonical: `${siteUrl}/dat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/dat-practice-test`,
    images: [{ url: shareImageUrl("dat"), width: 1200, height: 630, alt: "Tigertest DAT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("dat")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - DAT Practice Test",
      description,
      url: `${siteUrl}/dat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("dat"),
      featureList: [
        "214 original DAT practice questions with explanations",
        "2 practice tests with three DAT sections at half length and the real pace",
        "Biology, general chemistry and organic chemistry on the ADA test specifications",
        "Reading comprehension on scientific passages and quantitative reasoning with a calculator",
        "7 drills by topic",
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
        classFaqJsonLd("dat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Biology", weight: "20 questions" },
  { name: "General Chemistry", weight: "15 questions" },
  { name: "Organic Chemistry", weight: "15 questions" },
  { name: "Reading Comprehension", weight: "25 questions" },
  { name: "Quantitative Reasoning", weight: "20 questions" },
];

export default function DatLandingPage() {
  return (
    <div data-theme="dat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free DAT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/dat/dashboard"
            shortName="DAT"
            subtitle="214 original questions in biology, general and organic chemistry, reading comprehension and quantitative reasoning. Free to start, no account needed."
            shots={{ mobile: "/landing/dat-mobile.png", desktop: "/landing/dat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="dat" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills: cells and genetics, organisms and ecology, general chemistry, organic chemistry, reading comprehension, algebra and comparisons, and data and word problems. Each question you miss comes back until you have mastered it.
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
                Two practice tests with the Survey of the Natural Sciences, Reading Comprehension and Quantitative Reasoning in the real order, each half the real length at the same pace, with a break after the sciences. You get a percent score for each section. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the ADA Test Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test keeps the real DAT&apos;s proportions at half length: 40% biology, 30% general chemistry and 30% organic chemistry in the sciences, then reading passages on scientific topics and a quantitative section with a calculator. Biology covers cell and molecular biology, diversity of life, organ systems, genetics, and evolution and ecology; organic chemistry follows the outline updated in April 2026. The Perceptual Ability Test is not included, because all six of its subtests are picture tasks.
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
                src={getTigerAsset("dat", 3)}
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
            How to Prepare for the DAT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Keep a pace of about a minute a question in the sciences</h3>
              <p>
                The Survey of the Natural Sciences gives 90 minutes for 100 questions across biology, general chemistry and organic chemistry. Answer what you know quickly, flag what you do not, and come back. A wrong answer costs nothing, so never leave a question blank.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn organic chemistry as patterns</h3>
              <p>
                Most organic questions turn on a few ideas used over and over: where electrons go in a mechanism, which carbocation or anion is most stable, what each reagent does to each functional group, and how stereochemistry follows from the mechanism. Group reactions by what they do rather than memorizing them one by one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read for details you can find again</h3>
              <p>
                Reading Comprehension gives three scientific passages and many detail questions in 60 minutes. Read each passage once for its structure, noting what each paragraph covers, so you can go straight back to the line a question asks about. Answer from the passage, not from what you already know about the topic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Set up the math before you reach for the calculator</h3>
              <p>
                Quantitative Reasoning allows a basic on-screen calculator, but most time is lost setting problems up, not on arithmetic. Write the equation for a rate, mixture or percent problem first, and estimate the answer so you can catch a slip.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          DAT Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="dat" />
        </div>
      </div>

      <SampleQuestionsV2 examId="dat" />

      <ExamRelatedTests examId="dat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Take On the DAT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 214 questions across the sciences, reading and quantitative reasoning.</p>
          <ExamLandingCTA dashboardHref="/dat/dashboard" />
        </div>
      </div>
    </div>
  );
}

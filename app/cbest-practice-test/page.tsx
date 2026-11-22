import "@/lib/v2/banks/cbest";
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

const title = "Free CBEST Practice Test 2026 - Reading and Math";
const metaDescription =
  "CBEST practice test for California teachers and substitutes, free to start: 170 original Reading and Math questions written to the CBEST test specifications, timed at the real pace, with explanations.";
const description =
  "CBEST practice tests, free to start, with 170 original questions written to the CBEST Test Specifications for Reading and Mathematics. Each practice test has a timed Reading and Math section at half length and the real pace, with passages, letters and notices, paired passages, tables of contents, indexes and data tables for Reading, no-calculator Math in U.S. units, and an explanation for every answer. Six drills, four of which teach the basics first.";

const faqs = [
  {
    q: "What is on the CBEST?",
    a: "Three sections, registered and taken separately, all in English. Reading is 50 multiple-choice questions in 1 hour 30 minutes, about 40 percent critical analysis and evaluation and 60 percent comprehension and research skills. Mathematics is 50 multiple-choice questions in 2 hours on estimation, measurement and statistics, computation and problem solving, and numerical and graphic relationships. Writing is two essays in 1 hour 30 minutes, one analyzing a situation or statement and one about a personal experience.",
  },
  {
    q: "What score do I need to pass the CBEST?",
    a: "Each section is scored from 20 to 80. You pass with a scaled score of 41 on every section, or with a total of 123 across Reading, Mathematics and Writing as long as no section is below 37. Passing scores do not expire. Tigertest reports percent correct, so aim for 70 percent or better on both sections before you book.",
  },
  {
    q: "Can I use a calculator on the CBEST Math section?",
    a: "No. Calculators are not allowed on the CBEST, so Tigertest's Math sections have no calculator either. The questions use whole numbers, fractions, decimals and percents that can be worked by hand, and units are U.S. customary: feet and inches, pounds and ounces, quarts and gallons, degrees Fahrenheit.",
  },
  {
    q: "Is this practice test the same format as the real CBEST?",
    a: "It follows the same structure at half length and the same pace: Reading 25 questions in 45 minutes and Math 25 questions in 60 minutes, with the same balance of content areas. The Writing essays are not included. The questions are original, written to the CBEST test specifications, not taken from Pearson or the Commission on Teacher Credentialing.",
  },
  {
    q: "Is the Tigertest CBEST practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the first drills are free; the later drills and practice tests are part of Tigertest Premium, one payment with no subscription. A free account saves your progress across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CBEST practice test, free CBEST practice test, CBEST reading practice, CBEST math practice, California Basic Educational Skills Test, CBEST test 095 096, California basic skills requirement, California teacher credential test, substitute teacher test California",
  alternates: {
    canonical: `${siteUrl}/cbest-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cbest-practice-test`,
    images: [{ url: shareImageUrl("cbest"), width: 1200, height: 630, alt: "Tigertest free CBEST practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cbest")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CBEST Practice Test",
      description,
      url: `${siteUrl}/cbest-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cbest"),
      featureList: [
        "170 original CBEST practice questions with explanations",
        "2 practice tests with timed Reading and Math sections at the real pace",
        "Passages, paired passages, notices, tables of contents, indexes and data tables for Reading",
        "No-calculator Math in U.S. customary units",
        "6 drills, with the basics taught first in reading and number skills",
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
        classFaqJsonLd("cbest"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Reading: Critical Analysis and Evaluation", weight: "about 40%" },
  { name: "Reading: Comprehension and Research Skills", weight: "about 60%" },
  { name: "Math: Estimation, Measurement, and Statistical Principles", weight: "about 30%" },
  { name: "Math: Computation and Problem Solving", weight: "about 35%" },
  { name: "Math: Numerical and Graphic Relationships", weight: "about 35%" },
  { name: "Writing: two essays", weight: "not modelled" },
];

export default function CbestLandingPage() {
  return (
    <div data-theme="cbest" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CBEST Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cbest/dashboard"
            shortName="CBEST"
            subtitle="170 CBEST Reading and Math questions, timed at the real pace. Free to start, no account needed."
            shots={{ mobile: "/landing/cbest-mobile.png", desktop: "/landing/cbest-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cbest" />

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
                Six drills follow the CBEST test specifications. Critical Analysis, Comprehension, Computation and Numerical Relationships open with short lessons on the basics, such as fact versus opinion, finding the main idea, fraction operations and percent change, before the test-level questions. Questions you miss come back until you have mastered them.
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
                Two practice tests, each with a timed Reading and Math section at half length and the real pace: 50 questions in 1 hour 45 minutes, with no calculator. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.
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
                Built on the CBEST Test Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Commission on Teacher Credentialing publishes the skills each CBEST section tests and their approximate weights. Every practice test here keeps the same balance across Reading and Math. The Writing section is two essays, which this practice does not include.
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
                src={getTigerAsset("cbest", 3)}
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
            How to Pass the CBEST
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Use the 123 total to your advantage</h3>
              <p>
                You can pass with 41 on every section, or with a total of 123 as long as no section falls below 37, and each section can be taken on its own. A strong Reading score can carry a slightly weaker Math score, so take your best section first and retake only what you need.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read for what the passage says</h3>
              <p>
                Reading questions reward answers that the passage supports, not answers that are true in general. Underline the main claim, notice signal words like however and therefore, and on paired passages ask where the two authors agree before asking where they differ.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the research and reference questions</h3>
              <p>
                Some Reading questions are about finding information rather than reading a passage: a table of contents, an index entry with a see-also note, or a table or graph. Read the headings and page ranges carefully, and for a table, check every row before you choose a conclusion.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the math by hand</h3>
              <p>
                No calculator is allowed, so get quick at fractions, decimals, percents, unit conversions, averages and one-step equations. Estimate before you compute to catch a misplaced decimal, and know what a percentile and a stanine mean. Tigertest tracks your accuracy by area, so drill the one you miss most until you are comfortably over 70 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CBEST Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cbest" />
        </div>
      </div>

      <SampleQuestionsV2 examId="cbest" />

      <ExamRelatedTests examId="cbest" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CBEST?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 170 questions across Reading and Math.</p>
          <ExamLandingCTA dashboardHref="/cbest/dashboard" />
        </div>
      </div>
    </div>
  );
}

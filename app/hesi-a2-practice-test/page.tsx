import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free HESI A2 Practice Test 2026 - Nursing Entrance Exam Prep";
const description =
  "Free HESI A2 practice tests with 200 questions across all seven scored sections: math with dosage conversions, reading comprehension passages, medical vocabulary, grammar, biology, chemistry, and anatomy and physiology. Worked solutions on every math item.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "HESI A2 practice test, HESI practice questions, HESI A2 math practice, HESI vocabulary practice, HESI anatomy and physiology practice test, HESI entrance exam prep 2026, free HESI A2 practice test",
  alternates: {
    canonical: `${siteUrl}/hesi-a2-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/hesi-a2-practice-test`,
    images: [{ url: "/og/hesi", width: 1200, height: 630, alt: "TigerTest free HESI A2 practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/hesi"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free HESI A2 Practice Tests",
      description,
      url: `${siteUrl}/hesi-a2-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 HESI practice questions",
        "4 practice tests across all seven sections",
        "Training sets for every domain",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What sections are on the HESI A2?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Math, reading comprehension, vocabulary and general knowledge, grammar, biology, chemistry, anatomy and physiology, and physics, plus unscored learning style and personality profiles. Programs choose which sections they require; math, reading, vocabulary, grammar and A&P are the most common. Physics is rarely required and is not included here.",
          },
        },
        {
          "@type": "Question",
          name: "What score do I need?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each section is scored separately as a percentage. Most programs require 75 percent or higher on each required section, and competitive programs look for 80 to 90. Check your program's admissions page; scores are usually valid for one to two years.",
          },
        },
        {
          "@type": "Question",
          name: "How long is the exam and can I use a calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Plan on about four hours for a full battery; each section is 25 to 55 items. An on-screen calculator is provided for the math section, so conversions and dosage problems can take a few steps.",
          },
        },
        {
          "@type": "Question",
          name: "How is HESI A2 different from the TEAS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Both are nursing entrance exams. The TEAS has four sections (reading, math, science, English) with one composite score; the HESI A2 breaks the sciences and language into separate sections with separate scores. TigerTest has a separate TEAS practice test.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest HESI practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Mathematics", weight: "18%" },
  { name: "Reading Comprehension", weight: "16%" },
  { name: "Vocabulary", weight: "16%" },
  { name: "Grammar", weight: "16%" },
  { name: "Biology", weight: "12%" },
  { name: "Chemistry", weight: "10%" },
  { name: "Anatomy & Physiology", weight: "12%" },
];

export default function HesiLandingPage() {
  return (
    <div data-theme="hesi" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="hesi" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free HESI A2 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hesi/dashboard"
            shortName="HESI A2"
            subtitle="200 questions across math, reading, vocabulary, grammar, biology, chemistry and A&P. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/hesi-mobile.png", desktop: "/landing/hesi-desktop.png" }}
          />
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Domain</h3>
              <p className="text-gray-600">
                Four sets: mathematics, reading and vocabulary, grammar, and biology, chemistry and anatomy and physiology. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests that sample every section the way the real exam does, with the key step shown on every math answer and the passage embedded in every reading item.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the HESI A2 Sections
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Elsevier&apos;s HESI A2 scores each section separately, and nursing programs choose which ones they require. The practice tests here give math and the sciences the most weight because those are where applicants lose the most points.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("hesi", 1)}
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The HESI A2 practice test is brand new. If a question looks wrong or your program tests a section differently, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Pass the HESI A2
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Memorize the conversions</h3>
              <p>
                1 kg is 2.2 lb, 1 in is 2.54 cm, 1 oz is 30 mL, 1 tsp is 5 mL, 1 tbsp is 15 mL, 1 cup is 240 mL, F equals C times 9/5 plus 32. Military time and Roman numerals too. The math section rewards memorized facts and careful arithmetic more than cleverness.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Read the question before the passage</h3>
              <p>
                Reading items ask one thing: main idea, a detail, an inference, a word&apos;s meaning. Know what you are hunting for, then read. Vocabulary is mostly medical and clinical words in context, so learn the HESI word list.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Review the sciences by system</h3>
              <p>
                Biology is cells, respiration, genetics and DNA. Chemistry is atoms, bonds, moles, pH and reactions. A&P goes system by system. A week on each with flashcards beats a month of rereading.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak section</h3>
              <p>
                TigerTest tracks your accuracy by section. Most programs require 75 percent in each required section, so retake the set you miss most until you clear 85 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          HESI A2 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What sections are on the HESI A2?</h3>
            <p className="text-gray-600">
              Math, reading comprehension, vocabulary and general knowledge, grammar, biology, chemistry, anatomy and physiology, and physics, plus unscored learning style and personality profiles. Programs choose which sections they require; math, reading, vocabulary, grammar and A&P are the most common. Physics is rarely required and is not included here.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What score do I need?</h3>
            <p className="text-gray-600">
              Each section is scored separately as a percentage. Most programs require 75 percent or higher on each required section, and competitive programs look for 80 to 90. Check your program&apos;s admissions page; scores are usually valid for one to two years.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How long is the exam and can I use a calculator?</h3>
            <p className="text-gray-600">
              Plan on about four hours for a full battery; each section is 25 to 55 items. An on-screen calculator is provided for the math section, so conversions and dosage problems can take a few steps.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How is HESI A2 different from the TEAS?</h3>
            <p className="text-gray-600">
              Both are nursing entrance exams. The TEAS has four sections (reading, math, science, English) with one composite score; the HESI A2 breaks the sciences and language into separate sections with separate scores. TigerTest has a separate TEAS practice test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest HESI practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="hesi" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass the HESI A2?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all seven sections.</p>
          <ExamLandingCTA dashboardHref="/hesi/dashboard" />
        </div>
      </div>
    </div>
  );
}

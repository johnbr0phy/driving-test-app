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

const title = "Free JNVST Class 6 Mock Test 2026 - Navodaya Practice";
const metaDescription =
  "Free Navodaya Class 6 mock tests: 205 original questions on Mental Ability, EVS, Arithmetic and Language, with two full 80-question tests in 2 hours and an explanation on every answer.";
const description =
  "Free JNVST Class 6 practice tests with 205 original questions on the Navodaya Vidyalaya Selection Test pattern: Mental Ability, EVS, Arithmetic and Language. Each full mock test has 80 questions in 2 hours, in the real order, with a simple explanation on every answer. The real Mental Ability questions are pictures; here they are written in words.";

const faqs = [
  {
    q: "What is the JNVST Class 6 exam pattern?",
    a: "The JNVST 2027 prospectus sets one test of 80 multiple-choice questions for 100 marks in 2 hours: Mental Ability 20 and EVS 20 (about 60 minutes together), Arithmetic 20 (30 minutes) and Language 20 (30 minutes). Each right answer gets 1.25 marks. All three sections are in one booklet and you mark answers on an OMR sheet with a blue or black ball pen.",
  },
  {
    q: "Is there negative marking in the Navodaya entrance test?",
    a: "No. A wrong answer costs nothing, so never leave a question blank. You do need the minimum qualifying marks in each section: 14 in Mental Ability and EVS, 7 in Arithmetic and 7 in Language. Seats are then given on merit district by district.",
  },
  {
    q: "Why are the Mental Ability questions written in words here?",
    a: "The real Mental Ability questions are figures and diagrams: pattern completion, figure series, completing a shape, mirror and water images and finding a hidden figure. Tigertest cannot show those pictures yet, so it gives text versions of the same thinking, such as letter and number patterns, mirror images of letters and clocks, paper folding and counting triangles. Practise the picture questions in the NVS sample paper as well.",
  },
  {
    q: "Are these real Navodaya previous year questions?",
    a: "No. Every question and passage is original, written for a Class 5 student to the topics in the JNVST prospectus. None is copied from previous papers or the official sample questions.",
  },
  {
    q: "Is the Tigertest JNVST mock test free?",
    a: "Yes. Both full mock tests and all eight drills are free, with no account required. Create a free account if you want progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "JNVST mock test, JNVST class 6 practice test, Navodaya class 6 mock test free, Navodaya entrance exam 2026, JNVST 2027, Navodaya Vidyalaya selection test questions, JNV class 6 mental ability arithmetic language EVS practice",
  alternates: {
    canonical: `${siteUrl}/jnvst-class-6-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/jnvst-class-6-practice-test`,
    images: [{ url: shareImageUrl("jnvst"), width: 1200, height: 630, alt: "Tigertest free JNVST Class 6 mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("jnvst")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free JNVST Class 6 Mock Test",
      description,
      url: `${siteUrl}/jnvst-class-6-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "205 original JNVST Class 6 practice questions with explanations",
        "2 full 80-question mock tests in 2 hours, in the real section order",
        "8 drills: patterns, mirrors and shapes, natural and social world, body and daily life, EVS passage, numbers, measurement and reading",
        "Written for Class 5 students",
        "Mental Ability reasoning in words, with the picture formats explained",
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
        classFaqJsonLd("jnvst"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Mental Ability", weight: "20 questions" },
  { name: "Environmental Studies (EVS)", weight: "20 questions" },
  { name: "Arithmetic", weight: "20 questions" },
  { name: "Language (4 passages)", weight: "20 questions" },
];

export default function JnvstLandingPage() {
  return (
    <div data-theme="jnvst" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free JNVST Class 6 Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/jnvst/dashboard"
            shortName="JNVST"
            subtitle="205 original Navodaya practice questions on Mental Ability, EVS, Arithmetic and Language. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/jnvst-mobile.png", desktop: "/landing/jnvst-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jnvst" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Short Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover every part of the test: patterns and series, mirrors and shapes, the natural and social world, the human body, an EVS passage, numbers, measurement and reading passages. Questions you miss come back until you get them right.
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
                Two 80-question mock tests in 2 hours, the real JNVST length, in the real order. Move between questions and flag the ones to check again. Practice Test 2 is kept out of the drills, so it shows how ready you are.
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
                Built on the JNVST Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Navodaya Vidyalaya Samiti sets 80 questions in four parts, 1.25 marks each, with no negative marking. Every mock test here follows that split. The real Mental Ability questions are figures; Tigertest writes the same reasoning in words, so look at the picture questions in the NVS sample paper as well.
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
                src={getTigerAsset("jnvst", 1)}
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
            How to Prepare for the Navodaya Entrance Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Give Mental Ability and EVS the most time</h3>
              <p>
                Together they are 40 of the 80 questions, half the marks, and they decide a tie. Practise patterns, mirror images and hidden shapes a little every day, with pictures from the NVS sample paper and your own drawings, and revise your EVS textbook.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your tables and units</h3>
              <p>
                Arithmetic questions are quick if you know the times tables to 20 and the units by heart: 1 km is 1,000 m, 1 kg is 1,000 g, 1 litre is 1,000 mL and 1 hour is 60 minutes. Write down each step on the rough sheet.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the questions before the passage</h3>
              <p>
                In the Language Test, look at the five questions first, then read the passage and find each answer in it. Many questions ask for a word meaning or its opposite, so read a story or newspaper every day and learn new words.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer every question</h3>
              <p>
                There is no negative marking, so never leave a circle empty. Take a full 2-hour mock test to practise your timing, and remember you need the minimum marks in each section, not only a good total.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          JNVST Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="jnvst" />
        </div>
      </div>

      <ExamRelatedTests examId="jnvst" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the JNVST?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 205 questions across all four parts.</p>
          <ExamLandingCTA dashboardHref="/jnvst/dashboard" />
        </div>
      </div>
    </div>
  );
}

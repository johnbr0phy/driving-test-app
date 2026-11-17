import "@/lib/v2/banks/wasscemath";
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

const title = "Free WASSCE Mathematics Practice Test 2027 - WAEC Paper 1";
const metaDescription =
  "Free WAEC WASSCE General Mathematics (Core Maths) practice: 200 original objective questions with full 50-question Paper 1 tests and worked answers.";
const description =
  "Free practice for WAEC's WASSCE General Mathematics, Mathematics (Core) in Ghana: 200 original objective questions on the common areas of the syllabus, from number bases and logarithms to mensuration, circle theorems, trigonometry and statistics. Two full 50-question Paper 1 tests in 1 hour 30 minutes, nine drills and a worked explanation on every answer.";

const faqs = [
  {
    q: "How many questions are in WAEC Mathematics Paper 1?",
    a: "WAEC's General Mathematics / Mathematics (Core) syllabus, as published by waecsyllabus.com and other copies of WAEC's document, says Paper 1 has 50 multiple-choice objective questions drawn from the common areas of the syllabus, answered in 1 1/2 hours for 50 marks. Paper 2 has 13 essay questions in two sections; you answer 10 of them in 2 1/2 hours for 100 marks. Both papers must be taken. Tigertest practice tests are full 50-question Paper 1 tests in 1 hour 30 minutes. Paper 2 is not modelled.",
  },
  {
    q: "Can I use a calculator in WASSCE Mathematics?",
    a: "Yes. The syllabus allows silent, cordless, non-programmable calculators that cannot print, send or receive information; phones are not allowed. WAEC-approved mathematical and statistical tables may also be used, and some questions may say that tables or calculators are not allowed. Tigertest gives you a calculator, but learn the exact values of sin, cos and tan at 30, 45 and 60 degrees and the laws of indices and logarithms, because many questions are quicker by hand.",
  },
  {
    q: "What topics does the WAEC Mathematics syllabus cover?",
    a: "The syllabus has nine parts: Number and Numeration, Algebraic Processes, Mensuration, Plane Geometry, Coordinate Geometry of Straight Lines, Trigonometry, Introductory Calculus, Statistics and Probability, and Vectors and Transformation. Paper 1 is drawn from the common areas. The syllabus flags some topics with symbols (for example matrices, binary operations, bearings, loci, calculus, and vectors and transformation). We read these as the areas not common to every country, so this practice bank keeps to the unflagged topics. Check your own country's teaching syllabus for the rest.",
  },
  {
    q: "Is this the same as Mathematics (Core) in Ghana?",
    a: "WAEC uses one syllabus document titled General Mathematics or Mathematics (Core) for The Gambia, Ghana, Liberia, Nigeria and Sierra Leone. waecsyllabus.com notes that WAEC Ghana sets its own subject list and, from 2026, also runs separate New Curriculum papers, so candidates in Ghana, Sierra Leone, Liberia and The Gambia should check the subject and paper code on their own WAEC timetable.",
  },
  {
    q: "Are these real WAEC past questions?",
    a: "No. These are original practice questions written to the WAEC syllabus, not WAEC past questions. Every answer was worked out and checked by computation, and each explanation shows the working and the slip behind the most tempting wrong answer. Your score is a percentage; WAEC grades results from A1 to F9 and does not publish how marks convert to grades. Everything here is free, with no account required. Tigertest is not affiliated with or endorsed by WAEC.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "WAEC Mathematics practice test, WASSCE Mathematics, WAEC maths objective, WAEC general mathematics, core maths WASSCE, SSCE maths practice, May/June WAEC maths, WAEC maths 2027, WAEC Ghana core mathematics, WAEC Nigeria mathematics",
  alternates: {
    canonical: `${siteUrl}/wassce-mathematics-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/wassce-mathematics-practice-test`,
    images: [{ url: shareImageUrl("wasscemath"), width: 1200, height: 630, alt: "Tigertest free WASSCE Mathematics practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("wasscemath")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free WASSCE Mathematics Practice Test",
      description,
      url: `${siteUrl}/wassce-mathematics-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("wasscemath", "NGN"),
      featureList: [
        "200 original WASSCE Mathematics objective questions with worked explanations",
        "2 full 50-question Paper 1 tests in 1 hour 30 minutes",
        "9 drills: number and numeration, indices and logarithms, sets and sequences, ratio and percentages, algebra, mensuration, plane geometry, coordinates and trigonometry, statistics and probability",
        "Basics lessons before five of the drills",
        "Every answer checked by computation",
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
        classFaqJsonLd("wasscemath"),
      ],
    },
  ],
};

const sections = [
  { name: "Number bases, fractions and approximation", detail: "6 questions" },
  { name: "Indices, logarithms and surds", detail: "5 questions" },
  { name: "Sets, logic and sequences", detail: "5 questions" },
  { name: "Ratio, percentages and variation", detail: "6 questions" },
  { name: "Algebraic processes", detail: "8 questions" },
  { name: "Mensuration", detail: "6 questions" },
  { name: "Plane geometry", detail: "5 questions" },
  { name: "Coordinate geometry and trigonometry", detail: "4 questions" },
  { name: "Statistics and probability", detail: "5 questions" },
];

export default function WassceMathematicsLandingPage() {
  return (
    <div data-theme="wasscemath" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free WASSCE Mathematics Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/wassce-mathematics/dashboard"
            shortName="WASSCE Maths"
            subtitle="200 original objective questions on the WAEC General Mathematics syllabus, with full 50-question Paper 1 tests and worked answers. For Nigeria, Ghana, Sierra Leone, Liberia and The Gambia. No account needed."
            shots={{ mobile: "/landing/wasscemath-mobile.png", desktop: "/landing/wasscemath-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="wasscemath" />

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
                Nine drills that follow the syllabus, from number bases and modular arithmetic to circle theorems and probability. Five of them start with short Basics lessons. Questions you miss come back until you have mastered them, and every answer shows the working.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Paper 1 Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 50-question objective papers in 1 hour 30 minutes, like WAEC&apos;s Paper 1, with a calculator and free movement between questions. Practice Test 2 is held out of the drills, so it measures how ready you are.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the WAEC Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test has 50 four-option questions on the common areas of the syllabus, the parts Paper 1 is drawn from. WAEC does not publish a count per topic, so this split is Tigertest&apos;s. Topics the syllabus flags with symbols, which we read as not common to every country (matrices, bearings, loci, calculus and vectors), are left out.
              </p>
              <div className="space-y-3">
                {sections.map((s) => (
                  <div key={s.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                    <span className="text-brand-dark font-semibold">{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("wasscemath", 3)}
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
            How to Do Well in WAEC Mathematics Paper 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Keep to under two minutes a question</h3>
              <p>
                Paper 1 gives you 90 minutes for 50 questions, just under two minutes each. Answer the quick ones first (sets, indices, angles, means) and come back to long calculations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the standard results</h3>
              <p>
                Many questions test a result you can learn: the laws of indices and logarithms, the nth term and sum of an A.P., the circle theorems, the angle sum of a polygon, arc and sector formulas, and the exact values of sin, cos and tan at 30, 45 and 60 degrees.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read what the question gives you</h3>
              <p>
                Use the value of pi the question states, usually 22/7, and any logarithm values it gives. Check the units and the accuracy asked for: decimal places and significant figures are different.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Check your answer against the options</h3>
              <p>
                Wrong options are usually a common slip: a forgotten minus sign, a radius used for a diameter, simple interest where compound was asked. When your answer matches an option, check it once by substituting back.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          WASSCE Mathematics Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="wasscemath" />
        </div>
      </div>

      <SampleQuestionsV2 examId="wasscemath" />

      <ExamRelatedTests examId="wasscemath" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for WASSCE Mathematics?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free, with no account required. 200 questions on the common areas of the syllabus.</p>
          <ExamLandingCTA dashboardHref="/wassce-mathematics/dashboard" />
        </div>
      </div>
    </div>
  );
}

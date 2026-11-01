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

const title = "Free JAMB Mathematics Practice Test 2027 - UTME CBT";
const metaDescription =
  "Free JAMB UTME Mathematics practice: 200 original questions across the whole syllabus, with 40-question timed tests. Every answer worked out and explained.";
const description =
  "Free JAMB UTME Mathematics practice with 200 original questions on the syllabus: number and numeration, algebra, progressions and matrices, geometry and mensuration, coordinate geometry and trigonometry, calculus, statistics and probability. Two full 40-question practice tests in 30 minutes, eight drills and a worked explanation on every answer.";

const faqs = [
  {
    q: "How many questions are in JAMB Mathematics?",
    a: "Mathematics is one of the 40-question UTME subjects. Guides agree that the UTME has 60 Use of English questions and 40 in each of your other three subjects, 180 questions in 2 hours on a computer, and that each subject is scored out of 100, giving a total out of 400. Tigertest practice tests have 40 Mathematics questions in 30 minutes, which is Mathematics' share of the 2 hours if you split the time by questions.",
  },
  {
    q: "What topics does the UTME Mathematics syllabus cover?",
    a: "The JAMB Mathematics syllabus has five sections: Number and Numeration (number bases, fractions and percentages, indices, logarithms, surds and sets), Algebra (polynomials, variation, inequalities, progressions, binary operations, matrices and determinants), Geometry and Trigonometry (Euclidean geometry, mensuration, the earth as a sphere, loci, coordinate geometry and trigonometry), Calculus (differentiation and integration) and Statistics (charts, averages, dispersion, permutation and combination, and probability). JAMB does not publish how many questions come from each section.",
  },
  {
    q: "Can I use a calculator in the JAMB Mathematics exam?",
    a: "You cannot bring your own calculator into the UTME. Guides and news reports say the CBT software has a basic on-screen calculator for subjects such as Mathematics, without scientific functions. Tigertest gives you a calculator too, but the questions are written to be worked by hand: learn your logarithm laws, surds and the values of sin, cos and tan at 30, 45 and 60 degrees.",
  },
  {
    q: "What score do I need in the UTME?",
    a: "Your UTME score is your total across four subjects, out of 400. JAMB sets minimum scores each year; for 2026 admissions it set 150 for universities and 100 for polytechnics and colleges of education. Many institutions and competitive courses ask for much more, so check the cut-off mark for your course. A strong Mathematics score helps every science, engineering and social science course that lists it.",
  },
  {
    q: "Are these real JAMB past questions?",
    a: "No. These are original practice questions written to the JAMB Mathematics syllabus, not JAMB past questions. Every answer was worked out and checked by computation, and each explanation shows the working and the slip behind the most tempting wrong answer. Both practice tests and all eight drills are free, with no account required. Tigertest is not affiliated with or endorsed by JAMB.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "JAMB Mathematics practice test, JAMB maths past questions alternative, UTME Mathematics practice, JAMB CBT practice maths, JAMB Mathematics 2027, JAMB maths 2027, JAMB number bases, JAMB logarithms, JAMB calculus questions, JAMB statistics questions",
  alternates: {
    canonical: `${siteUrl}/jamb-mathematics-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/jamb-mathematics-practice-test`,
    images: [{ url: shareImageUrl("jambmath"), width: 1200, height: 630, alt: "Tigertest free JAMB Mathematics practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("jambmath")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free JAMB Mathematics Practice Test",
      description,
      url: `${siteUrl}/jamb-mathematics-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "200 original JAMB Mathematics practice questions with worked explanations",
        "2 full 40-question practice tests in 30 minutes",
        "8 drills: number and numeration, polynomials and variation, progressions and matrices, geometry and mensuration, coordinates and trigonometry, calculus, statistics, permutation and probability",
        "Every answer checked by computation",
        "Maths written in proper notation",
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
        classFaqJsonLd("jambmath"),
      ],
    },
  ],
};

const sections = [
  { name: "Number and numeration", detail: "6 questions" },
  { name: "Polynomials, variation and inequalities", detail: "5 questions" },
  { name: "Progressions, binary operations and matrices", detail: "5 questions" },
  { name: "Geometry and mensuration", detail: "6 questions" },
  { name: "Coordinate geometry and trigonometry", detail: "5 questions" },
  { name: "Calculus", detail: "4 questions" },
  { name: "Statistics", detail: "5 questions" },
  { name: "Permutation, combination and probability", detail: "4 questions" },
];

export default function JambMathematicsLandingPage() {
  return (
    <div data-theme="jambmath" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free JAMB Mathematics Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/jamb-mathematics/dashboard"
            shortName="JAMB Maths"
            subtitle="200 original questions across the whole UTME Mathematics syllabus, with full 40-question timed tests and worked answers. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/jambmath-mobile.png", desktop: "/landing/jambmath-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jambmath" />

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
                Eight drills that follow the syllabus, from number bases and logarithms to calculus and probability. Questions you miss come back until you have mastered them, and every answer shows the working.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 40-question practice tests in 30 minutes, with free movement between questions and flags like the real CBT. Practice Test 2 is held out of the drills, so it measures how ready you are.
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
                Built on the JAMB Mathematics Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test has 40 four-option questions across the five syllabus sections: Number and Numeration, Algebra, Geometry and Trigonometry, Calculus and Statistics. JAMB does not publish a count per topic, so this split is Tigertest&apos;s. Your score is out of 100, like the UTME subject score.
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
                src={getTigerAsset("jambmath", 1)}
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
            How to Score High in JAMB Mathematics
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Budget your 2 hours</h3>
              <p>
                The UTME gives you 2 hours for all four subjects. Plan about 30 minutes for Mathematics&apos; 40 questions. Answer the quick ones first (sets, indices, means, bearings) and flag long calculations to come back to.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Work without a scientific calculator</h3>
              <p>
                You cannot bring your own calculator, and guides say the on-screen one is basic. Know the laws of indices and logarithms, how to simplify surds, and the exact values of sin, cos and tan at 30, 45 and 60 degrees, so you never need a sin or log key.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the standard results</h3>
              <p>
                Many questions test a result you can learn: the sum of an AP or GP, the factor and remainder theorems, the circle theorems, sector and arc formulas with pi as 22/7, distances on the earth with a radius of 6400 km, and the basic derivatives and integrals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Check the answer against the options</h3>
              <p>
                Wrong options are usually the result of a common slip: a forgotten negative sign, a radius used for a diameter, an order that should not matter. When your answer matches an option, check it once by substituting back. Guides agree that the UTME takes nothing off for a wrong answer, so answer every question.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          JAMB Mathematics Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="jambmath" />
        </div>
      </div>

      <ExamRelatedTests examId="jambmath" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for JAMB Mathematics?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across the whole syllabus.</p>
          <ExamLandingCTA dashboardHref="/jamb-mathematics/dashboard" />
        </div>
      </div>
    </div>
  );
}

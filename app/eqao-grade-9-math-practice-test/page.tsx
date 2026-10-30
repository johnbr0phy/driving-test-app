import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free EQAO Grade 9 Math Practice Test - Adaptive";
const metaDescription =
  "Free EQAO Grade 9 Math practice for Ontario's MTH1W course: two full adaptive practice tests of two sessions, a drill for every strand and every answer explained.";
const description =
  "Free EQAO Grade 9 Assessment of Mathematics practice for students in Ontario's de-streamed MTH1W course. Two full practice tests, each two sessions of 25 questions with an adaptive second stage like the real online assessment, weighted to EQAO's blueprint: algebra and coding 36%, number 20%, data 16%, geometry and measurement 16%, financial literacy 12%. Multiple choice, select all, drag and drop, drop-down and typed answers, with a calculator and the formula sheet on every question. Five strand drills sized for a phone open with short Basics lessons. Every answer is explained, every miss comes back until it is learned, and teachers can set it for a class free.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "EQAO grade 9 math practice test, EQAO practice test grade 9, EQAO math test, grade 9 math Ontario, MTH1W practice, EQAO sample test, EQAO grade 9 math questions, Ontario grade 9 math exam, de-streamed grade 9 math, EQAO coding questions",
  alternates: {
    canonical: `${siteUrl}/eqao-grade-9-math-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/eqao-grade-9-math-practice-test`,
    images: [{ url: shareImageUrl("eqao9"), width: 1200, height: 630, alt: "Tigertest free EQAO Grade 9 Math practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("eqao9")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the EQAO Grade 9 Assessment of Mathematics?",
    a: "It is an online assessment written at school at the end of the Grade 9 math course (MTH1W). There are two sessions, A and B, each designed to take about 60 minutes in one sitting, with 54 questions in all: 50 that count and 4 field-test questions that do not. The 50 scored questions follow EQAO's blueprint: 18 algebra (coding included), 10 number, 8 data, 8 geometry and measurement, and 6 financial literacy.",
  },
  {
    q: "Is the EQAO Grade 9 math test adaptive?",
    a: "Yes. Each session has two stages. Everyone starts with a medium set of questions, and how you do on it decides whether the second stage is an easier (low/medium) or a harder (medium/high) set. The Tigertest practice tests work the same way, so you get used to the switch before the real thing.",
  },
  {
    q: "Does EQAO count toward my Grade 9 math mark?",
    a: "Yes. The result has to be included in the MTH1W final mark, and EQAO's framework says that starting in the 2026-2027 school year it is weighted as 20% of the final course mark. Ask your teacher how your school is applying it this year.",
  },
  {
    q: "Can I use a calculator and a formula sheet?",
    a: "Yes. The online platform has a built-in calculator, and students may also bring their own scientific or graphing calculator. EQAO's formula sheet with perimeter, area, surface area and volume formulas and the Pythagorean relationship is available in the platform. Tigertest gives you a calculator and the same formulas on every question.",
  },
  {
    q: "What kinds of questions are on it?",
    a: "Single selection (multiple choice), multiple selection, drag and drop, drop-down menus and key entry, where you type a number. There are no long written answers, so showing your work does not earn marks. Tigertest uses all five types, including coding questions where you read a short program and predict what it prints or change it.",
  },
  {
    q: "How is it scored?",
    a: "EQAO reports a level from 1 to 4, with Level 3 the provincial standard, based on which questions you got right and how difficult they were. Tigertest scores each practice test as percent correct, which is a guide rather than a level.",
  },
  {
    q: "Is it free?",
    a: "Yes, all of it: both practice tests, all five drills, the Basics lessons and every explanation, with no account required. An account saves your progress across a phone and a laptop.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free EQAO Grade 9 Math Practice Test",
      description,
      url: `${siteUrl}/eqao-grade-9-math-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      featureList: [
        "Two full practice tests of two sessions each",
        "Adaptive second stage in every session, like the real assessment",
        "Weighted to EQAO's blueprint: 36% algebra and coding",
        "Calculator and formula sheet on every question",
        "Five strand drills with short Basics lessons",
        "Practice Test 2 held out of the drills for a clean score",
        "Free class dashboards for teachers",
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
        classFaqJsonLd("eqao9"),
      ],
    },
  ],
};

const strands = [
  { name: "Algebra", topics: "Equations, coding, linear and non-linear relations, slope, intersections", weight: "18 of 50" },
  { name: "Number", topics: "Number sets, powers, scientific notation, fractions, rates and percents", weight: "10 of 50" },
  { name: "Data", topics: "Box plots, quartiles, scatter plots, lines of best fit, modelling", weight: "8 of 50" },
  { name: "Geometry and Measurement", topics: "Pythagorean relationship, circles, conversions, surface area, volume", weight: "8 of 50" },
  { name: "Financial Literacy", topics: "Interest, appreciation and depreciation, borrowing, budgets", weight: "6 of 50" },
];

export default function Eqao9LandingPage() {
  return (
    <div data-theme="eqao9" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free EQAO Grade 9 Math Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/eqao-grade-9-math/dashboard"
            shortName="EQAO Grade 9 Math"
            subtitle="Two full practice tests of two adaptive sessions, like the real online assessment, plus a drill for every strand. Free, no account needed."
            shots={{ mobile: "/landing/eqao9-mobile.png", desktop: "/landing/eqao9-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="eqao9" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Strand Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One drill per strand. Check every answer as you go, read why it is right, and every miss comes back until you get it. Each drill starts with short Basics lessons, such as exponent laws or slope, that you can skip.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Two-Session Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sessions A and B, 25 scored questions each, with an easier or harder second stage picked from how the first stage went. Calculator and formula sheet included, then your score by session and by strand.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Strands */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on EQAO&apos;s Blueprint</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice test has the same number of questions from each strand as the real assessment, so algebra and coding get the most practice.
              </p>
              <div className="space-y-3">
                {strands.map((s) => (
                  <div key={s.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{s.topics}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base whitespace-nowrap">{s.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("eqao9", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach Grade 9 Math?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Set it as EQAO review for free: share one link, students join with just their first name, and you see who practised, their session scores and the strands your class finds hardest.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a class at tigertest.io/teach
          </Link>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for EQAO Grade 9 Math</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with algebra</h3>
              <p>
                Algebra is 18 of the 50 scored questions. Solving equations, finding slope and initial value, and reading a linear relation from a table or equation come up again inside data and financial questions too.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Get comfortable reading code</h3>
              <p>
                Coding is part of the algebra strand. Practise tracing a short program line by line: write down each variable&apos;s value as it changes, and count how many times a loop runs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the formula sheet</h3>
              <p>
                You do not have to memorize area and volume formulas, but you do need to know which one to pick and that a cone or pyramid holds one third of the matching cylinder or prism.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Sit a full session under time</h3>
              <p>
                Once the drills are green, take Practice Test 2 with the clock on. It is kept out of the drills, so the score shows what you can do on questions you have not seen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">EQAO Grade 9 Math Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="eqao9" />
        </div>
      </div>

      <ExamRelatedTests examId="eqao9" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account needed. Start with the algebra drill.</p>
          <ExamLandingCTA dashboardHref="/eqao-grade-9-math/dashboard" />
        </div>
      </div>
    </div>
  );
}

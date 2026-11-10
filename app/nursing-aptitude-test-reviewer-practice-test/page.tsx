import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/phnat";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Nursing Aptitude Test Reviewer 2026 - Free NAT Practice Test (Philippines)";
const metaDescription =
  "Free Nursing Aptitude Test (NAT) reviewer for BSN applicants in the Philippines: 200 original questions on verbal, numerical, science and health, and mental ability, with four 50-question mock tests.";
const description =
  "Free practice for the Nursing Aptitude Test (NAT), the admission test Philippine colleges of nursing give to BS Nursing applicants: 200 original questions on vocabulary, grammar, reading, arithmetic, algebra, biology, chemistry, physics, health information, logical reasoning and series. Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nursing aptitude test, nursing aptitude test reviewer, NAT reviewer nursing, nursing aptitude test philippines, nursing entrance exam reviewer, BSN entrance exam philippines, college of nursing admission test, CPU nursing aptitude test, WVSU nursing aptitude test, nursing aptitude test practice",
  alternates: {
    canonical: `${siteUrl}/nursing-aptitude-test-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nursing-aptitude-test-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phnat"), width: 1200, height: 630, alt: "Tigertest free Nursing Aptitude Test reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phnat")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Nursing Aptitude Test?",
    a: "The Nursing Aptitude Test (NAT) is an admission test that colleges of nursing in the Philippines give to people applying for the Bachelor of Science in Nursing. It is run by each school, not by a national agency. Central Philippine University, West Visayas State University and Filamer Christian University are among the schools that require one. It is different from the Nurse Licensure Examination, which nursing graduates take after the degree.",
  },
  {
    q: "What is on the Nursing Aptitude Test?",
    a: "No school publishes a full syllabus, but examinees describe four subtests: verbal ability (vocabulary, grammar and reading), numerical facility (arithmetic, algebra and word problems), science and health information (biology, chemistry, physics and basic health), and a mental ability test of reasoning and patterns. Tigertest covers all four. Mental ability items are written in text, while some schools also use figures.",
  },
  {
    q: "How many items are on the test and what score do I need?",
    a: "Each school sets its own length, time limit and cut-off, and these are not published. Some schools count the result as a share of an admission rating together with grades, their own college admission test and an interview, so a higher score helps even when there is no fixed pass mark. Tigertest's mock tests are 50 questions with a 70% target. Aim well above it, because nursing slots are limited.",
  },
  {
    q: "How do I register for the Nursing Aptitude Test?",
    a: "Apply to the college of nursing you want to enter and follow its admission advisory. Schools announce their own schedule, requirements and testing fee each admission season, and some require you to take the school's general college admission test first. Check the school's website or admission office for the current dates.",
  },
  {
    q: "Are these the real Nursing Aptitude Test questions?",
    a: "No. Every question is original, written by Tigertest from standard high school English, mathematics and science and basic health knowledge, so it practises the same skills without copying any test paper. Tigertest is not affiliated with any school or testing center, and it does not register you or replace the test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Nursing Aptitude Test Reviewer",
      description,
      url: `${siteUrl}/nursing-aptitude-test-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "200 verbal, numerical, science, health and mental ability questions",
        "4 mock tests of 50 questions",
        "4 training sets by subtest",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Verbal: Vocabulary & Analogies", weight: "12%" },
  { name: "Numerical: Arithmetic", weight: "12%" },
  { name: "Numerical: Algebra, Geometry & Word Problems", weight: "12%" },
  { name: "Verbal: Grammar & Usage", weight: "10%" },
  { name: "Science: Biology & the Human Body", weight: "10%" },
  { name: "Health Information", weight: "10%" },
  { name: "Mental Ability: Logical Reasoning", weight: "10%" },
  { name: "Verbal: Reading Comprehension", weight: "8%" },
  { name: "Science: Chemistry & Physics", weight: "8%" },
  { name: "Mental Ability: Number & Letter Series", weight: "8%" },
];

export default function PhnatLandingPage() {
  return (
    <div data-theme="phnat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Nursing Aptitude Test Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nursing-aptitude-test/dashboard"
            shortName="Nursing Aptitude Test"
            subtitle="200 original questions for the Nursing Aptitude Test that Philippine nursing schools give to BSN applicants: verbal ability, numerical facility, science and health information, and mental ability. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phnat-mobile.png", desktop: "/landing/phnat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phnat" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Subtest</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one for each subtest: verbal ability, numerical facility, science and health information, and mental ability. Questions you miss come back until you have mastered them.
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
                Four 50-question mock tests that together cover all 200 questions, with a 70% target. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built for the Nursing Aptitude Test
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each school runs its own Nursing Aptitude Test and none publishes a subtest split, so the weighting is Tigertest&apos;s own, following the four subtests examinees describe: verbal ability, numerical facility, science and health information, and mental ability. Science is pitched at senior high school level, and health information covers nutrition, vital signs, first aid and common diseases. Mental ability items are written as reasoning problems and number and letter series; some schools also use figures.
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
                src={getTigerAsset("phnat", 1)}
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
            How to Prepare for the Nursing Aptitude Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Build speed in numerical facility</h3>
              <p>
                Fractions, decimals, percents, ratio and unit conversions are the base of every nursing calculation you will meet later. Practise them without a calculator until you can set up each problem in one line, then check your answer against the choices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read widely and learn word families</h3>
              <p>
                Vocabulary and analogy items reward a wide reading habit. Learn roots and prefixes, review subject-verb agreement and tenses, and practise finding the main idea of a short passage in under a minute.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Review high school science</h3>
              <p>
                Go back over the cell, the body systems, basic genetics, atoms, acids and bases, and motion and energy. Add everyday health knowledge: nutrients and what a lack of each causes, normal vital signs, and first aid for burns, bleeding and bites.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Train your eye for patterns</h3>
              <p>
                Mental ability items ask what follows or what comes next. In a series, look for a rule in the differences, in doubling, or in steps through the alphabet, and test it on every term. In a logic item, draw the order or the groups before you choose.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Nursing Aptitude Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamSampleQuestions examId="phnat" />

      <ExamRelatedTests examId="phnat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Nursing School?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on verbal, numerical, science, health and reasoning skills.</p>
          <ExamLandingCTA dashboardHref="/nursing-aptitude-test/dashboard" />
        </div>
      </div>
    </div>
  );
}

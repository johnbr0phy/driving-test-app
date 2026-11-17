import "@/lib/v2/banks/tabe";
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
import { SITE_URL } from "@/lib/siteUrl";
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free TABE Practice Test 2026 - Reading, Math and Language";
const metaDescription =
  "Free TABE practice test at Level D: Reading, Mathematics and Language on DRC's TABE 13&14 blueprints, timed at the real pace, with a percent score for each subject.";
const description =
  "A free TABE practice test at Level D: Reading, Mathematics and Language in three timed sections at the real pace, written to DRC's TABE 13&14 Level D blueprints, with a percent score per subject. Seven drills sized for your phone teach the basics first and bring every miss back until you master it. Both practice tests and every drill are free. Adult education teachers can assign it to a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "TABE practice test, free TABE practice test, TABE test 2026, TABE 13 and 14 practice, TABE 11 and 12 practice test, TABE level D, TABE math practice test, TABE reading practice test, TABE language practice test, Tests of Adult Basic Education practice",
  alternates: {
    canonical: `${siteUrl}/tabe-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/tabe-practice-test`,
    images: [{ url: shareImageUrl("tabe"), width: 1200, height: 630, alt: "Tigertest free TABE practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("tabe")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the TABE test?",
    a: "TABE has three subtests: Reading, Mathematics and Language. Each comes in four levels, E, M, D and A, from basic skills up to about high school, and a short Locator test decides which level you take in each subject. At Level D, Reading is 39 questions in two 50-minute parts, Mathematics is 40 questions in parts of 45 and 15 minutes, and Language is 33 questions in 50 minutes. Your program may give you only one or two of the subtests.",
  },
  {
    q: "Is this TABE 11&12 or TABE 13&14?",
    a: "TABE 13&14 are the current forms. The U.S. Department of Education allowed TABE 11&12 for adult education reporting only until June 30, 2026, so programs have moved to 13&14. Both test Reading, Mathematics and Language, so the same skills carry over. The Tigertest practice test follows DRC's TABE 13&14 Level D blueprints.",
  },
  {
    q: "What score do you need on the TABE?",
    a: "There is no pass or fail. DRC reports a scale score for each subject, which programs use to place you in a class, show your progress or check readiness for a training course, and DRC says it does not set cut scores: each program decides the score it needs, so ask yours. Tigertest shows a percent correct for each subject, not a TABE scale score.",
  },
  {
    q: "Which level does the Tigertest practice test cover?",
    a: "Level D, which matches about grades 6 to 8 on the adult education standards: signed numbers, ratios, equations, probability and the Pythagorean Theorem in Math; central ideas, evidence, word meaning and arguments in Reading; and grammar, punctuation, word choice and revising drafts in Language. If your Locator places you at Level E, M or A, the practice still shows which skills to work on, but the questions will be harder or easier than yours.",
  },
  {
    q: "Can I use a calculator on the TABE?",
    a: "The online TABE 13&14 Math test comes with an on-screen Desmos calculator, and a reference sheet lists formulas such as the area of a circle and the Pythagorean Theorem. Your test administrator will tell you when you may use the calculator. Every Tigertest math question can be done without one, and a formula reference is one tap away.",
  },
  {
    q: "How do I prepare for the TABE on my own?",
    a: "Start with the drills that teach the basics: each opens with short rule cards and one-line questions before the test-level items, so negative numbers, fractions, subject and verb agreement or how to find the main idea are taught before they are tested. Take Practice Test 1 for a baseline, drill your weakest subject, then take Practice Test 2, which is held out of the drills, to see how far you have come.",
  },
  {
    q: "Is the Tigertest TABE practice test free?",
    a: "Yes, all of it: both practice tests, all seven drills, the basics lessons and every explanation, with no account required. An account saves your progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free TABE Practice Test",
      description,
      url: `${siteUrl}/tabe-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("tabe"),
      featureList: [
        "Two TABE practice tests at Level D, Reading, Mathematics and Language, 60 questions each",
        "Timed sections at the real pace, with a break between subjects",
        "Typed number answers like TABE gridded-response items",
        "Formula reference on Math",
        "Percent score for each subject",
        "Seven mastery drills, three with the basics taught first",
        "Practice Test 2 held out of the drills for a clean score",
        "Explanations for every question",
        "Free class dashboards for adult education teachers",
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
        classFaqJsonLd("tabe"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Key Ideas; Craft and Vocabulary; Integration", section: "Reading", weight: "45.5% / 40.9% / 13.6%" },
  { name: "Numbers; Algebra; Data and Probability; Geometry", section: "Mathematics", weight: "27.5% / 27.5% / 25% / 20%" },
  { name: "Text Types; Conventions; Knowledge of Language", section: "Language", weight: "39.4% / 27.3% / 33.3%" },
];

export default function TabeLandingPage() {
  return (
    <div data-theme="tabe" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free TABE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/tabe/dashboard"
            shortName="TABE"
            subtitle="TABE Reading, Math and Language at Level D in two timed practice tests, plus seven drills that teach the basics first. Everything is free, no account needed."
            shots={{ mobile: "/landing/tabe-mobile.png", desktop: "/landing/tabe-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="tabe" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Skill Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills on the Level D blueprint areas. The key ideas, numbers and conventions drills open with the basics: a rule card and a couple of one-line questions on negative numbers, fractions, commas or finding the main idea before the test-level questions. One tap to check, an explanation right away, and every miss comes back until you have mastered it.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Test on a Computer</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Reading, Mathematics and Language as timed sections with a break between them, a countdown clock, flag for review, a formula reference on Math and typed number answers like TABE&apos;s gridded-response items. Finish with a percent score for each subject and a plan for what to drill next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the TABE 13&amp;14 Level D Blueprints</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test follows the categories and percentages in DRC&apos;s Level D blueprints for Reading, Mathematics and Language, and the drills are split the same way, so your results show which subject and which area needs work. Levels E, M and A are not modeled.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{area.section}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("tabe", 3)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach Adult Basic Education?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Adult education and workforce teachers can assign it to a class for free: post one link, students join with just their name, and you see who practiced, their test scores and the topics your class misses most.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a class at tigertest.io/teach
          </Link>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Do Well on the TABE</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Ask your program what it needs</h3>
              <p>
                TABE has no pass mark. Find out which subjects your program will test and what score it looks for, whether that is placement into a class, a training course or a high school equivalency prep group. Then you know where to spend your study time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the basics before the test questions</h3>
              <p>
                If it has been a while since school, start with the basics inside each drill. They teach one rule at a time, negative numbers, fractions, ratios, commas, verb tense, main idea, with an example and two quick questions, so you are not guessing at problems you were never shown how to do.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Go back to the text for every Reading answer</h3>
              <p>
                TABE Reading asks you to support answers with evidence. Before you choose, find the sentence in the passage that proves it. Answers that sound true but are not in the text, or come from a different paragraph, are the most common trap.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Use your time</h3>
              <p>
                Sit Practice Test 1 with the timer on to see your pace, drill your weakest subject, then take Practice Test 2. Its questions never appear in the drills, so it is an honest check before the real test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">TABE Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="tabe" />
        </div>
      </div>

      <SampleQuestionsV2 examId="tabe" />

      <ExamRelatedTests examId="tabe" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the TABE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two practice tests, seven drills and the basics, Reading, Math and Language.</p>
          <ExamLandingCTA dashboardHref="/tabe/dashboard" />
        </div>
      </div>
    </div>
  );
}

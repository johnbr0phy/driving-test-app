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

const title = "Free NAPLAN Year 9 Practice Test 2027 - Reading, Conventions, Numeracy";
const metaDescription =
  "Free NAPLAN Year 9 practice test: reading, spelling, grammar and punctuation, and numeracy with a non-calculator section, in tailored testlets like the real online NAPLAN.";
const description =
  "A free NAPLAN Year 9 practice test with Reading, Conventions of Language (spelling, grammar and punctuation) and Numeracy (a short non-calculator section, then calculator allowed). Like the real online test, the second part of each domain is harder or easier depending on the first, and results are estimated on a NAPLAN-style scale against the four proficiency levels. Six drills, three of which teach the basics first, bring every miss back until it is mastered. Teachers can set it for a Year 9 class for free.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "NAPLAN Year 9 practice test, free NAPLAN practice test, NAPLAN practice Year 9, NAPLAN numeracy Year 9, NAPLAN reading Year 9, NAPLAN conventions of language, NAPLAN spelling practice, NAPLAN grammar and punctuation, NAPLAN online practice, Year 9 NAPLAN 2027",
  alternates: {
    canonical: `${siteUrl}/naplan-year-9-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/naplan-year-9-practice-test`,
    images: [{ url: shareImageUrl("naplan"), width: 1200, height: 630, alt: "Tigertest free NAPLAN Year 9 practice test" }],
    siteName: "Tigertest",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("naplan")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Year 9 NAPLAN test?",
    a: "Four tests, sat online in March in a set order: Writing (42 minutes, one narrative or persuasive piece), Reading (65 minutes), Conventions of Language (45 minutes, spelling first, then grammar and punctuation) and Numeracy (65 minutes, a short non-calculator section, then an online calculator). The Tigertest practice test covers Reading, Conventions of Language and Numeracy in shorter timed parts; Writing is not included.",
  },
  {
    q: "How does the tailored test work?",
    a: "The online NAPLAN uses tailored test design. Everyone starts with the same set of questions, and how you go on that set decides whether the next set is harder, about the same or easier. Students on the harder path can reach higher scores. Tigertest models this with two parts per domain: the second part is harder or easier depending on how you did on the first.",
  },
  {
    q: "What are the NAPLAN proficiency levels?",
    a: "Since 2023, results are reported as one of four levels for each domain: Exceeding, Strong, Developing and Needs additional support. Each level is a band on the NAPLAN scale. For Year 9 Reading, for example, Strong starts at 539 and Exceeding at 639. Tigertest gives an estimated scale score per domain on the same kind of scale, so a student can see roughly where they sit. It is an estimate, not an official result.",
  },
  {
    q: "Can you use a calculator in Year 9 NAPLAN numeracy?",
    a: "For most of it. The Year 9 numeracy test starts with a short non-calculator section that checks arithmetic. Once a student moves on to the main section, an online calculator is available, and they cannot go back to the non-calculator questions. Tigertest has the same two parts: a non-calculator section first, then a section with a calculator one tap away.",
  },
  {
    q: "How should a Year 9 student prepare for NAPLAN?",
    a: "NAPLAN tests skills built up over years of school, so cramming does little. A short, steady routine helps more: ten minutes on a drill a few times a week, starting with the basics for anything shaky (percentages, index laws, apostrophes, finding the main idea), and one full practice test to get used to the format and the clock. Practice Test 2 is held out of the drills, so it shows real progress.",
  },
  {
    q: "Is the Tigertest NAPLAN practice test free?",
    a: "Yes, all of it: both practice tests, all six drills, the basics lessons and every explanation, with no account required. An account saves progress across devices. The questions are original and written to the Australian Curriculum; Tigertest is not affiliated with ACARA.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NAPLAN Year 9 Practice Test",
      description,
      url: `${siteUrl}/naplan-year-9-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: "en-AU",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "Two NAPLAN Year 9 practice tests: Reading, Conventions of Language and Numeracy",
        "Tailored testlets: the second part of each domain is harder or easier depending on the first",
        "A non-calculator numeracy section, then calculator allowed, like the real test",
        "Estimated scale score per domain against the four proficiency levels",
        "Six mastery drills, with the basics taught first in reading, grammar and number",
        "Practice Test 2 held out of the drills for an honest check",
        "Explanations for every question, in Australian spelling",
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
        classFaqJsonLd("naplan"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Reading", section: "Articles, stories, opinion pieces, poetry", weight: "20 questions" },
  { name: "Spelling", section: "Conventions of Language", weight: "12 questions" },
  { name: "Grammar and Punctuation", section: "Conventions of Language", weight: "12 questions" },
  { name: "Non-calculator", section: "Numeracy", weight: "6 questions" },
  { name: "Number and Algebra", section: "Numeracy, calculator allowed", weight: "10 questions" },
  { name: "Measurement, Geometry, Statistics", section: "Numeracy, calculator allowed", weight: "14 questions" },
];

export default function NaplanYear9LandingPage() {
  return (
    <div data-theme="naplan" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NAPLAN Year 9 Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/naplan/dashboard"
            shortName="NAPLAN"
            subtitle="Reading, spelling, grammar and punctuation, and numeracy, in tailored testlets like the real online NAPLAN, plus six drills that teach the basics first. Everything is free, no account needed."
            shots={{ mobile: "/landing/naplan-mobile.png", desktop: "/landing/naplan-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="naplan" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills on a Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six drills: reading, spelling, grammar and punctuation, non-calculator, number and algebra, and measurement with statistics. The reading, grammar and number drills open with the basics, a rule card and two quick questions on things like apostrophes, index laws or finding the main idea. One tap to check, an explanation straight away, and every miss comes back until it is mastered.
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
                Reading, Conventions of Language and Numeracy in timed parts, with the non-calculator section locked once you move on, the calculator for the rest, and tap-to-answer question types: choose two, put in order, tap the misspelled word and pick from a dropdown. Finish with an estimated scale score per domain and the drill to do next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">What Each Practice Test Covers</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test follows the NAPLAN domains and the Year 9 content of the Australian Curriculum (Version 9.0), with original questions in Australian spelling and metric units. The real test&apos;s Writing task and spelling dictation are not modelled.
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
              <Image src={getTigerAsset("naplan", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Teachers</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Set it for your Year 9 class for free: post one link, students join with just their name, and you see who practised, their estimated scores per domain and the questions your class misses most. Useful in the weeks before March, or for homework all year.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Get Ready for Year 9 NAPLAN</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get used to the format</h3>
              <p>
                Most nerves come from the unfamiliar: a clock in the corner, a section you cannot go back to, a question that asks you to tap a word. One practice test takes that away. Sit Practice Test 1 with the timer on, then look at which domain is lowest.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Fix the basics first</h3>
              <p>
                Year 9 questions build on things taught years earlier: fractions and percentages, negative numbers, apostrophes, subject and verb agreement. If one of those is shaky, the basics inside each drill teach it in a minute with an example and two quick questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. In reading, prove it from the text</h3>
              <p>
                The right answer is always supported by something in the text. Before choosing, find the words that back it up. The wrong choices usually sound reasonable but go further than the text does, or mix up who said what.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not rush the first part</h3>
              <p>
                In the tailored test, the first set of questions decides which path you take next, and the harder path can lead to higher scores. Careful, accurate work early matters more than speed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">NAPLAN Year 9 Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="naplan" />
        </div>
      </div>

      <ExamRelatedTests examId="naplan" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for NAPLAN?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two practice tests, six drills and the basics, for Reading, Conventions of Language and Numeracy.</p>
          <ExamLandingCTA dashboardHref="/naplan/dashboard" />
        </div>
      </div>
    </div>
  );
}

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

const title = "Free 11+ Practice Test - English, Maths and Verbal Reasoning";
const metaDescription =
  "Free 11+ practice tests for grammar school entry: English, maths and verbal reasoning in GL-style multiple choice, with short lessons, drills and explanations for every question.";
const description =
  "Free 11+ practice for Year 5 and Year 6 children preparing for grammar school entry. Two timed practice tests cover the three written papers most multiple-choice 11+ tests use: English (comprehension, spelling, punctuation and grammar), maths (Key Stage 2 number, measures, shape and data) and verbal reasoning (word puzzles, codes and series). Six drills sized for a phone or tablet open with short click-through lessons on things like hidden words, letter codes, fractions of amounts and reading between the lines, and every miss comes back until it is learned. Free, with no account needed. Teachers and tutors can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "11+ practice test, 11 plus practice test, eleven plus practice, free 11+ practice papers, 11+ verbal reasoning practice, 11+ English practice, 11+ maths practice, GL style 11+, grammar school entrance test, Kent Test practice, 11+ multiple choice, Year 5 11+ practice",
  alternates: {
    canonical: `${siteUrl}/11-plus-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/11-plus-practice-test`,
    images: [{ url: "/og/elevenplus", width: 1200, height: 630, alt: "Tigertest free 11+ practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/elevenplus"],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the 11+?",
    a: "It depends on where you live, because each area or grammar school sets its own test. Most multiple-choice 11+ tests are made from four kinds of paper: English (comprehension, spelling, punctuation and grammar), maths (Key Stage 2 content), verbal reasoning (word and code puzzles) and non-verbal reasoning (shape puzzles). Some areas use all four, some combine them into two booklets. Check your local authority or the school's admissions page to see which papers your child will sit.",
  },
  {
    q: "Does Tigertest cover non-verbal reasoning?",
    a: "Not yet. Non-verbal reasoning is entirely shapes and patterns, so it needs drawn figures for every question. Tigertest covers the three written papers: English, maths and verbal reasoning. If your area tests non-verbal reasoning too, practise it alongside.",
  },
  {
    q: "Is this GL-style or CEM-style?",
    a: "GL-style. The questions use the familiar multiple-choice formats: spot the part of a sentence with a mistake or choose No mistake, five answers to choose from in maths, and the classic verbal reasoning types such as hidden words, move a letter, letter codes and number series. Every question is original and written for Tigertest; none are taken from real papers or published practice books.",
  },
  {
    q: "What score does my child need to pass the 11+?",
    a: "There is no single pass mark. The real 11+ turns raw marks into an age-standardised score, so a younger child is not at a disadvantage, and each area or school sets its own qualifying score, which can change from year to year. Tigertest shows percent correct. As a rough guide, aim for 80 percent or more on a practice test, and higher for the most competitive schools.",
  },
  {
    q: "When should my child start practising?",
    a: "Most children sit the 11+ in September of Year 6, so practice usually starts in Year 5. A few short sessions a week is plenty: one drill takes about ten minutes on a phone or tablet. Leave the full practice tests until most drills are done, and keep Practice Test 2 for last, because its questions never appear in the drills.",
  },
  {
    q: "What are the lessons before each drill?",
    a: "Four of the six drills open with short click-through lessons. Each one teaches a single skill, such as reading across the gap to find a hidden word, counting jumps in the alphabet, cracking a letter code, finding a fraction of an amount or reading between the lines, and asks your child to supply each step rather than just watch. Two quick questions check it before the drill starts, and a missed question offers the lesson again.",
  },
  {
    q: "Is the Tigertest 11+ practice free?",
    a: "Yes, all of it: both practice tests, all six drills, every lesson and every explanation, with no account needed. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free 11+ Practice Test",
      description,
      url: `${siteUrl}/11-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "Two timed 11+ practice tests: English, Maths and Verbal Reasoning, 90 questions each",
        "GL-style multiple-choice question formats",
        "Six drills with short click-through lessons first",
        "Comprehension passages, a poem, spelling, punctuation and grammar",
        "Sixteen verbal reasoning question types",
        "Practice Test 2 held out of the drills for a clean score",
        "Explanations for every question",
        "Free class dashboards for teachers and tutors",
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
        classFaqJsonLd("elevenplus"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Comprehension", section: "English", weight: "Stories, poems, information texts" },
  { name: "Spelling, Punctuation and Grammar", section: "English", weight: "Find the mistake, choose the word" },
  { name: "Number and Calculation", section: "Maths", weight: "Fractions, decimals, percentages" },
  { name: "Problem Solving", section: "Maths", weight: "Measures, shape, data, algebra" },
  { name: "Words", section: "Verbal Reasoning", weight: "Meanings, hidden words, letters" },
  { name: "Codes and Sequences", section: "Verbal Reasoning", weight: "Codes, series, sums, logic" },
];

export default function ElevenPlusLandingPage() {
  return (
    <div data-theme="elevenplus" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free 11+ Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/eleven-plus/dashboard"
            shortName="11+"
            subtitle="English, maths and verbal reasoning in two timed practice tests, plus six drills that start with a short lesson. Everything is free, no account needed."
            shots={{ mobile: "/landing/elevenplus-mobile.png", desktop: "/landing/elevenplus-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="elevenplus" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills on a Phone or Tablet</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six drills, two for each paper. Comprehension, number and both verbal reasoning drills open with short lessons your child taps through, such as hidden words, letter codes or fractions of amounts. One tap checks each answer, an explanation follows straight away, and every miss comes back until it is learned.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Timed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                English, Maths and Verbal Reasoning back to back with a short break between, a countdown clock and flag for review, so the timing on the day is not a surprise. Finish with a percent score for each paper and a list of what to drill next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the 11+ Papers</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test is a shorter sitting of the three written 11+ papers, with English and maths taken from the Key Stage 2 national curriculum and verbal reasoning grouped by question type, as on the real paper. Results show which paper, and which question type, needs more work. Non-verbal reasoning is not included.
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
              <Image src={getTigerAsset("elevenplus", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Teachers and Tutors</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Running an 11+ group or a Year 5 class? Set Tigertest as practice for free: share one link, pupils join with just their name, and you see who practised, their test scores and the question types your group misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for the 11+</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Find out which papers your area uses</h3>
              <p>
                Every area runs its own 11+. Check the local authority or grammar school admissions page for which papers are sat, how long each one is and when the test takes place, usually September of Year 6.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn each verbal reasoning type once</h3>
              <p>
                Verbal reasoning is not taught at school, but each question type has a method that stays the same: read across the gap for hidden words, count the jumps for letter series, write the alphabet out for codes. The lessons at the start of each drill teach one method at a time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read every day</h3>
              <p>
                Comprehension, vocabulary and the word puzzles in verbal reasoning all get easier with wide reading. Stories, non-fiction and poems all help, and talking about new words afterwards helps most of all.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise against the clock last</h3>
              <p>
                Accuracy comes first, speed second. Once most drills are done, sit Practice Test 1 with the timer on, drill the weakest paper, then take Practice Test 2, whose questions never appear in the drills.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">11+ Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="elevenplus" />
        </div>
      </div>

      <ExamRelatedTests examId="elevenplus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the 11+?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account needed. Two practice tests, six drills and the lessons, across English, maths and verbal reasoning.</p>
          <ExamLandingCTA dashboardHref="/eleven-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/v2/banks/mapgrowth";
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

const title = "Free MAP Growth Practice Test - Grades 2 to 5 Math, Reading, Language";
const metaDescription =
  "Free NWEA MAP Growth practice for grades 2 to 5: Math, Reading and Language Usage on NWEA's own test blueprint, untimed like the real test, with an explanation for every question.";
const description =
  "A free practice test for the NWEA MAP Growth test in grades 2 to 5: Math, Reading and Language Usage, built on NWEA's published instructional areas and blueprint and untimed like the real test, with a percent score per subject. Two full practice tests, ten drills (one per instructional area) that teach the basics first, and a kid-friendly explanation for every question. Teachers can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "MAP Growth practice test, MAP test practice, NWEA MAP practice test, MAP test 3rd grade, MAP test 4th grade, MAP test 5th grade, MAP test 2nd grade, MAP reading practice, MAP math practice, MAP language usage practice, RIT score, free MAP test practice",
  alternates: {
    canonical: `${siteUrl}/map-growth-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/map-growth-practice-test`,
    images: [{ url: shareImageUrl("mapgrowth"), width: 1200, height: 630, alt: "Tigertest free MAP Growth practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mapgrowth")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the MAP Growth test?",
    a: "MAP Growth is a computer test from NWEA that many US schools give in the fall, winter and spring to see what each student knows and how much they grow during the year. Students in grades 2 to 5 usually take Math, Reading and Language Usage. It is adaptive: when your child answers correctly the next question gets harder, and when they miss one it gets easier, so every child sees a different test.",
  },
  {
    q: "How long is the MAP Growth test, and how many questions are there?",
    a: "Each subject has at most 43 questions, including a few unscored trial questions, and it is untimed. NWEA says most students take about 45 to 60 minutes per subject. The Tigertest practice tests have 40 math, 39 reading and 39 language questions each, matching the number of scored questions per area in NWEA's blueprint, with no clock.",
  },
  {
    q: "What is a RIT score?",
    a: "RIT is the scale MAP Growth reports on. Because it measures skill rather than grade level, a RIT score can be compared across grades and across the year to show growth, and NWEA compares it with national norms (updated in 2025) to give a percentile. Tigertest cannot give a RIT score: a fixed practice test is not adaptive, so it reports percent correct per subject and shows which areas need work.",
  },
  {
    q: "What does MAP Growth cover in grades 2 to 5?",
    a: "Math covers Operations and Algebraic Thinking, Number and Operations (place value, base ten and fractions), Measurement and Data, and Geometry. Reading covers Literary Text, Informational Text and Vocabulary. Language Usage covers writing for a purpose and audience, grammar and usage, and capitalization, punctuation and spelling. Tigertest uses exactly these areas, with the same number of questions in each as NWEA's blueprint.",
  },
  {
    q: "Can you study for the MAP test?",
    a: "MAP Growth is not a pass or fail test, so there is nothing to cram. Practice still helps: it makes the question types familiar, so your child spends the real test thinking about the content, not the screen. The best preparation is steady work on the skills in each area, which is what the Tigertest drills are for: each one teaches the basics, then gives grade-level questions until every one is mastered.",
  },
  {
    q: "Which grade is this practice test for?",
    a: "Grades 2 to 5, the band the real Math 2-5, Reading 2-5 and Language Usage tests cover. Questions run from grade 3 to grade 5 standards, easy to hard within each subject, so a second grader will find the end hard and a fifth grader will find the start easy. That is normal, and it is how the real adaptive test feels too.",
  },
  {
    q: "Is the Tigertest MAP Growth practice free?",
    a: "Yes, all of it: both full practice tests, all ten drills, the basics lessons and every explanation, with no account required. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free MAP Growth Practice Test",
      description,
      url: `${siteUrl}/map-growth-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("mapgrowth"),
      featureList: [
        "Two full practice tests: Math, Reading and Language Usage, 118 questions each",
        "Built on NWEA's published instructional areas and test blueprint",
        "Untimed, like the real MAP Growth test",
        "Reading passages shown beside their questions",
        "Ten mastery drills, one per instructional area, most with the basics taught first",
        "Practice Test 2 held out of the drills for a clean score",
        "Kid-friendly explanations for every question",
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
        classFaqJsonLd("mapgrowth"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Number and Operations", section: "Math", weight: "13 per test" },
  { name: "Measurement and Data", section: "Math", weight: "11 per test" },
  { name: "Operations and Algebraic Thinking", section: "Math", weight: "10 per test" },
  { name: "Geometry", section: "Math", weight: "6 per test" },
  { name: "Literary Text, Informational Text, Vocabulary", section: "Reading", weight: "13 each" },
  { name: "Writing, Grammar and Usage, Mechanics", section: "Language Usage", weight: "13 each" },
];

export default function MapGrowthLandingPage() {
  return (
    <div data-theme="mapgrowth" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free MAP Growth Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/map-growth/dashboard"
            shortName="MAP Growth"
            subtitle="Math, Reading and Language Usage for grades 2 to 5, on NWEA's own blueprint and untimed like the real test, plus ten drills that teach the basics first. Everything is free, no account needed."
            shots={{ mobile: "/landing/mapgrowth-mobile.png", desktop: "/landing/mapgrowth-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mapgrowth" />

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
                Ten short drills, one for each MAP Growth area, from fractions and geometry to main idea and commas. Most open with the basics, a short lesson and two quick questions, before the grade-level questions. One tap to check, a kid-friendly explanation straight away, and every miss comes back until it is mastered.
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
                Math, Reading and Language Usage in one sitting or one at a time, with no clock, just like the real test. Flag questions to come back to, reading passages stay beside their questions, and you finish with a percent score per subject and a list of what to drill next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the Real Exam Format</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test follows NWEA&apos;s published blueprint for the Common Core version of MAP Growth: the same instructional areas, with the same number of scored questions in each. Questions run from grade 3 to grade 5 standards, easy to hard. The real test adapts to each child and reports a RIT score; this one is a fixed set, so it reports percent correct and shows which areas to work on.
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
              <Image src={getTigerAsset("mapgrowth", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach Grades 2 to 5?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Teachers can set it for a class for free: post one link, students join with just their first name, and you see who practiced, their scores in each subject and the questions your class misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Help Your Child Prepare for MAP Growth</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Make the test feel familiar</h3>
              <p>
                A short practice session or two lets your child see choose-two questions, typed answers and passages beside the questions before test day, so the real thing feels normal instead of new.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Expect hard questions</h3>
              <p>
                MAP Growth gets harder when your child is doing well, so everyone meets questions they cannot answer. Tell them that is how the test works, not a sign they are failing, and that a careful best guess is fine.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Slow down, there is no clock</h3>
              <p>
                The test is untimed, and rushing is the most common way to lose points. Encourage your child to read every answer choice, use scrap paper for math, and look back at the passage before choosing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill the weakest area a little at a time</h3>
              <p>
                Take Practice Test 1, look at the scores by area, and spend ten minutes a day on the weakest drill. Then take Practice Test 2. Its questions never appear in the drills, so it shows real progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">MAP Growth Test Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="mapgrowth" />
        </div>
      </div>

      <SampleQuestionsV2 examId="mapgrowth" />

      <ExamRelatedTests examId="mapgrowth" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Test Day?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two full practice tests, ten drills and the basics, from fractions to commas.</p>
          <ExamLandingCTA dashboardHref="/map-growth/dashboard" />
        </div>
      </div>
    </div>
  );
}

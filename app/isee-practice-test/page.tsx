import "@/lib/v2/banks/isee";
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

const title = "Free ISEE Practice Test 2026 - Middle Level, Timed, All Four Sections";
const metaDescription =
  "Free ISEE Middle Level practice for students applying to grades 7 and 8: Verbal Reasoning, Quantitative Reasoning, Reading Comprehension and Math Achievement, timed at the real pace, with an explanation for every question.";
const description =
  "A free practice test for the ISEE Middle Level, the independent school admission test for students applying to grades 7 and 8: Verbal Reasoning (synonyms and sentence completion), Quantitative Reasoning (word problems and quantitative comparisons), Reading Comprehension and Mathematics Achievement, built on E3n's published format and timed at the real pace, with a percent score per section. Two practice tests, eight drills, the basics for reading and math, and an explanation for every question. Teachers can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ISEE practice test, ISEE middle level practice test, free ISEE practice test, ISEE practice questions, independent school entrance exam practice, ISEE verbal reasoning, ISEE quantitative reasoning, ISEE reading comprehension, ISEE math achievement, ISEE synonyms, quantitative comparison practice, private school entrance exam",
  alternates: {
    canonical: `${siteUrl}/isee-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/isee-practice-test`,
    images: [{ url: shareImageUrl("isee"), width: 1200, height: 630, alt: "Tigertest free ISEE Middle Level practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("isee")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the ISEE?",
    a: "The ISEE (Independent School Entrance Exam) is the admission test many independent schools use, from E3n, the nonprofit formed when ERB merged with EMA. Students take the level for the grade they are applying to: Lower Level for grades 5 and 6, Middle Level for grades 7 and 8, and Upper Level for grades 9 to 12. Tigertest models the Middle Level.",
  },
  {
    q: "How long is the ISEE Middle Level, and how many questions are there?",
    a: "The Middle Level has 160 multiple-choice questions: Verbal Reasoning 40 in 20 minutes, Quantitative Reasoning 37 in 35 minutes, Reading Comprehension 36 in 35 minutes and Mathematics Achievement 47 in 40 minutes, plus a 30-minute essay. With two 10-minute breaks it takes about 3 hours. Each Tigertest practice test has 81 questions, about half of each section, at the same pace.",
  },
  {
    q: "What kinds of questions are on the ISEE Middle Level?",
    a: "Verbal Reasoning has synonyms (the choices are listed in alphabetical order) and sentence completions with one missing word. Quantitative Reasoning has word problems that need little calculation and quantitative comparisons, where you decide whether Column A or Column B is greater, whether they are equal, or whether it cannot be determined. Reading Comprehension has passages on science, history, the arts and everyday life with six questions each. Mathematics Achievement covers numbers and operations, algebra, geometry, measurement, and data and probability.",
  },
  {
    q: "How is the ISEE scored, and what is a good score?",
    a: "Only right answers count; wrong answers are not deducted, so students should answer every question. Each section gets a scaled score, a percentile rank and a stanine from 1 to 9 that compares the student only with other applicants to the same grade. There is no pass mark: each school decides what it looks for. Tigertest reports percent correct per section, which shows strong and weak areas but cannot be turned into a stanine.",
  },
  {
    q: "Can you use a calculator on the ISEE?",
    a: "No. Calculators are not allowed unless a student has an approved accommodation, so every math question is designed to be done by hand. The Tigertest practice tests have no calculator either. Know your metric conversions; customary conversions such as feet to inches are given in the question when needed.",
  },
  {
    q: "Is the essay included?",
    a: "No. The ISEE essay is not scored, though schools receive a copy, so Tigertest practices the four scored sections. Practice writing a short, organized response to a prompt in 30 minutes on your own.",
  },
  {
    q: "Is the Tigertest ISEE practice free?",
    a: "Yes, all of it: both practice tests, all eight drills, the basics lessons and every explanation, with no account required. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ISEE Middle Level Practice Test",
      description,
      url: `${siteUrl}/isee-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("isee"),
      featureList: [
        "Two timed practice tests: Verbal, Quantitative, Reading and Math, 81 questions each",
        "Built on E3n's published ISEE Middle Level format and question types",
        "Synonyms in alphabetical order and quantitative comparisons, as on the real test",
        "Reading passages shown beside their questions",
        "Eight mastery drills, two with the basics taught first",
        "Practice Test 2 held out of the drills for a clean score",
        "An explanation for every question",
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
        classFaqJsonLd("isee"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Synonyms and Sentence Completion", section: "Verbal Reasoning", weight: "20 per test" },
  { name: "Word Problems and Quantitative Comparison", section: "Quantitative Reasoning", weight: "19 per test" },
  { name: "Three passages, six questions each", section: "Reading Comprehension", weight: "18 per test" },
  { name: "Numbers, Algebra, Geometry and Measurement, Data", section: "Mathematics Achievement", weight: "24 per test" },
];

export default function IseeLandingPage() {
  return (
    <div data-theme="isee" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ISEE Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/isee/dashboard"
            shortName="ISEE"
            subtitle="Verbal, Quantitative, Reading and Math for the ISEE Middle Level (applying to grades 7 and 8), timed at the real pace, plus eight drills. Everything is free, no account needed."
            shots={{ mobile: "/landing/isee-mobile.png", desktop: "/landing/isee-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="isee" />

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
                Eight short drills, from synonyms and quantitative comparisons to reading and math. The reading and math drills open with the basics, a short lesson and two quick questions. One tap to check, an explanation straight away, and every miss comes back until it is mastered.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Timed Test on a Computer</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All four scored sections in order, each on its own clock, with a break after Quantitative Reasoning like the real test. Flag questions to come back to within a section, keep the passage beside its questions, and finish with a percent score per section and a list of what to drill next.
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
                Each practice test follows the ISEE Middle Level as E3n publishes it: the four scored sections in the real order, the same question types, about half of each section&apos;s questions and the same time per question, with no calculator. The real test reports scaled scores, percentiles and stanines against other applicants; this one reports percent correct and shows which areas to work on.
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
              <Image src={getTigerAsset("isee", 3)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Run an ISEE Prep Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Teachers and tutors can set it for a class for free: post one link, students join with just their first name, and you see who practiced, their scores in each section and the questions your class misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for the ISEE Middle Level</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Answer every question</h3>
              <p>
                Wrong answers are not deducted on the ISEE, so a blank is always a lost chance. If time is running out, make your best guess and move on, then come back to flagged questions if there is time left in that section.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the quantitative comparison choices</h3>
              <p>
                The four answers never change. Before calculating, ask whether you can tell which column is greater from the structure alone, and remember that if a variable could make either column larger, the answer is that it cannot be determined.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Build vocabulary a little every day</h3>
              <p>
                Verbal Reasoning moves fast: 40 questions in 20 minutes. Read widely, note words you do not know, and learn common roots and prefixes. In sentence completions, look for clue words such as because, although and unlike.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice math without a calculator</h3>
              <p>
                Take Practice Test 1, look at the scores by section, and spend ten minutes a day on the weakest drill, working by hand. Then take Practice Test 2. Its questions never appear in the drills, so it shows real progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">ISEE Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="isee" />
        </div>
      </div>

      <SampleQuestionsV2 examId="isee" />

      <ExamRelatedTests examId="isee" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Test Day?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two timed practice tests and eight drills, from synonyms to quantitative comparisons.</p>
          <ExamLandingCTA dashboardHref="/isee/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/v2/banks/hspt";
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

const title = "Free HSPT Practice Test 2026 - Verbal, Quantitative, Reading, Math, Language";
const metaDescription =
  "Free HSPT practice for eighth graders: all five High School Placement Test subtests in STS's own mix of question types, timed practice tests and an explanation for every question.";
const description =
  "A free practice test for the HSPT (High School Placement Test) from Scholastic Testing Service, which high schools use to admit and place eighth graders: Verbal Skills, Quantitative Skills, Reading, Mathematics and Language, in the skill mix STS reports, with a percent score per subtest. Two timed practice tests, ten drills from synonyms to number series, and an explanation for every question. Teachers can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "HSPT practice test, free HSPT practice test, High School Placement Test practice, HSPT practice questions, Catholic high school entrance exam, HSPT verbal skills, HSPT quantitative skills, HSPT math practice, HSPT reading practice, HSPT language practice, 8th grade placement test, Pre-HSPT",
  alternates: {
    canonical: `${siteUrl}/hspt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hspt-practice-test`,
    images: [{ url: shareImageUrl("hspt"), width: 1200, height: 630, alt: "Tigertest free HSPT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hspt")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the HSPT?",
    a: "The HSPT, or High School Placement Test, is a test from Scholastic Testing Service (STS) that high schools give to eighth graders, often through a Catholic diocese's education department. Schools use it for admission, scholarships and placing students in ninth grade classes. It has five multiple-choice subtests: Verbal Skills, Quantitative Skills, Reading, Mathematics and Language.",
  },
  {
    q: "How many questions are on the HSPT, and how long is it?",
    a: "The HSPT has 298 questions: 60 in Verbal Skills, 52 in Quantitative Skills, 62 in Reading, 64 in Mathematics and 60 in Language. STS lists the working time as 2 hours 30 minutes, and the person giving the test announces when each subtest is halfway through. Each Tigertest practice test is about a third as long, 100 questions in 50 minutes, at about the same pace and in the same mix of question types.",
  },
  {
    q: "What is a good HSPT score?",
    a: "There is no pass mark. STS turns the number of questions answered correctly into standard scores from 200 to 800 and national and local percentiles, and each high school decides which scores it needs for admission, honors classes or scholarships. Ask the schools you are applying to. Tigertest reports percent correct per subtest, not an STS score, so use it to see which subtests need the most work.",
  },
  {
    q: "Can you use a calculator on the HSPT?",
    a: "No. STS does not allow calculators, phones or other technology, so the Quantitative Skills and Mathematics questions are written to be worked out on paper. The Tigertest practice tests have no calculator either.",
  },
  {
    q: "Is there a penalty for guessing on the HSPT?",
    a: "No. Your score is the number of questions you answer correctly, and nothing is taken off for a wrong answer. So answer every question, even if you have to guess near the end of a subtest.",
  },
  {
    q: "What are the optional HSPT tests?",
    a: "STS offers optional tests in science and Catholic religion, and a school may give one of them with the HSPT. Those scores are not part of the overall composite score. Tigertest covers only the five main subtests, so check with your school whether it gives an optional test.",
  },
  {
    q: "Is the Tigertest HSPT practice free?",
    a: "Yes, all of it: both practice tests, all ten drills and every explanation, with no account required. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free HSPT Practice Test",
      description,
      url: `${siteUrl}/hspt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hspt"),
      featureList: [
        "Two timed practice tests: Verbal, Quantitative, Reading, Mathematics and Language, 100 questions each",
        "The skill mix of the real HSPT, from Scholastic Testing Service's own reports",
        "No calculator, as on the real test",
        "Reading passages shown beside their questions",
        "Ten mastery drills, two for each subtest",
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
        classFaqJsonLd("hspt"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Synonyms, antonyms, analogies, classification, logic", section: "Verbal Skills", weight: "20 per test" },
  { name: "Number series, number puzzles, comparisons", section: "Quantitative Skills", weight: "18 per test" },
  { name: "Comprehension and vocabulary", section: "Reading", weight: "20 per test" },
  { name: "Numbers, measurement, geometry, algebra, data", section: "Mathematics", weight: "22 per test" },
  { name: "Punctuation, capitals, usage, spelling, composition", section: "Language", weight: "20 per test" },
];

export default function HsptLandingPage() {
  return (
    <div data-theme="hspt" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free HSPT Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/hspt/dashboard"
            shortName="HSPT"
            subtitle="All five High School Placement Test subtests in the real mix of question types: timed practice tests and ten drills, from synonyms to number series. Everything is free, no account needed."
            shots={{ mobile: "/landing/hspt-mobile.png", desktop: "/landing/hspt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hspt" />

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
                Ten short drills, two for each HSPT subtest, from synonyms and analogies to fractions and commas. One tap to check, an explanation straight away, and every miss comes back until it is mastered.
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
                All five subtests in order, each with its own clock, no calculator. Flag questions to come back to, reading passages stay beside their questions, and you finish with a percent score per subtest and a list of what to drill next.
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
                Each practice test follows the skill mix in Scholastic Testing Service&apos;s own HSPT reports, at about a third of the real length: the same five subtests in the same order, the same kinds of questions in about the same proportions, and no calculator. The real HSPT reports standard scores and percentiles; this one reports percent correct so you can see which subtests to work on.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.section} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{area.section}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{area.name}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("hspt", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach an HSPT Prep Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Teachers can set it for a class for free: post one link, students join with just their first name, and you see who practiced, their scores in each subtest and the questions your class misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for the HSPT</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Keep moving on Verbal Skills</h3>
              <p>
                Verbal Skills has 60 quick questions on words and logic. Answer the ones you know at once, make a best guess on the rest and move on; getting stuck on one word costs more than missing it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice math without a calculator</h3>
              <p>
                Calculators are not allowed, so fractions, decimals, percents and long division have to be quick on paper. A few minutes a day on the number drills builds that speed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Answer every question</h3>
              <p>
                There is no penalty for guessing, so never leave a bubble blank. When time is nearly up, fill in a guess for every question you have not reached.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill the weakest subtest</h3>
              <p>
                Take Practice Test 1, look at the scores by subtest, and spend most of your time on the weakest drills. Then take Practice Test 2. Its questions never appear in the drills, so it shows real progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">HSPT Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hspt" />
        </div>
      </div>

      <SampleQuestionsV2 examId="hspt" />

      <ExamRelatedTests examId="hspt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Test Day?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two timed practice tests and ten drills, from synonyms to number series.</p>
          <ExamLandingCTA dashboardHref="/hspt/dashboard" />
        </div>
      </div>
    </div>
  );
}

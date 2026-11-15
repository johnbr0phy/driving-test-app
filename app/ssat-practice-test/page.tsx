import "@/lib/v2/banks/ssat";
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

const title = "Free SSAT Practice Test - Middle Level Quantitative, Reading, Verbal";
const metaDescription =
  "Free Middle Level SSAT practice for grades 5 to 7: Quantitative, Reading and Verbal (synonyms and analogies) in the real order, five choices per question, with an explanation for every question.";
const description =
  "A free practice test for the Middle Level SSAT, the independent school admission test for students in grades 5 to 7: both Quantitative sections, Reading on story and argument passages, and Verbal synonyms and analogies, in the real order and at the real pace with five answer choices per question. Two timed practice tests, seven drills (three teach the basics first) and an explanation for every question. Teachers can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SSAT practice test, free SSAT practice test, middle level SSAT practice, SSAT practice questions, SSAT synonyms, SSAT analogies, SSAT reading practice, SSAT math practice, private school entrance exam, independent school admission test, 5th grade SSAT, 6th grade SSAT, 7th grade SSAT",
  alternates: {
    canonical: `${siteUrl}/ssat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ssat-practice-test`,
    images: [{ url: shareImageUrl("ssat"), width: 1200, height: 630, alt: "Tigertest free SSAT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ssat")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the SSAT?",
    a: "The SSAT (Secondary School Admission Test) is the admission test many independent and boarding schools in the US and abroad ask for. It is run by E3n, the non-profit formerly called The Enrollment Management Association, at admission.org. The Middle Level is for students in grades 5 to 7 and the Upper Level, with the same format, for grades 8 to 11. This practice test is for the Middle Level.",
  },
  {
    q: "What is on the Middle Level SSAT?",
    a: "An unscored 25-minute writing sample, then five multiple-choice sections: Quantitative (25 questions, 30 minutes), Reading (40 questions, 40 minutes), Verbal (60 questions in 30 minutes: 30 synonyms and 30 analogies), a second Quantitative section (25 questions, 30 minutes) and an unscored 15-minute experimental section. With two 10-minute breaks it takes 3 hours 10 minutes. Every question has five answer choices and calculators are not allowed.",
  },
  {
    q: "How is the SSAT scored?",
    a: "Each right answer earns 1 point, each wrong answer loses a quarter of a point and a blank earns nothing. E3n turns the raw score into a scaled score for each section and a percentile that compares your child with other students in the same grade. Tigertest cannot give an SSAT scaled score or percentile: it reports percent correct per section and shows which skills to work on.",
  },
  {
    q: "Should my child guess on the SSAT?",
    a: "Because a wrong answer costs a quarter point, a wild guess does not help on average. Once your child can rule out two or more of the five choices, guessing between the rest is worth it. The practice tests here do not take off points, so your child can try every question and then look at which ones were guesses.",
  },
  {
    q: "How is this practice test laid out?",
    a: "Each practice test keeps the four scored sections in the real order at about half the length and the same pace: Quantitative 13 questions in 16 minutes, Reading 20 questions on four passages in 20 minutes, Verbal 30 questions (15 synonyms, then 15 analogies) in 15 minutes, a break, then Quantitative 12 questions in 14 minutes. The writing sample and the experimental section are not included.",
  },
  {
    q: "Is there a passing score on the SSAT?",
    a: "No. Each school decides how to read the scores alongside grades, recommendations and interviews. Your child's percentiles are compared only with other students applying in the same grade.",
  },
  {
    q: "Is the Tigertest SSAT practice free?",
    a: "Yes, all of it: both practice tests, all seven drills, the basics lessons and every explanation, with no account required. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SSAT Practice Test",
      description,
      url: `${siteUrl}/ssat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ssat"),
      featureList: [
        "Two timed Middle Level practice tests, 75 questions each",
        "Quantitative, Reading, Verbal and Quantitative in the real order and at the real pace",
        "Five answer choices per question, no calculator, like the real SSAT",
        "Reading passages shown beside their questions",
        "Seven mastery drills, three with the basics taught first",
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
        classFaqJsonLd("ssat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Arithmetic", section: "Quantitative", weight: "10 per test" },
  { name: "Elementary Algebra", section: "Quantitative", weight: "8 per test" },
  { name: "Geometry, Measurement and Data", section: "Quantitative", weight: "7 per test" },
  { name: "Story and Argument Passages", section: "Reading", weight: "10 each" },
  { name: "Synonyms", section: "Verbal", weight: "15 per test" },
  { name: "Analogies", section: "Verbal", weight: "15 per test" },
];

export default function SsatLandingPage() {
  return (
    <div data-theme="ssat" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SSAT Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/ssat/dashboard"
            shortName="SSAT"
            subtitle="Middle Level Quantitative, Reading and Verbal for grades 5 to 7, in the real order with five choices per question, plus seven drills that teach the basics first. Everything is free, no account needed."
            shots={{ mobile: "/landing/ssat-mobile.png", desktop: "/landing/ssat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ssat" />

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
                Seven short drills: arithmetic, algebra, geometry, story passages, argument passages, synonyms and analogies. Three open with the basics, a short lesson and two quick questions, before the SSAT-level questions. One tap to check, an explanation straight away, and every miss comes back until it is mastered.
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
                The four scored sections in the real order with a clock on each and a break, at the real SSAT pace. Flag questions to come back to, reading passages stay beside their questions, and you finish with a percent score per section and a list of what to drill next.
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
                Each practice test follows E3n&apos;s published Middle Level format: two Quantitative sections on arithmetic, elementary algebra and geometry, Reading on narrative and argument passages, and Verbal split evenly between synonyms and analogies, with five choices per question and no calculator. It is about half the real length at the same pace. The real SSAT reports scaled scores and percentiles; this one reports percent correct.
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
              <Image src={getTigerAsset("ssat", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Run an SSAT Prep Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Tutors and teachers can set it for a class for free: post one link, students join with just their first name, and you see who practiced, their scores in each section and the questions your class misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for the Middle Level SSAT</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Take Practice Test 1 first</h3>
              <p>
                It shows which section needs the most work. Look at the scores by skill, not just the total.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Build vocabulary every day</h3>
              <p>
                Verbal is 60 questions in 30 minutes, so words have to come quickly. Ten minutes a day on the synonyms and analogies drills, and naming the relationship in each analogy out loud, adds up fast.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do math without a calculator</h3>
              <p>
                Calculators are not allowed, so practice fractions, percents and multi-step problems on scrap paper. The arithmetic and algebra drills start with the basics if they are rusty.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Learn when to skip</h3>
              <p>
                A wrong answer costs a quarter point on the real test. Skip a question your child cannot narrow down, and guess once two or more choices are ruled out. Then take Practice Test 2: its questions never appear in the drills, so it shows real progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">SSAT Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ssat" />
        </div>
      </div>

      <SampleQuestionsV2 examId="ssat" />

      <ExamRelatedTests examId="ssat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Test Day?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two practice tests, seven drills and the basics, from fractions to analogies.</p>
          <ExamLandingCTA dashboardHref="/ssat/dashboard" />
        </div>
      </div>
    </div>
  );
}

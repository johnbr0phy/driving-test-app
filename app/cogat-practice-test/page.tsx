import "@/lib/v2/banks/cogat";
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

const title = "Free CogAT Practice Test - Grades 3 to 6 Verbal and Quantitative";
const metaDescription =
  "Free CogAT practice for grades 3 to 6 (Levels 9 to 12): verbal analogies, sentence completion, verbal classification, number analogies, number puzzles and number series, with an explanation for every question.";
const description =
  "A free practice test for the CogAT (Cognitive Abilities Test, Riverside Insights) at Levels 9 to 12, grades 3 to 6: the Verbal and Quantitative Batteries, built on Riverside's published descriptions of the six tests in them and timed at 10 minutes a test, with a percent score per battery. Two practice tests, six drills (one per CogAT test) and a kid-friendly explanation for every question. The Nonverbal Battery of picture puzzles is not included. Teachers can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CogAT practice test, CogAT test prep, cognitive abilities test practice, CogAT grade 3, CogAT grade 4, CogAT grade 5, CogAT grade 6, CogAT level 9, CogAT verbal practice, CogAT quantitative practice, gifted and talented test practice, free CogAT practice",
  alternates: {
    canonical: `${siteUrl}/cogat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cogat-practice-test`,
    images: [{ url: shareImageUrl("cogat"), width: 1200, height: 630, alt: "Tigertest free CogAT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cogat")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the CogAT test?",
    a: "CogAT, the Cognitive Abilities Test, is a reasoning test from Riverside Insights that many US schools use to find students for gifted and talented programs and to see how each child learns best. It does not test what your child has been taught. It tests how well they reason with words, numbers and shapes, in three batteries: Verbal, Quantitative and Nonverbal, each made of three short tests.",
  },
  {
    q: "What is on the Verbal and Quantitative Batteries?",
    a: "From Level 9 (grade 3) up, the Verbal Battery is Verbal Analogies (work out how two words go together, then finish another pair the same way), Sentence Completion (choose the word that best completes a sentence) and Verbal Classification (choose the word that belongs with three others). The Quantitative Battery is Number Analogies, Number Puzzles (find the missing number in an equation) and Number Series (find the next number in a pattern). Riverside gives about 10 minutes for each test.",
  },
  {
    q: "Which parts of the CogAT does Tigertest cover?",
    a: "The Verbal and Quantitative Batteries at Levels 9 to 12, for grades 3 to 6, which are written in words and numbers at those levels. The Nonverbal Battery (Figure Matrices, Paper Folding and Figure Classification) is made of pictures and shapes at every level, and the primary levels for grades K to 2 are picture based too, so Tigertest leaves them out rather than turn a picture puzzle into a reading question.",
  },
  {
    q: "How is the CogAT scored?",
    a: "The real CogAT compares your child with other students of the same age, month by month: a Standard Age Score and an age percentile rank, with age stanines and an Ability Profile that sums up the pattern of strengths. Tigertest cannot give those scores, because a practice test is not normed. It gives percent correct per battery and shows which of the six tests need work.",
  },
  {
    q: "How many questions are on each practice test?",
    a: "36 questions a battery, 12 for each CogAT test, in 30 minutes a battery, so each test gets the 10 minutes Riverside gives it. Riverside publishes the time for each test rather than the number of questions, so the 12 per test is Tigertest's choice. There is a short break between the two batteries. Riverside says the full CogAT takes less than two class periods.",
  },
  {
    q: "Can you prepare for the CogAT?",
    a: "The CogAT measures reasoning, so there is no list of facts to learn. A little practice still helps: it makes the question types familiar, so on test day your child spends the time thinking, not working out what a number analogy is asking. Keep it short and calm. A few minutes of drills a day is plenty.",
  },
  {
    q: "Is the Tigertest CogAT practice free?",
    a: "Yes, all of it: both practice tests, all six drills and every explanation, with no account required. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CogAT Practice Test",
      description,
      url: `${siteUrl}/cogat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cogat"),
      featureList: [
        "Two practice tests of the Verbal and Quantitative Batteries, 72 questions each",
        "Built on Riverside Insights' published descriptions of the CogAT Form 7 and 8 tests",
        "Levels 9 to 12, for grades 3 to 6",
        "Timed at 10 minutes for each CogAT test",
        "Six mastery drills, one for each test",
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
        classFaqJsonLd("cogat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Verbal Analogies", section: "Verbal Battery", weight: "12 per test" },
  { name: "Sentence Completion", section: "Verbal Battery", weight: "12 per test" },
  { name: "Verbal Classification", section: "Verbal Battery", weight: "12 per test" },
  { name: "Number Analogies", section: "Quantitative Battery", weight: "12 per test" },
  { name: "Number Puzzles", section: "Quantitative Battery", weight: "12 per test" },
  { name: "Number Series", section: "Quantitative Battery", weight: "12 per test" },
  { name: "Figure Matrices, Paper Folding, Figure Classification", section: "Nonverbal Battery", weight: "Not included" },
];

export default function CogatLandingPage() {
  return (
    <div data-theme="cogat" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CogAT Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/cogat/dashboard"
            shortName="CogAT"
            subtitle="The Verbal and Quantitative Batteries for grades 3 to 6, timed like the real CogAT, plus six drills, one for each test. Everything is free, no account needed."
            shots={{ mobile: "/landing/cogat-mobile.png", desktop: "/landing/cogat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cogat" />

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
                Six short drills, one for each CogAT test, from word analogies to number patterns. One tap to check, a kid-friendly explanation straight away, and every miss comes back until it is mastered.
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
                The Verbal Battery, a short break, then the Quantitative Battery, each 36 questions in 30 minutes. Flag questions to come back to, turn the clock off if you prefer, and finish with a percent score per battery and a list of what to drill next.
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
                Each practice test follows Riverside Insights&apos; own description of CogAT Forms 7 and 8 at Level 9 and up: the six Verbal and Quantitative tests in their real order, about 10 minutes each. Questions run from grade 3 to grade 6, easy to hard within each test. The Nonverbal Battery is picture puzzles at every level, so it is not included here.
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
              <Image src={getTigerAsset("cogat", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach Grades 3 to 6?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Teachers can set it for a class for free: post one link, students join with just their first name, and you see who practiced, their scores on each battery and the questions your class misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Help Your Child Prepare for the CogAT</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Make the question types familiar</h3>
              <p>
                Analogies, classification and number puzzles look unusual the first time. A couple of short sessions means your child knows what each kind of question is asking before test day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Say the rule out loud</h3>
              <p>
                For analogies and number patterns, the trick is to put the rule into words first (&quot;a puppy grows up to be a dog&quot;, &quot;each number is 3 more&quot;) and then test every answer against it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read every choice</h3>
              <p>
                Several answers often look close. Encourage your child to read every choice before picking one and to check a number answer by putting it back into the pattern or equation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Keep it short and relaxed</h3>
              <p>
                Take Practice Test 1, look at the score for each test, and spend ten minutes a day on the weakest drill. Then take Practice Test 2. Its questions never appear in the drills, so it shows real progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">CogAT Test Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cogat" />
        </div>
      </div>

      <SampleQuestionsV2 examId="cogat" />

      <ExamRelatedTests examId="cogat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Test Day?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two practice tests and six drills, from word analogies to number series.</p>
          <ExamLandingCTA dashboardHref="/cogat/dashboard" />
        </div>
      </div>
    </div>
  );
}

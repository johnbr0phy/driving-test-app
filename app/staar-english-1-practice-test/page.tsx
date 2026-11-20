import "@/lib/v2/banks/staareng1";
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

const title = "Free STAAR English I Practice Test 2026 - Reading, Revising and Editing";
const metaDescription =
  "Free STAAR English I practice for Texas: original passages and student drafts at TEA's blueprint mix, two practice tests and nine drills, with an explanation for every question.";
const description =
  "A free practice test for the Texas STAAR English I end-of-course test: the reading questions on literary, informational and paired passages and the revising and editing questions on student drafts, written to TEA's blueprint and the English I TEKS. Two practice tests of 51 questions, nine drills (one per skill area) and an explanation for every question. The essay is not included. Teachers can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "STAAR English I practice test, STAAR English 1 practice test, English I EOC practice, STAAR EOC English practice, STAAR reading practice, STAAR revising and editing practice, Texas English I test, 9th grade STAAR practice, free STAAR practice test",
  alternates: {
    canonical: `${siteUrl}/staar-english-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/staar-english-1-practice-test`,
    images: [{ url: shareImageUrl("staareng1"), width: 1200, height: 630, alt: "Tigertest free STAAR English I practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("staareng1")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the STAAR English I test?",
    a: "STAAR English I is the Texas end-of-course test for the English I course. Under TEA's blueprint it has 52 questions worth 64 points. The reading section asks about two single passages and one paired passage, chosen from fiction, poetry, drama, literary nonfiction and informational and argumentative texts. The writing section has questions on two revising passages and two editing passages, plus an extended constructed response: a written response to a reading passage, worth 10 points.",
  },
  {
    q: "How is STAAR English I scored?",
    a: "Most questions are worth 1 point, three are worth 2 points and the extended constructed response is worth 10, for 64 points. TEA converts the raw score to a scale score. Approaches Grade Level is 3775, Meets Grade Level is 4000 and Masters Grade Level is 4606. On TEA's summer 2026 conversion table those took 27, 35 and 53 raw points, and the raw score needed changes slightly from one form to the next.",
  },
  {
    q: "What does the Tigertest practice test cover?",
    a: "The reading questions and the revising and editing questions, at the blueprint's mix: 30 reading questions on two single passages and one pair, and 21 revising and editing questions on four student drafts with numbered sentences. Questions are multiple choice, dropdowns, choose two and select a sentence, like the newer STAAR question types. The extended constructed response (the essay) and the 2-point questions are not modelled, so every question here is worth one point.",
  },
  {
    q: "Are these real STAAR questions?",
    a: "No. Every passage, draft and question was written for Tigertest from TEA's blueprint, its list of eligible English I standards and the English I TEKS. None is a released STAAR question. For TEA's own released tests, see the STAAR resources on the TEA website.",
  },
  {
    q: "Is STAAR changing?",
    a: "Yes. TEA plans to bring in the Student Success Tool, the state test that follows STAAR, from fall 2027, and it has published a draft English I blueprint for it that begins with the spring 2028 test. For the 2026-27 school year the English I test follows the STAAR blueprint this practice is built on.",
  },
  {
    q: "Is the Tigertest STAAR English I practice free?",
    a: "Yes, all of it: both practice tests, all nine drills and every explanation, with no account required. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free STAAR English I Practice Test",
      description,
      url: `${siteUrl}/staar-english-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("staareng1"),
      featureList: [
        "Two practice tests of 51 reading and revising and editing questions",
        "Written to TEA's STAAR English I blueprint and the English I TEKS",
        "Original literary, informational, argumentative and paired passages",
        "Student drafts with numbered sentences to revise and edit",
        "Multiple choice, dropdown, choose-two and select-a-sentence questions",
        "Nine mastery drills, one per skill area",
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
        classFaqJsonLd("staareng1"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Comprehension and paired texts", section: "Reading", weight: "9 per test" },
  { name: "Fiction, poetry and drama", section: "Reading", weight: "7 per test" },
  { name: "Author's purpose and craft", section: "Reading", weight: "6 per test" },
  { name: "Informational and argumentative texts", section: "Reading", weight: "5 per test" },
  { name: "Vocabulary", section: "Reading", weight: "3 per test" },
  { name: "Revising: organization and development; clarity and sentences", section: "Revising and editing", weight: "5 and 6" },
  { name: "Editing: sentences and usage; capitalization, punctuation, spelling", section: "Revising and editing", weight: "5 and 5" },
];

export default function StaarEnglish1LandingPage() {
  return (
    <div data-theme="staareng1" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free STAAR English I Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/staar-english-1/dashboard"
            shortName="STAAR English I"
            subtitle="STAAR English I reading and editing practice, plus nine drills. Everything is free, no account needed."
            shots={{ mobile: "/landing/staareng1-mobile.png", desktop: "/landing/staareng1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="staareng1" />

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
                Nine short drills, one for each skill area, from inference and theme to comma splices and colons. Each passage or draft stays above its questions. One tap to check, an explanation straight away, and every miss comes back until it is mastered.
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
                Reading, then revising and editing, in one sitting. Flag questions to come back to, passages and drafts stay beside their questions, and you finish with a percent score for each section and a list of what to drill next. The clock is Tigertest&apos;s practice pace, not TEA&apos;s.
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
                Each practice test follows TEA&apos;s STAAR English I blueprint: two single reading passages and one paired passage with 30 questions, then two revising drafts and two editing drafts with 21 questions, spread across the eligible English I standards. The real test also has a written composition worth 10 of its 64 points, which is not included here, so the score is percent correct, not a STAAR scale score.
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
              <Image src={getTigerAsset("staareng1", 3)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach English I?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Teachers can set it for a class for free: post one link, students join with just their first name, and you see who practiced, their scores in each section and the questions your class misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for STAAR English I</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the questions with the passage in view</h3>
              <p>
                Most reading questions point to a paragraph or a line. Go back to that spot before you choose, and look for the answer the text supports, not the one that only sounds true.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Treat paired passages as a conversation</h3>
              <p>
                Some questions ask how two texts are alike or different. As you read the second one, note where it agrees with the first and where it adds something new.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the editing rules that come up again and again</h3>
              <p>
                Comma splices, fragments, verb tense shifts, pronoun agreement, apostrophes and capital letters make up much of the editing work. Drill them until you spot them at a glance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the essay separately</h3>
              <p>
                The extended constructed response is worth 10 of the 64 points and is not covered here. Write timed responses to a passage in class, and use Tigertest for the reading and revising and editing questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">STAAR English I Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="staareng1" />
        </div>
      </div>

      <SampleQuestionsV2 examId="staareng1" />

      <ExamRelatedTests examId="staareng1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Test Day?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two practice tests and nine drills, from theme to comma splices.</p>
          <ExamLandingCTA dashboardHref="/staar-english-1/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/v2/banks/hiset";
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

const title = "Free HiSET Practice Test 2026 - All Five Subtests";
const metaDescription =
  "Free HiSET practice test covering all five subtests: Reading, Writing, Math, Science and Social Studies, timed at the real pace, with an estimated 1 to 20 score for each.";
const description =
  "A free HiSET practice test: Language Arts Reading, Language Arts Writing, Mathematics, Science and Social Studies in five timed sections at the real pace, with an estimated 1 to 20 score per subtest and an estimated total. Fifteen drills sized for your phone, one for each content area on the HiSET outline, teach the basics first and bring every miss back until you master it. Both practice tests and every drill are free. Adult education teachers can assign it to a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "HiSET practice test, free HiSET practice test, HiSET test 2026, HiSET math practice test, HiSET reading practice, HiSET writing practice test, HiSET science practice test, HiSET social studies practice test, high school equivalency practice test, adult education HiSET prep",
  alternates: {
    canonical: `${siteUrl}/hiset-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hiset-practice-test`,
    images: [{ url: shareImageUrl("hiset"), width: 1200, height: 630, alt: "Tigertest free HiSET practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hiset")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the HiSET test?",
    a: "Five subtests, each taken and scored on its own: Language Arts - Reading (50 questions in 65 minutes), Language Arts - Writing (60 multiple-choice questions and an essay in 120 minutes), Mathematics (55 questions in 90 minutes), Science (60 questions in 80 minutes) and Social Studies (60 questions in 70 minutes). Every question is multiple choice with four answers, except the essay. You can take the subtests one at a time on different days. The Tigertest practice test covers all five in shorter sections at the same pace, about 2 hours 37 minutes with breaks.",
  },
  {
    q: "What score do you need to pass the HiSET?",
    a: "Each subtest is scored from 1 to 20. To pass, you need at least 8 on every subtest, at least 2 out of 6 on the essay, and a total of at least 45 across all five. A score of 15 or more on a subtest is PSI's College and Career Readiness level (on Writing, 15 with at least 4 on the essay). Tigertest converts your percent correct into an estimated 1 to 20 score, because PSI does not publish its conversion table. Treat it as a guide and aim for a margin above 8 in each subtest.",
  },
  {
    q: "Can I use a calculator on the HiSET?",
    a: "The Mathematics subtest is calculator neutral: you do not need one, but the test center must give you one if you ask. A formula sheet is provided, but it does not include distance equals rate times time, the Pythagorean Theorem or the quadratic formula, so learn those. The Tigertest practice test has a calculator and a formula reference one tap away on every Math question.",
  },
  {
    q: "Is the essay included?",
    a: "No. The real Writing subtest ends with an essay in which you take a position using a pair of short texts, scored 1 to 6. Tigertest does not model the essay. Everything else in Writing is covered: drafts with underlined parts to revise for organization, word choice, sentence structure, grammar and punctuation.",
  },
  {
    q: "Should I take the HiSET or the GED?",
    a: "It depends on what your state offers; some states give only one of them. The HiSET has five subtests, all multiple choice except the essay, and can be taken on paper or on a computer. The GED has four subjects and uses more question types. Both lead to a high school equivalency credential. Tigertest has a free practice test for each.",
  },
  {
    q: "How do I prepare for the HiSET on my own?",
    a: "Start with the drills that teach the basics: each opens with short rule cards and one-line questions before the test-level items, so a fraction, a comma rule or how to find the main idea is taught before it is tested. Ten minutes a night on your phone adds up. Take Practice Test 1 for a baseline, drill your weakest subtest, then take Practice Test 2, which is held out of the drills, to see if you are ready.",
  },
  {
    q: "Is the Tigertest HiSET practice test free?",
    a: "Yes, all of it: both practice tests, all fifteen drills, the basics lessons and every explanation, with no account required. An account saves your progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free HiSET Practice Test",
      description,
      url: `${siteUrl}/hiset-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hiset"),
      featureList: [
        "Two HiSET practice tests, all five subtests, 102 questions each",
        "Timed sections at the real pace, with a break between subtests",
        "Calculator and formula reference on Math",
        "Estimated 1 to 20 score per subtest and an estimated total",
        "Fifteen mastery drills, one per content area, ten with the basics taught first",
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
        classFaqJsonLd("hiset"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Literary and Informational Texts", section: "Language Arts - Reading", weight: "40% / 60%" },
  { name: "Organization, Language Facility, Conventions", section: "Language Arts - Writing", weight: "22% / 43% / 35%" },
  { name: "Numbers, Geometry, Data, Algebra", section: "Mathematics", weight: "19% / 18% / 18% / 45%" },
  { name: "Life, Physical, Earth Science", section: "Science", weight: "49% / 28% / 23%" },
  { name: "History, Civics, Economics, Geography", section: "Social Studies", weight: "35% / 35% / 20% / 10%" },
];

export default function HisetLandingPage() {
  return (
    <div data-theme="hiset" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free HiSET Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hiset/dashboard"
            shortName="HiSET"
            subtitle="All five HiSET subtests in two timed practice tests, plus fifteen drills that teach the basics first. Everything is free, no account needed."
            shots={{ mobile: "/landing/hiset-mobile.png", desktop: "/landing/hiset-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hiset" />

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
                Fifteen drills, one for each content area on the HiSET outline. The reading, writing, math and life science drills open with the basics: a rule card and a couple of one-line questions on fractions, solving for x, commas or finding the main idea before the test-level questions. One tap to check, an explanation right away, and every miss comes back until you have mastered it.
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
                Five timed subtests with a break between them, a countdown clock, flag for review, a calculator and formula reference on Math, and the four-choice questions the real HiSET uses, including drafts to revise with NO CHANGE options. Finish with an estimated 1 to 20 score per subtest and a plan for what to drill next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the HiSET Content Categories</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test follows the content categories and percentages in PSI&apos;s HiSET Test at a Glance, and the drills are split the same way, so your results show which subtest and which area is holding you back. The Writing essay is not modeled.
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
              <Image src={getTigerAsset("hiset", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach a HiSET Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Adult education teachers can assign it to a class for free: post one link, students join with just their name, and you see who practiced, their test scores and the topics your class misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Pass the HiSET</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Mind the total, not just the 8s</h3>
              <p>
                Scoring 8 on every subtest adds up to only 40, and you need 45. So you need more than the minimum somewhere. Plan to score well above 8 in your strongest subtests to carry the total, and make sure no subtest falls below 8.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the basics before the test questions</h3>
              <p>
                If it has been a while since school, start with the basics inside each drill. They teach one rule at a time, fractions, percents, solving for x, commas, main idea, with an example and two quick questions, so you are not guessing at test-level problems you were never shown how to do.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the passage, the table or the draft first</h3>
              <p>
                Most Science and Social Studies questions can be answered from the investigation, data table or document in front of you. On Writing, read the whole sentence around the underlined part before you choose; NO CHANGE is sometimes the right answer. Practice that habit and those subtests get much easier.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take a full practice test before you book</h3>
              <p>
                Sit Practice Test 1 with the timer on to see where you stand, drill your weakest subtest for a week or two, then take Practice Test 2. Its questions never appear in the drills, so it is an honest readiness check. Remember that the fee includes two free retests within 12 months, so one low subtest is not the end.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">HiSET Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hiset" />
        </div>
      </div>

      <SampleQuestionsV2 examId="hiset" />

      <ExamRelatedTests examId="hiset" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the HiSET?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two practice tests, fifteen drills and the basics, all five subtests.</p>
          <ExamLandingCTA dashboardHref="/hiset/dashboard" />
        </div>
      </div>
    </div>
  );
}

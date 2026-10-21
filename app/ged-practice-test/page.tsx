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

const title = "Free GED Practice Test 2026 - All Four Subjects";
const metaDescription =
  "Free GED practice test covering all four subjects: Reasoning Through Language Arts, Math, Science and Social Studies, timed like the real test, with the basics taught first.";
const description =
  "A free full-length GED practice test: Reasoning Through Language Arts, Mathematical Reasoning, Science and Social Studies in four timed sections with a calculator on Math and Science and a percent score per subject. Six skill drills sized for your phone teach the basics first (fractions, solving for x, commas, main idea) and bring every miss back until you master it. Both practice tests and every drill are free. Adult education teachers can assign it to a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "GED practice test, free GED practice test, GED test 2026, GED math practice test, GED RLA practice, GED science practice test, GED social studies practice test, high school equivalency practice test, HiSET practice test, adult education GED prep",
  alternates: {
    canonical: `${siteUrl}/ged-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ged-practice-test`,
    images: [{ url: "/og/ged", width: 1200, height: 630, alt: "TigerTest free GED practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/ged"],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the GED test?",
    a: "Four subject tests, each taken and scored separately: Reasoning Through Language Arts (150 minutes, including a 45-minute essay), Mathematical Reasoning (115 minutes), Science (90 minutes) and Social Studies (70 minutes). You can take them one at a time on different days. The TigerTest practice test covers the same four subjects with shorter timed sections, and a full practice test runs about 3 hours 20 minutes with breaks.",
  },
  {
    q: "What score do you need to pass the GED?",
    a: "Each subject is scored from 100 to 200, and 145 passes. A score of 165 or higher is GED College Ready, and 175 or higher is College Ready plus Credit, which some colleges accept for course credit. TigerTest reports percent correct per subject rather than the 100 to 200 scale, because the real cutoff is not a fixed percent. Aim for a comfortable margin, 65 percent or better, before you book.",
  },
  {
    q: "Can I use a calculator on the GED?",
    a: "Yes, on Mathematical Reasoning (all but the first five questions), Science and Social Studies. The real test gives you an on-screen TI-30XS scientific calculator, and you can bring your own TI-30XS to a test center. The TigerTest practice test has a calculator one tap away on every Math and Science question.",
  },
  {
    q: "Is the essay included?",
    a: "No. The Reasoning Through Language Arts test on the real GED includes an extended response, a 45-minute essay that analyzes two passages. TigerTest does not model the essay. Everything else in RLA is covered: reading comprehension and language and editing questions, including the dropdown and choose-two formats the real test uses.",
  },
  {
    q: "What if I am taking the HiSET instead?",
    a: "The HiSET covers the same four subject areas with reading and writing as separate tests, so the same practice helps. The question styles differ a little: the HiSET is multiple choice plus an essay, while the GED also uses fill-in, dropdown and choose-two items. TigerTest is modeled on the GED.",
  },
  {
    q: "How do I prepare for the GED on my own?",
    a: "Start with the four skill drills that teach the basics: each one opens with short rule cards and one-line questions before the test-level items, so a fraction or a comma rule is taught before it is tested. Ten minutes a night on your phone is enough. Take Practice Test 1 for a baseline, drill your weakest subject, then take Practice Test 2, which is held out of the drills, to see if you are ready.",
  },
  {
    q: "Is the TigerTest GED practice test free?",
    a: "Yes, all of it: both full practice tests, all six drills, the basics lessons and every explanation, with no account required. An account saves your progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free GED Practice Test",
      description,
      url: `${siteUrl}/ged-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Two full-length GED practice tests, all four subjects, 90 questions each",
        "Timed sections with a break between subjects, like the real test",
        "Built-in calculator on Math and Science",
        "Percent score per subject and overall",
        "Six mastery drills with the basics taught first",
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
        classFaqJsonLd("ged"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Reading Comprehension", section: "Reasoning Through Language Arts", weight: "75% informational, 25% literature" },
  { name: "Language and Editing", section: "Reasoning Through Language Arts", weight: "Grammar, punctuation, usage" },
  { name: "Quantitative Problem Solving", section: "Mathematical Reasoning", weight: "45%" },
  { name: "Algebraic Problem Solving", section: "Mathematical Reasoning", weight: "55%" },
  { name: "Life, Physical, Earth and Space", section: "Science", weight: "40% / 40% / 20%" },
  { name: "Civics, History, Economics, Geography", section: "Social Studies", weight: "50% / 20% / 15% / 15%" },
];

export default function GedLandingPage() {
  return (
    <div data-theme="ged" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free GED Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ged/dashboard"
            shortName="GED"
            subtitle="All four GED subjects in two full-length timed practice tests, plus six skill drills that teach the basics first. Everything is free, no account needed."
            shots={{ mobile: "/landing/ged-mobile.png", desktop: "/landing/ged-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ged" />

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
                Six drills, one per subject area. The reading, language and math drills open with the basics: a rule card and a couple of one-line questions on fractions, solving for x, commas or finding the main idea before the test-level questions. One tap to check, an explanation right away, and every miss comes back until you have mastered it.
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
                Four timed subject sections with a break between them, a countdown clock, flag for review, a calculator on Math and Science, and the fill-in, dropdown and choose-two question types the real GED uses. Finish with a percent score per subject and a plan for what to drill next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the GED Subject Areas</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test follows the content weights GED Testing Service publishes for the four subjects, and the drills are split the same way, so your results show which subject is holding you back. The essay (RLA extended response) is not modeled.
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
              <Image src={getTigerAsset("ged", 1)} alt="TigerTest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach a GED Class?</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Pass the GED</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Take it one subject at a time</h3>
              <p>
                The GED is four separate tests, and you can book them on different days. Most people pass Social Studies and Science first and save Math for last, because Math takes the most study. Pick the subject you feel best about, get it done, and build from there.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the basics before the test questions</h3>
              <p>
                If it has been a while since school, start with the basics inside each drill. They teach one rule at a time, fractions, percents, solving for x, commas, main idea, with an example and two quick questions, so you are not guessing at test-level problems you were never shown how to do.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the passage, then the question</h3>
              <p>
                Most Science and Social Studies questions can be answered from the reading, table or chart in front of you. The answer is usually in the text; your job is to find it and avoid the choice that sounds right but is not supported. Practice that habit and those two subjects get much easier.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take a full practice test before you book</h3>
              <p>
                Sit Practice Test 1 with the timer on to see where you stand, drill your weakest subject for a week or two, then take Practice Test 2. Its questions never appear in the drills, so it is an honest readiness check. When you are at 65 percent or better in a subject, schedule that test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">GED Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ged" />
        </div>
      </div>

      <ExamRelatedTests examId="ged" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the GED?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two full-length practice tests, six drills and the basics, all four subjects.</p>
          <ExamLandingCTA dashboardHref="/ged/dashboard" />
        </div>
      </div>
    </div>
  );
}

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

const siteUrl = SITE_URL;

const title = "Free OC Test Practice 2026 - Reading, Maths, Thinking Skills";
const metaDescription =
  "Free NSW Opportunity Class (OC) Placement Test practice for Year 4: Reading, Mathematical Reasoning and Thinking Skills, timed like the real computer-based test, with explanations for every question.";
const description =
  "A free practice test for the NSW Opportunity Class Placement Test, sat in Year 4 for a Year 5 OC place: Reading (33 answers in 40 minutes), Mathematical Reasoning (35 questions in 40 minutes, no calculator) and Thinking Skills (30 questions in 30 minutes), with a percent score per section. Two full practice tests, five drills that teach the basics first, and an explanation for every question. Teachers and tutors can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "OC test practice, opportunity class placement test, free OC practice test, OC test Year 4, OC thinking skills practice, OC mathematical reasoning practice, OC reading practice test, NSW OC trial test, OC test 2026",
  alternates: {
    canonical: `${siteUrl}/oc-test-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/oc-test-practice-test`,
    images: [{ url: shareImageUrl("ocnsw"), width: 1200, height: 630, alt: "Tigertest free OC test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ocnsw")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the OC Placement Test?",
    a: "Three multiple-choice tests taken on a computer in one sitting, each worth one third: Reading (14 questions with 33 answers in 40 minutes, because three questions have several parts), Mathematical Reasoning (35 questions in 40 minutes, five options each, no calculator) and Thinking Skills (30 questions in 30 minutes, four options each). There is no writing test. The Tigertest practice test covers all three at full length and runs about 1 hour 50 minutes with short breaks.",
  },
  {
    q: "Who sits the OC test?",
    a: "Year 4 students whose parents or carers have applied for a Year 5 place in an opportunity class. Applications open at the end of Year 3 and the test is held in mid-May of Year 4. Opportunity classes are classes for gifted and high potential students in Years 5 and 6, run in some NSW public primary schools, with online classes through Aurora College for rural and remote students.",
  },
  {
    q: "What score do you need to get into an opportunity class?",
    a: "There is no pass mark. Results are scaled, places are offered in order of merit, and each school's minimum entry score changes from year to year with demand. Tigertest reports percent correct per section and an overall average, so treat it as a readiness check: aim for 75 percent or better across all three sections, and higher for the most competitive schools.",
  },
  {
    q: "What kinds of questions are in the Reading test?",
    a: "Texts include story extracts, poems, articles and reports. Some questions are single multiple-choice questions about one text. Others have several parts: choosing which removed sentence fits each gap in a text, matching statements to one of four short extracts, and comparing two texts on the same theme. The Tigertest Reading section has all of these, one answer per item.",
  },
  {
    q: "What is Thinking Skills?",
    a: "Thinking Skills tests reasoning rather than anything learned in class. Critical thinking questions ask which statement makes an argument stronger or weaker, what mistake someone has made, what must be true, and whose reasoning is correct. Problem-solving questions are puzzles: ordering clues, codes, time and calendar problems, counting and number puzzles. Tigertest's version is all text; the real test also includes some shape and pattern puzzles.",
  },
  {
    q: "How should my child prepare for the OC test?",
    a: "Start with the drills on a tablet or phone: each opens with short lessons on the basics (fractions, area, units, main idea, finding the evidence) before the test-level questions, and every miss comes back until it is right. Sit Practice Test 1 with the timer on, drill the weakest section for a few weeks, then sit Practice Test 2, which is held out of the drills so it gives an honest score. Short, regular sessions work better than long ones for nine-year-olds.",
  },
  {
    q: "Is the Tigertest OC test practice free?",
    a: "Yes, all of it: both full practice tests, all five drills, the basics lessons and every explanation, with no account required. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free OC Test Practice",
      description,
      url: `${siteUrl}/oc-test-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "Two full practice tests: Reading, Mathematical Reasoning and Thinking Skills, 98 questions each",
        "Timed sections like the real computer-based OC test",
        "Sentences-removed, extract matching and text comparison reading sets",
        "Five options on maths and four on thinking skills, as on the real test",
        "Five mastery drills with the basics taught first",
        "Practice Test 2 held out of the drills for a clean score",
        "Explanations for every question, written for Year 4 readers",
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
        classFaqJsonLd("ocnsw"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Stories, poems and articles", section: "Reading", weight: "11 per test" },
  { name: "Sentences removed from a text", section: "Reading", weight: "6 per test" },
  { name: "Comparing extracts and texts", section: "Reading", weight: "16 per test" },
  { name: "Number and patterns", section: "Mathematical Reasoning", weight: "18 per test" },
  { name: "Measurement, space and data", section: "Mathematical Reasoning", weight: "17 per test" },
  { name: "Critical thinking", section: "Thinking Skills", weight: "15 per test" },
  { name: "Problem solving", section: "Thinking Skills", weight: "15 per test" },
];

export default function OcTestLandingPage() {
  return (
    <div data-theme="ocnsw" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free OC Test Practice
          </h1>
          <ExamLandingHero
            dashboardHref="/oc-test/dashboard"
            shortName="OC Test"
            subtitle="Reading, Mathematical Reasoning and Thinking Skills in two full timed practice tests, plus five drills that teach the basics first. Everything is free, no account needed."
            shots={{ mobile: "/landing/ocnsw-mobile.png", desktop: "/landing/ocnsw-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ocnsw" />

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
                Five drills: reading, number and patterns, measurement and data, critical thinking and problem solving. Most open with the basics, a short lesson and two quick questions on ideas like fractions, area or finding the evidence, before the test-level questions. One tap to check, an explanation straight away, and every miss comes back until it is mastered.
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
                The real test is sat on a computer, so the practice test is too: three timed sections with short breaks, a countdown clock, flag for review, passages beside the questions, and no calculator. Finish with a percent score per section and a list of what to drill next.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Built on the Real Test Format</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test follows the NSW Department of Education&apos;s published format for the OC test: the same number of answers and the same time in each section, five options in maths and four in thinking skills. The drills are split the same way, so results show which part is holding a student back. Questions are written for Year 4 readers.
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
              <Image src={getTigerAsset("ocnsw", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Run an OC Test Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Year 4 teachers and tutors can set it for a class for free: post one link, students join with just their name, and you see who practised, their section scores and the questions your class misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for the OC Test</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Work on pace, not just accuracy</h3>
              <p>
                Thinking Skills gives one minute a question and Maths a little more. Bright students lose marks by spending five minutes on one puzzle. Practise moving on, flagging the hard one and coming back with the time left at the end.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the argument questions</h3>
              <p>
                Critical thinking questions look new at first but follow a few patterns: what strengthens or weakens a claim, what was assumed, what must be true. Once a student can name the pattern, these become some of the most reliable marks on the paper.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read for the clue in multi-part sets</h3>
              <p>
                In a sentences-removed text, the right sentence links to the words on either side of the gap: a pronoun, a connective, a question answered in the next line. In the extract sets, find the words in the extract that prove the match. Guessing from the general topic is how marks slip away.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Sit a full practice test before test day</h3>
              <p>
                Sit Practice Test 1 with the timer on to see where you stand, drill the weakest section, then sit Practice Test 2. Its questions never appear in the drills, so it is an honest readiness check.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">OC Test Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ocnsw" />
        </div>
      </div>

      <ExamRelatedTests examId="ocnsw" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Test Day?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two full practice tests, five drills and the basics, Reading, Maths and Thinking Skills.</p>
          <ExamLandingCTA dashboardHref="/oc-test/dashboard" />
        </div>
      </div>
    </div>
  );
}

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Victorian Selective Entry Exam Practice - Year 9 Entry Test";
const metaDescription =
  "Free practice for the Victorian Selective Entry High Schools exam: Mathematics and Quantitative Reasoning, Reading and Verbal Reasoning, timed like the real Year 9 entry exam, with explanations for every question.";
const description =
  "A free practice test for the Victorian Selective Entry High Schools exam, sat in Year 8 for Year 9 entry to Nossal, Suzanne Cory, Mac.Robertson Girls' and Melbourne High: Mathematics and Quantitative Reasoning (60 minutes) and Reading and Verbal Reasoning (55 minutes), no calculator, with a percent score per section. Two full practice tests, four drills that teach the basics first, and an explanation for every question. Teachers and tutors can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "Victorian selective entry practice test, selective entry exam practice, Victoria selective school test, Year 9 selective entry exam, Nossal practice test, Melbourne High entrance exam, Mac.Robertson Girls' High entrance exam, Suzanne Cory practice test, quantitative reasoning practice, verbal reasoning practice, free selective entry practice",
  alternates: {
    canonical: `${siteUrl}/victorian-selective-entry-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/victorian-selective-entry-practice-test`,
    images: [{ url: shareImageUrl("vicsel"), width: 1200, height: 630, alt: "Tigertest free Victorian Selective Entry exam practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("vicsel")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Victorian Selective Entry exam?",
    a: "The exam is sat on paper in June of Year 8, in three parts: Mathematics and Quantitative Reasoning (60 minutes, multiple choice), a 20-minute break, Reading and Verbal Reasoning (55 minutes, multiple choice), a short break, and Writing (two tasks in 40 minutes). Calculators are not allowed, and no section needs knowledge beyond the Year 8 curriculum. The Tigertest practice test covers both multiple-choice sections at the real times.",
  },
  {
    q: "How many questions are on the exam?",
    a: "The number of questions is not published, and the exam is designed so that not everyone finishes. Each Tigertest practice test has 40 questions per section, 20 for each strand, which keeps the pace realistic: about a minute and a half per question in Mathematics and Quantitative Reasoning and a little under that in Reading and Verbal Reasoning.",
  },
  {
    q: "What score do you need to get into a selective entry school?",
    a: "There is no pass mark. Standard merit places, about 85 percent of the roughly 1,000 Year 9 places across the four schools, are offered in rank order of exam performance, and the score needed changes from year to year. Tigertest reports percent correct per section and an overall average, so treat it as a readiness check: aim for 75 percent or better in both sections.",
  },
  {
    q: "What are Quantitative Reasoning and Verbal Reasoning?",
    a: "They test thinking rather than school content. Quantitative Reasoning is thinking with numbers and patterns: number series, number machines, rules in a table, balances, ages and counting puzzles. Verbal Reasoning is thinking with words and logic: analogies, word meanings and opposites, odd one out, letter series and codes, and short deductions about what must be true. Tigertest's versions are all text; the real exam may also include shape puzzles.",
  },
  {
    q: "Is the Writing section included?",
    a: "No. The two writing tasks are marked by people, which a practice test cannot score fairly. Practise them separately with timed pieces of about 20 minutes each, and ask a teacher or tutor to mark them for ideas, structure, and precise, accurate language.",
  },
  {
    q: "How should my child prepare for the selective entry exam?",
    a: "Start with the drills on a phone: each opens with short lessons on the basics (negative numbers, fractions, ratio, area, main idea, finding the evidence, word meanings) before the exam-level questions, and every miss comes back until it is right. Sit Practice Test 1 with the timer on, drill the weakest strand for a few weeks, then sit Practice Test 2, which is held out of the drills so it gives an honest score.",
  },
  {
    q: "Is the Tigertest selective entry practice free?",
    a: "Yes, all of it: both full practice tests, all four drills, the basics lessons and every explanation, with no account required. An account saves progress across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Victorian Selective Entry Exam Practice",
      description,
      url: `${siteUrl}/victorian-selective-entry-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "Two full practice tests: Mathematics and Quantitative Reasoning, Reading and Verbal Reasoning, 80 questions each",
        "Timed sections at the real exam's 60 and 55 minutes, no calculator",
        "Reading texts shown beside their questions",
        "Four mastery drills with the basics taught first",
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
        classFaqJsonLd("vicsel"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Mathematics", section: "Mathematics and Quantitative Reasoning", weight: "20 per test" },
  { name: "Quantitative Reasoning", section: "Mathematics and Quantitative Reasoning", weight: "20 per test" },
  { name: "Reading", section: "Reading and Verbal Reasoning", weight: "20 per test" },
  { name: "Verbal Reasoning", section: "Reading and Verbal Reasoning", weight: "20 per test" },
];

export default function VicSelectiveLandingPage() {
  return (
    <div data-theme="vicsel" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Victorian Selective Entry Practice
          </h1>
          <ExamLandingHero
            dashboardHref="/victorian-selective/dashboard"
            shortName="Vic Selective"
            subtitle="Mathematics, Quantitative Reasoning, Reading and Verbal Reasoning in two full timed practice tests, plus four drills that teach the basics first. Everything is free, no account needed."
            shots={{ mobile: "/landing/vicsel-mobile.png", desktop: "/landing/vicsel-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="vicsel" />

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
                Four drills: mathematics, quantitative reasoning, reading and verbal reasoning. Each opens with the basics, a short lesson and two quick questions on ideas like negative numbers, ratio or finding the evidence, before the exam-level questions. One tap to check, an explanation straight away, and every miss comes back until it is mastered.
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
                Two timed sections with the real exam&apos;s break between them, a countdown clock, flag for review, reading texts beside the questions, and no calculator. Finish with a percent score per section and a list of what to drill next.
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
                Each practice test follows the published structure of the Victorian Selective Entry exam: the same two multiple-choice sections in the same order, with the same times, and nothing beyond the Year 8 curriculum. The drills are split by strand, so results show which part is holding a student back. Writing is not included.
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
              <Image src={getTigerAsset("vicsel", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Run a Selective Entry Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Year 7 and 8 teachers and tutors can set it for a class for free: post one link, students join with just their name, and you see who practised, their section scores and the questions your class misses most.
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Prepare for the Selective Entry Exam</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Practise pace, not just accuracy</h3>
              <p>
                The exam is built so that not everyone finishes. Strong students lose marks by spending five minutes on one puzzle. Practise moving on, flagging the hard one and coming back with the time left at the end.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the reasoning patterns</h3>
              <p>
                Quantitative and verbal reasoning questions look new at first but follow a few patterns: growing gaps in a series, working a number machine backwards, the link in an analogy, what must be true. Once a student can name the pattern, these become reliable marks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do the maths without a calculator</h3>
              <p>
                Calculators are not allowed, so fractions, percentages, negative numbers and order of operations need to be quick and sure. A few minutes of mental arithmetic most days pays off across the whole first section.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Sit a full practice test before exam day</h3>
              <p>
                Sit Practice Test 1 with the timer on to see where you stand, drill the weakest strand, then sit Practice Test 2. Its questions never appear in the drills, so it is an honest readiness check.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">Selective Entry Exam Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="vicsel" />
        </div>
      </div>

      <ExamRelatedTests examId="vicsel" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Exam Day?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account required. Two full practice tests, four drills and the basics, from mathematics to verbal reasoning.</p>
          <ExamLandingCTA dashboardHref="/victorian-selective/dashboard" />
        </div>
      </div>
    </div>
  );
}

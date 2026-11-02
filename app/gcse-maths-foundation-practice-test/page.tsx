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

const title = "Free GCSE Maths Foundation Practice Papers - Non-Calculator and Calculator";
const metaDescription =
  "Free GCSE Maths Foundation practice: two full sets of practice papers (Paper 1 non-calculator, Papers 2 and 3 calculator), five topic drills with the basics taught first, and a worked explanation for every answer.";
const description =
  "Free GCSE Maths Foundation tier practice for students in England. Each practice test is three timed papers like the real exam, Paper 1 without a calculator and Papers 2 and 3 with one, weighted like the Foundation tier across number, algebra, ratio and proportion, geometry and measures, and probability and statistics. Five drills, one per topic, start with short click-through lessons on the basics (fractions, BIDMAS, solving equations, percentages, Pythagoras) and bring every miss back until it is mastered. Free, with no account needed, and teachers can set it for a class.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "GCSE maths practice paper, GCSE maths foundation practice, GCSE maths foundation paper, GCSE maths non calculator practice, GCSE maths calculator paper practice, GCSE maths revision, GCSE maths resit, foundation tier maths, grade 4 maths, grade 5 maths, AQA Edexcel OCR maths foundation",
  alternates: {
    canonical: `${siteUrl}/gcse-maths-foundation-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/gcse-maths-foundation-practice-test`,
    images: [{ url: shareImageUrl("gcsemaths"), width: 1200, height: 630, alt: "Tigertest free GCSE Maths Foundation practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("gcsemaths")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the GCSE Maths Foundation exam?",
    a: "Three papers of 1 hour 30 minutes, each worth 80 marks: Paper 1 is non-calculator, and Papers 2 and 3 allow a calculator. Every paper can test any topic. At Foundation tier about 25% of the marks are number, 20% algebra, 25% ratio, proportion and rates of change, 15% geometry and measures, and 15% probability and statistics. AQA, Pearson Edexcel and OCR all follow the same Department for Education subject content.",
  },
  {
    q: "What grades can you get on the Foundation tier?",
    a: "Grades 1 to 5. A grade 4 is a standard pass and a grade 5 a strong pass, and grade 5 is the highest grade available on Foundation. Grade boundaries are set after each exam and change by board and year; in recent years a grade 4 on Foundation has needed roughly 60% to 67% of the marks and a grade 5 roughly 73% to 78%.",
  },
  {
    q: "How is the Tigertest practice test marked?",
    a: "Each practice test is the three papers cut to 20 questions each, with the same topic weighting as the real Foundation tier. Every question has one final answer you type or tap, and it is marked right or wrong straight away with a worked explanation. The real papers give marks for working, so a question worth several marks there is one answer here. Your score is a percentage per paper and overall; aim for about 65% for a grade 4 and 75% for a grade 5.",
  },
  {
    q: "Can I use a calculator?",
    a: "Not on Paper 1, just like the real exam, so it trains the written methods for fractions, decimals and percentages. Papers 2 and 3 have a calculator in the tools drawer, or use your own. The drills have no built-in calculator and most of their numbers are friendly, but keep your own calculator handy for the few calculator-paper questions in them.",
  },
  {
    q: "I need to resit GCSE Maths. Will this help?",
    a: "Yes. Most resit students sit the Foundation tier and need a grade 4. Start with the drill for your weakest topic: each one opens with short lessons on the basics it needs, like fractions, BIDMAS or percentage change, before the exam-style questions. Then take Practice Test 1 to see where you stand, and Practice Test 2, which never appears in the drills, as an honest check before the real papers.",
  },
  {
    q: "Is it free?",
    a: "Yes, all of it: both practice tests, all five drills, every lesson and every explanation, with no account needed. An account saves your progress across devices, so you can practise on your phone on the bus and on a laptop at home.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free GCSE Maths Foundation Practice",
      description,
      url: `${siteUrl}/gcse-maths-foundation-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "Two practice tests, each three papers: non-calculator, calculator, calculator",
        "Weighted like the Foundation tier across all five topic areas",
        "Timed papers with a calculator on Papers 2 and 3",
        "Five topic drills with the basics taught first",
        "Practice Test 2 held out of the drills for an honest score",
        "A worked explanation for every answer",
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
        classFaqJsonLd("gcsemaths"),
      ],
    },
  ],
};

const topics = [
  { name: "Number", detail: "Fractions, BIDMAS, primes, powers, standard form, rounding", weight: "25%" },
  { name: "Algebra", detail: "Expanding, factorising, equations, sequences, graphs", weight: "20%" },
  { name: "Ratio, proportion and rates", detail: "Percentages, interest, best buys, speed, proportion", weight: "25%" },
  { name: "Geometry and measures", detail: "Angles, area, volume, Pythagoras, SOH CAH TOA", weight: "15%" },
  { name: "Probability and statistics", detail: "Averages, charts, two-way tables, Venn diagrams", weight: "15%" },
];

export default function GcseMathsLandingPage() {
  return (
    <div data-theme="gcsemaths" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free GCSE Maths Foundation Practice
          </h1>
          <ExamLandingHero
            dashboardHref="/gcse-maths/dashboard"
            shortName="GCSE Maths"
            subtitle="Two full sets of Foundation practice papers, non-calculator and calculator, plus five topic drills that teach the basics first. Free, no account needed."
            shots={{ mobile: "/landing/gcsemaths-mobile.png", desktop: "/landing/gcsemaths-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="gcsemaths" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Topic Drills on Your Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five drills, one per topic area. Each opens with short lessons you tap through, like adding fractions or finding a percentage change, then 20 exam-style questions from easy to hard. One tap to check, a worked explanation straight away, and every miss comes back until you have mastered it.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Papers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Three timed papers per practice test, easiest questions first like the real thing: Paper 1 with no calculator, Papers 2 and 3 with one. Flag questions to come back to, then get a score for each paper, your weakest topics and a plan for what to drill next.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Weighted Like the Foundation Tier</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every practice paper follows the Department for Education subject content and the Foundation tier topic weightings that AQA, Pearson Edexcel and OCR all use, so the topics you practise most are the ones worth the most marks.
              </p>
              <div className="space-y-3">
                {topics.map((t) => (
                  <div key={t.name} className="flex items-center justify-between gap-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span>
                      <span className="block font-medium text-gray-900 dark:text-gray-50">{t.name}</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">{t.detail}</span>
                    </span>
                    <span className="text-brand-dark font-semibold text-right text-sm md:text-base">{t.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image src={getTigerAsset("gcsemaths", 1)} alt="Tigertest mascot" width={180} height={180} className="w-32 md:w-44" />
            </div>
          </div>
        </div>
      </div>

      {/* Teachers */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Teach a GCSE Maths Class?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Set it as homework or resit practice for free: share one link, students join with just their name, and you see who practised, their paper scores and the topics your class finds hardest.
          </p>
          <Link
            href="/teach"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Make a class at tigertest.io/teach
          </Link>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">How to Get a Grade 4 or 5</h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Secure the early marks</h3>
              <p>
                Foundation papers start easy and get harder. The first half of each paper is where most grade 4 marks are, so fix slips on negative numbers, fractions, percentages and basic angles before chasing the hard questions at the end.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise without a calculator</h3>
              <p>
                A third of the marks are on the non-calculator paper. Written methods for multiplying decimals, dividing fractions and finding 15% of an amount win marks there, and the Number and Algebra drills are built around them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the basics the drills open with</h3>
              <p>
                If a drill feels hard, go back to its lessons. Each one teaches one method, step by step, and asks you to supply each step, so you can do it on your own in the exam rather than just recognise it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Show your working in the real exam</h3>
              <p>
                The real papers give method marks even when the final answer is wrong. Tigertest only checks the final answer, so on the day write every step down: it can turn a wrong answer into two or three marks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">GCSE Maths Foundation Questions</h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="gcsemaths" />
        </div>
      </div>

      <ExamRelatedTests examId="gcsemaths" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free. No account needed. Start with the drill for your weakest topic.</p>
          <ExamLandingCTA dashboardHref="/gcse-maths/dashboard" />
        </div>
      </div>
    </div>
  );
}

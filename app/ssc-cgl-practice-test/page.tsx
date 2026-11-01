import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free SSC CGL Mock Test 2026 - Tier 1 Practice";
const metaDescription =
  "Free SSC CGL Tier 1 mock tests: 232 original questions on reasoning, general awareness, quantitative aptitude and English, with two full 100-question, 60-minute tests and an explanation on every answer.";
const description =
  "Free SSC CGL Tier 1 practice with 232 original questions written to the Staff Selection Commission syllabus: General Intelligence and Reasoning, General Awareness, Quantitative Aptitude and English Comprehension, 25 questions each per mock test. Two full mock tests of 100 questions in 60 minutes, eight topic drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the SSC CGL Tier 1 exam pattern?",
    a: "Tier 1 is one computer-based paper of 100 multiple-choice questions in 60 minutes (80 minutes for candidates eligible for a scribe). It has four parts of 25 questions each: General Intelligence and Reasoning, General Awareness, Quantitative Aptitude and English Comprehension. Each question carries 2 marks, so the paper is out of 200, and there is no sectional time limit.",
  },
  {
    q: "Is there negative marking in SSC CGL Tier 1?",
    a: "Yes. Each wrong answer costs 0.50 marks, a quarter of the 2 marks a right answer earns, and an unanswered question scores zero. With four options a blind guess gains only 0.125 marks on average and often costs 0.50, so guess only when you can rule out at least one option, and answer freely when you know it. Tigertest mock tests score percent correct and do not deduct marks, so compare your score with how many questions you would have attempted.",
  },
  {
    q: "What is a good score in SSC CGL Tier 1?",
    a: "There is no fixed pass mark. The Staff Selection Commission sets cut-offs each year by post and category, and they change with the number of vacancies and the difficulty of the paper. Tier 1 only qualifies you for Tier 2, where the final merit is decided. On Tigertest, aim for 75 percent or more on both mock tests with few wrong answers before you sit the exam.",
  },
  {
    q: "Are these the same questions as the real SSC CGL exam?",
    a: "No. These are original practice questions written to the official SSC CGL syllabus and pattern, not questions copied from past papers or the real exam. The general awareness questions cover static topics such as the Constitution, history, geography, economy and science; current affairs change every year, so study them separately from a recent source.",
  },
  {
    q: "Is the Tigertest SSC CGL mock test free?",
    a: "Yes. Both mock tests and all eight topic drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SSC CGL mock test, SSC CGL Tier 1 mock test free, SSC CGL practice test, SSC CGL 2026, SSC CGL previous year pattern, SSC CGL reasoning questions, SSC CGL GK questions, SSC CGL quant practice, SSC CGL English practice, SSC CGL online test",
  alternates: {
    canonical: `${siteUrl}/ssc-cgl-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ssc-cgl-practice-test`,
    images: [{ url: shareImageUrl("ssccgl"), width: 1200, height: 630, alt: "Tigertest free SSC CGL mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ssccgl")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SSC CGL Mock Test",
      description,
      url: `${siteUrl}/ssc-cgl-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "232 original SSC CGL Tier 1 practice questions with explanations",
        "2 full mock tests of 100 questions in 60 minutes, in the Tier 1 order",
        "8 topic drills across reasoning, general awareness, quantitative aptitude and English",
        "Cloze and reading comprehension passages",
        "Negative marking explained, with percent-correct scoring",
        "Auto-save progress",
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
        classFaqJsonLd("ssccgl"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General Intelligence and Reasoning", weight: "25 Qs, 50 marks" },
  { name: "General Awareness", weight: "25 Qs, 50 marks" },
  { name: "Quantitative Aptitude", weight: "25 Qs, 50 marks" },
  { name: "English Comprehension", weight: "25 Qs, 50 marks" },
];

export default function SscCglLandingPage() {
  return (
    <div data-theme="ssccgl" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SSC CGL Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ssc-cgl/dashboard"
            shortName="SSC CGL"
            subtitle="232 original Tier 1 questions on reasoning, GK, quant and English. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ssccgl-mobile.png", desktop: "/landing/ssccgl-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ssccgl" />

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand-dark" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Topic Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills, two for each part of Tier 1: analogy and coding, relations and logic, polity and history, geography and science, arithmetic, advanced maths, grammar, and vocabulary with reading. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two mock tests of 100 questions in 60 minutes, in the real paper&apos;s order, with a cloze passage and a reading passage in English. Move freely and flag questions, as in the exam. Mock Test 2 is held out of the drills, so it measures readiness.
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the Tier 1 Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test follows the Staff Selection Commission&apos;s Tier 1 pattern: four parts of 25 questions, 2 marks each, 200 marks in 60 minutes. The real exam takes 0.50 marks off for every wrong answer, so a wrong guess costs a quarter of a right answer. Tigertest scores percent correct; to see your exam-style score, take twice your correct answers and subtract half your wrong ones.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("ssccgl", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make Tigertest Better</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Have an idea, a topic you&apos;d like covered, or a question that could be clearer? We read every message and use it to improve every test.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Share Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            How to Prepare for SSC CGL Tier 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Plan your 60 minutes</h3>
              <p>
                With 100 questions in an hour you have 36 seconds a question. Many candidates take General Awareness first because it is quick recall, then English, then reasoning, and leave the longest quantitative questions for last. Whatever order you choose, practise it in full mock tests so it is automatic on the day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Respect the negative marking</h3>
              <p>
                A wrong answer costs 0.50 marks. A blind guess among four gains only 0.125 marks on average and is a gamble; once you can rule out one or two options, the guess is clearly worth taking. Accuracy matters more than the number of questions attempted.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the shortcuts in quant and reasoning</h3>
              <p>
                Percent change, successive discounts, the 2xy/(x + y) average speed, the x + 1/x identities, standard trigonometric values and the clock angle formula all come up again and again. Tigertest&apos;s explanations show the quick method, so drill a topic until it is fast as well as right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Build static GK, then add current affairs</h3>
              <p>
                The Constitution, history, geography, economy and everyday science are asked every year and do not go out of date. Master them here, then add the last twelve months of current affairs from a recent source, since these change with each exam cycle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SSC CGL Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ssccgl" />
        </div>
      </div>

      <ExamRelatedTests examId="ssccgl" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for SSC CGL Tier 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 232 questions across all four parts.</p>
          <ExamLandingCTA dashboardHref="/ssc-cgl/dashboard" />
        </div>
      </div>
    </div>
  );
}

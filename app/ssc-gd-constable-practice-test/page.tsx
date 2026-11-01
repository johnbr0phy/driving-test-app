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

const title = "Free SSC GD Constable Mock Test 2026 - CBE Practice";
const metaDescription =
  "Free SSC GD Constable mock tests: 208 original questions on reasoning, general knowledge, elementary mathematics and English, with two full 80-question, 60-minute tests and an explanation on every answer.";
const description =
  "Free SSC GD Constable practice with 208 original questions written to the Staff Selection Commission CBE syllabus: General Intelligence and Reasoning, General Knowledge and General Awareness, Elementary Mathematics and English, 20 questions each per mock test. Two full mock tests of 80 questions in 60 minutes, eight topic drills, and a worked explanation on every answer.";

const faqs = [
  {
    q: "What is the SSC GD Constable exam pattern?",
    a: "The Computer Based Examination (CBE) has 80 multiple-choice questions in 60 minutes, in four parts of 20: General Intelligence and Reasoning, General Knowledge and General Awareness, Elementary Mathematics, and English or Hindi. Each question carries 2 marks, so the paper is out of 160, and there is no sectional time limit. The questions are at matriculation (Class 10) level. Candidates who qualify then take the Physical Efficiency Test and Physical Standard Test, a medical examination and document verification.",
  },
  {
    q: "Is there negative marking in the SSC GD exam?",
    a: "Yes. Each wrong answer costs 0.25 marks, an eighth of the 2 marks a right answer earns, and an unanswered question scores zero. With four options a blind guess still gains about 0.31 marks on average, so it usually pays to answer a question once you can rule out even one option. Tigertest mock tests score percent correct and do not deduct marks, so keep count of the questions you guessed.",
  },
  {
    q: "What are the minimum qualifying marks in the SSC GD CBE?",
    a: "The 2026 notice sets the minimum qualifying marks at 30 percent for UR candidates, 25 percent for OBC and EWS candidates and 20 percent for all other categories, such as SC, ST and ex-servicemen, before any NCC bonus marks. These marks only make a candidate eligible: the Commission then shortlists about eight times the number of vacancies for the PET and PST, state-wise, area-wise and category-wise on merit, so the real cut-offs are usually much higher. On Tigertest, aim for 70 percent or more on both mock tests with few wrong answers.",
  },
  {
    q: "Are these the same questions as the real SSC GD exam?",
    a: "No. These are original practice questions written to the SSC GD syllabus and pattern, not questions copied from past papers or the real exam. The general knowledge questions cover static topics such as history, the Constitution, geography, science and sports; current affairs change every year, so study them separately from a recent source. Part D is practised in English here. The notice says reasoning questions are mainly non-verbal (figures and patterns); those are not included, so practise them separately.",
  },
  {
    q: "Is the Tigertest SSC GD mock test free?",
    a: "Yes. Both mock tests and all eight topic drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SSC GD mock test, SSC GD Constable mock test free, SSC GD practice set, SSC GD 2026, SSC GD constable exam pattern, SSC GD reasoning questions, SSC GD GK questions, SSC GD maths practice, SSC GD English practice, SSC GD online test",
  alternates: {
    canonical: `${siteUrl}/ssc-gd-constable-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ssc-gd-constable-practice-test`,
    images: [{ url: shareImageUrl("sscgd"), width: 1200, height: 630, alt: "Tigertest free SSC GD Constable mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sscgd")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SSC GD Constable Mock Test",
      description,
      url: `${siteUrl}/ssc-gd-constable-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "208 original SSC GD Constable practice questions with explanations",
        "2 full mock tests of 80 questions in 60 minutes, in the CBE order",
        "8 topic drills across reasoning, general knowledge, elementary mathematics and English",
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
        classFaqJsonLd("sscgd"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Part A: General Intelligence and Reasoning", weight: "20 Qs, 40 marks" },
  { name: "Part B: General Knowledge and General Awareness", weight: "20 Qs, 40 marks" },
  { name: "Part C: Elementary Mathematics", weight: "20 Qs, 40 marks" },
  { name: "Part D: English or Hindi", weight: "20 Qs, 40 marks" },
];

export default function SscGdLandingPage() {
  return (
    <div data-theme="sscgd" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SSC GD Constable Mock Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ssc-gd-constable/dashboard"
            shortName="SSC GD"
            subtitle="208 original CBE questions on reasoning, GK, maths and English. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sscgd-mobile.png", desktop: "/landing/sscgd-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sscgd" />

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
                Eight drills, two for each part of the CBE: analogy and coding, relations and puzzles, history and polity, geography and science, numbers and percentage, profit and mensuration, grammar, and vocabulary with reading. Questions you miss come back until you have mastered them.
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
                Two mock tests of 80 questions in 60 minutes, in the real paper&apos;s order, with a cloze passage and a reading passage in English. Move freely and flag questions, as in the exam. Mock Test 2 is held out of the drills, so it measures readiness.
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
                Built on the CBE Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test follows the Staff Selection Commission&apos;s CBE pattern: four parts of 20 questions, 2 marks each, 160 marks in 60 minutes, at matriculation level. The real exam takes 0.25 marks off for every wrong answer. Tigertest scores percent correct; to see your exam-style score, take twice your correct answers and subtract a quarter of your wrong ones. Part D is practised in English (the Hindi option is not modelled) and reasoning is text only, without the figure questions the notice says make up much of Part A. No calculator is allowed in the real exam, so work the maths here by hand too.
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
                src={getTigerAsset("sscgd", 1)}
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
            How to Prepare for the SSC GD CBE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Plan your 60 minutes</h3>
              <p>
                With 80 questions in an hour you have 45 seconds a question. One common plan is to take General Knowledge first because it is quick recall, then English and reasoning, and leave the longer maths questions for last. Whatever order you choose, practise it in full mock tests so it is automatic on the day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Respect the negative marking</h3>
              <p>
                A wrong answer costs only 0.25 marks against 2 for a right one, so a guess among four options still gains about 0.31 marks on average. Answer every question you can narrow down, but do not rush the ones you know: a careless slip costs you the full 2 marks you should have had.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the shortcuts in maths and reasoning</h3>
              <p>
                BODMAS, HCF and LCM, percent of a number, ratio shares, km/h to m/s (multiply by 5/18), the clock angle and the ranking formula all come up again and again. Tigertest&apos;s explanations show the quick method, so drill a topic until it is fast as well as right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Build static GK, then add current affairs</h3>
              <p>
                History, culture, the Constitution, geography, everyday science and sports are asked every year and do not go out of date. Master them here, then add the last twelve months of current affairs from a recent source, since these change with each exam cycle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SSC GD Constable Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sscgd" />
        </div>
      </div>

      <ExamRelatedTests examId="sscgd" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the SSC GD CBE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 208 questions across all four parts.</p>
          <ExamLandingCTA dashboardHref="/ssc-gd-constable/dashboard" />
        </div>
      </div>
    </div>
  );
}

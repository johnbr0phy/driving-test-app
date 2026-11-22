import "@/lib/v2/banks/iimcat";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
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

const title = "Free CAT Mock Test 2026 - VARC, DILR and QA";
const metaDescription =
  "Start CAT practice for free: 193 original questions in VARC, DILR and QA on the IIM pattern, 40 minutes per section in a fixed order, with typed TITA answers and explanations.";
const description =
  "Start for free: CAT practice with 193 original questions on the IIM Common Admission Test pattern: Verbal Ability and Reading Comprehension, Data Interpretation and Logical Reasoning, and Quantitative Ability, each on its own 40-minute clock in a fixed order. Two full mock tests with reading passages, para-jumbles, DILR sets and quant, typed (TITA) answers, an on-screen calculator and an explanation on every answer.";

const faqs = [
  {
    q: "What is the CAT 2026 exam pattern?",
    a: "CAT 2026 is a 120-minute computer-based test with three sections in a fixed order: Verbal Ability and Reading Comprehension (VARC), Data Interpretation and Logical Reasoning (DILR), and Quantitative Ability (QA). Each section gets exactly 40 minutes, and you cannot switch to another section while answering one. It is held on Sunday, 29 November 2026 in three sessions, convened this year by IIM Indore. The IIMs do not publish the number of questions; Tigertest's mock tests use 24, 20 and 22, which is our model, not an official figure.",
  },
  {
    q: "Is there negative marking in CAT?",
    a: "Yes, for multiple-choice questions only. A correct answer earns 3 marks and a wrong multiple-choice answer loses 1 mark. Non-MCQ questions, where you type the answer (often called TITA, type in the answer), carry the same 3 marks but no penalty for a wrong answer. Skipped questions score nothing either way. Tigertest mock tests show a percent score without deductions, so count your wrong multiple-choice answers yourself to see what the penalty would have cost.",
  },
  {
    q: "Is there a syllabus for CAT?",
    a: "No. The official CAT FAQs say the exam has no defined syllabus and point candidates to the official mock test to learn the pattern. In practice VARC tests reading comprehension and verbal ability such as para-jumbles and summaries, DILR tests reasoning with tables, charts and puzzles, and QA tests arithmetic, algebra, geometry and number system at school level. Tigertest's drills follow those question types.",
  },
  {
    q: "Can I use a calculator in CAT?",
    a: "Only the on-screen calculator. The official FAQs say candidates may not bring a calculator to the test centre, but an on-screen calculator is available throughout the exam. Tigertest's mock tests and drills give you an on-screen calculator in every section too. A scribble pad and pen are given at the centre for rough work.",
  },
  {
    q: "Are these the real CAT questions?",
    a: "No. These are original practice questions written to the CAT pattern, not questions from the IIMs, the official mock test or past papers. They follow the real question types: reading comprehension, para-jumbles, odd sentence out and para summaries; data interpretation and logical reasoning sets; and arithmetic, algebra, geometry and number system. Multiple-choice items have four options. It is free to start, with no account required. Mock Test 1 and the first drills are free; the later drills and mock tests are part of Tigertest Premium, one payment with no subscription.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CAT mock test, CAT mock test free, CAT practice test, CAT 2026 mock test, IIM CAT mock test, CAT exam practice, CAT VARC practice, CAT DILR practice, CAT quant practice, CAT TITA questions, MBA entrance exam practice, common admission test",
  alternates: {
    canonical: `${siteUrl}/cat-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cat-exam-practice-test`,
    images: [{ url: shareImageUrl("iimcat"), width: 1200, height: 630, alt: "Tigertest free CAT mock test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("iimcat")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CAT Mock Test",
      description,
      url: `${siteUrl}/cat-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("iimcat", "INR"),
      featureList: [
        "193 original CAT practice questions with explanations",
        "2 full mock tests of 66 questions with 40-minute sectional timing in the real order",
        "8 drills across VARC, DILR and QA",
        "Reading passages, para-jumbles and odd sentence out with typed answers",
        "Data interpretation and logical reasoning sets of four questions",
        "On-screen calculator, as on the real CAT",
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
        classFaqJsonLd("iimcat"),
      ],
    },
  ],
};

const sections = [
  { name: "Verbal Ability and Reading Comprehension", detail: "24 questions, 40 min" },
  { name: "Data Interpretation and Logical Reasoning", detail: "20 questions, 40 min" },
  { name: "Quantitative Ability", detail: "22 questions, 40 min" },
];

export default function CatLandingPage() {
  return (
    <div data-theme="iimcat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CAT Mock Test
          </h1>
          <ExamLandingHero
            dashboardHref="/iim-cat/dashboard"
            shortName="CAT"
            subtitle="193 CAT questions in VARC, DILR and QA, with 40-minute sectional timing. Free to start, no account needed."
            shots={{ mobile: "/landing/iimcat-mobile.png", desktop: "/landing/iimcat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="iimcat" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Question Type</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills: reading comprehension and verbal ability; data interpretation and logical reasoning; arithmetic, algebra, geometry and number system. Questions you miss come back until you have mastered them.
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
                Two 66-question mock tests in two hours, each section on its own 40-minute clock in the real order with no going back, like the real CAT. Mock Test 2 is held out of the drills, so it measures how ready you are.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Built on the CAT Pattern
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every mock test has the real CAT&apos;s three sections in the real order, with 40 minutes for each and an on-screen calculator. The IIMs do not publish how many questions each section has, so the counts below are Tigertest&apos;s model. Para-jumbles, odd sentence out and many DILR and QA questions are typed answers (TITA), as non-MCQ questions are on the real exam; multiple-choice questions have four options. The real CAT takes a mark off for a wrong multiple-choice answer; Tigertest shows your percent score so you can see where guessing would have cost you.
              </p>
              <div className="space-y-3">
                {sections.map((s) => (
                  <div key={s.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{s.name}</span>
                    <span className="text-brand-dark font-semibold">{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("iimcat", 3)}
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
            How to Prepare for CAT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Plan each 40 minutes</h3>
              <p>
                Time cannot move between sections, so treat each as its own test. In VARC, read every passage once with care rather than skimming twice. In DILR, look at all the sets in the first few minutes and start with the one whose data you understand fastest. In QA, take the questions you can solve in a minute or two first and come back to the long ones.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read for the argument</h3>
              <p>
                Reading comprehension questions ask what the author argues, not what you already believe. Before the questions, say in one line what the passage claims and how each paragraph serves it. Wrong options are often true in general or go further than the passage does; the right one is the one the text supports.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Attempt every typed answer</h3>
              <p>
                A wrong multiple-choice answer costs a mark, but a wrong typed (TITA) answer costs nothing. Skip a multiple-choice question you can only guess at, but always type your best answer to a TITA question, even an estimate. For para-jumbles, find the opening sentence and the pairs linked by a pronoun or a word like &quot;however&quot; before ordering the rest.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Solve a DILR set once, fully</h3>
              <p>
                Each set gives four questions from one piece of data. Spend the time to lay it out completely, a seating diagram, a schedule or a table of totals, and the questions usually take seconds each. Half-solving several sets costs more time than finishing one. Tigertest tracks your accuracy by question type; retake the drill you miss most until it is as solid as your best one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CAT Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="iimcat" />
        </div>
      </div>

      <SampleQuestionsV2 examId="iimcat" />

      <ExamRelatedTests examId="iimcat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the CAT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 193 questions across all three sections. Not affiliated with the Indian Institutes of Management.</p>
          <ExamLandingCTA dashboardHref="/iim-cat/dashboard" />
        </div>
      </div>
    </div>
  );
}

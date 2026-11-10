import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/zasaps";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "SAPS Recruitment Test 2026 - Free Police Trainee Assessment Practice";
const metaDescription =
  "Free SAPS police trainee assessment practice: 200 original literacy, numeracy and reasoning questions, four 50-question mock tests and every answer explained.";
const description =
  "Free practice for the written part of the South African Police Service (SAPS) police trainee recruitment assessment: 200 original questions on English grammar, vocabulary and reading comprehension, numbers, word problems and tables, and verbal and logical reasoning. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "saps recruitment test, saps police trainee assessment, saps psychometric test practice, saps aptitude test questions, police trainee test south africa, saps literacy and numeracy test, saps recruitment 2026, how to pass the saps assessment",
  alternates: {
    canonical: `${siteUrl}/saps-recruitment-test-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/saps-recruitment-test-practice-test`,
    images: [{ url: shareImageUrl("zasaps"), width: 1200, height: 630, alt: "Tigertest free SAPS recruitment practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("zasaps")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the SAPS police trainee assessment?",
    a: "The South African Police Service's 2026/2027 police trainee advertisement says every applicant is subjected to fitness, psychometric and integrity testing, a medical evaluation and an interview. SAPS does not say what the psychometric test contains; guides describe a written assessment of literacy, numeracy and reasoning. Tigertest practises the literacy, numeracy and reasoning part only: English grammar, vocabulary and reading, numbers, word problems and tables, and verbal and logical reasoning.",
  },
  {
    q: "How many questions are on the SAPS test and what is the pass mark?",
    a: "SAPS does not publish a question count, a time limit or a pass mark for the trainee assessment (the 2026/2027 advertisement gives none), and the format can change from one intake to the next. Tigertest's mock tests are 50 questions with a 70% target, so work at a steady pace and aim well above it, because there are far more applicants than posts.",
  },
  {
    q: "What is not covered by this practice test?",
    a: "Tigertest does not model the integrity and psychological assessment, the physical fitness assessment, the interview, the medical or the vetting (background enquiries and fingerprint verification), nor the training at a SAPS Training Academy that follows. Reasoning questions that use shapes or pictures in the real assessment are written here as text patterns (sequences of shapes, folded paper, turning arrows). There are no general knowledge or law questions.",
  },
  {
    q: "Who can apply to be a SAPS police trainee?",
    a: "The 2026/2027 advertisement (reference TRA26/27, closing 13 November 2026) asks for South African citizens aged 18 to 35 at the closing date with a Grade 12 certificate, proficiency in English and one other official language, physical, medical and mental fitness, no criminal convictions or pending cases and no tattoos visible in uniform. Applications are made online through the SAPS e-Recruitment portal. Read the current advertisement on the SAPS website before you apply, and never pay anyone who offers to secure you a post: SAPS says there are no costs to applicants.",
  },
  {
    q: "Are these the real SAPS assessment questions?",
    a: "No. Every question is original, written by Tigertest to practise the same English, numeracy and reasoning skills without copying any real assessment. Tigertest is not affiliated with the South African Police Service, and it does not book, run or replace any part of the recruitment process.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SAPS Recruitment Practice Test",
      description,
      url: `${siteUrl}/saps-recruitment-test-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
      featureList: [
        "200 literacy, numeracy and reasoning questions",
        "4 mock tests of 50 questions",
        "5 training sets by topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "English: Grammar & Spelling", weight: "16%" },
  { name: "Reading Comprehension", weight: "16%" },
  { name: "Numeracy: Numbers & Calculation", weight: "14%" },
  { name: "Numeracy: Word Problems", weight: "14%" },
  { name: "English: Vocabulary & Idioms", weight: "12%" },
  { name: "Verbal Reasoning", weight: "10%" },
  { name: "Logical & Pattern Reasoning", weight: "10%" },
  { name: "Numeracy: Tables & Data", weight: "8%" },
];

export default function SapsRecruitmentLandingPage() {
  return (
    <div data-theme="zasaps" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SAPS Recruitment Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/saps-trainee-assessment/dashboard"
            shortName="SAPS test"
            subtitle="200 original questions for the written part of the police trainee assessment: English, reading, numeracy and reasoning. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/zasaps-mobile.png", desktop: "/landing/zasaps-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="zasaps" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets cover grammar, spelling and vocabulary, reading comprehension, numbers and tables, word problems, and verbal and logical reasoning. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, with a 70% target. No question repeats across tests, and every answer explains the working and the common wrong pick.
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
                Built for the Written Assessment
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                SAPS does not publish a syllabus or a topic split, so the weighting is Tigertest&apos;s own: English and reading carry the most marks, then numeracy, then reasoning. Questions are set in everyday South African situations, with rand, kilometres and the 24-hour clock. The integrity and psychological assessment, fitness test, interview and medical are not modelled, and shape-based reasoning is written as text patterns.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("zasaps", 1)}
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
            How to Prepare for the SAPS Assessment
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read carefully and answer from the text</h3>
              <p>
                Reading questions reward the answer the passage actually supports, not what you think is likely. Police officers write statements and reports every day, so practise spotting the key fact, the time and the person in a short notice or report.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Get quick at numbers without a calculator</h3>
              <p>
                Revise fractions, percentages, ratio, averages, speed, distance and time, and the 24-hour clock. Write down your working: most wrong answers come from one slip, such as dividing by the wrong total.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the reasoning patterns</h3>
              <p>
                Letter and number series, codes, analogies, seating and queue puzzles, directions and if-then statements come up again and again. Once you know the pattern types, each question takes seconds.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Prepare for the other stages too</h3>
              <p>
                The written assessment is only one step. Get fit for the fitness assessment (the 2026/2027 advertisement requires a body mass index of 30 or less and a waist measurement within its limits before you can take it), gather your documents, and answer the integrity and psychological questions honestly: there are no right answers to learn. Aim for 40 or more in every Tigertest mock test before your assessment date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SAPS Recruitment Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamSampleQuestions examId="zasaps" />

      <ExamRelatedTests examId="zasaps" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Join SAPS?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on English, numeracy and reasoning.</p>
          <ExamLandingCTA dashboardHref="/saps-trainee-assessment/dashboard" />
        </div>
      </div>
    </div>
  );
}

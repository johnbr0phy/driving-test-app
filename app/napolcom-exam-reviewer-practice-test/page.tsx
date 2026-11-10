import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/phnapolcom";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "NAPOLCOM Exam Reviewer 2026 - Free PNP Entrance Practice Test";
const metaDescription =
  "Free NAPOLCOM PNP Entrance Exam reviewer: 200 original questions on general information, verbal, quantitative and logical reasoning, four 50-question mock exams and every answer explained.";
const description =
  "Free practice for the NAPOLCOM PNP Entrance Examination (PNPE): 200 original multiple-choice questions on the 1987 Constitution, R.A. 6975 and R.A. 8551, the criminal justice system, values, vocabulary, reading, grammar, percentages, fractions, number series, problem solving, bar graphs and logical reasoning. Four 50-question mock exams and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "napolcom exam reviewer, pnp entrance exam reviewer, napolcom reviewer 2026, pnp entrance examination, napolcom practice test, pnpe reviewer, police entrance exam philippines, napolcom exam questions, patrolman eligibility exam",
  alternates: {
    canonical: `${siteUrl}/napolcom-exam-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/napolcom-exam-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phnapolcom"), width: 1200, height: 630, alt: "Tigertest free NAPOLCOM PNP Entrance Exam reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phnapolcom")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the NAPOLCOM PNP Entrance Examination?",
    a: "The National Police Commission's announcement for the June 2024 exam, the latest one we could read in full, lists four subject areas for the PNP Entrance Examination, all objective multiple choice: General Information and Uprightness (the Philippine Constitution, the PNP laws R.A. 6975 and R.A. 8551, the criminal justice system, social awareness and values), Verbal Reasoning (synonyms, antonyms, paragraph organization, reading comprehension and correct usage), Quantitative Reasoning (percentages, fractions, number series, problem solving and bar graphs) and Logical Reasoning (verbal and non-verbal). Three hours are allotted, and the April 19, 2026 sitting again ran three hours, from 8 to 11 a.m.",
  },
  {
    q: "How many items are on the exam and what is the passing score?",
    a: "NAPOLCOM's June 2024 exam announcement gives no number of items, split between subjects or passing score, and we found none published since. Guides say you need a rating of at least 70% to pass. Tigertest's mock exams are 50 questions each with a 70% target, so aim well above it. The exam is competitive: of the 41,592 people who sat NAPOLCOM's three exams on April 19, 2026, 9,224 passed the PNP Entrance.",
  },
  {
    q: "Who can take the PNP Entrance Exam?",
    a: "NAPOLCOM's announcements open the exam to Filipino citizens with a bachelor's degree who are at least 21 and not more than 30 years old on the day of the exam, and to Patrolmen and Patrolwomen with a temporary appointment who lack the eligibility. Applicants register online, then have their papers processed at a NAPOLCOM regional office. Check the current announcement for dates and requirements, because each exam has its own.",
  },
  {
    q: "What does passing the exam give me?",
    a: "Passers are conferred the police eligibility needed for appointment to the rank of Patrolman or Patrolwoman in the PNP. Eligibility is only the first step: appointment also depends on the PNP's own recruitment process and on the qualifications for appointment in R.A. 8551, as amended.",
  },
  {
    q: "Are these the real NAPOLCOM exam questions?",
    a: "No. Every question is original, written by Tigertest from the 1987 Constitution, R.A. 6975, R.A. 8551 and other Philippine laws, and standard English, mathematics and reasoning, so it practices the same skills without copying any past paper or reviewer. Current events are left out because they go out of date within months. Tigertest is not affiliated with NAPOLCOM or the PNP, and it does not register you for the exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NAPOLCOM Exam Reviewer",
      description,
      url: `${siteUrl}/napolcom-exam-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "200 general information, verbal, quantitative and logical reasoning questions",
        "4 mock exams of 50 questions",
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
  { name: "Quantitative: Percentages, Fractions & Number Series", weight: "14%" },
  { name: "Logical Reasoning", weight: "14%" },
  { name: "Verbal: Vocabulary", weight: "12%" },
  { name: "Quantitative: Problem Solving & Bar Graphs", weight: "12%" },
  { name: "Philippine Constitution & Criminal Justice", weight: "12%" },
  { name: "Verbal: Paragraph Organization & Reading", weight: "10%" },
  { name: "Verbal: Grammar & Correct Usage", weight: "10%" },
  { name: "PNP Laws (R.A. 6975 & R.A. 8551)", weight: "10%" },
  { name: "Values & Social Awareness", weight: "6%" },
];

export default function NapolcomExamLandingPage() {
  return (
    <div data-theme="phnapolcom" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NAPOLCOM Exam Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/napolcom-exam/dashboard"
            shortName="NAPOLCOM exam"
            subtitle="200 original questions for the PNP Entrance Examination: the Constitution, the PNP laws, values, verbal, quantitative and logical reasoning. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phnapolcom-mobile.png", desktop: "/landing/phnapolcom-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phnapolcom" />

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
                Five training sets cover vocabulary and grammar, reading and logical reasoning, quantitative reasoning, the Constitution and criminal justice, and the PNP laws and values. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question mock exams that together cover all 200 questions, with a 70% target. No question repeats across exams, and every answer explains the rule and the common wrong pick.
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
                Built on NAPOLCOM&apos;s Exam Coverage
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every question sits in one of the four areas NAPOLCOM lists for the PNP Entrance Examination. NAPOLCOM does not publish how many items each area gets, so the weighting is Tigertest&apos;s own. Bar graphs are described in words and the non-verbal reasoning (figure series, mirror images, paper folding) is written as text. Current events are not included, because they date within months.
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
                src={getTigerAsset("phnapolcom", 1)}
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
            How to Pass the PNP Entrance Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Practice the math without a calculator</h3>
              <p>
                NAPOLCOM&apos;s 2024 announcement bars calculators from the exam room, so expect the same. Drill percentages, fractions, number series, ratios and word problems by hand until they are quick, and practice reading totals, averages and changes from bar graphs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the Constitution and the PNP laws</h3>
              <p>
                Learn the Bill of Rights in Article III, Article XVI on the one police force, and how R.A. 6975 and R.A. 8551 set up the PNP and NAPOLCOM: who chairs the Commission, what the PLEB and the Internal Affairs Service do, and the powers of mayors over local police.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read every day for the verbal part</h3>
              <p>
                Vocabulary, paragraph organization and reading comprehension reward wide reading. Read a broadsheet each day, note new words, and when you arrange sentences, look for signal words such as first, then, however and as a result.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice against the clock</h3>
              <p>
                Aim for 40 or more in every mock exam. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four mock exams before exam day. Follow the news too, since guides say current events can appear.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NAPOLCOM Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="phnapolcom" />

      <ExamRelatedTests examId="phnapolcom" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Join the PNP?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on the law, verbal, quantitative and logical reasoning.</p>
          <ExamLandingCTA dashboardHref="/napolcom-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}

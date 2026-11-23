import "@/lib/banks/corrections";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Correctional Officer Exam Practice Test 2026 - Free CO Written Test Questions";
const metaDescription =
  "Correctional officer exam practice, free to start: 200 original questions on applying written rules, reading, report writing, reasoning, math and directions, the skills jail and prison written tests check. Four 50-question tests, every answer explained.";
const description =
  "Practice for the correctional officer (correction officer, detention officer) entrance written exam: 200 original multiple-choice questions built on the subject areas in the New York State Department of Civil Service test guide for the Entry-Level Correction Officer Series and the abilities listed in NYC DCAS Notice of Examination 6303 for Correction Officer. Four 50-question practice tests and five training sets: applying written rules, reading comprehension, preparing written material, reasoning and problem sensitivity, and math and spatial orientation.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "correctional officer exam, correctional officer practice test, correction officer exam, corrections officer test, detention officer exam, co written test, jail officer exam, prison guard test, correctional officer test questions, correctional officer exam 2026",
  alternates: {
    canonical: `${siteUrl}/corrections-officer-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/corrections-officer-exam-practice-test`,
    images: [{ url: shareImageUrl("corrections"), width: 1200, height: 630, alt: "Tigertest correctional officer exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("corrections")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Is there one national correctional officer exam?",
    a: "No. Each state, county, city or federal agency sets its own hiring steps, and many start with a multiple-choice written test. New York City's Correction Officer exam, for example, is taken at a computer and needs at least 70% to pass, while New York State's Correction Officer Trainee exam is now an online training and experience questionnaire. Check your agency's own announcement for its format and passing score.",
  },
  {
    q: "What is on a correctional officer written test?",
    a: "Official announcements describe the same core skills. New York State's test guide lists four subject areas: observing and recalling facts, applying written information in a correctional setting, preparing written material, and understanding written material. NYC's notice lists abilities such as deductive and inductive reasoning, information ordering, problem sensitivity, mathematical reasoning, number facility, spatial orientation, visualization, memorization and written comprehension and expression.",
  },
  {
    q: "Do I need to know prison rules or the law?",
    a: "Usually not for the written test. New York State's test guide says the questions that apply written information give you all the rules you need in the question itself. The skill tested is reading a rule carefully and applying it to a situation, which is what every question in this bank's Applying Written Rules set practises.",
  },
  {
    q: "What happens after the written test?",
    a: "Passing usually puts you on an eligible list ranked by score. Agencies then add steps such as a background investigation, medical and psychological exams and a physical ability test, followed by a training academy. Requirements such as minimum age vary: NYC, for example, appoints Correction Officers from age 21.",
  },
  {
    q: "Are these real correctional officer exam questions?",
    a: "No. Every question here is original, written by Tigertest from the subject areas and abilities the official announcements describe, and every rule, roster and floor plan belongs to a fictional facility. The memorization section, where you study a picture and answer from memory, is not modelled. Tigertest is not affiliated with any corrections department or civil service agency.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Correctional Officer Exam Practice Test",
      description,
      url: `${siteUrl}/corrections-officer-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("corrections"),
      featureList: [
        "200 correctional officer exam practice questions",
        "4 practice tests of 50 questions",
        "5 training sets by skill",
        "Instant feedback with explanations",
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
        classFaqJsonLd("corrections"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Applying written rules", weight: "20%" },
  { name: "Reading comprehension", weight: "16%" },
  { name: "Preparing written material", weight: "20%" },
  { name: "Reasoning and problem sensitivity", weight: "20%" },
  { name: "Math and number facility", weight: "12%" },
  { name: "Spatial orientation", weight: "12%" },
];

export default function CorrectionsExamLandingPage() {
  return (
    <div data-theme="corrections" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Correctional Officer Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/corrections-officer-exam/dashboard"
            shortName="Correctional Officer Exam"
            subtitle="200 correctional officer written test questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/corrections-mobile.png", desktop: "/landing/corrections-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="corrections" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Skill</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: applying written rules, reading comprehension, preparing written material, reasoning and problem sensitivity, and math and spatial orientation. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions that mix every skill, with a 70% pass line like NYC&apos;s Correction Officer exam. No question appears in more than one test, and every explanation shows how the answer follows from the rule, passage or numbers given.
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
                Built on Official Exam Announcements
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The skills come from New York State&apos;s test guide for the Entry-Level Correction Officer Series and NYC&apos;s Correction Officer exam notice. Neither publishes topic weights, and every agency writes its own test, so each practice test spreads its 50 questions as below. The memorization section (study a picture, then answer) is not modelled.
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
                src={getTigerAsset("corrections", 3)}
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
            How to Pass Your Correctional Officer Written Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the rule before the situation</h3>
              <p>
                Rule questions give you everything you need. Read the rule word by word, note limits such as times, counts and exceptions, then check each choice against it. Do not answer from what you think a jail would do.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Answer reading questions from the passage only</h3>
              <p>
                Choices that sound sensible but are not in the passage are the usual traps. If the passage does not say something, neither should your answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check every fact in a restatement</h3>
              <p>
                When you pick the best version of a set of notes, check who did what, when and where. One swapped name or time makes a sentence wrong, however smooth it reads.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise counts and directions until they are quick</h3>
              <p>
                Headcounts, totals, times and turns on a floor plan are easy marks once they are automatic. Aim for 70% or better on every practice test here, then check your agency&apos;s own announcement for its format.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Correctional Officer Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="corrections" />
        </div>
      </div>

      <ExamSampleQuestions examId="corrections" />

      <ExamRelatedTests examId="corrections" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Correctional Officer Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on written rules, reading, report writing, reasoning, math and directions.</p>
          <ExamLandingCTA dashboardHref="/corrections-officer-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}

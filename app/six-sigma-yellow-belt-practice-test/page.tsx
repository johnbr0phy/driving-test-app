import "@/lib/banks/cssyb";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Six Sigma Yellow Belt Practice Test 2026 - Free ASQ CSSYB Questions";
const metaDescription =
  "Free ASQ Certified Six Sigma Yellow Belt practice: 200 original questions on the 2022 Body of Knowledge, from DMAIC and lean basics to DPMO, FMEA, PDCA and control charts, with every answer explained.";
const description =
  "Free practice for the ASQ Certified Six Sigma Yellow Belt (CSSYB) exam: 200 original questions written to the five sections of the 2022 Body of Knowledge. Four 50-question practice tests weighted like the real exam, and five training sets covering Six Sigma fundamentals, Define, Measure, Analyze, and Improve and Control, with every calculation shown step by step.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "six sigma yellow belt practice test, cssyb practice exam, asq yellow belt questions, six sigma yellow belt exam 2026, cssyb sample questions, lean six sigma yellow belt test",
  alternates: {
    canonical: `${siteUrl}/six-sigma-yellow-belt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/six-sigma-yellow-belt-practice-test`,
    images: [{ url: shareImageUrl("cssyb"), width: 1200, height: 630, alt: "Tigertest free Six Sigma Yellow Belt practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cssyb")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the ASQ Certified Six Sigma Yellow Belt exam?",
    a: "The CSSYB is ASQ's entry-level Six Sigma certification for people new to process improvement, from front-line staff who join projects to managers who need an overview of DMAIC. Yellow Belts usually support projects led by Green or Black Belts by collecting data, mapping processes and testing ideas. ASQ asks for no education or work experience, and the certification does not need renewing.",
  },
  {
    q: "How many questions are on the CSSYB exam and how long is it?",
    a: "The computer-based exam has 90 multiple-choice questions, 80 scored and 10 unscored, with 2 hours 18 minutes of exam time inside a 2.5-hour appointment. A paper version has 80 questions in 2 hours. It is in English only and open book with bound references, and computer-based exams have an on-screen calculator. ASQ reports a pass as a scaled score of 550 and publishes no raw percentage, so the 70% line here is Tigertest's readiness target.",
  },
  {
    q: "What does the 2022 CSSYB Body of Knowledge cover?",
    a: "Five sections, with ASQ's question counts out of 80: Six Sigma Fundamentals 20, Define Phase 14, Measure Phase 15, Analyze Phase 17, and Improve and Control Phases 14. Each 50-question practice test here keeps that balance: 12 fundamentals, 9 Define, 9 Measure, 11 Analyze and 9 Improve and Control questions.",
  },
  {
    q: "How much math is on the Yellow Belt exam?",
    a: "Less than on the Green Belt. Expect the mean, median, mode, range, variance and standard deviation, the Six Sigma metrics DPU, DPMO and rolled throughput yield, cycle time, the risk priority number in an FMEA and simple cost-benefit sums. Control charts are asked about in concept: what X-bar and R charts show and how they keep a process improved. Every calculation question here shows the working in its explanation.",
  },
  {
    q: "Are these real ASQ exam questions?",
    a: "No. Every question is original, written by Tigertest from the published Body of Knowledge and standard quality practice. Each practice test is 50 questions, a little over half the real exam's 80 scored. It is free to start, not affiliated with or endorsed by ASQ or ASQ Excellence, and it does not replace the reference books you bring into the exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Six Sigma Yellow Belt Practice Test",
      description,
      url: `${siteUrl}/six-sigma-yellow-belt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cssyb"),
      featureList: [
        "200 ASQ Six Sigma Yellow Belt practice questions",
        "4 practice tests of 50 questions weighted like the 2022 Body of Knowledge",
        "5 training sets, one per Body of Knowledge section",
        "Worked calculations in every metrics explanation",
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
  { name: "Six Sigma Fundamentals", weight: "20 questions" },
  { name: "Define Phase", weight: "14 questions" },
  { name: "Measure Phase", weight: "15 questions" },
  { name: "Analyze Phase", weight: "17 questions" },
  { name: "Improve and Control Phases", weight: "14 questions" },
];

export default function SixSigmaYellowBeltLandingPage() {
  return (
    <div data-theme="cssyb" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Six Sigma Yellow Belt Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/six-sigma-yellow-belt/dashboard"
            shortName="Six Sigma Yellow Belt"
            subtitle="200 Six Sigma Yellow Belt (CSSYB) questions and four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cssyb-mobile.png", desktop: "/landing/cssyb-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cssyb" />

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
                Five training sets, one per Body of Knowledge section: Six Sigma fundamentals, Define, Measure, Analyze, and Improve and Control. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions in the Body of Knowledge&apos;s proportions, with a 70% readiness line. No question appears in more than one test, and every calculation is worked out in the explanation.
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
                Built on the 2022 Body of Knowledge
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ASQ sets how many of the 80 scored questions come from each section. Each practice test here keeps about the same balance in 50 questions: 12 fundamentals, 9 Define, 9 Measure, 11 Analyze and 9 Improve and Control.
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
                src={getTigerAsset("cssyb", 3)}
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
            How to Prepare for the Six Sigma Yellow Belt Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the fundamentals section first</h3>
              <p>
                Six Sigma Fundamentals has the most questions: the purpose of Six Sigma and lean, the DMAIC phases, belt roles, team stages, brainstorming and multivoting, and the seven basic quality tools. Know what each tool shows and when a team would reach for it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice the few calculations by hand</h3>
              <p>
                DPU, DPMO, rolled throughput yield, cycle time, mean, median, mode, range and standard deviation, the FMEA risk priority number and simple payback. Work each with the calculator you will use on the day until the steps are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Tie every tool to its DMAIC phase</h3>
              <p>
                SIPOC and the charter belong to Define, data collection plans and gauge R&amp;R to Measure, FMEA, the 5 Whys and corrective action to Analyze, and PDCA, control plans and SOPs to Improve and Control. Many questions ask which tool fits a situation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Bring a reference book you know</h3>
              <p>
                The exam is open book with bound materials only. Tab the pages you need, such as the metric formulas and the 5S and 8D steps, and practice finding them quickly. Use these practice tests to spot the sections you miss most and go back to them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Six Sigma Yellow Belt Frequently Asked Questions
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

      <ExamSampleQuestions examId="cssyb" />

      <ExamRelatedTests examId="cssyb" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practice for the CSSYB Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all five sections of the Body of Knowledge.</p>
          <ExamLandingCTA dashboardHref="/six-sigma-yellow-belt/dashboard" />
        </div>
      </div>
    </div>
  );
}

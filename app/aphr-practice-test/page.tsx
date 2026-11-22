import "@/lib/banks/aphr";
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

const title = "aPHR Practice Test 2026 - Free Associate Professional in Human Resources Questions";
const metaDescription =
  "Free aPHR practice: 200 original questions on HRCI's aPHR exam content outline, four 50-question mock tests weighted like the real exam's five functional areas, every answer explained.";
const description =
  "Free practice for HRCI's Associate Professional in Human Resources (aPHR) exam: 200 original questions written from the aPHR exam content outline. Four 50-question mock tests weighted like the real exam across Talent Acquisition, Learning & Development, Compensation & Benefits, Employee Relations and Compliance & Risk Management, five training sets and US federal employment law as in force in 2026.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "aphr practice test, aphr exam questions, hrci aphr practice exam, associate professional in human resources practice test, aphr certification exam prep 2026, free aphr practice questions, entry level hr certification practice",
  alternates: {
    canonical: `${siteUrl}/aphr-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/aphr-practice-test`,
    images: [{ url: shareImageUrl("aphr"), width: 1200, height: 630, alt: "Tigertest free aPHR practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aphr")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the aPHR exam?",
    a: "The Associate Professional in Human Resources (aPHR) is HRCI's knowledge-based certification for people early in an HR career, managers whose main job is outside HR, and people moving into HR. HRCI requires no HR experience to sit the exam. It is taken on a computer at a Pearson VUE testing center or at home or in the office through OnVUE online proctoring.",
  },
  {
    q: "How many questions are on the aPHR and how is it scored?",
    a: "The aPHR has 65 scored questions plus 25 unscored pretest questions mixed in with them, in 1 hour and 45 minutes of testing time plus 30 minutes for administration. HRCI reports a scaled score, and a scaled score of at least 500 is needed to pass; it does not publish a percentage. Each mock test here has 50 questions, and 70% is Tigertest's practice target, not an HRCI figure.",
  },
  {
    q: "What does the aPHR exam cover?",
    a: "HRCI's aPHR exam content outline has five functional areas: Talent Acquisition (19%), Learning & Development (15%), Compensation & Benefits (17%), Employee Relations (24%) and Compliance & Risk Management (25%). Candidates are expected to know the HR laws and regulations in effect at the time of their exam.",
  },
  {
    q: "How is the aPHR different from the PHR?",
    a: "The aPHR is HRCI's entry-level credential and needs no HR experience, while the PHR requires professional-level HR experience. The aPHR outline focuses on HR operations and foundational knowledge, so the questions here are shorter and more direct than Tigertest's PHR practice.",
  },
  {
    q: "Are these the real aPHR exam questions?",
    a: "No. Every question is original, written by Tigertest from HRCI's published aPHR exam content outline and current US federal employment law. None comes from HRCI's sample questions or any prep course. It is practice that is free to start and is not affiliated with HRCI.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free aPHR Practice Test",
      description,
      url: `${siteUrl}/aphr-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aphr"),
      featureList: [
        "200 aPHR practice questions",
        "4 mock tests of 50 questions weighted like the real exam",
        "5 training sets, one per functional area",
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
        classFaqJsonLd("aphr"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Talent Acquisition", weight: "19%" },
  { name: "Learning & Development", weight: "15%" },
  { name: "Compensation & Benefits", weight: "17%" },
  { name: "Employee Relations", weight: "24%" },
  { name: "Compliance & Risk Management", weight: "25%" },
];

export default function AphrLandingPage() {
  return (
    <div data-theme="aphr" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free aPHR Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/aphr/dashboard"
            shortName="aPHR"
            subtitle="200 aPHR questions and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/aphr-mobile.png", desktop: "/landing/aphr-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aphr" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Functional Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: talent acquisition; learning and development; compensation and benefits; employee relations; and compliance and risk management. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions in the real exam&apos;s proportions, scored against a 70% practice target. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on HRCI&apos;s aPHR Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                HRCI weights the exam across five functional areas, with compliance and employee relations the largest. Each mock test here keeps the same balance: 10 talent acquisition, 7 learning and development, 8 compensation and benefits, 12 employee relations and 13 compliance and risk questions in every 50.
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
                src={getTigerAsset("aphr", 3)}
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
            How to Prepare for the aPHR Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Use the content outline as your checklist</h3>
              <p>
                HRCI&apos;s outline lists the knowledge behind each functional area, with examples from job analysis and ADDIE to 401(k) rules and OSHA. Tick off each item as you study it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Spend the most time on compliance and employee relations</h3>
              <p>
                Together they make up almost half the exam. Learn what each major federal law covers, who it applies to and what it requires, then practice the everyday employee relations steps: discipline, complaints, investigations and engagement.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the vocabulary precisely</h3>
              <p>
                Many questions turn on telling close terms apart: job analysis and job evaluation, an HSA and an FSA, mediation and arbitration, a mission and a vision. Write each pair side by side.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Work the HR metrics by hand</h3>
              <p>
                Expect simple calculations such as cost-per-hire, turnover rate, compa-ratio and training ROI. Write each formula once and work every calculation in the training sets until it is automatic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          aPHR Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aphr" />
        </div>
      </div>

      <ExamSampleQuestions examId="aphr" />

      <ExamRelatedTests examId="aphr" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Your aPHR Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every aPHR functional area.</p>
          <ExamLandingCTA dashboardHref="/aphr/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/nscacpt";
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

const title = "Free NSCA-CPT Practice Test 2026 - Questions with Explanations";
const metaDescription =
  "Free NSCA-CPT practice: 200 original questions on NSCA's July 2025 content outline, four 50-question mock tests weighted like the real exam, every answer explained.";
const description =
  "Practice for the NSCA-Certified Personal Trainer exam, free to start: 200 original questions written from NSCA's detailed content outline (effective July 1, 2025) and public guidelines. Four 50-question mock tests weighted like the real exam and four training sets covering client consultation and assessment, program planning, exercise technique and coaching, and training adaptations, safety and legal issues.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nsca cpt practice test, nsca-cpt practice test, nsca personal trainer exam questions, nsca certified personal trainer exam, national strength and conditioning association exam, nsca cpt 2026",
  alternates: {
    canonical: `${siteUrl}/nsca-cpt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nsca-cpt-practice-test`,
    images: [{ url: shareImageUrl("nscacpt"), width: 1200, height: 630, alt: "Tigertest free NSCA-CPT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nscacpt")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the NSCA-CPT exam?",
    a: "It is the NCCA-accredited certification exam for the NSCA-Certified Personal Trainer credential from the National Strength and Conditioning Association. It checks that an entry-level trainer can assess clients, design safe and effective programs, teach and evaluate exercise technique, and respond to emergencies, referring clients to other professionals when needed.",
  },
  {
    q: "How many questions are on the NSCA-CPT exam and what score do I need?",
    a: "The NSCA-CPT is a 3-hour computer exam with 155 multiple-choice questions: 140 scored and 15 non-scored, with 25 to 35 presented as video or image questions. NSCA reports a scaled score and you need 70 or higher to pass. Each mock test here has 50 questions in the same domain proportions, with a practice pass line of 35 of 50.",
  },
  {
    q: "What does the NSCA-CPT exam cover?",
    a: "Since July 1, 2025 the exam follows a new detailed content outline with four domains: Program Execution (36%, 50 items), Program Planning (29%, 41 items), Client Consultation and Assessment (23%, 32 items) and Safety, Emergency Procedures, and Legal Issues (12%, 17 items).",
  },
  {
    q: "What do I need before I can sit the NSCA-CPT exam?",
    a: "NSCA asks candidates to be at least 18 and to have a high school diploma or equivalent, and to hold a current CPR/AED certification that includes a hands-on skills check. The exam is taken at Pearson VUE test centers. If you fail, you can retake it after 30 days; after three attempts in a row you wait a year.",
  },
  {
    q: "Are these the real NSCA-CPT exam questions?",
    a: "No. NSCA's exam questions are confidential. Every question here is original, written by Tigertest from NSCA's published content outline and public guidelines. Real NSCA-CPT questions have three answer options and some use video; these have four and describe techniques in words. Tigertest is not affiliated with NSCA.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NSCA-CPT Practice Test",
      description,
      url: `${siteUrl}/nsca-cpt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nscacpt"),
      featureList: [
        "200 NSCA-CPT practice questions",
        "4 mock tests of 50 questions weighted like the real exam",
        "4 training sets by domain",
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
  { name: "Program execution", weight: "36%" },
  { name: "Program planning", weight: "29%" },
  { name: "Client consultation and assessment", weight: "23%" },
  { name: "Safety, emergency and legal issues", weight: "12%" },
];

export default function NscaCptLandingPage() {
  return (
    <div data-theme="nscacpt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NSCA-CPT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nsca-cpt/dashboard"
            shortName="NSCA-CPT"
            subtitle="200 questions on NSCA's July 2025 content outline and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/nscacpt-mobile.png", desktop: "/landing/nscacpt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nscacpt" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: client consultation and assessment, program planning, exercise technique and coaching, and training adaptations with safety and legal issues. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions in NSCA&apos;s domain proportions, about a third of the length of the real exam. No question appears in more than one test, and every answer is explained.
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
                Built on NSCA&apos;s Detailed Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NSCA&apos;s July 2025 outline sets how many scored items come from each domain. Each mock test here follows the same weights, so program execution makes up 18 of every 50 questions.
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
                src={getTigerAsset("nscacpt", 3)}
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
            How to Study for the NSCA-CPT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master program design variables</h3>
              <p>
                Know how exercise selection and order, load and repetitions, rest, frequency, tempo and periodization cycles change with the goal. Program planning and execution make up almost two thirds of the scored items.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn to judge technique</h3>
              <p>
                The exam asks you to evaluate free weight, machine, flexibility, body weight, plyometric and cardio technique, including grips, body position and spotting. Picture each lift step by step and know the common faults.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise assessment order and interpretation</h3>
              <p>
                Know which tests come first in a session, what each one measures, and what a result means for the program or for a referral.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know special populations and your scope</h3>
              <p>
                Review how to modify training for conditions from diabetes to pregnancy, when to stop and refer, and the legal and ethical duties of a trainer. Read every explanation you get wrong, not only the answer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NSCA-CPT Frequently Asked Questions
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

      <ExamSampleQuestions examId="nscacpt" />

      <ExamRelatedTests examId="nscacpt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start the NSCA-CPT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of NSCA&apos;s outline.</p>
          <ExamLandingCTA dashboardHref="/nsca-cpt/dashboard" />
        </div>
      </div>
    </div>
  );
}

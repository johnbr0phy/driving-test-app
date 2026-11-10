import "@/lib/banks/aswb";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "ASWB Masters Practice Test 2026 - Free LMSW Exam Questions";
const metaDescription =
  "Free ASWB Masters practice test: 200 original questions on the 2026 content outline, four 50-question mock exams and five training sets, every answer explained.";
const description =
  "Free practice for the ASWB Masters social work licensing exam (the LMSW exam in many states): 200 original questions written from the three-area content outline used since August 2026. Four 50-question mock exams weighted like the real exam, and five training sets covering values and ethics, assessment and planning, and intervention and practice.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "aswb masters practice test, aswb masters exam, lmsw practice test, lmsw exam questions, aswb practice questions, social work licensing exam practice, aswb exam 2026, masters social work exam, aswb mock exam",
  alternates: {
    canonical: `${siteUrl}/aswb-masters-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/aswb-masters-practice-test`,
    images: [{ url: shareImageUrl("aswb"), width: 1200, height: 630, alt: "Tigertest free ASWB Masters practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aswb")],
    title,
    description: metaDescription,
  },
};

const FAQ = [
  {
    q: "What is the ASWB Masters exam?",
    a: "The Masters exam is one of the Social Work Licensing Examinations run by the Association of Social Work Boards (ASWB). Most US states and several Canadian provinces use it for the first license after a master's degree in social work, often called the LMSW or LGSW. Your state or provincial board approves you to take it, and you test on a computer at a Pearson test center.",
  },
  {
    q: "How many questions are on the ASWB Masters exam and how long is it?",
    a: "Since August 3, 2026 the exam has 122 multiple-choice questions in two sections of 61, with four hours to finish. Twelve are unscored pretest questions mixed in with the rest, so 110 count toward your score. Questions have three or four options, and you can flag questions and change answers within a section.",
  },
  {
    q: "What is on the ASWB Masters exam in 2026?",
    a: "The 2026 outline has three content areas: Values and Ethics 35%, Assessment and Planning 33%, and Intervention and Practice 32%. They cover ethics, confidentiality, boundaries, diversity and social justice; human behavior, assessment methods and planning; and intervention methods, evaluation, research and supervision. Each 50-question practice test here keeps that balance.",
  },
  {
    q: "What score do you need to pass the ASWB Masters exam?",
    a: "The result is pass or fail. Your score report shows the number of questions you needed to answer correctly and the number you got right. ASWB adjusts that number slightly for each version of the exam so every version is equally hard, so there is no fixed percentage. The 70 percent line on these practice tests is a readiness target, not the official passing score.",
  },
  {
    q: "Are these the real ASWB exam questions?",
    a: "No. Every question is original, written by Tigertest from the ASWB Masters content outline, the NASW Code of Ethics and standard social work texts, so it tests the same knowledge without copying the exam. Tigertest is not affiliated with ASWB, and this is free practice, not an official ASWB product.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ASWB Masters Practice Test",
      description,
      url: `${siteUrl}/aswb-masters-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aswb"),
      featureList: [
        "200 ASWB Masters practice questions",
        "4 mock exams of 50 questions weighted like the 2026 Masters content outline",
        "5 training sets by content area",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("aswb"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Values & Ethics", weight: "35%" },
  { name: "Assessment & Planning", weight: "33%" },
  { name: "Intervention & Practice", weight: "32%" },
];

export default function AswbLandingPage() {
  return (
    <div data-theme="aswb" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ASWB Masters Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/aswb-masters/dashboard"
            shortName="ASWB Masters"
            subtitle="200 original questions on the 2026 Masters content outline: values and ethics, assessment and planning, intervention and practice. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aswb-mobile.png", desktop: "/landing/aswb-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aswb" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Content Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the outline: ethics and service delivery; diversity and human behavior; assessment methods and planning; intervention methods; and evaluation, research and supervision. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock exams of 50 questions, each weighted like the 110 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the 2026 Masters Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Since August 2026 the Masters exam has three content areas instead of four, and ASWB publishes the share of questions from each. Every mock exam here keeps that balance, scaled to 50 questions: 18 on values and ethics, 16 on assessment and planning, and 16 on intervention and practice. Real exam questions have three or four options; these all have four. MSW faculty and licensure prep instructors can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the class misses most.
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
                src={getTigerAsset("aswb", 1)}
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
            How to Pass the ASWB Masters Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put ethics first</h3>
              <p>
                Values and ethics is now the largest area, more than a third of the exam. Know the NASW Code of Ethics well: informed consent, the limits of confidentiality, boundaries and dual relationships, mandated reporting, documentation, billing and termination.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read for FIRST, NEXT and BEST</h3>
              <p>
                Many questions describe a client and ask what the social worker should do first. Safety comes before everything, then engagement and assessment before intervention. Several options may be good social work; only one fits the moment in the stem.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Keep the client at the center</h3>
              <p>
                Self-determination, cultural humility and a strengths perspective point to the right answer more often than options where the social worker decides for the client, argues or moves straight to referral.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by content area. Aim for 70% or better on every mock exam before you sit the real one. After each test, drill the questions you missed and retrain the weakest area.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ASWB Masters Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aswb" />
        </div>
      </div>

      <ExamSampleQuestions examId="aswb" />

      <ExamRelatedTests examId="aswb" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the ASWB Masters Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every content area of the Masters outline.</p>
          <ExamLandingCTA dashboardHref="/aswb-masters/dashboard" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Tigertest is not affiliated with the Association of Social Work Boards (ASWB). ASWB is a trademark of its owner.
          </p>
        </div>
      </div>
    </div>
  );
}

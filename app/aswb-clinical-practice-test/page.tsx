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

const siteUrl = SITE_URL;

const title = "ASWB Clinical Practice Test 2026 - Free LCSW Exam Questions";
const metaDescription =
  "Free ASWB Clinical practice test: 200 original questions on the 2026 content outline, four 50-question mock exams and five training sets, every answer explained.";
const description =
  "Free practice for the ASWB Clinical social work licensing exam (the LCSW exam in most states): 200 original questions written from the three-area Clinical content outline used since August 2026. Four 50-question mock exams weighted like the real exam, and five training sets covering clinical ethics, DSM-5-TR diagnosis, treatment planning and medications, evidence-based treatment models, crisis work and supervision.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "aswb clinical practice test, aswb clinical exam, lcsw practice test, lcsw exam questions, aswb clinical practice questions, clinical social work licensing exam, aswb clinical exam 2026, lcsw exam prep, aswb clinical mock exam",
  alternates: {
    canonical: `${siteUrl}/aswb-clinical-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/aswb-clinical-practice-test`,
    images: [{ url: shareImageUrl("aswbclin"), width: 1200, height: 630, alt: "Tigertest free ASWB Clinical practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aswbclin")],
    title,
    description: metaDescription,
  },
};

const FAQ = [
  {
    q: "What is the ASWB Clinical exam?",
    a: "The Clinical exam is the Social Work Licensing Examination that the Association of Social Work Boards (ASWB) offers for clinical practice. Most US states and several Canadian provinces use it for the clinical license, often called the LCSW, usually after a master's degree in social work and about two years of supervised clinical experience. Your state or provincial board approves you to take it, and you test on a computer at a Pearson test center.",
  },
  {
    q: "How many questions are on the ASWB Clinical exam and how long is it?",
    a: "Since August 3, 2026 the exam has 122 multiple-choice questions in two sections of 61, with four hours in all. Twelve are unscored pretest questions mixed in with the rest, so 110 count toward your score. Questions have three or four options, and you can flag questions and change answers within a section.",
  },
  {
    q: "What is on the ASWB Clinical exam in 2026?",
    a: "The 2026 Clinical outline has three content areas: Values and Ethics 36%, Assessment and Planning 32%, and Intervention and Practice 32%. They cover ethics, confidentiality, boundaries, diversity and social justice; DSM-5-TR diagnosis, the mental status exam, risk assessment, treatment planning and medications; and evidence-based treatments such as CBT, DBT and motivational interviewing, crisis work, evaluation and supervision. Each 50-question practice test here keeps that balance.",
  },
  {
    q: "What score do you need to pass the ASWB Clinical exam?",
    a: "The result is pass or fail. Your score report shows the number of questions you needed to answer correctly and the number you got right. ASWB adjusts that number slightly for each version of the exam so every version is equally hard, so there is no fixed percentage. The 70 percent line on these practice tests is a readiness target, not the official passing score.",
  },
  {
    q: "Are these the real ASWB exam questions?",
    a: "No. Every question is original, written by Tigertest from the ASWB Clinical content outline, the DSM-5-TR, the NASW Code of Ethics and standard clinical social work texts, so it tests the same knowledge without copying the exam. Tigertest is not affiliated with ASWB, and this is free practice, not an official ASWB product.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ASWB Clinical Practice Test",
      description,
      url: `${siteUrl}/aswb-clinical-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 ASWB Clinical practice questions",
        "4 mock exams of 50 questions weighted like the 2026 Clinical content outline",
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
        classFaqJsonLd("aswbclin"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Values & Ethics", weight: "36%" },
  { name: "Assessment & Planning", weight: "32%" },
  { name: "Intervention & Practice", weight: "32%" },
];

export default function AswbClinicalLandingPage() {
  return (
    <div data-theme="aswbclin" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ASWB Clinical Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/aswb-clinical/dashboard"
            shortName="ASWB Clinical"
            subtitle="200 original questions on the 2026 Clinical content outline: clinical ethics, DSM-5-TR diagnosis, treatment planning and evidence-based interventions. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aswbclin-mobile.png", desktop: "/landing/aswbclin-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aswbclin" />

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
                Five training sets follow the outline: clinical ethics and service delivery; diversity and human behavior; DSM-5-TR diagnosis and treatment planning; evidence-based treatment models; and crisis work, evaluation and supervision. Questions you miss come back until you have mastered them.
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
                Built on the 2026 Clinical Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Since August 2026 the Clinical exam has three content areas instead of four, and ASWB publishes the share of questions from each. Every mock exam here keeps that balance, scaled to 50 questions: 18 on values and ethics, 16 on assessment and planning, and 16 on intervention and practice. Real exam questions have three or four options; these all have four, and case vignettes are written out in text. Clinical supervisors and licensure prep instructors can set Tigertest as practice at{" "}
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
                src={getTigerAsset("aswbclin", 1)}
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
            How to Pass the ASWB Clinical Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put ethics first</h3>
              <p>
                Values and ethics is now the largest area, more than a third of the Clinical exam. Know the NASW Code of Ethics as it applies in therapy: informed consent for couples, groups and minors, psychotherapy notes, the duty to protect, boundaries, billing and termination.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the DSM-5-TR differentials</h3>
              <p>
                Diagnosis questions turn on duration, onset and what rules a diagnosis out: hypomania versus mania, schizoaffective versus a mood disorder with psychotic features, adjustment disorder versus depression. Learn the key timelines and the medication side effects that call for urgent care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read for FIRST, NEXT and BEST</h3>
              <p>
                Many questions describe a client and ask what the clinician should do first. Safety and risk assessment come before everything, then engagement and assessment before treatment. Several options may be good practice; only one fits the moment in the stem.
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
          ASWB Clinical Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aswbclin" />
        </div>
      </div>

      <ExamRelatedTests examId="aswbclin" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the ASWB Clinical Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every content area of the Clinical outline.</p>
          <ExamLandingCTA dashboardHref="/aswb-clinical/dashboard" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
            Tigertest is not affiliated with the Association of Social Work Boards (ASWB). ASWB is a trademark of its owner.
          </p>
        </div>
      </div>
    </div>
  );
}

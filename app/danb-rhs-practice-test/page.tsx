import "@/lib/banks/danbrhs";
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

const title = "Free DANB RHS Practice Test 2026 - Radiation Health and Safety Questions";
const metaDescription =
  "Free-to-start DANB RHS practice test: 200 original questions on the Radiation Health and Safety outline, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Practice for the Dental Assisting National Board (DANB) Radiation Health and Safety (RHS) exam: 200 original questions written from DANB's published RHS outline and from FDA, NRC and CDC sources. Four 50-question practice tests weighted like the real exam, and four training sets covering landmarks, image types and mounting; technique and error correction; radiation physics and protection; and infection prevention and control.";

const faqs = [
  {
    q: "What is the DANB RHS exam?",
    a: "The Radiation Health and Safety (RHS) exam is the Dental Assisting National Board's (DANB) test of the knowledge a dental assistant needs to take dental radiographs safely. Many states recognize or require it before an assistant may expose radiographs, and it is one of the component exams of DANB's Certified Dental Assistant (CDA) and National Entry Level Dental Assistant (NELDA) certifications. There are no eligibility requirements to take it.",
  },
  {
    q: "How many questions are on the RHS exam?",
    a: "The RHS exam has 75 multiple-choice questions and you have 60 minutes. DANB uses computer adaptive testing, and you can take it at a test center or by remote online proctoring. It is also offered in Spanish.",
  },
  {
    q: "What score do you need to pass the DANB RHS?",
    a: "DANB reports a scaled score from 100 to 900, and 400 passes. A scaled score is neither the number nor the percent of questions right, so the 70 percent line on these practice tests is a readiness target, not DANB's rule. If you do not pass, you can retake the exam as often as you need, reapplying and paying the full fee each time.",
  },
  {
    q: "What does the RHS exam cover?",
    a: "DANB's outline, effective March 12, 2025, gives purpose and technique 50% (landmarks, image types, acquiring images, correcting errors, mounting and records), radiation characteristics and protection 25%, and infection prevention and control 25%. Since July 7, 2022 the exam tests digital radiography only, with no film-based concepts. These practice tests keep that balance across 50 questions.",
  },
  {
    q: "Is the RHS the same as the DANB CDA exam?",
    a: "The RHS is one part of the CDA. The CDA also needs the General Chairside (GC) and Infection Control (ICE) exams, but RHS can be taken on its own, and many states ask for RHS alone for radiography. Tigertest also has a separate DANB CDA practice test that mixes all three.",
  },
  {
    q: "Are these the real DANB RHS questions?",
    a: "No. Every question is original, written by Tigertest from DANB's published outline and from primary sources such as the FDA's x-ray equipment rules, the NRC dose limits, the ADA and FDA recommendations on dental radiography and the CDC's dental infection control guidelines. Images are described in words, so practice reading real radiographs too. Tigertest is not affiliated with the Dental Assisting National Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "danb rhs practice test, rhs practice test, radiation health and safety practice test, danb rhs exam questions, dental radiography practice test, dental assistant x-ray exam, danb rhs 2026",
  alternates: {
    canonical: `${siteUrl}/danb-rhs-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/danb-rhs-practice-test`,
    images: [{ url: shareImageUrl("danbrhs"), width: 1200, height: 630, alt: "Tigertest free DANB RHS practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("danbrhs")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free DANB RHS Practice Test",
      description,
      url: `${siteUrl}/danb-rhs-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("danbrhs"),
      featureList: [
        "200 DANB RHS practice questions",
        "4 practice tests of 50 questions weighted like the DANB RHS outline",
        "4 training sets by RHS domain",
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
        classFaqJsonLd("danbrhs"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Purpose and Technique", weight: "50%" },
  { name: "Radiation Characteristics and Protection", weight: "25%" },
  { name: "Infection Prevention and Control", weight: "25%" },
];

export default function DanbrhsLandingPage() {
  return (
    <div data-theme="danbrhs" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free DANB RHS Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/dental-radiation-health-safety/dashboard"
            shortName="DANB RHS"
            subtitle="200 DANB Radiation Health and Safety questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/danbrhs-mobile.png", desktop: "/landing/danbrhs-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="danbrhs" />

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
                Four training sets cover every RHS domain: landmarks, image types and mounting; technique and error correction; radiation physics and protection; and infection prevention and control. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the three domains of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the DANB RHS Exam Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                DANB publishes the share of the exam each domain takes, and every practice test here keeps that balance, scaled to 50 questions. Purpose and technique is the largest domain, at 50%. Dental assisting instructors can set Tigertest as RHS review at{" "}
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
                src={getTigerAsset("danbrhs", 3)}
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
            How to Prepare for the DANB RHS Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the landmarks on real images</h3>
              <p>
                Half the exam is purpose and technique. Learn each landmark as radiopaque or radiolucent and where it shows up: the sinus, nasal fossae, incisive foramen, mental foramen, mandibular canal and the ridges that cross the molar roots. Then practice naming the teeth and mounting a full series in anatomical order.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Tie every error to its cause</h3>
              <p>
                Elongation and foreshortening come from vertical angulation, overlapped contacts from horizontal angulation, cone cuts from beam alignment, and panoramic errors from where the patient stands and bites. Know the fix for each one, since the exam asks how to correct an image, not just name the error.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the protection numbers</h3>
              <p>
                Learn the units (gray, sievert, rad, rem, coulombs per kilogram), the occupational and public dose limits, ALARA, and the equipment rules for collimation and source-to-skin distance. The exam covers digital radiography only, so skip film processing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice infection control for radiography</h3>
              <p>
                A quarter of the exam is infection prevention: which items are critical, semicritical or noncritical, how sensors and holders are covered or reprocessed, which disinfectant fits which surface, and when to perform hand hygiene and change PPE. Then drill the questions you missed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          DANB RHS Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="danbrhs" />
        </div>
      </div>

      <ExamSampleQuestions examId="danbrhs" />

      <ExamRelatedTests examId="danbrhs" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practice for the DANB RHS Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the DANB RHS exam.</p>
          <ExamLandingCTA dashboardHref="/dental-radiation-health-safety/dashboard" />
        </div>
      </div>
    </div>
  );
}

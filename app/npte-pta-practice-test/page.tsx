import "@/lib/banks/nptepta";
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

const title = "NPTE-PTA Practice Test 2026 - Free PTA Board Exam Questions";
const metaDescription =
  "Free NPTE-PTA practice test: 200 original physical therapist assistant board questions on the FSBPT content outline, four 50-question mock exams and five training sets, every answer explained.";
const description =
  "Free practice for the National Physical Therapy Examination for Physical Therapist Assistants (NPTE-PTA): 200 original questions written from the FSBPT NPTE-PTA Test Content Outline. Four 50-question mock exams weighted like the 140 scored questions, and five training sets covering cardiovascular and pulmonary, musculoskeletal, neuromuscular, the other body systems, and equipment, modalities, safety and professional responsibilities.";

const faqs = [
  {
    q: "What is the NPTE-PTA?",
    a: "The NPTE-PTA is the National Physical Therapy Examination for Physical Therapist Assistants, developed by the Federation of State Boards of Physical Therapy (FSBPT). State licensing boards use it to decide whether a graduate of an accredited PTA program has the entry-level knowledge to work as a physical therapist assistant under the supervision of a physical therapist. Each state also sets its own licensing and supervision rules.",
  },
  {
    q: "How many questions are on the NPTE-PTA?",
    a: "The exam has 180 multiple-choice questions in four sections of 45, with 4 hours of testing time and a total appointment of 4 hours 30 minutes including a scheduled 15-minute break after the second section. 40 of the questions are unscored pretest items. It is given by computer at Prometric centers on fixed dates four times a year, in January, April, July and October.",
  },
  {
    q: "What score do you need to pass the NPTE-PTA?",
    a: "FSBPT reports scaled scores from 200 to 800, and the passing standard in every jurisdiction is a scaled score of 600. The number of correct answers needed changes slightly from form to form, so the 70 percent line on these practice tests is a readiness target, not the official standard. There is no penalty for a wrong answer, so answer every question.",
  },
  {
    q: "What is on the NPTE-PTA?",
    a: "Under the content outline in effect since January 2024, the 140 scored questions cover body systems (musculoskeletal 31 to 40, neuromuscular and nervous 27 to 35, cardiovascular and pulmonary 20 to 27, and smaller counts for integumentary, metabolic and endocrine, lymphatic, gastrointestinal, genitourinary and system interactions) plus equipment and devices 8 to 10, therapeutic modalities 5 to 7, safety and protection 6 to 8, professional responsibilities 2 to 4 and research 1 to 3. Each 50-question practice test here keeps that balance.",
  },
  {
    q: "Are these the real NPTE-PTA questions?",
    a: "No. Every question is original, written by Tigertest from FSBPT's published content outline, so it covers the same knowledge without copying the exam. The real exam includes some questions with a graphic or video and some that share a clinical scenario; here those are written as text scenarios. Tigertest is not affiliated with FSBPT, and this free practice does not replace your PTA program's board review.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "npte pta practice test, npte-pta practice exam, pta board exam practice, physical therapist assistant exam questions, npte pta 2026, fsbpt pta exam, pta licensure exam practice, npte pta review questions",
  alternates: {
    canonical: `${siteUrl}/npte-pta-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/npte-pta-practice-test`,
    images: [{ url: shareImageUrl("nptepta"), width: 1200, height: 630, alt: "Tigertest free NPTE-PTA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nptepta")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NPTE-PTA Practice Test",
      description,
      url: `${siteUrl}/npte-pta-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nptepta"),
      featureList: [
        "200 NPTE-PTA practice questions",
        "4 mock exams of 50 questions weighted like the FSBPT content outline",
        "5 training sets by content area",
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
        classFaqJsonLd("nptepta"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Musculoskeletal", weight: "31-40 of 140" },
  { name: "Neuromuscular & Nervous", weight: "27-35 of 140" },
  { name: "Cardiovascular & Pulmonary", weight: "20-27 of 140" },
  { name: "Other Systems & Interactions", weight: "14-35 of 140" },
  { name: "Equipment, Modalities, Safety & Professional", weight: "22-32 of 140" },
];

export default function NptePtaLandingPage() {
  return (
    <div data-theme="nptepta" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NPTE-PTA Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/npte-pta/dashboard"
            shortName="NPTE-PTA"
            subtitle="200 original PTA board questions on the FSBPT content outline: body systems, interventions, modalities, equipment, safety and your role under the PT's plan of care. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nptepta-mobile.png", desktop: "/landing/nptepta-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nptepta" />

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
                Five training sets follow the content outline: cardiovascular and pulmonary; musculoskeletal; neuromuscular and nervous; the other body systems and system interactions; and equipment, modalities, safety and professional practice. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted like the 140 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the FSBPT Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                FSBPT publishes a range of scored questions for each body system and topic, and every mock exam here keeps the midpoint of each range, scaled to 50 questions. Musculoskeletal and neuromuscular content make up about half the exam. Questions are written for the PTA&apos;s role: carrying out and adjusting interventions within the physical therapist&apos;s plan of care and knowing when to stop and report to the PT. PTA program instructors can set Tigertest as board review at{" "}
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
                src={getTigerAsset("nptepta", 1)}
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
            How to Pass the NPTE-PTA
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with musculoskeletal and neuro</h3>
              <p>
                Together they are about half the scored questions. Know post-operative precautions, weight-bearing levels, gait patterns, stroke and spinal cord injury levels, and the conditions that change how you treat.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know when to stop and report</h3>
              <p>
                Many questions ask what the PTA should do next. Learn the vital sign limits for exercise, the signs of DVT, autonomic dysreflexia, hypoglycemia and red flags, and which changes go back to the supervising PT.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn modalities and devices by their contraindications</h3>
              <p>
                For ultrasound, electrical stimulation, heat, cold, traction and compression, know the parameters and when not to use them. Fit walkers, canes, crutches and wheelchairs until the measurements are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by content area. Aim for 70% or better on every mock exam before your test date. After each test, drill the questions you missed and retrain the weakest area.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NPTE-PTA Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nptepta" />
        </div>
      </div>

      <ExamSampleQuestions examId="nptepta" />

      <ExamRelatedTests examId="nptepta" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NPTE-PTA?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every area of the FSBPT content outline.</p>
          <ExamLandingCTA dashboardHref="/npte-pta/dashboard" />
        </div>
      </div>
    </div>
  );
}

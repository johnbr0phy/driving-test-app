import "@/lib/banks/lmrt";
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

const title = "ARRT Limited Scope Practice Test 2026 - Free Limited X-Ray Exam Prep";
const metaDescription =
  "Free ARRT Limited Scope practice test: 200 original questions on the core module and the chest, extremities, skull and sinuses, spine and podiatric modules, from radiation safety to positioning.";
const description =
  "Free practice for the ARRT Limited Scope of Practice in Radiography exam: 200 original questions on the core module (patient care, radiation physics and protection, image acquisition and equipment) and all five procedure modules (chest, extremities, skull and sinuses, spine and podiatric). Four 50-question practice tests that mix core and procedure questions, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "arrt limited scope practice test, limited scope x-ray exam, limited scope radiography practice test, limited x-ray machine operator exam, bxmo practice test, lxmo exam, limited medical radiologic technologist exam, limited scope core module practice, limited scope x-ray practice test 2026",
  alternates: {
    canonical: `${siteUrl}/arrt-limited-scope-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/arrt-limited-scope-practice-test`,
    images: [{ url: shareImageUrl("lmrt"), width: 1200, height: 630, alt: "Tigertest free ARRT Limited Scope practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("lmrt")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the ARRT Limited Scope exam?",
    a: "The Limited Scope of Practice in Radiography exam is written and given by ARRT for state licensing agencies. It tests people who will take x-rays of selected parts of the body, such as the chest or extremities, without being full radiographers. Passing it is part of a state license or permit; it is not an ARRT credential.",
  },
  {
    q: "Which modules will I take?",
    a: "Every candidate takes the Core module, which covers patient care, radiation safety and image production. Your state then assigns one or more procedure modules: Chest, Extremities, Skull/Sinuses, Spine or Podiatric. Which modules you need, and whether a limited license exists at all, varies by state, so check with your state licensing agency.",
  },
  {
    q: "How many questions are on the exam and what is the passing score?",
    a: "ARRT's content specifications give the Core module 100 scored questions plus 15 unscored ones in 1 hour 55 minutes. Chest, Skull/Sinuses and Podiatric have 20 scored questions and Extremities and Spine 25, each with 5 unscored ones. ARRT sends the number you answered correctly in each module to your state, and the state decides whether you pass, so check your state's passing score. Here 75 percent is a readiness target.",
  },
  {
    q: "What do the practice tests cover?",
    a: "Each 50-question practice test mixes 26 core questions (patient care, radiation physics and protection, image acquisition and equipment) with 24 procedure questions spread across all five modules. The training sets let you drill the core module or just the procedure modules your state assigns.",
  },
  {
    q: "Are these real ARRT questions?",
    a: "No. Every question is original, written by Tigertest from ARRT's Limited Scope content specifications and public sources such as the federal x-ray equipment rules (21 CFR 1020) and CDC infection control guidance. Positioning and anatomy are described in words, without images. It is practice, not an official ARRT exam, and it is not affiliated with ARRT.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ARRT Limited Scope Practice Test",
      description,
      url: `${siteUrl}/arrt-limited-scope-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("lmrt"),
      featureList: [
        "200 Limited Scope practice questions",
        "4 practice tests of 50 questions",
        "4 training sets across the core module and all 5 procedure modules",
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
        classFaqJsonLd("lmrt"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Patient Care", weight: "10%" },
  { name: "Radiation Physics & Protection", weight: "20%" },
  { name: "Image Production & Equipment", weight: "22%" },
  { name: "Chest Procedures", weight: "10%" },
  { name: "Extremity Procedures", weight: "12%" },
  { name: "Skull & Sinus Procedures", weight: "8%" },
  { name: "Spine Procedures", weight: "10%" },
  { name: "Podiatric Procedures", weight: "8%" },
];

export default function LimitedScopeLandingPage() {
  return (
    <div data-theme="lmrt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ARRT Limited Scope Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/limited-scope-xray/dashboard"
            shortName="Limited Scope"
            subtitle="200 ARRT Limited Scope questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/lmrt-mobile.png", desktop: "/landing/lmrt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="lmrt" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Module</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: patient care and radiation safety; image production; chest and extremities; and skull, spine and podiatric. Missed questions come back until you master them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests that mix 26 core and 24 procedure questions, with a 75% readiness line. No question appears in more than one test, and every answer is explained.
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
                Core Plus Every Procedure Module
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ARRT&apos;s content specifications set the core module&apos;s categories and the size of each procedure module. Every practice test here keeps the core proportions and adds questions from all five procedure modules. Limited scope x-ray instructors can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which areas the class misses most.
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
                src={getTigerAsset("lmrt", 3)}
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
            How to Pass the ARRT Limited Scope Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the core module</h3>
              <p>
                Everyone takes the 100-question core module, and safety and image production make up 82 of those questions. Know the inverse square law, mAs and the 15% rule, filtration, collimation, dose limits and how digital images are processed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn positioning in words</h3>
              <p>
                Procedure questions focus on positioning: landmarks, central ray angles, breathing and what a correct image shows. Say each projection out loud, from patient position to central ray, until you can do it without notes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Study only your modules</h3>
              <p>
                Your state decides which procedure modules you take. Check your assignment, then spend your procedure time on those training sets, such as chest and extremities for many clinic permits or podiatric for a podiatry office.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 80 percent or better on every practice test before you schedule, and retrain your weakest set after each one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ARRT Limited Scope Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="lmrt" />
        </div>
      </div>

      <ExamSampleQuestions examId="lmrt" />

      <ExamRelatedTests examId="lmrt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Limited Scope Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the core module and every procedure module.</p>
          <ExamLandingCTA dashboardHref="/limited-scope-xray/dashboard" />
        </div>
      </div>
    </div>
  );
}

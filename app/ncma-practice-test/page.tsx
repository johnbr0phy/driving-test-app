import "@/lib/banks/ncma";
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

const title = "NCMA Practice Test 2026 - Free NCCT National Certified Medical Assistant Questions";
const metaDescription =
  "Free-to-start NCMA (NCCT) practice test: 200 original questions on the NCCT NCMA detailed test plan, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Practice for the National Center for Competency Testing (NCCT) National Certified Medical Assistant (NCMA) exam: 200 original questions written from NCCT's published detailed test plan. Four 50-question practice tests weighted like the real exam's content categories, and four training sets covering pharmacology and infection control, patient intake and care, phlebotomy and ECG, and administrative duties and law.";

const faqs = [
  {
    q: "What is the NCMA exam?",
    a: "It is the certification exam for the National Certified Medical Assistant credential from the National Center for Competency Testing (NCCT). It covers clinical and front office work: pharmacology and medical knowledge, infection control, patient intake and care, phlebotomy, ECG, administrative duties, and law and ethics. Candidates qualify through an NCCT-authorized medical assistant program, formal military medical training, or a year of verified full-time work as a medical assistant within the past five years.",
  },
  {
    q: "How many questions are on the NCMA exam?",
    a: "NCCT's detailed test plan lists 125 scored questions and 25 unscored pretest questions, with three hours to finish. About 92% are four-option multiple choice and 8% are alternative items such as drag and drop, multi-select and hotspot. The exam is on a computer, at a test site or by remote proctoring, and is offered in English only.",
  },
  {
    q: "What score do you need to pass the NCMA exam?",
    a: "NCCT reports scores from 200 to 720, and the pass point is a scaled 575, set by a panel of subject matter experts. It is not a fixed percentage, so the 70 percent line on these practice tests is a readiness target. After a failed attempt you wait 30 days for a second or third try, 90 days after a third failure, and 180 days with an appeal after that.",
  },
  {
    q: "What is on the NCMA exam?",
    a: "The test plan has four content categories: Pharmacology and General Medical Knowledge 18 questions, Clinical Medical Procedures 72 (Infection Control and Safety 15, Patient Intake and Care 32, Phlebotomy 15, ECG 10), Medical Administrative Duties 15, and Law and Ethics 20. Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real NCMA exam questions?",
    a: "No. Every question is original, written by Tigertest from NCCT's published test plan and the laws and standards it names, such as HIPAA, OSHA, CLIA and DEA rules, so it covers the same knowledge without copying the exam. Tigertest is not affiliated with the National Center for Competency Testing.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ncma practice test, ncma exam, ncct ncma practice test, national certified medical assistant practice exam, ncct medical assistant exam questions, ncma certification 2026, ncct practice test, medical assistant practice test",
  alternates: {
    canonical: `${siteUrl}/ncma-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ncma-practice-test`,
    images: [{ url: shareImageUrl("ncma"), width: 1200, height: 630, alt: "Tigertest free NCMA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ncma")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NCMA (NCCT) Practice Test",
      description,
      url: `${siteUrl}/ncma-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ncma"),
      featureList: [
        "200 NCMA (NCCT) practice questions",
        "4 practice tests of 50 questions weighted like the NCCT NCMA test plan",
        "4 training sets by content category",
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
        classFaqJsonLd("ncma"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Patient Intake and Care", weight: "32 items" },
  { name: "Law and Ethics", weight: "20 items" },
  { name: "Pharmacology and General Medical Knowledge", weight: "18 items" },
  { name: "Infection Control and Safety", weight: "15 items" },
  { name: "Phlebotomy", weight: "15 items" },
  { name: "Medical Administrative Duties", weight: "15 items" },
  { name: "ECG", weight: "10 items" },
];

export default function NcmaLandingPage() {
  return (
    <div data-theme="ncma" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NCMA (NCCT) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ncma/dashboard"
            shortName="NCMA"
            subtitle="200 questions on the NCCT NCMA test plan. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/ncma-mobile.png", desktop: "/landing/ncma-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ncma" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Category</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets cover every content category of the NCCT test plan: pharmacology and infection control; patient intake and care; phlebotomy and ECG; and administrative duties and law. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 125 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the NCCT NCMA Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NCCT publishes how many of the 125 scored questions come from each content category, and every practice test here keeps that balance, scaled to 50 questions. Clinical procedures make up 72 of the 125, and patient intake and care is the largest single area. Medical assistant program instructors can set Tigertest as NCMA review at{" "}
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
                src={getTigerAsset("ncma", 3)}
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
            How to Pass the NCMA Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master patient intake and care</h3>
              <p>
                Intake and care is 32 of the 125 scored questions, the largest area. Know identification, vital signs and normal ranges, vision screening, exam positions, injections and their sites, wound care, specimen instructions and CLIA-waived tests.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the law and ethics rules</h3>
              <p>
                Law and ethics is 20 items. Know scope of practice, advance directives, HIPAA and HITECH, consent, terminating care, OSHA rules, CLIA certificates and the DEA rules for ordering, storing and recording controlled drugs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Drill phlebotomy and ECG</h3>
              <p>
                Phlebotomy is 15 items and ECG is 10. Learn tube additives, the order of draw, special handling, site restrictions, electrode placement and how to spot and fix artifact and lead errors.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 70% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NCMA Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ncma" />
        </div>
      </div>

      <ExamSampleQuestions examId="ncma" />

      <ExamRelatedTests examId="ncma" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NCMA Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every content category of the NCCT NCMA test plan.</p>
          <ExamLandingCTA dashboardHref="/ncma/dashboard" />
        </div>
      </div>
    </div>
  );
}

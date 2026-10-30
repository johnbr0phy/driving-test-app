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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "CPC Practice Test 2026 - Free AAPC Medical Coding Exam Prep";
const metaDescription =
  "Free CPC practice test: 200 original medical coding questions on the 17 AAPC areas, ICD-10-CM and CPT guidelines, modifiers, E/M and coding cases, with every answer explained.";
const description =
  "Free practice for the AAPC Certified Professional Coder (CPC) exam: 200 original questions on the areas the real exam covers, from medical terminology, anatomy and compliance to ICD-10-CM and HCPCS Level II, every CPT surgery series, radiology, pathology and laboratory, medicine, E/M, anesthesia and short coding cases. Four 50-question mock tests with the real 70% pass line and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cpc practice test, cpc exam practice, aapc cpc practice exam, medical coding practice test, certified professional coder exam, cpc exam questions, icd-10-cm practice questions, cpt modifiers quiz, cpc practice test 2026",
  alternates: {
    canonical: `${siteUrl}/cpc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cpc-practice-test`,
    images: [{ url: shareImageUrl("cpc"), width: 1200, height: 630, alt: "Tigertest free CPC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cpc")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the CPC exam?",
    a: "The Certified Professional Coder (CPC) exam is AAPC's certification test for medical coders who assign CPT, HCPCS Level II and ICD-10-CM codes to physician and outpatient services. It is open code book: you bring the approved CPT, ICD-10-CM and HCPCS Level II manuals and apply them to questions and short medical records.",
  },
  {
    q: "How many questions are on the CPC exam and what is the passing score?",
    a: "The CPC exam has 100 multiple-choice questions in one 4-hour sitting, and you need an overall score of 70 percent, at least 70 correct, to pass. It can be taken at a testing center or at home with a live remote proctor. Each mock test here has 50 questions, half the real length, with the same 70 percent pass line.",
  },
  {
    q: "What topics does the CPC exam cover?",
    a: "AAPC lists 17 areas plus 10 coding cases: medical terminology, anatomy, compliance and regulatory, coding guidelines, ICD-10-CM, HCPCS Level II, the six CPT surgery series from 10000 to 60000, radiology, pathology and laboratory, medicine, evaluation and management, and anesthesia. The surgery series carry the most questions, six each, so they make up over a third of the exam.",
  },
  {
    q: "Do these questions use the code books?",
    a: "No. On the real exam you look codes up, but this practice bank tests the rules you need to choose them: guidelines, modifiers, global surgery, ICD-10-CM conventions and sequencing, E/M level selection, anesthesia time, and the terminology and anatomy behind the codes. Use it alongside timed practice in your own current-year code books.",
  },
  {
    q: "Are these the real CPC exam questions?",
    a: "No. Every question is original, written by Tigertest from the public ICD-10-CM guidelines, CMS rules and the CPT conventions taught in coding courses. It is free practice, not an official AAPC exam, and it does not register you for or replace the CPC exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CPC Practice Test",
      description,
      url: `${siteUrl}/cpc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CPC practice questions",
        "4 mock tests of 50 questions with a 70% pass line",
        "5 training sets across all 17 AAPC areas",
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
        classFaqJsonLd("cpc"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "CPT Surgery, 10000 to 60000 series", weight: "36%" },
  { name: "E/M, Radiology, Lab & Medicine", weight: "24%" },
  { name: "Guidelines, Terminology, Anatomy & Compliance", weight: "20%" },
  { name: "ICD-10-CM & HCPCS Level II", weight: "10%" },
  { name: "Coding Cases", weight: "6%" },
  { name: "Anesthesia", weight: "4%" },
];

export default function CpcLandingPage() {
  return (
    <div data-theme="cpc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CPC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cpc/dashboard"
            shortName="CPC"
            subtitle="200 original medical coding questions on all 17 AAPC areas: guidelines, modifiers, ICD-10-CM, every CPT surgery series, E/M, anesthesia and coding cases. Four 50-question mock tests, 70% to pass. No account needed."
            shots={{ mobile: "/landing/cpc-mobile.png", desktop: "/landing/cpc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cpc" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Code Set</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: foundations and guidelines; ICD-10-CM, HCPCS and cases; surgery 10000 to 30000; surgery 40000 to 60000; and E/M, anesthesia, radiology, lab and medicine. Missed questions come back until you master them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests, each half the real exam and weighted like it, with the real 70% pass line. No question appears in more than one test, and every answer is explained.
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
                Weighted Like the Real Exam
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AAPC publishes how many of the 100 questions come from each area, and every mock test here keeps those proportions at half the length. Coding instructors can set Tigertest as practice at{" "}
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
                src={getTigerAsset("cpc", 1)}
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
            How to Pass the CPC Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the guidelines before the codes</h3>
              <p>
                Most wrong answers on the CPC come from a missed rule, not a missed code: the section guidelines at the start of each CPT section, the ICD-10-CM conventions and the global surgery package. Read them first, then practice applying them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Master the modifiers</h3>
              <p>
                Modifiers 25, 57, 24, 58, 78, 79, 59, 50, 51, 22, 52, 53 and 26 come up across almost every section. Learn when each one applies and which ones are easy to confuse.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice with your own code books, on the clock</h3>
              <p>
                You get about 2 minutes 24 seconds per question. Tab and annotate your current-year CPT, ICD-10-CM and HCPCS Level II books as AAPC allows, and time yourself so the cases do not run you out of time.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by area. Aim for 80 percent or better on every mock test before you schedule, drill what you missed after each one, and retrain your weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CPC Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cpc" />
        </div>
      </div>

      <ExamRelatedTests examId="cpc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CPC Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every area of the CPC exam.</p>
          <ExamLandingCTA dashboardHref="/cpc/dashboard" />
        </div>
      </div>
    </div>
  );
}

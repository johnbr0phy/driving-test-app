import "@/lib/banks/crc";
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

const title = "CRC Practice Test 2026 - Free AAPC Risk Adjustment Coder Exam Prep";
const metaDescription =
  "Free CRC practice test: 200 original risk adjustment coding questions on AAPC's eight CRC domains, from CMS-HCC and HHS-HCC models and RADV to ICD-10-CM diagnosis coding and coding cases.";
const description =
  "Free practice for the AAPC Certified Risk Adjustment Coder (CRC) exam: 200 original questions on the eight domains the real exam covers, compliance, diagnosis coding, documentation improvement, pathophysiology and terminology, the purpose and use of risk adjustment models, quality of care, risk adjustment models and coding cases. Four 50-question practice tests weighted like the real 100 questions, with the 70% pass line, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "crc practice test, crc exam practice, aapc crc practice exam, risk adjustment coding practice test, certified risk adjustment coder exam, crc exam questions, hcc coding practice, cms-hcc quiz, crc practice test 2026",
  alternates: {
    canonical: `${siteUrl}/crc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/crc-practice-test`,
    images: [{ url: shareImageUrl("crc"), width: 1200, height: 630, alt: "Tigertest free CRC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("crc")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the CRC exam?",
    a: "The Certified Risk Adjustment Coder (CRC) exam is AAPC's certification test for coders who review medical records and assign ICD-10-CM diagnosis codes for risk adjustment, the payment method Medicare Advantage, ACA Marketplace and many Medicaid plans use to pay more for sicker members. It covers the risk adjustment models, compliance and audits, documentation improvement and diagnosis coding for chronic conditions.",
  },
  {
    q: "How many questions are on the CRC exam and what is the passing score?",
    a: "The CRC exam has 100 multiple-choice questions in one 4-hour sitting, and you need 70 percent to pass, so more than 30 wrong answers fails. You may bring a current or prior year ICD-10-CM code book, and an on-screen calculator is provided. You can test at a testing center or at home with a live remote proctor. Each practice test here has 50 questions with the same 70 percent pass line.",
  },
  {
    q: "What topics does the CRC exam cover?",
    a: "AAPC lists eight domains: compliance (15 questions), diagnosis coding (30), documentation improvement (12), pathophysiology, medical terminology and anatomy (5), purpose and use of risk adjustment models (10), quality of care (3), risk adjustment models (15) and cases (10), where you code diagnoses from medical record documentation.",
  },
  {
    q: "Which CMS-HCC model do these questions use?",
    a: "Questions about the Medicare Advantage model name the year. CMS fully phased in the 2024 CMS-HCC model for payment year 2026 and kept it for 2027 in the CY 2027 Rate Announcement. Coding questions follow the FY 2027 ICD-10-CM Official Guidelines for Coding and Reporting. No question asks you to look up a code number in the code book.",
  },
  {
    q: "Are these the real CRC exam questions?",
    a: "No. Every question is original, written by Tigertest from AAPC's published CRC domains, the ICD-10-CM Official Guidelines and public CMS risk adjustment and RADV documents. It is practice, not an official AAPC exam, and it does not register you for or replace the CRC exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CRC Practice Test",
      description,
      url: `${siteUrl}/crc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("crc"),
      featureList: [
        "200 CRC practice questions",
        "4 practice tests of 50 questions with a 70% pass line",
        "4 training sets across all 8 AAPC CRC domains",
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
        classFaqJsonLd("crc"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Diagnosis Coding", weight: "30%" },
  { name: "Compliance & RADV", weight: "14%" },
  { name: "Risk Adjustment Models", weight: "14%" },
  { name: "Documentation Improvement", weight: "12%" },
  { name: "Purpose & Use of Models", weight: "10%" },
  { name: "Coding Cases", weight: "10%" },
  { name: "Pathophysiology & Terminology", weight: "6%" },
  { name: "Quality of Care", weight: "4%" },
];

export default function CrcLandingPage() {
  return (
    <div data-theme="crc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CRC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/crc/dashboard"
            shortName="CRC"
            subtitle="200 original risk adjustment questions on all eight AAPC CRC domains: CMS-HCC, HHS-HCC and CDPS models, RADV and compliance, documentation, ICD-10-CM diagnosis coding, quality measures and coding cases. Four 50-question practice tests, 70% to pass. Free to start, no account needed."
            shots={{ mobile: "/landing/crc-mobile.png", desktop: "/landing/crc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="crc" />

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
                Four training sets: risk adjustment models and their uses; compliance and documentation; diagnosis coding; and pathophysiology with coding cases. Missed questions come back until you master them.
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
                Four practice tests weighted like the real 100 questions, with the real 70% pass line. No question appears in more than one test, and every answer is explained.
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
                AAPC publishes how many of the 100 questions come from each domain, and every practice test here keeps those proportions at 50 questions. Coding instructors can set Tigertest as practice at{" "}
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
                src={getTigerAsset("crc", 3)}
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
            How to Pass the CRC Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the coding guidelines</h3>
              <p>
                Diagnosis coding is 30 of the 100 questions. Know the hypertension, CKD and diabetes combinations, current cancer versus personal history, stroke sequelae, pressure ulcer stages and the outpatient rules for chronic and coexisting conditions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn how the models pay</h3>
              <p>
                Know how a risk score is built: demographic factors plus payment HCCs, hierarchies that keep only the most severe condition, interactions and count variables. Learn how the ACA HHS-HCC and Medicaid CDPS models differ from the Medicare model.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like a RADV auditor</h3>
              <p>
                Every HCC must come from a signed, face-to-face visit with an acceptable provider type. Practice spotting unsupported diagnoses, missing signatures and unacceptable sources such as radiology reports or phone calls.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by domain. Aim for 80 percent or better on every practice test before you schedule, and retrain your weakest set after each one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CRC Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="crc" />
        </div>
      </div>

      <ExamSampleQuestions examId="crc" />

      <ExamRelatedTests examId="crc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CRC Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the CRC exam.</p>
          <ExamLandingCTA dashboardHref="/crc/dashboard" />
        </div>
      </div>
    </div>
  );
}

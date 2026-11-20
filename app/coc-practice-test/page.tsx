import "@/lib/banks/coc";
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

const title = "COC Practice Test 2026 - Free AAPC Certified Outpatient Coder Exam Prep";
const metaDescription =
  "Free COC practice test: 200 original outpatient facility coding questions on the AAPC COC exam sections, from OPPS, APCs and status indicators to observation, ED coding, NCCI edits, modifiers and ICD-10-CM.";
const description =
  "Free practice for the AAPC Certified Outpatient Coder (COC) exam, formerly CPC-H: 200 original questions on hospital outpatient and ASC facility coding, weighted like AAPC's ten exam sections: terminology, anatomy, coding guidelines and compliance, payment methodologies, ICD-10-CM, HCPCS Level II, CPT, surgery and modifiers, and coding cases. Four 50-question practice tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "coc practice test, coc exam practice, aapc coc practice test, certified outpatient coder exam, cpc-h practice test, outpatient coding practice test, coc exam questions, opps apc coding practice, hospital outpatient coding certification, coc practice test 2026",
  alternates: {
    canonical: `${siteUrl}/coc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/coc-practice-test`,
    images: [{ url: shareImageUrl("coc"), width: 1200, height: 630, alt: "Tigertest free COC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("coc")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the COC exam?",
    a: "The Certified Outpatient Coder (COC) exam, formerly called CPC-H, is AAPC's certification test for coders who work on the facility side of hospital outpatient departments and ambulatory surgery centers. It covers outpatient diagnosis and procedure coding, payment methods such as APCs, NCCI edits, compliance, and the revenue cycle of hospital outpatient billing.",
  },
  {
    q: "How many questions are on the COC exam and what is the passing score?",
    a: "AAPC says the COC exam has 100 questions, with at least 70 answered, in one four-hour sitting, and an overall score of 70% or higher passes, so more than 30 wrong answers fails. You can take it online with a live remote proctor or at a testing center. Each practice test here has 50 questions with the same 70% line.",
  },
  {
    q: "What topics does the COC exam cover?",
    a: "AAPC lists ten sections: medical terminology (7 questions), anatomy (7), coding guidelines (3), payment methodologies (13), compliance (3), ICD-10-CM (15), HCPCS Level II (7), CPT (13), surgery and modifiers (22) and cases (10). Payment covers Medicare Parts A to D, Medicare as secondary payer, OPPS and IPPS, and UB-04 and CMS-1500 claims.",
  },
  {
    q: "Which code books can I use on the COC exam?",
    a: "AAPC approves the current year AMA CPT Professional Edition and current year ICD-10-CM and HCPCS Level II books from any publisher, printed or as eBooks, one copy of each. This practice bank does not need code books: it tests the guidelines and rules behind the codes, such as OPPS status indicators, observation billing, facility modifiers and the ICD-10-CM outpatient guidelines.",
  },
  {
    q: "Are these the real COC exam questions?",
    a: "No. Every question is original, written by Tigertest from AAPC's published COC exam sections and public sources such as the ICD-10-CM Official Guidelines, the Medicare Claims Processing Manual and the NCCI Policy Manual. It is practice, not an official AAPC exam, and it does not register you for or replace the COC exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free COC Practice Test",
      description,
      url: `${siteUrl}/coc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("coc"),
      featureList: [
        "200 COC practice questions",
        "4 practice tests of 50 questions",
        "5 training sets across all 10 AAPC COC exam sections",
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
        classFaqJsonLd("coc"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Surgery & Modifiers", weight: "22%" },
  { name: "ICD-10-CM", weight: "15%" },
  { name: "Terminology & Anatomy", weight: "14%" },
  { name: "Payment Methodologies", weight: "13%" },
  { name: "CPT: E/M, Radiology, Lab & Medicine", weight: "13%" },
  { name: "Cases", weight: "10%" },
  { name: "HCPCS Level II", weight: "7%" },
  { name: "Coding Guidelines & Compliance", weight: "6%" },
];

export default function CocLandingPage() {
  return (
    <div data-theme="coc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free COC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/coc/dashboard"
            shortName="COC"
            subtitle="200 original outpatient facility coding questions on every AAPC COC exam section: OPPS, APCs and status indicators, observation and ED coding, NCCI edits and facility modifiers, ICD-10-CM, HCPCS Level II and coding cases. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/coc-mobile.png", desktop: "/landing/coc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="coc" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Section</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: terminology, anatomy and compliance; payment methods and HCPCS Level II; ICD-10-CM and CPT services; surgery and modifiers; and outpatient cases. Missed questions come back until you master them.
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
                Four practice tests weighted like the real 100 questions, with the same 70% pass line. No question appears in more than one test, and every answer is explained.
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
                AAPC sets how many of the 100 questions come from each section, and every practice test here keeps close to those proportions at 50 questions. Coding instructors can set Tigertest as practice at{" "}
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
                src={getTigerAsset("coc", 3)}
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
            How to Pass the COC Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put surgery and modifiers first</h3>
              <p>
                Surgery and modifiers is the largest section. Know when facilities use modifiers 73, 74 and 52, how modifier 50 is billed, the X modifiers, and the NCCI rules for bundled, separate and converted procedures.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn how the facility gets paid</h3>
              <p>
                Payment methodologies is worth 13 questions. Learn the OPPS status indicators, packaging, comprehensive and composite APCs, the payment window, Medicare secondary payer rules and the UB-04 fields and revenue codes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the outpatient diagnosis rules</h3>
              <p>
                The ICD-10-CM outpatient guidelines differ from inpatient ones: no coding of uncertain diagnoses, first-listed instead of principal, and special rules for surgery, observation and diagnostic tests.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by section. Aim for 80 percent or better on every practice test before you schedule, and retrain your weakest set after each one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          COC Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="coc" />
        </div>
      </div>

      <ExamSampleQuestions examId="coc" />

      <ExamRelatedTests examId="coc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the COC Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every section of the COC exam.</p>
          <ExamLandingCTA dashboardHref="/coc/dashboard" />
        </div>
      </div>
    </div>
  );
}

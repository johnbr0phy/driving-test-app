import "@/lib/banks/cpb";
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

const title = "CPB Practice Test 2026 - Free AAPC Medical Billing Exam Prep";
const metaDescription =
  "Free CPB practice test: 200 original medical billing questions on AAPC's seven CPB domains, from payers and Medicare Secondary Payer rules to claims, appeals, collections and billing cases.";
const description =
  "Free practice for the AAPC Certified Professional Biller (CPB) exam: 200 original questions on the seven domains the real exam covers, types of insurance, billing regulations, HIPAA and compliance, reimbursement and collections, claims and billing, coding and case analysis. Four 50-question practice tests weighted like the real 135 questions, with the 70% pass line, and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cpb practice test, cpb exam practice, aapc cpb practice exam, medical billing practice test, certified professional biller exam, cpb exam questions, medical billing certification practice, medicare billing quiz, cpb practice test 2026",
  alternates: {
    canonical: `${siteUrl}/cpb-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cpb-practice-test`,
    images: [{ url: shareImageUrl("cpb"), width: 1200, height: 630, alt: "Tigertest free CPB practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cpb")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the CPB exam?",
    a: "The Certified Professional Biller (CPB) exam is AAPC's certification test for medical billers who handle claims, payers, payments and patient accounts in physician practices and other outpatient settings. It covers payer rules, billing regulations, compliance, claims follow-up, collections and enough coding to read and fix a claim.",
  },
  {
    q: "How many questions are on the CPB exam and what is the passing score?",
    a: "The CPB exam has 135 multiple-choice questions in one 4-hour sitting, and you need 70 percent, at least 95 correct, to pass. You may bring the approved CPT, ICD-10-CM and HCPCS Level II code books, and you can test at a testing center or at home with a live remote proctor. Each practice test here has 50 questions with the same 70 percent pass line.",
  },
  {
    q: "What topics does the CPB exam cover?",
    a: "AAPC lists seven domains: types of insurance (29 questions), billing regulations (17), HIPAA and compliance (7), reimbursement and collections (19), claims and billing (19), coding (10) and case analysis (34), where you apply source documents such as claim forms, payment policies, LCDs, appeal letters and accounts receivable reports.",
  },
  {
    q: "Do these questions use the code books?",
    a: "No. This practice bank tests the billing rules behind the codes: payer order, timely filing and appeal deadlines, global surgery and modifiers, ABNs, NCCI edits, HIPAA transactions, remittance math and collection rules. Practice with your own current-year code books for the coding questions on the real exam.",
  },
  {
    q: "Are these the real CPB exam questions?",
    a: "No. Every question is original, written by Tigertest from AAPC's published CPB domains and the public Medicare manuals, HIPAA regulations, Regulation F and No Surprises Act rules. It is practice, not an official AAPC exam, and it does not register you for or replace the CPB exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CPB Practice Test",
      description,
      url: `${siteUrl}/cpb-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cpb"),
      featureList: [
        "200 CPB practice questions",
        "4 practice tests of 50 questions with a 70% pass line",
        "5 training sets across all 7 AAPC CPB domains",
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
        classFaqJsonLd("cpb"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Case Analysis", weight: "26%" },
  { name: "Types of Insurance", weight: "20%" },
  { name: "Claims & Billing", weight: "14%" },
  { name: "Reimbursement & Collections", weight: "14%" },
  { name: "Billing Regulations", weight: "12%" },
  { name: "Coding & Modifiers", weight: "8%" },
  { name: "HIPAA & Compliance", weight: "6%" },
];

export default function CpbLandingPage() {
  return (
    <div data-theme="cpb" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CPB Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cpb/dashboard"
            shortName="CPB"
            subtitle="200 original medical billing questions on all seven AAPC CPB domains: payers, billing rules, HIPAA and compliance, claims and appeals, coding, reimbursement and collections, and billing cases. Four 50-question practice tests, 70% to pass. Free to start, no account needed."
            shots={{ mobile: "/landing/cpb-mobile.png", desktop: "/landing/cpb-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cpb" />

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
                Five training sets: types of insurance; billing regulations and compliance; claims, billing and coding; case analysis; and reimbursement and collections. Missed questions come back until you master them.
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
                Four practice tests weighted like the real 135 questions, with the real 70% pass line. No question appears in more than one test, and every answer is explained.
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
                AAPC publishes how many of the 135 questions come from each domain, and every practice test here keeps those proportions at 50 questions. Billing and coding instructors can set Tigertest as practice at{" "}
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
                src={getTigerAsset("cpb", 3)}
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
            How to Pass the CPB Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn who pays first</h3>
              <p>
                Types of insurance is the biggest domain after the cases. Know the Medicare Secondary Payer rules (the 20 and 100 employee thresholds, the ESRD 30-month period, workers&apos; compensation and no-fault), Medigap, TRICARE For Life and Medicaid as payer of last resort.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the deadlines cold</h3>
              <p>
                Timely filing, the five Medicare appeal levels and their filing windows, refund timing after an ABN and the debt collection rules all turn on dates. Case questions often ask you to work one out.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the case analysis</h3>
              <p>
                34 of the 135 questions ask you to read a claim, a remittance, a payment policy or an aging report. Practice reading allowed, paid and patient responsibility, and deciding whether to correct, resubmit or appeal.
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
          CPB Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cpb" />
        </div>
      </div>

      <ExamSampleQuestions examId="cpb" />

      <ExamRelatedTests examId="cpb" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CPB Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the CPB exam.</p>
          <ExamLandingCTA dashboardHref="/cpb/dashboard" />
        </div>
      </div>
    </div>
  );
}

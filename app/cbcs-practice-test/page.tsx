import "@/lib/banks/cbcs";
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

const title = "CBCS Practice Test 2026 - Free NHA Billing and Coding Exam Prep";
const metaDescription =
  "Free CBCS practice test: 200 original billing and coding questions on the four domains of the NHA CBCS test plan, from HIPAA and eligibility to ICD-10-CM, CPT, claims, denials and collections.";
const description =
  "Free practice for the NHA Certified Billing and Coding Specialist (CBCS) exam: 200 original questions on the four domains of NHA's test plan, the revenue cycle and regulatory compliance, insurance eligibility and other payer requirements, coding and coding guidelines, and billing and reimbursement. Four 50-question practice tests weighted like the real 100 scored questions, and six training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cbcs practice test, cbcs exam practice, nha cbcs practice test, certified billing and coding specialist exam, billing and coding practice test, cbcs exam questions, medical billing and coding certification practice, nha billing and coding exam, cbcs practice test 2026",
  alternates: {
    canonical: `${siteUrl}/cbcs-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cbcs-practice-test`,
    images: [{ url: shareImageUrl("cbcs"), width: 1200, height: 630, alt: "Tigertest free CBCS practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cbcs")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the CBCS exam?",
    a: "The Certified Billing and Coding Specialist (CBCS) exam is the National Healthcareer Association's certification test for people who code diagnoses and procedures, submit claims and follow up on payments and denials. It covers the revenue cycle and compliance, insurance eligibility, coding guidelines, and billing and reimbursement.",
  },
  {
    q: "How many questions are on the CBCS exam and what is the passing score?",
    a: "NHA's test plan lists 100 scored questions and 25 unscored pretest questions in 3 hours. NHA reports a scaled score from 200 to 500, and 390 or higher passes; because the scale weights questions by difficulty, 390 is not a fixed percentage. Each practice test here has 50 questions, and 70 percent is a readiness target.",
  },
  {
    q: "What topics does the CBCS exam cover?",
    a: "NHA's test plan, based on its 2020 job analysis, has four domains: The Revenue Cycle and Regulatory Compliance (15 questions), Insurance Eligibility and Other Payer Requirements (20), Coding and Coding Guidelines (32), and Billing and Reimbursement (33).",
  },
  {
    q: "Do I need code books for the CBCS exam?",
    a: "No. NHA says that since September 24, 2024, coding manuals are neither needed nor allowed: each coding question shows the information needed to answer it. This practice bank tests the guidelines and rules behind the codes, such as ICD-10-CM conventions, modifiers, CMS-1500 items, NCCI edits and remittance codes.",
  },
  {
    q: "Are these the real CBCS exam questions?",
    a: "No. Every question is original, written by Tigertest from NHA's published CBCS test plan and public sources such as the ICD-10-CM Official Guidelines, CMS claims manuals, HIPAA regulations and OIG guidance. It is practice, not an official NHA exam, and it does not register you for or replace the CBCS exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CBCS Practice Test",
      description,
      url: `${siteUrl}/cbcs-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cbcs"),
      featureList: [
        "200 CBCS practice questions",
        "4 practice tests of 50 questions",
        "6 training sets across all 4 NHA CBCS domains",
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
        classFaqJsonLd("cbcs"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Billing & Reimbursement", weight: "33%" },
  { name: "Coding & Coding Guidelines", weight: "32%" },
  { name: "Insurance Eligibility & Payer Requirements", weight: "20%" },
  { name: "Revenue Cycle & Regulatory Compliance", weight: "15%" },
];

export default function CbcsLandingPage() {
  return (
    <div data-theme="cbcs" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CBCS Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cbcs/dashboard"
            shortName="CBCS"
            subtitle="200 NHA CBCS billing and coding questions. Four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cbcs-mobile.png", desktop: "/landing/cbcs-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cbcs" />

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
                Six training sets: revenue cycle and compliance; insurance eligibility and payers; ICD-10-CM and documentation; CPT, HCPCS and E/M; claims and payment posting; and appeals, aging and collections. Missed questions come back until you master them.
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
                Four practice tests weighted like the real 100 scored questions, with a 70% readiness line. No question appears in more than one test, and every answer is explained.
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
                NHA&apos;s test plan sets how many of the 100 scored questions come from each domain, and every practice test here keeps those proportions at 50 questions. Billing and coding instructors can set Tigertest as practice at{" "}
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
                src={getTigerAsset("cbcs", 3)}
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
            How to Pass the CBCS Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put billing first</h3>
              <p>
                Billing and reimbursement is the largest domain. Know the CMS-1500 items, the 837P and 835, NCCI and MUE edits, claim adjustment group and reason codes, and how to post payments, adjustments and take-backs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the coding rules, not the code books</h3>
              <p>
                The exam gives you what each coding question needs, so it tests judgment: ICD-10-CM conventions and outpatient guidelines, sequencing, modifiers, place of service and how E/M levels are chosen.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know who pays and what the patient owes</h3>
              <p>
                Practice coordination of benefits (the birthday rule, dependent and active-employee rules), Medicare parts and ABN options, and deductible, coinsurance and out-of-pocket math until it is quick.
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
          CBCS Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cbcs" />
        </div>
      </div>

      <ExamSampleQuestions examId="cbcs" />

      <ExamRelatedTests examId="cbcs" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CBCS Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the CBCS exam.</p>
          <ExamLandingCTA dashboardHref="/cbcs/dashboard" />
        </div>
      </div>
    </div>
  );
}

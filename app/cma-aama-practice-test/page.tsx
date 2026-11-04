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

const title = "CMA (AAMA) Practice Test 2026 - Free Medical Assistant Exam Questions";
const metaDescription =
  "Free CMA (AAMA) practice test: 200 original questions on the AAMA content outline, four 50-question mock exams and six training sets, every answer explained.";
const description =
  "Free practice for the CMA (AAMA) Certification Exam for medical assistants: 200 original questions written from the AAMA Content Outline. Four 50-question mock exams weighted like the real exam's clinical, general and administrative sections, and six training sets covering patient intake, safety and first aid, procedures, lab tests, pharmacology, law and ethics, communication, billing, coding and scheduling.";

const faqs = [
  {
    q: "What is the CMA (AAMA) exam?",
    a: "It is the certification exam of the Certifying Board of the American Association of Medical Assistants (AAMA). Passing it earns the CMA (AAMA) credential, Certified Medical Assistant. Candidates are usually students or graduates of a CAAHEP- or ABHES-accredited medical assisting program, and the credential is recertified every 60 months by continuing education or by exam.",
  },
  {
    q: "How many questions are on the CMA (AAMA) exam?",
    a: "The exam has 200 multiple-choice questions on a computer: 180 are scored and 20 are unscored pretest questions. They are given in four 40-minute segments, 160 minutes of test time, with optional breaks between segments. You take it at a PSI test center or by live remote proctoring.",
  },
  {
    q: "What score do you need to pass the CMA (AAMA) exam?",
    a: "Scores are reported on a scale of 200 to 800, and the AAMA lists the minimum passing score as 405. That is a scaled score, not a percentage, so the 70 percent line on these practice tests is a readiness target, not the official standard. The Certifying Board can change the passing score after a standard-setting study.",
  },
  {
    q: "What is on the CMA (AAMA) exam?",
    a: "Under the current AAMA content outline, the 180 scored questions are Clinical Competency 106 (59 percent: patient intake and discharge, safety and infection control, procedures and examinations, pharmacology), General 38 (21 percent: legal and ethical issues, communication) and Administrative 36 (20 percent: billing, coding and insurance, scheduling and health information management). Each 50-question practice test here keeps that balance.",
  },
  {
    q: "Are these the real CMA (AAMA) exam questions?",
    a: "No. Every question is original, written by Tigertest from the AAMA's published content outline, so it covers the same knowledge without copying the exam. ECG strips, growth charts and other pictures are described in words, so image-based items are not modelled. Tigertest is not affiliated with the AAMA or its Certifying Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cma practice test, cma aama practice test, certified medical assistant practice exam, aama cma exam questions, medical assistant certification practice test, cma exam 2026, cma aama review questions, aama content outline",
  alternates: {
    canonical: `${siteUrl}/cma-aama-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cma-aama-practice-test`,
    images: [{ url: shareImageUrl("cma"), width: 1200, height: 630, alt: "Tigertest free CMA (AAMA) practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cma")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CMA (AAMA) Practice Test",
      description,
      url: `${siteUrl}/cma-aama-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CMA (AAMA) practice questions",
        "4 mock exams of 50 questions weighted like the AAMA content outline",
        "6 training sets by content area",
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
        classFaqJsonLd("cma"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Clinical Competency", weight: "59%" },
  { name: "General (legal, ethics, communication)", weight: "21%" },
  { name: "Administrative", weight: "20%" },
];

export default function CmaLandingPage() {
  return (
    <div data-theme="cma" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CMA (AAMA) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cma-aama/dashboard"
            shortName="CMA (AAMA)"
            subtitle="200 original questions on the AAMA content outline: clinical skills, pharmacology, law and ethics, communication, billing and scheduling. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cma-mobile.png", desktop: "/landing/cma-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cma" />

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
                Six training sets follow the AAMA content outline: patient intake; safety, infection control and first aid; procedures and anatomy; lab tests and pharmacology; law, ethics and communication; and billing, coding and scheduling. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted like the 180 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the AAMA Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AAMA publishes how many of the 180 scored questions come from each section, and every mock exam here keeps that balance, scaled to 50 questions: 29 clinical, 11 general and 10 administrative. Clinical competency is well over half the exam. Medical assisting program instructors can set Tigertest as CMA review at{" "}
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
                src={getTigerAsset("cma", 1)}
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
            How to Pass the CMA (AAMA) Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put clinical skills first</h3>
              <p>
                Clinical competency is 59% of the scored questions. Know normal vital signs by age, exam positions, sterile technique, specimen handling, common lab values and the basics of each body system.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice the dosage math</h3>
              <p>
                Metric conversions, tablets and liquid doses, and weight-based doses all come up, along with injection sites, needle sizes and routes. Work each problem on paper until the setup is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip law and the front office</h3>
              <p>
                General and administrative questions are about 40% of the exam. Learn HIPAA and consent, the torts and legal terms, drug schedules, CPT, ICD-10-CM and HCPCS, the insurance programs and how claims are posted and followed up.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 70% or better on every mock exam before your exam date. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CMA (AAMA) Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cma" />
        </div>
      </div>

      <ExamRelatedTests examId="cma" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CMA (AAMA) Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every section of the AAMA content outline.</p>
          <ExamLandingCTA dashboardHref="/cma-aama/dashboard" />
        </div>
      </div>
    </div>
  );
}

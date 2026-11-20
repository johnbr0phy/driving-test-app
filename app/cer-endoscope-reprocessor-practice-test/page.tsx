import "@/lib/banks/hspacer";
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

const title = "Free CER Practice Test 2026 - HSPA Certified Endoscope Reprocessor Questions";
const metaDescription =
  "Free-to-start CER practice test: 200 original questions on the HSPA Certified Endoscope Reprocessor outline, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the Healthcare Sterile Processing Association (HSPA) Certified Endoscope Reprocessor (CER) exam: 200 original questions written from HSPA's published exam content outline and CDC's flexible endoscope reprocessing guidance. Four 50-question practice tests weighted like the real exam's seven sections, and five training sets covering microbiology and endoscope design, work area design and manual cleaning, high-level disinfection and sterilization, handling and storage, and tracking, repair and human factors.";

const faqs = [
  {
    q: "What is the HSPA CER exam?",
    a: "It is the certification exam for the Certified Endoscope Reprocessor credential from the Healthcare Sterile Processing Association (HSPA). It covers pre-cleaning, leak testing, manual cleaning, inspection, high-level disinfection or sterilization, transport and storage of endoscopes. CER is a standalone certification, so the CRCST is not required, but HSPA asks for at least three months of hands-on endoscope reprocessing experience within the past three years.",
  },
  {
    q: "How many questions are on the CER exam?",
    a: "HSPA's certification handbook gives the CER exam 150 multiple-choice questions: 125 scored and 25 unscored pretest questions mixed in so they cannot be told apart. It is taken on a computer at a Prometric test center, there is no paper version, and candidates have 3 hours. Questions can be marked for review and changed later in the exam.",
  },
  {
    q: "What score do you need to pass the CER exam?",
    a: "HSPA does not publish a percentage. Pass or fail is decided by the number of scored questions answered correctly, against a passing point set by the Angoff procedure with the Beuk compromise and approved by the Certification Council. Result reports show each section as At or Above, Below or Well Below, and HSPA does not give percentage scores. The 70 percent line on these practice tests is a readiness target, not HSPA's standard.",
  },
  {
    q: "What is on the CER exam?",
    a: "HSPA's content outline has seven sections. Endoscope processing steps is the largest at 32 percent, from point-of-use care and leak testing through high-level disinfection, drying, sterilization, documentation and recalls. Handling, transport and storage is 16 percent, microbiology and infection control and work area design are 12 percent each, endoscope design and endoscope tracking, repair and maintenance are 10 percent each, and human factors is 8 percent. Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real CER exam questions?",
    a: "No. Every question is original, written by Tigertest from HSPA's published content outline and from public guidance such as CDC's Essential Elements of a Reprocessing Program for Flexible Endoscopes. Always follow the manufacturer's instructions for use for each scope and product. Tigertest is not affiliated with the Healthcare Sterile Processing Association.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cer practice test, cer exam, hspa cer practice test, certified endoscope reprocessor practice exam, endoscope reprocessing certification, cer exam questions 2026, hspa endoscope exam, flexible endoscope reprocessing test",
  alternates: {
    canonical: `${siteUrl}/cer-endoscope-reprocessor-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cer-endoscope-reprocessor-practice-test`,
    images: [{ url: shareImageUrl("hspacer"), width: 1200, height: 630, alt: "Tigertest free CER practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hspacer")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CER (HSPA) Practice Test",
      description,
      url: `${siteUrl}/cer-endoscope-reprocessor-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hspacer"),
      featureList: [
        "200 CER (HSPA) practice questions",
        "4 practice tests of 50 questions weighted like the HSPA CER content outline",
        "5 training sets by outline section",
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
        classFaqJsonLd("hspacer"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Endoscope Processing Steps", weight: "32%" },
  { name: "Endoscope Handling, Transport and Storage", weight: "16%" },
  { name: "Microbiology and Infection Control", weight: "12%" },
  { name: "Work Area Design", weight: "12%" },
  { name: "Endoscope Purpose, Design and Structure", weight: "10%" },
  { name: "Endoscope Tracking, Repair and System Maintenance", weight: "10%" },
  { name: "Human Factors That Impact Endoscope Systems", weight: "8%" },
];

export default function HspaCerLandingPage() {
  return (
    <div data-theme="hspacer" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CER Endoscope Reprocessor Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cer/dashboard"
            shortName="CER"
            subtitle="200 HSPA CER questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/hspacer-mobile.png", desktop: "/landing/hspacer-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hspacer" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Outline Section</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the HSPA CER outline: microbiology and endoscope design; work area and manual cleaning; disinfection and sterilization; handling, transport and storage; and tracking, repair and human factors. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the seven sections of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the HSPA CER Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                HSPA publishes the weight of each of the seven sections, and every practice test here keeps that balance, scaled to 50 questions: 16 on the processing steps, 8 on handling and storage, 6 each on microbiology and work area design, 5 each on design and tracking, and 4 on human factors. Sterile processing program instructors can set Tigertest as CER review at{" "}
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
                src={getTigerAsset("hspacer", 3)}
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
            How to Pass the CER Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the processing steps</h3>
              <p>
                Processing steps are 32% of the exam. Know the order from point-of-use pre-cleaning and leak testing through manual cleaning, inspection, high-level disinfection, rinsing, alcohol flush, drying and documentation, and why each step comes where it does.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the scope you are holding</h3>
              <p>
                Learn the parts of a flexible endoscope, from the control head valves and biopsy port to the bending section and light guide connector, and why channels and elevators are hard to clean. Know the Spaulding classes and which scopes and accessories need sterilization.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip storage and records</h3>
              <p>
                Handling, storage, tracking and human factors are over a third of the exam. Know cabinet storage, hang time set by risk assessment, ready-for-use cues, the scope and patient identifiers in every record, loaner and repair tracking, and when competency is checked.
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
          CER Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hspacer" />
        </div>
      </div>

      <ExamSampleQuestions examId="hspacer" />

      <ExamRelatedTests examId="hspacer" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CER Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every section of the HSPA CER content outline.</p>
          <ExamLandingCTA dashboardHref="/cer/dashboard" />
        </div>
      </div>
    </div>
  );
}

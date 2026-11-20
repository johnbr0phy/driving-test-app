import "@/lib/banks/waterop";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
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

const title = "Free Water Treatment Operator Class I Practice Test 2026";
const metaDescription =
  "Water treatment operator Class I (Grade 1) exam practice, free to start: 200 original questions on treatment, disinfection and CT, lab tests, pumps and equipment, source water and safety, with the water math worked out.";
const description =
  "Practice for the Class I (Grade 1) water treatment operator certification exam, free to start: 200 original questions written from Water Professionals International's (formerly ABC's) Need-to-Know Criteria and formula table, EPA drinking water rules and OSHA safety rules. Four 50-question practice tests weighted like the WPI standardized exam and five training sets: coagulation and filtration; disinfection and chemical feed; laboratory analysis; equipment operation and maintenance; and source water and safety.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "water treatment operator practice test, water treatment class 1 practice test, grade 1 water operator exam, abc water treatment exam, wpi water treatment exam, water operator certification practice test, drinking water operator exam questions, water treatment math",
  alternates: {
    canonical: `${siteUrl}/water-treatment-operator-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/water-treatment-operator-practice-test`,
    images: [{ url: shareImageUrl("waterop"), width: 1200, height: 630, alt: "Tigertest water treatment operator practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("waterop")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the water treatment operator Class I exam?",
    a: "It is the entry-level certification exam for operators of drinking water treatment plants. Each state runs its own operator certification program, and many use the standardized exam written by Water Professionals International (WPI), formerly the Association of Boards of Certification (ABC). Some states call the first level Grade 1, Class D or another name.",
  },
  {
    q: "How many questions are on the Class I water treatment exam?",
    a: "WPI's 2025 Need-to-Know Criteria give the standardized Class I exam 100 scored questions plus up to 10 unscored pre-test questions. About 10% are calculations, printed in US and metric units, and WPI's formula/conversion table is provided. Time limits and the passing score are set by each state; North Carolina, for example, requires 70 percent, which is the readiness line used here.",
  },
  {
    q: "What does the Class I water treatment exam cover?",
    a: "WPI lists five content areas: Treatment Process 31 questions, Equipment Operation and Maintenance 26, Laboratory Analysis 16, Source Water Characteristics 15, and Security, Safety, and Administrative Procedures 12. Each practice test here follows those weights: 16 treatment, 13 equipment, 8 lab, 7 source water and 6 safety and administration.",
  },
  {
    q: "What math is on the water treatment exam?",
    a: "Expect chemical feed in pounds per day (dose x MGD x 8.34 / purity), detention time, filter loading and backwash rates, CT, hypochlorite strength and dilution, pressure and head, pump horsepower and well drawdown. Every calculation here uses the formulas and constants on WPI's formula/conversion table and shows the working in its explanation.",
  },
  {
    q: "Are these the real WPI or ABC exam questions?",
    a: "No. Every question is original, written by Tigertest from WPI's Need-to-Know Criteria and formula table, the EPA drinking water regulations in 40 CFR 141 and 143, OSHA safety rules, and EPA and Department of Energy guidance. Tigertest is not affiliated with Water Professionals International, and no WPI, ABC, AWWA or CSUS study material or exam question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Water Treatment Operator Class I Practice Test",
      description,
      url: `${siteUrl}/water-treatment-operator-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("waterop"),
      featureList: [
        "200 water treatment operator practice questions",
        "4 practice tests of 50 questions",
        "5 training sets by topic",
        "Water math worked step by step",
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
        classFaqJsonLd("waterop"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Treatment Process", weight: "31%" },
  { name: "Equipment Operation & Maintenance", weight: "26%" },
  { name: "Laboratory Analysis", weight: "16%" },
  { name: "Source Water Characteristics", weight: "15%" },
  { name: "Security, Safety & Administration", weight: "12%" },
];

export default function WaterOpLandingPage() {
  return (
    <div data-theme="waterop" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Water Treatment Operator Class I Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/water-treatment-operator/dashboard"
            shortName="Water Treatment Class I"
            subtitle="200 Class I water treatment questions and four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/waterop-mobile.png", desktop: "/landing/waterop-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="waterop" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets in the Need-to-Know Criteria&apos;s order: coagulation and filtration; disinfection and chemical feed; laboratory analysis; equipment; and source water and safety. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, half the length of the real 100-question exam, weighted by WPI&apos;s five content areas, each with a 70% readiness line. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on WPI&apos;s Need-to-Know Criteria
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                WPI publishes how many of the 100 Class I questions come from each content area. Each 50-question practice test follows it: 16 treatment process, 13 equipment, 8 laboratory, 7 source water and 6 security, safety and administration.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("waterop", 3)}
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
            How to Pass the Class I Water Treatment Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with the treatment process</h3>
              <p>
                It is the biggest area, nearly a third of the exam. Know what coagulation, flocculation, settling and filtration each do, the 0.3 and 1 NTU turbidity limits, how backwashing and filter-to-waste work, and how chlorine chemistry changes with pH.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Drill the water math</h3>
              <p>
                Pounds per day from dose, flow and 8.34, detention time, filter loading, backwash rise rate, CT, dilution with C1V1 = C2V2, feet of head from psi and pump horsepower with 3,960. Work each one with the formula table open, the way you will on exam day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the equipment you run</h3>
              <p>
                Equipment is a quarter of the exam: centrifugal and metering pumps, cavitation, packing and seals, valves and backflow devices, storage tanks, chemical feeders, SCADA and online analyzers, and preventive maintenance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip the lab and the rules</h3>
              <p>
                Sampling and holding times, turbidity, chlorine residual, pH, alkalinity and hardness tests, coliform repeat sampling, MCLs and public notice tiers, confined space and lockout. Then take the 50-question tests and aim for 85% before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Water Treatment Operator Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="waterop" />
        </div>
      </div>

      <ExamSampleQuestions examId="waterop" />

      <ExamRelatedTests examId="waterop" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Water Operator Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on all five Class I content areas.</p>
          <ExamLandingCTA dashboardHref="/water-treatment-operator/dashboard" />
        </div>
      </div>
    </div>
  );
}

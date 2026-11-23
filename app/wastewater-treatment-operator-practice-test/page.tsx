import "@/lib/banks/wastewaterop";
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

const title = "Free Wastewater Treatment Operator Class I Practice Test 2026";
const metaDescription =
  "Wastewater treatment operator Class I (Grade 1) exam practice, free to start: 200 original questions on plant equipment, activated sludge, ponds, disinfection, solids, lab tests, NPDES permits and safety, with F/M, SVI and feed rate math worked out.";
const description =
  "Practice for the Class I (Grade 1) wastewater treatment operator certification exam, free to start: 200 original questions written from Water Professionals International's (formerly ABC's) Need-to-Know Criteria and formula table, EPA NPDES, secondary treatment, test method and biosolids rules and OSHA guidance. Four 50-question practice tests weighted like the WPI standardized exam and five training sets: treatment unit equipment; pumps, power and instruments; activated sludge, ponds and fixed film; clarifiers, disinfection and solids; and lab, safety and permits.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "wastewater treatment operator practice test, wastewater class 1 practice test, grade 1 wastewater operator exam, abc wastewater exam, wpi wastewater exam, wastewater operator certification practice test, wwtp operator exam questions, wastewater math",
  alternates: {
    canonical: `${siteUrl}/wastewater-treatment-operator-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/wastewater-treatment-operator-practice-test`,
    images: [{ url: shareImageUrl("wastewaterop"), width: 1200, height: 630, alt: "Tigertest wastewater treatment operator practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("wastewaterop")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the wastewater treatment operator Class I exam?",
    a: "It is the entry-level certification exam for operators of wastewater treatment plants. Each state runs its own operator certification program, and many use the standardized exam written by Water Professionals International (WPI), formerly the Association of Boards of Certification (ABC). Some states call the first level Grade 1, Class D or another name, and some use their own exams instead.",
  },
  {
    q: "How many questions are on the Class I wastewater treatment exam?",
    a: "WPI's 2025 Need-to-Know Criteria give the standardized Class I exam 100 scored questions plus up to 10 unscored pre-test questions. About 10% are calculations, printed in US and metric units, and WPI's formula/conversion table is provided. Time limits vary by state. WPI reports a scaled score, and 70 scaled score units is the pass mark on its 2025 exams, which is not the same as 70% correct; states that write their own exams set their own pass marks. 70% is the readiness line used here.",
  },
  {
    q: "What does the Class I wastewater treatment exam cover?",
    a: "WPI lists four content areas: Equipment Evaluation, Maintenance and/or Operation 39 questions, Treatment Process Evaluation and Adjustment 38, Security, Safety, and Administrative Procedures 13, and Laboratory Analysis 10. Each practice test here follows those weights: 20 equipment, 19 treatment process, 6 safety and administration and 5 laboratory.",
  },
  {
    q: "What math is on the wastewater exam?",
    a: "Nine of the treatment process questions and one lab question are calculations in WPI's outline. Expect F/M ratio, SVI, mean cell residence time, return sludge rate, detention time, surface overflow rate, trickling filter loading, chlorine and chemical feed in pounds per day (dose x MGD x 8.34 / purity), percent removal, volatile solids reduction and BOD. Every calculation here uses the formulas on WPI's formula/conversion table and shows the working in its explanation.",
  },
  {
    q: "Are these the real WPI or ABC exam questions?",
    a: "No. Every question is original, written by Tigertest from WPI's Need-to-Know Criteria and formula table, the EPA rules in 40 CFR 122, 133, 136 and 503, OSHA's hydrogen sulfide guidance and EPA fact sheets. Tigertest is not affiliated with Water Professionals International, and no WPI, ABC, CSUS, WEF or AWWA study material or exam question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Wastewater Treatment Operator Class I Practice Test",
      description,
      url: `${siteUrl}/wastewater-treatment-operator-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("wastewaterop"),
      featureList: [
        "200 wastewater treatment operator practice questions",
        "4 practice tests of 50 questions",
        "5 training sets by topic",
        "Plant math worked step by step",
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
        classFaqJsonLd("wastewaterop"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Equipment Evaluation, Maintenance & Operation", weight: "39%" },
  { name: "Treatment Process Evaluation & Adjustment", weight: "38%" },
  { name: "Security, Safety & Administration", weight: "13%" },
  { name: "Laboratory Analysis", weight: "10%" },
];

export default function WastewaterOpLandingPage() {
  return (
    <div data-theme="wastewaterop" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Wastewater Treatment Operator Class I Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/wastewater-treatment-operator/dashboard"
            shortName="Wastewater Treatment Class I"
            subtitle="200 Class I wastewater treatment questions and four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/wastewaterop-mobile.png", desktop: "/landing/wastewaterop-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="wastewaterop" />

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
                Five training sets in the Need-to-Know Criteria&apos;s order: treatment unit equipment; pumps, power and instruments; activated sludge, ponds and fixed film; clarifiers, disinfection and solids; and lab, safety and permits. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, half the length of the real 100-question exam, weighted by WPI&apos;s four content areas, each with a 70% readiness line. No question appears in more than one test, and every answer comes with a short explanation.
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
                WPI publishes how many of the 100 Class I questions come from each content area. Each 50-question practice test follows it: 20 equipment, 19 treatment process, 6 security, safety and administration and 5 laboratory.
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
                src={getTigerAsset("wastewaterop", 3)}
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
            How to Pass the Class I Wastewater Treatment Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the equipment you run</h3>
              <p>
                Equipment is the biggest area, 39 of 100 questions, and almost all of it is applied: bar screens and grinders, grit and equalization, clarifier drives and weirs, blowers and diffusers, trickling filter distributors, UV and dechlorination systems, belt presses, sewage pumps, check and plug valves, MCCs, VFDs, level and DO instruments and standby power.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the process, then adjust it</h3>
              <p>
                Treatment process questions ask what to change when something looks wrong: bulking and foaming, rising sludge, pin floc, septic primary sludge, pond DO swings, ponding and filter flies, chlorine residual and dechlorination, and polymer and dewatering.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Drill the plant math</h3>
              <p>
                Pounds per day from flow, concentration and 8.34, F/M, SVI, MCRT, return rate, detention time, surface overflow rate, trickling filter loading, percent removal and volatile solids reduction. Work each one with the formula table open, the way you will on exam day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip the lab, safety and permit rules</h3>
              <p>
                Sample holding times, BOD and solids tests, hydrogen sulfide and confined spaces, and NPDES duties such as 24-hour noncompliance reports, bypass and upset, DMRs and record keeping. Then take the 50-question tests and aim for 85% before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Wastewater Treatment Operator Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="wastewaterop" />
        </div>
      </div>

      <ExamSampleQuestions examId="wastewaterop" />

      <ExamRelatedTests examId="wastewaterop" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Wastewater Operator Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on all four Class I content areas.</p>
          <ExamLandingCTA dashboardHref="/wastewater-treatment-operator/dashboard" />
        </div>
      </div>
    </div>
  );
}

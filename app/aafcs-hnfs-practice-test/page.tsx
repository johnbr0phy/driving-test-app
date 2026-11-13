import "@/lib/banks/aafcs";
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

const title = "AAFCS HNFS Practice Test 2026 - Hospitality, Nutrition, and Food Science Exam";
const metaDescription =
  "Free AAFCS HNFS practice: 200 original questions on the Hospitality, Nutrition, and Food Science exam specifications, four 50-question practice tests weighted like the real exam, every answer explained.";
const description =
  "Free practice for the AAFCS Hospitality, Nutrition, and Food Science (HNFS) exam, the competency exam behind the CFCS-HNFS credential and one of the AAFCS exams Texas uses for family and consumer sciences teacher certification (test 201): 200 original questions written from the AAFCS exam specifications. Four 50-question practice tests weighted like the real exam, and four training sets covering foundations of the FCS profession and careers, nutrients, diet and the Dietary Guidelines, food science and food labels, food safety and the FDA Food Code, food preparation and kitchen safety, and hospitality, lodging and food service operations.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "aafcs hnfs practice test, hospitality nutrition and food science exam, aafcs exam practice, cfcs-hnfs, texas fcs 201 practice test, hnfs 201, family and consumer sciences certification exam, fcs teacher certification practice test",
  alternates: {
    canonical: `${siteUrl}/aafcs-hnfs-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/aafcs-hnfs-practice-test`,
    images: [{ url: shareImageUrl("aafcs"), width: 1200, height: 630, alt: "Tigertest free AAFCS HNFS practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aafcs")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the AAFCS HNFS exam?",
    a: "It is the American Association of Family and Consumer Sciences (AAFCS) competency exam in Hospitality, Nutrition, and Food Science. Passing it is the first step to the CFCS-HNFS professional credential, which also needs a bachelor's degree, and Texas uses it as test 201 for family and consumer sciences teacher certification. It is a professional exam, not one of the high school Pre-PAC assessments.",
  },
  {
    q: "How many questions are on the HNFS exam and what score do you need?",
    a: "Every item is a four-option multiple-choice question with one correct answer, and some items are unscored research questions. The Texas administration lists 100 selected-response questions in 3 hours of testing time. AAFCS reports a scaled score, and the passing score is 240 on a scale up to 300. Because forms are equated, no fixed percent is published; the practice tests here use 80 percent as a readiness line.",
  },
  {
    q: "What does the HNFS exam cover?",
    a: "AAFCS lists four standards: Foundations of the FCS Profession (15%), Careers (10%), Nutrition, Wellness, and Food Science (40%), and Hospitality, Lodging and Food Service (35%). Nutrition and food service together make up three quarters of the exam, so nutrients, the Dietary Guidelines, food science, the FDA Food Code and kitchen and hotel operations carry the most weight.",
  },
  {
    q: "Is this the Pre-PAC Nutrition, Food, and Wellness assessment?",
    a: "No. Pre-PAC is AAFCS's family of pre-professional assessments for high school and post-secondary CTE students, and its Nutrition, Food, and Wellness assessment has 70 scored items with no time limit. HNFS is the professional exam for FCS graduates and teachers. The two share a lot of nutrition and food safety content, so students preparing for Pre-PAC can still use these questions, but the weights here follow HNFS.",
  },
  {
    q: "Are these the real AAFCS exam questions?",
    a: "No. Every question is original, written by Tigertest from the AAFCS exam specifications, the FCS Body of Knowledge, the Dietary Guidelines for Americans 2025-2030, the FDA Food Code and other primary sources. It is free practice, not affiliated with AAFCS or Pearson.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AAFCS HNFS Practice Test",
      description,
      url: `${siteUrl}/aafcs-hnfs-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("aafcs"),
      featureList: [
        "200 AAFCS HNFS practice questions",
        "4 practice tests of 50 questions weighted like the real exam",
        "4 training sets by topic",
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
        classFaqJsonLd("aafcs"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Foundations of the FCS Profession", weight: "15%" },
  { name: "Careers", weight: "10%" },
  { name: "Nutrition, Wellness, and Food Science", weight: "40%" },
  { name: "Hospitality, Lodging and Food Service", weight: "35%" },
];

export default function AafcsHnfsLandingPage() {
  return (
    <div data-theme="aafcs" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AAFCS HNFS Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/aafcs-hnfs/dashboard"
            shortName="AAFCS HNFS"
            subtitle="200 original questions on the AAFCS Hospitality, Nutrition, and Food Science exam: the FCS profession and careers, nutrients and the Dietary Guidelines, food science, the FDA Food Code, and kitchen and hotel operations. Four 50-question practice tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aafcs-mobile.png", desktop: "/landing/aafcs-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aafcs" />

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
                Four training sets: the FCS profession and careers; nutrition, wellness and diet; food science and food safety; and food preparation and hospitality operations. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions in the real exam&apos;s proportions, each with an 80% readiness line. No question appears in more than one test, and every calorie, BMI, food cost and hotel revenue calculation is worked through.
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
                Built on the AAFCS Exam Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AAFCS weights the exam across four standards. Each practice test keeps the same balance: 7 foundations, 5 careers, 20 nutrition, wellness and food science, and 18 hospitality, lodging and food service questions in every 50.
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
                src={getTigerAsset("aafcs", 1)}
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
            How to Pass the AAFCS HNFS Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Spend most of your time on nutrition and food service</h3>
              <p>
                Nutrition, Wellness, and Food Science is 40% of the exam and Hospitality, Lodging and Food Service is 35%. Know nutrient functions and deficiency diseases, the current Dietary Guidelines, and how heat, acid and enzymes change food.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the Food Code numbers</h3>
              <p>
                Cold holding at 41°F or below, hot holding at 135°F or above, poultry to 165°F, ground meat to 155°F, fish and steaks to 145°F, and two-stage cooling from 135°F to 70°F in 2 hours and to 41°F within 6. Know the nine major allergens and the seven HACCP principles.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the everyday math</h3>
              <p>
                Calories from grams, BMI, recipe conversion factors, food cost percentage, occupancy, average daily rate and RevPAR all appear in food service and hospitality work. Work each one by hand until it is quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know the profession, not just the content</h3>
              <p>
                The foundations and careers standards ask about the FCS Body of Knowledge, the field&apos;s history, Perkins V and programs of study, advisory committees, FCCLA and work-based learning. Aim for 85% or better on every practice test before you sit the real one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AAFCS HNFS Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="aafcs" />
        </div>
      </div>

      <ExamSampleQuestions examId="aafcs" />

      <ExamRelatedTests examId="aafcs" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the AAFCS HNFS Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all four AAFCS HNFS standards.</p>
          <ExamLandingCTA dashboardHref="/aafcs-hnfs/dashboard" />
        </div>
      </div>
    </div>
  );
}

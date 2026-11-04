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

const title = "NBDHE Practice Test 2026 - Free Dental Hygiene Board Questions";
const metaDescription =
  "Free NBDHE practice test: 200 original dental hygiene board questions on the JCNDE test specifications, including patient case scenarios, four 50-question mock exams and six training sets, every answer explained.";
const description =
  "Free practice for the National Board Dental Hygiene Examination (NBDHE): 200 original questions written from the JCNDE test specifications. Four 50-question mock exams that mix discipline-based questions with text patient cases, and six training sets covering the scientific basis, patient assessment, radiography, care planning, periodontics, preventive agents, supportive services, professional responsibility, research and community health.";

const faqs = [
  {
    q: "What is the NBDHE?",
    a: "The National Board Dental Hygiene Examination is the written board exam of the Joint Commission on National Dental Examinations (JCNDE). It tests the knowledge a dental hygienist needs to practice safely, and US licensing jurisdictions use it as part of dental hygiene licensure, alongside a clinical exam and any state law exam.",
  },
  {
    q: "How many questions are on the NBDHE and how is it scored?",
    a: "The NBDHE has 350 multiple-choice questions in two sessions: 200 discipline-based questions in 3 hours 30 minutes, then 150 case-based questions on 12 to 15 patient cases in 4 hours, about 9 hours with breaks. Results are reported as pass or fail. Scale scores run from 49 to 99 and 75 is the minimum passing score, which is not the same as 75 percent correct, so the 75 percent line on these practice tests is a readiness target. There is no penalty for guessing.",
  },
  {
    q: "What is on the NBDHE?",
    a: "Under the updated test specifications the JCNDE scheduled for November 2026, the 200 discipline-based questions are Scientific Basis for Dental Hygiene Practice 56, Provision of Clinical Dental Hygiene Services 124 and Research Principles and Community Health 20. The 150 case-based questions cover patient assessment, radiography, care planning, periodontal disease management, preventive agents, supportive treatment and professional responsibility for geriatric, periodontal, pediatric, special needs and medically compromised patients.",
  },
  {
    q: "How are the patient cases handled in this practice test?",
    a: "On the real NBDHE each case comes with a patient history, a dental chart, radiographs and clinical photographs, and several questions follow one patient. Here each case question opens with a short written patient box and the findings are described in words, so no images are shown. About a third of every mock exam is case questions; the real exam is closer to 43 percent.",
  },
  {
    q: "Are these the real NBDHE questions?",
    a: "No. Every question is original, written by Tigertest from the JCNDE's published test specifications, so it covers the same knowledge without copying the exam. Tigertest is not affiliated with the JCNDE or the American Dental Association, and this free practice does not replace your program's board review.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nbdhe practice test, dental hygiene board practice test, national board dental hygiene exam questions, nbdhe case study questions, dental hygiene boards 2026, nbdhe review, jcnde nbdhe specifications, rdh board exam practice",
  alternates: {
    canonical: `${siteUrl}/nbdhe-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nbdhe-practice-test`,
    images: [{ url: shareImageUrl("nbdhe"), width: 1200, height: 630, alt: "Tigertest free NBDHE practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nbdhe")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NBDHE Practice Test",
      description,
      url: `${siteUrl}/nbdhe-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 NBDHE practice questions, including patient case scenarios",
        "4 mock exams of 50 questions weighted on the JCNDE test specifications",
        "6 training sets by content area and patient type",
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
        classFaqJsonLd("nbdhe"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Scientific Basis", weight: "56 questions" },
  { name: "Clinical Dental Hygiene Services", weight: "124 questions" },
  { name: "Research and Community Health", weight: "20 questions" },
  { name: "Patient Cases", weight: "150 questions" },
];

export default function NbdheLandingPage() {
  return (
    <div data-theme="nbdhe" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NBDHE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nbdhe/dashboard"
            shortName="NBDHE"
            subtitle="200 original dental hygiene board questions on the JCNDE test specifications, with written patient cases: periodontics, radiography, pharmacology, prevention and more. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nbdhe-mobile.png", desktop: "/landing/nbdhe-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nbdhe" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Category</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six training sets follow the test specifications: the scientific basis; assessment, radiography and care planning; periodontics, prevention and supportive care; professional responsibility and community health; and two sets of patient cases. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each mixing discipline-based questions with written patient cases. Aim for 75% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the JCNDE Test Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The JCNDE publishes how many of the 350 questions come from each area. The counts below are the updated specifications scheduled for November 2026 (before the update they were 61, 115 and 24 for the discipline-based areas). Every mock exam here gives 17 of its 50 questions to written patient cases and spreads the rest across the discipline areas; the real exam leans a little more on cases. Dental hygiene program faculty can set Tigertest as board review at{" "}
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
                src={getTigerAsset("nbdhe", 1)}
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
            How to Pass the NBDHE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Practice reading the patient box</h3>
              <p>
                The case section is 150 questions. Read the age, medical history, medications and vital signs before the question, since they decide premedication, anesthetic choice, positioning and home care. If an area is blank, the guide says to treat it as unknown or not present.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know periodontal staging cold</h3>
              <p>
                Clinical services is the biggest discipline area. Calculate clinical attachment level and attached gingiva without hesitating, stage and grade periodontitis on the 2017 classification, and match each Gracey curette and furcation grade to its use.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Drill the numbers that come up</h3>
              <p>
                Local anesthetic doses in milligrams, maximum cartridges by weight, fluoride concentrations and the probably toxic dose, blood pressure categories and emergency drug doses are all quick points once you can work them on paper.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by area. Aim for 75% or better on every mock exam before your exam date. After each test, drill the questions you missed and retrain the weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NBDHE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nbdhe" />
        </div>
      </div>

      <ExamRelatedTests examId="nbdhe" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NBDHE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every area of the NBDHE test specifications.</p>
          <ExamLandingCTA dashboardHref="/nbdhe/dashboard" />
        </div>
      </div>
    </div>
  );
}

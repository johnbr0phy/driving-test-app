import "@/lib/banks/cen";
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

const title = "CEN Practice Test 2026 - Free Certified Emergency Nurse Exam Questions";
const metaDescription =
  "CEN practice test, free to start: 200 original questions on the BCEN content outline effective July 2026, four 50-question mock exams and five training sets, every answer explained.";
const description =
  "Free-to-start practice for the BCEN Certified Emergency Nurse (CEN) exam: 200 original questions written from the CEN Examination Content Outline effective July 2026. Four 50-question mock exams weighted like the real exam's eleven content areas, and five training sets covering cardiovascular, respiratory, neurological, gastrointestinal, GU and obstetric, mental health, medical, wound, HEENT, environmental and toxicology emergencies, communicable diseases and professional issues.";

const faqs = [
  {
    q: "What is the CEN exam?",
    a: "The Certified Emergency Nurse (CEN) exam is the certification exam of the Board of Certification for Emergency Nursing (BCEN). Passing it earns the CEN credential, which shows a registered nurse's knowledge of emergency nursing across every age group. The CEN is renewed every four years.",
  },
  {
    q: "How many questions are on the CEN exam?",
    a: "The exam has 175 multiple-choice items: 150 are scored and 25 are unscored pretest items you cannot tell apart. You have 180 minutes of seat time. It is taken by computer at a PSI test center or at home by live remote proctoring.",
  },
  {
    q: "What score do you need to pass the CEN exam?",
    a: "BCEN says candidates must answer 99 of the 150 scored items correctly, which is 66 percent. It is a raw count, not a curve. The practice tests here use the same 66 percent line. After a failed attempt you wait 90 days before retesting.",
  },
  {
    q: "What is on the CEN exam?",
    a: "Under the content outline in effect from July 2026, the 150 scored items cover eleven areas: cardiovascular 18, respiratory 17, neurological 17, gastrointestinal 14, genitourinary, gynecology and obstetrical 10, mental health 13, medical 15, musculoskeletal and wound 11, head, eye, ear, nose and throat 10, environment and toxicology emergencies and communicable diseases 13, and professional issues 12. Each 50-question practice test here keeps that balance.",
  },
  {
    q: "Are these the real CEN exam questions?",
    a: "No. Every question is original, written by Tigertest from BCEN's published content outline and current clinical guidance, so it covers the same knowledge without copying the exam. Rhythm strips and wounds are described in words. Tigertest is not affiliated with BCEN.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cen practice test, cen exam questions, certified emergency nurse practice exam, bcen cen practice test, cen review questions, emergency nursing certification practice test, cen exam 2026",
  alternates: {
    canonical: `${siteUrl}/cen-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cen-practice-test`,
    images: [{ url: shareImageUrl("cen"), width: 1200, height: 630, alt: "Tigertest free CEN practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cen")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CEN Practice Test",
      description,
      url: `${siteUrl}/cen-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cen"),
      featureList: [
        "200 CEN practice questions",
        "4 mock exams of 50 questions weighted like the BCEN content outline",
        "5 training sets by content area",
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
        classFaqJsonLd("cen"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Cardiovascular", weight: "12%" },
  { name: "Respiratory", weight: "11%" },
  { name: "Neurological", weight: "11%" },
  { name: "Medical", weight: "10%" },
  { name: "Gastrointestinal", weight: "9%" },
  { name: "Mental Health", weight: "9%" },
  { name: "Environment, Toxicology & Communicable Diseases", weight: "9%" },
  { name: "Professional Issues", weight: "8%" },
  { name: "Musculoskeletal & Wound", weight: "7%" },
  { name: "Genitourinary, Gynecology & Obstetrical", weight: "7%" },
  { name: "Head, Eye, Ear, Nose & Throat", weight: "7%" },
];

export default function CenLandingPage() {
  return (
    <div data-theme="cen" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CEN Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cen/dashboard"
            shortName="CEN"
            subtitle="200 original questions on the BCEN content outline effective July 2026: cardiac, respiratory, neuro, trauma, toxicology, triage and more. Four 50-question mock exams. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/cen-mobile.png", desktop: "/landing/cen-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cen" />

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
                Five training sets follow the BCEN content outline: cardiovascular and respiratory; neurological and gastrointestinal; GU, obstetric, mental health and medical; wounds, HEENT and toxicology; and professional issues. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted like the 150 scored items on the real exam. Aim for 66% or better, the real pass line. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the BCEN Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                BCEN publishes how many of the 150 scored items come from each of the eleven content areas, and every mock exam here keeps that balance, scaled to 50 questions. Educators running a CEN review course can set Tigertest as class practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the group misses most.
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
                src={getTigerAsset("cen", 3)}
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
            How to Pass the CEN Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with the big three</h3>
              <p>
                Cardiovascular, respiratory and neurological emergencies are 52 of the 150 scored items. Know ACS and its ECG territories, the arrest rhythms and what to do for each, tension pneumothorax, asthma and COPD, stroke timing and raised intracranial pressure.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the antidotes and the numbers</h3>
              <p>
                Toxicology and medical emergencies reward recall: naloxone, N-acetylcysteine, hydroxocobalamin, calcium for hyperkalemia, the Parkland formula, the rule of nines and the Glasgow Coma Scale. Work each calculation until the setup is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip professional issues</h3>
              <p>
                Twelve items cover triage, mass casualty, EMTALA, consent, forensic evidence, abuse reporting, drug diversion and workplace violence. These are easy points once you know the rules.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by content area. Aim for 66% or better on every mock exam before your exam date, then push higher. After each test, drill the questions you missed and retrain the weakest area.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CEN Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cen" />
        </div>
      </div>

      <ExamSampleQuestions examId="cen" />

      <ExamRelatedTests examId="cen" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CEN Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every area of the BCEN content outline.</p>
          <ExamLandingCTA dashboardHref="/cen/dashboard" />
        </div>
      </div>
    </div>
  );
}

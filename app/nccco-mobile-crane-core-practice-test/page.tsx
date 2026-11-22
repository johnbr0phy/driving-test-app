import "@/lib/banks/nccco";
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
const path = "/nccco-mobile-crane-core-practice-test";

const title = "Free NCCCO Mobile Crane Core Practice Test 2026";
const metaDescription =
  "200 original CCO Mobile Crane Core knowledge questions on site conditions, operations, inspections and illustrative load charts. Free to start.";
const description =
  "Practice for the CCO Mobile Crane Operator Core examination: 200 original Core knowledge questions on site conditions, operations, technical knowledge and illustrative load charts, written from the current CCO candidate handbook outline and OSHA construction crane rules. Four 50-question practice tests and four training sets. Core knowledge practice only; specialty written exams and practical skills are not simulated.";

const faqs = [
  { q: "How many questions are on the CCO Mobile Crane Core exam?", a: "The current CCO Mobile Crane Operator handbook lists 95 Core questions in 90 minutes, without a calculator. Tigertest provides four shorter 50-question practice tests, not full-length exam simulations." },
  { q: "Does this cover the entire mobile crane certification?", a: "No. This is Core knowledge practice. Certification also requires the applicable specialty written exam and practical exam. Specialty chart packages, practical demonstrations and exhaustive ASME standards coverage are not included here. Completing practice does not qualify you to operate a crane." },
  { q: "What score should I aim for?", a: "The practice pass line is a 70% study target, not an official CCO raw passing score or a prediction of your certification result. Review every missed question and study the current official handbook and reference materials." },
  { q: "Are these actual crane load charts or official exam questions?", a: "No. All questions and simplified chart exercises are original. Each chart problem supplies its own assumptions and ratings for study only. Never use these illustrative values for an actual lift; use the applicable manufacturer chart and procedures for the crane and configuration." },
  { q: "Is this practice free?", a: "It is free to start without an account. The first training sets and practice tests are free; the later ones require Premium. Saving progress across devices requires an account." },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nccco practice test, cco core exam, mobile crane operator practice test, crane operator certification questions",
  alternates: {
    canonical: `${siteUrl}${path}`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}${path}`,
    images: [{ url: shareImageUrl("nccco"), width: 1200, height: 630, alt: title }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nccco")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NCCCO Mobile Crane Core Practice Test",
      description,
      url: `${siteUrl}${path}`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nccco"),
      featureList: [
        "200 original CCO Mobile Crane Core practice questions",
        "4 practice tests of 50 questions across every domain",
        "4 training sets by domain",
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
        classFaqJsonLd("nccco"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Site", weight: "11 of 50" },
  { name: "Operations", weight: "14 of 50" },
  { name: "Technical Knowledge", weight: "12 of 50" },
  { name: "Load Charts", weight: "13 of 50" },
];

export default function NcccoLandingPage() {
  return (
    <div data-theme="nccco" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NCCCO Mobile Crane Core Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nccco/dashboard"
            shortName="NCCCO Core"
            subtitle="200 Core knowledge questions and four shorter practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/nccco-mobile.png", desktop: "/landing/nccco-desktop.png" }}
          />
          <p className="mt-10 max-w-2xl mx-auto rounded-xl border border-brand-border-light bg-white dark:bg-gray-900 p-5 text-gray-700 dark:text-gray-200">
            <strong>Core knowledge practice only.</strong> Specialty written exams and practical skills are not simulated. These 50-question tests are shorter than the official 95-question Core exam. Illustrative chart values are never for actual lifts.
          </p>
        </div>
      </div>

      <ExamFacts examId="nccco" />

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
                Start with the Site training set, then work through Operations, Technical Knowledge and Load Charts. Read each explanation and revisit missed questions until you have mastered them.
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
                Take the four fixed practice tests to check your understanding across the domains. They are shorter than the official 95-question Core exam, and 70% is a study target, not an official passing score.
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
                Weighted to the CCO Core Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The official outline weights are Site 22%, Operations 28%, Technical Knowledge 23% and Load Charts 27%. Whole questions in our shorter tests give 22%, 28%, 24% and 26%. Questions emphasize OSHA construction rules; applicable manufacturer procedures and industry-specific requirements still need separate study.
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
                src={getTigerAsset("nccco", 1)}
                alt="Tigertest construction safety tiger"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">We Just Launched</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Help us improve this new Core practice bank by reporting any unclear question through the app. We read every message and use it to improve every test.
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
            How to Prepare for the Core Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with configuration and operating area</h3>
              <p>Identify the crane configuration and operating area before selecting a chart rating.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Account for every deduction</h3>
              <p>Account for the block, rigging and any other stated deductions.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know safety devices from operational aids</h3>
              <p>Distinguish a required safety device from an operational aid with a permitted temporary alternative.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read the current handbook</h3>
              <p>Read the current CCO handbook and study the specialty and practical requirements separately.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NCCCO Mobile Crane Core Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="nccco" />
        </div>
      </div>

      <ExamSampleQuestions examId="nccco" count={4} />

      <ExamRelatedTests examId="nccco" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the Mobile Crane Core Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 original Core knowledge questions on site conditions, operations, technical knowledge and load charts.</p>
          <ExamLandingCTA dashboardHref="/nccco/dashboard" />
        </div>
      </div>
    </div>
  );
}

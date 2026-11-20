import "@/lib/banks/cct";
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

const title = "Free CCT Practice Test 2026 - CCI Cardiographic Technician Questions";
const metaDescription =
  "Free-to-start CCT practice test: 200 original questions on the CCI Certified Cardiographic Technician outline, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the Cardiovascular Credentialing International (CCI) Certified Cardiographic Technician (CCT) exam: 200 original questions written from CCI's published content outline and task list. Four 50-question practice tests weighted like the real exam, and five training sets covering patient preparation and the resting ECG, 12-lead analysis, sinus, atrial, junctional and AV block rhythms, ventricular and paced rhythms with interval measurement, and stress testing with ambulatory monitoring.";

const faqs = [
  {
    q: "What is the CCT exam?",
    a: "The Certified Cardiographic Technician (CCT) exam is Cardiovascular Credentialing International's (CCI) credential for technicians who record and review ECGs, Holter monitors and stress tests. To apply you need a high school diploma or GED and one of three qualifications: enrolled in or graduated from a cardiovascular or allied health program, working in cardiovascular technology or an AMA-recognized allied health field, or holding a degree in a science or physical health field.",
  },
  {
    q: "How many questions are on the CCT exam?",
    a: "The CCT is a two-hour computer-based exam with 130 questions, 110 of them scored and 20 unscored pretest items you cannot identify. You get 1 hour 50 minutes for the questions and 10 minutes for a tutorial and survey. Most items are single best answer, with some multiple response, hot spot and drag-and-place items. It is taken at Pearson VUE test centers.",
  },
  {
    q: "What score do you need to pass the CCT?",
    a: "CCI reports scores on a 0 to 900 scale, and 650 passes. A scaled score is not the percentage of questions answered correctly, so the 70 percent line on these practice tests is a readiness target, not CCI's rule. You get an unofficial result with a content-area breakdown at the test center.",
  },
  {
    q: "What does the CCT cover?",
    a: "CCI weights the exam by content area: rhythm analysis 40%, analyzing the 12-lead ECG 22%, performing the resting ECG (12-lead, 15-lead and modified leads) 14%, pre-procedural activities 10%, stress tests 10% and ambulatory monitoring (Holter, event and telemetry) 4%. These practice tests keep that balance across 50 questions.",
  },
  {
    q: "How is the CCT different from the NHA CET?",
    a: "Both test ECG technicians, but they come from different organizations. The CCT, from CCI, puts much more weight on rhythm analysis and 12-lead interpretation, including axis, bundle branch blocks, hypertrophy, infarction patterns and pacemaker rhythms. The NHA CET spends more of its questions on acquisition and patient care. Tigertest has a separate EKG technician (CET) practice test.",
  },
  {
    q: "Are these the real CCT exam questions?",
    a: "No. Every question is original, written by Tigertest from CCI's published outline and task list and from primary clinical sources such as the AHA/ACC/HRS ECG standards and guidelines and the AHA exercise testing standards. Rhythm strips are described in words, so practice with real tracings too. Tigertest is not affiliated with Cardiovascular Credentialing International.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cct practice test, cci cct practice test, cct exam questions, certified cardiographic technician practice test, cardiographic technician exam, cci ekg practice test, cct 2026",
  alternates: {
    canonical: `${siteUrl}/cct-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cct-practice-test`,
    images: [{ url: shareImageUrl("cct"), width: 1200, height: 630, alt: "Tigertest free CCT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cct")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CCT (CCI) Practice Test",
      description,
      url: `${siteUrl}/cct-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cct"),
      featureList: [
        "200 CCT (CCI) practice questions",
        "4 practice tests of 50 questions weighted like the CCI CCT content outline",
        "5 training sets by CCI content area",
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
        classFaqJsonLd("cct"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Rhythm Analysis", weight: "40%" },
  { name: "Analyzing the 12-Lead ECG", weight: "22%" },
  { name: "Performing the Resting ECG", weight: "14%" },
  { name: "Pre-Procedural Activities", weight: "10%" },
  { name: "Stress Tests", weight: "10%" },
  { name: "Ambulatory Monitoring", weight: "4%" },
];

export default function CctLandingPage() {
  return (
    <div data-theme="cct" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CCT (CCI) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cct/dashboard"
            shortName="CCT"
            subtitle="200 original questions on the CCI Certified Cardiographic Technician outline: rhythm analysis, 12-lead interpretation, resting ECG technique, stress testing and Holter monitoring, with every strip described in words. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/cct-mobile.png", desktop: "/landing/cct-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cct" />

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
                Five training sets cover every CCI content area: patient prep and the resting ECG; analyzing the 12-lead; sinus, atrial and AV block rhythms; ventricular and paced rhythms with intervals; and stress testing with ambulatory monitoring. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 110 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the CCI CCT Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CCI publishes the share of the exam each content area takes, and every practice test here keeps that balance, scaled to 50 questions. Rhythm analysis is the largest area, at 40%. Cardiographic and EKG technician program instructors can set Tigertest as CCT review at{" "}
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
                src={getTigerAsset("cct", 3)}
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
            How to Pass the CCT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Make rhythm analysis automatic</h3>
              <p>
                Rhythm analysis is 40% of the exam. Work every strip the same way: rate, regularity, P waves, PR interval and QRS width. Know sinus, atrial, junctional and ventricular rhythms, every AV block, and paced rhythms with undersensing, oversensing and failure to capture.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn to read the whole 12-lead</h3>
              <p>
                Analyzing the 12-lead is 22%. Find the axis from leads I and aVF, know the criteria for bundle branch and fascicular blocks, the voltage criteria for hypertrophy, and which leads show each infarct wall.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the procedures, not just the strips</h3>
              <p>
                Resting ECG technique, patient prep, stress testing and ambulatory monitoring together make up the rest. Learn lead reversal patterns, filter settings, right-sided and posterior leads, Bruce stages, the reasons to stop an exercise test, and the monitoring devices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by content area. Aim for 70% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest area, and practice on real tracings as well.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CCT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cct" />
        </div>
      </div>

      <ExamSampleQuestions examId="cct" />

      <ExamRelatedTests examId="cct" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CCT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every content area of the CCI CCT exam.</p>
          <ExamLandingCTA dashboardHref="/cct/dashboard" />
        </div>
      </div>
    </div>
  );
}

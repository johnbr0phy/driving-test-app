import "@/lib/banks/crat";
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

const title = "Free CRAT Practice Test 2026 - CCI Rhythm Analysis Technician Questions";
const metaDescription =
  "Free-to-start CRAT practice test: 200 original questions on the CCI Certified Rhythm Analysis Technician outline, four 50-question practice tests and six training sets, every answer explained.";
const description =
  "Practice for the Cardiovascular Credentialing International (CCI) Certified Rhythm Analysis Technician (CRAT) exam: 200 original questions written from CCI's published content outline and task list. Four 50-question practice tests weighted like the real exam, and six training sets covering starting monitoring and ECG quality, normal rhythms and cardiac A&P, atrial arrhythmias, junctional rhythms and AV blocks, ventricular rhythms and asystole, and paced rhythms, conduction delays, artifact and reporting findings.";

const faqs = [
  {
    q: "What is the CRAT exam?",
    a: "The Certified Rhythm Analysis Technician (CRAT) exam is Cardiovascular Credentialing International's (CCI) credential for monitor and telemetry technicians who watch, measure and report heart rhythms. To apply you need a high school diploma or GED and one of three qualifications: enrolled in or graduated from a cardiovascular or allied health program, working in cardiovascular technology or an AMA-recognized allied health field, or holding a degree in a science or physical health field.",
  },
  {
    q: "How many questions are on the CRAT exam?",
    a: "The CRAT is a two-hour computer-based exam with 130 questions, 110 of them scored and 20 unscored pretest items you cannot identify. You get 1 hour 50 minutes for the questions and 10 minutes for a tutorial and survey. Items are single best answer, multiple response, hot spot and drag and place. It is taken at Pearson VUE test centers.",
  },
  {
    q: "What score do you need to pass the CRAT?",
    a: "CCI reports scores on a 0 to 900 scale, and 650 passes. A scaled score is not the percentage of questions answered correctly, so the 70 percent line on these practice tests is a readiness target, not CCI's rule.",
  },
  {
    q: "What does the CRAT cover?",
    a: "For exams after July 1, 2023 CCI weights the exam by content area: analyzing abnormal rhythms 60%, analyzing normal rhythms 16%, initiating cardiac monitoring services 9%, administering cardiac tests 9% and processing cardiac test findings 6%. Abnormal rhythms include atrial fibrillation and flutter, other atrial and junctional arrhythmias, AV blocks, ventricular tachycardia and fibrillation, asystole, paced rhythms, conduction delays and artifact. These practice tests keep that balance across 50 questions.",
  },
  {
    q: "How is the CRAT different from the CCT?",
    a: "Both are CCI credentials. The CRAT is for monitor technicians and is almost all rhythm interpretation, with abnormal rhythms alone at 60%. The CCT is for cardiographic technicians and adds 12-lead analysis, resting ECG technique, stress testing and Holter monitoring. Tigertest has a separate CCT practice test.",
  },
  {
    q: "Are these the real CRAT exam questions?",
    a: "No. Every question is original, written by Tigertest from CCI's published outline and task list and from primary clinical sources such as the AHA/ACC/HRS rhythm guidelines and the ISHNE-HRS ambulatory monitoring statement. Rhythm strips are described in words, so practice with real tracings too. Tigertest is not affiliated with Cardiovascular Credentialing International.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "crat practice test, cci crat practice test, crat exam questions, certified rhythm analysis technician practice test, monitor tech practice test, telemetry technician exam, crat 2026",
  alternates: {
    canonical: `${siteUrl}/crat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/crat-practice-test`,
    images: [{ url: shareImageUrl("crat"), width: 1200, height: 630, alt: "Tigertest free CRAT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("crat")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CRAT (CCI) Practice Test",
      description,
      url: `${siteUrl}/crat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("crat"),
      featureList: [
        "200 CRAT (CCI) practice questions",
        "4 practice tests of 50 questions weighted like the CCI CRAT content outline",
        "6 training sets by CCI content area",
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
        classFaqJsonLd("crat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Analyzing Abnormal Rhythms", weight: "60%" },
  { name: "Analyzing Normal Rhythms", weight: "16%" },
  { name: "Initiating Cardiac Monitoring Services", weight: "9%" },
  { name: "Administering Cardiac Tests", weight: "9%" },
  { name: "Processing Cardiac Test Findings", weight: "6%" },
];

export default function CratLandingPage() {
  return (
    <div data-theme="crat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CRAT (CCI) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/crat/dashboard"
            shortName="CRAT"
            subtitle="200 CCI CRAT questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/crat-mobile.png", desktop: "/landing/crat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="crat" />

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
                Six training sets cover every CCI content area: starting monitoring and ECG quality; normal rhythms and cardiac A&amp;P; atrial arrhythmias; junctional rhythms and AV blocks; ventricular rhythms and asystole; and paced rhythms, artifact and reporting findings. Questions you miss come back until you have mastered them.
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
                Built on the CCI CRAT Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CCI publishes the share of the exam each content area takes, and every practice test here keeps that balance, scaled to 50 questions. Analyzing abnormal rhythms is the largest area, at 60%. Monitor technician and EKG program instructors can set Tigertest as CRAT review at{" "}
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
                src={getTigerAsset("crat", 3)}
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
            How to Prepare for the CRAT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read every strip the same way</h3>
              <p>
                Abnormal rhythms are 60% of the exam and normal rhythms another 16%. Work every strip in the same order: rate, regularity, P waves, PR interval, QRS width and QT. A fixed routine catches the dropped beat or the hidden flutter wave that a quick look misses.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the look-alikes</h3>
              <p>
                Much of the exam is telling similar rhythms apart: atrial fibrillation from flutter and MAT, Mobitz I from Mobitz II and a blocked PAC, VT from SVT with aberrancy, fine VF from asystole, and real arrhythmia from artifact. Learn the one feature that separates each pair.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do the math by hand</h3>
              <p>
                Practice rates with the 1500, 300 and six-second methods, and measure PR, QRS and QT in small boxes. Pacemaker rates, flutter conduction ratios and ventricular rates in AV block all come down to the same arithmetic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the job around the strip</h3>
              <p>
                The rest of the exam is starting monitoring, electrode placement and signal quality, and triaging and reporting findings. Know which rhythms need an immediate call and what a complete report and strip label include. Then drill the questions you missed and practice on real tracings as well.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CRAT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="crat" />
        </div>
      </div>

      <ExamSampleQuestions examId="crat" />

      <ExamRelatedTests examId="crat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practice for the CRAT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every content area of the CCI CRAT exam.</p>
          <ExamLandingCTA dashboardHref="/crat/dashboard" />
        </div>
      </div>
    </div>
  );
}

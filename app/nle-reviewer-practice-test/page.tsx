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

const title = "NLE Reviewer 2026 - Free Nursing Board Exam Practice Test";
const metaDescription =
  "Free NLE reviewer: 200 original questions across Nursing Practice I to V of the Philippine Nurse Licensure Examination, four 50-question mock exams, every answer explained.";
const description =
  "Free practice for the Philippine Nurse Licensure Examination (NLE, also called the PNLE or nursing board exam) given by the PRC: 200 original questions across the five Nursing Practice parts. Four 50-question mock exams with 10 items from each part, and five training sets covering community health nursing and DOH programs, nursing law and ethics, care of the mother and adolescent, growth and development, medical-surgical nursing, psychiatric nursing and emergency care.";

const faqs = [
  {
    q: "What is the NLE?",
    a: "The Nurse Licensure Examination (NLE, often called the PNLE or the nursing board exam) is the written examination every applicant for a nursing license in the Philippines must pass under the Philippine Nursing Act of 2002 (R.A. 9173). It is given by the Professional Regulation Commission (PRC) through the Professional Regulatory Board of Nursing, which sets its scope.",
  },
  {
    q: "How is the NLE structured?",
    a: "The PRC program for the August 29-30, 2026 exam lists five parts over two days, each two hours: Nursing Practice I (community health nursing), Nursing Practice II (care of the mother and adolescent, and human growth and development), Nursing Practice III (surgery, oxygenation, fluids and electrolytes, infection and immunity, cellular aberrations), Nursing Practice IV (nutrition, gastrointestinal, metabolism and endocrine, perception and coordination) and Nursing Practice V (maladaptive patterns of behavior, and life-threatening, high acuity and emergency situations). Guides report 100 items per part, mostly in situational sets. It is a pen-and-paper exam and calculators are not allowed.",
  },
  {
    q: "What is the passing rate for the NLE?",
    a: "Under Section 15 of R.A. 9173 you need a general average of at least 75% with no rating below 60% in any subject. An examinee who averages 75% but rates below 60% in a subject retakes only that subject and must rate at least 75% in it. Each 50-question mock exam here uses 75% as its pass line; the 60% subject floor is not modelled.",
  },
  {
    q: "When is the NLE held?",
    a: "In 2026 the PRC held the NLE on February 26-27 and August 29-30 (PRC Resolution No. 2113, s. 2025, the 2026 schedule of licensure examinations). Dates, venues and requirements change, so check the PRC licensure examination schedule at prc.gov.ph before you apply.",
  },
  {
    q: "Are these the real NLE questions?",
    a: "No. Every question is original, written by Tigertest from the PRC program and Philippine nursing law, practice and DOH programs, so it practices the same knowledge without copying any past exam. Tigertest is not affiliated with the PRC or the Professional Regulatory Board of Nursing.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nle reviewer, nle reviewer 2026, pnle reviewer, nursing board exam reviewer, nurse licensure exam practice test, nursing board exam questions, nursing practice 1 reviewer, community health nursing reviewer, prc nursing board exam, philippine nurse licensure examination",
  alternates: {
    canonical: `${siteUrl}/nle-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nle-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phnle"), width: 1200, height: 630, alt: "Tigertest free NLE reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phnle")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NLE Reviewer",
      description,
      url: `${siteUrl}/nle-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "200 NLE practice questions",
        "4 mock exams of 50 questions, 10 from each Nursing Practice part",
        "5 training sets, one per Nursing Practice part",
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
        classFaqJsonLd("phnle"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "NP I: Community Health Nursing", weight: "20%" },
  { name: "NP II: Mother, Adolescent & Development", weight: "20%" },
  { name: "NP III: Surgery, Oxygenation, Infection & Cancer", weight: "20%" },
  { name: "NP IV: Nutrition, GI, Endocrine & Neuro", weight: "20%" },
  { name: "NP V: Mental Health & Emergencies", weight: "20%" },
];

export default function NleReviewerLandingPage() {
  return (
    <div data-theme="phnle" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NLE Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nurse-licensure-exam/dashboard"
            shortName="NLE"
            subtitle="200 original questions across Nursing Practice I to V of the Philippine Nurse Licensure Examination. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phnle-mobile.png", desktop: "/landing/phnle-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phnle" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Nursing Practice Part</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets, one for each Nursing Practice part, from community health nursing to emergency care. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Balanced Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock exams of 50 questions, 10 from each of the five parts, so no part is left out. Aim for 75% or better. No question appears in more than one test.
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
                Built on the Five Nursing Practice Parts
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The NLE has five parts, rated together into one general average. Tigertest gives each part an equal share, 10 of every 50 questions, shown below as its share of each mock exam. Fundamentals of nursing, professional adjustment, pharmacology, nutrition and pathophysiology run through every part, as the PRC program says. The Board adopted enhanced tables of specifications in 2025 (Board Resolution No. 10, s. 2025); the split of topics inside each part here is Tigertest&apos;s own. Real items come in situational sets; ours stand alone. Review centers and nursing schools can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("phnle", 1)}
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
            How to Pass the NLE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Keep every part above 60%</h3>
              <p>
                A 75% general average is not enough if one part falls below 60%. Spread your review across all five parts instead of leaning on your strongest one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know Philippine programs and laws</h3>
              <p>
                Nursing Practice I asks about community health in the Philippine setting: the National Immunization Program, newborn screening, TB DOTS, dengue, rabies and schistosomiasis control, family nursing and the laws nurses work under, from R.A. 9173 to Universal Health Care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Answer as a safe nurse</h3>
              <p>
                Situational items reward airway, breathing and circulation first, patient safety, and actions within the nurse&apos;s scope. Pick what the nurse should do now, not what the doctor will do later.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by part. Aim for 75% or better on every mock exam. After each test, drill the questions you missed and retrain the weakest part.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NLE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="phnle" />
        </div>
      </div>

      <ExamRelatedTests examId="phnle" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NLE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all five Nursing Practice parts.</p>
          <ExamLandingCTA dashboardHref="/nurse-licensure-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}

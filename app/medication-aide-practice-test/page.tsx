import "@/lib/banks/mace";
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

const title = "Medication Aide Practice Test 2026 - Free MACE Exam Questions";
const metaDescription =
  "Free-to-start medication aide (MACE) practice test: 200 original questions on the national MACE content outline, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Practice for the Medication Aide Certification Examination (MACE) taken by certified medication aides and medication assistants: 200 original questions written from the national MACE content outline and NCSBN's MA-C Model Curriculum. Four 50-question practice tests weighted like the exam's three content areas, and four training sets covering the aide's duties and medication orders, safety checks, client rights and routes, drug classes and reporting, and medication concepts and forms.";

const faqs = [
  {
    q: "What is the MACE exam?",
    a: "The Medication Aide Certification Examination (MACE) is a national written exam that many states use to certify medication aides, also called medication assistants or MA-Cs. A medication aide is usually a nurse aide who has completed extra training to give selected medications under a licensed nurse's supervision. NCSBN created the exam and now says it no longer develops or owns it; Credentia develops and runs it for the states that use it.",
  },
  {
    q: "How many questions are on the MACE?",
    a: "Credentia's handbooks give 60 multiple-choice questions and two hours for the online written exam, and the national content outline counts 50 of them toward the three content areas: 8 on authorized duties, 30 on medication administration, observation and reporting, and 12 on medication concepts and measurements. Each practice test here has those same 50 in the same balance.",
  },
  {
    q: "What score do you need to pass the MACE?",
    a: "Credentia does not publish a passing score or percentage for the MACE. Results appear in your Credentia account, and a failing score report gives diagnostic information on the general parts of the exam. The 70 percent line on these practice tests is a readiness target, not the official standard. How many attempts you get and how long you have to pass are set by your state.",
  },
  {
    q: "What does a medication aide do, and does it vary by state?",
    a: "Under NCSBN's model curriculum, a medication aide gives medications such as tablets, eye drops, inhalers, patches and suppositories under a licensed nurse's supervision, and does not give injections or medications through feeding tubes, convert or calculate doses, assess a client's need for a drug, or decide when a PRN dose is needed. States adopt or adapt that model, so what an aide may do where you work is set by your state's rules and your facility's policy.",
  },
  {
    q: "Are these the real MACE questions?",
    a: "No. Every question is original, written by Tigertest from the national MACE content outline and NCSBN's Medication Assistant-Certified Model Curriculum, with disposal facts from the FDA. It covers the same knowledge without copying the exam or its sample questions. Tigertest is not affiliated with Credentia or NCSBN.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "medication aide practice test, mace exam, mace practice test, certified medication aide exam, medication assistant certification exam, med aide test 2026, ma-c exam questions, medication aide certification practice",
  alternates: {
    canonical: `${siteUrl}/medication-aide-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/medication-aide-practice-test`,
    images: [{ url: shareImageUrl("mace"), width: 1200, height: 630, alt: "Tigertest free medication aide practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mace")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Medication Aide (MACE) Practice Test",
      description,
      url: `${siteUrl}/medication-aide-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("mace"),
      featureList: [
        "200 medication aide (MACE) practice questions",
        "4 practice tests of 50 questions weighted like the MACE content outline",
        "4 training sets by content area",
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
        classFaqJsonLd("mace"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Medication Administration, Observation and Reporting", weight: "60%" },
  { name: "Medication Concepts and Measurements", weight: "24%" },
  { name: "Authorized Duties", weight: "16%" },
];

export default function MaceLandingPage() {
  return (
    <div data-theme="mace" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Medication Aide (MACE) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/medication-aide/dashboard"
            shortName="MACE"
            subtitle="200 questions on the MACE content outline. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/mace-mobile.png", desktop: "/landing/mace-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mace" />

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
                Four training sets follow the MACE content outline: duties, orders and storage; safety checks, client rights and routes; drug classes and reporting; and medication concepts and forms. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 50 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the MACE Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The national MACE content outline sets how many of the 50 scored questions come from each area, and every practice test here uses the same counts: 30 on medication administration, observation and reporting, 12 on medication concepts and measurements and 8 on authorized duties. Medication aide program instructors can set Tigertest as MACE review at{" "}
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
                src={getTigerAsset("mace", 3)}
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
            How to Pass the MACE Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Own the medication pass</h3>
              <p>
                Medication administration, observation and reporting is 60% of the exam. Know the three safety checks, the six rights, the steps from washing hands to documenting, how to chart a dose or a refusal on the MAR, and how medications are stored and disposed of.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn routes and drug classes</h3>
              <p>
                Study each route an aide uses, from buccal and sublingual tablets to inhalers, eye and ear drops, patches and suppositories, and the drug classes for each body system: what an anticoagulant, diuretic, bronchodilator or anticonvulsant is for.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know where your role ends</h3>
              <p>
                Authorized duties are 16% of the exam, and the limits come up everywhere. An aide works under a licensed nurse, does not take phone orders, convert doses, assess need or judge PRN doses, and reports changes and errors to the nurse. What your state allows is set by its own rules.
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
          MACE Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="mace" />
        </div>
      </div>

      <ExamSampleQuestions examId="mace" />

      <ExamRelatedTests examId="mace" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the MACE Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every area of the MACE content outline.</p>
          <ExamLandingCTA dashboardHref="/medication-aide/dashboard" />
        </div>
      </div>
    </div>
  );
}

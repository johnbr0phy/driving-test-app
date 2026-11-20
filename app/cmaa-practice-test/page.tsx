import "@/lib/banks/cmaa";
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

const title = "CMAA Practice Test 2026 - Free NHA Medical Administrative Assistant Questions";
const metaDescription =
  "Free-to-start CMAA (NHA) practice test: 200 original questions on the NHA CMAA test plan, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Practice for the National Healthcareer Association Certified Medical Administrative Assistant (CMAA) exam: 200 original questions written from NHA's published test plan. Four 50-question practice tests weighted like the real exam's seven domains, and four training sets covering foundations and communication, law, ethics and scheduling, the patient encounter, and billing and office procedures.";

const faqs = [
  {
    q: "What is the CMAA exam?",
    a: "It is the certification exam for the Certified Medical Administrative Assistant credential from the National Healthcareer Association (NHA). It covers front office work: communication, scheduling, check-in and insurance, billing, health records and compliance. You can sit for it after a medical administrative assistant training program within the last five years, or with a high school diploma and supervised work in the field: one year within the last three years, or two years within the last five.",
  },
  {
    q: "How many questions are on the CMAA exam?",
    a: "NHA's test plan lists 110 scored questions and 25 unscored pretest questions, with 2 hours and 15 minutes to finish. You cannot tell which questions are pretest items. The exam is taken on a computer at your school, at a PSI test center or by live remote proctoring.",
  },
  {
    q: "What score do you need to pass the CMAA exam?",
    a: "NHA reports a scaled score from 200 to 500, and 390 or higher passes. The scale weights questions by difficulty, so 390 is not a fixed percentage, and the 70 percent line on these practice tests is a readiness target. After a failed attempt you wait 30 days to retake; NHA allows three attempts with 30 days between them, then a year between attempts.",
  },
  {
    q: "What is on the CMAA exam?",
    a: "The test plan has seven domains: Communication and Professionalism 21 questions, Patient Encounter 21, Medical Law, Ethics, and Compliance 17, Scheduling 16, Medical Practice Administrative Procedures and Logistics 14, Billing and Revenue Cycle 11, and Foundational Knowledge 10. Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real CMAA exam questions?",
    a: "No. Every question is original, written by Tigertest from NHA's published test plan and the laws it names, such as HIPAA and OSHA rules, so it covers the same knowledge without copying the exam. Tigertest is not affiliated with the National Healthcareer Association.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cmaa practice test, cmaa exam, nha cmaa practice test, certified medical administrative assistant practice exam, medical administrative assistant exam questions, cmaa certification 2026, nha medical administrative assistant, medical office assistant practice test",
  alternates: {
    canonical: `${siteUrl}/cmaa-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cmaa-practice-test`,
    images: [{ url: shareImageUrl("cmaa"), width: 1200, height: 630, alt: "Tigertest free CMAA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cmaa")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CMAA (NHA) Practice Test",
      description,
      url: `${siteUrl}/cmaa-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cmaa"),
      featureList: [
        "200 CMAA (NHA) practice questions",
        "4 practice tests of 50 questions weighted like the NHA CMAA test plan",
        "4 training sets by test plan domain",
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
        classFaqJsonLd("cmaa"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Communication and Professionalism", weight: "21 items" },
  { name: "Patient Encounter", weight: "21 items" },
  { name: "Medical Law, Ethics, and Compliance", weight: "17 items" },
  { name: "Scheduling", weight: "16 items" },
  { name: "Administrative Procedures and Logistics", weight: "14 items" },
  { name: "Billing and Revenue Cycle", weight: "11 items" },
  { name: "Foundational Knowledge", weight: "10 items" },
];

export default function CmaaLandingPage() {
  return (
    <div data-theme="cmaa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CMAA (NHA) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cmaa/dashboard"
            shortName="CMAA"
            subtitle="200 NHA CMAA questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cmaa-mobile.png", desktop: "/landing/cmaa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cmaa" />

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
                Four training sets cover all seven domains of the NHA test plan: foundations and communication; law, ethics and scheduling; the patient encounter; and billing and office procedures. Questions you miss come back until you have mastered them.
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
                Built on the NHA CMAA Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NHA publishes how many of the 110 scored questions come from each domain, and every practice test here keeps that balance, scaled to 50 questions. Communication and the patient encounter are the two largest domains. Medical administrative assistant program instructors can set Tigertest as CMAA review at{" "}
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
                src={getTigerAsset("cmaa", 3)}
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
            How to Pass the CMAA Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the patient encounter</h3>
              <p>
                Check-in, insurance and check-out make up 21 of the 110 scored questions. Know the intake forms, how copays, coinsurance and deductibles work, coordination of benefits, the ABN, the EOB and the code sets.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice how you talk to people</h3>
              <p>
                Communication and professionalism is 21 items too. Know open and closed questions, active listening, empathy, de-escalation, phone and email etiquette, and how to adapt for language, age, hearing and vision needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn HIPAA and the schedule</h3>
              <p>
                Law and compliance is 17 items and scheduling is 16. Learn what counts as PHI, when an authorization is needed, the types of consent, mandatory and incident reporting, and the scheduling methods, telehealth rules and no-show procedures.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by domain. Aim for 70% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest domain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CMAA Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cmaa" />
        </div>
      </div>

      <ExamSampleQuestions examId="cmaa" />

      <ExamRelatedTests examId="cmaa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CMAA Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the NHA CMAA test plan.</p>
          <ExamLandingCTA dashboardHref="/cmaa/dashboard" />
        </div>
      </div>
    </div>
  );
}

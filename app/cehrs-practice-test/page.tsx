import "@/lib/banks/cehrs";
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

const title = "CEHRS Practice Test 2026 - Free NHA Electronic Health Records Specialist Questions";
const metaDescription =
  "Free-to-start CEHRS (NHA) practice test: 200 original questions on the NHA CEHRS test plan, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Practice for the National Healthcareer Association Certified Electronic Health Records Specialist (CEHRS) exam: 200 original questions written from NHA's published test plan. Four 50-question practice tests weighted like the real exam's five domains, and four training sets covering non-clinical operations, clinical operations, the revenue cycle and reporting, and regulatory compliance.";

const faqs = [
  {
    q: "What is the CEHRS exam?",
    a: "It is the certification exam for the Certified Electronic Health Records Specialist credential from the National Healthcareer Association (NHA). It covers the work of keeping electronic health records accurate and secure: registration and patient data, clinical documentation and data exchange, codes and billing in the EHR, HIPAA and HITECH compliance, and running reports. You can sit for it with a high school diploma or GED, after an EHR specialist training program within the last five years, or with supervised work in the field.",
  },
  {
    q: "How many questions are on the CEHRS exam?",
    a: "NHA's test plan lists 100 scored questions and 25 unscored pretest questions, with 125 minutes to finish. You cannot tell which questions are pretest items. The exam is taken on a computer at your school, at a PSI testing center or by live remote proctoring.",
  },
  {
    q: "What score do you need to pass the CEHRS exam?",
    a: "NHA reports a scaled score from 200 to 500, and 390 or higher passes. The scale weights questions by difficulty, so 390 is not a fixed percentage, and the 70 percent line on these practice tests is a readiness target. After a failed attempt you wait 30 days to retake; NHA allows three attempts with 30 days between them, then a year between attempts.",
  },
  {
    q: "What is on the CEHRS exam?",
    a: "The test plan, based on a 2019 job analysis, has five domains: Clinical Operations 32 questions, Non-Clinical Operations 28, Revenue Cycle and Finance 15, Regulatory Compliance 15, and Reporting 10. Each practice test here keeps close to that balance, scaled to 50 questions.",
  },
  {
    q: "Are these the real CEHRS exam questions?",
    a: "No. Every question is original, written by Tigertest from NHA's published test plan and the rules it names, such as HIPAA, HITECH and the 21st Century Cures Act information blocking rules, so it covers the same knowledge without copying the exam. Tigertest is not affiliated with the National Healthcareer Association.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cehrs practice test, cehrs exam, nha cehrs practice test, certified electronic health records specialist practice exam, ehr specialist exam questions, cehrs certification 2026, nha electronic health records specialist, electronic health records practice test",
  alternates: {
    canonical: `${siteUrl}/cehrs-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cehrs-practice-test`,
    images: [{ url: shareImageUrl("cehrs"), width: 1200, height: 630, alt: "Tigertest free CEHRS practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cehrs")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CEHRS (NHA) Practice Test",
      description,
      url: `${siteUrl}/cehrs-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cehrs"),
      featureList: [
        "200 CEHRS (NHA) practice questions",
        "4 practice tests of 50 questions weighted like the NHA CEHRS test plan",
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
        classFaqJsonLd("cehrs"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Clinical Operations", weight: "32 items" },
  { name: "Non-Clinical Operations", weight: "28 items" },
  { name: "Revenue Cycle/Finance", weight: "15 items" },
  { name: "Regulatory Compliance", weight: "15 items" },
  { name: "Reporting", weight: "10 items" },
];

export default function CehrsLandingPage() {
  return (
    <div data-theme="cehrs" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CEHRS (NHA) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cehrs/dashboard"
            shortName="CEHRS"
            subtitle="200 original questions on the NHA CEHRS test plan: patient data and registration, clinical documentation and data exchange, codes and billing in the EHR, HIPAA and information blocking, and reports. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/cehrs-mobile.png", desktop: "/landing/cehrs-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cehrs" />

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
                Four training sets cover all five domains of the NHA test plan: non-clinical operations; clinical operations; the revenue cycle and reporting; and regulatory compliance. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 100 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the NHA CEHRS Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NHA publishes how many of the 100 scored questions come from each domain, and every practice test here keeps close to that balance, scaled to 50 questions. Clinical and non-clinical operations together make up 60 of the 100. EHR specialist and health information program instructors can set Tigertest as CEHRS review at{" "}
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
                src={getTigerAsset("cehrs", 1)}
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
            How to Pass the CEHRS Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master clinical operations</h3>
              <p>
                Clinical operations is the largest domain, 32 of the 100 scored questions. Know clinical templates, SOAP, SOAPIER and problem-oriented charting, common documentation errors, where data lives in the chart, secure data exchange and what an EHR specialist may and may not do with order entry and patient education.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the non-clinical workflow</h3>
              <p>
                Non-clinical operations is 28 items. Know patient identifiers and how duplicate records are avoided, importing outside data and scans, hardware inventory, patient flow, training and supporting EHR users, basic troubleshooting and helping patients with the portal.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know HIPAA, billing and reports</h3>
              <p>
                Compliance and the revenue cycle are 15 items each and reporting is 10. Learn de-identification, access controls, breach reporting, patients&apos; rights to their records and information blocking, then the code sets, eligibility, authorizations and claims, and the financial and clinical reports an EHR produces.
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
          CEHRS Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cehrs" />
        </div>
      </div>

      <ExamSampleQuestions examId="cehrs" />

      <ExamRelatedTests examId="cehrs" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CEHRS Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the NHA CEHRS test plan.</p>
          <ExamLandingCTA dashboardHref="/cehrs/dashboard" />
        </div>
      </div>
    </div>
  );
}

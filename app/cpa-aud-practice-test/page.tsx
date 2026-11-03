import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "CPA AUD Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free CPA Exam AUD practice: 200 original multiple-choice questions on the AICPA 2026 blueprint, four 50-question tests weighted by content area, every answer explained.";
const description =
  "Free practice for the Auditing and Attestation (AUD) section of the Uniform CPA Examination: 200 original multiple-choice questions written from the AICPA Blueprints effective January 1, 2026. Four 50-question tests weighted like the real section's four content areas, and six training sets covering ethics and independence, engagement terms and quality management, planning, materiality and internal control, fraud and specific risk areas, evidence and sampling, special matters and subsequent events, and audit, attestation and SSARS reports.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cpa aud practice test, aud practice questions, cpa exam aud, auditing and attestation practice test, cpa aud mcq, cpa aud 2026, free cpa practice questions, aud section cpa exam",
  alternates: {
    canonical: `${siteUrl}/cpa-aud-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cpa-aud-practice-test`,
    images: [{ url: shareImageUrl("cpaaud"), width: 1200, height: 630, alt: "Tigertest free CPA AUD practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cpaaud")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the AUD section of the CPA Exam?",
    a: "Auditing and Attestation (AUD) is one of the three Core sections of the Uniform CPA Examination that every candidate takes, alongside FAR and REG, plus one Discipline section. It tests audits of issuers and nonissuers under PCAOB and AICPA standards, governmental and single audits, employee benefit plan audits, attestation engagements, and preparation, compilation and review engagements under SSARS.",
  },
  {
    q: "How is the AUD section structured and scored?",
    a: "AUD is a 4-hour section with 78 multiple-choice questions in two testlets of 39 and 7 task-based simulations in three testlets. Multiple-choice questions and simulations each count for 50% of the score. Scores run from 0 to 99 and 75 passes, but a 75 is not 75% correct: the AICPA scales scores for question difficulty. The tests here have 50 questions each and use a 75% line as a readiness target.",
  },
  {
    q: "What content does AUD cover in 2026?",
    a: "The AICPA Blueprints effective January 1, 2026 split AUD into four areas: Ethics, Professional Responsibilities and General Principles (15 to 25%), Assessing Risk and Developing a Planned Response (25 to 35%), Performing Further Procedures and Obtaining Evidence (30 to 40%), and Forming Conclusions and Reporting (10 to 20%). The Blueprints effective January 1, 2027 only revise examples in a few Area III tasks, on data reliability, evidence, sampling and investments, and do not change the scope of AUD.",
  },
  {
    q: "Does this practice test include task-based simulations?",
    a: "No. Tigertest covers the multiple-choice half of AUD only. The task-based simulations, with document review, research in the professional standards and report wording, are half of the real score, so practice them with your review course or the AICPA's sample tests as well.",
  },
  {
    q: "Are these real CPA Exam questions?",
    a: "No. Every question is original, written by Tigertest from the AICPA blueprint and the AICPA, PCAOB, GAO and SSARS standards it covers. Tigertest is not affiliated with the AICPA, NASBA, the PCAOB or any state board of accountancy, and this free practice does not replace a full CPA review course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CPA AUD Practice Test",
      description,
      url: `${siteUrl}/cpa-aud-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CPA AUD multiple-choice practice questions",
        "4 tests of 50 questions weighted by the AICPA blueprint",
        "6 training sets by topic",
        "Every answer explained",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Area I: Ethics, Professional Responsibilities and General Principles", weight: "15-25%" },
  { name: "Area II: Assessing Risk and Developing a Planned Response", weight: "25-35%" },
  { name: "Area III: Performing Further Procedures and Obtaining Evidence", weight: "30-40%" },
  { name: "Area IV: Forming Conclusions and Reporting", weight: "10-20%" },
];

export default function CpaAudLandingPage() {
  return (
    <div data-theme="cpaaud" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CPA AUD Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cpa-aud/dashboard"
            shortName="CPA AUD"
            subtitle="200 original multiple-choice questions on the AICPA 2026 blueprint: independence, risk assessment, internal control, evidence, sampling, going concern and reports. Four 50-question tests, every answer explained. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cpaaud-mobile.png", desktop: "/landing/cpaaud-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cpaaud" />

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
                Six training sets: ethics, independence and engagement basics, planning, materiality and internal control, fraud and specific risks, evidence and sampling, special matters and subsequent events, and audit, attestation and SSARS reports. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Blueprint-Weighted Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 multiple-choice questions in the blueprint&apos;s area weights, with a 75% readiness line. No question appears in more than one test, and every answer is explained with the standard behind it.
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
                Built on the AICPA AUD Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AICPA Blueprints effective January 1, 2026 give AUD four content areas. Each test here has 10 ethics and general principles, 15 risk assessment, 17 further procedures and evidence, and 8 reporting questions. The real section has 78 multiple-choice questions; the 7 task-based simulations are not modelled.
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
                src={getTigerAsset("cpaaud", 1)}
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
            How to Pass AUD
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read the engagement and the entity first</h3>
              <p>
                The same question has different answers for an issuer under PCAOB standards, a nonissuer under AICPA standards, a government audit under the Yellow Book, a review under SSARS and an attestation engagement. Before you look at the choices, name the engagement and the standard that governs it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the current risk and quality standards</h3>
              <p>
                SAS 145 changed risk assessment (inherent risk factors, the spectrum of risk, separate assessments of inherent and control risk), and SQMS 1, SQMS 2 and SAS 146 replaced quality control with quality management. Older study material still uses the retired wording, and the choices often test the difference.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the report decision tree cold</h3>
              <p>
                Material misstatement or a scope limitation? Material, or material and pervasive? Emphasis-of-matter or other-matter? Going concern section or not? Reporting questions are quick points once the logic is automatic, and they come back in the simulations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice simulations too</h3>
              <p>
                Simulations are half of the AUD score. Use these questions to make the rules automatic, then practice document review, research in the professional standards and report wording with your review course. Aim for 80% or better on every test here before you sit the section.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CPA AUD Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamRelatedTests examId="cpaaud" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass AUD?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every area of the AICPA AUD blueprint.</p>
          <ExamLandingCTA dashboardHref="/cpa-aud/dashboard" />
        </div>
      </div>
    </div>
  );
}

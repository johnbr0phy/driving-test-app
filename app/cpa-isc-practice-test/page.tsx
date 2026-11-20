import "@/lib/banks/cpaisc";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "CPA ISC Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free CPA Exam ISC practice: 200 original multiple-choice questions on the AICPA's 2026 Information Systems and Controls blueprint, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the Information Systems and Controls (ISC) Discipline section of the Uniform CPA Examination: 200 original multiple-choice questions written from the AICPA's 2026 ISC blueprint. Four 50-question mock tests weighted like the real section's three content areas, and five training sets covering IT infrastructure, cloud, accounting systems and availability; change and data management, including SQL; HIPAA, GDPR, PCI DSS, NIST and CIS frameworks and cyber threats; security controls, privacy and incident response; and SOC 1 and SOC 2 engagements.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cpa isc practice test, isc cpa exam practice questions, information systems and controls practice, cpa isc discipline, free cpa isc questions, cpa isc mcq, cpa isc mock exam, soc 1 soc 2 cpa exam, cpa isc 2026",
  alternates: {
    canonical: `${siteUrl}/cpa-isc-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cpa-isc-practice-test`,
    images: [{ url: shareImageUrl("cpaisc"), width: 1200, height: 630, alt: "Tigertest free CPA ISC practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cpaisc")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the CPA ISC section?",
    a: "Information Systems and Controls (ISC) is one of the three Discipline sections of the Uniform CPA Examination, and you take one Discipline section along with the three Core sections. The AICPA's 2026 blueprint splits ISC into three content areas: information systems and data management (35 to 45%), security, confidentiality and privacy (35 to 45%) and considerations for SOC engagements (15 to 25%). The AICPA's summary of 2027 changes removes the COSO blockchain guidance and narrows one blockchain task, and says the changes are not meant to significantly change what is tested.",
  },
  {
    q: "How many questions are on ISC and what score do I need?",
    a: "ISC is a 4-hour section with 82 multiple-choice questions in two testlets of 41 and 6 task-based simulations. Unlike the other sections, multiple choice is 60% of the ISC score and the simulations 40%. Scores are reported from 0 to 99 and 75 passes, but 75 is a scaled score, not 75 percent correct. The mock tests here use a 75 percent target as a readiness line.",
  },
  {
    q: "Which frameworks and laws does ISC test?",
    a: "The blueprint lists them by name: the AICPA Trust Services Criteria and SOC 2 description criteria, the attestation standards for SOC 1 and SOC 2 engagements, NIST's Cybersecurity Framework, Privacy Framework and SP 800-53 chapters 1 and 2, the CIS Controls, COBIT 2019, the PCI DSS goals and requirements, HIPAA's security and privacy rules and GDPR Articles 4 to 34. Questions here stay within those references and the textbook topics the blueprint names.",
  },
  {
    q: "Does this practice test cover task-based simulations?",
    a: "No. Every question here is multiple choice, which is 60% of your ISC score; task-based simulations, document review and research tasks are not modelled. SQL questions show the data and the query, and every computed answer, from availability percentages to query results, is worked through in the explanation.",
  },
  {
    q: "Are these real CPA Exam questions?",
    a: "No. Every question is original, written by Tigertest from the AICPA's published ISC blueprint and the standards, frameworks and laws it lists as references. It is practice, not affiliated with the AICPA, NASBA or any state board of accountancy, and it does not replace a full review course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CPA ISC Practice Test",
      description,
      url: `${siteUrl}/cpa-isc-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cpaisc"),
      featureList: [
        "200 CPA ISC multiple-choice questions",
        "4 mock tests of 50 questions weighted like the AICPA blueprint",
        "5 training sets by content area",
        "Instant feedback with explanations",
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
  { name: "Information systems and data management", weight: "35-45%" },
  { name: "Security, confidentiality and privacy", weight: "35-45%" },
  { name: "SOC engagements", weight: "15-25%" },
];

export default function CpaIscLandingPage() {
  return (
    <div data-theme="cpaisc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CPA ISC Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cpa-isc/dashboard"
            shortName="CPA ISC"
            subtitle="200 CPA ISC questions and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cpaisc-mobile.png", desktop: "/landing/cpaisc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cpaisc" />

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
                Five training sets: IT systems, cloud and availability; change and data management; frameworks and threats; security, privacy and incidents; and SOC engagements. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 multiple-choice questions in the blueprint&apos;s proportions, with a 75% target. No question appears in more than one test, and every computed answer is worked through in the explanation.
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
                Built on the AICPA&apos;s ISC Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AICPA&apos;s 2026 blueprint gives each of ISC&apos;s three content areas a range, and the 2027 blueprint only narrows its blockchain coverage. Each mock test here gives information systems and data management 20 of 50 questions, security, confidentiality and privacy 20 and SOC engagements 10, inside every range. Task-based simulations are not modelled.
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
                src={getTigerAsset("cpaisc", 3)}
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
            How to Pass CPA ISC
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the SOC vocabulary exactly</h3>
              <p>
                Type 1 or type 2, carve-out or inclusive, CUECs or CSOCs, service commitments or system requirements: SOC questions often turn on one term. Know what each report contains, who may use it and what the service auditor must say when a control fails.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Tie each control to the right criterion</h3>
              <p>
                Many questions name a control and ask which Trust Services Criterion, framework function or control type it serves. Practice sorting controls into preventive, detective and corrective, and into the common criteria and the availability, confidentiality, processing integrity and privacy series.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read every SQL query against the data</h3>
              <p>
                Data management questions show a small table and a query. Work out the result row by row, and watch the operators: a strict greater-than or a missing date leaves records out, which is exactly the completeness issue the blueprint asks about.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the multiple choice, then the simulations</h3>
              <p>
                Multiple choice is 60% of the ISC score, and the task-based simulations build on the same rules. Aim for 80% or better on every mock test here, then work through simulations with the AICPA&apos;s sample tests before you sit the section.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CPA ISC Frequently Asked Questions
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

      <ExamSampleQuestions examId="cpaisc" />

      <ExamRelatedTests examId="cpaisc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CPA ISC?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every area of the AICPA&apos;s ISC blueprint.</p>
          <ExamLandingCTA dashboardHref="/cpa-isc/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/cisa";
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

const title = "CISA Practice Test 2026 - Free ISACA IS Auditor Questions";
const metaDescription =
  "Free CISA practice: 200 original questions on ISACA's five job practice domains, four 50-question tests weighted like the real exam, and every answer explained from the auditor's point of view.";
const description =
  "Free practice for the ISACA Certified Information Systems Auditor (CISA) exam: 200 original questions written to the five job practice domains in effect since August 2024. Four 50-question practice tests weighted 18, 18, 12, 26 and 26 percent like the real exam, and five training sets covering the auditing process, governance and management of IT, acquisition and development, operations and business resilience, and protection of information assets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cisa practice test, cisa exam questions, isaca cisa practice exam, certified information systems auditor practice test, cisa 2026, it audit certification practice questions",
  alternates: {
    canonical: `${siteUrl}/cisa-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cisa-practice-test`,
    images: [{ url: shareImageUrl("cisa"), width: 1200, height: 630, alt: "Tigertest free CISA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cisa")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the CISA exam?",
    a: "The Certified Information Systems Auditor exam is ISACA's certification exam for IT auditors, control and assurance professionals. It tests how an auditor plans and runs IS audits, judges IT governance, reviews system development, operations and resilience, and evaluates the protection of information assets. You take it on a computer at a PSI test center or online with a remote proctor.",
  },
  {
    q: "How many questions are on the CISA exam and what score do I need?",
    a: "ISACA's exam content outline gives 150 questions. Guides quoting ISACA's candidate guide add that the exam is multiple choice, lasts 4 hours, and is scored on a scale of 200 to 800 with 450 needed to pass. ISACA does not publish a percent equivalent, so the 70% line on each 50-question practice test here is Tigertest's readiness target, not ISACA's pass mark.",
  },
  {
    q: "What do the five CISA domains cover and how are they weighted?",
    a: "Since 1 August 2024 the exam covers Information System Auditing Process 18%, Governance and Management of IT 18%, Information Systems Acquisition, Development and Implementation 12%, Information Systems Operations and Business Resilience 26%, and Protection of Information Assets 26%. Each practice test here keeps that balance: 9, 9, 6, 13 and 13 questions out of 50.",
  },
  {
    q: "Do I need work experience to take the CISA exam?",
    a: "You can sit the exam first. To be certified, ISACA asks for five or more years of IS audit, control or security work experience within the ten years before you apply, and you have five years from passing to apply. Certified holders then agree to ISACA's Code of Professional Ethics and auditing standards and earn at least 120 CPE hours every three years, with at least 20 each year.",
  },
  {
    q: "Are these real ISACA CISA questions?",
    a: "No. Every question is original, written by Tigertest to the published job practice areas in the best, first and most style the exam uses, where you answer as the auditor rather than as the IT manager. It is free practice, not affiliated with or endorsed by ISACA, and it does not replace ISACA's own review materials.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CISA Practice Test",
      description,
      url: `${siteUrl}/cisa-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cisa"),
      featureList: [
        "200 CISA practice questions",
        "4 practice tests of 50 questions weighted like the real exam",
        "5 training sets, one per job practice domain",
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
  { name: "Information System Auditing Process", weight: "18%" },
  { name: "Governance and Management of IT", weight: "18%" },
  { name: "IS Acquisition, Development and Implementation", weight: "12%" },
  { name: "IS Operations and Business Resilience", weight: "26%" },
  { name: "Protection of Information Assets", weight: "26%" },
];

export default function CisaLandingPage() {
  return (
    <div data-theme="cisa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CISA Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cisa/dashboard"
            shortName="CISA"
            subtitle="200 original questions on ISACA's five CISA domains: the audit process, IT governance, acquisition and development, operations and resilience, and protecting information assets. Four 50-question tests weighted like the real exam. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cisa-mobile.png", desktop: "/landing/cisa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cisa" />

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
                Five training sets, one per CISA domain: the auditing process; governance and management of IT; acquisition, development and implementation; operations and business resilience; and protection of information assets. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests at the Real Pace</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions in the real exam&apos;s domain weights. The real exam is 150 questions in 4 hours, so give each test about 80 minutes. No question appears in more than one test, and every answer is explained. Aim for 70% or better.
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
                Built on the CISA Job Practice Areas
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ISACA splits the exam across five domains, in effect since 1 August 2024. Each practice test here keeps the same balance: 9 auditing process, 9 governance, 6 acquisition and development, 13 operations and resilience, and 13 protection questions in every 50.
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
                src={getTigerAsset("cisa", 1)}
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
            How to Pass the CISA Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Answer as the auditor</h3>
              <p>
                Most questions ask what the IS auditor should do first, or what is best or most important. The auditor reviews, tests and reports; management designs controls, fixes findings and accepts risk. An option where the auditor builds a control or makes the business decision is usually wrong.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Think in risk</h3>
              <p>
                Audit plans, sampling and recommendations all start from risk. When several answers look sensible, choose the one that deals with the greatest risk to the business, or the one that gives the most reliable evidence, such as data the auditor gets directly rather than a report the auditee hands over.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Give Domains 4 and 5 the most time</h3>
              <p>
                Operations and business resilience and protection of information assets are more than half the exam together. Know change and patch management, backups, business impact analysis and recovery objectives, access reviews, network and physical controls, encryption and incident response well.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice at the real pace</h3>
              <p>
                The real exam gives you about a minute and a half per question for 4 hours. Take each 50-question test here in about 80 minutes, review every explanation, and retake the domains you miss until you score 70% or better on every test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CISA Frequently Asked Questions
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

      <ExamSampleQuestions examId="cisa" />

      <ExamRelatedTests examId="cisa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CISA Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all five CISA domains.</p>
          <ExamLandingCTA dashboardHref="/cisa/dashboard" />
        </div>
      </div>
    </div>
  );
}

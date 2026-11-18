import "@/lib/v2/banks/securityx";
import type { Metadata } from "next";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { getTigerAsset } from "@/lib/tigerAssets";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { examOffers } from "@/lib/examSeo";
import { SITE_URL } from "@/lib/siteUrl";

const title = "Free CompTIA SecurityX Practice Test";
const metaDescription = "240 original SecurityX CAS-005 multiple-choice questions. Four domain drills and two 90-question tests. Free to start; interactive performance tasks are not included.";
const description = "Free to start CompTIA SecurityX (CAS-005, formerly CASP+) practice with 240 original multiple-choice questions weighted to the CAS-005 V5 objectives: Governance, Risk and Compliance, Security Architecture, Security Engineering and Security Operations. Four domain drills and two 90-question tests in 165 minutes. Interactive performance tasks are not included.";
const url = `${SITE_URL}/comptia-securityx-practice-test`;
const faqs = [
  { q: "Is SecurityX the same certification as CASP+?", a: "SecurityX is the renamed CompTIA advanced security certification formerly called CASP+. This practice follows CAS-005 V5 objectives document version 7.0, checked on 17 November 2026. It does not claim to reproduce older CAS-004 questions." },
  { q: "What is the SecurityX exam format?", a: "CompTIA specifies a maximum of 90 multiple-choice and performance-based questions in 165 minutes. These two practice tests each contain 90 original single-answer MCQs with a 165-minute timer. Interactive performance tasks are omitted, so these are not complete format simulations." },
  { q: "What does the practice bank cover?", a: "Governance, Risk and Compliance, Security Architecture, Security Engineering and Security Operations. Each test uses 18, 24, 28 and 20 questions respectively, rounding the official 20%, 27%, 31% and 22% weights. There are 60 additional drill-only questions. Selected concepts span all numbered objectives, but not every technology example in the outline." },
  { q: "What score do I need to pass SecurityX?", a: "CompTIA reports pass/fail only, with no scaled score or published percentage cutoff. Tigertest reports percentage correct. Its default 80% study goal is editorial, not an official threshold or a prediction that you will pass." },
  { q: "How should I prepare for performance-based questions?", a: "Combine conceptual study with authorized hands-on practice and the current CompTIA objectives. These questions exercise interpretation and design decisions, but do not assess your ability to operate an interactive lab or configure a live system." },
  { q: "Is this SecurityX practice free?", a: "It is free to start with no account required. Practice Test 1 and the first three drills are free. The Security Operations drill and Practice Test 2 require Tigertest Premium, one payment with no subscription. CompTIA does not endorse or sponsor Tigertest." },
];
export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords: "SecurityX practice test, CompTIA SecurityX, CAS-005, CASP+, enterprise security certification",
  alternates: { canonical: url },
  openGraph: {
    title,
    description: metaDescription,
    url,
    images: [{ url: shareImageUrl("securityx"), width: 1200, height: 630, alt: title }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("securityx")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - SecurityX Practice",
      description,
      url,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("securityx"),
      featureList: [
        "240 original conceptual MCQs",
        "Four domain drills",
        "Two 90-question tests",
        "Interactive performance tasks not included",
      ],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("securityx"),
      ],
    },
  ],
};

const topics = [
  { name: "Governance, Risk and Compliance", weight: "20%", detail: "Risk ownership, supplier obligations, threat modeling and AI governance." },
  { name: "Security Architecture", weight: "27%", detail: "Zero trust, access boundaries, resilient systems and software assurance." },
  { name: "Security Engineering", weight: "31%", detail: "Identity and network diagnostics, endpoints, OT, automation and cryptography." },
  { name: "Security Operations", weight: "22%", detail: "Monitoring, defensive remediation, threat hunting and incident evidence." },
];

const tips = [
  { h: "1. Identify the constraint", p: "Find the actual requirement: a trust boundary, a recovery limit, an operational safety need or an authorization rule. Several controls may be useful, but only one directly addresses the stated gap." },
  { h: "2. Follow the evidence", p: "Separate authentication from authorization, configuration from observed behavior, and a completed change from a verified outcome. Use the logs and measurements provided in the question." },
  { h: "3. Explain the alternatives", p: "For each missed question, identify the circumstance in which another option would be appropriate. This builds understanding of scope and timing." },
  { h: "4. Add hands-on preparation", p: "Use authorized lab work and the current official outline alongside these conceptual drills. A high percentage here does not assess interactive performance or guarantee the certification result." },
];

export default function SecurityXLandingPage() {
  return (
    <div data-theme="securityx" className="flex-1 bg-white dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CompTIA SecurityX Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-securityx/dashboard"
            shortName="SecurityX"
            subtitle="240 original enterprise-security MCQs, four drills and two practice tests. Interactive performance tasks are not included. Free to start, no account needed."
            shots={{ mobile: "/landing/securityx-mobile.png", desktop: "/landing/securityx-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="securityx" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Domain Drills</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Read each scenario, choose an answer and use the explanation to check the distinction. Missed questions return for more practice. The 60 drill questions are separate from both test banks.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Two Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Each test has 90 single-answer questions and a 165-minute timer. Flag questions and review them before finishing. The tests use separate questions; the second is held out for a fresh check of these concepts.
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
                The Four CAS-005 Domains
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Official domain weights guide the allocation. Practice questions focus on selected conceptual decisions and defensive analysis, with interactive tasks and exhaustive technology coverage left out.
              </p>
              <div className="space-y-3">
                {topics.map((area) => (
                  <div key={area.name} className="bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                      <span className="text-brand-dark font-semibold">{area.weight}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{area.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("securityx", 3)}
                alt="Tigertest security mascot"
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
            Spot an unclear scenario or explanation? Use the question feedback, or send us an idea. We read every message and use it to improve every test.
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
            Study the Decision Behind the Answer
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            {tips.map((t) => (
              <div key={t.h}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SecurityX Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="securityx" />
        </div>
      </div>

      <SampleQuestionsV2 examId="securityx" />

      <ExamRelatedTests examId="securityx" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start SecurityX Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. Start with governance, then work through the four domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-securityx/dashboard" />
        </div>
      </div>
    </div>
  );
}

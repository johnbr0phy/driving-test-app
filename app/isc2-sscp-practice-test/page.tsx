import "@/lib/v2/banks/sscp";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free ISC2 SSCP Practice Test";
const metaDescription =
  "260 original ISC2 SSCP multiple-choice questions. Seven domain drills and two fixed 100-question tests. Free to start; CAT and advanced formats are not simulated.";
const description =
  "Free ISC2 SSCP (Systems Security Certified Practitioner) practice with 260 original multiple-choice questions weighted to the outline effective October 1, 2025: security concepts and practices, access controls, risk identification, monitoring and analysis, incident response and recovery, cryptography, network and communications security, and systems and application security. Seven domain drills and two fixed 100-question tests; CAT and advanced item types are not simulated.";

const faqs = [
  { q: "What is the current SSCP exam format?", a: "The ISC2 outline effective 1 October 2025 specifies computerized adaptive testing with 100-125 items in two hours. Items include multiple-choice and advanced types. The CAT FAQ states that 25 items are unscored and finalized answers cannot be revisited. These practice tests are fixed-length MCQs and do not simulate those features." },
  { q: "What does this SSCP practice cover?", a: "Selected operational concepts across all seven domains: security practices, access controls, risk analysis, incident recovery, cryptography, networks and systems. Each test allocates 16, 15, 15, 14, 9, 16 and 15 questions respectively, matching the official percentages. The 60 drill questions are separate from both tests. This is not exhaustive coverage of every outline example." },
  { q: "Is 70% enough to pass the real SSCP?", a: "ISC2 publishes a passing standard of 700 out of 1000, which is not a 70% raw-score cutoff. CAT evaluates ability using its scoring process, and candidates receive a pass/fail result rather than a numeric score. Tigertest shows percentage correct and uses an editorial 80% study goal; neither predicts an official result." },
  { q: "Can I go back to earlier questions here?", a: "Yes. You may flag and revisit questions in these fixed practice tests to support learning. The real CAT exam does not allow revisiting a finalized answer. Practice with the official exam rules as well as using these explanations." },
  { q: "How should I use the questions?", a: "Study the requirement in each scenario, explain why the alternatives do not fit it, and review missed concepts. Combine this bank with the current ISC2 outline and authorized practical work. It does not assess hands-on administration, advanced item interaction or adaptive exam performance." },
  { q: "Is this SSCP practice free?", a: "It is free to start with no account required. Practice Test 1 and the first six drills are free. The Systems and Application Security drill and Practice Test 2 require Tigertest Premium, one payment with no subscription. ISC2 does not endorse or sponsor Tigertest." },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SSCP practice test, ISC2 SSCP, Systems Security Certified Practitioner, operational security certification",
  alternates: {
    canonical: `${siteUrl}/isc2-sscp-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/isc2-sscp-practice-test`,
    images: [{ url: shareImageUrl("sscp"), width: 1200, height: 630, alt: title }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sscp")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - SSCP Practice",
      description,
      url: `${siteUrl}/isc2-sscp-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sscp"),
      featureList: [
        "260 original conceptual MCQs",
        "Seven domain drills",
        "Two fixed 100-question tests",
        "CAT and advanced item types not simulated",
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
        classFaqJsonLd("sscp"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Security Concepts and Practices", weight: "16%" },
  { name: "Access Controls", weight: "15%" },
  { name: "Risk Identification, Monitoring and Analysis", weight: "15%" },
  { name: "Incident Response and Recovery", weight: "14%" },
  { name: "Cryptography", weight: "9%" },
  { name: "Network and Communications Security", weight: "16%" },
  { name: "Systems and Application Security", weight: "15%" },
];

export default function SSCPLandingPage() {
  return (
    <div data-theme="sscp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ISC2 SSCP Practice Test
          </h1>
          <ExamLandingHero
            dashboardHref="/isc2-sscp/dashboard"
            shortName="SSCP"
            subtitle="260 MCQs, seven drills and two fixed practice tests. CAT is not simulated. Free to start, no account needed."
            shots={{ mobile: "/landing/sscp-mobile.png", desktop: "/landing/sscp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sscp" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Seven Domain Drills</h3>
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
                Each test has 100 single-answer questions and a 120-minute timer. Flag questions and review them before finishing. The tests use separate questions; the second is held out for a fresh check of these concepts.
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
                The Seven SSCP Domains
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each fixed test follows the official domain percentages exactly. Practice focuses on selected operational concepts. Adaptive selection, unscored items, advanced formats and exhaustive technology coverage are not included.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("sscp", 3)}
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
            How to Study for the SSCP
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Identify the constraint</h3>
              <p>
                Find the actual requirement: a trust boundary, a recovery limit, a device-management need or an authorization rule. Several controls may be useful, but only one directly addresses the stated gap.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Follow the evidence</h3>
              <p>
                Separate authentication from authorization, configuration from observed behavior, and a completed change from a verified outcome. Use the logs and measurements provided in the question.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Explain the alternatives</h3>
              <p>
                For each missed question, identify the circumstance in which another option would be appropriate. This builds understanding of scope and timing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Add hands-on preparation</h3>
              <p>
                Use authorized practical work and the current ISC2 outline alongside these conceptual drills. A high percentage here does not assess CAT performance, advanced items or hands-on administration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SSCP Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="sscp" />
        </div>
      </div>

      <SampleQuestionsV2 examId="sscp" />

      <ExamRelatedTests examId="sscp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start SSCP Practice</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with Security Concepts and Practices, then work through the seven domains.</p>
          <ExamLandingCTA dashboardHref="/isc2-sscp/dashboard" />
        </div>
      </div>
    </div>
  );
}

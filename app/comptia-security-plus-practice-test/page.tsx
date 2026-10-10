import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CompTIA Security+ Practice Test 2026 - SY0-701 Exam Prep";
const description =
  "Free CompTIA Security+ practice tests with 200 questions weighted to the SY0-701 objectives: general security concepts, threats, vulnerabilities and mitigations, security architecture, security operations, and security program management. Scenario questions with explanations.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "CompTIA Security+ practice test, Security+ SY0-701 practice exam, Security plus practice questions, SY0-701 exam prep 2026, free Security+ practice test, CompTIA Security+ questions",
  alternates: {
    canonical: `${siteUrl}/comptia-security-plus-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/comptia-security-plus-practice-test`,
    images: [{ url: "/og/secplus", width: 1200, height: 630, alt: "TigerTest free Security+ practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/secplus"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Security+ Practice Tests",
      description,
      url: `${siteUrl}/comptia-security-plus-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 Security+ practice questions",
        "4 practice tests weighted to the SY0-701 objectives",
        "Training sets for every domain",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many questions are on the Security+ exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Up to 90 questions in 90 minutes, mixing multiple choice, multiple response and performance-based items. The passing score is 750 on a scale of 100 to 900. SY0-701 is the current version through at least 2026.",
          },
        },
        {
          "@type": "Question",
          name: "Does this include performance-based questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Everything here is four-option single answer, which is most of the real exam. Performance-based items simulate a firewall rule set, a log review or a network diagram, so pair this bank with hands-on practice.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need A+ or Network+ first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CompTIA recommends Network+ and two years of IT administration experience with a security focus, but there is no prerequisite. Many candidates go straight to Security+.",
          },
        },
        {
          "@type": "Question",
          name: "Which version is this for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SY0-701, which launched in November 2023 and replaced SY0-601 in July 2024. Domain names and weights match the SY0-701 objectives.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest Security+ practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "General Security Concepts", weight: "12%" },
  { name: "Threats, Vulnerabilities & Mitigations", weight: "22%" },
  { name: "Security Architecture", weight: "18%" },
  { name: "Security Operations", weight: "28%" },
  { name: "Program Management & Oversight", weight: "20%" },
];

export default function SecplusLandingPage() {
  return (
    <div data-theme="secplus" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="secplus" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free CompTIA Security+ Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/comptia-security-plus/dashboard"
            shortName="Security+"
            subtitle="200 questions weighted to the SY0-701 objectives. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/secplus-mobile.png", desktop: "/landing/secplus-desktop.png" }}
          />
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Domain</h3>
              <p className="text-gray-600">
                Five sets, one per domain: general security concepts, threats, vulnerabilities and mitigations, security architecture, security operations, and program management and oversight. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests written the CompTIA way: an analyst, a log or a symptom, and the control or action that BEST fits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the SY0-701 Objectives
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                CompTIA publishes the domain weighting for Security+, and SY0-701 shifted the emphasis toward operations and governance. Every practice test here draws questions in those proportions, so security operations and threats carry the most weight.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("secplus", 1)}
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The Security+ practice test is brand new. If a question looks wrong or an objective has changed, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Pass the CompTIA Security+
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Learn the objectives&apos; vocabulary</h3>
              <p>
                SY0-701 tests terms exactly as the objectives list them: honeytoken vs honeyfile, impossible travel, policy enforcement point, fail-closed, attestation, exposure factor. If a word in an option is in the objectives, know what it means and how it differs from its neighbors.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Think in order: identify, then the BEST control</h3>
              <p>
                Most scenarios describe an attack or a gap and ask for the BEST or FIRST response. Name the attack to yourself, then pick the control that addresses it directly. Options that are good practice but off-target are the distractors.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Do the math</h3>
              <p>
                Annualized loss expectancy is single loss expectancy times annualized rate of occurrence; RTO is how long you can be down, RPO is how much data you can lose. Expect a handful of these on exam day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak domain</h3>
              <p>
                TigerTest tracks your accuracy by domain. Security+ passes at 750 of 900, so retake the domain you miss most until you clear 85 percent with room to spare, then expect a few performance-based items at the start of the real exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          CompTIA Security+ Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the Security+ exam?</h3>
            <p className="text-gray-600">
              Up to 90 questions in 90 minutes, mixing multiple choice, multiple response and performance-based items. The passing score is 750 on a scale of 100 to 900. SY0-701 is the current version through at least 2026.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this include performance-based questions?</h3>
            <p className="text-gray-600">
              No. Everything here is four-option single answer, which is most of the real exam. Performance-based items simulate a firewall rule set, a log review or a network diagram, so pair this bank with hands-on practice.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Do I need A+ or Network+ first?</h3>
            <p className="text-gray-600">
              CompTIA recommends Network+ and two years of IT administration experience with a security focus, but there is no prerequisite. Many candidates go straight to Security+.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Which version is this for?</h3>
            <p className="text-gray-600">
              SY0-701, which launched in November 2023 and replaced SY0-601 in July 2024. Domain names and weights match the SY0-701 objectives.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest Security+ practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="secplus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Security+?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all five domains.</p>
          <ExamLandingCTA dashboardHref="/comptia-security-plus/dashboard" />
        </div>
      </div>
    </div>
  );
}

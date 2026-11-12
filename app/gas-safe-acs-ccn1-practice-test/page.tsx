import "@/lib/banks/ukgas";
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

const title = "Gas Safe ACS CCN1 Practice Test 2026 - Free Gas Safety Mock Exams";
const metaDescription =
  "Free ACS CCN1 practice: 200 original questions on gas safety law, unsafe situations, CO, ventilation, flues, tightness testing, meters and safety devices.";
const description =
  "Free practice for the knowledge side of the ACS CCN1 core domestic gas safety assessment: 200 original questions on gas safety legislation, emergency actions, combustion, carbon monoxide, ventilation, tightness testing and purging, meters and regulators, unsafe situations, safety devices, chimneys and flues and appliance installation. Four 50-question practice tests with an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "acs ccn1 practice test, gas safe mock exam, ccn1 questions, gas safety exam uk, unsafe situations questions, tightness test quiz, gsiur l56 practice, acs reassessment practice",
  alternates: {
    canonical: `${siteUrl}/gas-safe-acs-ccn1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/gas-safe-acs-ccn1-practice-test`,
    images: [{ url: shareImageUrl("ukgas"), width: 1200, height: 630, alt: "Tigertest free Gas Safe ACS CCN1 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukgas")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Gas Safe ACS (CCN1) Practice",
      description,
      url: `${siteUrl}/gas-safe-acs-ccn1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukgas", "GBP"),
      featureList: ["200 gas safety practice questions", "4 practice tests of 50 questions", "5 training sets by topic", "Instant feedback with explanations", "Auto-save progress"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is ACS CCN1?",
          acceptedAnswer: { "@type": "Answer", text: "It is the core domestic natural gas safety assessment of the Nationally Accredited Certification Scheme. Passing it, with the appliance assessments for the work you do, gives a certificate of competence that Gas Safe Register accepts for registration." },
        },
        {
          "@type": "Question",
          name: "Does this practice test cover the practical assessment?",
          acceptedAnswer: { "@type": "Answer", text: "No. It covers the knowledge side: the law, L56, the unsafe situations procedure, combustion, CO, ventilation, flues, tightness testing, meters and safety devices. Pipework, live testing and appliance work are assessed hands-on at the assessment centre." },
        },
        {
          "@type": "Question",
          name: "What pass mark should I aim for?",
          acceptedAnswer: { "@type": "Answer", text: "The scheme does not publish a percentage for the theory papers. Tigertest uses 70% as a readiness line; aim well above it, because a single wrong call on an Immediately Dangerous situation matters more than a score." },
        },
        {
          "@type": "Question",
          name: "Which rules does it follow?",
          acceptedAnswer: { "@type": "Answer", text: "The Gas Safety (Installation and Use) Regulations 1998 as amended and HSE's L56 code of practice, IGEM/G/11 Edition 2 (with the 2022 and 2024 amendments), the CCN1 criteria Issue 20.1 and, for building rules, England's Approved Document J. Northern Ireland has its own regulations." },
        },
        {
          "@type": "Question",
          name: "How often do gas engineers have to be reassessed?",
          acceptedAnswer: { "@type": "Answer", text: "ACS certificates are renewed every five years, through ACS reassessment or the Group Competency Scheme." },
        },
        classFaqJsonLd("ukgas"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Gas Safety Legislation", weight: "12%" },
  { name: "Gas Emergency Actions", weight: "8%" },
  { name: "Combustion & Gas Properties", weight: "8%" },
  { name: "Carbon Monoxide", weight: "8%" },
  { name: "Ventilation", weight: "8%" },
  { name: "Tightness Testing & Purging", weight: "10%" },
  { name: "Meters, Regulators & ECVs", weight: "8%" },
  { name: "Unsafe Situations", weight: "10%" },
  { name: "Gas Safety Devices & Controls", weight: "8%" },
  { name: "Chimneys & Flues", weight: "10%" },
  { name: "Appliance Installation", weight: "10%" },
];

export default function UkgasLandingPage() {
  return (
    <div data-theme="ukgas" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Gas Safe ACS (CCN1) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/gas-safe-acs/dashboard"
            shortName="Gas Safe ACS"
            subtitle="200 questions on the knowledge side of ACS CCN1: gas safety law and L56, unsafe situations, CO, ventilation, flues, tightness testing and safety devices. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukgas-mobile.png", desktop: "/landing/ukgas-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukgas" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets, from Legislation & Emergency Actions to Unsafe Situations & Safety Devices. Master a topic, then take a test. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question practice tests across every CCN1 topic, with a 70% readiness line and an explanation of the right answer on every question.
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
                Built on the CCN1 Assessment Criteria
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The ACS does not publish how the theory papers are weighted, so the practice tests spread across the sections of the CCN1 criteria, with the law, tightness testing, unsafe situations, flues and appliances carrying the most questions. Every question is original. Paid standards are not quoted.
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
                src={getTigerAsset("ukgas", 1)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For teachers */}
      <div className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">For Course Tutors</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Running ACS or gas training courses? Set Tigertest as practice before assessment at{" "}
          <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
          {" "}and see which topics your candidates miss most. It is free for you and your learners.
        </p>
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
            How to Prepare for ACS CCN1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the unsafe situations procedure cold</h3>
              <p>
                Learn the difference between Immediately Dangerous and At Risk, what you must do for each, and what you need the responsible person&apos;s permission for. A wrong call here matters more than any score.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the law by regulation</h3>
              <p>
                Know who the Gas Safety (Installation and Use) Regulations put duties on: the installer, the landlord, the responsible person. Know what the L56 code says about competence, safety checks and records.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Understand combustion and CO</h3>
              <p>
                Know what complete and incomplete combustion produce, the signs of an appliance making carbon monoxide, and the symptoms and actions when CO is suspected.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 90 percent on every practice test, then retrain your weakest topic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Gas Safe ACS (CCN1) Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is ACS CCN1?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is the core domestic natural gas safety assessment of the Nationally Accredited Certification Scheme. Passing it, with the appliance assessments for the work you do, gives a certificate of competence that Gas Safe Register accepts for registration.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this practice test cover the practical assessment?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. It covers the knowledge side: the law, L56, the unsafe situations procedure, combustion, CO, ventilation, flues, tightness testing, meters and safety devices. Pipework, live testing and appliance work are assessed hands-on at the assessment centre.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What pass mark should I aim for?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The scheme does not publish a percentage for the theory papers. Tigertest uses 70% as a readiness line; aim well above it, because a single wrong call on an Immediately Dangerous situation matters more than a score.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which rules does it follow?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Gas Safety (Installation and Use) Regulations 1998 as amended and HSE&apos;s L56 code of practice, IGEM/G/11 Edition 2 (with the 2022 and 2024 amendments), the CCN1 criteria Issue 20.1 and, for building rules, England&apos;s Approved Document J. Northern Ireland has its own regulations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How often do gas engineers have to be reassessed?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              ACS certificates are renewed every five years, through ACS reassessment or the Group Competency Scheme.
            </p>
          </div>
          <ExamClassFaq examId="ukgas" />
        </div>
      </div>

      <ExamSampleQuestions examId="ukgas" />

      <ExamRelatedTests examId="ukgas" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your ACS Assessment?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every CCN1 topic.</p>
          <ExamLandingCTA dashboardHref="/gas-safe-acs/dashboard" />
        </div>
      </div>
    </div>
  );
}

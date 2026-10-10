import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Property & Casualty Insurance Practice Test 2026 - P&C License Exam";
const description =
  "Free property and casualty insurance license practice tests with 200 questions on the general portion every state tests: insurance basics and underwriting, policy provisions, dwelling and homeowners forms, the Personal Auto Policy, commercial property and the BOP, general liability and workers compensation, flood and surety. Worked arithmetic on every coinsurance and split-limit item.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "property and casualty insurance practice test, P&C license exam prep, property casualty practice questions, insurance producer exam 2026, homeowners insurance exam questions, personal auto policy practice test, free P&C practice exam",
  alternates: {
    canonical: `${siteUrl}/property-casualty-insurance-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/property-casualty-insurance-practice-test`,
    images: [{ url: "/og/pnc", width: 1200, height: 630, alt: "TigerTest free property and casualty insurance practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/pnc"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Property & Casualty Insurance Practice Tests",
      description,
      url: `${siteUrl}/property-casualty-insurance-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 property and casualty practice questions",
        "4 practice tests weighted to the general portion of the P&C exam",
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
          name: "How many questions are on the property and casualty insurance exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A combined property and casualty producer exam typically has 100 to 150 scored questions with 2 to 3 hours to finish, delivered through Pearson VUE, PSI or Prometric depending on the state. Most states pass at 70 percent. The exam has a general portion and a state portion, and each state sets the exact count and time.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover my state's exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It covers the general portion, which is shared by every state's exam: insurance concepts, policy structure, the ISO dwelling and homeowners forms, the Personal Auto Policy, the commercial package and businessowners policies, general liability, workers compensation, flood and surety. The state portion (license law, cancellation notice periods, minimum auto limits, financial responsibility rules) is separate and not covered here.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need pre-licensing education before I can take the exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pre-licensing hours vary by state. Some states require 20 to 40 hours of approved coursework for each line before you can sit for the exam, others require none. Check your state's insurance department for the requirement, then use these tests to find out whether you actually know the material.",
          },
        },
        {
          "@type": "Question",
          name: "What is hardest about the P&C exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Telling the ISO forms apart (HO-2 versus HO-3 versus HO-5, DP-1 versus DP-3), the homeowners special limits, the Personal Auto Policy parts and their small figures, and the arithmetic for coinsurance, pro rata other insurance and split limits. Every explanation here spells out the number or the calculation and why the tempting wrong answer fails.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the same as the life and health insurance exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Property and casualty and life and health are separate license lines with separate exams, though both share the same insurance basics and agency law. TigerTest has a separate Life & Health practice test. All four P&C practice tests and all training sets here are free, with no account required.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Insurance Basics & Underwriting", weight: "14%" },
  { name: "Policy Provisions & Conditions", weight: "14%" },
  { name: "Dwelling & Homeowners", weight: "18%" },
  { name: "Personal Auto", weight: "18%" },
  { name: "Commercial Property & BOP", weight: "16%" },
  { name: "Commercial Liability & Workers Comp", weight: "12%" },
  { name: "Flood, Surety & Other Coverages", weight: "8%" },
];

export default function PncLandingPage() {
  return (
    <div data-theme="pnc" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="pnc" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Property &amp; Casualty Insurance Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/property-casualty-insurance/dashboard"
            shortName="P&C"
            subtitle="200 questions on the general portion of the P&C producer exam: homeowners, auto, commercial lines, liability and workers comp. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/pnc-mobile.png", desktop: "/landing/pnc-desktop.png" }}
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
                Four sets: basics and policy provisions, dwelling and homeowners, personal auto, and commercial lines with flood and surety. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that sample every content area the way the real general portion does, with the arithmetic written out on every coinsurance, pro rata and split-limit item.
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
                Built on the P&amp;C General Portion
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every state&apos;s property and casualty exam opens with a general portion built on the same ISO forms: the dwelling and homeowners policies, the Personal Auto Policy, the commercial package and businessowners policies, the CGL and the workers compensation policy. The practice tests here give homeowners and auto the most weight because that is where exam questions and candidate mistakes pile up.
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
                src={getTigerAsset("pnc", 1)}
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
            The property and casualty practice test is brand new. If a question looks wrong or your exam outline weights a topic differently, tell us.
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
            How to Pass the P&amp;C Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Learn the forms as a family</h3>
              <p>
                DP-1, DP-2 and DP-3 go from fire-only to open perils on the dwelling. HO-2 is named perils, HO-3 is open perils on the building and named perils on contents, HO-5 is open perils on both, HO-4 is for renters, HO-6 for condo owners and HO-8 for older homes. Know which valuation each uses and the question usually answers itself.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Memorize the small numbers</h3>
              <p>
                $200 for money, $1,500 for jewelry theft, $2,500 for firearms and silverware, $500 per tree, two weeks of civil authority under the HO forms and four weeks under business income, $20 a day up to $600 for transportation under Part D, $200 a day for loss of earnings under the PAP and $250 under the CGL. These are the figures the exam swaps to build wrong answers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Practice the three calculations</h3>
              <p>
                Coinsurance is did over should, times the loss, minus the deductible. Pro rata other insurance is each policy&apos;s limit over the total limits. Split limits cap each injured person first, then the accident, then property damage. Work them until they take thirty seconds, because the exam gives you a calculator but no formula sheet.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak domain, then book the state portion</h3>
              <p>
                TigerTest tracks your accuracy by content area. Most states pass at 70 percent, so retake the set you miss most until you clear 85 percent with room to spare, then spend your last week on your state&apos;s own license law, which this test does not cover.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          P&amp;C Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the property and casualty insurance exam?</h3>
            <p className="text-gray-600">
              A combined property and casualty producer exam typically has 100 to 150 scored questions with 2 to 3 hours to finish, delivered through Pearson VUE, PSI or Prometric depending on the state. Most states pass at 70 percent. The exam has a general portion and a state portion, and each state sets the exact count and time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this cover my state&apos;s exam?</h3>
            <p className="text-gray-600">
              It covers the general portion, which is shared by every state&apos;s exam: insurance concepts, policy structure, the ISO dwelling and homeowners forms, the Personal Auto Policy, the commercial package and businessowners policies, general liability, workers compensation, flood and surety. The state portion (license law, cancellation notice periods, minimum auto limits, financial responsibility rules) is separate and not covered here.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Do I need pre-licensing education before I can take the exam?</h3>
            <p className="text-gray-600">
              Pre-licensing hours vary by state. Some states require 20 to 40 hours of approved coursework for each line before you can sit for the exam, others require none. Check your state&apos;s insurance department for the requirement, then use these tests to find out whether you actually know the material.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is hardest about the P&amp;C exam?</h3>
            <p className="text-gray-600">
              Telling the ISO forms apart (HO-2 versus HO-3 versus HO-5, DP-1 versus DP-3), the homeowners special limits, the Personal Auto Policy parts and their small figures, and the arithmetic for coinsurance, pro rata other insurance and split limits. Every explanation here spells out the number or the calculation and why the tempting wrong answer fails.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is this the same as the life and health insurance exam?</h3>
            <p className="text-gray-600">
              No. Property and casualty and life and health are separate license lines with separate exams, though both share the same insurance basics and agency law. TigerTest has a separate Life &amp; Health practice test. All four P&amp;C practice tests and all training sets here are free, with no account required.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="pnc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass the P&amp;C Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across the whole general portion.</p>
          <ExamLandingCTA dashboardHref="/property-casualty-insurance/dashboard" />
        </div>
      </div>
    </div>
  );
}

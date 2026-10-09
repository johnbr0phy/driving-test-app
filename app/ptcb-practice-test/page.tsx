import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free PTCB Practice Test 2026 - Pharmacy Technician Exam Prep";
const description =
  "Free PTCB practice tests with 200 questions weighted to the 2026 PTCE content outline: medications, patient safety and quality assurance, order entry and pharmacy math, and federal requirements. Worked calculations and explanations on every question.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "PTCB practice test, PTCE practice exam, pharmacy technician practice test, pharmacy tech exam questions, PTCB exam prep 2026, pharmacy math practice, free PTCB practice questions",
  alternates: {
    canonical: `${siteUrl}/ptcb-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/ptcb-practice-test`,
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free PTCB Practice Tests",
      description,
      url: `${siteUrl}/ptcb-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 PTCE practice questions",
        "4 practice tests weighted to the 2026 PTCE outline",
        "Training sets for every knowledge domain",
        "Worked pharmacy math on every calculation",
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
          name: "How many questions are on the PTCB exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The PTCE has 90 multiple-choice questions, 80 scored and 10 unscored pretest items, with 110 minutes of testing time. It is scored on a scale of 1,000 to 1,600 and 1,400 is passing. Because the score is scaled there is no fixed percentage, but about 70 percent correct is a safe target.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the 2026 PTCE content outline?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Four knowledge domains: Medications 35 percent, Patient Safety and Quality Assurance 23.75 percent, Order Entry and Processing 22.5 percent, and Federal Requirements 18.75 percent. The January 2026 update shifted weight from Medications to Federal Requirements and added the DSCSA.",
          },
        },
        {
          "@type": "Question",
          name: "How much math is on the PTCB exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Calculation-based knowledge statements appear in every domain, not just Order Entry: days supply, conversions, dilutions, dosing by weight, pseudoephedrine limits, DEA number checks and expiration dates. Every calculation question here shows the arithmetic in its explanation.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest PTCB practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all four training sets are free, with no account required.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Medications", weight: "35%" },
  { name: "Patient Safety & Quality Assurance", weight: "23.75%" },
  { name: "Order Entry & Processing", weight: "22.5%" },
  { name: "Federal Requirements", weight: "18.75%" },
];

export default function PtcbLandingPage() {
  return (
    <div data-theme="ptcb" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free PTCB Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ptcb/dashboard"
            shortName="PTCB"
            subtitle="200 questions weighted to the 2026 PTCE content outline. Worked math on every calculation. No account needed."
            shots={{ mobile: "/landing/ptcb-mobile.png", desktop: "/landing/ptcb-desktop.png" }}
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
                Four sets matching the four PTCE domains: medications, patient safety and quality
                assurance, order entry and processing, and federal requirements. Questions you miss
                come back until you have mastered them.
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
                Four 50-question tests weighted like the real exam, with the same mix of recall,
                pharmacy scenarios and calculations. Every math question shows its working in the
                explanation.
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
                Built on the 2026 PTCE Content Outline
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                PTCB publishes the weighting of its four knowledge domains, updated in January 2026.
                Every practice test here follows that weighting, and the bank covers only federal law
                so nothing you learn is a single state&apos;s rule.
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
                src={getTigerAsset("ptcb", 1)}
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
            The PTCB practice test is brand new. If a question looks wrong or a calculation
            doesn&apos;t add up, tell us.
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
            How to Pass the PTCB Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Learn the top 200 drugs as pairs</h3>
              <p>
                Brand, generic, class and what it treats, together. Medications is 35 percent of the
                exam and most of those questions are recognition: which drug is a statin, which pair
                is a therapeutic duplication, which one interacts with warfarin.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Do the math by hand</h3>
              <p>
                Days supply, household to metric conversions, percent and ratio strength, alligation,
                mg per kg dosing and IV rates. The exam gives you a calculator, but the mistakes come
                from setting the problem up wrong, so practice the setup until it is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Know the federal numbers cold</h3>
              <p>
                Schedule II has no refills, III and IV get five in six months, DEA Form 222 orders CII,
                Form 106 reports theft, pseudoephedrine is 3.6 grams a day and 9 grams in 30 days,
                refrigerators run 2 to 8 degrees Celsius. Federal Requirements grew to almost 19 percent
                in 2026.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak domain</h3>
              <p>
                TigerTest tracks your accuracy by domain. After each practice test, go back to the set
                you missed most and retake until you clear 70 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          PTCB Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the PTCB exam?</h3>
            <p className="text-gray-600">
              The PTCE has 90 multiple-choice questions, 80 scored and 10 unscored pretest items, with
              110 minutes of testing time. It is scored on a scale of 1,000 to 1,600 and 1,400 is
              passing. Because the score is scaled there is no fixed percentage, but about 70 percent
              correct is a safe target.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the 2026 PTCE content outline?</h3>
            <p className="text-gray-600">
              Four knowledge domains: Medications 35 percent, Patient Safety and Quality Assurance
              23.75 percent, Order Entry and Processing 22.5 percent, and Federal Requirements 18.75
              percent. The January 2026 update shifted weight from Medications to Federal Requirements
              and added the Drug Supply Chain Security Act.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How much math is on the PTCB exam?</h3>
            <p className="text-gray-600">
              Calculation-based knowledge statements appear in every domain, not just Order Entry: days
              supply, conversions, dilutions, dosing by weight, pseudoephedrine limits, DEA number
              checks and expiration dates. Every calculation question here shows the arithmetic in its
              explanation.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest PTCB practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all four training sets are free, with no account required.
              Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass the PTCE?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/ptcb/dashboard" />
        </div>
      </div>
    </div>
  );
}

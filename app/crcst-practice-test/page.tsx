import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CRCST Practice Test 2026 - Sterile Processing Exam Prep";
const description =
  "Free HSPA CRCST practice tests with 200 questions weighted to the official exam content outline. Decontamination, preparation and packaging, sterilization, storage, and patient care equipment with instant feedback. Also covers the CBSPD CSPDT.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "CRCST practice test, HSPA CRCST exam, sterile processing practice questions, sterile processing technician exam prep, CSPDT practice test, CBSPD exam, central service technician certification",
  alternates: {
    canonical: `${siteUrl}/crcst-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/crcst-practice-test`,
    images: [{ url: "/og/crcst", width: 1200, height: 630, alt: "TigerTest free CRCST practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/crcst"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free CRCST (HSPA) Practice Tests",
      description,
      url: `${siteUrl}/crcst-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CRCST practice questions",
        "4 blueprint-weighted practice tests",
        "Training sets for all 7 HSPA exam sections",
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
          name: "How many questions are on the CRCST exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The HSPA CRCST exam has 150 multiple-choice questions in 3 hours. 140 are scored and 10 are unscored pretest items. A scaled score of 70 out of 100 is passing.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does the CRCST exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Per the HSPA content outline revised November 2023: Departmental Considerations 15 percent, Cleaning, Decontamination and Disinfection 21 percent, Preparation and Packaging 21 percent, Sterilization Process 21 percent, Sterile Storage and Inventory Management 9 percent, Patient Care Equipment and Distribution 5 percent, and Professional Development and Human Relations 8 percent.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest CRCST practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all six training sets are free, with no account required.",
          },
        },
        {
          "@type": "Question",
          name: "Does this work for the CBSPD CSPDT exam too?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The CBSPD Certified Sterile Processing and Distribution Technician (CSPDT) exam covers the same decontamination, packaging, sterilization, storage, and equipment material, so this bank prepares you for either credential.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Cleaning, Decontamination & Disinfection", weight: "21%" },
  { name: "Preparation & Packaging", weight: "21%" },
  { name: "Sterilization Process", weight: "21%" },
  { name: "Departmental Considerations", weight: "15%" },
  { name: "Sterile Storage & Inventory", weight: "9%" },
  { name: "Professional Development", weight: "8%" },
  { name: "Patient Care Equipment", weight: "5%" },
];

export default function CRCSTLandingPage() {
  return (
    <div data-theme="crcst" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="crcst" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free CRCST Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/crcst/dashboard"
            shortName="CRCST"
            subtitle="200 questions weighted to the HSPA content outline. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/crcst-mobile.png", desktop: "/landing/crcst-desktop.png" }}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Exam Section</h3>
              <p className="text-gray-600">
                Sets follow the seven HSPA sections. Get instant feedback after each answer, and
                questions you miss come back until you have mastered them.
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
                Four 50-question tests that mirror the real exam&apos;s weighting. Decontamination,
                preparation and packaging, and sterilization make up 63 percent of every test.
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
                Built on the Official HSPA Content Outline
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                HSPA publishes the exact weighting of the CRCST exam (content outline revised
                November 2023). Every practice test here follows it.
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
                src={getTigerAsset("crcst", 1)}
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
            The CRCST practice test is brand new. If a question looks wrong or you want a topic
            covered in more depth, tell us.
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
            How to Pass the CRCST Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know the exam format</h3>
              <p>
                150 multiple-choice questions in 3 hours: 140 scored plus 10 unscored pretest items.
                A scaled score of 70 passes. You also need 400 hours of hands-on experience within
                6 months of passing to receive the credential.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Weight your study like the exam</h3>
              <p>
                Decontamination, preparation and packaging, and sterilization are 21 percent each, so
                start with those three training sets. Departmental considerations is next at 15 percent.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Study from the HSPA manual</h3>
              <p>
                The exam is written from the HSPA Central Service Technical Manual (9th ed.) and its workbook.
                Pair it with ANSI/AAMI ST79 for steam sterilization and ST91 for flexible endoscopes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak areas</h3>
              <p>
                TigerTest tracks your accuracy by content area. After each practice test, go back to the
                training set for the area you missed most.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          CRCST Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the CRCST exam?</h3>
            <p className="text-gray-600">
              150 multiple-choice questions in 3 hours. 140 are scored and 10 are unscored pretest items.
              A scaled score of 70 out of 100 is passing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What topics does the CRCST exam cover?</h3>
            <p className="text-gray-600">
              Departmental Considerations (15 percent), Cleaning, Decontamination and Disinfection (21 percent),
              Preparation and Packaging (21 percent), Sterilization Process (21 percent), Sterile Storage and
              Inventory (9 percent), Patient Care Equipment (5 percent), and Professional Development (8 percent).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this work for the CBSPD CSPDT exam too?</h3>
            <p className="text-gray-600">
              Yes. The CBSPD Certified Sterile Processing and Distribution Technician exam covers the same
              decontamination, packaging, sterilization, storage, and equipment material as the CRCST.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest CRCST practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all six training sets are free, with no account required.
              Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="crcst" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass the CRCST Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all seven sections.</p>
          <ExamLandingCTA dashboardHref="/crcst/dashboard" />
        </div>
      </div>
    </div>
  );
}

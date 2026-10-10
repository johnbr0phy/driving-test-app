import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CDL Endorsement Practice Tests 2026 - HazMat, Air Brakes, Tanker, Passenger";
const description =
  "Free CDL endorsement practice tests from the FMCSA manual: hazardous materials (H), air brakes, combination vehicles, tank vehicles (N) and passenger transport (P). 200 questions with a training set per endorsement and instant feedback.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "CDL hazmat practice test, hazardous materials endorsement test, CDL air brakes practice test, combination vehicles practice test, tanker endorsement practice test, passenger endorsement practice test, CDL endorsement test questions",
  alternates: {
    canonical: `${siteUrl}/cdl-endorsement-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/cdl-endorsement-practice-test`,
    images: [{ url: "/og/cdlx", width: 1200, height: 630, alt: "TigerTest free CDL Endorsements practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/cdlx"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free CDL Endorsement Practice Tests",
      description,
      url: `${siteUrl}/cdl-endorsement-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CDL endorsement practice questions",
        "Training sets for HazMat, air brakes, combination, tank and passenger",
        "4 mixed practice tests at the 80% pass line",
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
          name: "How many questions are on the CDL HazMat test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The hazardous materials endorsement knowledge test has 30 questions in most states and you need 80 percent, 24 correct, to pass. You also need a TSA security threat assessment with fingerprinting before the H endorsement is added to your license.",
          },
        },
        {
          "@type": "Question",
          name: "Is air brakes an endorsement?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Air brakes is a restriction, not an endorsement. If you skip the air brakes knowledge test, or take your skills test in a vehicle without air brakes, your CDL carries an L restriction that bars you from driving air-brake vehicles. The knowledge test has 25 questions and needs 80 percent.",
          },
        },
        {
          "@type": "Question",
          name: "Which endorsement tests do I need?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Combination vehicles is required for a Class A license. Tank vehicles (N) is for liquid or gas cargo in tanks of 1,000 gallons or more. Passenger (P) is for vehicles designed for 16 or more people including the driver. Hazardous materials (H) is for placarded loads; X combines N and H. Each knowledge test needs 80 percent.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest endorsement practice free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All five training sets and all four mixed practice tests are free, with no account required.",
          },
        },
      ],
    },
  ],
};

const endorsements = [
  { name: "Hazardous Materials (H)", detail: "FMCSA manual section 9 · real test 30 questions, 80%", questions: 52 },
  { name: "Air Brakes", detail: "Section 5 · 25 questions, 80% · avoids the L restriction", questions: 44 },
  { name: "Combination Vehicles", detail: "Section 6 · 20 questions, 80% · required for Class A", questions: 40 },
  { name: "Tank Vehicles (N)", detail: "Section 8 · 20 questions, 80%", questions: 32 },
  { name: "Passenger Transport (P)", detail: "Section 4 · 20 questions, 80%", questions: 32 },
];

export default function CDLEndorsementsLandingPage() {
  return (
    <div data-theme="cdlx" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="cdlx" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free CDL Endorsement Practice Tests 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cdl-endorsements/dashboard"
            shortName="CDL endorsement"
            subtitle="HazMat, air brakes, combination, tank and passenger. 200 questions from the FMCSA manual. No account needed."
            shots={{ mobile: "/landing/cdlx-mobile.png", desktop: "/landing/cdlx-desktop.png" }}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">One Training Set per Endorsement</h3>
              <p className="text-gray-600">
                Adding HazMat? Train only the HazMat set. Each set is one section of the FMCSA
                manual, and questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mixed Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests across all five endorsements at the 80 percent pass line every
                endorsement test uses. Good for Class A drivers stacking several at once.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Endorsements */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Five Tests, Straight from the FMCSA Manual
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every state CDL handbook reprints the FMCSA model manual. These sets follow its
                endorsement sections, with the real test length and pass mark for each.
              </p>
              <div className="space-y-3">
                {endorsements.map((e) => (
                  <div key={e.name} className="flex items-center justify-between gap-4 bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <div>
                      <span className="block font-medium text-gray-900">{e.name}</span>
                      <span className="block text-sm text-gray-500">{e.detail}</span>
                    </div>
                    <span className="text-brand font-semibold whitespace-nowrap">{e.questions} questions</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("cdlx", 1)}
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
            The endorsement practice tests are brand new. If a question looks wrong or you want
            doubles and triples or school bus added, tell us.
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
            How to Pass Your CDL Endorsement Tests
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know which tests you need</h3>
              <p>
                Combination vehicles is required for Class A. Air brakes is not an endorsement but
                skipping it puts an L restriction on your license. Tank (N), passenger (P) and
                hazardous materials (H) are endorsements you add for the cargo or vehicle you drive;
                X combines tank and HazMat.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the numbers</h3>
              <p>
                Endorsement tests lean on figures: 125 psi governor cut-out, 60 psi low-air warning,
                placards at 1,001 pounds, 1,000-gallon tanks, 16 passengers, 300 feet from explosives
                parking, 15 to 50 feet at railroad crossings. The training sets drill every one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. HazMat has an extra step</h3>
              <p>
                Passing the knowledge test is not enough for the H endorsement. You also need a TSA
                security threat assessment with fingerprints, which can take several weeks, so
                start it before your test date.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak areas</h3>
              <p>
                TigerTest tracks your accuracy by endorsement. After a mixed test, go back to the set
                you missed most and retake until you clear 80 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          CDL Endorsement Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the CDL HazMat test?</h3>
            <p className="text-gray-600">
              30 questions in most states, 80 percent (24 correct) to pass. You also need a TSA
              security threat assessment with fingerprinting before the H endorsement is added.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is air brakes an endorsement?</h3>
            <p className="text-gray-600">
              No, it is a restriction. Skip the air brakes knowledge test, or take your skills test in a
              vehicle without air brakes, and your CDL carries an L restriction that bars you from
              air-brake vehicles. The knowledge test has 25 questions and needs 80 percent.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Which endorsement tests do I need?</h3>
            <p className="text-gray-600">
              Combination vehicles for Class A. Tank (N) for liquid or gas cargo in tanks of 1,000
              gallons or more. Passenger (P) for vehicles designed for 16 or more including the driver.
              Hazardous materials (H) for placarded loads; X combines N and H. Each test needs 80 percent.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest endorsement practice free?</h3>
            <p className="text-gray-600">
              Yes. All five training sets and all four mixed practice tests are free, with no account
              required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="cdlx" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Add Your Endorsements?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across five endorsements.</p>
          <ExamLandingCTA dashboardHref="/cdl-endorsements/dashboard" />
        </div>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Dental Assistant Practice Test 2026 - DANB CDA Exam Prep";
const description =
  "Free dental assistant practice tests with 200 questions across all three DANB CDA component exams: General Chairside (GC), Radiation Health and Safety (RHS) and Infection Control (ICE). Chairside procedures, materials, charting, radiography technique and safety, sterilization and OSHA, with explanations.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "dental assistant practice test, DANB practice test, CDA exam questions, DANB RHS practice test, DANB ICE practice test, general chairside practice exam, dental assistant certification prep 2026, free DANB practice questions",
  alternates: {
    canonical: `${siteUrl}/dental-assistant-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/dental-assistant-practice-test`,
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
      name: "TigerTest - Free Dental Assistant Practice Tests",
      description,
      url: `${siteUrl}/dental-assistant-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 dental assistant practice questions",
        "4 practice tests across the DANB GC, RHS and ICE outlines",
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
          name: "How many questions are on the DANB CDA exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The CDA is three component exams you can take together or separately: General Chairside (95 questions, 75 minutes), Radiation Health and Safety (75 questions, 75 minutes) and Infection Control (75 questions, 75 minutes). Each is scored on a scale of 100 to 900 with 400 to pass. About 70 percent correct is a safe target.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the DANB exams?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "General Chairside: collection and recording of clinical data 17 percent, patient management and administration 17 percent, chairside dentistry 50 percent, dental materials 16 percent. RHS: purpose and technique 50 percent, radiation safety 25 percent, infection prevention in radiography 25 percent. ICE: disease transmission 20 percent, cross-contamination 34 percent, instrument processing 26 percent, occupational safety and administration 20 percent.",
          },
        },
        {
          "@type": "Question",
          name: "Can I take just the RHS or ICE exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Many states require RHS or ICE on their own for expanded functions, and DANB offers each component separately. The training sets here map to the components, so you can study RHS or ICE alone and skip the rest.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest dental assistant practice test free?",
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
  { name: "General Chairside: Chairside Dentistry", weight: "25 per test" },
  { name: "General Chairside: Evaluation, Management & Materials", weight: "12 per test" },
  { name: "Radiation Health & Safety", weight: "13 per test" },
  { name: "Infection Control", weight: "12 per test" },
];

export default function DentalAssistantLandingPage() {
  return (
    <div data-theme="danb" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Dental Assistant Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/dental-assistant/dashboard"
            shortName="DANB"
            subtitle="200 questions across the DANB GC, RHS and ICE exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/danb-mobile.png", desktop: "/landing/danb-desktop.png" }}
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
                Four sets mapped to the DANB components: chairside dentistry, the rest of General
                Chairside, Radiation Health and Safety, and Infection Control. Questions you miss come
                back until you have mastered them.
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
                Four 50-question tests that mix all three components, written in the DANB style: a
                procedure in progress, a patient, a tray or a sterilizer, and the one thing the assistant
                should do next.
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
                Built on the DANB GC, RHS and ICE Outlines
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                DANB publishes an outline for each component exam, and the RHS and ICE outlines were
                revised in March 2025. Every practice test here splits its 50 questions half General
                Chairside and a quarter each RHS and ICE, with chairside dentistry at half of GC, as on
                the real exam.
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
                src={getTigerAsset("danb", 1)}
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
            The dental assistant practice test is brand new. If a question looks wrong or your program
            teaches it differently, tell us.
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
            How to Pass the DANB CDA Exams
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Chairside is half of General Chairside</h3>
              <p>
                The clock zones, instrument transfer, HVE placement, rubber dam steps, the amalgam and
                composite sequence, matrix and wedge, crown and bridge, endo, perio, surgery aftercare,
                pediatric and ortho, anesthesia setup. The chairside set is 52 questions on exactly that.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the numbers</h3>
              <p>
                Autoclave at 250 degrees and 15 psi, spore tests weekly, 500 CFU per milliliter for
                waterlines, 50 millisieverts a year for the operator and 1 for the public, 6 feet at 90 to
                135 degrees from the beam, tooth 3 and tooth 30, 15 to 30 seconds of etch. The exams test
                these as plain recall and inside scenarios.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Think CDC, OSHA and scope</h3>
              <p>
                RHS and ICE questions follow the CDC dental guidelines, the OSHA Bloodborne Pathogens
                Standard and ALARA. The right answer protects the patient and you, and stays within what
                an assistant may do. Expanded functions vary by state, so the questions say &quot;where
                state law allows&quot; and never test one state&apos;s rule.
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
          DANB Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the DANB CDA exam?</h3>
            <p className="text-gray-600">
              The CDA is three component exams you can take together or separately: General Chairside
              (95 questions, 75 minutes), Radiation Health and Safety (75 questions, 75 minutes) and
              Infection Control (75 questions, 75 minutes). Each is scored on a scale of 100 to 900 with
              400 to pass. About 70 percent correct is a safe target.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the DANB exams?</h3>
            <p className="text-gray-600">
              General Chairside: collection and recording of clinical data 17 percent, patient management
              and administration 17 percent, chairside dentistry 50 percent, dental materials 16 percent.
              RHS: purpose and technique 50 percent, radiation safety 25 percent, infection prevention in
              radiography 25 percent. ICE: disease transmission 20 percent, cross-contamination 34
              percent, instrument processing 26 percent, occupational safety and administration 20 percent.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Can I take just the RHS or ICE exam?</h3>
            <p className="text-gray-600">
              Yes. Many states require RHS or ICE on their own for expanded functions, and DANB offers
              each component separately. The training sets here map to the components, so you can study
              RHS or ICE alone and skip the rest.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest dental assistant practice test free?</h3>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your DANB Exams?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all three component exams.</p>
          <ExamLandingCTA dashboardHref="/dental-assistant/dashboard" />
        </div>
      </div>
    </div>
  );
}

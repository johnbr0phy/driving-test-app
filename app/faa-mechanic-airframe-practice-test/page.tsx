import "@/lib/banks/faaama";
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
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free FAA Mechanic Airframe Practice Test 2026";
const metaDescription =
  "Study for the FAA Airframe written test with 200 original questions on aircraft structures, inspection and systems. Each of the four practice tests covers all 15 knowledge areas.";
const description =
  "Study for the FAA Airframe written test with 200 original questions on aircraft structures, inspection and systems. Each of the four practice tests covers all 15 knowledge areas.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "FAA airframe practice test, AMA written exam, FAA aviation maintenance technician airframe, A&P airframe questions, mechanic airframe rating test",
  alternates: {
    canonical: `${siteUrl}/faa-mechanic-airframe-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/faa-mechanic-airframe-practice-test`,
    images: [{ url: shareImageUrl("faaama"), width: 1200, height: 630, alt: "Tigertest FAA Airframe knowledge test questions" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("faaama")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest FAA Mechanic Airframe Practice Test",
      description,
      url: `${siteUrl}/faa-mechanic-airframe-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("faaama", "USD"),
      featureList: ["200 original Airframe questions", "Four 50-question practice tests", "Five topic sets", "Answer explanations"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which FAA test does this cover?",
          acceptedAnswer: { "@type": "Answer", text: "These questions cover the Aviation Maintenance Technician Airframe knowledge test, code AMA. The FAA lists separate knowledge tests for General (AMG) and Powerplant (AMP)." },
        },
        {
          "@type": "Question",
          name: "How long is the FAA Airframe knowledge test?",
          acceptedAnswer: { "@type": "Answer", text: "The FAA allows two hours for 100 questions and sets the passing score at 70%. A Tigertest practice test has 50 questions and a passing score of 35." },
        },
        {
          "@type": "Question",
          name: "How are the topics weighted?",
          acceptedAnswer: { "@type": "Answer", text: "The FAA companion guide gives a range for each knowledge area. Tigertest assigns five questions each to metallic structures and airframe inspection, four to nonmetallic structures and three to each remaining area." },
        },
        {
          "@type": "Question",
          name: "Can I study one subject at a time?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. The five topic sets group related knowledge areas, including structures and flight controls, hydraulic and pneumatic systems, and electrical and protective systems." },
        },
        {
          "@type": "Question",
          name: "Do the practice questions include the oral and practical test?",
          acceptedAnswer: { "@type": "Answer", text: "The questions focus on written knowledge. For oral and practical tasks, consult the skill and risk management elements in the FAA Aviation Mechanic Airman Certification Standards. The official testing supplement is the source for FAA test figures." },
        },
        classFaqJsonLd("faaama"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Metallic Structures", weight: "10%" },
  { name: "Nonmetallic Structures", weight: "8%" },
  { name: "Flight Controls", weight: "6%" },
  { name: "Airframe Inspection", weight: "10%" },
  { name: "Landing Gear Systems", weight: "6%" },
  { name: "Hydraulic and Pneumatic Systems", weight: "6%" },
  { name: "Environmental Systems", weight: "6%" },
  { name: "Aircraft Instrument Systems", weight: "6%" },
  { name: "Communication and Lighting Systems", weight: "6%" },
  { name: "Aircraft Fuel Systems", weight: "6%" },
  { name: "Aircraft Electrical Systems", weight: "6%" },
  { name: "Ice and Rain Control", weight: "6%" },
  { name: "Airframe Fire Protection", weight: "6%" },
  { name: "Rotorcraft Fundamentals", weight: "6%" },
  { name: "Water and Waste Systems", weight: "6%" },
];

export default function FaaamaLandingPage() {
  return (
    <div data-theme="faaama" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free FAA Mechanic Airframe Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/faa-mechanic-airframe/dashboard"
            shortName="FAA Mechanic Airframe"
            subtitle="Study for the FAA AMA written test with 200 questions on structures, inspections and aircraft systems. Free to start, no account needed."
            shots={{ mobile: "/landing/faaama-mobile.png", desktop: "/landing/faaama-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="faaama" />

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
                Start with structures and flight controls, then study the systems you want to review. Each question has an explanation.
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
                Each practice test covers all 15 FAA Airframe knowledge areas in 50 questions. A score of 35 meets the 70% practice target.
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
                What Each Airframe Practice Test Covers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The FAA publishes a range for each of its 15 Airframe knowledge areas. These percentages show how Tigertest uses those ranges on each 50-question practice test.
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
                src={getTigerAsset("faaama", 1)}
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
            How to Study for the FAA Airframe Written Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Pair each material with its structure</h3>
              <p>
                For each structure you study, note the material, the load it carries and the signs an inspector looks for. Compare similar examples in the FAA handbook.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Follow a system on a diagram</h3>
              <p>
                Use a handbook diagram to trace one system from its source to the component it serves. Read the labels before trying the corresponding practice questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Distinguish indications from causes</h3>
              <p>
                When reviewing a missed instrument or system question, separate the observed indication from the possible reasons for it. Check each against the explanation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Track results by knowledge area</h3>
              <p>
                Match the topic of a missed question to Area II of the FAA standards. Return to the relevant training set before taking another mixed practice test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          FAA Airframe Knowledge Test Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which FAA test does this cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              These questions cover the Aviation Maintenance Technician Airframe knowledge test, code AMA. The FAA lists separate knowledge tests for General (AMG) and Powerplant (AMP).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How long is the FAA Airframe knowledge test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The FAA allows two hours for 100 questions and sets the passing score at 70%. A Tigertest practice test has 50 questions and a passing score of 35.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How are the topics weighted?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The FAA companion guide gives a range for each knowledge area. Tigertest assigns five questions each to metallic structures and airframe inspection, four to nonmetallic structures and three to each remaining area.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I study one subject at a time?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. The five topic sets group related knowledge areas, including structures and flight controls, hydraulic and pneumatic systems, and electrical and protective systems.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do the practice questions include the oral and practical test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions focus on written knowledge. For oral and practical tasks, consult the skill and risk management elements in the FAA Aviation Mechanic Airman Certification Standards. The official testing supplement is the source for FAA test figures.
            </p>
          </div>
          <ExamClassFaq examId="faaama" />
        </div>
      </div>

      <ExamSampleQuestions examId="faaama" />

      <ExamRelatedTests examId="faaama" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Try Your First FAA Airframe Practice Test</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Begin with Structures and Flight Controls or take a mixed 50-question test.</p>
          <ExamLandingCTA dashboardHref="/faa-mechanic-airframe/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/schoolbus";
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

const title = "Free CDL School Bus Endorsement Practice Test 2026";
const metaDescription =
  "Prepare for the CDL school bus (S) endorsement with 200 practice questions on mirrors, loading, emergencies, railroad crossings and student safety.";
const description =
  "Prepare for the CDL school bus (S) endorsement with 200 practice questions on mirrors, loading, emergencies, railroad crossings and student safety.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CDL school bus endorsement practice test, S endorsement knowledge test, school bus driver CDL, pupil transportation",
  alternates: {
    canonical: `${siteUrl}/cdl-school-bus-endorsement-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cdl-school-bus-endorsement-practice-test`,
    images: [{ url: shareImageUrl("schoolbus"), width: 1200, height: 630, alt: "CDL School Bus Endorsement practice questions" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("schoolbus")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest CDL School Bus Endorsement Practice Test",
      description,
      url: `${siteUrl}/cdl-school-bus-endorsement-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("schoolbus", "USD"),
      featureList: ["200 original questions", "Four 50-question practice tests", "Five topic sets", "Answer explanations"],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does the S endorsement cover?",
          acceptedAnswer: { "@type": "Answer", text: "The school bus knowledge test covers loading and unloading students, warning devices and mirrors, emergency evacuation, railroad crossings and safe operating practices." },
        },
        {
          "@type": "Question",
          name: "How many questions are on the school bus endorsement test?",
          acceptedAnswer: { "@type": "Answer", text: "Check your state licensing agency for the official question count and time allowed. Each Tigertest practice test has 50 questions." },
        },
        {
          "@type": "Question",
          name: "What score do I need to pass?",
          acceptedAnswer: { "@type": "Answer", text: "The federal minimum for the knowledge test is 80%. On each Tigertest practice test, that means 40 correct answers out of 50." },
        },
        {
          "@type": "Question",
          name: "Do I also need a passenger endorsement?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Federal rules require applicants to qualify for the passenger endorsement and take a driving skills test in a school bus of the vehicle group they will drive." },
        },
        {
          "@type": "Question",
          name: "Can I start for free?",
          acceptedAnswer: { "@type": "Answer", text: "Yes. Start with a topic set or the first practice test. Premium unlocks the remaining locked steps and full statistics." },
        },
        classFaqJsonLd("schoolbus"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Danger Zones and Mirrors", weight: "16%" },
  { name: "Loading and Unloading", weight: "24%" },
  { name: "Emergencies and Evacuation", weight: "16%" },
  { name: "Railroad Crossings", weight: "16%" },
  { name: "Student Management", weight: "12%" },
  { name: "Vehicle Checks and Special Operating Conditions", weight: "16%" },
];

export default function SchoolbusLandingPage() {
  return (
    <div data-theme="schoolbus" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CDL School Bus Endorsement Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cdl-school-bus-endorsement/dashboard"
            shortName="CDL School Bus Endorsement"
            subtitle="Practice school bus stops, mirror checks, evacuation and railroad crossings with 200 original questions. Free to start, no account needed."
            shots={{ mobile: "/landing/schoolbus-mobile.png", desktop: "/landing/schoolbus-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="schoolbus" />

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
                Choose a topic and read the explanation after each answer. Return to the questions you missed from your dashboard.
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
                Each practice test draws from all six topics. Aim for 40 correct answers out of 50.
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
                What Each School Bus Practice Test Covers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                These percentages show the mix on each Tigertest practice test. Check your state CDL manual for local procedures and test details.
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
                src={getTigerAsset("schoolbus", 1)}
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
            How to Study for the School Bus Endorsement
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Sketch the mirror views</h3>
              <p>
                Draw the bus from above. Use your CDL manual to mark what the flat, convex and crossover mirrors show and where students can be hidden.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Walk through one bus stop</h3>
              <p>
                Follow a student from the waiting area to the seat. Repeat the exercise for unloading and crossing, noting each time the driver must account for the student.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Compare crossing layouts</h3>
              <p>
                Sketch a crossing with a stop sign just beyond the tracks. Check where the whole bus would fit before deciding whether to enter.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Study local procedures</h3>
              <p>
                Keep your state CDL manual beside you. Mark its instructions for warning lights, student crossings and emergencies as you work through your missed questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          School Bus Endorsement Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the S endorsement cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The school bus knowledge test covers loading and unloading students, warning devices and mirrors, emergency evacuation, railroad crossings and safe operating practices.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the school bus endorsement test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Check your state licensing agency for the official question count and time allowed. Each Tigertest practice test has 50 questions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The federal minimum for the knowledge test is 80%. On each Tigertest practice test, that means 40 correct answers out of 50.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do I also need a passenger endorsement?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Federal rules require applicants to qualify for the passenger endorsement and take a driving skills test in a school bus of the vehicle group they will drive.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Can I start for free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes. Start with a topic set or the first practice test. Premium unlocks the remaining locked steps and full statistics.
            </p>
          </div>
          <ExamClassFaq examId="schoolbus" />
        </div>
      </div>

      <ExamSampleQuestions examId="schoolbus" />

      <ExamRelatedTests examId="schoolbus" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Try Your First School Bus Practice Test</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start with Danger Zones and Mirrors or take a mixed 50-question test.</p>
          <ExamLandingCTA dashboardHref="/cdl-school-bus-endorsement/dashboard" />
        </div>
      </div>
    </div>
  );
}

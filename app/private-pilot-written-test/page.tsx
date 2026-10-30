import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Private Pilot Written Test Practice 2026 - FAA PAR";
const metaDescription =
  "Free FAA private pilot written test practice: 202 original three-choice questions on regulations, airspace, weather, aerodynamics, performance, navigation and human factors, with explanations.";
const description =
  "Free practice for the FAA Private Pilot Airplane (PAR) knowledge test, with 202 original three-choice questions written from the Private Pilot Airplane ACS, the Pilot's Handbook of Aeronautical Knowledge, the AIM and 14 CFR. Two full 60-question tests in 2 hours plus eight drills by knowledge area, with chart and performance data given in words instead of a figure supplement and an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the FAA private pilot written test?",
    a: "The Private Pilot Airplane (PAR) knowledge test has 60 multiple-choice questions, each with three answer choices. You have 2 hours to finish, and you need 70 percent to pass. You must be at least 15 years old and have an endorsement from an authorized instructor or a home-study course before you take it.",
  },
  {
    q: "What is on the private pilot knowledge test?",
    a: "The questions come from the knowledge elements of the Private Pilot Airplane Airman Certification Standards (FAA-S-ACS-6C): regulations, airspace, weather theory and weather reports, aerodynamics and aircraft systems, performance and weight and balance, navigation with sectional charts, and human factors and aeronautical decision-making. Many questions refer to a figure supplement of chart excerpts and performance tables.",
  },
  {
    q: "How long is the private pilot written test result good for?",
    a: "A passed knowledge test is valid for 24 calendar months. You must take the practical test (the checkride) within that time. Your test report lists ACS codes for the topics you missed, and your instructor must review them with you before the checkride.",
  },
  {
    q: "Is this the same as the real FAA private pilot test?",
    a: "It is built like it: 60 three-choice questions in 2 hours across the same knowledge areas, scored against the 70 percent pass mark. The questions are original and written from FAA handbooks and regulations, not copied from the FAA test. The real test uses a figure supplement; here any chart symbol or performance figure you need is described in the question.",
  },
  {
    q: "Is the Tigertest private pilot practice test free?",
    a: "Yes. Both practice tests and all eight drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "private pilot written test, FAA private pilot knowledge test, PAR practice test, private pilot practice test free, FAA written exam practice, private pilot ground school questions, student pilot test prep, ACS private pilot",
  alternates: {
    canonical: `${siteUrl}/private-pilot-written-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/private-pilot-written-test`,
    images: [{ url: shareImageUrl("faapvt"), width: 1200, height: 630, alt: "Tigertest free private pilot written test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("faapvt")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Private Pilot Written Test Practice",
      description,
      url: `${siteUrl}/private-pilot-written-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "202 original private pilot practice questions with explanations",
        "2 full 60-question practice tests in 2 hours, three choices per question",
        "8 drills covering every knowledge area of the Private Pilot ACS",
        "Chart and performance data written into each question, no figure supplement needed",
        "Weight and balance, density altitude, crosswind and navigation math",
        "Auto-save progress",
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
        classFaqJsonLd("faapvt"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Regulations", weight: "9 per test" },
  { name: "Aerodynamics, systems and instruments", weight: "9 per test" },
  { name: "Airspace and airport operations", weight: "8 per test" },
  { name: "Weather theory", weight: "7 per test" },
  { name: "Weather reports and forecasts", weight: "7 per test" },
  { name: "Performance, weight and balance", weight: "7 per test" },
  { name: "Navigation and charts", weight: "7 per test" },
  { name: "Human factors and decision-making", weight: "6 per test" },
];

export default function PrivatePilotLandingPage() {
  return (
    <div data-theme="faapvt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Private Pilot Written Test Practice
          </h1>
          <ExamLandingHero
            dashboardHref="/private-pilot/dashboard"
            shortName="Private Pilot"
            subtitle="202 original three-choice questions for the FAA PAR knowledge test. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/faapvt-mobile.png", desktop: "/landing/faapvt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="faapvt" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Knowledge Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Eight drills cover the knowledge areas of the Private Pilot ACS: regulations, airspace and airports, weather theory, weather reports, aerodynamics and systems, performance and weight and balance, navigation, and human factors. Questions you miss come back until you have mastered them.
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
                Two 60-question tests in 2 hours, the FAA&apos;s time limit, with three choices per question like the real test. Chart symbols and performance numbers are written into each question. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the Private Pilot ACS
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The FAA writes the PAR test from the knowledge elements of the Private Pilot Airplane Airman Certification Standards (FAA-S-ACS-6C) but does not publish how many questions come from each area. Every practice test here spreads its 60 questions across the areas like this.
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
                src={getTigerAsset("faapvt", 1)}
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
            How to Pass the Private Pilot Written Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get your endorsement first</h3>
              <p>
                You need a logbook endorsement from an authorized instructor, or a certificate from a home-study ground school, before you can sit the test at an FAA testing center. Bring photo ID, and expect to have 2 hours for 60 questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the regulations and airspace cold</h3>
              <p>
                Regulations and airspace are pure recall: VFR weather minimums for each class, currency and medical durations, fuel reserves, required equipment and inspections. Make a one-page table and quiz yourself until you never hesitate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice reading weather and charts</h3>
              <p>
                Decode METARs, TAFs and winds aloft groups by hand, and know sectional chart symbols for airspace, airports and obstacles. On the real test you read them from a figure supplement, so practice with a current sectional chart beside you.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do the math until it is automatic</h3>
              <p>
                Weight and balance, density altitude, crosswind components, wind correction and time, speed and distance problems are quick points once the method is automatic. Tigertest tracks your accuracy by knowledge area, so retake the drill you miss most until you are well over 70 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Private Pilot Written Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="faapvt" />
        </div>
      </div>

      <ExamRelatedTests examId="faapvt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Private Pilot Written?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 202 questions across every knowledge area.</p>
          <ExamLandingCTA dashboardHref="/private-pilot/dashboard" />
        </div>
      </div>
    </div>
  );
}

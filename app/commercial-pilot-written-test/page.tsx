import "@/lib/v2/banks/faacax";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Commercial Pilot Practice Test 2026 - FAA Written Exam (CAX)";
const metaDescription =
  "Free FAA commercial pilot written test practice: 210 original three-choice questions on commercial regulations, weather, aerodynamics, complex airplane systems, performance and commercial maneuvers, with explanations.";
const description =
  "Free practice for the FAA Commercial Pilot Airplane (CAX) knowledge test, with 210 original three-choice questions written from the Commercial Pilot Airplane ACS (FAA-S-ACS-7B), the Pilot's Handbook of Aeronautical Knowledge, the Airplane Flying Handbook, the AIM and 14 CFR. Two 50-question practice tests at the real pace plus nine drills by knowledge area, with weight and balance data and chart values given in the question instead of a figure supplement and an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the FAA commercial pilot written test?",
    a: "The Commercial Pilot Airplane (CAX) knowledge test has 100 multiple-choice questions, each with three answer choices. You have 2.5 hours, and you need 70 percent to pass. You must be at least 16 to take the test (18 for the certificate) and have an endorsement from an authorized instructor or a home-study course.",
  },
  {
    q: "What is on the commercial pilot knowledge test?",
    a: "The questions come from the knowledge elements of the Commercial Pilot for Airplane Category ACS (FAA-S-ACS-7B): commercial privileges and limitations, airworthiness, weather, cross-country planning and navigation, airspace, performance and weight and balance, complex and high-performance airplane systems, aerodynamics, high-altitude operations, commercial maneuvers and emergency operations, and human factors. Many questions refer to a figure supplement of charts and performance tables.",
  },
  {
    q: "How is the commercial written different from the private pilot written?",
    a: "It is longer (100 questions in 2.5 hours against 60 in 2 hours) and goes further: commercial privileges and the limits without an instrument rating, 100-hour inspections for aircraft used for hire, constant-speed propellers, turbochargers, retractable gear, pressurization and oxygen, multiengine aerodynamics such as Vmc, and the commercial maneuvers: chandelles, lazy eights, steep spirals, eights on pylons and power-off 180 accuracy landings.",
  },
  {
    q: "Is this the same as the real FAA commercial pilot test?",
    a: "It is built like it: three-choice questions at the real pace across the same knowledge areas, scored against the 70 percent pass mark. Each practice test is 50 questions in 75 minutes, half the real test. The questions are original and written from FAA handbooks and regulations, not copied from the FAA test or its sample questions. The real test uses a figure supplement; here any chart value or loading figure you need is in the question.",
  },
  {
    q: "Is the Tigertest commercial pilot practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and the Regulations, Airspace, Weather and Navigation drills are free. The Aerodynamics, Systems, Performance, Commercial Maneuvers and Human Factors drills and Practice Test 2 are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "commercial pilot written test, FAA commercial pilot knowledge test, CAX practice test, commercial pilot practice test free, CPL written exam, commercial pilot ground school questions, commercial checkride prep, ACS commercial pilot",
  alternates: {
    canonical: `${siteUrl}/commercial-pilot-written-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/commercial-pilot-written-test`,
    images: [{ url: shareImageUrl("faacax"), width: 1200, height: 630, alt: "Tigertest free commercial pilot written test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("faacax")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Commercial Pilot Written Test Practice",
      description,
      url: `${siteUrl}/commercial-pilot-written-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("faacax"),
      featureList: [
        "210 original commercial pilot practice questions with explanations",
        "2 practice tests of 50 questions in 75 minutes, three choices per question",
        "9 drills covering the knowledge areas of the Commercial Pilot ACS",
        "Weight and balance, wind, chart and performance data written into each question",
        "Commercial maneuvers, complex airplane systems and multiengine aerodynamics",
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
        classFaqJsonLd("faacax"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Regulations and commercial privileges", weight: "7 per test" },
  { name: "Weather", weight: "6 per test" },
  { name: "Aerodynamics and multiengine", weight: "6 per test" },
  { name: "Complex and high-altitude systems", weight: "6 per test" },
  { name: "Performance, weight and balance", weight: "6 per test" },
  { name: "Airspace and airport operations", weight: "5 per test" },
  { name: "Navigation and flight planning", weight: "5 per test" },
  { name: "Commercial maneuvers and emergencies", weight: "5 per test" },
  { name: "Human factors and high altitude", weight: "4 per test" },
];

export default function CommercialPilotLandingPage() {
  return (
    <div data-theme="faacax" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Commercial Pilot Written Test Practice
          </h1>
          <ExamLandingHero
            dashboardHref="/commercial-pilot/dashboard"
            shortName="Commercial Pilot"
            subtitle="210 three-choice questions for the FAA CAX knowledge test. Free to start, no account needed."
            shots={{ mobile: "/landing/faacax-mobile.png", desktop: "/landing/faacax-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="faacax" />

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
                Nine drills cover the knowledge areas of the Commercial Pilot ACS: regulations, airspace and airports, weather, navigation, aerodynamics, complex airplane systems, performance and weight and balance, commercial maneuvers, and human factors. Questions you miss come back until you have mastered them.
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
                Two 50-question tests in 75 minutes, half the real test at the FAA&apos;s pace, with three choices per question. Loading data and chart values are written into each question. Practice Test 2 is held out of the drills, so its questions are new to you.
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
                Built on the Commercial Pilot ACS
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The FAA writes the CAX test from the knowledge elements of the Commercial Pilot for Airplane Category Airman Certification Standards (FAA-S-ACS-7B) but does not publish how many questions come from each area. Every practice test here spreads its 50 questions across the areas like this.
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
                src={getTigerAsset("faacax", 3)}
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
            How to Pass the Commercial Pilot Written Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get your endorsement and plan the timing</h3>
              <p>
                You need a logbook endorsement from an authorized instructor, or a certificate from a home-study course, before you sit the test at an FAA testing center. A pass is valid for 24 calendar months, so plan to finish your 250 hours and the checkride inside that window.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know what changes at the commercial level</h3>
              <p>
                Learn the privileges in 14 CFR 61.133, the 50-mile and night limit without an instrument rating, which flights for hire part 119 does not cover, second-class medical durations, 100-hour inspections and the endorsements for complex, high-performance and pressurized airplanes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Understand the systems and the aerodynamics</h3>
              <p>
                Constant-speed propellers, turbochargers, retractable gear, pressurization and oxygen systems come up often, along with load factor, stall speed, maneuvering speed and multiengine Vmc. Learn why each works, not only the answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill the numbers and the maneuvers</h3>
              <p>
                Weight and balance, weight shift, wind triangles, fuel reserves and pivotal altitude are quick points once the method is automatic. Know the standards for chandelles, lazy eights, steep spirals and power-off 180s. Tigertest tracks your accuracy by area, so retake the drill you miss most until you are well over 70 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Commercial Pilot Written Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="faacax" />
        </div>
      </div>

      <SampleQuestionsV2 examId="faacax" />

      <ExamRelatedTests examId="faacax" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Commercial Pilot Written?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 210 questions across every knowledge area.</p>
          <ExamLandingCTA dashboardHref="/commercial-pilot/dashboard" />
        </div>
      </div>
    </div>
  );
}

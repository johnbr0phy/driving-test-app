import "@/lib/banks/caairbrake";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Ontario Air Brake Practice Test 2026 - Z Endorsement Questions";
const metaDescription =
  "Free practice for Ontario's air brake (Z) endorsement knowledge test at DriveTest: 200 original questions from MTO's Official Air Brake Handbook on air supply, spring and trailer brakes, the daily air brake tests and pushrod adjustment limits. Four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the air brake (Z) endorsement knowledge test that Ontario drivers take at a DriveTest centre to drive a vehicle with air brakes: 200 original questions written from the Ministry of Transportation's Official Air Brake Handbook, chapter by chapter, with its kPa and psi limits. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ontario air brake test, air brake practice test ontario, z endorsement test, ontario z endorsement, air brake endorsement ontario, mto air brake handbook, drivetest air brake test, az licence air brake, dz licence air brake, air brake knowledge test",
  alternates: {
    canonical: `${siteUrl}/ontario-air-brake-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ontario-air-brake-practice-test`,
    images: [{ url: shareImageUrl("caairbrake"), width: 1200, height: 630, alt: "Tigertest free Ontario air brake practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("caairbrake")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Who needs a Z endorsement in Ontario?",
    a: "You need an air brake (Z) endorsement on your Ontario driver's licence to drive a vehicle with an air brake or an air-over-hydraulic brake system. Most large commercial vehicles in Ontario have air brakes, so it is usually paired with a truck or bus licence, as in AZ or DZ. A vehicle with an air-operated parking brake and hydraulic brakes for everything else, such as some school buses, does not need it.",
  },
  {
    q: "How do I get the air brake endorsement?",
    a: "MTO gives two routes. You can take an air brake endorsement course from a vehicle fleet owner, a community college or a safety organization (holders of a B, C, D, E, F or G licence must take it with a fleet owner), then take the referral envelope to a DriveTest centre within 6 months. Or you can do the tests at a DriveTest centre: an air brake knowledge test, then a practical test. A fee applies to each test; check DriveTest for current fees.",
  },
  {
    q: "What is on the air brake knowledge test?",
    a: "MTO says the Official Air Brake Handbook contains the information you need to prepare. It covers how air brakes compare with hydraulic brakes, the air supply, service, spring and trailer brake subsystems, foundation brakes, the demands on brakes while driving, air brake compliance, inspecting components and system operation, and inspecting brake adjustment. MTO does not publish the number of questions or the pass mark; guides say it is multiple choice with a pass mark of about 80%, so Tigertest uses 80% as a target.",
  },
  {
    q: "What happens on the practical test?",
    a: "After the knowledge test you book a practical test at DriveTest. Version 1 is for a commercial vehicle with a tractor-trailer air brake system and Version 2 for one without. You bring wheel chocks, a stopwatch or a watch with a second hand, knowledge of the size and type of all the brake chambers, a way to hold the brake pedal applied and, except on motor coaches, a way to mark and measure the pushrod and eye protection. The practical test is not modelled here, but the inspection procedures it uses are part of the knowledge questions.",
  },
  {
    q: "Are these the real DriveTest questions?",
    a: "No. Every question is original, written by Tigertest from MTO's Official Air Brake Handbook and its own pages on the Z endorsement. No DriveTest question was used. This is free revision, not affiliated with the Ministry of Transportation or DriveTest, and the handbook itself says the Highway Traffic Act and its regulations govern for official purposes. Renewals since September 1, 2023 use an online air brake learning module instead of the knowledge test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Ontario Air Brake Practice Test",
      description,
      url: `${siteUrl}/ontario-air-brake-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("caairbrake", "CAD"),
      featureList: [
        "200 Ontario air brake practice questions",
        "4 mock tests of 50 questions",
        "5 training sets by handbook chapter",
        "Instant feedback with explanations",
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
        classFaqJsonLd("caairbrake"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Braking systems and foundation brakes", weight: "5 per test" },
  { name: "Air supply subsystem", weight: "7 per test" },
  { name: "Service brakes and brake chambers", weight: "4 per test" },
  { name: "Spring (parking and emergency) brakes", weight: "6 per test" },
  { name: "Trailer brake subsystem", weight: "6 per test" },
  { name: "Demands on brakes while driving", weight: "5 per test" },
  { name: "Compliance and inspecting components", weight: "5 per test" },
  { name: "Testing air brake operation", weight: "7 per test" },
  { name: "Inspecting brake adjustment", weight: "5 per test" },
];

export default function OntarioAirBrakeLandingPage() {
  return (
    <div data-theme="caairbrake" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Ontario Air Brake Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ontario-air-brake/dashboard"
            shortName="Ontario Air Brake"
            subtitle="200 Z endorsement questions and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/caairbrake-mobile.png", desktop: "/landing/caairbrake-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="caairbrake" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train Chapter by Chapter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets: brake systems and air supply, service and spring brakes, trailer brakes and driving demands, inspecting components and operation, and brake adjustment. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions that mix every handbook chapter, with an 80% target. No question appears in more than one test, and every answer comes with a short explanation from the handbook.
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
                Built on the Official Air Brake Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                MTO publishes no topic weights, so each 50-question test follows the handbook&apos;s chapters as below. Pressures are given in kPa and psi, the way the handbook and most gauges show them.
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
                src={getTigerAsset("caairbrake", 3)}
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
            How to Pass the Ontario Air Brake Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers in pairs</h3>
              <p>
                The handbook gives every limit in kPa and psi: cut-in never below 552 kPa (80 psi), cut-out never above 1000 kPa (145 psi), the low air warning before 380 kPa (55 psi), spring brakes holding off at about 414 kPa (60 psi). Learn each figure with what it protects.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Follow the air through the system</h3>
              <p>
                Compressor, governor, air dryer, supply tank, check valves, primary and secondary tanks, then the pedal valve, brake chambers and slack adjusters. On a combination, add the supply and service lines, the trailer supply valve and the tractor protection valve. Knowing the order answers most what-happens-if questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know each inspection test</h3>
              <p>
                For every test in chapter 10, know how to set up the vehicle, what to watch and what makes it fail: the warning device, build-up time, governor settings, air-loss rate, tractor protection valve, trailer spring brakes, spring brakes and drain valves.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each chapter, then test</h3>
              <p>
                Finish the five training sets first, then take the mock tests. Aim for 80% or better on every mock test, and read the brake adjustment chart in the handbook, since you must know your vehicle&apos;s chamber sizes for the practical test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Ontario Air Brake Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="caairbrake" />
        </div>
      </div>

      <ExamSampleQuestions examId="caairbrake" />

      <ExamRelatedTests examId="caairbrake" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the air brake test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every chapter of the Official Air Brake Handbook.</p>
          <ExamLandingCTA dashboardHref="/ontario-air-brake/dashboard" />
        </div>
      </div>
    </div>
  );
}

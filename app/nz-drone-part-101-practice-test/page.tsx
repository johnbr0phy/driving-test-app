import "@/lib/banks/nzdrone";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free NZ Drone Rules Practice Test 2026 - Part 101 Questions";
const metaDescription =
  "Free-to-start New Zealand drone rules practice test: 200 original questions on CAA Part 101 and CATI 101-1, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Practice the New Zealand drone rules behind a Part 101 pilot qualification: 200 original questions written from Civil Aviation Rule Part 101, the CAA's transport instrument CATI 101-1 and Advisory Circular AC101-1. Four 50-question practice tests and four training sets covering when Part 101 applies and when Part 102 takes over, the 4 km aerodrome rule, controlled and special use airspace, shielded operations, consent and the 400 ft limit, visual line of sight and night flying, right of way and hazards, and planning and reporting.";

const faqs = [
  {
    q: "What are the drone rules in New Zealand?",
    a: "Drones and model aircraft are flown under Civil Aviation Rule Part 101, made by the Civil Aviation Authority of New Zealand (CAA). Since 22 December 2025 most of the detail for remotely piloted aircraft sits in a transport instrument, CATI 101-1. Under these rules a drone must weigh 25 kg or less, stay within the pilot's visual line of sight and below 400 ft above ground level, give way to all manned aircraft, keep 4 km from aerodromes unless extra conditions are met, and fly over people or property only with their consent. Flights that cannot meet Part 101 need a Part 102 operator certificate.",
  },
  {
    q: "Do I need a drone licence in New Zealand?",
    a: "Not for most flights. The CAA says Part 101 operators do not need a pilot qualification unless they fly an unshielded operation within 4 km of an aerodrome boundary. Inside that distance the pilot needs a qualification from an approved person or organisation (such as a Part 101 pilot certificate course), supervision by a qualified person, or a Part 61 or Part 149 pilot licence, plus the aerodrome's authorisation or agreement. Unshielded night flying needs an approved night training course.",
  },
  {
    q: "Is there an official Part 101 exam?",
    a: "No. The CAA does not run a single exam. A Part 101 pilot qualification is issued by an approved person or organisation under rule 101.202, and each one sets its own course and assessment. The CAA publishes no question count, time or pass mark, so the 80 percent line on these practice tests is Tigertest's readiness target, not an official standard.",
  },
  {
    q: "What do these practice tests cover?",
    a: "Each 50-question test covers when Part 101 applies and how Part 102 differs, the 4 km aerodrome rule and its conditions, controlled airspace and special use airspace such as restricted areas, military operating areas, danger areas and low flying zones, shielded operations, consent from people and property owners and the 400 ft limit, visual line of sight, FPV and night flying, right of way, hazards and airworthiness, and flight planning and occurrence reporting.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from Part 101, CATI 101-1, AC101-1 and the CAA's airspace and reporting guides, as in force in November 2026. Charts and maps are described in words. Tigertest is not affiliated with the Civil Aviation Authority of New Zealand, Airways New Zealand or any training organisation.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nz drone test, part 101 test, part 101 drone rules quiz, new zealand drone rules, nz drone licence, part 101 pilot certificate, caa drone rules nz, cati 101-1, airshare drone rules, drone pilot qualification nz",
  alternates: {
    canonical: `${siteUrl}/nz-drone-part-101-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-drone-part-101-practice-test`,
    images: [{ url: shareImageUrl("nzdrone"), width: 1200, height: 630, alt: "Tigertest free NZ drone Part 101 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzdrone")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ Drone (Part 101) Practice Test",
      description,
      url: `${siteUrl}/nz-drone-part-101-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzdrone"),
      featureList: [
        "200 New Zealand drone rules practice questions",
        "4 practice tests of 50 questions on Part 101 and CATI 101-1",
        "4 training sets by topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const contentAreas = [
  { name: "Scope, Part 102 & shielded operations", weight: "10 of 50" },
  { name: "Aerodromes & airspace", weight: "15 of 50" },
  { name: "Consent, height, sight & night", weight: "14 of 50" },
  { name: "Safety, planning & reporting", weight: "11 of 50" },
];

export default function NzDroneLandingPage() {
  return (
    <div data-theme="nzdrone" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Drone Rules Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-drone-part-101/dashboard"
            shortName="NZ Drone"
            subtitle="200 Part 101 drone rules questions and four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/nzdrone-mobile.png", desktop: "/landing/nzdrone-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzdrone" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets follow the rules: Part 101 basics and shielded flights; aerodromes and airspace; consent, height, line of sight and night; and safety, planning and reporting. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each mixing every part of the rules. Aim for 80% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on Part 101 and CATI 101-1
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Since 22 December 2025 most of New Zealand&apos;s drone rules sit in the CAA&apos;s transport instrument CATI 101-1, which Part 101 points to. Every practice test here mixes the rule text, the transport instrument and the CAA&apos;s advisory circular, and checks the knowledge a pilot needs to fly near aerodromes and in controlled airspace.
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
                src={getTigerAsset("nzdrone", 3)}
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
            How to Learn the NZ Drone Rules
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the numbers</h3>
              <p>
                25 kg, 15 kg, 400 ft, 4 km, 100 m, 33 ft, 24 hours, 30 minutes and 90 days. Learn what each one belongs to: the mass limits, the height limit, the aerodrome distance, shielded flights, NOTAM notice and night currency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the airspace</h3>
              <p>
                Learn the difference between controlled airspace, restricted areas, military operating areas, danger areas and low flying zones, who can give permission for each, and where to check them before you fly, including NOTAMs for temporary changes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn what shielding changes</h3>
              <p>
                A shielded flight close to a tree, building or cliff skips some airspace, aerodrome and night requirements, but consent, the 400 ft limit, right of way and the duty to minimise hazards still apply.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 80% or better on every practice test. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NZ Drone Rules Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      <ExamSampleQuestions examId="nzdrone" />

      <ExamRelatedTests examId="nzdrone" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Fly by the Rules?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across Part 101 and CATI 101-1.</p>
          <ExamLandingCTA dashboardHref="/nz-drone-part-101/dashboard" />
        </div>
      </div>
    </div>
  );
}

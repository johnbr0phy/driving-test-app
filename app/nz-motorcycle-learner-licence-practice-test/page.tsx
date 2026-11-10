import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/nzmoto";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "NZ Motorcycle Learner Licence Practice Test 2026 - Free Class 6 Test";
const metaDescription =
  "Free NZ motorcycle learner licence practice test: 200 original Class 6 Road Code questions for riders, five 35-question mock tests with a 32-of-35 pass line, every answer explained.";
const description =
  "Free practice for the New Zealand motorcycle (Class 6) learner licence theory test: 200 original questions written from New Zealand's road rules for motorcyclists. Five mock tests of 35 questions with a pass line of 32 out of 35, and five training sets on learner and restricted conditions, helmets and gear, signs and giving way, road position and speed, braking and cornering, and road surfaces, weather and hazards.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nz motorcycle learner licence test, class 6 learner licence, motorcycle road code nz, motorbike learners licence nz, nz motorcycle theory test, lams nz, learner rider test nz, road code for motorcyclists quiz 2026",
  alternates: {
    canonical: `${siteUrl}/nz-motorcycle-learner-licence-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-motorcycle-learner-licence-practice-test`,
    images: [{ url: shareImageUrl("nzmoto"), width: 1200, height: 630, alt: "Tigertest free NZ motorcycle learner licence practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzmoto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the NZ motorcycle learner licence theory test like?",
    a: "It is a computer-based multi-choice test on New Zealand's road rules for motorcyclists, taken at a driver licensing agent. Published guidance gives the same format as the car learner test, 35 questions with at least 32 right to pass, and drive.govt.nz gives 30 minutes for that test. NZTA's motorcycle pages could not be checked for this page, so confirm the details when you book. The mock tests here are 35 questions with 32 as the pass line.",
  },
  {
    q: "What do I need to do before the motorcycle theory test?",
    a: "You must be at least 16, and before the theory test you complete a basic handling skills test (BHST) with a motorcycle instructor. For the car learner licence, NZTA's learner site lists an eyesight check and proof of identity at the licensing agent; check NZTA's motorcycle licence page for what to bring.",
  },
  {
    q: "What can I do on a motorcycle learner licence?",
    a: "You ride alone, with no passenger, because learner riders may not carry a pillion. You must show an L plate on the rear of the bike, stay off the road between 10 pm and 5 am, not tow anything, and ride only a LAMS-approved motorcycle. Restricted riders keep the same rules except the L plate. If you are under 20 your alcohol limit is zero.",
  },
  {
    q: "What is a LAMS-approved motorcycle?",
    a: "LAMS is the learner approved motorcycle scheme. Learner and restricted riders may ride any bike under 250 cc that is not on NZTA's prohibited list, and bikes under 660 cc (or electric) that do not exceed 150 kW per tonne power-to-weight. Check NZTA's list for a particular model before you buy.",
  },
  {
    q: "Are these the real motorcycle theory test questions?",
    a: "No. Every question is original, written by Tigertest from New Zealand's road rules and rider safety guidance, so it tests the same rules without copying NZTA's questions. Signs and markings are described in words. Tigertest is not affiliated with NZTA Waka Kotahi; this is free revision, not an official test, and it does not book or replace your theory test or basic handling skills test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ Motorcycle Learner Licence Practice Test",
      description,
      url: `${siteUrl}/nz-motorcycle-learner-licence-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzmoto", "NZD"),
      featureList: [
        "200 NZ motorcycle Road Code practice questions",
        "5 mock tests of 35 questions with a 32 of 35 pass line",
        "5 training sets by topic",
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
  { name: "Intersections & Giving Way", weight: "17%" },
  { name: "Road Position, Speed & Overtaking", weight: "17%" },
  { name: "Licence Conditions, Alcohol & Crashes", weight: "14%" },
  { name: "Braking, Cornering & Bike Control", weight: "14%" },
  { name: "Road Surfaces, Weather & Hazards", weight: "14%" },
  { name: "Helmets, Gear & Bike Checks", weight: "11%" },
  { name: "Signs, Signals & Markings", weight: "11%" },
];

export default function NzMotorcycleLearnerLandingPage() {
  return (
    <div data-theme="nzmoto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Motorcycle Learner Licence Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-motorcycle-learner/dashboard"
            shortName="Motorcycle learner"
            subtitle="200 original Class 6 questions for riders: learner and restricted conditions, helmets and gear, giving way, road position, braking and cornering, and road surface hazards. Five 35-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nzmoto-mobile.png", desktop: "/landing/nzmoto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzmoto" />

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
                Five training sets cover the rules a new rider lives by, from the learner conditions and LAMS to braking in a bend and crossing wet rail lines. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">35-Question Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five tests of 35 questions with a pass line of 32, so you can only drop three. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on New Zealand&apos;s Road Rules for Riders
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NZTA does not publish how many questions come from each topic, so this split is Tigertest&apos;s own, with giving way and road position weighted heaviest because they cause the most rider crashes. Every rule is New Zealand&apos;s: left-hand traffic, km/h, the turning-traffic give way rule, one-lane bridges, flush medians, chip seal and the learner and restricted conditions for motorcyclists.
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
                src={getTigerAsset("nzmoto", 1)}
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
            How to Pass the Motorcycle Learner Licence Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your own licence conditions cold</h3>
              <p>
                Learner riders carry no pillion, show an L plate on the rear, stay off the road from 10 pm to 5 am, do not tow and ride only LAMS-approved bikes. Restricted riders keep all of that except the L plate. These rules are easy marks and the ones you will ride under for the next year or more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Master the give way rules</h3>
              <p>
                Turning traffic gives way to traffic going straight, a right-turner gives way to an opposite left-turner, the road that ends at a T gives way to the road that carries on, and at a roundabout you give way to everyone from your right. Then remember that drivers often miss a motorcycle even when they have to give way to you.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the numbers</h3>
              <p>
                50 and 100 km/h defaults, 20 km/h past a stopped school bus, a two-second gap (four in the wet), three seconds of signalling, 1.5 metres when passing a cyclist, the zero alcohol limit under 20 and 250 micrograms per litre of breath over 20, 100 demerit points in two years, and the LAMS limits of 660 cc and 150 kW per tonne.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 32</h3>
              <p>
                With only three mistakes allowed, aim for 34 or 35 in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all five tests back to back before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Motorcycle Learner Licence Frequently Asked Questions
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

      <ExamSampleQuestions examId="nzmoto" />

      <ExamRelatedTests examId="nzmoto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your Motorcycle Learner Licence?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every part of the rules for riders.</p>
          <ExamLandingCTA dashboardHref="/nz-motorcycle-learner/dashboard" />
        </div>
      </div>
    </div>
  );
}

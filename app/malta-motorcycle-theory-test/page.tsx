import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/mtmoto";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Malta Motorcycle Theory Test 2026 - Free Practice Test";
const metaDescription =
  "Free Malta motorcycle theory test practice: 200 original questions for categories AM, A1, A2 and A, five 35-question mock tests with 30 to pass, every answer explained.";
const description =
  "Free practice for the Transport Malta theory test for a motorcycle or moped licence (categories AM, A1, A2 and A): 200 original questions on licence categories and rider law, helmets and protective clothing, machine checks, control and braking, road position, being seen, slippery surfaces and weather, passengers and parking, and alcohol, fatigue and crashes. Five 35-question mock tests with 30 to pass, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "malta motorcycle theory test, malta motorbike theory test, transport malta motorcycle test, category a theory test malta, a1 licence malta, a2 licence malta, moped licence malta, am licence malta, malta motorcycle licence questions, motorcycle theory test malta 2026",
  alternates: {
    canonical: `${siteUrl}/malta-motorcycle-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/malta-motorcycle-theory-test`,
    images: [{ url: shareImageUrl("mtmoto"), width: 1200, height: 630, alt: "Tigertest free Malta motorcycle theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mtmoto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Malta motorcycle theory test like?",
    a: "It is Transport Malta's theory test, taken on a touch-screen computer at the Theory Test Centre. Transport Malta gives the theory test as 35 multiple-choice questions in 45 minutes, with 30 correct answers needed to pass. For motorcycle categories the law adds compulsory questions on protective clothing and helmets, being seen by other road users, slippery surfaces such as drain covers and road markings, and checks on the engine cut-out switch, oil and chain.",
  },
  {
    q: "Which licence categories does it cover?",
    a: "Category AM covers mopeds, light quadricycles and electric kick scooters. A1 covers motorcycles up to 125 cc and 11 kW, A2 motorcycles up to 35 kW, and A any motorcycle. For category AM the theory test is the whole driving test; for A1, A2 and A you then take the practical test on your learner's permit.",
  },
  {
    q: "Who can sit the theory test?",
    a: "Malta's driving licence regulations allow the theory test from age 18, or from 16 for category AM, and you apply with a learner's permit. The minimum age to ride an A2 or A motorcycle on a learner's permit is higher, so check Transport Malta's current rules for your category before you book.",
  },
  {
    q: "Can I take the test in English?",
    a: "Yes. Transport Malta offers the theory test in English or Maltese and publishes its theory material in both languages. Malta drives on the left, so the questions assume left-hand traffic, clockwise roundabouts and overtaking on the right.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from Malta's driving licence and motor vehicle regulations, so it tests the same knowledge without copying the official question bank. Pictures are described in words, so study the Highway Code's illustrations too. Tigertest is free practice and is not affiliated with Transport Malta, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Malta Motorcycle Theory Practice Test",
      description,
      url: `${siteUrl}/malta-motorcycle-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("mtmoto", "EUR"),
      featureList: [
        "200 Malta motorcycle and moped theory questions",
        "5 mock tests of 35 questions, 30 to pass",
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
  { name: "Control, Braking & Cornering", weight: "6 of 35" },
  { name: "Road Position, Overtaking & Filtering", weight: "5 of 35" },
  { name: "Helmets & Protective Clothing", weight: "4 of 35" },
  { name: "Machine Checks & Faults", weight: "4 of 35" },
  { name: "Being Seen & Other Road Users", weight: "4 of 35" },
  { name: "Road Surfaces, Weather & Night", weight: "4 of 35" },
  { name: "Licence Categories & Rider Law", weight: "3 of 35" },
  { name: "Alcohol, Fatigue, Distraction & Crashes", weight: "3 of 35" },
  { name: "Passengers, Loads & Parking", weight: "2 of 35" },
];

export default function MaltaMotorcycleTheoryLandingPage() {
  return (
    <div data-theme="mtmoto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Malta Motorcycle Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/malta-motorcycle-theory/dashboard"
            shortName="Motorcycle theory"
            subtitle="200 original questions for your category AM, A1, A2 or A licence: helmets and gear, machine checks, braking and cornering, road position, being seen and slippery surfaces. Five 35-question mock tests with 30 to pass. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/mtmoto-mobile.png", desktop: "/landing/mtmoto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mtmoto" />

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
                Four training sets cover gear and machine checks, control and road position, being seen and road surfaces, and licences, passengers and safe riding. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five 35-question tests with 30 to pass, the length and pass mark Transport Malta gives for the theory test. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built for Riders in Malta
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Malta&apos;s driving licence regulations list what the motorcycle theory test must check: protective clothing and helmets, how visible riders are to others, slippery surfaces such as drain covers and road markings, and the engine cut-out switch, oil and chain. Every question follows Malta&apos;s own rules for left-hand traffic, the licence categories and the law on passengers and helmets. Transport Malta does not publish how many questions come from each topic, so these per-test counts are Tigertest&apos;s. Pictures are described in words.
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
                src={getTigerAsset("mtmoto", 1)}
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
            How to Pass the Malta Motorcycle Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the rider-only topics first</h3>
              <p>
                The questions a car driver never sees are the ones that catch riders out: helmet fit and care, protective clothing, the engine cut-out switch, chain and oil checks, carrying a passenger and how to park a motorcycle. Master these before the general road rules.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Think about grip</h3>
              <p>
                Many questions come back to how much grip your two tyres have: braking before a bend, keeping off drain covers and painted lines, the first rain after a dry spell, diesel at roundabouts and sand on coast roads. If an answer asks a tyre for grip while leaning, it is usually wrong.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Ride as if no one has seen you</h3>
              <p>
                Drivers often look straight at a motorcycle and still pull out. Expect it at junctions and roundabouts, choose a position where you can be seen, and do not take a flash of headlights as an invitation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim above 30</h3>
              <p>
                With only five mistakes allowed, read every word, especially &quot;not&quot; and &quot;first&quot;. Aim for 33 or more in every mock test, drill the questions you missed, then take all five tests before your test day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Malta Motorcycle Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="mtmoto" />

      <ExamRelatedTests examId="mtmoto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Motorcycle Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions for Malta&apos;s motorcycle and moped licences.</p>
          <ExamLandingCTA dashboardHref="/malta-motorcycle-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

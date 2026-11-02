import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/hkdrive";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Hong Kong Driving Theory Test 2026 - Free Written Test Practice";
const metaDescription =
  "Free Hong Kong driving written test practice: 200 original Road Users' Code questions, seven 20-question mock tests with the real 16-of-20 pass mark, every answer explained.";
const description =
  "Free practice for the Hong Kong Transport Department driving written test (Part A, private car): 200 original questions written from the Road Users' Code. Seven mock tests of 20 questions, like the real test, with the real pass mark of 16 out of 20, and five training sets on licences and alcohol, seat belts and child restraints, signs and markings, junctions and roundabouts, sharing the road, speed and expressways, stopping and parking, and night, weather and emergencies.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "hong kong driving test, hong kong driving theory test, hk driving written test, transport department written test, part a written test, road users code test, hong kong learner driver test, private car written test hong kong, hk driving test questions 2026",
  alternates: {
    canonical: `${siteUrl}/hong-kong-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hong-kong-driving-theory-test`,
    images: [{ url: shareImageUrl("hkdrive"), width: 1200, height: 630, alt: "Tigertest free Hong Kong driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hkdrive")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the Hong Kong driving written test and what is the pass mark?",
    a: "The Transport Department's Part A written test for a private car is 20 multiple-choice questions on a computer, and you need 16 or more right to pass. You get 20 minutes. Each real question has three options; the questions here have four, so they are a little harder to guess. The mock tests are the same length with the same 16 out of 20 pass mark.",
  },
  {
    q: "What is the written test based on?",
    a: "The Transport Department says the questions are mainly based on the Road Users' Code, plus recent changes to road traffic law and driving rules. You receive the Code when you apply for a learner's driving licence or the driving test, and it is free on the Transport Department website. The test is held at the Transport Department written test centre in the Cheung Sha Wan Government Offices.",
  },
  {
    q: "What are the rules for learner drivers in Hong Kong?",
    a: "You must be at least 18 to drive a private car. A learner may drive only with a licensed driving instructor, must show L-plates at the front and rear, must not carry passengers other than the instructor, another learner under instruction or an examiner, and must never drive on an expressway. Learners may drive only at set times: the standard conditions bar weekday rush hours and late nights, and some roads are closed to learners by sign. After passing you hold a probationary licence for at least 12 months, with P plates and a 70 km/h top speed.",
  },
  {
    q: "Which recent rule changes should I know for 2026?",
    a: "Since 15 September 2025 you can show an electronic driving licence (eDL) on your phone instead of the card. Since 1 November 2025 children under 8 must use a child restraint in a private car, front or rear, unless they are at least 1.35 metres tall. From 25 January 2026 no more than two phones, tablets or laptops may be placed in front of the driver, each screen no more than 19 cm across the diagonal. These are all in the question bank, so check the Transport Department for anything newer before you sit the test.",
  },
  {
    q: "Are these the real written test questions?",
    a: "No. Every question is original, written by Tigertest from the Road Users' Code and Transport Department guidance, so it tests the same rules without copying any official question. Signs and markings are described in words, so study the pictures in Chapter 8 of the Code too. It is free revision, not an official test, and it does not book or replace your written test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Hong Kong Driving Theory Practice Test",
      description,
      url: `${siteUrl}/hong-kong-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "HKD" },
      featureList: [
        "200 Hong Kong Road Users' Code practice questions",
        "7 mock tests of 20 questions with the real 16 of 20 pass mark",
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
  { name: "Signs, Signals & Markings", weight: "20%" },
  { name: "Licences, Alcohol & Drugs", weight: "15%" },
  { name: "Junctions, Roundabouts & Crossings", weight: "15%" },
  { name: "Speed, Lanes & Expressways", weight: "15%" },
  { name: "Seat Belts, Children & Phones", weight: "10%" },
  { name: "Sharing the Road", weight: "10%" },
  { name: "Stopping & Parking", weight: "10%" },
  { name: "Night, Weather & Emergencies", weight: "5%" },
];

export default function HongKongDrivingTheoryLandingPage() {
  return (
    <div data-theme="hkdrive" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Hong Kong Driving Theory Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hong-kong-driving-test/dashboard"
            shortName="Hong Kong driving test"
            subtitle="200 original questions from the Road Users' Code: signs, junctions and roundabouts, expressways and tunnels, seat belts and child restraints, parking and your learner and probationary rules. Seven 20-question mock tests with the real pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/hkdrive-mobile.png", desktop: "/landing/hkdrive-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hkdrive" />

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
                Five training sets cover the parts of the Road Users&apos; Code the written test asks about, from roundabout lanes to the drink driving limits. Questions you miss come back until you have mastered them.
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
                Seven 20-question tests with the real pass mark of 16, so you can only drop four. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on Hong Kong&apos;s Road Users&apos; Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Transport Department does not publish how many questions come from each topic, so this split is Tigertest&apos;s own, following the Code&apos;s chapters with signs and markings weighted heaviest. Every rule is Hong Kong&apos;s own: driving on the left, 50 km/h unless signed, expressway and tunnel rules, double white lines, yellow box junctions, and the learner and probationary conditions.
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
                src={getTigerAsset("hkdrive", 1)}
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
            How to Pass the Hong Kong Written Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the language of the road</h3>
              <p>
                Shapes and colours carry the meaning: circles give orders, triangles warn and rectangles inform; red borders forbid and blue circles command. Learn the road markings as well, from the centre line and warning line to double white lines, yellow lines, box junctions and the colours of road studs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The test loves numbers: 50 km/h unless signed, 70 km/h for probationary drivers, 25 km/h minimum in a tunnel, a two-second gap (four in bad conditions), 35 metres to stop from 60 km/h, a warning triangle about 50 metres back, 1 mm of tyre tread, and the alcohol limits of 22 micrograms per 100 ml of breath, 50 mg per 100 ml of blood and 67 mg per 100 ml of urine.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the expressway and tunnel rules</h3>
              <p>
                Keep left unless overtaking, never overtake on the left, never stop, reverse or U-turn on an expressway, and remember that learners may not use one at all. In tunnels you must not use main beam or the horn, cross double white lines or change a tyre.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 16</h3>
              <p>
                With only four mistakes allowed, aim for 19 or 20 in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all seven tests before you sit the real one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Hong Kong Driving Written Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="hkdrive" />

      <ExamRelatedTests examId="hkdrive" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Written Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of the Road Users&apos; Code.</p>
          <ExamLandingCTA dashboardHref="/hong-kong-driving-test/dashboard" />
        </div>
      </div>
    </div>
  );
}

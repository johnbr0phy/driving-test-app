import "@/lib/banks/ukdrone";
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

const title = "Free UK Drone Flyer ID Practice Test 2026 - CAA Theory Questions";
const metaDescription =
  "Free-to-start UK drone Flyer ID practice test: 200 original questions on the CAA Drone Code and the A2 CofC theory, five 40-question practice tests and four training sets, every answer explained.";
const description =
  "Practise the UK Civil Aviation Authority's Flyer ID theory test and the A2 Certificate of Competency theory: 200 original questions written from the Drone and Model Aircraft Code (rules from 1 January 2026), the CAA's class mark pages and the A2 CofC acceptable means of compliance. Five 40-question practice tests and four training sets covering Flyer ID and Operator ID, UK class marks, the Over People, Near People and Far from People subcategories, the 120m and 50m rules, flight restriction zones, making every flight safe, privacy and reporting, and Near People (A2) weather, flight performance and ground risk.";

const faqs = [
  {
    q: "Do I need a Flyer ID to fly a drone in the UK?",
    a: "From 1 January 2026, yes, if your drone or model aircraft weighs 100g or more. The Flyer ID comes from passing the CAA's free online theory test. If you own or are responsible for a drone of 250g or more, or 100g or more with a camera, you also need an Operator ID; you must be 18 or over to register for one, and it is renewed every year. Under 100g no ID is needed, but the Drone Code still applies.",
  },
  {
    q: "What is the Flyer ID test like?",
    a: "The CAA's Flyer ID theory test has 40 multiple-choice questions and the pass mark is 30. It is free, taken online, and open book: you can look at the Drone and Model Aircraft Code during the test. The CAA suggests allowing at least 30 minutes, and you can take it as many times as you need. A Flyer ID lasts five years, and you renew it by passing the test again.",
  },
  {
    q: "What is the A2 CofC and do these tests cover it?",
    a: "The A2 Certificate of Competency lets you fly a UK2 class drone in the Near People (A2) subcategory, down to 30m from uninvolved people, or 5m in low speed mode. You need a Flyer ID first, then self-practical training and a theory exam of at least 30 multiple-choice questions, passed at 75%, with a CAA-recognised assessment entity. One training set and part of every practice test here cover its subjects: meteorology, UAS flight performance and ground risk mitigations.",
  },
  {
    q: "What changed in the UK drone rules on 1 January 2026?",
    a: "The Flyer ID threshold dropped to 100g, new drones placed on the market must carry a UK class mark from UK0 to UK6, Remote ID must be switched on for UK1, UK2 and UK3 class drones, and the Open subcategories were renamed Over People (A1), Near People (A2) and Far from People (A3). European C class drones can be flown as their UK equivalent until 31 December 2027. These practice tests follow the rules as they stand from 1 January 2026.",
  },
  {
    q: "Are these the real CAA test questions?",
    a: "No. Every question is original, written by Tigertest from the CAA's Drone and Model Aircraft Code, its class mark and A2 CofC pages and the UK regulation text, as in force in November 2026. The CAA's own test questions are not published and are not used. Tigertest is not affiliated with the UK Civil Aviation Authority or any recognised assessment entity.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "flyer id test, caa drone test, uk drone test, flyer id practice test, a2 cofc practice test, drone code quiz, uk drone licence, operator id, uk class marks, caa flyer id questions",
  alternates: {
    canonical: `${siteUrl}/uk-drone-flyer-id-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/uk-drone-flyer-id-practice-test`,
    images: [{ url: shareImageUrl("ukdrone"), width: 1200, height: 630, alt: "Tigertest free UK drone Flyer ID practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukdrone")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free UK Drone Flyer ID Practice Test",
      description,
      url: `${siteUrl}/uk-drone-flyer-id-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ukdrone"),
      featureList: [
        "200 UK drone Flyer ID and A2 CofC practice questions",
        "5 practice tests of 40 questions, like the Flyer ID test",
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
  { name: "IDs, class marks & privacy", weight: "11 of 40" },
  { name: "Where you can fly", weight: "12 of 40" },
  { name: "Making every flight safe", weight: "7 of 40" },
  { name: "Near People (A2) theory", weight: "10 of 40" },
];

export default function UkDroneLandingPage() {
  return (
    <div data-theme="ukdrone" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free UK Drone Flyer ID Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/uk-drone-flyer-id/dashboard"
            shortName="UK Flyer ID"
            subtitle="200 Flyer ID and A2 CofC theory questions and five 40-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/ukdrone-mobile.png", desktop: "/landing/ukdrone-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukdrone" />

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
                Four training sets follow the Drone Code and the A2 syllabus: IDs, class marks and privacy; where you can fly; making every flight safe; and Near People (A2) weather, performance and ground risk. Questions you miss come back until you have mastered them.
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
                Five practice tests of 40 questions, the length of the Flyer ID test, each mixing every part of the rules. Aim for 75% or better, the Flyer ID pass mark of 30 out of 40. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the Drone Code and the A2 syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The CAA says everything you need to pass the Flyer ID test is in the Drone and Model Aircraft Code, updated for the rules in force from 1 January 2026. Every practice test here mixes the Code&apos;s points with the A2 CofC subjects, so you can get your Flyer ID first and then move on to flying near people.
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
                src={getTigerAsset("ukdrone", 3)}
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
            How to Learn the UK Drone Rules
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the numbers</h3>
              <p>
                100g, 250g, 120m, 50m, 150m, 30m, 5m, 15m and 25kg. Learn what each one belongs to: the ID thresholds, the height limit, the distances from people and built-up areas, the A2 distances, tall structures and the weight that always needs authorisation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your class and subcategory</h3>
              <p>
                Learn which class marks and weights fly in Over People (A1), Near People (A2) and Far from People (A3), how a legacy drone with no class mark is flown, and how long European C class drones can be flown as their UK equivalent.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check before every flight</h3>
              <p>
                Flight restriction zones around airports, restricted sites such as prisons, temporary bans and emergency incidents all change where you can fly. Learn where to check: drone apps, NOTAMs, the NATS drone website and the Aeronautical Information Publication.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 75% or better on every practice test. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          UK Drone Flyer ID Frequently Asked Questions
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

      <ExamSampleQuestions examId="ukdrone" />

      <ExamRelatedTests examId="ukdrone" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Flyer ID?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the Drone Code and the A2 CofC theory.</p>
          <ExamLandingCTA dashboardHref="/uk-drone-flyer-id/dashboard" />
        </div>
      </div>
    </div>
  );
}

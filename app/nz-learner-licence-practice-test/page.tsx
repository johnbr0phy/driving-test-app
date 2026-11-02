import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/nzroad";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "NZ Learner Licence Practice Test 2026 - Free Road Code Test";
const metaDescription =
  "Free NZ learner licence practice test: 200 original Road Code questions, five 35-question mock tests with the real 32-of-35 pass mark, every answer explained.";
const description =
  "Free practice for the New Zealand learner licence theory test: 200 original questions written from the Official New Zealand Road Code. Five mock tests of 35 questions, like the real test, with the real pass mark of 32 out of 35, and five training sets on licences and alcohol, signs and markings, give way rules, road position and speed, sharing the road, parking, and night, weather and crashes.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nz learner licence test, learner licence practice test, nz road code test, road code quiz, nz theory test practice, learners licence nz, nzta learner licence test, class 1 learner licence, nz road code questions 2026",
  alternates: {
    canonical: `${siteUrl}/nz-learner-licence-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-learner-licence-practice-test`,
    images: [{ url: shareImageUrl("nzroad"), width: 1200, height: 630, alt: "Tigertest free NZ learner licence practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzroad")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the NZ learner licence test and what is the pass mark?",
    a: "The learner licence theory test is 35 multi-choice questions on a computer, and you need at least 32 right to pass. You get 30 minutes, which is plenty if you have studied the Road Code. The mock tests here are the same length with the same 32 out of 35 pass mark.",
  },
  {
    q: "What do I need to sit the learner licence test?",
    a: "You must be at least 16. At the licensing agent you pass an eyesight check, show proof of identity and pay the learner licence application fee. The test is offered in several languages besides English, including te reo Māori. If you fail twice on the same day you must wait 10 working days before trying again.",
  },
  {
    q: "What can I do on a learner licence?",
    a: "You may drive only with a supervisor beside you in the front passenger seat who has held a full licence for that class for at least two years. L plates must be shown on the front and back of the car, you may carry passengers only if your supervisor agrees, and if you are under 20 your alcohol limit is zero.",
  },
  {
    q: "Are the licence rules changing in 2026 and 2027?",
    a: "Yes. From 1 October 2026 drivers must leave at least 1.5 metres when passing cyclists, horse riders, pedestrians and others not in a motor vehicle going the same way, and on roads of 60 km/h or less must give way to a bus that has signalled for 3 seconds to pull out. From 25 January 2027 the car learner stage becomes 12 months for drivers under 25 (six with an approved course or logged supervised hours), the restricted stage becomes 12 months for under 25s and 6 months for older drivers, hazard perception moves into the restricted test and the full licence practical test is removed. The theory test itself stays 35 questions with 32 to pass. Check NZTA before you book.",
  },
  {
    q: "Are these the real learner licence test questions?",
    a: "No. Every question is original, written by Tigertest from the Official New Zealand Road Code, so it tests the same rules without copying NZTA's questions. Signs and markings are described in words, so look at the pictures in the Road Code too. It is free revision, not an official test, and it does not book or replace your theory test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ Learner Licence Practice Test",
      description,
      url: `${siteUrl}/nz-learner-licence-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NZD" },
      featureList: [
        "200 NZ Road Code practice questions",
        "5 mock tests of 35 questions with the real 32 of 35 pass mark",
        "5 training sets by Road Code topic",
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
  { name: "Intersections & Giving Way", weight: "20%" },
  { name: "Signs, Signals & Markings", weight: "17%" },
  { name: "Road Position, Speed & Overtaking", weight: "17%" },
  { name: "Licences, Alcohol & Drugs", weight: "14%" },
  { name: "Sharing the Road", weight: "14%" },
  { name: "Parking", weight: "9%" },
  { name: "Night, Weather & Crashes", weight: "9%" },
];

export default function NzLearnerLicenceLandingPage() {
  return (
    <div data-theme="nzroad" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Learner Licence Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-learner-licence/dashboard"
            shortName="Learner licence"
            subtitle="200 original questions from the Official New Zealand Road Code: give way rules, signs, speed, sharing the road, parking and your licence conditions. Five 35-question mock tests with the real pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nzroad-mobile.png", desktop: "/landing/nzroad-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzroad" />

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
                Five training sets cover every part of the Road Code the theory test asks about, from give way rules to parking distances. Questions you miss come back until you have mastered them.
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
                Five 35-question tests with the real pass mark of 32, so you can only drop three. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the Official New Zealand Road Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NZTA does not publish how many questions come from each topic, so each mock test follows the Road Code&apos;s own chapters, with the give way rules weighted heaviest because they trip up the most people. Every rule is New Zealand&apos;s own: left-hand traffic, km/h, the turning-traffic give way rule, one-lane bridges, flush medians and the learner and restricted conditions.
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
                src={getTigerAsset("nzroad", 1)}
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
            How to Pass the Learner Licence Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the give way rules first</h3>
              <p>
                Most people who fail lose marks at intersections. Learn the core rule, that turning traffic gives way to traffic not turning, then the special cases: a right-turner gives way to an opposite left-turner, the road that ends at a T gives way to the road that carries on, and at a roundabout you give way to everyone coming from your right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The test loves numbers: 50 and 100 km/h defaults, 90 km/h when towing, 20 km/h past a stopped school bus, a two-second gap (four in the wet), three seconds of signalling, 6 metres from an intersection, 1 metre from a driveway, 1.5 metres when passing a cyclist and 1.5 mm of tyre tread. Write them in one table and quiz yourself until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your own licence rules</h3>
              <p>
                Expect questions on the learner and restricted conditions, the zero alcohol limit for under 20s, the adult limits of 250 micrograms per litre of breath and 50 milligrams per 100 millilitres of blood, and 100 demerit points in two years. These are the rules you will drive under for the next year or more.
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
          Learner Licence Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="nzroad" />

      <ExamRelatedTests examId="nzroad" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your Learner Licence?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of the Road Code.</p>
          <ExamLandingCTA dashboardHref="/nz-learner-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}

import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/mttheory";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Malta Driving Theory Test 2026 - Free Practice Test";
const metaDescription =
  "Free Malta driving theory test practice: 200 original questions on Maltese road rules and signs, five 35-question mock tests with 30 to pass, every answer explained.";
const description =
  "Free practice for the Transport Malta theory test for a category B car licence: 200 original questions on road signs, markings and signals, roundabouts and priority, speed limits, parking, pedestrians and cyclists, alcohol and seat belts, and breakdowns and crashes. Five 35-question mock tests with 30 to pass, like the real test, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "malta driving theory test, malta theory test, transport malta theory test, malta driving test questions, theory test malta practice, malta driving licence test, category b theory test malta, malta highway code test, learner permit malta, driving theory test malta 2026",
  alternates: {
    canonical: `${siteUrl}/malta-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/malta-driving-theory-test`,
    images: [{ url: shareImageUrl("mttheory"), width: 1200, height: 630, alt: "Tigertest free Malta driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mttheory")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Malta driving theory test like?",
    a: "It is a multiple-choice test on a touch-screen computer at Transport Malta's Theory Test Centre. You get 35 questions and 45 minutes, and you need at least 30 correct answers to pass, so you can afford five mistakes. The questions cover road signs and markings, priority at junctions and roundabouts, speed, parking, other road users, alcohol and safety.",
  },
  {
    q: "Can I take the Malta theory test in English?",
    a: "Yes. The test is offered in English or Maltese, and Transport Malta publishes its theory material in both languages. If you find reading difficult, ask Transport Malta about help with reading before you book.",
  },
  {
    q: "Who can sit the theory test for a car licence?",
    a: "You must be at least 18 and hold a learner's permit for category B. Bring your ID card on the day, as you must show it before the test. After you pass, you go on to the practical driving test, still on your learner's permit.",
  },
  {
    q: "Which rules does the test use?",
    a: "Malta's own. Traffic drives on the left, you go round roundabouts clockwise and give way to traffic from your right, and the general speed limits for cars are 80 km/h on open roads and 50 km/h in built-up areas unless signs say otherwise. The study guide is Transport Malta's Highway Code, updated in July 2025.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from Malta's road rules, so it tests the same knowledge without copying the official question bank. Signs are described in words, so study pictures of the signs too. Tigertest is free practice and is not affiliated with Transport Malta, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Malta Driving Theory Practice Test",
      description,
      url: `${siteUrl}/malta-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Malta road rule and road sign questions",
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
  { name: "Road Signs", weight: "7 of 35" },
  { name: "Roundabouts, Junctions & Priority", weight: "6 of 35" },
  { name: "Road Markings, Lights & Signals", weight: "4 of 35" },
  { name: "Speed, Lanes & Overtaking", weight: "4 of 35" },
  { name: "Pedestrians, Cyclists & Other Road Users", weight: "4 of 35" },
  { name: "Licences, Learners & the Test", weight: "3 of 35" },
  { name: "Alcohol, Phones, Seat Belts & Your Car", weight: "3 of 35" },
  { name: "Stopping & Parking", weight: "2 of 35" },
  { name: "Night, Weather, Breakdowns & Crashes", weight: "2 of 35" },
];

export default function MaltaDrivingTheoryLandingPage() {
  return (
    <div data-theme="mttheory" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Malta Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/malta-driving-theory/dashboard"
            shortName="Theory test"
            subtitle="200 original questions on Maltese road rules for your category B licence: signs, markings, roundabouts, speed limits, parking and sharing the road. Five 35-question mock tests with 30 to pass, like the real test. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/mttheory-mobile.png", desktop: "/landing/mttheory-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mttheory" />

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
                Four training sets cover road signs, markings and junctions, speed, parking and sharing the road, and licences, safety and emergencies. Questions you miss come back until you have mastered them.
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
                Five 35-question tests with 30 to pass, the same length and pass mark as the real test. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on Malta&apos;s Road Rules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every question follows Malta&apos;s own rules: driving on the left, going round roundabouts clockwise, British-style signs and markings, speed limits in km/h, and the lower alcohol limit for probationary drivers. Transport Malta does not publish how many questions come from each topic, so these per-test counts are Tigertest&apos;s, with signs and priority weighted most. Signs are described in words.
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
                src={getTigerAsset("mttheory", 1)}
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
            How to Pass the Malta Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape and colour</h3>
              <p>
                Red-bordered triangles warn, red circles forbid, blue circles give orders, the red octagon means stop and the upside-down triangle means give way. Learn the families first and most signs explain themselves.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Think left-hand traffic</h3>
              <p>
                If you learned to drive elsewhere, the trickiest questions are the mirror-image ones. In Malta you keep left, overtake on the right, go round roundabouts clockwise giving way to traffic already on them, which comes from your right, and at a crossroads of equal roads you let the vehicle on your right go first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read every option</h3>
              <p>
                With only five mistakes allowed, careless reading costs passes. Read the whole question, especially words like &quot;not&quot; and &quot;first&quot;, and check each option before you tap. You have 45 minutes for 35 questions, so there is no need to rush.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim above 30</h3>
              <p>
                Aim for 33 or more in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all five tests before your test day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Malta Driving Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="mttheory" />

      <ExamRelatedTests examId="mttheory" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Malta&apos;s road rules and signs.</p>
          <ExamLandingCTA dashboardHref="/malta-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

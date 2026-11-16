import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/chtheory";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Swiss Driving Theory Test in English 2026 - Free Practice Test";
const metaDescription =
  "Free Swiss basic theory test practice in English: 200 original questions on Swiss road rules and signs, four 50-question mock tests with 45 to pass, every answer explained.";
const description =
  "Free practice for the Swiss basic theory test for a category B car licence, which the cantonal road traffic office offers in English: 200 original questions on road signs, markings and signals, priority to the right and roundabouts, speed limits and overtaking, parking, pedestrians and cyclists, alcohol and seat belts, and motorways and accidents. Four 50-question mock tests with 45 to pass, a practice line equal to the real 15-error limit, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "swiss driving theory test, switzerland theory test english, basistheorieprüfung english, swiss learner test, switzerland driving licence theory, theory test switzerland practice, swiss road rules test, strassenverkehrsamt theory test, examen théorique de base, driving theory test switzerland 2026",
  alternates: {
    canonical: `${siteUrl}/switzerland-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/switzerland-driving-theory-test`,
    images: [{ url: shareImageUrl("chtheory"), width: 1200, height: 630, alt: "Tigertest free Swiss driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("chtheory")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Swiss basic theory test like?",
    a: "It is the first test for a learner licence, taken at your canton's road traffic office. As the Aargau and Zurich road traffic offices describe it, you answer about 50 questions on a computer in 45 minutes out of 150 points, and you may collect at most 15 error points (Zurich's page lists 55 questions and 17 errors, which is the same 10% of the points). Each question can score between 1 and 3 error points, and some have more than one right answer. Tigertest uses four 50-question mock tests with one answer each and 45 to pass.",
  },
  {
    q: "Can I take the Swiss theory test in English?",
    a: "Yes, for the basic theory test. The canton of Zurich lists German, French, Italian and English, and says English is offered only for the basic theory test (categories A1, A and B). Other cantons set their own languages and booking, so check with your cantonal road traffic office (Strassenverkehrsamt) before you book.",
  },
  {
    q: "Who needs to sit the basic theory test?",
    a: "Anyone applying for a first learner licence in category B (car) or the motorcycle categories. People who already hold a category A1, A, B1 or B licence do not have to take it again, the Aargau office says. After you pass you receive the learner licence, which you need for practical driving lessons.",
  },
  {
    q: "Which rules does the test use?",
    a: "Swiss federal traffic law: the Road Traffic Act (SVG), the Traffic Rules Ordinance (VRV) and the Signalling Ordinance (SSV). Traffic drives on the right, vehicles from the right have priority unless a sign says otherwise, and the general limits are 50 km/h in built-up areas, 80 km/h outside them, 100 km/h on expressways and 120 km/h on motorways. A driver counts as unfit through alcohol at 0.5 per mille, and learners and probationary drivers may not drive with alcohol in the blood.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from the federal traffic rules, so it tests the same knowledge without copying the official question bank that the road traffic offices license. Signs are described in words, so study pictures of the signs too. Tigertest is free practice and is not affiliated with the road traffic offices, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Swiss Driving Theory Practice Test",
      description,
      url: `${siteUrl}/switzerland-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("chtheory"),
      featureList: [
        "200 Swiss road rule and road sign questions",
        "4 mock tests of 50 questions, 45 to pass",
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
  { name: "Road Signs", weight: "8 of 50" },
  { name: "Priority, Junctions & Roundabouts", weight: "8 of 50" },
  { name: "Speed, Lanes & Overtaking", weight: "7 of 50" },
  { name: "Alcohol, Phones, Belts, Lights & Licence", weight: "7 of 50" },
  { name: "Pedestrians, Cyclists & Other Road Users", weight: "6 of 50" },
  { name: "Markings, Lights & Signals", weight: "5 of 50" },
  { name: "Stopping & Parking", weight: "5 of 50" },
  { name: "Motorways, Tunnels, Crossings & Accidents", weight: "4 of 50" },
];

export default function SwitzerlandDrivingTheoryLandingPage() {
  return (
    <div data-theme="chtheory" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Swiss Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/switzerland-driving-theory/dashboard"
            shortName="Theory test"
            subtitle="200 original questions on Swiss road rules for your category B learner licence, in English: signs, priority to the right, speed limits, overtaking, parking and sharing the road. Four 50-question mock tests with 45 to pass. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/chtheory-mobile.png", desktop: "/landing/chtheory-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="chtheory" />

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
                Four 50-question tests with 45 to pass, the same length as the real test and the same 10% error limit. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the Swiss Traffic Rules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every question follows Swiss federal rules: driving on the right, priority to the right at junctions, a yellow diamond for priority roads, speed limits in km/h, and the zero-alcohol rule for learners and probationary drivers. The road traffic offices do not publish how many questions come from each topic, so these per-test counts are Tigertest&apos;s, with signs and priority weighted most. Signs are described in words.</p>
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
                src={getTigerAsset("chtheory", 1)}
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
            How to Pass the Swiss Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape and colour</h3>
              <p>
                Red-bordered triangles warn, red circles forbid, blue circles give orders, the red octagon means stop and the upside-down triangle means give way. Learn the families first and most signs explain themselves.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Think priority to the right</h3>
              <p>
                Where nothing says otherwise, the vehicle from your right goes first, even if you are on a wider road. A yellow diamond with a white border means you have priority, a roundabout gives priority to vehicles already in the circle, and you give way to oncoming traffic when you turn left. Pedestrians on a crossing and trams come first.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read every option</h3>
              <p>
                Your mistakes are limited, so careless reading costs passes. Read the whole question, especially words like &quot;not&quot; and &quot;first&quot;, and check each option before you tap. You have 45 minutes for the whole test, so there is no need to rush.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim above 45</h3>
              <p>
                Aim for 47 or more in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four tests before your test day.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Swiss Driving Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="chtheory" />

      <ExamRelatedTests examId="chtheory" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on Swiss road rules and signs.</p>
          <ExamLandingCTA dashboardHref="/switzerland-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

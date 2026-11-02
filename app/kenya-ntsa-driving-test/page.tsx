import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/kentsa";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Kenya NTSA Driving Test Practice 2026 - Free Highway Code Test";
const metaDescription =
  "Free Kenya NTSA driving test practice: 200 original Highway Code and Traffic Act questions, four 50-question mock tests and every answer explained.";
const description =
  "Free practice for the theory part of the Kenya NTSA driving test: 200 original questions written from the Kenya Highway Code and the Traffic Act. Four mock tests of 50 questions with an 80% target, and five training sets on licences and alcohol, road signs and signals, junctions and roundabouts, speed and overtaking, sharing the road, parking, breakdowns and crashes, and night, weather and vehicle care.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ntsa driving test, kenya driving test questions, ntsa theory test, kenya highway code test, ntsa driving test practice, kenya driving licence test, highway code kenya questions, ntsa test questions and answers 2026, class b driving test kenya",
  alternates: {
    canonical: `${siteUrl}/kenya-ntsa-driving-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/kenya-ntsa-driving-test`,
    images: [{ url: shareImageUrl("kentsa"), width: 1200, height: 630, alt: "Tigertest free Kenya NTSA driving test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("kentsa")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the NTSA theory test and what is the pass mark?",
    a: "NTSA does not publish a current question count or pass mark for the theory part of the driving test. When NTSA brought in written tests, its 2019 guidelines (reported by Business Daily) set a minimum of 50 multiple-choice questions and an 80% pass mark. The mock tests here are 50 questions each, and Tigertest's own target is 80%, or 40 of 50. Ask your driving school how the test is run at your testing centre.",
  },
  {
    q: "How old do I have to be to get a driving licence in Kenya?",
    a: "Under the Traffic Act you must be at least 18 for a car licence. Below 18, a licence may cover motorcycles only, and no licence is granted under 16. To drive a matatu or bus you must be over 24 and have held a car or commercial licence for at least four years. You must also be able to read a number plate at 25 metres, with glasses if you wear them.",
  },
  {
    q: "What are the rules for learner drivers?",
    a: "With a provisional licence you may drive only to learn the class it covers. You must show L plates on the front and the rear of the car and be accompanied by a qualified driver licensed for that class, sitting beside you. You may not carry passengers for hire. The theory is taught at a registered driving school before you book the NTSA test.",
  },
  {
    q: "What is the drink-driving limit in Kenya?",
    a: "Under the 2026 drink-driving rules, drivers of public service vehicles, commercial vehicles and school transport may have no alcohol at all. For other drivers the limit is 35 micrograms of alcohol per 100 millilitres of breath. A conviction for driving under the influence brings a ban of at least 12 months.",
  },
  {
    q: "Are these the real NTSA test questions?",
    a: "No. Every question is original, written by Tigertest from the Kenya Highway Code and the Traffic Act, so it tests the same rules without copying any official or commercial question bank. Signs are described in words, so study the pictures in the Highway Code too. It is free revision, not an official test, and it does not book or replace your NTSA driving test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Kenya NTSA Driving Test Practice",
      description,
      url: `${siteUrl}/kenya-ntsa-driving-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KES" },
      featureList: [
        "200 Kenya Highway Code practice questions",
        "4 mock tests of 50 questions with an 80% target",
        "5 training sets by Highway Code topic",
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
  { name: "Road Signs & Signals", weight: "20%" },
  { name: "Speed, Overtaking & Road Position", weight: "18%" },
  { name: "Licences, Alcohol & the Law", weight: "16%" },
  { name: "Junctions & Roundabouts", weight: "16%" },
  { name: "Sharing the Road", weight: "12%" },
  { name: "Parking, Breakdowns & Crashes", weight: "10%" },
  { name: "Night, Weather & Vehicle Care", weight: "8%" },
];

export default function KenyaNtsaDrivingTestLandingPage() {
  return (
    <div data-theme="kentsa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Kenya NTSA Driving Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/kenya-driving-test/dashboard"
            shortName="Driving test"
            subtitle="200 original questions from the Kenya Highway Code and the Traffic Act: road signs, roundabouts, overtaking, matatus and boda bodas, breakdowns and the 2026 alcohol limits. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/kentsa-mobile.png", desktop: "/landing/kentsa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="kentsa" />

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
                Five training sets cover the Highway Code from road signs to what to do after a crash. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions with an 80% target, so you aim for at least 40. No question repeats across tests, and every answer explains the rule behind it.
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
                Built on the Kenya Highway Code and the Traffic Act
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NTSA does not publish how many questions come from each topic, so this split is Tigertest&apos;s own, weighted towards signs, speed and overtaking. Every rule is Kenya&apos;s own: driving on the left, the 50 km/h town limit, 80 km/h speed governors on matatus and lorries, life savers 50 metres from a breakdown, one passenger on a boda boda and stopping when a herder signals.
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
                src={getTigerAsset("kentsa", 1)}
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
            How to Pass the NTSA Driving Test Theory
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the signs by shape first</h3>
              <p>
                Red triangles warn, red circles forbid and blue circles order. Once the shapes are automatic, learn the symbols inside them: crossroads, children, cattle, wild animals, humps, road works and no overtaking. The Highway Code has the pictures; this bank describes them in words.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                18 for a car licence, over 24 for a matatu, 25 metres to read a number plate, 50 km/h in towns, 80 km/h for PSV speed governors, 8 hours of driving a day for PSV and commercial drivers, 50 metres for life savers, 24 hours to report an injury crash and 35 micrograms per 100 ml of breath. Quiz yourself until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the right of way rules</h3>
              <p>
                Keep left and go clockwise at roundabouts, giving way to traffic from your right. Wait for oncoming traffic before turning right, let pedestrians finish crossing the road you turn into, and pull over for ambulances and fire engines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim above 40 of 50</h3>
              <p>
                Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four tests before your NTSA test day. Your driving school will prepare you for the practical parts of the test.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NTSA Driving Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="kentsa" />

      <ExamRelatedTests examId="kentsa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your NTSA Driving Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across the Kenya Highway Code.</p>
          <ExamLandingCTA dashboardHref="/kenya-driving-test/dashboard" />
        </div>
      </div>
    </div>
  );
}

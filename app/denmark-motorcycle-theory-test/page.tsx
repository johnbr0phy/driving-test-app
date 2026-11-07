import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/dkmoto";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Denmark Motorcycle Theory Test 2026 in English - Free Practice";
const metaDescription =
  "Free Danish motorcycle theory test (teoriprøve, A1, A2 and A) practice in English: 200 original questions, eight 25-question mock tests and every answer explained.";
const description =
  "Free practice in English for the Danish motorcycle theory test (teoriprøve) for categories A1, A2 and A: 200 original questions written from Færdselsstyrelsen's teaching plan for motorcycles, on the motorcycle and protective gear, licence categories and passengers, position in the lane and bends, meeting and overtaking, junctions and roundabouts, motorways, parking and riding in the dark, alcohol, drugs and speed. Eight 25-question mock tests with 20 to pass, like the real test, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "denmark motorcycle theory test, danish motorcycle theory test in english, teoriprøve motorcykel, motorcycle teoriprøve english, mc teori, kørekort motorcykel, category a theory test denmark, a2 theory test denmark, færdselsstyrelsen motorcycle test, teoriprøve 2026",
  alternates: {
    canonical: `${siteUrl}/denmark-motorcycle-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/denmark-motorcycle-theory-test`,
    images: [{ url: shareImageUrl("dkmoto"), width: 1200, height: 630, alt: "Tigertest free Denmark motorcycle theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("dkmoto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Danish motorcycle theory test like?",
    a: "The theory test (teoriprøve) for categories A1, A2 and A is run by Færdselsstyrelsen, the Danish Road Traffic Authority, under the same rules as the car test. It lasts about half an hour and you may make at most five errors; an unanswered question counts as an error. On the digital test each question shows a computer-generated picture of a traffic situation and you choose the correct answer or answers on a touch screen. Questions are drawn at random from the whole teaching plan for motorcycles. Færdselsstyrelsen does not state the number of questions for category A on its site; guides give 25, so 20 right is a pass.",
  },
  {
    q: "Can I take the motorcycle theory test in English?",
    a: "Yes. Færdselsstyrelsen runs digital theory tests in Danish and English at all of its digital test sites, and category A is on the list of categories offered digitally. German digital tests are held only in Aabenraa. Interpreters for other languages ended on 1 January 2025, so there is no theory test in other languages.",
  },
  {
    q: "What does the motorcycle theory test cover?",
    a: "Færdselsstyrelsen's published key for the digital category A test gives about 52% of the questions to manoeuvres on the road, such as position in the lane, bends, meeting and overtaking, junctions, roundabouts, motorways, parking and riding in the dark, and about 8% each to the motorcycle and its equipment, how other vehicles handle, road user behaviour, road conditions, basic traffic rules and special risks such as alcohol, drugs and speed. Tigertest's mock tests follow that split.",
  },
  {
    q: "Which motorcycle may I ride with A1, A2 or A in Denmark?",
    a: "A1 covers motorcycles of at most 125 cm³ and 11 kW and can be issued from 18. A2 covers motorcycles of at most 35 kW and can be issued from 20. A covers any motorcycle and can be issued from 24, or from 22 if you have held A2 for at least two years and pass a practical test on a category A motorcycle. You must first take lessons with an approved motorcycle instructor and, for a first licence, a traffic-related first aid course; then come the theory test and the practical test with its manoeuvre test.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from Færdselsstyrelsen's teaching plan for motorcycles (version 1.0, 2026), so it tests the same rules without copying any official question. The real test shows a picture with each question and can have more than one correct answer; Tigertest uses text questions with one answer and describes signs and situations in words. It is free practice, not affiliated with Færdselsstyrelsen, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Denmark Motorcycle Theory Practice Test",
      description,
      url: `${siteUrl}/denmark-motorcycle-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
      inLanguage: "en",
      featureList: [
        "200 Danish motorcycle theory questions in English",
        "8 mock tests of 25 questions, 20 to pass",
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
  { name: "Moving Off, Position, Bends & Lanes", weight: "16%" },
  { name: "Meeting, Following & Overtaking", weight: "12%" },
  { name: "Junctions & Roundabouts", weight: "12%" },
  { name: "Motorways, Parking & Darkness", weight: "12%" },
  { name: "Motorcycle, Gear & Documents", weight: "8%" },
  { name: "Other Vehicles & How They Handle", weight: "8%" },
  { name: "Perception, Fitness & Other Road Users", weight: "8%" },
  { name: "Road Conditions & Grip", weight: "8%" },
  { name: "Licences, Passengers & Basic Rules", weight: "8%" },
  { name: "Alcohol, Drugs & Speed", weight: "8%" },
];

export default function DenmarkMotorcycleTheoryLandingPage() {
  return (
    <div data-theme="dkmoto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Denmark Motorcycle Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/denmark-motorcycle-theory/dashboard"
            shortName="Motorcycle theory"
            subtitle="200 original questions in English for the Danish motorcycle teoriprøve (A1, A2 and A): lane position and bends, being seen at junctions, sidecars and passengers, helmets, motorways, riding in the dark, alcohol and speed. Eight 25-question mock tests with 20 to pass, like the real test. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/dkmoto-mobile.png", desktop: "/landing/dkmoto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="dkmoto" />

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
                Four training sets cover your motorcycle, licence rules and other vehicles; the rider, the road and the risks; position, bends and overtaking; and junctions, motorways and riding in the dark. Questions you miss come back until you have mastered them.
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
                Eight 25-question tests that together cover all 200 questions. You need 20 right, the same as at most five errors on the real test. No question repeats across tests, and every answer explains the rule.
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
                Weighted Like the Digital Teoriprøve
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Færdselsstyrelsen draws the questions at random from the teaching plan for motorcycles and publishes how the digital category A test is weighted: about 52% on manoeuvres on the road and about 8% on each of six other sections. Tigertest&apos;s mock tests follow the same split, in km/h and metres, for right-hand traffic. The real test shows a picture with every question and some have more than one correct answer; here each question is text with one answer, and signs are described in words. The practical manoeuvre test and road test are not part of this practice.
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
                src={getTigerAsset("dkmoto", 1)}
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
            How to Pass the Danish Motorcycle Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Think like a driver who has not seen you</h3>
              <p>
                The plan returns again and again to the same crash: an oncoming car turning left across a motorcyclist, whose bike looks small, far off and slow, like a moped. Questions on junctions, lane position and conspicuous gear all build on that.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the bend rules</h3>
              <p>
                Most single-vehicle crashes happen by running wide on the outside of a bend. Know where to place the bike before left and right bends, why you keep clear of the centre line as you lean, and how the ideal line and gentle throttle keep you on the road.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the motorcycle-only rules</h3>
              <p>
                Helmets for everyone aged 5 or over, children under 135 cm only from 5 in a child seat, one extra child under 10 in a sidecar, no towing and no being towed, always signalling before a lane change on a motorway, a flash of the headlight instead of the horn after dark, and the A1, A2 and A limits of 125 cm³ and 11 kW, 35 kW and none.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read every answer, then look at the picture</h3>
              <p>
                On the real test a question can have more than one correct answer and an unanswered one counts as an error, so read each option on its own against the picture. Aim for 23 or more in every Tigertest mock test before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Danish Motorcycle Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="dkmoto" />

      <ExamRelatedTests examId="dkmoto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Motorcycle Teoriprøve?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions in English on the Danish rules for motorcyclists.</p>
          <ExamLandingCTA dashboardHref="/denmark-motorcycle-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

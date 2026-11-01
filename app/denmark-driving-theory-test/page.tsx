import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/dkteori";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Denmark Driving Theory Test 2026 in English - Free Practice";
const metaDescription =
  "Free Danish theory test (teoriprøve) practice in English: 200 original questions on Danish road rules, eight 25-question mock tests and every answer explained.";
const description =
  "Free practice in English for the Danish driving theory test (teoriprøve) for a category B car licence: 200 original questions written from Færdselsstyrelsen's category B teaching plan, on the car and its equipment, alcohol and fitness to drive, moving off and changing lanes, passing, meeting and overtaking, junctions, give way and roundabouts, motorways, parking, driving in the dark and tunnels. Eight 25-question mock tests with 20 to pass, like the real test, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "denmark driving theory test, danish theory test in english, teoriprøve english, teoriprøve practice, danish driving licence theory test, kørekort theory test english, færdselsstyrelsen theory test, category b theory test denmark, danish road rules quiz, teoriprøve 2026",
  alternates: {
    canonical: `${siteUrl}/denmark-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/denmark-driving-theory-test`,
    images: [{ url: shareImageUrl("dkteori"), width: 1200, height: 630, alt: "Tigertest free Denmark driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("dkteori")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Danish theory test like?",
    a: "The theory test (teoriprøve) is run by Færdselsstyrelsen, the Danish Road Traffic Authority, at its own test centres. It lasts 25 minutes and you may make at most five errors. You choose a digital test on a touch screen, where you can go back to earlier questions and have them read aloud, or an analogue test on a paper answer sheet, where the questions are played on a screen and you cannot go back. Each question comes with a picture of a traffic situation and you choose the correct answer or answers. An unanswered question counts as an error. Færdselsstyrelsen's own online practice test has 25 questions and needs 20 right.",
  },
  {
    q: "Can I take the Danish theory test in English?",
    a: "Yes. Besides Danish, the test is offered in English, German, Faroese and Greenlandic, and you choose the language on your licence application. In English you can take the digital or the analogue test at every test centre in Denmark, without an interpreter. German is offered only in Southern Jutland, and Faroese and Greenlandic with an interpreter. Interpreters for other languages ended on 1 January 2025.",
  },
  {
    q: "What does the theory test cover?",
    a: "The questions are drawn at random from the whole category B teaching plan (undervisningsplan). Færdselsstyrelsen's published key gives about 72% of the digital test to manoeuvres on the road, such as junctions, give way, roundabouts, overtaking, motorways, parking and driving in the dark, about 8% to the car, its equipment and documents, and about 4% each to vehicle handling, road user behaviour, road conditions, basic traffic rules and special risks such as alcohol and speed. Tigertest's mock tests follow that split.",
  },
  {
    q: "When can I take the theory test and the driving test?",
    a: "You must first complete the theory lessons and the closed-track lessons at a driving school, and hand in your application, medical certificate and first aid certificate to Borgerservice. You can take the theory test from the day you turn 16 years and 11 months and get your licence at 17; until you turn 18 you must have a companion in the car between 20:00 and 05:00. A passed theory test is valid for 18 months, so pass the practical test within that time. From 1 October 2026 new students book their tests on minkøreprøve.dk.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from Færdselsstyrelsen's category B teaching plan, so it tests the same rules without copying any official question. The real test shows a picture with each question and can have more than one correct answer; Tigertest uses text questions with one answer and describes signs in words, so look at the real signs too. It is free practice, not affiliated with Færdselsstyrelsen, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Denmark Driving Theory Practice Test",
      description,
      url: `${siteUrl}/denmark-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
      inLanguage: "en",
      featureList: [
        "200 Danish road rule questions in English",
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
  { name: "Motorways, Parking, Darkness & Tunnels", weight: "24%" },
  { name: "Junctions, Give Way & Roundabouts", weight: "20%" },
  { name: "Passing, Meeting, Following & Overtaking", weight: "16%" },
  { name: "Moving Off, Speed & Changing Lanes", weight: "12%" },
  { name: "Roads, Basic Rules & Special Risks", weight: "12%" },
  { name: "Car, Equipment & Documents", weight: "8%" },
  { name: "Vehicles, Road Users & Fitness to Drive", weight: "8%" },
];

export default function DenmarkDrivingTheoryLandingPage() {
  return (
    <div data-theme="dkteori" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Denmark Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/denmark-driving-theory/dashboard"
            shortName="Theory test"
            subtitle="200 original questions in English on the Danish rules of the road for the teoriprøve: give way to the right, roundabouts, overtaking, cyclists at junctions, motorways, parking and tunnels. Eight 25-question mock tests with 20 to pass, like the real test. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/dkteori-mobile.png", desktop: "/landing/dkteori-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="dkteori" />

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
                Four training sets cover the car, road users and basic rules; lanes, passing and overtaking; junctions, give way and roundabouts; and motorways, parking and driving in the dark. Questions you miss come back until you have mastered them.
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
                Færdselsstyrelsen draws the questions at random from the category B teaching plan and publishes how the digital test is weighted: about 72% on manoeuvres on the road, 8% on the car and its equipment, and the rest on road user behaviour, road conditions, basic rules and special risks. Tigertest&apos;s mock tests follow the same split, in km/h and metres, for right-hand traffic. The real test shows a picture with every question and some have more than one correct answer; here each question is text with one answer, and signs are described in words.
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
                src={getTigerAsset("dkteori", 1)}
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
            How to Pass the Danish Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master give way first</h3>
              <p>
                Most of the test is about manoeuvres on the road, and give way decides many of them. Learn when you have an unconditional duty to give way (shark&apos;s teeth, the give-way sign, STOP, leaving a car park or crossing a raised pavement) and that everywhere else you give way to traffic from the right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Watch for cyclists</h3>
              <p>
                Denmark has cycle tracks on most town roads. Turning right, you give way to cyclists and moped riders going straight on, including those who come up on your right, so check over your right shoulder before every right turn and when leaving a roundabout.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the numbers that are asked</h3>
              <p>
                Speed limits (50, 80, 130), the 2-second gap, the 0.5 and novice 0.2 per mille limits, 1.6 mm tread, and the parking distances: 5 m before a crossing, 10 m from a junction, 12 m either side of a bus stop and 30 m from a level crossing. These appear again and again.
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
          Danish Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="dkteori" />

      <ExamRelatedTests examId="dkteori" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Teoriprøve?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions in English on the Danish rules of the road.</p>
          <ExamLandingCTA dashboardHref="/denmark-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

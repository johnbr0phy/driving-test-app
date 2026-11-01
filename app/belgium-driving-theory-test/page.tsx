import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/bedriving";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Belgium Driving Theory Test 2026 - Free Practice in English";
const metaDescription =
  "Free Belgian driving theory practice in English: 200 original questions on the Highway Code, four 50-question mock tests at the real 41/50 pass mark, every answer explained.";
const description =
  "Free practice in English for the Belgian category B theory exam in Flanders, Wallonia and Brussels: 200 original questions on priority to the right, danger, priority and prohibition signs, road markings and lights, regional speed limits, overtaking, motorways, parking, pedestrians and cyclists, lights and breakdowns. Four 50-question mock tests at the real 41/50 pass mark and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "belgium driving theory test, belgian theory exam english, rijbewijs b theorie examen english, permis theorique belgique anglais, belgian driving licence theory test, goca theory exam, belgium driving test questions, theory exam flanders english, brussels driving theory test, wallonia permis theorique, belgian highway code questions 2026",
  alternates: {
    canonical: `${siteUrl}/belgium-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/belgium-driving-theory-test`,
    images: [{ url: shareImageUrl("bedriving"), width: 1200, height: 630, alt: "Tigertest free Belgium driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("bedriving")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Belgian theory exam like?",
    a: "The category B theory exam has 50 multiple-choice questions on a screen at an approved exam centre in Flanders, Wallonia or Brussels. You start with 50 points and need at least 41 to pass. A wrong or unanswered question costs 1 point, but a wrong answer on a serious-fault question (a third- or fourth-degree offence, or a speed limit) costs 5 points, so two serious faults alone mean a fail. In Flanders and Brussels you get up to 15 seconds per question (in Flanders the 15 seconds start once the question has been read aloud), and Brussels says the exam takes about 30 minutes. You must be at least 17, and a pass is valid for three years.",
  },
  {
    q: "Can I take the Belgian theory exam in English?",
    a: "Yes, with some conditions. In Flanders the exam is in Dutch, and since 1 January 2023 you can add an audio translation into English, French or German: you hear each question in Dutch, then in English. In Wallonia the exam is in French, with German at Eupen and Dutch or English by appointment at the Couillet and Wandre centres. In Brussels it is in French or Dutch, and the centre can appoint an interpreter for English or German. The translation or interpreter costs extra; check the current price with your centre.",
  },
  {
    q: "Are the rules the same in Flanders, Wallonia and Brussels?",
    a: "Mostly. The Highway Code is federal, so priority to the right, signs, markings, overtaking and parking rules are the same everywhere. Speed limits differ: in built-up areas the default is 30 km/h in Brussels and 50 km/h in Flanders and Wallonia; outside built-up areas it is 70 km/h in Flanders and Brussels and 90 km/h in Wallonia. Motorways are 120 km/h everywhere. From 1 June 2027 the single Highway Code is due to be replaced by a federal code and three regional codes, so check for changes after that date. Speed questions are serious faults on the real exam, so learn the limits for the region where you will drive and take the test.",
  },
  {
    q: "What happens if I fail the theory exam?",
    a: "You can try again, but not on the same day. After two consecutive failures you must take theory lessons at an approved driving school before you try again: 12 hours in Flanders and Brussels, and guides say 12 hours in Wallonia too. Flanders also plans to require, from 1 January 2027, that anyone taking the Flemish practical exam has passed the theory exam at a Flemish centre. The risk perception test, a set of short traffic videos, is a separate step: its own test in Wallonia and part of the practical exam in Flanders and Brussels. It is not on the theory exam and Tigertest does not model it.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from the Belgian Highway Code (the Royal Decree of 1 December 1975) and the alcohol rules of the road traffic law, so it tests the same knowledge without copying any official question. Signs are described in words, so look at pictures of the signs too. Tigertest is free practice, not affiliated with GOCA, any exam centre or the Flemish, Walloon or Brussels authorities, and it does not book or replace your exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Belgium Driving Theory Practice Test",
      description,
      url: `${siteUrl}/belgium-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Belgian Highway Code questions in English",
        "4 mock tests of 50 questions at the 41/50 pass mark",
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
  { name: "Priority Rules & Priority Signs", weight: "14%" },
  { name: "Prohibition, Mandatory & Information Signs", weight: "12%" },
  { name: "Speed Limits & Zones", weight: "12%" },
  { name: "Overtaking, Turning & Motorways", weight: "12%" },
  { name: "The Exam, Licence & Fitness to Drive", weight: "10%" },
  { name: "Danger Signs", weight: "10%" },
  { name: "Road Markings & Traffic Lights", weight: "8%" },
  { name: "Stopping & Parking", weight: "8%" },
  { name: "Pedestrians, Cyclists & Public Transport", weight: "8%" },
  { name: "Lights, Seat Belts & Breakdowns", weight: "6%" },
];

export default function BelgiumDrivingTheoryLandingPage() {
  return (
    <div data-theme="bedriving" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Belgium Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/belgium-driving-theory/dashboard"
            shortName="Theory test"
            subtitle="200 original questions in English on the Belgian Highway Code: priority to the right, signs, markings, regional speed limits, overtaking, motorways and parking. Four 50-question mock tests at the real 41/50 pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/bedriving-mobile.png", desktop: "/landing/bedriving-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="bedriving" />

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
                Five training sets cover road signs, priority and markings, speed and overtaking, vulnerable road users and parking, and the exam, lights and safety. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question tests that together cover all 200 questions, scored at 41 out of 50 like the real exam. Tigertest counts every mistake as one point; the real exam takes five for a serious fault, so aim higher.
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
                Built on the Belgian Highway Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every question comes from the federal Highway Code that the exams in Flanders, Wallonia and Brussels all test: priority to the right, trams first, the zip merge, the emergency corridor, the 30, 20 and walking-pace zones, and the parking distances. Where the regions differ, as they do on speed limits, the question names the region. No region publishes a topic split, so these weights are Tigertest&apos;s own, with priority and signs heaviest. Signs are described in words, and the risk perception videos are not modelled.
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
                src={getTigerAsset("bedriving", 1)}
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
            How to Pass the Belgian Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master priority to the right</h3>
              <p>
                Belgium gives way to the right at any junction without signs, and many drivers from abroad get this wrong. Learn the exceptions: trams always go first, a yellow diamond gives you priority, a downward triangle or STOP takes it away, and a driver already on a roundabout or coming out of a no-entry street does not get it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the limits for your region</h3>
              <p>
                Speed questions are serious faults worth five points. Know the defaults (30 in Brussels towns, 50 in Flemish and Walloon towns, 70 outside towns in Flanders and Brussels, 90 in Wallonia, 120 on motorways) and the zones: 30 zones, 20 in residential zones, walking pace in pedestrian zones and school streets.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Book the language you need</h3>
              <p>
                If you want English, ask your exam centre when you book: an audio translation in Flanders, an appointment at Couillet or Wandre in Wallonia, or an interpreter in Brussels. Each one costs extra and some need notice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 41</h3>
              <p>
                Two serious faults sink you even if everything else is right, so aim for 46 or more in every mock test. Tigertest tracks your accuracy by topic: drill the questions you missed, retrain the weakest set, then take all four tests back to back before exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Belgium Driving Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="bedriving" />

      <ExamRelatedTests examId="bedriving" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Belgian Theory Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions in English on the Belgian Highway Code.</p>
          <ExamLandingCTA dashboardHref="/belgium-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

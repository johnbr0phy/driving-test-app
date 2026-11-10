import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/sgrtt";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Singapore RTT Practice Test 2026 - Free Riding Theory Test Questions";
const metaDescription =
  "Free Singapore Riding Theory Test practice for a class 2B licence: 200 original questions from the 2026 Riding Theory handbook, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for Singapore's Riding Theory Test (RTT) for a class 2B motorcycle licence: 200 original questions written from the Traffic Police Riding Theory Booklet (published 2 January 2026). Four mock tests of 50 questions with a 45 of 50 target, and five training sets on the rider and the motorcycle, controls, gears and braking, moving off, turns and junctions, road conditions and defensive riding, and pillions, breakdowns and accidents.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "singapore rtt practice test, riding theory test singapore, rtt questions 2026, rtt mock test, riding theory booklet, class 2b theory test, motorcycle theory test singapore, bbdc rtt, ssdc rtt, cdc rtt, rtt singapore free",
  alternates: {
    canonical: `${siteUrl}/singapore-rtt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/singapore-rtt-practice-test`,
    images: [{ url: shareImageUrl("sgrtt"), width: 1200, height: 630, alt: "Tigertest free Singapore RTT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sgrtt")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the Singapore RTT and what is the pass mark?",
    a: "The Traffic Police do not publish the RTT's question count, time or pass mark on their own pages. The mock tests here are 50 questions each with a target of 45 right (90%), the format study guides quote for the Basic and Final Theory Tests. Treat that as Tigertest's target, not the official rule, and check with your driving centre when you book.",
  },
  {
    q: "What does the Riding Theory Test cover?",
    a: "The RTT is the second theory test for a class 2B motorcycle licence, taken after the Basic Theory Test and before the Practical Riding Test. The Traffic Police say it tests riding safety, proper riding techniques and your interaction with other road users. It follows the Riding Theory Booklet: rider fitness and protective gear, how the motorcycle works and the pre-riding checks, the controls, gears and braking, moving off, turns, lane changes and junctions, bends, slopes, rain and expressways, defensive riding, pillions, breakdowns and accidents.",
  },
  {
    q: "Who has to take the RTT and when?",
    a: "Learners going for a class 2B licence take the RTT after passing the Basic Theory Test. After passing the RTT you must pass the Practical Riding Test within one year, or take the RTT again. Class 2B covers petrol motorcycles below 200 cc and electric motorcycles below 15 kW; class 2A and class 2 follow after holding the lower class for at least one year, with a practical test for each. Car learners take the Final Theory Test instead.",
  },
  {
    q: "Which edition of the handbook do these questions follow?",
    a: "The Riding Theory Booklet, Official Handbook, published online by the Traffic Police on 2 January 2026. The questions do not repeat the Basic Theory Test material (signs, markings, general road rules), which has its own Tigertest practice test. Rules that are changing, such as the alcohol limits under the 2026 amendments, are left out, and so are fines, demerit points and the circuit course timings of the practical test.",
  },
  {
    q: "Are these the real RTT questions?",
    a: "No. Every question is original, written by Tigertest from the Riding Theory Booklet, so it tests the same rules without copying any official or commercial question bank. The handbook's diagrams are described in words. The Traffic Police publish the handbook and free practice sets in English, Malay, Mandarin and Tamil; this practice is in English. It is free revision, not an official test, it does not book or replace your RTT, and Tigertest is not affiliated with the Singapore Police Force or the Traffic Police.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Singapore RTT Practice Test",
      description,
      url: `${siteUrl}/singapore-rtt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sgrtt", "SGD"),
      featureList: [
        "200 Riding Theory Test practice questions",
        "4 mock tests of 50 questions with a 45 of 50 target",
        "5 training sets by handbook topic",
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
  { name: "Motorcycle Parts, Checks & Handling", weight: "16%" },
  { name: "Controls, Gears & Braking", weight: "16%" },
  { name: "Moving Off, Turns & Junctions", weight: "16%" },
  { name: "Rider Fitness, Gear & Posture", weight: "14%" },
  { name: "Bends, Slopes, Weather & Expressways", weight: "14%" },
  { name: "Defensive Riding & Other Road Users", weight: "14%" },
  { name: "Pillions, Breakdowns & Accidents", weight: "10%" },
];

export default function SingaporeRttLandingPage() {
  return (
    <div data-theme="sgrtt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Singapore RTT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/singapore-rtt/dashboard"
            shortName="RTT"
            subtitle="200 original questions from the 2026 Riding Theory handbook for a class 2B licence: protective gear, pre-riding checks, clutch, gears and braking, turns and junctions, bends and rain, defensive riding and pillions. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/sgrtt-mobile.png", desktop: "/landing/sgrtt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sgrtt" />

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
                Five training sets cover the Riding Theory Booklet, from chain slack and brake free play to engine braking, emergency stops and riding with a pillion. Questions you miss come back until you have mastered them.
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
                Four tests of 50 questions with a target of 45, Tigertest&apos;s line since the Traffic Police do not publish the RTT pass mark. No question repeats across tests, and every answer explains the rule.
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
                Built on the Riding Theory Booklet
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Traffic Police do not publish how many questions come from each topic, so each mock test follows the chapters of the Riding Theory Booklet, with the motorcycle, its controls and riding skills weighted heaviest. Every rule is Singapore&apos;s own: keep-left traffic, km/h, class 2B, 2A and 2, the Probation Plate, the expressway rules for motorcycles and the steps after an accident with or without injuries.
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
                src={getTigerAsset("sgrtt", 1)}
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
            How to Pass the Riding Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the motorcycle and its checks</h3>
              <p>
                The RTT asks how the machine works and what to check before a ride: the four strokes, what the clutch does when pulled in, why disc brakes fade less, and the figures for tread depth, chain slack and lever free play. Learn which hand and foot work each control.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the procedures step by step</h3>
              <p>
                Moving off, stopping at the kerb, changing gear, emergency braking, hill starts and lifting a fallen motorcycle are all drills in the handbook. Say the steps aloud in order; the questions ask which step comes next, or what goes wrong when the clutch is pulled in too early.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Ride defensively on paper first</h3>
              <p>
                Know the six positions of a two-vehicle crash, the head-on avoidance rules, Know, Slow, Show, Go at intersections, and where large vehicles cannot see you. Learn the drills for a stuck throttle, front or rear brake failure, a puncture and an overheating engine, and what to do after an accident.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 45</h3>
              <p>
                With a target of 45 out of 50, aim for 48 or more in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four tests back to back before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Riding Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="sgrtt" />

      <ExamRelatedTests examId="sgrtt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your RTT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every chapter of the Riding Theory Booklet.</p>
          <ExamLandingCTA dashboardHref="/singapore-rtt/dashboard" />
        </div>
      </div>
    </div>
  );
}

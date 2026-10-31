import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "UAE Driving Theory Test 2026 - Free RTA Practice Test";
const metaDescription =
  "Free UAE driving theory practice test: 200 original questions for the RTA Dubai knowledge test, four 40-question mock tests with the real 30-of-40 pass mark, every answer explained.";
const description =
  "Free practice for the UAE driving theory test (the RTA Dubai knowledge test for a light vehicle): 200 original questions on UAE road rules. Four mock tests of 40 questions, like the real test, with the real pass mark of 30 out of 40, and five training sets on road signs, signals and markings, roundabouts and right of way, lanes and overtaking, children and pedestrians, and fog, sandstorms, wadis and crashes.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "uae driving theory test, rta theory test, dubai theory test, rta knowledge test, dubai driving licence theory test, rta theory test questions 2026, uae driving test practice, rta mock test, dubai driving test questions",
  alternates: {
    canonical: `${siteUrl}/uae-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/uae-driving-theory-test`,
    images: [{ url: shareImageUrl("aerta"), width: 1200, height: 630, alt: "Tigertest free UAE driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("aerta")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the RTA theory test and what is the pass mark?",
    a: "RTA's knowledge test service page says the test has 40 questions and you need at least 30 correct answers to pass, which is 75%. The mock tests here are the same length with the same 30 out of 40 pass mark. Driving schools say the test also includes a short video hazard section; Tigertest does not model that part.",
  },
  {
    q: "What do I need before I can take the RTA knowledge test?",
    a: "RTA lists a valid learning permit and your Emirates ID, and you must complete the theory lectures at your driving institute first: 8 hours for a light vehicle. RTA asks you to arrive 30 minutes before your appointment. Rules on the minimum age to apply have differed between the federal law and the emirates' own pages, so check the current age with your emirate's licensing authority before you open a file.",
  },
  {
    q: "Is the theory test the same in every emirate?",
    a: "The traffic rules come from federal law, Federal Decree-Law No. 14 of 2024, so the rules you are tested on are the same across the UAE. The test itself is run by each emirate's licensing authority. This practice test follows the RTA Dubai format, and the questions cover the federal rules that apply everywhere.",
  },
  {
    q: "Are fines and black points on the test?",
    a: "Tigertest's questions do not ask for fine amounts or black points, because those figures change often. The questions focus on the rules themselves: who gives way, what a sign means, what to do in fog or a flood, and how to keep children safe.",
  },
  {
    q: "Are these the real RTA theory test questions?",
    a: "No. Every question is original, written by Tigertest from UAE traffic rules and official RTA and government guidance, so it tests the same rules without copying RTA's questions. Signs are described in words, so look at the pictures in your driving institute's handbook too. It is free revision, not an official test, and it does not book or replace your knowledge test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free UAE Driving Theory Practice Test",
      description,
      url: `${siteUrl}/uae-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AED" },
      featureList: [
        "200 UAE road rules practice questions",
        "4 mock tests of 40 questions with the real 30 of 40 pass mark",
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
  { name: "Road Signs", weight: "23%" },
  { name: "Roundabouts, Junctions & Right of Way", weight: "18%" },
  { name: "Lanes, Speed & Overtaking", weight: "15%" },
  { name: "Signals & Road Markings", weight: "13%" },
  { name: "Children, Pedestrians & Passengers", weight: "13%" },
  { name: "Licensing & Driver Responsibility", weight: "10%" },
  { name: "Weather, Breakdowns & Crashes", weight: "10%" },
];

export default function UaeDrivingTheoryLandingPage() {
  return (
    <div data-theme="aerta" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free UAE Driving Theory Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/uae-driving-theory/dashboard"
            shortName="UAE driving theory"
            subtitle="200 original questions for the RTA knowledge test: road signs, roundabouts, lanes and overtaking, school buses, fog, sandstorms and wadis. Four 40-question mock tests with the real pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aerta-mobile.png", desktop: "/landing/aerta-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aerta" />

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
                Five training sets cover the rules the knowledge test asks about, from sign shapes and colours to roundabout lanes and what to do at a flowing wadi. Questions you miss come back until you have mastered them.
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
                Four 40-question tests with the real pass mark of 30, so you can drop ten at most. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on UAE Traffic Rules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                RTA does not publish how many questions come from each topic, so each mock test is Tigertest&apos;s own mix, weighted towards road signs and right of way. Every rule is the UAE&apos;s own: right-hand traffic, overtaking on the left, giving way to traffic already on a roundabout, stopping for a school bus stop arm, and never driving into a flowing wadi.
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
                src={getTigerAsset("aerta", 1)}
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
            How to Pass the RTA Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape and colour</h3>
              <p>
                Red triangles warn, red circles forbid, blue circles order and blue rectangles inform. Once the shapes are automatic, most sign questions only need the symbol: a camel, falling rocks, a horn with a slash, one red line (no parking) or a red X (no stopping).
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Master roundabouts and lanes</h3>
              <p>
                Give way to traffic already on the roundabout, which comes from your left, pick your lane before you arrive and signal right before your exit. On highways, overtake on the left, move right when a faster car comes up behind you, and keep off the hard shoulder.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the weather and emergency rules</h3>
              <p>
                The UAE has its own hazards: no hazard lights while moving in fog, slow down with dipped lights in a sandstorm, and never drive into a wadi that is flowing with rainwater. Know the numbers too: 999 for police, 998 for an ambulance, 997 for civil defence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 30</h3>
              <p>
                Thirty out of forty is the line, so aim for 36 or more in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four tests back to back before your appointment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          UAE Driving Theory Test Frequently Asked Questions
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

      <ExamRelatedTests examId="aerta" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your RTA Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every topic on the knowledge test.</p>
          <ExamLandingCTA dashboardHref="/uae-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

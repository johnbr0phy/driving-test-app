import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/ngfrsc";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Nigeria Driving Test Practice 2026 - Free FRSC Highway Code Test";
const metaDescription =
  "Free Nigeria driving test practice: 200 original FRSC Highway Code questions, four 50-question mock tests and five training sets, every answer explained.";
const description =
  "Free practice for the theory part of the Nigerian driver's licence: 200 original questions written from the FRSC Highway Code and the National Road Traffic Regulations 2012. Four mock tests of 50 questions with a 75% target, and five training sets on licences and vehicle safety, road signs and signals, markings and junctions, speed, overtaking and parking, and breakdowns, crashes and first aid.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nigeria driving test practice, frsc highway code test, frsc cbt questions, nigerian highway code questions, driving school test nigeria, frsc driving test, nigeria drivers licence test, highway code quiz nigeria, road signs nigeria test 2026",
  alternates: {
    canonical: `${siteUrl}/nigeria-driving-test-practice`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nigeria-driving-test-practice`,
    images: [{ url: shareImageUrl("ngfrsc"), width: 1200, height: 630, alt: "Tigertest free Nigeria driving test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ngfrsc")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the theory test for a Nigerian driver's licence like?",
    a: "Since 1 June 2021 every fresh applicant takes a computer-based test (CBT) at their FRSC-standardised driving school before the school can issue a driving certificate. FRSC's July 2021 announcement says it is 35 multiple-choice questions in 30 minutes, you need 60% to pass, and if you fail you can retake it after 7 days. Check the current format with your driving school or FRSC, as it may have changed since then.",
  },
  {
    q: "Why are the Tigertest mock tests 50 questions with a 75% target?",
    a: "Longer tests cover more of the Highway Code in each sitting, and 75% is Tigertest's own target, set above the official 60% so that a pass here leaves a safety margin on the day. It is not an FRSC figure. If you can score 38 of 50 here on every test, the real CBT should hold no surprises.",
  },
  {
    q: "What do I need to get a fresh driver's licence in Nigeria?",
    a: "Under the National Road Traffic Regulations 2012 you must be at least 18 for a private licence. You need a learner's permit, training at an FRSC-certified driving school (26 sessions, with the CBT near the end), a visual acuity and medical fitness certificate, a practical driving test, and biometric capture at a Driver's Licence Centre, where you get a temporary licence valid for 60 days. A commercial licence needs you to be at least 26 and already hold a private licence.",
  },
  {
    q: "What can I do while I hold a learner's permit?",
    a: "You may drive only with a licensed driver or instructor sitting beside you in the front passenger seat, and you may carry no other passenger. Your vehicle must show the learner's sign: a red letter L on a white background.",
  },
  {
    q: "Are these the real FRSC CBT questions?",
    a: "No. Every question is original, written by Tigertest from the National Road Traffic Regulations 2012 and FRSC's own Highway Code material, so it tests the same rules without copying any official or driving school question bank. Signs are described in words, so study the sign pictures in the Highway Code too. It is free revision, not an official test, and it does not book or replace your CBT or driving test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Nigeria Driving Test Practice",
      description,
      url: `${siteUrl}/nigeria-driving-test-practice`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "200 Nigeria Highway Code practice questions",
        "4 mock tests of 50 questions with a 75% target",
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
  { name: "Junctions, Crossings & Right of Way", weight: "16%" },
  { name: "Speed, Overtaking & Conditions", weight: "14%" },
  { name: "Licences & Documents", weight: "12%" },
  { name: "Road Markings & Lanes", weight: "10%" },
  { name: "Parking & Expressways", weight: "10%" },
  { name: "Alcohol, Phones & Vehicle Safety", weight: "10%" },
  { name: "Breakdowns, Crashes & First Aid", weight: "8%" },
];

export default function NigeriaDrivingTestLandingPage() {
  return (
    <div data-theme="ngfrsc" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Nigeria Driving Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nigeria-highway-code/dashboard"
            shortName="Highway Code"
            subtitle="200 original questions from the FRSC Highway Code and the National Road Traffic Regulations: road signs, junctions, overtaking, parking, expressways, seat belts and what to do after a crash. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ngfrsc-mobile.png", desktop: "/landing/ngfrsc-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ngfrsc" />

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
                Five training sets cover the Highway Code from licence rules and road signs to expressways and first aid. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Four Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question tests with a 75% target, Tigertest&apos;s own mark set above FRSC&apos;s 60%. No question repeats across tests, and every answer explains the rule behind it.
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
                Built on Nigeria&apos;s Own Road Rules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                FRSC does not publish how many questions come from each topic, so each mock test follows the Highway Code and the National Road Traffic Regulations 2012, with road signs weighted heaviest. Every rule is Nigeria&apos;s own: driving on the right, overtaking on the left, anticlockwise roundabouts, the 45-metre warning triangle, child seats in the back, and no phone calls while moving.
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
                src={getTigerAsset("ngfrsc", 1)}
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
            How to Pass the Highway Code Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape first</h3>
              <p>
                Triangles warn, circles with a red border forbid, blue circles order, rectangles inform, and the eight-sided STOP sign stands alone. Once you know the shapes, most sign questions are half answered before you read the symbol.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The regulations are full of numbers: 18 for a private licence and 26 for a commercial one, a 45-metre minimum for warning triangles, 5 to 15 metres from the rail at a level crossing, no stopping within 8 metres of a corner, child seats up to age 7, a 2 kg extinguisher in every car, and no more than 5 hours of driving without a break. Write them in one table and quiz yourself.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think right-hand traffic</h3>
              <p>
                Nigeria drives on the right, so you overtake on the left, a left turn crosses oncoming traffic, roundabouts run anticlockwise, and a broken-down car goes to the right-hand shoulder. Many wrong answers come from rules learned in left-hand-traffic countries.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above the pass mark</h3>
              <p>
                FRSC&apos;s CBT pass mark is 60%, but aim for 75% or more in every Tigertest mock test. Drill the questions you missed, retrain your weakest set, then take all four tests before your driving school books your CBT.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Nigeria Driving Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="ngfrsc" />

      <ExamRelatedTests examId="ngfrsc" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Driver&apos;s Licence?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across the whole Highway Code.</p>
          <ExamLandingCTA dashboardHref="/nigeria-highway-code/dashboard" />
        </div>
      </div>
    </div>
  );
}

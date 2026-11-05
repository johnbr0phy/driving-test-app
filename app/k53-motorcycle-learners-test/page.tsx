import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/zak53moto";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "K53 Motorcycle Learner's Test 2026 - Free Code 1 Practice";
const metaDescription =
  "Free K53 Code 1 learner's licence practice for South Africa, the learner's for a motorcycle, tricycle or quadricycle: 200 original questions on rules, signs and markings and motorcycle controls.";
const description =
  "Free practice for the South African K53 learner's licence test, Code 1 (motorcycle, motor tricycle or quadricycle), the step before a Code A1 or A motorcycle licence: 200 original questions on the rules of the road for riders, road signs and road markings, and motorcycle controls. Four mock tests of 50 questions with an 80% target, and six training sets on licences, helmets and alcohol, right of way, speed and overtaking, passengers, lights and parking, regulatory signs, warning signs, guidance signs and markings, and motorcycle controls.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "k53 motorcycle learners test, code 1 learners licence, motorbike learners licence south africa, k53 code 1 learners, scooter learners licence, code a1 learners, motorcycle learners test questions, k53 motorcycle controls, free code 1 learners test",
  alternates: {
    canonical: `${siteUrl}/k53-motorcycle-learners-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/k53-motorcycle-learners-test`,
    images: [{ url: shareImageUrl("zak53moto"), width: 1200, height: 630, alt: "Tigertest free K53 motorcycle learner's practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("zak53moto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Which learner's licence do I need to ride a motorcycle?",
    a: "A Code 1 learner's licence. It covers a motorcycle with or without a sidecar, a motor tricycle or a motor quadricycle, and it is the learner's you hold before the riding test for a Code A1 licence (125 cc or less) or a Code A licence (over 125 cc). Code 2 is for cars and light vehicles and Code 3 for heavy vehicles.",
  },
  {
    q: "How old must I be for a Code 1 learner's licence?",
    a: "You must be 16 on the date of the test for a motorcycle of 125 cc or less, and 18 for a motorcycle over 125 cc. You book and write the test at a driving licence testing centre (DLTC) after an eye test. The learner's licence is valid for 24 months and cannot be extended.",
  },
  {
    q: "Is the motorcycle learner's test different from the car one?",
    a: "It has the same three sections: rules of the road, road signs and markings, and vehicle controls. The rules and signs are the same law for everyone; the controls section is about a motorcycle: the clutch and front brake levers, the gear lever, the rear brake pedal, the throttle and the kill switch. Study guides give the learner's test 64 questions (28 rules, 28 signs, 8 controls) and say each section is passed separately; check the marks that apply at your test centre on the day.",
  },
  {
    q: "What is the pass mark on these mock tests?",
    a: "Each Tigertest mock test has 50 questions in the same mix as the Code 2 tests (22 rules, 22 signs and markings, 6 vehicle controls) and you need 40, or 80%, to pass. That 80% is Tigertest's own target, set a little above the section marks study guides quote, so a pass here means you are ready for the real thing.",
  },
  {
    q: "Are these the real K53 learner's test questions?",
    a: "No. Every question is original, written by Tigertest from the National Road Traffic Act and Regulations, the K53 learner material and the road sign manual, and none is shared with Tigertest's Code 2 or Code 3 tests. Signs are described in words, so study the sign pictures in your K53 manual too. It is free revision, not an official test: Tigertest is not affiliated with the RTMC or any testing centre, and it does not book or replace your learner's test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free K53 Motorcycle Learner's Practice Test",
      description,
      url: `${siteUrl}/k53-motorcycle-learners-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "ZAR" },
      featureList: [
        "200 K53 Code 1 learner's practice questions",
        "4 mock tests of 50 questions with an 80% target",
        "6 training sets: rules, signs, markings and motorcycle controls",
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
  { name: "Rules of the Road", weight: "44%" },
  { name: "Road Signs & Markings", weight: "44%" },
  { name: "Motorcycle Controls (Code 1)", weight: "12%" },
];

export default function K53MotorcycleLandingPage() {
  return (
    <div data-theme="zak53moto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free K53 Motorcycle Learner&apos;s Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/k53-motorcycle/dashboard"
            shortName="K53 motorcycle learner's"
            subtitle="200 original questions for the South African Code 1 learner's test, the learner's for a motorcycle, scooter, tricycle or quadricycle: rules of the road, road signs and markings, and motorcycle controls. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/zak53moto-mobile.png", desktop: "/landing/zak53moto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="zak53moto" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Section</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six training sets split the three sections of the learner&apos;s test into bite-size topics, from four-way stops and helmet rules to warning signs and the kill switch. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests in the Real Mix</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question tests with 22 rules, 22 signs and markings and 6 motorcycle controls each, and 40 to pass. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on South Africa&apos;s Road Traffic Rules for Heavy Vehicles
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each mock test follows the three sections of the real learner&apos;s test in the same proportions guides give for its 64 questions. Every rule is South Africa&apos;s own, with the ones that matter on two wheels: helmets for rider and passenger, when a passenger may ride and where they sit, keeping out of blind spots, braking with both brakes, and seeing and being seen.
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
                src={getTigerAsset("zak53moto", 1)}
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
            How to Pass the K53 Motorcycle Learner&apos;s Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the sign families, not single signs</h3>
              <p>
                Signs come in families with their own shapes and colours: control signs such as stop and yield, blue command signs that tell you what to do, red-ringed prohibition signs that forbid something, red-bordered warning triangles, and guidance signs. Once you know the family, most new signs explain themselves.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The rules section loves numbers: 60, 100 and 120 km/h general limits, 16 and 18 as the ages for bikes up to and over 125 cc, a passenger only on a bike over 50 cc, 0.05 g alcohol for ordinary riders, 9 metres from a pedestrian crossing, 1.5 metres from a fire hydrant, and the 24-hour rule for reporting an injury crash. Put them in one table and quiz yourself.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip vehicle controls</h3>
              <p>
                It is the shortest section, but guides say you may drop only two of its eight questions. Know where each control sits and what it does: clutch lever on the left, front brake lever on the right, gear lever under your left foot, rear brake under your right, and which controls you use together to pull away, turn and stop.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim above 40</h3>
              <p>
                Each section is marked on its own in the real test, so a strong score in one cannot rescue a weak one. Tigertest tracks your accuracy by topic: drill the questions you missed, retrain the weakest set, then take all four tests before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          K53 Motorcycle Learner&apos;s Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="zak53moto" />

      <ExamRelatedTests examId="zak53moto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your Motorcycle Learner&apos;s Licence?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every section of the K53 Code 1 learner&apos;s test.</p>
          <ExamLandingCTA dashboardHref="/k53-motorcycle/dashboard" />
        </div>
      </div>
    </div>
  );
}

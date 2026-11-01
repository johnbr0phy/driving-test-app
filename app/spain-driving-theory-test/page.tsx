import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/esdgt";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Spain DGT Theory Test in English 2026 - Free Practice";
const metaDescription =
  "Free practice for the Spain DGT theory exam (permiso B) in English: 200 original questions on Spanish traffic rules, six 30-question tests and every answer explained.";
const description =
  "Free practice in English for the DGT theory exam for the Spanish car licence (permiso B): 200 original questions on signs and traffic officers, road markings and traffic lights, priority and roundabouts, speed limits, overtaking cyclists, parking, lights and tunnels, alcohol and emergencies, written from the Reglamento General de Circulación as in force in November 2026. Six 30-question tests with 27 to pass, like the real exam, and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "dgt theory test english, spain driving theory test, spanish driving test in english, permiso b test, dgt exam practice, examen teorico dgt ingles, spain driving licence theory, carnet de conducir test english, dgt test questions 2026, driving in spain test",
  alternates: {
    canonical: `${siteUrl}/spain-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/spain-driving-theory-test`,
    images: [{ url: shareImageUrl("esdgt"), width: 1200, height: 630, alt: "Tigertest free Spain DGT theory test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("esdgt")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "Can I take the Spanish DGT theory exam in English?",
    a: "Yes. For the permiso B, the DGT offers the theory exam in Spanish, in the co-official languages of the region where you sit it (Catalan, Basque, Galician or Valencian), and in English, French and German. You choose the language when you apply. An Easy Read (Lectura Fácil) version is also available for the A1, A2 and B licences.",
  },
  {
    q: "How many questions are on the DGT theory exam and what is the pass mark?",
    a: "The exam for the permiso B has 30 multiple-choice questions with three options each, and you have 30 minutes. You pass with no more than three mistakes, so you need 27 correct answers. A pass is kept for two years while you complete the practical test. As of November 2026 the DGT says the format is unchanged; risk-perception video questions are being studied but have no date.",
  },
  {
    q: "What does the theory exam cover?",
    a: "The syllabus in the Reglamento General de Conductores covers traffic law, especially signs, priority rules and speed limits, plus accident factors, attitudes to other road users, alcohol, drugs, fatigue and distraction, safe distances and road conditions, tunnels, vulnerable road users, vehicle documents, what to do after a crash, loads and passengers, leaving the vehicle, basic mechanics, safety equipment and eco-driving.",
  },
  {
    q: "Which rule changes in 2026 should I know?",
    a: "Since 1 January 2026, a connected V-16 beacon is the only valid way to signal a car stopped by a breakdown or crash; warning triangles no longer count. Since 1 October 2026, Real Decreto 518/2026 requires drivers to overtake cyclists outside towns at least 20 km/h below the limit with at least 1.5 metres of space, to change lane completely where there is more than one lane in their direction, to open an emergency lane in motorway jams, and to keep right without overtaking on snowy motorways.",
  },
  {
    q: "Are these the real DGT questions?",
    a: "No. Every question is original, written by Tigertest from the Reglamento General de Circulación, the Reglamento General de Conductores and the DGT's guidance, so it tests the same knowledge without copying any official question. Signs are described in words, so study pictures of Spanish signs too. Tigertest's questions have four options, one more than the real exam. It is free practice, not affiliated with the Dirección General de Tráfico (DGT), and it does not book or replace your exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Spain DGT Theory Test Practice",
      description,
      url: `${siteUrl}/spain-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Spanish traffic rule questions in English",
        "6 tests of 30 questions, 27 to pass",
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
  { name: "Signs & Traffic Officers", weight: "17%" },
  { name: "Priority, Junctions & Roundabouts", weight: "13%" },
  { name: "Speed Limits, Distances & Lanes", weight: "13%" },
  { name: "Permits, Documents & the Vehicle", weight: "10%" },
  { name: "Road Markings & Traffic Lights", weight: "10%" },
  { name: "Overtaking & Vulnerable Road Users", weight: "10%" },
  { name: "Lights, Tunnels & Bad Weather", weight: "10%" },
  { name: "Alcohol, Distraction & Emergencies", weight: "10%" },
  { name: "Stopping & Parking", weight: "7%" },
];

export default function SpainDrivingTheoryLandingPage() {
  return (
    <div data-theme="esdgt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Spain DGT Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/spain-driving-theory/dashboard"
            shortName="DGT theory test"
            subtitle="200 original questions in English on the Spanish traffic rules the DGT exam for the permiso B asks about: signs, priority, speed limits, overtaking cyclists, parking, lights, alcohol and the V-16 beacon. Six 30-question tests, 27 to pass. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/esdgt-mobile.png", desktop: "/landing/esdgt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="esdgt" />

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
                Five training sets cover signs and markings, priority and junctions, speed and overtaking, parking and lights, and permits, alcohol and emergencies. Questions you miss come back until you have mastered them.
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
                Six 30-question tests like the real exam, 27 correct to pass, the DGT&apos;s three-mistake rule. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the Spanish Traffic Regulations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every question is written from the Reglamento General de Circulación as in force in November 2026, including the changes of 1 October 2026: overtaking cyclists at least 20 km/h below the limit with 1.5 metres to spare, the emergency lane in motorway jams and the snow rules. Signs are described in words, in km/h and metres, for right-hand traffic. The DGT publishes no topic weights, so the split follows the syllabus, with signs and priority heaviest. The real exam has three options per question; ours have four.
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
                src={getTigerAsset("esdgt", 1)}
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
            How to Pass the DGT Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the speed limits as a table</h3>
              <p>
                Many mistakes come from numbers. For a car: 120 km/h on autopistas and autovías, 90 on conventional roads, 50 in a travesía, and in town 20, 30 or 50 km/h depending on whether the street is a single platform, has one lane each way or two or more. Add 60 km/h as the motorway minimum and 80 and 90 with a trailer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who goes first</h3>
              <p>
                With no signs, give way to the right, but vehicles on a roundabout, on rails, on a paved road or already on the motorway come first. Officers&apos; signals beat temporary signs, which beat traffic lights, then permanent signs, then road markings. Learn the officers&apos; arm signals too.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Catch up with the 2026 changes</h3>
              <p>
                Since 1 January 2026 the connected V-16 beacon is the only valid way to signal a breakdown. Since 1 October 2026 you overtake cyclists outside towns at least 20 km/h below the limit, form an emergency lane in motorway jams and keep right without overtaking in snow. Questions on older rules, such as warning triangles, are out of date.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim for two mistakes or fewer</h3>
              <p>
                The real exam allows three mistakes in 30 questions, so leave a margin. Tigertest tracks your accuracy by topic: drill the questions you missed, retrain the weakest set, then take the six tests until you pass each with 28 or more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          DGT Theory Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="esdgt" />

      <ExamRelatedTests examId="esdgt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your DGT Theory Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions in English on the Spanish rules of the road.</p>
          <ExamLandingCTA dashboardHref="/spain-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

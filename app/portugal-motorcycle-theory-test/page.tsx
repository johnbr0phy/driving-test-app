import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import { examLandingAlternates } from "@/lib/examSeo";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/ptmoto";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Portugal Motorcycle Theory Test 2026 - Free IMT A1, A2 and A Practice";
const metaDescription =
  "Free practice in English for the IMT motorcycle theory exam, categories A1, A2 and A: 200 original questions on the Código da Estrada and five 40-question mock tests.";
const description =
  "Free English practice for Portugal's IMT theory exam for a motorcycle licence (categories A1, A2 and A): 200 original questions on signs, priority, speed and overtaking, parking and motorways, alcohol and fatigue, licences and accidents, plus the motorcycle programme: helmets and protective gear, visibility, braking and cornering, passengers and loads, road surfaces and the machine. Five real-length 40-question mock tests with the 36-of-40 pass mark and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "portugal motorcycle theory test, imt motorcycle exam english, exame de codigo mota, carta de mota, category a licence portugal, a1 a2 motorcycle licence portugal, motorcycle theory test portugal in english, codigo da estrada motorcycle, portugal motorbike licence, motorcycle test portugal 2026",
  alternates: {
    canonical: `${siteUrl}/portugal-motorcycle-theory-test`,
    languages: examLandingAlternates("ptmoto"),
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/portugal-motorcycle-theory-test`,
    images: [{ url: shareImageUrl("ptmoto"), width: 1200, height: 630, alt: "Tigertest free Portugal motorcycle theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ptmoto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the IMT theory exam for a motorcycle licence?",
    a: "It is the written part of the Portuguese motorcycle licence exam, the same computer test at an exam centre that car learners take, set for categories A1, A2 and A. If you have no licence it has 40 multiple-choice questions in 40 minutes: 30 on the rules common to all vehicles and 10 on the motorcycle programme (protective gear, visibility, handling, road surfaces and the machine). You pass with at least 36 correct. If you already hold a category B or B1 licence and want A2 or A, you sit only the 10 motorcycle questions in 10 minutes and need 9 right. A pass is valid for one year.",
  },
  {
    q: "Can I take the Portuguese motorcycle theory test in English?",
    a: "The test is set in Portuguese, but the licensing rules let a candidate who does not speak enough Portuguese ask the IMT for a translated theory test. Since Decree-Law 114/2026 (in force July 2026) this is open to every licence category. Ask your driving school about it when you enrol, as the school registers you for the exam.",
  },
  {
    q: "Which motorcycle category should I go for?",
    a: "A1 covers motorcycles up to 125 cc and 11 kW and is open from 16 (with a parent's written consent under 18). A2 covers motorcycles up to 35 kW and is open from 18. A covers any motorcycle and is open from 24, or from 20 after two years with A2. The IMT also treats a valid car licence (B) held by someone aged 25 or over as enough for a motorcycle up to 125 cc and 11 kW, with no motorcycle test.",
  },
  {
    q: "How is the Tigertest practice organised?",
    a: "There are 200 original questions in ten topics. Every mock test has 40 questions like the real one: 30 on the common rules, written from the rider's seat, and 10 on the motorcycle programme, with the 36-of-40 pass mark (90%). Four training sets teach the rules with instant feedback, and missed questions come back until you get them right. No question repeats across the five tests.",
  },
  {
    q: "Are these the real IMT questions?",
    a: "No. Every question is original, written by Tigertest in English from the Código da Estrada, the licensing regulation and its motorcycle programme, so it tests the same knowledge without copying any official question. The real questions often show a photo or drawing; here signs and situations are described in words, and no fines or penalty points are asked. Tigertest is free practice, not affiliated with the IMT (Instituto da Mobilidade e dos Transportes) or any exam centre or driving school, and it does not book or replace your exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Portugal Motorcycle Theory Practice Test",
      description,
      url: `${siteUrl}/portugal-motorcycle-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 questions on the Código da Estrada and the motorcycle programme",
        "5 mock tests of 40 questions, 36 to pass",
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
  { name: "Road Signs & Markings", weight: "15%" },
  { name: "Priority & Junctions", weight: "15%" },
  { name: "Speed, Lanes & Overtaking", weight: "15%" },
  { name: "Stopping, Parking & Motorways", weight: "10%" },
  { name: "Alcohol, Fatigue & Attitude", weight: "10%" },
  { name: "Licences, Documents & Accidents", weight: "10%" },
  { name: "Protective Gear & Visibility", weight: "7.5%" },
  { name: "Braking, Cornering & Passengers", weight: "7.5%" },
  { name: "Road Surfaces & Weather", weight: "5%" },
  { name: "Controls, Checks & Faults", weight: "5%" },
];

export default function PortugalMotorcycleTheoryLandingPage() {
  return (
    <div data-theme="ptmoto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Portugal Motorcycle Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/portugal-motorcycle-theory/dashboard"
            shortName="Motorcycle test"
            subtitle="Practise in English for the IMT theory exam for categories A1, A2 and A: 200 original questions on the Código da Estrada and the motorcycle programme, from priority and overtaking to helmets, braking and road surfaces. Five 40-question mock tests with the real 36-to-pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ptmoto-mobile.png", desktop: "/landing/ptmoto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ptmoto" />

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
                Four training sets cover signs and priority, speed, overtaking and parking, the rider with licences and accidents, and riding skills and the machine. Questions you miss come back until you have mastered them.
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
                Five 40-question tests, the length of the real motorcycle exam: 30 common questions and 10 on the motorcycle programme, each passed with 36 correct like the real one. No question repeats across tests, and every answer explains the rule.
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
                Built on the Código da Estrada and the A programme
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The topics follow the official theory programme in the licensing regulation (the Regulamento da Habilitação Legal para Conduzir): the rules common to every vehicle, here written from the rider&apos;s seat, and the specific programme for categories A1, A2 and A, which covers protective equipment, being seen, the motorcycle&apos;s instability, road surfaces such as tram rails, manhole covers and painted lines, and the machine itself. Rules come from the Código da Estrada as amended to 2025: helmets fastened for rider and passenger, dipped headlight on at all times, no passengers under 7, loads only in a box or trailer, no riding side by side. The real exam shows photos and drawings; here signs and situations are described in words, and no fines or penalty points are asked.
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
                src={getTigerAsset("ptmoto", 1)}
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
            How to Pass the IMT Motorcycle Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the common rules as a rider</h3>
              <p>
                Three quarters of the real test is the same rules a car driver learns: signs, priority to the right, roundabouts, speed limits, overtaking, parking and alcohol. Read every one with a motorcycle in mind: a car pulling out may not see you, a bus lane is open to you, and riding between queues is not.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Master the ten motorcycle questions</h3>
              <p>
                The motorcycle programme asks about protective gear, being seen, braking and cornering, slippery surfaces and basic checks such as oil, chain and the engine kill switch. If you already hold a car licence these ten questions are your whole test, and you can miss only one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Ask for English when you enrol</h3>
              <p>
                The exam is set in Portuguese. If you need it in English, the rules let you request a translated test, so raise it with your driving school when you enrol.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Treat 36 as the floor</h3>
              <p>
                Four mistakes is all the real exam allows, so aim for 38 or more in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all five tests before your exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Portugal Motorcycle Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="ptmoto" />

      <ExamRelatedTests examId="ptmoto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Motorcycle Theory Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on the Portuguese Highway Code for riders, in English.</p>
          <ExamLandingCTA dashboardHref="/portugal-motorcycle-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

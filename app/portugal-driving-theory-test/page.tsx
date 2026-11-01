import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/ptimt";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Portugal Driving Theory Test 2026 - Free IMT Exam Practice in English";
const metaDescription =
  "Free practice in English for the IMT driving theory exam (exame de código), category B: 200 original questions on the Código da Estrada and six 30-question mock tests.";
const description =
  "Free English practice for Portugal's IMT driving theory exam (exame de código) for a category B car licence: 200 original questions on road signs, markings and traffic lights, priority and roundabouts, speed and overtaking, parking and motorways, alcohol and distraction, seat belts and child seats, licences and accidents. Six real-length 30-question mock tests with the 27-of-30 pass mark and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "portugal driving theory test, imt theory exam english, exame de codigo, codigo da estrada test, portugal driving test in english, carta de conducao exam, category b theory test portugal, imt exam questions practice, portuguese driving licence theory, driving test portugal 2026",
  alternates: {
    canonical: `${siteUrl}/portugal-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/portugal-driving-theory-test`,
    images: [{ url: shareImageUrl("ptimt"), width: 1200, height: 630, alt: "Tigertest free Portugal driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ptimt")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the IMT theory exam for a category B licence?",
    a: "It is the written part of the Portuguese driving test, often called the exame de código after the Código da Estrada (the Highway Code). For a category B car licence it has 30 multiple-choice questions in 30 minutes, taken on a computer at an exam centre, and you pass with at least 27 correct answers, so no more than three mistakes. The questions often come with a photo or drawing of a traffic situation seen from the driver's seat. A pass is valid for one year, during which you must pass the practical driving test.",
  },
  {
    q: "Can I take the Portuguese driving theory test in English?",
    a: "The test is set in Portuguese, but the licensing rules let a candidate who does not speak enough Portuguese ask the IMT for a translated theory test. Since a June 2026 change to the rules (Decree-Law 114/2026) this is open to every licence category, and English speakers can ask for it. The request is normally made through your driving school when it registers you, so ask at enrolment. Guides say the practical driving test is not translated.",
  },
  {
    q: "How is the Tigertest practice organised?",
    a: "There are 200 original questions in eight topics, from road signs to accidents. Four training sets teach the rules with instant feedback, and missed questions come back until you get them right. Six mock tests of 30 questions match the real test's length and its 27-of-30 pass mark (90%), and no question repeats across the tests.",
  },
  {
    q: "What rules should I know best?",
    a: "Priority to the right at unmarked junctions, the roundabout lane rules (enter after giving way to traffic already on it, use the right lane for the first exit, move right only after passing the exit before yours), the general speed limits for cars (50 km/h in towns, 90 on other roads, 100 on roads reserved for motor vehicles, 120 on motorways), the stopping and parking distances, the 1.5 m gap when passing cyclists, and the alcohol limits: 0.5 g/l for most drivers and 0.2 g/l during the three-year probationary period.",
  },
  {
    q: "Are these the real IMT questions?",
    a: "No. Every question is original, written by Tigertest in English from the Código da Estrada, the licensing regulation and the signs regulation, so it tests the same knowledge without copying any official question. Signs and situations are described in words rather than shown in photos, so study pictures of Portuguese signs too. Tigertest is free practice, not affiliated with the IMT (Instituto da Mobilidade e dos Transportes) or any exam centre or driving school, and it does not book or replace your exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Portugal Driving Theory Practice Test",
      description,
      url: `${siteUrl}/portugal-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 questions on the Portuguese Código da Estrada",
        "6 mock tests of 30 questions, 27 to pass",
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
  { name: "Road Signs", weight: "20%" },
  { name: "Priority, Junctions & Roundabouts", weight: "17%" },
  { name: "Speed, Distance & Overtaking", weight: "13%" },
  { name: "Markings, Lights & Police Signals", weight: "10%" },
  { name: "Stopping, Parking & Motorways", weight: "10%" },
  { name: "Alcohol, Fatigue & Distraction", weight: "10%" },
  { name: "Seat Belts, Children, Lights & Equipment", weight: "10%" },
  { name: "Licences, Documents & Accidents", weight: "10%" },
];

export default function PortugalDrivingTheoryLandingPage() {
  return (
    <div data-theme="ptimt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Portugal Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/portugal-driving-theory/dashboard"
            shortName="Theory test"
            subtitle="Practise in English for the exame de código: 200 original questions on the Código da Estrada, from signs and roundabouts to speed limits, parking and alcohol. Six 30-question mock tests with the real 27-to-pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ptimt-mobile.png", desktop: "/landing/ptimt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ptimt" />

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
                Four training sets cover signs and markings, priority and roundabouts with licences and accidents, speed, overtaking and parking, and the driver and the vehicle. Questions you miss come back until you have mastered them.
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
                Six 30-question tests, the length of the real category B exam, each passed with 27 correct like the real one. No question repeats across tests, and every answer explains the rule.
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
                Built on the Código da Estrada
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The topics follow the official theory programme in the licensing regulation (the Regulamento da Habilitação Legal para Conduzir) and the rules of the Código da Estrada as amended to 2025: drive on the right, give way to traffic from the right, Portugal&apos;s roundabout lane rules, speed and stopping distances, where you may not stop or park, motorway rules, alcohol limits, child seats and what to do after a crash. The real exam shows photos and drawings of traffic situations; here signs and situations are described in words, and no fines or penalty points are asked.
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
                src={getTigerAsset("ptimt", 1)}
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
            How to Pass the IMT Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape and colour first</h3>
              <p>
                Red-bordered triangles warn, red rings forbid, blue circles give orders and blue squares inform. The red octagon means stop, the downward triangle means give way and the yellow diamond marks a priority road. Once you know the family, most signs explain themselves.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who goes first</h3>
              <p>
                With no signs, give way to traffic from your right. Leaving a car park or petrol station, joining a motorway or entering a roundabout, you always give way. On a two-lane roundabout, take the right lane for the first exit; for later exits move right only after passing the exit before yours. On a steep narrow road the driver going down gives way.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Ask for English when you enrol</h3>
              <p>
                The exam is set in Portuguese. If you need it in English, ask your driving school to request a translated test when it registers you, since the request goes through the school. Guides say the practical driving test is not translated.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Treat 27 as the floor</h3>
              <p>
                Three mistakes is all the real exam allows, so aim for 29 or 30 in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all six tests before your exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Portugal Driving Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="ptimt" />

      <ExamRelatedTests examId="ptimt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Exame de Código?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on the Portuguese Highway Code, in English.</p>
          <ExamLandingCTA dashboardHref="/portugal-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

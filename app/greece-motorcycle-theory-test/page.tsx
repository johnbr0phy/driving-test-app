import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/grmoto";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Greece Motorcycle Theory Test 2026 in English - Free A1, A2 and A Practice";
const metaDescription =
  "Free Greek motorcycle theory test practice in English: 200 original questions for categories A1, A2 and A, six 30-question mock tests and every answer explained.";
const description =
  "Free practice in English for the Greek motorcycle theory test, categories A1, A2 and A: 200 original questions on helmets and protective gear, braking and cornering, road position and filtering under the 2025 Highway Code, junctions, passengers and loads, road surfaces and weather, and the Code's rules for riders. Six 30-question mock tests at the 29 of 30 pass line guides report, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "greece motorcycle theory test, greek motorcycle licence test in english, motorcycle licence greece, category a theory test greece, a1 licence greece, a2 licence greece, greek motorbike licence, diploma michanis, motorcycle test athens, motorcycle test thessaloniki, theory test practice 2026",
  alternates: {
    canonical: `${siteUrl}/greece-motorcycle-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/greece-motorcycle-theory-test`,
    images: [{ url: shareImageUrl("grmoto"), width: 1200, height: 630, alt: "Tigertest free Greece motorcycle theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("grmoto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Greek motorcycle theory test like?",
    a: "It is a multiple-choice test taken on a computer at a Transport Directorate exam centre. The Ministry of Infrastructure and Transport runs the computer theory test in four licence groups, and motorcycles are one of them; each candidate gets a questionnaire drawn at random from the question bank, with the answers in shuffled order. Guides describe the motorcycle test like the car test: 30 questions with a pass at 29 correct, so only one mistake is allowed. The Ministry's page gives no count or time, so check the current rule with your driving school.",
  },
  {
    q: "Can I take the Greek motorcycle theory test in English?",
    a: "Greek law makes the theory questionnaires available in foreign languages as well as in Greek, in Greek with audio and in Greek Sign Language. The law does not list the foreign languages, so check whether English is offered with your Transport Directorate or driving school when you register.",
  },
  {
    q: "What is the difference between the A1, A2 and A licences?",
    a: "They follow the EU licence directive. A1 covers light motorcycles up to 125 cc and 11 kW, A2 motorcycles up to 35 kW (and not restricted from more than double that power), and A any motorcycle. AM covers mopeds limited to 45 km/h. Minimum ages and the steps between categories are set by Greek law and secondary sources disagree on them, so confirm them with your driving school. Guides also describe a 2021 law that lets some long-standing car licence holders ride a 125 cc motorcycle in Greece after lessons instead of a test.",
  },
  {
    q: "Which 2025 Highway Code rules matter most to riders?",
    a: "Law 5209/2025, in force since September 2025, lets motorcycles and mopeds without a sidecar move between lanes of stopped traffic on roads with two or more lanes each way, at no more than 20 km/h and with dipped headlights on. It bans riding side by side, earphones and hand-held phones, and towing or pushing objects, and it requires both hands on the handlebars except to signal. A passenger rides only on a fitted pillion seat with feet on the footrests, and a child aged five or under needs an approved restraint seat. Tigertest asks no fine amounts.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from the Greek Highway Code and standard motorcycle safety practice, so it tests the same knowledge without copying the official question bank. The real test may show pictures; here every situation is described in words, and road signs are covered by our Greece driving theory test. It is free practice, not affiliated with the Greek Ministry of Infrastructure and Transport or any Transport Directorate, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Greece Motorcycle Theory Practice Test",
      description,
      url: `${siteUrl}/greece-motorcycle-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("grmoto", "EUR"),
      featureList: [
        "200 Greek motorcycle theory questions in English",
        "6 mock tests of 30 questions",
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
  { name: "Braking, Cornering & Control", weight: "17%" },
  { name: "Road Position, Filtering & Overtaking", weight: "17%" },
  { name: "Helmets & Protective Gear", weight: "13%" },
  { name: "Junctions, Priority & Being Seen", weight: "13%" },
  { name: "Licences, Documents & Rider Conduct", weight: "10%" },
  { name: "Motorcycle Checks & Controls", weight: "10%" },
  { name: "Road Surfaces, Weather & Hazards", weight: "10%" },
  { name: "Passengers & Loads", weight: "7%" },
  { name: "Highway Code Rules for Riders", weight: "3%" },
];

export default function GreeceMotorcycleTheoryLandingPage() {
  return (
    <div data-theme="grmoto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Greece Motorcycle Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/greece-motorcycle-theory/dashboard"
            shortName="Motorcycle theory"
            subtitle="200 original questions in English for categories A1, A2 and A: helmets and gear, braking and cornering, filtering under the 2025 Highway Code, junctions, passengers and road hazards. Six 30-question mock tests where one mistake is all you can afford. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/grmoto-mobile.png", desktop: "/landing/grmoto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="grmoto" />

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
                Four training sets cover gear and the machine, control and road hazards, road position and junctions, and licences, passengers and the Code&apos;s rules for riders. Questions you miss come back until you have mastered them.
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
                Six tests of 30 questions, the length guides report for the motorcycle test, with a pass at 29. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built for Riders, on the Greek Highway Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The questions follow Greece&apos;s own rules for riders as in force in November 2026: filtering between stopped lanes at up to 20 km/h, no riding side by side, both hands on the bars, passengers only on a fitted pillion seat, and the motorway and tunnel rules of the 2025 Code. The rest is the riding skill the test asks about: braking, cornering, being seen and reading the road. The Ministry publishes no topic weights, so the split below is Tigertest&apos;s. Road signs are not repeated here; practise them in the Greece driving theory test.
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
                src={getTigerAsset("grmoto", 1)}
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
            How to Pass the Greek Motorcycle Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Train for near-perfect scores</h3>
              <p>
                With one mistake allowed in 30, knowing most of the material is not enough. Practise until you score 29 or 30 in every mock test, not just a pass on a good day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the 2025 rules for riders word for word</h3>
              <p>
                Filtering is allowed only between lanes of the same direction, on roads with at least two lanes each way, while the other traffic is stopped, at up to 20 km/h with dipped lights. Weaving through moving traffic is not. Learn exactly when a passenger, a load or a phone is allowed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like a rider, not a driver</h3>
              <p>
                Many questions ask why drivers fail to see motorcycles, where to ride in your lane, how to brake and corner, and which surfaces lose grip. Picture yourself on the bike and choose the answer that keeps you seen and in control.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip the general rules</h3>
              <p>
                Road signs, priority and speed limits apply to riders too. Tigertest&apos;s Greece driving theory test covers them, so practise both if you are new to Greek roads.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Greece Motorcycle Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="grmoto" />

      <ExamRelatedTests examId="grmoto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Greek Motorcycle Licence?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions in English for the A1, A2 and A theory test.</p>
          <ExamLandingCTA dashboardHref="/greece-motorcycle-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

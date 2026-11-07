import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/fimoto";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Finland Motorcycle Theory Test 2026 in English - Free A1, A2 and A Practice";
const metaDescription =
  "Free practice for the Finnish motorcycle theory test (teoriakoe) for categories A1, A2 and A, in English: 200 original questions, four 50-question mock tests, every answer explained.";
const description =
  "Free practice in English for the Finnish motorcycle theory test for categories A1, A2 and A: 200 original questions on the Road Traffic Act and riding, covering helmets and protective gear, being seen, motorcycle checks, braking and cornering, road position and parking, giving way, overtaking and large vehicles, road surfaces, winter and moose, passengers and trailers, and the A1, A2 and A licence rules. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "finland motorcycle theory test, finnish motorcycle theory test in english, teoriakoe a2, teoriakoe a1, moottoripyörä teoriakoe, a2 ajokortti theory test, motorcycle licence finland, ajovarma motorcycle theory test, traficom a1 a2 a, finland motorcycle test questions 2026",
  alternates: {
    canonical: `${siteUrl}/finland-motorcycle-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/finland-motorcycle-theory-test`,
    images: [{ url: shareImageUrl("fimoto"), width: 1200, height: 630, alt: "Tigertest free Finland motorcycle theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("fimoto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the Finnish motorcycle theory test?",
    a: "The theory test (teoriakoe) for categories A1, A2 and A is taken on a tablet at an Ajovarma service point and has three parts: 20 multiple choice questions, 50 picture questions about traffic situations and 5 risk recognition questions. You have 30 minutes. Each part has its own pass mark set by Traficom: at least 14 of 20, 43 of 50 and 4 of 5. Failing any one part fails the test. After it come a handling test and a driving test.",
  },
  {
    q: "Can I take the Finnish motorcycle theory test in English?",
    a: "Yes. Traficom gives Finnish, Swedish and English as the languages of the test. If your mother tongue is none of these and you do not know any of them well, you may be allowed an oral test with 60 minutes, and in some cases an interpreter. Tigertest's practice is in English and uses the Finnish terms you will meet on signs and in the rules, such as taajama and pihakatu.",
  },
  {
    q: "How does Tigertest's practice compare with the real test?",
    a: "Tigertest's four mock tests have 50 multiple choice questions each, and the 86% target (43 of 50) matches the share needed on the real picture part. The picture and risk recognition questions on the real test show photos and video clips; Tigertest describes the same traffic situations in words, so it trains the rules and riding judgement behind them but not reading the pictures. Pass all four mock tests comfortably before you book.",
  },
  {
    q: "Which motorcycle can I ride on an A1, A2 or A licence?",
    a: "A1, from age 16, covers motorcycles up to 125 cm³ and 11 kW with at most 0.1 kW/kg. A2, from age 18, covers up to 35 kW and 0.2 kW/kg, and the bike must not be restricted from more than 70 kW. Category A, with no power limit, is open at 24, or at 20 after two years on A2. Traficom lists the upgrade routes, by driving instruction or by a handling and driving test, on its website.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from the Finnish Road Traffic Act (Tieliikennelaki), Traficom's rules for the theory test and its licence pages, so it tests the same knowledge without copying any official question. Signs and traffic situations are described in words. It is free practice, not affiliated with Traficom, Ajovarma or A-Katsastus, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Finland Motorcycle Theory Practice Test",
      description,
      url: `${siteUrl}/finland-motorcycle-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Finnish motorcycle rule and riding questions in English",
        "4 mock tests of 50 questions",
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
  { name: "Braking, Cornering & Control", weight: "14%" },
  { name: "Junctions & Giving Way", weight: "14%" },
  { name: "Road Position, Speed & Parking", weight: "12%" },
  { name: "Road Surfaces, Weather & Winter", weight: "12%" },
  { name: "Helmet, Protective Gear & Being Seen", weight: "10%" },
  { name: "Motorcycle Checks & Mechanics", weight: "10%" },
  { name: "Overtaking, Meeting & Large Vehicles", weight: "10%" },
  { name: "The Rider, Alcohol & Licence Categories", weight: "10%" },
  { name: "Passengers, Luggage & Trailers", weight: "8%" },
];

export default function FinlandMotorcycleTheoryLandingPage() {
  return (
    <div data-theme="fimoto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Finland Motorcycle Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/finland-motorcycle-theory/dashboard"
            shortName="Motorcycle theory test"
            subtitle="200 original questions in English for the Finnish A1, A2 and A theory test: helmets and gear, braking and cornering, giving way, road surfaces and winter, passengers and the licence categories. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/fimoto-mobile.png", desktop: "/landing/fimoto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="fimoto" />

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
                Five training sets cover your gear and your motorcycle, control, surfaces and winter, junctions and overtaking, road position, passengers and loads, and the rider and the licence categories. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, with an 86% target, the share the real test asks on its picture part. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on Finnish Law and Traficom&apos;s Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Traficom&apos;s rules for the theory test add four topics for categories A1, A2 and A to the general traffic rules: protective gear, how visible riders are to others, hazards from road conditions and the mechanics of the motorcycle. Tigertest follows those areas with the rules of the current Road Traffic Act: helmets for rider and passenger, 1.0 mm tyre tread, one passenger with a proper seat and footrests, no parking on the pavement, winter tyres and studs from November to March, and the A1, A2 and A power limits. The real test&apos;s photos and risk recognition videos are not modelled; situations are described in words.
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
                src={getTigerAsset("fimoto", 1)}
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
            How to Pass the Finnish Motorcycle Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the right-hand rule from the saddle</h3>
              <p>
                Most picture questions are about who goes first. At an unsigned junction, a T-junction included, you give way to traffic from the right, but you always give way when you come from a car park, a yard, a fuel station or a pihakatu, and when you turn across people crossing. Then add the rider&apos;s view: a driver who must give way to you may still not see you.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the rules that differ for motorcycles</h3>
              <p>
                Motorcycle tyres need only 1.0 mm of tread, a solo motorcycle carries one passenger with a proper seat and footrests, a trailer may weigh at most half the bike&apos;s unladen mass, and unlike bicycles and mopeds a motorcycle may not be parked on the pavement or beside a parked car. Only cyclists may pass a queue on its right.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the licence limits</h3>
              <p>
                A1 is 125 cm³, 11 kW and 0.1 kW/kg from 16. A2 is 35 kW and 0.2 kW/kg from 18, never cut down from over 70 kW. Category A comes at 24, or at 20 after two years on A2. These figures come up again and again.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above the pass mark</h3>
              <p>
                The real test fails you if any one part is below its minimum, so there is little room for error. Aim for 45 or more in every mock test, drill the questions you missed, then take all four tests back to back before you book at Ajovarma.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Finland Motorcycle Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="fimoto" />

      <ExamRelatedTests examId="fimoto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Finnish Motorcycle Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Finnish traffic rules and riding, in English.</p>
          <ExamLandingCTA dashboardHref="/finland-motorcycle-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/hukreszmoto";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Hungary Motorcycle Theory Test 2026 - Free KRESZ Practice in English";
const metaDescription =
  "Free Hungarian motorcycle theory practice in English for categories AM, A1, A2 and A: 200 original KRESZ questions for riders, three full 55-question tests, every answer explained.";
const description =
  "Free practice in English for Hungary's motorcycle theory exam (Közlekedési alapismeretek) for categories AM, A1, A2 and A: 200 original questions on licence categories and power limits, helmets and protective gear, motorcycle checks, braking and cornering, filtering, bus lanes and overtaking, speed limits and signs for riders, junctions and tram rails, passengers, mopeds, parking, and hazards in rain, wind and at night. Three full 55-question tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "hungary motorcycle theory test, kresz motor teszt, motoros kresz teszt angolul, hungarian motorcycle licence theory exam english, A2 jogosítvány elmélet, A1 kategória vizsga, AM kategória robogó vizsga, közlekedési alapismeretek motor, kav motoros vizsga, budapest motorcycle licence english, hungary moped licence test",
  alternates: {
    canonical: `${siteUrl}/hungary-motorcycle-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hungary-motorcycle-theory-test`,
    images: [{ url: shareImageUrl("hukreszmoto"), width: 1200, height: 630, alt: "Tigertest free Hungary motorcycle theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hukreszmoto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Hungarian motorcycle theory exam like?",
    a: "Motorcycle learners sit the same computer-based theory exam as car learners, officially Közlekedési alapismeretek, at a centre of the KAV, Hungary's transport exam centre, with questions for their category. For A1, A2 and A it has 55 multiple-choice questions in 55 minutes, worth 75 points in all, and you need at least 65. For the AM moped category it is 25 questions in 25 minutes, worth 35 points, and you need 30. Guides say some questions are worth more points than others.",
  },
  {
    q: "Can I take the motorcycle theory exam in English?",
    a: "Guides and KRESZ course publishers say the computer-based theory exam for motorcycles and category B can be taken in Hungarian, English, German and Romanian. The KAV's exam rules also allow an oral exam with an interpreter when there is no question bank in a candidate's language. Ask your driving school which language to book when it enrols you.",
  },
  {
    q: "Which motorcycle category can I get, and at what age?",
    a: "AM covers mopeds up to 45 km/h by design and moped cars, from 14. A1 covers motorcycles up to 125 cc, 11 kW and 0.1 kW/kg, from 16. A2 covers motorcycles up to 35 kW and 0.2 kW/kg, not derived from a machine of more than double that power, from 18. Category A has no power limit: from 20 after two years on A2, or from 24 without earlier motorcycle experience.",
  },
  {
    q: "What rules are special to riders in Hungary?",
    a: "Rider and passenger must wear fastened motorcycle helmets, and a motorcycle rides with its dipped headlight on by day. Motorcycles and mopeds may move forward between stopped vehicles at lights if there is room and they hinder no one, and may use bus lanes without disturbing buses. Mopeds are limited to 40 km/h, may not carry a passenger on two wheels, and may not use motorways or expressways. Two-wheeled motorcycles may neither tow nor be towed, and the alcohol limit is zero.",
  },
  {
    q: "Are these the real KAV exam questions?",
    a: "No. Every question is original, written by Tigertest in English from the Hungarian Highway Code (the KRESZ, decree 1/1975) as in force in November 2026, the licence decree and the KAV motorcycle curricula, so it tests the same rules and riding knowledge without copying the official question bank. Signs are described in words. Tigertest scores every question equally and sets 87% as the target, close to the real 65 of 75 points. It is free practice, not affiliated with the KAV or any Hungarian authority, and it does not book or replace your exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Hungary Motorcycle Theory Practice Test",
      description,
      url: `${siteUrl}/hungary-motorcycle-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Hungarian motorcycle theory questions in English",
        "3 full tests of 55 questions",
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
  { name: "Braking, Cornering & Control", weight: "13%" },
  { name: "Road Position, Filtering & Overtaking", weight: "13%" },
  { name: "Categories, Licences & the Rider", weight: "11%" },
  { name: "Motorcycle Checks & How It Works", weight: "11%" },
  { name: "Speed, Signs & Motorways for Riders", weight: "11%" },
  { name: "Junctions, Trams & Being Seen", weight: "11%" },
  { name: "Passengers, Loads, Parking & Mopeds", weight: "11%" },
  { name: "Hazards, Weather, Night & Breakdowns", weight: "11%" },
  { name: "Helmets, Protective Gear & Being Seen", weight: "9%" },
];

export default function HungaryMotorcycleTheoryLandingPage() {
  return (
    <div data-theme="hukreszmoto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Hungary Motorcycle Theory Test Practice in English 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hungary-motorcycle-theory/dashboard"
            shortName="motorcycle theory test"
            subtitle="200 original questions in English for categories AM, A1, A2 and A: licence limits, helmets and gear, braking and cornering, filtering and bus lanes, mopeds, passengers and riding hazards. Three full 55-question tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/hukreszmoto-mobile.png", desktop: "/landing/hukreszmoto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hukreszmoto" />

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
                Five training sets cover licences, helmets and gear, checks, braking and cornering, road position and junctions, speed, passengers and mopeds, and hazards in rain, wind and at night. Questions you miss come back until you have mastered them.
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
                Three 55-question tests at the A1, A2 and A length, with an 87% target close to the real 65 of 75 points. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the KRESZ and the KAV Motorcycle Curriculum
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The rules come from the KRESZ, the Hungarian Highway Code (decree 1/1975) as in force in November 2026, and the licence decree 326/2011, with the rider&apos;s angle: filtering at lights, bus lanes, helmets for rider and passenger, dipped lights by day, the 40 km/h moped limit, which signs bar motorcycles and mopeds, and why a two-wheeler needs no warning triangle. The riding and machine questions follow the subjects of the KAV&apos;s motorcycle curriculum. Questions on rules every driver shares are kept for our KRESZ car test. Signs are described in words, and the real exam&apos;s pictures are not reproduced.
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
                src={getTigerAsset("hukreszmoto", 1)}
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
            How to Pass the Motorcycle Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your category&apos;s limits</h3>
              <p>
                Learn the numbers that define each category: 45 km/h and 50 cc for AM, 125 cc, 11 kW and 0.1 kW/kg for A1, 35 kW and 0.2 kW/kg for A2, and the ages 14, 16, 18 and 20 or 24. Practise the power-to-weight sums, since a bike can be inside the kW limit and still outside the category.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn what riders may and may not do</h3>
              <p>
                Filtering between stopped cars, bus lanes, pavement stopping, parking two abreast and the no overtaking sign all have rider-specific rules. Mopeds add their own: 40 km/h, no motorways, no passenger on two wheels, no trailer, single file and no cycle lanes in town.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Understand the bike, not just the law</h3>
              <p>
                The exam also covers riding theory and the machine: front and rear braking, countersteering, braking before a bend, the clutch, chain and suspension, and the checks before every ride. Picture the move as you answer, and the right option becomes easier to spot.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above the pass mark</h3>
              <p>
                The real A1, A2 and A exam lets you lose only 10 of 75 points, and AM only 5 of 35. Aim for 50 or more out of 55 in every Tigertest test, drill the questions you missed, retrain your weakest set, then take all three tests again before your exam day. Review the shared car rules in our KRESZ test too.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Hungary Motorcycle Theory Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="hukreszmoto" />

      <ExamRelatedTests examId="hukreszmoto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Motorcycle Theory Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions in English for Hungarian riders.</p>
          <ExamLandingCTA dashboardHref="/hungary-motorcycle-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/hukresz";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Hungary KRESZ Test 2026 - Free Driving Theory Practice in English";
const metaDescription =
  "Free KRESZ theory exam practice for Hungary in English: 200 original questions on the Hungarian Highway Code, three full 55-question tests and every answer explained.";
const description =
  "Free practice in English for Hungary's category B theory exam (KRESZ, Közlekedési alapismeretek): 200 original questions on warning, priority and prohibition signs, markings and traffic lights, the right-hand rule and trams, speed limits and overtaking, motorways and level crossings, parking, lights, towing, seat belts and crashes. Three full 55-question tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "kresz test english, hungary driving theory test, hungarian driving test in english, kresz vizsga angolul, kresz teszt, közlekedési alapismeretek, hungary driving licence theory exam, budapest driving test english, hungarian highway code questions, kresz practice test 2026",
  alternates: {
    canonical: `${siteUrl}/hungary-kresz-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hungary-kresz-test`,
    images: [{ url: shareImageUrl("hukresz"), width: 1200, height: 630, alt: "Tigertest free Hungary KRESZ theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hukresz")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Hungarian KRESZ theory exam like?",
    a: "The category B theory exam, officially Közlekedési alapismeretek, is taken on a computer at a centre of the KAV, Hungary's transport exam centre. It has 55 multiple-choice questions and you have 55 minutes, one minute per question. The questions are worth 75 points in all and you need at least 65 points to pass. Guides say 10 questions are worth 3 points and 45 are worth 1 point, so a few wrong answers on the 3-point questions can fail you.",
  },
  {
    q: "Can I take the KRESZ exam in English?",
    a: "Yes. Driving schools and KRESZ course publishers say the computer-based theory exam for category B is offered in Hungarian, English, German and Romanian. Under the KAV's exam rules, a candidate who does not speak Hungarian and has no question bank in their own language may instead sit an oral exam with an interpreter. Ask your driving school which language to book when it enrols you for the exam.",
  },
  {
    q: "What are the key Hungarian rules to know?",
    a: "Hungary drives on the right. With no signs, give way to every vehicle from your right and to a tram from your left. The alcohol limit is zero: you may not drive with any alcohol from drinking in your body. Cars are limited to 50 km/h in built-up areas, 90 km/h on other roads, 110 km/h on expressways and 130 km/h on motorways. Outside built-up areas you need daytime running lights or dipped headlights even by day, and a speed limit or no overtaking sign with no plate lasts only to the next junction.",
  },
  {
    q: "How old must I be, and how long is a pass valid?",
    a: "You may take the theory exam from 16 years and 9 months and the driving test from 17. A passed theory exam stays valid for two years; if you do not finish the remaining exams in that time, all your passed exams lapse. You also need first aid knowledge, normally shown by passing a first aid exam, and you must complete a course at a driving school before the exams.",
  },
  {
    q: "Are these the real KRESZ exam questions?",
    a: "No. Every question is original, written by Tigertest in English from the Hungarian Highway Code (the KRESZ, decree 1/1975) as in force in November 2026, so it tests the same rules without copying the official question bank. Signs are described in words, so look at pictures of the Hungarian signs too. Tigertest scores every question equally and sets 87% as the target, close to the real 65 of 75 points. It is free practice, not affiliated with the KAV or any Hungarian authority, and it does not book or replace your exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Hungary KRESZ Theory Practice Test",
      description,
      url: `${siteUrl}/hungary-kresz-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Hungarian Highway Code questions in English",
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
  { name: "Priority, Prohibition & Mandatory Signs", weight: "16%" },
  { name: "Right of Way, Junctions & Trams", weight: "15%" },
  { name: "Speed, Lanes & Overtaking", weight: "13%" },
  { name: "Warning Signs", weight: "11%" },
  { name: "Markings, Traffic Lights & Police Signals", weight: "11%" },
  { name: "Licences, Alcohol & the Driver", weight: "9%" },
  { name: "Stopping, Parking, Lights & Towing", weight: "9%" },
  { name: "Seat Belts, Children, Breakdowns & Crashes", weight: "9%" },
  { name: "Motorways & Level Crossings", weight: "7%" },
];

export default function HungaryKreszLandingPage() {
  return (
    <div data-theme="hukresz" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Hungary KRESZ Theory Test Practice in English 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hungary-driving-theory/dashboard"
            shortName="KRESZ test"
            subtitle="200 original questions in English on the Hungarian Highway Code: signs, the right-hand rule and trams, speed limits, overtaking, motorways, level crossings, parking and crashes. Three full 55-question tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/hukresz-mobile.png", desktop: "/landing/hukresz-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hukresz" />

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
                Five training sets cover warning signs and markings, priority and prohibition signs, right of way and trams, speed, overtaking and motorways, and licences, parking and safety. Questions you miss come back until you have mastered them.
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
                Three 55-question tests at the real length, with an 87% target close to the real 65 of 75 points. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the Hungarian Highway Code (KRESZ)
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Every rule comes from the KRESZ, the Hungarian Highway Code (decree 1/1975) as in force in November 2026, with Hungary&apos;s own details: the right-hand rule and trams from the left, zero alcohol, speed and overtaking bans that end at the next junction, the flashing white light at level crossings and daytime lights outside built-up areas. Signs and junction situations are described in words, so practise with pictures of the Hungarian signs as well. A new KRESZ has been drafted but was not in force when these questions were written.
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
                src={getTigerAsset("hukresz", 1)}
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
            How to Pass the KRESZ Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the right-hand rule and trams</h3>
              <p>
                Most junction questions come down to one rule: with no signs or lights, give way to everything from your right, and to a tram from your left. Then learn the exceptions: a dirt road gives way to a paved one, vehicles with blue lights and sirens go first, and a vehicle going straight beats a tram turning from the same direction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn where signs stop applying</h3>
              <p>
                A Hungarian speed limit, no overtaking or no U-turn sign lasts only to the next junction unless a plate or an end sign says otherwise, and a no parking sign covers only its own side of the road. A speed limit placed with the built-up area sign covers the whole town. These details are favourite exam questions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the numbers</h3>
              <p>
                Learn the limits (50, 90, 110 and 130 km/h for cars; 70 and 80 km/h with a trailer; 50 with snow chains; 40 when towing), the stopping distances (5 m from junctions and zebras, 15 m before and 5 m after a bus stop, 3 m to a solid line) and the child seat rules (150 cm, 135 cm and age 3).
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above the pass mark</h3>
              <p>
                The real exam lets you lose only 10 of 75 points, and guides say some questions are worth 3 points. Aim for 50 or more out of 55 in every Tigertest test, drill the questions you missed, retrain your weakest set, then take all three tests again before your exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Hungary KRESZ Theory Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="hukresz" />

      <ExamRelatedTests examId="hukresz" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your KRESZ Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions in English on the Hungarian Highway Code.</p>
          <ExamLandingCTA dashboardHref="/hungary-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/bemoto";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Belgium Motorcycle Theory Test 2026 - Free Practice in English";
const metaDescription =
  "Free Belgian motorcycle theory practice in English for categories A1, A2 and A: 200 original questions, four 50-question mock tests at the real 41/50 pass mark, every answer explained.";
const description =
  "Free practice in English for the Belgian motorcycle theory exam (categories A1, A2 and A) in Flanders, Wallonia and Brussels: 200 original questions on licence categories and learner rules, protective clothing, braking and cornering, lane position and filtering, group riding, passengers and children, priority, signs for riders, regional speed limits, overtaking, road hazards, lights and parking. Four 50-question mock tests at the real 41/50 pass mark and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "belgium motorcycle theory test, belgian motorcycle theory exam english, rijbewijs a theorie examen, theorie-examen motorfiets, permis moto theorique belgique, examen theorique moto, a2 theory test belgium, a1 theory test belgium, motorcycle licence belgium english, motorcycle filtering belgium, belgian highway code motorcycle questions 2026",
  alternates: {
    canonical: `${siteUrl}/belgium-motorcycle-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/belgium-motorcycle-theory-test`,
    images: [{ url: shareImageUrl("bemoto"), width: 1200, height: 630, alt: "Tigertest free Belgium motorcycle theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("bemoto")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Belgian motorcycle theory exam like?",
    a: "It is a separate theory exam for the motorcycle categories A1, A2 and A, taken at an approved exam centre in Flanders, Wallonia or Brussels. It has 50 multiple-choice questions on a computer, on the Highway Code and safe motorcycle riding, and you need at least 41 out of 50 to pass. A pass is valid for three years, so you must pass the practical exam within that time. Brussels lets you sit it from 17 years and 9 months; Flanders sets the age by category (17 years and 9 months for A1, 19 years and 9 months for A2, 23 years and 9 months for A), so check yours with your centre.",
  },
  {
    q: "Can I take the Belgian motorcycle theory exam in English?",
    a: "Sometimes, so check with your exam centre before you book. In Brussels the exam is in Dutch or French, and English or German is offered only in booked special sessions with an interpreter appointed by the centre, at your expense. For the car theory exam, Flanders offers an English audio translation and Wallonia offers English by appointment at its Couillet and Wandre centres. Neither region confirms this for the motorcycle exam on its website, so ask your centre about English when you book.",
  },
  {
    q: "Do I need to take the theory exam if I already ride?",
    a: "Not always. If you have held an A2 licence for at least two years you are exempt from the theory exam for category A, and Brussels exempts riders who have held A1 for two years from the A2 theory exam. You can then reach category A from 22 by progressive access instead of 24 by direct access. Since 1 January 2026 Wallonia requires the theory exam to have been passed in Wallonia before you take the Walloon practical exam.",
  },
  {
    q: "Are the rules the same in Flanders, Wallonia and Brussels?",
    a: "Mostly. The Highway Code is federal, so the motorcycle rules on helmets and protective clothing, lane position, filtering at up to 50 km/h, group riding, passengers and children are the same everywhere. Speed limits differ: in built-up areas the default is 30 km/h in Brussels and 50 km/h in Flanders and Wallonia; outside built-up areas it is 70 km/h in Flanders and Brussels and 90 km/h in Wallonia; motorways are 120 km/h. Provisional licence rules also differ by region, so Tigertest names the region wherever a rule is regional.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from the Belgian Highway Code (the Royal Decree of 1 December 1975), the licence categories and safe riding practice, so it tests the same knowledge without copying any official question. The real exam shows photos; here signs and situations are described in words. Tigertest is free practice, not affiliated with GOCA, any exam centre or the Flemish, Walloon or Brussels authorities, and it does not book or replace your exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Belgium Motorcycle Theory Practice Test",
      description,
      url: `${siteUrl}/belgium-motorcycle-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Belgian motorcycle theory questions in English",
        "4 mock tests of 50 questions at the 41/50 pass mark",
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
  { name: "Braking, Cornering & Control", weight: "12%" },
  { name: "Road Position, Filtering & Group Riding", weight: "12%" },
  { name: "Priority & Junctions", weight: "12%" },
  { name: "Road Signs for Riders", weight: "12%" },
  { name: "Protective Gear & Motorcycle Checks", weight: "10%" },
  { name: "Speed Limits, Overtaking & Motorways", weight: "10%" },
  { name: "Road Surface, Weather & Hazards", weight: "10%" },
  { name: "Licence Categories, Learners & Fitness", weight: "8%" },
  { name: "Passengers, Children & Loads", weight: "8%" },
  { name: "Lights, Parking & Breakdowns", weight: "6%" },
];

export default function BelgiumMotorcycleTheoryLandingPage() {
  return (
    <div data-theme="bemoto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Belgium Motorcycle Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/belgium-motorcycle-theory/dashboard"
            shortName="Motorcycle theory"
            subtitle="200 original questions in English for categories A1, A2 and A: protective gear, braking and cornering, lane position and filtering, passengers, priority, signs, regional speed limits and road hazards. Four 50-question mock tests at the real 41/50 pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/bemoto-mobile.png", desktop: "/landing/bemoto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="bemoto" />

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
                Five training sets cover licences, gear and passengers, braking and road hazards, road position and speed, priority and parking, and road signs for riders. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, scored at 41 out of 50 like the real exam. Aim well above the pass mark before exam day.
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
                Built for Riders, on the Belgian Highway Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The questions follow the federal Highway Code rules that apply to motorcyclists: where you may ride in your lane, filtering between queues at up to 50 km/h and 20 km/h faster than the traffic, staggered group riding and road captains, dipped beam day and night, gloves, jacket, trousers and boots, and the rules on children as passengers. The rest covers braking, cornering and the road hazards that matter most on two wheels. Where the regions differ, as they do on speed limits and learner rules, the question names the region. No region publishes a topic split, so these weights are Tigertest&apos;s own. Signs and situations are described in words.
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
                src={getTigerAsset("bemoto", 1)}
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
            How to Pass the Belgian Motorcycle Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the rider-only rules</h3>
              <p>
                The motorcycle exam asks what the car exam does not: where you may ride in your lane, the 50 km/h and 20 km/h limits for filtering, staggered group riding, the protective clothing you and your passenger must wear, and which children may ride on which bike.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know your licence category</h3>
              <p>
                A1 covers up to 125 cc and 11 kW from 18, A2 up to 35 kW from 20, and A from 24, or from 22 after two years on A2. Know which bike your licence lets you ride before you buy one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip the car rules</h3>
              <p>
                Priority to the right, trams first, signs, markings and the regional speed limits are on the motorcycle exam too. Learn the defaults for the region where you ride: 30 in Brussels towns, 50 in Flemish and Walloon towns, 70 outside towns in Flanders and Brussels, 90 in Wallonia and 120 on motorways.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 41</h3>
              <p>
                Aim for 46 or more in every mock test. Tigertest tracks your accuracy by topic: drill the questions you missed, retrain the weakest set, then take all four tests back to back before exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Belgium Motorcycle Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="bemoto" />

      <ExamRelatedTests examId="bemoto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Belgian Motorcycle Theory Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions in English for categories A1, A2 and A.</p>
          <ExamLandingCTA dashboardHref="/belgium-motorcycle-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

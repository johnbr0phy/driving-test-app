import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/grdriving";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Greece Driving Theory Test 2026 in English - Free Category B Practice";
const metaDescription =
  "Free Greek driving theory test practice in English: 200 original category B questions on Greek road rules and signs, six 30-question mock tests and every answer explained.";
const description =
  "Free practice in English for the Greek driving theory test, category B: 200 original questions on Greek road signs, markings, priority at junctions and roundabouts, the 2025 Highway Code speed limits, overtaking, parking, alcohol limits, safety and emergencies. Six 30-question mock tests at the 29 of 30 pass line guides report, and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "greece driving theory test, greek driving theory test in english, greek driving licence test, category b theory test greece, greek highway code test, kok theory test, driving licence greece english, greek road signs test, driving test athens, driving test thessaloniki, theory test practice 2026",
  alternates: {
    canonical: `${siteUrl}/greece-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/greece-driving-theory-test`,
    images: [{ url: shareImageUrl("grdriving"), width: 1200, height: 630, alt: "Tigertest free Greece driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("grdriving")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Greek driving theory test like?",
    a: "It is a multiple-choice test taken on a computer at a Transport Directorate exam centre. Questions are drawn at random from the Ministry of Infrastructure and Transport's question bank and cover road signs, priority, speed, overtaking, parking, safety and what to do in an emergency. Guides and the Greek motoring press describe the category B test as 30 questions in 35 minutes, with a pass at 29 correct, so only one mistake is allowed. Check the current rule with your driving school.",
  },
  {
    q: "Can I take the Greek theory test in English?",
    a: "Yes. Greek law makes the theory questionnaires available in foreign languages as well as in Greek, in Greek with audio and in Greek Sign Language. English is one of them; parliamentary questions also mention Russian and Albanian. Your driving school books the test and the language when it registers you.",
  },
  {
    q: "Which rules changed with the 2025 Highway Code?",
    a: "Law 5209/2025, the new Highway Code, came into force in September 2025. From 1 January 2026 it lowered the general limit in built-up areas to 30 km/h unless signs say otherwise, kept 50 km/h on some multi-lane town roads, and brought in heavier penalties that rise each time an offence is repeated. Outside towns the car limits are 90 km/h, 110 km/h on expressways and 130 km/h on motorways. Tigertest's questions follow the Code as in force in November 2026 and ask no fine amounts.",
  },
  {
    q: "Who can get a category B licence in Greece?",
    a: "You can hold a full category B licence from 18. Since 2021, a 17-year-old who trains and passes the tests can drive accompanied on a provisional licence until turning 18. You train through a licensed driving school, pass the theory test, then the practical driving test. The practical test is not modelled here.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from the Greek Highway Code and the road sign rules Greece applies, so it tests the same knowledge without copying the official question bank. The real test shows sign pictures; here signs are described in words, so study pictures of Greek signs too. It is free practice, not affiliated with the Greek Ministry of Infrastructure and Transport or any Transport Directorate, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Greece Driving Theory Practice Test",
      description,
      url: `${siteUrl}/greece-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      featureList: [
        "200 Greek road rule and road sign questions in English",
        "6 mock tests of 30 questions",
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
  { name: "Warning Signs", weight: "13%" },
  { name: "Priority, Prohibition & Mandatory Signs", weight: "13%" },
  { name: "Information Signs, Markings & Signals", weight: "13%" },
  { name: "Junctions, Roundabouts & Priority", weight: "13%" },
  { name: "Speed, Distances & Overtaking", weight: "13%" },
  { name: "Licences, Alcohol & the Law", weight: "10%" },
  { name: "Parking & Sharing the Road", weight: "10%" },
  { name: "Vehicle, Passengers & Safe Driving", weight: "7%" },
  { name: "Night, Weather, Motorways & Emergencies", weight: "7%" },
];

export default function GreeceDrivingTheoryLandingPage() {
  return (
    <div data-theme="grdriving" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Greece Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/greece-driving-theory/dashboard"
            shortName="Theory test"
            subtitle="200 original questions in English on the Greek Highway Code and road signs: priority from the right, roundabouts, the 2025 speed limits, overtaking, parking and emergencies. Six 30-question mock tests where one mistake is all you can afford. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/grdriving-mobile.png", desktop: "/landing/grdriving-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="grdriving" />

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
                Five training sets cover warning signs, priority and regulatory signs, markings and junctions, speed and parking, and licences, safety and emergencies. Questions you miss come back until you have mastered them.
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
                Six tests of 30 questions, the length guides report for category B, with a pass at 29. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the Greek Highway Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The questions follow Greece&apos;s own rules as in force in November 2026: right-hand traffic, priority from the right where nothing else is signed, roundabouts governed by their signs, the 2025 Highway Code&apos;s speed limits and the 0.5 and 0.2 g/l alcohol limits. The Ministry publishes no topic weights, so the split below is Tigertest&apos;s, with signs and priority weighted most. Signs are described in words, and no fine amounts are asked because they changed in 2025.
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
                src={getTigerAsset("grdriving", 1)}
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
            How to Pass the Greek Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Train for near-perfect scores</h3>
              <p>
                With one mistake allowed in 30, a candidate who knows 90% of the rules still fails most attempts. Practise until you score 29 or 30 in every mock test, not just a pass on a good day.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Master priority from the right</h3>
              <p>
                Greece gives priority to traffic from the right wherever no sign, signal or officer says otherwise, and that includes a roundabout with no signs at all. Most roundabouts have a give way sign at the entry, which gives traffic already circulating priority. Read the signs at each one.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the 2025 Highway Code numbers</h3>
              <p>
                Older study material gives 50 km/h in towns. Under the 2025 Code most town streets are 30 km/h unless signed, while one-way streets with two marked lanes keep 50. Learn 90, 110 and 130 km/h outside towns, and the 0.2 g/l alcohol limit for your first two years.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Study the sign pictures too</h3>
              <p>
                The real test shows pictures of signs. Tigertest describes them in words, so look at pictures of Greek warning, regulatory and information signs as you train, and pay attention to the Greek words you will see, such as STOP and αδιέξοδο.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Greece Driving Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="grdriving" />

      <ExamRelatedTests examId="grdriving" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Greek Driving Licence?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions in English on the Greek Highway Code and road signs.</p>
          <ExamLandingCTA dashboardHref="/greece-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Malaysia KPP01 Practice Test 2026 - Free JPJ Theory Test";
const metaDescription =
  "Free KPP01 practice test for the JPJ theory exam: 200 original questions, four 50-question mock tests with the 42-of-50 pass mark, every answer explained.";
const description =
  "Free practice for Malaysia's JPJ KPP01 computer theory test (Ujian Undang-Undang Bahagian 1) for a car licence: 200 original questions on road signs, road markings and traffic lights, traffic rules and right of way, speed and expressways, parking, licences and the law, defensive driving, and breakdowns and crashes. Four mock tests of 50 questions with the 42 of 50 pass mark, and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "kpp01 practice test, jpj theory test, ujian kpp01, kpp test malaysia, soalan kpp01, malaysia driving theory test, ujian undang-undang bahagian 1, ldl test malaysia, kpp gabungan, jpj computer test 2026",
  alternates: {
    canonical: `${siteUrl}/malaysia-kpp01-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/malaysia-kpp01-practice-test`,
    images: [{ url: shareImageUrl("mykpp"), width: 1200, height: 630, alt: "Tigertest free Malaysia KPP01 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("mykpp")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "How many questions are on the KPP01 theory test and what is the pass mark?",
    a: "JPJ's KPP FAQ lists the car KPP01 computer test as 50 questions in 45 minutes, with 42 correct needed to pass. Since 29 August 2025, candidates on the combined motorcycle and car module (KPP Gabungan) sit one 70-question test in 1 hour 15 minutes and need 56 correct, which is 80%. The mock tests here are 50 questions with the 42 of 50 pass mark.",
  },
  {
    q: "What topics does the KPP01 test cover?",
    a: "Road signs, road markings and traffic lights, traffic rules and right of way, speed limits and expressway driving, parking, licences and the Road Transport Act, defensive driving and what to do after a breakdown or crash. Study guides say the 50-question test has three parts: 15 sign questions, 25 traffic rule questions and 10 on law, safety and KEJARA. JPJ does not publish a breakdown, so treat that as what guides say.",
  },
  {
    q: "What happens after I pass KPP01?",
    a: "You receive a Learner's Driving Licence (LDL) and start practical training at a JPJ-registered driving institute: circuit training and road training under the JPJ curriculum. With an LDL you may drive only under a driving institute instructor or a JPJ examiner, with L plates shown. After you pass the JPJ circuit and road tests you get a probationary licence (PDL), valid for 2 years with P plates front and back, and then convert it to a competent driving licence (CDL).",
  },
  {
    q: "How old must I be to get a car licence in Malaysia?",
    a: "You must be at least 17 to apply for a class D car licence. Register with a driving institute, attend the KPP01 class and sit the computer theory test there or at JPJ.",
  },
  {
    q: "Are these the real KPP01 questions?",
    a: "No. Every question is original, written by Tigertest from Malaysian road law and JPJ guidance, so it tests the same rules without copying the official bank or any app. Signs are described in words, so study the sign pictures in your KPP handbook too. It is free revision, not an official JPJ test, and it does not book or replace your theory test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Malaysia KPP01 Practice Test",
      description,
      url: `${siteUrl}/malaysia-kpp01-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
      featureList: [
        "200 KPP01 practice questions",
        "4 mock tests of 50 questions with the 42 of 50 pass mark",
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
  { name: "Road Signs", weight: "22%" },
  { name: "Traffic Rules & Right of Way", weight: "20%" },
  { name: "Defensive Driving & Hazards", weight: "14%" },
  { name: "Speed, Lanes & Expressways", weight: "12%" },
  { name: "Licences, Law & KEJARA", weight: "12%" },
  { name: "Road Markings & Traffic Lights", weight: "8%" },
  { name: "Parking & Stopping", weight: "6%" },
  { name: "Breakdowns & Crashes", weight: "6%" },
];

export default function MalaysiaKpp01LandingPage() {
  return (
    <div data-theme="mykpp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Malaysia KPP01 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/malaysia-kpp/dashboard"
            shortName="KPP01"
            subtitle="200 original questions for the JPJ computer theory test: road signs, markings, traffic rules, expressways, parking, licences and the law. Four 50-question mock tests with the 42 of 50 pass mark. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/mykpp-mobile.png", desktop: "/landing/mykpp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="mykpp" />

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
                Five training sets cover every part of the KPP01 syllabus, from BERHENTI and BERI LALUAN signs to expressway emergency lanes. Questions you miss come back until you have mastered them.
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
                Four 50-question tests with the KPP01 pass mark of 42, so you can only drop eight. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on Malaysian Road Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                JPJ does not publish how many questions come from each topic. Study guides say the 50-question test has 15 sign questions, 25 on traffic rules and 10 on law, safety and KEJARA, so each mock test has 15 sign and marking questions, 25 on rules, speed, parking and hazards, and 10 on licences, law and emergencies. Every rule is Malaysia&apos;s own: left-hand traffic, the Malay sign wording, the 110 and 90 km/h national limits, expressway emergency lanes, KEJARA and the LDL and P licence conditions.
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
                src={getTigerAsset("mykpp", 1)}
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
            How to Pass the KPP01 Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the signs by shape, colour and word</h3>
              <p>
                Signs are the biggest single topic. Yellow diamonds warn, red circles forbid and blue circles instruct; green guide signs are for tolled expressways and blue ones for other roads. Learn the Malay words too: BERHENTI, BERI LALUAN, IKUT KIRI, JALAN SEHALA, AWAS, KURANGKAN LAJU and HABIS.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Make a table of the numbers</h3>
              <p>
                The test likes numbers: 110 km/h on expressways and 90 km/h on federal roads unless signed lower, a following gap of at least two seconds (double it in rain), a breath alcohol limit of 22 micrograms per 100 ml, a 2-year P licence, a minimum age of 17 for a car, and 24 hours to report a crash to the police.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the expressway and emergency rules</h3>
              <p>
                The emergency lane is never for overtaking or resting, hazard lights are for a stopped vehicle (not for driving in rain), and after a breakdown you switch them on, put a warning triangle well behind the car and wait off the road. Call 999 in an emergency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above 42</h3>
              <p>
                With only eight mistakes allowed, aim for 46 or more in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four tests back to back before your test day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          KPP01 Theory Test Frequently Asked Questions
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

      <ExamRelatedTests examId="mykpp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your LDL?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every part of the KPP01 syllabus.</p>
          <ExamLandingCTA dashboardHref="/malaysia-kpp/dashboard" />
        </div>
      </div>
    </div>
  );
}

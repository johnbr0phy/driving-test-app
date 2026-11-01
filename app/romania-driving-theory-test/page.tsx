import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/rodrpciv";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Romania Driving Theory Test 2026 in English - Free DRPCIV Practice";
const metaDescription =
  "Free practice for the Romanian category B theory exam in English: 200 original questions on the Codul rutier, seven 26-question mock tests, 22 to pass, every answer explained.";
const description =
  "Free practice in English for the Romanian driving licence theory exam (category B), run by the DGPCI, formerly DRPCIV: 200 original questions on Romanian road signs, markings, priority rules, trams and level crossings, speed limits, overtaking, parking, alcohol, seat belts and accidents. Seven mock tests of 26 questions with 22 to pass, like the real exam, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "romania driving theory test, drpciv test english, chestionare drpciv in english, romanian driving licence theory exam, category b theory test romania, permis auto romania english, dgpci theory exam, codul rutier english, romania driving test questions 2026, foreigner driving licence romania",
  alternates: {
    canonical: `${siteUrl}/romania-driving-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/romania-driving-theory-test`,
    images: [{ url: shareImageUrl("rodrpciv"), width: 1200, height: 630, alt: "Tigertest free Romania driving theory practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rodrpciv")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Romanian driving theory exam like?",
    a: "For category B it is a computer test of 26 questions in 30 minutes, set by the Ministry of Internal Affairs' driving licence directorate (DGPCI, formerly DRPCIV) and taken at your county's driving licence service. You need at least 22 correct answers, so five wrong answers mean a fail. Three practice questions come first and do not count. Each real question has three answers, and one, two or all three can be correct, so you must tick every correct one. There is no hazard perception video.",
  },
  {
    q: "Can I take the Romanian theory test in English?",
    a: "Yes, if you are a foreign national or a citizen of another EU or EEA country or Switzerland. The test is normally in Romanian, and Order MAI 268/2010 lets these candidates ask for English, French or German on the exam application. Romanian citizens of the Hungarian and German minorities may take it in their mother tongue. Official practice material is in Romanian, which is why Tigertest's questions are written in English.",
  },
  {
    q: "What do I need before I can sit the test?",
    a: "You must be at least 18 for category B, be medically fit and have completed theory and practical training at an authorised driving school. You apply to the driving licence service where you live, or where you study if you have been studying in Romania for at least six months. If you fail, guides say you can re-sit after at least 15 days. Check the current fee and booking rules with your county service, as they change.",
  },
  {
    q: "Which rules catch candidates out most?",
    a: "Priority rules: priority to the right at unmarked junctions, trams keeping priority unless they turn left, vehicles inside a signed roundabout going first, and having to stop at a level crossing without barriers. Also the 30 km/h in towns and 50 km/h outside rule at unmarked junctions, on ice and near the Children sign, the lower limits for drivers in their first year, and stopping bans within 25 m of crossings, junction corners and bus stops.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from the Romanian traffic code (OUG 195/2002), its implementing regulation and Order MAI 268/2010, so it tests the same knowledge without copying the official question bank. Each Tigertest question has one correct answer, while the real test can have several. Signs are described in words. Tigertest is free practice, not affiliated with the DGPCI, DRPCIV or the Ministry of Internal Affairs, and it does not book or replace your exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Romania Driving Theory Practice Test",
      description,
      url: `${siteUrl}/romania-driving-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "RON" },
      featureList: [
        "200 Romanian traffic rule and road sign questions in English",
        "7 mock tests of 26 questions, 22 to pass",
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
  { name: "Priority, Prohibition & Mandatory Signs", weight: "4 of 26" },
  { name: "Priority, Junctions, Trams & Level Crossings", weight: "4 of 26" },
  { name: "Warning Signs", weight: "3 of 26" },
  { name: "Markings, Lights & Police Signals", weight: "3 of 26" },
  { name: "Speed Limits, Overtaking & Lanes", weight: "3 of 26" },
  { name: "Alcohol, Seat Belts, Lights & Behaviour", weight: "3 of 26" },
  { name: "Licence, Exam & Documents", weight: "2 of 26" },
  { name: "Stopping, Parking & Motorways", weight: "2 of 26" },
  { name: "Breakdowns, Accidents & First Aid", weight: "2 of 26" },
];

export default function RomaniaDrivingTheoryLandingPage() {
  return (
    <div data-theme="rodrpciv" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Romania Driving Theory Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/romania-driving-theory/dashboard"
            shortName="Theory test"
            subtitle="200 original questions in English on the Romanian traffic code for the category B theory exam: signs, priority to the right, trams, level crossings, speed limits, overtaking and parking. Seven 26-question mock tests with 22 to pass, like the real one. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/rodrpciv-mobile.png", desktop: "/landing/rodrpciv-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rodrpciv" />

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
                Four training sets cover road signs, markings and priority rules, speed and parking, and licence, safety and emergencies. Questions you miss come back until you have mastered them.
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
                Seven tests of 26 questions, the length of the real exam, with 22 correct to pass. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on the Romanian Traffic Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Questions follow the Codul rutier (OUG 195/2002), its implementing regulation and the topics listed in Order MAI 268/2010, in the rules in force in 2026: 50 km/h in towns, 90, 100, 120 and 130 km/h outside them, 20 km/h less for drivers in their first year, priority to the right and to trams, and zero tolerance for alcohol. The DGPCI publishes no topic split, so each mock test follows the weights below. Signs are described in words, and each question has one correct answer, while the real exam can have up to three.
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
                src={getTigerAsset("rodrpciv", 1)}
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
            How to Pass the Romanian Theory Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master priority first</h3>
              <p>
                Most hard questions are about who goes first. Give way to the right at unmarked junctions, give way to trams unless they turn left, let vehicles already in a signed roundabout go first, and give way to all traffic when you leave a residential zone, a property or a lesser road joining a national road.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers as a set</h3>
              <p>
                The test loves distances and limits: 25 m from crossings, junction corners and bus stops, 50 m from level crossings, triangles at least 30 m away, signal 50 m before in towns and 100 m outside, 30 or 50 km/h at unmarked junctions and on ice, and 20 km/h less outside towns in your first year.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read every option on the day</h3>
              <p>
                On the real test one, two or all three answers can be correct, and you must tick all the right ones. Do not stop at the first correct option. You may skip a question and come back, and the clock shows your time left.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim for 24 or more</h3>
              <p>
                You may get only four questions wrong. Aim for 24 or more in every mock test, drill the questions you missed, retrain the weakest set, then take all seven tests before your exam day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Romania Driving Theory Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="rodrpciv" />

      <ExamRelatedTests examId="rodrpciv" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Romanian Theory Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions in English on the Romanian traffic code.</p>
          <ExamLandingCTA dashboardHref="/romania-driving-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

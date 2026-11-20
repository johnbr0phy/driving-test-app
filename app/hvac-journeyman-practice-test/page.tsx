import "@/lib/banks/hvacjourney";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free HVAC Journeyman Practice Test 2026 - Mechanical Code Exam Prep";
const metaDescription =
  "HVAC and mechanical journeyman license exam practice, free to start: 200 original questions on the 2024 International Mechanical Code and Fuel Gas Code, with every answer explained.";
const description =
  "Practice for a state or city HVAC or mechanical journeyman license exam, free to start: 200 original questions written from the 2024 International Mechanical Code and International Fuel Gas Code. Four 50-question practice tests and four training sets: equipment location and access; ventilation, exhaust and ducts; chimneys, vents and fuel gas; and boilers, hydronics and refrigeration.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "hvac journeyman practice test, mechanical journeyman exam, journeyman mechanical license, international mechanical code practice test, imc exam questions, hvac license exam, hvacr journeyman exam, fuel gas code questions",
  alternates: {
    canonical: `${siteUrl}/hvac-journeyman-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/hvac-journeyman-practice-test`,
    images: [{ url: shareImageUrl("hvacjourney"), width: 1200, height: 630, alt: "Tigertest HVAC journeyman practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hvacjourney")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the HVAC journeyman exam?",
    a: "It is the written exam a state or city gives before it licenses a journeyman HVAC, HVACR or mechanical worker, who then works under a licensed contractor. There is no single national exam: each licensing board sets its own, usually through PSI, Prometric or ICC, and most are open book on the International Mechanical Code the board has adopted.",
  },
  {
    q: "How many questions are on the journeyman mechanical exam, and what is the passing score?",
    a: "It varies by state. Maryland's HVACR Journeyman exam, for example, is 100 questions in 240 minutes, open book, with 70% to pass, and it also covers electrical, refrigeration theory and safety. Check your own board's candidate bulletin for the count, time, pass mark and allowed books. The practice tests here use 70% as a readiness line.",
  },
  {
    q: "Which edition of the Mechanical Code does my exam use?",
    a: "The one your state or city has adopted, which is often older than the newest model code. ICC publishes a new International Mechanical Code every three years, and 2024 is the current one; many boards still test on the 2018 or 2021 edition, and some amend it. These questions follow the 2024 text, so check any number against the edition your bulletin names.",
  },
  {
    q: "What does this practice test cover?",
    a: "The code knowledge a journeyman installs to: equipment location, garages and access; condensate; ventilation, dryer and range hood exhaust; ducts and plenums; chimneys, vents and clearance reduction; combustion air, CSST bonding and gas piping tests from the Fuel Gas Code; boilers, relief valves and hydronic piping; and refrigeration piping. It does not cover electrical theory, refrigeration theory, load calculations or OSHA safety, which many state exams also include.",
  },
  {
    q: "Are these real exam questions?",
    a: "No. Every question is original, written by Tigertest from the 2024 International Mechanical Code and International Fuel Gas Code. Tigertest is not affiliated with the International Code Council, PSI, Prometric or any state licensing board, and no real exam or prep book question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - HVAC Journeyman Practice Test",
      description,
      url: `${siteUrl}/hvac-journeyman-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hvacjourney"),
      featureList: [
        "200 HVAC journeyman practice questions",
        "4 practice tests of 50 questions",
        "4 training sets by code topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("hvacjourney"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Equipment Location & Installation", weight: "16%" },
  { name: "Ventilation & Exhaust Systems", weight: "14%" },
  { name: "Duct Systems & Plenums", weight: "14%" },
  { name: "Access, Service Space & Condensate", weight: "12%" },
  { name: "Chimneys, Vents & Clearances", weight: "12%" },
  { name: "Combustion Air & Gas Piping", weight: "12%" },
  { name: "Boilers & Hydronic Piping", weight: "12%" },
  { name: "Refrigeration Systems", weight: "8%" },
];

export default function HvacJourneymanLandingPage() {
  return (
    <div data-theme="hvacjourney" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free HVAC Journeyman Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/hvac-journeyman/dashboard"
            shortName="HVAC Journeyman"
            subtitle="200 original questions on the 2024 International Mechanical Code and Fuel Gas Code: equipment location, access, condensate, exhaust, ducts, vents, combustion air, gas piping, boilers and refrigeration. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/hvacjourney-mobile.png", desktop: "/landing/hvacjourney-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hvacjourney" />

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
                Four training sets that follow the Mechanical Code: equipment location and access; ventilation, exhaust and ducts; chimneys, vents and fuel gas; and boilers, hydronics and refrigeration. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions across the whole code, each with a 70% readiness line. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on the 2024 Mechanical Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                No board publishes a per-chapter split, so each 50-question practice test spreads the code the way a journeyman meets it on the job: 8 on equipment location, 7 each on exhaust and ducts, 6 each on access, vents, fuel gas and hydronics, and 4 on refrigeration.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("hvacjourney", 3)}
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
            How to Pass the HVAC Journeyman Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get your own code book</h3>
              <p>
                Most journeyman exams are open book, so the edition your board names is your most important tool. Tab the chapters (3 general, 4 and 5 ventilation and exhaust, 6 ducts, 8 vents, 10 boilers, 11 refrigeration, 12 hydronics) and the Fuel Gas Code&apos;s combustion air and piping test sections.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers that come up most</h3>
              <p>
                18 inches to an ignition source in a garage, a 30 by 30 inch service space, 1/8 inch per foot for condensate, 35 feet for a dryer duct, 10 feet between intakes and exhaust, 50 cubic feet per 1,000 Btu/h for combustion air. Knowing them saves time for the look-ups.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the calculations</h3>
              <p>
                Dryer duct length after fittings, combustion air opening sizes, dwelling outdoor air by Equation 4-9, connector length as a share of vent height, and test pressures with their minimums. Write the formula, then put the numbers in.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Check what else your state tests</h3>
              <p>
                Many state outlines add electrical controls, refrigeration theory, load calculations and OSHA safety to the code. Read your bulletin, study those too, then take the 50-question tests here and aim for 85% before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          HVAC Journeyman Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hvacjourney" />
        </div>
      </div>

      <ExamSampleQuestions examId="hvacjourney" />

      <ExamRelatedTests examId="hvacjourney" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your HVAC Journeyman Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the Mechanical and Fuel Gas Codes.</p>
          <ExamLandingCTA dashboardHref="/hvac-journeyman/dashboard" />
        </div>
      </div>
    </div>
  );
}

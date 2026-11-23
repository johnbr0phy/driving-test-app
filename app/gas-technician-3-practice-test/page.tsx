import "@/lib/banks/cagas3";
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

const title = "G3 Gas Technician Practice Test 2026 - Free TSSA G3 Exam Questions";
const metaDescription =
  "Free TSSA Gas Technician 3 (G3) practice test for Ontario: 200 original questions on gas properties, O. Reg. 212/01 and 215/01, the B149.1-25 Ontario amendments, piping, electricity, venting and safety. Four 50-question tests, every answer explained.";
const description =
  "Practice for the TSSA Gas Technician 3 (G.3) certification exam in Ontario: 200 original multiple-choice questions written from the G.3 curriculum modules 1 to 9, Ontario Regulation 212/01 (Gaseous Fuels), Ontario Regulation 215/01 (Fuel Industry Certificates), TSSA's Gaseous Fuels Code Adoption Document amendment adopting CSA B149.1-25, and public safety references. Four 50-question practice tests and four training sets: safety and tools; gas properties, codes and acts; electricity, drawings and customers; and piping, tubing and appliances.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "g3 practice test, g3 gas technician practice test, tssa g3 exam, gas technician 3, g3 gas license ontario, tssa practice test, g3 exam questions, ontario gas technician, b149.1 practice questions, g3 test 2026",
  alternates: {
    canonical: `${siteUrl}/gas-technician-3-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/gas-technician-3-practice-test`,
    images: [{ url: shareImageUrl("cagas3"), width: 1200, height: 630, alt: "Tigertest G3 gas technician practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cagas3")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the G3 gas technician certificate?",
    a: "The Gas Technician 3 (G.3) is Ontario's entry-level gas certificate under Ontario Regulation 215/01, issued by the Technical Standards and Safety Authority (TSSA). Working under the general supervision of a G.1, G.2 or DA holder, and once those skills are signed off, a G.3 may install, test and purge gas piping under 2-1/2 inches up to the appliance control valve, reactivate existing appliances, clean them and service vent connectors. A G.3 may not do the first activation of a new appliance.",
  },
  {
    q: "What score do I need to pass the TSSA G3 exam?",
    a: "TSSA's Gas Technician policies require 75% on the TSSA certification exam, 75% in each curriculum module and 75% on the practical evaluation. The exam is multiple choice, and candidates may bring the permitted references: the Technical Standards and Safety Act, the fuels regulations and code adoption documents, CSA B149.1 and CSA B149.2. TSSA does not publish the G3 question count; its preparation guide says exams run from 50 to 165 questions and up to three and a half hours, depending on the certificate.",
  },
  {
    q: "What does the G3 training cover?",
    a: "TSSA's G.3 program is curriculum modules 1 to 9, a suggested 180 hours: protecting yourself and others; fasteners, hand and power tools; properties and safe handling of propane and natural gas; installation codes, acts and regulations; an introduction to electricity; manuals, specifications, schematics, drawings and graphs; customer relations; piping and tubing systems; and gas appliances.",
  },
  {
    q: "Which edition of the gas code applies in Ontario?",
    a: "TSSA's Gaseous Fuels Code Adoption Document amendment FS-279-26 adopts CSA B149.1-25 with Ontario amendments, effective June 1, 2026. The amendments add Ontario rules such as the 15 inch burial depth, the pressure test tag, the heating-season check of natural draft boilers and the chimney liner deadlines. Where the amendment and B149.1 conflict, the amendment prevails.",
  },
  {
    q: "Are these real TSSA G3 exam questions?",
    a: "No. TSSA does not publish practice exams, and every question here is original, written by Tigertest from the regulations, TSSA's public code adoption document and public safety references. CSA code text and the paid training modules are not reproduced. It is practice, not affiliated with TSSA or CSA Group, and it does not replace an accredited G3 program.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - G3 Gas Technician Practice Test",
      description,
      url: `${siteUrl}/gas-technician-3-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cagas3"),
      featureList: [
        "200 G3 practice questions",
        "4 practice tests of 50 questions",
        "4 training sets by curriculum module",
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
        classFaqJsonLd("cagas3"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Protect self and others", weight: "12%" },
  { name: "Fasteners, hand and power tools", weight: "8%" },
  { name: "Natural gas and propane properties", weight: "14%" },
  { name: "Codes, acts and regulations", weight: "16%" },
  { name: "Introduction to electricity", weight: "12%" },
  { name: "Manuals, drawings and customer relations", weight: "10%" },
  { name: "Piping and tubing systems", weight: "16%" },
  { name: "Gas appliances and venting", weight: "12%" },
];

export default function GasTech3LandingPage() {
  return (
    <div data-theme="cagas3" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free G3 Gas Technician Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/gas-technician-3/dashboard"
            shortName="G3 Gas Technician"
            subtitle="200 TSSA G3 questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cagas3-mobile.png", desktop: "/landing/cagas3-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cagas3" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Module</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets that follow the G.3 curriculum: safety and tools; gas properties, codes and acts; electricity, drawings and customers; and piping, tubing and appliances. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions that mix all nine modules, with the same 75% pass line TSSA uses. No question appears in more than one test, and every explanation names the regulation, Ontario amendment or principle behind the answer.
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
                Built on the G.3 Modules and Ontario Law
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                TSSA&apos;s G.3 program is curriculum modules 1 to 9. The legal questions come from Ontario Regulation 212/01, Ontario Regulation 215/01 and TSSA&apos;s public Ontario amendments to CSA B149.1-25. TSSA publishes no topic weights for the G3 exam, so each practice test spreads its 50 questions as below.
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
                src={getTigerAsset("cagas3", 3)}
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
            How to Pass Your G3 Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know what a G3 may and may not do</h3>
              <p>
                Section 22 of O. Reg. 215/01 is short: learn the four general-supervision tasks, the 2-1/2 inch piping limit, the difference between general and direct supervision, and the one thing a G3 never does under general supervision, the first activation of a new appliance.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the unacceptable condition steps</h3>
              <p>
                O. Reg. 212/01 sets out what to do when an appliance is an immediate hazard: shut it off, tell the distributor and the user, tag it, and send written notice within 14 days. Know who may remove a tag and the 90-day limit when there is no immediate hazard.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Use your code book like a reference</h3>
              <p>
                The exam is open book with the permitted references, so practise finding Ontario&apos;s amendments quickly: burial depth, valve placement, the pressure test tag, boiler checks and chimney liner deadlines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill the arithmetic</h3>
              <p>
                Ohm&apos;s law, flow from input and heating value, inches of water column to psi, and combustion air are quick marks once the steps are automatic. Aim for 75% or better on every practice test here before you book your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          G3 Gas Technician Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cagas3" />
        </div>
      </div>

      <ExamSampleQuestions examId="cagas3" />

      <ExamRelatedTests examId="cagas3" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your G3 Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on gas safety, Ontario law, piping, electricity and appliances.</p>
          <ExamLandingCTA dashboardHref="/gas-technician-3/dashboard" />
        </div>
      </div>
    </div>
  );
}

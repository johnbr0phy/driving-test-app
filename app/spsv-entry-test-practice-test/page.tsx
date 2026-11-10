import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/iespsv";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "SPSV Entry Test Practice 2026 - Free Taxi Industry Knowledge Mock Tests (Ireland)";
const metaDescription =
  "Free practice for the SPSV Driver Entry Test Industry Knowledge module in Ireland: 200 original questions from the NTA's Official Manual, three 54-question mock tests with the real 75% pass line, every answer explained.";
const description =
  "Free practice for the Industry Knowledge module of the SPSV Driver Entry Test that taxi, hackney and limousine drivers in Ireland must pass before applying for an SPSV driver licence: 200 original practice questions written from the NTA's Official Manual for Operating in the SPSV Industry (Edition 8.1, September 2026). Three mock tests of 54 questions with the real 75 percent pass line, and five training sets covering the industry and driver licensing, vehicle standards and licensing, operating rules and fares, customer service and passengers with disabilities, and routes, business and safety.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "spsv entry test, spsv driver entry test, spsv practice test, taxi test ireland, industry knowledge test, nta taxi test, spsv industry knowledge questions, hackney licence test ireland, taxi licence ireland 2026",
  alternates: {
    canonical: `${siteUrl}/spsv-entry-test-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/spsv-entry-test-practice-test`,
    images: [{ url: shareImageUrl("iespsv"), width: 1200, height: 630, alt: "Tigertest free SPSV Entry Test practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("iespsv")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the SPSV Driver Entry Test?",
    a: "It is the computer test that everyone must pass before applying to An Garda Síochána for an SPSV driver licence to drive a taxi, hackney or limousine in Ireland (it is not needed for a local area hackney driver licence). The National Transport Authority runs it at five test locations. It has two modules: Industry Knowledge, 54 questions on SPSV regulations and good practice, and Area Knowledge, 36 questions on the county you want to work in.",
  },
  {
    q: "How many questions are there and what is the pass mark?",
    a: "The full test has 90 multiple-choice questions: 54 in the Industry Knowledge module, with 54 minutes, and 36 in the Area Knowledge module, with 36 minutes. You need 75 percent in each module. If you pass one and fail the other, you retake only the failed module, but you must pass it within 12 months or sit the whole test again. Each mock test here has 54 questions with the same 75 percent line, 41 correct.",
  },
  {
    q: "What should I study for the Industry Knowledge module?",
    a: "The NTA says its Official Manual for Operating in the SPSV Industry is the only material you need for this module (Edition 8.1, September 2026, with an audio version). It covers the SPSV industry, driver licensing, choosing a vehicle, vehicle licensing, working as an SPSV operator, finding your way around, fares, customer service, running your business and staying safe. The training sets here follow those chapters.",
  },
  {
    q: "Does this cover the Area Knowledge module?",
    a: "No. The Area Knowledge module asks about the streets, routes, hotels, hospitals, landmarks and transport hubs of the county you choose, and is not modelled here. Study it with maps of your county and by driving the area. Some real Industry Knowledge questions ask you to pick two answers; here every question has one answer.",
  },
  {
    q: "Are these the real SPSV Entry Test questions?",
    a: "No. Every question is original, written by Tigertest from the NTA's Official Manual, to test the same knowledge without copying the real test or the Manual's sample questions. Tigertest is free revision and is not affiliated with the National Transport Authority or An Garda Síochána; it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SPSV Entry Test Practice",
      description,
      url: `${siteUrl}/spsv-entry-test-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("iespsv", "EUR"),
      featureList: [
        "200 original SPSV Industry Knowledge practice questions",
        "3 mock tests of 54 questions with a 75% pass line",
        "5 training sets by Manual chapter",
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
  { name: "The SPSV Industry & the NTA", weight: "4 of 54" },
  { name: "SPSV Driver Licensing", weight: "6 of 54" },
  { name: "Vehicle Standards & Age Rules", weight: "5 of 54" },
  { name: "Vehicle Licensing", weight: "5 of 54" },
  { name: "Working as an SPSV Operator", weight: "8 of 54" },
  { name: "Finding Your Way Around", weight: "3 of 54" },
  { name: "Fares, Receipts & Payment", weight: "5 of 54" },
  { name: "Customer Service & Complaints", weight: "5 of 54" },
  { name: "Passengers with Disabilities", weight: "4 of 54" },
  { name: "Running Your SPSV Business", weight: "3 of 54" },
  { name: "Staying Safe", weight: "6 of 54" },
];

export default function SpsvEntryTestLandingPage() {
  return (
    <div data-theme="iespsv" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SPSV Entry Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/spsv-entry-test/dashboard"
            shortName="SPSV Entry Test"
            subtitle="200 original practice questions for the Industry Knowledge module, written from the NTA's Official Manual: licensing, vehicles, ranks and bus lanes, fares, customer service and safety. Three 54-question mock tests at the real 75% pass line. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/iespsv-mobile.png", desktop: "/landing/iespsv-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="iespsv" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Manual Chapter</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets cover the ten study chapters of the Official Manual: the industry and driver licensing, vehicles and vehicle licensing, operating rules and fares, customers and accessibility, and routes, business and safety. Questions you miss come back until you have mastered them.
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
                Three mock tests of 54 questions, the length of the real Industry Knowledge module, each needing 41 correct (75%) to pass. No question appears in more than one test, and every one comes with an explanation from the Manual.
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
                Built on the NTA&apos;s Official Manual
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The NTA does not publish how many questions come from each chapter, so each mock test here follows the Manual&apos;s own balance. Working as an SPSV operator, driver licensing and staying safe get the most questions. The county Area Knowledge module is not modelled.
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
                src={getTigerAsset("iespsv", 1)}
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
            How to Pass the Industry Knowledge Module
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn who does what</h3>
              <p>
                An Garda Síochána grants driver licences; the NTA licenses vehicles and dispatch operators, issues your display card and smart card and runs compliance. Local authorities run taxi ranks, the Legal Metrology Service seals taximeters and ComReg licenses two-way radios.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers</h3>
              <p>
                Many questions turn on one figure: eight passengers and 3,500 kg, an NCT within 90 days, 11 hours on any three days in a row, 21 days to report a new address, 30 km for refusing a taxi trip, renewal windows of three months (driver) and 60 days (vehicle), and vehicle age limits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know taxis from hackneys</h3>
              <p>
                Only taxis stand at ranks, ply for hire, use with-flow bus lanes and run a taximeter with a printed receipt. Hackneys and limousines are pre-booked at an agreed fare, carry a booking document and give a written receipt.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by chapter. Aim for 46 or more out of 54 on every mock test before the real one, then drill the questions you missed and retrain the weakest chapter.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SPSV Entry Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="iespsv" />

      <ExamRelatedTests examId="iespsv" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your SPSV Entry Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every chapter of the Manual.</p>
          <ExamLandingCTA dashboardHref="/spsv-entry-test/dashboard" />
        </div>
      </div>
    </div>
  );
}

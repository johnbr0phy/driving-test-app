import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "SERU Practice Test 2026 - Free London PHV SERU Mock Tests";
const metaDescription =
  "Free SERU practice for London private hire drivers: 200 original questions based on the published PHV Driver's Handbook, five 36-question mock tests with a 60% pass line, every answer explained.";
const description =
  "Free practice for the SERU (Safety, Equality and Regulatory Understanding) assessment that London private hire (PHV) drivers take: 200 original practice questions based on the published SERU guide, the PHV Driver's Handbook. Five mock tests of 36 questions with a 60 percent pass line, and five training sets covering licensing, vehicles, private hire journeys, staying safe, driver behaviour, driving and parking in London, safer driving, equality and disability, safeguarding and ridesharing.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "seru practice test, seru assessment, seru mock test, tfl seru test questions, pco seru test, private hire seru, phv driver handbook questions, seru test 2026, london minicab driver test",
  alternates: {
    canonical: `${siteUrl}/seru-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/seru-practice-test`,
    images: [{ url: shareImageUrl("ukseru"), width: 1200, height: 630, alt: "Tigertest free SERU practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ukseru")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the SERU assessment?",
    a: "SERU stands for Safety, Equality and Regulatory Understanding. It is a computer-based assessment that people applying for, or holding, a London private hire (PHV) driver's licence take at a TfL assessment centre. It tests what is in the PHV Driver's Handbook, and passing it also shows the English reading and writing skills a London PHV licence needs.",
  },
  {
    q: "How many questions are there and what is the pass mark?",
    a: "TfL describes multiple-choice and sentence-completion questions based on the handbook. Driver guides report about 36 to 37 questions, including two short reading passages, in 45 to 60 minutes, with a pass mark of about 60 percent. TfL can change the format, so check the details in your booking. Each mock test here has 36 questions and a 60 percent pass line, 22 correct.",
  },
  {
    q: "What should I study for SERU?",
    a: "Study the PHV Driver's Handbook (version 1.0, September 2021, the latest version we could find in October 2026; TfL names the version to study if it changes). Its ten sections are London PHV driver licensing, licensing requirements for PHVs, carrying out private hire journeys, staying safe, driver behaviour, driving and parking in London, safer driving, equality and disability, safeguarding children and adults at risk, and ridesharing. The training sets here follow those sections.",
  },
  {
    q: "Does this practice test include the sentence-completion questions?",
    a: "Partly. On the real assessment you complete sentences by picking a word from a list; here every item is four-option multiple choice, and many are written as sentence completions so you practise picking the missing fact. The two reading and understanding passages are not modelled.",
  },
  {
    q: "Are these the real SERU questions?",
    a: "No. These are original practice questions based on the published SERU guide, the PHV Driver's Handbook, written by Tigertest. They test the same handbook knowledge without copying the real assessment. Tigertest is free revision and is not connected with TfL; it does not book or replace your SERU assessment.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SERU Practice Test",
      description,
      url: `${siteUrl}/seru-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 original SERU practice questions",
        "5 mock tests of 36 questions with a 60% pass line",
        "5 training sets by handbook section",
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
  { name: "London PHV Driver Licensing", weight: "17%" },
  { name: "Licensing Requirements for PHVs", weight: "6%" },
  { name: "Carrying Out Private Hire Journeys", weight: "14%" },
  { name: "Staying Safe", weight: "11%" },
  { name: "Driver Behaviour", weight: "8%" },
  { name: "Driving & Parking in London", weight: "14%" },
  { name: "Safer Driving", weight: "11%" },
  { name: "Equality & Disability", weight: "11%" },
  { name: "Safeguarding Children & Adults at Risk", weight: "6%" },
  { name: "Ridesharing", weight: "3%" },
];

export default function SeruLandingPage() {
  return (
    <div data-theme="ukseru" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SERU Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/seru/dashboard"
            shortName="SERU"
            subtitle="200 original practice questions based on the published SERU guide, the PHV Driver's Handbook: licensing, red routes and bus lanes, passenger safety, equality and safeguarding. Five 36-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukseru-mobile.png", desktop: "/landing/ukseru-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukseru" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Handbook Section</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets cover all ten sections of the handbook: licensing and vehicles, journeys and ridesharing, staying safe and driver behaviour, driving and parking in London, and equality and safeguarding. Questions you miss come back until you have mastered them.
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
                Five mock tests of 36 questions, about the length of the real assessment, each needing 22 correct (60%) to pass. No question appears in more than one test, and every one comes with an explanation from the handbook.
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
                Built on the PHV Driver&apos;s Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                TfL does not publish how many questions come from each section, so each mock test here follows the handbook&apos;s own balance: licensing, journeys and London&apos;s parking and stopping rules get the most questions, as they fill the most pages.
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
                src={getTigerAsset("ukseru", 1)}
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
            How to Pass SERU
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers</h3>
              <p>
                Many questions turn on one figure: apply at 21 with a driving licence held three years, B1 English, a three-year driver&apos;s licence and a one-year vehicle licence, 7 days to show or return a licence, 21 days to report a new address, 72 hours to report a collision, medicals at every renewal from 45 and every year from 65, and the red route cashpoint stop from 22:00 to 06:00 for up to 5 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know where a PHV can and cannot stop</h3>
              <p>
                You can pick up and set down briefly on yellow and red lines and in most bus lanes, but never wait there. Never stop on zig-zags, bus stop clearways or taxi ranks, never drive along a bus lane, and never use an electric taxi charging point.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Put the passenger first</h3>
              <p>
                Equality, safeguarding and behaviour questions reward the professional answer: ask before helping, carry assistance dogs in the footwell with no extra charge, report concerns to your operator and the police, and never use a passenger&apos;s details for anything but the booking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by handbook section. Aim for 30 or more out of 36 on every mock test before your assessment. After each test, drill the questions you missed and retrain the weakest section.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SERU Frequently Asked Questions
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

      <ExamRelatedTests examId="ukseru" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass SERU?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every section of the handbook.</p>
          <ExamLandingCTA dashboardHref="/seru/dashboard" />
        </div>
      </div>
    </div>
  );
}

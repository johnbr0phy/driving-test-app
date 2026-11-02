import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "Journeyman Electrician Practice Test 2026 - Free, 2023 NEC";
const metaDescription =
  "Free journeyman electrician practice test: 200 original 2023 NEC questions on grounding, wiring methods, load calculations, motors and theory, with every answer explained.";
const description =
  "Free practice for the journeyman electrician license exam: 200 original questions written from the 2023 National Electrical Code and electrical theory. Four 50-question mock tests with a 70 percent pass line and five training sets covering general requirements, theory and calculations, branch circuits and services, grounding and bonding, wiring methods, equipment, motors and special occupancies.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "journeyman electrician practice test, journeyman electrician exam, journeyman electrical exam practice, 2023 nec practice test, nec code exam questions, electrician license test, journeyman electrician test questions, electrical exam prep 2026",
  alternates: {
    canonical: `${siteUrl}/journeyman-electrician-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/journeyman-electrician-practice-test`,
    images: [{ url: shareImageUrl("jelec"), width: 1200, height: 630, alt: "Tigertest free journeyman electrician practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("jelec")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Journeyman Electrician Practice Test",
      description,
      url: `${siteUrl}/journeyman-electrician-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 journeyman electrician practice questions on the 2023 NEC",
        "4 mock tests of 50 questions with a 70 percent pass line",
        "5 training sets by NEC topic",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the journeyman electrician exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is the written licensing exam most states and many cities require before an electrician can work as a journeyman without direct supervision, usually after about 8,000 hours of supervised work or a completed apprenticeship. It tests the National Electrical Code, electrical theory and calculations, and in many places some state or local law. The exact exam, hours and eligibility rules vary by state.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the exam and what is the passing score?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on where you test. Many states and the ICC national journeyman exam use about 80 multiple-choice questions in roughly four hours, and 70 percent is the most common passing score, though some states set 75 percent. Each mock test here has 50 questions and uses a 70 percent pass line.",
          },
        },
        {
          "@type": "Question",
          name: "Which edition of the NEC is on the exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The edition your state or city has adopted. Many states now test on the 2023 NEC, but some areas still use the 2020 or 2017 edition and others have moved to the 2026 edition. These questions follow the 2023 NEC, so check your exam bulletin for the edition you will be tested on.",
          },
        },
        {
          "@type": "Question",
          name: "Is the journeyman electrician exam open book?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Usually yes. Most journeyman exams let you bring the NEC, often a clean, unmarked copy with permanent tabs only, and you look up much of the answer in the code book during the test. Rules on tabs, highlighting and other references vary, so read your candidate bulletin. Knowing where things are in the Code is what saves time.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real journeyman electrician exam questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the 2023 National Electrical Code and standard electrical theory. They cover the topics the licensing exams test, but this is free practice, not an official exam, and it does not cover your state's own licensing law.",
          },
        },
        classFaqJsonLd("jelec"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "General Requirements & Definitions", weight: "10%" },
  { name: "Electrical Theory & Calculations", weight: "10%" },
  { name: "Branch Circuits, Feeders & Load Calculations", weight: "12%" },
  { name: "Services & Overcurrent Protection", weight: "10%" },
  { name: "Grounding & Bonding", weight: "14%" },
  { name: "Wiring Methods & Materials", weight: "16%" },
  { name: "Equipment for General Use", weight: "8%" },
  { name: "Motors & Air Conditioning", weight: "10%" },
  { name: "Special Occupancies, Equipment & Systems", weight: "10%" },
];

export default function JourneymanElectricianLandingPage() {
  return (
    <div data-theme="jelec" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Journeyman Electrician Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/journeyman-electrician/dashboard"
            shortName="Journeyman Electrician"
            subtitle="200 original questions on the 2023 NEC: grounding, wiring methods, load calculations, motors, services and theory. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/jelec-mobile.png", desktop: "/landing/jelec-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="jelec" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Code Topic</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the Code: basics and theory; branch circuits, feeders and services; grounding and bonding; wiring methods; and equipment, motors and special occupancies. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions, each weighted across the whole Code and needing 70 percent to pass. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the 2023 NEC
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Licensing exams vary by state, and few publish exact counts by topic, so each mock test here follows the usual journeyman weighting: wiring methods and grounding get the most questions, then branch circuits, services, motors and theory. Electrical instructors and apprenticeship programs can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the class misses most.
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
                src={getTigerAsset("jelec", 1)}
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
            How to Pass the Journeyman Electrician Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn where things live in the Code</h3>
              <p>
                The exam is a race against the clock, and most answers are in the book. Know the layout: Article 100 for definitions, 110 for working space, 210 to 230 for circuits and services, 240 for overcurrent, 250 for grounding, 300 and 310 for wiring and ampacity, 430 for motors, 680 for pools, and Chapter 9 for conduit fill.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Master the tables you use most</h3>
              <p>
                A handful of tables answer a large share of questions: conductor ampacity (310.16), adjustment and correction factors, the grounding electrode conductor and equipment grounding conductor tables (250.66 and 250.122), box fill (314.16), burial depth (300.5), motor full-load currents and the motor protection percentages.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practise the calculations by hand</h3>
              <p>
                Ohm&apos;s law, three-phase current, voltage drop, the 125 percent continuous-load rule, box fill, conduit fill, motor branch-circuit sizing and the dwelling load calculation come up again and again. Work each type until you can do it without looking at the formula.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 80 percent or more on every mock test before you sit the exam. After each test, drill the questions you missed and retrain the weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Journeyman Electrician Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the journeyman electrician exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is the written licensing exam most states and many cities require before an electrician can work as a journeyman without direct supervision, usually after about 8,000 hours of supervised work or a completed apprenticeship. It tests the National Electrical Code, electrical theory and calculations, and in many places some state or local law. The exact exam, hours and eligibility rules vary by state.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the exam and what is the passing score?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It depends on where you test. Many states and the ICC national journeyman exam use about 80 multiple-choice questions in roughly four hours, and 70 percent is the most common passing score, though some states set 75 percent. Each mock test here has 50 questions and uses a 70 percent pass line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Which edition of the NEC is on the exam?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The edition your state or city has adopted. Many states now test on the 2023 NEC, but some areas still use the 2020 or 2017 edition and others have moved to the 2026 edition. These questions follow the 2023 NEC, so check your exam bulletin for the edition you will be tested on.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is the journeyman electrician exam open book?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Usually yes. Most journeyman exams let you bring the NEC, often a clean, unmarked copy with permanent tabs only, and you look up much of the answer in the code book during the test. Rules on tabs, highlighting and other references vary, so read your candidate bulletin. Knowing where things are in the Code is what saves time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real journeyman electrician exam questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the 2023 National Electrical Code and standard electrical theory. They cover the topics the licensing exams test, but this is free practice, not an official exam, and it does not cover your state&apos;s own licensing law.
            </p>
          </div>
          <ExamClassFaq examId="jelec" />
        </div>
      </div>

      <ExamRelatedTests examId="jelec" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Journeyman Electrician Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every major part of the NEC.</p>
          <ExamLandingCTA dashboardHref="/journeyman-electrician/dashboard" />
        </div>
      </div>
    </div>
  );
}

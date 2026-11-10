import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/nzheavy";
import { SITE_URL } from "@/lib/siteUrl";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "NZ Class 2 Licence Theory Test 2026 - Free Practice";
const metaDescription =
  "Free practice for New Zealand's Class 2 heavy vehicle theory test: 200 original questions on work time and logbooks, loads, air brakes and sharing the road.";
const description =
  "Free practice for the New Zealand Class 2 (medium rigid) heavy vehicle learner licence theory test with 200 original questions: licence classes and alcohol, work time and logbooks, mass, dimensions and load security, air brakes and vehicle checks, heavy vehicle speed limits and hills, sharing the road and blind spots, and breakdowns and emergencies. Five 35-question practice tests and an explanation on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "class 2 licence NZ, class 2 theory test, NZ heavy vehicle licence test, class 2 learner licence practice test, truck licence NZ, heavy vehicle road code NZ, work time and logbooks NZ, class 2 licence 2026",
  alternates: {
    canonical: `${siteUrl}/nz-class-2-licence-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nz-class-2-licence-practice-test`,
    images: [{ url: shareImageUrl("nzheavy"), width: 1200, height: 630, alt: "Tigertest free NZ Class 2 heavy vehicle licence practice" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("nzheavy")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NZ Class 2 Heavy Vehicle Licence Practice",
      description,
      url: `${siteUrl}/nz-class-2-licence-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("nzheavy", "NZD"),
      featureList: [
        "200 original Class 2 heavy vehicle theory practice questions",
        "5 practice tests of 35 questions",
        "5 training sets by topic",
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
          name: "What is the Class 2 theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is the computer theory test you pass to get a Class 2 learner licence in New Zealand, the first step to driving a medium rigid truck: a rigid vehicle over 6,000 kg and up to 18,000 kg gross laden weight or a combination up to 12,000 kg. You need a full Class 1 licence first. The questions come from the Official New Zealand Road Code for heavy vehicle drivers.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are in the Class 2 theory test and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The heavy vehicle learner theory test is reported to be 35 multiple-choice questions with 33 needed to pass. NZTA's own pages could not be read when this practice test was written, so check the current count and pass mark with NZTA before you book. The practice tests here are 35 questions with 33 needed to pass.",
          },
        },
        {
          "@type": "Question",
          name: "What does the Class 2 theory test cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "What a heavy vehicle driver needs beyond the car Road Code: licence classes and endorsements, work time and logbook rules (5.5 hours before a 30-minute break, 13 hours in a work day, 70 hours before a 24-hour break), mass, dimensions and load restraint, air brakes and daily checks, the 90 km/h heavy vehicle limit, hills, off-tracking and blind spots, and breakdowns and emergencies.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a logbook when I drive a Class 2 truck?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Usually yes. Drivers of vehicles that need a Class 2, 3, 4 or 5 licence, and drivers in a transport service, must keep a logbook of their work time and rest breaks unless an exemption applies. A paper logbook or an NZTA-approved electronic logbook can be used.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real Class 2 theory test questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question here is original, written from New Zealand road rules for heavy vehicle drivers, and road signs are described in words. Tigertest is not affiliated with NZTA Waka Kotahi. It is a study tool, not a licence: you still sit the official theory test and later the practical test.",
          },
        }
      ],
    },
  ],
};

const contentAreas = [
  { name: "Work Time & Logbooks", weight: "6 of 35" },
  { name: "Mass, Dimensions & Loads", weight: "6 of 35" },
  { name: "Air Brakes & Vehicle Checks", weight: "6 of 35" },
  { name: "Speed, Hills & Road Position", weight: "5 of 35" },
  { name: "Sharing the Road & Blind Spots", weight: "5 of 35" },
  { name: "Licences, Classes & Alcohol", weight: "4 of 35" },
  { name: "Weather, Breakdowns & Emergencies", weight: "3 of 35" },
];

export default function NzClass2LicenceLandingPage() {
  return (
    <div data-theme="nzheavy" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NZ Class 2 Licence Theory Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nz-heavy-vehicle-licence/dashboard"
            shortName="Class 2 Theory (NZ)"
            subtitle="200 original questions for New Zealand's Class 2 heavy vehicle theory test: work time and logbooks, loads, air brakes, the 90 km/h limit and sharing the road in a truck. Five 35-question tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/nzheavy-mobile.png", desktop: "/landing/nzheavy-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="nzheavy" />

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
                Five training sets cover every question: licences and work time, loads, brakes and checks, the road, and sharing it with others. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five 35-question tests with a 33 out of 35 target, the pass mark reported for the heavy vehicle learner test, and an explanation of the right answer and the common wrong pick on every question.
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
                Built on New Zealand Rules for Heavy Vehicle Drivers
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NZTA does not publish how many questions come from each topic, so the weights below are Tigertest&apos;s, centred on what a truck driver must know beyond the car Road Code. The rules are New Zealand&apos;s as in force in 2026: the licence classes by gross laden weight, the work time limits and logbooks, the 90 km/h limit for heavy motor vehicles, load restraint, air brakes and the 1 October 2026 rules for passing cyclists and buses. Road signs are described in words. Give way rules and signs for every driver are in our NZ learner licence test.
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
                src={getTigerAsset("nzheavy", 1)}
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
            How to Pass the Class 2 Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Aim for 33 out of 35 or better</h3>
              <p>
                Keep retaking each practice test until you score at least 33 of 35 before you book, and check the official count and pass mark with NZTA.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the work time numbers</h3>
              <p>
                Most lost marks are numbers. Write out 5.5 hours of work time then a 30-minute break, 13 hours in a cumulative work day then 10 hours of continuous rest, and 70 hours in a cumulative work period then a 24-hour break. Then practise the questions that make you do the sums.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your vehicle and its limits</h3>
              <p>
                Learn the licence classes by gross laden weight, the 90 km/h limit for heavy motor vehicles (80 km/h for school buses), the 2.55 m width and 4.3 m height limits, how air brakes and spring brakes work, why you choose a low gear before a descent, and why part-unloading can overload the front axle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Master each training set, take a practice test, then drill the questions you missed and retrain that set until every set is green.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Class 2 Theory Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the Class 2 theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              It is the computer theory test you pass to get a Class 2 learner licence in New Zealand, the first step to driving a medium rigid truck: a rigid vehicle over 6,000 kg and up to 18,000 kg gross laden weight or a combination up to 12,000 kg. You need a full Class 1 licence first. The questions come from the Official New Zealand Road Code for heavy vehicle drivers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are in the Class 2 theory test and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The heavy vehicle learner theory test is reported to be 35 multiple-choice questions with 33 needed to pass. NZTA&apos;s own pages could not be read when this practice test was written, so check the current count and pass mark with NZTA before you book. The practice tests here are 35 questions with 33 needed to pass.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What does the Class 2 theory test cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              What a heavy vehicle driver needs beyond the car Road Code: licence classes and endorsements, work time and logbook rules (5.5 hours before a 30-minute break, 13 hours in a work day, 70 hours before a 24-hour break), mass, dimensions and load restraint, air brakes and daily checks, the 90 km/h heavy vehicle limit, hills, off-tracking and blind spots, and breakdowns and emergencies.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Do I need a logbook when I drive a Class 2 truck?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Usually yes. Drivers of vehicles that need a Class 2, 3, 4 or 5 licence, and drivers in a transport service, must keep a logbook of their work time and rest breaks unless an exemption applies. A paper logbook or an NZTA-approved electronic logbook can be used.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real Class 2 theory test questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question here is original, written from New Zealand road rules for heavy vehicle drivers, and road signs are described in words. Tigertest is not affiliated with NZTA Waka Kotahi. It is a study tool, not a licence: you still sit the official theory test and later the practical test.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="nzheavy" />

      <ExamRelatedTests examId="nzheavy" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Class 2 Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 original questions for New Zealand truck drivers.</p>
          <ExamLandingCTA dashboardHref="/nz-heavy-vehicle-licence/dashboard" />
        </div>
      </div>
    </div>
  );
}

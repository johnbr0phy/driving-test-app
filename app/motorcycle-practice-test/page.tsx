import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Motorcycle Permit Practice Test 2026 - MSF Manual Questions";
const description =
  "Free motorcycle permit practice tests with 200 questions from the MSF Motorcycle Operator Manual that nearly every state test is written from. Gear, control, lane positioning, intersections, hazards and alcohol, with instant feedback.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "motorcycle permit practice test, motorcycle license test, motorcycle written test, MSF motorcycle operator manual, motorcycle DMV test, motorcycle endorsement test, motorcycle permit test questions",
  alternates: {
    canonical: `${siteUrl}/motorcycle-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/motorcycle-practice-test`,
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free Motorcycle Permit Practice Tests",
      description,
      url: `${siteUrl}/motorcycle-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 motorcycle permit practice questions",
        "4 practice tests weighted like the real exam",
        "Training sets for every chapter of the MSF manual",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many questions are on the motorcycle permit test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most states ask 20 to 30 multiple-choice questions and require about 80 percent to pass, for example 20 of 25 in California. A few states let you skip the written test by completing an approved rider course.",
          },
        },
        {
          "@type": "Question",
          name: "What is the motorcycle permit test based on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nearly every state writes its motorcycle knowledge test from the Motorcycle Safety Foundation (MSF) Motorcycle Operator Manual, often reprinted as the state motorcycle handbook. TigerTest's 200 questions follow that manual chapter by chapter.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest motorcycle practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all five training sets are free, with no account required.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover my state's motorcycle laws?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The questions cover the riding knowledge that is the same everywhere: gear, control, positioning, intersections, hazards and alcohol. Helmet laws, permit restrictions and licensing steps vary by state, so check your state's motorcycle handbook for those.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Basic Vehicle Control", weight: "10 of 50" },
  { name: "Positioning & Being Seen", weight: "9 of 50" },
  { name: "Preparing to Ride", weight: "7 of 50" },
  { name: "Intersections & Passing", weight: "7 of 50" },
  { name: "Road Hazards", weight: "6 of 50" },
  { name: "Special Situations", weight: "6 of 50" },
  { name: "Alcohol & Drugs", weight: "5 of 50" },
];

export default function MotorcycleLandingPage() {
  return (
    <div data-theme="moto" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Motorcycle Permit Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/motorcycle/dashboard"
            shortName="motorcycle"
            subtitle="200 questions from the MSF manual your state test is written from. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/moto-mobile.png", desktop: "/landing/moto-desktop.png" }}
          />
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Manual Chapter</h3>
              <p className="text-gray-600">
                Five sets that follow the MSF Motorcycle Operator Manual: preparing to ride, control,
                positioning, intersections and hazards, special situations. Questions you miss come
                back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests weighted the way the manual is. Score 80 percent, the pass mark
                most states use, and you are ready for the real thing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the MSF Motorcycle Operator Manual
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Nearly every state reprints the Motorcycle Safety Foundation manual as its motorcycle
                handbook and writes the permit test from it. Each practice test here draws from every
                chapter in these proportions.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("moto", 1)}
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The motorcycle practice test is brand new. If a question looks wrong or you want your
            state&apos;s rules covered, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Pass the Motorcycle Permit Test
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know your state&apos;s format</h3>
              <p>
                Most states ask 20 to 30 multiple-choice questions and require about 80 percent, for
                example 20 of 25 in California. Some states waive the written test if you complete an
                approved rider course, and most require a car license or permit first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Read the MSF manual, not just the car handbook</h3>
              <p>
                The motorcycle test is about riding: countersteering, using both brakes, lane position,
                the two-second following distance, SEE, and what to do at intersections where most
                motorcycle crashes happen. The car handbook will not get you through it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Train the chapters in order</h3>
              <p>
                Start with Preparing to Ride and Controlling the Motorcycle, then Positioning. Together
                they are more than half of every test. Finish with hazards, special situations, and
                alcohol and drugs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak areas</h3>
              <p>
                TigerTest tracks your accuracy by chapter. After each practice test, go back to the
                training set for the chapter you missed most, then retake until you clear 80 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Motorcycle Permit Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the motorcycle permit test?</h3>
            <p className="text-gray-600">
              Most states ask 20 to 30 multiple-choice questions and require about 80 percent to pass,
              for example 20 of 25 in California. A few states let you skip the written test by
              completing an approved rider course.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is the motorcycle permit test based on?</h3>
            <p className="text-gray-600">
              Nearly every state writes its test from the Motorcycle Safety Foundation (MSF) Motorcycle
              Operator Manual, often reprinted as the state motorcycle handbook. These 200 questions
              follow that manual chapter by chapter.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this cover my state&apos;s motorcycle laws?</h3>
            <p className="text-gray-600">
              It covers the riding knowledge that is the same everywhere: gear, control, positioning,
              intersections, hazards and alcohol. Helmet laws, permit restrictions and licensing steps
              vary by state, so check your state&apos;s motorcycle handbook for those.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest motorcycle practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all five training sets are free, with no account required.
              Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your Motorcycle Permit Test?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions from the MSF manual.</p>
          <ExamLandingCTA dashboardHref="/motorcycle/dashboard" />
        </div>
      </div>
    </div>
  );
}

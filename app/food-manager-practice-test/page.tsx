import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Food Manager Practice Test 2026 - ServSafe Manager & CFPM Exam Prep";
const description =
  "Free certified food protection manager practice tests with 200 questions on the FDA Food Code: foodborne illness and contamination, the flow of food, time and temperature control, personal hygiene, cleaning and sanitizing, facilities and pests, and HACCP. Prep for ServSafe Manager, NRFSP, Prometric and StateFoodSafety exams.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "food manager practice test, ServSafe manager practice test, certified food protection manager exam, CFPM practice questions, food safety manager test 2026, NRFSP practice test, food handler manager certification, free ServSafe practice test",
  alternates: {
    canonical: `${siteUrl}/food-manager-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/food-manager-practice-test`,
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
      name: "TigerTest - Free Food Manager Practice Tests",
      description,
      url: `${siteUrl}/food-manager-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 food manager practice questions",
        "4 practice tests weighted like the accredited manager exams",
        "Training sets for every domain",
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
          name: "Which food manager exams does this prepare me for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Any ANAB-CFP accredited certified food protection manager exam: ServSafe Manager, the National Registry of Food Safety Professionals (NRFSP), Prometric, StateFoodSafety and Learn2Serve (360training). They all test the FDA Food Code and are accepted by health departments nationwide. Check which edition of the Food Code your state has adopted.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the ServSafe Manager exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The ServSafe Manager exam has 90 questions, 80 scored, with 2 hours and a 75 percent pass line. The other accredited exams are similar in length and pass line. This practice bank uses 50-question tests weighted the same way.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the same as a food handler card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The food handler certificate is a shorter course for line staff. The manager certification is the exam the Food Code requires the person in charge to hold, and it is proctored. This practice test is for the manager exam, though food handler candidates will find the hygiene and temperature material useful.",
          },
        },
        {
          "@type": "Question",
          name: "What temperature does the Food Code use for the danger zone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "41 to 135 degrees Fahrenheit (5 to 57 Celsius). Cold TCS food is held at 41 or below, hot food at 135 or above, and the fastest bacterial growth happens between 70 and 125 degrees.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest food manager practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "The Flow of Food", weight: "24%" },
  { name: "Time & Temperature Control", weight: "20%" },
  { name: "Foodborne Illness & Contamination", weight: "16%" },
  { name: "Personal Hygiene & Employee Health", weight: "16%" },
  { name: "Cleaning & Sanitizing", weight: "12%" },
  { name: "Facilities, Equipment & Pest Control", weight: "6%" },
  { name: "Food Safety Management & Regulation", weight: "6%" },
];

export default function FoodmgrLandingPage() {
  return (
    <div data-theme="foodmgr" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Food Manager Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/food-manager/dashboard"
            shortName="Food Safety"
            subtitle="200 Food Code questions for the ServSafe Manager, NRFSP, Prometric and other accredited exams. No account needed."
            shots={{ mobile: "/landing/foodmgr-mobile.png", desktop: "/landing/foodmgr-desktop.png" }}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Domain</h3>
              <p className="text-gray-600">
                Four sets covering every content area: contamination and personal hygiene, the flow of food, time and temperature control, and cleaning, facilities and management systems. Questions you miss come back until you have mastered them.
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
                Four 50-question tests weighted like the accredited manager exams and written in their style: a kitchen, a temperature or a delivery, and the one thing the manager should do.
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
                Built on the FDA Food Code
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Every accredited manager exam (ServSafe, NRFSP, Prometric, StateFoodSafety, Learn2Serve) tests the same FDA Food Code, so the temperatures, times and rules here apply whichever one you sit. Each practice test follows this spread.
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
                src={getTigerAsset("foodmgr", 1)}
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
            The food manager practice test is brand new. If a question looks wrong or your local code differs, tell us.
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
            How to Pass the Food Manager Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Memorize the temperatures and times</h3>
              <p>
                41 and 135, 165 for poultry and reheating, 155 for ground meat, 145 for whole cuts and fish, cool from 135 to 70 in 2 hours and to 41 in 4 more, 7 days for date marking, 4 hours without temperature control. Most wrong answers on this exam are a number off by one step.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Follow the flow of food</h3>
              <p>
                Purchasing, receiving, storage, preparation, cooking, holding, serving. The exam walks food through the kitchen and asks where it went wrong. Know the receiving temperatures, the storage order top to bottom, and which thawing methods are allowed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Think like the health inspector</h3>
              <p>
                When a scenario asks what the manager should do, the answer protects the customer first: discard, exclude the sick employee, stop service for an imminent hazard, call the regulatory authority. Correcting a form or retraining comes after.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak area</h3>
              <p>
                TigerTest tracks your accuracy by content area. After each practice test, go back to the set you missed most and retake until you clear 75 percent, the pass line on the accredited exams, with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Food Manager Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Which food manager exams does this prepare me for?</h3>
            <p className="text-gray-600">
              Any ANAB-CFP accredited certified food protection manager exam: ServSafe Manager, the National Registry of Food Safety Professionals (NRFSP), Prometric, StateFoodSafety and Learn2Serve (360training). They all test the FDA Food Code and are accepted by health departments nationwide. Check which edition of the Food Code your state has adopted.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the ServSafe Manager exam?</h3>
            <p className="text-gray-600">
              The ServSafe Manager exam has 90 questions, 80 scored, with 2 hours and a 75 percent pass line. The other accredited exams are similar in length and pass line. This practice bank uses 50-question tests weighted the same way.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is this the same as a food handler card?</h3>
            <p className="text-gray-600">
              No. The food handler certificate is a shorter course for line staff. The manager certification is the exam the Food Code requires the person in charge to hold, and it is proctored. This practice test is for the manager exam, though food handler candidates will find the hygiene and temperature material useful.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What temperature does the Food Code use for the danger zone?</h3>
            <p className="text-gray-600">
              41 to 135 degrees Fahrenheit (5 to 57 Celsius). Cold TCS food is held at 41 or below, hot food at 135 or above, and the fastest bacterial growth happens between 70 and 125 degrees.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest food manager practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all training sets are free, with no account required. Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your Food Manager Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across every content area.</p>
          <ExamLandingCTA dashboardHref="/food-manager/dashboard" />
        </div>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free Food Handler Practice Test 2026 - Food Handler Card Exam Prep";
const description =
  "Free food handler practice test with 200 questions on the FDA Food Code topics every ANAB-accredited course tests: personal hygiene, handwashing, cross-contamination, allergens, cooking and holding temperatures, cooling, thawing, cleaning and sanitizing. Pass your food handler card test the first time.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "food handler practice test, food handler card test, food handler certificate practice questions, food safety test answers, servsafe food handler practice test, food handler exam 2026, free food handler test",
  alternates: {
    canonical: `${siteUrl}/food-handler-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/food-handler-practice-test`,
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
      name: "TigerTest - Free Food Handler Practice Tests",
      description,
      url: `${siteUrl}/food-handler-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 food handler practice questions",
        "4 practice tests in the real test's topic proportions",
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
          name: "How many questions are on the food handler test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most ANAB-accredited course tests have 40 multiple-choice questions and require 75 percent to pass, with no time limit. The questions cover hygiene, contamination, time and temperature, and cleaning. This practice bank uses the same topics in the same proportions.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a food handler card?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on where you work. Some states (for example Texas, California, Illinois, Washington, Utah and Arizona counties) require every food employee to hold a card, and many employers require one everywhere. Check your local health department; cards are usually valid two to three years.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the same as the food manager exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The food handler card is for line staff and covers safe practices. The Certified Food Protection Manager exam is longer, proctored, and adds management systems. TigerTest has a separate Food Manager practice test for that.",
          },
        },
        {
          "@type": "Question",
          name: "Which course does this prepare me for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Any accredited food handler course: the material is the FDA Food Code, which they all teach. You still have to take the course and its own test to get the card; use this to make sure you pass it the first time.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest food handler practice test free?",
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
  { name: "Food Safety Basics", weight: "20%" },
  { name: "Personal Hygiene", weight: "20%" },
  { name: "Contamination & Allergens", weight: "20%" },
  { name: "Time & Temperature", weight: "24%" },
  { name: "Cleaning & Sanitizing", weight: "16%" },
];

export default function FoodhandlerLandingPage() {
  return (
    <div data-theme="foodhandler" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free Food Handler Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/food-handler/dashboard"
            shortName="Food Handler"
            subtitle="200 questions on the food safety topics every food handler card test covers. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/foodhandler-mobile.png", desktop: "/landing/foodhandler-desktop.png" }}
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
                Four sets: food safety basics and personal hygiene, contamination and allergens, time and temperature control, and cleaning and sanitizing. Questions you miss come back until you have mastered them.
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
                Four 50-question tests written the way the course tests are: a cook, a server or a dishwasher in a real situation, and the safe thing to do.
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
                Every accredited food handler course teaches the same FDA Food Code material, and the tests all lean on time and temperature control. Each practice test here draws questions in those proportions so the numbers that matter (41, 135, 165, 2 hours, 7 days) come up again and again.
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
                src="/tiger_face_01.png"
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
            The food handler practice test is brand new. If a question looks wrong or your course teaches it differently, tell us.
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
            How to Pass the Food Handler Test
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Learn the temperatures cold</h3>
              <p>
                The danger zone is 41 F to 135 F. Poultry, stuffed foods and reheated leftovers go to 165 F, ground meat to 155 F, whole cuts and seafood to 145 F. Cool from 135 to 70 in 2 hours and to 41 in 4 more. Half the test is these numbers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Know when to wash your hands</h3>
              <p>
                Before starting work, after the restroom, after touching your face, hair or phone, after handling raw meat, after taking out trash, and before putting on gloves. Gloves never replace handwashing, and only a handwashing sink counts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Think about what can contaminate the food</h3>
              <p>
                Raw chicken above a salad in the cooler, a cutting board used twice, a sanitizer bottle on the prep table, a cook with a stomach bug. Most scenario questions are asking you to spot the hazard.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak topic</h3>
              <p>
                TigerTest tracks your accuracy by topic. Most courses require 75 percent on a 40-question test, so retake the set you miss most until you clear 85 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Food Handler Card Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the food handler test?</h3>
            <p className="text-gray-600">
              Most ANAB-accredited course tests have 40 multiple-choice questions and require 75 percent to pass, with no time limit. The questions cover hygiene, contamination, time and temperature, and cleaning. This practice bank uses the same topics in the same proportions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Do I need a food handler card?</h3>
            <p className="text-gray-600">
              It depends on where you work. Some states (for example Texas, California, Illinois, Washington, Utah and Arizona counties) require every food employee to hold a card, and many employers require one everywhere. Check your local health department; cards are usually valid two to three years.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is this the same as the food manager exam?</h3>
            <p className="text-gray-600">
              No. The food handler card is for line staff and covers safe practices. The Certified Food Protection Manager exam is longer, proctored, and adds management systems. TigerTest has a separate Food Manager practice test for that.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Which course does this prepare me for?</h3>
            <p className="text-gray-600">
              Any accredited food handler course: the material is the FDA Food Code, which they all teach. You still have to take the course and its own test to get the card; use this to make sure you pass it the first time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest food handler practice test free?</h3>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Get Your Food Handler Card?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all five topics.</p>
          <ExamLandingCTA dashboardHref="/food-handler/dashboard" />
        </div>
      </div>
    </div>
  );
}

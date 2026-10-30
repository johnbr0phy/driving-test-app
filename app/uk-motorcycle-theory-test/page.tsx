import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "UK Motorcycle Theory Test Practice 2026 - Free";
const metaDescription =
  "Free UK motorcycle theory test practice: 200 original questions on riding, hazards, the Highway Code and signs, every answer explained. Four mock tests.";
const description =
  "Free practice for the multiple-choice part of the DVSA motorcycle theory test: 200 original questions on alertness and hazards, your motorcycle and loading, safety margins and handling, vulnerable road users, rules of the road and motorways, road and traffic signs, and documents and emergencies. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "motorcycle theory test, UK motorcycle theory test practice, DVSA motorcycle theory test, motorbike theory test 2026, moped theory test, free motorcycle theory test questions, CBT theory, Highway Code motorcycle",
  alternates: {
    canonical: `${siteUrl}/uk-motorcycle-theory-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/uk-motorcycle-theory-test`,
    images: [{ url: "/og/ukmoto", width: 1200, height: 630, alt: "Tigertest free UK motorcycle theory test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/ukmoto"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free UK Motorcycle Theory Tests",
      description,
      url: `${siteUrl}/uk-motorcycle-theory-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 motorcycle theory practice questions",
        "4 practice tests across all seven DVSA topic groups",
        "4 training sets, one per practice test",
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
          name: "What is the pass mark for the motorcycle theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need 43 out of 50 on the multiple-choice questions and 44 out of 75 on the hazard perception test. You must pass both parts at the same sitting to pass the theory test. The practice tests here use the same 43 of 50 pass line, which is 86 percent.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the motorcycle theory test and how long do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The multiple-choice part has 50 questions and you get 57 minutes. You can flag questions and change answers before you finish. From 5 November 2026, three of the 50 questions are based on a short silent video of a normal riding situation, which replaces the older five-question case study. After a break of up to 3 minutes you take the hazard perception part: 14 video clips, one with two developing hazards.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the motorcycle theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The multiple-choice questions come from The Highway Code, Know your traffic signs and Riding - the essential skills. DVSA groups them into topics such as alertness, attitude, safety and your motorcycle, safety margins, hazard awareness, vulnerable road users, other types of vehicle, road conditions and motorcycle handling, motorway rules, rules of the road, road and traffic signs, documents, incidents and emergencies, and motorcycle loading. The practice tests here cover all of them in seven groups.",
          },
        },
        {
          "@type": "Question",
          name: "When can I take the motorcycle theory test and what does it cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need a provisional licence, and you can take it from 16 for a moped or 17 for a motorcycle, before or after compulsory basic training (CBT). It costs 23 pounds. Your pass certificate lasts 2 years, and you must pass both modules of the practical motorcycle test in that time or take the theory test again.",
          },
        },
        {
          "@type": "Question",
          name: "Does this practice test include hazard perception?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. These 200 original questions cover the multiple-choice part only, and the video questions are not included either. Practise hazard perception separately with the official DVSA guide or app. The questions are written for this site and are not copied from the DVSA revision bank. It is a study tool, not an official DVSA product.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Alertness, Attitude & Hazards", weight: "16%" },
  { name: "Your Motorcycle & Loading", weight: "16%" },
  { name: "Safety Margins & Handling", weight: "16%" },
  { name: "Rules of the Road & Motorways", weight: "16%" },
  { name: "Road & Traffic Signs", weight: "14%" },
  { name: "Vulnerable Road Users & Other Vehicles", weight: "12%" },
  { name: "Documents, Incidents & Emergencies", weight: "10%" },
];

export default function UkMotoLandingPage() {
  return (
    <div data-theme="ukmoto" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free UK Motorcycle Theory Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/uk-motorcycle-theory/dashboard"
            shortName="UK Moto"
            subtitle="200 questions on hazards, your motorcycle, safety margins, vulnerable road users, rules of the road, signs and documents, for the multiple-choice part of the DVSA test. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ukmoto-mobile.png", desktop: "/landing/ukmoto-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ukmoto" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1, and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until you have mastered them.
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
                Four 50-question tests with the real pass mark of 43, and an explanation of the right answer and the common wrong pick on every item. Hazard perception clips and the video questions are not included.
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
                Built on the DVSA Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                DVSA draws the multiple-choice questions from The Highway Code, Know your traffic signs and Riding - the essential skills, under fourteen topics. The practice tests here group those topics into seven and give every test the same mix, with the rider-specific topics (hazards, your motorcycle, handling and the rules of the road) carrying the most questions. DVSA does not publish a per-topic split, so the weights below are ours.
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
                src={getTigerAsset("ukmoto", 1)}
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
            How to Pass the Motorcycle Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers as a set</h3>
              <p>
                A handful of figures turn up again and again: 60 mph on a single carriageway and 70 mph on dual carriageways and motorways, 30 mph in built-up areas in England and Scotland and 20 mph in Wales, a two-second gap that at least doubles in the wet and can be ten times longer on ice, 1 mm of tread across three-quarters of the tyre, a warning triangle 45 metres back, and 6 points in your first 2 years taking your licence away.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know what a learner may and may not do</h3>
              <p>
                With CBT and a provisional licence you ride on L plates (L or D plates in Wales), up to 125cc and 11 kW from 17, with no pillion passenger and no motorways, and you have 2 years to pass the full test. Then learn the licence ladder: AM at 16, A1 at 17, A2 at 19 and A at 24, or 21 after two years on A2.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the signs by shape and colour</h3>
              <p>
                Circles give orders, triangles warn and rectangles inform. A red ring prohibits, a blue circle tells you what you must do, and blue, green, white and brown direction signs mean motorway, primary route, local route and tourist sign. Once the system clicks, an unfamiliar sign is easy to work out.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                The pass mark is high: 43 of 50 leaves room for only seven mistakes. After each practice test, drill the questions you missed and retrain that test&apos;s set, aim to score well above 43 on all four tests, and practise hazard perception clips separately before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Motorcycle Theory Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the motorcycle theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need 43 out of 50 on the multiple-choice questions and 44 out of 75 on the hazard perception test. You must pass both parts at the same sitting to pass the theory test. The practice tests here use the same 43 of 50 pass line, which is 86 percent.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the motorcycle theory test and how long do I get?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The multiple-choice part has 50 questions and you get 57 minutes. You can flag questions and change answers before you finish. From 5 November 2026, three of the 50 questions are based on a short silent video of a normal riding situation, which replaces the older five-question case study. After a break of up to 3 minutes you take the hazard perception part: 14 video clips, one with two developing hazards.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the motorcycle theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The multiple-choice questions come from The Highway Code, Know your traffic signs and Riding - the essential skills. DVSA groups them into topics such as alertness, attitude, safety and your motorcycle, safety margins, hazard awareness, vulnerable road users, other types of vehicle, road conditions and motorcycle handling, motorway rules, rules of the road, road and traffic signs, documents, incidents and emergencies, and motorcycle loading. The practice tests here cover all of them in seven groups.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">When can I take the motorcycle theory test and what does it cost?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need a provisional licence, and you can take it from 16 for a moped or 17 for a motorcycle, before or after compulsory basic training (CBT). It costs 23 pounds. Your pass certificate lasts 2 years, and you must pass both modules of the practical motorcycle test in that time or take the theory test again.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this practice test include hazard perception?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. These 200 original questions cover the multiple-choice part only, and the video questions are not included either. Practise hazard perception separately with the official DVSA guide or app. The questions are written for this site and are not copied from the DVSA revision bank. It is a study tool, not an official DVSA product.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="ukmoto" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your Motorcycle Theory Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all seven topic groups.</p>
          <ExamLandingCTA dashboardHref="/uk-motorcycle-theory/dashboard" />
        </div>
      </div>
    </div>
  );
}

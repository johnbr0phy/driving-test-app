import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "NSW DKT Practice Test 2026 - Free Knowledge Test";
const metaDescription =
  "Free NSW DKT practice: 200 questions from the Road User Handbook on give way, speed limits, alcohol, demerits and L and P plate rules, every answer explained.";
const description =
  "Free NSW Driver Knowledge Test practice with 200 questions drawn from the Transport for NSW Road User Handbook: learner and P plate restrictions, demerit points, speed limits, alcohol, drugs, fatigue and mobile phones, giving way and roundabouts, sharing the road, overtaking and lanes, parking, and hazards. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "NSW DKT practice test, driver knowledge test NSW, DKT practice test 2026, NSW learner licence test, free DKT practice questions, Road User Handbook test, NSW L plates test, Service NSW DKT",
  alternates: {
    canonical: `${siteUrl}/nsw-dkt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nsw-dkt-practice-test`,
    images: [{ url: "/og/aunsw", width: 1200, height: 630, alt: "Tigertest free NSW DKT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/aunsw"],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free NSW DKT Practice Tests",
      description,
      url: `${siteUrl}/nsw-dkt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 NSW Driver Knowledge Test practice questions",
        "4 practice tests across every Road User Handbook topic",
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
          name: "What score do I need to pass the NSW DKT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The DKT has two parts and you must pass both. You need at least 12 of the 15 general knowledge questions and at least 29 of the 30 road safety questions, which is 41 of 45 overall. The practice tests here use a 91 percent pass line to match, but aim to get road safety questions right every time, because two misses there fail the test.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the DKT and how does it work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The test is 45 multiple-choice questions picked at random from a large question bank: 15 general knowledge and 30 road safety. You can do it online as part of the DKT online course, a 4 to 6 hour interactive course you work through at your own pace, or in person on a computer at a Service NSW centre after booking.",
          },
        },
        {
          "@type": "Question",
          name: "How old do I need to be to take the DKT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can enrol in the DKT online from 15 years and 11 months. The in-person test is for people aged 16 or older. Either way, you can only apply for your learner licence once you are 16, at a service centre, with your identity documents.",
          },
        },
        {
          "@type": "Question",
          name: "What happens if I fail the DKT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Online, one test fee covers as many attempts as you need, and you can retake the test after 12 hours. In person, you may be able to re-sit the same day if there is a spot, or book another time, and you pay the test fee each time. Use the misses as your study list before the next attempt.",
          },
        },
        {
          "@type": "Question",
          name: "Does this cover the Hazard Perception Test or the driving test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. These questions cover the Driver Knowledge Test only, written from the Transport for NSW Road User Handbook. The Hazard Perception Test uses video clips and the Driving Test is on the road, so neither is modelled here. It is a study tool, not an official Transport for NSW test.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Licences, Penalties & Seatbelts", weight: "12%" },
  { name: "Speed Limits & Safe Distance", weight: "12%" },
  { name: "Alcohol, Drugs, Fatigue & Phones", weight: "14%" },
  { name: "Giving Way, Intersections & Crossings", weight: "18%" },
  { name: "Sharing the Road", weight: "12%" },
  { name: "Overtaking, Lanes & Motorways", weight: "14%" },
  { name: "Parking & Stopping", weight: "8%" },
  { name: "Hazards, Crashes & Your Vehicle", weight: "10%" },
];

export default function NswDktLandingPage() {
  return (
    <div data-theme="aunsw" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NSW DKT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nsw-dkt/dashboard"
            shortName="NSW DKT"
            subtitle="200 questions from the Road User Handbook on L and P plate rules, demerit points, speed limits, BAC, fatigue, mobile phones, giving way, roundabouts, lanes, parking and hazards. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/aunsw-mobile.png", desktop: "/landing/aunsw-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="aunsw" />

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
                Four 50-question tests covering every topic in the Road User Handbook, with a 91 percent pass line to match the real 41 of 45 and an explanation of the rule on every item.
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
                Built on the Road User Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Transport for NSW says the Road User Handbook is what prepares you for the DKT, so every question here comes from it and the practice tests cover all of its chapters. Giving way, intersections and crossings is the biggest topic, and the learner and P plate rules, BAC limits and speed limits are the numbers the test checks most, so learn those cold.
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
                src={getTigerAsset("aunsw", 1)}
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
            How to Pass the NSW DKT
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers as a table</h3>
              <p>
                Zero alcohol on L and P plates and under 0.05 on a full licence. 90km/h for learners and P1, 100km/h for P2. 50km/h default in built-up areas and 100km/h elsewhere, 10km/h in a shared zone, 40km/h past a school bus with flashing lights. Demerit limits of 4 for learners and P1, 7 for P2 and 13 for a full licence. A one-page table of these is worth more than rereading the handbook.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the licence ladder</h3>
              <p>
                Learner licence at 16, at least 12 months and 120 logged hours with 20 at night if you are under 25, the Hazard Perception Test after 10 months, the Driving Test at 17, then a red P1 for at least a year and a green P2 for at least two. Each stage has its own passenger, phone, towing and vehicle rules, and the test asks which rule belongs to which plate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Picture the give way rules</h3>
              <p>
                Most road safety questions describe an intersection, a roundabout or a crossing and ask who goes first. Work through them on paper: you give way to everything already in a roundabout, a right turner gives way to oncoming traffic going straight, a road ending at a T gives way to the continuing road, and turning drivers always give way to pedestrians crossing the road they enter.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                You can only miss one road safety question on the real test, so near enough is not enough. Tigertest tracks your accuracy by topic: after each practice test, retrain that test&apos;s set until every question you missed is mastered, then take all four tests back to back before you sit the DKT.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NSW DKT Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What score do I need to pass the NSW DKT?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The DKT has two parts and you must pass both. You need at least 12 of the 15 general knowledge questions and at least 29 of the 30 road safety questions, which is 41 of 45 overall. The practice tests here use a 91 percent pass line to match, but aim to get road safety questions right every time, because two misses there fail the test.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the DKT and how does it work?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The test is 45 multiple-choice questions picked at random from a large question bank: 15 general knowledge and 30 road safety. You can do it online as part of the DKT online course, a 4 to 6 hour interactive course you work through at your own pace, or in person on a computer at a Service NSW centre after booking.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How old do I need to be to take the DKT?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can enrol in the DKT online from 15 years and 11 months. The in-person test is for people aged 16 or older. Either way, you can only apply for your learner licence once you are 16, at a service centre, with your identity documents.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What happens if I fail the DKT?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Online, one test fee covers as many attempts as you need, and you can retake the test after 12 hours. In person, you may be able to re-sit the same day if there is a spot, or book another time, and you pay the test fee each time. Use the misses as your study list before the next attempt.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Does this cover the Hazard Perception Test or the driving test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. These questions cover the Driver Knowledge Test only, written from the Transport for NSW Road User Handbook. The Hazard Perception Test uses video clips and the Driving Test is on the road, so neither is modelled here. It is a study tool, not an official Transport for NSW test.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="aunsw" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the NSW DKT?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every Road User Handbook topic.</p>
          <ExamLandingCTA dashboardHref="/nsw-dkt/dashboard" />
        </div>
      </div>
    </div>
  );
}

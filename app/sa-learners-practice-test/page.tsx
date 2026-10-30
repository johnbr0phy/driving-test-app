import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "SA Learner's Theory Test Practice 2026 - Free";
const metaDescription =
  "Free South Australia learner's theory test practice: 200 questions on giving way, P1 and P2 rules, speed limits and signs, every answer explained.";
const description =
  "Free practice tests for the South Australia learner's theory test, with 200 questions from The Driver's Handbook: giving way at intersections and roundabouts, learner, P1 and P2 rules and demerit points, speed limits and following distance, signs, signals and road markings, lanes, turning and overtaking, sharing the road with trams, bike riders and trucks, parking, and alcohol, phones and safe driving. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "SA learners practice test, South Australia learner's theory test, SA learners permit test, SA road rules test 2026, Driver's Handbook SA test, myLs theory test practice, free SA learners test, Adelaide learner's permit",
  alternates: {
    canonical: `${siteUrl}/sa-learners-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/sa-learners-practice-test`,
    images: [{ url: shareImageUrl("ausa"), width: 1200, height: 630, alt: "Tigertest free SA learner's practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ausa")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SA Learner's Practice Tests",
      description,
      url: `${siteUrl}/sa-learners-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 SA learner's theory test practice questions",
        "4 practice tests across all eight Driver's Handbook topics",
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
          name: "How many questions are on the SA learner's theory test and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The test at Service SA has 50 questions in two parts. Part 1 is 8 give-way questions based on intersection diagrams, and you must get all 8 right before you can go on. Part 2 is 42 multiple-choice questions on the road rules and safe driving, and you need at least 32 of them. The online myLs test is 30 questions and you need 27 correct. The practice tests here use an 80 percent pass line, which is 40 of 50.",
          },
        },
        {
          "@type": "Question",
          name: "How old do you have to be to get a learner's permit in South Australia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can get a learner's permit from age 16. You either book the theory test at a Service SA customer service centre (or a remote country police station), or enrol in the online myLs course from 15 years and 9 months, finish its course and test within 12 months, and apply for the permit once you turn 16. The myLs test can be retried as many times as you need.",
          },
        },
        {
          "@type": "Question",
          name: "What comes after the learner's theory test in SA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You learn with a qualified supervising driver beside you, displaying L plates front and rear, with zero alcohol, no mobile phone use at all and a top speed of 100 km/h. If you are under 25 you hold the permit for at least 12 months (6 months if 25 or older) and log at least 75 hours, including 15 at night. You must also pass the Hazard Perception Test and either a Vehicle On Road Test or CBT&A before you get your P1 licence and its red P plates.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the SA learner's theory test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every question comes from The Driver's Handbook. Expect giving way at intersections, T-intersections, roundabouts and slip lanes, then speed limits including 25 km/h school zones and emergency vehicles, traffic lights, signs and road markings, overtaking and lanes, trams and bike riders, parking distances, alcohol and drug limits, seatbelts and child restraints, and the learner, P1 and P2 conditions and demerit points.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the official SA test, and does it include the Hazard Perception Test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Tigertest is an independent study tool, not the Department for Infrastructure and Transport's test, and every question is written from the February 2026 edition of The Driver's Handbook. The give-way scenarios are described in words rather than shown as diagrams. The Hazard Perception Test, a separate computer test you need before P1, is not modelled here. Practise until you clear 80 percent on all four tests and get every give-way question right.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Giving Way", weight: "16%" },
  { name: "Learner, P1 & P2 Rules", weight: "14%" },
  { name: "Signs, Signals & Markings", weight: "14%" },
  { name: "Lanes, Turning & Overtaking", weight: "14%" },
  { name: "Speed Limits & Following Distance", weight: "12%" },
  { name: "Sharing the Road", weight: "12%" },
  { name: "Alcohol, Phones & Safe Driving", weight: "12%" },
  { name: "Parking & Stopping", weight: "6%" },
];

export default function SaLearnersLandingPage() {
  return (
    <div data-theme="ausa" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SA Learner&apos;s Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/sa-learners/dashboard"
            shortName="SA Learners"
            subtitle="200 questions from The Driver's Handbook on giving way, roundabouts, school zones, trams, signs and signals, speed limits, BAC, parking, L and P plate rules and demerit points. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/ausa-mobile.png", desktop: "/landing/ausa-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ausa" />

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
                Four 50-question tests shaped like the Service SA test, with 8 giving-way questions in every one, an 80 percent pass line and an explanation of the right answer and the common wrong pick on every item.
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
                Built on The Driver&apos;s Handbook
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Department for Infrastructure and Transport writes the learner&apos;s theory test from The Driver&apos;s Handbook. It publishes only one part of the split: the first 8 of the 50 questions are about giving way, and you must get all of them right. The practice tests here keep those 8 giving-way questions and spread the other 42 across the handbook&apos;s road rules and licensing chapters. Every rule is checked against the February 2026 edition.
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
                src={getTigerAsset("ausa", 1)}
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
            How to Pass the SA Learner&apos;s Theory Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get the give-way rules perfect</h3>
              <p>
                One wrong give-way answer fails the whole test, so learn the rules as a short list: give way to the right at an intersection with no signs, give way to everything on the through road at a T-intersection, give way to oncoming traffic when turning right, give way to vehicles already in a roundabout, and give way to everyone when you leave a driveway or make a U-turn. Then picture each one from every car&apos;s point of view.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the numbers as a table</h3>
              <p>
                50 km/h in a built-up area and 100 km/h outside one; 25 km/h in a school zone with a child present, past a stopped school bus and past emergency vehicles with flashing lights; a three-second following gap; 1 metre (or 1.5 metres over 60 km/h) when passing a bike rider; 10 and 20 metres from intersections when parking. The test asks for the exact figure.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know your own licence conditions</h3>
              <p>
                Learners and P drivers have rules full licence holders do not: zero alcohol, a 100 km/h top speed, no phone use at all on L and P1, 4 demerit points instead of 12, and for under-25 P1 drivers a midnight to 5 am curfew and a limit of one passenger aged 16 to 20. These questions come up every time and are easy marks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each test, drill the questions you missed and retrain that test&apos;s set. When you clear 80 percent on all four practice tests and miss no giving-way questions, you are ready to book at Service SA or finish myLs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SA Learner&apos;s Test Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the SA learner&apos;s theory test and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The test at Service SA has 50 questions in two parts. Part 1 is 8 give-way questions based on intersection diagrams, and you must get all 8 right before you can go on. Part 2 is 42 multiple-choice questions on the road rules and safe driving, and you need at least 32 of them. The online myLs test is 30 questions and you need 27 correct. The practice tests here use an 80 percent pass line, which is 40 of 50.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How old do you have to be to get a learner&apos;s permit in South Australia?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can get a learner&apos;s permit from age 16. You either book the theory test at a Service SA customer service centre (or a remote country police station), or enrol in the online myLs course from 15 years and 9 months, finish its course and test within 12 months, and apply for the permit once you turn 16. The myLs test can be retried as many times as you need.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What comes after the learner&apos;s theory test in SA?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You learn with a qualified supervising driver beside you, displaying L plates front and rear, with zero alcohol, no mobile phone use at all and a top speed of 100 km/h. If you are under 25 you hold the permit for at least 12 months (6 months if 25 or older) and log at least 75 hours, including 15 at night. You must also pass the Hazard Perception Test and either a Vehicle On Road Test or CBT&amp;A before you get your P1 licence and its red P plates.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the SA learner&apos;s theory test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every question comes from The Driver&apos;s Handbook. Expect giving way at intersections, T-intersections, roundabouts and slip lanes, then speed limits including 25 km/h school zones and emergency vehicles, traffic lights, signs and road markings, overtaking and lanes, trams and bike riders, parking distances, alcohol and drug limits, seatbelts and child restraints, and the learner, P1 and P2 conditions and demerit points.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the official SA test, and does it include the Hazard Perception Test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Tigertest is an independent study tool, not the Department for Infrastructure and Transport&apos;s test, and every question is written from the February 2026 edition of The Driver&apos;s Handbook. The give-way scenarios are described in words rather than shown as diagrams. The Hazard Perception Test, a separate computer test you need before P1, is not modelled here. Practise until you clear 80 percent on all four tests and get every give-way question right.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="ausa" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass Your SA Learner&apos;s Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all eight Driver&apos;s Handbook topics.</p>
          <ExamLandingCTA dashboardHref="/sa-learners/dashboard" />
        </div>
      </div>
    </div>
  );
}

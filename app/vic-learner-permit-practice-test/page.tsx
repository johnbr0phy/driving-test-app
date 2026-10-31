import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/auvic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "VicRoads Learners Test Practice 2026 - Free";
const metaDescription =
  "Free Victoria learner permit test practice: 200 questions from Road to Solo Driving on give way, hook turns, trams, speed and L plate rules, all explained.";
const description =
  "Free practice tests for the VicRoads learner permit knowledge test, with 200 questions written from the Road to Solo Driving handbook: learner and P plate rules, alcohol, drugs and fatigue, safe driving and hazards, speed limits, signs, markings and parking, give way rules, turning, hook turns and freeways, and sharing the road with trams, bicycle riders and trucks. Explanations on every question.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "VicRoads learners test, Victoria learner permit practice test, VicRoads practice test, learners test Victoria, Road to Solo Driving questions, VIC learner permit test 2026, free Ls test Victoria, VicRoads knowledge test",
  alternates: {
    canonical: `${siteUrl}/vic-learner-permit-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/vic-learner-permit-practice-test`,
    images: [{ url: shareImageUrl("auvic"), width: 1200, height: 630, alt: "Tigertest free Victoria learner permit practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("auvic")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Victoria Learner Permit Practice Tests",
      description,
      url: `${siteUrl}/vic-learner-permit-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      featureList: [
        "200 Victoria learner permit practice questions",
        "4 practice tests across eight Road to Solo Driving topics",
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
          name: "How many questions are on the VicRoads learner permit test and what is the pass mark?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The learner permit knowledge test has 32 multiple-choice questions on road law and road safety, and you need 25 correct, about 78 percent, to pass. The practice tests here are 50 questions each and use the same 78 percent pass line, so clearing it on all four is a good sign you are ready.",
          },
        },
        {
          "@type": "Question",
          name: "How old do I have to be to get my Ls in Victoria?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You must be at least 16 to sit the test in person and be issued a learner permit. You can enrol in the online learner permit test from 15 years and 11 months, but the permit itself is only issued from 16. The test is taken with an eyesight check, and the permit is valid for 10 years.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the Victorian learner permit test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The questions are based on the Road to Solo Driving handbook: the learner and P plate rules, alcohol and drug limits, speed limits, road signs and markings, give way rules at intersections and roundabouts, turning and hook turns, freeways, parking, and sharing the road with pedestrians, bicycle riders, trams and trucks. The practice tests here cover all of those topics.",
          },
        },
        {
          "@type": "Question",
          name: "What are the rules once I have my learner permit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A learner must display L plates front and rear, carry the permit, have a zero BAC, drive only a car, not tow, and always have a supervising driver with a full (not probationary) licence beside them. Phones may only be used for navigation or audio set up before driving. If you are under 21 when you go for your licence, you must hold the permit for 12 months and log 120 hours of supervised driving, including 20 hours at night.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the official VicRoads practice test?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Tigertest is an independent study tool. Every question is written from the current Road to Solo Driving handbook, which is where the real test questions come from, but these are not the actual test questions. The Hazard Perception Test you sit later for your P licence is a video test and is not modelled here.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "Give Way & Intersections", weight: "16%" },
  { name: "Safe Driving & Hazards", weight: "14%" },
  { name: "Signs, Markings & Parking", weight: "14%" },
  { name: "Sharing the Road", weight: "14%" },
  { name: "Licences & Learner Rules", weight: "12%" },
  { name: "Turning, Overtaking & Freeways", weight: "12%" },
  { name: "Alcohol, Drugs & Fatigue", weight: "10%" },
  { name: "Speed Limits", weight: "8%" },
];

export default function VicLearnerPermitLandingPage() {
  return (
    <div data-theme="auvic" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free VicRoads Learners Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/vic-learner-permit/dashboard"
            shortName="Victoria learner permit"
            subtitle="200 questions from Road to Solo Driving on give way rules, speed limits, signs, alcohol limits, L and P plate rules, hook turns and trams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/auvic-mobile.png", desktop: "/landing/auvic-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="auvic" />

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
                Four 50-question tests across every topic in the handbook, with the real test&apos;s 78 percent pass line and an explanation of the right answer and the common wrong pick on every question.
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
                Built on Road to Solo Driving
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                VicRoads says the learner permit test questions are based on Road to Solo Driving, but it does not publish how many come from each chapter. The practice tests here cover every chapter, with the most questions on give way rules, safe driving, signs and sharing the road, the chapters with the most rules to learn. Every question is written for Victoria: km/h, kerbs, trams, hook turns and the real L and P plate rules.
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
                src={getTigerAsset("auvic", 1)}
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
            How to Pass Your Learners Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the numbers as a set</h3>
              <p>
                Many questions are a number: 50 km/h in a built-up area and 100 km/h outside one, 40 km/h past a stopped emergency vehicle, 10 km/h in a shared zone and past a stopped tram, two seconds behind the car in front, dipping high beam within 200 metres, 20 metres from traffic lights and 10 metres from an intersection without them when you park. Learn them together so they do not blur.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the L and P plate rules cold</h3>
              <p>
                Zero BAC for learners and P platers, a full licence holder beside every learner, L plates front and rear, no towing, 120 hours with 20 at night if you are under 21, one peer passenger on a P1, and suspension at five demerit points in 12 months. These rules apply to you from the day you pass, and the test asks about them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Work through give way rules with a picture in your head</h3>
              <p>
                Give way to the right at an uncontrolled intersection, to the continuing road at a T-intersection, to everyone already in a roundabout, and to oncoming traffic when you turn right. Then add the Melbourne extras: trams have priority over broken yellow lines, you stop level with the back of a tram at a stop with no safety zone, and you turn right from the left lane at a hook turn sign.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. After each practice test, drill the questions you missed and retrain that test&apos;s set, then take all four tests back to back before your appointment. If you clear 78 percent on all four, you have covered the handbook.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Victoria Learner Permit Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the VicRoads learner permit test and what is the pass mark?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The learner permit knowledge test has 32 multiple-choice questions on road law and road safety, and you need 25 correct, about 78 percent, to pass. The practice tests here are 50 questions each and use the same 78 percent pass line, so clearing it on all four is a good sign you are ready.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How old do I have to be to get my Ls in Victoria?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You must be at least 16 to sit the test in person and be issued a learner permit. You can enrol in the online learner permit test from 15 years and 11 months, but the permit itself is only issued from 16. The test is taken with an eyesight check, and the permit is valid for 10 years.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is on the Victorian learner permit test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The questions are based on the Road to Solo Driving handbook: the learner and P plate rules, alcohol and drug limits, speed limits, road signs and markings, give way rules at intersections and roundabouts, turning and hook turns, freeways, parking, and sharing the road with pedestrians, bicycle riders, trams and trucks. The practice tests here cover all of those topics.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What are the rules once I have my learner permit?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              A learner must display L plates front and rear, carry the permit, have a zero BAC, drive only a car, not tow, and always have a supervising driver with a full (not probationary) licence beside them. Phones may only be used for navigation or audio set up before driving. If you are under 21 when you go for your licence, you must hold the permit for 12 months and log 120 hours of supervised driving, including 20 hours at night.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Is this the official VicRoads practice test?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Tigertest is an independent study tool. Every question is written from the current Road to Solo Driving handbook, which is where the real test questions come from, but these are not the actual test questions. The Hazard Perception Test you sit later for your P licence is a video test and is not modelled here.
            </p>
          </div>
        </div>
      </div>

      <ExamSampleQuestions examId="auvic" />

      <ExamRelatedTests examId="auvic" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your Ls?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every Road to Solo Driving topic.</p>
          <ExamLandingCTA dashboardHref="/vic-learner-permit/dashboard" />
        </div>
      </div>
    </div>
  );
}

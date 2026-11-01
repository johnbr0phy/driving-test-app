import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import "@/lib/banks/pkdrive";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Pakistan Driving Licence Test 2026 - Free Sign Test Practice";
const metaDescription =
  "Free Pakistan driving licence test practice: 200 original questions on road signs and traffic rules, four 50-question mock tests and every answer explained.";
const description =
  "Free practice for the driving licence sign and theory tests in Pakistan: 200 original questions on warning, regulatory and mandatory signs, road markings and signals, junctions and roundabouts, overtaking, motorways, safety and emergencies. Four 50-question mock tests and five training sets, for learners in Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and Islamabad.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "pakistan driving licence test, driving license test pakistan, e sign test punjab, road sign test pakistan, traffic signs test, dlims sign test practice, islamabad driving license test, karachi driving license test, learner permit test pakistan, driving test questions 2026",
  alternates: {
    canonical: `${siteUrl}/pakistan-driving-licence-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pakistan-driving-licence-test`,
    images: [{ url: shareImageUrl("pkdrive"), width: 1200, height: 630, alt: "Tigertest free Pakistan driving licence practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pkdrive")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the driving licence test in Pakistan?",
    a: "After a learner permit, you take a sign test (in some places with a short theory or rules test) and then a practical road test. The sign test shows road signs and asks what they mean, usually as multiple choice on a computer. Punjab calls it the e-sign test. The road test checks your control of the car, often including driving and parking between cones. Under the Motor Vehicles Ordinance, the examiner checks that you know the traffic signs, the driving regulations and the general rules of the Highway Code.",
  },
  {
    q: "How many questions are on the sign test and what is the pass mark?",
    a: "It depends on where you apply. Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and Islamabad each run their own test, and none publishes one national format. Guides describe the Punjab e-sign test as about ten multiple-choice questions, with reported pass marks from half to about seven in ten. Ask your licensing centre for the current rule. Tigertest's mock tests are 50 questions with an 80% target, so passing them leaves a good margin.",
  },
  {
    q: "Are the rules the same in every province?",
    a: "The signs and the rules of the road are shared across Pakistan: drive on the left, overtake on the right, give way to traffic from the right at roundabouts. What differs is the licensing process: how you apply (Dastak and DLIMS in Punjab, the Islamabad Traffic Police, Sindh's licence branches, KP's digital system), how long you wait on a learner permit, retake waits and fees.",
  },
  {
    q: "Who can get a driving licence in Pakistan?",
    a: "You must be at least 18 for a car licence for private use (21 to drive a car for pay), hold a valid CNIC, prove you live in the area where you apply and pass an eyesight check. You start on a learner permit and drive only with a licensed driver beside you and an L plate on the car, then take the sign test and road test after the waiting period your licensing authority sets.",
  },
  {
    q: "Are these the real test questions?",
    a: "No. Every question is original, written by Tigertest from the road signs used in Pakistan and the driving regulations of the Motor Vehicles Ordinance, so it tests the same knowledge without copying any official question. Signs are described in words, so look at pictures of the signs too. It is free practice, not affiliated with any provincial traffic police, the Islamabad Traffic Police or the National Highways and Motorway Police, and it does not book or replace your test.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Pakistan Driving Licence Practice Test",
      description,
      url: `${siteUrl}/pakistan-driving-licence-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
      featureList: [
        "200 Pakistan road sign and traffic rule questions",
        "4 mock tests of 50 questions",
        "5 training sets by topic",
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
  { name: "Regulatory, Mandatory & Information Signs", weight: "16%" },
  { name: "Warning Signs", weight: "14%" },
  { name: "Junctions, Roundabouts & Right of Way", weight: "12%" },
  { name: "Lanes, Overtaking, Speed & Parking", weight: "12%" },
  { name: "Licences, Documents & the Law", weight: "10%" },
  { name: "Markings, Lights & Signals", weight: "10%" },
  { name: "Seat Belts, Helmets & Safe Driving", weight: "10%" },
  { name: "Motorways & Highways", weight: "8%" },
  { name: "Night, Weather & Emergencies", weight: "8%" },
];

export default function PakistanDrivingLicenceLandingPage() {
  return (
    <div data-theme="pkdrive" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Pakistan Driving Licence Test Practice 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pakistan-driving-test/dashboard"
            shortName="Driving test"
            subtitle="200 original questions on the road signs and traffic rules every licensing centre in Pakistan tests: warning and regulatory signs, markings, roundabouts, overtaking, motorways and safety. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/pkdrive-mobile.png", desktop: "/landing/pkdrive-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pkdrive" />

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
                Five training sets cover warning signs, regulatory and information signs, markings and junctions, lanes and motorways, and licences, safety and emergencies. Questions you miss come back until you have mastered them.
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
                Four 50-question tests that together cover all 200 questions, with an 80% target. No question repeats across tests, and every answer explains the rule and the common wrong pick.
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
                Built on Pakistan&apos;s Signs and Driving Regulations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and Islamabad each run their own licence test, but they all test the same signs and the same rules of the road. Signs come first, as they do on the e-sign test, then the driving regulations of the Motor Vehicles Ordinance: keep left, overtake on the right, give way to the right at roundabouts and unmarked crossroads, and motorway lane discipline. Signs are described in words, and no speed limit figures are asked because they changed twice in 2026.
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
                src={getTigerAsset("pkdrive", 1)}
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
            How to Pass the Driving Licence Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn signs by shape and colour first</h3>
              <p>
                The sign test is where most applicants lose marks. Learn the families before the details: red triangles warn, red circles forbid, blue circles order, the red octagon means stop and the downward triangle means give way. Once you know the family, most signs explain themselves.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who goes first</h3>
              <p>
                Pakistan drives on the left. At a roundabout you give way to traffic from your right and go round clockwise. Joining a main road, you give way to its traffic; at an unmarked crossroads of equal roads, give way to traffic from your right. Turning right, wait for oncoming traffic, and always let people on a zebra crossing go first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Check your own licensing centre</h3>
              <p>
                Before you book, ask your licensing authority how many questions its sign test has, the pass mark, how long you must hold your learner permit and what to bring. These differ between Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and Islamabad, and some changed in 2025 and 2026.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Aim well above the pass mark</h3>
              <p>
                Aim for 45 or more in every mock test. Tigertest tracks your accuracy by topic, so drill the questions you missed, retrain the weakest set, then take all four tests back to back before your test day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Pakistan Driving Licence Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="pkdrive" />

      <ExamRelatedTests examId="pkdrive" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Get Your Driving Licence?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions on Pakistan&apos;s road signs and traffic rules.</p>
          <ExamLandingCTA dashboardHref="/pakistan-driving-test/dashboard" />
        </div>
      </div>
    </div>
  );
}

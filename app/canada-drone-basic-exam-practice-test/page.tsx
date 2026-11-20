import "@/lib/banks/cadronebasic";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free Canada Drone Basic Exam Practice Test 2026 - Small Basic Questions";
const metaDescription =
  "Free-to-start practice for Transport Canada's Small Basic Exam: 200 original questions on the drone rules in CARs Part IX and TP 15263, five 35-question tests like the real exam, every answer explained.";
const description =
  "Practice for Transport Canada's Small Basic Exam, the online test for the Pilot Certificate - Basic Operations: 200 original questions written from Part IX of the Canadian Aviation Regulations, the knowledge requirements in TP 15263 and the Transport Canada Aeronautical Information Manual. Five 35-question practice tests and four training sets covering registration and pilot certificates, the general operating rules, airspace and aerodromes, drone systems and batteries, human factors, weather, navigation and time, and flight operations and emergencies.";

const faqs = [
  {
    q: "What is the Transport Canada Small Basic Exam?",
    a: "It is the online exam for the Pilot Certificate - Basic Operations, which you need to fly a drone that weighs 250 g to 25 kg in Canada. Transport Canada gives you 35 multiple-choice questions and 90 minutes, and a score of 65% or higher is a pass. You take it online through Transport Canada's Drone Management Portal, in English or French, and you must be at least 14 years old.",
  },
  {
    q: "What can I do with a basic drone pilot certificate?",
    a: "Basic operations are flights of a small drone in uncontrolled airspace, at least 30 m (100 ft) horizontally from people who are not involved, at any altitude, and no closer than 3 nautical miles to the centre of an airport or 1 nautical mile to the centre of a heliport. Flying in controlled airspace, closer to people or with a medium drone needs an advanced certificate. The drone must also be registered and marked with its registration number.",
  },
  {
    q: "Did the drone rules change in 2025?",
    a: "Yes. Amendments to Part IX of the Canadian Aviation Regulations came into force in two stages, on April 1, 2025 and November 4, 2025. They added the Level 1 Complex certificate for some lower-risk flights beyond visual line-of-sight, rules for medium drones up to 150 kg, and sheltered and extended visual line-of-sight operations for advanced pilots. Basic operations are now defined as flights in uncontrolled airspace at least 30 m from uninvolved people. These practice tests follow the rules in force in November 2026.",
  },
  {
    q: "What do these practice tests cover?",
    a: "Each 35-question test mixes the topics Transport Canada marks for basic operations in TP 15263: registration, pilot certificates and recency, the general operating and flight rules of Part IX, airspace classes, aerodromes, forest fires and restricted airspace, drone systems, links and batteries, human factors, low-level weather, navigation, charts and time, and flight operations, emergencies and theory of flight.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from the Canadian Aviation Regulations, TP 15263, the TC AIM and Transport Canada's guidance, as in force in November 2026. Tigertest is not affiliated with Transport Canada, NAV CANADA or any flight school.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "transport canada drone exam, small basic exam, drone basic exam practice test, canada drone licence test, basic drone certificate canada, pilot certificate basic operations, tp 15263, cars part ix quiz, canadian drone rules test, rpas basic exam",
  alternates: {
    canonical: `${siteUrl}/canada-drone-basic-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/canada-drone-basic-exam-practice-test`,
    images: [{ url: shareImageUrl("cadronebasic"), width: 1200, height: 630, alt: "Tigertest free Canada drone basic exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cadronebasic")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Canada Drone Basic Exam Practice Test",
      description,
      url: `${siteUrl}/canada-drone-basic-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cadronebasic"),
      featureList: [
        "200 Canadian drone rules practice questions",
        "5 practice tests of 35 questions, like the real Small Basic Exam",
        "4 training sets by topic",
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
  { name: "Air law, registration & certificates", weight: "5 of 35" },
  { name: "General operating rules", weight: "6 of 35" },
  { name: "Airspace & aerodromes", weight: "5 of 35" },
  { name: "Drone systems & batteries", weight: "4 of 35" },
  { name: "Human factors", weight: "4 of 35" },
  { name: "Weather", weight: "4 of 35" },
  { name: "Navigation, charts & time", weight: "3 of 35" },
  { name: "Flight operations & emergencies", weight: "4 of 35" },
];

export default function CanadaDroneBasicLandingPage() {
  return (
    <div data-theme="cadronebasic" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Canada Drone Basic Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/canada-drone-basic/dashboard"
            shortName="Drone Basic"
            subtitle="200 Transport Canada Small Basic Exam questions. Five 35-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cadronebasic-mobile.png", desktop: "/landing/cadronebasic-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cadronebasic" />

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
                Four training sets follow TP 15263: air law and airspace; operating rules and navigation; drone systems and weather; and human factors and flight operations. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Real-Length Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five practice tests of 35 questions, the length of the real exam, each mixing every topic. The real exam passes at 65%; aim for 80% or better here. No question appears in more than one test, and every one comes with an explanation.
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
                Built on CARs Part IX and TP 15263
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Transport Canada writes the Small Basic Exam from its knowledge requirements document, TP 15263, which points to Part IX of the Canadian Aviation Regulations and topics from weather to human factors. Every practice test here mixes those topics, using the rules in force since the 2025 amendments.
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
                src={getTigerAsset("cadronebasic", 3)}
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
            How to Prepare for the Small Basic Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the numbers</h3>
              <p>
                250 g, 25 kg, 30 m, 122 m, 3 NM, 1 NM, 12 hours, 7 days and 24 months. Learn what each one belongs to: registration, the weight classes, distance from people, maximum altitude, airports and heliports, alcohol, registration notices and recency.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know where basic pilots may fly</h3>
              <p>
                Basic pilots stay in uncontrolled airspace. Learn the airspace classes, Class F restricted and advisory areas, forest fire restrictions and emergency security perimeters, and check the NRC drone site selection tool and NOTAMs before you fly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip the non-law topics</h3>
              <p>
                TP 15263 also covers batteries and links, GPS and compass errors, fog and wind, visual scanning, fatigue and alcohol, charts and UTC time, emergencies and basic theory of flight. They are a large share of every test here.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 80% or better on every practice test, well above the real 65%. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Canada Drone Basic Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="cadronebasic" />

      <ExamRelatedTests examId="cadronebasic" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Fly by the Rules?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across CARs Part IX and TP 15263.</p>
          <ExamLandingCTA dashboardHref="/canada-drone-basic/dashboard" />
        </div>
      </div>
    </div>
  );
}

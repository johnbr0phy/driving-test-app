import "@/lib/banks/cadroneadv";
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

const title = "Free Canada Drone Advanced Exam Practice Test 2026 - Advanced Questions";
const metaDescription =
  "Free-to-start practice for Transport Canada's Advanced Exam: 200 original questions on Division V, Standard 922 declarations, EVLOS, controlled airspace, METARs, TAFs and radio, in four 50-question tests like the real exam.";
const description =
  "Practice for Transport Canada's Advanced Exam, the online test for the Pilot Certificate - Advanced Operations: 200 original questions written from Part IX of the Canadian Aviation Regulations, Standard 922 RPAS Safety Assurance, the knowledge requirements in TP 15263, the Transport Canada Aeronautical Information Manual and ISED's radiotelephone guide. Four 50-question practice tests and four training sets covering advanced operations rules and certificates, safety assurance declarations, extended visual line-of-sight and sheltered operations, controlled airspace and aerodromes, radio procedures and transponder codes, METARs, TAFs and graphic area forecasts, the operational volume and operating rules, and transponders, systems and crew.";

const faqs = [
  {
    q: "What is the Transport Canada Advanced Exam?",
    a: "It is the online knowledge exam for the Pilot Certificate - Advanced Operations. Transport Canada gives you 50 multiple-choice questions and 60 minutes, and a score of 80% or higher is a pass. You take it online through Transport Canada's Drone Management Portal, in English or French, and you must be at least 16 years old. After passing, you complete an in-person flight review with a flight reviewer, usually booked through a drone flight school, and you need both to get the certificate.",
  },
  {
    q: "What can I do with an advanced drone pilot certificate?",
    a: "Advanced operations include flying a small drone in controlled airspace with an authorization from the air traffic services provider, closer than 30 m to people who are not involved, within 3 nautical miles of an airport or 1 nautical mile of a heliport under the established procedure, in extended visual line-of-sight or in a sheltered operation, and flying medium drones up to 150 kg in visual line-of-sight. Most of these also need a drone whose model has a safety assurance declaration under Standard 922 for that operation. Flights beyond visual line-of-sight outside the EVLOS and sheltered rules need the Level 1 Complex certificate.",
  },
  {
    q: "Did the advanced rules change in 2025?",
    a: "Yes. Amendments to Part IX of the Canadian Aviation Regulations came into force on April 1, 2025 and November 4, 2025. Advanced pilots gained extended visual line-of-sight and sheltered operations and medium drones from 25 kg to 150 kg, the safety assurance declarations were reworked, and a separate Level 1 Complex certificate was added for some lower-risk flights beyond visual line-of-sight. These practice tests follow the rules in force in November 2026.",
  },
  {
    q: "What do these practice tests cover?",
    a: "Each 50-question test mixes the topics TP 15263 lists for advanced operations: Division V rules, certificates and recency, Standard 922 declarations and modified drones, extended visual line-of-sight and sheltered operations, controlled airspace, NAV Drone authorizations and established procedures near aerodromes, radio procedure words and transponder codes, METARs, TAFs and graphic area forecasts, the operational volume and operating rules, and transponders, declared-system limits and crew resource management.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from the Canadian Aviation Regulations, Standard 922, TP 15263, the TC AIM and ISED's RIC-21, as in force in November 2026. Tigertest is not affiliated with Transport Canada, NAV CANADA or any flight school.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "transport canada advanced drone exam, drone advanced exam practice test, advanced drone licence canada, pilot certificate advanced operations, rpas advanced exam, tp 15263 advanced, standard 922 declarations, evlos sheltered operations canada, canadian drone advanced test",
  alternates: {
    canonical: `${siteUrl}/canada-drone-advanced-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/canada-drone-advanced-exam-practice-test`,
    images: [{ url: shareImageUrl("cadroneadv"), width: 1200, height: 630, alt: "Tigertest free Canada drone advanced exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cadroneadv")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Canada Drone Advanced Exam Practice Test",
      description,
      url: `${siteUrl}/canada-drone-advanced-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cadroneadv"),
      featureList: [
        "200 Canadian advanced drone rules practice questions",
        "4 practice tests of 50 questions, like the real Advanced Exam",
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
  { name: "Advanced operations rules", weight: "5 of 50" },
  { name: "Safety assurance declarations", weight: "7 of 50" },
  { name: "EVLOS, sheltered & distance bands", weight: "6 of 50" },
  { name: "Controlled airspace & aerodromes", weight: "8 of 50" },
  { name: "Radio procedures & transponder codes", weight: "5 of 50" },
  { name: "METAR, TAF & GFA", weight: "7 of 50" },
  { name: "Operational volume & operating rules", weight: "6 of 50" },
  { name: "Transponders, systems & crew", weight: "6 of 50" },
];

export default function CanadaDroneAdvancedLandingPage() {
  return (
    <div data-theme="cadroneadv" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Canada Drone Advanced Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/canada-drone-advanced/dashboard"
            shortName="Drone Advanced"
            subtitle="200 Transport Canada Advanced Exam questions. Four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cadroneadv-mobile.png", desktop: "/landing/cadroneadv-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cadroneadv" />

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
                Four training sets cover what the Advanced Exam adds to basic: Division V rules and declarations; EVLOS, sheltered flight and controlled airspace; radio and aviation weather; and operations, systems and crew. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, the length of the real exam, each mixing every topic. The real exam passes at 80%, so aim for that on every test here. No question appears in more than one test, and every one comes with an explanation.
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
                Built on CARs Part IX, Standard 922 and TP 15263
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Transport Canada writes the Advanced Exam from its knowledge requirements document, TP 15263, which points to Part IX of the Canadian Aviation Regulations, the airspace and radio rules pilots share with crewed aircraft, and aviation weather. Transport Canada publishes no topic weights, so this split is Tigertest&apos;s, using the rules in force since the 2025 amendments.
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
                src={getTigerAsset("cadroneadv", 3)}
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
            How to Prepare for the Advanced Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the distance bands</h3>
              <p>
                5 m, 30 m and 152.4 m from people; 61 m and 30 m for sheltered flight; 2 NM for EVLOS; 3 NM and 1 NM for airports and heliports. Learn which operation each band belongs to and which Standard 922 declaration it needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn to work with ATC</h3>
              <p>
                Advanced pilots fly in controlled airspace. Know the airspace classes, what an ANSP authorization request contains, how NAV Drone works, where established procedures are published, and how MF and ATF frequencies and transponder codes are used.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read the weather like a pilot</h3>
              <p>
                Practise decoding METARs and TAFs and reading graphic area forecasts: ceilings, visibility in statute miles, change groups such as TEMPO, FM and PROB, and which heights are above ground and which above sea level.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. The real pass mark is 80%, so there is little room for error: after each test, drill the questions you missed and retrain the weakest category before the next one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Canada Drone Advanced Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="cadroneadv" />

      <ExamRelatedTests examId="cadroneadv" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Advanced Operations?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across CARs Part IX, Standard 922 and TP 15263.</p>
          <ExamLandingCTA dashboardHref="/canada-drone-advanced/dashboard" />
        </div>
      </div>
    </div>
  );
}

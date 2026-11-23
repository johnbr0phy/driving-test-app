import "@/lib/banks/osha30";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free OSHA 30 Practice Test 2026 - 30-Hour Construction Final";
const metaDescription =
  "OSHA 30 practice test, free to start: 200 original questions on the 30-hour construction topics, from managing safety and fall protection to scaffolds, excavations, cranes, health hazards and PPE.";
const description =
  "Practice for the OSHA 30-hour Construction Outreach course final, free to start: 200 original questions written from OSHA's 30-hour construction topic list and the text of 29 CFR 1926, 1904 and 1910. Four 50-question practice tests and four training sets: managing safety, falls and ladders; scaffolds and electrical; excavations, cranes and concrete; and health hazards, PPE and fire.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "osha 30 practice test, osha 30 final exam questions, osha 30 construction test answers, osha 30 hour practice test, osha 30 quiz, osha 30 study guide, free osha 30 practice test 2026",
  alternates: {
    canonical: `${siteUrl}/osha-30-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/osha-30-practice-test`,
    images: [{ url: shareImageUrl("osha30"), width: 1200, height: 630, alt: "Tigertest OSHA 30 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("osha30")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is OSHA 30, and who should take it?",
    a: "OSHA 30 is the 30-hour class in OSHA's Outreach Training Program. OSHA says it is meant to give workers with some safety responsibility, such as foremen, supervisors and safety leads, a greater depth and variety of training than the 10-hour class. It comes in Construction and General Industry versions. The program is voluntary under federal law, but some states, cities, unions and employers require the card before you can work on a site.",
  },
  {
    q: "What does the OSHA 30 Construction class cover?",
    a: "OSHA's 2024 Construction procedures require at least 14 hours of set topics: introduction to OSHA (1 hour), managing safety and health (2), the Focus Four hazards of falls, electrocution, struck-by and caught-in or between (6, with at least 90 minutes on falls), personal protective equipment (2), health hazards in construction (2) and stairways and ladders (1). Another 12 hours cover at least six electives such as scaffolds, excavations, cranes and rigging, concrete and masonry, steel erection, confined spaces, fire protection, welding and tools, and 4 more hours are the trainer's choice.",
  },
  {
    q: "Is there an OSHA 30 final exam, and what score do I need?",
    a: "OSHA does not require a test for Outreach classes; trainers may give one at their discretion, and online providers usually end with a final. The provider sets its length, pass mark and number of attempts, so check yours. The practice tests here use 70% as Tigertest's readiness line. A class must be at least 30 contact hours, with no more than 7.5 hours a day, so it takes at least four days.",
  },
  {
    q: "Does this practice test cover OSHA 30 General Industry?",
    a: "It is built for the Construction class, the one most workers take. Topics the two classes share, such as managing safety and health, electrical, PPE, hazard communication, fall protection, confined spaces and welding, are covered through their construction rules. General Industry topics such as exit routes and emergency action plans, machine guarding and bloodborne pathogens are not modelled here.",
  },
  {
    q: "Are these real OSHA 30 exam questions?",
    a: "No. Every question is original, written by Tigertest from OSHA's 30-hour construction topic list and the standards themselves. Tigertest is not an OSHA-authorized Outreach course, does not issue a card and is not affiliated with OSHA or any trainer. Use it to learn the rules and check your readiness, then complete the class with an OSHA-authorized trainer. Start for free, no account needed; Tigertest Premium unlocks the rest with one payment and no subscription.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - OSHA 30 Practice Test",
      description,
      url: `${siteUrl}/osha-30-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("osha30"),
      featureList: [
        "200 OSHA 30 Construction practice questions",
        "4 practice tests of 50 questions",
        "4 training sets by topic",
        "Instant feedback with explanations that cite the standard",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("osha30"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "OSHA & Managing Safety", weight: "12%" },
  { name: "Falls, Stairways & Ladders", weight: "16%" },
  { name: "Scaffolds", weight: "10%" },
  { name: "Electrical & Power Lines", weight: "10%" },
  { name: "Excavations & Trenching", weight: "8%" },
  { name: "Cranes, Rigging & Materials", weight: "10%" },
  { name: "Concrete, Masonry & Steel", weight: "8%" },
  { name: "Health Hazards & Confined Spaces", weight: "10%" },
  { name: "PPE & Respirators", weight: "8%" },
  { name: "Fire, Welding & Tools", weight: "8%" },
];

export default function Osha30LandingPage() {
  return (
    <div data-theme="osha30" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free OSHA 30 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/osha-30/dashboard"
            shortName="OSHA 30"
            subtitle="200 questions on the OSHA 30-hour construction topics. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/osha30-mobile.png", desktop: "/landing/osha30-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="osha30" />

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
                Four training sets in the order of OSHA&apos;s 30-hour topics: managing safety, falls and ladders; scaffolds and electrical; excavations, cranes and concrete; and health hazards, PPE and fire. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions that mix every topic, each with a 70% readiness line. No question appears in more than one test, and every answer names the OSHA standard behind it, such as 1926.502 for fall protection or 1926.451 for scaffolds.
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
                Built on OSHA&apos;s 30-Hour Construction Topics
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                OSHA sets the topics and minimum hours for the 30-hour class, not exam weights, so the split below is Tigertest&apos;s. It leans on the required topics (managing safety, the Focus Four, PPE, health hazards, stairways and ladders) and covers the electives most classes teach: scaffolds, excavations, cranes and rigging, concrete and steel, fire, welding and tools.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("osha30", 3)}
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
            How to Pass the OSHA 30 Final
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Go past the OSHA 10 numbers</h3>
              <p>
                OSHA 30 expects the next layer of each rule: controlled access zones 6 to 25 feet from a leading edge, warning lines 34 to 39 inches high, net extents of 8, 10 and 13 feet, scaffold ties every 26 feet, and Type A, B and C soil slopes of 3/4, 1 and 1 1/2 to 1.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who does what</h3>
              <p>
                Many questions turn on roles: the competent person who spots hazards and can fix them, the qualified person who designs horizontal lifelines and trains scaffold users, the controlling employer on a multi-employer site, the controlling entity for crane ground conditions, and the entry supervisor who signs a confined space permit.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the paperwork a supervisor owns</h3>
              <p>
                Supervisors keep the records: recordable cases on the 300 Log within 7 days, what counts as first aid, privacy cases, the 300A certified by an executive, fall protection training certifications and the written silica exposure control plan.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weakest elective</h3>
              <p>
                Your class may stress different electives, so do not skip any. Tigertest tracks accuracy by topic: retrain the weakest set, then take all four practice tests and aim for 85% before your final.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          OSHA 30 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="osha30" />
        </div>
      </div>

      <ExamSampleQuestions examId="osha30" />

      <ExamRelatedTests examId="osha30" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your OSHA 30 Final?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the 30-hour construction topics.</p>
          <ExamLandingCTA dashboardHref="/osha-30/dashboard" />
        </div>
      </div>
    </div>
  );
}

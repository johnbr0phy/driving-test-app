import "@/lib/banks/trapper";
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

const title = "Free Trapper Education Practice Test 2026 - Trapper Ed Exam Prep";
const metaDescription =
  "Trapper education practice test, free to start: 200 original questions on furbearer management, regulations, Best Management Practices, foothold and body-gripping traps, cable devices, water and land sets, trapping safety and fur handling, every answer explained.";
const description =
  "Practice for your state's trapper education course test, free to start: 200 original questions written from the Association of Fish and Wildlife Agencies (AFWA) Trapper Education Manual and its trapping Best Management Practices. Four 50-question practice tests and four training sets covering trapping, conservation and the law; traps, gear and selective trapping; water sets, land sets and cable devices; and safety, running a trapline and handling fur.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "trapper education practice test, trapper ed test, trapper education exam, trapping course test, trapper education test answers, afwa trapper education, fur harvester education test, trapping license test, trapping best management practices",
  alternates: {
    canonical: `${siteUrl}/trapper-education-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/trapper-education-practice-test`,
    images: [{ url: shareImageUrl("trapper"), width: 1200, height: 630, alt: "Tigertest trapper education practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("trapper")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is trapper education?",
    a: "Trapper education is a course that teaches safe, humane, selective and legal trapping. The Association of Fish and Wildlife Agencies (AFWA) runs the North American Trapper Education Program and publishes its manual so that every state teaches the same core content: furbearer management, regulations, Best Management Practices, traps and sets, safety, running a trapline and handling fur.",
  },
  {
    q: "Do I need trapper education to get a trapping license?",
    a: "It depends on your state. Many states require first-time trappers to complete a trapper education course before they can buy a trapping license. Rules change, so check your state wildlife agency's regulations.",
  },
  {
    q: "How many questions are on the trapper education test, and what score do I need?",
    a: "There is no single national exam. Each state runs its own course, often an online course followed by a field day with an instructor, and sets its own test and passing score. Tigertest's practice tests have 50 questions each and use 80% as a readiness line.",
  },
  {
    q: "What are trapping Best Management Practices (BMPs)?",
    a: "BMPs are science-based recommendations from AFWA on traps and trapping techniques that meet standards for animal welfare, efficiency, selectivity, practicality and safety. They are not laws: each state decides how they are used. The bank covers the BMP criteria and how to use BMP traps.",
  },
  {
    q: "Are these the real course test questions?",
    a: "No. Every question is original, written by Tigertest from the AFWA Trapper Education Manual and the AFWA trapping BMP documents. Tigertest is not affiliated with AFWA or any state wildlife agency, and no course quiz or exam question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Trapper Education Practice Test",
      description,
      url: `${siteUrl}/trapper-education-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("trapper"),
      featureList: [
        "200 trapper education practice questions",
        "4 practice tests of 50 questions",
        "4 training sets by topic",
        "Instant feedback with explanations",
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
        classFaqJsonLd("trapper"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Trapping, History & Attitudes", weight: "8%" },
  { name: "Furbearer Management & Biology", weight: "8%" },
  { name: "Regulations & Responsibility", weight: "6%" },
  { name: "Best Management Practices", weight: "8%" },
  { name: "Traps, Anchoring & Tuning", weight: "12%" },
  { name: "Equipment, Bait, Lure & Urine", weight: "8%" },
  { name: "Selective Trapping", weight: "8%" },
  { name: "Water Sets", weight: "10%" },
  { name: "Land Sets & Cable Devices", weight: "12%" },
  { name: "Trapping Safety & Disease", weight: "8%" },
  { name: "Running a Trapline", weight: "6%" },
  { name: "Selling & Handling Fur", weight: "6%" },
];

export default function TrapperLandingPage() {
  return (
    <div data-theme="trapper" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Trapper Education Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/trapper-education/dashboard"
            shortName="Trapper Education"
            subtitle="200 trapper education questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/trapper-mobile.png", desktop: "/landing/trapper-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="trapper" />

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
                Four training sets: trapping, conservation and the law; traps, gear and selective trapping; water sets, land sets and cable devices; and safety, the trapline and fur. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions with an 80% readiness line. Your state sets the real pass mark. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on the AFWA Trapper Education Manual
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AFWA&apos;s manual, updated in 2022 to the trapper education standards AFWA developed with IHEA-USA, has 18 chapters, from history and furbearer management to traps, sets, safety and fur handling. No weights are published, so Tigertest splits each 50-question test across twelve topics: 4 history and attitudes, 4 management, 3 regulations, 4 BMPs, 6 traps, 4 equipment and attractors, 4 selective trapping, 5 water sets, 6 land sets and cable devices, 4 safety, 3 trapline and 3 fur.
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
                src={getTigerAsset("trapper", 3)}
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
            How to Pass Your Trapper Education Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know your traps and how they work</h3>
              <p>
                Kill-type and live-restraining traps, long-spring and coil-spring footholds, offset and laminated jaws, cage and colony traps, cable devices with their locks and stops, and how to anchor, tune, clean and dye traps.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the BMP criteria and selective trapping</h3>
              <p>
                Animal welfare, efficiency, selectivity, practicality and safety. Know how trap location, pan tension, bait choice and trigger shape keep pets and non-target animals out of your sets.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Walk through the common sets</h3>
              <p>
                Submersion, pocket, trail, cubby, den and channel sets in water; dirt-hole, flat, post and cubby sets and cable devices on land. Know which furbearers each set is for and the measurements that go with it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know your duties on the trapline</h3>
              <p>
                Permission, daily checks, releasing non-targets, ice and water safety, diseases, and how to skin, stretch and dry fur. Then take the 50-question tests and aim for 80% or better.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Trapper Education Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="trapper" />
        </div>
      </div>

      <ExamSampleQuestions examId="trapper" />

      <ExamRelatedTests examId="trapper" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Trapper Education Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on traps, sets, safety, BMPs and fur handling.</p>
          <ExamLandingCTA dashboardHref="/trapper-education/dashboard" />
        </div>
      </div>
    </div>
  );
}

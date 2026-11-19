import "@/lib/banks/ieplumbt2";
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

const title = "Free Plumbing Apprenticeship Phase 2 Practice Test 2026 - SOLAS Plumber Theory Prep";
const metaDescription =
  "Phase 2 plumbing practice test for Irish apprentices, free to start: 200 original questions on hot work, copper and mild steel pipework, cold and hot water services, valves and taps, central heating and controls, and drawings, every answer explained.";
const description =
  "Practice for the theory exams of Phase 2 of the SOLAS National Plumbing Apprenticeship in Ireland, free to start: 200 original questions on the four Phase 2 modules, Thermal Processes and Mild Steel Pipework, Domestic Hot and Cold Water Services, Central Heating, and Communications and Team Leadership. Written from the Building Regulations Technical Guidance Documents G, H, J and L, the Department of Housing and SEAI heating guide and HSA hot work guidance. Four 50-question practice tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "plumbing phase 2 practice test, plumber phase 2 exam, solas plumbing apprenticeship, plumbing apprenticeship ireland, phase 2 plumbing theory, plumber t2, etb plumbing course, plumbing apprentice exam questions",
  alternates: {
    canonical: `${siteUrl}/plumbing-apprenticeship-phase-2-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/plumbing-apprenticeship-phase-2-practice-test`,
    images: [{ url: shareImageUrl("ieplumbt2"), width: 1200, height: 630, alt: "Tigertest plumbing apprenticeship Phase 2 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ieplumbt2")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is Phase 2 of the plumbing apprenticeship?",
    a: "The SOLAS National Plumbing Apprenticeship has seven phases over at least four years. Phase 2 is the first off-the-job phase: 21 weeks in an Education and Training Board training centre, covering four modules: Thermal Processes and Mild Steel Pipework, Domestic Hot and Cold Water Services, Central Heating, and Communications and Team Leadership.",
  },
  {
    q: "How is Phase 2 assessed, and what is the pass mark?",
    a: "Apprentices are assessed by theory exams, practical assessments and skills demonstrations, and must pass every phase exam. SOLAS sets the papers and marking schemes centrally and the training centre marks them out of 100. The SOLAS pass grade is 50%, and results are graded fail, pass, merit or distinction. An apprentice who falls short is referred and can sit again.",
  },
  {
    q: "How many questions are on the Phase 2 theory exams?",
    a: "SOLAS does not publish the number of questions or the time for each theory paper. Tigertest's practice tests have 50 questions each, spread across the four Phase 2 modules, and use 50% as the pass line with a higher score as your target.",
  },
  {
    q: "Are the questions based on Irish rules?",
    a: "Yes. Water and drainage questions follow Technical Guidance Documents G and H, heating and hot water questions follow TGD J, TGD L and the Department of Housing and SEAI heating guide, safety questions follow HSA guidance and the Safety, Health and Welfare at Work Act 2005. UK rules are not used.",
  },
  {
    q: "Are these the real SOLAS exam questions?",
    a: "No. Every question is original, written by Tigertest from the official sources. Tigertest is not affiliated with SOLAS or any Education and Training Board, and no exam paper, sample assessment or course workbook question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Plumbing Apprenticeship Phase 2 Practice Test",
      description,
      url: `${siteUrl}/plumbing-apprenticeship-phase-2-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ieplumbt2"),
      featureList: [
        "200 Phase 2 plumbing practice questions",
        "4 practice tests of 50 questions",
        "4 training sets by module",
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
        classFaqJsonLd("ieplumbt2"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Hot Work & Site Safety", weight: "10%" },
  { name: "Copper Tube & Jointing", weight: "14%" },
  { name: "Mild Steel Pipework", weight: "14%" },
  { name: "Valves & Taps", weight: "8%" },
  { name: "Cold Water Services", weight: "14%" },
  { name: "Hot Water Services", weight: "14%" },
  { name: "Central Heating", weight: "18%" },
  { name: "Drawings, Calculations & Teamwork", weight: "8%" },
];

export default function IePlumbT2LandingPage() {
  return (
    <div data-theme="ieplumbt2" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Plumbing Apprenticeship Phase 2 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/plumbing-apprenticeship-phase-2/dashboard"
            shortName="Plumbing Phase 2"
            subtitle="200 original questions for the Phase 2 theory exams of the Irish plumbing apprenticeship: hot work and copper jointing, mild steel pipework, cold and hot water services, valves and taps, central heating and controls, and drawings. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/ieplumbt2-mobile.png", desktop: "/landing/ieplumbt2-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ieplumbt2" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Module</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: safety and copper jointing; mild steel pipework, valves and taps; domestic hot and cold water; and central heating with communications. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, marked against the SOLAS pass grade of 50%. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on the SOLAS Phase 2 Modules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Phase 2 runs for 21 weeks in an ETB training centre and has four modules. SOLAS publishes no weights for its theory papers, so Tigertest splits each 50-question test across eight topics: 5 hot work and safety, 7 copper jointing, 7 mild steel pipework, 4 valves and taps, 7 cold water, 7 hot water, 9 central heating and 4 drawings, calculations and teamwork.
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
                src={getTigerAsset("ieplumbt2", 3)}
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
            How to Pass Your Phase 2 Plumbing Theory Exams
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get hot work and jointing right</h3>
              <p>
                Hot work permits and fire watching, oxygen and gas cylinder safety, capillary and compression joints, flux, brazing, bending copper, and threading, measuring and bending mild steel tube.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the Irish water rules</h3>
              <p>
                TGD G: the kitchen sink on the service pipe, cistern sizes of 212 and 340 litres, the stopcock near the entry point, 6 litre WCs. TGD H: trap sizes and seals and branch connections.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know hot water and heating controls</h3>
              <p>
                Vented and unvented cylinders and their safety devices, boiler interlock, zoning over 100 m², programmers, cylinder thermostats and zone valves, inhibitors, condensate pipes and carbon monoxide alarms.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise the calculations</h3>
              <p>
                Scales, cistern volumes and weights, pressure from head of water, flow and cut lengths. Then take the 50-question tests and aim well above the 50% pass grade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Plumbing Phase 2 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ieplumbt2" />
        </div>
      </div>

      <ExamSampleQuestions examId="ieplumbt2" />

      <ExamRelatedTests examId="ieplumbt2" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Phase 2 Theory Exams?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on pipework, water services, heating and safety.</p>
          <ExamLandingCTA dashboardHref="/plumbing-apprenticeship-phase-2/dashboard" />
        </div>
      </div>
    </div>
  );
}

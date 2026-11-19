import "@/lib/banks/natecore";
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

const title = "Free NATE Core Exam Practice Test 2026 - NATE Core Prep";
const metaDescription =
  "NATE Core exam practice, free to start: 200 original questions on safety, tools, basic construction, basic science, comfort, temperature and humidity measurement and basic electricity, with every answer explained.";
const description =
  "Practice for the NATE Core exam, the 50-question knowledge exam that most NATE installation and service certifications require, free to start: 200 original questions written from NATE's Core exam KATE outline, OSHA and DOT safety rules, EPA, ENERGY STAR and ACCA guidance and HVAC physics. Four 50-question practice tests weighted like the real exam and four training sets: safety and tools; construction and basic science; comfort and measurements; and basic electricity.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "nate core practice test, nate core exam, nate core test questions, nate certification practice test, nate core study guide, hvac core exam, nate exam prep, north american technician excellence core",
  alternates: {
    canonical: `${siteUrl}/nate-core-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/nate-core-practice-test`,
    images: [{ url: shareImageUrl("natecore"), width: 1200, height: 630, alt: "Tigertest NATE Core practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("natecore")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the NATE Core exam?",
    a: "The Core exam from North American Technician Excellence (NATE) tests a technician's general knowledge, construction knowledge and HVACR knowledge in safety, tools, basic construction, basic science, achieving desired conditions, taking measurements and basic electricity. NATE says it is a requirement for most installation or service specialty certifications. On NATE's traditional pathway a technician passes the 50-question Core exam and a 100-question Specialty exam.",
  },
  {
    q: "How many questions are on the NATE Core exam?",
    a: "NATE's Core exam KATE lists 50 questions, closed book, with a 1.5 hour time limit, scored pass/fail. NATE sets the passing score with a Passing Score Study and says it may vary slightly between test forms; it does not publish a percentage. The practice tests here use 70% as a readiness line.",
  },
  {
    q: "What does the NATE Core exam cover?",
    a: "NATE weights the Core exam as Basic Electricity 26%, Safety 18%, Taking Temperature and Humidity Measurements 14%, Achieving Desired Conditions 14%, Tools 10%, Using Basic Science 10% and Basic Construction 8%. Each practice test here follows those weights: 13, 9, 7, 7, 5, 5 and 4 questions.",
  },
  {
    q: "How long does NATE certification last?",
    a: "NATE certifications are renewed every two years, either with 16 hours of continuing education in that period or by retaking the Specialty exam. NATE gives a 120-day grace period; a technician who lapses past it must retake both the Core and the Specialty exam.",
  },
  {
    q: "Are these the real NATE questions?",
    a: "No. Every question is original, written by Tigertest from NATE's Core exam KATE outline, federal OSHA and DOT rules, EPA, ENERGY STAR and ACCA guidance, a compressor maker's application bulletin and standard HVAC physics. Tigertest is not affiliated with North American Technician Excellence, and no NATE study guide or exam question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - NATE Core Exam Practice Test",
      description,
      url: `${siteUrl}/nate-core-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("natecore"),
      featureList: [
        "200 NATE Core practice questions",
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
        classFaqJsonLd("natecore"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Basic Electricity", weight: "26%" },
  { name: "Safety", weight: "18%" },
  { name: "Temperature & Humidity Measurements", weight: "14%" },
  { name: "Achieving Desired Conditions", weight: "14%" },
  { name: "Tools", weight: "10%" },
  { name: "Using Basic Science", weight: "10%" },
  { name: "Basic Construction", weight: "8%" },
];

export default function NateCoreLandingPage() {
  return (
    <div data-theme="natecore" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free NATE Core Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/nate-core/dashboard"
            shortName="NATE Core"
            subtitle="200 original questions for the NATE Core exam: safety, tools, basic construction, basic science, comfort, temperature and humidity measurements, and basic electricity. Four 50-question practice tests weighted like the real exam. Free to start, no account needed."
            shots={{ mobile: "/landing/natecore-mobile.png", desktop: "/landing/natecore-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="natecore" />

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
                Four training sets in NATE&apos;s order: safety and tools; construction and basic science; comfort and measurements; and basic electricity. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, the length of the real Core exam, weighted by NATE&apos;s seven sections, each with a 70% readiness line. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on NATE&apos;s Core Exam KATE
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NATE publishes the share of Core exam questions in each section. Each 50-question practice test follows it: 13 basic electricity, 9 safety, 7 measurements, 7 desired conditions, 5 tools, 5 basic science and 4 basic construction.
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
                src={getTigerAsset("natecore", 3)}
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
            How to Pass the NATE Core Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with basic electricity</h3>
              <p>
                It is the biggest section, about a quarter of the exam. Read ladder diagrams rung by rung, know how PSC, CSCR, shaded-pole, three-phase and ECM motors work, and practice Ohm&apos;s law and winding readings until they are quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the safety rules by number</h3>
              <p>
                Ladders 3 feet above the landing at a 4 to 1 angle, acetylene never above 15 psig, oxygen 20 feet from fuel gas, a fire watch for 30 minutes after brazing, lockout removed only by the person who applied it, and which SDS section holds what.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know sensible and latent heat</h3>
              <p>
                Be able to read wet bulb and dry bulb, find dew point and enthalpy on a psychrometric chart, and use 1.08 x CFM x temperature difference. Tie it to comfort: humidity below 60 percent, airflow and why an oversized unit leaves a home clammy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip the small sections</h3>
              <p>
                Tools, basic science and construction are more than a quarter of the exam together: tube tools, measuring and scale drawings, gas laws and absolute pressure, framing terms and air sealing. Then take the 50-question tests and aim for 85% before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          NATE Core Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="natecore" />
        </div>
      </div>

      <ExamSampleQuestions examId="natecore" />

      <ExamRelatedTests examId="natecore" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your NATE Core Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on all seven Core sections.</p>
          <ExamLandingCTA dashboardHref="/nate-core/dashboard" />
        </div>
      </div>
    </div>
  );
}

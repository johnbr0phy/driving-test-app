import "@/lib/banks/pesticide";
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

const title = "Free Pesticide Applicator Practice Test 2026 - Core Exam Prep";
const metaDescription =
  "Pesticide applicator core exam practice, free to start: 200 original questions on labels, laws, IPM, formulations, toxicity and first aid, PPE, the environment, storage, spills and calibration math, with every answer explained.";
const description =
  "Practice for the pesticide applicator core (general standards) exam that states, tribes and federal agencies give for private and commercial certification, free to start: 200 original questions written from the federal competency standards in 40 CFR 171, the label and Worker Protection Standard rules and the National Pesticide Applicator Certification Core Manual. Four 50-question practice tests and five training sets covering pest management and laws; labels and formulations; hazards, first aid and PPE; the environment, storage and spills; and mixing, calibration and application.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "pesticide applicator practice test, pesticide core exam practice, pesticide license test, pesticide applicator license exam, commercial pesticide applicator test, private applicator exam, pesticide certification test questions, core manual practice test",
  alternates: {
    canonical: `${siteUrl}/pesticide-applicator-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pesticide-applicator-practice-test`,
    images: [{ url: shareImageUrl("pesticide"), width: 1200, height: 630, alt: "Tigertest pesticide applicator practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pesticide")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the pesticide applicator core exam?",
    a: "Anyone who uses or supervises restricted use pesticides must be certified by a state, tribe or federal agency. Federal rules (40 CFR 171) require a written exam that covers a set of core standards for every applicator, plus a category exam for each type of work, such as agricultural, ornamental and turf or structural pest control. The core exam tests the general standards: labels, safety, the environment, pests, pesticides, equipment, application methods, laws and supervising others.",
  },
  {
    q: "How long is the core exam and what score do I need?",
    a: "Each certifying authority sets its own number of questions, time limit and passing score, so check your state lead agency. Federal rules set the conditions: the exam is written and proctored, candidates show government-issued photo ID, only reference materials the agency provides may be used, and commercial applicators must be at least 18. Tigertest uses 70% as a readiness line.",
  },
  {
    q: "How long does pesticide applicator certification last?",
    a: "Under 40 CFR 171.107, a commercial or private certification expires no more than five years after it is issued, and a state may set a shorter period. You recertify before it expires by passing an exam or completing approved continuing education.",
  },
  {
    q: "Is the core exam the same for private and commercial applicators?",
    a: "Not exactly. Commercial applicators pass the core exam plus a category exam for each type of work. Private applicators, who use restricted use pesticides to produce agricultural commodities on land they own, rent or manage, are certified under a general private applicator standard that covers much the same core knowledge. States run both, and many states write their own private applicator exams.",
  },
  {
    q: "Are these the real exam questions?",
    a: "No. Every question is original, written by Tigertest from the federal rules and the National Pesticide Applicator Certification Core Manual. Tigertest is not affiliated with the US EPA or any state lead agency, and no exam bank question was used.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Pesticide Applicator Practice Test",
      description,
      url: `${siteUrl}/pesticide-applicator-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("pesticide"),
      featureList: [
        "200 pesticide applicator practice questions",
        "4 practice tests of 50 questions",
        "5 training sets by topic",
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
        classFaqJsonLd("pesticide"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Pest Management & IPM", weight: "12%" },
  { name: "Pesticide Laws & Supervision", weight: "12%" },
  { name: "Pesticide Labeling", weight: "14%" },
  { name: "Formulations & Adjuvants", weight: "10%" },
  { name: "Hazards & First Aid", weight: "12%" },
  { name: "Personal Protective Equipment", weight: "8%" },
  { name: "Pesticides in the Environment", weight: "12%" },
  { name: "Transport, Storage & Spills", weight: "8%" },
  { name: "Mixing, Calibration & Application", weight: "12%" },
];

export default function PesticideLandingPage() {
  return (
    <div data-theme="pesticide" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Pesticide Applicator Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pesticide-applicator/dashboard"
            shortName="Pesticide Applicator"
            subtitle="200 original questions for the pesticide applicator core exam: labels and laws, IPM, formulations, toxicity and first aid, PPE, drift and groundwater, storage and spills, and calibration math. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/pesticide-mobile.png", desktop: "/landing/pesticide-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pesticide" />

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
                Five training sets: pest management and laws; labels and formulations; hazards, first aid and PPE; the environment, storage and spills; and mixing, calibration and application. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions with a 70% readiness line. Your state sets the real pass mark. No question appears in more than one test, and every answer comes with a short explanation.
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
                Built on the Federal Core Standards
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                40 CFR 171.103 lists ten core areas every applicator exam must cover, and the national core exam blueprint follows the 12 chapters of the core manual. No weights are published, so Tigertest splits each 50-question test across nine topics: 6 pest management, 6 laws, 7 labeling, 5 formulations, 6 hazards and first aid, 4 PPE, 6 environment, 4 storage and spills and 6 application.
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
                src={getTigerAsset("pesticide", 3)}
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
            How to Pass the Pesticide Core Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the label inside out</h3>
              <p>
                Signal words and toxicity categories, the restricted use statement, the ingredient statement, precautionary statements, REIs and preharvest intervals. Learn which words are mandatory and which are only advice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the federal rules</h3>
              <p>
                FIFRA and the label as law, FFDCA tolerances, Sections 18, 24(c) and 25(b), the Worker Protection Standard, and what a certified applicator owes the noncertified people they supervise.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think in exposure and movement</h3>
              <p>
                Risk is toxicity times exposure. Know how pesticides enter the body and what PPE stops them, and how they move by drift, volatility, runoff and leaching, and what makes each worse.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the math</h3>
              <p>
                Tank mixes, gallons per acre, area in square feet and acres, and percent active ingredient. Then take the 50-question tests and aim for about 85% before your exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Pesticide Applicator Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="pesticide" />
        </div>
      </div>

      <ExamSampleQuestions examId="pesticide" />

      <ExamRelatedTests examId="pesticide" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your Pesticide Core Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions on labels, safety, the environment and calibration.</p>
          <ExamLandingCTA dashboardHref="/pesticide-applicator/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/v2/banks/cobit";
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
import { SampleQuestionsV2 } from "@/components/v2/SampleQuestionsV2";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free COBIT 2019 Foundation Practice Test 2026 - ISACA Exam Prep";
const metaDescription =
  "Free COBIT 2019 Foundation practice exam: 195 original questions on ISACA's exam domains, with two full 75-question mock exams in 2 hours and an explanation on every answer.";
const description =
  "Free ISACA COBIT 2019 Foundation practice tests with 195 original questions written to the exam's eight domains: the framework introduction, the six governance system and three governance framework principles, the seven components of a governance system, the goals cascade, focus areas and design factors, the 40 governance and management objectives of the COBIT Core Model, performance management, designing a tailored governance system, implementation and the business case. Two full mock exams of 75 questions in 2 hours with the 65 percent pass line, plus seven drills, with an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the COBIT 2019 Foundation exam?",
    a: "The ISACA COBIT 2019 Foundation exam has 75 multiple-choice questions in 2 hours. It is taken online with a remote proctor, there are no prerequisites, and you need a score of 65 percent or higher to pass, which is about 49 of 75.",
  },
  {
    q: "Is COBIT 2019 Foundation still available now that COBIT 7 is out?",
    a: "ISACA replaced the COBIT 2019 Foundation certificate with the COBIT 7 Foundation certificate on 19 November 2026. ISACA's page says you can still buy the COBIT 2019 exam until 30 June 2027 to earn the COBIT 2019 certificate. This practice test covers COBIT 2019 only. ISACA sells the COBIT 7 framework through COBIT 7 Premium Access and has not published it openly, so COBIT 7 content is not modelled yet; we will add it once we can work from ISACA's public COBIT 7 material.",
  },
  {
    q: "What topics does the COBIT 2019 Foundation exam cover?",
    a: "ISACA weights eight domains: Governance System and Components 30 percent, Governance and Management Objectives 23, Principles 13, Framework Introduction 12, Implementation 8, Designing a Tailored Governance System 7, Performance Management 4 and Business Case 3. That means the seven components, the goals cascade, focus areas, design factors and the 40 objectives of the COBIT Core Model make up more than half of the exam.",
  },
  {
    q: "Is this practice test the same format as the real exam?",
    a: "Each practice test is 75 single-answer questions in 2 hours, weighted domain by domain like ISACA's outline, with the 65 percent pass line shown on your results. The questions are original and written from ISACA's public COBIT 2019 material, not taken from ISACA's sample questions. Practice Test 2 is held out of the drills, so it measures readiness rather than memory.",
  },
  {
    q: "Is the Tigertest COBIT practice test free?",
    a: "It is free to start, with no account required. Practice Test 1 and six of the seven drills are free; the last drill and the final practice test are part of Tigertest Premium, one payment with no subscription. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "COBIT 2019 Foundation practice test, COBIT practice exam, COBIT Foundation mock exam, ISACA COBIT questions, COBIT 2019 exam prep, COBIT certification practice, IT governance certification practice",
  alternates: {
    canonical: `${siteUrl}/cobit-2019-foundation-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cobit-2019-foundation-practice-test`,
    images: [{ url: shareImageUrl("cobit"), width: 1200, height: 630, alt: "Tigertest free COBIT 2019 Foundation practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cobit")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free COBIT 2019 Foundation Practice Test",
      description,
      url: `${siteUrl}/cobit-2019-foundation-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cobit"),
      featureList: [
        "195 original COBIT 2019 Foundation practice questions with explanations",
        "2 full mock exams of 75 questions in 2 hours, with the 65 percent pass line",
        "7 drills covering every domain of ISACA's exam outline",
        "All 40 objectives of the COBIT Core Model, the principles and the seven components",
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
        classFaqJsonLd("cobit"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Governance system and components", weight: "30%" },
  { name: "Governance and management objectives", weight: "23%" },
  { name: "Principles", weight: "13%" },
  { name: "Framework introduction", weight: "12%" },
  { name: "Implementation", weight: "8%" },
  { name: "Designing a tailored governance system", weight: "7%" },
  { name: "Performance management", weight: "4%" },
  { name: "Business case", weight: "3%" },
];

export default function CobitLandingPage() {
  return (
    <div data-theme="cobit" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free COBIT 2019 Foundation Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cobit-2019-foundation/dashboard"
            shortName="COBIT 2019"
            subtitle="195 COBIT 2019 Foundation questions and two 75-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/cobit-mobile.png", desktop: "/landing/cobit-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cobit" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Exam Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills cover every domain, from the six governance system principles and the seven components to the 40 objectives of the COBIT Core Model, the design workflow and the seven implementation phases. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Two 75-question tests in 2 hours, the real exam&apos;s length and pace, scored against the 65 percent pass line. Practice Test 2 is held out of the drills, so it shows whether you are ready to book.
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
                Weighted Like the Real Exam
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ISACA weights the COBIT 2019 Foundation exam by domain. Every Tigertest practice test follows the same split, so the governance system and its components, and the 40 governance and management objectives, get the most questions.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-right text-brand-dark font-semibold sm:whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("cobit", 3)}
                alt="Tigertest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Study guide */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          How to Pass COBIT 2019 Foundation
        </h2>
        <div className="space-y-8 text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the core model by domain</h3>
            <p>
              Know the five domains, EDM, APO, BAI, DSS and MEA, how many objectives each holds, and what each of the 40 objectives covers. Pay attention to the three objectives new in COBIT 2019: APO14 Managed Data, BAI11 Managed Projects and MEA04 Managed Assurance.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Tell the principles and components apart</h3>
            <p>
              Six governance system principles describe the governance system, and three governance framework principles describe the framework itself. Learn the seven component types and be able to say which component a RACI chart, a policy, a report or a skills framework belongs to.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Follow the goals cascade and the design workflow</h3>
            <p>
              The cascade runs from stakeholder drivers and needs to 13 enterprise goals, 13 alignment goals and the objectives. The design workflow uses the 11 design factors to set the initial scope, refine it and resolve conflicts, and the implementation life cycle has seven phases, from What are the drivers? to How do we keep the momentum going?
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Take a full mock exam under time</h3>
            <p>
              Two hours for 75 questions is about a minute and a half per question. Take Practice Test 2 last, and book the exam once you are scoring comfortably above 65 percent.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 dark:bg-gray-950 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
            COBIT 2019 Foundation Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
                <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
              </div>
            ))}
            <ExamClassFaq examId="cobit" />
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

      <SampleQuestionsV2 examId="cobit" />

      <ExamRelatedTests examId="cobit" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass COBIT 2019 Foundation?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 195 questions across every exam domain.</p>
          <ExamLandingCTA dashboardHref="/cobit-2019-foundation/dashboard" />
        </div>
      </div>
    </div>
  );
}

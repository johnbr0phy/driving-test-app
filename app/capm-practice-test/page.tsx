import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CAPM Practice Test 2026 - PMI CAPM Exam Prep";
const metaDescription =
  "Free CAPM practice exam questions on the current PMI CAPM outline: 180 original questions on project management fundamentals, predictive and agile methods, and business analysis.";
const description =
  "Free CAPM practice tests with 180 original questions written to the PMI CAPM Examination Content Outline: Project Management Fundamentals and Core Concepts 36 percent, Predictive Plan-Based Methodologies 17 percent, Agile Frameworks and Methodologies 20 percent and Business Analysis Frameworks 27 percent. Each 75-question test runs at the real exam's pace and mixes choose-two, matching and calculation items, with an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the CAPM exam?",
    a: "150 questions in 3 hours, of which 135 are scored and 15 are unscored pretest questions that are not identified. Question types include multiple choice, multiple response, matching, hotspot and a limited number of fill-in-the-blank items. You can take it at a Pearson VUE test center or online.",
  },
  {
    q: "What is on the CAPM exam?",
    a: "The CAPM Examination Content Outline has four domains: Project Management Fundamentals and Core Concepts (36 percent), Predictive Plan-Based Methodologies (17 percent), Agile Frameworks and Methodologies (20 percent) and Business Analysis Frameworks (27 percent). It is more knowledge-based than the PMP: expect definitions, life cycles, roles, scheduling and earned value basics, Scrum and Kanban, and requirements work.",
  },
  {
    q: "What score do I need to pass the CAPM?",
    a: "PMI does not publish a passing percentage. Your report shows pass or fail plus a rating for each domain: Above Target, Target, Below Target or Needs Improvement. Tigertest scores percent correct on its own practice items, so treat 70 percent as a readiness line and aim for 75 to 80 percent with every domain solid.",
  },
  {
    q: "Is this practice test the same format as the real CAPM?",
    a: "It is built like it at half the length. Each practice test is 75 questions in 90 minutes, the real exam's pace, weighted by the four domains, and mixes single-answer items with choose-two, matching grids and calculations such as cost variance, critical path and velocity that you type in. Hotspot items are not included. The questions are original and written to the outline, not taken from PMI or the PMBOK Guide.",
  },
  {
    q: "Is the Tigertest CAPM practice test free?",
    a: "Yes. Both practice tests and all six drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CAPM practice test, CAPM practice exam, free CAPM questions, CAPM exam prep, certified associate in project management practice test, CAPM exam questions 2026, PMI CAPM mock exam",
  alternates: {
    canonical: `${siteUrl}/capm-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/capm-practice-test`,
    images: [{ url: shareImageUrl("capm"), width: 1200, height: 630, alt: "Tigertest free CAPM practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("capm")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CAPM Practice Test",
      description,
      url: `${siteUrl}/capm-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "180 original CAPM practice questions with explanations",
        "2 full 75-question practice tests in 90 minutes, the real exam's pace",
        "6 drills covering all four domains of the CAPM exam outline",
        "Predictive, agile and business analysis questions in the outline's weights",
        "Choose-two, matching and typed calculation items",
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
        classFaqJsonLd("capm"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Project Management Fundamentals and Core Concepts", weight: "36%" },
  { name: "Business Analysis Frameworks", weight: "27%" },
  { name: "Agile Frameworks and Methodologies", weight: "20%" },
  { name: "Predictive, Plan-Based Methodologies", weight: "17%" },
];

export default function CapmLandingPage() {
  return (
    <div data-theme="capm" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CAPM Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/capm/dashboard"
            shortName="CAPM"
            subtitle="180 original questions on the current CAPM exam outline. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/capm-mobile.png", desktop: "/landing/capm-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="capm" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Six drills cover all four domains of the outline: life cycles, ethics and planning; roles and problem solving; predictive methods; agile frameworks; business analysis and requirements; and roadmaps and validation. Questions you miss come back until you have mastered them.
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
                Two 75-question tests in 90 minutes, the real exam&apos;s pace, weighted like the CAPM outline. Each mixes definitions, short scenarios, matching grids and quick calculations. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the CAPM Exam Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                PMI publishes the domain weighting in its CAPM Examination Content Outline. Every practice test here follows those weights: 27 fundamentals, 13 predictive, 15 agile and 20 business analysis questions out of 75, covering all 19 tasks in the outline.
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
                src={getTigerAsset("capm", 1)}
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
            How to Pass the CAPM Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Get the vocabulary right</h3>
              <p>
                The CAPM rewards precise definitions. Know a project from a program, portfolio and operations, a risk from an issue, an assumption from a constraint, and which document does what: the charter, project management plan, risk and stakeholder registers, WBS and its dictionary, and the baselines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know both ways of working</h3>
              <p>
                Learn when a predictive approach fits and when an adaptive one does, then the mechanics of each: critical path, fast tracking and crashing, change control and earned value on one side; Scrum roles, events and artifacts, Kanban, XP, user stories, velocity and burn charts on the other.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip business analysis</h3>
              <p>
                Business analysis is more than a quarter of the exam. Study the analyst&apos;s role next to the project manager&apos;s, requirement types, elicitation techniques such as interviews, workshops, observation and prototypes, traceability, product roadmaps, and the difference between verification and validation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the math, then drill your weak areas</h3>
              <p>
                Cost and schedule variance, CPI and SPI, critical path and float, communication channels and velocity forecasts are quick points if you know the formulas. Tigertest tracks your accuracy by domain, so retake the drill you miss most until you are comfortably over the 70 percent readiness line.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CAPM Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="capm" />
        </div>
      </div>

      <ExamRelatedTests examId="capm" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CAPM?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 180 questions across all four domains.</p>
          <ExamLandingCTA dashboardHref="/capm/dashboard" />
        </div>
      </div>
    </div>
  );
}

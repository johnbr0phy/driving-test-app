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

const siteUrl = SITE_URL;

const title = "Free PMP Practice Test 2026 - New Exam Outline";
const metaDescription =
  "Free PMP practice exam questions on the July 2026 PMP outline: 210 original situational questions on people, process and business environment, with case studies and EVM math.";
const description =
  "Free PMP practice tests with 210 original situational questions written to the PMI PMP Examination Content Outline effective July 2026: People 33 percent, Process 41 percent and Business Environment 26 percent, across predictive, agile and hybrid projects. Each 90-question test opens with a case study and mixes choose-two, matching and earned value calculation items, with an explanation on every answer.";

const faqs = [
  {
    q: "How many questions are on the PMP exam?",
    a: "180 questions in 240 minutes, of which 170 are scored and 10 are unscored pretest questions. Since the July 2026 update the exam opens with a case-study section, and there are two 10-minute breaks. Question types include multiple choice, multiple response, matching, drag-and-drop, hotspot, pull-down and graphic-based items.",
  },
  {
    q: "What changed on the PMP exam in July 2026?",
    a: "PMI introduced a new Examination Content Outline. The three domains are now weighted People 33 percent, Process 41 percent and Business Environment 26 percent (up from 8 percent), the tasks were consolidated from 35 to 26, and topics such as AI, sustainability, compliance and business value gained weight. About 40 percent of items reflect predictive approaches and 60 percent agile or hybrid ones.",
  },
  {
    q: "What score do I need to pass the PMP?",
    a: "PMI does not publish a passing percentage. Your report shows pass or fail plus a rating for each domain: Above Target, Target, Below Target or Needs Improvement. Tigertest scores percent correct on its own practice items, so treat 70 percent as a readiness line and aim for 75 to 80 percent with every domain solid.",
  },
  {
    q: "Is this practice test the same format as the real PMP?",
    a: "It is built like it at half the length. Each practice test is 90 questions in 120 minutes, the real exam's pace, opens with a five-question case study and mixes situational single-answer items with choose-two, matching grids and calculations such as CPI, SPI and EAC that you type in. The questions are original and written to the outline, not taken from PMI or the PMBOK Guide.",
  },
  {
    q: "Is the Tigertest PMP practice test free?",
    a: "Yes. Both practice tests and all seven drills are free, with no account required. Create a free account if you want your progress saved across your phone and computer.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "PMP practice test, PMP practice exam 2026, free PMP questions, PMP exam prep, new PMP exam July 2026, PMP situational questions, PMP earned value practice, project management professional practice test",
  alternates: {
    canonical: `${siteUrl}/pmp-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pmp-practice-test`,
    images: [{ url: shareImageUrl("pmp"), width: 1200, height: 630, alt: "Tigertest free PMP practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pmp")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free PMP Practice Test",
      description,
      url: `${siteUrl}/pmp-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "210 original situational PMP practice questions with explanations",
        "2 full 90-question practice tests in 120 minutes, each opening with a case study",
        "7 drills covering all 26 tasks of the July 2026 exam outline",
        "Predictive, agile and hybrid scenarios in PMI's 40/60 mix",
        "Choose-two, matching and earned value calculation items",
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
        classFaqJsonLd("pmp"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Process", weight: "41%" },
  { name: "People", weight: "33%" },
  { name: "Business Environment", weight: "26%" },
];

export default function PmpLandingPage() {
  return (
    <div data-theme="pmp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PMP Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pmp/dashboard"
            shortName="PMP"
            subtitle="210 original situational questions on the July 2026 exam outline. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/pmp-mobile.png", desktop: "/landing/pmp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pmp" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Drills by Task Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven drills cover all 26 tasks in the new outline: leading the team, stakeholders and communication, planning and value, schedule and finance, procurement and quality, governance and change, and risk. Questions you miss come back until you have mastered them.
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
                Two 90-question tests in 120 minutes, the real exam&apos;s pace. Each opens with a case study, then asks what you, the project manager, should do next on predictive, agile and hybrid projects. Practice Test 2 is held out of the drills, so it measures readiness.
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
                Built on the July 2026 PMP Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                PMI publishes the domain weighting in its Examination Content Outline. Every practice test here follows the new weights, covers all 26 tasks, and splits its scenarios roughly 40 percent predictive and 60 percent agile or hybrid, as PMI states for the real exam.
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
                src={getTigerAsset("pmp", 1)}
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
            How to Pass the PMP Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the project manager&apos;s mindset</h3>
              <p>
                Most questions describe a situation and ask what you should do first or next. The best answer usually understands the problem before acting, works with the people involved before escalating, follows the agreed process (change control on a predictive project, the product owner and backlog on an agile one) and serves the team rather than commanding it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know when each approach fits</h3>
              <p>
                Expect most scenarios to be agile or hybrid. Know why stable, costly-to-change work is planned predictively and why uncertain work is delivered in iterations, and how the two meet: milestones, governance gates, reporting that maps burnup charts to earned value.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Give the business environment real time</h3>
              <p>
                Business Environment is now about a quarter of the exam. Study governance and escalation thresholds, compliance and its consequences, organizational change, external changes such as regulation and new technology, sustainability and the responsible use of AI on a project.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the math, then drill your weak areas</h3>
              <p>
                Earned value (CPI, SPI, EAC, TCPI), PERT estimates, float, communication channels and expected monetary value are quick points if you know the formulas. Tigertest tracks your accuracy by task area, so retake the drill you miss most until you are comfortably over the 70 percent readiness line.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PMP Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="pmp" />
        </div>
      </div>

      <ExamRelatedTests examId="pmp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the PMP?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 210 questions across all three domains.</p>
          <ExamLandingCTA dashboardHref="/pmp/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/cpabar";
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

const title = "CPA BAR Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free CPA Exam BAR practice: 200 original multiple-choice questions on the AICPA's 2026 Business Analysis and Reporting blueprint, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the Business Analysis and Reporting (BAR) Discipline section of the Uniform CPA Examination: 200 original multiple-choice questions written from the AICPA's 2026 BAR blueprint. Four 50-question mock tests weighted like the real section's three content areas, and six training sets covering financial and cost analysis, budgeting, capital structure and investment decisions, intangibles, revenue and stock compensation, business combinations and consolidation, derivatives, leases and SEC reporting, and state and local governments.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cpa bar practice test, bar cpa exam practice questions, business analysis and reporting practice, cpa bar discipline, free cpa bar questions, cpa bar mcq, cpa bar mock exam, cpa bar 2026",
  alternates: {
    canonical: `${siteUrl}/cpa-bar-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cpa-bar-practice-test`,
    images: [{ url: shareImageUrl("cpabar"), width: 1200, height: 630, alt: "Tigertest free CPA BAR practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cpabar")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the CPA BAR section?",
    a: "Business Analysis and Reporting (BAR) is one of the three Discipline sections of the Uniform CPA Examination, and you take one Discipline section along with the three Core sections. The AICPA's 2026 blueprint splits BAR into three content areas: business analysis (40 to 50%), technical accounting and reporting (35 to 45%) and state and local governments (10 to 20%). The AICPA's summary of 2027 changes revises the wording of one state and local government task and does not change what is tested.",
  },
  {
    q: "How many questions are on BAR and what score do I need?",
    a: "BAR is a 4-hour section with 50 multiple-choice questions in two testlets of 25 and 7 task-based simulations, each half of the score. Scores are reported from 0 to 99 and 75 passes, but 75 is a scaled score, not 75 percent correct. The mock tests here use a 75 percent target as a readiness line.",
  },
  {
    q: "How is BAR different from FAR?",
    a: "FAR is the Core financial accounting section. BAR goes further: financial statement and cost analysis, budgeting, cost of capital and investment decisions, and the technical topics FAR leaves out, such as goodwill impairment, software and R&D costs, stock compensation, business combinations, variable interest entities, foreign currency translation, derivatives and hedges, lessor accounting, SEC reporting and employee benefit plans, plus a deeper look at state and local government reporting. The questions here are written to build on FAR without repeating it.",
  },
  {
    q: "Does this practice test cover task-based simulations?",
    a: "No. Every question here is multiple choice, which is half of your BAR score; task-based simulations, research tasks and preparing full statements from trial balances are not modelled. Every calculation, from variances and breakeven to goodwill, swap settlements and fund balance, is worked through in the explanation.",
  },
  {
    q: "Are these real CPA Exam questions?",
    a: "No. Every question is original, written by Tigertest from the AICPA's published BAR blueprint and the FASB, GASB, SEC and COSO sources it lists as references. It is practice, not affiliated with the AICPA, NASBA or any state board of accountancy, and it does not replace a full review course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CPA BAR Practice Test",
      description,
      url: `${siteUrl}/cpa-bar-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cpabar"),
      featureList: [
        "200 CPA BAR multiple-choice questions",
        "4 mock tests of 50 questions weighted like the AICPA blueprint",
        "6 training sets by content area",
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
  { name: "Business analysis", weight: "40-50%" },
  { name: "Technical accounting and reporting", weight: "35-45%" },
  { name: "State and local governments", weight: "10-20%" },
];

export default function CpaBarLandingPage() {
  return (
    <div data-theme="cpabar" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CPA BAR Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cpa-bar/dashboard"
            shortName="CPA BAR"
            subtitle="200 original multiple-choice questions on the AICPA's 2026 BAR blueprint: financial and cost analysis, budgets, capital and investment decisions, goodwill, revenue and stock compensation, business combinations, derivatives, leases, SEC reporting and state and local governments. Four 50-question mock tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/cpabar-mobile.png", desktop: "/landing/cpabar-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cpabar" />

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
                Six training sets: financial and cost analysis; budgets, capital and investments; intangibles, revenue and stock compensation; business combinations; derivatives, leases and SEC reporting; and state and local governments. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 multiple-choice questions in the blueprint&apos;s proportions, with a 75% target. No question appears in more than one test, and every calculation is worked through in the explanation.
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
                Built on the AICPA&apos;s BAR Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AICPA&apos;s 2026 blueprint gives each of BAR&apos;s three content areas a range, and the 2027 blueprint changes the wording of only one government task. Each mock test here gives business analysis 22 of 50 questions, technical accounting 20 and state and local governments 8, inside every range. Task-based simulations are not modelled.
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
                src={getTigerAsset("cpabar", 1)}
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
            How to Pass CPA BAR
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Work the analysis, not just the formula</h3>
              <p>
                Business analysis is the largest area. For each ratio, variance or budget figure, know what makes it rise or fall and what that says about the business, because the questions ask you to explain results as often as to compute them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the measurement rule for each technical topic</h3>
              <p>
                Goodwill is tested against the reporting unit&apos;s fair value, liability awards and contingent consideration are remeasured, and cash flow hedge gains wait in other comprehensive income. Write the measurement basis and where the change goes before you look at the choices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Keep government funds and government-wide apart</h3>
              <p>
                Governmental funds use the current financial resources focus and modified accrual; the government-wide statements use full accrual. Most government questions turn on which set of statements is asked about, so practice the reconciliation between them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice the multiple choice, then the simulations</h3>
              <p>
                Multiple choice is half the score, and the task-based simulations build on the same rules. Aim for 80% or better on every mock test here, then work through simulations with the AICPA&apos;s sample tests before you sit the section.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CPA BAR Frequently Asked Questions
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

      <ExamSampleQuestions examId="cpabar" />

      <ExamRelatedTests examId="cpabar" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CPA BAR?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every area of the AICPA&apos;s BAR blueprint.</p>
          <ExamLandingCTA dashboardHref="/cpa-bar/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/afsp";
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

const title = "Free AFTR Practice Test 2026 - IRS Annual Filing Season Program";
const metaDescription =
  "AFTR practice for the IRS Annual Filing Season Program, free to start: 200 original questions on the 2026 AFTR course outline and 2026 tax law, four 50-question mock tests, every answer explained.";
const description =
  "Practice, free to start, for the Annual Federal Tax Refresher (AFTR) course test that unenrolled preparers take for the IRS Annual Filing Season Program Record of Completion: 200 original multiple-choice questions written from IRS Publication 6079, the 2026 AFTR course outline for preparing 2026 individual returns, and the Revenue Procedure 2025-32 inflation adjustments it cites. Four 50-question mock tests across the outline's three domains, and four training sets covering new tax law, filing status and income, deductions and credits, and practices and professional responsibility.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "aftr practice test, annual federal tax refresher test, afsp test, annual filing season program practice test, aftr course test questions, irs afsp record of completion, aftr 2026",
  alternates: {
    canonical: `${siteUrl}/annual-federal-tax-refresher-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/annual-federal-tax-refresher-practice-test`,
    images: [{ url: shareImageUrl("afsp"), width: 1200, height: 630, alt: "Tigertest free AFTR practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("afsp")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the AFTR test?",
    a: "The Annual Federal Tax Refresher (AFTR) is a 6-hour continuing education course that ends with a knowledge-based comprehension test. Unenrolled preparers who are not exempt take it, with 10 more hours of federal tax law and 2 of ethics, to earn the IRS Annual Filing Season Program Record of Completion. IRS-approved CE providers write and give the test; the IRS publishes the outline (Publication 6079) and the test rules (Publication 6012).",
  },
  {
    q: "How many questions are on the AFTR test and what score do I need?",
    a: "Each AFTR test has 100 multiple-choice questions with four answers and one correct answer, covering all three domains of the outline. You have at most 3 continuous hours, and you must answer at least 70 percent correctly. The mock tests here are 50 questions with the same 70 percent target.",
  },
  {
    q: "Which tax year does the 2026 AFTR course cover?",
    a: "Publication 6079 (Rev. 5-2026) is the outline for preparing 2026 individual Form 1040 returns, the ones filed in 2027. It uses the 2026 inflation adjustments in Revenue Procedure 2025-32 and the 2025 tax law changes that first affect 2026 returns. Every question here uses 2026 rules and names the year of any dollar figure.",
  },
  {
    q: "When must I finish the AFTR course and test?",
    a: "Providers offer the 2026 course from June 1 to December 31, 2026, and the course and test must be finished by December 31 (midnight in your time zone) to count for the 2027 Annual Filing Season Program. You also need a PTIN renewed for 2027 and must consent to the Circular 230 duties before the IRS issues the Record of Completion.",
  },
  {
    q: "Are these real AFTR test questions?",
    a: "No. Every question is original, written by Tigertest from the IRS course outline, the Internal Revenue Code and IRS publications. It is practice, not affiliated with the IRS or any continuing education provider, and it does not replace an IRS-approved AFTR course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free AFTR Practice Test",
      description,
      url: `${siteUrl}/annual-federal-tax-refresher-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("afsp"),
      featureList: [
        "200 AFTR multiple-choice questions on 2026 tax law",
        "4 mock tests of 50 questions across all three domains",
        "4 training sets by outline domain",
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
  { name: "New tax law and recent updates", weight: "14 of 50" },
  { name: "General review", weight: "26 of 50" },
  { name: "Practices, procedures and professional responsibility", weight: "10 of 50" },
];

export default function AnnualFederalTaxRefresherLandingPage() {
  return (
    <div data-theme="afsp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free AFTR Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/annual-federal-tax-refresher/dashboard"
            shortName="AFTR Test"
            subtitle="200 IRS AFTR questions and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/afsp-mobile.png", desktop: "/landing/afsp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="afsp" />

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
                Four training sets that follow the IRS outline: new tax law and recent updates, filing status, income and Schedule C, deductions, credits and general topics, and practices and professional responsibility. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 multiple-choice questions, each with four answers and one correct, mixing all three domains of the IRS outline, with the real test&apos;s 70% target. No question appears in more than one test, and every calculation is worked through in the explanation.
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
                Built on the IRS AFTR Course Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                IRS Publication 6079 lists the topics of the 2026 AFTR course in three domains, and every topic must be tested. The IRS sets no domain weights, so each mock test here spreads its 50 questions by the number of topics in each domain: new law and updates, the general review of Form 1040, and practice and professional responsibility.
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
                src={getTigerAsset("afsp", 3)}
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
            How to Pass the AFTR Test
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the 2026 numbers, not last year&apos;s</h3>
              <p>
                The 2026 course is for 2026 returns filed in 2027, so it uses the Revenue Procedure 2025-32 figures: the $16,100 and $32,200 standard deductions, the $2,200 child tax credit, the $350 educator expense limit and the 72.5-cent business mileage rate.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know what changed in 2026</h3>
              <p>
                Several 2025 law changes start on 2026 returns: the 50% dependent care credit rate, the 90% limit on gambling losses, the 0.5% floor on itemized charitable gifts, the $1,000 charitable deduction for non-itemizers and the end of the premium tax credit repayment caps.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Work every phaseout on paper</h3>
              <p>
                The SALT limit, the dependent care rate, the student loan interest deduction and IRA deductions all phase out with income. Write each step, then check the result against the choices; the explanations here show every step.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip the practice domain</h3>
              <p>
                Due diligence, preparer penalties, e-file rules, identity theft, data security and the limits on Annual Filing Season Program representation are short topics, and every one of them is tested.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          AFTR Test Frequently Asked Questions
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

      <ExamSampleQuestions examId="afsp" />

      <ExamRelatedTests examId="afsp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for the AFTR Test?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the 2026 AFTR course outline.</p>
          <ExamLandingCTA dashboardHref="/annual-federal-tax-refresher/dashboard" />
        </div>
      </div>
    </div>
  );
}

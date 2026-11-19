import "@/lib/banks/ea2";
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

const title = "Free Enrolled Agent Exam Part 2 Practice Test 2026 - SEE Businesses";
const metaDescription =
  "Free Enrolled Agent (SEE) Part 2 practice: 200 original questions on the IRS Part 2 Businesses outline and 2025 tax law, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for Part 2 (Businesses) of the IRS Special Enrollment Examination for enrolled agents: 200 original multiple-choice questions written from the IRS content outline in PSI's Candidate Information Bulletin and the 2025 tax law the current testing window uses. Four 50-question mock tests weighted like the real part's three domains, and five training sets covering entities and partnerships, C and S corporations, business income and expenses, assets and accounting methods, and trusts, exempt organizations, retirement plans, farmers and rentals.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "enrolled agent exam part 2 practice test, see part 2 practice questions, ea exam part 2, special enrollment examination businesses, free enrolled agent practice test, irs ea exam questions, see part 2 2026",
  alternates: {
    canonical: `${siteUrl}/enrolled-agent-part-2-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/enrolled-agent-part-2-practice-test`,
    images: [{ url: shareImageUrl("ea2"), width: 1200, height: 630, alt: "Tigertest free Enrolled Agent Part 2 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ea2")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on Part 2 of the Enrolled Agent exam?",
    a: "Part 2 of the Special Enrollment Examination (SEE) covers business taxation. The IRS content outline in the Candidate Information Bulletin lists three domains with their scored questions: business entities and considerations (30), business tax preparation (37) and specialized returns and taxpayers (18), which covers trusts and estates, exempt organizations, retirement plans, farmers and rental property.",
  },
  {
    q: "How many questions are on Part 2 and what score do I need?",
    a: "Each part has 100 multiple-choice questions, 85 scored and 15 unscored, in 3.5 hours. Results are scaled from 200 to 800 and the IRS passing score is 500, which is not a fixed percentage. The mock tests here are 50 questions at the same pace, with a 70 percent target as a readiness line.",
  },
  {
    q: "Which tax year does the exam test?",
    a: "For exams taken from July 1, 2026 to February 28, 2027, the bulletin says questions follow the Internal Revenue Code, regulations and IRS forms and publications as amended through December 31, 2025, and relate to calendar year 2025 unless stated. Every question here uses 2025 rules, including the 2025 changes to bonus depreciation and domestic research costs.",
  },
  {
    q: "When can I take the SEE?",
    a: "The exam is given by PSI for the IRS, in person at a PSI test center or by remote proctoring, both in the U.S. for now (international testing is delayed). The current window runs July 1, 2026 to February 28, 2027, with no testing in March and April while the exam is updated. Each part can be taken up to four times a window, in any order, and a passed part carries over for three years.",
  },
  {
    q: "Are these real Enrolled Agent exam questions?",
    a: "No. Every question is original, written by Tigertest from the IRS content outline, the Internal Revenue Code, Treasury regulations and IRS forms, instructions and publications. It is practice, not affiliated with the IRS or PSI, and it does not replace the IRS's own study materials.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Enrolled Agent Part 2 Practice Test",
      description,
      url: `${siteUrl}/enrolled-agent-part-2-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ea2"),
      featureList: [
        "200 SEE Part 2 multiple-choice questions",
        "4 mock tests of 50 questions weighted like the IRS outline",
        "5 training sets by topic",
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
  { name: "Business entities and considerations", weight: "30 questions" },
  { name: "Business tax preparation", weight: "37 questions" },
  { name: "Specialized returns and taxpayers", weight: "18 questions" },
];

export default function EnrolledAgentPart2LandingPage() {
  return (
    <div data-theme="ea2" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Enrolled Agent Part 2 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/enrolled-agent-part-2/dashboard"
            shortName="SEE Part 2"
            subtitle="200 original questions on the IRS Part 2 Businesses outline and 2025 tax law: entities and partnerships, C and S corporations, business income and expenses, depreciation and accounting methods, payroll, trusts, exempt organizations, retirement plans, farmers and rentals. Four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/ea2-mobile.png", desktop: "/landing/ea2-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ea2" />

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
                Five training sets: entities and partnerships, C and S corporations, business income and expenses, assets and accounting, and specialized returns. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 multiple-choice questions in the IRS outline&apos;s proportions, at the real exam&apos;s pace, with a 70% target. No question appears in more than one test, and every calculation is worked through in the explanation.
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
                Built on the IRS Part 2 Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The IRS content outline gives each of Part 2&apos;s three domains a set number of the 85 scored questions. Each mock test here scales those counts to 50, so business tax preparation makes up 22 of every 50 questions. The 15 unscored experimental questions are not modelled.
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
                src={getTigerAsset("ea2", 3)}
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
            How to Pass SEE Part 2
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Use the 2025 rules for depreciation</h3>
              <p>
                The current window tests calendar year 2025. That year has two bonus depreciation rates, 100% for property acquired after January 19, 2025 and 40% for earlier acquisitions, and new section 174A lets domestic research costs be deducted again.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know basis cold for partners and shareholders</h3>
              <p>
                Business entities is 30 scored questions. Partner and S shareholder basis, the order of adjustments, distributions in excess of basis and liabilities come up again and again, often as numbers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the forms and deadlines by entity</h3>
              <p>
                Forms 1065 and 1120-S are due in March, Form 1120 and Form 1041 in April, Form 990 in May. Pair each return with its extension form and length, and with the election forms: 2553, 8832, 3115, 8869.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip the specialized returns</h3>
              <p>
                Specialized returns and taxpayers is 18 scored questions: trust DNI and exemptions, exempt organization filings and unrelated business income, SEP and SIMPLE rules, farm income and rental property limits. Each topic is small and learnable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Enrolled Agent Part 2 Frequently Asked Questions
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

      <ExamSampleQuestions examId="ea2" />

      <ExamRelatedTests examId="ea2" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass SEE Part 2?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the IRS Part 2 outline.</p>
          <ExamLandingCTA dashboardHref="/enrolled-agent-part-2/dashboard" />
        </div>
      </div>
    </div>
  );
}

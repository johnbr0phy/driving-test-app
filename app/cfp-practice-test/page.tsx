import "@/lib/banks/cfp";
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

const title = "CFP Exam Practice Test 2026 - Free CFP Certification Exam Questions";
const metaDescription =
  "Free CFP exam practice: 200 original questions on CFP Board's eight Principal Knowledge Domains, from ethics and the planning process to tax, retirement and estate planning, with every calculation explained.";
const description =
  "Free practice for the CFP Board CFP Certification Examination: 200 original questions written to the eight Principal Knowledge Domains. Four 50-question practice tests weighted like the real exam, and five training sets covering professional conduct, planning principles, insurance, investments, tax, retirement, estate planning and the psychology of financial planning, with every calculation shown step by step.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cfp practice test, cfp exam practice questions, cfp certification exam, certified financial planner exam 2026, cfp board exam sample questions, cfp mock exam",
  alternates: {
    canonical: `${siteUrl}/cfp-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cfp-practice-test`,
    images: [{ url: shareImageUrl("cfp"), width: 1200, height: 630, alt: "Tigertest free CFP exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cfp")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the CFP Certification Examination?",
    a: "It is the exam CFP Board requires for CFP certification, alongside its education, experience and ethics requirements. It tests whether you can apply financial planning knowledge to client situations, with questions written by practicing professionals and linked to CFP Board's Principal Knowledge Topics.",
  },
  {
    q: "How many questions are on the CFP exam and how long is it?",
    a: "170 multiple-choice questions in two 3-hour sections of 85, with a 40-minute break between them and an optional break inside the first section. CFP Board gives it three times a year in 8-day windows at Prometric test centers. It is pass or fail on your total score, each question is worth one point, and CFP Board publishes no percentage pass mark, so the 70% line here is Tigertest's readiness target. The July 2026 pass rate was 66%.",
  },
  {
    q: "What topics does the CFP exam cover?",
    a: "Eight Principal Knowledge Domains with approximate weights: Professional Conduct and Regulation 8%, General Principles of Financial Planning 15%, Risk Management and Insurance Planning 11%, Investment Planning 17%, Tax Planning 14%, Retirement Savings and Income Planning 18%, Estate Planning 10% and Psychology of Financial Planning 7%. Each 50-question practice test here keeps that balance.",
  },
  {
    q: "Does the CFP exam have case studies?",
    a: "Yes. Besides stand-alone questions, the real exam has short scenarios with about three questions each and longer case studies with 8 to 12 questions. This practice test writes every question as a self-contained item with its own facts, so it does not model the item sets or case studies; practice reading longer cases as well.",
  },
  {
    q: "Are these real CFP exam questions?",
    a: "No. Every question is original, written by Tigertest from CFP Board's topic list, its Code of Ethics and Standards of Conduct, and federal tax, retirement and insurance law. Tax questions use rules that do not change each year, and the one dated figure, the 2026 gift tax annual exclusion, is named with its year. It is free to start and not affiliated with or endorsed by CFP Board.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CFP Exam Practice Test",
      description,
      url: `${siteUrl}/cfp-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cfp"),
      featureList: [
        "200 CFP exam practice questions",
        "4 practice tests of 50 questions weighted like CFP Board's eight domains",
        "5 training sets covering all eight Principal Knowledge Domains",
        "Worked calculations in every tax, investment and retirement explanation",
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
  { name: "Professional Conduct and Regulation", weight: "8%" },
  { name: "General Principles of Financial Planning", weight: "15%" },
  { name: "Risk Management and Insurance Planning", weight: "11%" },
  { name: "Investment Planning", weight: "17%" },
  { name: "Tax Planning", weight: "14%" },
  { name: "Retirement Savings and Income Planning", weight: "18%" },
  { name: "Estate Planning", weight: "10%" },
  { name: "Psychology of Financial Planning", weight: "7%" },
];

export default function CfpLandingPage() {
  return (
    <div data-theme="cfp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CFP Exam Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cfp/dashboard"
            shortName="CFP Exam"
            subtitle="200 CFP Certification Exam questions and four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/cfp-mobile.png", desktop: "/landing/cfp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cfp" />

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
                Five training sets covering all eight domains: conduct and planning principles, insurance and investments, tax, retirement, and estate planning with the psychology of planning. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions in CFP Board&apos;s domain weights, with a 70% readiness line. No question appears in more than one test, and every calculation is worked out in the explanation.
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
                Built on CFP Board&apos;s Eight Domains
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CFP Board gives an approximate weight for each Principal Knowledge Domain. Each practice test here keeps about the same balance in 50 questions: 4 conduct, 8 planning principles, 5 insurance, 9 investment, 7 tax, 9 retirement, 5 estate and 3 psychology.
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
                src={getTigerAsset("cfp", 3)}
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
            How to Prepare for the CFP Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with the biggest domains</h3>
              <p>
                Retirement Savings and Income Planning (18%), Investment Planning (17%), General Principles (15%) and Tax Planning (14%) make up almost two thirds of the exam. Master Social Security claiming, RMDs, plan types, risk-adjusted returns, bond math and basis rules before the smaller domains.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Work every calculation on your calculator</h3>
              <p>
                Time value of money, education funding, Sharpe ratio and alpha, duration, the exclusion ratio and capital needs come up again and again. Do each one on the financial calculator you will bring until the keystrokes are automatic, then check the working in the explanation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the Code of Ethics and the seven steps</h3>
              <p>
                Professional conduct questions turn on the fiduciary duty, when the Practice Standards apply, conflict disclosure and the order of the seven-step planning process. Learn them from CFP Board&apos;s own Standards, not from memory of an older version.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practice reading long cases</h3>
              <p>
                The real exam has short scenarios and case studies of 8 to 12 questions. These practice items are self-contained, so add timed practice with long client cases, and use the practice tests here to find the domains you miss most.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CFP Exam Frequently Asked Questions
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

      <ExamSampleQuestions examId="cfp" />

      <ExamRelatedTests examId="cfp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practice for the CFP Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all eight Principal Knowledge Domains.</p>
          <ExamLandingCTA dashboardHref="/cfp/dashboard" />
        </div>
      </div>
    </div>
  );
}

import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { SITE_URL } from "@/lib/siteUrl";

const siteUrl = SITE_URL;

const title = "CPA REG Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free CPA Exam REG practice: 200 original multiple-choice questions on the AICPA's 2026 Taxation and Regulation blueprint, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the Taxation and Regulation (REG) section of the Uniform CPA Examination: 200 original multiple-choice questions written from the AICPA's 2026 REG blueprint. Four 50-question mock tests weighted like the real section's five content areas, and six training sets covering ethics and tax procedures, business law, property and gross income, deductions and credits, C corporations, and S corporations, partnerships and exempt organizations.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cpa reg practice test, reg cpa exam practice questions, cpa exam regulation, taxation and regulation practice, free cpa reg questions, cpa reg mcq, cpa reg mock exam, cpa reg 2026",
  alternates: {
    canonical: `${siteUrl}/cpa-reg-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cpa-reg-practice-test`,
    images: [{ url: shareImageUrl("cpareg"), width: 1200, height: 630, alt: "Tigertest free CPA REG practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cpareg")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the CPA REG section?",
    a: "Taxation and Regulation (REG) is one of the three Core sections of the Uniform CPA Examination. The AICPA's 2026 blueprint splits it into five content areas: ethics, professional responsibilities and federal tax procedures (10 to 20%), business law (15 to 25%), federal taxation of property transactions (5 to 15%), federal taxation of individuals (22 to 32%) and federal taxation of entities (23 to 33%).",
  },
  {
    q: "How many questions are on REG and what score do I need?",
    a: "REG is a 4-hour section with 72 multiple-choice questions in two testlets and 8 task-based simulations, each half of the score. Scores are reported from 0 to 99 and 75 passes, but 75 is a scaled score, not 75 percent correct. The mock tests here use a 75 percent target as a readiness line.",
  },
  {
    q: "Does this practice test cover task-based simulations?",
    a: "No. Every question here is multiple choice, which is half of your REG score. Task-based simulations, including tax return preparation and research tasks with excerpts of the Internal Revenue Code, are not modelled, so practise those with the AICPA's own sample tests as well.",
  },
  {
    q: "Do I need to memorize tax brackets and inflation-adjusted amounts?",
    a: "The AICPA blueprint says candidates are not tested on tax rates, amounts or limits that are indexed to inflation, so the questions here use rules that stay put: the 21% corporate rate, the 7.5% medical floor, the $3,000 capital loss limit, holding periods, filing deadlines and the like. Provisions of the 2025 tax act became testable on REG from July 1, 2026.",
  },
  {
    q: "Are these real CPA Exam questions?",
    a: "No. Every question is original, written by Tigertest from the AICPA's published REG blueprint and the Internal Revenue Code, Circular 230 and the uniform acts it lists. It is free practice, not affiliated with the AICPA, NASBA or any state board of accountancy, and it does not replace a full review course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CPA REG Practice Test",
      description,
      url: `${siteUrl}/cpa-reg-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CPA REG multiple-choice questions",
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
  { name: "Ethics, professional responsibilities and tax procedures", weight: "10-20%" },
  { name: "Business law", weight: "15-25%" },
  { name: "Federal taxation of property transactions", weight: "5-15%" },
  { name: "Federal taxation of individuals", weight: "22-32%" },
  { name: "Federal taxation of entities", weight: "23-33%" },
];

export default function CpaRegLandingPage() {
  return (
    <div data-theme="cpareg" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CPA REG Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cpa-reg/dashboard"
            shortName="CPA REG"
            subtitle="200 original multiple-choice questions on the AICPA's 2026 REG blueprint: tax procedures and Circular 230, business law, basis and depreciation, individual and entity taxation. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cpareg-mobile.png", desktop: "/landing/cpareg-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cpareg" />

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
                Six training sets: ethics and tax procedures, business law, property and gross income, deductions, losses and credits, C corporations, and S corporations, partnerships and exempt organizations. Questions you miss come back until you have mastered them.
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
                Built on the AICPA&apos;s REG Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AICPA&apos;s 2026 blueprint gives each of REG&apos;s five content areas a range. Each mock test here sits at the middle of those ranges, so federal taxation of individuals and of entities make up 28 of every 50 questions. Task-based simulations are not modelled.
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
                src={getTigerAsset("cpareg", 1)}
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
            How to Pass CPA REG
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn basis before anything else</h3>
              <p>
                Gifts, inheritances, wash sales, partnership contributions and S corporation stock all come down to basis. Write the starting basis, what adds to it and what takes it away, in that order, before you look at the choices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know what is separately stated</h3>
              <p>
                Partnership and S corporation questions turn on which items stay in ordinary business income and which pass through on their own: capital gains, section 1231 gains, charitable gifts, dividends and tax-exempt income. Guaranteed payments are deducted first.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip ethics and business law</h3>
              <p>
                Areas I and II are up to 45% of the section and mostly tested at the remembering and understanding level. Circular 230, preparer penalties, the statute of limitations, agency, contracts, secured transactions and bankruptcy priorities are quick points once memorized.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise the multiple choice, then the simulations</h3>
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
          CPA REG Frequently Asked Questions
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

      <ExamRelatedTests examId="cpareg" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CPA REG?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every area of the AICPA&apos;s REG blueprint.</p>
          <ExamLandingCTA dashboardHref="/cpa-reg/dashboard" />
        </div>
      </div>
    </div>
  );
}

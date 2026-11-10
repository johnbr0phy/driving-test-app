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

const title = "Insurance Commission Exam Reviewer 2026 - Free Traditional Life Practice Test (Philippines)";
const metaDescription =
  "Free reviewer for the Insurance Commission licensing exam for traditional life agents in the Philippines: 200 original questions on the Insurance Code, life products, policy values and agent conduct, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the Insurance Commission (IC) qualifying exam that a traditional life insurance agent must pass in the Philippines before the IC issues a license: 200 original questions on risk and the principles of insurance, the insurance contract under the Amended Insurance Code (R.A. 10607), life insurance law, traditional life products and riders, premiums, cash values and options, underwriting and claims, agent licensing and conduct, and regulation and consumer protection. Four 50-question mock tests and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "insurance commission exam reviewer, ic exam reviewer traditional life, insurance agent licensing exam philippines, ic licensure exam reviewer 2026, traditional life insurance exam questions, insurance code reviewer, life insurance agent exam philippines, ic qualifying exam for agents",
  alternates: {
    canonical: `${siteUrl}/insurance-commission-exam-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/insurance-commission-exam-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phinsurance"), width: 1200, height: 630, alt: "Tigertest free Insurance Commission exam reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phinsurance")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Insurance Commission exam for traditional life agents?",
    a: "It is the written qualifying exam the Insurance Commission (IC) requires before it licenses a person to sell traditional life insurance in the Philippines. Section 307 of the Insurance Code says no one may act as an insurance agent or receive a commission without a license from the Insurance Commissioner, and Section 312 requires applicants to pass a written examination. The life insurance company you will represent registers you for the exam and endorses your license application.",
  },
  {
    q: "How many questions are on the traditional life exam and what is the passing score?",
    a: "The Insurance Commission does not publish the format on a page we could check. Review guides report 50 multiple-choice (and true or false) items in about one hour, with 70% to pass. Tigertest's mock tests use 50 questions and a 70% line as a target. Confirm the current format with the insurer that sponsors you.",
  },
  {
    q: "Is the traditional life exam the same as the VUL exam?",
    a: "No. Selling variable life (VUL, unit-linked) products needs a separate variable contracts exam and license. This reviewer covers traditional life only: term, whole life, endowment and annuity products with guaranteed values, plus the Insurance Code rules every life agent works under.",
  },
  {
    q: "How long is an agent's license good for once I pass?",
    a: "Under Section 307 of the Insurance Code, an agent's license must be renewed every three years and expires after December 31 of the third year after it is issued unless renewed. The Insurance Commission no longer grants a provisional authority to sell while a license is pending (Circular Letter No. 2024-21), so you may not solicit until your license is issued.",
  },
  {
    q: "Are these the real Insurance Commission exam questions?",
    a: "No. Every question is original, written by Tigertest from Philippine law: the Amended Insurance Code (R.A. 10607), the Civil Code on beneficiaries, the AMLA, the Data Privacy Act and the Financial Products and Services Consumer Protection Act (R.A. 11765). It is free practice, not affiliated with the Insurance Commission or any insurance company, and it does not replace your insurer's pre-licensing training.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Insurance Commission Exam Reviewer",
      description,
      url: `${siteUrl}/insurance-commission-exam-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "200 traditional life practice questions",
        "4 mock tests of 50 questions",
        "4 training sets by topic",
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
  { name: "Risk and principles of insurance", weight: "5 per test" },
  { name: "The insurance contract", weight: "8 per test" },
  { name: "Life insurance law", weight: "8 per test" },
  { name: "Traditional life products and riders", weight: "8 per test" },
  { name: "Premiums, values and options", weight: "6 per test" },
  { name: "Underwriting and claims", weight: "5 per test" },
  { name: "Agent licensing and conduct", weight: "6 per test" },
  { name: "Regulation and consumer protection", weight: "4 per test" },
];

export default function PhinsuranceLandingPage() {
  return (
    <div data-theme="phinsurance" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Insurance Commission Exam Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/insurance-commission-exam/dashboard"
            shortName="IC exam"
            subtitle="200 original questions for the Insurance Commission licensing exam for traditional life agents: the Insurance Code, beneficiaries, grace period and reinstatement, term, whole life and endowment plans, cash values, underwriting and agent conduct. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phinsurance-mobile.png", desktop: "/landing/phinsurance-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phinsurance" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Topic at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets: principles and the insurance contract; life insurance law and regulation; products, premiums and policy values; and underwriting, claims and agent conduct. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions with a 70% line, the passing score review guides report. No question appears in more than one test, and every answer is explained, citing the Insurance Code section where one applies.
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
                Built on the Insurance Code
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The Insurance Commission publishes no topic weights for the traditional life exam, so this split is Tigertest&apos;s, weighted toward the life insurance rules of the Amended Insurance Code (R.A. 10607) that every licensed agent works under. Review guides report 50 items in about one hour on the real exam.
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
                src={getTigerAsset("phinsurance", 1)}
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
            How to Pass the Insurance Commission Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the Insurance Code rules by section</h3>
              <p>
                Insurable interest (Section 10), concealment and representation (Sections 26 to 48), the two-year suicide and incontestability periods (Sections 48 and 183), and the policy provisions of Section 233: grace period, reinstatement, misstatement of age and nonforfeiture options.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know who can be a beneficiary</h3>
              <p>
                Revocable and irrevocable designations under Section 11, forfeiture by a beneficiary who caused the death (Section 12), Article 2012 of the Civil Code, and who may act for a minor beneficiary under Section 182.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Compare the products side by side</h3>
              <p>
                Term, whole life, limited pay and endowment plans, the common riders, group and industrial life, annuities, and the dividend, nonforfeiture and settlement options. Know which product fits which need.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Answer as a licensed agent should</h3>
              <p>
                No rebating or twisting, premiums held in trust and remitted, true answers on the application, no selling before your license is issued, and client data used only for the policy. Aim for 80% or better on every mock test before your exam date.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Insurance Commission Exam Frequently Asked Questions
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

      <ExamRelatedTests examId="phinsurance" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Insurance Commission Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 traditional life questions.</p>
          <ExamLandingCTA dashboardHref="/insurance-commission-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}

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

const title = "IIQE Paper 1 Practice Test 2026 - Free Mock Exam Questions (Hong Kong)";
const metaDescription =
  "Free IIQE Paper 1 practice for Hong Kong insurance intermediaries: 200 original questions on Principles and Practice of Insurance, weighted like the Study Notes chapters, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for Paper I of the Insurance Intermediaries Qualifying Examination (IIQE), Principles and Practice of Insurance, the compulsory paper for anyone licensed by the Insurance Authority as an insurance agent, technical representative or broker in Hong Kong: 200 original questions on risk, contract and agency law, the principles of insurance, insurers and the Hong Kong market, the Insurance Ordinance and intermediary licensing, and ethics. Four 50-question mock tests weighted like the Study Notes chapters, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "iiqe paper 1 practice test, iiqe paper 1 mock exam, iiqe paper 1 questions, principles and practice of insurance exam, hong kong insurance agent exam, iiqe practice test 2026, insurance intermediaries qualifying examination paper 1, iiqe paper 1 study notes questions",
  alternates: {
    canonical: `${siteUrl}/iiqe-paper-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/iiqe-paper-1-practice-test`,
    images: [{ url: shareImageUrl("hkiiqe1"), width: 1200, height: 630, alt: "Tigertest free IIQE Paper 1 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hkiiqe1")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is IIQE Paper 1?",
    a: "Paper I, Principles and Practice of Insurance, is the compulsory paper of the Insurance Intermediaries Qualifying Examination (IIQE). Anyone who wants to be licensed by the Insurance Authority as an individual insurance agent, technical representative (agent) or technical representative (broker) in Hong Kong must pass it, together with the optional paper for their line of business: Paper II for general insurance, Paper III for long term insurance and Paper V for investment-linked long term insurance. The Vocational Training Council runs the examination for the Insurance Authority through its PEAK Exam Centre.",
  },
  {
    q: "How many questions are on IIQE Paper 1 and what is the pass mark?",
    a: "Paper I has 75 multiple-choice questions in 2 hours, and you need at least 70% to pass. Results are given only as pass or fail. The paper is presented in both English and Chinese, and you can sit it on paper or on a computer screen at an exam centre; remote invigilation is also offered for Paper I.",
  },
  {
    q: "What does IIQE Paper 1 cover?",
    a: "The seven chapters of the Insurance Authority's Study Notes (2024 Edition, for exams from 17 February 2025): risk and insurance, legal principles (contract and agency), principles of insurance, core functions of an insurance company, the structure of the Hong Kong insurance industry, the regulatory framework, and ethical and related issues. The Study Notes give their relative weights as 12%, 16%, 30%, 9%, 5%, 21% and 7%.",
  },
  {
    q: "How are these mock tests different from the real paper?",
    a: "Each mock test here has 50 questions instead of 75, weighted by the same chapter percentages: 6 on risk, 8 on contract and agency, 15 on the principles of insurance, 7 on insurers and the market, 11 on regulation and 3 on ethics, with the real 70% pass line. The real paper also has some questions that ask you to pick a combination of statements; every question here has one answer from four options.",
  },
  {
    q: "Are these the real IIQE questions?",
    a: "No. Every question is original, written by Tigertest from the Study Notes topics, the Insurance Ordinance (Cap. 41) and the Insurance Authority's codes and guidelines as of November 2026. It is free practice in English, not affiliated with the Insurance Authority, the Vocational Training Council or the PEAK Exam Centre, and it does not replace reading the Study Notes.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free IIQE Paper 1 Practice Test",
      description,
      url: `${siteUrl}/iiqe-paper-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "HKD" },
      featureList: [
        "200 IIQE Paper 1 practice questions",
        "4 mock tests of 50 questions weighted by chapter",
        "4 training sets by chapter group",
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
  { name: "1. Risk and Insurance", weight: "12%" },
  { name: "2. Legal Principles", weight: "16%" },
  { name: "3. Principles of Insurance", weight: "30%" },
  { name: "4. Core Functions of an Insurance Company", weight: "9%" },
  { name: "5. Structure of the Hong Kong Insurance Industry", weight: "5%" },
  { name: "6. Regulatory Framework", weight: "21%" },
  { name: "7. Ethical and Other Related Issues", weight: "7%" },
];

export default function IiqePaper1LandingPage() {
  return (
    <div data-theme="hkiiqe1" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free IIQE Paper 1 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/iiqe-paper-1/dashboard"
            shortName="IIQE Paper 1"
            subtitle="200 original questions for the compulsory IIQE paper in Hong Kong: risk, contract and agency law, the principles of insurance, the Insurance Ordinance and intermediary licensing, and ethics. Four 50-question mock tests weighted like the Study Notes. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/hkiiqe1-mobile.png", desktop: "/landing/hkiiqe1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hkiiqe1" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Chapter Group at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets that follow the Study Notes: risk with contract and agency law, the six principles of insurance, insurers and the Hong Kong market, and regulation with ethics. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions weighted by the Study Notes chapter percentages, each with the real 70% pass line. No question appears in more than one test, and every average, excess and subrogation sum is worked through.
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
                Built on the Seven Study Notes Chapters
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real Paper I is 75 questions in 2 hours with 70% to pass. The Study Notes give each chapter&apos;s relative weight, and each mock test here follows them: 6 risk, 8 legal principles, 15 principles of insurance, 5 insurer functions, 2 market structure, 11 regulation and 3 ethics questions in every 50.
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
                src={getTigerAsset("hkiiqe1", 1)}
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
            How to Pass IIQE Paper 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Spend most of your time on Chapter 3</h3>
              <p>
                The principles of insurance carry 30% of the paper. Know when insurable interest must exist, what makes a fact material, the four breaches of utmost good faith, how proximate cause works through a chain of events, and when contribution and subrogation apply only to indemnity policies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Work the sums by hand</h3>
              <p>
                Average, excess, franchise and the sharing of subrogation recoveries all turn up as short calculations. Work each one through rather than memorising answers: under average, the payment is the loss times the sum insured over the value.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the licensing regime as a map</h3>
              <p>
                Regulation is 21%. Draw the five licence types, who appoints whom, who needs a responsible officer, section 68 vicarious liability, the limit of four insurers with no more than two long term, and the CPD rule of 15 hours with 3 on ethics or regulations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read every option before you choose</h3>
              <p>
                The real paper mixes straightforward questions with harder ones that ask which combination of statements is true. Finish all four training sets, then aim for 80% or better on every mock test before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          IIQE Paper 1 Frequently Asked Questions
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

      <ExamRelatedTests examId="hkiiqe1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass IIQE Paper 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all seven Study Notes chapters.</p>
          <ExamLandingCTA dashboardHref="/iiqe-paper-1/dashboard" />
        </div>
      </div>
    </div>
  );
}

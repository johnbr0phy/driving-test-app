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

const title = "Singapore RES Exam Practice Test 2026 - Free Real Estate Salesperson Questions";
const metaDescription =
  "Free practice for Singapore's Real Estate Salesperson (RES) exam: 200 original questions on land law, contracts, agency, the Estate Agents Act, AML duties, marketing, HDB rules, property tax and finance, with four 50-question mock tests and every answer explained.";
const description =
  "Free practice for the Real Estate Salesperson (RES) Examination that the Council for Estate Agencies (CEA) requires before registration as a property agent in Singapore: 200 original questions on the 2027 syllabus, covering the real estate market, land law and titles, contract, agency and landlord and tenant law, the Estate Agents Act and Code of Ethics, anti-money laundering duties, marketing, private and HDB transactions, and property taxes and finance. Four 50-question mock tests that mix Paper 1 and Paper 2, and five training sets by topic.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "res exam practice test, singapore res exam questions, real estate salesperson exam singapore, res exam paper 1, res exam paper 2, cea res exam, property agent exam singapore, res exam mock test, res exam 2027 syllabus, res exam practice test 2026",
  alternates: {
    canonical: `${siteUrl}/singapore-res-exam-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/singapore-res-exam-practice-test`,
    images: [{ url: shareImageUrl("sgres"), width: 1200, height: 630, alt: "Tigertest free Singapore RES exam practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sgres")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the RES exam?",
    a: "The Real Estate Salesperson (RES) Examination is the exam you must pass before the Council for Estate Agencies (CEA) will register you as a real estate salesperson (property agent) in Singapore. It has two papers: Paper 1 covers the real estate market, basic land law and dealings with interests in land, and Paper 2 covers regulation of the agency industry, ethics, anti-money laundering duties, marketing and property transactions, including HDB rules, taxes and finance.",
  },
  {
    q: "How many questions are on each RES paper and what is the pass mark?",
    a: "Each paper is 2.5 hours long and has two sections: Section A has 60 multiple-choice questions worth 1 mark each, and Section B has 20 multiple-choice questions on one or two case studies worth 2 marks each, for 100 marks in total. CEA sets the passing mark at 60 for each paper, subject to its review. Both papers must be passed.",
  },
  {
    q: "Which syllabus does this practice test follow?",
    a: "It follows CEA's revised RES Examination Syllabus, which applies to exams from 1 January 2027 and adds professional ethics, anti-money laundering (PMLPFTF) obligations, and green buildings and leases. CEA says the format and duration do not change. You must complete an approved RES course of at least 65 hours before you can register for the exam.",
  },
  {
    q: "How are these mock tests different from the real RES exam?",
    a: "The real exam is two separate papers of 80 questions each. Each mock test here has 50 questions that mix the two papers half and half, weighted by the syllabus's recommended training hours, with a 60% pass line. Case studies are written as short scenarios inside single questions. Use the training sets to practise one topic area at a time.",
  },
  {
    q: "Are these the real RES exam questions?",
    a: "No. Every question is original, written by Tigertest from the CEA syllabus, the Estate Agents Act and its regulations, CEA's Code of Ethics and practice guidelines, and current HDB, URA, SLA and IRAS rules. Figures that change often, such as stamp duty rates and loan limits, are left out. It is free practice, not affiliated with CEA or any approved course provider, and it does not replace the RES course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Singapore RES Exam Practice Test",
      description,
      url: `${siteUrl}/singapore-res-exam-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "SGD" },
      featureList: [
        "200 RES exam practice questions",
        "4 mock tests of 50 questions across Paper 1 and Paper 2",
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
  { name: "Paper 1, Unit 1: Market and basic land law", weight: "9 per test" },
  { name: "Paper 1, Unit 2: Dealings with interests in land", weight: "16 per test" },
  { name: "Paper 2, Unit 3: Regulation, ethics and marketing", weight: "15 per test" },
  { name: "Paper 2, Unit 4: Property transactions", weight: "10 per test" },
];

export default function SgresLandingPage() {
  return (
    <div data-theme="sgres" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free LLQP Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/singapore-res/dashboard"
            shortName="LLQP"
            subtitle="200 original questions for Canada's life licence exams: life insurance and its taxation, disability and critical illness, group and government benefits, segregated funds, annuities and registered plans, and ethics. Four 50-question mock tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/llqp-mobile.png", desktop: "/landing/llqp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sgres" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train One Module at a Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one for each LLQP module: life insurance, accident and sickness, segregated funds and annuities, and ethics and professional practice. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions that mix all four modules in proportion, each with the real 60% pass line. No question appears in more than one test, and every policy gain, guarantee and needs calculation is worked through.
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
                Built on the Four LLQP Modules
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each real module is a separate exam of 75 minutes, including five unscored pilot questions, with 60% to pass. Each mock test here has 14 life, 13 accident and sickness, 13 segregated funds and annuities, and 10 ethics questions in every 50.
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
                src={getTigerAsset("sgres", 1)}
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
            How to Pass the LLQP Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the tax rules once, then apply them everywhere</h3>
              <p>
                Policy gains are income, death benefits are tax-free, group LTD benefits are taxable when the employer pays, and seg fund top-ups are capital gains. Most calculation questions come back to a short list of rules: learn them as a table.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the time limits</h3>
              <p>
                Two years for contestability and reinstatement, a 30-day grace period, 10 days to rescind a life policy, two business days to cancel a seg fund contract, 31 days to convert group life, and 10 years to a seg fund maturity guarantee.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read ethics questions as the regulator would</h3>
              <p>
                The right answer puts the client first: needs analysis before any product, full disclosure of conflicts and replacements, consent before collecting information, and a report to FINTRAC when something looks wrong. Watch for the Quebec differences in the Civil Code version.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise each module on its own</h3>
              <p>
                Each module is passed separately, so a strong life score cannot carry a weak ethics score. Finish each module&apos;s training set, then aim for 75% or better on every mock test before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          LLQP Exam Frequently Asked Questions
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

      <ExamRelatedTests examId="sgres" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the LLQP Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all four LLQP modules.</p>
          <ExamLandingCTA dashboardHref="/singapore-res/dashboard" />
        </div>
      </div>
    </div>
  );
}

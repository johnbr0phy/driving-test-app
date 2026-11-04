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

const title = "CeMAP 1 Practice Test 2026 - Free FSRE (FRE1 and FRE2) Questions";
const metaDescription =
  "Free CeMAP 1 practice for LIBF's FSRE module: 200 original questions on UK financial services, FCA regulation, the Consumer Duty, AML, law and ethics, five 40-question mock tests, every answer explained.";
const description =
  "Free practice for CeMAP Module 1, LIBF's Financial Services, Regulation and Ethics (FSRE) module that replaced UKFR in 2025: 200 original questions across both units, FRE1 (Industry, Regulation and Key Parties) and FRE2 (Skills, Principles and Ethical Behaviours). Five 40-question mock tests with the 70% pass line, and five training sets covering financial markets and the economy, consumer needs and products, law, wills and trusts, the development of UK regulation, the FCA, the PRA and the Handbook, advice skills, the Principles for Businesses and the Consumer Duty, anti-money laundering, data protection, complaints and redress, client relationships and ethics.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cemap 1 practice test, cemap module 1 mock exam, fsre practice questions, fre1 fre2 questions, libf cemap, ukfr practice test, cemap mortgage adviser exam, financial services regulation and ethics",
  alternates: {
    canonical: `${siteUrl}/cemap-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cemap-1-practice-test`,
    images: [{ url: shareImageUrl("cemap"), width: 1200, height: 630, alt: "Tigertest free CeMAP 1 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cemap")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is CeMAP 1?",
    a: "CeMAP Module 1 is the first part of LIBF's Certificate in Mortgage Advice and Practice, the qualification that meets the FCA's education standard for mortgage advisers. Since 30 September 2025 Module 1 is the Financial Services, Regulation and Ethics (FSRE) module, which replaced UK Financial Regulation (UKFR). It has two units: FRE1, Industry, Regulation and Key Parties, and FRE2, Skills, Principles and Ethical Behaviours. FSRE is also the first module of LIBF's Diploma for Financial Advisers.",
  },
  {
    q: "How is CeMAP 1 assessed?",
    a: "Each unit is a one-hour online exam taken on LIBF's Brightspace platform with remote invigilation, at any time and with no booking. Each exam has 25 standalone multiple-choice questions and 3 case studies with 5 linked questions each, so 40 marks per unit, with one answer from four every time. You need 70% (28 of 40) to pass each unit; 80% is a merit and 90% a distinction.",
  },
  {
    q: "What does each mock test here cover?",
    a: "Each of the five mock tests has 40 questions, the length of one real unit, with 20 from FRE1 (markets and the economy, consumer needs, law, the history of regulation and the FCA and PRA) and 20 from FRE2 (advice skills, the Principles for Businesses and the Consumer Duty, AML, data protection, complaints and redress, client relationships and ethics). LIBF publishes no weighting by topic, so the split is Tigertest's.",
  },
  {
    q: "How are the case studies modelled?",
    a: "On the real exam one case study leads into five linked questions. Here each case question restates the facts it needs, so it can be shown on its own, and every answer comes with an explanation. Use LIBF's own learning resources on Brightspace for practice in the exact exam format.",
  },
  {
    q: "Are these real CeMAP questions?",
    a: "No. Every question is original, written by Tigertest from LIBF's published FSRE syllabus and UK law and FCA rules as they stand in November 2026, including the Consumer Duty. No compensation limits, tax rates or other money figures are asked, because they change. Tigertest is not affiliated with LIBF or Walbrook Institute London, and this free practice does not replace your course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CeMAP 1 Practice Test",
      description,
      url: `${siteUrl}/cemap-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      featureList: [
        "200 CeMAP 1 (FSRE) practice questions",
        "5 mock tests of 40 questions, half FRE1 and half FRE2",
        "5 training sets by topic",
        "Every answer explained",
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
        classFaqJsonLd("cemap"),
      ],
    },
  ],
};

const units = [
  { name: "FRE1: markets, consumers and the economy", weight: "7 of 40" },
  { name: "FRE1: law, wills and trusts", weight: "5 of 40" },
  { name: "FRE1: regulation, the FCA and the PRA", weight: "8 of 40" },
  { name: "FRE2: advice skills and client relationships", weight: "8 of 40" },
  { name: "FRE2: Principles, Consumer Duty and conduct", weight: "4 of 40" },
  { name: "FRE2: compliance, redress and ethics", weight: "8 of 40" },
];

export default function Cemap1LandingPage() {
  return (
    <div data-theme="cemap" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CeMAP 1 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cemap/dashboard"
            shortName="CeMAP 1"
            subtitle="200 original questions for CeMAP Module 1 (FSRE), both FRE1 and FRE2: financial markets, law, wills and trusts, the FCA and PRA, the Consumer Duty, anti-money laundering, data protection, complaints and ethics. Five 40-question mock tests, every answer explained. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cemap-mobile.png", desktop: "/landing/cemap-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cemap" />

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
                Five training sets: financial markets and consumers; law, wills and trusts; regulation, the FCA and the PRA; advice, clients and conduct; and compliance and ethics. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Unit-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five tests of 40 questions, the length of one real unit, half FRE1 and half FRE2, with LIBF&apos;s 70% pass line. No question appears in more than one test, and every answer is explained.
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
                Built on LIBF&apos;s FSRE Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                LIBF&apos;s FSRE specification lists the learning outcomes of both units but no weighting, so each test here has 20 FRE1 and 20 FRE2 questions, split by the breadth of each learning outcome. Case studies are written as self-contained scenario questions.
              </p>
              <div className="space-y-3">
                {units.map((unit) => (
                  <div key={unit.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{unit.name}</span>
                    <span className="text-brand-dark font-semibold">{unit.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("cemap", 1)}
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
            How to Pass CeMAP 1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn who does what</h3>
              <p>
                Many FRE1 marks come from knowing which body is responsible: the FCA for conduct, the PRA for prudential soundness, the Bank of England&apos;s committees for Bank Rate and financial stability, the ombudsman for complaints and the FSCS for failed firms. Draw the map and test yourself on it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know the Consumer Duty well</h3>
              <p>
                Principle 12, its three cross-cutting rules and its four outcomes run through FRE2 and through the rest of CeMAP. Be able to say which outcome a poor practice fails, and why the Duty asks more than treating customers fairly did.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Fix the timescales and stages</h3>
              <p>
                Eight weeks for a final response, six months to go to the ombudsman, one month for a subject access request, 72 hours for a data breach, five years for AML records, and placement, layering and integration. These are quick marks once they are learnt.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read each case study twice</h3>
              <p>
                In the case studies one scenario carries five questions, so a fact missed early costs several marks. Note the client&apos;s age, circumstances and any sign of vulnerability before you answer. Aim for 80% or better on every test here before you sit each unit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CeMAP 1 Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cemap" />
        </div>
      </div>

      <ExamRelatedTests examId="cemap" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for CeMAP 1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across both units of CeMAP Module 1, FRE1 and FRE2.</p>
          <ExamLandingCTA dashboardHref="/cemap/dashboard" />
        </div>
      </div>
    </div>
  );
}

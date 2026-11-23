import "@/lib/banks/frm1";
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

const title = "FRM Part I Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free FRM Part I practice: 200 original questions across all four Part I areas, weighted like GARP's outline, four 50-question tests and every calculation explained.";
const description =
  "Free practice for the GARP Financial Risk Manager (FRM) Exam Part I: 200 original multiple-choice questions written from GARP's 2026 FRM Study Guide and learning objectives. Four 50-question tests weighted like the Part I outline (Foundations of Risk Management 20%, Quantitative Analysis 20%, Financial Markets and Products 30%, Valuation and Risk Models 30%), and six training sets covering risk governance and CAPM, probability and regression, institutions, futures and FX, options, rates, bonds and swaps, VaR, credit and operational risk, and bond and option valuation.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "frm part 1 practice test, frm part i practice questions, frm exam practice, free frm questions, garp frm part 1, financial risk manager exam, frm mock exam, frm var questions, frm quantitative analysis",
  alternates: {
    canonical: `${siteUrl}/frm-part-1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/frm-part-1-practice-test`,
    images: [{ url: shareImageUrl("frm1"), width: 1200, height: 630, alt: "Tigertest free FRM Part I practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("frm1")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the FRM Exam Part I?",
    a: "Part I is the first of the two exams for GARP's Financial Risk Manager (FRM) certification. It covers the tools of risk management in four areas: Foundations of Risk Management, Quantitative Analysis, Financial Markets and Products, and Valuation and Risk Models. You must pass Part I before your Part II exam is graded.",
  },
  {
    q: "How is FRM Part I structured?",
    a: "Part I has 100 equally weighted multiple-choice questions in four hours, taken on computer at a test center in the May, August or November window. There is no penalty for wrong answers. Results are pass or fail with a percentile range against other candidates, and GARP does not publish a passing score or a numerical score.",
  },
  {
    q: "What are the Part I topic weights?",
    a: "GARP's 2026 FRM Study Guide weights Foundations of Risk Management at 20%, Quantitative Analysis at 20%, Financial Markets and Products at 30% and Valuation and Risk Models at 30%. GARP reviews the topics and weights every year, so check the study guide for the year you sit.",
  },
  {
    q: "How do these practice questions differ from the real exam?",
    a: "Each practice test has 50 questions instead of 100, weighted by area like the real exam, and every question has four choices. 70% is a readiness line set by Tigertest, not a GARP pass mark, since GARP does not publish one. The first three training sets and practice tests 1 and 2 are free; Premium adds sets 4 to 6 (options, rates and bonds, VaR and credit risk, valuation), tests 3 and 4 and full stats.",
  },
  {
    q: "Are these real FRM exam questions?",
    a: "No. Every question is original, written by Tigertest from GARP's published topic outline and learning objectives and from standard finance and statistics. Tigertest is not affiliated with or endorsed by GARP, and this practice does not replace the official FRM books and practice exams.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free FRM Part I Practice Test",
      description,
      url: `${siteUrl}/frm-part-1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("frm1"),
      featureList: [
        "200 FRM Part I practice questions",
        "4 tests of 50 questions weighted by the Part I outline",
        "6 training sets by topic",
        "Every calculation explained",
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
  { name: "Foundations of Risk Management", weight: "20%" },
  { name: "Quantitative Analysis", weight: "20%" },
  { name: "Financial Markets and Products", weight: "30%" },
  { name: "Valuation and Risk Models", weight: "30%" },
];

export default function FrmPart1LandingPage() {
  return (
    <div data-theme="frm1" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free FRM Part I Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/frm-part-1/dashboard"
            shortName="FRM Part I"
            subtitle="200 FRM Part I questions and four 50-question tests. Free to start, no account needed."
            shots={{ mobile: "/landing/frm1-mobile.png", desktop: "/landing/frm1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="frm1" />

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
                Six training sets: foundations and CAPM, quantitative analysis, institutions, futures and FX, options, rates, bonds and swaps, VaR, credit and operational risk, and bond and option valuation. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Topic-Weighted Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four tests of 50 questions in the Part I area weights, with a 70% readiness line. No question appears in more than one test, and every calculation is worked through step by step.
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
                Built on the Part I Topic Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                GARP&apos;s 2026 FRM Study Guide weights the four Part I areas as below. Each test here has 10 questions on Foundations, 10 on Quantitative Analysis, 15 on Financial Markets and Products and 15 on Valuation and Risk Models.
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
                src={getTigerAsset("frm1", 3)}
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
            How to Prepare for FRM Part I
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Practice on an approved calculator</h3>
              <p>
                GARP allows only a few models: the HP 12C family, the HP 10B II and 10B II+, the HP 20B and the TI BA II Plus. Work bond prices, hedge ratios and option values on the one you will bring, and check your steps against the explanation, not just the answer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Weight your time like the exam</h3>
              <p>
                Financial Markets and Products and Valuation and Risk Models are 60% of Part I between them. Get futures hedging, swaps, duration, VaR and the Greeks solid before polishing smaller topics.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know why, not only how</h3>
              <p>
                Many questions ask what a measure means or where it fails: why VaR is not subadditive, why delta-normal VaR misses option risk, why a hedge leaves basis risk. Read the explanation for every miss.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Build up to four hours</h3>
              <p>
                The real exam is 100 questions in four hours, about 2.4 minutes each. Use these tests to find weak areas, then take full-length practice exams from GARP&apos;s official materials under timed conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          FRM Part I Frequently Asked Questions
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

      <ExamSampleQuestions examId="frm1" />

      <ExamRelatedTests examId="frm1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Start Practicing for FRM Part I</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all four Part I areas.</p>
          <ExamLandingCTA dashboardHref="/frm-part-1/dashboard" />
        </div>
      </div>
    </div>
  );
}

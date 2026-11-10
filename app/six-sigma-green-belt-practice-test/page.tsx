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

const title = "Six Sigma Green Belt Practice Test 2026 - Free ASQ CSSGB Questions";
const metaDescription =
  "Free ASQ Certified Six Sigma Green Belt practice: 200 original questions on the 2022 Body of Knowledge, DMAIC phase by phase, with Cp and Cpk, DPMO, hypothesis tests and control charts worked out in every explanation.";
const description =
  "Free practice for the ASQ Certified Six Sigma Green Belt (CSSGB) exam: 200 original questions written to the six sections of the 2022 Body of Knowledge. Four 50-question practice tests weighted like the real exam, and six training sets covering Six Sigma and the organization, Define, Measure, Analyze, Improve and Control, with every calculation shown step by step.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "six sigma green belt practice test, cssgb practice exam, asq green belt questions, six sigma green belt exam 2026, cssgb sample questions, lean six sigma green belt test",
  alternates: {
    canonical: `${siteUrl}/six-sigma-green-belt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/six-sigma-green-belt-practice-test`,
    images: [{ url: shareImageUrl("cssgb"), width: 1200, height: 630, alt: "Tigertest free Six Sigma Green Belt practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cssgb")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the ASQ Certified Six Sigma Green Belt exam?",
    a: "The CSSGB is ASQ's certification for people who work on process improvement projects, usually in support of or under a Six Sigma Black Belt. It covers the DMAIC road map, lean tools and the statistics behind them, from process capability to hypothesis tests and control charts. ASQ asks for three years of work experience in one or more areas of the Body of Knowledge, and the certification does not need renewing.",
  },
  {
    q: "How many questions are on the CSSGB exam and how long is it?",
    a: "The computer-based exam has 110 multiple-choice questions, 100 scored and 10 unscored, with 4 hours 18 minutes of exam time inside a 4.5-hour appointment. It is in English, open book with bound references, and has an on-screen calculator. A 100-question, four-hour paper version is offered in Mandarin in some locations. ASQ reports a pass as a scaled score of 550 and publishes no raw percentage, so the 70% line here is Tigertest's readiness target.",
  },
  {
    q: "What does the 2022 CSSGB Body of Knowledge cover?",
    a: "Six sections, with ASQ's question counts out of 100: Overview: Six Sigma and the Organization 11, Define 20, Measure 20, Analyze 18, Improve 16 and Control 15. Each 50-question practice test here keeps that balance: 6 overview, 10 Define, 10 Measure, 9 Analyze, 8 Improve and 7 Control questions.",
  },
  {
    q: "Which calculations should I practice for the Green Belt exam?",
    a: "Expect DPU, DPMO, rolled throughput yield and sigma level, Cp, Cpk, Pp, Ppk and Cpm, gauge R&R and precision to tolerance, probability with the binomial and Poisson distributions, t, F, chi square and ANOVA, correlation and regression, DOE main effects and interactions, and control limits for X-bar and R, individuals, p, np, c and u charts. Every calculation question here shows the working in its explanation.",
  },
  {
    q: "Are these real ASQ exam questions?",
    a: "No. Every question is original, written by Tigertest from the published Body of Knowledge and standard Six Sigma statistics. Each practice test is half the length of the real exam. It is free practice, not affiliated with or endorsed by ASQ or ASQ Excellence, and it does not replace the reference books you bring into the exam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Six Sigma Green Belt Practice Test",
      description,
      url: `${siteUrl}/six-sigma-green-belt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 ASQ Six Sigma Green Belt practice questions",
        "4 practice tests of 50 questions weighted like the 2022 Body of Knowledge",
        "6 training sets, one per Body of Knowledge section",
        "Worked calculations in every statistics explanation",
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
  { name: "Overview: Six Sigma and the Organization", weight: "11 questions" },
  { name: "Define Phase", weight: "20 questions" },
  { name: "Measure Phase", weight: "20 questions" },
  { name: "Analyze Phase", weight: "18 questions" },
  { name: "Improve Phase", weight: "16 questions" },
  { name: "Control Phase", weight: "15 questions" },
];

export default function SixSigmaGreenBeltLandingPage() {
  return (
    <div data-theme="cssgb" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Six Sigma Green Belt Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/six-sigma-green-belt/dashboard"
            shortName="Six Sigma Green Belt"
            subtitle="200 original questions on the 2022 ASQ CSSGB Body of Knowledge: Define, Measure, Analyze, Improve and Control, with capability, DPMO, hypothesis tests, DOE and control charts worked out. Four 50-question tests. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cssgb-mobile.png", desktop: "/landing/cssgb-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cssgb" />

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
                Six training sets, one per Body of Knowledge section: Six Sigma and the organization, Define, Measure, Analyze, Improve and Control. Questions you miss come back until you have mastered them.
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
                Four tests of 50 questions, half the real exam&apos;s scored length, in the Body of Knowledge&apos;s proportions, with a 70% readiness line. No question appears in more than one test, and every calculation is worked out in the explanation.
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
                Built on the 2022 Body of Knowledge
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ASQ sets how many of the 100 scored questions come from each section. Each practice test here keeps the same balance at half length: 6 overview, 10 Define, 10 Measure, 9 Analyze, 8 Improve and 7 Control questions in every 50.
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
                src={getTigerAsset("cssgb", 1)}
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
            How to Pass the Six Sigma Green Belt Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Drill the formulas until they are routine</h3>
              <p>
                Capability, DPMO, rolled throughput yield, PERT, sample size and control limits come up again and again. Work each one by hand with the calculator you will use on the day, and know which sigma goes where: within-subgroup sigma for Cp and Cpk, overall sigma for Pp and Ppk.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Match the tool to the data</h3>
              <p>
                Many questions turn on picking the right chart or test. Decide first whether the data are continuous or attribute, then whether you have one sample, two, paired data or more than two groups. The same habit picks between X-bar and R, ImR, p, np, c and u charts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Build and tab your reference book</h3>
              <p>
                The exam is open book, but there is no time to read from scratch. Bring bound references you know well, with tabs for the control chart constants, the normal table and the formulas, and practice finding each one quickly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Know the language of each phase</h3>
              <p>
                Define is charters, voice of the customer and team dynamics; Measure is data, MSA and capability; Analyze is root cause and hypothesis tests; Improve is DOE and lean; Control is SPC and control plans. Aim for 85% or better on every practice test before you book.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Six Sigma Green Belt Frequently Asked Questions
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

      <ExamRelatedTests examId="cssgb" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CSSGB Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all six sections of the Body of Knowledge.</p>
          <ExamLandingCTA dashboardHref="/six-sigma-green-belt/dashboard" />
        </div>
      </div>
    </div>
  );
}

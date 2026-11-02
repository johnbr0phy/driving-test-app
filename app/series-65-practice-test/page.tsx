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

const title = "Series 65 Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free Series 65 practice: 200 original questions on NASAA's current outline, four 50-question mock tests weighted like the real exam, every answer explained.";
const description =
  "Free practice for the NASAA Series 65 Uniform Investment Adviser Law Examination: 200 original questions written from NASAA's test specifications effective June 12, 2023. Four 50-question mock tests weighted like the real 130-question exam, and six training sets covering economics and analysis, investment vehicles, clients and portfolio strategy, taxes, retirement and estates, adviser and state securities law, and ethics and fiduciary duty.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "series 65 practice test, series 65 exam practice, series 65 practice questions, nasaa series 65, uniform investment adviser law exam, investment adviser representative exam, series 65 mock exam, series 65 2026",
  alternates: {
    canonical: `${siteUrl}/series-65-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/series-65-practice-test`,
    images: [{ url: shareImageUrl("series65"), width: 1200, height: 630, alt: "Tigertest free Series 65 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("series65")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Series 65 exam?",
    a: "The Series 65 is NASAA's Uniform Investment Adviser Law Examination. Most states require it, or an approved professional designation, before they register someone as an investment adviser representative (IAR), the person who gives investment advice for a fee. NASAA writes the exam and FINRA administers it. You do not need a sponsoring firm to take it.",
  },
  {
    q: "How many questions are on the Series 65 and what is the passing score?",
    a: "The exam has 130 scored multiple-choice questions plus 10 unscored pretest questions, and you have 180 minutes. You need 92 of the 130 scored questions right to pass, about 71 percent. Each mock test here has 50 questions in the same proportions as the real exam, and 36 of 50 is a pass.",
  },
  {
    q: "What does the Series 65 cover?",
    a: "NASAA's outline has four sections: economic factors and business information (15 percent, 20 questions), investment vehicle characteristics (25 percent, 32), client investment recommendations and strategies (30 percent, 39), and laws, regulations and guidelines, including the prohibition on unethical business practices (30 percent, 39). The training sets here follow those sections.",
  },
  {
    q: "What is the difference between the Series 65, the Series 63 and the Series 66?",
    a: "The Series 65 qualifies you as an investment adviser representative. The Series 63 is the state law exam for securities agents of broker-dealers. The Series 66 combines the two but is taken together with the Series 7, and passing it counts as passing both the Series 63 and the Series 65.",
  },
  {
    q: "Are these the real Series 65 questions?",
    a: "No. Every question is original, written by Tigertest from NASAA's published outline, the Uniform Securities Act, the Investment Advisers Act and NASAA's model rules. Tigertest is not affiliated with NASAA or FINRA. It is free practice and does not replace a full prep course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Series 65 Practice Test",
      description,
      url: `${siteUrl}/series-65-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 Series 65 practice questions",
        "4 mock tests of 50 questions weighted like the real exam",
        "6 training sets by topic",
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
  { name: "Economic factors and business information", weight: "15%" },
  { name: "Investment vehicle characteristics", weight: "25%" },
  { name: "Client recommendations and strategies", weight: "30%" },
  { name: "Laws, regulations and ethics", weight: "30%" },
];

export default function Series65LandingPage() {
  return (
    <div data-theme="series65" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Series 65 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/series-65/dashboard"
            shortName="Series 65"
            subtitle="200 original questions on NASAA's outline: economics, investment vehicles, client strategies, taxes and retirement plans, adviser law and ethics. Four 50-question mock tests weighted like the real exam. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/series65-mobile.png", desktop: "/landing/series65-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="series65" />

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
                Six training sets: economics and analysis, investment vehicles, clients and portfolio strategy, taxes, retirement and estates, adviser and state law, and ethics and fiduciary duty. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions in the real exam&apos;s proportions, each needing 36 right to pass, close to the real 92 of 130. No question appears in more than one test, and every calculation is worked through in the explanation.
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
                Built on NASAA&apos;s Test Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NASAA splits the 130 scored questions across four sections. Each mock test here keeps the same balance: 8 questions on economics, 12 on investment vehicles, 15 on client recommendations and 15 on laws, regulations and ethics.
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
                src={getTigerAsset("series65", 1)}
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
            How to Pass the Series 65
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the law sections as definitions first</h3>
              <p>
                Most law questions turn on who is an investment adviser, an investment adviser representative, a broker-dealer or an agent, and who is excluded. Learn each definition and its exclusions before the rules that hang on them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Think like a fiduciary</h3>
              <p>
                When an ethics question offers two reasonable choices, pick the one that puts the client first and discloses the conflict. Custody, discretion, principal trades, soft dollars and fees all come back to that duty.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Work the formulas by hand</h3>
              <p>
                Practice the taxable-equivalent yield, CAPM, the Sharpe ratio, present and future value, current yield and holding period return until they are quick. The explanations here show every step.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Match each recommendation to the client</h3>
              <p>
                For a client question, start from the goal, time horizon, tax bracket and risk tolerance, then rule out what does not fit. Aim for 80% or better on every mock test before you sit the real exam.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Series 65 Frequently Asked Questions
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

      <ExamRelatedTests examId="series65" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the Series 65?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every section of NASAA&apos;s outline.</p>
          <ExamLandingCTA dashboardHref="/series-65/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/series66";
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

const title = "Series 66 Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free Series 66 practice: 200 original questions on NASAA's test specifications, four 50-question mock tests weighted like the real exam, every answer explained.";
const description =
  "Free practice for the NASAA Series 66 Uniform Combined State Law Exam: 200 original questions written from NASAA's test specifications, the Uniform Securities Act and the federal rules it lists. Four 50-question mock tests weighted like the real exam and four training sets covering economics and investment vehicles, client recommendations and strategies, registration of advisers, broker-dealers and securities, and communication and ethics.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "series 66 practice test, series 66 exam practice, series 66 practice questions, uniform combined state law exam, nasaa series 66, series 66 mock exam, uniform securities act questions, series 66 2026",
  alternates: {
    canonical: `${siteUrl}/series-66-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/series-66-practice-test`,
    images: [{ url: shareImageUrl("series66"), width: 1200, height: 630, alt: "Tigertest free Series 66 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("series66")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Series 66 exam?",
    a: "The Series 66 is the Uniform Combined State Law Examination, written by NASAA (the North American Securities Administrators Association) and administered by FINRA. It qualifies a person, together with the Series 7, to register in a state both as an agent of a broker-dealer and as an investment adviser representative. It tests finance and investing principles as well as state and federal securities law.",
  },
  {
    q: "How many questions are on the Series 66 and what is the passing score?",
    a: "The exam has 110 multiple-choice questions, of which 100 are scored and 10 are unscored pretest questions, and you have 150 minutes. You pass by answering at least 73 of the 100 scored questions correctly. Each mock test here has 50 questions in the same proportions as the real exam, with a pass line of 37 of 50.",
  },
  {
    q: "What does the Series 66 cover?",
    a: "NASAA's test specifications, effective June 12, 2023, split the 100 scored questions into four sections: laws, regulations and guidelines including prohibition on unethical business practices (45 questions), client and customer investment recommendations and strategies (30), investment vehicle characteristics (17) and economic factors and business information (8). It tests the Uniform Securities Act of 1956 as amended by NASAA, not the 2002 Act.",
  },
  {
    q: "Do I need the Series 7 for the Series 66?",
    a: "Yes. FINRA lists the Series 7 as a corequisite of the Series 66, with no prerequisite. You can pass them in either order, but both must be passed before a state will register you as both an agent and an investment adviser representative. If you will only give advice and not sell securities, the Series 65 is the exam to look at instead.",
  },
  {
    q: "Are these the real Series 66 questions?",
    a: "No. NASAA's questions are confidential and copyrighted. Every question here is original, written by Tigertest from NASAA's published test specifications and the laws and rules it lists, such as the Uniform Securities Act, NASAA model rules, the Investment Advisers Act and SEC rules. Tigertest is not affiliated with NASAA or FINRA, and this practice does not replace your firm's training or a full prep course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Series 66 Practice Test",
      description,
      url: `${siteUrl}/series-66-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("series66"),
      featureList: [
        "200 Series 66 practice questions",
        "4 mock tests of 50 questions weighted like the real exam",
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
  { name: "Laws, regulations and ethics", weight: "45%" },
  { name: "Client recommendations and strategies", weight: "30%" },
  { name: "Investment vehicle characteristics", weight: "17%" },
  { name: "Economic factors and business information", weight: "8%" },
];

export default function Series66LandingPage() {
  return (
    <div data-theme="series66" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Series 66 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/series-66/dashboard"
            shortName="Series 66"
            subtitle="200 questions on NASAA's outline and four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/series66-mobile.png", desktop: "/landing/series66-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="series66" />

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
                Four training sets: economics and investment vehicles, client recommendations and strategies, registration of advisers, broker-dealers and securities, and communication and ethics. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 questions in NASAA&apos;s proportions, half the length of the real scored exam. No question appears in more than one test, and every answer is explained.
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
                NASAA splits the 100 scored questions across four sections. Each mock test here follows the same weights, so law, regulation and ethics make up 23 of every 50 questions.
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
                src={getTigerAsset("series66", 3)}
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
            How to Study for the Series 66
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with the law section</h3>
              <p>
                Nearly half the exam is law, regulation and ethics. Learn who is an investment adviser, an IAR, a broker-dealer and an agent, who is excluded, and when an adviser registers with the state or the SEC.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practise the calculations</h3>
              <p>
                Expect to work out current yield, ratios, CAPM, Sharpe ratios, real return and dollar-cost averaging by hand. Write down each formula and work every numeric question in this bank until the steps are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Match the product to the client</h3>
              <p>
                Strategy questions give a client and ask what fits. Read for time horizon, liquidity needs, tax situation and risk capacity before you look at the options.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Read ethics questions as the regulator</h3>
              <p>
                Ask whether the adviser or agent disclosed what mattered, had written authority, kept client assets safe and put the client&apos;s interest first. Review every explanation you get wrong, not only the answer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Series 66 Frequently Asked Questions
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

      <ExamSampleQuestions examId="series66" />

      <ExamRelatedTests examId="series66" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start the Series 66?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every section of NASAA&apos;s outline.</p>
          <ExamLandingCTA dashboardHref="/series-66/dashboard" />
        </div>
      </div>
    </div>
  );
}

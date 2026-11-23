import "@/lib/banks/series6";
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

const title = "Series 6 Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free Series 6 practice: 200 original questions on FINRA's content outline, four full-length 50-question mock tests in the real mix, every answer explained.";
const description =
  "Free practice for the FINRA Series 6 Investment Company and Variable Contracts Products Representative exam: 200 original questions written from FINRA's content outline and the rules it lists. Four mock tests of 50 questions, the length and mix of the real exam, and five training sets covering communications and new offerings, opening accounts and suitability, investment companies, variable contracts and 529 plans, and orders, transfers and complaints.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "series 6 practice test, series 6 exam practice, series 6 practice questions, investment company and variable contracts products representative, finra series 6, series 6 mock exam, mutual fund license exam, series 6 2026",
  alternates: {
    canonical: `${siteUrl}/series-6-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/series-6-practice-test`,
    images: [{ url: shareImageUrl("series6"), width: 1200, height: 630, alt: "Tigertest free Series 6 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("series6")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the Series 6 exam?",
    a: "The Series 6 is FINRA's Investment Company and Variable Contracts Products Representative exam. Passed together with the Securities Industry Essentials (SIE) exam, it qualifies a person to sell mutual funds, variable annuities, variable life insurance, unit investment trusts and municipal fund securities such as 529 plans. It does not cover individual stocks, bonds or options; those need the Series 7.",
  },
  {
    q: "How many questions are on the Series 6 and what is the passing score?",
    a: "The exam has 50 scored multiple-choice questions with four choices each, plus 5 unscored pretest questions mixed in, so 55 in all, and you have 1 hour and 30 minutes. The passing score is 70. Scores are equated, so 70 is a scaled score rather than a raw count. Each mock test here has the same 50 scored questions in the same mix, with a pass line of 35 of 50.",
  },
  {
    q: "What does the Series 6 cover?",
    a: "FINRA's content outline splits the 50 scored questions into four job functions: seeking business for the broker-dealer (12 questions), opening accounts after evaluating a customer's profile (8), giving information about investments, making recommendations, transferring assets and keeping records (25), and processing and confirming transactions (5). Most of the third function is mutual funds, variable annuities and 529 plans.",
  },
  {
    q: "Do I need the SIE for the Series 6?",
    a: "Yes. The SIE is a corequisite: you must pass both the SIE and the Series 6 to hold the registration. You can take the SIE before joining a firm, but the Series 6 needs a sponsoring member firm. The Series 63 or 66 is often needed as well for state registration.",
  },
  {
    q: "Are these the real Series 6 questions?",
    a: "No. FINRA's questions are confidential. Every question here is original, written by Tigertest from FINRA's published content outline and the rules it lists, such as FINRA Rules 2210, 2330 and 2341, the Investment Company Act and SEC rules. Tigertest is not affiliated with FINRA, and this practice does not replace your firm's training or a full prep course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Series 6 Practice Test",
      description,
      url: `${siteUrl}/series-6-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("series6"),
      featureList: [
        "200 Series 6 practice questions",
        "4 mock tests of 50 questions in the real exam's mix",
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
  { name: "Investment information, recommendations and records", weight: "50%" },
  { name: "Seeking business for the broker-dealer", weight: "24%" },
  { name: "Opening accounts and customer profiles", weight: "16%" },
  { name: "Processing and confirming transactions", weight: "10%" },
];

export default function Series6LandingPage() {
  return (
    <div data-theme="series6" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Series 6 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/series-6/dashboard"
            shortName="Series 6"
            subtitle="200 questions on FINRA's outline and four full-length mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/series6-mobile.png", desktop: "/landing/series6-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="series6" />

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
                Five training sets: communications and new offerings, opening accounts and suitability, investments and investment companies, variable contracts and disclosures, and orders, transfers and complaints. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full-Length Mock Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions, the same length and the same 12, 8, 25 and 5 split across FINRA&apos;s functions as the scored exam. No question appears in more than one test, and every answer is explained.
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
                Built on FINRA&apos;s Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                FINRA splits the 50 scored questions across four job functions. Each mock test here follows the same split, so investment information and recommendations make up 25 of every 50 questions.
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
                src={getTigerAsset("series6", 3)}
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
            How to Study for the Series 6
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master investment companies first</h3>
              <p>
                Half the exam is the third function, and most of it is mutual funds. Learn forward pricing, share classes, breakpoints, rights of accumulation, letters of intent and 12b-1 fees until you can explain each one without notes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know variable annuities in depth</h3>
              <p>
                Accumulation and annuity units, the assumed interest rate, death and living benefits, taxation and Rule 2330 exchanges come up often. Work out how each choice changes the customer&apos;s payment and costs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the communication rules</h3>
              <p>
                Seeking business is a quarter of the exam. Know the difference between correspondence and retail communications, what needs principal approval or FINRA filing, and what fund ads must show.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Work the numbers by hand</h3>
              <p>
                Expect to compute offering prices, sales charges, NAV and breakpoint eligibility. Write each formula down and review every explanation you get wrong, not only the answer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Series 6 Frequently Asked Questions
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

      <ExamSampleQuestions examId="series6" />

      <ExamRelatedTests examId="series6" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Start the Series 6?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every function of FINRA&apos;s outline.</p>
          <ExamLandingCTA dashboardHref="/series-6/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/sgm9a";
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

const title = "CMFAS M9A Practice Test 2026 - Free Module 9A Structured Products and ILP Questions";
const metaDescription =
  "Free practice for CMFAS Module 9A, Life Insurance and Investment-Linked Policies II: 200 original questions on structured products, their risks, derivatives, Structured ILPs, portfolio insurance and case studies, every answer explained.";
const description =
  "Free practice for CMFAS Module 9A (M9A), Life Insurance and Investment-Linked Policies II, the Singapore College of Insurance paper that representatives need, with Module 9, to advise on or arrange investment-linked policies under MAS Notice FAA-N26: 200 original questions on structured products and their risks, exchange-traded and OTC derivatives, Structured ILPs, portfolio insurance, the MAS rules for ILP sub-funds and case studies. Four 50-question practice tests at the real one-hour pace and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cmfas m9a practice test, cmfas module 9a, m9a mock exam, life insurance and investment-linked policies ii, cmfas m9a questions, structured ilp exam, structured products exam singapore, sci m9a, cm-lip, m9a mock test 2026",
  alternates: {
    canonical: `${siteUrl}/cmfas-m9a-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cmfas-m9a-practice-test`,
    images: [{ url: shareImageUrl("sgm9a"), width: 1200, height: 630, alt: "Tigertest free CMFAS M9A practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sgm9a")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is CMFAS Module 9A?",
    a: "Module 9A, Life Insurance and Investment-Linked Policies II, is a CMFAS paper set by the Singapore College of Insurance (SCI). Under MAS Notice FAA-N26, representatives who advise on or arrange life policies that are Specified Investment Products, such as investment-linked policies, need M9A as well as Module 9 and RES5. It covers structured products and their risks, derivatives, Structured ILPs, portfolio investments with an insurance and case studies. M9 and M9A can also be taken together as the combined module CM-LIP.",
  },
  {
    q: "How many questions are on M9A and what is the pass mark?",
    a: "SCI lists M9A as 50 multiple-choice questions in 1 hour, with a passing grade of 70%. Each correct answer earns one mark and nothing is deducted for wrong or blank answers. It is a closed-book computer screen examination in English, held on weekdays, with no limit on resits, and only a result slip is issued.",
  },
  {
    q: "How is M9A different from M9?",
    a: "Module 9 covers life insurance and investment-linked policies in general: policy types, riders, charges, unit pricing and the rules for selling them. M9A goes further into the investments: how structured products and derivatives work, what can go wrong with them, how Structured ILPs and capital guaranteed sub-funds behave in different markets, and how to judge whether they suit a client. Some people are exempt from M9A, for example holders of a degree in finance, actuarial science or insurance, or the CFA charter.",
  },
  {
    q: "How are these practice tests built?",
    a: "Each practice test is the real length: 50 questions in an hour, with 70% to pass. SCI does not publish chapter weights, so each test follows Tigertest's split across the six chapters: 9 on structured products, 8 on their risks, 10 on derivatives, 9 on Structured ILPs, 7 on portfolio insurance and the fund rules, and 7 case studies. No question appears in more than one test.",
  },
  {
    q: "Are these the real SCI exam questions?",
    a: "No. Every question is original, written by Tigertest from MAS Notice 307 on investment-linked policies, the Code on Collective Investment Schemes, MAS guidance on structured deposits and notes, and the M9A outline as they stand in November 2026, not from the SCI study text or any past paper. It is practice that is free to start, not affiliated with SCI or MAS, and it does not replace the official study text.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CMFAS M9A Practice Test",
      description,
      url: `${siteUrl}/cmfas-m9a-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sgm9a", "SGD"),
      featureList: [
        "200 Module 9A practice questions",
        "4 practice tests of 50 questions in 1 hour",
        "5 training sets by chapter",
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
  { name: "Introduction to structured products", weight: "9 of 50" },
  { name: "Risk considerations of structured products", weight: "8 of 50" },
  { name: "Understanding derivatives", weight: "10 of 50" },
  { name: "Introduction to Structured ILPs", weight: "9 of 50" },
  { name: "Portfolio insurance and fund rules", weight: "7 of 50" },
  { name: "Case studies", weight: "7 of 50" },
];

export default function CmfasM9aLandingPage() {
  return (
    <div data-theme="sgm9a" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CMFAS M9A Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cmfas-m9a/dashboard"
            shortName="CMFAS M9A"
            subtitle="200 CMFAS Module 9A questions. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/sgm9a-mobile.png", desktop: "/landing/sgm9a-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sgm9a" />

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
                Five training sets that follow the M9A chapters: structured products, their risks, derivatives, Structured ILPs, and portfolio insurance with case studies. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests at the Real Length</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each an hour long with a 70% pass line, like the real paper. No question appears in more than one test, and every answer explains the reasoning, from option payoffs and capped returns to the rules for capital guaranteed sub-funds.
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
                Built on the M9A Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real paper is 50 multiple-choice questions in 1 hour, with 70% to pass. SCI does not publish chapter weights, so each practice test here uses Tigertest&apos;s own split across the six chapters:
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
                src={getTigerAsset("sgm9a", 3)}
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
            How to Pass M9A
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Take a product apart</h3>
              <p>
                Most structured products are a bond or deposit plus options. Ask what protects the capital, what buys the upside, and what the investor has given up, such as a cap, dividends or downside protection, to pay for an enhanced coupon.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Work the numbers by hand</h3>
              <p>
                Participation and caps, option payoffs and breakevens, intrinsic and time value, margin calls, and the CPPI cushion and exposure all come up. Write out each step: the common traps are forgetting the premium or the cap.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Remember protection works at maturity</h3>
              <p>
                Capital protection and guarantees apply at maturity and depend on the issuer or guarantor staying solvent. Before then, surrenders and withdrawals are at current values, which can be below the premium.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise against the clock</h3>
              <p>
                An hour for 50 questions is 72 seconds each, and the case studies take longer. Finish every training set, then sit each practice test in one go.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CMFAS M9A Frequently Asked Questions
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

      <ExamSampleQuestions examId="sgm9a" />

      <ExamRelatedTests examId="sgm9a" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass M9A?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all six M9A chapters.</p>
          <ExamLandingCTA dashboardHref="/cmfas-m9a/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/sgm9";
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

const title = "CMFAS M9 Practice Test 2026 - Free Life Insurance and ILP Questions";
const metaDescription =
  "Free practice for CMFAS M9, Life Insurance and Investment-Linked Policies: 200 original questions on life products, riders, par policies, ILPs and their calculations, annuities, claims, contract law, tax relief and nominations, every answer explained.";
const description =
  "Free practice for M9, Life Insurance and Investment-Linked Policies, the CMFAS module set by the Singapore College of Insurance that MAS Notice FAA-N26 lists for representatives who advise on or arrange life policies: 200 original questions on risk and premiums, term, whole life and endowment plans, riders, participating policies, investment-linked policies and their sub-funds and calculations, annuities, underwriting, policy services and claims, contract and agency law, Life Insurance Relief and nominations. Four 50-question mock tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cmfas m9 practice test, cmfas module 9, m9 life insurance and investment-linked policies, m9 mock exam, cmfas m9 questions, sci m9, ilp exam singapore, life insurance exam singapore, m9 mock test 2026, cm-lip",
  alternates: {
    canonical: `${siteUrl}/cmfas-m9-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cmfas-m9-practice-test`,
    images: [{ url: shareImageUrl("sgm9"), width: 1200, height: 630, alt: "Tigertest free CMFAS M9 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("sgm9")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is CMFAS M9?",
    a: "M9, Life Insurance and Investment-Linked Policies, is a CMFAS module set by the Singapore College of Insurance (SCI). Its 17 chapters cover risk and premiums, traditional life products, riders, participating policies, investment-linked policies and their sub-funds and calculations, annuities, underwriting, policy services, claims, the insurance contract, the law of agency, income tax and nominations, wills and trusts.",
  },
  {
    q: "How many questions are on M9 and what is the pass mark?",
    a: "SCI lists M9 as 100 multiple-choice questions in 2 hours with a passing grade of 70%. Each correct answer earns one mark, and nothing is taken off for wrong or blank answers. It is a closed-book computer screen examination in English, and the study text is an eBook: the 7th Edition (Version 1.2) applies to exams from 22 September 2026.",
  },
  {
    q: "Who needs to pass M9?",
    a: "MAS Notice FAA-N26 lists M9, together with RES5 and M9A, for representatives of financial advisers who advise on or arrange life policies. The combined module CM-LIP can be taken in place of M9 and M9A, and CM-LIC adds collective investment schemes. Some qualifications, such as a degree in actuarial science or insurance, exempt a person from M9, so check with your company's compliance department.",
  },
  {
    q: "How are these mock tests built?",
    a: "The real paper's 100 questions in 2 hours are modelled as four 50-question mock tests at the same pace of 1.2 minutes a question, with the real 70% pass line. SCI publishes no chapter weights, so the split is Tigertest's: 4 on risk and premiums, 6 on classification and traditional products, 4 on riders, 5 on participating policies, 7 on ILPs and sub-funds, 5 on ILP calculations, 4 on annuities, 6 on underwriting, policy services and claims, 4 on contract and agency law and 5 on income tax and nominations.",
  },
  {
    q: "Are these the real SCI exam questions?",
    a: "No. Every question is original, written by Tigertest from MAS Notice 307, the LIA Code of Life Insurance Practice, the LIA guides to life insurance, participating policies, investment-linked policies and nominations, and IRAS rules on Life Insurance Relief as they stand in November 2026, not from the SCI study text or any past paper. It is free practice, not affiliated with SCI, MAS or LIA, and it does not replace the official study text.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CMFAS M9 Practice Test",
      description,
      url: `${siteUrl}/cmfas-m9-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("sgm9", "SGD"),
      featureList: [
        "200 M9 practice questions",
        "4 mock tests of 50 questions at the real pace",
        "5 training sets by syllabus chapter",
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
  { name: "Risk, premiums and traditional products", weight: "10 of 50" },
  { name: "Riders and participating policies", weight: "9 of 50" },
  { name: "Investment-linked policies and calculations", weight: "12 of 50" },
  { name: "Annuities, underwriting, policy services and claims", weight: "10 of 50" },
  { name: "Contract and agency law, tax and nominations", weight: "9 of 50" },
];

export default function CmfasM9LandingPage() {
  return (
    <div data-theme="sgm9" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CMFAS M9 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cmfas-m9/dashboard"
            shortName="CMFAS M9"
            subtitle="200 CMFAS M9 questions on life insurance and ILPs. Four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/sgm9-mobile.png", desktop: "/landing/sgm9-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="sgm9" />

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
                Five training sets that follow the 17 M9 chapters: risk and traditional products, riders and participating policies, investment-linked policies and their calculations, annuities, underwriting and claims, and contract law, tax and nominations. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mock Tests at the Real Pace</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock tests of 50 questions at the real pace, with the real 70% pass line. No question appears in more than one test, and every answer explains the rule or shows the working, from unit allocations and surrender charges to Life Insurance Relief.
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
                Built on the M9 Syllabus
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The real paper is 100 multiple-choice questions in 2 hours, with 70% to pass. SCI publishes no chapter weights, so each 50-question mock test here uses Tigertest&apos;s own split across the 17 chapters:
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
                src={getTigerAsset("sgm9", 3)}
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
            How to Pass M9
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Practise the ILP calculations</h3>
              <p>
                Chapter 9 is pure arithmetic: units bought at the NAV, premium and surrender charges, units cancelled for insurance charges, switches and the sum at risk. Work each step on paper until it is quick.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know par policies and ILPs side by side</h3>
              <p>
                Bonuses, smoothing, the 1/9 cap on shareholders&apos; share and the appointed actuary on one side; units, sub-funds, single pricing and the investment risk the policyholder bears on the other.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the service standards and nominations</h3>
              <p>
                The free-look, grace period, claims timelines and the difference between a trust and a revocable nomination come up often. Learn who can be a nominee, who must consent and where living benefits go.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise at the real pace</h3>
              <p>
                Two hours for 100 questions is 1.2 minutes each. Finish every training set, then aim for 80% or better on each mock test before you book, so a few unfamiliar questions on the day cannot pull you under 70%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CMFAS M9 Frequently Asked Questions
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

      <ExamSampleQuestions examId="sgm9" />

      <ExamRelatedTests examId="sgm9" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass M9?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all 17 chapters of the M9 syllabus.</p>
          <ExamLandingCTA dashboardHref="/cmfas-m9/dashboard" />
        </div>
      </div>
    </div>
  );
}

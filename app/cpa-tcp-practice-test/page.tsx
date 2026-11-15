import "@/lib/banks/cpatcp";
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

const title = "CPA TCP Practice Test 2026 - Free Questions with Explanations";
const metaDescription =
  "Free CPA Exam TCP practice: 200 original multiple-choice questions on the AICPA's 2026 Tax Compliance and Planning blueprint, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for the Tax Compliance and Planning (TCP) Discipline section of the Uniform CPA Examination: 200 original multiple-choice questions written from the AICPA's 2026 TCP blueprint. Four 50-question mock tests weighted like the real section's four content areas, and six training sets covering individual tax planning, gift tax and personal financial planning, C corporations, trusts and exempt organizations, S corporations and partnerships, entity tax planning, and property transactions.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "cpa tcp practice test, tcp cpa exam practice questions, tax compliance and planning practice, cpa tax discipline, free cpa tcp questions, cpa tcp mcq, cpa tcp mock exam, cpa tcp 2026",
  alternates: {
    canonical: `${siteUrl}/cpa-tcp-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cpa-tcp-practice-test`,
    images: [{ url: shareImageUrl("cpatcp"), width: 1200, height: 630, alt: "Tigertest free CPA TCP practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("cpatcp")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on the CPA TCP section?",
    a: "Tax Compliance and Planning (TCP) is one of the three Discipline sections of the Uniform CPA Examination, and you take one Discipline section along with the three Core sections. The AICPA's 2026 blueprint splits TCP into four content areas: tax compliance and planning for individuals and personal financial planning (30 to 40%), entity tax compliance (30 to 40%), entity tax planning (10 to 20%) and property transactions (10 to 20%). The AICPA's summary of 2027 changes lists no revisions to TCP.",
  },
  {
    q: "How many questions are on TCP and what score do I need?",
    a: "TCP is a 4-hour section with 68 multiple-choice questions in two testlets of 34 and 7 task-based simulations, each half of the score. Scores are reported from 0 to 99 and 75 passes, but 75 is a scaled score, not 75 percent correct. The mock tests here use a 75 percent target as a readiness line.",
  },
  {
    q: "How is TCP different from REG?",
    a: "REG is the Core tax section: basis, gross income, deductions, credits and the basic rules for corporations and flow-through entities. TCP goes further into nonroutine and planning work: equity compensation, passive and at-risk losses, gift tax, retirement and education planning, section 351 transfers, liquidations, consolidated returns, partnership elections and distributions, built-in gains, trusts, like-kind exchanges, recapture and related parties. The questions here are written to build on REG without repeating it.",
  },
  {
    q: "Does this practice test cover task-based simulations or tax amounts that change each year?",
    a: "No. Every question here is multiple choice, which is half of your TCP score; task-based simulations and research tasks are not modelled. The AICPA blueprint says candidates are not tested on rates, amounts or limits indexed to inflation, so the questions use rules that stay put. The few that need a yearly figure, such as the 2026 gift tax annual exclusion, give it in the question.",
  },
  {
    q: "Are these real CPA Exam questions?",
    a: "No. Every question is original, written by Tigertest from the AICPA's published TCP blueprint and the Internal Revenue Code and Treasury Regulations it lists as references. It is practice, not affiliated with the AICPA, NASBA or any state board of accountancy, and it does not replace a full review course.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CPA TCP Practice Test",
      description,
      url: `${siteUrl}/cpa-tcp-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("cpatcp"),
      featureList: [
        "200 CPA TCP multiple-choice questions",
        "4 mock tests of 50 questions weighted like the AICPA blueprint",
        "6 training sets by content area",
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
  { name: "Individuals and personal financial planning", weight: "30-40%" },
  { name: "Entity tax compliance", weight: "30-40%" },
  { name: "Entity tax planning", weight: "10-20%" },
  { name: "Property transactions (disposition of assets)", weight: "10-20%" },
];

export default function CpaTcpLandingPage() {
  return (
    <div data-theme="cpatcp" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CPA TCP Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cpa-tcp/dashboard"
            shortName="CPA TCP"
            subtitle="200 original multiple-choice questions on the AICPA's 2026 TCP blueprint: individual tax planning, gift tax and financial planning, C and S corporations, partnerships and trusts, entity planning and property transactions. Four 50-question mock tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/cpatcp-mobile.png", desktop: "/landing/cpatcp-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cpatcp" />

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
                Six training sets: individual tax planning, gift tax and financial planning, C corporations, trusts and exempt organizations, S corporations and partnerships, entity tax planning, and property transactions. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 multiple-choice questions in the blueprint&apos;s proportions, with a 75% target. No question appears in more than one test, and every calculation is worked through in the explanation.
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
                Built on the AICPA&apos;s TCP Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The AICPA&apos;s 2026 blueprint gives each of TCP&apos;s four content areas a range, and the 2027 blueprint leaves TCP unchanged. Each mock test here sits at the middle of those ranges, so individuals and entity compliance make up 35 of every 50 questions. Task-based simulations are not modelled.
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
                src={getTigerAsset("cpatcp", 1)}
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
            How to Pass CPA TCP
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master basis in every entity</h3>
              <p>
                Section 351 transfers, partnership contributions with debt, S corporation stock and debt basis, distributions and liquidations all come down to basis. Write the starting basis, the increases and the decreases in the order the rules require before you look at the choices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Compare entities side by side</h3>
              <p>
                Planning questions ask what happens to the same facts in a C corporation, an S corporation and a partnership. Know where gain is taxed once or twice, which entity lets debt count in basis, and when a distribution of appreciated property triggers gain.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the property transaction steps</h3>
              <p>
                Realized gain, recognized gain, deferred gain and the new basis follow the same pattern in like-kind exchanges and involuntary conversions. Then sort the recognized gain into section 1245, unrecaptured 1250 and 1231 amounts.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Practise the multiple choice, then the simulations</h3>
              <p>
                Multiple choice is half the score, and the task-based simulations build on the same rules. Aim for 80% or better on every mock test here, then work through simulations with the AICPA&apos;s sample tests before you sit the section.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CPA TCP Frequently Asked Questions
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

      <ExamSampleQuestions examId="cpatcp" />

      <ExamRelatedTests examId="cpatcp" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass CPA TCP?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every area of the AICPA&apos;s TCP blueprint.</p>
          <ExamLandingCTA dashboardHref="/cpa-tcp/dashboard" />
        </div>
      </div>
    </div>
  );
}

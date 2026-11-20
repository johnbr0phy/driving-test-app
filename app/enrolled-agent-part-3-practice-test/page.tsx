import "@/lib/banks/ea3";
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

const title = "Free Enrolled Agent Exam Part 3 Practice Test 2026 - SEE Representation";
const metaDescription =
  "Enrolled Agent (SEE) Part 3 practice, free to start: 200 original questions on Circular 230, powers of attorney, collections, audits, appeals, penalties and e-file, four 50-question mock tests, every answer explained.";
const description =
  "Free practice for Part 3 (Representation, Practices and Procedures) of the IRS Special Enrollment Examination for enrolled agents: 200 original multiple-choice questions written from the IRS content outline in PSI's Candidate Information Bulletin, Treasury Department Circular 230, the Internal Revenue Code and IRS publications on representation, collection, examinations, appeals and e-file. Four 50-question mock tests weighted like the real part's four domains, and four training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "enrolled agent exam part 3 practice test, see part 3 practice questions, ea exam part 3, special enrollment examination representation practices and procedures, circular 230 practice questions, free enrolled agent practice test, see part 3 2026",
  alternates: {
    canonical: `${siteUrl}/enrolled-agent-part-3-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/enrolled-agent-part-3-practice-test`,
    images: [{ url: shareImageUrl("ea3"), width: 1200, height: 630, alt: "Tigertest free Enrolled Agent Part 3 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ea3")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is on Part 3 of the Enrolled Agent exam?",
    a: "Part 3 of the Special Enrollment Examination (SEE) covers representation, practices and procedures. The IRS content outline in the Candidate Information Bulletin lists four domains with their scored questions: practices and procedures (26), which covers Circular 230 and preparer rules and penalties; representation before the IRS (25), including powers of attorney and building a client's case; specific areas of representation (20), meaning collection, penalty abatement, examinations and appeals; and the filing process (14), including records, data security and IRS e-file.",
  },
  {
    q: "How many questions are on Part 3 and what score do I need?",
    a: "Each part has 100 multiple-choice questions, 85 scored and 15 unscored, in 3.5 hours. Results are scaled from 200 to 800 and the IRS passing score is 500, which is not a fixed percentage. The mock tests here are 50 questions, with a 70 percent target as a readiness line.",
  },
  {
    q: "Which rules does Part 3 follow?",
    a: "For exams taken from July 1, 2026 to February 28, 2027, the bulletin says questions follow the Internal Revenue Code, regulations and IRS forms and publications as amended through December 31, 2025, and that candidates should not consider legislation, court decisions or penalty amounts after that date. The bulletin also points candidates to Treasury Department Circular 230, the rules for practice before the IRS.",
  },
  {
    q: "When can I take the SEE?",
    a: "The exam is given by PSI for the IRS, in person at a PSI test center or by remote proctoring, both in the U.S. for now (international testing is delayed, and will be remote only when it resumes). The current window runs July 1, 2026 to February 28, 2027, with no testing in March and April while the exam is updated. Each part can be taken up to four times a window, in any order, and a passed part carries over for three years.",
  },
  {
    q: "Are these real Enrolled Agent exam questions?",
    a: "No. Every question is original, written by Tigertest from the IRS content outline, Circular 230, the Internal Revenue Code and IRS forms and publications. It is practice, not affiliated with the IRS or PSI, and it does not replace the IRS's own study materials.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free Enrolled Agent Part 3 Practice Test",
      description,
      url: `${siteUrl}/enrolled-agent-part-3-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ea3"),
      featureList: [
        "200 SEE Part 3 multiple-choice questions",
        "4 mock tests of 50 questions weighted like the IRS outline",
        "4 training sets by domain",
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
  { name: "Practices and procedures", weight: "26 questions" },
  { name: "Representation before the IRS", weight: "25 questions" },
  { name: "Specific areas of representation", weight: "20 questions" },
  { name: "Filing process", weight: "14 questions" },
];

export default function EnrolledAgentPart3LandingPage() {
  return (
    <div data-theme="ea3" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free Enrolled Agent Part 3 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/enrolled-agent-part-3/dashboard"
            shortName="SEE Part 3"
            subtitle="200 Enrolled Agent Part 3 questions. Four 50-question mock tests. Free to start, no account needed."
            shots={{ mobile: "/landing/ea3-mobile.png", desktop: "/landing/ea3-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ea3" />

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
                Four training sets: practices and procedures, representation before the IRS, collections, audits and appeals, and the filing process. Questions you miss come back until you have mastered them.
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
                Four mock tests of 50 multiple-choice questions in the IRS outline&apos;s proportions, with a 70% target. No question appears in more than one test, and every explanation names the rule, form or publication behind the answer.
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
                Built on the IRS Part 3 Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The IRS content outline gives each of Part 3&apos;s four domains a set number of the 85 scored questions. Each mock test here scales those counts to 50: 15 practices and procedures, 15 representation, 12 specific areas of representation and 8 filing process questions. The 15 unscored experimental questions are not modelled.
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
                src={getTigerAsset("ea3", 3)}
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
            How to Pass SEE Part 3
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Read Circular 230 itself</h3>
              <p>
                Practices and procedures is the biggest domain, 26 scored questions. Contingent fee exceptions, conflict waivers, return of records, advertising and the sanctions in subpart C come straight from the text of Circular 230, which the bulletin names as a study source.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know Form 2848 line by line</h3>
              <p>
                Powers of attorney anchor the representation domain: what the default authority covers, what needs line 5a, how to revoke or withdraw, and how Form 2848 differs from Form 8821. The Form 2848 instructions answer most of these.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the deadlines as a set</h3>
              <p>
                Collection and appeals questions turn on days: 30 for a CDP hearing, one year for an equivalent hearing, 90 or 150 to petition the Tax Court, 60 to contest a math error assessment. Write them in one table and drill it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip the e-file rules</h3>
              <p>
                The filing process is 14 scored questions, mostly from IRS Publications 1345 and 3112: Form 8879 retention, signature methods, rejected returns, the 11-return e-file requirement, advertising and the levels of infractions.
              </p>
            </div>
          
</div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          Enrolled Agent Part 3 Frequently Asked Questions
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

      <ExamSampleQuestions examId="ea3" />

      <ExamRelatedTests examId="ea3" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass SEE Part 3?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the IRS Part 3 outline.</p>
          <ExamLandingCTA dashboardHref="/enrolled-agent-part-3/dashboard" />
        </div>
      </div>
    </div>
  );
}

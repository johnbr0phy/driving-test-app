import "@/lib/banks/uksqe1";
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

const title = "Free SQE1 Practice Test 2026 - FLK1 and FLK2 Questions";
const metaDescription =
  "Free-to-start SQE1 practice test: 200 original single best answer questions across FLK1 and FLK2, four 50-question mixed tests and six training sets, every answer explained.";
const description =
  "Practise for the Solicitors Regulation Authority's SQE1 Functioning Legal Knowledge assessments: 200 original single best answer questions written from the SRA's SQE1 Assessment Specification and Functioning Legal Knowledge (applicable from 1 September 2026) and the law of England and Wales. Four 50-question practice tests, each half FLK1 and half FLK2, and six training sets covering business law and practice, dispute resolution, contract, tort, the legal system and public law, legal services and ethics, property practice, wills and the administration of estates, solicitors accounts, land law, trusts, criminal liability and criminal law and practice.";

const faqs = [
  {
    q: "What is SQE1?",
    a: "SQE1 is the first stage of the Solicitors Qualifying Examination, the SRA's route to qualifying as a solicitor in England and Wales. It tests functioning legal knowledge in two closed book assessments, FLK1 and FLK2. FLK1 covers business law and practice, dispute resolution, contract, tort, the legal system (with constitutional, administrative and EU law) and legal services. FLK2 covers property practice, wills and the administration of estates, solicitors accounts, land law, trusts, criminal liability and criminal law and practice. Ethics and professional conduct are tested across both.",
  },
  {
    q: "How many questions are in each FLK assessment?",
    a: "From January 2027 each FLK assessment has 170 single best answer questions, sat in two sessions of 85 questions with 2 hours 33 minutes per session, so SQE1 has 340 questions in all. Before 2027 each assessment had 180 questions. The SRA says the share of questions for each subject area stays the same.",
  },
  {
    q: "What is the SQE1 pass mark?",
    a: "There is no fixed percentage. The SRA sets the pass mark for each sitting as a number of correct answers, and results are reported on a scale of 0 to 500 with the pass mark at 300. You must pass FLK1 and FLK2 separately to pass SQE1. You have three attempts at each assessment, within six years of your first SQE assessment. Tigertest marks 60% as a readiness line, not an official mark.",
  },
  {
    q: "How are these practice questions different from the real exam?",
    a: "Real SQE1 questions have five options and a single best answer, set in a short client scenario. Tigertest's questions have four options and are shorter, so you can drill one rule at a time; each test mixes FLK1 and FLK2 half and half. Tax rates and thresholds that change with each Budget are not asked: the SRA gives those figures in the question when a calculation needs them.",
  },
  {
    q: "Are these real SQE1 questions?",
    a: "No. Every question is original, written by Tigertest from the SRA's SQE1 Assessment Specification and Functioning Legal Knowledge, the SRA Code of Conduct and Accounts Rules, and the law of England and Wales as at November 2026. The SRA's sample questions are not copied or reworded. Tigertest is not affiliated with the Solicitors Regulation Authority or any SQE training provider.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "sqe1 practice test, sqe1 questions, sqe1 mock, flk1 practice questions, flk2 practice questions, solicitors qualifying examination, sqe practice questions, sra sqe1, functioning legal knowledge",
  alternates: {
    canonical: `${siteUrl}/sqe1-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/sqe1-practice-test`,
    images: [{ url: shareImageUrl("uksqe1"), width: 1200, height: 630, alt: "Tigertest free SQE1 practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("uksqe1")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free SQE1 Practice Test",
      description,
      url: `${siteUrl}/sqe1-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("uksqe1"),
      featureList: [
        "200 SQE1 practice questions across FLK1 and FLK2",
        "4 practice tests of 50 questions, half FLK1 and half FLK2",
        "6 training sets by subject",
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
  { name: "Business law & dispute resolution", weight: "10 of 50" },
  { name: "Contract & tort", weight: "8 of 50" },
  { name: "Legal system & legal services", weight: "7 of 50" },
  { name: "Property, wills & solicitors accounts", weight: "10 of 50" },
  { name: "Land law & trusts", weight: "8 of 50" },
  { name: "Criminal liability & practice", weight: "7 of 50" },
];

export default function UkSqe1LandingPage() {
  return (
    <div data-theme="uksqe1" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free SQE1 Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/sqe1/dashboard"
            shortName="SQE1"
            subtitle="200 FLK1 and FLK2 questions and four 50-question mixed tests. Free to start, no account needed."
            shots={{ mobile: "/landing/uksqe1-mobile.png", desktop: "/landing/uksqe1-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="uksqe1" />

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
                Six training sets follow the SRA&apos;s Functioning Legal Knowledge: business law and dispute resolution, contract and tort, the legal system and legal services, property and wills with solicitors accounts, land law and trusts, and criminal law. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Mixed Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests of 50 questions, each half FLK1 and half FLK2, mixing every subject the way the real assessments do. Aim for 60% or better, Tigertest&apos;s readiness line; the SRA sets the real pass mark for each sitting. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the SRA&apos;s Functioning Legal Knowledge
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The SRA&apos;s SQE1 Assessment Specification lists the subjects in FLK1 and FLK2 and says ethics and professional conduct are tested in both. Every practice test here gives half its questions to FLK1 and half to FLK2, in proportion to the SRA&apos;s blueprint, with ethics woven into the scenarios.
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
                src={getTigerAsset("uksqe1", 3)}
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
            How to Prepare for SQE1
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the rule, then apply it</h3>
              <p>
                SQE1 asks what a newly qualified solicitor would do for a client, so knowing a rule is only half the job. For each topic, practise spotting which rule a short set of facts raises and what result it gives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Keep FLK1 and FLK2 both moving</h3>
              <p>
                You must pass both assessments separately, so a strong FLK1 cannot carry a weak FLK2. Mixed practice tests show early which half needs more work.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not leave ethics and accounts to last</h3>
              <p>
                Ethics and professional conduct can come up in any subject, and solicitors accounts are tested in property and probate settings. Learn the SRA Principles, the Code of Conduct and the Accounts Rules alongside the subjects they appear in.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 60% or better on every practice test. After each test, drill the questions you missed and retrain the weakest subject.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          SQE1 Frequently Asked Questions
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

      <ExamSampleQuestions examId="uksqe1" />

      <ExamRelatedTests examId="uksqe1" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for SQE1?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across FLK1 and FLK2.</p>
          <ExamLandingCTA dashboardHref="/sqe1/dashboard" />
        </div>
      </div>
    </div>
  );
}

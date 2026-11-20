import "@/lib/banks/bcaba";
import { shareImageUrl } from "@/lib/shareImageUrl";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";
import { SITE_URL } from "@/lib/siteUrl";
import { ExamSampleQuestions } from "@/components/exam/ExamSampleQuestions";
import { examOffers } from "@/lib/examSeo";

const siteUrl = SITE_URL;

const title = "Free BCaBA Practice Test 2026 - BACB Board Certified Assistant Behavior Analyst Exam Questions";
const metaDescription =
  "Free-to-start BCaBA practice test: 200 original questions on the BACB BCaBA Test Content Outline (6th ed.), four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the Behavior Analyst Certification Board's Board Certified Assistant Behavior Analyst (BCaBA) exam: 200 original questions written from the BCaBA Test Content Outline (6th ed.) and the Ethics Code for Behavior Analysts. Four 50-question practice tests weighted like the real exam's nine domains, and five training sets covering philosophy and principles, measurement and experimental design, ethics and behavior assessment, behavior-change procedures and intervention monitoring, and supervisory relationships.";

const faqs = [
  {
    q: "What is the BCaBA exam?",
    a: "It is the certification exam for the Board Certified Assistant Behavior Analyst credential from the Behavior Analyst Certification Board (BACB), the undergraduate-level certification in behavior analysis. Candidates take it after meeting the degree, coursework and fieldwork requirements and having their application approved. BCaBAs provide behavior-analytic services under the supervision of a BCBA and may supervise RBTs.",
  },
  {
    q: "How many questions are on the BCaBA exam?",
    a: "The BACB's BCaBA Handbook says the exam is 4 hours and has 175 multiple-choice questions: 150 scored and 25 unscored. Each question has 4 possible answers with only 1 correct. It is offered only in English, on a computer at Pearson VUE testing centers.",
  },
  {
    q: "What score do you need to pass the BCaBA exam?",
    a: "The BCaBA exam is pass/fail. The BACB sets the passing score with the modified Angoff method, a criterion-referenced process run by a panel of certified subject matter experts, and does not publish it as a percentage. The 70 percent line on these practice tests is a readiness target, not the official standard. Candidates may take the exam up to 8 times within the 2-year authorization period, waiting 30 days between attempts.",
  },
  {
    q: "What is on the BCaBA exam?",
    a: "The BCaBA Test Content Outline (6th ed.) has 90 tasks in 9 domains: Behaviorism and Philosophical Foundations (10 questions), Concepts and Principles (18), Measurement, Data Display, and Interpretation (20), Experimental Design (10), Ethical and Professional Issues (18), Behavior Assessment (17), Behavior-Change Procedures (22), Intervention Development and Monitoring (20), and Supervisory Relationships (15). Each practice test here keeps that balance, scaled to 50 questions.",
  },
  {
    q: "Are these the real BCaBA exam questions?",
    a: "No. Every question is original, written by Tigertest from the BACB's published test content outline, BCaBA Handbook and Ethics Code, so it covers the same knowledge without copying the exam. Graphs are described in words. Tigertest is not affiliated with the Behavior Analyst Certification Board.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "bcaba practice test, bcaba exam, bcaba practice exam, bacb bcaba questions, board certified assistant behavior analyst exam, bcaba 6th edition test content outline, bcaba mock exam, assistant behavior analyst certification",
  alternates: {
    canonical: `${siteUrl}/bcaba-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/bcaba-practice-test`,
    images: [{ url: shareImageUrl("bcaba"), width: 1200, height: 630, alt: "Tigertest free BCaBA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("bcaba")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free BCaBA Practice Test",
      description,
      url: `${siteUrl}/bcaba-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("bcaba"),
      featureList: [
        "200 BCaBA practice questions",
        "4 practice tests of 50 questions weighted like the BCaBA Test Content Outline (6th ed.)",
        "5 training sets by domain",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ...faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        classFaqJsonLd("bcaba"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Behavior-Change Procedures", weight: "15%" },
  { name: "Measurement, Data Display, and Interpretation", weight: "13%" },
  { name: "Intervention Development and Monitoring", weight: "13%" },
  { name: "Concepts and Principles", weight: "12%" },
  { name: "Ethical and Professional Issues", weight: "12%" },
  { name: "Behavior Assessment", weight: "11%" },
  { name: "Supervisory Relationships", weight: "10%" },
  { name: "Behaviorism and Philosophical Foundations", weight: "7%" },
  { name: "Experimental Design", weight: "7%" },
];

export default function BcabaLandingPage() {
  return (
    <div data-theme="bcaba" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free BCaBA Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/bcaba/dashboard"
            shortName="BCaBA"
            subtitle="200 BCaBA questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/bcaba-mobile.png", desktop: "/landing/bcaba-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="bcaba" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Domain</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the outline in order: philosophy and principles; measurement and experimental design; ethics and behavior assessment; behavior-change procedures and intervention monitoring; and supervisory relationships. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 150 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the BCaBA Test Content Outline (6th ed.)
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The BACB publishes how many of the 150 scored questions come from each of the nine domains, and every practice test here keeps that balance, scaled to 50 questions. Ethics questions follow the Ethics Code for Behavior Analysts. Faculty teaching a BCaBA course sequence can set Tigertest as BCaBA review at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the class misses most.
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
                src={getTigerAsset("bcaba", 3)}
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
            How to Pass the BCaBA Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the principles</h3>
              <p>
                Behavior-change procedures is the largest domain, followed by measurement and intervention development. Be able to tell reinforcement from punishment in any scenario, name schedules from their patterns, separate motivating operations from discriminative stimuli, and classify the verbal operants.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read graphs and designs fluently</h3>
              <p>
                Practice judging level, trend and variability, calculating rate and IOA, and picking the single-case design that fits a question. Know what each threat to internal validity looks like.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the Ethics Code by situation</h3>
              <p>
                Ethics questions describe a case and ask what to do. Learn the Code&apos;s standards on competence, confidentiality, multiple relationships, consent, billing, referrals and when to seek your supervisor&apos;s guidance well enough to apply them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by domain. Aim for 70% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest domain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          BCaBA Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="bcaba" />
        </div>
      </div>

      <ExamSampleQuestions examId="bcaba" />

      <ExamRelatedTests examId="bcaba" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the BCaBA Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the BCaBA Test Content Outline.</p>
          <ExamLandingCTA dashboardHref="/bcaba/dashboard" />
        </div>
      </div>
    </div>
  );
}

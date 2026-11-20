import "@/lib/banks/qabaabat";
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

const title = "Free QABA ABAT Practice Test 2026 - Applied Behavior Analysis Technician Exam Questions";
const metaDescription =
  "Free-to-start QABA ABAT practice test: 200 original questions on QABA's ABAT test specifications and competency standards, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Practice for the Qualified Applied Behavior Analysis Credentialing Board's Applied Behavior Analysis Technician (ABAT) exam: 200 original questions written from QABA's ABAT job analysis test specifications, the ABAT Competency Standards and the QABA Ethical Code of Conduct. Four 50-question practice tests weighted like the real exam's 14 domains, and four training sets covering autism and ABA principles, teaching with DTT and PRT, function-based behavior support, and person-centered planning, values and ethics.";

const faqs = [
  {
    q: "What is the QABA ABAT exam?",
    a: "It is the certification exam for the Applied Behavior Analysis Technician credential from the Qualified Applied Behavior Analysis Credentialing Board (QABA). ABATs are entry-level practitioners who carry out treatment plans and collect data under the supervision of a licensed or certified professional such as a QBA, QASP-S, BCBA or BCaBA. Candidates take the exam after their 40 hours of approved coursework and application have been verified.",
  },
  {
    q: "How many questions are on the ABAT exam?",
    a: "QABA's ABAT page and Candidate Handbook (January 2026) say the exam has 125 questions in 2 hours: 100 are scored and 25 are unscored pretest questions that are not marked, so every question should be answered. It is taken online with a live proctor from Premier Proctoring.",
  },
  {
    q: "What score do you need to pass the ABAT exam?",
    a: "QABA sets the pass point at 72%, and candidates see a pass or fail result right after the exam. The practice tests here use the same 72% line. A candidate who fails may schedule a second attempt right away; a third or fourth attempt comes at least 7 days after the one before, and no one may test more than 8 times within a year of the first attempt.",
  },
  {
    q: "What is on the ABAT exam?",
    a: "QABA's ABAT test specifications list 14 domains over the 100 scored questions: Autism Spectrum Disorder Basics (12), Functional Analysis (11), Person Centered Planning (10), Philosophy, Values and Advocacy (9), Treating Individuals with Challenging Behaviors (8), Positive Behavior Support (7), Principles of ABA (6), Instructional Interventions (6), Principles of Working with Autism Effectively (6), Data Collection and Analysis (6), Education, Training and Self-Development (5), Pivotal Response Treatment (5), Legal and Ethical Considerations (5) and Discrete Trial Training (4). Each practice test here keeps that balance, scaled to 50 questions.",
  },
  {
    q: "How is the ABAT different from the RBT?",
    a: "Both are entry-level behavior technician credentials. The ABAT is issued by QABA and its exam follows QABA's own test specifications, competency standards and Ethical Code of Conduct, with a strong focus on autism, person-centered planning and positive behavior support. The RBT is issued by the BACB. Tigertest has a separate RBT practice test for that exam.",
  },
  {
    q: "Are these the real ABAT exam questions?",
    a: "No. Every question is original, written by Tigertest from QABA's published test specifications, ABAT Competency Standards, Candidate Handbook and Ethical Code of Conduct, so it covers the same knowledge without copying the exam. Tigertest is not affiliated with QABA.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "qaba abat practice test, abat exam, abat practice exam, qaba abat questions, applied behavior analysis technician exam, abat certification test, qaba exam, abat mock exam",
  alternates: {
    canonical: `${siteUrl}/qaba-abat-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/qaba-abat-practice-test`,
    images: [{ url: shareImageUrl("qabaabat"), width: 1200, height: 630, alt: "Tigertest free QABA ABAT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("qabaabat")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free QABA ABAT Practice Test",
      description,
      url: `${siteUrl}/qaba-abat-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("qabaabat"),
      featureList: [
        "200 ABAT practice questions",
        "4 practice tests of 50 questions weighted like QABA's ABAT test specifications",
        "4 training sets by topic",
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
        classFaqJsonLd("qabaabat"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Autism Spectrum Disorder Basics", weight: "12%" },
  { name: "Functional Analysis", weight: "11%" },
  { name: "Person Centered Planning", weight: "10%" },
  { name: "Philosophy, Values and Advocacy", weight: "9%" },
  { name: "Treating Individuals with Challenging Behaviors", weight: "8%" },
  { name: "Positive Behavior Support", weight: "7%" },
  { name: "Principles of ABA, Instructional Interventions, Working with Autism, Data", weight: "6% each" },
  { name: "Education and Training, PRT, Legal and Ethical", weight: "5% each" },
  { name: "Discrete Trial Training", weight: "4%" },
];

export default function QabaAbatLandingPage() {
  return (
    <div data-theme="qabaabat" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free QABA ABAT Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/qaba-abat/dashboard"
            shortName="ABAT"
            subtitle="200 QABA ABAT questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/qabaabat-mobile.png", desktop: "/landing/qabaabat-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="qabaabat" />

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
                Four training sets cover all 14 domains: autism and ABA principles; teaching with DTT, PRT and data; function and behavior support; and person-centered planning, values and ethics. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 100 scored questions on the real exam. Aim for 72% or better, QABA&apos;s pass point. No question appears in more than one test, and every one comes with an explanation.
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
                Built on QABA&apos;s ABAT Test Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                QABA publishes how many of the 100 scored questions come from each of 14 domains, and every practice test here keeps that balance, scaled to 50 questions. Content follows the ABAT Competency Standards and the QABA Ethical Code of Conduct. Instructors running ABAT coursework can set Tigertest as review at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the class misses most.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold whitespace-nowrap">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("qabaabat", 3)}
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
            How to Pass the ABAT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know autism well</h3>
              <p>
                Autism basics is the largest domain. Learn the DSM-5 criteria and severity levels, early signs such as not responding to name or pointing, common co-occurring conditions, and the terms used in diagnosis such as joint attention and pragmatic language.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Tie every behavior to its function</h3>
              <p>
                Functional analysis, challenging behavior and positive behavior support make up about a quarter of the exam. Practice naming the function from a short scenario and picking the replacement behavior and antecedent strategy that match it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn person-centered planning and the QABA Code</h3>
              <p>
                Person-centered planning and philosophy, values and advocacy are a fifth of the exam. Know that the person leads their plan, and learn the QABA Ethical Code of Conduct on scope, confidentiality, consent, mandated reporting and multiple relationships.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by domain. Aim for 72% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ABAT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="qabaabat" />
        </div>
      </div>

      <ExamSampleQuestions examId="qabaabat" />

      <ExamRelatedTests examId="qabaabat" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the ABAT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of QABA&apos;s ABAT test specifications.</p>
          <ExamLandingCTA dashboardHref="/qaba-abat/dashboard" />
        </div>
      </div>
    </div>
  );
}

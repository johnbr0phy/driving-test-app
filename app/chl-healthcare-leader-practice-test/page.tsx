import "@/lib/banks/hspachl";
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

const title = "Free CHL Practice Test 2026 - HSPA Certified Healthcare Leader Questions";
const metaDescription =
  "Free-to-start CHL practice test: 200 original questions on the 2026 HSPA Certified Healthcare Leader outline, four 50-question practice tests and four training sets, every answer explained.";
const description =
  "Practice for the Healthcare Sterile Processing Association (HSPA) Certified Healthcare Leader (CHL) exam for sterile processing leaders: 200 original questions written from HSPA's exam content outline revised August 2025 and updated January 2026. Four 50-question practice tests weighted like the real exam's four sections, and four training sets covering planning and decision making, organizing, leading, and governing and compliance.";

const faqs = [
  {
    q: "What is the HSPA CHL exam?",
    a: "It is the certification exam for the Certified Healthcare Leader credential from the Healthcare Sterile Processing Association (HSPA), a secondary certification for people who manage the daily operations of a sterile processing department. A current CRCST is required. From October 2026 HSPA also asks for one of 12 months of sterile processing experience, 12 months in a leadership role, or an associate degree or higher.",
  },
  {
    q: "How many questions are on the CHL exam?",
    a: "HSPA's certification handbook gives the CHL exam 150 multiple-choice questions: 125 scored and 25 unscored pretest questions mixed in so they cannot be told apart. It is taken on a computer at a Prometric test center, there is no paper version, and candidates have 3 hours. Questions can be marked for review and changed later in the exam.",
  },
  {
    q: "What score do you need to pass the CHL exam?",
    a: "HSPA does not publish a percentage. Pass or fail is decided by the number of scored questions answered correctly, against a passing point set by the Angoff procedure with the Beuk compromise and approved by the Certification Council. Result reports show each section as At or Above, Below or Well Below, and HSPA does not give percentage scores. The 70 percent line on these practice tests is a readiness target, not HSPA's standard.",
  },
  {
    q: "What is on the CHL exam?",
    a: "HSPA's content outline, revised August 2025 and updated January 2026, has four sections. Leading is the largest at 29 percent, covering staff support, mentoring and training, communication and leadership skills. Planning and decision making is 25 percent, covering quality control processes, equipment, workplace safety, workforce and financial planning. Organizing and governing and compliance are 23 percent each. Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real CHL exam questions?",
    a: "No. Every question is original, written by Tigertest from HSPA's published content outline and from public sources such as OSHA standards and AHRQ patient safety guidance. Tigertest is not affiliated with the Healthcare Sterile Processing Association.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "chl practice test, chl exam, hspa chl practice test, certified healthcare leader practice exam, sterile processing leadership certification, chl exam questions 2026, hspa leadership exam, sterile processing manager exam",
  alternates: {
    canonical: `${siteUrl}/chl-healthcare-leader-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/chl-healthcare-leader-practice-test`,
    images: [{ url: shareImageUrl("hspachl"), width: 1200, height: 630, alt: "Tigertest free CHL practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("hspachl")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CHL (HSPA) Practice Test",
      description,
      url: `${siteUrl}/chl-healthcare-leader-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("hspachl"),
      featureList: [
        "200 CHL (HSPA) practice questions",
        "4 practice tests of 50 questions weighted like the HSPA CHL content outline",
        "4 training sets by outline section",
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
        classFaqJsonLd("hspachl"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Leading", weight: "29%" },
  { name: "Planning and Decision Making", weight: "25%" },
  { name: "Organizing", weight: "23%" },
  { name: "Governing and Compliance", weight: "23%" },
];

export default function HspaChlLandingPage() {
  return (
    <div data-theme="hspachl" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CHL Healthcare Leader Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/chl/dashboard"
            shortName="CHL"
            subtitle="200 HSPA CHL questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/hspachl-mobile.png", desktop: "/landing/hspachl-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="hspachl" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Outline Section</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets follow the HSPA CHL outline: planning and decision making; organizing; leading; and governing and compliance. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the four sections of the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the HSPA CHL Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                HSPA publishes the weight of each of the four sections, and every practice test here keeps that balance, scaled to 50 questions: 15 on leading, 13 on planning and decision making, and 11 each on organizing and on governing and compliance. Sterile processing leadership course instructors can set Tigertest as CHL review at{" "}
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
                src={getTigerAsset("hspachl", 3)}
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
            How to Pass the CHL Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Lead people first</h3>
              <p>
                Leading is 29% of the exam. Know onboarding and precepting, competency assessment, engagement, conflict management, SBAR and other team communication tools, HIPAA basics and how to build buy-in for change.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice the numbers</h3>
              <p>
                Work FTEs, cost per tray, budget variance, payback, straight-line depreciation, ROI and par levels on paper until the setup is automatic, and know the difference between capital and operating budgets.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the quality and safety tools</h3>
              <p>
                Learn when to use FMEA and when to use root cause analysis, the PDSA cycle, Lean and Six Sigma ideas, near misses and sentinel events, MAUDE reporting and OSHA&apos;s PPE and bloodborne pathogens duties.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 70% or better on every practice test before your exam date. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CHL Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="hspachl" />
        </div>
      </div>

      <ExamSampleQuestions examId="hspachl" />

      <ExamRelatedTests examId="hspachl" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CHL Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every section of the HSPA CHL content outline.</p>
          <ExamLandingCTA dashboardHref="/chl/dashboard" />
        </div>
      </div>
    </div>
  );
}

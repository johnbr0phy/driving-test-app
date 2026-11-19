import "@/lib/banks/ctec";
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

const title = "CTEC Tax Preparer Practice Test 2026 - Free CRTP Course Exam Prep";
const metaDescription =
  "Free CTEC practice test for California tax preparers: 200 original questions for the 60-hour qualifying course final, on 2025 federal and California tax law, ethics and CTEC registration rules.";
const description =
  "Free practice for the final exam of the California Tax Education Council's 60-hour qualifying education course, the course a new preparer needs to register as a CTEC Registered Tax Preparer (CRTP): 200 original questions on CTEC's curriculum guidelines covering federal filing status and dependents, income, gains, Schedule C and rentals, deductions and credits on 2025 law, ethics and preparer rules, and California residency, Schedule CA adjustments and California credits. Four 50-question practice tests and five training sets.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "ctec practice test, ctec exam, ctec final exam, crtp exam, california tax preparer test, ctec 60 hour course, ctec qualifying education, california tax preparer practice test, ctec registered tax preparer, ctec practice test 2026",
  alternates: {
    canonical: `${siteUrl}/ctec-tax-preparer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ctec-tax-preparer-practice-test`,
    images: [{ url: shareImageUrl("ctec"), width: 1200, height: 630, alt: "Tigertest free CTEC tax preparer practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ctec")],
    title,
    description: metaDescription,
  },
};

const faqs = [
  {
    q: "What is the CTEC qualifying education exam?",
    a: "Anyone who prepares tax returns for a fee in California must register with the California Tax Education Council unless they are a California CPA, an enrolled agent or a State Bar attorney. A new preparer first completes a 60-hour qualifying education course from a CTEC approved provider: 45 hours of federal tax subjects, 2 of them ethics, and 15 hours of California tax law. The course ends with a final exam that the provider gives.",
  },
  {
    q: "How many questions are on the CTEC course final and what is the passing score?",
    a: "CTEC's provider standards require at least five multiple-choice exam questions for each course hour, at least 300 in all (215 federal, 10 ethics and 75 California), with the federal, ethics and California parts tested separately. A student must answer 70% or more correctly. Each provider writes its own exam, so the exact length varies. Each practice test here has 50 questions with a 70% target.",
  },
  {
    q: "What does the CTEC course cover?",
    a: "CTEC's qualifying education guidelines list the topics: ethics, preparer penalties and due diligence; filing requirements, filing status and dependents; wages, retirement income, interest and dividends; basis, home sales and capital gains; Schedule C, self-employment tax and rentals; adjustments, the standard deduction and itemized deductions, including the 2025 tips, overtime, car loan and senior deductions; credits; and California residency, filing rules, Schedule CA conformity differences and California credits.",
  },
  {
    q: "What else do I need to register as a CRTP?",
    a: "After the course, CTEC requires a Live Scan background check, a PTIN from the IRS and a $5,000 tax preparer surety bond. The course stays valid for 18 months after you finish it. Once registered, you renew by October 31 each year with 20 hours of continuing education: 10 federal tax law, 3 federal update, 2 ethics and 5 California.",
  },
  {
    q: "Are these the real CTEC exam questions?",
    a: "No. Every question is original, written by Tigertest from CTEC's published curriculum guidelines and from the 2025 IRS and Franchise Tax Board publications. It is practice, not a CTEC approved course, and it does not count toward the 60 hours or register you with CTEC.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CTEC Tax Preparer Practice Test",
      description,
      url: `${siteUrl}/ctec-tax-preparer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ctec"),
      featureList: [
        "200 CTEC practice questions on 2025 tax law",
        "4 practice tests of 50 questions",
        "5 training sets across federal, ethics and California topics",
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
        classFaqJsonLd("ctec"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Ethics, Filing Status & Dependents", weight: "20%" },
  { name: "Income, Exclusions & Gains", weight: "22%" },
  { name: "Business Income & Deductions", weight: "22%" },
  { name: "Credits & Payments", weight: "12%" },
  { name: "California Tax Law", weight: "24%" },
];

export default function CtecLandingPage() {
  return (
    <div data-theme="ctec" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CTEC Tax Preparer Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ctec-tax-preparer/dashboard"
            shortName="CTEC"
            subtitle="200 original questions for the final exam of the 60-hour CTEC qualifying course: federal filing, income, deductions and credits on 2025 law, ethics and preparer rules, and California residency, adjustments and credits. Four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/ctec-mobile.png", desktop: "/landing/ctec-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ctec" />

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
                Five training sets: ethics and filing, income and gains, business income and deductions, credits, and California tax law. Missed questions come back until you master them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">50-Question Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four practice tests mixing federal, ethics and California questions in the proportions of the 60-hour course, with the 70% target CTEC sets for course finals. No question appears in more than one test, and every answer is explained.
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
                Built on the CTEC Curriculum
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each practice test follows CTEC&apos;s qualifying education guidelines and the course&apos;s 43 federal, 2 ethics and 15 California hours: about two thirds federal law, a quarter California and the rest ethics and preparer rules. Tax course instructors can set Tigertest as practice at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which areas the class misses most.
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
                src={getTigerAsset("ctec", 3)}
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
            How to Pass the CTEC Course Final
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Learn the 2025 numbers that changed</h3>
              <p>
                The 2025 law raised the standard deduction and child tax credit and added deductions for tips, overtime, car loan interest and seniors, with a higher SALT cap. Know which figure belongs to 2025 and which starts in 2026.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Study California as differences from federal</h3>
              <p>
                California starts from federal AGI and adjusts on Schedule CA. Learn what it excludes (unemployment, Social Security, California lottery), what it adds back (out-of-state bond interest, HSA contributions) and where it did not follow federal law.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know the preparer rules</h3>
              <p>
                Due diligence for refundable credits and head of household, the PTIN and signature rules, Circular 230, and CTEC&apos;s own rules on the bond, renewal and continuing education come up on every final.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by topic. Aim for 70 percent or better on every part, federal, ethics and California, then retrain your weakest set before your course final.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CTEC Tax Preparer Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ctec" />
        </div>
      </div>

      <ExamSampleQuestions examId="ctec" />

      <ExamRelatedTests examId="ctec" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready for Your CTEC Course Final?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across the federal, ethics and California parts of the CTEC course.</p>
          <ExamLandingCTA dashboardHref="/ctec-tax-preparer/dashboard" />
        </div>
      </div>
    </div>
  );
}

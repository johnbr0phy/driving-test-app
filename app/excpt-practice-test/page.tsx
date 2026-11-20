import "@/lib/banks/excpt";
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

const title = "Free ExCPT Practice Test 2026 - NHA Pharmacy Technician Questions";
const metaDescription =
  "Free-to-start ExCPT (NHA CPhT) practice test: 200 original questions on the 2023 ExCPT test plan, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the National Healthcareer Association Exam for the Certification of Pharmacy Technicians (ExCPT), which leads to the CPhT credential: 200 original questions written from NHA's published test plan. Four 50-question practice tests weighted like the real exam's domains, and five training sets covering the technician's role and pharmacy law, controlled substances and drug therapy, prescription intake and dispensing, calculations and compounding, and medication safety.";

const faqs = [
  {
    q: "What is the ExCPT exam?",
    a: "The ExCPT (Exam for the Certification of Pharmacy Technicians) is the National Healthcareer Association (NHA) exam for the Certified Pharmacy Technician (CPhT) credential. It covers the technician's role, federal pharmacy law and controlled substances, drug classes and top drugs, the dispensing process with calculations and compounding, and medication safety. You can sit for it with a high school diploma or GED (or one earned within 12 months) plus a pharmacy technician training program within the last five years, or one year (1,200 hours) of supervised pharmacy work within the last three years.",
  },
  {
    q: "How many questions are on the ExCPT exam?",
    a: "NHA's test plan lists 100 scored questions and 20 unscored pretest questions, with 2 hours and 10 minutes to finish. You cannot tell which questions are pretest items. The exam is taken at a PSI testing center or by live remote proctoring, and results are posted online within two days.",
  },
  {
    q: "What score do you need to pass the ExCPT?",
    a: "NHA reports a scaled score from 200 to 500, and 390 or higher passes. The scale weights questions by difficulty, so 390 is not a fixed percentage, and the 70 percent line on these practice tests is a readiness target. In 2024, NHA reports that 62% of ExCPT exams were passed.",
  },
  {
    q: "What is on the ExCPT, and did it change?",
    a: "NHA launched a new ExCPT exam on July 9, 2025, built on a 2023 job analysis. Of the 100 scored questions, 15 cover the technician's role, 15 pharmacy law (9 federal requirements and 6 controlled substances), 13 drugs and drug therapy, 43 the dispensing process (13 prescription intake, 13 dispensing, 7 calculations and 10 compounding and repackaging) and 14 medication safety and quality assurance. These practice tests follow that plan.",
  },
  {
    q: "Is the ExCPT the same as the PTCB exam?",
    a: "No. Both lead to a CPhT credential, but the ExCPT is NHA's exam and the PTCE is run by the Pharmacy Technician Certification Board. Each state sets its own rules for technician registration and which certifications it accepts, so check your state board of pharmacy. Tigertest has a separate PTCB practice test.",
  },
  {
    q: "Are these the real ExCPT exam questions?",
    a: "No. Every question is original, written by Tigertest from NHA's published test plan and federal sources such as FDA guidance, DEA regulations and OSHA rules, so it covers the same knowledge without copying the exam. Questions on law follow federal rules only. Tigertest is not affiliated with the National Healthcareer Association.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "excpt practice test, nha excpt practice test, excpt exam questions, nha pharmacy technician practice test, cpht nha practice test, pharmacy technician practice test, excpt 2026",
  alternates: {
    canonical: `${siteUrl}/excpt-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/excpt-practice-test`,
    images: [{ url: shareImageUrl("excpt"), width: 1200, height: 630, alt: "Tigertest free ExCPT practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("excpt")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ExCPT (NHA) Practice Test",
      description,
      url: `${siteUrl}/excpt-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("excpt"),
      featureList: [
        "200 ExCPT (NHA) practice questions",
        "4 practice tests of 50 questions weighted like the NHA ExCPT test plan",
        "5 training sets by test plan domain",
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
        classFaqJsonLd("excpt"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Pharmacy Technician Role and Practice", weight: "15 items" },
  { name: "Federal Requirements", weight: "9 items" },
  { name: "Controlled Substances", weight: "6 items" },
  { name: "Drug Classification and Top Drugs", weight: "13 items" },
  { name: "Prescription Intake and Entry", weight: "13 items" },
  { name: "Preparing and Dispensing", weight: "13 items" },
  { name: "Calculations", weight: "7 items" },
  { name: "Compounding, Unit Dose and Repackaging", weight: "10 items" },
  { name: "Medication Safety and Quality Assurance", weight: "14 items" },
];

export default function ExcptLandingPage() {
  return (
    <div data-theme="excpt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ExCPT (NHA) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/excpt/dashboard"
            shortName="ExCPT"
            subtitle="200 NHA ExCPT questions and four 50-question practice tests. Free to start, no account needed."
            shots={{ mobile: "/landing/excpt-mobile.png", desktop: "/landing/excpt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="excpt" />

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
                Five training sets cover every domain of the NHA test plan: the technician role and pharmacy law; controlled substances and drug therapy; prescription intake and dispensing; calculations and compounding; and medication safety. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 100 scored questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the NHA ExCPT Test Plan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NHA publishes how many of the 100 scored questions come from each domain, and every practice test here keeps the 2023 plan&apos;s balance, scaled to 50 questions. The dispensing process is the largest domain, at 43 of 100. Pharmacy technician program instructors can set Tigertest as ExCPT review at{" "}
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
                src={getTigerAsset("excpt", 3)}
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
            How to Pass the ExCPT Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the dispensing process</h3>
              <p>
                The dispensing process is 43 of the 100 scored questions. Know prescription parts and sig codes, DAW codes and claims, NDC segments, labels and auxiliary labels, Medication Guides, and the steps for non-sterile and sterile compounding.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn federal law and the controlled substance rules</h3>
              <p>
                Law is 15 items. Learn the major federal acts, HIPAA, the Poison Prevention Packaging Act, DEA Forms 222 and 106, refill and partial fill limits, recordkeeping and the schedules. State rules vary, so the exam asks about federal law.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Know drug classes, top drugs and the math</h3>
              <p>
                Drugs and drug therapy is 13 items and calculations 7. Learn stems such as -olol, -pril and -sartan, common brand and generic pairs, conversions, days supply, dilutions, alligation and IV flow rates.
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
          ExCPT Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="excpt" />
        </div>
      </div>

      <ExamSampleQuestions examId="excpt" />

      <ExamRelatedTests examId="excpt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the ExCPT Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every domain of the NHA ExCPT test plan.</p>
          <ExamLandingCTA dashboardHref="/excpt/dashboard" />
        </div>
      </div>
    </div>
  );
}

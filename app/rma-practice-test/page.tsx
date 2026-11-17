import "@/lib/banks/rma";
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

const title = "RMA Practice Test 2026 - Free AMT Registered Medical Assistant Questions";
const metaDescription =
  "Free-to-start RMA (AMT) practice test: 200 original questions on the AMT exam specifications, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the American Medical Technologists Registered Medical Assistant (RMA) certification exam: 200 original questions written from AMT's published competencies and examination specifications. Four 50-question practice tests weighted like the real exam's general, administrative and clinical work areas, and five training sets covering body systems and terminology, law, ethics and office administration, infection control, lab and minor surgery, vital signs and physical exams, and pharmacology and first aid.";

const faqs = [
  {
    q: "What is the RMA (AMT) exam?",
    a: "It is the certification exam for the Registered Medical Assistant credential from American Medical Technologists (AMT), a national certifying body for allied health professionals. Passing it earns the RMA (AMT) credential. Many candidates take it at the end of a medical assisting program, and schools often schedule the exam for their students.",
  },
  {
    q: "How many questions are on the RMA exam?",
    a: "AMT's examination specifications list 210 questions: 65 in General Medical Assisting, 30 in Administrative Medical Assisting and 115 in Clinical Medical Assisting. AMT's candidate handbook gives the medical assistant exam 2 hours. Questions are four-option multiple choice with a single best answer, taken on a computer, and some may be unscored pretest items.",
  },
  {
    q: "What score do you need to pass the RMA exam?",
    a: "AMT reports a scaled score from 0 to 100, and the minimum passing score is 70. AMT notes that 70 is not a percentage of questions answered correctly, so the 70 percent line on these practice tests is a readiness target, not the official standard. A candidate who fails retakes the whole exam and may test up to four times in all.",
  },
  {
    q: "What is on the RMA exam?",
    a: "Clinical medical assisting is the largest work area at 55 percent: infection control, instruments, laboratory procedures, minor surgery, vital signs, physical exams, pharmacology, therapeutic modalities and first aid. General medical assisting is 31 percent (body systems, medical terminology, law and ethics, human relations), and administrative medical assisting is 14 percent (insurance and coding, scheduling, communication, health records and office safety). Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real RMA exam questions?",
    a: "No. Every question is original, written by Tigertest from AMT's published competencies and examination specifications, so it covers the same knowledge without copying the exam. Pictures such as instruments are described in words, so image-based items are not modelled. Tigertest is not affiliated with American Medical Technologists.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "rma practice test, rma exam, amt rma practice test, registered medical assistant practice exam, amt medical assistant exam questions, rma certification 2026, american medical technologists rma, medical assistant certification practice test",
  alternates: {
    canonical: `${siteUrl}/rma-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/rma-practice-test`,
    images: [{ url: shareImageUrl("rma"), width: 1200, height: 630, alt: "Tigertest free RMA practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("rma")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free RMA (AMT) Practice Test",
      description,
      url: `${siteUrl}/rma-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("rma"),
      featureList: [
        "200 RMA (AMT) practice questions",
        "4 practice tests of 50 questions weighted like the AMT exam specifications",
        "5 training sets by work area",
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
        classFaqJsonLd("rma"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Clinical Medical Assisting", weight: "55%" },
  { name: "General Medical Assisting", weight: "31%" },
  { name: "Administrative Medical Assisting", weight: "14%" },
];

export default function RmaLandingPage() {
  return (
    <div data-theme="rma" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free RMA (AMT) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/rma/dashboard"
            shortName="RMA"
            subtitle="200 original questions on the AMT RMA exam specifications: body systems, terminology, law, insurance, lab work, vital signs, exams and pharmacology. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/rma-mobile.png", desktop: "/landing/rma-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="rma" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Work Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the AMT specifications: body systems and terminology; law, ethics and office administration; infection control, lab and surgery; vital signs and physical exams; and pharmacology and first aid. Questions you miss come back until you have mastered them.
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
                Four practice tests of 50 questions, each weighted like the 210 questions on the real exam. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the AMT Examination Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                AMT publishes how many of the 210 questions come from each work area, and every practice test here keeps that balance, scaled to 50 questions: 28 clinical, 15 general and 7 administrative. Clinical medical assisting is more than half the exam. Medical assisting program instructors can set Tigertest as RMA review at{" "}
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
                src={getTigerAsset("rma", 3)}
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
            How to Pass the RMA Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put clinical skills first</h3>
              <p>
                Clinical medical assisting is 55% of the exam. Know normal vital signs, exam positions, sterile technique, CLIA-waived testing, specimen handling, injections and the basics of OSHA&apos;s bloodborne pathogens rules.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the language of medicine</h3>
              <p>
                General medical assisting is almost a third of the exam. Build medical terms from their roots, prefixes and suffixes, learn the common abbreviations and spellings, and review each body system and its common diseases.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip law and the front office</h3>
              <p>
                Learn HIPAA, consent and advance directives, the drug schedules, ICD-10-CM, CPT and HCPCS, insurance terms, scheduling styles and how records are filed and released. Practice the dosage math on paper until the setup is automatic.
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
          RMA Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="rma" />
        </div>
      </div>

      <ExamSampleQuestions examId="rma" />

      <ExamRelatedTests examId="rma" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the RMA Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every work area of the AMT RMA specifications.</p>
          <ExamLandingCTA dashboardHref="/rma/dashboard" />
        </div>
      </div>
    </div>
  );
}

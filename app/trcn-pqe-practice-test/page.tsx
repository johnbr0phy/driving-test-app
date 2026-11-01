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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "TRCN PQE Practice Test 2026 - Free Mock Exams";
const metaDescription =
  "Free TRCN PQE practice: 200 original questions on pedagogy, literacy, numeracy, ICT and safeguarding, three full-length 60-question mock exams, every answer explained.";
const description =
  "Free practice for the Teachers Registration Council of Nigeria (TRCN) Professional Qualifying Examination (PQE): 200 original questions written from the TRCN PQE curriculum guide. Three full-length 60-question mock exams with 12 questions from each of the five core areas, and five training sets covering pedagogy, literacy, numeracy, ICT and safeguarding.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "trcn pqe, trcn pqe practice test, trcn exam questions, trcn professional qualifying examination, pqe past questions, trcn mock exam, trcn cbt, teachers registration council of nigeria exam, pqe pedagogy literacy numeracy ict safeguarding",
  alternates: {
    canonical: `${siteUrl}/trcn-pqe-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/trcn-pqe-practice-test`,
    images: [{ url: shareImageUrl("trcnpqe"), width: 1200, height: 630, alt: "Tigertest free TRCN PQE practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("trcnpqe")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free TRCN PQE Practice Test",
      description,
      url: `${siteUrl}/trcn-pqe-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
      featureList: [
        "200 TRCN PQE practice questions",
        "3 full-length mock exams of 60 questions, 12 from each core area",
        "5 training sets: pedagogy, literacy, numeracy, ICT and safeguarding",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the TRCN PQE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Professional Qualifying Examination (PQE) is the computer-based examination candidates take as part of registration with the Teachers Registration Council of Nigeria (TRCN), the body set up by the TRCN Act of 1993 to register and regulate teachers. You need at least an NCE, PGDE or PDE in Education to sit it, and candidates sit under one of four categories by qualification: A for a PhD, B for a master's degree, C for a bachelor's degree or PGDE, and D for the NCE.",
          },
        },
        {
          "@type": "Question",
          name: "How many questions are on the PQE and how long is it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TRCN's PQE curriculum guide lists 60 questions in 60 minutes on a computer, with diets in May and November held in batches. Candidates receive their date and venue by SMS and email at least two weeks before. Some prep sites describe a longer format, so go by what TRCN publishes. Each mock exam here is 60 questions, the same length as the real exam.",
          },
        },
        {
          "@type": "Question",
          name: "What is the pass mark for the PQE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TRCN does not publish a pass mark on its PQE pages. Guides report 50%. Tigertest uses 60%, 36 of 60, as its own readiness target, so that passing a mock exam here leaves you a margin on the day.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does the PQE cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The streamlined PQE syllabus has five core areas worth 20% each. Pedagogy covers learning theories, education policy, lesson planning, teaching methods, classroom management and differentiation. Literacy covers reading, grammar, vocabulary, writing and professional communication. Numeracy covers arithmetic, geometry, data, algebra and how to teach maths. ICT covers digital skills, mobile and blended learning and digital citizenship. Safeguarding covers child protection, reporting, safe schools and the TRCN Code of Conduct.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real PQE questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the TRCN PQE curriculum guide, so it practises the same knowledge without copying any past exam. Tigertest is not affiliated with TRCN; check trcn.gov.ng for registration, exam dates and any changes to the syllabus.",
          },
        },
        classFaqJsonLd("trcnpqe"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Pedagogy", weight: "20%" },
  { name: "Literacy", weight: "20%" },
  { name: "Numeracy", weight: "20%" },
  { name: "ICT", weight: "20%" },
  { name: "Safeguarding", weight: "20%" },
];

export default function TrcnPqeLandingPage() {
  return (
    <div data-theme="trcnpqe" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free TRCN PQE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/trcn-pqe/dashboard"
            shortName="TRCN PQE"
            subtitle="200 original questions on the five PQE areas: pedagogy, literacy, numeracy, ICT and safeguarding. Three full-length 60-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/trcnpqe-mobile.png", desktop: "/landing/trcnpqe-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="trcnpqe" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets, one for each core area of the TRCN curriculum guide. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Full-Length Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Three mock exams of 60 questions, 12 from each area, the same length as the real PQE. Aim for 60% or better. No question appears in more than one test.
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
                Built on the TRCN Curriculum Guide
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                TRCN&apos;s PQE curriculum guide gives each of its five core areas an equal weight. Every mock exam here takes 12 questions from each area, so your score shows where you stand in all five. Colleges of education and teacher trainers can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("trcnpqe", 1)}
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
            How to Pass the TRCN PQE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Give every area equal time</h3>
              <p>
                Each of the five areas is 20% of the exam. Many teachers know pedagogy well but lose marks in numeracy or ICT, so practise the area you teach least.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Keep a steady pace</h3>
              <p>
                Sixty questions in sixty minutes is one minute each. Answer what you know, move on from a hard sum and come back to it before time runs out.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Think like a safeguarding lead</h3>
              <p>
                Safeguarding questions reward the answer that keeps the child safe and follows procedure: listen, never promise secrecy, record the child&apos;s own words and report to the right person.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by area. Aim for 60% or better on every mock exam. After each test, drill the questions you missed and retrain the weakest area.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          TRCN PQE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the TRCN PQE?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Professional Qualifying Examination (PQE) is the computer-based examination candidates take as part of registration with the Teachers Registration Council of Nigeria (TRCN), the body set up by the TRCN Act of 1993 to register and regulate teachers. You need at least an NCE, PGDE or PDE in Education to sit it, and candidates sit under one of four categories by qualification: A for a PhD, B for a master&apos;s degree, C for a bachelor&apos;s degree or PGDE, and D for the NCE.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many questions are on the PQE and how long is it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              TRCN&apos;s PQE curriculum guide lists 60 questions in 60 minutes on a computer, with diets in May and November held in batches. Candidates receive their date and venue by SMS and email at least two weeks before. Some prep sites describe a longer format, so go by what TRCN publishes. Each mock exam here is 60 questions, the same length as the real exam.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the pass mark for the PQE?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              TRCN does not publish a pass mark on its PQE pages. Guides report 50%. Tigertest uses 60%, 36 of 60, as its own readiness target, so that passing a mock exam here leaves you a margin on the day.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What topics does the PQE cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The streamlined PQE syllabus has five core areas worth 20% each. Pedagogy covers learning theories, education policy, lesson planning, teaching methods, classroom management and differentiation. Literacy covers reading, grammar, vocabulary, writing and professional communication. Numeracy covers arithmetic, geometry, data, algebra and how to teach maths. ICT covers digital skills, mobile and blended learning and digital citizenship. Safeguarding covers child protection, reporting, safe schools and the TRCN Code of Conduct.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real PQE questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the TRCN PQE curriculum guide, so it practises the same knowledge without copying any past exam. Tigertest is not affiliated with TRCN; check trcn.gov.ng for registration, exam dates and any changes to the syllabus.
            </p>
          </div>
          <ExamClassFaq examId="trcnpqe" />
        </div>
      </div>

      <ExamRelatedTests examId="trcnpqe" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the TRCN PQE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across all five PQE areas.</p>
          <ExamLandingCTA dashboardHref="/trcn-pqe/dashboard" />
        </div>
      </div>
    </div>
  );
}

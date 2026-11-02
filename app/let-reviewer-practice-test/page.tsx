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

const siteUrl = SITE_URL;

const title = "LET Reviewer 2026 - Free LET Practice Test (Elementary)";
const metaDescription =
  "Free LET reviewer: 200 original General Education and Professional Education questions on the PRC table of specifications, four 50-question mock exams, every answer explained.";
const description =
  "Free practice for the Philippine Licensure Examination for Professional Teachers (LET, officially LEPT), Elementary level: 200 original questions written from the PRC enhanced table of specifications. Four 50-question mock exams weighted like the real rating, 40% General Education and 60% Professional Education, and five training sets covering communication, science and math, Philippine history and Rizal, ethics, the contemporary world, art, the self, the teaching profession, curriculum and methods, learners, assessment and field study.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "let reviewer, let reviewer 2026, let practice test, lept reviewer, licensure examination for teachers reviewer, let elementary reviewer, general education reviewer, professional education reviewer, let mock exam, prc let exam questions",
  alternates: {
    canonical: `${siteUrl}/let-reviewer-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/let-reviewer-practice-test`,
    images: [{ url: shareImageUrl("phlet"), width: 1200, height: 630, alt: "Tigertest free LET reviewer" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("phlet")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free LET Reviewer",
      description,
      url: `${siteUrl}/let-reviewer-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
      featureList: [
        "200 LET practice questions",
        "4 mock exams of 50 questions weighted 40% General Education, 60% Professional Education",
        "5 training sets by area of the PRC table of specifications",
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
          name: "What is the LET?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Licensure Examination for Teachers, officially the Licensure Examination for Professional Teachers (LEPT), is the exam the Professional Regulation Commission (PRC) and the Board for Professional Teachers give to anyone who wants a license to teach in the Philippines. Under RA 7836, the elementary exam has two parts, General Education and Professional Education; the secondary exam adds a field of specialization.",
          },
        },
        {
          "@type": "Question",
          name: "How many items are on the Elementary LET and how long is it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under the PRC table of specifications, General Education has 150 items and Professional Education has 150 items. General Education runs from 8:00 to 10:00 a.m. and Professional Education from 11:00 a.m. to 2:00 p.m. on the same Sunday. For an elementary examinee without a specialization, General Education counts for 40% of the rating and Professional Education for 60%. Guides report that elementary examinees with a specialization (early childhood or special needs education) take a third part and are rated 20% General Education, 40% Professional Education and 40% specialization.",
          },
        },
        {
          "@type": "Question",
          name: "What is the passing score for the LET?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You need a general average of at least 75%, with no rating below 50% in any part, a rule set by the Board for Professional Teachers since 1996. An examinee who fails but rates within five percentage points of the passing average may serve as a para-teacher on a special two-year permit. Each 50-question mock exam here uses 75% as its pass line.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does the LET cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "General Education covers English and Filipino communication, science and technology, mathematics, Philippine history, the life and works of Rizal, ethics, the contemporary world, art appreciation and understanding the self. Professional Education covers the teaching profession, curriculum, methods and educational technology, child and adolescent learners, assessment of learning, and field study, internship and action research. This reviewer covers the elementary exam only; the secondary major subjects are not included.",
          },
        },
        {
          "@type": "Question",
          name: "Are these the real LET questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every question is original, written by Tigertest from the PRC's published table of specifications, so it practices the same competencies without copying any past exam. Tigertest is not affiliated with the PRC or the Board for Professional Teachers; check prc.gov.ph for exam dates, requirements and any changes to the coverage.",
          },
        },
        classFaqJsonLd("phlet"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "GenEd: Intellectual Competencies", weight: "16%" },
  { name: "GenEd: Personal & Civic Responsibilities", weight: "12%" },
  { name: "GenEd: Practical Skills Development", weight: "12%" },
  { name: "ProfEd: Teaching Profession", weight: "9%" },
  { name: "ProfEd: Curriculum, Methods & Ed Tech", weight: "18%" },
  { name: "ProfEd: Child & Adolescent Learners", weight: "12%" },
  { name: "ProfEd: Assessment of Learning", weight: "9%" },
  { name: "ProfEd: Field Study & Internship", weight: "12%" },
];

export default function LetReviewerLandingPage() {
  return (
    <div data-theme="phlet" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free LET Reviewer 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/let-reviewer/dashboard"
            shortName="LET"
            subtitle="200 original General Education and Professional Education questions on the PRC table of specifications for the Elementary LET. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/phlet-mobile.png", desktop: "/landing/phlet-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="phlet" />

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
                Five training sets follow the table of specifications: two for General Education and three for Professional Education. Questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Weighted Mock Exams</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four mock exams of 50 questions: 20 General Education and 30 Professional Education, the same 40/60 split as the real elementary rating. Aim for 75% or better. No question appears in more than one test.
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
                Built on the PRC Table of Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The PRC splits each part of the LET into areas with fixed weights. Below is each area&apos;s share of the overall elementary rating, combining those weights with the 40% General Education and 60% Professional Education split, and every mock exam here keeps close to it. These weights come from the PRC&apos;s 2022 enhanced table of specifications. The Board amended that table in 2025 (Board Resolution No. 11, s. 2025); guides report the same Professional Education areas, but check prc.gov.ph for the current version. Review centers and teacher education instructors can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("phlet", 1)}
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
            How to Pass the LET
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Put Professional Education first</h3>
              <p>
                For elementary examinees Professional Education is 60% of the rating. Curriculum, methods and educational technology is its biggest area, followed by learners and by field study. Know your learning theorists, curriculum models and test construction rules well.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Do not neglect General Education</h3>
              <p>
                A rating below 50% in any part fails the whole exam, even with a 75% average. Keep up English and Filipino grammar, basic math and science, Philippine history and Rizal, ethics, art and the self.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Read situational items as a teacher</h3>
              <p>
                Many Professional Education items describe a classroom. The best answer usually puts the learner first, follows the Code of Ethics for Professional Teachers and is something a teacher can do now.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by area. Aim for 75% or better on every mock exam. After each test, drill the questions you missed and retrain the weakest area.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          LET Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the LET?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The Licensure Examination for Teachers, officially the Licensure Examination for Professional Teachers (LEPT), is the exam the Professional Regulation Commission (PRC) and the Board for Professional Teachers give to anyone who wants a license to teach in the Philippines. Under RA 7836, the elementary exam has two parts, General Education and Professional Education; the secondary exam adds a field of specialization.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">How many items are on the Elementary LET and how long is it?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Under the PRC table of specifications, General Education has 150 items and Professional Education has 150 items. General Education runs from 8:00 to 10:00 a.m. and Professional Education from 11:00 a.m. to 2:00 p.m. on the same Sunday. For an elementary examinee without a specialization, General Education counts for 40% of the rating and Professional Education for 60%. Guides report that elementary examinees with a specialization (early childhood or special needs education) take a third part and are rated 20% General Education, 40% Professional Education and 40% specialization.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What is the passing score for the LET?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You need a general average of at least 75%, with no rating below 50% in any part, a rule set by the Board for Professional Teachers since 1996. An examinee who fails but rates within five percentage points of the passing average may serve as a para-teacher on a special two-year permit. Each 50-question mock exam here uses 75% as its pass line.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">What topics does the LET cover?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              General Education covers English and Filipino communication, science and technology, mathematics, Philippine history, the life and works of Rizal, ethics, the contemporary world, art appreciation and understanding the self. Professional Education covers the teaching profession, curriculum, methods and educational technology, child and adolescent learners, assessment of learning, and field study, internship and action research. This reviewer covers the elementary exam only; the secondary major subjects are not included.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">Are these the real LET questions?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. Every question is original, written by Tigertest from the PRC&apos;s published table of specifications, so it practices the same competencies without copying any past exam. Tigertest is not affiliated with the PRC or the Board for Professional Teachers; check prc.gov.ph for exam dates, requirements and any changes to the coverage.
            </p>
          </div>
          <ExamClassFaq examId="phlet" />
        </div>
      </div>

      <ExamRelatedTests examId="phlet" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the LET?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every area of the Elementary LET.</p>
          <ExamLandingCTA dashboardHref="/let-reviewer/dashboard" />
        </div>
      </div>
    </div>
  );
}

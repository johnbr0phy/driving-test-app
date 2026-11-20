import "@/lib/banks/pance";
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

const title = "Free PANCE Practice Test 2026 - Physician Assistant Board Questions";
const metaDescription =
  "Free PANCE practice test: 200 original clinical questions on the NCCPA 2025 content blueprint, four 50-question mock exams and five organ system sets, every answer explained.";
const description =
  "Practice for the NCCPA Physician Assistant National Certifying Exam (PANCE): 200 original clinical vignette questions written from the PANCE content blueprint effective January 2025. Four 50-question mock exams weighted like the blueprint at the real pace of a minute a question, and five training sets covering cardiovascular and pulmonary medicine; GI, renal, genitourinary and endocrine; neurology, psychiatry and EENT; musculoskeletal, skin and reproductive health; and infectious disease, hematology and professional practice. Start for free.";

const faqs = [
  {
    q: "What is the PANCE?",
    a: "The Physician Assistant National Certifying Exam is the National Commission on Certification of Physician Assistants' (NCCPA) exam for graduates of accredited PA programs. Passing it earns the PA-C credential that states use for licensure. You can apply no sooner than 180 days before your expected graduation, and the exam window is 180 days, starting 7 days after you graduate.",
  },
  {
    q: "How many questions are on the PANCE and how long is it?",
    a: "The PANCE has 300 multiple-choice questions in five blocks of 60. Each block has 60 minutes, and you get 45 minutes of break time for the whole day plus a 15-minute tutorial, about 5 hours in all. It is taken by computer at a Pearson VUE test center. Once you leave a block, or its time runs out, you cannot go back to its questions.",
  },
  {
    q: "What score do you need to pass the PANCE?",
    a: "NCCPA reports PANCE scores on a scale of 200 to 800, and the passing standard is 350. The standard is set by the modified Angoff method, and because scores are scaled, the number of correct answers needed can vary slightly from one form to another. Wrong answers are not penalized, so answer every question. The 70 percent line on these practice tests is a readiness target, not NCCPA's standard.",
  },
  {
    q: "What is on the PANCE content blueprint?",
    a: "The blueprint effective January 2025 lists 14 organ systems and professional practice: cardiovascular 11 percent, pulmonary 9, gastrointestinal and nutrition 8, musculoskeletal 8, infectious diseases 7, neurologic 7, psychiatry and behavioral science 7, reproductive 7, endocrine 6, eyes, ears, nose and throat 6, professional practice 6, hematologic 5, renal 5, dermatologic 4 and genitourinary 4. It also weights tasks such as diagnosis (18 percent), clinical intervention and history and physical (16 each) and pharmaceutical therapeutics (15), with 12 to 15 percent of questions on pediatric patients and up to 8 to 10 percent on general surgery.",
  },
  {
    q: "Are these the real PANCE questions?",
    a: "No. Every question is original, written by Tigertest from the NCCPA blueprint and from current US guidance such as USPSTF recommendations and the CDC's STI treatment guidelines, with generic drug names. Each mock exam is a fixed 50-question form weighted like the blueprint, shorter than the real 300, at the same pace of a minute a question. Tigertest is not affiliated with NCCPA.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "pance practice test, pance practice questions, pance exam, physician assistant practice test, pa board exam questions, nccpa pance blueprint 2025, free pance questions, pance review questions",
  alternates: {
    canonical: `${siteUrl}/pance-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/pance-practice-test`,
    images: [{ url: shareImageUrl("pance"), width: 1200, height: 630, alt: "Tigertest PANCE practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pance")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - PANCE Practice Test",
      description,
      url: `${siteUrl}/pance-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("pance"),
      featureList: [
        "200 PANCE practice questions",
        "4 mock exams of 50 questions weighted like the NCCPA PANCE content blueprint",
        "5 training sets by organ system",
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
        classFaqJsonLd("pance"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Cardiovascular", weight: "11%" },
  { name: "Pulmonary", weight: "9%" },
  { name: "Gastrointestinal/Nutrition", weight: "8%" },
  { name: "Musculoskeletal", weight: "8%" },
  { name: "Infectious Diseases", weight: "7%" },
  { name: "Neurologic", weight: "7%" },
  { name: "Psychiatry/Behavioral Science", weight: "7%" },
  { name: "Reproductive", weight: "7%" },
  { name: "Endocrine", weight: "6%" },
  { name: "Eyes, Ears, Nose and Throat", weight: "6%" },
  { name: "Professional Practice", weight: "6%" },
  { name: "Hematologic", weight: "5%" },
  { name: "Renal", weight: "5%" },
  { name: "Dermatologic", weight: "4%" },
  { name: "Genitourinary", weight: "4%" },
];

export default function PanceLandingPage() {
  return (
    <div data-theme="pance" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free PANCE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/pance/dashboard"
            shortName="PANCE"
            subtitle="200 questions on the PANCE blueprint and four 50-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/pance-mobile.png", desktop: "/landing/pance-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pance" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Organ System</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets group the 15 blueprint categories: cardiovascular and pulmonary; GI, renal, genitourinary and endocrine; neurology, psychiatry and EENT; musculoskeletal, skin and reproductive; and infectious disease, hematology and professional practice. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted like the PANCE blueprint and timed at the real pace of a minute a question. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the PANCE Content Blueprint
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                NCCPA publishes the share of the exam that comes from each organ system, and every mock exam here keeps that balance, scaled to 50 questions: 6 cardiovascular, 5 pulmonary, 4 each of GI, musculoskeletal, infectious disease and psychiatry, 3 each of endocrine, neurologic, EENT, reproductive and professional practice, and 2 each of renal, genitourinary, dermatologic and hematologic. About one question in seven is about a child, and some are surgical, as the blueprint asks. The real exam has 300 questions in five 60-minute blocks; these forms keep the same mix and pace at a shorter length. PA program faculty running board review can set Tigertest as class practice at{" "}
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
                src={getTigerAsset("pance", 3)}
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
            How to Pass the PANCE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Study by organ system, weighted like the blueprint</h3>
              <p>
                Cardiovascular (11%) and pulmonary (9%) together are a fifth of the exam, and GI and musculoskeletal add another 16%. Smaller systems such as renal, genitourinary and dermatology are 4 to 5% each. Spend your time in roughly those proportions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice the whole patient encounter</h3>
              <p>
                The blueprint also weights tasks: the most likely diagnosis (18%), history and physical (16%), clinical intervention (16%), drug therapy (15%), health maintenance (11%) and diagnostic studies (10%). For every condition, know how it presents, the first test, the first-line treatment and the screening rule.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn current US guidance and generic names</h3>
              <p>
                Screening ages from the USPSTF, CDC STI regimens such as ceftriaxone 500 mg for gonorrhea, and first-line drugs for common conditions come up again and again. Learn drugs by their generic names, as the exam uses them.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Do not skip professional practice</h3>
              <p>
                Six percent of the exam is professional practice: informed consent, capacity, HIPAA, mandatory reporting, error disclosure, study design, sensitivity and number needed to treat. These are quick points once you know the rules, and children make up 12 to 15 percent of all questions, so don&apos;t neglect pediatrics either.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          PANCE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="pance" />
        </div>
      </div>

      <ExamSampleQuestions examId="pance" />

      <ExamRelatedTests examId="pance" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the PANCE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every organ system on the PANCE blueprint.</p>
          <ExamLandingCTA dashboardHref="/pance/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/inbde";
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

const title = "Free INBDE Practice Test 2026 - Dental Board Questions";
const metaDescription =
  "Free INBDE practice test: 200 original dental board questions on the JCNDE Domain of Dentistry, including written patient cases, four 50-question mock exams and four training sets, every answer explained.";
const description =
  "Free practice for the Integrated National Board Dental Examination (INBDE): 200 original questions written from the JCNDE Candidate Guide and its Domain of Dentistry. Four 50-question mock exams weighted to the ten Foundation Knowledge areas, with written patient cases, and four training sets covering anatomy and development, physics and materials, genetic conditions, immunology, pathology, microbiology, pharmacology, ethics and research.";

const faqs = [
  {
    q: "What is the INBDE?",
    a: "The Integrated National Board Dental Examination is the written board exam of the Joint Commission on National Dental Examinations (JCNDE). It replaced NBDE Part I and Part II and tests the biomedical, clinical and behavioral knowledge needed for safe, entry-level general practice. US dental licensing jurisdictions use it as part of licensure, alongside a clinical exam and any state requirements.",
  },
  {
    q: "How many questions are on the INBDE and how is it scored?",
    a: "The INBDE has 500 multiple-choice questions over two days at a Prometric test center. Day one has three sections of 100 standalone questions and one of 60 case questions; day two has two sections of 70 case questions. Each section is 105 minutes, and the whole administration is 12 hours 30 minutes with the tutorial, breaks and survey. Results are reported as pass or fail. Scale scores run from 49 to 99 and 75 is the minimum passing score, which is not the same as 75 percent correct, so the 75 percent line on these practice tests is a readiness target. There is no penalty for guessing.",
  },
  {
    q: "What is on the INBDE?",
    a: "The JCNDE's Domain of Dentistry has 56 clinical content areas in three sections, Diagnosis and Treatment Planning (about 36% of questions), Oral Health Management (42%) and Practice and Profession (22%), and 10 Foundation Knowledge areas, from molecular and cellular biology to pharmacology, ethics and research methods. Each question pairs a clinical task with the foundation knowledge behind it.",
  },
  {
    q: "How are the patient cases handled in this practice test?",
    a: "On the real INBDE, case questions come with a patient box and sometimes dental charts, and several questions follow one patient. Here each case question opens with a short written scenario and the findings are described in words, so no images are shown. About a quarter of the questions are cases; on the real exam it is 200 of 500.",
  },
  {
    q: "Are these the real INBDE questions?",
    a: "No. Every question is original, written by Tigertest from the JCNDE's published Candidate Guide and Foundation Knowledge document, so it covers the same knowledge without copying the exam. Tigertest is not affiliated with the JCNDE or the American Dental Association, and this practice does not replace your dental school's board review.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "inbde practice test, inbde practice questions, integrated national board dental examination, dental boards practice test, inbde review 2026, jcnde inbde, national board dental exam questions, inbde case questions",
  alternates: {
    canonical: `${siteUrl}/inbde-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/inbde-practice-test`,
    images: [{ url: shareImageUrl("inbde"), width: 1200, height: 630, alt: "Tigertest free INBDE practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("inbde")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free INBDE Practice Test",
      description,
      url: `${siteUrl}/inbde-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("inbde"),
      featureList: [
        "200 INBDE practice questions, including written patient cases",
        "4 mock exams of 50 questions weighted to the ten Foundation Knowledge areas",
        "4 training sets by Foundation Knowledge area",
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
        classFaqJsonLd("inbde"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Molecular, cellular and systems biology (FK1)", weight: "12%" },
  { name: "Physics and chemistry of biology (FK2)", weight: "7%" },
  { name: "Technologies and materials (FK3)", weight: "8%" },
  { name: "Genetic and developmental conditions (FK4)", weight: "11%" },
  { name: "Immune and host defense (FK5)", weight: "9%" },
  { name: "General and disease-specific pathology (FK6)", weight: "12%" },
  { name: "Microorganisms (FK7)", weight: "11%" },
  { name: "Pharmacology (FK8)", weight: "11%" },
  { name: "Behavioral sciences, ethics and law (FK9)", weight: "11%" },
  { name: "Research and informatics (FK10)", weight: "10%" },
];

export default function InbdeLandingPage() {
  return (
    <div data-theme="inbde" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free INBDE Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/inbde/dashboard"
            shortName="INBDE"
            subtitle="200 original dental board questions on the JCNDE Domain of Dentistry, with written patient cases: anatomy, materials, pathology, microbiology, pharmacology, ethics and research. Four 50-question mock exams. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/inbde-mobile.png", desktop: "/landing/inbde-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="inbde" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Foundation Knowledge Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets cover the ten Foundation Knowledge areas: biology, physics and materials; development and host defense; pathology and microbiology; and pharmacology, ethics and research. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted to the JCNDE&apos;s Foundation Knowledge percentages and mixing standalone questions with written patient cases. Aim for 75% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the JCNDE Domain of Dentistry
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The INBDE test specifications give the share of questions from each Foundation Knowledge area, shown below. Every mock exam here follows those shares, with the clinical tasks of diagnosis, oral health management and practice running through every area. Dental school faculty can set Tigertest as board review at{" "}
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
                src={getTigerAsset("inbde", 3)}
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
            How to Pass the INBDE
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Connect the science to the chair</h3>
              <p>
                The INBDE asks basic science through clinical situations: why an anesthetic fails in infected tissue, which nerve a numb lip points to, which lab test a jaw lesion calls for. Study each science topic with the patient problem it explains.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Read the patient box first</h3>
              <p>
                Two fifths of the exam is case questions. Read the age, history, medications and vital signs before the question, since they decide premedication, drug choice and timing. The guide says a blank area means the information is unknown or not present.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip ethics and research</h3>
              <p>
                Behavioral science, ethics and law, and research methods are about a fifth of the Foundation Knowledge share. Know the ADA Code&apos;s five principles and its rules on referral, abandonment and abuse, plus sensitivity, specificity, study designs and bias.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by Foundation Knowledge area. Aim for 75% or better on every mock exam before your exam date. After each test, drill the questions you missed and retrain the weakest set.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          INBDE Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="inbde" />
        </div>
      </div>

      <ExamSampleQuestions examId="inbde" />

      <ExamRelatedTests examId="inbde" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the INBDE?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across all ten Foundation Knowledge areas of the INBDE.</p>
          <ExamLandingCTA dashboardHref="/inbde/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/pllek";
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

const title = "LEK Practice Test 2026 - Free Poland Medical Final Exam Questions";
const metaDescription =
  "Free LEK practice test in English: 200 original clinical questions on the CEM thematic structure, four 50-question mock exams and seven training sets, every answer explained.";
const description =
  "Free practice in English for the Lekarski Egzamin Koncowy (LEK), the Polish Medical Final Examination run by CEM in Lodz: 200 original clinical-vignette questions written to the CEM thematic structure. Four 50-question mock exams weighted like the real 200-question paper, and seven training sets covering internal medicine, paediatrics, surgery, obstetrics and gynaecology, psychiatry, family medicine, emergency medicine, Polish medical law, medical certification and public health.";

const faqs = [
  {
    q: "What is the LEK?",
    a: "The Lekarski Egzamin Koncowy (LEK) is the Polish Medical Final Examination. It is organised and run by the Centrum Egzaminow Medycznych (CEM) in Lodz, a state body under the Minister of Health, twice a year, in February and September. Under the Act on the professions of physician and dentist, a graduate of a Polish medical university needs a LEK pass, in Polish or in the language they studied in, for the full right to practise as a doctor in Poland.",
  },
  {
    q: "How many questions are on the LEK and how long is it?",
    a: "The LEK has 200 multiple-choice questions, each with five possible answers of which only one is correct, and lasts 4 hours. CEM publishes the thematic structure: internal medicine 39, paediatrics 29, surgery 27, obstetrics and gynaecology 26, psychiatry 14, family medicine 20, emergency medicine and intensive therapy 20, bioethics and medical law 10, medical certification 7 and public health 8, with at least 20 oncology questions across the clinical subjects.",
  },
  {
    q: "What score do you need to pass the LEK?",
    a: "CEM sets the minimum passing score at 56% of the valid questions, which is 112 if all 200 questions are valid. Each 50-question mock exam here uses the same 56% line, so 28 correct answers is a pass on Tigertest.",
  },
  {
    q: "Can you take the LEK in English?",
    a: "Yes. CEM runs the LEK in Polish and in English. For the right to practise, the Act on the professions of physician and dentist accepts a LEK pass in Polish or in the language in which you studied medicine at a Polish university. You apply through the SMK system by 30 November for the February session and by 15 July for the September session.",
  },
  {
    q: "Are these the real LEK questions?",
    a: "No. CEM publishes past LEK papers, and Tigertest does not copy them. Every question here is original, written from the CEM thematic structure, Polish statutes for the law and certification topics, and current European and Polish clinical guidelines. The real exam has five options per question; Tigertest shows four. Tigertest is not affiliated with CEM or the Ministry of Health.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "lek practice test, lek exam english, lekarski egzamin koncowy, lekarski egzamin końcowy, poland medical final exam, lek questions, cem lek, lek 2026, polish medical licensing exam, lek pytania, testy lek",
  alternates: {
    canonical: `${siteUrl}/poland-lek-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/poland-lek-practice-test`,
    images: [{ url: shareImageUrl("pllek"), width: 1200, height: 630, alt: "Tigertest free LEK practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("pllek")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free LEK Practice Test",
      description,
      url: `${siteUrl}/poland-lek-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: "en",
      offers: examOffers("pllek"),
      featureList: [
        "200 LEK practice questions in English",
        "4 mock exams of 50 questions weighted like the CEM thematic structure",
        "7 training sets by subject",
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
        classFaqJsonLd("pllek"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Internal medicine", weight: "39" },
  { name: "Paediatrics and neonatology", weight: "29" },
  { name: "Surgery", weight: "27" },
  { name: "Obstetrics and gynaecology", weight: "26" },
  { name: "Family medicine", weight: "20" },
  { name: "Emergency medicine and intensive therapy", weight: "20" },
  { name: "Psychiatry", weight: "14" },
  { name: "Bioethics and medical law", weight: "10" },
  { name: "Public health", weight: "8" },
  { name: "Medical certification", weight: "7" },
];

export default function PllekLandingPage() {
  return (
    <div data-theme="pllek" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free LEK Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/poland-lek-medical-exam/dashboard"
            shortName="LEK"
            subtitle="200 clinical questions in English for the Polish Medical Final Examination and four 50-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/pllek-mobile.png", desktop: "/landing/pllek-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="pllek" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seven training sets follow the CEM thematic structure: internal medicine; paediatrics; surgery; obstetrics and gynaecology; psychiatry and family medicine; emergency medicine and intensive care; and medical law, certification and public health. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each a quarter-size LEK with the same subject balance and the real 56% pass line. The real paper is 200 questions in 4 hours, so 50 in about an hour keeps the pace. No question appears in more than one test.
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
                Built on the CEM Thematic Structure
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                CEM publishes how many of the 200 LEK questions come from each subject, and every mock exam here keeps that balance, scaled to 50 questions: 10 internal medicine, 7 paediatrics, 7 surgery, 6 obstetrics and gynaecology, 5 family medicine, 5 emergency medicine, 4 psychiatry and 2 each on law, certification and public health. Law and certification questions follow Polish statutes. Medical university teachers can set Tigertest for a class at{" "}
                <Link href="/teach" className="text-brand-dark hover:text-brand-darker underline">tigertest.io/teach</Link>
                {" "}and see which topics the group misses most.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-800">
                    <span className="font-medium text-gray-900 dark:text-gray-50">{area.name}</span>
                    <span className="text-brand-dark font-semibold">{area.weight} of 200</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src={getTigerAsset("pllek", 3)}
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
            How to Prepare for the LEK
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Start with internal medicine</h3>
              <p>
                Internal medicine is the largest block at 39 questions, and with paediatrics, surgery and obstetrics it makes up well over half of the paper. Know first-line treatment, the next diagnostic step and the emergencies of each system.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Learn the Polish rules, not just the medicine</h3>
              <p>
                Bioethics and medical law, medical certification and public health add up to 25 questions. Consent, confidentiality, the conscience clause, record keeping, admission under the Mental Health Protection Act and sickness certificates all follow Polish statutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Do not skip oncology</h3>
              <p>
                At least 20 questions are on oncology, spread across internal medicine, paediatrics, surgery, gynaecology and family medicine: warning symptoms, first investigations, tumour markers and the fast-track pathway.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by subject. After each mock exam, drill the questions you missed and retrain the weakest subject before the next one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          LEK Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="pllek" />
        </div>
      </div>

      <ExamSampleQuestions examId="pllek" />

      <ExamRelatedTests examId="pllek" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Practise for the LEK?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every subject of the CEM thematic structure.</p>
          <ExamLandingCTA dashboardHref="/poland-lek-medical-exam/dashboard" />
        </div>
      </div>
    </div>
  );
}

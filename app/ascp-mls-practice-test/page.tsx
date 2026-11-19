import "@/lib/banks/ascpmls";
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

const title = "Free MLS(ASCP) Practice Test 2026 - ASCP Medical Laboratory Scientist Questions";
const metaDescription =
  "Free-to-start MLS(ASCP) practice test: 200 original medical laboratory scientist questions on the ASCP BOC content guideline, four 50-question practice tests and five training sets, every answer explained.";
const description =
  "Practice for the ASCP Board of Certification Medical Laboratory Scientist MLS(ASCP) exam: 200 original questions written from the BOC's published examination content guideline. Four 50-question practice tests weighted like the real exam's seven content areas, and five training sets covering blood banking, urinalysis and chemistry, hematology and hemostasis, microbiology, and immunology and laboratory operations.";

const faqs = [
  {
    q: "What is the MLS(ASCP) exam?",
    a: "It is the medical laboratory scientist certification exam of the American Society for Clinical Pathology Board of Certification (ASCP BOC). Passing it earns the MLS(ASCP) credential, or MLS(ASCPi) for the international version. Many candidates take it after a bachelor's degree medical laboratory science program.",
  },
  {
    q: "How many questions are on the MLS(ASCP) exam?",
    a: "The BOC content guideline says the exam has 100 multiple-choice questions with one best answer, given in 2 hours 30 minutes. It is computer adaptive, so the questions each candidate sees depend on earlier answers. Tigertest models it as four fixed 50-question practice tests.",
  },
  {
    q: "What score do you need to pass the MLS(ASCP) exam?",
    a: "The ASCP BOC reports a scaled score rather than a percent correct, on a scale from 100 to 999 with 400 to pass. The 70 percent line on these practice tests is a readiness target, not the official standard.",
  },
  {
    q: "What is on the MLS(ASCP) exam?",
    a: "Blood banking, chemistry, hematology (with hemostasis) and microbiology are 17 to 22 percent each. Urinalysis and other body fluids, immunology and laboratory operations are 5 to 10 percent each, and laboratory operations includes basic management and education principles. Questions ask you to apply knowledge, calculate results and correlate results with disease. Each practice test here keeps that balance.",
  },
  {
    q: "Are these the real MLS(ASCP) exam questions?",
    a: "No. Every question is original, written by Tigertest from the ASCP BOC content guideline and from public rules such as the FDA blood component regulations and the CLIA laboratory rules. It covers the same knowledge without copying the exam. Tigertest is not affiliated with the American Society for Clinical Pathology.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "mls ascp practice test, ascp mls exam, mls practice test, medical laboratory scientist practice test, ascp boc mls, mls(ascp) 2026, mls exam questions, clinical laboratory scientist certification",
  alternates: {
    canonical: `${siteUrl}/ascp-mls-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/ascp-mls-practice-test`,
    images: [{ url: shareImageUrl("ascpmls"), width: 1200, height: 630, alt: "Tigertest free MLS(ASCP) practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("ascpmls")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free MLS(ASCP) Practice Test",
      description,
      url: `${siteUrl}/ascp-mls-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("ascpmls"),
      featureList: [
        "200 MLS(ASCP) practice questions",
        "4 practice tests of 50 questions weighted like the ASCP BOC content guideline",
        "5 training sets by content area",
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
        classFaqJsonLd("ascpmls"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Blood Banking", weight: "17-22%" },
  { name: "Chemistry", weight: "17-22%" },
  { name: "Hematology", weight: "17-22%" },
  { name: "Microbiology", weight: "17-22%" },
  { name: "Urinalysis and Other Body Fluids", weight: "5-10%" },
  { name: "Immunology", weight: "5-10%" },
  { name: "Laboratory Operations", weight: "5-10%" },
];

export default function AscpMlsLandingPage() {
  return (
    <div data-theme="ascpmls" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free MLS(ASCP) Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ascp-mls/dashboard"
            shortName="MLS"
            subtitle="200 original medical laboratory scientist questions on the ASCP BOC content guideline: blood banking, urinalysis, chemistry, hematology, immunology, microbiology and lab operations. Four 50-question practice tests. Tuned for mobile. Free to start, no account needed."
            shots={{ mobile: "/landing/ascpmls-mobile.png", desktop: "/landing/ascpmls-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="ascpmls" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Content Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the ASCP BOC content guideline: blood banking; urinalysis and chemistry; hematology and hemostasis; microbiology; and immunology and laboratory operations. Questions you miss come back until you have mastered them.
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
                Four fixed practice tests of 50 questions, each weighted like the content areas of the real exam. The real exam is computer adaptive; these are not. Aim for 70% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the ASCP BOC Content Guideline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The BOC publishes a percentage range for each content area of its 100-question exam, and every practice test here stays inside those ranges, scaled to 50 questions: 10 each on blood banking and hematology, 9 each on chemistry and microbiology, and 4 each on urinalysis, immunology and laboratory operations. MLS program instructors can set Tigertest as board review at{" "}
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
                src={getTigerAsset("ascpmls", 3)}
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
            How to Pass the MLS(ASCP) Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Study the four big areas evenly</h3>
              <p>
                Blood banking, chemistry, hematology and microbiology are each 17 to 22% of the exam, so none can be skipped. At this level the questions ask why: which interference explains a result, which test resolves a workup, which disease fits the pattern.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Work up blood bank and coagulation cases</h3>
              <p>
                Practice ABO discrepancies, antibody identification with enzymes, lectins and neutralization, DAT and eluate patterns, transfusion reactions, and coagulation mixing studies, inhibitors, von Willebrand types and anticoagulant effects.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Practice the calculations and lab operations</h3>
              <p>
                The BOC lists the calculations to know, from transferrin saturation and creatinine clearance to corrected WBC counts, hemocytometer counts and red cell indices. Laboratory operations adds QC rules, CLIA requirements, safety, predictive values, management and education principles.
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
          MLS(ASCP) Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="ascpmls" />
        </div>
      </div>

      <ExamSampleQuestions examId="ascpmls" />

      <ExamRelatedTests examId="ascpmls" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the MLS(ASCP) Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every content area of the ASCP BOC guideline.</p>
          <ExamLandingCTA dashboardHref="/ascp-mls/dashboard" />
        </div>
      </div>
    </div>
  );
}

import "@/lib/banks/arrtmri";
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

const title = "ARRT MRI Practice Test 2026 - Free MRI Registry Questions";
const metaDescription =
  "Free ARRT MRI practice test: 200 original magnetic resonance imaging questions on the ARRT MRI content specifications, four 50-question mock exams and five training sets, every answer explained.";
const description =
  "Free practice for the ARRT Magnetic Resonance Imaging (MRI) certification exam: 200 original questions written from the ARRT MRI Examination Content Specifications in effect from February 1, 2025. Four 50-question mock exams weighted like the real 200 scored questions, and five training sets covering patient care and contrast, MRI screening and safety, physical principles of image formation, sequence parameters and options, pulse sequences and data handling, and neurological, body and musculoskeletal procedures.";

const faqs = [
  {
    q: "What is the ARRT MRI exam?",
    a: "It is the magnetic resonance imaging certification exam of the American Registry of Radiologic Technologists (ARRT). There are two ways to qualify: the primary pathway, after an MRI educational program, and the postprimary pathway, for technologists who already hold a supporting credential such as radiography and then complete structured education and documented clinical experience in MRI. Passing the exam, along with ARRT's ethics requirements, earns the MRI credential.",
  },
  {
    q: "How many questions are on the ARRT MRI exam?",
    a: "There are 200 scored questions plus unscored pilot questions. ARRT's 2026 handbooks list 30 pilot questions and 230 minutes of test time for primary pathway candidates, and 20 pilot questions and 210 minutes for postprimary candidates. Results are scaled scores from 1 to 99, and a scaled score of 75 passes. That is not the same as 75 percent correct, so the 75 percent line on these practice tests is a readiness target, not the official standard.",
  },
  {
    q: "What is on the ARRT MRI exam?",
    a: "Under the content specifications in effect from February 1, 2025, the 200 scored questions are Patient Care 16, Safety 21, Image Production 106 (physical principles of image formation 40, sequence parameters and options 36, data acquisition, processing and storage 30) and Procedures 57 (neurological 25, body 15, musculoskeletal 17). Each 50-question practice test here keeps that balance.",
  },
  {
    q: "Is the ARRT MRI exam changing?",
    a: "ARRT has proposed revised MRI content specifications that are scheduled to take effect February 1, 2028. The draft it published for comment in July 2026 keeps 200 scored questions but gives safety a much larger share. Until then, exams follow the 2025 specifications, which these practice tests use.",
  },
  {
    q: "Are these the real ARRT MRI exam questions?",
    a: "No. Every question is original, written by Tigertest from ARRT's published content specifications, so it covers the same knowledge without copying the exam. Anatomy, scan settings, findings and artifacts are described in words, so image-based items are not modelled. Safety facts follow the ACR Manual on MR Safety. Tigertest is not affiliated with ARRT, and this practice does not replace your MRI program's registry review.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "arrt mri practice test, mri registry practice exam, magnetic resonance imaging practice test, arrt mri registry review questions, mri technologist exam questions, arrt mri exam 2026, mri boards practice, arrt mri content specifications",
  alternates: {
    canonical: `${siteUrl}/arrt-mri-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/arrt-mri-practice-test`,
    images: [{ url: shareImageUrl("arrtmri"), width: 1200, height: 630, alt: "Tigertest free ARRT MRI practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("arrtmri")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ARRT MRI Practice Test",
      description,
      url: `${siteUrl}/arrt-mri-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: examOffers("arrtmri"),
      featureList: [
        "200 ARRT MRI practice questions",
        "4 mock exams of 50 questions weighted like the ARRT MRI content specifications",
        "5 training sets by content category",
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
        classFaqJsonLd("arrtmri"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Patient Care", weight: "8%" },
  { name: "Safety", weight: "10.5%" },
  { name: "Image Production", weight: "53%" },
  { name: "Procedures", weight: "28.5%" },
];

export default function ArrtMriLandingPage() {
  return (
    <div data-theme="arrtmri" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ARRT MRI Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/arrt-mri/dashboard"
            shortName="ARRT MRI"
            subtitle="200 magnetic resonance imaging questions and four 50-question mock exams. Free to start, no account needed."
            shots={{ mobile: "/landing/arrtmri-mobile.png", desktop: "/landing/arrtmri-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="arrtmri" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train by Category</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Five training sets follow the MRI content specifications: patient care and MRI safety; physical principles of image formation; sequence parameters and options; pulse sequences, processing and storage; and neurological, body and musculoskeletal procedures. Questions you miss come back until you have mastered them.
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
                Four mock exams of 50 questions, each weighted like the 200 scored questions on the real exam. Aim for 75% or better. No question appears in more than one test, and every one comes with an explanation.
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
                Built on the ARRT MRI Content Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ARRT publishes how many of the 200 scored questions come from each category, and every mock exam here keeps that balance, scaled to 50 questions. Image production is more than half the exam, followed by procedures. The weights below are for exams from February 1, 2025. MRI program instructors can set Tigertest as registry review at{" "}
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
                src={getTigerAsset("arrtmri", 3)}
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
            How to Pass the ARRT MRI Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Master the physics</h3>
              <p>
                Image production is more than half the scored questions. Know the Larmor equation, T1, T2 and T2*, how the three gradients locate the signal, how k-space is filled and what causes each artifact on the outline.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Know how every parameter trades off</h3>
              <p>
                TR, TE, TI, flip angle, NEX, matrix, FOV, slice thickness, bandwidth and echo train length all change SNR, resolution, contrast and scan time. Work the scan time, pixel and SNR problems on paper until they are automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Own MRI safety</h3>
              <p>
                Learn the four zones, Level 1 and Level 2 personnel, screening for implants and foreign bodies, SAR and burns, gradient noise and nerve stimulation, quench and code procedures, and gadolinium safety.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Fix your misses, then retest</h3>
              <p>
                Tigertest tracks your accuracy by category. Aim for 75% or better on every mock exam before your exam date. After each test, drill the questions you missed and retrain the weakest category.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          ARRT MRI Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="arrtmri" />
        </div>
      </div>

      <ExamSampleQuestions examId="arrtmri" />

      <ExamRelatedTests examId="arrtmri" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the ARRT MRI Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every category of the ARRT MRI content specifications.</p>
          <ExamLandingCTA dashboardHref="/arrt-mri/dashboard" />
        </div>
      </div>
    </div>
  );
}

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

const title = "ARRT Radiography Practice Test 2026 - Free Registry Exam Questions";
const metaDescription =
  "Free ARRT Radiography practice test: 200 original registry review questions on the ARRT content specifications, four 50-question mock exams and five training sets, every answer explained.";
const description =
  "Free practice for the ARRT Radiography certification exam (the radiography registry): 200 original questions written from the ARRT Radiography Examination Content Specifications. Four 50-question mock exams weighted like the real 200 scored questions, and five training sets covering patient care, radiation physics and protection, image production, and procedures for the head, spine, pelvis, thorax, abdomen and extremities.";

const faqs = [
  {
    q: "What is the ARRT Radiography exam?",
    a: "It is the certification exam of the American Registry of Radiologic Technologists (ARRT) for radiographers, often called the registry. Passing it, along with ARRT's education and ethics requirements, earns the R.T.(R) credential, which most states use for licensing radiologic technologists.",
  },
  {
    q: "How many questions are on the ARRT Radiography exam?",
    a: "The exam has 230 multiple-choice questions taken on a computer: 200 are scored and 30 are unscored pilot questions mixed in. Study guides report that passing takes a scaled score of 75 on a scale of 1 to 99, which is not the same as 75 percent correct, so the 75 percent line on these practice tests is a readiness target, not the official standard. Check the ARRT handbook for the appointment length.",
  },
  {
    q: "What is on the ARRT Radiography exam?",
    a: "Under the content specifications in force through February 28, 2027, the 200 scored questions are Patient Care 33, Safety 50 (radiation physics and radiobiology 21, radiation protection 29), Image Production 51 (image acquisition and evaluation 26, equipment operation and quality assurance 25) and Procedures 66 (head, spine and pelvis 18, thorax and abdomen 20, extremities 28). Each 50-question practice test here keeps that balance.",
  },
  {
    q: "What changes on the ARRT Radiography exam in 2027?",
    a: "ARRT's revised content specifications take effect on March 1, 2027. The exam stays at 200 scored questions, but the counts become Patient Care 31, Safety 46, Image Production 51 and Procedures 72. Computed radiography content is removed, virtual grids are added, and procedures such as feeding tube placement and joint injections are added while intravenous urography is dropped.",
  },
  {
    q: "Are these the real ARRT exam questions?",
    a: "No. Every question is original, written by Tigertest from ARRT's published content specifications, so it covers the same knowledge without copying the exam. Questions describe positioning, anatomy and image findings in words, so image-based items are not modelled. Tigertest is not affiliated with ARRT, and this free practice does not replace your program's registry review.",
  },
];

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "arrt practice test, arrt radiography practice test, radiography registry practice exam, arrt registry review questions, rad tech board exam practice, arrt exam 2026, radiologic technologist exam questions, arrt content specifications",
  alternates: {
    canonical: `${siteUrl}/arrt-radiography-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/arrt-radiography-practice-test`,
    images: [{ url: shareImageUrl("arrt"), width: 1200, height: 630, alt: "Tigertest free ARRT Radiography practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [shareImageUrl("arrt")],
    title,
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free ARRT Radiography Practice Test",
      description,
      url: `${siteUrl}/arrt-radiography-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 ARRT Radiography practice questions",
        "4 mock exams of 50 questions weighted like the ARRT content specifications",
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
        classFaqJsonLd("arrt"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Patient Care", weight: "16.5%" },
  { name: "Safety", weight: "25%" },
  { name: "Image Production", weight: "25.5%" },
  { name: "Procedures", weight: "33%" },
];

export default function ArrtLandingPage() {
  return (
    <div data-theme="arrt" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free ARRT Radiography Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/arrt-radiography/dashboard"
            shortName="ARRT"
            subtitle="200 original registry questions on the ARRT Radiography content specifications: patient care, radiation safety, image production and positioning. Four 50-question mock exams. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/arrt-mobile.png", desktop: "/landing/arrt-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="arrt" />

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
                Five training sets follow the content specifications: patient care; radiation physics and protection; image production; head, spine, thorax and abdomen procedures; and extremity procedures. Questions you miss come back until you have mastered them.
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
                Built on the ARRT Content Specifications
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                ARRT publishes how many of the 200 scored questions come from each category, and every mock exam here keeps that balance, scaled to 50 questions. Procedures is the biggest category, followed by image production and safety. The weights below are for exams through February 28, 2027; from March 1, 2027 procedures grows to 72 questions. Radiography program instructors can set Tigertest as registry review at{" "}
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
                src={getTigerAsset("arrt", 1)}
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
            How to Pass the ARRT Radiography Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Own the positioning details</h3>
              <p>
                Procedures is a third of the exam. For each projection know the central ray angle and entry point, the body position, which structures it shows and how to tell rotation or poor alignment from the anatomy you would see.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Practice the technique math</h3>
              <p>
                mAs, the inverse square law, the direct square law, the 15% rule, grid conversion factors, magnification and heat units all come up. Work each problem on paper until the setup is automatic.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Learn the radiation protection numbers</h3>
              <p>
                Safety is a quarter of the exam. Know the NCRP dose limits, filtration and lead equivalents, fluoroscopy rules such as the 5-minute timer and minimum source-to-skin distance, and which effects are stochastic or deterministic.
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
          ARRT Radiography Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="arrt" />
        </div>
      </div>

      <ExamRelatedTests examId="arrt" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the ARRT Radiography Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Start for free. No account required. 200 questions across every category of the ARRT content specifications.</p>
          <ExamLandingCTA dashboardHref="/arrt-radiography/dashboard" />
        </div>
      </div>
    </div>
  );
}

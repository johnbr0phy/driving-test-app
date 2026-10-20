import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free HTL Practice Test 2026 - ASCP Histotechnologist";
const metaDescription =
  "Free ASCP HTL and HT practice tests: 214 questions on the 2025 content guideline, covering fixation, processing, microtomy, staining and lab operations.";
const description =
  "Free ASCP HTL and HT practice tests with 214 questions weighted to the official 2025 content guideline. Fixation, processing, embedding, microtomy, staining, and lab operations with instant feedback.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "HTL practice test, ASCP HTL exam, histotechnologist practice questions, HT ASCP practice test, histotechnician exam prep, histology certification exam, ASCP BOC histotechnology",
  alternates: {
    canonical: `${siteUrl}/htl-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/htl-practice-test`,
    images: [{ url: "/og/htl", width: 1200, height: 630, alt: "TigerTest free HTL practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/htl"],
    title,
    description: metaDescription,
  },
};

// One list for the visible FAQ and the FAQPage JSON-LD, so the two never drift.
const faqs = [
  {
    q: "How many questions are on the ASCP HTL exam?",
    a: "The HTL(ASCP) and HT(ASCP) exams have 100 multiple-choice questions in 2 hours 30 minutes, delivered by computer adaptive testing. Scores are scaled from 100 to 999 and 400 is passing.",
  },
  {
    q: "What topics does the HTL exam cover?",
    a: "Staining (30 to 40 percent), Fixation (15 to 25 percent), Embedding and Microtomy (15 to 25 percent), Processing (10 to 20 percent), and Laboratory Operations (10 to 15 percent), per the ASCP BOC content guideline revised September 2025.",
  },
  {
    q: "Does this work for the HT exam too?",
    a: "Yes. HT and HTL share the same content outline. The HTL exam adds deeper chemistry, pathology, immunohistochemistry QC, management, education, and regulation questions, all of which are in this bank.",
  },
  {
    q: "Is the TigerTest HTL practice test free?",
    a: "Yes. All four practice tests and all ten training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free HTL (ASCP) Practice Tests",
      description,
      url: `${siteUrl}/htl-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "214 HTL practice questions",
        "4 blueprint-weighted practice tests",
        "Training sets for all 5 ASCP content areas",
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
        classFaqJsonLd("htl"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Staining", weight: "30 to 40%" },
  { name: "Fixation", weight: "15 to 25%" },
  { name: "Embedding & Microtomy", weight: "15 to 25%" },
  { name: "Processing", weight: "10 to 20%" },
  { name: "Laboratory Operations", weight: "10 to 15%" },
];

export default function HTLLandingPage() {
  return (
    <div data-theme="htl" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free HTL Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/htl/dashboard"
            shortName="HTL"
            subtitle="214 questions weighted to the ASCP content guideline. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/htl-mobile.png", desktop: "/landing/htl-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="htl" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Training by Content Area</h3>
              <p className="text-gray-600 dark:text-gray-300">
                One set per ASCP content area. Get instant feedback after each answer, and
                questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Practice Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four 50-question tests that mirror the real exam&apos;s weighting across staining,
                fixation, embedding and microtomy, processing, and lab operations.
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
                Built on the Official ASCP Content Guideline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The ASCP Board of Certification publishes the exact weighting of the HT and HTL
                exams (guideline revised September 2025). Every practice test here follows it.
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
                src={getTigerAsset("htl", 1)}
                alt="TigerTest mascot"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Help Make TigerTest Better</h2>
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
            How to Pass the HTL Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the exam format</h3>
              <p>
                100 multiple-choice questions in 2 hours 30 minutes, delivered by computer adaptive
                testing. You cannot skip or go back. Scores are scaled from 100 to 999, and 400 passes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Weight your study like the exam</h3>
              <p>
                Staining is the largest area at 30 to 40 percent, so start with the six Staining sets, split by what each stain shows: carbohydrates and amyloid, connective tissue and nerve, microorganisms, pigments and minerals, and immunostains.
                Fixation and Embedding and Microtomy are next at 15 to 25 percent each.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Study from the ASCP reading list</h3>
              <p>
                The core text is Carson and Cappellano, Histotechnology: A Self-Instructional Text (5th ed.).
                Pair it with the BOC Study Guide and Bancroft&apos;s Theory and Practice of Histological Techniques.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak areas</h3>
              <p>
                TigerTest tracks your accuracy by content area. After each practice test, go back to the
                training set for the area you missed most.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          HTL Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="htl" />
        </div>
      </div>

      <ExamRelatedTests examId="htl" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the HTL Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 214 questions across all five content areas.</p>
          <ExamLandingCTA dashboardHref="/htl/dashboard" />
        </div>
      </div>
    </div>
  );
}

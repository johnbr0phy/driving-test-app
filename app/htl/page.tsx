import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Smartphone, Monitor } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free HTL Practice Test 2026 - ASCP Histotechnologist Exam Prep | TigerTest";
const description =
  "Free ASCP HTL and HT practice tests with 200 questions weighted to the official 2025 content guideline. Fixation, processing, embedding, microtomy, staining, and lab operations with instant feedback.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "HTL practice test, ASCP HTL exam, histotechnologist practice questions, HT ASCP practice test, histotechnician exam prep, histology certification exam, ASCP BOC histotechnology",
  alternates: {
    canonical: `${siteUrl}/htl`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/htl`,
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free HTL (ASCP) Practice Tests",
      description,
      url: `${siteUrl}/htl`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 HTL practice questions",
        "4 blueprint-weighted practice tests",
        "Training sets for all 5 ASCP content areas",
        "Instant feedback with explanations",
        "Auto-save progress",
      ],
    },
    {
      "@type": "Organization",
      name: "TigerTest",
      url: siteUrl,
      logo: `${siteUrl}/tiger.png`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How many questions are on the ASCP HTL exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The HTL(ASCP) and HT(ASCP) exams have 100 multiple-choice questions in 2 hours 30 minutes, delivered by computer adaptive testing. Scores are scaled from 100 to 999 and 400 is passing.",
          },
        },
        {
          "@type": "Question",
          name: "What topics does the HTL exam cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Per the ASCP BOC content guideline revised September 2025: Staining 30 to 40 percent, Fixation 15 to 25 percent, Embedding and Microtomy 15 to 25 percent, Processing 10 to 20 percent, and Laboratory Operations 10 to 15 percent.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest HTL practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all five training sets are free, with no account required.",
          },
        },
        {
          "@type": "Question",
          name: "Does this work for the HT exam too?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. HT and HTL share the same content outline. HTL adds deeper chemistry, pathology, immunohistochemistry QC, management, education, and regulation questions, which are included in this bank.",
          },
        },
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
    <div className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free HTL Practice Test 2026
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Prepare for the ASCP Histotechnologist (HTL) and Histotechnician (HT) certification exams.
            200 questions weighted to the official content guideline, with explanations for every answer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/htl/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              Start Free Practice Test
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-brand text-brand hover:bg-brand-light font-semibold rounded-xl transition-colors"
            >
              Learn How It Works
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            ✓ 200 questions ✓ 4 practice tests ✓ 5 training sets ✓ No registration required
          </p>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-6 pt-8 pb-16 md:pt-12 md:pb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-brand-border-light rounded-full flex items-center justify-center shadow-sm">
              <Smartphone className="w-7 h-7 text-brand" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Content Area</h3>
              <p className="text-gray-600">
                One set per ASCP content area. Get instant feedback after each answer, and
                questions you miss come back until you have mastered them.
              </p>
            </div>
          </div>
          <div className="relative pt-8">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-sm">
              <Monitor className="w-7 h-7 text-gray-500" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 pt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Tests</h3>
              <p className="text-gray-600">
                Four 50-question tests that mirror the real exam&apos;s weighting across staining,
                fixation, embedding and microtomy, processing, and lab operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built on the Official ASCP Content Guideline
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The ASCP Board of Certification publishes the exact weighting of the HT and HTL
                exams (guideline revised September 2025). Every practice test here follows it.
              </p>
              <div className="space-y-3">
                {contentAreas.map((area) => (
                  <div key={area.name} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200">
                    <span className="font-medium text-gray-900">{area.name}</span>
                    <span className="text-brand font-semibold">{area.weight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/tiger_face_01.png"
                alt="TigerTest mascot"
                width={180}
                height={180}
                className="w-32 md:w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Just launched */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="bg-brand-light border border-brand-border-light rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Just Launched!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            The HTL practice test is brand new. If a question looks wrong or you want a topic
            covered in more depth, tell us.
          </p>
          <a
            href="https://www.johnbrophy.net/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-hover transition-colors"
          >
            Send Us Feedback
          </a>
        </div>
      </div>

      {/* Study guide */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How to Pass the HTL Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know the exam format</h3>
              <p>
                100 multiple-choice questions in 2 hours 30 minutes, delivered by computer adaptive
                testing. You cannot skip or go back. Scores are scaled from 100 to 999, and 400 passes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Weight your study like the exam</h3>
              <p>
                Staining is the largest area at 30 to 40 percent, so start with the Staining training set.
                Fixation and Embedding and Microtomy are next at 15 to 25 percent each.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Study from the ASCP reading list</h3>
              <p>
                The core text is Carson and Cappellano, Histotechnology: A Self-Instructional Text (5th ed.).
                Pair it with the BOC Study Guide and Bancroft&apos;s Theory and Practice of Histological Techniques.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak areas</h3>
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          HTL Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the ASCP HTL exam?</h3>
            <p className="text-gray-600">
              100 multiple-choice questions in 2 hours 30 minutes, delivered by computer adaptive testing.
              Scores are scaled from 100 to 999 and 400 is passing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What topics does the HTL exam cover?</h3>
            <p className="text-gray-600">
              Staining (30 to 40 percent), Fixation (15 to 25 percent), Embedding and Microtomy (15 to 25 percent),
              Processing (10 to 20 percent), and Laboratory Operations (10 to 15 percent), per the ASCP BOC
              content guideline revised September 2025.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Does this work for the HT exam too?</h3>
            <p className="text-gray-600">
              Yes. HT and HTL share the same content outline. The HTL exam adds deeper chemistry, pathology,
              immunohistochemistry QC, management, education, and regulation questions, all of which are in this bank.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest HTL practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all five training sets are free, with no account required.
              Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link
            href="/htl/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand hover:bg-brand-hover text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            Start Free Practice Test
          </Link>
        </div>
      </div>
    </div>
  );
}

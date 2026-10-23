import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamFacts } from "@/components/exam/ExamFacts";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";
import { ExamClassFaq, classFaqJsonLd } from "@/components/exam/ExamClassFaq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free CST Practice Test 2026 - Surgical Technologist";
const metaDescription =
  "Free CST practice tests: 200 questions on the NBSTSA outline, from preop and intraop care to sterilization, anatomy, microbiology and pharmacology.";
const description =
  "Free NBSTSA CST practice tests with 200 questions weighted to the official exam content outline. Preoperative, intraoperative, postoperative, sterilization, anatomy, microbiology, and pharmacology with instant feedback.";

export const metadata: Metadata = {
  title,
  description: metaDescription,
  keywords:
    "CST practice test, NBSTSA CST exam, surgical technologist practice questions, surgical tech exam prep, CST certification exam, surgical technology practice test, TS-C practice test",
  alternates: {
    canonical: `${siteUrl}/cst-practice-test`,
  },
  openGraph: {
    title,
    description: metaDescription,
    url: `${siteUrl}/cst-practice-test`,
    images: [{ url: "/og/cst", width: 1200, height: 630, alt: "Tigertest free CST practice test" }],
    siteName: "Tigertest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/cst"],
    title,
    description: metaDescription,
  },
};

// One list for the visible FAQ and the FAQPage JSON-LD, so the two never drift.
const faqs = [
  {
    q: "How many questions are on the CST exam?",
    a: "The NBSTSA CST exam has 175 multiple-choice questions in 4 hours. 150 are scored and 25 are unscored pretest items. You need 102 of the 150 scored items correct to pass, about 68 percent.",
  },
  {
    q: "What topics does the CST exam cover?",
    a: "Per the NBSTSA content outline: Perioperative Care (105 scored items: preoperative 19, intraoperative 68, postoperative 10), Ancillary Duties (23: administrative and personnel 7, equipment sterilization and maintenance 16), and Basic Science (30: anatomy and physiology 18, microbiology 6, surgical pharmacology 6).",
  },
  {
    q: "Does this work for the TS-C exam too?",
    a: "Largely, yes. The NCCT Tech in Surgery - Certified (TS-C) exam covers the same perioperative, sterilization, and basic science material, so this bank is useful preparation, though its exact weighting differs.",
  },
  {
    q: "Is the Tigertest CST practice test free?",
    a: "Yes. All four practice tests and all four training sets are free, with no account required. Create a free account if you want your progress saved across devices.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Tigertest - Free CST (NBSTSA) Practice Tests",
      description,
      url: `${siteUrl}/cst-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 CST practice questions",
        "4 blueprint-weighted practice tests",
        "4 training sets, one per practice test",
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
        classFaqJsonLd("cst"),
      ],
    },
  ],
};

const contentAreas = [
  { name: "Intraoperative Procedures", weight: "68 of 150" },
  { name: "Preoperative Preparation", weight: "19 of 150" },
  { name: "Anatomy & Physiology", weight: "18 of 150" },
  { name: "Equipment Sterilization & Maintenance", weight: "16 of 150" },
  { name: "Postoperative Procedures", weight: "10 of 150" },
  { name: "Administrative & Personnel", weight: "7 of 150" },
  { name: "Microbiology", weight: "6 of 150" },
  { name: "Surgical Pharmacology", weight: "6 of 150" },
];

export default function CSTLandingPage() {
  return (
    <div data-theme="cst" className="flex-1 bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 tracking-tight">
            Free CST Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/cst/dashboard"
            shortName="CST"
            subtitle="200 questions weighted to the NBSTSA content outline. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cst-mobile.png", desktop: "/landing/cst-desktop.png" }}
          />
        </div>
      </div>

      <ExamFacts examId="cst" />

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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">Train, Then Test</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Four training sets, one per practice test: Set 1 holds exactly the 50 questions of Test 1,
                and so on. Master Set 1, take Test 1, then move on. Questions you miss come back until
                you have mastered them.
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
                Four 50-question tests that mirror the real exam&apos;s weighting. Intraoperative
                procedures are almost half of every test, just like the real CST.
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
                Built on the Official NBSTSA Content Outline
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                The NBSTSA publishes how many of the 150 scored items come from each domain
                (2023 job analysis). Every practice test here follows that weighting.
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
                src={getTigerAsset("cst", 1)}
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
            How to Pass the CST Exam
          </h2>
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">1. Know the exam format</h3>
              <p>
                175 multiple-choice questions in 4 hours: 150 scored plus 25 unscored pretest items.
                You need 102 of the 150 scored items correct, roughly 68 percent.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">2. Weight your study like the exam</h3>
              <p>
                Intraoperative procedures are 68 of the 150 scored items, so every practice test gives
                them the most questions. Preoperative preparation and anatomy and physiology are next at 19 and 18.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">3. Study from the NBSTSA reference list</h3>
              <p>
                The core texts are the AST Surgical Technology for the Surgical Technologist and Frey&apos;s
                Surgical Technology: Principles and Practice. Pair them with the NBSTSA CST Study Guide.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">4. Drill your weak areas</h3>
              <p>
                Tigertest tracks your accuracy by content area. After each practice test, drill the
                questions you missed, retrain that test&apos;s set, and retake until you clear 70 percent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-12">
          CST Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-50 mb-2">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
          <ExamClassFaq examId="cst" />
        </div>
      </div>

      <ExamRelatedTests examId="cst" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white dark:to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">Ready to Pass the CST Exam?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">Free to start. No account required. 200 questions across every exam domain.</p>
          <ExamLandingCTA dashboardHref="/cst/dashboard" />
        </div>
      </div>
    </div>
  );
}

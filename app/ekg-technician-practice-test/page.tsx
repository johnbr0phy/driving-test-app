import { Metadata } from "next";
import Image from "next/image";
import { getTigerAsset } from "@/lib/tigerAssets";
import { Smartphone, Monitor } from "lucide-react";
import { ExamLandingHero, ExamLandingCTA } from "@/components/exam/ExamLandingHero";
import { ExamLandingBreadcrumbs } from "@/components/exam/ExamLandingBreadcrumbs";
import { ExamRelatedTests } from "@/components/exam/ExamRelatedTests";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tigertest.io";

const title = "Free EKG Technician Practice Test 2026 - NHA CET Exam Prep";
const description =
  "Free EKG technician practice tests with 200 questions weighted to the NHA CET test plan: EKG acquisition and lead placement, artifacts, Holter and stress testing, safety and patient care, and rhythm analysis and interpretation. Instant feedback with explanations.";

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "EKG technician practice test, NHA CET practice test, CET exam questions, EKG certification practice exam, ECG technician test prep 2026, EKG rhythm quiz, free EKG practice questions",
  alternates: {
    canonical: `${siteUrl}/ekg-technician-practice-test`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/ekg-technician-practice-test`,
    images: [{ url: "/og/cet", width: 1200, height: 630, alt: "TigerTest free EKG practice test" }],
    siteName: "TigerTest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/cet"],
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "TigerTest - Free EKG Technician Practice Tests",
      description,
      url: `${siteUrl}/ekg-technician-practice-test`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "200 EKG technician practice questions",
        "4 practice tests weighted to the NHA CET test plan",
        "Training sets for every domain",
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
          name: "How many questions are on the NHA CET exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The NHA CET exam has 120 multiple-choice questions, 100 scored and 20 unscored pretest items, with 2 hours to finish. It is scored on a scale of 200 to 500 and 390 is passing. About 75 percent correct is a safe target.",
          },
        },
        {
          "@type": "Question",
          name: "What is on the EKG technician exam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Three domains: EKG Acquisition 44 percent (equipment, skin prep, 12-lead and alternative lead placement, artifacts, Holter and event monitors, stress testing), Safety, Compliance and Coordinated Patient Care 32 percent (HIPAA, infection control, scope, vital signs, patient instruction, BLS), and EKG Analysis and Interpretation 24 percent (rate, intervals, waves, rhythms, blocks, pacemakers, ischemia and infarction).",
          },
        },
        {
          "@type": "Question",
          name: "Are there EKG strip images in the questions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every rhythm question describes the strip in words: rate, regularity, P waves, PR interval and QRS width, the same features you measure on paper. Use these to learn the criteria, then practice on real tracings from your course before exam day.",
          },
        },
        {
          "@type": "Question",
          name: "Is the TigerTest EKG technician practice test free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All four practice tests and all four training sets are free, with no account required.",
          },
        },
      ],
    },
  ],
};

const contentAreas = [
  { name: "EKG Acquisition", weight: "44%" },
  { name: "Safety, Compliance & Coordinated Patient Care", weight: "32%" },
  { name: "EKG Analysis & Interpretation", weight: "24%" },
];

export default function EkgLandingPage() {
  return (
    <div data-theme="cet" className="flex-1 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExamLandingBreadcrumbs examId="cet" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Free EKG Technician Practice Test 2026
          </h1>
          <ExamLandingHero
            dashboardHref="/ekg/dashboard"
            shortName="EKG"
            subtitle="200 questions weighted to the NHA CET test plan. Tuned for mobile. No account needed."
            shots={{ mobile: "/landing/cet-mobile.png", desktop: "/landing/cet-desktop.png" }}
          />
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Training by Domain</h3>
              <p className="text-gray-600">
                Three sets matching the three NHA CET domains: acquisition and leads, safety and
                patient care, and analysis and interpretation. Questions you miss come back until you
                have mastered them.
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
                Four 50-question tests weighted like the real exam and written in its style: a patient
                on the table, a tracing described in words, and the one thing the technician should do next.
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
                Built on the NHA CET Test Plan
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The National Healthcareer Association publishes the weighting of its three domains, and
                acquisition is almost half. Every practice test here follows that weighting, so you get
                22 acquisition, 16 safety and patient care, and 12 analysis questions per test.
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
                src={getTigerAsset("cet", 1)}
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
            The EKG technician practice test is brand new. If a question looks wrong or your program
            teaches it differently, tell us.
          </p>
          <a
            href="https://johnbrophy.net/#contact"
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
            How to Pass the EKG Technician Exam
          </h2>
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Know every electrode position cold</h3>
              <p>
                V1 at the fourth intercostal space on the right of the sternum, V4 at the fifth space on
                the midclavicular line, V6 on the midaxillary line level with V4. Add the limb leads, the
                Mason-Likar torso positions, V4R and V7 to V9. Acquisition is 44 percent of the exam.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Learn the numbers</h3>
              <p>
                25 millimeters per second, 10 millimeters per millivolt, a small box is 0.04 seconds, PR
                0.12 to 0.20, QRS under 0.12, the 300-150-100-75-60-50 sequence, 220 minus age. Every rate
                question here shows the arithmetic in its explanation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Fix the artifact before you call it a rhythm</h3>
              <p>
                Wavy baseline in every lead is somatic tremor, a drifting baseline is a loose electrode or
                lotion, a fuzzy thick line is 60-cycle interference. The exam loves asking what to do first,
                and it is almost never &quot;print it and tell the patient&quot;. You stay within scope: acquire,
                recognize what needs immediate attention, and report.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Drill your weak domain</h3>
              <p>
                TigerTest tracks your accuracy by domain. After each practice test, go back to the set
                you missed most and retake until you clear 70 percent with room to spare.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          EKG Technician Exam Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">How many questions are on the NHA CET exam?</h3>
            <p className="text-gray-600">
              The NHA CET exam has 120 multiple-choice questions, 100 scored and 20 unscored pretest
              items, with 2 hours to finish. It is scored on a scale of 200 to 500 and 390 is passing.
              About 75 percent correct is a safe target.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">What is on the EKG technician exam?</h3>
            <p className="text-gray-600">
              Three domains: EKG Acquisition 44 percent (equipment, skin prep, 12-lead and alternative
              lead placement, artifacts, Holter and event monitors, stress testing), Safety, Compliance
              and Coordinated Patient Care 32 percent (HIPAA, infection control, scope, vital signs,
              patient instruction, BLS), and EKG Analysis and Interpretation 24 percent (rate, intervals,
              waves, rhythms, blocks, pacemakers, ischemia and infarction).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Are there EKG strip images in the questions?</h3>
            <p className="text-gray-600">
              No. Every rhythm question describes the strip in words: rate, regularity, P waves, PR
              interval and QRS width, the same features you measure on paper. Use these to learn the
              criteria, then practice on real tracings from your course before exam day.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">Is the TigerTest EKG technician practice test free?</h3>
            <p className="text-gray-600">
              Yes. All four practice tests and all four training sets are free, with no account required.
              Create a free account if you want your progress saved across devices.
            </p>
          </div>
        </div>
      </div>

      <ExamRelatedTests examId="cet" />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light to-white pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Pass Your EKG Technician Exam?</h2>
          <p className="text-lg text-gray-600 mb-10">Free to start. No account required. 200 questions across all three domains.</p>
          <ExamLandingCTA dashboardHref="/ekg/dashboard" />
        </div>
      </div>
    </div>
  );
}
